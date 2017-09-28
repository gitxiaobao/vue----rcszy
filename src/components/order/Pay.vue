<template>
	<div class="container">
		<mt-header title="付款">
	        <router-link to="/me" slot="left">
	          <mt-button icon="back">返回</mt-button>
	        </router-link>
		</mt-header>
		<div class="order-done">
			<div>{{order.snap_name}}</div>
			<div><span>￥{{order.total_price}}</span></div>
			<div><span>{{order.snap_address | jsonParse('name')}}</span> <span>{{order.snap_address | jsonParse('mobile')}}</span> </div>
			<div>{{order.snap_address | jsonParse('area')}}</div> 
			<div>{{order.snap_address | jsonParse('addr')}}</div>
			<mt-button size="large" type="primary" @click="goPay">微信支付</mt-button>
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default {
		data(){
			return {
				order: {},
				signPackage: {}
			}
		},
		methods: {
			getStorageOrder(){
				var order = sessionStorage.getItem('orderData');
				this.order = JSON.parse(order);
			},
			goPay(){
				var that = this;
				this.$http.post('/order/pay',this.order).then((res)=>{
					wx.chooseWXPay({
					    timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
					    nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
					    package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
					    signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
					    paySign: res.data.paySign, // 支付签名
					    success: function (res) {
					    	// console.log('success',res)
					    	that.$http.post('/order/notify',{order_id:that.order.order_id}).then((res)=>{
					    		
								MessageBox.alert('Success!').then(action => {
				  					sessionStorage.setItem('selected', 'me')
				  					that.$router.push('/me')
								});
					    	})
					        // 支付成功后的回调函数

					    },
					    fail: function(res){
					    	console.log('fail',res)
					    }

					});
				})
			},
			getJssdk(){
				return this.$http.get('/jssdk?url='+encodeURIComponent(location.href.split('#')[0])).then((res)=>{
					return res.data;
				})
			},
			getOrderDetail(id){
				this.$http.get('/order/detail?id='+id).then((res)=>{
					this.order = res.data;
					this.order.order_id = res.data.id;
				})
			}
		},
		mounted(){
			if(this.$route.query.id != undefined){
				this.getOrderDetail(this.$route.query.id)
			}else{
				this.getStorageOrder();
			}
			
			this.getJssdk().then((res)=>{
				wx.config({
			        debug : false,
			        appId : res.appId,
			        timestamp : res.timestamp,
			        nonceStr : res.nonceStr,
			        signature : res.signature,
			        jsApiList : [
			            "chooseWXPay"
			        ]
			    })
			});

			this.$store.dispatch('hideTabbar');
		}
	}
</script>
<style scoped>
	.container{
		height: 100%;
		background: #ddd;
	}
	.order-done{
		text-align: center;
		margin: 10px 0;
		background: #fff;
		padding: 10px;
	}
	.order-done div{
		padding-bottom: 6px;
	}
	.mint-button--primary{
		background-color: #AB956D;
	}
</style>
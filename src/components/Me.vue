<template>
	<div class="container">
		<div class="me-header">
			<img :src="userInfo.headimgurl">
			<p>{{userInfo.nickname}}</p>
		</div>
		<div class="user-address">
			<div class="addr-manage">
				<span>地址管理</span> 
				<router-link to="/address">></router-link>
			</div>
			<div class="addr-detail">
				<div v-if="address.name">收货人：{{address.name}}</div>
				<div v-if="address.mobile">电话：{{address.mobile}}</div>
				<div v-if="address.area">小区：{{address.area}}</div>
				<div v-if="address.addr">详细地址：{{address.addr}}</div>
				<div v-if="address.remark">备注：{{address.remark}}</div>
			</div>
		</div>
		<div class="diliver"></div>
		<div class="user-order">
			<div class="order-title"><span>我的订单</span></div>

			<div class="bb-1" v-for="order in orders">
				<div class="order_sn">订单编号：{{order.order_sn}}</div>
				<div class="order-goods" @click="orderDetail(order.id)">
					<div><img :src="order.snap_img"></div>
					<div><span>{{order.snap_name}}</span> <br> <span>{{order.totalNum}}件商品</span></div>
					<div v-if="order.status == 1">
						<span>待付款</span>
					</div>
					<div v-if="order.status == 2"><span>已付款</span></div>
				</div>
				<div class="order-status">
					<span>实付：￥{{order.total_price}}</span>
					<div class="pay-status-1" v-if="order.status == 1">
						<a @click="cancelOrder(order.id)">取消订单</a>
						<a @click="orderDone(order.id)">去付款</a>
					</div>
					<div class="pay-status-2" v-if="order.status == 2">
						<a>已付款、未发货</a>
					</div>
					<div class="pay-status-3" v-if="order.status == 3">
						<a>已发货</a>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
		data(){
			return {
				orders: [],
				address: {},
				userInfo: {}
			}
		},
		methods: {
			getUserAddress(){
				this.$http.post('/user/address',{user_id: this.userInfo.id}).then((res)=>{
					if(!res.data){
						localStorage.removeItem('addressData');
					}else{
						this.address = res.data;
						localStorage.setItem('addressData',JSON.stringify(res.data));
					}
				})
			},
			getUserOrder(){
				this.$http.post('user/order',{user_id: this.userInfo.id}).then((res)=>{
					var len = res.data.length;
					for(var i=0;i<len;i++){
						var snap_items = JSON.parse(res.data[i].snap_items);
						var length = snap_items.length;
						var num = 0;
						for(var j=0;j<length;j++){
							num += snap_items[j].num;
						}
						res.data[i].totalNum = num;
					}

					this.orders = res.data;
				})
			},
			getUserInfo(){
				this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
			},
			cancelOrder(id){
				MessageBox.confirm('确定取消吗?').then(action => {
					this.$http.get('order/cancel?id='+id).then((res)=>{
						Toast({
	  						message: '取消成功',
	  						duration: 1000
						});
					this.getUserOrder();
					})
				})
			},
			orderDone(id){
				this.$router.push('/pay?id='+id);
			},
			orderDetail(id){
				this.$router.push('orderDetail/'+id);
			}
		},
		mounted(){
			this.getUserInfo();
			this.getUserAddress();
			this.getUserOrder();
			if(!this.$store.getters.tabbarStatus){
				this.$store.dispatch('showTabbar')
			}
		}
	}
</script>
<style scoped lang="less">
	.container{
		min-height: 100vh;
		background: #fff;
		color: #999;
	}
	.diliver{
		height: 10px;
		background: #eee;
	}
	.me-header{
		width: 100%;
		height: 100px;
		padding: 10px;
		box-sizing: border-box;
		background: #AB956D;
		display: flex;
		img{
			width:80px;
			height: 80px;
			border-radius: 50%;
		}
		p{
			padding-left: 20px;
			line-height: 80px;
			color: #fff;
		}
	}
	.user-address{
		overflow: auto;
		margin-bottom: 10px;
		background: #fff;
		.addr-manage,.addr-detail div{
			padding: 10px;
			border-bottom: 1px solid #eee;
		}
		.addr-manage{
			display: flex;
		}
		.addr-manage span{
			display: block;
			&:first-child{
				flex-grow: 2;
				text-align: center;
				padding-left: 10px;
			}
		}
	}
	.user-order{
		
		margin-bottom: 40px;
		.order-title{
			margin: 0;
			padding: 10px;
			text-align: center;
			border-bottom: 1px solid #eee;
		}
		.order_sn{
			padding: 10px 10px 0;
		}
		.order-goods{
			display: flex;
			justify-content: space-between;
			padding: 10px;
			div{
				&:nth-child(2){
					display: flex;
					flex-direction: column;
				}
				&:last-child{
					display: flex;
					align-items: center;
				}
			}
		}
		.order-status{
			display: flex;
			justify-content: space-between;
			padding: 10px;
			div{
				display: flex;
			}
			a{
				display: block;
				padding: 0 10px;
			    height: 30px;
			    background-color:#AB956D;
			    border-radius: 4px;
			    color: #fff;
			    text-align: center;
			    line-height: 30px;
			    margin-left: 10px;
			    &:first-child{
			    	background: #FF6666;
			    }
			}
			.pay-status-2{
				a{
					background: #F79962;
				}
			}
			.pay-status-3{
				a{
					background: #00CC99;
				}
			}
		}
		img{
			width: 80px;
			height: 80px;
		}
	}
</style>
<template>
	<div class="container-order">
		<mt-header title="订单详情">
	        <router-link to="/me" slot="left">
	          <mt-button icon="back">返回</mt-button>
	        </router-link>
		</mt-header>
		<div class="user-address">
			<div class="addr-detail">
				<div>下单时间：{{order.create_time}}</div>
				<div>订单编号：{{order.order_no}}</div>
				<div>订单状态：<span v-if="order.status == 1">待付款</span><span v-if="order.status == 2">已付款</span></div>
			</div>
		</div>
		<div class="user-address">
			<div class="addr-manage">
				<span>配送地址</span> 
			</div>
			<div class="addr-detail">
				<div v-if="address.name">收货人：{{address.name}}</div>
				<div v-if="address.mobile">电话：{{address.mobile}}</div>
				<div v-if="address.area">小区：{{address.area}}</div>
				<div v-if="address.addr">详细地址：{{address.addr}}</div>
				<div v-if="address.remark">备注：{{address.remark}}</div>
			</div>
		</div>
		<div class="page-cell">
			<div class="cell" v-for="product in products">
		    	<img :src="product.imgSrc" width="70" height="70">
		    	<div class="cell-right">
		    		<div><span>{{product.name}}</span> <span>x{{product.num}}</span></div>
		    		<div> ￥{{product.price}} </div>
		    	</div>	
		    </div>
		</div>
	    <div class="go-order" v-if="order.status == 1">
	    	<div>付款合计： ￥{{order.total_price}}</div>
	    	<div @click="orderDone(order.id)">去付款</div>
	    </div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		data(){
			return {
				products: [],
				address: {},
				userInfo: {},
				order: {}
			}
		},
		methods: {
			orderDone(id){
				this.$router.push('/pay?id='+id);
			},
			getUserInfo(){
				this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
			},
			getOrderDetail(id){
				this.$http.get('/order/detail?id='+id).then((res)=>{console.log(res.data)
					this.order = res.data;
					this.address = JSON.parse(res.data.snap_address);
					this.products = JSON.parse(res.data.snap_items);
				})
			},
			productDetail(id){
				this.$router.push('/productDetail/'+id)
			}
		},
		mounted(){
			this.getOrderDetail(this.$route.params.id);
			this.getUserInfo();
			this.$store.dispatch('hideTabbar');
		}
	}
</script>

<style scoped>
	.container-order{
		background: #ddd;
	}
	.colpr-a{
		color: #aaa;
		font-size: 12px;
	}
	.user-address{
		overflow: auto;
		margin-bottom: 10px;
		background: #fff;
	}
	.addr-manage,.addr-detail div{
		padding: 10px;
		border-bottom: 1px solid #eee;
	}
	.addr-manage{
		display: flex;
	}
	.addr-manage span{
		display: block;
	}
	.addr-manage span:first-child{
		flex-grow: 2;
		text-align: center;
		padding-left: 10px;
	}
	.page-cell{
		height: 100%;
		box-sizing: border-box;
		padding-bottom: 100px;
		background: #fff;
	}
	.cell{
		display: flex;
		padding: 10px;
		border-bottom: 1px solid #eee;
	}
	.cell .mint-checklist-label{
		padding-top: 24px;
		box-sizing: border-box;
	}
	.cell-right{
		display: flex;
		flex-direction: column;
		flex-grow: 2;
		padding-left: 10px;
	}
	.cell-right div:first-child{
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}
	.go-order{
		width: 100%;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		border-top: 1px solid #eee;
	}
	.go-order div{
		padding: 10px;
	}
	.go-order div:first-child{
		flex-grow: 2;
		background: #fff;
	}
	.go-order div:last-child{
		background: #AB956D;
		color: #fff;
	}
</style>
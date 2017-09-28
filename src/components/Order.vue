<template>
	<div class="container-order">
		<mt-header title="订单详情">
	        <router-link to="/cart" slot="left">
	          <mt-button icon="back">返回</mt-button>
	        </router-link>
		</mt-header>
		<div class="user-address">
			<div class="addr-manage">
				<span>配送地址</span> 
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
		<div class="page-cell">
			<div class="cell" v-for="product in products">
		    	<img :src="product.imgSrc" width="70" height="70">
		    	<div class="cell-right">
		    		<div><span>{{product.name}}</span> <span>x{{product.num}}</span></div>
		    		<div> ￥{{product.price}} </div>
		    	</div>	
		    </div>
		</div>
		<div class="ship-fee" v-if="isShip">
			运费：￥3 （满50元免运费）
		</div>
	    <div class="go-order">
	    	<div>付款合计： ￥{{productsPrice}} </div>
	    	<div @click="orderDone">去付款</div>
	    </div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		data(){
			return {
				productsPrice: 0,
				products: [],
				address: {
					name: '',
					mobile: '',
					area: '',
					addr: '',
					remark: ''
				},
				userInfo: {},
				isShip: false
			}
		},
		methods: {
			getStorageProducts(){
				var products = localStorage.getItem('checkTotalProducts');
				var productsPrice = localStorage.getItem('checkTotalPrice');
				this.products = JSON.parse(products);
				if(Math.floor(productsPrice) < 50){
					productsPrice = parseFloat(productsPrice) + 3;
					this.isShip = true;
				}
				this.productsPrice = productsPrice;
			},
			orderDone(){
				if(this.address.name == '' || this.address.mobile == '' || this.address.area == '' || !/1[3458]\d{9}/.test(this.address.mobile)){
		    		Toast({
						message: '请正确填写地址信息',
					    duration: 1200
					});
					return;
		    	}
				var order = {
					user_id: this.userInfo.id,
					total_price: this.productsPrice,
					status: 1,
					total_count: this.products.length,
					snap_address: JSON.stringify(this.address),
					snap_img: this.products[0].imgSrc,
					snap_name: this.products.length>1 ? this.products[0].name+' 等' : this.products[0].name,
					snap_items: JSON.stringify(this.products)
				}
				this.$http.post('/order/done',order).then((res)=>{
					this.merge(order,res.data)
					sessionStorage.setItem('orderData',JSON.stringify(order))

					var cartData = localStorage.getItem('cartData') ? JSON.parse(localStorage.getItem('cartData')) : [];

					for(let i=0;i<cartData.length;i++){
						for(let j=0;j<this.products.length;j++){
							if(cartData[i].id == this.products[j].id){
								cartData.splice(i,1);
							}
						}
					}
					localStorage.setItem('cartData',JSON.stringify(cartData));

					this.$router.push('/pay')
				})
			},
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
			getUserInfo(){
				this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
			}
		},
		mounted(){
			this.getUserInfo();
			this.getUserAddress();
			this.getStorageProducts();
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
	.ship-fee{
		padding: 10px;
		background: #fff;
		padding-bottom: 100px;
	}
	.page-cell{
		/*height: 100%;*/
		box-sizing: border-box;
		background: #fff;
		margin-bottom: 10px;
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
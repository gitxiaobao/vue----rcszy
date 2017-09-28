<template>
	<div class="container">
		<mt-header title="购物车">
	        <router-link to="/" slot="left">
	          <mt-button icon="back">返回</mt-button>
	        </router-link>
		</mt-header>
		<div class="nocart tac" v-if="!products.length">你还没有添加任何商品</div>
		<div class="page-cell" v-if="products.length">
		    <div class="cell" v-for="product in products">
		    	<label class="mint-checklist-label"><span class="mint-checkbox"><input class="mint-checkbox-input" :value="product.id" :checked="product.checkStatus" @click="check(product.id,product.checkStatus)"  type="checkbox"> <span class="mint-checkbox-core"></span></span> <span class="mint-checkbox-label"></span></label>
		    	<img :src="product.imgSrc" width="70" height="70">
		    	<div class="cell-right">
		    		<div><span class="title">{{product.name}}</span> <span>￥{{product.price}}</span></div>
		    		<div>
			    		<div><span class="span-opt" @click="product.num > 1 && opt(-1,product.id)">-</span><input type="text" v-model="product.num" size="3" disabled><span class="span-opt" @click="opt(1,product.id)">+</span></div>
			    		<div><i class="iconfont icon-delete" @click="del(product.id)"></i></div>
		    		</div>
		    	</div>	
		    </div>
		</div>

		<div class="go-order">
	    	<label class="mint-checklist-label"><span class="mint-checkbox"><input class="mint-checkbox-input" :checked="checkAll" @click="checkall(!checkAll)" type="checkbox"> <span class="mint-checkbox-core"></span></span> <span class="mint-checkbox-label">全选</span></label>
	    	<div>下单 | ￥{{checkTotalPrice}}</div>
	    	<div><i class="iconfont icon-yq-jt-r" @click="placeOrder"></i></div>
	    </div>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
		data(){
			return {
				checkAll: true,
				checkTotalPrice: 0,
				checkTotalProducts: [],
				products: []
			}
		},
		methods: {
			opt(state,id){
				var len = this.products.length;
				if(state == -1){
					for(let i=0;i<len;i++ ){
						if(this.products[i].id == id){
							this.products[i].num > 1 && this.products[i].num--;
						}
					}
					this.$root.eventHub.$emit('cartCount',-1)
				}else{
					for(let i=0;i<len;i++ ){
						if(this.products[i].id == id){
							this.products[i].num++;
						}
					}
					this.$root.eventHub.$emit('cartCount',1)
				}
				localStorage.setItem('cartData',JSON.stringify(this.products));
				this.calcCartData()
			},
			check: function(id,status){
				var len = this.products.length;
				for(var i=0;i<len;i++ ){
					if(this.products[i].id == id){
						this.products[i].checkStatus = !status;
					}
				}
				this.calcCartData()
			},
			checkall: function(value){
				var len = this.products.length;
				for(let i=0;i<len;i++ ){
					this.products[i].checkStatus = value;
				}
				this.calcCartData()
			},
			calcCartData: function(){
				var len = this.products.length;
				var checkNum = 0;
				var checkPrice = 0;
				var checkProduct = [];
				for(var i=0;i<len;i++ ){
					if(this.products[i].checkStatus){
						checkNum++;
						checkPrice += Number(this.products[i].price) * 100 * this.products[i].num * 100;
						checkProduct.push(this.products[i])
					}
				}
				this.checkAll = checkNum == len ? true : false;
				this.checkTotalPrice = checkPrice/(100*100);
				this.checkTotalProducts = checkProduct;
			},
			del: function(id){
				MessageBox.confirm('确定删除吗?').then(action => {
					var len = this.products.length;
					var num = 0;
					for(var i=0;i<len;i++ ){
						if(this.products[i].id == id){
							num = this.products[i].num;
							this.products.splice(i,1);
							break;
						}
					}
					localStorage.setItem('cartData',JSON.stringify(this.products));
					this.$root.eventHub.$emit('cartCount',-num)
					Toast({
	  					message: '删除成功',
	  					duration: 1000
					});
					this.calcCartData()
				});
				
			},
			placeOrder: function(){
				if(this.checkTotalProducts.length > 0){
					localStorage.setItem('checkTotalProducts',JSON.stringify(this.checkTotalProducts))
					localStorage.setItem('checkTotalPrice',this.checkTotalPrice)
					localStorage.setItem('cartData',JSON.stringify(this.products));
					this.$router.push('/order')
				}else{
					Toast({
	  					message: '请选择商品',
	  					duration: 1000
					});
				}
			}
		},
		watch: {
			
		},
		mounted(){
			this.products = localStorage.getItem('cartData') ? JSON.parse(localStorage.getItem('cartData')) : [];		
			this.calcCartData();

		    if(!this.$store.getters.tabbarStatus){
		  		this.$store.dispatch('showTabbar')
		  	}
		}
	}
</script>
<style scoped>
	.container{
		height: 100%;
		background: #fff;
	}
	.nocart{
		line-height: 30px;
		color: #aaa;
	}
	.page-cell{
		height: 100%;
		box-sizing: border-box;
		padding-bottom: 100px;
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
		justify-content: space-between;
		flex-grow: 2;
		padding-left: 10px;
	}
	.cell-right input{
		text-align:center
	}
	.cell-right div:first-child{
		display: flex;
		justify-content: space-between;
	}
	.cell-right div:last-child{
		display: flex;
		justify-content: space-between;
	}
	.cell-right div:last-child div{
		margin: 0;
		line-height: 26px;
	}
	.mint-checkbox-input:checked + .mint-checkbox-core {
	    background-color: #AB956D;
	    border-color: #AB956D;
	}
	.go-order{
		width: 100%;
		padding:10px;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 55px;
		background: #AB956D;
		display: flex;
		justify-content: space-between;
		flex-flow: 1;
		color: #fff;
	}
	.go-order .mint-checkbox-input:checked + .mint-checkbox-core {
	    background-color: #AB956D;
	    border-color: #fff;
	}
	.span-opt{
		display: block;
		width: 30px;
		text-align: center;
	}
	.title{
		width: 160px;
	}
</style>
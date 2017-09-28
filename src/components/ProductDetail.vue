<template>
	<div class="container">
		<mt-header title="商品详情">
	        <!-- <router-link to="/home"> -->
	          <mt-button icon="back" slot="left" @click="back()">返回</mt-button>
	        <!-- </router-link> -->
		</mt-header>
		<div class="swipe-banner"><img :src="product.img" ></div>
		<div class="detail">
			<div>{{product.title}}</div>
			<div class="product-stock"><span>已售 {{product.sales>0 ? product.sales : 0}} 件</span> <span>库存：{{product.stock}}</span></div>
			<div class="product-stock">商品价格：￥{{product.price}}</div>
			<div class="desc" v-if="product.summary">{{product.summary}}</div>
		</div>
		<div class="detail-desc" v-if="product.content" v-html="product.content">
		</div>
		<div class="go-add-cart" id="go-add-cart" @click="addToCart()">
	    	<span>加入购物车</span>
	    </div>
	</div>
	
</template>

<script>
	import { Toast } from 'mint-ui';
	import Banner from './home/Banner.vue'
	export default {
		data(){
			return {
				product: [],
				fromPath: ''
			}
		},
		beforeRouteEnter (to, from, next){
			next(vm => {
	          vm.fromPath = from.path
	        })
		},
		methods: {
			getProductDetail(id){
				this.$http.get('/product/'+id).then((res)=>{
					this.product = res.data;
					this.product.img = res.data.img.url;
				})
			},
			addToCart(){
				var data = {
						id: this.product.id,
						imgSrc: this.product.img,
						name: this.product.title,
						price: this.product.price,
						num: 1,
						checkStatus: true
					}
				var cartData = localStorage.getItem('cartData') ? JSON.parse(localStorage.getItem('cartData')) : [];
				var len = cartData.length;
				var temp = false;
				if(len > 0){
					for(var i=0;i<len;i++){
						if(cartData[i].id == data.id){
							cartData[i].num++;
							temp = false;
							break;
						}else{
							temp = true;
						}
					}
				}else{
					cartData.push(data);
				}	
				if(temp) cartData.push(data);
				localStorage.setItem('cartData',JSON.stringify(cartData));
				this.$root.eventHub.$emit('cartCount',1)
				Toast({
					message: '添加成功',
				    iconClass: 'mintui mintui-success',
				    duration: 1200
				});
			},
			back(){
				this.$router.push(this.fromPath)
			}
		},
		components: {
			Banner
		},
		mounted(){
			this.getProductDetail(this.$route.params.id)
		}
	}
</script>

<style scoped>
	.container{
		padding-bottom: 80px;
		background: #eee;
	}
	.swipe-banner{
		/*height: 10rem;*/
	}
	.swipe-banner img{
		width: 100%;
		height: 100%;
	}
	.detail{
		padding: 10px 10px 0;
		background: #fff;
		margin-bottom: 10px;
	}
	.detail div{
		padding-bottom: 10px;
	}
	.product-stock{
		display: flex;
		justify-content: space-between;
		font-size: 14px;
	}
	.detail-desc{
		background: #fff;
		padding: 6px;
		margin-bottom: 100px;
	}
	.detail-desc img{
		width: 100%;
		vertical-align:bottom;
		display:block;
	}
	.desc{
		color: #666;
	}
	.go-add-cart{
		width: 100%;
		padding:10px;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 55px;
		background: #AB956D;
		color: #fff;
		text-align: center;
	}
</style>
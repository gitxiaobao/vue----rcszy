<template>
	<div class="container">
		<mt-header title="分类">
	        <router-link to="/" slot="left">
	          <mt-button icon="back">返回</mt-button>
	        </router-link>
		</mt-header>
		<div class="category">
			<div class="category-left">
				<a @click.prevent="changeCategory(item.id)" :class="{active:isActive == item.id}" v-for="item in prductList">{{item.title}}</a>
			</div>
			<div class="category-right">
				<!-- <img src="../assets/images/1.png" alt=""> -->
				<div class="product-list">
					<div class="product" v-for="product in products" @click="productDetail(product.id)">
						<img v-lazy="product.img.url">
						<div class="title">{{product.title}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		data(){
			return {
				isActive: 0,
				products: [],
				prductList: []
			}
		},
		methods: {
			changeCategory(current){
				this.isActive = current;
				var len = this.prductList.length;
				for(let i=0;i<len;i++){
					if(this.prductList[i].id == current){
						this.products = this.prductList[i].product;
						break;
					}
				}
			},
			getCategoryProducts(){
				this.$http.get('/category').then((res)=>{
					this.products = res.data[0].product;
					this.isActive = res.data[0].id;
					this.prductList = res.data;
				})
			},
			productDetail(id){
				this.$router.push('/productDetail/'+id)
			}
		},
		watch: {
			'$route'(to,from){
				console.log(to,from)
			}
		},
		mounted(){
			this.getCategoryProducts();
		    if(!this.$store.getters.tabbarStatus){
		  		this.$store.dispatch('showTabbar')
		  	}
		}
	}
</script>

<style lang="less">
	.category{
		min-height: 100vh;
		overflow: auto;
		display: flex;
		justify-content: space-between;
		.category-left{
			border-right:1px solid #AB956D;
			width: 80px;
			display: flex;
			flex-direction: column;
			a{
				width: 100%;
				display: block;
				line-height: 50px;
				text-align: center;
				&.active{
					color: #AB956D;
					border-left:2px solid #AB956D;
				}
			}
		}
		.category-right{
			width: 75%;
			padding:6px;
			box-sizing:border-box;
			&>img{
				width: 70px;
			}
			.product-list{
				margin-bottom: 70px;
				display: flex;
				flex-wrap: wrap;
				.product{
					width: 33%;
					padding: 0.4em 0;
					margin-bottom: 0.4em;
					display: flex;
					flex-direction: column;
					text-align: center;
					div{
						padding-top: 0.4em;
					}
				}
				img{
					width: 70px;
					height: 70px;
					border-radius: 50%;
					margin: 0 auto 10px;
				}
			}
		}
		.title{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis
		}
	}
</style>
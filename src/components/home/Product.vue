<template>
	<div class="product">
		<div v-if="newProducts.length > 0">
			<p>最近新品</p>
			<div class="product-list">
				<div class="product" @click="productDetail(product.id)" v-for="product in newProducts">
					<img v-lazy="product.img.url">
					<div class="title">{{product.title}}</div>
					<div>￥{{product.price}}</div>
				</div>
			</div>
		</div>
		<div v-if="hotProducts.length > 0">
			<p>热销商品</p>
			<div class="product-list">
				<div class="product" @click="productDetail(product.id)" v-for="product in hotProducts">
					<img v-lazy="product.img.url">
					<div class="title">{{product.title}}</div>
					<div>￥{{product.price}}</div>
				</div>
			</div>
		</div>
		<div v-if="recommendProducts.length > 0">
			<p>精品推荐</p>
			<div class="product-list">
				<div class="product" @click="productDetail(product.id)" v-for="product in recommendProducts">
					<img v-lazy="product.img.url">
					<div class="title">{{product.title}}</div>
					<div>￥{{product.price}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				newProducts: [],
				hotProducts: [],
				recommendProducts: []
			}
		},
		mounted(){
			this.getNewProducts()
			this.getHotProducts()
			this.getRecommendProducts()
		},
		methods: {
			productDetail(id){
				this.$router.push('/productDetail/'+id)
			},
			getNewProducts(){
				this.$http.get('product/recent?count=10').then((res)=>{
					this.newProducts = res.data
				})
			},
			getHotProducts(){
				this.$http.get('product/type?type=1&count=2').then((res)=>{
					this.hotProducts = res.data
				})
			},
			getRecommendProducts(){
				this.$http.get('product/type?type=2&count=2').then((res)=>{
					this.recommendProducts = res.data
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.product{
		margin-bottom: 70px;
	}
	p{
		text-align: center;
		color: #AB956D;
	}
	.product-list{
		padding: 0.4em;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.product{
			width: 49%;
			padding: 0.4em 0;
			margin-bottom: 0.4em;
			background: #eee;
			display: flex;
			flex-direction: column;
			text-align: center;
			div{
				padding-top: 10px;
			}
		}
		img{
			width: 70px;
			height: 70px;
			border-radius: 50%;
			margin: 0 auto 10px;
		}
	}
	.title{
		height: 46px;
	}
</style>
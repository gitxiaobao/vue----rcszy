<template>
	<div class="swipe-banner">
		<mt-swipe :auto="4000">
		  <mt-swipe-item v-for="item in banners" :key="item.id">
		  	<img :src="item.pic_path"/>
		  </mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				banners: []
			}
		},
		mounted(){
			this.$http.get('/ad/2').then((res)=>{
				this.banners = res.data.ads;
			}).catch((err)=>{
				console.log(err)
			})
		}
	}
</script>

<style scoped lang="less">
	.swipe-banner{
		height: 10rem;
		img{
			width: 100%;
			height: 100%;
		}
	}
</style>
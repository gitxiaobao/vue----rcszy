<template>
	<div class="container">
		<img :src="qrcode">
		<div class="tac"><span>请关注融创食珍园</span></div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				qrcode: require('../assets/images/getqrcode.jpg')
			}
		},
		mounted(){
			this.$store.dispatch('hideTabbar');
		}
	}
</script>
<style scoped>
	.container{
		height: 100%;
		display: flex;
		flex-direction: column;
        align-items: center; 
        justify-content: center; 
	}
	img{
		width: 140px;
		margin: 0 auto;
		display: block;
	}
</style>
<template>
	<div class="container">
		<!-- <mt-button size="small" @click="clear()">清除缓存</mt-button> -->
		<Banner></Banner>
		<!-- <Theme></Theme> -->
		<Product></Product>
		
	</div>
</template>

<script>
	import Banner from './home/Banner.vue'
	import Theme from './home/Theme.vue'
	import Product from './home/Product.vue'

	export default {
		components: {
			Banner,
			Theme,
			Product
		},
		methods: {
			clear(){
				localStorage.clear();
			}
		},
		watch: {
			'$route'(to, from){
				console.log(3232)
			}
		},
		mounted(){
		    if(!this.$store.getters.tabbarStatus){
		  		this.$store.dispatch('showTabbar')
		  	}
		}
	}
</script>

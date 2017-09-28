<template>
	<div class="tabbar">
		<mt-tabbar v-model="selected" fixed>
			<mt-tab-item id="home">
				<i slot="icon" class="iconfont icon-wxbzhuye"></i>
				主页
			</mt-tab-item>
			<mt-tab-item id="category">
				<i slot="icon" class="iconfont icon-all"></i>
				分类
			</mt-tab-item>
			<mt-tab-item id="cart">
				<i slot="icon" class="iconfont icon-cart"></i>
				<mt-badge size="small" color="#AB956D" v-if="cartCount > 0">{{cartCount}}</mt-badge>
				购物车
			</mt-tab-item>
			<mt-tab-item id="me">
				<i slot="icon" class="iconfont icon-account"></i>
				我的
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
import '../assets/font/iconfont.css'
import {mapGetters} from 'vuex'

export default {
	data(){
		return {
			selected: 'home',
			cartCount: 0
		}
	},
	computed: mapGetters([
		'selectedValue'
	]),
	watch: {
		selected: function(newValue,oldValue){
			var path = newValue != null ? newValue : oldValue;
			this.$router.push('/' + path);
			sessionStorage.clear()
			newValue != null && sessionStorage.setItem('selected', path)
		},
		'$route'(to,from){
			var home = to.path.replace('/','');
			if(home == 'home'){
				sessionStorage.setItem('selected', home)
				this.selected = home;
			}
		}
	},
	mounted(){
		var cartData = localStorage.getItem('cartData') ? JSON.parse(localStorage.getItem('cartData')) : [];
		var len = cartData.length;
		var cartTempCount = 0;
		for(var i=0;i<len;i++){
			cartTempCount += cartData[i].num;
		}
		this.cartCount += cartTempCount;
		this.$root.eventHub.$on('cartCount',(cartCount)=>{
			this.cartCount += cartCount;
		})
		if(this.selectedValue){
			this.selected = this.selectedValue;
		}else{
			var sessionStorageSelected = sessionStorage.getItem('selected');
			if(sessionStorageSelected){
				this.selected = sessionStorageSelected;
			} 
		}
	}
}
</script>

<style>
	.tabbar{
		margin-top: 10px;
	}
	.mint-tab-item{
		position: relative;
	}
	.mint-badge{
		position: absolute;
		right: 18px;
		top: 3px;
	}
</style>
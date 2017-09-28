<template>
	<div class="container">
		<mt-field label="姓名" class="bb-1" required v-model="address.name"></mt-field>
		<mt-field label="电话" class="bb-1" required v-model="address.mobile"></mt-field>
		<a class="mint-cell mint-field bb-1">
			<div class="mint-cell-left"></div>
			<div class="mint-cell-wrapper">
				<div class="mint-cell-title"><span class="mint-cell-text">小区</span></div>
				<div class="mint-cell-value">
					<!-- <mt-picker :slots="areaSlot"  @change="onAreaChange" :visible-item-count="1"></mt-picker>
					<div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
					<span class="mint-field-state is-default"><i class="mintui mintui-field-default"></i></span>
					<div class="mint-field-other"></div> -->
					<select v-model="address.area" id="" class="area-select">
						<option :value="a" v-for="(a,i) in areas">{{a}}</option>
					</select>
				</div>
				<!-- <mt-badge color="#AB956D" size="small">滑动选择</mt-badge> -->
			</div>
			<div class="mint-cell-right"></div>
		</a> 
		<mt-field label="详细地址" class="bb-1" required v-model="address.addr"></mt-field>
		<mt-field label="备注" class="bb-1" required v-model="address.remark" type="textarea" rows="4"></mt-field>
		<br>
		<mt-button size="large" type="primary" @click="saveAddress">保存</mt-button>
		<br>
		<mt-button size="large" type="default" @click="cancel">取消</mt-button>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		data(){
			return {
				areas: [],
				address: {
					user_id: 0,
					name: '',
					mobile: '',
					area: '',
					addr: '',
					remark: ''
				},
		        areaSlot: [{
		          flex: 1,
		          values: [],
		          className: 'slot1'
		        }]
			}
		},
		methods: {
			cancel(){
				this.$store.dispatch('selectedValue',{
					'selected': 'me'
				})
				this.$router.back()
			},
			onAreaChange(picker, values) {console.log(this.areaSlot[0].values,values,this.value)
		        this.address.area = values[0];
		    },
		    saveAddress(){
		    	if(this.address.name == '' || this.address.mobile == '' || this.address.area == '' || !/1[3458]\d{9}/.test(this.address.mobile)){
		    		Toast({
						message: '请正确填写地址信息',
					    duration: 1200
					});
					return;
		    	}
		    	this.$http.post('/user/address/add',this.address).then((res)=>{
		    		this.$store.dispatch('selectedValue',{
						'selected': 'me'
					})
					this.$router.back()
		    	})
		    },
		    getArea(){
		    	this.$http.get('/area').then((res)=>{
					// this.areaSlot[0].values = res.data;
					if(this.address.area == ''){
						this.address.area = res.data[0];
					}
					this.areas = res.data;
				})
		    },
		    getAddress(){
		    	if(localStorage.getItem('addressData') != null){
		    		this.address = JSON.parse(localStorage.getItem('addressData'));
		    	} 
		    },
			getUserInfo(){
				var userInfo = JSON.parse(localStorage.getItem('userInfo'));
				this.address.user_id = userInfo.id;
			}
		},
		mounted(){
			this.getUserInfo();
			this.getAddress();
			this.getArea();
			this.$store.dispatch('hideTabbar');
		}
	}
</script>

<style>
	.container{
		height: 100%;
	}
	.mint-cell:last-child{
		background-image: none;
	}
	.picker-center-highlight:before, .picker-center-highlight:after{
		background-color: initial;
	}
	.mint-button--primary{
		background-color: #AB956D;
	}
	.area-select{
		width: 100%;
		border: none;
	}
</style>
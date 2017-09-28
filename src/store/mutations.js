
import {
	SHOW_TABBAR,
	HIDE_TABBAR,
	SELECTED_VALUE,
	SHOW_LOADING,
	HIDE_LOADING
} from './mutation_types'

const state = {
	tabbarStatus: true,
	selectedValue: '',
	loading: false
}

const mutations = {
	[SHOW_TABBAR](state){
		state.tabbarStatus = true;
	},
	[HIDE_TABBAR](state){
		state.tabbarStatus = false;
	},
	[SELECTED_VALUE](state,value){
		state.selectedValue = value.selected;
	},
	[SHOW_LOADING](state){
		state.loading = true;
	},
	[HIDE_LOADING](state){
		state.loading = false;
	}
}

export default {
	state,
	mutations
}
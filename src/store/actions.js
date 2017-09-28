
import * as types from './mutation_types'

export default {
	showTabbar: ({commit}) => {
		commit(types.SHOW_TABBAR)
	},
	hideTabbar: ({commit}) => {
		commit(types.HIDE_TABBAR)
	},
	selectedValue: ({commit},value) => {
		commit(types.SELECTED_VALUE,value)
	},
	showLoading: ({commit}) => {
		commit(types.SHOW_LOADING)
	},
	hideLoading: ({commit}) => {
		commit(types.HIDE_LOADING)
	}
}
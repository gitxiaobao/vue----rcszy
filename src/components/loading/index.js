const LoadingComponent = require('./Loading.vue');

export default {
	install: function(Vue){
		Vue.component('Loading',LoadingComponent)
	}
}
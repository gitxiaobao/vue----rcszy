export default {
	install(Vue,options){
		Vue.prototype.merge = function(target, source) {
	        for (var obj in source) {
	            target[obj] = source[obj];
	        }
	        return target;
	    }
	    Vue.prototype.GetQueryString = function(name)
		{
		     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		     var r = window.location.search.substr(1).match(reg);
		     if(r!=null)return  unescape(r[2]); return null;
		}

	}
}
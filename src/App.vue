<template>
  <div id="app">
    <!-- <Loading v-if="loading"></Loading> -->
     <!-- <transition enter-active-class="bounceInLeft" leave-active-class="bounceOutRight">   class="animated"-->
      <router-view></router-view>
    <!-- </transition> -->
  	<Tabbar v-if="tabbarStatus"></Tabbar>
  </div>
</template>

<script>

import Tabbar from './components/Tabbar.vue'
import {mapGetters} from 'vuex'
import { MessageBox } from 'mint-ui';
import {APPID} from './setting'
export default {
  name: 'app',
  data(){
  	return {
  		
  	}
  },
  computed: mapGetters([
    'tabbarStatus',
    'loading'
  ]),
  methods : {
    isweixin() {
      const ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          return true;
      } else {
          return false;
      }
    },
    GetQueryString(name)
    {
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
    }
  },
  components:{
  	Tabbar
  },
  mounted(){
    if(!localStorage.getItem('userInfo')){
      //if(this.isweixin()){
        if(this.GetQueryString('code') == null){
          var $code_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+APPID+"&redirect_uri="+encodeURIComponent(location.href)+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
          window.location.href = $code_url;
        }else{
          var code = this.GetQueryString('code');
          this.$http.get('/oauth?code='+code).then((res)=>{
            if(!res.data.subscribe){
              MessageBox.alert('请关注融创食珍园公众号后，再购买！', '提示').then(action => {
                this.$router.replace('subscribe')
              }) 
            }else{
              localStorage.setItem('userInfo',JSON.stringify(res.data));
            }
          })
        }
    //}
    }
  }
}
</script>

<style>
  a{
    text-decoration: none;
    color: #000;
  }
 /* html,body,#app{
    height:100%;
  }*/
  #app{
    padding-bottom: 10px;
  }
  .bb-1{
    border-bottom: 1px solid #eee;
  }
  .mint-header{
    background: #AB956D;
  }
  .tac{
    text-align: center;
  }
</style>

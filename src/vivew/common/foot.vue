<template>
  <div>
    <nav :class="['kd-toolbar',{'hide-toolbar':nav_up}]">
      <!--<a id="toggle-to-hide-toolbar" class="icon kd-toolbar-toggle" @click="changePush"></a>-->
      <!--<div class="active_effect" :style="{ left: dom_index * 20 + '%'}" v-show="active_show"></div>-->
      <!--<ul class="kd-toolbar-inner" :style="'background:' + $store.state.basic.main_color">-->
      <ul class="kd-toolbar-inner" style="background: white;">
          <!-- router-link-exact-active active -->
          <li class="kd-toolbar-item" v-for="(item,k) in navs" :key="k">
              <a href="javascript:;" @click="navSel(k)" :class="[k==nav_selected?'this-selected':'']">
                  <template v-if="item.title=='发现'">
                      <span :class="[item.class]">
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAgCAYAAABQISshAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjM0RDYwNDMxOEZFMTFFOTg4MTJEQkZBNkIzMEEwQjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjM0RDYwNDQxOEZFMTFFOTg4MTJEQkZBNkIzMEEwQjIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NzY1Q0IzQzE4RkQxMUU5ODgxMkRCRkE2QjMwQTBCMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MzRENjA0MjE4RkUxMUU5ODgxMkRCRkE2QjMwQTBCMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkIn58wAAAVeSURBVHjazFkNTJVVGH4uaKXIj4slocYKhwzMBLOJJmaylZBIpkSlFZQWqxTESpY5Vy2tZc5GWlkMS5cGYfxOwRwCamngZAJRWiEgKKkoiGbA7Xm/79y6EH/CvVze7fl+Dh/fOc933vO+z3uuwWg0wsI2loglgtS1E2Gn/iadtRKXiXIinfiIuNbfTg0WJPIisZoYjfxDQMkJoLISqK4Gmps5VGLEMMBxBHC7G+A9Hph4D+DnLwMoJmKIQlsSmUskorTCFRk5QMFh4O+/2NQmb9fPUGeD2bWp3ZnEHgoGol6Qdx1X76saSCLiLt8SYUhIAtL2/H+gvSFiahtiDyyOBMIXieu9SmwcCCL8jChB+r47sZsEqmvaD6ovREz3gQ8A8W9LHynEQmsSGU6cQupeN2z5qv0gLEFE7sd6AKELgJD5WWx8pLfucaNWgt25bti8A1azqj/otNr7Q4jN1iDyNTL2e+Lj7bC61Z0BVi6Vq2higSWJ3E9EIH0/BszKGMQS1svVNuImSxHZia3JwO/VGFDLTgVy0mRdfnYjRG4j1hE/yuQSmeqZuVqi+2YPbGJZEuXxZHezMsQsEmUTgSg8bkDZKWblWjrTpBDMmZ7I9slI4OKzvJzpnZ2kmik+PBT+ASt5925XRITlb0jNG4Xt/OINl1XYJMbIBOFuwgf5RbCpFeSCRJ7pjkgiMgpHISFFH/ytzgx60wBfT2CKjwT3fOQd9ceFS913tHGtfl7xZvfPbdig9xMXc2NEjv0gR8/uXCsM2Yf1u4cDgNcWyeAPErIgPifex9VeiNMJ3r0bkK9v32ak/iw1c4M9nFy8ePdLZ0QccFJptHkz5Bilwp3JxqPmHAaFnTnNosBlZmdE7DRt4Dhcv6s4rc1Lh2ec0Xil505O/Awq4J6fKy3V0Rdr1Nx7dFeuVYWZ/h5Iy2eZQ4TOeJxt3yu3ghYMrrf03EnsWqWberC4OKWr+mAt2jhu7iqPxGB5OODuythFWbB+m0Eln3fUM01aQTQYrLlJjq5dEfmOyED4bHIdyizKXLgqQci8oQqdJgy7ZXAQyUqW4/MSjDsmR3MZ/xPSCyZjF6u8uj9JkVxCA4FXIhjXlpNOU3u53ZUEt4SMN73/3zaza0cn4ClW1XMjOEhMImo6q0cyNen81lbgQJH+j/Yk1NryX5K0JRF7O30s0ha5jJo4qpE344hzHbWWFDErsGZJK54Lo6tx9lrbBodbPcjSJP2ofhZL2gSkJjnyqqi7CtFDlZr3Ygv9MmWvbWdEPnfmERmXFCjvIfXLkUhUCmE1CU2dta4rGV9JTNH2pqIX1mLTKmD2VHZisNFsBMtR1gR9Hl6Y/3QzguYpmb9L24rqqR6RfOKOCeOiEb+kHrlfMAAwug1kFJOPt0LTcfGqRQi9jOBwVXzJlhhG9raw+kTVKo9i2eIyZHxqRGwkdZOX9WcpSNt7+NUsQTtpMurIARNTbQezr9tBIhOkBg3VXpzMYHeQC7GcMsXYZrk14uAAJO8zasJVV77i7ncgbYcBO5mzGy8Cc1jOv7Sm1hI7jdPUtAdqpHLyWAQxjxYfAy419H+x+93HWPoYHYoFa3kJ33uIBBr0jzSdbh7/oYwh3GDhTWwfLXwzNGhfrrbODmWcpQqK1fJyfZvn2tX+JURtm9WFvvAEELFUGl8nPjAYrVu+zpKvRQSoxOWAs6wrKkmoikq7nuXB+XrgAtfvxfO6lmq9Dlxp1LdQxbUcmSqcuCzcxzAp3MV16Qd4TxQCUmk9q9YPrE2kM203Tf3k4K9+dnDVSgVAQqG9Wr2mCCIDllQuu+JSFHF6kabqpevmL/5HgAEAxaRs5AzfgLAAAAAASUVORK5CYII=" style="width: 27px;height: 17px;" v-if="k==nav_selected">
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAgCAYAAABQISshAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkFDQzUzNTExOTAzMTFFOTg4MTJEQkZBNkIzMEEwQjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkFDQzUzNTIxOTAzMTFFOTg4MTJEQkZBNkIzMEEwQjIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGQUNDNTM0RjE5MDMxMUU5ODgxMkRCRkE2QjMwQTBCMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGQUNDNTM1MDE5MDMxMUU5ODgxMkRCRkE2QjMwQTBCMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmsbsZIAAAfySURBVHja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" style="width: 27px;height: 17px;" v-else>
                      </span>
                      <span class="show-title">{{item.title}}</span>
                  </template>
                  <template v-else>
                      <span :class="['iconfont',item.class]" v-html="item.icon"></span>
                      <span class="show-title">{{item.title}}</span>
                  </template>
              </a>
          </li>
      </ul>
    </nav>

    <!--游戏规则-->
    <gameRule/>
    <!-- <service /> -->

    <!--客服-->
    <transition name="bounce2">
    <div class="promptbox-wrapper" v-if="s_open = $store.state.service">
     <!--客服-->
     <section class="promptbox prompt-service">
         <div class="prompt-head" :style="{background: $store.state.basic.main_color }">客服</div>
         <div class="prompt-body">
           <!-- <a href="weixin://">12312312312</a> -->
            <div v-if="online">

            <ul class="nostyle prompt-service__list" v-if="hb == 1">
              <li class="prompt-service__item prompt-service__item--redpack prompt-service__item1" @click="$store.state.service=false;$router.push('/My/chart')">
                <i class="icon icon-redpack-2 icon--large" ></i>
                <p class="prompt-service__intro">
                  <span>聊天室 抢红包</span>
                  <i class="icon prompt-service__status"></i>
                </p>
                <i class="icon prompt-service__arrow"></i>
              </li>
            </ul>

             <template v-for="(item,key) in online">
               <template v-for="item1 in item" v-if="item1 != ''">
                  <ul class="nostyle prompt-service__list" v-if="key == 'online_service'">
                     <li class="prompt-service__item prompt-service__item--chat" ><i class="icon icon-chat icon--large"></i>
                         <p class="prompt-service__intro"><span>在线客服</span> <i class="icon prompt-service__status"></i></p>
                         <i class="icon prompt-service__arrow"></i>
                         <a :href="item1" class="kd-cover-hidden"></a>
                     </li>
                 </ul>
                 <ul class="nostyle prompt-service__list" v-if="key == 'qq_service'">
                     <li class="prompt-service__item prompt-service__item--qq">
                       <i class="icon icon-qq-im icon--large"></i>
                       <p class="prompt-service__intro"><span>QQ客服</span> <i class="icon prompt-service__status"></i></p>
                       <i class="icon prompt-service__arrow"></i>
                       <a v-if="phone" :href="'mqqwpa://im/chat?chat_type=wpa&uin='+item1+'&version=1&src_type=web&web_src=oicqzone.com'" class="kd-cover-hidden"></a>
                       <a v-else :href="'tencent://message/?uin='+item1+'&Site=web&Menu=yes'" class="kd-cover-hidden"></a>
                     </li>
                 </ul>
                 <ul class="nostyle prompt-service__list" v-if="key == 'wx_service'"> <!--wxbox(item1)-->
                   <li class="prompt-service__item prompt-service__item--wx" :data-clipboard-text="item1"  @click="copy(item1)">
                     <i class="icon icon-weixin icon--large"></i>
                     <p class="prompt-service__intro"><span>微信客服</span> <i class="icon prompt-service__status"></i></p>
                     <i class="icon prompt-service__arrow"></i>
                   </li>
                 </ul>
              </template>
             </template>
           </div>
           <div style="text-align:center;line-height:2rem;" v-else>
             <mt-spinner type="triple-bounce" :color="$store.state.basic.main_color"></mt-spinner>
           </div>
         </div>
         <a href="javascript:;" class="prompt-close kd-close" @click="$store.state.service=false">close</a>
      </section>
     <div class="promptbox-overlay" @click="$store.state.service=false"></div>
    </div>
  </transition>
  </div>
</template>

<script>
import gameRule from '../home/common/gameRule';
import Clipboard from 'clipboard';
export default {
  components:{
    gameRule
  },
  mounted(){
    this.judgePhone();
  },
  data () {
    return {
      s_open: false,
      nav_up: false,
        nav_selected:0,
      dom_index: 0,
      active_show: true,
      navs: [
          {title:'首页',href:'/',icon:'&#xe66e;',class:'shouye'},
          {title:'开奖',href:'/My/allCode',icon:'&#xe672;',class:'kaijiang'},
          {title:'',href:'/goucai?selected=1',icon:'&#xe66f;',class:'goucai'},
          {title:'发现',href:'/findCentre',icon:'&#xe77f;',class:'youhui'},
          // {title:'客服',href:'',icon:'icon-online-service-toolbar animated infinite bounce'}
          {title:'会员中心',href:'/My',icon:'&#xe671;',class:'huiyuan'}
        // {title:'首页',href:'/',icon:'icon-home'},
        // {title:'游戏大厅',href:'/Trade/0',icon:'icon-sel-home'},
        // {title:'合买大厅',href:'/With',icon:'icon-sel-hemai'},
        // {title:'优惠/资讯',href:'/Discount',icon:'icon-gift'},
        // // {title:'客服',href:'',icon:'icon-online-service-toolbar animated infinite bounce'}
        // {title:'会员中心',href:'/My',icon:'icon-user-center'}
      ],
      //是否是手机登录
      phone:false,
      //在线客服内容
      online:false,//{
        // online_service:[''],
        // qq_service:[''],
        // wx_service:[''],
        //},
      //聊天室红包开关
      hb:0,
    }
  },

  computed:{

  },
  watch: {
    s_open(){
      this.onlineService();
    },
    $route(to) {
        var path = to.path;
        if(path == '/')
        {
            this.nav_selected = 0;
        }
        else if(path == '/My/allCode' || /My\/open/.test(path))
        {
            this.nav_selected = 1;
        }
        else if(path == '/goucai')
        {
            this.nav_selected = 2;
        }
        else if(path == '/findCentre')
        {
            this.nav_selected = 3;
        }
        else if(path == '/My')
        {
            this.nav_selected = 4;
        }
        else
        {
            this.nav_selected = 5;
        }
      this.active_show = false;
      if('meta' in to){
        if('index' in to.meta && to.meta.index < 5){
          this.dom_index = to.meta.index;
          this.active_show = true;
        }
      }
    },
  },
  methods:{
    //复制功能
    copy(val) {
        let clipboard = new Clipboard('.prompt-service__item--wx'),_this = this;
        clipboard.on('success', e => {
          _this.$total({ message:'成功复制微信号（'+ val +'）',duration:2000,type: 1 });

          if(_this.phone){

            _this.$messagebox.confirm('您成功复制微信号 '+ val +'，前往微信添加好友？', '提示').then(() =>{
              window.location.href='weixin://';
            }).catch(()=>{

            });

          }
          // 释放内存
          clipboard.destroy();
        })
        clipboard.on('error', e => {
          _this.$total({ message:'该浏览器不支持自动复制',duration:1000,type: 0 });
          // 释放内存
          clipboard.destroy();
        })
      },
    //判断是否手机登录
    judgePhone(){
      let ua = navigator.userAgent;
      let ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
      isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
      isAndroid = ua.match(/(Android)\s+([\d.]+)/),
      isMobile = isIphone || isAndroid;
      if(isMobile){
        this.phone = true;
      }
    },
    changePush:function(){
      this.nav_up = !this.nav_up;
      this.$parent.changeDonw();
      this.$store.state.up = !this.$store.state.up;
    },
    navSel:function(key){
        this.nav_selected = key;
      if(this.navs[key]['href'] == ''){
        this.onlineService();
      }else{
        this.$router.push(this.navs[key]['href']);
      }
    },
    onlineService(){//请求客服内容
      let _this = this;
      // _this.$store.state.service = !_this.$store.state.service;
      if(_this.$store.state.service && _this.online == false){
        _this.$getData({
          loding:true,
          url:'/api/home/in/onlineService',
          data:{type:2},
          type:'post',
          callback:function(res){
            if(res){
                console.log(res);
              _this.$set(_this,'online',res.online);
              _this.hb = res.hb;
            }
          }
        });
      }
    },
    // wxbox(val){
    //   // console.log(val);
    //   // 'url(http://' + ('api_path' in this.$store.state && this.$store.state.api_path ? this.$store.state.api_path : this.$store.state.basic.static_path) + item.img_url + ')'
    //   let _this = this;
    //   _this.$messagebox({
    //     title: '微信扫码',
    //     message: '<img src="http://'+ ('api_path' in this.$store.state && this.$store.state.api_path ? this.$store.state.api_path : this.$store.state.basic.static_path) + val +'">',
    //     showCancelButton: false,
    //   });
    // }
  }
}
</script>

<style scoped>
    @import "../../assets/ali_icon/iconfont.css";
    .kd-toolbar{
        z-index: 6 !important;
    }
    .kd-toolbar-inner a{
        color: #777;
    }
    .kd-toolbar-inner{
        border-top: 1px solid #eee;
        padding-top: 3px;
        height: auto;
    }
  .prompt-service__item1{
    color:red;
  }
  .this-selected{
      color: red !important;
  }
  .shouye,.kaijiang,.youhui,.huiyuan{
      display: block;
      font-size: 1.5rem;
      margin-bottom: 3px;
  }
  .goucai{
      display: block;
      position: absolute;
      background: white;
      border-top: 1px solid #eee;
      border-radius: 50%;
      top: -5px;
      left: 43.75%;
      color: red;
      font-size: 3.625rem;
      z-index: 999;
  }
  .active_effect{
    position: absolute;
    left:0;
    transition: left 0.2s ease-in-out;
    background-color: rgba(0,0,0,.08);
    width:20%;
    height:100%;
  }
  #toggle-to-hide-toolbar{
    margin-bottom: 0;
  }
</style>

<template>
  <div>
      <template v-if="$route.meta.index=='gameApi' || $route.meta.index=='memberCenter' || $route.meta.index=='hddt' || $route.meta.index=='hmdt' || $route.meta.index=='hongbao'">

      </template>
      <template v-else-if="$route.meta.index=='goucai'">
          <div style="width: 100%;height: 50px;background: red;line-height: 50px;">
              <div class="gameApi-head">
                  <a class="for-back" @click="$router.back()"><i data-v-81846358="" class="icon icon-nav-arrow-left"></i></a>
                  <div class="top-title">
                      <div :class="['at-left',$route.query.selected==1?'this-selected':'not-selected']" @click="$router.push({path:'/goucai?selected=1'})">彩票</div>
                      <div :class="['at-right',$route.query.selected==2?'this-selected':'not-selected']" @click="$router.push({path:'/goucai?selected=2'})">游戏</div>
                  </div>
              </div>
          </div>
      </template>
      <template v-else-if="$route.meta.index=='showTrend'">
          <header class="kd-head" :style="'background:' + $store.state.basic.main_color + ';-webkit-box-shadow: 0 1px 0 ' + $store.state.basic.main_color + ';box-shadow: 0 1px 0 ' + $store.state.basic.main_color + ';'">
              <a class="kd-head-item menu-back-toggle">
                  <i class="icon icon-nav-arrow-left" @click="$router.back()"></i>
              </a>
              <span :class="['kd-head-item head-title',{'game-title':$route.path.indexOf('trend') > -1}]" @click="alertAction('trend')">{{ $store.state.title }}</span>

              <!-- :href="'#/in?url='+$route.path" -->
              <a :href="$store.state.login ? 'javascript:;':'#/in?url='+$route.path" class="kd-head-item go-to-login">
                  <span class="text" v-if="!$store.state.login">登录</span>
                  <a href="javascript:;" class="kd-head-item userinfo" v-else @click="submenu=!submenu">余额<br>{{ $store.state.user ? $store.state.user.money : '00.00' }}</a>
                  <i v-if="!$store.state.login || ($store.state.login && $store.state.user['photo'] == 0) || !$store.state.user['photo']" class="icon icon-user-circle" style="font-size: 35px" ></i>
                  <img v-else class="icon icon-user-circle" style="width:40px;border-radius:50%;" :src="require('@/assets/images/photo/'+ ($store.state.user['photo'] > 0 ?$store.state.user['photo'] : '0') +'.png')" @click="submenu=!submenu"/>
              </a>
              <transition name="bounce1">
                  <ul id="sub-menu-dropdown" class="nostyle sub-menu" v-show="submenu">
                      <li><a href="#/My" >会员中心</a></li>
                      <li><a href="#/My/photo"> 更改头像 </a></li>
                      <li><a href="javascript:;" @click="loginOut">安全退出</a></li>
                  </ul>
              </transition>
          </header>
      </template>
      <template v-else>
          <header class="kd-head" :style="'background:' + $store.state.basic.main_color + ';-webkit-box-shadow: 0 1px 0 ' + $store.state.basic.main_color + ';box-shadow: 0 1px 0 ' + $store.state.basic.main_color + ';'">

              <template v-if="$store.state.login && $route.meta.index < 5">
                  <a class="kd-head-item menu-back-toggle" @click="changePush">
                      <div class="my-shou-cang">
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAgCAYAAAB3j6rJAAACfklEQVRYR72YS6gOYRjHf38pNiS341ZuKWWBKDsJWXA2ctgo4iDHgizEwklIiGKBjVuUBSelcCQslLK1YnPKLcd1IYok/npOkzK++eab+S5PTbOY533+v973ef8z74g6wvZg4CIwDuiS1Fe2nMoOjHG2u4AzSY1eSSvK1isNYjvGxgxMS8QNTJb0ugxMPSDLgdsp0eOSdrUa5B6wNCX6BRgr6UdRmFIzYnsm8CxDbIuks60COQd0Zog9lTSr6SC2RwL9wJAqYoskPSwCU3hpbHcDB3JErkvqaBpIYmBvoiFzRH4DEyS9rxUmc0YS0bbENccn9wXAphqL3wR6gXfJ9TbuWTtKttuBhYlQWHVcITwKKLx0NUB+TsMNANr+DgytoUBTUwLkPrCkqSr5xfsCZAQQvrAqP78pGS+BxX97wPYRYHdTpLKLPgGWSfr4TzPaXgtcBga1AOgO0CHpW2j9tyuSXdTT5Aa+AGyWFH4zEBW3p+35wF0g7LzRsVfSoXTRaoY2CbgFzG4QyU9gg6QrlepVNSzb8WJ7DMxtAEynpFiSipHrnLbDmsNt642dkk6WArE9PfkurRcixvdIWlMWZCNwvhEUwAtJU8uCXALWNQgkyrRJ+lCmWZ8DUxoIslLSjUIgtgMgQPIijhQPgP3AsJzko5L2FAXZBpyuUji+vnZIuho5tscAh4Hoq6zdmHkarGZo14DVFUB+JYDhkF/Tz22HAUaDz6swtl/SxKIzkvaPODTFG/qUpE/VliA5jq4HjgGjU7kVGzbrXZPuj+iBrUVP+7aHA/uA7UD8OYhol5Q+qmZ/k9o+AcwBuiU9yuvYnBmaARxMmjl+X7xK5/8BJq7QhyPq4poAAAAASUVORK5CYII=" style="width: 18px;">
                      </div>
                      <!--<i class="icon icon-nav icon-account-setting-b"></i>-->
                      <span class="line-check-title" style="margin-left: 20px;padding-top: 10px;display: inline-block">我的收藏</span>
                  </a>
              </template>
              <template v-if="$route.meta.index < 5">
                  <a href="javascript:;" class="kd-head-item logo"><img :src="'' + ('api_path' in $store.state && $store.state.api_path ? $store.state.api_path : $store.state.basic.static_path) + $store.state.basic.logo_path"></a>
              </template>
              <template v-if="$route.meta.index > 4">
                  <a class="kd-head-item menu-back-toggle">
                      <i class="icon icon-nav-arrow-left" @click="$router.back()"></i>
                  </a>
                  <span class="kd-head-item categories-switch"  v-if="$store.state.official" @click="$store.state.offopen = !$store.state.offopen">
                  <span class="categories-switch-name">玩法</span>
                  <a href="javascript:;" :class="['categories-switch-value',{opened:$store.state.offopen}]">{{$store.state.offtxt}}</a>
                </span>
                  <span v-else :class="['kd-head-item head-title',{'game-title':$route.path.indexOf('game-') > -1}]" @click="alertAction">{{ $store.state.title }}</span>
              </template>

              <!-- :href="'#/in?url='+$route.path" -->
              <a :href="$store.state.login ? 'javascript:;':'#/in?url='+$route.path" class="kd-head-item go-to-login">
                  <span class="text" v-if="!$store.state.login">登录</span>
                  <a href="javascript:;" class="kd-head-item userinfo" v-else @click="submenu=!submenu">余额<br>{{ $store.state.user ? $store.state.user.money : '00.00' }}</a>
                  <i v-if="!$store.state.login || ($store.state.login && $store.state.user['photo'] == 0) || !$store.state.user['photo']" class="icon icon-user-circle" style="font-size: 35px" ></i>
                  <img v-else class="icon icon-user-circle" style="width:40px;border-radius:50%;" :src="require('@/assets/images/photo/'+ ($store.state.user['photo'] > 0 ?$store.state.user['photo'] : '0') +'.png')" @click="submenu=!submenu"/>
              </a>
              <transition name="bounce1">
                  <ul id="sub-menu-dropdown" class="nostyle sub-menu" v-show="submenu">
                      <template v-if="$route.path.indexOf('game-') > -1">
                          <li><a href="javascript:;" @click="alertAction" >选择游戏</a></li>
                          <li><a href="#/My/record" >下注记录</a></li>
                          <li><a :href="'#/My/open/'+$route.params.id" >开奖记录</a></li>
                          <li v-if="$route.path.indexOf('game-pc/betting') > -1"><a href="javascript:;" @click="$store.state.trend_pc = true;submenu = false" >走势图</a></li>
                          <li><a :href="'#/trend/'+$route.params.id" >历史走势</a></li>
                          <li><a href="javascript:;" @click="$store.state.game_rule = $route.params.id;submenu=false">游戏规则</a></li>
                      </template>
                      <li v-else-if="$route.path.indexOf('trend') > -1" @click="$router.back()"><a href="javascript:;">返回游戏</a></li>
                      <li><a href="#/My" >会员中心</a></li>
                      <li><a href="#/My/photo"> 更改头像 </a></li>
                      <li><a href="javascript:;" @click="loginOut">安全退出</a></li>
                  </ul>
              </transition>
          </header>

      </template>
      <!--右侧聊天室导航栏开关-->

      <div style="width: 100%;max-width: 640px;position: fixed;bottom:50%;">
          <div v-if="!$store.state.chart_chg &&  $store.state.chart_open" :class="['w_chart_room',{'list':true}]" @click="$store.state.chart_chg = !$store.state.chart_chg">计划聊天室</div>
      </div>

      <!--右侧聊天室栏-->
      <nav class="kd-menu-wrapper w_chart_wrapper">
          <div class="close-menu close-menu-w" :style="'background:' + $store.state.basic.main_color + ';-webkit-box-shadow: 0 1px 0 ' + $store.state.basic.main_color + ';box-shadow: 0 1px 0 ' + $store.state.basic.main_color + ';'" v-on:click="$store.state.chart_chg = false">
              <i class="icon"></i>
              关闭
          </div>
          <div class="kd-menu-w kd-scrollable">
              <charSet style="height:100%;" v-if=" $store.state.chart_open"/>
          </div>
      </nav>


      <!--头部左侧导航栏-->
      <nav class="kd-menu-wrapper">
          <div class="close-menu" :style="'background:' + $store.state.basic.main_color + ';-webkit-box-shadow: 0 1px 0 ' + $store.state.basic.main_color + ';box-shadow: 0 1px 0 ' + $store.state.basic.main_color + ';'" v-on:click="changePush">
              <i class="icon"></i>
              关闭
          </div>
          <div class="kd-menu kd-scrollable" style="width: 50%;">
              <userSet v-if="push"/>
          </div>
      </nav>

      <!--游戏彩种大厅-->
      <transition name="bounce2">
          <div class="game-list-wrapper" v-if="$store.state.trade" style="padding-bottom: 50px;">
              <h2 class="page-title">
                  <i :class="['lli',{wactive:tabType == 1}]" @click="tabType = 1">彩票</i>
                  <i :class="['lli',{wactive:tabType == 2}]" @click="tabType = 2">棋牌</i>
              </h2>
              <a href="javascript:;" class="close-button" @click="$store.state.trade=false" style="top: 0.5rem;font-size: 1.125rem"><i class="icon icon-times" ></i></a>
              <lotteryList :tabType="tabType"/>
          </div>
      </transition>

      <!--全部游戏，游戏走势图-->
      <transition name="bounce2">
          <div class="game-list-wrapper" v-if="trend" style="padding-bottom: 50px;background: #eeeeee;">
              <img src="../../assets/images/find/close.png" style="width: 40px;height: 40px;position: absolute;top: 10px;right: 10px;" @click="trend=false">
              <LotteryInType />
          </div>
      </transition>
  </div>
</template>

<script>
  import userSet from '../my/son/setting';
  import charSet from '../my/chart/index';
  import lotteryList from '../home/common/lotteryList';
  import LotteryInType from '../home/common/LotteryInType';
  export default {
      components:{ LotteryInType,lotteryList,userSet,charSet },
      mounted(){

      },
      data () {
        return {
          show_dang_qian:0,
            link:[
            { speed: '暂无',url: "检测" },
            { speed: '暂无',url: "检测" },
            { speed:'暂无',url: "检测" },
          ],
          submenu: 0,
          push: false,
            trend:false,
          user: '',
          tabType:1,
        }
      },
      watch:{
        $route(){
          this.submenu = 0;
            if(this.$route.path.indexOf('trend') > -1)
            {
                this.trend = false;
            }
        },

      },
      computed:{
      },
      methods:{
        //app下载
        appDown(){
          let _this = this,target = '#';

          _this.$messagebox({
            title:'温馨提示',
            message:'前往下载app吗？',
            showCancelButton:true,
            confirmButtonText:'确认前往',
            cancelButtonText:'取消'
          }).then((value)=>{

            if(value == 'confirm'){
              _this.$getData({
                loading:true,
                url:'/api/home/in/setUp',
                data:{type:'login_jump'},
                callback:function(res){
                  // console.log(res);
                  if(res.value){
                    if(_this.judge() == 'iphone'){
                      target = res.value['ipa'];
                    }else{
                      target = res.value['apk'];
                    }
                    if(target.indexOf('http') > -1){
                      // console.log(link);
                      location.href = target;
                    }else{
                      // console.log(link);
                      location.href = target;
                    }
                  }
                }
              });
            }

          });

        },
        judge(){
          let agent = navigator.userAgent.toLowerCase(),type='android';
          if(agent.indexOf("android") > -1){
            type = 'android';
          }else if(agent.indexOf("iphone") > -1){
            type = 'iphone';
          }else if(agent.indexOf("ipad") > -1){
            type = 'ipad';
          }else{
            type = 'window';
          }
          return type;
        },
        // webSpeed:function(){
        //   this.$getData({
        //     loading:true,
        //     url:'/api/Home/in/webSpeed',
        //     type:'POST',
        //     data:'',
        //     callback:function(res){
        //       this.link = res;
        //     },
        //     errorCallback:function(){
        //     }
        //   });
        // },
        changePush:function(){
          let _this = this;
          _this.push = !_this.push;
          _this.$parent.changeUp();
          // console.log(_this.push);
          return;
          if(_this.push){
            _this.$getData({
              loading:true,
              url:'/api/home/in/line',
              data:'',
              callback:function(res){
                _this.$set(_this,'link',res);
              }
            });
          }
        },
        alertAction(key=0){
          // console.log(123);
            if(key == 'trend')
            {
                this.trend = true;
            }
            else
            {
                if(this.$route.path.indexOf('game-') > -1 || this.$route.path.indexOf('My/open/') > -1){
                    if(this.$route.path.indexOf('My/open/') > -1){
                        this.$store.commit('setData',{ key: 'gamesel',value: true });
                    }else{
                        this.$store.commit('setData',{ key: 'trade',value: true });
                    }
                }
            }
        },
        loginOut(){
          this.submenu =! this.submenu;
          let _this = this;
          _this.$getData({
            loading: true,
            url:'/api/home/in/loginOut',
            callback:function(res){
              if(res.code){
                localStorage.removeItem('pragma');
                _this.$store.state.login = false;
                _this.$store.state.user = false;
                // _this.$store.state.basic.main_color = '';
                if(_this.$route.path.indexOf('My') > -1 || _this.$route.path.indexOf('Capital') > -1){
                  _this.$router.push('/in');
                }
              }
              _this.$total({ message:res.msg,type: res.code });
            }
          });
        }
      },
  }
</script>

<style scoped>
    .gameApi-head{
        width: 100%;
        background: red;
        max-width: 640px;
        height: 50px;
        line-height: 50px;
        position: fixed;
        z-index: 999;
    }
    .for-back{
        color: white;
        font-size: 1.875rem;
        margin-left: 15px;
        font-weight: bold;
        position: absolute;
        top: 0;
        left: 0;
    }
    .top-title{
        width: 100%;
        display: flex;
    }
    .at-left{
        width: 23%;
        border: 0.1rem solid white;
        height: 30px;
        line-height: 30px;
        margin-left: 25%;
        text-align: center;
        margin-top: 9px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    .at-right{
        width: 23%;
        border: 0.1rem solid white;
        height: 30px;
        line-height: 30px;
        margin-top: 9px;
        text-align: center;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .this-selected{
        background: white;
        color: red;
    }
    .not-selected{
        color: white;
    }
    .close-menu{
        left: 47.5%;
    }
    .my-shou-cang{
        position: absolute;
        top: -1px;
        left: 0px;
        /*width: 24px;*/
        /*height: 24px;*/
        /*line-height: 28px;*/
        /*padding-top: 2.3px;*/
        /*padding-bottom: 2px;*/
        border-radius: 50%;
    }
    .icon-user-circle{
        position: absolute;
        top: -6px;
        left: 30px;
    }
    .text{
        position: absolute;
        left: 0;
        font-size: 13.5px;
        top: 8px;
    }
    .go-to-login{
        width: 60px;
        height: 30px;
    }
    .kd-head{
        padding: .3125rem .5rem;
    }
/* .push_chart_menu .{} */
.w_chart_wrapper{
  transform: translateX(100%);
}
.push_chart_menu .w_chart_wrapper{
  transform: translateX(0%);
}
.kd-menu-w{
  width: 100%;
  height: 100%;
  padding: 3rem 0;
  margin:0;
  background-color: #ebf3f3;
  /* margin-left:25%; */
}
.w_chart_room {
  position: absolute;
  transition:.2s;
  width: 1.2rem;
  padding:2px;
  /* height:50px; */
  z-index: 8;
  border:1px solid #888;
  font-size: .7rem;
  /* line-height: .7rem; */
  display: inline;
  /* writing-mode:lr-tb; */
  background: #008aa3;
  color:white;
  border-radius: 5px;
  right: 0;
  background: linear-gradient(to right, #008aa3 , #62e7ff);
}
.w_chart_room .chart_check{
  right:0%;
}
.close-menu-w{
    z-index:10;
    font-size: 0px;
    display: block;
    height: 40px;
    width: 40px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: rotate(0deg);
    color: rgb(255, 255, 255);
    line-height: 40px;
    text-align: center;
    margin: -20px 0px 0px 1rem;
    transition: 0.2s ease;
    border-radius: 100%;
}
.page-title .lli{
  font-style: normal; 
}
.page-title .wactive{
  color:#008aa3;
  border-bottom: 1px solid #008aa3;
}
</style>

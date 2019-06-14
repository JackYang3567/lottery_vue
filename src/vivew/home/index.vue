<template>
  <div id="app">
      <main class="kd-body home">
          <div style="width:100%;height:10.25rem;">
            <mt-swipe :auto="5000" v-if="basic.swipe.length">
              <div is="mt-swipe-item" :key="index" v-for="(item,key,index) in basic.swipe">
                  <div :style="{background:'url(' + ('api_path' in $store.state && $store.state.api_path ? $store.state.api_path : $store.state.basic.static_path) + item.img_url + ')',backgroundSize:'100% 100%',height:'100%'}" @click="swipeAction(item.img_href)">
                  </div>
              </div>
            </mt-swipe>
            <div style="text-align:center;line-height:150px;" v-else>
              <mt-spinner type="triple-bounce" :color="$store.state.basic.main_color"></mt-spinner>
            </div>
          </div>

          <div class="kd-notice" style="display: flex">
              <!--<i class="icon icon-notice"></i>-->
            <span style="width: 30px;background: #5484ec;height:15px;line-height: 15px;padding:0 3px;font-size: 0.675rem;color: white;font-family:'宋体';border-radius: 10%;margin-left: 15px;margin-right: 15px" @click="$router.push({path:'/allNotice'})">公告</span>
            <div title="3" class="kd-marquee kd-notice-body" style="width:85% !important;">
              <div class="inner" style="width:100%">
                <marquee direction="left" align="bottom" width="100%" scrollamount="4">
                    <span style="font-size: 0.7rem;margin-right: 25px;" @click="$router.push({path:'/discount-son/'+basic.notice.id})" v-if="basic.notice"><span style="color: red;">【公告】</span>{{basic.notice.title}}</span>
                </marquee>
              </div>
            </div>
              <div style="width: 65px;background: #fff;height:20px;line-height: 15px;padding:0 3px;font-size: 15px;color: #ff0c00;font-family:'宋体';border-radius: 10%;margin-left: 10px;margin-right: 10px;" @click="$store.state.service = true">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACLUlEQVQ4T32TO2gUURSG/zOvFdFOjeDu4IPdncVOTeEDLAIqwVpSBgsjCosEQQ3aiIWNSgofEUUbFcFGiBJfbaoUguDOuqJxZzUrAUVRdOfOzC+zr+xDne6cc//vP+fOuYKez12FlbLcGo+IHQC3QcQHMasxvJGphDMCsFMinUHRNnYhwj2KJFGvNMtsaoiipqnhTBnvWro2oJQ0dofAC4roIl3cJY8YRC4kasGWDYuoti3er8ey36ExL5AB9Iqb7nEPdXAcC2adstrZBhRs85AQU31ixOcb7TcmWupMQ7QnUw6e1TOubT0COdwLqItFpvWI5wjepMjmNo245XjqYAvwGmSuBYiF9QL5IFsJRgQIS0Aisq2TRDQBiAVizvHUoLi2dR7AicZszRlBBcjlrKeOx+LOPxXflx9aZyiYIHBWXNt8DsgQGNUEeBlBXJ3qaaaCuy1hjC6mzMP6T3Un/QXfXds8BsglAtMdAB5xPHXVTZn3CfzKeWq0BXg7gDVBwvoMctDx1Fw3IGXNQLCX4FiurK67SWMfoX3MVfxXXR3YZl4vq2tpoObaZh6QSRAPpbDO2C66dpq+fzRXxXzvav8tLqaskQg4IAhv/2PlumWltVidrmKxlS2mjPGsF1zsWPZ+n4JtnBLIfhArKLiSK6spAsabpDlKUY8dD5/+C4hdlaYPxRdqGXopAreSkjZ/+Bc2fcW3vsfU96xtcxKQfD1PPLECf2zjAj70nvsDUBXy2gPCenIAAAAASUVORK5CYII=" style="margin-right: 3px"/><span>客服</span>
              </div>
          </div>

          <ul class="nostyle kd-row-middle kd-shortcut">
              <li class="kd-shortcut-item" :key="index" v-for="(item,key,index)  in shortcut" @click="shortcutClick(key)">
                  <a href="javascript:;" v-bind:class="[item.class]">
                      <span v-bind:class="['icon icon-shortcut-'+item.class]"></span>
                      <span style="color: black">{{ item.text }}</span>
                  </a>
              </li>
          </ul>
         
          <div class="gf-or-jd">
              <div class="for-nav-this-page" :style="{'background':tabType!=1?'white':'red'}" @click="tabType=1">
                  <img src="../../assets/images/a_icon/caipiao_r.png" v-if="tabType!=1">
                  <img src="../../assets/images/a_icon/caipiao_w.png" v-else>
                  <span :style="{'color':tabType!=1?'red':'white'}">彩票</span>
              </div>
              <div class="for-nav-this-page" :style="{'background':tabType!=2?'white':'#91cc52'}" @click="tabType=2">
                  <img src="../../assets/images/a_icon/qipai_g.png" v-if="tabType!=2">
                  <img src="../../assets/images/a_icon/qipai_w.png" v-else>
                  <span :style="{'color':tabType!=2?'#91cc52':'white'}">棋牌</span>
              </div>
              <div class="for-nav-this-page" :style="{'background':tabType!=3?'white':'#f4ea2a'}" @click="tabType=3">
                  <img src="../../assets/images/a_icon/game_y.png" v-if="tabType!=3">
                  <img src="../../assets/images/a_icon/game_w.png" v-else>
                  <span :style="{'color':tabType!=3?'#f4ea2a':'white'}">游艺</span>
              </div>
              <div class="for-nav-this-page" :style="{'background':tabType!=4?'white':'#1296db'}" @click="tabType=4">
                  <img src="../../assets/images/a_icon/buyu_b.png" v-if="tabType!=4">
                  <img src="../../assets/images/a_icon/buyu_w.png" v-else>
                  <span :style="{'color':tabType!=4?'#1296db':'white'}">捕鱼</span>
              </div>
              <div class="for-nav-this-page" :style="{'background':tabType!=5?'white':'#9d63f3'}" @click="tabType=5">
                  <img src="../../assets/images/a_icon/dj_z.png" v-if="tabType!=5">
                  <img src="../../assets/images/a_icon/dj_w.png" v-else>
                  <span :style="{'color':tabType!=5?'#9d63f3':'white'}">电竞</span>
              </div>
            </div>
           
          <lotteryList :tabType="tabType" />

          <div class="latest-winning-list">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAoCAMAAACsAtiWAAAAk1BMVEUAAAD1TkP0TkP1TkP/TED1T0P0TUP0TkL/TC/1TkT0TkT0T0P1TUP0T0P0TkP0T0T0TkP0T0T0TkP1T0T1TkLzS0HxSD30T0P0TkP0T0T1T0P1TkP0T0PzTUP0TUL1UED6SEP1T0P0TkT1TkP1T0P1TULzTUD1TkP1TUP0TkP1TkL1TUHzTUTzT0PzTkPzTUH0T0SuZ7RlAAAAMHRSTlMA92ljCMpFJQX622A01tHPvruleFQUDvHr6ODdnDkuGAu0mYBtTCHDko5WMh6uWCvMej79AAABbUlEQVQ4y3WU13KDMBBFL6a7gMGFYprjXpLo/78uWBq0C4TztmcuO6uVBkj2cZLN0GNpp8caxJdo6WWqpDU2E5n4cCHhptJcyQRSGK+ufudS+HuKOEKSuqrczVV9AsNU7lDL4QNVfaHHSdnArarrTUi+QdChOGsPQ8J+IrcwoLLFAPsXPWaGGGEsRsOO2VDiLCY4d4lSTFJCYuVcxjGvDupcG+4yy8pG4zQJVzNgxuu0AbDgZo6WOTdmKyK+CvlkLj5TEeAZ3TYLs9xDsi/Nwu6+8rAUihADAqF44UmDcmjoLUzRsQBjQfPy5W8psWVr4Gf23S7h+oI1dwRBESYdXNlW9EOzDLJvIKc7g+bQ2/edHvRnzjD8TL3W8t5WS10dLXMlWlamd9RyiZabLvUECe/M23CoieQxnXhA4YVTCdsD+J9gzHwHTb0iTwQ1GE0xThQN+jiDRisHI7yfta/vPHrif3bOJo6ieOPsuP0DC7KS5hn9mFUAAAAASUVORK5CYII=" /> 最新中奖榜
          </div>
          <div class="show-latest-winning-list">
              <div class="show-winner-info" v-for="info in winnings">
                  <img  :src="require('@/assets/images/photo/'+ (info['photo'] > 0 ?info['photo'] : '0') +'.png')"/>
                  <div class="show-name-and-username">
                      <p>{{info.username}}</p>
                      <p style="font-size: 0.5rem">{{info.name}}</p>
                  </div>
                  <div class="show-winner-money">
                      喜中{{info.win}}元
                  </div>
              </div>
          </div>
          <section class="copyright" style="border-top: none">
            <p>2015-2018
              <span class="copyright-c">&copy;</span> {{ $store.state.basic.web_name }}平台
              <!--span class="ak-ico"><img src="../../assets/images/gk.png" /--> <!-- <img src="../../assets/images/ak-ICON.ico" /></span>-->
              版权所有
            </p>
            <p>
              {{ $store.state.basic.web_name }}平台提示：彩票有风险，投注需谨慎！
              <span class="hidden copyright-pc">不向未满18岁的青少年出售彩票</span>
            </p>
          </section>

          <div class="tishi-app" v-if="show_tishi_app">
              <div class="for-hong-bao" @click="$router.push({path:'/My/hongbao'})">

              </div>
              <div class="tishi-left">
                  <span style="display:inline-block;width: 22px;height: 22px;background: white;color: #df4336;border-radius: 50%;text-align: center;line-height: 22px;font-size: 12px;margin-right: 5px;" @click="show_tishi_app=!show_tishi_app">&#10005;</span>
                  <span style="font-size: 12px;position: relative;top: 3px;">下载APP，体验更多购彩乐趣</span>
              </div>
              <div class="tishi-right">
                  <div class="this-a-btn" @click="appDown()">
                      下载APP
                  </div>
              </div>
          </div>
      </main>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import lotteryList from './common/lotteryList';
import { Marquee, MarqueeItem, ButtonTab, ButtonTabItem } from 'vux';
let MarqueeComponent = Marquee;
let _this = this;
export default {
  components:{
    lotteryList,
    MarqueeComponent,
    MarqueeItem,
    ButtonTab,
    ButtonTabItem
  },
  data () {
    return {
      show_tishi_app:true,
      tabType:1,
      shortcut: [
       //中间导航条
       { class:'for-money-in-out',text:'充值/提现' },
       { class:"for-qi-pai", text:'充值抽奖'},
       // { class:'check-in',text:'签到' },
       { class:'dzyy',text:'合买大厅'},
       // { class:'try-playing',text:'免费试玩' },
       { class:'for-you-hui',text:'优惠活动' }
      ],
      //会员动态
      UserDynamics: [

      ],
      UserDynamics1:0,
      basic: {
        swipe: [],
        notice: []
      },      
    }
  },
  mounted(){
    // console.log(this.$store.state.basic.home_window);
    // let a = '192.168.31.27:8080/#/abc';
    // let b = encodeURIComponent(a);
    // console.log(b);
    // console.log(decodeURIComponent(b));
    this.initialization();
 
    //获取最新会员动态 //暂时取消
    // this.userAction();
  },
  created () {  
     _this = this
  },
  sockets: {
    //不能改,j建立连接自动调用connect
      connect: function() {
        //与socket.io连接后回调
        console.log("socket connected this.$socket.id",this.$socket.id);
      },
    //服务端向客户端发送login事件
    /*
        login: function(value) {
        //监听login(后端向前端emit  login的回调)
         console.log(value)
      }
      */
  },
  methods: {
      appDown(){
          let target = '#';
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
                                  location.href = '//' + target;
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
      openServer(){       
          _this.$getData({
              url:'/api/home/Chartroom/Contact_Customer_Service',
              type:'post',
              callback:function (data) {
                  if(data.type)
                  {
                      window.location.href = '#/my/chart/chatroom/' + data.tips;
                  }
                  else
                  {
                      _this.$total({message:data.tips,type:2});
                  }
              }
          })
      },
    userAction(){
    
      _this.$getData({
        url:'/api/home/in/userAction',
        type:'post',
        data:'',
        callback:function(res){
          if(res){
            _this.$set(_this,'UserDynamics',res);
          }else{
            _this.UserDynamics1 = 1;
          }
        }
      });
    },
    initialization(){
      // 这里加个条件,有时候路由有缓存,延时
      if(this.$route.path in this.$store.state.all_chat && this.$route.path == "/"){
        this.basic = this.$store.state.all_chat[this.$route.path];
      }else{
      //  this.getInfo();
      }
    },
    /*
    getInfo(){     
      this.$getData({
        url:'/api/Home/home/getInfo',
        callback: function(data){
          _this.basic = data;
          _this.$store.state.all_chat[_this.$route.path] = data;
        }
      });
    },
     */
    shortcutClick(data){
    
      switch(data){
        case 0:
          _this.$router.push('/Capital'); //充值提现
        break;
        case 1:
          _this.$router.push('/My/lucky'); //充值抽奖
        break;
        case 2:
          // _this.$router.push('/my/chart/InteractiveCenter');  //互动聊天
            _this.$router.push('/With');
          // _this.demoLogin();
        break;
        case 3:
            _this.$router.push('/Discount');  //优惠活动
        break;
      }
    },
    // wxbox(val){
    //   //  console.log(val);
    //   // 'url(http://' + ('api_path' in this.$store.state && this.$store.state.api_path ? this.$store.state.api_path : this.$store.state.basic.static_path) + item.img_url + ')'
    //   let _this = this;
    //   _this.$messagebox({
    //     title: '微信扫码',
    //     message: '<img src="http://'+ ('api_path' in this.$store.state && this.$store.state.api_path ? this.$store.state.api_path : this.$store.state.basic.static_path) + val +'">',
    //     showCancelButton: false,
    //   });
    // },
    onlineService(){//请求客服内容
     
      _this.service = !_this.service;
      if(_this.service && _this.online==''){
        _this.$getData({
          loding:true,
          url:'/api/home/in/onlineService',
          data:{type:2},
          type:'post',
          callback:function(res){
            if(res){
              _this.$set(_this,'online',res);
            }
          }
        });
      }
    },
    swipeAction(value){
      if(value){
        this.$router.push('/discount-son/' + value);
      }
    },

  }
}
</script>

<style scoped>
    .kd-body{
        padding-top: 3.0625rem !important;
    }
    .for-nav-this-page{
        width: 100%;
        height: 55px;
        padding-top: 5px;
        margin-left: 4px;
        margin-right: 4px;
    }
    .for-nav-this-page>img{
        width: 25px;
        height: 25px;
    }
    .for-nav-this-page>span{
        display: inline-block;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        width: 100%;
    }
    .for-hong-bao{
        position: absolute;
        right: 1rem;
        animation: fangda 1s infinite ease-in;
        width: 4rem;
        height: 4rem;
        bottom: 5.875rem;
        z-index: 1001;
        background: url(data:image/png;base64,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) no-repeat 50%;
        background-size: 4rem 4rem;
    }
    @keyframes fangda{
        50%{transform:scale(.8)}to{transform:scale(1)}
    }
    .tishi-app{
        display: flex;
        width: 100%;
        max-width:640px;
        height: 69px;
        line-height: 46px;
        position: fixed;
        bottom:45px;
        background: url("data:image/png;base64,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") no-repeat 100%;
        background-size: 100% 100%;
    }
    .tishi-left{
        width: 70%;
        padding-left: 20px;
        padding-top: 20px;
        color: white;
    }
    .tishi-right{
        width:30%;
        margin-top: 30px;
        font-size: 12px;
        height: 26px;
        line-height: 28px;
        text-align: right;
    }
    .this-a-btn{
        width: 90px;
        float: right;
        margin-right: 10px;
        text-align: center;
        background: white;
        border-radius: 8%;
        color: #df4336;
    }
    .show-qi-ta-wa-fa{
        width: 23%;
        margin: 10px 1% 0 1%;
        padding-top:8px;
        height: 100px;
        background: white;
        border-radius: 10%;
        text-align: center;
    }
    .show-qi-ta-wa-fa>a>img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    .add-border{
        border: 2px solid #d61df3;
    }
    .show-qi-ta-wa-fa>a>p{
        width: 100%;
        text-align: center;
        margin-top: 5px;
        font-size: 0.875rem;
        color: #777;
    }
    @keyframes myMove {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-250px);
        }
    }
    .show-winner-info{
        width: 100%;
        max-width: 640px;
        display: flex;
        padding: 3px 0 3px 5px;
        animation: myMove 6s linear infinite;
        animation-fill-mode: forwards;
    }
    .show-winner-info>img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .show-winner-info>.show-name-and-username{
        margin-left: 10px;
        width: 30%;
        font-size: 12px;
        color: #777;
        font-family: '宋体';
        margin-top: 3px;
    }
    .show-winner-info>.show-name-and-username>p{
        margin-top: 3px;
    }
    .show-winner-info>.show-winner-money{
        width: 50%;
        text-align: right;
        height: 40px;
        line-height: 40px;
        font-size: 0.8rem;
        color: red;
    }
    .icon-shortcut-for-money-in-out{
        width: 100%;
        height: 42px;
        margin-bottom: 6px;
        background: url(data:image/png;base64,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) no-repeat 50%;
        background-size: 42px;
    }
    .icon-shortcut-for-qi-pai{
        width: 100%;
        height: 42px;
        margin-bottom: 6px;
        background: url('../../assets/images/a_icon/cj.png') no-repeat 50%;
        background-size: 42px;
    }
    .icon-shortcut-for-you-hui{
        width: 100%;
        height: 42px;
        margin-bottom: 6px;
        background: url(data:image/png;base64,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) no-repeat 50%;
        background-size: 42px;
    }
    .icon-shortcut-dzyy{
        width: 100%;
        height: 42px;
        margin-bottom: 6px;
        background: url('../../assets/images/a_icon/hud.png') no-repeat 50%;
        background-size: 42px;
    }
    .lottery_title{
        width: 100%;
        margin-top: 10px;
        background: white;
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        border-bottom: 1px solid #eee;
        font-size: 12px;
    }
    .latest-winning-list{
        width: 100%;
        max-width: 640px;
        height: 50px;
        line-height: 50px;
        background: white;
        margin-top: 10px;
        padding-left: 22px;
        font-size: 12px;
        border-bottom: 0.1rem solid #eee;
    }
    .show-latest-winning-list{
        border-top: none;
        width: 100%;
        max-width: 640px;
        height: 250px;
        background: white;
        margin-bottom: 10px;
        overflow: hidden;
    }
    .latest-winning-list>img{
        width: 16px;
        position: relative;
        top: 3px;
        left: -10px;
    }
    .lottery_title>img{
        position: relative;
        top: 5px;
        width: 20px;
        height: 20px;
        margin-right: 8px;
    }
    .gf-or-jd{
        width: 100%;
        height: 55px;
        background: white;
        margin-top: 10px;
        margin-bottom: 5px;
        text-align: center;
        border: none;
        display: flex;
    }
  .member-news .news-list{
    padding: 0.2rem 1rem;
  }
  .member-news{
    border-bottom: 1px solid #eee;
  }
  .ak-ico{
    border:1px solid #fff !important;
  }
  @media (max-width:450px){}
    /*背景颜色*/
    .home{
      background-color: #f5f5f9;
    }
    /*宽度*/
    .kd-notice{
        height: 1.8rem;
    }
    /*广告*/
    .kd-notice{
      padding:.3rem 0 .2rem 0;
    }
    .kd-notice{
      background-color:#fff;
      padding-top: 0.5rem;
    }
    /*中部导航条*/
    .kd-shortcut{
      background-color:#fff;
        border: none;
        border-top: 1px solid #eee !important;
      /* margin-bottom:1rem; */
    }
    .kd-shortcut-item{
        margin-top: 3px;
        text-align: center;
      border:none;
    }
    /*导航条图标*/
    .kd-shortcut-item .icon{
      font-size:2.5rem;
      display: block;
    }
    /*会员动态*/
    .member-news .title{
      border:none;
    }
    .member-news .item{
      padding:.9rem 0 .3rem 1.6rem;
    }
    .align-middle{
      border-bottom: 1px solid #ddd;
    }
    .kd-container {
      background-color: #fff;
      border-radius: 10px;
      width: 93.75%;
    }
    .news-list{
      background-color: #fff;
      border-radius:10px;
    }
    .w_snav{
      background:none;
      border-radius:10px;
    }
</style>

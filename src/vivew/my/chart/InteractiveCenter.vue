<template>
  <div>
    <div class="gameApi-head">
      <a data-v-81846358="" class="for-back" @click="$router.back()"><i data-v-81846358="" class="icon icon-nav-arrow-left"></i></a>
      <div class="top-title">
        <div :class="['at-left','this-selected']" @click="changeNav('hddt')">互动大厅</div>
        <div :class="['at-right','not-selected']" @click="changeNav('hmdt')">合买大厅</div>
      </div>
    </div>
    <div class="kd-body chat-room" >
      <div id = "dis" v-on:click="add_chart()">
        点击加入聊天室
      </div>

      <div class = "search" style = "display:none" id = "search">
        <input type="text"  placeholder="聊天室ID" id = "join" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')">
        <button v-on:click="join_chart()">加入</button>
          <!--<button v-on:click = "initiate_chat()">创建群<tton>-->
      </div>





      <!--<div class = "Choice" v-on:click="Contact_Customer_Service" style = "color:red">-->
        <!--<img :src="require('@/assets/images/a_icon/kf.png')">-->
        <!--&lt;!&ndash;<span style = "background-color: orange">优</span>&ndash;&gt;-->
        <!--<div class = "GroupName" >在线客服</div>-->
        <!--&lt;!&ndash;<div class = "LatestNews">聊天室id：0</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<span style = "display:none">0</span>&ndash;&gt;-->
      <!--</div>-->


      <div class = "Choice" v-on:click="friend">
        <img :src="require('@/assets/images/a_icon/hud.png')">
        <!--<span style = "background-color: #0aac34">☏</span>-->
        <div class = "GroupName">好友</div>
        <!--<div class = "LatestNews">聊天室id：0</div>-->
        <!--<span style = "display:none">0</span>-->
      </div>
      <div class = "Choice" v-on:click="Jump(1)">
        <!--<img src="../../../assets/ChatRoom/1.png">-->
        <span>公</span>
        <div class = "GroupName">公共聊天室</div>
        <!--<div class = "LatestNews">聊天室id：0</div>-->
        <!--<span style = "display:none">0</span>-->
      </div>


      <div v-for="item in data">
        <div   v-on:click="Jump(item)" class = "Choice" v-if="item.type > 0"  v-longtap="(e)=>vueTouch(item.chart_id,e)"  >
          <!--<img src="../../../assets/ChatRoom/1.png">-->
          <span>群</span>
          <div class = "GroupName" >{{item.name}}</div>
          <div class = "LatestNews">群公告：{{item.Notice}}</div>
          <div v-if="item.Unread > 0" style = "width: 20px;height: 20px;float:right;line-height: 22px;text-align: center;margin-right: 20px;margin-top: -10px;background-color: red;border-radius: 50%;color: #fff">{{item.Unread}}</div>
        </div>

        <div   v-on:click="Jump(item)" class = "Choice" v-else>
          <img :src="require('@/assets/images/photo/'+ item.photo +'.png')">
          <div class = "GroupName">{{item.name}}</div>
          <!--<div class = "LatestNews">创建时间：{{item.type}}</div>-->
          <div v-if="item.Unread > 0" style = "width: 20px;height: 20px;float:right;line-height: 22px;text-align: center;margin-right: 20px;margin-top:20px;background-color: red;border-radius: 50%;color: #fff">{{item.Unread}}</div>

        </div>
        <!--<button class = "unset" @click="unset(item)">X</button>-->
      </div>
    </div>
  </div>



</template>
<script>
  export default {
    mounted(){
      //获取会员加入的聊天室
      // this.GetChatRoom();
    },
    data(){
      return{
        data:[],

      }
    },
    methods:{

      //联系客服
      Contact_Customer_Service(){
        let _this = this;
        _this.$getData({
          url:'/api/home/Chartroom/Contact_Customer_Service',
          type:'post',
          data:{},
          callback:function(res){
            if(res.type){
              window.location.href =  "#/my/chart/chatroom/"+res.tips
            }else{
              _this.$total({ message: res.tips,type: 2 });
            }
          }
        })
      },
//好友页面
      friend(){
        window.location.href = "#/friend";
      },

      add_chart(){
        var search = document.getElementById('search');
        if(search.style.display == "block"){
          search.style.display = "none";
        }else if(search.style.display == "none"){
          search.style.display = "block";
        }
      },
      changeNav(toWay)
      {
        if(toWay == 'hmdt')
        {
          window.location.href = "#/With";
        }
        else
        {
          window.location.href = "#/With";
          // window.location.href = "#/my/chart/InteractiveCenter";
        }
      },
      //获取自身未读消息
      vueTouch(msg,e){
          window.location.href = "#/my/chart/Regulation/"+msg;
      },

      //删除群聊
      unset(obj){
        var a = confirm("确定删除吗？（如果你是群员，将退出该群；如果你是群主，将解散该群；如果是私聊，对方联系列表也将失去你）");
        if(a){
            var chart_id = obj.chart_id;
            let _this = this;
            _this.$getData({
              url:'/api/home/Chartroom/unset_chart',
              type:'post',
              data:{
                'chart_id':chart_id,
                'admin_id':null
              },
              callback:function(res){
                if(res.type){
                  alert(res.Tips);
                  window.location.reload();
                }else{
                  alert(res.Tips);
                }


              }
            })
        }
      },
      //发起聊天
      initiate_chat(){
        var a = confirm("确定发起聊天吗？");
        if(a){
          let _this = this;
          _this.$getData({
            url:'/api/home/Chartroom/initiate_chat',
            type:'post',
            data:'',
            callback:function(res){
                if(res.type){
                  window.location.href = "#/my/chart/chatroom/"+res.chart_id;
                }else{
                  alert(res.Tips);
                }
            }
          })
        }
      },
      //加入聊天室
      join_chart(){
        var chart_id  = document.getElementById("join").value;
        if(chart_id != ""){
          let _this = this;
          _this.$getData({
            url:'/api/home/Chartroom/join_chart',
            type:'post',
            data:{
              'page':chart_id
            },
            callback:function(res){
              if(res.type){
                window.location.href = "#/my/chart/chatroom/"+res.chart_id;
              }else{
                alert(res.Tips);
              }
            }
          })
        }else{
          alert("请输入正确的聊天室ID");
        }
      },
      GetChatRoom(){//获取会员加入的聊天室
        let _this = this;
        _this.$getData({
          url:'/api/home/Chartroom/getChartRoom',
          type:'post',
          data:'',
          callback:function(res){
            if(res.type){
              _this.$set(_this,'data',res.data);
            }
          }
        })
      },
      Jump(obj){
        if(typeof(obj) == "number"){
          window.location.href = "#/my/chart";
        }else if(typeof(obj) == "object"){
          window.location.href = "#/my/chart/chatroom/"+obj.chart_id;
        }else{
          alert("数据出错，请重试");
        }
      }
    }
  }
</script>
<style>
  .gameApi-head{
    width: 100%;
    background: red;
    height: 50px;
    line-height: 50px;
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
  .this-selected{
    background: white;
    color: red;
  }
  .not-selected{
    color: white;
  }
  .at-left{
    width: 23%;
    border: 0.1rem solid white;
    height: 34px;
    line-height: 34px;
    margin-left: 25%;
    text-align: center;
    margin-top: 7px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .at-right{
    width: 23%;
    border: 0.1rem solid white;
    height: 34px;
    line-height: 34px;
    margin-top: 7px;
    text-align: center;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .kd-marquee .inner {
    display: inline;
  }
  .Choice{
    float:left;
    height:70px;
    width: 100%;
    margin-top:10px;
    margin-bottom: 10px;
  }
  .Choice  > span{
    height: 50px;
    width: 50px;
    margin: 10px 10px auto 10px;
    float: left;
    background-color: #0c96ed;
    text-align: center;
    line-height: 50px;
    border-radius: 50px;
    font-size: 24px;
    color: #fff;
  }
  .Choice  > img{
    height: 50px;
    width: 50px;
    margin: 10px 10px auto 10px;
    float: left;
    border-radius: 50px;
  }
  .Choice  > div{
    float:left;
    width: 60%;
    height: 49%;
  }
  .GroupName{
    line-height: 45px;
    font-size:16px;
  }
  /*.unset{*/
    /*text-align: center;*/
    /*width: 40px;*/
    /*height:40px;*/
    /*float: right;*/
    /*margin-top: -16%;*/
    /*font-size: 20px;*/
    /*margin-right: 8%;*/
    /*color: #fff;*/
    /*background-color: red;*/
    /*border-radius: 20px;*/
  /*}*/

  .LatestNews{
    line-height: 20px;
    font-size:8px;
  }
  .search{
    width: 100%;
    height:50px;
    float:left;
    margin-top:5px;
    margin-bottom: 5px;
  }
  .search > input{
    height: 30px;
    border-radius: 5px;
    width:35%;
    margin-top:8px;
    margin-left: 70px;
    font-size: 16px;
    float: left;
  }
  .search > button{
    height: 30px;
    border-radius: 5px;
    width:20%;
    margin-top:7px;
    margin-left: 10px;
    font-size: 16px;
    float: left;
    color: #fff;
    background-color: #0972ce;
  }
  #dis{
    color: #c2ccd1;
    font-size: 10px;
    text-align: center;
    margin-top:10px;
  }
  .kd-body{
    padding-top: 1rem !important;
  }
</style>

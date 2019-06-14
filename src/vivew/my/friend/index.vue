<template>
  <div class="kd-body chat-room">
      <div id = "Tips" @click = "add_hy()">点击可添加好友︾</div>
      <div id = "search" style = "display: none;" >
        <input type = "text" id = "friend_id" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" placeholder="好友ID" >
        <button v-on:click="add_friend">添加</button>
      </div>


    <!--<div class = "list" style = "color:red" @click="Contact_Customer_Service">-->
      <!--<img :src="require('@/assets/images/a_icon/kf.png')" />-->
      <!--<div>-->
        <!--<div>在线客服</div>-->
      <!--</div>-->
    <!--</div>-->
    <div v-for="item in data">
      <div class = "list" @click="jump_chart(item)">
          <img :src="require('@/assets/images/photo/'+ item.photo +'.png')"/>
          <div>
           <div>{{item.username}}</div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {

    mounted(){
      this.query_friend();
    },
    data(){
      return{
        data:[],
      }
    },

    methods: {

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



      add_hy(){
        var search = document.getElementById('search');
        if(search.style.display == "block"){
          search.style.display = "none";
        }else if(search.style.display == "none"){
          search.style.display = "block";
        }
      },

      //开启私聊
      jump_chart(msg){
        let _this = this;
        _this.$getData({
          url:'/api/home/Chartroom/private_chat',
          type:'post',
          data:{
            'friend_id':msg.id,
          },
          callback:function(res){
              if(res.type){
                window.location.href =  "#/my/chart/chatroom/"+res.data
              }else{
                alert(res.Tips);
              }
          }
        })
      },
      //查询自身好友并且显示
      query_friend(){
        let _this = this;
        _this.$getData({
          url:'/api/home/Chartroom/query_friend',
          type:'post',
          data:{},
          callback:function(res){
              if(res.type){
                _this.data = res.data;
              }else{
                _this.$total({ message: res.Tips,type: 2 });
              }
          }
        })
      },
      //添加好友
      add_friend(){
        var friend_id = document.getElementById('friend_id').value;
        if(friend_id != null && friend_id != ""){
          let _this = this;
          _this.$getData({
            url:'/api/home/Chartroom/add_friend',
            type:'post',
            data:{
              'friend_id':friend_id
            },
            callback:function(res){
              _this.$total({ message: res.Tips,type: 2 });
                console.log(res);
                if(res.type){
                  _this.query_friend();
                }
            }
          })
        }else{
          alert('请输入好友ID');
        }
      },
    }
  }
</script>
<style>
  .kd-marquee .inner {
    display: inline;
  }

  #Tips{
    color: #c2ccd1;
    text-align: center;
    font-size: 10px;
    margin: 10px auto;
  }

  #search{
    width: 100%;
    height:50px;
    float:left;
    margin-top:5px;
    margin-bottom: 5px;
  }
  #search > input{
    height: 30px;
    border-radius: 5px;
    width:50%;
    margin-top:8px;
    margin-left: 70px;
    font-size: 16px;
    float: left;
  }
  #search > button{
    height: 30px;
    border-radius: 5px;
    width:20%;
    margin-top:5px;
    margin-left: 5px;
    font-size: 16px;
    float: left;
    color: #fff;
    background-color: #c3c3c3;

  }

  .list {
    width: 96%;
    margin-left: 2%;
    height: 60px;
    float: left;
    border-bottom:solid #cccccc  0.2px;
    margin-top: 5px;
    /*margin-bottom: 5px;*/
  }
  .list > img{
    float: left;
    height:40px;
    width: 40px;
    border-radius:50%;
    margin-left: 10px;
    margin-top: 5px;
  }

  .list > div{
    float: left;
    height:50px;
    width: 200px;
    margin-left: 10px;
    margin-top: 5px;
    line-height: 25px;
    font-size: 18px;
    font-weight: 300;
  }
  .list > div > div{
    margin-bottom: -5px;
  }

  .Present_id{
      font-size: 6px;
      color: #5b6b88;
      width:100%;
      height:30px;
      overflow:hidden;
  }

  #time{
    float: right;
    font-size:14px;
    width: 20%;
    height:80%;
    margin-left: 5%;
    text-align: center;
    line-height:200%;
  }
</style>

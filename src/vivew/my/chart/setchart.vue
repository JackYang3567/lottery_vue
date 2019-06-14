<template>
  <div class="kd-body chat-room" >
    <div class = "form">
      <div class = "unit">
        <div>本群群号：</div>
        <div id = "chart_id">{{this.$route.params.chart_id}}</div>
      </div>
      <div class = "unit">
        <div>群昵称修改：</div>
        <input type = "text" placeholder="如不修改，可不填写" id = "chart_name" >
      </div>
      <div class = "unit">
        <div>群公告修改：</div>
        <input type = "text" placeholder="如不修改，可不填写" id = "chart_Notice">
      </div>
      <div class = "unit">
        <div>邀请好友（ID）：</div>
        <input type = "text" placeholder="如无邀请，可不填写"  onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" id = "friend">
      </div>
      <div class = "unit">
        <button @click="user_chart()">解&nbsp;&nbsp;&nbsp;散&nbsp;&nbsp;&nbsp;该&nbsp;&nbsp;&nbsp;群</button>
      </div>
    </div>
    <button class="complete" @click="shunt()">完成</button>
  </div>
</template>
<script>
  export default {
    mounted(){
      this.query_Spokesman_id();
    },
    data(){
      return{
        data:{},
      }
    },
    methods: {

      //功能分流
      shunt(){
        var chart_name = document.getElementById('chart_name').value;
        var chart_Notice = document.getElementById('chart_Notice').value;
        var friend = document.getElementById('friend').value;

        if(chart_name.length > 0){
          this.change_chart_name(chart_name);
        }

        if(chart_Notice.length > 0){
          this.change_chart_Notice(chart_Notice);
        }
        if(friend.length > 0){
          this.Invitation_friend(friend);
        }
      },



      //邀请好友
      Invitation_friend(res){
        let _this = this;
        var chart_id = _this.$route.params.chart_id;
        _this.$getData({
          url:'/api/home/Chartroom/Invitation_friend',
          type:'post',
          data:{
            'chart_id':chart_id,
            'friend_id':res
          },
          callback:function(res){
            if(res.type){
              _this.$total({ message: res.tips,type: 2 });

            }else{
              _this.$total({ message: res.tips,type: 2 });
            }
          }
        })
      },

      //更改群公告
      change_chart_Notice(res){
        let _this = this;
        var chart_id = _this.$route.params.chart_id;
        _this.$getData({
          url:'/api/home/Chartroom/change_chart_Notice',
          type:'post',
          data:{
            'chart_id':chart_id,
            'chart_Notice':res
          },
          callback:function(res){
            if(res.type){
              _this.$total({ message: res.Tips,type: 2 });
              window.location.href = "#/my/chart/InteractiveCenter";
            }else{
              _this.$total({ message: res.Tips,type: 2 });
            }
          }
        })
      },

      //更改群昵称
      change_chart_name(res){
        let _this = this;
        var chart_id = _this.$route.params.chart_id;
        _this.$getData({
          url:'/api/home/Chartroom/change_chart_name',
          type:'post',
          data:{
            'chart_id':chart_id,
            'chart_name':res
          },
          callback:function(res){
            if(res.type){
              _this.$total({ message: res.Tips,type: 2 });
              window.location.href = "#/my/chart/InteractiveCenter";
            }else{
              _this.$total({ message: res.Tips,type: 2 });
            }
          }
        })
      },

      //解散该群
      user_chart(){
        var a = confirm("确定解散该群吗？");
        if(a){
          let _this = this;
          var chart_id = _this.$route.params.chart_id;
          _this.$getData({
            url:'/api/home/Chartroom/unset_chart',
            type:'post',
            data:{
              'chart_id':chart_id,
              'admin_id':null
            },
            callback:function(res){
              if(res.type){
                _this.$total({ message: res.Tips,type: 2 });
                window.location.href = "#/my/chart/InteractiveCenter";
              }else{
                _this.$total({ message: res.Tips,type: 2 });
              }
            }
          })
        }
      },

      //查询自身是否为群主
      query_Spokesman_id(){
        let _this = this;
        _this.$getData({
          url:'/api/home/Chartroom/query_Spokesman_id',
          type:'post',
          data:{
            'chart_id':_this.$route.params.chart_id,
          },
          callback:function(res){
            if(res.type){
              _this.data = res.data;
              console.log(_this.data);
            }else{
              alert(res.Tips);
              window.history.go(-1);
            }
          }
        })
      }
    }
  }
</script>
<style>
  .kd-marquee .inner {
    display: inline;
  }
  .form{
    width: 80%;
    float: left;
    margin-left: 10%;
  }
  .unit{
    height: 80px;
    margin:20px auto;
  }
  .unit > div{
    margin:10px auto 10px 10px;
    font-size: 16px;
  }
  .unit > input{
    width: 70%;
    float: left;
    margin-left: 15%;
    border-radius: 5px;
    padding-left: 10px;
    height: 30px;
    border: 1px solid #5b6b88;
  }
  .unit > button{
    margin-top:8%;
    width: 70%;
    float: left;
    margin-left: 15%;
    border-radius: 5px;
    padding-left: 10px;
    height: 30px;
    color:#fff;
    background-color: red;
  }
  .complete{
    width: 60%;
    height: 50px;
    float: left;
    margin-left: 20%;
    margin-top: 10%;
    background-color: #0aac34;
    color: #fff;
    border-radius: 10px;
  }
  #chart_id{
    width: 70%;
    float: left;
    margin-left: 15%;
    padding-left: 10px;
    height: 30px;
  }
</style>

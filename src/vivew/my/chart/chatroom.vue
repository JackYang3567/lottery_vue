<template>
  <div id="app" >
    <div class="coins" v-if="hb_set.expect">
      <div v-for="(item,key) in hb_set.hb_data" class="red-package" :style="{left: hbLeft(key) + 'px',top:hbTop+'px',transition: 5 + (Math.random() * 10) + 's linear'}"  @click="problem(item)">
        {{ item.title }}
      </div>
    </div>
    <main class="kd-body chat-room" style="background-color: #fff;">
      <div style="width: 100%;max-width: 640px;height: 30px;position: fixed;top: 3.0125rem;z-index: 999;background: white;display: flex;">
        <div style="width: 15%;height: 30px;border: 1px solid red;line-height: 30px;text-align: center;font-size: 0.975rem;font-weight: 500;font-family: '微软雅黑';background: red;color: white;">群公告</div>
        <div style="width: 85%;height: 30px;line-height:30px;border: 1px solid red;font-family: '微软雅黑';font-size: 0.975rem;">
          <marquee direction="left" align="bottom" width="100%" scrollamount="4">
              {{Notice}}
          </marquee>
        </div>
      </div>
      <div class="chat-more"><a href="javascript:;" @click="getHistory">历史记录...</a></div>

      <dl class="kd-container chat-messages" v-for="item in data.data" v-longtap="(e)=>dis(item.id,item.Spokesman,e)">
        <dt class="chat-author" >
          <i class="icon" v-if="item.photo == 0"></i>
          <img style="width:30px;border-radius:50%;"  :src="require('@/assets/images/photo/'+ item.photo +'.png')" v-else />
          <span class="name">{{ item.name}}</span>
          <time class="time">{{ item.Publication }}</time>
        </dt>

        <dd class="chat-message" v-if="item.type == 1">
          <div class="inner" v-html="item.content" style="word-break: break-all; word-wrap:break-word;">{{ item.content }}</div>
        </dd>

        <dd class="chat-message" v-if="item.type == 2">
          <div class="inner" v-html="item.content" style="word-break: break-all; word-wrap:break-word;" @click = "heel(item.address)">{{ item.content }}</div>
        </dd>

        <dd class="chat-message" v-if="item.type == 3">
          <div class="inner" v-html="item.content" style="word-break: break-all; word-wrap:break-word;" @click="Get_red_envelopes(item.address)">
              {{ item.content }}
          </div>
        </dd>


      </dl>


      <div class="chat-textinput" style = "height: 13.5%;border-top: #ccc solid 0.2px;">

        <div class = "toolbar">
            <a id="send-face-button" class="icon send-face-button " @click="show_emoji=!show_emoji"></a>

            <a @click = "file_upload">
              <img :src="require('@/assets/images/chart/File.png')" style = "height: 30px;margin-bottom: -13px;"/>
            </a>

            <a @click="send_envelopes">
              <img :src="require('@/assets/images/chart/hb.png')" style = "height: 30px;margin-bottom: -13px;"/>
            </a>

            <!--<form action="" enctype="multipart/form-data" method='POST' id="form1" style = "display:none;">-->
            <input type = "file"  accept = "image/*" id = "file" style = "display: none">
            <input type = "text" id = "imgdata" style = "display: none" value = "1">
            <!--</form>-->
        </div>

        <div class="kd-textinput textarea" style = " width: 72%;float: left;height: 50%;border: solid #c2ccd1 1px;margin-left: 2%;" @keyup.enter="send">
          <div style="height:2.875rem;text-align: left;" @focus="show_emoji=false" :contenteditable="set['is_open'] == 1 ? true:false" id="content" @click="contentTip">
          </div>
        </div>
        <!--<div title="4" :class="['kd-marquee chat-notice']"> &lt;!&ndash; ,{'de':set.is_open=='0'} &ndash;&gt;-->
          <!--<div :class="['inner']"> &lt;!&ndash; ,{'de':set.is_open=='0'} &ndash;&gt;-->
            <!--<marquee direction="left" align="bottom" width="100%" scrollamount="3">-->
              <!--注意：{{ set.explain }}-->
            <!--</marquee>-->
          <!--</div>-->
        <!--</div>-->
        <div type="button" class="kd-button send" @click="send" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }" style = "margin-top:60px;">
          <span>发 送</span>
          <button type="button">Button</button>
        </div>
      </div>

      <div class="coins"></div>

      <transition name="bounce3">
        <div class=" face-selector" v-show="show_emoji">
          <div style="width:100%;height:150px;">
            <mt-swipe :auto="0">
              <div is="mt-swipe-item" v-for="(item,key) in emoji">
                <ul class="nostyle face-selector-group clearfix" style="width:100%;">
                  <li :title="value" class="item" v-for="(value,key2) in item"><img :src="''+ ('api_path' in $store.state && $store.state.api_path ? $store.state.api_path : $store.state.basic.static_path) + '/static/images/faces/' + (value == '删除' ? 'delete' : ('00' + (key ? emoji[key-1].length + key2 : key2 + 1)).substr(-3)) + '.gif'" :alt="'[' + value + ']'" @click="emojiAction(value,('00' + (key ? emoji[key-1].length + key2 : key2 + 1)).substr(-3))"></li>
                </ul>
              </div>
            </mt-swipe>
          </div>
        </div>
      </transition>

      <transition name="bounce2">
        <div class="promptbox-wrapper" v-if="alert">
          <section class="promptbox prompt-chat-history" :style="{ border: '2px solid ' + $store.state.basic.main_color }">
            <div class="prompt-head" :style="{background: $store.state.basic.main_color }">历史消息({{ ('total' in history_data ? history_data.total : 0) }})</div>
            <div class="prompt-body" style="max-height: 426px;" v-if="Object.keys(history_data).length">
              <ul class="nostyle history-list">
                <li v-for="item in history_data.data">
                  <div class="history-title">{{ item.name }} {{ item.Publication }}</div>
                  <div class="history-message" style="word-break: break-all; word-wrap:break-word;" v-html="item.content">{{ item.content }}</div>
                </li>
              </ul>
              <div class="kd-pager chat-history-pager">
                <a class="kd-pager-item first disabled" @click="getHistory(1)">&lt;&lt;</a>
                <a class="kd-pager-item prev disabled" @click="getHistory((history_data.current_page - 1 < 1 ? 1 : history_data.current_page - 1))">&lt;</a>
                <span class="kd-pager-item current">{{ history_data.current_page }} / {{ history_data.last_page }}</span>
                <a class="kd-pager-item next" @click="getHistory(parseInt(history_data.current_page) + 1)">&gt;</a>
                <a class="kd-pager-item last" @click="getHistory(history_data.last_page)">&gt;&gt;</a>
              </div>
            </div>
            <div class="empty_class" v-else>没有更多数据了</div>
            <a class="prompt-close kd-close" @click="alert=false;">close</a>
          </section>
          <div class="promptbox-overlay"></div>
        </div>
      </transition>
    </main>
    <group>
      <x-dialog v-model="set_red" class="dialog-demo" hide-on-blur id = "set_red">
        <div style = "color:red">红包设置</div>
        <input type="text" class = "set_Amount" placeholder="总金额（￥）" id = "red_money" onkeyup="value=value.replace(/[^\d.]/g,'')" >
        <input type = "text" class = "set_Amount" placeholder="红包个数" id = "red_number" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')">
        <input type="text" class = "set_Amount" placeholder="恭喜发财，大吉大利" id = "red_Blessings">
        <select class = "set_Amount" id = "red_type">
          <option value="1">普通红包(平均分配)</option>
          <option value="0">拼手气红包（随机分配）</option>
        </select>
        <button @click="Sending_red_packets" class = "button">
          塞钱进红包
        </button>
      </x-dialog>
    </group>


    <group>
      <x-dialog v-model="operation" class="dialog-demo" hide-on-blur>
        <div style="margin:10px 0;">
          <div style="margin-bottom:5px;color:#555;font-size:14px;padding:6px 0;">
            请选择你的操作：
            <div class = "operation" @click="Withdraw_message">撤回消息</div>
            <div class = "operation" style = "background-color: red" @click="Removal_Group">删除群员</div>
          </div>
        </div>
      </x-dialog>
    </group>







  </div>
</template>
<script>
  import { Group,XDialog,XButton} from 'vux';
  export default{
    mounted(){
      let _this = this;
      // _this.Obtain();
      // _this.getChat();
      // _this.getConfig();
      // setTimeout(()=>{
      //   _this.smooth();
      // },1000);
    },
    components:{
     Group,XDialog,XButton
    },
    data () {
      return {
        operation:false,
        operation_data:[],
        msg:[],
        Notice:[],
        emoji: [
          ['微笑','撇嘴','色','发呆','得意','流泪','害羞','闭嘴','睡','大哭','尴尬','发怒','调皮','呲牙','惊讶','难过','酷','冷汗','发狂','吐','偷笑','愉快','白眼','删除'],
          ['傲慢','饥饿','困','惊恐','流汗','憨笑','悠闲','奋斗','咒骂','疑问','嘘','晕','疯了','衰','骷髅','敲打','再见','擦汗','抠鼻','鼓掌','糗大了','坏笑','删除'],
          ['右哼哼','哈欠','鄙视','委屈','快哭了','阴险','亲亲','吓','可怜','菜刀','西瓜','啤酒','篮球','乒乓','咖啡','饭','猪头','玫瑰','凋谢','嘴唇','爱心','删除'],
          ['闪电','炸弹','刀','足球','瓢虫','便便','月亮','太阳','礼物','拥抱','强','弱','握手','胜利','抱拳','勾引','拳头','差劲','爱你','NO','删除'],
          ['爱情','飞吻','跳跳','发抖','怄火','转圈','磕头','回头','跳绳','投降','笑脸','生病','哭笑','吐舌','晕菜','脸红红','呐喊','可失落','删除']
        ],
        set_red:false,
        show_emoji: false,
        alert: false,
        data: [],
        is_data:[],
        set: { is_open: 0,explain: '加载中...' },
        history_data: {},
        form: { content: '' },
        loading: false,
        hb_set: {
          end_time: 0,
          display_time: '',
          hb_data: [],
          expect: 0
        },
        setTimeout_ids: [],
        hbTop: -50,
        hb_state: false
      }
    },
    methods: {
      //踢出群
      Removal_Group(){
        if(window.confirm('你却定把此人移除群吗？')){
          let _this = this;
          _this.$getData({
            loading:true,
            url:'/api/home/Chartroom/Removal_Group',
            type:'post',
            data: {
              'Spokesman':_this.operation_data['Spokesman'],
              'group_id':_this.$route.params.id
            },
            callback:function(res){
              _this.$total({ message: res.tips,type: 2});
              _this.operation = !_this.operation;
              if(res.type){
                _this.Obtain();
              }
            }
          });
        }
      },
      //撤回消息
      Withdraw_message(){
        let _this = this;
        _this.$getData({
          loading:true,
          url:'/api/home/Chartroom/Withdraw_message',
          type:'post',
          data: {
            'id':_this.operation_data['id'],
            'group_id':_this.$route.params.id
          },
          callback:function(res){
            _this.$total({ message: res.tips,type: 2});
            _this.operation = !_this.operation;
            if(res.type){
              _this.Obtain();
            }
          }
        });
      },




      dis(id,Spokesman){
        this.operation_data['id'] = id;
        this.operation_data['Spokesman'] = Spokesman;
        this.operation = true;
      },


      //跟投
      heel(data){
        var arr = data.split("|");
        let _this = this;
          _this.$getData({
            loading:true,
            url:'/api/Home/Lottery_S/betting',
            type:'post',
            data:{
              betting:arr[1],
              basic:arr[2],
              type:arr[0]
            },
            callback:function(res){
              _this.$total({ message: res.msg,type: 2});
            }
          });
      },

      //领取红包
      Get_red_envelopes(red_id){
        let _this = this;
        _this.$getData({
          url:'/api/home/Chartroom/Get_red_envelopes',
          type:'post',
          data:{
            'red_id':red_id
          },
          callback:function(res){
            _this.$total({ message: res.Tips,type: 2 });
          }
        })
      },

      //设置红包弹窗
      send_envelopes(){
        let _this = this;
        _this.set_red =!_this.set_red;
      },

      //发送红包
      Sending_red_packets() {

        var red_money = document.getElementById('red_money').value;
        var red_number = document.getElementById('red_number').value;
        var red_Blessings = document.getElementById('red_Blessings').value;
        var red_type = document.getElementById('red_type').value;

        if (red_money == null || red_money == "" || red_money == 0) {
          alert("请输入正确的红包金额");
          return;
        }

        if (red_number == null || red_number == "" || red_number == 0) {
          alert("请输入正确的红包个数");
          return;
        }
        if (red_Blessings == null || red_Blessings == "") {
          red_Blessings = "恭喜发财，大吉大利";
        }
        if (red_money && red_number) {
          let _this = this;
          _this.$getData({
            url: '/api/home/Chartroom/send_envelopes',
            type: 'post',
            data: {
              'red_number': red_number,
              'red_money': red_money,
              'red_Blessings': red_Blessings,
              'red_type': red_type,
              'chart_id': _this.$route.params.id,
            },
            callback: function (res) {
              if(res.type){
                _this.send_envelopes();
                _this.$total({ message: res.Tips,type: 2 });
              }else{
                _this.$total({ message: res.Tips,type: 2 });
              }
            }
          })
        }
      },

      //图片上传
      file_upload(){
        let _this = this;
        document.getElementById('file').click();
        var file = document.getElementById("file");
        file.onchange = function () {
          _this.chooseImg(file);
        };
      },
      chooseImg(f){
        let _this = this;
        var fileReader = new FileReader();
        fileReader.readAsDataURL(f.files[0]);
        fileReader.onload = function(){
          var a = this.result;
          _this.$getData({
            url:'/api/Home/Chartroom/up_img',
            data: {
              'imgdata':a,
              'chart_id':_this.$route.params.id
            },
            callback(res) {

            }
          });
        };
      },



      Obtain(){
        let _this = this;
        var chart_id = _this.$route.params.id;
        if(chart_id != null){
          _this.$getData({
            url:'/api/Home/Chartroom/getChartcontent',
            data: { page: chart_id },
            callback(res){
              _this.setTimeout_ids=(setTimeout(()=>{
                _this.Obtain();
              },3000));
              if(res.set['is_open']){
                _this.set = res.set;
              }

              // _this.$set(_this.is_data,'is_data',res.data['list']);
              _this.msg = res.msg;
              _this.Notice = res.Notice;
              if(res.code){
                // _this.data = _this.data.concat(res.data['list']);
                _this.$set(_this.data,'data',res.data['list']);
                _this.$nextTick(()=>{
                  _this.smooth();
                });
              }

            }
          });
        }
      },

      hbLeft(item){
        if(item){
          return item * (document.body.clientWidth / this.hb_set.hb_data.length);
        }else{
          return 10;
        }
      },
      problem(item){
        let _this = this;
//        this.$messagebox.prompt(item.problem,'').then(({ value }) => {
//          if(!value){
        _this.$getData({
          url:'/api/Home/Discount/hongBaoAction',
//              data: { value: value,id: item.id,expect: this.hb_set.expect },
          data: {id: item.id,expect: this.hb_set.expect},
          callback(res){
            if(res.code == -1){
              _this.$set(_this.hb_set,'hb_data',[]);
            }
            _this.$messagebox('', res.msg);
          }
        });
//          }
//        },()=>{});
      },
      clearTimeout(){
        for (let i = 0,j = this.setTimeout_ids.length; i < j; i++) {
          clearTimeout(this.setTimeout_ids[i]);
          clearInterval(this.setTimeout_ids[i]);
        }
        this.setTimeout_ids = [];
      },
      getHistory(is_page){
        this.alert = true;
        let _this = this;
        is_page = (is_page && /^\d+$/.test(is_page) ? is_page : 1);
        if(Object.keys(this.history_data).length && (is_page == this.history_data.current_page || is_page > this.history_data.last_page)){
          return;
        }

        _this.$getData({
          // loading: true,
          url:'/api/Home/Chartroom/get_chart_record',
          data: {
            page:is_page,
            'chart_id': _this.$route.params.id
          },
          callback(res){
            if(res.code){
              _this.history_data = res.data;
            }else{
              _this.$total({ message: '没有更多历史数据了',type: 2 })
            }
          }
        });
      },
      getConfig(){
        let _this = this;
        _this.hb_state = true;
        _this.$set(_this.hb_set,'hb_data',[]);
        _this.hbTop = -50;
        _this.$getData({
          url: '/api/Home/Discount/getHongBaoConfig',
          callback(res){
            _this.$set(_this.hb_set,'end_time',parseInt((new Date()).getTime())  + parseInt(res.time) * 1000);
            if(_this.hb_set.expect){
              _this.$set(_this.hb_set,'hb_data',res.hb_data);
              _this.$nextTick(() => {
                _this.hbTop = document.body.offsetHeight;
              });
            }
            _this.$set(_this.hb_set,'expect',res.expect);
            _this.timeTool();
          }
        });
      },
      timeTool(){
        let _this = this
          ,cha = Math.round((_this.hb_set.end_time - new Date().getTime()) / 1000); //秒
        if(cha < 0){
          setTimeout(() => {
            _this.getConfig();
          },(this.hb_set.expect ? 2000 : 60000));
          return;
        }
        let day = parseInt(cha / 86400)
          ,h = parseInt(cha % 86400 / 3600)
          ,m = parseInt(cha % 86400 % 3600 / 60)
          ,s = Math.round(cha % 86400 % 3600 % 60);
        (h < 10) && (h = "0" + h);
        (m < 10) && (m = "0" + m);
        (s < 10) && (s = "0" + s);
        _this.$set(_this.hb_set,'display_time',((day > 0 ? day + '天 ' : '') + h + ':' + m + ':' + s));
        setTimeout(() => {
          _this.timeTool();
        },1000);
      },
      getChat(){
        this.clearTimeout();
        if( this.loading || this.setTimeout_ids.length) return;
        // this.loading = true;
        let _this = this,
          _id = (_this.data.length ? _this.data[_this.data.length-1].id : 0);
        _this.$getData({
          url:'/api/Home/Discount/getChatRoom',
          data: { id: _id },
          callback(res){
            _this.clearTimeout();
            if(res.code){
              _this.data = _this.data.concat(res.data['list']);
              // _this.$nextTick(()=>{
              //   _this.smooth();
              // });
              if(res.data['set']){
                _this.set = res.data['set'];
              }
            }else{
              _id == 0 && (_this.$total({ message:res.msg,type: 2 }));
            }
            _this.setTimeout_ids.push(setTimeout(()=>{
              _this.getChat();
            },3000));
            _this.loading = false;
          },
          errorCallback(){
            let _this = this;
            _this.setTimeout_ids.push(setTimeout(()=>{
              _this.loading = false;
              _this.getChat();
            },3000));
          }
        });
      },

      emojiAction(val,key){
        let _obj = document.getElementById('content');
        if(val == '删除'){
          _obj.innerHTML = _obj.innerHTML.replace(/<img.+\/>$|.{1}$/,'');
        }else{
          _obj.innerHTML += ('<img alt="[' + val + ']" src="' + ('api_path' in this.$store.state && this.$store.state.api_path ? this.$store.state.api_path : this.$store.state.basic.static_path) + '/static/images/faces/' + key + '.gif"/>');
        }
      },
      smooth(){//滚动条平滑动作
        let scrollTop = document.documentElement.scrollTop;
        //公式 总滚动距离 - 滚动条长度 = 可滚动距离
        let range = document.documentElement.scrollHeight - document.documentElement.offsetHeight;
        //如果 可滚动距离 - 滚动条位置 > 500
        if(range - document.documentElement.scrollTop > 500){
          document.documentElement.scrollTop += 300;
        }else{
          document.documentElement.scrollTop += 10;
        }
        //如果无效 使用第二种方式下拉
        if(scrollTop == document.documentElement.scrollTop){
          range = document.body.scrollHeight - document.body.offsetHeight;
          if(range - document.body.scrollTop > 500){
            document.body.scrollTop += 300;
          }else{
            document.body.scrollTop += 10;
          }
          if(document.body.scrollTop < range){
            setTimeout(this.smooth,10);
          }
        }else if(document.documentElement.scrollTop < range){
          setTimeout(this.smooth,10);
        }
      },
      // smooth(){ // 滚动条平滑动作
      //   // console.log(1);
      //   let range = document.body.scrollHeight - document.body.offsetHeight;
      //   if(range - document.body.scrollTop > 500){
      //     document.body.scrollTop += 300;
      //     document.documentElement.scrollTop += 300;
      //   }else{
      //     document.body.scrollTop += 5;
      //     document.documentElement.scrollTop += 5;
      //   }
      //   if(document.body.scrollTop < range){
      //     setTimeout(this.smooth,10);
      //   }
      // },
      contentTip(){
        if(this.set.is_open == 0){
          this.$toast('当前禁止文字发言,可表情聊天!');
        }
      },
      send(){
        let _this = this;
        _this.form.content = document.getElementById('content').innerHTML;
        if(_this.form.content == ''){
          _this.$total({ message: '请输入您要发送的信息',type: 2 });
          return;
        }

        _this.$getData({
          url:'/api/Home/Chartroom/Send_chat_messages',
          data: {
            'content':_this.form,
            'chart_id':_this.$route.params.id
          },
          callback: function(res){
            // console.log(res);
            // _this.$total({ message:res.msg,type: 0 });
            if(res.code > 0){
              // _this.$total({ message:res.msg,type: 1 });
              document.getElementById('content').innerHTML = '';
              _this.form.content = '';
              _this.show_emoji = false;
            }else{
              _this.$total({ message:res.msg,type: 0 });
            }
          }
        });
      }
    }
  }
</script>

<style>
  .kd-body {
    padding-top: 4.0625rem !important;
  }
  .mint-swipe-indicator.is-active {
    background: #777777;
    opacity: 1;
  }
  .mint-swipe-indicators {
    bottom: 3px;
  }
  .empty_class {
    text-align: center;
    color: #999;
    line-height: 100px;
  }
  .de{
    width: 100%;
    display: block;
  }
  .kd-marquee .inner {
    display: inline;
  }

  .toolbar{
    width: 70%;
    height:2.4rem;
    float: left;
    margin-bottom: 5px;
    /*border-bottom: #c2ccd1 solid 0.2px;*/
  }
  .toolbar > a{
    float: left;
    margin: 2% auto auto 20px;
  }
  .set_Amount{
    float:left;
    width: 80%;
    margin-left:10%;
    margin-top: 3%;
    height: 30px;
    font-size: 14px;
  }

  .set_type{
    height: 36px;
    font-size: 16px;
  }
  .button{
    border-radius:10px;
    float: left;
    color: #FCF8E3;
    background-color: red;
    height:30px;
    width: 50%;
    margin-top: 50px;
    margin-left: 25%;
    padding-left: 10px;
    margin-bottom: 20px;

    font-size: 16px;

  }


  /***************************      ↓红包样式        *****************************************************/
  body {
    font-family: "Microsoft Yahei", sans-serif;
  }
  a {
    text-decoration: none;
  }

  .bag{
    height: 80px;
    width: 240px;
    border:solid #ccc 0.5px;
    background-color: #FCF8E3;
    border-radius: 5px;
    color: #ccc;
    text-align: left;
  }
  .header{
    width:100%;
    height:75%;
    background-color: #FF9900;
    color: #fff;
    font-size: 16px;
    text-align: center;
    line-height: 60px;
    font-weight: 500;
  }
  .header > img {
    height: 30px;
    width: 24px;
    margin:14px;
    float: left;
  }
  .stick{
    float: left;
    margin-left: 5px;
    font-size:10px;
    margin-top: 2px;
  }

  /***************************      ↑红包样式        *****************************************************/

  /***************************      ↓分享推送样式        *****************************************************/
  .message {
    width:240px;
    background-color:#c2ccd1;
    color: #fff;
    font-size: 12px;
    line-height: 18px;
    /*padding: 5px 12px 5px 12px;*/
    box-sizing: border-box;
    border-radius: 6px;
    position: relative;
    word-break: break-all;
  }
  .info{
    background-color:#996633;
  }
  .info > p{
    margin-top: 5px;
    margin-left: 5px;
  }

  .message > p{
    font-size: 13px;
    margin-left: 5px;
  }
  /***************************      ↑分享推送样式        *****************************************************/



  .operation{
    color: #fff;
    margin:15px auto;
    background-color: #c2ccd1;
    width:60%;
    height:30px;
    line-height: 30px;
  }
</style>

<template>
  <div id="app">
    <main class="kd-body">
      <div class="lottery-wrapper" style="height:100%;">
        <div align="center" v-if="data.length==0">
          <br><mt-spinner type="triple-bounce" :color="$store.state.basic.main_color"></mt-spinner><br>
        </div>
        <template v-else>
          <tab :active-color="$store.state.basic.main_color" v-model="index">
            <tab-item v-for="(item, key) in data" :key="key">{{ item.name }}</tab-item>
          </tab>
          <div style="width:100%;height: 100%;overflow-y:auto;background:#f0f0f0;" v-if="data.length">
            <mt-tab-container class="page-tabbar-tab-container" v-model="active" :swipeable="true">
              <template v-for="(item, key) in data">
                <mt-tab-container-item :id="'tab' + key">
                  <template v-for="item1 in data[index].data">
                    <div class="item1" @click="$router.push('/' + lotteryLocal['key' + item1.type].path + '/' + item1.type);">
                      <div class="item2">
                        <div class="kd-game" style="border:none;width:27%">
                          <figure :class="'kd-game-logo ' + lotteryLocal['key' + item1.type].class" style="width:4.1rem">
                            <img v-if="lotteryLocal['key' + item1.type].img" :src="lotteryLocal['key' + item1.type].img" alt="blank" data_ast="01">
                            <img v-else src="../../assets/images/blank.gif" alt="blank">
                            <i :class="'icon icon-' + lotteryLocal['key' + item1.type].class1"></i>
                          </figure>
                        </div>
                        <div class="item5" style="">
                          <div style="display: flex;height: 20%;width: 100%;padding-left: 10px">
                            <div class="item6" style="width: 40%;">{{ item1.name }}</div>
                            <div style="width: 60%;font-size: 12px;">第{{item1.down.now_expect}}期</div>
                          </div>
                          <template v-if="item1.type==0 || item1.type==1 || item1.type==53 || item1.type==52"></template>
                          <template v-else>
                            <div class="item6" style="display:block;width: 100%;height: 30%;padding:10px 0 0 10px;color: red;font-weight: bold;" v-if="item1.content">{{ item1.content }}</div>
                            <div class="item6" style="display:block;width: 100%;height: 30%;padding:10px 0 0 10px;color: red;font-weight: bold;font-size: 12px;" v-else>正在开奖中...</div>
                          </template>
                          <div class="item6" style="width: 100%;padding-left: 10px;margin-top: 15px;">
                            <div v-if="item1.down.expect" style="display: flex;width: 100%;">
                              <div style="width: 40%;font-size: 12px;">距离{{ item1.down.expect }}期截止还有:</div>
                              <div style="color:red;width: 60%;position: relative;top: -7px;">
                                <template v-if="countDown(item1.down.time)=='封盘中...'">
                                  <span>{{ countDown(item1.down.time) }}</span>
                                </template>
                                <template v-else>
                                  <template v-for="i in countDown(item1.down.time)">
                                      <span :class="(i!=':' && i!='天')?'show-time':''">
                                        {{i}}
                                      </span>
                                  </template>
                                </template>
                              </div>
                            </div>
                            <div v-else-if="['53','54','55','56'].indexOf(item1.type) > -1">
                              {{item1.note}}
                            </div>
                            <div v-else>
                              暂停销售中...
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="item3" @click.stop.prevent="">
                        <div class="item4" @click="$router.push('/trend/' + item1.type)">
                          <img src="../../assets/images/svg/zs.svg" style="vertical-align:middle;"></img>
                          <span style="vertical-align:middle;">号码走势</span>
                        </div>
                        <div class="item4" @click="$store.state.game_rule = item1.type">
                          <img src="../../assets/images/svg/gz.svg" style="vertical-align:middle;"></img>
                          <span style="vertical-align:middle;">玩法规则</span>
                        </div>
                        <template v-if="myCollection.indexOf(item1.type)==-1">
                          <div class="item4" style="border-right:none;" @click="collectionThis(item1.type)">
                            <img src="../../assets/images/png/wsc.png" style="width: 23px;position: relative;top: 4px;left: 2px;">
                            <span style="vertical-align:middle;">收藏彩种</span>
                          </div>
                        </template>
                        <template v-else>
                          <div class="item4" style="border-right:none;" @click="delCollection(item1.type)">
                            <img src="../../assets/images/png/ysc.png" style="width: 16.5px;position: relative;top: 3.5px;left: 2px;">
                            <span style="vertical-align:middle;">已收藏</span>
                          </div>
                        </template>
                      </div>
                    </div>
                  </template>

                  <div align="center" v-if="data[key].data.length<1">
                    <br><mt-spinner type="triple-bounce" :color="$store.state.basic.main_color"></mt-spinner><br>
                  </div>

                </mt-tab-container-item>
              </template>
            </mt-tab-container>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script>
  import { Tab,TabItem } from 'vux';
  export default {
    components: { Tab,TabItem },
    mounted(){
      this.getAllCollection();
      this.getInfo();
    },
    data () {
      return {
      /*  lotteryLocal: {
          key0: {class:'game-bjl',path:'Bjl',class1:'bjl'},
          key1: {class:'game-lhd',path:'Lhd',class1:'lhd'},
          key2: {class:'game-cqssc',path:'game-s',class1:'cqssc'},
          key3: {class:'game-pk10',path:'game-p',class1:'pk10'},
          key4: {class:'game-ofsc',path:'game-p',class1:'ofsc'},
          key5: {class:'game-ft',path:'game-p',class1:'ft'},
          key6: {class:'game-aksfc1',path:'game-s',class1:'aksfc1'},
          key7: {class:'game-aksfc2',path:'game-s',class1:'aksfc2'},
          key8: {class:'game-aksfc',path:'game-s',class1:'aksfc'},
          key9: {class:'game-aksfc5',path:'game-s',class1:'aksfc5'},
          key10: {class:'game-jsk3',path:'game-c',class1:'jsk3'},
          key11: {class:'game-demo',path:'game-l',class1:'',img:require('../../assets/images/cptb/jslhc.png')},     //急速六合彩
          key12: {class:'game-xjssc',path:'game-s',class1:'xjssc'},
          key13: {class:'game-tjssc',path:'game-s',class1:'tjssc'},
          key14: {class:'game-shk3',path:'game-c',class1:'shk3'},
          key15: {class:'game-ahk3',path:'game-c',class1:'ahk3'},
          key16: {class:'game-gd115',path:'game-x',class1:'gd115'},
          key17: {class:'game-sd115',path:'game-x',class1:'sd115'},
          key18: {class:'game-sx115',path:'game-x',class1:'sx115'},
          key19: {class:'game-fc3d',path:'game-p3d',class1:'fc3d'},
          key20: {class:'game-demo',path:'game-klsf',class1:'',img:require('../../assets/images/cptb/kl10.png')}, //幸运pk10
          // key20: {class:'game-gxklsf',path:'game-klsf',class1:'gxklsf'},
          key21: {class:'game-marksix',path:'game-l',class1:'marksix'},
          key22: {class:'game-tcpl3',path:'game-p3d',class1:'tcpl3'},
          key23: {class:'game-xync',path:'game-nc',class1:'xync'},
          key24: {class:'game-pcdd-bj',path:'game-pc',class1:'pcdd-bj'},
          key25: {class:'game-pcdd-jnd',path:'game-pc',class1:'pcdd-jnd'},
          key26: {class:'game-pcdd-cq',path:'game-pc',class1:'pcdd-cq'},
          key27: {class:'game-pcdd-xj',path:'game-pc',class1:'pcdd-xj'},
          key28: {class:'game-aksfc5',path:'game-s',class1:'aksfc5'},
          key29: {class:'game-qxc',path:'game-qxc',class1:'qxc'},
          key30: {class:'game-jsk3',path:'game-c',class1:'shk3 gxk3'},
          key31: {class:'game-jsk3',path:'game-c',class1:'shk3 hubk3'},
          key32: {class:'game-jsk3',path:'game-c',class1:'shk3 hebk3'},
          key33: {class:'game-jsk3',path:'game-c',class1:'shk3 gsk3'},
          key34: {class:'game-jsk3',path:'game-c',class1:'shk3 bjk3'},
          key36: {class:'game-demo',path:'game-p',class1:'',img:require('../../assets/images/cptb/yfsc.png')}, //一分赛车 <img data-v-22a633ce="" src="/static/img/room-level1-bg.59838fe.png" class="room-box-bg">
          key37: {class:'game-demo',path:'game-p',class1:'',img:require('../../assets/images/cptb/xypks.png')}, //幸运pk10
          key38: {class:'game-demo',path:'game-p',class1:'',img:require('../../assets/images/cptb/klpks.png')}, //快乐PK10
          key39: {class:'game-demo',path:'game-p',class1:'',img:require('../../assets/images/cptb/xjpsm.png')}, //新加坡赛马
          key40: {class:'game-demo',path:'game-c',class1:'',img:require('../../assets/images/cptb/jsk3.png')}, //极速快三
          key41: {class:'game-demo',path:'game-c',class1:'',img:require('../../assets/images/cptb/xyk3.png')}, //幸运快三
          key42: {class:'game-jsk3',path:'game-c',class1:'shk3 bjk3'}, //天津快三
          key43: {class:'game-jsk3',path:'game-c',class1:'shk3 bjk3'}, //吉林快三
          key44: {class:'game-demo',path:'game-x',class1:'',img:require('../../assets/images/cptb/jssyxw.png')}, //极速11选5
          key45: {class:'game-demo',path:'game-x',class1:'',img:require('../../assets/images/cptb/xysyxw.png')}, //幸运11选5
          key46: {class:'game-gd115',path:'game-x',class1:'sd115'}, //安徽11选5
          key47: {class:'game-gd115',path:'game-x',class1:'sd115'}, //江西11选5
          key48: {class:'game-gd115',path:'game-x',class1:'sd115'}, //新疆11选5
          key49: {class:'game-gd115',path:'game-x',class1:'sd115'}, //上海11选2
          key50: {class:'game-gxklsf',path:'game-klsf',class1:'gxklsf'},//广东快乐十分
          key51: {class:'game-demo',path:'game-p',class1:'',img:require('../../assets/images/cptb/jsft.png')}, //极速飞艇
          key52: {class:'game-demo',path:'game-brnn',class1:'',img:require('../../assets/images/cptb/brnn.png')}, //极速飞艇
          key53: {class:'game-lhj',path:'game-lhj',class1:'',img:require('../../assets/images/lhj/cover.png')}, //水果喇叭
          key54: {class:'game-lhj',path:'game-lhj',class1:'',img:require('../../assets/images/lhj2/cover.png')}, //沉鱼落雁
          key55: {class:'game-lhj',path:'game-lhj',class1:'',img:require('../../assets/images/lhj3/cover.png')}, //忍者神龟
          key56: {class:'game-demo',path:'game-troom',class1:'',img:require('../../assets/images/tiger/tigerIcon.png')}, //老虎机
          key57: {class:'game-demo',path:'game-pc',class1:'',img:require('../../assets/images/cptb/tg28.png')},
          key58: {class:'game-demo',path:'game-pc',class1:'',img:require('../../assets/images/cptb/wl28.png')},
          key59: {class:'game-jsk3',path:'game-hlsb',class1:'shk3 bjk3',img:require('../../assets/images/cptb/hltb.png')},
          key60: {class:'game-demo',path:'game-s',class1:'',img:require('../../assets/images/cptb/qqffc.png')},
          key61: {class:'game-demo',path:'game-s',class1:'',img:require('../../assets/images/cptb/qqffc.png')},
          key62: {class:'game-demo',path:'game-s',class1:'',img:require('../../assets/images/cptb/qqffc.png')},
          key63: {class:'game-demo',path:'game-s',class1:'',img:require('../../assets/images/cptb/qqffc.png')},
          key64: {class:'game-fc3d',path:'game-p3d',class1:'fc3d'},
          key65: {class:'game-fc3d',path:'game-p3d',class1:'fc3d'},
          key66: {class:'game-fc3d',path:'game-p3d',class1:'fc3d'},
          key67: {class:'game-fc3d',path:'game-p3d',class1:'fc3d'},
          key68: {class:'game-fc3d',path:'game-p3d',class1:'fc3d'},
          key69: {class:'game-fc3d',path:'game-p3d',class1:'fc3d'},
          key70: {class:'game-fc3d',path:'game-p3d',class1:'fc3d'},
          key71: {class:'game-fc3d',path:'game-p3d',class1:'fc3d'},
          key72: {class:'game-fc3d',path:'game-p3d',class1:'fc3d'},
          key73: {class:'game-marksix',path:'game-l',class1:'marksix'},
          key74: {class:'game-marksix',path:'game-l',class1:'marksix'},
          key75: {class:'game-marksix',path:'game-l',class1:'marksix'},
          key76: {class:'game-marksix',path:'game-l',class1:'marksix'},
          key77: {class:'game-gd115',path:'game-x',class1:'sd115'}, //上海11选2
          key78: {class:'game-demo',path:'game-s',class1:'',img:require('../../assets/images/cptb/qqffc.png')},
          key79: {class:'game-demo',path:'game-hlsb',class1:'',img:require('../../assets/images/cptb/hltb.png')},
        },
        */
        data: [],
        index: 0,
        active: 'tab0',
        loadding_down: true,
        myCollection:[],

      }
    },
    computed:{},
    methods: {
      //获取用户所有的收藏
      getAllCollection(){
        var _this = this;
        this.$getData({
          url:'/api/Home/My/getCollection',
          callback: function(data){
            if(data.length>0)
            {
              for(var i=0;i<data.length;i++)
              {
                if(_this.myCollection.indexOf(String(data[i].type)) == -1)
                {
                  _this.myCollection.push(String(data[i].type));
                }
              }
            }
          }
        });
      },
      collectionThis(type){
        var _this = this;
        this.$getData({
           type:'post',
           url:'/api/Home/My/addCollection',
          data: { type:type},
          callback: function(data){
             if(data == 1)
             {
               if(_this.myCollection.indexOf(type) == -1)
               {
                 _this.myCollection.push(type);
               }
             }
          }
        });
      },
      delCollection(type){
        var _this = this;
        this.$getData({
          type:'post',
          url:'/api/Home/My/delCollection',
          data: { type:type},
          callback: function(data){
            if(data == 1)
            {
              var key = _this.myCollection.indexOf(type);
              _this.myCollection.splice(key,1);
            }
          }
        });
      },
      urlAction(url,type){
        location.href = '' + ('api_path' in this.$store.state && this.$store.state.api_path ? this.$store.state.api_path : this.$store.state.basic.static_path) + '/Home/' + url + '/' + (this.$store.state.login ? '?token=' + localStorage.getItem('pragma') : '');
      },
      // handleChange(index){
      //   this.index = index;
      // },
      getInfo(){
        var _this = this;
        this.$getData({
          url:'/api/Home/Lottery/getLotteryList',
          data: { type: 1,index:_this.index },
          callback: function(data){
            if(data){
              data = data.type;
               // console.log(data);
              for(let i = 0,j = data[_this.index].data.length;i<j;i++){
                if(data[_this.index].data[i]['down']['expect'] && data[_this.index].data[i]['down']['time']){
                  data[_this.index].data[i]['down']['end_time'] = parseInt((new Date()).getTime())  + data[_this.index].data[i]['down']['time'] * 1000;
                }
              }

              if(_this.data.length){
              _this.data[_this.index].data = data[_this.index].data;
              }else{
                _this.data = data;
                _this.timeTool();
              }

              _this.loadding_down = true;
            }
          }
        });
      },
      countDown(value){
        if(value == null || value == '' || value < 1){
          return '封盘中...';
        }
        let day = parseInt(value / 86400)
        ,h = parseInt(value % 86400 / 3600)
        ,m = parseInt(value % 86400 % 3600 / 60)
        ,s = Math.round(value % 86400 % 3600 % 60);
        (h < 10) && (h = "0" + h);
        (m < 10) && (m = "0" + m);
        (s < 10) && (s = "0" + s);
        if(day > 0)
        {
          return [day,'天',h,':',m,':',s];
        }
        else
        {
          return [h,':',m,':',s];
        }
      },
      timeTool(){
        let _this = this;
          for(let i = 0,j = _this.data[_this.index].data.length,l;i<j;i++){
            if('end_time' in _this.data[_this.index].data[i]['down']){
              l = Math.round((_this.data[_this.index].data[i]['down']['end_time'] - new Date().getTime()) / 1000);
              _this.data[_this.index].data[i]['down']['time'] = l;
              if(l < 1 && _this.loadding_down){
                _this.loadding_down = false;
                setTimeout(()=>{
                  _this.getInfo();
                },7000);
              }
            }
          }
        setTimeout(()=>{
          _this.timeTool();
        },1000);
      }
    },
    watch: {
      active(value){
        this.index = (value.match(/\d+/)[0] * 1);
        if(this.data.length < 1 || this.data[this.index].data.length < 1){
          this.getInfo();
        }

      },
      index(value){
        this.active = 'tab' + value;
        this.getInfo();
      },
    }
  }
</script>

<style scoped>

  @font-face{
    font-family: 'time_size';
    src: url('../../assets/font/QuartzEF.otf');
  }
  .kd-game-logo{
    border: none !important;
  }
  .show-time{
    color: white;
    background: #000333;
    display: inline-block;
    font-family: 'time_size';
    border-radius: 15%;
    text-align: center;
    /*padding: 2px 4px;*/
    width: 24px;
    height: 21px;
    line-height: 21px;
    font-weight: 500;
    font-style:normal
  }
  .vux-tab-wrap{
    position:fixed;
    height: 32px;
    width: 100%;
    padding: 0;
    top:3rem;
    z-index: 1;
  }
  .kd-body{
    padding-top: 3.0625rem;
  }
  .lottery-wrapper>>>.vux-tab-selected{
    border-bottom: 2px solid red !important;
  }
  .lottery-wrapper>>>.vux-tab{
    max-width: 640px;
    width: 100%;
  }
  .lottery-wrapper>>>.vux-tab-ink-bar{
    display: none !important;
  }
  .lottery-wrapper{
    position:fixed;
    top: 5.5rem;
    /*padding-bottom: 2rem;*/
  }
  .item1{
    margin-top: 10px;
  }
  .item2{
    display: inline-block;
    width: 100%;
    background: #ffffff;
    border-bottom: 1px solid #dcdcdc;
    padding: 10px 0px;
    position: relative;
  }
  .item3{
    width: 100%;
    height: 30px;
    background: #ffffff;
  }
  .item4{
    display: inline-block;
    width: 32.5%;
    height: 20px;
    line-height: 20px;
    font-size: .9rem;
    text-align: center;
    border-right: 1px solid #dcdcdc;
    margin-top: 5px;
  }
  .item5{
    display: inline-block;
    width: 100%;
    height: 100%;
    /* position: relative; */
    position: absolute;
    padding-top: 15px;
    top: 0;
  }
  .item2:after{
    content: "\EA2D";
    /* position: relative; */
    position: absolute;
    top: 35%;
    right: 7px;
    color: #b1b7ba;
  }
</style>

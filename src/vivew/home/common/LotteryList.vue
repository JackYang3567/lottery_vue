<template>
    <div :class="[(tabType == 1 ? 'cp_w':'qp_w')]">
        <!-- 首页弹窗 style="position:relative;"-->
        <template v-if="tabType == 1">
            <div align="center" v-if="lotterys.length==0">
                <br><mt-spinner type="triple-bounce" :color="$store.state.basic.main_color"></mt-spinner><br>
            </div>
            <div v-else>
                <tab  v-model="index" style="padding-top: 30px;" class="my-tab-at-index">
                    <tab-item v-for="(item,key) in lotterys.filter((lottery)=>lottery.name!=='其他') " :key="key">{{ item.name }}</tab-item>
                </tab>
            </div>
        </template>
    
        <div class="kd-games-group" v-show="tabType == 1">
            <template v-for="(item,key) in lotterys">
                <ul class="nostyle kd-games-list caizhong" v-if="item.data.length && index==key">
                    <li class="kd-game" v-for="item1 in item.data" @click="$store.state.trade = false;">
                        <figure :class="'kd-game-logo ' + lotteryLocal['key' + item1.type].class">
                            <!-- <img src="../../../assets/images/blank.gif" alt="blank"> -->
                            <img v-if="lotteryLocal['key' + item1.type].img" :src="lotteryLocal['key' + item1.type].img" alt="blank" data_ast="01">
                            <img v-else src="../../../assets/images/blank.gif" alt="blank">

                            <i :class="'icon icon-' + lotteryLocal['key' + item1.type].class1"></i>
                        </figure>
                        <div class="kd-game-info">
                            <h5 class="kd-game-name">{{item1.name}}</h5>
                            <h5 class="kd-game-name-note">{{item1.note}}</h5>
                            <time class="kd-game-countdown"></time>
                        </div>
                        <a href="javascript:;" :title="item1.name" @click.stop="urlAction(lotteryLocal['key' + item1.type].path,item1.type)" v-if="item1.type < 2">{{item1.name}}</a>
                        <a :href="'#/' + lotteryLocal['key' + item1.type].path + '/' + item1.type" :title="item1.name" v-else>{{item1.name}}</a>
                    </li>
                </ul>
            </template>
        </div>
        <!--这一部分显示棋牌内容-->

        <div class="kd-games-group" v-if="tabType == 2">
            <template v-if="game_api.length">
                <div style="border-radius-top-left:5%;">
                    <tab :animate="false" :active-color="$store.state.basic.main_color">
                        <tab-item :selected="tableTypeList == k ? true:false" @on-item-click="tableTypeList=k" :key="k" v-for="(vo,k) in game_api"><span>{{vo.name}}</span> </tab-item>
                        <!-- @on-item-click="onItemClick" -->
                    </tab>
                </div>
                <!-- @mousedown="down($event)" @touchstart="down($event)"
        @mousemove="move($event)" @touchmove="move($event)"
        @mouseup="end($event)" @touchend="end($event)" -->
                <!-- <transition name="bounce2"> -->
                <ul class="nostyle kd-games-list"
                    @touchstart="down($event,2)"
                    @touchmove="move($event,2)"
                    @touchend="end($event,2)"
                    v-if="game_api[tableTypeList]['game'].length">

                    <li class="kd-game" :key="key" v-for="(item,key) in game_api[tableTypeList]['game']">
                        <figure class="kd-game-logo game-demo">
                            <img :src="require('../../../assets/images/chess'+ game_api[tableTypeList]['scode'] +'/'+ item.code  +'.png')" alt="blank">
                            <i class="icon icon-"></i>
                        </figure>
                        <div class="kd-game-info">
                            <h5 class="kd-game-name">{{item.name}}</h5>
                            <time class="kd-game-countdown"></time>
                        </div>
                        <a href="javascript:;" :title="item.name" @click="chessApi(item.code)">{{item.name}}</a>
                    </li>

                </ul>
                <!-- </transition> -->
                <div class="kd-game" v-if="!game_api[tableTypeList]['game'].length">
                    <div style="margin:10px auto 10px">{{note}}</div>
                </div>

            </template>
            <div align="center" v-else-if="chessload == 1">
                <mt-spinner type="triple-bounce" :color="$store.state.basic.main_color"></mt-spinner>
            </div>
            <div align="center" v-else>
                <span>您好！游戏维护中...</span>
            </div>
        </div>
  
        <div class="kd-games-group" v-if="tabType == 3">
            <ul class="nostyle kd-games-list" style="border-top: none;">
                <li class="kd-game" v-for="item1 in dzyy">
                    <figure :class="'kd-game-logo ' + lotteryLocal['key' + item1.type].class">
                        <!-- <img src="../../../assets/images/blank.gif" alt="blank"> -->
                        <img v-if="lotteryLocal['key' + item1.type].img" :src="lotteryLocal['key' + item1.type].img" alt="blank" data_ast="01">
                        <img v-else src="../../../assets/images/blank.gif" alt="blank">

                        <i :class="'icon icon-' + lotteryLocal['key' + item1.type].class1"></i>
                    </figure>
                    <div class="kd-game-info">
                        <h5 class="kd-game-name">{{item1.name}}</h5>
                    </div>
                    <a href="javascript:;" :title="item1.name" @click.stop="urlAction(lotteryLocal['key' + item1.type].path,item1.type)" v-if="item1.type < 2">{{item1.name}}</a>
                    <a :href="'#/' + lotteryLocal['key' + item1.type].path + '/' + item1.type" :title="item1.name" v-else>{{item1.name}}</a>
                </li>
            </ul>
        </div>

        <div class="kd-games-group" v-if="tabType == 4">
            <template v-if="game_api.length">
                <ul class="nostyle kd-games-list"
                    @touchstart="down($event,2)"
                    @touchmove="move($event,2)"
                    @touchend="end($event,2)"
                    v-if="game_api[tableTypeList]['game'].length">

                    <li class="kd-game" :key="key" v-for="(item,key) in chesss.filter((chesss)=>chesss.list==3)" v-if="item.code == 50">
                        <figure class="kd-game-logo game-demo">
                            <img :src="require('../../../assets/images/chess'+ game_api[tableTypeList]['scode'] +'/'+ item.code  +'.png')" alt="blank">
                            <i class="icon icon-"></i>
                        </figure>
                        <div class="kd-game-info">
                            <h5 class="kd-game-name">{{item.name}}</h5>
                            <time class="kd-game-countdown"></time>
                        </div>
                        <a href="javascript:;" :title="item.name" @click="chessApi(item.code)">{{item.name}}</a>
                    </li>

                </ul>
                <!-- </transition> -->
                <div class="kd-game" v-if="!game_api[tableTypeList]['game'].length">
                    <div style="margin:10px auto 10px">{{note}}</div>
                </div>

            </template>
            <div align="center" v-else-if="chessload == 1">
                <mt-spinner type="triple-bounce" :color="$store.state.basic.main_color"></mt-spinner>
            </div>
            <div align="center" v-else>
                <span>您好！游戏维护中...</span>
            </div>
        </div>
        <div class="kd-games-group" v-if="tabType == 5">
            <div style="width: 100%;height: 100px;line-height: 100px;text-align: center;">
                敬请期待
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex'
    import { Tab,TabItem } from 'vux';
     let _this = this;
    export default{
        mounted(){
            // 获取返回的内容
            this.initialization();
        },
        // destroyed(){
        //     this.$store.state.selectIndex = 0;
        // },
        //接受大类型
        props: ['tabType'],
        components:{
            Tab,TabItem
        },
        data () {
            return {
                index: 0,
                // caipaiType:[
                //     {'key':0,'typeNmae':'热门彩种'},
                //     {'key':1,'typeNmae':'时时彩'},
                //     {'key':2,'typeNmae':'11选5'},
                //     {'key':3,'typeNmae':'快3'},
                //     {'key':4,'typeNmae':'pk10'},
                //     {'key':5,'typeNmae':'六合彩'},
                //     {'key':6,'typeNmae':'农场'},
                //     {'key':7,'typeNmae':'pc28'},
                //     {'key':8,'typeNmae':'快乐10分'},
                //     {'key':9,'typeNmae':'低频彩'},
                //     {'key':10,'typeNmae':'其他'}
                // ],
                thisSelect:1,
                //判断是手机还是电脑
                // phone:1,
                //是否有滑动
                flags:1,
                //滑动开始
                is_down:0,
                //滑动结束
                is_move:0,
                //棋牌未加载出来时候的显示
                chessload:1,
                //接收小类型切换 开元棋牌
                tableTypeList:0,
              
                //弹窗公告
                hwd:'',
                //加载提示信息
                note:'加载中...',
                //class是颜色  class1是图标
               /* lotteryLocal: {
                    // key0: {class:'game-bjl',path:'Bjl',class1:'bjl'},
                    // key1: {class:'game-lhd',path:'Lhd',class1:'lhd'},
                    key0: {class:'game-demo',path:'Bjl',class1:'',img:require('../../../assets/images/cptb/bjl.png')},
                    key1: {class:'game-demo',path:'Lhd',class1:'',img:require('../../../assets/images/cptb/lhd.png')},
                    key2: {class:'game-cqssc',path:'game-s',path_gf:'game-s-gf',class1:'cqssc'},
                    key3: {class:'game-pk10',path:'game-p',path_gf:'game-p-gf',class1:'pk10'},
                    key4: {class:'game-pk10',path:'game-p',path_gf:'game-p-gf',class1:'',img:require('../../../assets/images/cptb/xyft.png')},
                    key5: {class:'game-pk10',path:'game-p',path_gf:'game-p-gf',class1:'ft'},
                    key6: {class:'game-aksfc1',path:'game-s',path_gf:'game-s-gf',class1:'aksfc1'},
                    key7: {class:'game-aksfc1',path:'game-s',path_gf:'game-s-gf',class1:'aksfc2'},
                    key8: {class:'game-aksfc1',path:'game-s',path_gf:'game-s-gf',class1:'aksfc'},
                    key9: {class:'game-aksfc1',path:'game-s',path_gf:'game-s-gf',class1:'aksfc5'},
                    key10: {class:'game-jsk3',path:'game-c',path_gf:'game-c-gf',class1:'jsk3'},
                    key11: {class:'game-demo',path:'game-l',path_gf:'game-l-gf',class1:'',img:require('../../../assets/images/cptb/jslhc.png')},     //急速六合彩
                    key12: {class:'game-cqssc',path:'game-s',path_gf:'game-s-gf',class1:'xjssc'},
                    key13: {class:'game-cqssc',path:'game-s',path_gf:'game-s-gf',class1:'tjssc'},
                    key14: {class:'game-jsk3',path:'game-c',path_gf:'game-c-gf',class1:'shk3'},
                    key15: {class:'game-jsk3',path:'game-c',path_gf:'game-c-gf',class1:'ahk3'},
                    key16: {class:'game-gd115',path:'game-x',path_gf:'game-x-gf',class1:'gd115'},
                    key17: {class:'game-gd115',path:'game-x',path_gf:'game-x-gf',class1:'sd115'},
                    key18: {class:'game-gd115',path:'game-x',path_gf:'game-x-gf',class1:'sx115'},
                    key19: {class:'game-fc3d',path:'game-p3d',path_gf:'game-p3d-gf',class1:'fc3d'},
                    key20: {class:'game-demo',path:'game-klsf',path_gf:'game-klsf-gf',class1:'',img:require('../../../assets/images/cptb/kl10.png')}, //幸运pk10
                    // key20: {class:'game-gxklsf',path:'game-klsf',class1:'gxklsf'},
                    key21: {class:'game-js',path:'game-l',path_gf:'game-l-gf',class1:'marksix'},
                    key22: {class:'game-fc3d',path:'game-p3d',path_gf:'game-p3d-gf',class1:'tcpl3'},
                    key23: {class:'game-xync',path:'game-nc',path_gf:'game-nc-gf',class1:'xync'},
                    key24: {class:'game-pcdd-bj',path:'game-pc',path_gf:'game-pc-gf',class1:'pcdd-bj'},
                    key25: {class:'game-pcdd-bj',path:'game-pc',path_gf:'game-pc-gf',class1:'pcdd-jnd'},
                    key26: {class:'game-pcdd-bj',path:'game-pc',path_gf:'game-pc-gf',class1:'pcdd-cq'},
                    key27: {class:'game-pcdd-bj',path:'game-pc',path_gf:'game-pc-gf',class1:'pcdd-xj'},
                    key28: {class:'game-aksfc1',path:'game-s',path_gf:'game-s-gf',class1:'aksfc5'},
                    key29: {class:'game-qxc',path:'game-qxc',class1:'qxc'},
                    key30: {class:'game-jsk3',path:'game-c',path_gf:'game-c-gf',class1:'shk3 gxk3'},
                    key31: {class:'game-jsk3',path:'game-c',path_gf:'game-c-gf',class1:'shk3 hubk3'},
                    key32: {class:'game-jsk3',path:'game-c',path_gf:'game-c-gf',class1:'shk3 hebk3'},
                    key33: {class:'game-jsk3',path:'game-c',path_gf:'game-c-gf',class1:'shk3 gsk3'},
                    key34: {class:'game-jsk3',path:'game-c',path_gf:'game-c-gf',class1:'shk3 bjk3'},
                    key36: {class:'game-demo',path:'game-p',path_gf:'game-p-gf',class1:'',img:require('../../../assets/images/cptb/yfsc.png')}, //一分赛车 <img data-v-22a633ce="" src="/static/img/room-level1-bg.59838fe.png" class="room-box-bg">
                    key37: {class:'game-demo',path:'game-p',path_gf:'game-p-gf',class1:'',img:require('../../../assets/images/cptb/xypks.png')}, //幸运pk10
                    key38: {class:'game-demo',path:'game-p',path_gf:'game-p-gf',class1:'',img:require('../../../assets/images/cptb/klpks.png')}, //快乐PK10
                    key39: {class:'game-demo',path:'game-p',path_gf:'game-p-gf',class1:'',img:require('../../../assets/images/cptb/xjpsm.png')}, //新加坡赛马
                    key40: {class:'game-demo',path:'game-c',path_gf:'game-c-gf',class1:'',img:require('../../../assets/images/cptb/jsk3.png')}, //极速快三
                    key41: {class:'game-demo',path:'game-c',path_gf:'game-c-gf',class1:'',img:require('../../../assets/images/cptb/xyk3.png')}, //幸运快三
                    key42: {class:'game-jsk3',path:'game-c',path_gf:'game-c-gf',class1:'shk3 bjk3'}, //天津快三
                    key43: {class:'game-jsk3',path:'game-c',path_gf:'game-c-gf',class1:'shk3 bjk3'}, //吉林快三
                    key44: {class:'game-demo',path:'game-x',path_gf:'game-x-gf',class1:'',img:require('../../../assets/images/cptb/jssyxw.png')}, //极速11选5
                    key45: {class:'game-demo',path:'game-x',path_gf:'game-x-gf',class1:'',img:require('../../../assets/images/cptb/xysyxw.png')}, //幸运11选5
                    key46: {class:'game-gd115',path:'game-x',path_gf:'game-x-gf',class1:'sd115'}, //安徽11选5
                    key47: {class:'game-gd115',path:'game-x',path_gf:'game-x-gf',class1:'sd115'}, //江西11选5
                    key48: {class:'game-gd115',path:'game-x',path_gf:'game-x-gf',class1:'sd115'}, //新疆11选5
                    key49: {class:'game-gd115',path:'game-x',path_gf:'game-x-gf',class1:'sd115'}, //上海11选2
                    key50: {class:'game-gxklsf',path:'game-klsf',path_gf:'game-klsf-gf',class1:'gxklsf'},//广东快乐十分
                    key51: {class:'game-demo',path:'game-p',path_gf:'game-p-gf',class1:'',img:require('../../../assets/images/cptb/jsft.png')}, //极速飞艇
                    key52: {class:'game-demo',path:'game-brnn',class1:'',img:require('../../../assets/images/cptb/brnn.png')}, //百人牛牛
                    key53: {class:'game-lhj',path:'game-lhj',class1:'',img:require('../../../assets/images/lhj/cover.png')}, //水果喇叭
                    key54: {class:'game-lhj',path:'game-lhj',path_gf:'game-lhj-gf',class1:'',img:require('../../../assets/images/lhj2/cover.png')}, //沉鱼落雁
                    key55: {class:'game-lhj',path:'game-lhj',path_gf:'game-lhj-gf',class1:'',img:require('../../../assets/images/lhj3/cover.png')}, //忍者神龟
                    key56: {class:'game-demo',path:'game-troom',class1:'',img:require('../../../assets/images/tiger/tigerIcon.png')}, //忍者神龟
                    key57: {class:'game-demo',path:'game-pc',path_gf:'game-pc-gf',class1:'',img:require('../../../assets/images/cptb/tg28.png')},
                    key58: {class:'game-demo',path:'game-pc',path_gf:'game-pc-gf',class1:'',img:require('../../../assets/images/cptb/wl28.png')},
                    key59: {class:'game-jsk3',path:'game-hlsb',class1:'shk3 bjk3',img:require('../../../assets/images/cptb/hltb.png')},
                    key60: {class:'game-demo',path:'game-s',path_gf:'game-s-gf',class1:'',img:require('../../../assets/images/cptb/qqffc.png')},
                    key61: {class:'game-demo',path:'game-s',path_gf:'game-s-gf',class1:'',img:require('../../../assets/images/cptb/qqffc.png')},
                    key62: {class:'game-demo',path:'game-s',path_gf:'game-s-gf',class1:'',img:require('../../../assets/images/cptb/qqffc.png')},
                    key63: {class:'game-demo',path:'game-s',path_gf:'game-s-gf',class1:'',img:require('../../../assets/images/cptb/qqffc.png')},
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
                    key77: {class:'game-gd115',path:'game-x',class1:'sd115'},
                    key78: {class:'game-demo',path:'game-s',class1:'',img:require('../../../assets/images/cptb/qqffc.png')},
                    key79: {class:'game-demo',path:'game-hlsb',class1:'',img:require('../../../assets/images/cptb/hltb.png')},//上海11选2
                },*/
                game_api: [
                    // {
                    //   'list':1,
                    //   'name':'开元棋牌',
                    //   'game':[
                    //       {'code':'1','name':'德州扑克'},
                    //       {'game_id':'2','name':'二八杠'},
                    //       {'game_id':'3','name':'抢庄牛牛'},
                    //       {'game_id':'4', 'name':'炸金花'},
                    //   ]
                    // },
                ],
                dzyy:[],
            }
        },
        computed:{

        },
        watch:{
            tabType(now,old){
                if(now == 1)
                {

                }
                else if(now == 2 && !this.game_api.length){
                    if(Object.keys(this.$store.state.chess_home).length){
                        this.game_api = this.$store.state.chess_home;
                    }else{
                        this.getInfoApi();
                    }
                }else if(now == 1){
                    for(let i of this.data.type){
                        if(!i['data'].length){
                            this.getInfo();
                        }
                    }
                }
                else if(now == 3)
                {
                    this.getInfoGame();
                }
                else if(now == 4)
                {
                    this.getInfoApi();
                }
            },
            tableTypeList(){
                let _this = this;
                if(_this.game_api.length){
                    if(!_this.game_api[_this.tableTypeList]['game'].length){
                        _this.getInfoApi(_this.game_api[_this.tableTypeList]['list'], _this.tableTypeList);
                    }
                }
            }
        },
        methods: {
            changeType(key)
            {
                this.thisSelect = key;
            },
            //判断用户安卓苹果pc
            // judge(){
            //   let agent = navigator.userAgent.toLowerCase(),_this = this;
            //   if(agent.indexOf("android") > -1){
            //     _this.phone = 2;
            //   }else if(agent.indexOf("iphone") > -1){
            //     _this.phone = 2;
            //   }else if(agent.indexOf("ipad") > -1){
            //     _this.phone = 2;
            //   }
            //   // return type;
            // },
            //滑动接口
            down(event,type){
                let _this = this;
                _this.is_down = event.touches[0]['screenX'];
            },
            move(event,type){
                let _this = this;
                if(_this.flags != 2){_this.flags = 2;}
                _this.is_move = event.touches[0]['screenX'];
            },
            end(event,type){
                let _this = this;
                if(_this.flags == 2){
                    let count = _this.game_api.length - 1;
                    if(count <= 0){return;}
                    //正数向右  负数向左
                    let rl = parseInt(_this.is_down) - parseInt(_this.is_move);
                    if(Math.abs(rl) <= 50){return;}
                    if(rl>0){
                        if( parseInt(_this.tableTypeList) + 1 > count){
                            return;
                        }{
                            _this.tableTypeList += 1;
                        }
                    }else{
                        if( parseInt(_this.tableTypeList) - 1 < 0){
                            return;
                        }{
                            _this.tableTypeList -= 1;
                        }
                    }
                }

            },
            //棋牌游戏接口 code游戏id
            chessApi(code){
                let _this = this;
                _this.$getData({
                    loading:true,
                    url:'/api/home/Api_Game_Config/gameLogin',
                    data:{'list':_this.game_api[_this.tableTypeList]['list'],'code':code},
                    callback:function(res){
                        if(res.code > 0){
                            location.href = res.data;
                        }else{
                            _this.$total({ message:res.msg,type: 0 });
                        }
                    }
                });
            },
            //游戏API获取
            getInfoApi(rid = 0,list){
               
                let _this = this;
                if((_this.game_api.length && _this.game_api[_this.tableTypeList]['game'].length) || [2,4].indexOf(parseInt(_this.tabType)) == -1){
                  
                  return;
                }
                
                
                  if(rid > 0){_this.note = '游戏加载中...'};
                 
                   //chessTypes.filter((type)=>type.list==3)[0].game
                   let res = this.chessTypes//.filter((type)=>type.list==0)[0].game //this.chesss
                    if(res){
                            if(!res.length){
                                _this.chessload = 2;
                            }
                            
                            if(rid == 0){
                               
                                _this.$set(_this,'game_api', res);
                                
                                _this.$store.commit('setData',{ key:'chess_home',value: res });
                            }else{
                                if(!res.length){
                                    _this.note = '暂无游戏';
                                }else{
                                    let bit = JSON.parse(JSON.stringify(_this.game_api));
                                   // let bit = JSON.parse(JSON.stringify(this.chesss.filter((chesss)=>chesss.list==list)));
                                   // bit[list]['game'] = res;
                                     bit[list]['game'] = this.chesss.filter((chesss)=>chesss.list==list);
                                    _this.$set(_this,'game_api',bit);
                                     
                                    _this.$store.commit('setData',{ key:'chess_home',value: bit });
                                }
                            }
                        }
                   
                   /*
                _this.$getData({
                    loading: (rid > 0 ? true:false),
                    url:'/api/Home/Lottery/getLotteryListApi',                   
                    data:{type:rid},
                   
                    callback:function(res){
                        if(res){
                            if(!res.length){
                                _this.chessload = 2;
                            }
                             console.log("res=====",res)
                            if(rid == 0){
                                _this.$set(_this,'game_api',res);
                                 console.log("11111=====")
                                _this.$store.commit('setData',{ key:'chess_home',value: res });
                            }else{
                                if(!res.length){
                                    _this.note = '暂无游戏';
                                }else{
                                    let bit = JSON.parse(JSON.stringify(_this.game_api));
                                    bit[list]['game'] = res;
                                    _this.$set(_this,'game_api',bit);
                                      console.log("222=====")
                                    _this.$store.commit('setData',{ key:'chess_home',value: bit });
                                }
                            }
                        }
                    }
                });*/
            },
            lhbd(){
                let _this = this;
                _this.$getData({
                    url:'/api/home/in/lhbd',
                    data:'',
                    callback:function(res){
                        if(res){
                            //console.log(res);
                            location.href = res;
                        }
                    }
                });
            },
            homeWD(){
                let _this = this;
                _this.$getData({
                    url:'/api/home/in/setUp',
                    data:{type:'dialog'},
                    type:'post',
                    callback:function(res){
                        _this.$set(_this,'hwd',res.value);
                    }
                });
            },
            getQueryString(name) {
                var url = window.location.href; //获取url中"?"符后的字串
                var rs = url.indexOf("?");
                if (rs != -1) {
                    var str = url.substr((rs+1));
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                    var r = str.match(reg);
                    if (r != null) return unescape(r[2]);

                }
                return null;
            },
            initialization(){
                let _this = this;
                if(_this.tabType == 1){
                    //彩票
                    if(Object.keys(_this.$store.state.lottery_list).length){
                        _this.data = _this.$store.state.lottery_list;
                    }
                    /*else{
                        _this.getInfo();
                    }*/
                }else if(_this.tabType == 2){
                    //棋牌
                    if(Object.keys(_this.$store.state.chess_home).length){
                        _this.game_api = _this.$store.state.chess_home;
                    }else{
                        console.log("====tabType == 2===")
                        _this.getInfoApi();
                    }
                }else if(_this.tabType == 4){
                    //棋牌
                    if(Object.keys(_this.$store.state.chess_home).length){
                        _this.game_api = _this.$store.state.chess_home;
                    }else{
                         console.log("====tabType == 4===")
                        _this.getInfoApi();
                    }
                }
                else
                {
                    _this.getInfoGame();
                }
            },
            urlAction(url,type){
                location.href = '' + ('api_path' in this.$store.state && this.$store.state.api_path ? this.$store.state.api_path : this.$store.state.basic.static_path) + '/Home/' + url + '/' + (this.$store.state.login ? '?token=' + localStorage.getItem('pragma') : '');
            },
            /*
            getInfo(){
                var _this = this;
                this.$getData({
                    url:'/api/Home/Lottery/getLotteryListAtIndex',
                    data: { type: 0 },
                    callback: function(data){
                        if(data){
                            _this.data = data;
                            _this.$store.commit('setData',{ key:'lottery_list',value: data });
                            if(_this.getQueryString('n') == 1){
                                _this.$store.state.basic.home_window = 0;
                            }else if(_this.$store.state.basic.home_window == 1 && _this.hwd == ''){
                                setTimeout(function(){ _this.homeWD(); },100);
                            }
                        };
                    }
                });
            },
            */
            getInfoGame(){
              this.dzyy = this.lotterys.filter((lottery)=>lottery.name==='其他')[0].data
              /*
                var _this = this;
                this.$getData({
                    url:'/api/Home/Lottery/getLotteryListApi',
                    data: { act:'dzyy' },
                    callback: function(data){
                        _this.dzyy = data
                    }
                });
                console.log("this.dzyy======",this.dzyy)
              */
            },
        }
    }
</script>

<style scoped>
    .caizhong>li{
        border-bottom: 1px solid #dedede !important;
        padding-bottom: 8px;
    }
    .caizhong>li:nth-child(odd){
        border-right: 1px solid #dedede;
    }
    .kd-games-group{
        padding-bottom: 10px;
    }
    .kd-game-info-note{
        display: none;
    }
    .my-tab-at-index>>>.vux-tab-ink-bar{
        display: none!important;
    }
    .my-tab-at-index>>>.vux-tab-container,.my-tab-at-index>>>.scrollable{
        height: 40px !important;
    }
    .my-tab-at-index>>>.vux-tab{
        width: 100%;
    }
    .my-tab-at-index>>>.vux-tab-item{
        flex: 0 0 18% !important;
        font-size: 14px !important;
        height: 40px !important;
        line-height: 40px !important;
    }
    .my-tab-at-index>>>.vux-tab-item.vux-tab-selected{
        color: red;
        font-size: 14px;
        border-bottom: none !important;
    }
    /* 第一版 */
    /* @media (max-width:450px){} */
    /*彩票栏目*/
    /*每行换成两个并取消边框*/
    .cp_w .kd-game{
        width: 50%;
        border:none;
        /* border-radius: 5px; */
        /*margin:0 0 0 0; */
    }
    /*图标位置调整 取消边框 改变大小*/
    .cp_w .kd-game-logo{
        margin:5% 0 0 5% ;
        width:3.5rem;
        border:none !important;
    }
    .cp_w .kd-game-logo .icon{
        font-size: 3rem;
    }
    /* 字体位置调整 */
    .cp_w .kd-game-info{
        font-weight: bold;
        position: absolute;
        top:30%;
        left:40%;
    }
    /*游戏内容*/
    .cp_w .kd-games-list{
        padding-top: 6px;
        padding-bottom: 10px;
        margin:0 auto;
        background-color: #fff;
        border-radius:10px;
    }
    /*取消空白*/
    .cp_w .empty{
        display: none;
    }
    .cp_w .kd-game-name{
        font-size: 1rem;
    }
    .cp_w .kd-game-name-note{
        padding: .875rem 0 0 0;
        text-align: center;
        color:#aaa;
        font-size: .75rem;
        font-weight: 400;
    }

    .qp_w .kd-game{
        width: 25%;
        border:none;
        /* border-radius: 5px; */
        /*margin:0 0 0 0; */
    }
    .qp_w .kd-games-list{
        border:none;
    }
    .qp_w .kd-games-group{
        border:none;
        margin:0 auto;
        background-color: #fff;
        border-radius:10px;
    }
    .qp_w .kd-game-logo{
        border: none !important;
        border-radius: 50%;
    }
    .w_nav_list{
        /* height:50px;
        background-color:#fff; */
    }
    .che_img{
        display: inline-block;
        vertical-align: middle;
        position: relative;
        right:1px;
        height:20px;
    }
</style>

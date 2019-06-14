<template>
    <div style="width: 100%;overflow: auto;margin-bottom: 10%">
        <div class="qipaiyouxi-head">
            <div class="top-title">
                <div :class="['at-this-left',selected==1?'this-selected':'not-selected']" @click="selected=1">棋牌游戏</div>
                <div :class="['at-this-right',selected==2?'this-selected':'not-selected']" @click="selected=2">电子游艺</div>
            </div>
        </div>

        <div v-if="selected==1">
            <div class="kd-games-group">
                <template v-if="game_api.length">
                    <div style="border-radius-top-left:5%;">
                        <tab :animate="false" :active-color="$store.state.basic.main_color">
                            <tab-item :selected="tableTypeList == k ? true:false" @on-item-click="tableTypeList=k" :key="k" v-for="(vo,k) in game_api"><span>{{vo.name}}</span> </tab-item>
                            <!-- @on-item-click="onItemClick" -->
                        </tab>
                    </div>

                    <ul class="nostyle kd-games-list"
                        @touchstart="down($event,2)"
                        @touchmove="move($event,2)"
                        @touchend="end($event,2)"
                        v-if="game_api[tableTypeList]['game'].length">

                        <li class="qipai-kd-game" :key="key" v-for="(item,key) in game_api[tableTypeList]['game']">
                            <a href="javascript:;" :title="item.name" @click="chessApi(item.code)">
                                <img :src="require('../../../assets/images/chess'+ game_api[tableTypeList]['scode'] +'/'+ item.code  +'.png')" alt="blank">
                                <div class="kd-game-info">
                                    {{item.name}}
                                </div>
                            </a>
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
        </div>
        <div v-if="selected==2">
            <div class="kd-games-group" style="margin-top: 15px;">
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
        </div>
    </div>
</template>

<script>
    import { Tab,TabItem } from 'vux';
    export default {
        name: "gameApi",
        mounted(){
            this.getInfoApi();
            this.getInfo();
            var path = this.$route.query.path;
            if(path && path == 'dzyy')
            {
                this.selected = 2;
            }
            else
            {
                this.selected = 1;
            }
        },
        data(){
            return{
                selected:1,
                note:'加载中...',
                game_api: [],
                chessload:1,
                tableTypeList:0,
                dzyy:[],
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
                    key53: {class:'game-lhj',path:'game-lhj',path_gf:'game-lhj-gf',class1:'',img:require('../../../assets/images/lhj/cover.png')}, //水果喇叭
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
                    key77: {class:'game-gd115',path:'game-x',class1:'sd115'}, //上海11选2
                    key78: {class:'game-demo',path:'game-s',class1:'',img:require('../../../assets/images/cptb/qqffc.png')},
                    key79: {class:'game-demo',path:'game-hlsb',class1:'',img:require('../../../assets/images/cptb/hltb.png')},
                },
                */
            }
        },
        components:{
            Tab,TabItem
        },
        methods:{
            changeNav(){
                var num = this.selected;
                if(num == 1)
                {
                    this.selected = 2;
                }
                else
                {
                    this.selected = 1;
                }
            },
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
            getInfoApi(rid = 0,list){
                let _this = this;
                if(rid > 0){_this.note = '游戏加载中...'};
                _this.$getData({
                    loading: (rid > 0 ? true:false),
                    url:'/api/Home/Lottery/getLotteryListApi',
                    data:{type:rid},
                    callback:function(res){
                        if(res){
                            if(!res.length){
                                _this.chessload = 2;
                            }
                            if(rid == 0){
                                _this.$set(_this,'game_api',res);
                                // chess_home
                                _this.$store.commit('setData',{ key:'chess_home',value: res });
                            }else{
                                if(!res.length){
                                    _this.note = '暂无游戏';
                                }else{
                                    let bit = JSON.parse(JSON.stringify(_this.game_api));
                                    bit[list]['game'] = res;
                                    _this.$set(_this,'game_api',bit);
                                    _this.$store.commit('setData',{ key:'chess_home',value: bit });
                                }
                            }
                        }
                    }
                });
            },
            urlAction(url,type){
                location.href = '' + ('api_path' in this.$store.state && this.$store.state.api_path ? this.$store.state.api_path : this.$store.state.basic.static_path) + '/Home/' + url + '/' + (this.$store.state.login ? '?token=' + localStorage.getItem('pragma') : '');
            },
            getInfo(){
                var _this = this;
                this.$getData({
                    url:'/api/Home/Lottery/getLotteryListApi',
                    data: { act:'dzyy' },
                    callback: function(data){
                        _this.dzyy = data
                    }
                });
            },
        },
        watch:{
            tableTypeList(){
                let _this = this;
                if(_this.game_api.length){
                    if(!_this.game_api[_this.tableTypeList]['game'].length){
                        _this.getInfoApi(_this.game_api[_this.tableTypeList]['list'], _this.tableTypeList);
                    }
                }
            }
        }
    }
</script>

<style scoped>
.qipaiyouxi-head{
    width: 100%;
    background: white;
    height: 28px;
    line-height: 28px;

}
.top-title{
    width: 100%;
    display: flex;
}
.this-selected{
    color: red;
    border-bottom: 1px solid red;
}
.not-selected{
    color: #777;
}
.at-this-left{
    width: 50%;
    height: 28px;
    line-height: 28px;
    /*margin-top: 4px;*/
    text-align: center;
}
.at-this-right{
    width: 50%;
    height: 28px;
    line-height: 28px;
    /*margin-top: 4px;*/
    text-align: center;
}
.kd-game{
    border:none;
}
/* 字体位置调整 */
.cp_w .kd-game-info{
    font-weight: bold;
    position: absolute;
    top:30%;
    left:40%;
}
.qipai-kd-game{
    display: inline-block;
    text-align: center;
    width: 25%;
    margin-top: 10px;
}
.qipai-kd-game>a>img{
    width: 70%;
}
.qipai-kd-game>a>.kd-game-info{
    position: relative;
    left: 0;
    width: 100%;
    margin: 5px 0;
    color: #444;
    font-size: 12px !important;
}
.cp_w .kd-game-name-note{
    padding: 0.25rem 0 0 0;
    text-align: left;
    color:#aaa;
    font-size: .5rem;
    font-weight: 400;
}

.kd-games-group{
    width: 100%;
    background: white;
}
.che_img{
    display: inline-block;
    vertical-align: middle;
    position: relative;
    right:1px;
    height:20px;
}
</style>
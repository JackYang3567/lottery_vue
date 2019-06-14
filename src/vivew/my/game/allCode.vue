<template>
    <div style="padding-bottom: 40px;">
        <div class="the-div">
            <div align="center" v-if="data.length==0">
                <br><mt-spinner type="triple-bounce" :color="$store.state.basic.main_color"></mt-spinner><br>
            </div>
            <div style="position: fixed;top: 50px;width: 96%;max-width: 615px;z-index: 999;" v-else>
                <tab  v-model="index" style="padding-top: 30px;" class="my-tab-at-index">
                    <tab-item v-for="(item,key) in data" :key="key">{{item.name}}</tab-item>
                </tab>
            </div>
            <template v-for="(item,key) in data">
                <template v-if="index==key">
                    <div class="every-one-div" v-for="(item1,key) in item.info" @click="$router.push({path:'/My/open/'+item1.type})">
                        <div :class="'kd-game-logo for-img ' + lotteryLocal['key' + item1.type].class">
                            <img v-if="lotteryLocal['key' + item1.type].img" :src="lotteryLocal['key' + item1.type].img" alt="blank" data_ast="01">
                            <img v-else src="../../../assets/images/blank.gif" alt="blank">
                            <i :class="'icon icon-' + lotteryLocal['key' + item1.type].class1"></i>
                        </div>
                        <div class="show-every-info">
                            <template v-if="item1.content">
                                <div class="show-name-and-expect-and-time">
                                    <div style="width: 25%">{{item1.name}}</div>
                                    <div style="width: 30%;">第{{item1.expect}}期</div>
                                    <div style="width: 45%;text-align: right;padding-right: 10px;">{{item1.create_time}}</div>
                                </div>
                                <template v-if="['6','7','8','9','12','13','28','2','44','45','16','17','18','48','49'].indexOf(item1.type)!=-1">
                                    <span class="lottery-ball solid sd115 ball05 lottery-ball-official" v-for="ball_number in item1.content">{{ball_number}}</span>
                                </template>
                                <template v-else-if="['40','41','42','10','14','15','30','31','32','33','34','43'].indexOf(item1.type)!=-1">
                                    <span :class="'lottery-ball jsk3 ball'+ball_number+' lottery-ball-official show-touzi'" v-for="ball_number in item1.content"></span>
                                </template>
                                <template v-else-if="['3','4','5','36','37','38','39','51'].indexOf(item1.type)!=-1">
                                    <span :class="'lottery-ball pk10 solid ball'+parseInt(ball_number)" style="margin-top:5px;margin-right: 4px;width: 22px;height: 22px;line-height: 19px !important;font-size: 16px !important;border-radius: 0;font-weight: bold;" v-for="(ball_number,k) in item1.content">{{ball_number}}</span>
                                </template>
                                <template v-else>
                                    <template v-for="(ball_number,k) in item1.content">
                                        <span :class="'lottery-ball pk10 solid ball'+parseInt(ball_number)" style="margin-top:5px;margin-right: 4px;width: 22px;height: 22px;line-height: 19px !important;font-size: 16px !important;border-radius: 0;font-weight: bold;">{{ball_number}}</span>
                                    </template>
                                </template>
                            </template>
                            <template v-else>
                                <P>{{item1.name}}</P>
                                <p style="color: red">暂无开奖数据...</p>
                            </template>
                        </div>
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
    import { Tab,TabItem } from 'vux';
    export default {
        name: "allCode",
        mounted(){
            this.getInfo();
        },
        components:{
            Tab,TabItem
        },
        data(){
            return {
                index: 0,
                data:[],
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
                    key59: {class:'game-jsk3',path:'game-c',path_gf:'game-c-gf',class1:'shk3 bjk3'},
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
                },*/
            }
        },
        methods:{
            getInfo(){
                var _this = this;
                _this.$getData({
                    url:'/api/Home/Lottery/getAllCode',
                    data:{index:_this.index},
                    callback: function(data){
                        if(data){
                            _this.data = data;
                        }
                    }
                });
            },
        },
        watch:{
            index:function (newValue) {
                this.getInfo();
            }
        },
    }
</script>

<style scoped>
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
.the-div{
    width: 100%;
    padding: 85px 2% 20px 2%;
    height: 100%;
    list-style: none;
    background: #f5f5f9 !important;
}
.every-one-div{
    background: white;
    margin-top: 10px;
    width: 100%;
    display: flex;
    height: 60px;
}
.kd-game-logo{
    margin: 10px;
    border: none;
    width: 50px;
}
.show-every-info{
    width: 100%;
}
.show-every-info>p{
    font-size: 0.75rem;
    margin-top: 10px;
    width: 100%;
}
.show-name-and-expect-and-time{
    font-size: 0.75rem;
    margin-top: 10px;
    width: auto;
    display: flex;
}
.lottery-ball-official.cqssc, .lottery-ball-official.cqssc.solid, .lottery-ball-official.sd115, .lottery-ball-official.sd115.solid{
    margin-top: 5px;
    margin-right: 5px;
    width: 1.5em;
    height: 1.5em;
    line-height: 1.65em;
}
.show-touzi{
    background: url(/static/img/touzi.png) no-repeat;
    background-size: .65em 6.6em;
    font-size: 2.75rem;
    width: .65em;
    height: .65em;
    overflow: hidden;
    margin-top: 5px;
    text-indent: -999em;
}
.this-is-a-jiahao{
    font-size: 1.9rem;
    position: relative;
    top: -10px;

}
.this-is-a-ball{
    text-align: center;
    width: 22px;
    height: 22px;
    line-height: 22px;
    border-radius: 50%;
    color: white;
}
</style>
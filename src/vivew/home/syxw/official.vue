<template>
    <div>
        <main class="kd-body game game-sd11x5 game-official">
            <div class="clearfix lottery-wrapper lottery-wrapper-official sd115">
                <div class="kd-container prev-lottery sd115 prev-lottery-official width-60">
                    <div class="prev-lottery-issue prev-lottery-issue-official sd115 show-display-block">
                        <a :href="'#/game-x/'+$route.params.id" class="change-to-classical active sd115">官方</a>{{caipiaoname}} {{now_expect}}
                    </div>

                    <template v-if="is_feng">
                        <ul data-v-8eda8d38="" class="nostyle kd-row prev-lottery-balls prev-lottery-balls-official cqssc">
                            <li data-v-8eda8d38="" v-for="i in [1,2,3,4,5]">
                                <div data-v-8eda8d38="" class="lottery-ball solid lottery-ball-official cqssc background-img">
                                    <ul data-v-8eda8d38="" class="nostyle lottery-ball--anim">
                                        <li data-v-8eda8d38="" style="color: yellow">1</li>
                                        <li data-v-8eda8d38="" style="color: yellow">2</li>
                                        <li data-v-8eda8d38="" style="color: yellow">3</li>
                                        <li data-v-8eda8d38="" style="color: yellow">4</li>
                                        <li data-v-8eda8d38="" style="color: yellow">5</li>
                                        <li data-v-8eda8d38="" style="color: yellow">6</li>
                                        <li data-v-8eda8d38="" style="color: yellow">7</li>
                                        <li data-v-8eda8d38="" style="color: yellow">8</li>
                                        <li data-v-8eda8d38="" style="color: yellow">9</li>
                                        <li data-v-8eda8d38="" style="color: yellow">10</li>
                                        <li data-v-8eda8d38="" style="color: yellow">11</li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </template>
                    <template v-else>
                        <ul class="nostyle kd-row prev-lottery-balls prev-lottery-balls-official sd115 show-display-inline">
                            <template v-if="history.content != 0 && history.content != ''">
                                <li v-for="(vo,key) in history.content" :key="key">
                                    <span class="lottery-ball solid sd115 lottery-ball-official">{{vo}}</span><!---->
                                </li>
                            </template>
                            <template v-else>
                                <li v-for="d in no_content">
                                    <span class="lottery-ball solid sd115 lottery-ball-official">{{d}}</span><!---->
                                </li> <!---->
                            </template>
                        </ul> <!---->
                    </template>
                </div>
                <div class="kd-container sd115 current-lottery-official width-40">
                    <div class="lottery-status-wrapper lottery-status-wrapper-official sd115 change-css-at-this-page">
                        <div class="lottery-issue lottery-issue-official sd115 show-display-block">第 {{next_expect}} 期</div>
                        <div class="lottery-status lottery-status-official sd115">
                            <span class="ls-status">{{is_feng ? '距下期' : '距封盘'}}</span>
                            <template v-for="(k,t) in timedate">
                                <i :class="['cd-num', (k == ':' ? 'cd-num-p':'cd-num-'+k), 'sd115']">{{k}}</i>
                                <!--<span>-->
                                    <!--{{k}}-->
                                <!--</span>-->
                            </template>

                        </div>
                    </div> <!---->
                </div> <!---->
            </div>
            <ul class="nostyle playing-methods playing-methods-official clearfix sd115" v-if="$store.state.offopen" style="height: auto;">
                <li class="playing-methods__group" v-for="(v,k) in config">
                    <div class="playing-methods__group-head sd115" v-if="v.items.length > 0">{{v.name}}</div>
                    <div class="clearfix playing-methods__group-body sd115">
                        <div class="playing-methods__item playing-methods-official__item playing-methods__group-name sd115">
                            <span class="item">{{v.name}}</span>
                        </div>
                        <div data-id="sd115091" :class="['playing-methods__item' ,'playing-methods-official__item','cqssc' ,wf==k && xingshi == k1 ? 'active' : '']" v-for="(v1,k1) in v.items">
                            <a class="item" @click="changeWanFa(k,k1,v.name,v1.name,v1.odds)">{{v1.name}}</a>
                        </div>
                    </div>
                </li>
            </ul>

            <transition name="height_change1">
                <div class="promptbox-wrapper prompt-in-game-rule sd115 prompt-gamerecords-official open-xiaoguo" style="position:static !important;" v-if="show_content" @click="showContentBtn()">
                    <section class="promptbox">
                        <div class="prompt-head">今日开奖</div>
                        <div class="prompt-body prompt-body--gamerecords">
                            <table class="account__table" v-if="dayHistory">
                                <thead>
                                    <tr>
                                        <th style="width: 16%;">期号</th>
                                        <th>开奖号</th>
                                        <th style="width: 20%;">和值</th>
                                        <th style="width: 20%;">形态</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="v in dayHistory">
                                        <td>{{v['expect']}}</td>
                                        <td class="primary-color">
                                            <span class="lottery-ball solid sd115 ball05 lottery-ball-official" v-for="ball_number in v['content']">{{ball_number}}</span>
                                        </td>
                                        <td>
                                            {{v['plus'][0]['data'][0]}}
                                        </td>
                                        <td>
                                            <span class="sum-type sum-type--black">{{v['plus'][0]['data'][1]}}</span>
                                            <span class="sum-type sum-type--orange">{{v['plus'][0]['data'][2]}}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table class="account__table" v-else>
                                <thead>
                                <tr>
                                    <th style="width: 16%;">期号</th>
                                    <th>开奖号</th>
                                    <th style="width: 20%;">和值</th>
                                    <th style="width: 20%;">形态</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                   <td colspan="4" style="height: 200px;position: relative;top: -40px;">今天没有开奖记录</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <a href="javascript:;" class="prompt-close kd-close">close</a>
                    </section>
                    <div class="promptbox-overlay"></div>
                </div>
            </transition>
            <div class="game-record-switch-wrapper" @click="showContentBtn()">
                <a href="javascript:;" v-if="!show_content" class="game-record-switch sd115 for-show-fangxiang" >
                <!--<i class="icon"></i>-->
                <!--︿-->
                    ﹀
                </a>
                <a href="javascript:;" v-else class="game-record-switch sd115" >
                    <!--<i class="icon"></i>-->
                    ︿
                </a>
            </div>
            <div class="current-category-caption">
                <div class="ccc-balance clearfix sd115">
                    <img src="/static/img/coin_package.png" alt="">{{ $store.state.user ? $store.state.user.money : '00.00' }}
                    <!--<a href="javascript:;" class="ccc-sharking-link sd115" @click="rengxuanyige()">摇一摇随机选-->
                        <!--<img src="/static/img/yaoyiyao_icon.png" class="show-yaoyiyao-icon">-->
                    <!--</a>-->
                </div>
                <div class="ccc-text sd115">
                    <span class="ccc-name">{{wf_name}}-{{xiangshi_name}}</span>
            {{wfsm}}

                    <!--<i class="icon icon-question sd115"></i>-->
                </div>
            </div>
            <section class="playing-method-section__gf" id="category-sd115-gf-t8">
                <div class="betting-bar sd115">
                    <div class="betting-bar-info sd115 width-auto">
                        <p>共 <strong>{{touzhu}}</strong> 注, 投注 <strong>{{money}}</strong> 元</p>
                    </div>
                    <div type="button" class="kd-button kd-button--official kd-button--clear width-auto" @click="qingkong()">清空
                        <button type="button">Button</button>
                    </div>
                    <a href="javascript:;" class="cart-setting" @click="setUpMoney()">{{danwei}}</a>
                    <input type="text" name="beishu" value="1" v-model="beishu">

                    倍

                    <div type="button" class="kd-button kd-button--official btn-red kd-button--add-to-cart empty width-auto new-padding" data-number="0">投注
                        <button type="button" @click="openShowXiDan()">Button</button>
                    </div>
                </div>
                <template v-if="show_haoma">
                    <template v-for="(v,k) in xuanhao">
                        <div class="playing-methods-box sd115" v-if="suoying[k]">
                            <div class="playing-methods__balls-title sd115">
                                <span v-if="k==1">千位</span>
                                <span v-if="k==2">百位</span>
                                <span v-if="k==3">十位</span>
                                <span v-if="k==4">个位</span>
                                <span v-if="k==0">{{xuanhao_name}}</span>
                            </div>
                            <ul class="nostyle clearfix playing-methods__balls sd115">
                                <li class="playing-methods__balls-item sd115" v-for="(v1,k1) in v" @click="changeThis(k,k1)">
                                    <template v-if="v1.is_selected==1">
                                    <span :id="'lottery-ball-x'+k+'y'+k1" class="lottery-ball selected show-ball-after" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{v1.number}}</span><!---->
                                    </span>
                                    </template>
                                    <template v-else>
                                    <span :id="'lottery-ball-x'+k+'y'+k1" class="lottery-ball show-ball-after" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{v1.number}}</span><!---->
                                    </span>
                                    </template>
                                </li>
                            </ul>
                            <div class="playing-methods__tool sd115">
                                <div class="playing-methods__tool-title sd115">快速选号</div>
                                <div class="playing-methods__tool-items clearfix sd115">
                                    <span class="playing-methods__tool-button sd115" @click="selectedType(k,'quan')">全</span>
                                    <span class="playing-methods__tool-button sd115" @click="selectedType(k,'da')">大</span>
                                    <span class="playing-methods__tool-button sd115" @click="selectedType(k,'xiao')">小</span>
                                    <span class="playing-methods__tool-button sd115" @click="selectedType(k,'dan')">单</span>
                                    <span class="playing-methods__tool-button sd115" @click="selectedType(k,'shuang')">双</span>
                                    <span class="playing-methods__tool-button sd115" @click="selectedType(k,'qing')">清</span>
                                </div>
                            </div>
                        </div>
                    </template>
                </template>

                <template v-if="show_danshi">
                    <section class="playing-method-section__gf" id="category-c-gf-18">
                        <div class="playing-methods-box cqssc">
                            <div class="playing-methods__balls-title cqssc">
                                <span>手动输入</span>
                            </div>
                            <ul class="nostyle clearfix playing-methods__balls cqssc">
                                <li class="playing-methods__ballsText"><p class="playing-methods__tip cqssc">
                                    <strong>注意：</strong>手动输入号码，每个号码用逗号(",")隔开，每注号码用分号(";")或者换行或者空格(" ")隔开</p>
                                    <div class="kd-textinput textarea">
                                        <textarea id="playing-methods__input" v-model="touzhu_input_code"></textarea>
                                    </div>
                                </li>
                            </ul> <!---->
                        </div> <!----><!---->
                    </section>
                </template>
                <!---->

                <div class="pcs-box-wrapper promptbox-cart-setting" v-if="money_set_up">
                    <div class="pcs-box">
                        <div class="pcs-row pcs-head">
                            设置
                            <a href="javascript:;" class="kd-close" @click="closeSetUp1()">close</a>
                        </div>
                        <div class="pcs-row">
                            单位

                            <div :class="['kd-radio2',danwei == '元' ? 'checked':'']" @click="changeDanWei('元')">
                                <i class="icon"></i>
                                <span> 元</span>
                            </div>
                            <div :class="['kd-radio2',danwei == '角' ? 'checked':'']" @click="changeDanWei('角')">
                                <i class="icon"></i>
                                <span> 角</span>
                            </div>
                            <div :class="['kd-radio2',danwei == '分' ? 'checked':'']" @click="changeDanWei('分')">
                                <i class="icon"></i>
                                <span> 分</span>
                            </div>
                        </div>
                        <div class="pcs-row pcs-row--multiple">
                            倍数
                            <input type="text" v-model="beishu">
                        </div>
                        <div class="pcs-row">单注单倍奖金：{{oneMoney * odds}}元</div>
                        <div class="pcs-row clearfix">
                            <div type="button" class="kd-button kd-button--official btn-orange kd-button--default">
                                恢复默认
                                <button type="button" @click="returnMoRen()">Button</button>
                            </div>
                            <div type="button" class="kd-button kd-button--official btn-red kd-button--confirm">
                                确 认
                                <button type="button" @click="closeSetUp()">Button</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pcs-box-wrapper promptbox-cart-tip" v-if="show_xia_dan">
                    <div class="pcs-box">
                        <div class="pcs-row pcs-head">下单提示</div>
                        <div class="pcs-row">单注单倍奖金：{{oneMoney * odds}}元</div>
                        <div class="pcs-row pcs-row--multiple">倍数
                            <input type="text" v-model="beishu">单位
                            <div class="kd-select">
                                <span class="value">{{danwei}}</span>
                                <select @cchange="changeDanWei2()" v-model="danwei">
                                    <template v-if="danwei=='元'">
                                        <option value="元" selected>元</option>
                                    </template>
                                    <template v-else>
                                        <option value="元">元</option>
                                    </template>
                                    <template v-if="danwei=='角'">
                                        <option value="角" selected>角</option>
                                    </template>
                                    <template v-else>
                                        <option value="角">角</option>
                                    </template>
                                    <template v-if="danwei=='分'">
                                        <option value="分" selected>分</option>
                                    </template>
                                    <template v-else>
                                        <option value="分">分</option>
                                    </template>
                                </select>
                            </div>
                        </div>
                        <div class="pcs-row pcs-row--info">
                            <p>共 <strong>{{touzhu}}</strong> 注</p>
                            <p>投注 <strong>{{money}}</strong> 元</p>
                        </div>
                        <div class="pcs-row clearfix">
                            <div type="button" class="kd-button kd-button--official btn-orange kd-button--cancel">取 消<button type="button" @click="notBetMyCode()">Button</button>
                            </div>
                            <div type="button" class="kd-button kd-button--official btn-red kd-button--submit" @click="betMyCode()">提 交<button type="button">Button</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="promptbox-cart-box cqssc" style="" v-if="danshi_confirm">
                    <div class="pcb-head cqssc">
                        <a href="javascript:;" class="pcb-go-back">
                            <i class="icon icon-nav-arrow-left" @click="closeThisPage()"></i>
                        </a>
                        {{caipiaoname}}
                    </div>
                    <div class="current-lottery-in-cart cqssc">
                        <span class="ls-status">{{is_feng ? '距下期' : '距封盘'}}</span>
                        <i v-for="(k,t) in timedate" :class="['cd-num', (k == ':' ? 'cd-num-p':'cd-num-'+k), 'sd115']">{{k}}</i>
                    </div>
                    <div class="pcb-buttons clearfix cqssc">
                        <div class="pcb-balance cqssc">
                            <img src="/static/img/coin_package.png" alt="">{{ $store.state.user ? $store.state.user.money : '00.00' }}
                        </div>
                    </div>
                    <div class="pcb-list">
                        <template v-for="(v,k) in code">
                            <template v-if="v.length > 0">
                                <div class="pcb-list-item pcb-list-item__first"></div>
                                <div class="pcb-list-item">
                                    <div class="pcb-list-item__product">
                                        {{$store.state.offtxt}}-{{xiangshi_name}}:
                                        <span class="im-color">{{v}}</span>
                                    </div>
                                    <a title="移除" class="pcb-list-item__remove" @click="deleteOneCode(k,v)">
                                        <i class="icon icon-times"></i>
                                    </a>
                                </div>
                            </template>
                        </template>
                        <div class="pcb-list-item pcb-list-item__last"></div>
                    </div>
                    <div class="pcb-foot">
                        <div class="pcb-info cqssc">
                            共<strong>{{touzhu}}</strong> 注，投注
                            <strong>{{money}}</strong> 元
                        </div>

                        <div type="button" :class="['kd-button', 'kd-button--official', 'btn-red', 'kd-button--do-bet',is_feng? 'disabled':'']">{{is_feng ? '已封盘' : '下注中'}}
                            <template v-if="is_feng">
                                <button type="button" disabled="disabled">Button</button>
                            </template>
                            <template v-else>
                                <button type="button" @click="betMyCode()">Button</button>
                            </template>
                        </div>
                    </div>
                </div>
            </section>

            <input type="hidden" name="wf" v-model="wf">
            <input type="hidden" name="xingshi" v-model="xingshi">
            <input type="hidden" name="touzhu" v-model="touzhu">
            <input type="hidden" name="money" v-model="money">
            <input type="hidden" name="code" v-model="code">
            <input type="hidden" name="odds" v-model="odds">
        </main>
    </div>
</template>

<script>
    export default {
        name: "official",
        mounted() {
            this.$store.state.offtype = 0;
            this.$store.state.official = true;

            this.$store.state.offtxt = '任选';
            this.lunxun = true;
            this.getInfo('start');
            this.getHistory();
        },
        destroyed(){
            this.$store.state.offtype = 0;

            this.$store.state.official = false;
            this.lunxun = false;
        },
        data(){
            return {
                wfsm:'从01-11中任意选择1个或1个以上号码。',
                show_danshi:false,
                show_haoma:true,
                touzhu_input_code:'',
                caipiaoname:'',
                now_expect:'暂未开奖',
                next_expect:'01',
                //下一期期号
                now_expect_quan : 0,
                time:0,
                //封盘时间
                desct:30,
                //开启轮询
                lunxun:true,
                //上一期数据
                history:{
                    expect:'',
                    content:0,
                },
                config:[],
                no_content:[0,0,0,0,0],
                data_post:0,
                xuanhao:[
                    [
                        {'number':'01','is_selected':'0'},
                        {'number':'02','is_selected':'0'},
                        {'number':'03','is_selected':'0'},
                        {'number':'04','is_selected':'0'},
                        {'number':'05','is_selected':'0'},
                        {'number':'06','is_selected':'0'},
                        {'number':'07','is_selected':'0'},
                        {'number':'08','is_selected':'0'},
                        {'number':'09','is_selected':'0'},
                        {'number':'10','is_selected':'0'},
                        {'number':'11','is_selected':'0'},
                    ],
                    [
                        {'number':'01','is_selected':'0'},
                        {'number':'02','is_selected':'0'},
                        {'number':'03','is_selected':'0'},
                        {'number':'04','is_selected':'0'},
                        {'number':'05','is_selected':'0'},
                        {'number':'06','is_selected':'0'},
                        {'number':'07','is_selected':'0'},
                        {'number':'08','is_selected':'0'},
                        {'number':'09','is_selected':'0'},
                        {'number':'10','is_selected':'0'},
                        {'number':'11','is_selected':'0'},
                    ],
                    [
                        {'number':'01','is_selected':'0'},
                        {'number':'02','is_selected':'0'},
                        {'number':'03','is_selected':'0'},
                        {'number':'04','is_selected':'0'},
                        {'number':'05','is_selected':'0'},
                        {'number':'06','is_selected':'0'},
                        {'number':'07','is_selected':'0'},
                        {'number':'08','is_selected':'0'},
                        {'number':'09','is_selected':'0'},
                        {'number':'10','is_selected':'0'},
                        {'number':'11','is_selected':'0'},
                    ],
                    [
                        {'number':'01','is_selected':'0'},
                        {'number':'02','is_selected':'0'},
                        {'number':'03','is_selected':'0'},
                        {'number':'04','is_selected':'0'},
                        {'number':'05','is_selected':'0'},
                        {'number':'06','is_selected':'0'},
                        {'number':'07','is_selected':'0'},
                        {'number':'08','is_selected':'0'},
                        {'number':'09','is_selected':'0'},
                        {'number':'10','is_selected':'0'},
                        {'number':'11','is_selected':'0'},
                    ],
                    [
                        {'number':'01','is_selected':'0'},
                        {'number':'02','is_selected':'0'},
                        {'number':'03','is_selected':'0'},
                        {'number':'04','is_selected':'0'},
                        {'number':'05','is_selected':'0'},
                        {'number':'06','is_selected':'0'},
                        {'number':'07','is_selected':'0'},
                        {'number':'08','is_selected':'0'},
                        {'number':'09','is_selected':'0'},
                        {'number':'10','is_selected':'0'},
                        {'number':'11','is_selected':'0'},
                    ]
                ],
                //投注注数
                touzhu:0,
                //投注金额
                money:0,
                //单注投注金额
                oneMoney:1,
                //投注倍数
                beishu:1,
                //
                is_feng:false,
                show_content:false,
                //今天的历史开奖，最新十期
                dayHistory:false,
                //玩法
                wf:'official_rx',
                xingshi:'official_1z1',
                odds:10,
                xiangshi_name:'一中一',
                wf_name:'任选',
                //选择的号码
                code:[[],[],[],[],[]],
                suoying:[true, false, false, false, false],
                xuanhao_name:'选号',
                //投注金额设置
                money_set_up:false,
                //投注金额基本单位
                danwei:'元',
                //
                log_set: {"oneMoney":1,
                    "danwei":'元',
                    "beishu":1
                },
                show_xia_dan:false,
                danshi_confirm:false,
            }
        },
        computed:{
            // 时间显示
            timedate(){
                let _this = this,list = [0,0,0];
                if(_this.now_expect != ''){
                    let bit = _this.time;
                    if( bit <= 0){
                        _this.is_feng = true;
                        bit += parseInt(_this.desct);
                    }
                    if( bit > 0 ){
                        list[0] = parseInt(bit/3600);
                        list[1] = parseInt(bit/60);
                        list[2] = bit%60;
                    }
                }
                for(let i in list){
                    if(list[i]<10){
                        list[i] = '0' + list[i];
                    }
                }

                return list[0]+':'+list[1]+':'+list[2];
            },
        },
        methods:{
            //移除单式选择的投注项目
            //移除单式中某一注
            deleteOneCode(k,v)
            {
                this.code.splice(k,1);
                this.touzhu = this.code.length;
                this.money = this.touzhu * this.beishu * this.oneMoney;
                if(this.code.length < 1)
                {
                    this.danshi_confirm = false;
                }
            },
            //取消提交
            notBetMyCode()
            {
                this.show_xia_dan = false;
            },
            openShowXiDan(){
                if(this.is_feng){
                    this.$total({ message:'已封盘！',type: 2 });
                    return false;
                }else if(this.money == 0){
                    this.$total({ message:'没有投注数据！',type: 2 });
                    return false;
                }
                if(this.xingshi == 'official_q3zhids' || this.xingshi == 'official_z3ds' || this.xingshi == 'official_h3ds' || this.xingshi == 'official_q2zhids' || this.xingshi == 'official_h2ds')
                {
                    this.danshi_confirm = true;
                }
                else
                {
                    this.show_xia_dan = true;
                }
            },
            //清空
            qingkong()
            {
                this.xuanhao = [
                    [
                        {'number':'01','is_selected':'0'},
                        {'number':'02','is_selected':'0'},
                        {'number':'03','is_selected':'0'},
                        {'number':'04','is_selected':'0'},
                        {'number':'05','is_selected':'0'},
                        {'number':'06','is_selected':'0'},
                        {'number':'07','is_selected':'0'},
                        {'number':'08','is_selected':'0'},
                        {'number':'09','is_selected':'0'},
                        {'number':'10','is_selected':'0'},
                        {'number':'11','is_selected':'0'},
                    ],
                    [
                        {'number':'01','is_selected':'0'},
                        {'number':'02','is_selected':'0'},
                        {'number':'03','is_selected':'0'},
                        {'number':'04','is_selected':'0'},
                        {'number':'05','is_selected':'0'},
                        {'number':'06','is_selected':'0'},
                        {'number':'07','is_selected':'0'},
                        {'number':'08','is_selected':'0'},
                        {'number':'09','is_selected':'0'},
                        {'number':'10','is_selected':'0'},
                        {'number':'11','is_selected':'0'},
                    ],
                    [
                        {'number':'01','is_selected':'0'},
                        {'number':'02','is_selected':'0'},
                        {'number':'03','is_selected':'0'},
                        {'number':'04','is_selected':'0'},
                        {'number':'05','is_selected':'0'},
                        {'number':'06','is_selected':'0'},
                        {'number':'07','is_selected':'0'},
                        {'number':'08','is_selected':'0'},
                        {'number':'09','is_selected':'0'},
                        {'number':'10','is_selected':'0'},
                        {'number':'11','is_selected':'0'},
                    ],
                    [
                        {'number':'01','is_selected':'0'},
                        {'number':'02','is_selected':'0'},
                        {'number':'03','is_selected':'0'},
                        {'number':'04','is_selected':'0'},
                        {'number':'05','is_selected':'0'},
                        {'number':'06','is_selected':'0'},
                        {'number':'07','is_selected':'0'},
                        {'number':'08','is_selected':'0'},
                        {'number':'09','is_selected':'0'},
                        {'number':'10','is_selected':'0'},
                        {'number':'11','is_selected':'0'},
                    ],
                    [
                        {'number':'01','is_selected':'0'},
                        {'number':'02','is_selected':'0'},
                        {'number':'03','is_selected':'0'},
                        {'number':'04','is_selected':'0'},
                        {'number':'05','is_selected':'0'},
                        {'number':'06','is_selected':'0'},
                        {'number':'07','is_selected':'0'},
                        {'number':'08','is_selected':'0'},
                        {'number':'09','is_selected':'0'},
                        {'number':'10','is_selected':'0'},
                        {'number':'11','is_selected':'0'},
                    ]
                ];
                this.code = [[]];
                this.touzhu_input_code = '';
                this.forTouzhuAndMoney();
            },
            //恢复到默认
            returnMoRen()
            {
                this.danwei = '元';
                this.oneMoney = 1;
                this.beishu = 1;
                this.money_set_up = false;
            },
            //改变基本单位
            changeDanWei(name)
            {
                this.danwei = name;
                if(name == '元')
                {
                    this.oneMoney = 1;
                }
                if(name == '角')
                {
                    this.oneMoney = 0.1;
                }
                if(name == '分')
                {
                    this.oneMoney = 0.01;
                }
            },
            //设置
            setUpMoney()
            {
                this.money_set_up = true;
            },
            closeSetUp(){
                this.log_set = {"oneMoney":this.oneMoney,
                    "danwei":this.danwei,
                    "beishu":this.beishu},
                this.money_set_up = false;
            },
            closeSetUp1(){
                this.oneMoney = this.log_set['oneMoney'];
                this.danwei = this.log_set['danwei'];
                this.beishu = this.log_set['beishu'];
                this.money_set_up = false;
            },
            //进行投注
            betMyCode()
            {
                var data = [{
                    key1:this.wf,
                    key2:this.xingshi,
                    content:this.code,
                    single:this.money/this.touzhu,
                    money:this.money,
                    num:this.touzhu,
                    odds:this.odds,
                }];
                var form = {
                    'data': JSON.stringify(data),
                    'expect':this.now_expect_quan,
                    'official':1,
                    'type': this.$route.params.id
                };
                //bet_list:[
                // {key1:'official_dwd',key2:'official_dwd_fs',content:[[0,1,2,3],[0,1,2,3]],single:10,odds:1,num:1},
            //],
                //{data: "[{"key1":"official_dwd","key2":"official_dwd_fs","…:[],"9":[]},"single":"11.00","odds":10,"num":20}]", expect: 732278, official: 1, type: "3"}
                if(this.is_feng){
                    this.$total({ message:'已封盘！',type: 2 });
                    return false;
                }else if(this.money == 0){
                    this.$total({ message:'没有投注数据！',type: 2 });
                    return false;
                }
                var _this = this;
                _this.$getData({
                    url:'/api/home/Lottery_X/officialBetting',
                    data:form,
                    callback:function(res){
                        if(res.code == 1){
                            _this.$total({ message:'投注成功！',type: 1 });
                            _this.show_xia_dan = false;
                            _this.danshi_confirm = false;
                            _this.qingkong();
                        }else{
                            _this.$total({ message:res.msg,type: 2 });
                        }
                    }
                });
            },
            //计算投注数和投注金额
            forTouzhuAndMoney()
            {
                if(this.xingshi == 'official_1z1' || this.xingshi == 'official_q3ymbdw' || this.xingshi == 'official_z3' || this.xingshi == 'official_h3')
                {
                    this.touzhu = this.code[0].length;
                    this.money = this.touzhu * this.oneMoney * this.beishu;
                }

                if(this.xingshi == 'official_2z2')
                {
                    var num = this.code[0].length;
                    if(num >= 2)
                    {
                        this.touzhu = num * (num-1);
                        this.touzhu = this.touzhu/2;
                        this.money = this.touzhu * this.oneMoney * this.beishu;
                    }
                    else
                    {
                        this.touzhu = 0;
                        this.money = 0;
                    }
                }

                if(this.xingshi == 'official_3z3')
                {
                    var num = this.code[0].length;
                    if(num >= 3)
                    {
                        this.touzhu = num * (num-1) * (num-2);
                        this.touzhu = this.touzhu/6;
                        this.money = this.touzhu * this.oneMoney * this.beishu;
                    }
                    else
                    {
                        this.touzhu = 0;
                        this.money = 0;
                    }
                }
                if(this.xingshi == 'official_4z4')
                {
                    var num = this.code[0].length;
                    if(num >= 4)
                    {
                        this.touzhu = num * (num-1) * (num-2) * (num-3);
                        this.touzhu = this.touzhu/24;
                        this.money = this.touzhu * this.oneMoney * this.beishu;
                    }
                    else
                    {
                        this.touzhu = 0;
                        this.money = 0;
                    }
                }

                if(this.xingshi == 'official_6z5')
                {
                    var num = this.code[0].length;
                    if(num >= 6)
                    {
                        this.touzhu = num * (num-1) * (num-2) * (num-3) * (num-4) * (num-5);
                        this.touzhu = this.touzhu/720;
                        this.money = this.touzhu * this.oneMoney * this.beishu;
                    }
                    else
                    {
                        this.touzhu = 0;
                        this.money = 0;
                    }
                }

                if(this.xingshi == 'official_7z5')
                {
                    var num = this.code[0].length;
                    if(num >= 7)
                    {
                        this.touzhu = num * (num-1) * (num-2) * (num-3) * (num-4) * (num-5) * (num-6);
                        this.touzhu = this.touzhu/(720*7);
                        this.money = this.touzhu * this.oneMoney * this.beishu;
                    }
                    else
                    {
                        this.touzhu = 0;
                        this.money = 0;
                    }
                }

                if(this.xingshi == 'official_8z5')
                {
                    var num = this.code[0].length;
                    if(num >= 8)
                    {
                        this.touzhu = num * (num-1) * (num-2) * (num-3) * (num-4) * (num-5) * (num-6) * (num-7);
                        this.touzhu = this.touzhu/(720*7*8);
                        this.money = this.touzhu * this.oneMoney * this.beishu;
                    }
                    else
                    {
                        this.touzhu = 0;
                        this.money = 0;
                    }
                }

                if(this.xingshi == 'official_fs')
                {
                    this.touzhu = 0;
                    for(var i=0;i<5;i++)
                    {
                        if(this.code[i])
                        {
                            this.touzhu += this.code[i].length
                        }
                    }
                    this.money = this.touzhu * 1;
                }
                if(this.xingshi == 'official_q3zhifs')
                {
                    this.touzhu = 0;
                    var num1 = this.code[0] ? this.code[0].length : 0;
                    var num2 = this.code[1] ? this.code[1].length : 0;
                    var num3 = this.code[2] ? this.code[2].length : 0;
                    for(var i=0;i<num1;i++)
                    {
                        for (var j=0;j<num2;j++)
                        {
                            for (var k=0;k<num3;k++)
                            {
                                if(this.code[0][i] != this.code[1][j] && this.code[0][i] != this.code[2][k] && this.code[1][j] != this.code[2][k])
                                {
                                    this.touzhu += 1;
                                }
                                else
                                {
                                    continue;
                                }
                            }
                        }
                    }
                    this.money = this.touzhu * this.oneMoney * this.beishu;
                }
                if(this.xingshi == 'official_q3zufs' || this.xingshi == 'official_z3zx' || this.xingshi == 'official_h3zx')
                {
                    this.touzhu = 0;
                    var num = this.code[0] ? this.code[0].length : 0;
                    if(num >= 3)
                    {
                        this.touzhu = (num*(num-1)*(num-2))/6;
                        this.money = this.touzhu * this.oneMoney * this.beishu;
                    }
                }
                if(this.xingshi == 'official_z3fs')
                {
                    this.touzhu = 0;
                    var num1 = this.code[1] ? this.code[1].length : 0;
                    var num2 = this.code[2] ? this.code[2].length : 0;
                    var num3 = this.code[3] ? this.code[3].length : 0;
                    for(var i=0;i<num1;i++)
                    {
                        for (var j=0;j<num2;j++)
                        {
                            for (var k=0;k<num3;k++)
                            {
                                if(this.code[1][i] != this.code[2][j] && this.code[1][i] != this.code[3][k] && this.code[2][j] != this.code[3][k])
                                {
                                    this.touzhu += 1;
                                }
                                else
                                {
                                    continue;
                                }
                            }
                        }
                    }
                    this.money = this.touzhu * this.oneMoney * this.beishu;
                }

                if(this.xingshi == 'official_h3fs')
                {
                    this.touzhu = 0;
                    var num1 = this.code[2] ? this.code[2].length : 0;
                    var num2 = this.code[3] ? this.code[3].length : 0;
                    var num3 = this.code[4] ? this.code[4].length : 0;
                    for(var i=0;i<num1;i++)
                    {
                        for (var j=0;j<num2;j++)
                        {
                            for (var k=0;k<num3;k++)
                            {
                                if(this.code[2][i] != this.code[3][j] && this.code[2][i] != this.code[4][k] && this.code[3][j] != this.code[4][k])
                                {
                                    this.touzhu += 1;
                                }
                                else
                                {
                                    continue;
                                }
                            }
                        }
                    }
                    this.money = this.touzhu * this.oneMoney * this.beishu;
                }

                if(this.xingshi == 'official_q2zhifs')
                {
                    this.touzhu = 0;
                    var num1 = this.code[0] ? this.code[0].length : 0;
                    var num2 = this.code[1] ? this.code[1].length : 0;
                    for(var i=0;i<num1;i++)
                    {
                        for (var j=0;j<num2;j++)
                        {
                            if(this.code[0][i] != this.code[1][j])
                            {
                                this.touzhu += 1;
                            }
                            else
                            {
                                continue;
                            }
                        }
                    }
                    this.money = this.touzhu * this.oneMoney * this.beishu;
                }

                if(this.xingshi == 'official_q2zufs' || this.xingshi == 'official_h2zx')
                {
                    this.touzhu = 0;
                    var num = this.code[0] ? this.code[0].length : 0;
                    if(num >= 3)
                    {
                        this.touzhu = (num*(num-1))/2;
                        this.money = this.touzhu * this.oneMoney * this.beishu;
                    }
                }
                if(this.xingshi == 'official_h2fs')
                {
                    this.touzhu = 0;
                    var num1 = this.code[3] ? this.code[3].length : 0;
                    var num2 = this.code[4] ? this.code[4].length : 0;
                    for(var i=0;i<num1;i++)
                    {
                        for (var j=0;j<num2;j++)
                        {
                            if(this.code[3][i] != this.code[4][j])
                            {
                                this.touzhu += 1;
                            }
                            else
                            {
                                continue;
                            }
                        }
                    }
                    this.money = this.touzhu * this.oneMoney * this.beishu;
                }
            },
            //展开或者关闭历史开奖
            showContentBtn()
            {
                if(this.show_content == true)
                {
                    this.show_content = false;
                }
                else
                {
                    this.show_content = true;
                }
            },
            //选择玩法
            changeWanFa(wf,xingshi,title,name,odds)
            {
                this.wf = wf;
                this.xingshi = xingshi;
                this.beishu = 1;
                this.touzhu = 0;
                this.money = 0;
                this.$store.state.offtxt = title;
                this.xiangshi_name = name;
                this.wf_name = title;
                this.odds = odds;
                this.xuanhao = [
                    [
                        {'number':'01','is_selected':'0'},
                        {'number':'02','is_selected':'0'},
                        {'number':'03','is_selected':'0'},
                        {'number':'04','is_selected':'0'},
                        {'number':'05','is_selected':'0'},
                        {'number':'06','is_selected':'0'},
                        {'number':'07','is_selected':'0'},
                        {'number':'08','is_selected':'0'},
                        {'number':'09','is_selected':'0'},
                        {'number':'10','is_selected':'0'},
                        {'number':'11','is_selected':'0'},
                    ],
                    [
                        {'number':'01','is_selected':'0'},
                        {'number':'02','is_selected':'0'},
                        {'number':'03','is_selected':'0'},
                        {'number':'04','is_selected':'0'},
                        {'number':'05','is_selected':'0'},
                        {'number':'06','is_selected':'0'},
                        {'number':'07','is_selected':'0'},
                        {'number':'08','is_selected':'0'},
                        {'number':'09','is_selected':'0'},
                        {'number':'10','is_selected':'0'},
                        {'number':'11','is_selected':'0'},
                    ],
                    [
                        {'number':'01','is_selected':'0'},
                        {'number':'02','is_selected':'0'},
                        {'number':'03','is_selected':'0'},
                        {'number':'04','is_selected':'0'},
                        {'number':'05','is_selected':'0'},
                        {'number':'06','is_selected':'0'},
                        {'number':'07','is_selected':'0'},
                        {'number':'08','is_selected':'0'},
                        {'number':'09','is_selected':'0'},
                        {'number':'10','is_selected':'0'},
                        {'number':'11','is_selected':'0'},
                    ],
                    [
                        {'number':'01','is_selected':'0'},
                        {'number':'02','is_selected':'0'},
                        {'number':'03','is_selected':'0'},
                        {'number':'04','is_selected':'0'},
                        {'number':'05','is_selected':'0'},
                        {'number':'06','is_selected':'0'},
                        {'number':'07','is_selected':'0'},
                        {'number':'08','is_selected':'0'},
                        {'number':'09','is_selected':'0'},
                        {'number':'10','is_selected':'0'},
                        {'number':'11','is_selected':'0'},
                    ],
                    [
                        {'number':'01','is_selected':'0'},
                        {'number':'02','is_selected':'0'},
                        {'number':'03','is_selected':'0'},
                        {'number':'04','is_selected':'0'},
                        {'number':'05','is_selected':'0'},
                        {'number':'06','is_selected':'0'},
                        {'number':'07','is_selected':'0'},
                        {'number':'08','is_selected':'0'},
                        {'number':'09','is_selected':'0'},
                        {'number':'10','is_selected':'0'},
                        {'number':'11','is_selected':'0'},
                    ]
                ];
                this.code = [[],[],[],[],[]];
                if(xingshi == 'official_1z1' || xingshi == 'official_2z2' || xingshi == 'official_3z3' || xingshi == 'official_4z4' || xingshi == 'official_5z5' || xingshi == 'official_6z5' || xingshi == 'official_7z5' || xingshi == 'official_8z5' || xingshi == 'official_q3zufs' || xingshi == 'official_z3zx' || xingshi == 'official_h3zx' || xingshi == 'official_q2zufs' || xingshi == 'official_h2zx' || xingshi == 'official_q3ymbdw' || xingshi == 'official_z3' || xingshi == 'official_h3')
                {
                    this.show_haoma = true;
                    this.show_danshi = false;
                    this.suoying = [true, false, false, false, false];
                }
                if(xingshi == 'official_fs')
                {
                    this.show_haoma = true;
                    this.show_danshi = false;
                    this.suoying = [true, true, true, true, true];
                    this.xuanhao_name = '万位';
                }
                if(xingshi == 'official_q3zhifs')
                {
                    this.show_haoma = true;
                    this.show_danshi = false;
                    this.suoying = [true, true, true, false, false];
                    this.xuanhao_name = '万位';
                }
                if(xingshi == 'official_z3fs')
                {
                    this.show_haoma = true;
                    this.show_danshi = false;
                    this.suoying = [false, true, true, true, false];
                    this.xuanhao_name = '万位';
                }
                if(xingshi == 'official_h3fs')
                {
                    this.show_haoma = true;
                    this.show_danshi = false;
                    this.suoying = [false, false, true, true, true];
                    this.xuanhao_name = '万位';
                }

                if(xingshi == 'official_q2zhifs')
                {
                    this.show_haoma = true;
                    this.show_danshi = false;
                    this.suoying = [true, true, false, false, false];
                }
                if(xingshi == 'official_h2fs')
                {
                    this.show_haoma = true;
                    this.show_danshi = false;
                    this.suoying = [false, false, false,true, true];
                }

                if(xingshi == 'official_q3zhids' || xingshi == 'official_z3ds' || xingshi == 'official_h3ds' || xingshi == 'official_q2zhids' || xingshi == 'official_h2ds')
                {
                    this.show_haoma = false;
                    this.show_danshi = true;
                }
                this.$store.state.offopen = false;
            },
            changeThis(k,k1)
            {
                if(this.xuanhao[k][k1]['is_selected'] == 1)
                {
                    this.xuanhao[k][k1]['is_selected'] = 0;
                    var key = this.code[k].indexOf(this.xuanhao[k][k1]['number']);
                    if(key != -1)
                    {
                        this.code[k].splice(key,1);
                    }
                    this.forTouzhuAndMoney();
                }
                else
                {
                    this.xuanhao[k][k1]['is_selected'] = 1;
                    this.code[k].push(this.xuanhao[k][k1]['number']);
                    this.forTouzhuAndMoney();
                }
            },
            //改变倍数
            rengxuanyige(){
               let arr = ['01','02','03','04','05','06','07','08','09','10','11'];
               let sui_key = Math.floor(Math.random() * 10);
               let suiji = arr[sui_key];
               var new_xuanhao1 = [
                           {'number':'01','is_selected':'0'},
                           {'number':'02','is_selected':'0'},
                           {'number':'03','is_selected':'0'},
                           {'number':'04','is_selected':'0'},
                           {'number':'05','is_selected':'0'},
                           {'number':'06','is_selected':'0'},
                           {'number':'07','is_selected':'0'},
                           {'number':'08','is_selected':'0'},
                           {'number':'09','is_selected':'0'},
                           {'number':'10','is_selected':'0'},
                           {'number':'11','is_selected':'0'},
                       ];
               new_xuanhao1[sui_key] = {'number':suiji,'is_selected':'1'};
               this.xuanhao[0] = new_xuanhao1;
               this.code[0] = [suiji];
               this.forTouzhuAndMoney();

            },
            selectedType(k,type)
            {
                switch (type) {
                    case 'quan':
                        this.xuanhao[k] = [
                            {'number':'01','is_selected':'1'},
                            {'number':'02','is_selected':'1'},
                            {'number':'03','is_selected':'1'},
                            {'number':'04','is_selected':'1'},
                            {'number':'05','is_selected':'1'},
                            {'number':'06','is_selected':'1'},
                            {'number':'07','is_selected':'1'},
                            {'number':'08','is_selected':'1'},
                            {'number':'09','is_selected':'1'},
                            {'number':'10','is_selected':'1'},
                            {'number':'11','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['01','02','03','04','05','06','07','08','09','10','11'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'da':
                        this.xuanhao[k] = [
                            {'number':'01','is_selected':'0'},
                            {'number':'02','is_selected':'0'},
                            {'number':'03','is_selected':'0'},
                            {'number':'04','is_selected':'0'},
                            {'number':'05','is_selected':'0'},
                            {'number':'06','is_selected':'0'},
                            {'number':'07','is_selected':'1'},
                            {'number':'08','is_selected':'1'},
                            {'number':'09','is_selected':'1'},
                            {'number':'10','is_selected':'1'},
                            {'number':'11','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['07','08','09','10','11'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'xiao':
                        this.xuanhao[k] = [
                            {'number':'01','is_selected':'1'},
                            {'number':'02','is_selected':'1'},
                            {'number':'03','is_selected':'1'},
                            {'number':'04','is_selected':'1'},
                            {'number':'05','is_selected':'1'},
                            {'number':'06','is_selected':'1'},
                            {'number':'07','is_selected':'0'},
                            {'number':'08','is_selected':'0'},
                            {'number':'09','is_selected':'0'},
                            {'number':'10','is_selected':'0'},
                            {'number':'11','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['01','02','03','04','05','06'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'dan':
                        this.xuanhao[k] = [
                            {'number':'01','is_selected':'1'},
                            {'number':'02','is_selected':'0'},
                            {'number':'03','is_selected':'1'},
                            {'number':'04','is_selected':'0'},
                            {'number':'05','is_selected':'1'},
                            {'number':'06','is_selected':'0'},
                            {'number':'07','is_selected':'1'},
                            {'number':'08','is_selected':'0'},
                            {'number':'09','is_selected':'1'},
                            {'number':'10','is_selected':'0'},
                            {'number':'11','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['01','03','05','07','09','11'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'shuang':
                        this.xuanhao[k] = [
                            {'number':'01','is_selected':'0'},
                            {'number':'02','is_selected':'1'},
                            {'number':'03','is_selected':'0'},
                            {'number':'04','is_selected':'1'},
                            {'number':'05','is_selected':'0'},
                            {'number':'06','is_selected':'1'},
                            {'number':'07','is_selected':'0'},
                            {'number':'08','is_selected':'1'},
                            {'number':'09','is_selected':'0'},
                            {'number':'10','is_selected':'1'},
                            {'number':'11','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['02','04','06','08','10'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'qing':
                        this.xuanhao[k] = [
                            {'number':'01','is_selected':'0'},
                            {'number':'02','is_selected':'0'},
                            {'number':'03','is_selected':'0'},
                            {'number':'04','is_selected':'0'},
                            {'number':'05','is_selected':'0'},
                            {'number':'06','is_selected':'0'},
                            {'number':'07','is_selected':'0'},
                            {'number':'08','is_selected':'0'},
                            {'number':'09','is_selected':'0'},
                            {'number':'10','is_selected':'0'},
                            {'number':'11','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.forTouzhuAndMoney();
                        break;
                }
            },
            getInfo(got){
                let _this = this;
                if(_this.data_post == 1){return;}
                _this.data_post = 1;
                _this.$getData({
                    url:'/api/home/lottery/getInfo=4',
                    //gf:是否是官方  number:需要几期号码
                    data:{type:_this.$route.params.id,official:1},
                    callback:function(res){
                        _this.data_post = 0;
                        if(res.code == 1)
                        {
                            _this.caipiaoname = res.data.name;
                            _this.desct = res.data.desc;
                            _this.time = res.data.number;
                            if(res.data.number <= 0)
                            {
                                _this.is_feng = true;
                                // _this.time = res.data.number + parseInt(res.data.desc);
                            }
                            else
                            {
                                _this.is_feng = false;
                                // _this.time = res.data.number;
                            }
                            var now_expect = res.data.history['expect'];
                            var next_expect = res.data.expect;
                            var start_z = res.data.expect.length - res.data.max_expect.length;
                            now_expect = String(now_expect).substring(start_z);
                            next_expect = String(next_expect).substring(start_z);
                            _this.now_expect = '第'+now_expect+'期';
                            _this.now_expect_quan = res.data.expect;
                            _this.next_expect = next_expect;
                            if(res.data.history['content'].length > 1){
                                _this.history['content'] = res.data.history['content'].split(',');
                            }
                            //初始化使用开始倒计时
                            if(got == 'start'){
                                _this.config = res.data.basic;
                                _this.$store.state.title = '官方-'+res.data.name;
                                _this.descTime();
                                _this.$store.state.offtxt = _this.list_data[_this.select[0]]['name'];

                            }
                        }else{

                        }
                    }
                });
            },
            getHistory(){
                //禁止查询类型
                var _this = this;
                _this.$getData({
                    loading:true,
                    url:'/api/home/home/getHistory-8',
                    data:{type:_this.$route.params.id},
                    callback:function(res){
                        _this.dayHistory = res;
                    }
                });
            },
            descTime(){
                let _this = this;
                if(!_this.lunxun){return;}

                _this.time -= 1;

                setTimeout(function(){
                    if(_this.time <= (_this.desct*-1)){ //倒计时结束 调用
                        _this.getInfo();
                    }
                    if((_this.history['content'] == 0 || _this.history['content'] == '') && _this.time%3 == 0 && _this.data_post == 0){
                        _this.getInfo();
                    }
                    _this.descTime();
                },1000);
            }
        },
        watch: {
            $route(){
                this.getInfo('start');
            },
            'xingshi':function () {
                if(this.xingshi == 'official_1z1')
                {
                    this.wfsm = '从01-11中任意选择1个或1个以上号码。';
                }
                if(this.xingshi == 'official_2z2')
                {
                    this.wfsm = '请选择至少2个号码。';
                }
                if(this.xingshi == 'official_3z3')
                {
                    this.wfsm = '请选择至少3个号码。';
                }
                if(this.xingshi == 'official_4z4')
                {
                    this.wfsm = '请选择至少4个号码。';
                }
                if(this.xingshi == 'official_6z5')
                {
                    this.wfsm = '请选择至少6个号码。';
                }
                if(this.xingshi == 'official_7z5')
                {
                    this.wfsm = '请选择至少7个号码。';
                }
                if(this.xingshi == 'official_8z5')
                {
                    this.wfsm = '请选择至少8个号码。';
                }
                if(this.xingshi == 'official_fs')
                {
                    this.wfsm = '从万位、千位、百位、十位、个位任意位置上至少选择1个号码。';
                }
                if(this.xingshi == 'official_q3zhifs')
                {
                    this.wfsm = '请选择至少1个万位，1个千位，1个百位号码。';
                }
                if(this.xingshi == 'official_q3zufs' || this.xingshi == 'official_z3zx' || this.xingshi == 'official_h3zx')
                {
                    this.wfsm = '请选择至少3个号码。';
                }
                if(this.xingshi == 'official_z3fs')
                {
                    this.wfsm = '请选择至少1个千位，1个百位，1十位号码。';
                }
                if(this.xingshi == 'official_z3fs')
                {
                    this.wfsm = '请选择至少1个千位，1个百位，1十位号码。';
                }
                if(this.xingshi == 'official_h3fs')
                {
                    this.wfsm = '请选择至少1个百位，1个十位，1个个位号码。';
                }
                if(this.xingshi == 'official_q3zhids' || this.xingshi == 'official_z3ds' || this.xingshi == 'official_h3ds' || this.xingshi == 'official_q2zhids' || this.xingshi == 'official_h2ds')
                {
                    this.wfsm = '请输入至少1组号码。';
                }
                if(this.xingshi == 'official_q2zhifs')
                {
                    this.wfsm = '请选择至少1个万位，1个千位号码。';
                }
                if(this.xingshi == 'official_q2zufs' || this.xingshi == 'official_z2zx' || this.xingshi == 'official_h2zx')
                {
                    this.wfsm = '请选择至少2个号码。';
                }
                if(this.xingshi == 'official_q3ymbdw' || this.xingshi == 'official_h3' || this.xingshi == 'official_z3')
                {
                    this.wfsm = '从01-11共11个号码中至少选择1个号码。';
                }
            },
            'beishu':function(newWord){
                if(newWord <= 0)
                {
                    this.money = 0;
                }
                else
                {
                    if(this.danwei == '元')
                    {
                        this.money = this.touzhu * newWord * 1;
                    }
                    if(this.danwei == '角')
                    {
                        this.money = this.touzhu * newWord * 0.1;
                    }
                    if(this.danwei == '分')
                    {
                        this.money = this.touzhu * newWord * 0.01;
                    }
                }
            },
            'danwei':function (newWord) {
                if(newWord == '元')
                {
                    this.money = this.touzhu * this.beishu * 1;
                }
                if(newWord == '角')
                {
                    this.money = this.touzhu * this.beishu * 0.1;
                }
                if(newWord == '分')
                {
                    this.money = this.touzhu * this.beishu * 0.01;
                }
            },
            'money':function () {
                this.money = Math.round(this.money*100)/100
            },
            'touzhu_input_code':function () {
                if(this.xingshi == 'official_q3zhids' || this.xingshi == 'official_z3ds' || this.xingshi == 'official_h3ds')
                {
                    var arr = this.touzhu_input_code.split(/[\r\n; ]+/);
                    var shuzi = ['01','02','03','04','05','06','07','08','09','10','11'];
                    var all = [];
                    for(var i=0;i<arr.length;i++)
                    {
                        var l = arr[i].split(',');
                        if(l.length == 3)
                        {
                            if(shuzi.indexOf(l[0]) != -1 && shuzi.indexOf(l[1]) != -1 && shuzi.indexOf(l[2]) != -1 && l[0] != l[1] && l[1] !=[2])
                            {
                                all.push(l);
                            }
                        }
                    }
                    this.code = all;
                    this.touzhu = all.length;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if(this.xingshi == 'official_q2zhids' || this.xingshi == 'official_h2ds')
                {
                    var arr = this.touzhu_input_code.split(/[\r\n; ]+/);
                    var shuzi = ['01','02','03','04','05','06','07','08','09','10','11'];
                    var all = [];
                    for(var i=0;i<arr.length;i++)
                    {
                        var l = arr[i].split(',');
                        if(l.length == 2)
                        {
                            if(shuzi.indexOf(l[0]) != -1 && shuzi.indexOf(l[1]) != -1)
                            {
                                all.push(l);
                            }
                        }
                    }
                    this.code = all;
                    this.touzhu = all.length;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }
            },
        }
    }
</script>

<style scoped>
    .kd-body{
        padding-top: 7.625rem !important;
    }
    .betting-bar{
        bottom: 3.0125rem !important;
    }
.height_change1-enter,.height_change1-leave-to{
    height: 0px;
}
.height_change1-enter-active,.height_change1-leave-active{
    transition: 1.5s;
}
.height_change1-enter-to,.height_change1-leave{
    height: 200px;
}
.open-xiaoguo{
    border-bottom: 2px solid #ccc;
}
.width-60{
    width: 60% !important;
}
.show-display-inline{
     display: inline-block !important;
 }
.show-display-block{
    display: block !important;
}
.width-40{
    width: 40% !important;
}
.change-css-at-this-page{
    border-top: none !important;
    padding: .5rem 0 !important;
}
.show-yaoyiyao-icon{
    width: 25px;
    height: 25px;
}
.for-show-fangxiang{
    padding-top: 3px;
}
.width-auto{
    width: auto !important;
}
.new-padding{
    padding: .4rem .75rem;
}
.show-ball-after{
    position: absolute;
    top: 100%;
    left: 10%;
    transform: translateX(-50%);
    margin-top: .25rem;
    color: #000;
    line-height: 1;
    font-size: .75em;
    display: block;
    content: attr(data-odds);
}
</style>
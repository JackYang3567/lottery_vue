<template>
    <div style="background: #226d4b;min-height: 100%;">
        <main class="kd-body game game-j game-official" style="background: #2c7e58;">
            <div class="clearfix lottery-wrapper lottery-wrapper-official jsk3 no-border-buttom" style="background:#226d4b !important; ">
                <div class="kd-container prev-lottery jsk3 prev-lottery-official width-60 border-zhouwei" style="min-height: 4.6425rem !important;">
                    <div class="prev-lottery-issue prev-lottery-issue-official jsk3 show-display-block">
                        <a :href="'#/game-c/'+$route.params.id" class="change-to-classical active jsk3">官方</a>{{caipiaoname}} {{now_expect}}
                    </div>

                    <template v-if="is_feng">
                        <ul class="prev-lottery-balls--touzi nostyle kd-row prev-lottery-balls prev-lottery-balls-official jsk3">
                            <li>
                                <span class="lottery-ball solid lottery-ball-official jsk3 show-touzi">1</span>
                            </li>
                            <li>
                                <span class="lottery-ball solid lottery-ball-official jsk3 show-touzi">2</span>
                            </li>
                            <li>
                                <span class="lottery-ball solid lottery-ball-official jsk3 show-touzi">3</span>
                            </li>
                        </ul>
                    </template>
                    <template v-else>
                        <ul class="nostyle kd-row prev-lottery-balls prev-lottery-balls-official jsk3" v-if="history['content']">
                            <li v-for="v in history['content']">
                                <span :class="'lottery-ball solid jsk3 ball'+v+' lottery-ball-official show-touzi'"></span>
                            </li>

                        </ul>
                        <ul class="nostyle kd-row prev-lottery-balls prev-lottery-balls-official cqssc" v-else>
                            <li v-for="v in ['未','开','奖']">
                                <span class="">{{v}}</span>
                            </li> <!---->
                        </ul> <!---->
                    </template>
                </div>
                <div class="kd-container cqssc current-lottery-official width-40">
                    <div class="lottery-status-wrapper lottery-status-wrapper-official cqssc change-css-at-this-page">
                        <div class="lottery-issue lottery-issue-official cqssc show-display-block">
                            第{{next_expect}}期
                        </div>
                        <div class="lottery-status lottery-status-official cqssc">
                            <span class="ls-status">{{is_feng ? '距下期' : '距封盘'}}</span>
                            <i v-for="(k,t) in timedate" :class="['cd-num', (k == ':' ? 'cd-num-p':'cd-num-'+k), 'sd115']">{{k}}</i>
                        </div>
                    </div> <!---->
                </div>
            </div>
            <ul class="nostyle playing-methods playing-methods-official clearfix jsk3" v-if="$store.state.offopen" style="height: auto;">
                <li class="playing-methods__group" v-for="(v,k) in config">
                    <div class="playing-methods__group-head jsk3">{{v.name}}</div>
                    <div class="clearfix playing-methods__group-body jsk3">
                        <div class="playing-methods__item playing-methods-official__item playing-methods__group-name jsk3">
                            <span class="item this-page-item">{{v.name}}</span>
                        </div>

                        <div :class="['playing-methods__item' ,'playing-methods-official__item','jsk3' ,wf==k && xingshi == k1 ? 'active' : '']" v-for="(v1,k1) in v.items">
                            <a class="item this-page-a-item" @click="changeWanFa(k,k1,v.name,v1.odds)">{{v1.name}}</a>
                        </div>
                    </div>
                </li>
            </ul> <!---->

            <transition name="height_change1">
                <div class="promptbox-wrapper prompt-in-game-rule sd115 prompt-gamerecords-official open-xiaoguo" style="position:static !important;" v-if="show_content" @click="showContentBtn()">
                    <section class="promptbox">
                        <div class="prompt-head">今日开奖</div>
                        <div class="prompt-body prompt-body--gamerecords" style="background: rgb(44, 126, 88);color: white;">
                            <table class="account__table" v-if="dayHistory">
                                <thead>
                                <tr>
                                    <th style="width: 16%;background: #193c29;">期号</th>
                                    <th style="background: #193c29;">开奖号</th>
                                    <th style="width: 20%;background: #193c29;">和值</th>
                                    <th style="width: 20%;background: #193c29;">形态</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="v in dayHistory">
                                    <td>{{v['expect']}}</td>
                                    <td class="primary-color">
                                        <span :class="'lottery-ball solid jsk3 ball'+ball_number+' lottery-ball-official show-touzi'" v-for="ball_number in v['content']">{{ball_number}}</span> <span v-for="ball_number in v['content']">{{ball_number}} </span>
                                        <!--<span class="lottery-ball solid sd115 ball05 lottery-ball-official" v-for="ball_number in v['content']">{{ball_number}}</span>-->
                                    </td>
                                    <td>
                                        {{v['plus'][0]['data'][0]}}
                                    </td>
                                    <td>
                                        <span class="sum-type sum-type--blue">{{v['plus'][0]['data'][1]}}</span>
                                        <span class="sum-type sum-type--blue">{{v['plus'][0]['data'][2]}}</span>
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
                                    <td colspan="4" style="height: 200px;lposition: relative;top: -40px;">今天没有开奖记录</td>
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

            <!--<div class="game-record-switch-wrapper">-->
                <!--<a href="javascript:;" class="game-record-switch jsk3">-->
                    <!--<i class="icon"></i>-->
                <!--</a>-->
            <!--</div>-->
            <div class="current-category-caption">
                <div class="ccc-balance clearfix sd115" style="color: #f7ce47;">
                    <img src="/static/img/coin_package.png" alt="">{{ $store.state.user ? $store.state.user.money : '00.00' }}
                    <!--<a href="javascript:;" class="ccc-sharking-link sd115" @click="rengxuanyige()">摇一摇随机选-->
                        <!--<img src="/static/img/yaoyiyao_icon.png" class="show-yaoyiyao-icon">-->
                    <!--</a>-->
                </div>
                <div class="ccc-text jsk3">
                    <span class="ccc-name">{{$store.state.offtxt}}</span>
                    {{wfsm}}
                    <!--<i class="icon icon-question jsk3"></i>-->
                </div>
            </div>
            <section class="playing-method-section__gf" id="category-shk3-gf-s10">
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

                <template v-if="show_he">
                    <div class="playing-methods-box jsk3">
                        <div class="playing-methods__balls-title jsk3">
                            <span>选号</span>
                        </div>
                        <ul class="nostyle clearfix playing-methods__balls jsk3">
                            <li class="playing-methods__balls-item jsk3" v-for="(v,k) in hezhi" @click="selectedHeZhi(k)">
                                <template v-if="v.is_selected==1">
                                    <span class="lottery-ball selected" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{v.number}}</span><!---->
                                    </span>
                                </template>
                                <template v-else>
                                    <span class="lottery-ball" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{v.number}}</span><!---->
                                    </span>
                                </template>
                            </li>
                        </ul>
                        <div class="playing-methods__tool jsk3">
                            <div class="playing-methods__tool-title jsk3">快速选号</div>
                            <div class="playing-methods__tool-items clearfix jsk3">
                                <span class="playing-methods__tool-button jsk3" @click="selectedType(0,'quan')">全</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedType(0,'da')">大</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedType(0,'xiao')">小</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedType(0,'dan')">单</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedType(0,'shuang')">双</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedType(0,'qing')">清</span>
                            </div>
                        </div>
                    </div> <!---->
                </template>
                <template v-if="show_dxds">
                    <div class="playing-methods-box jsk3">
                        <div class="playing-methods__balls-title jsk3">
                            <span>选号</span>
                        </div>
                        <ul class="nostyle clearfix playing-methods__balls jsk3">
                            <li class="playing-methods__balls-item jsk3" v-for="(v,k) in dxds" @click="selectedDXDS(k,v.number)">
                                <template v-if="v.is_selected==1">
                                    <span class="lottery-ball selected" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{v.value}}</span><!---->
                                    </span>
                                </template>
                                <template v-else>
                                    <span class="lottery-ball" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{v.value}}</span><!---->
                                    </span>
                                </template>
                            </li>
                        </ul>
                    </div> <!---->
                </template>
                <template v-if="show_tongxuan">
                    <div class="playing-methods-box jsk3">
                        <div class="playing-methods__balls-title jsk3">
                            <span>选号</span>
                        </div>
                        <ul class="nostyle clearfix playing-methods__balls jsk3">
                            <li class="playing-methods__balls-item jsk3" @click="selectedDXDS('all',tongxuan.number)">
                                <template v-if="tongxuan.is_selected==1">
                                    <span class="lottery-ball selected" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{tongxuan.value}}</span><!---->
                                    </span>
                                </template>
                                <template v-else>
                                    <span class="lottery-ball" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{tongxuan.value}}</span><!---->
                                    </span>
                                </template>
                            </li>
                        </ul>
                    </div> <!---->
                </template>
                <template v-if="show_santong">
                    <div class="playing-methods-box jsk3">
                        <div class="playing-methods__balls-title jsk3">
                            <span>选号</span>
                        </div>
                        <ul class="nostyle clearfix playing-methods__balls jsk3">
                            <li class="playing-methods__balls-item jsk3" v-for="(v,k) in santong" @click="selectedSanTong(k)">
                                <template v-if="v.is_selected==1">
                                    <span class="lottery-ball selected" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{v.number}}</span><!---->
                                    </span>
                                </template>
                                <template v-else>
                                    <span class="lottery-ball" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{v.number}}</span><!---->
                                    </span>
                                </template>
                            </li>
                        </ul>
                        <div class="playing-methods__tool jsk3">
                            <div class="playing-methods__tool-title jsk3">快速选号</div>
                            <div class="playing-methods__tool-items clearfix jsk3">
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeSanTong(0,'quan')">全</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeSanTong(0,'da')">大</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeSanTong(0,'xiao')">小</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeSanTong(0,'dan')">单</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeSanTong(0,'shuang')">双</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeSanTong(0,'qing')">清</span>
                            </div>
                        </div>
                    </div> <!---->
                </template>
                <template v-if="show_butong">
                    <div class="playing-methods-box jsk3">
                        <div class="playing-methods__balls-title jsk3">
                            <span>选号</span>
                        </div>
                        <ul class="nostyle clearfix playing-methods__balls jsk3">
                            <li class="playing-methods__balls-item jsk3" v-for="(v,k) in butong" @click="selectedBuTong(k)">
                                <template v-if="v.is_selected==1">
                                    <span class="lottery-ball selected" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{v.number}}</span><!---->
                                    </span>
                                </template>
                                <template v-else>
                                    <span class="lottery-ball" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{v.number}}</span><!---->
                                    </span>
                                </template>
                            </li>
                        </ul>
                        <div class="playing-methods__tool jsk3">
                            <div class="playing-methods__tool-title jsk3">快速选号</div>
                            <div class="playing-methods__tool-items clearfix jsk3">
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeBuTong(0,'quan')">全</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeBuTong(0,'da')">大</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeBuTong(0,'xiao')">小</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeBuTong(0,'dan')">单</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeBuTong(0,'shuang')">双</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeBuTong(0,'qing')">清</span>
                            </div>
                        </div>
                    </div> <!---->
                </template>
                <template v-if="show_ertong">
                    <div class="playing-methods-box jsk3">
                        <div class="playing-methods__balls-title jsk3">
                            <span>选号</span>
                        </div>
                        <ul class="nostyle clearfix playing-methods__balls jsk3">
                            <li class="playing-methods__balls-item jsk3" v-for="(v,k) in ertong" @click="selectedErTong(k)">
                                <template v-if="v.is_selected==1">
                                    <span class="lottery-ball selected" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{v.number}}</span><!---->
                                    </span>
                                </template>
                                <template v-else>
                                    <span class="lottery-ball" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{v.number}}</span><!---->
                                    </span>
                                </template>
                            </li>
                        </ul>
                        <div class="playing-methods__tool jsk3">
                            <div class="playing-methods__tool-title jsk3">快速选号</div>
                            <div class="playing-methods__tool-items clearfix jsk3">
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeErTong(0,'quan')">全</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeErTong(0,'da')">大</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeErTong(0,'xiao')">小</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeErTong(0,'dan')">单</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeErTong(0,'shuang')">双</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeErTong(0,'qing')">清</span>
                            </div>
                        </div>
                    </div> <!---->
                </template>
                <template v-if="show_ertongdx">
                    <div class="playing-methods-box jsk3">
                        <div class="playing-methods__balls-title jsk3">
                            <span>同号</span>
                        </div>
                        <ul class="nostyle clearfix playing-methods__balls jsk3">
                            <li class="playing-methods__balls-item jsk3" v-for="(v,k) in ertong" @click="selectedErTongQuChong(k)">
                                <template v-if="v.is_selected==1">
                                    <span class="lottery-ball selected" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{v.number}}</span><!---->
                                    </span>
                                </template>
                                <template v-else>
                                    <span class="lottery-ball" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{v.number}}</span><!---->
                                    </span>
                                </template>
                            </li>
                        </ul>
                        <div class="playing-methods__tool jsk3">
                            <div class="playing-methods__tool-title jsk3">快速选号</div>
                            <div class="playing-methods__tool-items clearfix jsk3">
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeErTongQuChong(0,'quan')">全</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeErTongQuChong(0,'da')">大</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeErTongQuChong(0,'xiao')">小</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeErTongQuChong(0,'dan')">单</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeErTongQuChong(0,'shuang')">双</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeErTongQuChong(0,'qing')">清</span>
                            </div>
                        </div>
                    </div> <!---->
                    <div class="playing-methods-box jsk3">
                        <div class="playing-methods__balls-title jsk3">
                            <span>不同号</span>
                        </div>
                        <ul class="nostyle clearfix playing-methods__balls jsk3">
                            <li class="playing-methods__balls-item jsk3" v-for="(v,k) in butong" @click="selectedBuTongQuChong(k,1)">
                                <template v-if="v.is_selected==1">
                                    <span class="lottery-ball selected" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{v.number}}</span><!---->
                                    </span>
                                </template>
                                <template v-else>
                                    <span class="lottery-ball" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{v.number}}</span><!---->
                                    </span>
                                </template>
                            </li>
                        </ul>
                        <div class="playing-methods__tool jsk3">
                            <div class="playing-methods__tool-title jsk3">快速选号</div>
                            <div class="playing-methods__tool-items clearfix jsk3">
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeBuTongQuChong(1,'quan')">全</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeBuTongQuChong(1,'da')">大</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeBuTongQuChong(1,'xiao')">小</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeBuTongQuChong(1,'dan')">单</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeBuTongQuChong(1,'shuang')">双</span>
                                <span class="playing-methods__tool-button jsk3" @click="selectedTypeBuTongQuChong(1,'qing')">清</span>
                            </div>
                        </div>
                    </div> <!---->
                </template>
                <div class="pcs-box-wrapper promptbox-cart-setting" style="display: none;">
                    <div class="pcs-box">
                        <div class="pcs-row pcs-head">
                            设置<a href="javascript:;" class="kd-close">close</a>
                        </div>
                        <div class="pcs-row">
                            单位
                            <div class="kd-radio2 checked">
                                <i class="icon"></i>
                                <span> 元</span>
                            </div>
                            <div class="kd-radio2">
                                <i class="icon"></i>
                                <span> 角</span>
                            </div>
                            <div class="kd-radio2">
                                <i class="icon"></i>
                                <span> 分</span>
                            </div>
                        </div>
                        <div class="pcs-row pcs-row--multiple">
                            倍数
                            <input type="text">
                        </div>
                        <div class="pcs-row">
                            单注单倍奖金：198元
                        </div>
                        <div class="pcs-row clearfix">
                            <div type="button" class="kd-button kd-button--official btn-orange kd-button--default">
                                恢复默认
                                <button type="button">Button</button>
                            </div>
                            <div type="button" class="kd-button kd-button--official btn-red kd-button--confirm">
                                确 认
                                <button type="button">Button</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pcs-box-wrapper promptbox-cart-tip" style="display: none;">
                    <div class="pcs-box">
                        <div class="pcs-row pcs-head">
                            下单提示
                        </div>
                        <div class="pcs-row">单注单倍奖金：198元</div>
                        <div class="pcs-row pcs-row--multiple">
                            倍数
                            <input type="text">
                            单位
                            <div class="kd-select">
                                <span class="value">元</span>
                                <select>
                                    <option value="元">元</option>
                                    <option value="角">角</option>
                                    <option value="分">分</option>
                                </select>
                            </div>
                        </div>
                        <div class="pcs-row pcs-row--info">
                            <p>共 <strong>0</strong> 注</p>
                            <p>投注 <strong>0</strong> 元</p>
                        </div>
                        <div class="pcs-row clearfix">
                            <div type="button" class="kd-button kd-button--official btn-orange kd-button--cancel">
                                取 消
                                <button type="button">Button</button>
                            </div>
                            <div type="button" class="kd-button kd-button--official btn-red kd-button--submit">
                                提 交 <button type="button">Button</button>
                            </div>
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
            this.$store.state.is_greem = 1;
            this.$store.state.official = true;

            this.$store.state.offtxt = '和值';
            this.lunxun = true;
            this.getInfo('start');
            this.getHistory();
        },
        destroyed(){
            this.$store.state.offtype = 0;
            this.$store.state.is_greem = 0;
            this.$store.state.official = false;
            this.lunxun = false;
        },
        data(){
            return {
                wfsm:'竞猜3个开奖号码之和。',
                touzhu_input_code:'',
                //临时记录用户输入的信息
                linshi_input:'',
                caipiaoname:'',
                now_expect:'暂未开奖',
                next_expect:'01',
                //下一期期号
                now_expect_quan : 0,
                dayHistory:false,
                time:10,
                //封盘时间
                desct:30,
                //开启轮询
                lunxun:true,
                //上一期数据
                history:{
                    expect:'',
                    content:0,
                },
                touzhu:0,
                beishu:1,
                money:0,
                danwei:'元',
                config:[],
                is_feng:false,
                wf:'official_hz',
                xingshi:'official_hz',
                odds:10,
                show_content:false,
                suoying:[true, true, true, true, true],
                hezhi:[
                    {'number':'3','is_selected':'0'},
                    {'number':'4','is_selected':'0'},
                    {'number':'5','is_selected':'0'},
                    {'number':'6','is_selected':'0'},
                    {'number':'7','is_selected':'0'},
                    {'number':'8','is_selected':'0'},
                    {'number':'9','is_selected':'0'},
                    {'number':'10','is_selected':'0'},
                    {'number':'11','is_selected':'0'},
                    {'number':'12','is_selected':'0'},
                    {'number':'13','is_selected':'0'},
                    {'number':'14','is_selected':'0'},
                    {'number':'15','is_selected':'0'},
                    {'number':'16','is_selected':'0'},
                    {'number':'17','is_selected':'0'},
                    {'number':'18','is_selected':'0'},
                ],
                santong:[
                    {'number':'111','is_selected':'0'},
                    {'number':'222','is_selected':'0'},
                    {'number':'333','is_selected':'0'},
                    {'number':'444','is_selected':'0'},
                    {'number':'555','is_selected':'0'},
                    {'number':'666','is_selected':'0'},
                ],
                ertong:[
                    {'number':'11','is_selected':'0'},
                    {'number':'22','is_selected':'0'},
                    {'number':'33','is_selected':'0'},
                    {'number':'44','is_selected':'0'},
                    {'number':'55','is_selected':'0'},
                    {'number':'66','is_selected':'0'},
                ],
                butong:[
                    {'number':'1','is_selected':'0'},
                    {'number':'2','is_selected':'0'},
                    {'number':'3','is_selected':'0'},
                    {'number':'4','is_selected':'0'},
                    {'number':'5','is_selected':'0'},
                    {'number':'6','is_selected':'0'},
                ],
                dxds:[
                    {'number':'da','value':'大','is_selected':'0'},
                    {'number':'x','value':'小','is_selected':'0'},
                    {'number':'dan','value':'单','is_selected':'0'},
                    {'number':'s','value':'双','is_selected':'0'},
                ],
                tongxuan:{
                    'number':'tx','value':'通选','is_selected':'0'
                },
                show_he:true,
                show_dxds:false,
                show_tongxuan:false,
                show_santong:false,
                show_butong:false,
                show_ertong:false,
                show_ertongdx:false,

                code:[[],[]],

                oneMoney:1,
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
            //恢复到默认
            returnMoRen()
            {
                this.danwei = '元';
                this.oneMoney = 1;
                this.beishu = 1;
                this.money_set_up = false;
            },
            //清空
            qingkong()
            {
                this.hezhi = [
                    {'number':'3','is_selected':'0'},
                    {'number':'4','is_selected':'0'},
                    {'number':'5','is_selected':'0'},
                    {'number':'6','is_selected':'0'},
                    {'number':'7','is_selected':'0'},
                    {'number':'8','is_selected':'0'},
                    {'number':'9','is_selected':'0'},
                    {'number':'10','is_selected':'0'},
                    {'number':'11','is_selected':'0'},
                    {'number':'12','is_selected':'0'},
                    {'number':'13','is_selected':'0'},
                    {'number':'14','is_selected':'0'},
                    {'number':'15','is_selected':'0'},
                    {'number':'16','is_selected':'0'},
                    {'number':'17','is_selected':'0'},
                    {'number':'18','is_selected':'0'},
                ];
                this.santong = [
                    {'number':'l11','is_selected':'0'},
                    {'number':'222','is_selected':'0'},
                    {'number':'333','is_selected':'0'},
                    {'number':'444','is_selected':'0'},
                    {'number':'555','is_selected':'0'},
                    {'number':'666','is_selected':'0'},
                ];
                this.ertong = [
                    {'number':'l1','is_selected':'0'},
                    {'number':'22','is_selected':'0'},
                    {'number':'33','is_selected':'0'},
                    {'number':'44','is_selected':'0'},
                    {'number':'55','is_selected':'0'},
                    {'number':'66','is_selected':'0'},
                ];
                this.butong = [
                    {'number':'1','is_selected':'0'},
                    {'number':'2','is_selected':'0'},
                    {'number':'3','is_selected':'0'},
                    {'number':'4','is_selected':'0'},
                    {'number':'5','is_selected':'0'},
                    {'number':'6','is_selected':'0'},
                ];
                this.dxds = [
                    {'number':'da','value':'大','is_selected':'0'},
                    {'number':'x','value':'小','is_selected':'0'},
                    {'number':'dan','value':'单','is_selected':'0'},
                    {'number':'s','value':'双','is_selected':'0'},
                ];
                this.code = [[],[]];
                this.forTouzhuAndMoney();
            },
            //选择号码球
            selectedHeZhi(k)
            {
                if(this.hezhi[k]['is_selected'] == 1)
                {
                    this.hezhi[k]['is_selected'] = 0;
                    var key = this.code[0].indexOf(this.hezhi[k]['number']);
                    if(key != -1)
                    {
                        this.code[0].splice(key,1);
                    }
                    this.forTouzhuAndMoney();
                }
                else
                {
                    this.hezhi[k]['is_selected'] = 1;
                    this.code[0].push(this.hezhi[k]['number']);
                    this.forTouzhuAndMoney();
                }
            },
            selectedDXDS(k,value){
                if(k == 'all')
                {
                    if(this.tongxuan['is_selected'] == 1)
                    {
                        this.tongxuan['is_selected'] = 0;
                        var key = this.code[0].indexOf(value);
                        if(key != -1)
                        {
                            this.code[0].splice(key,1);
                        }
                        this.forTouzhuAndMoney();
                    }
                    else
                    {
                        this.tongxuan['is_selected'] = 1;
                        this.code[0].push(value);
                        this.forTouzhuAndMoney();
                    }
                }
                else
                {
                    if(this.dxds[k]['is_selected'] == 1)
                    {
                        this.dxds[k]['is_selected'] = 0;
                        var key = this.code[0].indexOf(value);
                        if(key != -1)
                        {
                            this.code[0].splice(key,1);
                        }
                        this.forTouzhuAndMoney();
                    }
                    else
                    {
                        this.dxds[k]['is_selected'] = 1;
                        this.code[0].push(value);
                        this.forTouzhuAndMoney();
                    }
                }
            },
            selectedBuTong(k,qita=0){
                if(this.butong[k]['is_selected'] == 1)
                {
                    this.butong[k]['is_selected'] = 0;
                    var key = this.code[qita].indexOf(this.butong[k]['number']);
                    if(key != -1)
                    {
                        this.code[qita].splice(key,1);
                    }
                    this.forTouzhuAndMoney();
                }
                else
                {
                    this.butong[k]['is_selected'] = 1;
                    this.code[qita].push(this.butong[k]['number']);
                    this.forTouzhuAndMoney();
                }
            },
            selectedBuTongQuChong(k,qita=0){
                if(this.butong[k]['is_selected'] == 1)
                {
                    this.butong[k]['is_selected'] = 0;
                    var key = this.code[qita].indexOf(this.butong[k]['number']);
                    if(key != -1)
                    {
                        this.code[qita].splice(key,1);
                    }
                    this.forTouzhuAndMoney();
                }
                else
                {
                    this.butong[k]['is_selected'] = 1;
                    this.ertong[k]['is_selected'] = 0;
                    this.code[qita].push(this.butong[k]['number']);
                    if(this.code[1])
                    {
                        var key1 = this.code[0].indexOf(this.butong[k]['number'] + this.butong[k]['number']);
                        if(key1 != -1)
                        {
                            this.code[0].splice(key1,1);
                        }
                    }
                    this.forTouzhuAndMoney();
                }
            },
            selectedErTong(k){
                if(this.ertong[k]['is_selected'] == 1)
                {
                    this.ertong[k]['is_selected'] = 0;
                    var key = this.code[0].indexOf(this.ertong[k]['number']);
                    if(key != -1)
                    {
                        this.code[0].splice(key,1);
                    }
                    this.forTouzhuAndMoney();
                }
                else
                {
                    this.ertong[k]['is_selected'] = 1;
                    this.code[0].push(this.ertong[k]['number']);
                    this.forTouzhuAndMoney();
                }
            },
            //要去重的
            selectedErTongQuChong(k){
                if(this.ertong[k]['is_selected'] == 1)
                {
                    this.ertong[k]['is_selected'] = 0;
                    var key = this.code[0].indexOf(this.ertong[k]['number']);
                    if(key != -1)
                    {
                        this.code[0].splice(key,1);
                    }
                    this.forTouzhuAndMoney();
                }
                else
                {
                    this.ertong[k]['is_selected'] = 1;
                    this.code[0].push(this.ertong[k]['number']);
                    if(this.code[1])
                    {
                        var key1 = this.code[1].indexOf(this.ertong[k]['number'].substring(1));
                        this.butong[k]['is_selected'] = 0;
                        if(key1 != -1)
                        {
                            this.code[1].splice(key1,1);
                        }
                    }
                    this.forTouzhuAndMoney();
                }
            },
            selectedSanTong(k)
            {
                if(this.santong[k]['is_selected'] == 1)
                {
                    this.santong[k]['is_selected'] = 0;
                    var key = this.code[0].indexOf(this.santong[k]['number']);
                    if(key != -1)
                    {
                        this.code[0].splice(key,1);
                    }
                    this.forTouzhuAndMoney();
                }
                else
                {
                    this.santong[k]['is_selected'] = 1;
                    this.code[0].push(this.santong[k]['number']);
                    this.forTouzhuAndMoney();
                }
            },
            //计算投注金额和注数
            forTouzhuAndMoney()
            {
                if(this.wf == 'official_hz' && this.xingshi == 'official_hz')
                {
                    var arr = {'3':1, '4':3, '5':6, '6':10, '7':15, '8':21, '9':25, '10':27, '11':27, '12':25, '13':21, '14':15, '15':10, '16':6, '17':3, '18':1};
                    var num = 0;
                    for(var i = 0;i<this.code[0].length;i++)
                    {
                        num += arr[this.code[0][i]];
                    }
                    this.touzhu = num;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if((this.wf == 'official_hz' && this.xingshi == 'official_dxds') || (this.wf == 'official_3thtx' && this.xingshi == 'official_3thtx') || (this.wf == 'official_3thdx' && this.xingshi == 'official_3thdx') || (this.wf == 'official_3lhtx' && this.xingshi == 'official_3lhtx') || (this.wf == 'official_2lhfx' && this.xingshi == 'official_2lhfx'))
                {
                    this.touzhu = this.code[0].length;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if((this.wf == 'official_3bth' && this.xingshi == 'official_3bth'))
                {
                    if(this.code[0].length >= 3)
                    {
                        var num = this.code[0].length;
                        this.touzhu = (num * (num - 1) * (num - 2))/6;
                        this.money = this.touzhu * this.beishu * this.oneMoney;
                    }
                    else
                    {
                        this.touzhu = 0;
                        this.money = this.touzhu * this.beishu * this.oneMoney;
                    }
                }

                if((this.wf == 'official_2lhdx' && this.xingshi == 'official_2lhdx'))
                {
                    if(this.code[0].length > 0 && this.code[1].length > 0)
                    {
                        this.touzhu = this.code[0].length * this.code[1].length;
                        this.money = this.touzhu * this.beishu * this.oneMoney;
                    }
                    else
                    {
                        this.touzhu = 0;
                        this.money = this.touzhu * this.beishu * this.oneMoney;
                    }
                }

                if((this.wf == 'official_2bth' && this.xingshi == 'official_2bth'))
                {
                    if(this.code[0].length > 2)
                    {
                        var num = this.code[0].length;
                        this.touzhu = (num * (num - 1))/2;
                        this.money = this.touzhu * this.beishu * this.oneMoney;
                    }
                    else
                    {
                        this.touzhu = 0;
                        this.money = this.touzhu * this.beishu * this.oneMoney;
                    }
                }
            },

            selectedTypeSanTong(k,type)
            {
                switch (type) {
                    case 'quan':
                        this.santong = [
                            {'number':'111','is_selected':'1'},
                            {'number':'222','is_selected':'1'},
                            {'number':'333','is_selected':'1'},
                            {'number':'444','is_selected':'1'},
                            {'number':'555','is_selected':'1'},
                            {'number':'666','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['111','222','333','444','555','666'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'da':
                        this.santong = [
                            {'number':'111','is_selected':'0'},
                            {'number':'222','is_selected':'0'},
                            {'number':'333','is_selected':'0'},
                            {'number':'444','is_selected':'1'},
                            {'number':'555','is_selected':'1'},
                            {'number':'666','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['444','555','666'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'xiao':
                        this.santong = [
                            {'number':'111','is_selected':'1'},
                            {'number':'222','is_selected':'1'},
                            {'number':'333','is_selected':'1'},
                            {'number':'444','is_selected':'0'},
                            {'number':'555','is_selected':'0'},
                            {'number':'666','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['111','222','333'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'dan':
                        this.santong = [
                            {'number':'111','is_selected':'1'},
                            {'number':'222','is_selected':'0'},
                            {'number':'333','is_selected':'1'},
                            {'number':'444','is_selected':'0'},
                            {'number':'555','is_selected':'1'},
                            {'number':'666','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['111','333','555'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'shuang':
                        this.santong = [
                            {'number':'111','is_selected':'0'},
                            {'number':'222','is_selected':'1'},
                            {'number':'333','is_selected':'0'},
                            {'number':'444','is_selected':'1'},
                            {'number':'555','is_selected':'0'},
                            {'number':'666','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['222','444','666'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'qing':
                        this.santong = [
                            {'number':'111','is_selected':'0'},
                            {'number':'222','is_selected':'0'},
                            {'number':'333','is_selected':'0'},
                            {'number':'444','is_selected':'0'},
                            {'number':'555','is_selected':'0'},
                            {'number':'666','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.forTouzhuAndMoney();
                        break;
                }
            },
            selectedTypeErTong(k,type)
            {
                switch (type) {
                    case 'quan':
                        this.ertong = [
                            {'number':'11','is_selected':'1'},
                            {'number':'22','is_selected':'1'},
                            {'number':'33','is_selected':'1'},
                            {'number':'44','is_selected':'1'},
                            {'number':'55','is_selected':'1'},
                            {'number':'66','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['11','22','33','44','55','66'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'da':
                        this.ertong = [
                            {'number':'11','is_selected':'0'},
                            {'number':'22','is_selected':'0'},
                            {'number':'33','is_selected':'0'},
                            {'number':'44','is_selected':'1'},
                            {'number':'55','is_selected':'1'},
                            {'number':'66','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['44','55','66'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'xiao':
                        this.ertong = [
                            {'number':'11','is_selected':'1'},
                            {'number':'22','is_selected':'1'},
                            {'number':'33','is_selected':'1'},
                            {'number':'44','is_selected':'0'},
                            {'number':'55','is_selected':'0'},
                            {'number':'66','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['11','22','33'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'dan':
                        this.ertong = [
                            {'number':'11','is_selected':'1'},
                            {'number':'22','is_selected':'0'},
                            {'number':'33','is_selected':'1'},
                            {'number':'44','is_selected':'0'},
                            {'number':'55','is_selected':'1'},
                            {'number':'66','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['11','33','55'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'shuang':
                        this.ertong = [
                            {'number':'11','is_selected':'0'},
                            {'number':'22','is_selected':'1'},
                            {'number':'33','is_selected':'0'},
                            {'number':'44','is_selected':'1'},
                            {'number':'55','is_selected':'0'},
                            {'number':'66','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['22','44','66'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'qing':
                        this.ertong = [
                            {'number':'11','is_selected':'0'},
                            {'number':'22','is_selected':'0'},
                            {'number':'33','is_selected':'0'},
                            {'number':'44','is_selected':'0'},
                            {'number':'55','is_selected':'0'},
                            {'number':'66','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.forTouzhuAndMoney();
                        break;
                }
            },
            selectedTypeErTongQuChong(k,type)
            {
                switch (type) {
                    case 'quan':
                        this.ertong = [
                            {'number':'11','is_selected':'1'},
                            {'number':'22','is_selected':'1'},
                            {'number':'33','is_selected':'1'},
                            {'number':'44','is_selected':'1'},
                            {'number':'55','is_selected':'1'},
                            {'number':'66','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['11','22','33','44','55','66'];
                        if(this.code[1])
                        {
                            this.butong = [
                                {'number':'1','is_selected':'0'},
                                {'number':'2','is_selected':'0'},
                                {'number':'3','is_selected':'0'},
                                {'number':'4','is_selected':'0'},
                                {'number':'5','is_selected':'0'},
                                {'number':'6','is_selected':'0'},
                            ];
                            this.code[1] = [];
                        }
                        this.forTouzhuAndMoney();
                        break;
                    case 'da':
                        this.ertong = [
                            {'number':'11','is_selected':'0'},
                            {'number':'22','is_selected':'0'},
                            {'number':'33','is_selected':'0'},
                            {'number':'44','is_selected':'1'},
                            {'number':'55','is_selected':'1'},
                            {'number':'66','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['44','55','66'];
                        if(this.code[1])
                        {
                            this.butong[3]['is_selected'] = 0;
                            this.butong[4]['is_selected'] = 0;
                            this.butong[5]['is_selected'] = 0;
                            for(var i = 0; i<this.code[k].length;i++)
                            {
                                var key1 = this.code[1].indexOf(this.code[k][i].substring(1));
                                if(key1 != -1)
                                {
                                    this.code[1].splice(key1,1);
                                }
                            }
                        }
                        this.forTouzhuAndMoney();
                        break;
                    case 'xiao':
                        this.ertong = [
                            {'number':'11','is_selected':'1'},
                            {'number':'22','is_selected':'1'},
                            {'number':'33','is_selected':'1'},
                            {'number':'44','is_selected':'0'},
                            {'number':'55','is_selected':'0'},
                            {'number':'66','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['11','22','33'];
                        if(this.code[1])
                        {
                            this.butong[0]['is_selected'] = 0;
                            this.butong[1]['is_selected'] = 0;
                            this.butong[2]['is_selected'] = 0;
                            for(var i = 0; i<this.code[k].length;i++)
                            {
                                var key1 = this.code[1].indexOf(this.code[k][i].substring(1));
                                if(key1 != -1)
                                {
                                    this.code[1].splice(key1,1);
                                }
                            }
                        }
                        this.forTouzhuAndMoney();
                        break;
                    case 'dan':
                        this.ertong = [
                            {'number':'11','is_selected':'1'},
                            {'number':'22','is_selected':'0'},
                            {'number':'33','is_selected':'1'},
                            {'number':'44','is_selected':'0'},
                            {'number':'55','is_selected':'1'},
                            {'number':'66','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['11','33','55'];
                        if(this.code[1])
                        {
                            this.butong[0]['is_selected'] = 0;
                            this.butong[2]['is_selected'] = 0;
                            this.butong[4]['is_selected'] = 0;
                            for(var i = 0; i<this.code[k].length;i++)
                            {
                                var key1 = this.code[1].indexOf(this.code[k][i].substring(1));
                                if(key1 != -1)
                                {
                                    this.code[1].splice(key1,1);
                                }
                            }
                        }
                        this.forTouzhuAndMoney();
                        break;
                    case 'shuang':
                        this.ertong = [
                            {'number':'11','is_selected':'0'},
                            {'number':'22','is_selected':'1'},
                            {'number':'33','is_selected':'0'},
                            {'number':'44','is_selected':'1'},
                            {'number':'55','is_selected':'0'},
                            {'number':'66','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['22','44','66'];
                        if(this.code[1])
                        {
                            this.butong[1]['is_selected'] = 0;
                            this.butong[3]['is_selected'] = 0;
                            this.butong[5]['is_selected'] = 0;
                            for(var i = 0; i<this.code[k].length;i++)
                            {
                                var key1 = this.code[1].indexOf(this.code[k][i].substring(1));
                                if(key1 != -1)
                                {
                                    this.code[1].splice(key1,1);
                                }
                            }
                        }
                        this.forTouzhuAndMoney();
                        break;
                    case 'qing':
                        this.ertong = [
                            {'number':'11','is_selected':'0'},
                            {'number':'22','is_selected':'0'},
                            {'number':'33','is_selected':'0'},
                            {'number':'44','is_selected':'0'},
                            {'number':'55','is_selected':'0'},
                            {'number':'66','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.forTouzhuAndMoney();
                        break;
                }
            },
            selectedTypeBuTong(k,type){
                switch (type) {
                    case 'quan':
                        this.butong = [
                            {'number':'1','is_selected':'1'},
                            {'number':'2','is_selected':'1'},
                            {'number':'3','is_selected':'1'},
                            {'number':'4','is_selected':'1'},
                            {'number':'5','is_selected':'1'},
                            {'number':'6','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['1','2','3','4','5','6'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'da':
                        this.butong = [
                            {'number':'1','is_selected':'0'},
                            {'number':'2','is_selected':'0'},
                            {'number':'3','is_selected':'0'},
                            {'number':'4','is_selected':'1'},
                            {'number':'5','is_selected':'1'},
                            {'number':'6','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['4','5','6'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'xiao':
                        this.butong = [
                            {'number':'1','is_selected':'1'},
                            {'number':'2','is_selected':'1'},
                            {'number':'3','is_selected':'1'},
                            {'number':'4','is_selected':'0'},
                            {'number':'5','is_selected':'0'},
                            {'number':'6','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['1','2','3'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'dan':
                        this.butong = [
                            {'number':'1','is_selected':'1'},
                            {'number':'2','is_selected':'0'},
                            {'number':'3','is_selected':'1'},
                            {'number':'4','is_selected':'0'},
                            {'number':'5','is_selected':'1'},
                            {'number':'6','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['1','3','5'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'shuang':
                        this.butong = [
                            {'number':'1','is_selected':'0'},
                            {'number':'2','is_selected':'1'},
                            {'number':'3','is_selected':'0'},
                            {'number':'4','is_selected':'1'},
                            {'number':'5','is_selected':'0'},
                            {'number':'6','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['2','4','6'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'qing':
                        this.butong = [
                            {'number':'1','is_selected':'0'},
                            {'number':'2','is_selected':'0'},
                            {'number':'3','is_selected':'0'},
                            {'number':'4','is_selected':'0'},
                            {'number':'5','is_selected':'0'},
                            {'number':'6','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.forTouzhuAndMoney();
                        break;
                }
            },

            selectedTypeBuTongQuChong(k,type){
                switch (type) {
                    case 'quan':
                        this.butong = [
                            {'number':'1','is_selected':'1'},
                            {'number':'2','is_selected':'1'},
                            {'number':'3','is_selected':'1'},
                            {'number':'4','is_selected':'1'},
                            {'number':'5','is_selected':'1'},
                            {'number':'6','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['1','2','3','4','5','6'];
                        if(this.code[0])
                        {
                            this.ertong = [
                                {'number':'11','is_selected':'0'},
                                {'number':'22','is_selected':'0'},
                                {'number':'33','is_selected':'0'},
                                {'number':'44','is_selected':'0'},
                                {'number':'55','is_selected':'0'},
                                {'number':'66','is_selected':'0'},
                            ];
                            this.code[0] = [];
                        }
                        this.forTouzhuAndMoney();
                        break;
                    case 'da':
                        this.butong = [
                            {'number':'1','is_selected':'0'},
                            {'number':'2','is_selected':'0'},
                            {'number':'3','is_selected':'0'},
                            {'number':'4','is_selected':'1'},
                            {'number':'5','is_selected':'1'},
                            {'number':'6','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['4','5','6'];
                        if(this.code[0])
                        {
                            this.ertong[3]['is_selected'] = 0;
                            this.ertong[4]['is_selected'] = 0;
                            this.ertong[5]['is_selected'] = 0;
                            for(var i = 0; i<this.code[k].length;i++)
                            {
                                var key1 = this.code[0].indexOf(this.code[k][i] + this.code[k][i]);
                                if(key1 != -1)
                                {
                                    this.code[0].splice(key1,1);
                                }
                            }
                        }
                        this.forTouzhuAndMoney();
                        break;
                    case 'xiao':
                        this.butong = [
                            {'number':'1','is_selected':'1'},
                            {'number':'2','is_selected':'1'},
                            {'number':'3','is_selected':'1'},
                            {'number':'4','is_selected':'0'},
                            {'number':'5','is_selected':'0'},
                            {'number':'6','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['1','2','3'];
                        if(this.code[0])
                        {
                            this.ertong[0]['is_selected'] = 0;
                            this.ertong[1]['is_selected'] = 0;
                            this.ertong[2]['is_selected'] = 0;
                            for(var i = 0; i<this.code[k].length;i++)
                            {
                                var key1 = this.code[0].indexOf(this.code[k][i] + this.code[k][i]);
                                if(key1 != -1)
                                {
                                    this.code[0].splice(key1,1);
                                }
                            }
                        }
                        this.forTouzhuAndMoney();
                        break;
                    case 'dan':
                        this.butong = [
                            {'number':'1','is_selected':'1'},
                            {'number':'2','is_selected':'0'},
                            {'number':'3','is_selected':'1'},
                            {'number':'4','is_selected':'0'},
                            {'number':'5','is_selected':'1'},
                            {'number':'6','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['1','3','5'];
                        if(this.code[0])
                        {
                            this.ertong[0]['is_selected'] = 0;
                            this.ertong[2]['is_selected'] = 0;
                            this.ertong[4]['is_selected'] = 0;
                            for(var i = 0; i<this.code[k].length;i++)
                            {
                                var key1 = this.code[0].indexOf(this.code[k][i] + this.code[k][i]);
                                if(key1 != -1)
                                {
                                    this.code[0].splice(key1,1);
                                }
                            }
                        }
                        this.forTouzhuAndMoney();
                        break;
                    case 'shuang':
                        this.butong = [
                            {'number':'1','is_selected':'0'},
                            {'number':'2','is_selected':'1'},
                            {'number':'3','is_selected':'0'},
                            {'number':'4','is_selected':'1'},
                            {'number':'5','is_selected':'0'},
                            {'number':'6','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['2','4','6'];
                        if(this.code[0])
                        {
                            this.ertong[1]['is_selected'] = 0;
                            this.ertong[3]['is_selected'] = 0;
                            this.ertong[5]['is_selected'] = 0;
                            for(var i = 0; i<this.code[k].length;i++)
                            {
                                var key1 = this.code[0].indexOf(this.code[k][i] + this.code[k][i]);
                                if(key1 != -1)
                                {
                                    this.code[0].splice(key1,1);
                                }
                            }
                        }
                        this.forTouzhuAndMoney();
                        break;
                    case 'qing':
                        this.butong = [
                            {'number':'1','is_selected':'0'},
                            {'number':'2','is_selected':'0'},
                            {'number':'3','is_selected':'0'},
                            {'number':'4','is_selected':'0'},
                            {'number':'5','is_selected':'0'},
                            {'number':'6','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.forTouzhuAndMoney();
                        break;
                }
            },
            selectedType(k,type)
            {
                switch (type) {
                    case 'quan':
                        this.hezhi = [
                            {'number':'3','is_selected':'1'},
                            {'number':'4','is_selected':'1'},
                            {'number':'5','is_selected':'1'},
                            {'number':'6','is_selected':'1'},
                            {'number':'7','is_selected':'1'},
                            {'number':'8','is_selected':'1'},
                            {'number':'9','is_selected':'1'},
                            {'number':'10','is_selected':'1'},
                            {'number':'11','is_selected':'1'},
                            {'number':'12','is_selected':'1'},
                            {'number':'13','is_selected':'1'},
                            {'number':'14','is_selected':'1'},
                            {'number':'15','is_selected':'1'},
                            {'number':'16','is_selected':'1'},
                            {'number':'17','is_selected':'1'},
                            {'number':'18','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'da':
                        this.hezhi = [
                            {'number':'3','is_selected':'0'},
                            {'number':'4','is_selected':'0'},
                            {'number':'5','is_selected':'0'},
                            {'number':'6','is_selected':'0'},
                            {'number':'7','is_selected':'0'},
                            {'number':'8','is_selected':'0'},
                            {'number':'9','is_selected':'0'},
                            {'number':'10','is_selected':'0'},
                            {'number':'11','is_selected':'1'},
                            {'number':'12','is_selected':'1'},
                            {'number':'13','is_selected':'1'},
                            {'number':'14','is_selected':'1'},
                            {'number':'15','is_selected':'1'},
                            {'number':'16','is_selected':'1'},
                            {'number':'17','is_selected':'1'},
                            {'number':'18','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['11','12','13','14','15','16','17','18'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'xiao':
                        this.hezhi = [
                            {'number':'3','is_selected':'1'},
                            {'number':'4','is_selected':'1'},
                            {'number':'5','is_selected':'1'},
                            {'number':'6','is_selected':'1'},
                            {'number':'7','is_selected':'1'},
                            {'number':'8','is_selected':'1'},
                            {'number':'9','is_selected':'1'},
                            {'number':'10','is_selected':'1'},
                            {'number':'11','is_selected':'0'},
                            {'number':'12','is_selected':'0'},
                            {'number':'13','is_selected':'0'},
                            {'number':'14','is_selected':'0'},
                            {'number':'15','is_selected':'0'},
                            {'number':'16','is_selected':'0'},
                            {'number':'17','is_selected':'0'},
                            {'number':'18','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['3','4','5','6','7','8','9','10'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'dan':
                        this.hezhi = [
                            {'number':'3','is_selected':'1'},
                            {'number':'4','is_selected':'0'},
                            {'number':'5','is_selected':'1'},
                            {'number':'6','is_selected':'0'},
                            {'number':'7','is_selected':'1'},
                            {'number':'8','is_selected':'0'},
                            {'number':'9','is_selected':'1'},
                            {'number':'10','is_selected':'0'},
                            {'number':'11','is_selected':'1'},
                            {'number':'12','is_selected':'0'},
                            {'number':'13','is_selected':'1'},
                            {'number':'14','is_selected':'0'},
                            {'number':'15','is_selected':'1'},
                            {'number':'16','is_selected':'0'},
                            {'number':'17','is_selected':'1'},
                            {'number':'18','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['3','5','7','9','11','13','15','17'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'shuang':
                        this.hezhi = [
                            {'number':'3','is_selected':'0'},
                            {'number':'4','is_selected':'1'},
                            {'number':'5','is_selected':'0'},
                            {'number':'6','is_selected':'1'},
                            {'number':'7','is_selected':'0'},
                            {'number':'8','is_selected':'1'},
                            {'number':'9','is_selected':'0'},
                            {'number':'10','is_selected':'1'},
                            {'number':'11','is_selected':'0'},
                            {'number':'12','is_selected':'1'},
                            {'number':'13','is_selected':'0'},
                            {'number':'14','is_selected':'1'},
                            {'number':'15','is_selected':'0'},
                            {'number':'16','is_selected':'1'},
                            {'number':'17','is_selected':'0'},
                            {'number':'18','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['4','6','8','10','12','14','16','18'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'qing':
                        this.hezhi = [
                            {'number':'3','is_selected':'0'},
                            {'number':'4','is_selected':'0'},
                            {'number':'5','is_selected':'0'},
                            {'number':'6','is_selected':'0'},
                            {'number':'7','is_selected':'0'},
                            {'number':'8','is_selected':'0'},
                            {'number':'9','is_selected':'0'},
                            {'number':'10','is_selected':'0'},
                            {'number':'11','is_selected':'0'},
                            {'number':'12','is_selected':'0'},
                            {'number':'13','is_selected':'0'},
                            {'number':'14','is_selected':'0'},
                            {'number':'15','is_selected':'0'},
                            {'number':'16','is_selected':'0'},
                            {'number':'17','is_selected':'0'},
                            {'number':'18','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.forTouzhuAndMoney();
                        break;
                }
            },
            showContentBtn()
            {
                if(this.show_content == false)
                {
                    this.show_content = true;
                }
                else
                {
                    this.show_content = false
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
            changeWanFa(k,k1,name1,odds){
                this.wf = k;
                this.xingshi = k1;
                this.$store.state.offtxt = name1;
                this.odds = odds;
                this.$store.state.offopen = false;
                this.beishu = 1;
                this.touzhu = 0;
                this.money = 0;
                this.code = [[],[]];
                this.hezhi = [
                    {'number':'3','is_selected':'0'},
                    {'number':'4','is_selected':'0'},
                    {'number':'5','is_selected':'0'},
                    {'number':'6','is_selected':'0'},
                    {'number':'7','is_selected':'0'},
                    {'number':'8','is_selected':'0'},
                    {'number':'9','is_selected':'0'},
                    {'number':'10','is_selected':'0'},
                    {'number':'11','is_selected':'0'},
                    {'number':'12','is_selected':'0'},
                    {'number':'13','is_selected':'0'},
                    {'number':'14','is_selected':'0'},
                    {'number':'15','is_selected':'0'},
                    {'number':'16','is_selected':'0'},
                    {'number':'17','is_selected':'0'},
                    {'number':'18','is_selected':'0'},
                ];
                this.santong = [
                    {'number':'l11','is_selected':'0'},
                    {'number':'222','is_selected':'0'},
                    {'number':'333','is_selected':'0'},
                    {'number':'444','is_selected':'0'},
                    {'number':'555','is_selected':'0'},
                    {'number':'666','is_selected':'0'},
                ];
                this.ertong = [
                    {'number':'11','is_selected':'0'},
                    {'number':'22','is_selected':'0'},
                    {'number':'33','is_selected':'0'},
                    {'number':'44','is_selected':'0'},
                    {'number':'55','is_selected':'0'},
                    {'number':'66','is_selected':'0'},
                ];
                this.butong = [
                    {'number':'1','is_selected':'0'},
                    {'number':'2','is_selected':'0'},
                    {'number':'3','is_selected':'0'},
                    {'number':'4','is_selected':'0'},
                    {'number':'5','is_selected':'0'},
                    {'number':'6','is_selected':'0'},
                ];
                this.dxds = [
                    {'number':'da','value':'大','is_selected':'0'},
                    {'number':'x','value':'小','is_selected':'0'},
                    {'number':'dan','value':'单','is_selected':'0'},
                    {'number':'s','value':'双','is_selected':'0'},
                ];

                if((k == 'official_hz' && k1 == 'official_hz'))
                {
                    this.show_he = true;
                    this.show_dxds = false;
                    this.show_tongxuan = false;
                    this.show_santong = false;
                    this.show_butong = false;
                    this.show_ertong = false;
                    this.show_ertongdx = false;
                }

                if((k == 'official_hz' && k1 == 'official_dxds'))
                {
                    this.show_he = false;
                    this.show_dxds = true;
                    this.show_tongxuan = false;
                    this.show_santong = false;
                    this.show_butong = false;
                    this.show_ertong = false;
                    this.show_ertongdx = false;
                }

                if((k == 'official_3thtx' && k1 == 'official_3thtx') || ((k == 'official_3lhtx' && k1 == 'official_3lhtx')))
                {
                    this.show_he = false;
                    this.show_dxds = false;
                    this.show_tongxuan = true;
                    this.show_santong = false;
                    this.show_butong = false;
                    this.show_ertong = false;
                    this.show_ertongdx = false;
                }

                if((k == 'official_3thdx' && k1 == 'official_3thdx'))
                {
                    this.show_he = false;
                    this.show_dxds = false;
                    this.show_tongxuan = false;
                    this.show_santong = true;
                    this.show_butong = false;
                    this.show_ertong = false;
                    this.show_ertongdx = false;
                }

                if((k == 'official_3bth' && k1 == 'official_3bth') || (k == 'official_2bth' && k1 == 'official_2bth'))
                {
                    this.show_he = false;
                    this.show_dxds = false;
                    this.show_tongxuan = false;
                    this.show_santong = false;
                    this.show_butong = true;
                    this.show_ertong = false;
                    this.show_ertongdx = false;
                }
                if((k == 'official_2lhfx' && k1 == 'official_2lhfx'))
                {
                    this.show_he = false;
                    this.show_dxds = false;
                    this.show_tongxuan = false;
                    this.show_santong = false;
                    this.show_butong = false;
                    this.show_ertong = true;
                    this.show_ertongdx = false;
                }

                if((k == 'official_2lhdx' && k1 == 'official_2lhdx'))
                {
                    this.show_he = false;
                    this.show_dxds = false;
                    this.show_tongxuan = false;
                    this.show_santong = false;
                    this.show_butong = false;
                    this.show_ertong = false;
                    this.show_ertongdx = true;
                }
                this.changeWFSM();
            },
            changeWFSM()
            {
                if(this.xingshi == 'official_hz')
                {
                    this.wfsm = '竞猜3个开奖号码之和。';
                }
                if(this.xingshi == 'official_dxds')
                {
                    this.wfsm = '竞猜3个开奖号码之和的属性。';
                }
                if(this.xingshi == 'official_3thtx')
                {
                    this.wfsm = '对所有相同的3个号码进行投注。';
                }
                if(this.xingshi == 'official_3thdx')
                {
                    this.wfsm = '从相同的三个号码（111、222、333、444、555、666）中的至少选择一个进行投注。';
                }
                if(this.xingshi == 'official_3bth')
                {
                    this.wfsm = '至少选择3个号码进行投注。';
                }
                if(this.xingshi == 'official_3lhtx')
                {
                    this.wfsm = ' 对所有3个相连的号码进行投注。';
                }
                if(this.xingshi == 'official_2lhfx')
                {
                    this.wfsm = ' 至少选择1组号码进行投注。';
                }
                if(this.xingshi == 'official_2lhdx')
                {
                    this.wfsm = ' 请在同号，不同号上至少选择 1 个号码。';
                }
                if(this.xingshi == 'official_2bth')
                {
                    this.wfsm = '至少选择2个号码进行投注。';
                }
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
            openShowXiDan(){
                if(this.is_feng){
                    this.$total({ message:'已封盘！',type: 2 });
                    return false;
                }else if(this.money == 0){
                    this.$total({ message:'没有投注数据！',type: 2 });
                    return false;
                }
                if(this.xingshi == 'official_danshi' || this.xingshi == 'official_zxdanshi' || this.xingshi == 'official_q4danshi' || this.xingshi == 'official_h4danshi')
                {
                    this.danshi_confirm = true;
                }
                else
                {
                    this.show_xia_dan = true;
                }
            },
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
            getInfo(got){
                let _this = this;
                if(_this.data_post == 1){return;}
                _this.data_post = 1;
                _this.$getData({
                    url:'/api/home/lottery/getInfo',
                    //gf:是否是官方  number:需要几期号码
                    type: 'get',
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
                            _this.desct = parseInt(res.data.desc);
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
                this.$getData({
                    loading:true,
                    url:'/api/home/home/getHistory-2',
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
            },
        },
        beforeRouteLeave(to, from, next){
            this.$store.state.is_greem = 0;
            next();
        },
        watch: {
            $route(){
                this.getInfo('start');
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
            }
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

    .width-60{
        width: 60% !important;
    }
    .show-display-block{
        display: block !important;
    }
    .width-40{
        width: 40% !important;
    }
    .no-border-buttom{
        border-bottom: none !important;
    }
    .no-border-top{
        border-top: none !important;
    }
    .border-zhouwei::before{
        content: "";
        display: block;
        width: auto;
        height: auto;
        position: absolute;
        top: .25rem;
        right: .125rem;
        bottom: .3125rem;
        left: .25rem;
        border: 1px dashed #193c29;
    }
    .show-touzi{
        background: url(/static/img/touzi.png) no-repeat;
        background-size: .65em 6.6em;
        font-size: 2.75rem;
        width: .65em;
        height: .65em;
        overflow: hidden;
        text-indent: -999em;
    }
    .open-xiaoguo{
        border-bottom: 2px solid #ccc;
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
    .this-page-item
    {
        padding: .5rem .25rem;
        border: none;
        border-radius: .25rem;
        font-size: .875rem;
        color: inherit;
    }
    .this-page-item::before,.this-page-a-item::before{
        display: none;
    }
    .playing-methods-official li:first-child .item {
        border-top-width: 1px;
    }
    .this-page-a-item{
        padding: .5rem .25rem;
        text-align: center;
        border: 1px solid;
        border-radius: .25rem;
        font-size: .875rem;
        color: inherit;
    }
    .ccc-sharking-link{
        color: #b7d1bd;
        display: block;
        position: absolute;
        right: -.625rem;
        top: -.3125rem;
        font-size: .75rem;
        background: #2f5e3e;
        padding: 0 .25rem;
    }
</style>
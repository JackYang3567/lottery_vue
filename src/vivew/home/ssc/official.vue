<template>
    <div>
        <main class="kd-body game game-c game-official">
            <div class="clearfix lottery-wrapper lottery-wrapper-official cqssc">
                <div class="kd-container prev-lottery cqssc prev-lottery-official width-60">
                    <div class="prev-lottery-issue prev-lottery-issue-official cqssc show-display-block">
                        <a :href="'#/game-s/'+$route.params.id" class="change-to-classical active cqssc">
                            官方
                        </a>
                        {{caipiaoname}} {{now_expect}}
                    </div>
                    <template v-if="is_feng">
                        <ul class="nostyle kd-row prev-lottery-balls prev-lottery-balls-official cqssc">
                            <li v-for="i in [1,2,3,4,5]">
                                <div class="lottery-ball solid lottery-ball-official cqssc">
                                    <ul class="nostyle lottery-ball--anim" style="color: yellow">
                                        <li>1</li>
                                        <li>2</li>
                                        <li>3</li>
                                        <li>4</li>
                                        <li>5</li>
                                        <li>6</li>
                                        <li>7</li>
                                        <li>8</li>
                                        <li>9</li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </template>
                    <template v-else>
                        <ul class="nostyle kd-row prev-lottery-balls prev-lottery-balls-official cqssc" v-if="history['content']">
                            <li v-for="v in history['content']">
                                <span class="lottery-ball solid cqssc lottery-ball-official" style="color: yellow;">{{v}}</span><!---->
                            </li> <!---->
                        </ul> <!---->
                        <ul class="nostyle kd-row prev-lottery-balls prev-lottery-balls-official cqssc" v-else>
                            <li v-for="v in ['暂','时','未','开','奖']">
                                <span class="lottery-ball solid cqssc lottery-ball-official" style="color: yellow;">{{v}}</span><!---->
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
                </div> <!---->
            </div>
            <ul class="nostyle playing-methods playing-methods-official clearfix cqssc" v-if="$store.state.offopen" style="height: auto;">
                <li class="playing-methods__group" v-for="(v,k) in config">
                    <div class="playing-methods__group-head cqssc">{{v.name}}</div>
                    <template v-if="v.way">
                        <template v-for="(v1,k1) in v.way">
                            <div class="clearfix playing-methods__group-body cqssc">
                                <div class="playing-methods__item playing-methods-official__item playing-methods__group-name cqssc">
                                    <span class="item">{{v1}}</span>
                                </div>
                                <template v-for="(v2,k2) in v.items">
                                    <template v-if="v2.way">
                                        <div data-id="c163" :class="['playing-methods__item' ,'playing-methods-official__item','cqssc' ,wf==k && xingshi == k2 ? 'active' : '']" v-if="v2.way==v1">
                                            <a class="item"  @click="changeWanFa(k,k1,k2,v.name,v2.name,v2.odds)">{{v2.name}}</a>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div data-id="c163" :class="['playing-methods__item' ,'playing-methods-official__item','cqssc' ,wf==k && xingshi == k2 ? 'active' : '']">
                                            <a class="item"  @click="changeWanFa(k,k1,k2,v.name,v2.name,v2.odds)">{{v2.name}}</a>
                                        </div>
                                    </template>
                                </template>
                            </div>
                        </template>
                    </template>
                    <template v-else>

                        <div class="clearfix playing-methods__group-body cqssc">
                            <div class="playing-methods__item playing-methods-official__item playing-methods__group-name cqssc">
                            </div>
                            <div data-id="c163" :class="['playing-methods__item' ,'playing-methods-official__item','cqssc' ,wf==k && xingshi == k2 ? 'active' : '']" v-for="(v2,k2) in v.items">
                                <a class="item"  @click="changeWanFa(k,k1='',k2,v.name,v2.name,v2.odds)">{{v2.name}}</a>
                            </div>
                        </div>
                    </template>
                </li>
            </ul> <!---->
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
                                        {{v['plus'][1]['data'][0]}}
                                    </td>
                                    <td>
                                        <span class="sum-type sum-type--blue">{{v['plus'][1]['data'][1]}}</span>
                                        <span class="sum-type sum-type--blue">{{v['plus'][1]['data'][2]}}</span>
                                        <span class="sum-type sum-type--black">{{v['plus'][0]['data'][0]}}</span>
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
                                <tr style="height: 200px;">
                                    <td colspan="4" style="position: relative;top: -40px;">今天没有开奖记录</td>
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
                <div class="ccc-balance clearfix cqssc">
                    <img src="/static/img/coin_package.png" alt="">{{ $store.state.user ? $store.state.user.money : '00.00' }}
                    <!--<a href="javascript:;" class="ccc-sharking-link sd115">摇一摇随机选-->
                        <!--<img src="/static/img/yaoyiyao_icon.png" class="show-yaoyiyao-icon">-->
                    <!--</a>-->
                </div>
                <div class="ccc-text cqssc">
                    <span class="ccc-name">{{$store.state.offtxt}}-{{xingshi_name}}</span>
            {{wfsm}}
                    <!--<i class="icon icon-question cqssc"></i>-->
                </div>
            </div>
            <section class="playing-method-section__gf">
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
                                        {{$store.state.offtxt}}-{{xingshi_name}}:
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
                <template v-if="show_fushi">
                    <template v-for="(v,k) in xuanhao">
                        <div class="playing-methods-box cqssc" v-if="suoying[k]">
                            <div class="playing-methods__balls-title cqssc">
                                <span v-if="k==1">千位</span>
                                <span v-if="k==2">百位</span>
                                <span v-if="k==3">十位</span>
                                <span v-if="k==4">个位</span>
                                <span v-if="k==0">{{this_wan}}</span>
                            </div>
                            <ul class="nostyle clearfix playing-methods__balls cqssc">
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
                            <div class="playing-methods__tool cqssc">
                                <div class="playing-methods__tool-title cqssc">快速选号</div>
                                <div class="playing-methods__tool-items clearfix cqssc">
                                    <span class="playing-methods__tool-button cqssc" @click="selectedType(k,'quan')">全</span>
                                    <span class="playing-methods__tool-button cqssc" @click="selectedType(k,'da')">大</span>
                                    <span class="playing-methods__tool-button cqssc" @click="selectedType(k,'xiao')">小</span>
                                    <span class="playing-methods__tool-button cqssc" @click="selectedType(k,'dan')">单</span>
                                    <span class="playing-methods__tool-button cqssc" @click="selectedType(k,'shuang')">双</span>
                                    <span class="playing-methods__tool-button cqssc" @click="selectedType(k,'qing')">清</span>
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
                <template v-if="show_renxuan">
                    <section class="playing-method-section__gf" id="category-c-gf-13">
                        <div class="playing-methods-box cqssc">
                            <div class="playing-methods__balls-title cqssc">
                                <span>位置</span>
                            </div>
                            <ul class="nostyle clearfix playing-methods__balls cqssc">
                                <li class="playing-methods__balls-item cqssc" v-for="(vw,kw) in xiaohao_weizhi" @click="selectWeiZhi(5,kw)">
                                    <template v-if="vw.is_selected==1">
                                        <span id="" :data-odds="odds" class="lottery-ball lottery-prop selected">
                                            <span class="lottery-ball-inner">{{vw.value}}</span>
                                            <span class="lottery-ball-shadow"></span>
                                        </span>
                                    </template>
                                    <template v-else>
                                        <span id="" :data-odds="odds" class="lottery-ball lottery-prop">
                                            <span class="lottery-ball-inner">{{vw.value}}</span>
                                            <span class="lottery-ball-shadow"></span>
                                        </span>
                                    </template>
                                </li>
                            </ul>
                            <div class="playing-methods__tip">
                                <strong>注意：</strong>至少选择3个位置
                            </div>
                        </div>
                        <div class="playing-methods-box cqssc">

                            <template v-for="(v,k) in xuanhao">
                                <div class="playing-methods-box cqssc" v-if="suoying[k]">
                                    <div class="playing-methods__balls-title cqssc">
                                        <span>选号</span>
                                    </div>
                                    <ul class="nostyle clearfix playing-methods__balls cqssc">
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
                                    <div class="playing-methods__tool cqssc">
                                        <div class="playing-methods__tool-title cqssc">快速选号</div>
                                        <div class="playing-methods__tool-items clearfix cqssc">
                                            <span class="playing-methods__tool-button cqssc" @click="selectedType(k,'quan')">全</span>
                                            <span class="playing-methods__tool-button cqssc" @click="selectedType(k,'da')">大</span>
                                            <span class="playing-methods__tool-button cqssc" @click="selectedType(k,'xiao')">小</span>
                                            <span class="playing-methods__tool-button cqssc" @click="selectedType(k,'dan')">单</span>
                                            <span class="playing-methods__tool-button cqssc" @click="selectedType(k,'shuang')">双</span>
                                            <span class="playing-methods__tool-button cqssc" @click="selectedType(k,'qing')">清</span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div> <!---->
                    </section>
                </template>
                <template v-if="show_longhu">
                    <div class="playing-methods__balls-title cqssc"><span>选号</span></div>
                    <ul class="nostyle clearfix playing-methods__balls cqssc">
                        <li class="playing-methods__balls-item sd115" v-for="(v1,k1) in xiaohao_longhu" @click="selectLHUHE(5,k1)">
                            <template v-if="suoying[k1]">
                                <template v-if="v1.is_selected==1">
                                    <span :id="'lottery-ball-x0y'+k1" class="lottery-ball selected show-ball-after" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{v1.value}}</span><!---->
                                    </span>
                                </template>
                                <template v-else>
                                    <span :id="'lottery-ball-x0y'+k1" class="lottery-ball show-ball-after" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{v1.value}}</span><!---->
                                    </span>
                                </template>
                            </template>
                        </li>
                    </ul>
                </template>
                <template v-if="show_baozi">
                    <div class="playing-methods-box cqssc">
                        <div class="playing-methods__balls-title cqssc">
                            <span>选号</span>
                        </div>
                        <ul class="nostyle clearfix playing-methods__balls cqssc">
                            <li class="playing-methods__balls-item cqssc" v-for="(v,k) in xuanhao_baozi">
                                <template v-if="v.is_selected==1">
                                    <span :data-odds="odds" class="lottery-ball selected lottery-prop" @click="selectBaoZi(5,k)">
                                        <span class="lottery-ball-inner">{{v.value}}</span>
                                        <span class="lottery-ball-shadow"></span>
                                    </span>
                                </template>
                                <template v-else>
                                    <span :data-odds="odds" class="lottery-ball lottery-prop" @click="selectBaoZi(5,k)">
                                        <span class="lottery-ball-inner">{{v.value}}</span>
                                        <span class="lottery-ball-shadow"></span>
                                    </span>
                                </template>
                            </li>
                        </ul> <!---->
                    </div>
                </template>
                <template v-if="show_he">
                    <div class="playing-methods-box cqssc">
                        <div class="playing-methods__balls-title cqssc">
                            <span>选号</span>
                        </div>
                        <ul class="nostyle clearfix playing-methods__balls cqssc">
                            <li class="playing-methods__balls-item sd115" v-for="(v1,k1) in xuanhao_he" @click="changeThis2(0,k1)">
                                <template v-if="v1.is_selected==1">
                                    <span :id="'lottery-ball-x0y'+k1" class="lottery-ball selected show-ball-after" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{v1.number}}</span><!---->
                                    </span>
                                </template>
                                <template v-else>
                                    <span :id="'lottery-ball-x0y'+k1" class="lottery-ball show-ball-after" :data-odds="odds">
                                        <span class="lottery-ball-inner">{{v1.number}}</span><!---->
                                    </span>
                                </template>
                            </li>
                        </ul>
                        <div class="playing-methods__tool cqssc">
                            <div class="playing-methods__tool-title cqssc">快速选号</div>
                            <div class="playing-methods__tool-items clearfix cqssc">
                                <span class="playing-methods__tool-button cqssc" @click="selectedTypeHe(0,'quan')">全</span>
                                <span class="playing-methods__tool-button cqssc" @click="selectedTypeHe(0,'da')">大</span>
                                <span class="playing-methods__tool-button cqssc" @click="selectedTypeHe(0,'xiao')">小</span>
                                <span class="playing-methods__tool-button cqssc" @click="selectedTypeHe(0,'dan')">单</span>
                                <span class="playing-methods__tool-button cqssc" @click="selectedTypeHe(0,'shuang')">双</span>
                                <span class="playing-methods__tool-button cqssc" @click="selectedTypeHe(0,'qing')">清</span>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-if="show_zonghe">
                    <template v-for="(v,k) in xiaohao_dxds">
                        <div class="playing-methods-box cqssc" v-if="suoying[k]">
                            <div class="playing-methods__balls-title cqssc">
                                <span v-if="k==1">千位</span>
                                <span v-if="k==2">百位</span>
                                <span v-if="k==3">十位</span>
                                <span v-if="k==4">个位</span>
                                <span v-if="k==0">{{this_wan}}</span>
                            </div>
                            <ul class="nostyle clearfix playing-methods__balls cqssc">
                                <li class="playing-methods__balls-item sd115" v-for="(v1,k1) in v" @click="changeThis1(k,k1)">
                                    <template v-if="v1.is_selected==1">
                                        <span :id="'lottery-ball-x'+k+'y'+k1" class="lottery-ball selected show-ball-after" :data-odds="odds">
                                            <span class="lottery-ball-inner">{{v1.value}}</span><!---->
                                        </span>
                                    </template>
                                    <template v-else>
                                        <span :id="'lottery-ball-x'+k+'y'+k1" class="lottery-ball show-ball-after" :data-odds="odds">
                                            <span class="lottery-ball-inner">{{v1.value}}</span><!---->
                                        </span>
                                    </template>
                                </li>
                            </ul>
                        </div>
                    </template>
                </template>
            </section>


            <input type="hidden" v-model="wf">
            <input type="hidden" v-model="xingshi">
            <input type="hidden" v-model="way">
            <input type="hidden" v-model="odds">
        </main>
    </div>
</template>

<script>
    export default {
        name: "official",
        mounted() {
            this.$store.state.offtype = 0;
            this.$store.state.official = true;

            this.$store.state.offtxt = '五星';
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
                wfsm:'请选择至少1个万位，1个千位，1个百位，1个十位，1个个位号码。',
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
                wf:'official_wx',
                xingshi:'official_fushi',
                way:'zhix',
                xingshi_name:'复式',
                odds:10,
                show_content:false,
                suoying:[true, true, true, true, true],
                xuanhao:[
                    [
                        {'number':'0','is_selected':'0'},
                        {'number':'1','is_selected':'0'},
                        {'number':'2','is_selected':'0'},
                        {'number':'3','is_selected':'0'},
                        {'number':'4','is_selected':'0'},
                        {'number':'5','is_selected':'0'},
                        {'number':'6','is_selected':'0'},
                        {'number':'7','is_selected':'0'},
                        {'number':'8','is_selected':'0'},
                        {'number':'9','is_selected':'0'},
                    ],
                    [
                        {'number':'0','is_selected':'0'},
                        {'number':'1','is_selected':'0'},
                        {'number':'2','is_selected':'0'},
                        {'number':'3','is_selected':'0'},
                        {'number':'4','is_selected':'0'},
                        {'number':'5','is_selected':'0'},
                        {'number':'6','is_selected':'0'},
                        {'number':'7','is_selected':'0'},
                        {'number':'8','is_selected':'0'},
                        {'number':'9','is_selected':'0'},
                    ],
                    [
                        {'number':'0','is_selected':'0'},
                        {'number':'1','is_selected':'0'},
                        {'number':'2','is_selected':'0'},
                        {'number':'3','is_selected':'0'},
                        {'number':'4','is_selected':'0'},
                        {'number':'5','is_selected':'0'},
                        {'number':'6','is_selected':'0'},
                        {'number':'7','is_selected':'0'},
                        {'number':'8','is_selected':'0'},
                        {'number':'9','is_selected':'0'},
                    ],
                    [
                        {'number':'0','is_selected':'0'},
                        {'number':'1','is_selected':'0'},
                        {'number':'2','is_selected':'0'},
                        {'number':'3','is_selected':'0'},
                        {'number':'4','is_selected':'0'},
                        {'number':'5','is_selected':'0'},
                        {'number':'6','is_selected':'0'},
                        {'number':'7','is_selected':'0'},
                        {'number':'8','is_selected':'0'},
                        {'number':'9','is_selected':'0'},
                    ],
                    [
                        {'number':'0','is_selected':'0'},
                        {'number':'1','is_selected':'0'},
                        {'number':'2','is_selected':'0'},
                        {'number':'3','is_selected':'0'},
                        {'number':'4','is_selected':'0'},
                        {'number':'5','is_selected':'0'},
                        {'number':'6','is_selected':'0'},
                        {'number':'7','is_selected':'0'},
                        {'number':'8','is_selected':'0'},
                        {'number':'9','is_selected':'0'},
                    ]
                ],
                xiaohao_longhu:[
                    {'number':'l','value':'龙','is_selected':'0'},
                    {'number':'h','value':'虎','is_selected':'0'},
                    {'number':'he','value':'和','is_selected':'0'},
                ],
                xiaohao_dxds:[
                    [
                        {'number':'da','value':'大','is_selected':'0'},
                        {'number':'x','value':'小','is_selected':'0'},
                        {'number':'dan','value':'单','is_selected':'0'},
                        {'number':'s','value':'双','is_selected':'0'},
                    ],
                    [
                        {'number':'da','value':'大','is_selected':'0'},
                        {'number':'x','value':'小','is_selected':'0'},
                        {'number':'dan','value':'单','is_selected':'0'},
                        {'number':'s','value':'双','is_selected':'0'},
                    ],
                    [
                        {'number':'da','value':'大','is_selected':'0'},
                        {'number':'x','value':'小','is_selected':'0'},
                        {'number':'dan','value':'单','is_selected':'0'},
                        {'number':'s','value':'双','is_selected':'0'},
                    ],
                    [
                        {'number':'da','value':'大','is_selected':'0'},
                        {'number':'x','value':'小','is_selected':'0'},
                        {'number':'dan','value':'单','is_selected':'0'},
                        {'number':'s','value':'双','is_selected':'0'},
                    ],
                    [
                        {'number':'da','value':'大','is_selected':'0'},
                        {'number':'x','value':'小','is_selected':'0'},
                        {'number':'dan','value':'单','is_selected':'0'},
                        {'number':'s','value':'双','is_selected':'0'},
                    ]
                ],
                xiaohao_weizhi:[
                    {'number':'w','value':'万','is_selected':'0'},
                    {'number':'q','value':'千','is_selected':'0'},
                    {'number':'b','value':'百','is_selected':'0'},
                    {'number':'s','value':'十','is_selected':'0'},
                    {'number':'g','value':'个','is_selected':'0'},
                ],
                xuanhao_he:[
                    {'number':'0','is_selected':'0'},
                    {'number':'1','is_selected':'0'},
                    {'number':'2','is_selected':'0'},
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
                xuanhao_baozi:[
                    {'number':'q3','value':'前三','is_selected':'0'},
                    {'number':'z3','value':'中三','is_selected':'0'},
                    {'number':'h3','value':'后三','is_selected':'0'}
                ],
                show_fushi:true,
                show_danshi:false,
                show_longhu:false,
                show_he:false,
                show_baozi:false,
                show_zonghe:false,
                show_renxuan:false,
                code:[[],[],[],[],[],[]],
                this_wan:'万位',
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
                this.xuanhao = [
                    [
                        {'number':'0','is_selected':'0'},
                        {'number':'1','is_selected':'0'},
                        {'number':'2','is_selected':'0'},
                        {'number':'3','is_selected':'0'},
                        {'number':'4','is_selected':'0'},
                        {'number':'5','is_selected':'0'},
                        {'number':'6','is_selected':'0'},
                        {'number':'7','is_selected':'0'},
                        {'number':'8','is_selected':'0'},
                        {'number':'9','is_selected':'0'},
                    ],
                    [
                        {'number':'0','is_selected':'0'},
                        {'number':'1','is_selected':'0'},
                        {'number':'2','is_selected':'0'},
                        {'number':'3','is_selected':'0'},
                        {'number':'4','is_selected':'0'},
                        {'number':'5','is_selected':'0'},
                        {'number':'6','is_selected':'0'},
                        {'number':'7','is_selected':'0'},
                        {'number':'8','is_selected':'0'},
                        {'number':'9','is_selected':'0'},
                    ],
                    [
                        {'number':'0','is_selected':'0'},
                        {'number':'1','is_selected':'0'},
                        {'number':'2','is_selected':'0'},
                        {'number':'3','is_selected':'0'},
                        {'number':'4','is_selected':'0'},
                        {'number':'5','is_selected':'0'},
                        {'number':'6','is_selected':'0'},
                        {'number':'7','is_selected':'0'},
                        {'number':'8','is_selected':'0'},
                        {'number':'9','is_selected':'0'},
                    ],
                    [
                        {'number':'0','is_selected':'0'},
                        {'number':'1','is_selected':'0'},
                        {'number':'2','is_selected':'0'},
                        {'number':'3','is_selected':'0'},
                        {'number':'4','is_selected':'0'},
                        {'number':'5','is_selected':'0'},
                        {'number':'6','is_selected':'0'},
                        {'number':'7','is_selected':'0'},
                        {'number':'8','is_selected':'0'},
                        {'number':'9','is_selected':'0'},
                    ],
                    [
                        {'number':'0','is_selected':'0'},
                        {'number':'1','is_selected':'0'},
                        {'number':'2','is_selected':'0'},
                        {'number':'3','is_selected':'0'},
                        {'number':'4','is_selected':'0'},
                        {'number':'5','is_selected':'0'},
                        {'number':'6','is_selected':'0'},
                        {'number':'7','is_selected':'0'},
                        {'number':'8','is_selected':'0'},
                        {'number':'9','is_selected':'0'},
                    ]
                ];
                this.xiaohao_longhu = [
                    {'number':'l','value':'龙','is_selected':'0'},
                    {'number':'h','value':'虎','is_selected':'0'},
                    {'number':'he','value':'和','is_selected':'0'},
                ];
                this.xiaohao_dxds = [
                    [
                        {'number':'da','value':'大','is_selected':'0'},
                        {'number':'x','value':'小','is_selected':'0'},
                        {'number':'dan','value':'单','is_selected':'0'},
                        {'number':'s','value':'双','is_selected':'0'},
                    ],
                    [
                        {'number':'da','value':'大','is_selected':'0'},
                        {'number':'x','value':'小','is_selected':'0'},
                        {'number':'dan','value':'单','is_selected':'0'},
                        {'number':'s','value':'双','is_selected':'0'},
                    ],
                    [
                        {'number':'da','value':'大','is_selected':'0'},
                        {'number':'x','value':'小','is_selected':'0'},
                        {'number':'dan','value':'单','is_selected':'0'},
                        {'number':'s','value':'双','is_selected':'0'},
                    ],
                    [
                        {'number':'da','value':'大','is_selected':'0'},
                        {'number':'x','value':'小','is_selected':'0'},
                        {'number':'dan','value':'单','is_selected':'0'},
                        {'number':'s','value':'双','is_selected':'0'},
                    ],
                    [
                        {'number':'da','value':'大','is_selected':'0'},
                        {'number':'x','value':'小','is_selected':'0'},
                        {'number':'dan','value':'单','is_selected':'0'},
                        {'number':'s','value':'双','is_selected':'0'},
                    ]
                ];
                this.xiaohao_weizhi = [
                    {'number':'w','value':'万','is_selected':'0'},
                    {'number':'q','value':'千','is_selected':'0'},
                    {'number':'b','value':'百','is_selected':'0'},
                    {'number':'s','value':'十','is_selected':'0'},
                    {'number':'g','value':'个','is_selected':'0'},
                ];
                this.xuanhao_he = [
                    {'number':'0','is_selected':'0'},
                    {'number':'1','is_selected':'0'},
                    {'number':'2','is_selected':'0'},
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
                this.xuanhao_baozi = [
                    {'number':'q3','value':'前三','is_selected':'0'},
                    {'number':'z3','value':'中三','is_selected':'0'},
                    {'number':'h3','value':'后三','is_selected':'0'}
                ];
                this.code = [[],[],[],[],[],[]];
                this.touzhu_input_code = '';
                this.forTouzhuAndMoney();
            },
            //选择豹子中的项目
            selectBaoZi(k,k1){
                if(this.xuanhao_baozi[k1]['is_selected'] == 1)
                {
                    this.xuanhao_baozi[k1]['is_selected'] = 0;
                    var key = this.code[k].indexOf(this.xuanhao_baozi[k1]['number']);
                    if(key != -1)
                    {
                        this.code[k].splice(key,1);
                    }
                    // this.code[k].pop(this.xuanhao_baozi[k1]['number']);
                    this.forTouzhuAndMoney();
                }
                else
                {
                    this.xuanhao_baozi[k1]['is_selected'] = 1;
                    this.code[k].push(this.xuanhao_baozi[k1]['number']);
                    this.forTouzhuAndMoney();
                }
            },
            //选择龙虎和
            selectLHUHE(k,k1)
            {
                if(this.xiaohao_longhu[k1]['is_selected'] == 1)
                {
                    this.xiaohao_longhu[k1]['is_selected'] = 0;

                    var key = this.code[k].indexOf(this.xiaohao_longhu[k1]['number']);
                    if(key != -1)
                    {
                        this.code[k].splice(key,1);
                    }
                    // this.code[k].pop(this.xiaohao_longhu[k1]['number']);
                    this.forTouzhuAndMoney();
                }
                else
                {
                    this.xiaohao_longhu[k1]['is_selected'] = 1;
                    this.code[k].push(this.xiaohao_longhu[k1]['number']);
                    this.forTouzhuAndMoney();
                }
            },
            //选择位置
            selectWeiZhi(k,k1)
            {
                if(this.xiaohao_weizhi[k1]['is_selected'] == 1)
                {
                    this.xiaohao_weizhi[k1]['is_selected'] = 0;

                    var key = this.code[k].indexOf(this.xiaohao_weizhi[k1]['number']);
                    if(key != -1)
                    {
                        this.code[k].splice(key,1);
                    }
                    this.forTouzhuAndMoney();
                    // this.code[k].pop(this.xiaohao_weizhi[k1]['number']);
                    // this.forTouzhuAndMoney();
                }
                else
                {
                    this.xiaohao_weizhi[k1]['is_selected'] = 1;
                    this.code[k].push(this.xiaohao_weizhi[k1]['number']);
                    this.forTouzhuAndMoney();
                }
            },
            //选择号码球
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
            changeThis1(k,k1)
            {
                if(this.xiaohao_dxds[k][k1]['is_selected'] == 1)
                {
                    this.xiaohao_dxds[k][k1]['is_selected'] = 0;
                    var key = this.code[k].indexOf(this.xiaohao_dxds[k][k1]['number']);
                    if(key != -1)
                    {
                        this.code[k].splice(key,1);
                    }
                    this.forTouzhuAndMoney();
                }
                else
                {
                    this.xiaohao_dxds[k][k1]['is_selected'] = 1;
                    this.code[k].push(this.xiaohao_dxds[k][k1]['number']);
                    this.forTouzhuAndMoney();
                }
            },
            changeThis2(k,k1)
            {
                if(this.xuanhao_he[k1]['is_selected'] == 1)
                {
                    this.xuanhao_he[k1]['is_selected'] = 0;
                    var key = this.code[k].indexOf(this.xuanhao_he[k1]['number']);
                    if(key != -1)
                    {
                        this.code[k].splice(key,1);
                    }
                    this.forTouzhuAndMoney();
                }
                else
                {
                    this.xuanhao_he[k1]['is_selected'] = 1;
                    this.code[k].push(this.xuanhao_he[k1]['number']);
                    this.forTouzhuAndMoney();
                }
            },
            //计算投注金额和注数
            forTouzhuAndMoney(){
                if(this.wf == 'official_wx' && this.xingshi == 'official_fushi')
                {
                    this.touzhu = (this.code[0].length * this.code[1].length * this.code[2].length * this.code[3].length * this.code[4].length);
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if(this.wf == 'official_sx' && this.xingshi == 'official_q4fushi')
                {
                    this.touzhu = (this.code[0].length * this.code[1].length * this.code[2].length * this.code[3].length);
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if(this.wf == 'official_sx' && this.xingshi == 'official_h4fushi')
                {
                    this.touzhu = (this.code[4].length * this.code[1].length * this.code[2].length * this.code[3].length);
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if(this.wf == 'official_rxwf' && this.xingshi == 'official_r3z6')
                {
                    if(this.code[5].length >= 3 && this.code[0].length >= 3)
                    {
                        var w_num = this.code[5].length;
                        var q_num = this.code[0].length;
                        this.touzhu = (w_num * (w_num - 1) * (w_num -2)) * (q_num * (q_num - 1) * (q_num -2))/36;
                        this.money = this.touzhu * this.beishu * this.oneMoney;
                    }
                    else
                    {
                        this.touzhu = 0;
                        this.money = this.touzhu * this.beishu * this.oneMoney;
                    }
                }

                if(this.wf == 'official_rxwf' && this.xingshi == 'official_r3fushi')
                {
                    var qingkuang = [
                        [0,1,2],
                        [0,1,3],
                        [0,1,4],
                        [0,2,3],
                        [0,2,4],
                        [0,3,4],
                        [1,2,3],
                        [1,2,4],
                        [1,3,4],
                        [2,3,4]
                    ];
                    var all = 0;
                    for(var i = 0;i<qingkuang.length;i++)
                    {
                        var num0 = this.code[qingkuang[i][0]].length;
                        var num1 = this.code[qingkuang[i][1]].length;
                        var num2 = this.code[qingkuang[i][2]].length;
                        all += (num0 * num1 * num2);
                    }
                    this.touzhu = all;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if(this.wf == 'official_rxwf' && this.xingshi == 'official_r2fushi')
                {
                    var qingkuang = [
                        [0,1],
                        [0,2],
                        [0,3],
                        [0,4],
                        [1,2],
                        [1,3],
                        [1,4],
                        [2,3],
                        [2,4],
                        [3,4]
                    ];
                    var all = 0;
                    for(var i = 0;i<qingkuang.length;i++)
                    {
                        var num0 = this.code[qingkuang[i][0]].length;
                        var num1 = this.code[qingkuang[i][1]].length;
                        all += (num0 * num1);
                    }
                    this.touzhu = all;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if(this.wf == 'official_rxwf' && this.xingshi == 'official_r3z3')
                {
                    if(this.code[5].length >= 3 && this.code[0].length >= 2)
                    {
                        var w_num = this.code[5].length;
                        var q_num = this.code[0].length;
                        this.touzhu = (w_num * (w_num - 1) * (w_num -2)) * (q_num * (q_num - 1))/6;
                        this.money = this.touzhu * this.beishu * this.oneMoney;
                    }
                    else
                    {
                        this.touzhu = 0;
                        this.money = this.touzhu * this.beishu * this.oneMoney;
                    }
                }

                if(this.wf == 'official_rxwf' && this.xingshi == 'official_r4fushi')
                {
                    var qingkuang = [
                        [0,1,2,3],
                        [0,1,2,4],
                        [0,1,3,4],
                        [0,2,3,4],
                        [1,2,3,4],
                    ];
                    var all = 0;
                    for(var i = 0;i<qingkuang.length;i++)
                    {
                        var num0 = this.code[qingkuang[i][0]].length;
                        var num1 = this.code[qingkuang[i][1]].length;
                        var num2 = this.code[qingkuang[i][2]].length;
                        var num3 = this.code[qingkuang[i][3]].length;
                        all += (num0 * num1 * num2 * num3);
                    }
                    this.touzhu = all;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if((this.wf == 'official_longhuhe' && this.xingshi == 'official_lh') || (this.wf == 'official_longhuhe' && this.xingshi == 'official_he') || (this.wf == 'official_bz'))
                {
                    this.touzhu = this.code[5].length;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if(this.wf == 'official_q3' && this.xingshi == 'official_fushi')
                {
                    this.touzhu = this.code[0].length * this.code[1].length * this.code[2].length;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }
                if((this.wf == 'official_q3' && this.xingshi == 'official_zu3') || (this.wf == 'official_z3' && this.xingshi == 'official_zu3') || (this.wf == 'official_h3' && this.xingshi == 'official_zu3'))
                {
                    this.touzhu = this.code[0].length * (this.code[0].length - 1);
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }
                if((this.wf == 'official_q3' && this.xingshi == 'official_zu6') || (this.wf == 'official_z3' && this.xingshi == 'official_zu6') || (this.wf == 'official_h3' && this.xingshi == 'official_zu6'))
                {
                    this.touzhu = (this.code[0].length * (this.code[0].length - 1) * (this.code[0].length - 2))/6;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if(this.wf == 'official_z3' && this.xingshi == 'official_fushi')
                {
                    this.touzhu = this.code[3].length * this.code[1].length * this.code[2].length;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if(this.wf == 'official_h3' && this.xingshi == 'official_fushi')
                {
                    this.touzhu = this.code[3].length * this.code[4].length * this.code[2].length;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if(this.wf == 'official_q2' && this.xingshi == 'official_zxzh')
                {
                    var all = 0;
                    for(var i = 0;i<this.code[0].length;i++)
                    {
                        if(Number(this.code[0][i]) <= 9)
                        {
                            all += (Number(this.code[0][i]) + 1);
                        }
                        else
                        {
                            all += (19 - Number(this.code[0][i]));
                        }
                    }
                    this.touzhu = all;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }
                if(this.wf == 'official_q2' && this.xingshi == 'official_zxfushi')
                {
                    this.touzhu = this.code[0].length * this.code[1].length;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if(this.wf == 'official_h2' && this.xingshi == 'official_zxzh')
                {
                    var all = 0;
                    for(var i = 0;i<this.code[0].length;i++)
                    {
                        if(Number(this.code[0][i]) <= 9)
                        {
                            all += (Number(this.code[0][i]) + 1);
                        }
                        else
                        {
                            all += (19 - Number(this.code[0][i]));
                        }
                    }
                    this.touzhu = all;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }
                if(this.wf == 'official_h2' && this.xingshi == 'official_zxfushi')
                {
                    this.touzhu = this.code[3].length * this.code[4].length;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if(this.wf == 'official_yx' && this.xingshi == 'official_fushi')
                {
                    this.touzhu = this.code[0].length + this.code[1].length + this.code[2].length + this.code[3].length + this.code[4].length;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if(this.wf == 'official_dxds' && this.xingshi == 'official_zh')
                {
                    this.touzhu = this.code[0].length;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }
                if(this.wf == 'official_dxds' && this.xingshi == 'official_q3')
                {
                    this.touzhu = this.code[0].length * this.code[1].length * this.code[2].length;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }
                if(this.wf == 'official_dxds' && this.xingshi == 'official_q2')
                {
                    this.touzhu = this.code[0].length * this.code[1].length;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }
                if(this.wf == 'official_dxds' && this.xingshi == 'official_h3')
                {
                    this.touzhu = this.code[4].length * this.code[3].length * this.code[2].length;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if(this.wf == 'official_dxds' && this.xingshi == 'official_h2')
                {
                    this.touzhu = this.code[4].length * this.code[3].length;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if((this.wf == 'official_bdwd' && this.xingshi == 'official_q3ym') || (this.wf == 'official_bdwd' && this.xingshi == 'official_z3ym') || (this.wf == 'official_bdwd' && this.xingshi == 'official_h3ym'))
                {
                    this.touzhu = this.code[0].length;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }
            },
            selectedType(k,type)
            {
                switch (type) {
                    case 'quan':
                        this.xuanhao[k] = [
                            {'number':'0','is_selected':'1'},
                            {'number':'1','is_selected':'1'},
                            {'number':'2','is_selected':'1'},
                            {'number':'3','is_selected':'1'},
                            {'number':'4','is_selected':'1'},
                            {'number':'5','is_selected':'1'},
                            {'number':'6','is_selected':'1'},
                            {'number':'7','is_selected':'1'},
                            {'number':'8','is_selected':'1'},
                            {'number':'9','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['0','1','2','3','4','5','6','7','8','9'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'da':
                        this.xuanhao[k] = [
                            {'number':'0','is_selected':'0'},
                            {'number':'1','is_selected':'0'},
                            {'number':'2','is_selected':'0'},
                            {'number':'3','is_selected':'0'},
                            {'number':'4','is_selected':'0'},
                            {'number':'5','is_selected':'1'},
                            {'number':'6','is_selected':'1'},
                            {'number':'7','is_selected':'1'},
                            {'number':'8','is_selected':'1'},
                            {'number':'9','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['5','6','7','8','9'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'xiao':
                        this.xuanhao[k] = [
                            {'number':'0','is_selected':'1'},
                            {'number':'1','is_selected':'1'},
                            {'number':'2','is_selected':'1'},
                            {'number':'3','is_selected':'1'},
                            {'number':'4','is_selected':'1'},
                            {'number':'5','is_selected':'0'},
                            {'number':'6','is_selected':'0'},
                            {'number':'7','is_selected':'0'},
                            {'number':'8','is_selected':'0'},
                            {'number':'9','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['0','1','2','3','4'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'dan':
                        this.xuanhao[k] = [
                            {'number':'0','is_selected':'0'},
                            {'number':'1','is_selected':'1'},
                            {'number':'2','is_selected':'0'},
                            {'number':'3','is_selected':'1'},
                            {'number':'4','is_selected':'0'},
                            {'number':'5','is_selected':'1'},
                            {'number':'6','is_selected':'0'},
                            {'number':'7','is_selected':'1'},
                            {'number':'8','is_selected':'0'},
                            {'number':'9','is_selected':'1'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['1','3','5','7','9'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'shuang':
                        this.xuanhao[k] = [
                            {'number':'0','is_selected':'1'},
                            {'number':'1','is_selected':'0'},
                            {'number':'2','is_selected':'1'},
                            {'number':'3','is_selected':'0'},
                            {'number':'4','is_selected':'1'},
                            {'number':'5','is_selected':'0'},
                            {'number':'6','is_selected':'1'},
                            {'number':'7','is_selected':'0'},
                            {'number':'8','is_selected':'1'},
                            {'number':'9','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.code[k] = ['0','2','4','6','8'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'qing':
                        this.xuanhao[k] = [
                            {'number':'0','is_selected':'0'},
                            {'number':'1','is_selected':'0'},
                            {'number':'2','is_selected':'0'},
                            {'number':'3','is_selected':'0'},
                            {'number':'4','is_selected':'0'},
                            {'number':'5','is_selected':'0'},
                            {'number':'6','is_selected':'0'},
                            {'number':'7','is_selected':'0'},
                            {'number':'8','is_selected':'0'},
                            {'number':'9','is_selected':'0'},
                        ];
                        this.code[k] = [];
                        this.forTouzhuAndMoney();
                        break;
                }
            },
            selectedTypeHe(k,type){
                switch (type) {
                    case 'quan':
                        this.xuanhao_he = [
                            {'number':'0','is_selected':'1'},
                            {'number':'1','is_selected':'1'},
                            {'number':'2','is_selected':'1'},
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
                        this.code[k] = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'da':
                        this.xuanhao_he = [
                            {'number':'0','is_selected':'0'},
                            {'number':'1','is_selected':'0'},
                            {'number':'2','is_selected':'0'},
                            {'number':'3','is_selected':'0'},
                            {'number':'4','is_selected':'0'},
                            {'number':'5','is_selected':'0'},
                            {'number':'6','is_selected':'0'},
                            {'number':'7','is_selected':'0'},
                            {'number':'8','is_selected':'0'},
                            {'number':'9','is_selected':'0'},
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
                        this.code[k] = ['10','11','12','13','14','15','16','17','18'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'xiao':
                        this.xuanhao_he = [
                            {'number':'0','is_selected':'1'},
                            {'number':'1','is_selected':'1'},
                            {'number':'2','is_selected':'1'},
                            {'number':'3','is_selected':'1'},
                            {'number':'4','is_selected':'1'},
                            {'number':'5','is_selected':'1'},
                            {'number':'6','is_selected':'1'},
                            {'number':'7','is_selected':'1'},
                            {'number':'8','is_selected':'1'},
                            {'number':'9','is_selected':'1'},
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
                        this.code[k] = ['0','1','2','3','4','5','6','7','8','9'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'dan':
                        this.xuanhao_he = [
                            {'number':'0','is_selected':'0'},
                            {'number':'1','is_selected':'1'},
                            {'number':'2','is_selected':'0'},
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
                        this.code[k] = ['1','3','5','7','9','11','13','15','17'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'shuang':
                        this.xuanhao_he = [
                            {'number':'0','is_selected':'1'},
                            {'number':'1','is_selected':'0'},
                            {'number':'2','is_selected':'1'},
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
                        this.code[k] = ['0','2','4','6','8','10','12','14','16','18'];
                        this.forTouzhuAndMoney();
                        break;
                    case 'qing':
                        this.xuanhao_he = [
                            {'number':'0','is_selected':'0'},
                            {'number':'1','is_selected':'0'},
                            {'number':'2','is_selected':'0'},
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
            changeWanFa(k,k1,k2,name1,name2,odds){
                this.wf = k;
                this.way = k1;
                this.xingshi = k2;
                this.$store.state.offtxt = name1;
                this.xingshi_name = name2;
                this.odds = odds;
                this.$store.state.offopen = false;

                this.beishu = 1;
                this.touzhu = 0;
                this.money = 0;
                this.code = [[],[],[],[],[],[]];
                this.xuanhao = [
                    [
                        {'number':'0','is_selected':'0'},
                        {'number':'1','is_selected':'0'},
                        {'number':'2','is_selected':'0'},
                        {'number':'3','is_selected':'0'},
                        {'number':'4','is_selected':'0'},
                        {'number':'5','is_selected':'0'},
                        {'number':'6','is_selected':'0'},
                        {'number':'7','is_selected':'0'},
                        {'number':'8','is_selected':'0'},
                        {'number':'9','is_selected':'0'},
                    ],
                    [
                        {'number':'0','is_selected':'0'},
                        {'number':'1','is_selected':'0'},
                        {'number':'2','is_selected':'0'},
                        {'number':'3','is_selected':'0'},
                        {'number':'4','is_selected':'0'},
                        {'number':'5','is_selected':'0'},
                        {'number':'6','is_selected':'0'},
                        {'number':'7','is_selected':'0'},
                        {'number':'8','is_selected':'0'},
                        {'number':'9','is_selected':'0'},
                    ],
                    [
                        {'number':'0','is_selected':'0'},
                        {'number':'1','is_selected':'0'},
                        {'number':'2','is_selected':'0'},
                        {'number':'3','is_selected':'0'},
                        {'number':'4','is_selected':'0'},
                        {'number':'5','is_selected':'0'},
                        {'number':'6','is_selected':'0'},
                        {'number':'7','is_selected':'0'},
                        {'number':'8','is_selected':'0'},
                        {'number':'9','is_selected':'0'},
                    ],
                    [
                        {'number':'0','is_selected':'0'},
                        {'number':'1','is_selected':'0'},
                        {'number':'2','is_selected':'0'},
                        {'number':'3','is_selected':'0'},
                        {'number':'4','is_selected':'0'},
                        {'number':'5','is_selected':'0'},
                        {'number':'6','is_selected':'0'},
                        {'number':'7','is_selected':'0'},
                        {'number':'8','is_selected':'0'},
                        {'number':'9','is_selected':'0'},
                    ],
                    [
                        {'number':'0','is_selected':'0'},
                        {'number':'1','is_selected':'0'},
                        {'number':'2','is_selected':'0'},
                        {'number':'3','is_selected':'0'},
                        {'number':'4','is_selected':'0'},
                        {'number':'5','is_selected':'0'},
                        {'number':'6','is_selected':'0'},
                        {'number':'7','is_selected':'0'},
                        {'number':'8','is_selected':'0'},
                        {'number':'9','is_selected':'0'},
                    ]
                ];
                this.xiaohao_longhu = [
                    {'number':'l','value':'龙','is_selected':'0'},
                    {'number':'h','value':'虎','is_selected':'0'},
                    {'number':'he','value':'和','is_selected':'0'},
                ];
                this.xiaohao_dxds = [
                    [
                        {'number':'da','value':'大','is_selected':'0'},
                        {'number':'x','value':'小','is_selected':'0'},
                        {'number':'dan','value':'单','is_selected':'0'},
                        {'number':'s','value':'双','is_selected':'0'},
                    ],
                    [
                        {'number':'da','value':'大','is_selected':'0'},
                        {'number':'x','value':'小','is_selected':'0'},
                        {'number':'dan','value':'单','is_selected':'0'},
                        {'number':'s','value':'双','is_selected':'0'},
                    ],
                    [
                        {'number':'da','value':'大','is_selected':'0'},
                        {'number':'x','value':'小','is_selected':'0'},
                        {'number':'dan','value':'单','is_selected':'0'},
                        {'number':'s','value':'双','is_selected':'0'},
                    ],
                    [
                        {'number':'da','value':'大','is_selected':'0'},
                        {'number':'x','value':'小','is_selected':'0'},
                        {'number':'dan','value':'单','is_selected':'0'},
                        {'number':'s','value':'双','is_selected':'0'},
                    ],
                    [
                        {'number':'da','value':'大','is_selected':'0'},
                        {'number':'x','value':'小','is_selected':'0'},
                        {'number':'dan','value':'单','is_selected':'0'},
                        {'number':'s','value':'双','is_selected':'0'},
                    ]
                ];
                this.xiaohao_weizhi = [
                    {'number':'w','value':'万','is_selected':'0'},
                    {'number':'q','value':'千','is_selected':'0'},
                    {'number':'b','value':'百','is_selected':'0'},
                    {'number':'s','value':'十','is_selected':'0'},
                    {'number':'g','value':'个','is_selected':'0'},
                ];
                this.xuanhao_he = [
                    {'number':'0','is_selected':'0'},
                    {'number':'1','is_selected':'0'},
                    {'number':'2','is_selected':'0'},
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
                this.xuanhao_baozi = [
                    {'number':'q3','value':'前三','is_selected':'0'},
                    {'number':'z3','value':'中三','is_selected':'0'},
                    {'number':'h3','value':'后三','is_selected':'0'}
                ];

                if((k == 'official_wx' && k2 == 'official_fushi') || (k == 'official_rxwf' && k2 == 'official_r3fushi') || (k == 'official_rxwf' && k2 == 'official_r2fushi') || (k == 'official_rxwf' && k2 == 'official_r4fushi') || (k == 'official_yx' && k2 == 'official_fushi'))
                {
                    this.show_fushi = true;
                    this.show_danshi = false;
                    this.show_longhu = false;
                    this.show_he = false;
                    this.show_baozi = false;
                    this.show_zonghe = false;
                    this.show_renxuan = false;
                    this.this_wan = '万位';
                    this.suoying = [true, true, true, true, true];
                }
                if((k == 'official_wx' && k2 == 'official_danshi') || (k == 'official_sx' && k2 == 'official_q4danshi') || (k == 'official_sx' && k2 == 'official_h4danshi') || (k == 'official_q3' && k2 == 'official_danshi') || (k == 'official_q2' && k2 == 'official_zxdanshi') || (k == 'official_h2' && k2 == 'official_zxdanshi') || (k == 'official_z3' && k2 == 'official_danshi') || (k == 'official_h3' && k2 == 'official_danshi'))
                {
                    this.show_fushi = false;
                    this.show_danshi = true;
                    this.show_longhu = false;
                    this.show_he = false;
                    this.show_baozi = false;
                    this.show_zonghe = false;
                    this.show_renxuan = false;
                }

                if(k == 'official_sx' && k2 == 'official_q4fushi')
                {
                    this.show_fushi = true;
                    this.show_danshi = false;
                    this.show_longhu = false;
                    this.show_he = false;
                    this.show_baozi = false;
                    this.show_zonghe = false;
                    this.show_renxuan = false;
                    this.this_wan = '万位';
                    this.suoying = [true, true, true, true, false];
                }
                if(k == 'official_sx' && k2 == 'official_h4fushi')
                {
                    this.show_fushi = true;
                    this.show_danshi = false;
                    this.show_longhu = false;
                    this.show_he = false;
                    this.show_baozi = false;
                    this.show_zonghe = false;
                    this.show_renxuan = false;
                    this.this_wan = '万位';
                    this.suoying = [false, true, true, true, true];
                }

                if((k == 'official_rxwf' && k2 == 'official_r3z6') || (k == 'official_rxwf' && k2 == 'official_r3z3'))
                {
                    this.show_fushi = false;
                    this.show_danshi = false;
                    this.show_longhu = false;
                    this.show_he = false;
                    this.show_baozi = false;
                    this.show_zonghe = false;
                    this.show_renxuan = true;
                    this.suoying = [true, false, false, false, false];
                }

                if(k == 'official_longhuhe' && k2 == 'official_lh')
                {
                    this.show_fushi = false;
                    this.show_danshi = false;
                    this.show_longhu = true;
                    this.show_he = false;
                    this.show_baozi = false;
                    this.show_zonghe = false;
                    this.show_renxuan = false;
                    this.suoying = [true, true, false, false, false];
                }

                if(k == 'official_longhuhe' && k2 == 'official_he')
                {
                    this.show_fushi = false;
                    this.show_danshi = false;
                    this.show_longhu = true;
                    this.show_he = false;
                    this.show_baozi = false;
                    this.show_zonghe = false;
                    this.show_renxuan = false;
                    this.suoying = [false, false, true, false, false];
                }
                if(k == 'official_bz')
                {
                    this.show_fushi = false;
                    this.show_danshi = false;
                    this.show_longhu = false;
                    this.show_he = false;
                    this.show_baozi = true;
                    this.show_zonghe = false;
                    this.show_renxuan = false;
                }

                if((k == 'official_q3' && k2 == 'official_zu3') || (k == 'official_q3' && k2 == 'official_zu6') || (k == 'official_z3' && k2 == 'official_zu3') || (k == 'official_z3' && k2 == 'official_zu6') || (k == 'official_h3' && k2 == 'official_zu3') || (k == 'official_h3' && k2 == 'official_zu6') || (k == 'official_bdwd' && k2 == 'official_q3ym') || (k == 'official_bdwd' && k2 == 'official_z3ym') || (k == 'official_bdwd' && k2 == 'official_h3ym'))
                {
                    this.show_fushi = true;
                    this.show_danshi = false;
                    this.show_longhu = false;
                    this.show_he = false;
                    this.show_baozi = false;
                    this.show_zonghe = false;
                    this.show_renxuan = false;
                    this.this_wan = '选号';
                    this.suoying = [true, false, false, false, false];
                }

                if(k == 'official_q3' && k2 == 'official_fushi')
                {
                    this.show_fushi = true;
                    this.show_danshi = false;
                    this.show_longhu = false;
                    this.show_he = false;
                    this.show_baozi = false;
                    this.show_zonghe = false;
                    this.show_renxuan = false;
                    this.this_wan = '万位';
                    this.suoying = [true, true, true, false, false];
                }

                if(k == 'official_z3' && k2 == 'official_fushi')
                {
                    this.show_fushi = true;
                    this.show_danshi = false;
                    this.show_longhu = false;
                    this.show_he = false;
                    this.show_baozi = false;
                    this.show_zonghe = false;
                    this.show_renxuan = false;
                    this.this_wan = '万位';
                    this.suoying = [false, true, true, true, false];
                }

                if(k == 'official_h3' && k2 == 'official_fushi')
                {
                    this.show_fushi = true;
                    this.show_danshi = false;
                    this.show_longhu = false;
                    this.show_he = false;
                    this.show_baozi = false;
                    this.show_zonghe = false;
                    this.show_renxuan = false;
                    this.this_wan = '万位';
                    this.suoying = [false, false, true, true, true];
                }

                if((k == 'official_q2' && k2 == 'official_zxzh') || (k == 'official_h2' && k2 == 'official_zxzh'))
                {
                    this.show_fushi = false;
                    this.show_danshi = false;
                    this.show_longhu = false;
                    this.show_he = true;
                    this.show_baozi = false;
                    this.show_zonghe = false;
                    this.show_renxuan = false;
                }

                if(k == 'official_q2' && k2 == 'official_zxfushi')
                {
                    this.show_fushi = true;
                    this.show_danshi = false;
                    this.show_longhu = false;
                    this.show_he = false;
                    this.show_baozi = false;
                    this.show_zonghe = false;
                    this.show_renxuan = false;
                    this.this_wan = '万位';
                    this.suoying = [true, true, false, false, false];
                }

                if(k == 'official_h2' && k2 == 'official_zxfushi')
                {
                    this.show_fushi = true;
                    this.show_danshi = false;
                    this.show_longhu = false;
                    this.show_he = false;
                    this.show_baozi = false;
                    this.show_zonghe = false;
                    this.show_renxuan = false;
                    this.this_wan = '万位';
                    this.suoying = [false, false, false, true, true];
                }

                if(k == 'official_dxds' && k2 == 'official_zh')
                {
                    this.show_fushi = false;
                    this.show_danshi = false;
                    this.show_longhu = false;
                    this.show_he = false;
                    this.show_baozi = false;
                    this.show_zonghe = true;
                    this.show_renxuan = false;
                    this.this_wan = '总和';
                    this.suoying = [true, false, false, false, false];
                }
                if(k == 'official_dxds' && k2 == 'official_q3')
                {
                    this.show_fushi = false;
                    this.show_danshi = false;
                    this.show_longhu = false;
                    this.show_he = false;
                    this.show_baozi = false;
                    this.show_zonghe = true;
                    this.show_renxuan = false;
                    this.this_wan = '万位';
                    this.suoying = [true, true, true, false, false];
                }
                if(k == 'official_dxds' && k2 == 'official_q2')
                {
                    this.show_fushi = false;
                    this.show_danshi = false;
                    this.show_longhu = false;
                    this.show_he = false;
                    this.show_baozi = false;
                    this.show_zonghe = true;
                    this.show_renxuan = false;
                    this.this_wan = '万位';
                    this.suoying = [true, true, false, false, false];
                }
                if(k == 'official_dxds' && k2 == 'official_h3')
                {
                    this.show_fushi = false;
                    this.show_danshi = false;
                    this.show_longhu = false;
                    this.show_he = false;
                    this.show_baozi = false;
                    this.show_zonghe = true;
                    this.show_renxuan = false;
                    this.this_wan = '万位';
                    this.suoying = [false, false, true, true, true];
                }

                if(k == 'official_dxds' && k2 == 'official_h2')
                {
                    this.show_fushi = false;
                    this.show_danshi = false;
                    this.show_longhu = false;
                    this.show_he = false;
                    this.show_baozi = false;
                    this.show_zonghe = true;
                    this.show_renxuan = false;
                    this.this_wan = '万位';
                    this.suoying = [false, false, false, true, true];
                }
                this.changeWFSM();
            },

            changeWFSM()
            {
                if(this.xingshi == 'official_fushi')
                {
                    if(this.wf == 'official_q3')
                    {
                        this.wfsm = ' 请选择至少1个万位，1个千位，1个百位号码。';
                    }
                    if(this.wf == 'official_z3')
                    {
                        this.wfsm = '请选择至少1个千位，1个百位，1个十位号码。';
                    }
                    if(this.wf == 'official_h3')
                    {
                        this.wfsm = '请选择至少1个百位，1个十位，1个个位号码。';
                    }
                    if(this.wf == 'official_wx')
                    {
                        this.wfsm = '从万位、千位、百位、十位、个位任意位置上至少选择1个号码。';
                    }
                    if(this.wf == 'official_yx')
                    {
                        this.wfsm = '请选择至少1个号码组成一注 。';
                    }
                }
                if(this.xingshi == 'official_q4fushi')
                {
                    this.wfsm = '请选择至少1个万位，1个千位，1个百位，1个十位号码。';
                }
                if(this.xingshi == 'official_h4fushi')
                {
                    this.wfsm = '请选择至少1个千位，1个百位，1个十位，1个个位号码。';
                }
                if(this.xingshi == 'official_danshi' || this.xingshi == 'official_q4danshi' || this.xingshi == 'official_h4danshi' || this.xingshi == 'official_zh')
                {
                    this.wfsm = '请输入至少1组号码。';
                }
                if(this.xingshi == 'official_r3z6' || this.xingshi == 'official_zu6')
                {
                    this.wfsm = '请选择至少3个号码。';
                }
                if(this.xingshi == 'official_r3z3' || this.xingshi == 'official_zu3')
                {
                    this.wfsm = '请选择至少2个号码。';
                }
                if(this.xingshi == 'official_r3fushi')
                {
                    this.wfsm = '请在万位，千位，百位，十位，个位上至少选择3个号码。';
                }
                if(this.xingshi == 'official_r2fushi')
                {
                    this.wfsm = '请在万位，千位，百位，十位，个位上至少选择2个号码。';
                }
                if(this.xingshi == 'official_r4fushi')
                {
                    this.wfsm = '请在万位，千位，百位，十位，个位上至少选择4个号码。';
                }
                if(this.xingshi == 'official_lh' || this.xingshi == 'official_he' || this.wf == 'official_bz')
                {
                    this.wfsm = ' 请选择至少1个组成一注。';
                }
                if(this.xingshi == 'official_zxzh' || this.wf == 'official_bdwd')
                {
                    this.wfsm = ' 请选择至少1个号码。';
                }
                if(this.wf == 'official_q2' && this.xingshi == 'official_zxfushi')
                {
                    this.wfsm = ' 请选择至少1个万位，1个千位号码。';
                }
                if(this.wf == 'official_h2' && this.xingshi == 'official_zxfushi')
                {
                    this.wfsm = ' 请选择至少1个十位，1个个位号码。';
                }
                if(this.xingshi == 'official_q3')
                {
                    this.wfsm = '请选择至少1个万位，1个千位，1个百位号码。';
                }
                if(this.xingshi == 'official_q2')
                {
                    this.wfsm = '请选择至少1个万位，1个千位号码。';
                }
                if(this.xingshi == 'official_h3')
                {
                    this.wfsm = '请选择至少1个百位，1个十位，1个个位号码 。';
                }
                if(this.xingshi == 'official_h2')
                {
                    this.wfsm = '请选择至少1个十位，1个个位号码 。';
                }
            },
            closeThisPage(){
                this.danshi_confirm = false;
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
                    url:'/api/home/lottery/getInfo=3',
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
                    url:'/api/home/home/getHistory-7',
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
            //@keyup="getInputCode($event)"
            'touzhu_input_code':function () {
                if(this.wf == 'official_wx' && this.xingshi == 'official_danshi')
                {
                    var arr = this.touzhu_input_code.split(/[\r\n; ]+/);
                    var shuzi = ['0','1','2','3','4','5','6','7','8','9'];
                    var all = [];
                    for(var i=0;i<arr.length;i++)
                    {
                        var l = arr[i].split(',');
                        if(l.length == 5)
                        {
                            if(shuzi.indexOf(l[0]) != -1 && shuzi.indexOf(l[1]) != -1 && shuzi.indexOf(l[2]) != -1 && shuzi.indexOf(l[3]) != -1 && shuzi.indexOf(l[4]) != -1)
                            {
                                all.push(l);
                            }
                        }
                    }
                    this.code = all;
                    this.touzhu = all.length;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if((this.wf == 'official_sx' && this.xingshi == 'official_q4danshi') || (this.wf == 'official_sx' && this.xingshi == 'official_h4danshi'))
                {
                    var arr = this.touzhu_input_code.split(/[\r\n; ]+/);
                    var shuzi = ['0','1','2','3','4','5','6','7','8','9'];
                    var all = [];
                    for(var i=0;i<arr.length;i++)
                    {
                        var l = arr[i].split(',');
                        if(l.length == 4)
                        {
                            if(shuzi.indexOf(l[0]) != -1 && shuzi.indexOf(l[1]) != -1 && shuzi.indexOf(l[2]) != -1 && shuzi.indexOf(l[3]) != -1)
                            {
                                all.push(l);
                            }
                        }
                    }
                    this.code = all;
                    this.touzhu = all.length;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if((this.wf == 'official_q3' && this.xingshi == 'official_danshi') || (this.wf == 'official_z3' && this.xingshi == 'official_danshi') || (this.wf == 'official_h3' && this.xingshi == 'official_danshi'))
                {
                    var arr = this.touzhu_input_code.split(/[\r\n; ]+/);
                    var shuzi = ['0','1','2','3','4','5','6','7','8','9'];
                    var all = [];
                    for(var i=0;i<arr.length;i++)
                    {
                        var l = arr[i].split(',');
                        if(l.length == 3)
                        {
                            if(shuzi.indexOf(l[0]) != -1 && shuzi.indexOf(l[1]) != -1 && shuzi.indexOf(l[2]) != -1)
                            {
                                all.push(l);
                            }
                        }
                    }
                    this.code = all;
                    this.touzhu = all.length;
                    this.money = this.touzhu * this.beishu * this.oneMoney;
                }

                if((this.wf == 'official_q2' && this.xingshi == 'official_zxdanshi') || (this.wf == 'official_h2' && this.xingshi == 'official_zxdanshi'))
                {
                    var arr = this.touzhu_input_code.split(/[\r\n; ]+/);
                    var shuzi = ['0','1','2','3','4','5','6','7','8','9'];
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
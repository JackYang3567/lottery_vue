<template>
  <div id="app" >
      <transition name="for-height-change">
          <div class="for-show-content-history" v-if="show_history_div && !getRoom" @click="closeThisDiv()">
              <div class="promptbox-wrapper prompt-in-game-rule sd115 prompt-gamerecords-official open-xiaoguo" style="position:static !important;">
                  <section class="promptbox" style="height: 100%;">
                      <div class="prompt-body prompt-body--gamerecords" style="height: 100%;">
                          <template v-if="dayHistory">
                                  <div style="padding: 0;">
                                      <table class="account__table" style="">
                                          <thead>
                                          <tr>
                                              <th style="width: 16%;text-align: center;">期号</th>
                                              <th style="text-align: center;">开奖号</th>
                                          </tr>
                                          </thead>
                                          <tbody>
                                          <tr v-for="v in dayHistory">

                                              <td style="text-align: center;">{{v['expect']}}</td>
                                              <td class="primary-color" style="text-align: center;">
                                                  <template v-for="(ball_number,k) in v['content']">
                                                      <span :class="'lottery-ball pk10 solid ball'+parseInt(ball_number)" style="margin-right: 6px;width: 22px;height: 22px;line-height: 18px !important;font-size: 15px !important;font-weight: bold;border-radius: 0;">{{ball_number}}</span>
                                                  </template>
                                              </td>
                                          </tr>
                                          </tbody>
                                      </table>
                                  </div>

                          </template>
                          <template v-else>
                              <table class="account__table">
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
                                      <td colspan="4" style="height: 25px;line-height: 25px">今天没有开奖记录</td>
                                  </tr>
                                  </tbody>
                              </table>
                          </template>
                      </div>
                      <a href="javascript:;" class="prompt-close kd-close">close</a>
                  </section>
              </div>
          </div>
      </transition>


    <main :class="['kd-body game game-p game-id-pk10 has-user-playing-info',{'cart-not-empty':Object.keys(select_data.betting_all).length}]">

        <div class="lottery-wrapper">
            <div style="display: flex;width: 100%;max-width: 640px;">
                <div style="width: 86%;height: 68px;box-sizing:content-box;">
                    <div class="fgx examineAll" style="margin-top: 0.01rem; height: 0.3rem; width: 30px; background: transparent;display: flex;justify-content: center;align-items: center;position: relative;top: 12px;left: 80%;" @click="show_history_div=!show_history_div">
                        <template v-if="!show_history_div">
                            <img data-v-7ce3e059="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAMAAACDzGUcAAAATlBMVEUAAACVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWs941hAAAAGXRSTlMANcmynPaMgE4R6uJuRSQawHZiB9fTlFmnxxkxygAAAJBJREFUGNNVj1kShCAMRFlERNx1dN79L2oJmoL80NVF0q+Vc6Oqp3NGtTBUpk/GBb4wG0jL2vH/vLAQdZaz4TcnpXvsLmsWp58caMqIFjo1wFrjbLBAJ5lnfjXEKcvTK7BZTz58GEcCeP8IRhBuuU8rANdrrgXG9pVuBEM6PRFHGaFCxIw9RtWzW6RuVToOom+tJQh4b80pdgAAAABJRU5ErkJggg==" alt="" style="width: 11px;">
                        </template>
                        <template v-else>
                            <img data-v-7ce3e059="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAMAAACDzGUcAAAAUVBMVEUAAACVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZVsK5qfAAAAGnRSTlMAybKM9pxOMxLq4tWAXEUaBsCVdm9nOycip4jgzWkAAACQSURBVBjTZY9XEsMgEEMXjBvGvSXv/gfNGHYSmLwvjSiS5MvhK/mjBuxSeouhnwy+y83XgJllsfTtz2ygjiLAKMoOu8oRNLPKLsiUnnX6WRkxsKbgLtzJtyBhS/r2cCW51VmNFU4p2OF4TorRGzQi0jqsKNmmORaItP6pobxxV9Zb0U0HBMk5n0zjGimZnPsAvhUI8JQhe3UAAAAASUVORK5CYII=" alt="" style="width: 11px;">
                        </template>
                    </div>

                    <div class="go-to-gf">
                        <a data-v-097ef090="" v-if="data.is_official" :href="now_url" class="jump-to-official">经典</a>
                    </div>
                    <h4 style="margin-top: 0.5rem;height:0.2rem;line-height:0.2rem;font-size: 13px; color: gray; margin-bottom: 0.7rem;text-align: center;">

                        <span data-v-7ce3e059="" style="color: rgb(17, 17, 17); font-size: 13px !important;">{{data.name}}</span>-第<span data-v-7ce3e059="" id="" style="font-size: 13px; color: gray;">{{now_expect}}</span>期
                    </h4>
                    <div class="show-code-for-expect">
                        <template v-if="is_feng">

                            <span data-v-7ce3e059="" class="spansAll" style="border-radius: 0;" v-for="i in ['封','盘','中']">{{i}}</span>
                        </template>
                        <template v-else>
                            <template v-if="history.content">
                                <span :class="'lottery-ball pk10 solid ball'+parseInt(ball_number)" style="margin-right: 3px;width: 20px;height: 20px;line-height: 17px !important;font-size: 16px !important;border-radius: 0;font-weight: bold;" v-for="(ball_number,k) in history['content']">{{ball_number}}</span>

                            </template>
                            <template v-else>
                                <span data-v-7ce3e059="" class="spansAll" style="border-radius: 0;" v-for="i in ['正','在','开','奖']">{{i}}</span>
                            </template>
                        </template>
                    </div>
                </div>
                <div class="show-left" style="width: 40%;height: 68px;box-sizing:content-box;text-align: center;">

                    <div data-v-8eda8d38="" class="lottery-status-wrapper lottery-status-wrapper-official cqssc" style="">
                        <template v-if="!is_feng">
                            <div data-v-8eda8d38="" style="font-size: 12px;">距{{next_expect}}期截止</div>
                        </template>
                        <template v-else>
                            <div data-v-8eda8d38="" style="font-size: 12px;">{{next_expect}}期已封盘</div>
                        </template>
                        <div data-v-8eda8d38="" class="lottery-status lottery-status-official cqssc" style="margin-top: 0.6rem">
                            <template v-for="itme in now_time">
                                <i data-v-8eda8d38="" class="show-time">{{itme}}</i>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div v-if="'basic' in data && Object.keys(data.basic).length" v-swipedown="topData">

        <div class='' style="width:100%;" :style="{height:top_height+'px'}"></div>

        <div class="playing-methods-wrapper clearfix" :style="{top:(top_height+116)+'px'}">
          <ul class="nostyle playing-methods">
            <li v-for="(item,key) in data.basic" @click="target(key)"><a :class="['item',{'active selected':leftSelect(key)},{'active':leftValue==key}]" :style="styleTool(leftValue==key || leftSelect(key))">{{ item.name }}</a></li>
          </ul>
        </div>
            <template v-for="(item,key) in data.basic">
                <section class="playing-method-section" :id="key">
                    <h1 class="playing-method-section-title">{{ item.name }}</h1>
                    <ul class="nostyle kd-row lottery-balls">
                        <li v-for="(item1,key1) in item.items" :class="{'selected':(key in select_data.betting_all && key1 in select_data.betting_all[key])}" @click="betting(key,key1,(arrayIndexOf(select_data.alert_select,key) > -1 || arrayIndexOf(select_data.alert_select,key1) > -1 ? item1 : false))">
                            <span :class="[/^\d+$/.test(item1.name)?'lottery-ball pk10 solid ball' + item1.name:'lottery-prop']">{{ item1.name }}</span>
                            <span class="lottery-odds">{{ item1.odds }}</span>
                            <i class="icon"></i>
                        </li>
                    </ul>
                </section>
            </template>


        <form class="bet-form clearfix" v-show="Object.keys(select_data.betting_all).length">
          <div class="kd-field">
            <label for="count_in_bet_form" class="kd-field-title">已选 <span>{{ zhushuSum }}</span> 注, 单注金额 <span>{{ amount?amount:0 }}</span> 元, 总共 <span>{{ amount*zhushuSum }}</span> 元</label>
            <div class="kd-textinput number">
                <input type="number" v-model="amount">
            </div>
            <ul class="nostyle kd-chips" v-if="chip.length">
              <li :class="'kd-chip '+item.class" v-for="item in chip" @click="amount =  (amount? parseInt(amount) : 0 ) + parseInt(item.value)">
                <i class="icon"></i>
                <span>{{item.text}}</span>
                <!-- v-enter plus-one -->
                <b class="plus ">{{item.value}}</b>
              </li>
            </ul>
          </div>
            <div class="kd-buttons">
                <div type="button" :class="['btn-is-yuan','kd-button main-button',{'disabled':!amountTesting}]" @click="zi" :style="styleTool_2(true)">
                    <span>自购</span>
                    <button type="button">Button</button>
                </div>
                <div type="button" :class="['btn-is-yuan','kd-button main-button',{'disabled':!amountTesting}]" @click="he" v-if="'set' in data && data.set.hm_switch==1" :style="styleTool_2(true)">
                    <span>合买</span>
                    <button type="button">Button</button>
                </div>
                <div type="button" :class="['btn-is-yuan','kd-button main-button',{'disabled':!amountTesting}]" @click="zhui" v-if="'max_expect' in data && data.max_expect && 'set' in data && data.set.zh_switch==1" :style="styleTool_2(true)">
                    <span>追号</span>
                    <button type="button">Button</button>
                </div>
                <div style="float: right;height: 50px;width: 40px;display: inline-block;position: relative;top: -5px;">
                    <div type="button" class="kd-button btn-is-fangxing" @click="select_data.betting_all={}" :style="styleTool_2(true)">
                        <span>清空</span>
                        <button type="button">Button</button>
                    </div>
                    <div type="button" :class="['btn-is-fangxing','kd-button main-button',{'disabled':!amountTesting}]" @click="fenxiang" :style="styleTool_2(true)">
                        <span>分享</span>
                        <button type="button">Button</button>
                    </div>
                </div>
            </div>
        </form>
      </div>
    </main>


    <div align="center" v-if="!('basic' in data) || Object.keys(data.basic).length < 1">
      <mt-spinner type="double-bounce" :color="$store.state.basic.main_color"></mt-spinner>
    </div>

      <transition name="bounce2">
        <div class="promptbox-wrapper" v-if="alert==1">
         <section class="promptbox prompt-service">
             <div class="prompt-head" :style="styleTool(true)" style="letter-spacing:normal;">发起总额为 {{ amount*zhushuSum*(zh_data.expect_s.length ? zh_data.expect_s.length : 1) }} 的合买</div>
             <div class="prompt-body" style="padding-bottom:50px;">
               <mt-field label="自 购：" v-model.trim="hm_data.buy_money"></mt-field>
               <mt-field label="保 底：" v-model.trim="hm_data.bd" v-if="'set' in data && data.set.bd_switch==1"></mt-field>
               <mt-field label="中奖提成(%)：" :placeholder="'提成不能超过'+data.set.tc_num" v-model.trim="hm_data.tc" v-if="'set' in data && data.set.tc_switch==1"></mt-field>
               <mt-field label="宣传：" placeholder="写下您的合买宣言" type="textarea" rows="4" v-model="hm_data.explain"></mt-field>
               <mt-radio
                 title="投注内容是否公开"
                 align="right"
                 v-model="hm_data.open"
                 :options="opens">
               </mt-radio>
               <div style="position:absolute;bottom:0px;padding-bottom:5px;left:8px;right:7px;background:#efefef;">
                 <div class="data-item" align="center" @click="hmCheck">
                  <div type="button" class="kd-button main-button" :style="styleTool_2(true)">
                    <span>发起合买</span>
                    <button type="button">Button</button>
                  </div>
                 </div>
               </div>
             </div>
             <a href="javascript:;" class="prompt-close kd-close" @click="alert=0">close</a>
          </section>
         <div class="promptbox-overlay" @click="alert=0"></div>
      </div>
    </transition>

    <transition name="bounce2">
      <div class="promptbox-wrapper" v-if="alert==2">
       <section class="promptbox prompt-service">
           <div class="prompt-head" :style="styleTool(true)">追号</div>
           <div class="prompt-body" style="padding-bottom:100px;">
             <mt-checklist
              align="right"
              title="选择您要追号的期数"
              v-model="zh_data.expect_s"
              :options="expect_s" v-if="expect_s.length">
            </mt-checklist>
            <p v-else>今天暂时没有可用追期</P>
            <br/>
            <div style="position:absolute;bottom:0px;padding-bottom:5px;left:8px;right:7px;background:#efefef;">
              <a class="mint-cell" v-if="expect_s.length">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                  <div class="mint-cell-title">
                    <span class="mint-cell-text">中奖了,是否停止追号</span>
                  </div>
                  <div class="mint-cell-value">
                    <label class="mint-switch">
                      <input type="checkbox" class="mint-switch-input" v-model="zh_data.stop">
                      <span class="mint-switch-core"></span>
                      <div class="mint-switch-label"></div>
                    </label>
                  </div>
                </div>
                <div class="mint-cell-right"></div>
              </a></br>
              <div class="data-item" align="center" @click="alert=0">
                 <div type="button" class="kd-button main-button" :style="styleTool_2(true)">
                   <span>确 定</span>
                   <button type="button">Button</button>
                 </div>
             </div>
           </div>
           </div>
           <a href="javascript:;" class="prompt-close kd-close" @click="alert=0">close</a>
        </section>
       <div class="promptbox-overlay" @click="alert=0"></div>
      </div>
  </transition>

  <transition name="bounce2">
    <div class="promptbox-wrapper" v-if="alert==3">
     <section class="promptbox prompt-service">
         <div class="prompt-head" :style="styleTool(true)">请您确认</div>

         <div class="prompt-body">
           <!-- <mt-cell title="游 戏" :value="data.name"></mt-cell> -->
           <template v-for="item in expectTool">
             <mt-cell title="下注期号" :value="item"></mt-cell>
           </template>
           <mt-cell title="总金额" :value="amount*zhushuSum*(zh_data.expect_s.length ? zh_data.expect_s.length : 1)" v-if="hm_data.buy_money"></mt-cell>
           <mt-cell title="自 购" :value="hm_data.buy_money" v-if="hm_data.buy_money"></mt-cell>
           <mt-cell title="保 底" :value="hm_data.bd" v-if="hm_data.bd"></mt-cell>
           <mt-cell title="中奖提成" :value="hm_data.tc" v-if="hm_data.tc>0"></mt-cell>
           <mt-cell title="投注号码可见" :value="hm_data.open" v-if="hm_data.buy_money"></mt-cell>
           <mt-cell title="中奖停止追号" :value="zh_data.stop?'是':'否'" v-if="zh_data.expect_s.length>1"></mt-cell>
           <mt-cell title="需要支付" :value="(hm_data.buy_money?(hm_data.buy_money * 1 + hm_data.bd * 1):(amount*zhushuSum*(zh_data.expect_s.length ? zh_data.expect_s.length : 1)))"></mt-cell>
           <br/>
           <div class="data-item" align="center" @click="bettingAction">
            <div type="button" class="kd-button main-button" :style="styleTool_2(true)">
              <span>确认无误,提交</span>
              <button type="button">Button</button>
            </div>
           </div>
         </div>

         <a href="javascript:;" class="prompt-close kd-close" @click="alert=0">close</a>
      </section>
     <div class="promptbox-overlay" @click="alert=0"></div>
    </div>
  </transition>
      <transition name="bounce2">
          <div class="promptbox-wrapper" v-if="alert==5">
              <section class="promptbox prompt-service">
                  <div class="prompt-head" :style="styleTool(true)">请您确认</div>
                  <div class="prompt-body">
                      <!-- <mt-cell title="游 戏" :value="data.name"></mt-cell> -->
                      <template v-for="item in expectTool">
                          <mt-cell title="分享期号" :value="item"></mt-cell>
                      </template>

                      <mt-cell title="分享至" v-if = "is_chart">
                          <select style = "border-radius: 5px;height: 100%" id = "selectd">
                              <option v-for = "val in chart.chart" >
                                  <div >{{val.name}}:{{val.chart_id}}</div>
                              </option>
                              <option>
                                  公共聊天室:1
                              </option>
                          </select>
                      </mt-cell>
                      <mt-cell title="分享至" v-else>
                          <select style = "border-radius: 5px;height: 100%" id = "selectd">
                              <option>
                                  公共聊天室:1
                              </option>
                          </select>
                      </mt-cell>
                      <br/>
                      <div class="data-item" align="center" @click="Send">
                          <div type="button" class="kd-button main-button" :style="styleTool_2(true)">
                              <span>确认无误,提交</span>
                              <button type="button">Button</button>
                          </div>
                      </div>
                  </div>

                  <a href="javascript:;" class="prompt-close kd-close" @click="alert=0">close</a>
              </section>
              <div class="promptbox-overlay" @click="alert=0"></div>
          </div>
      </transition>
  </div>
</template>

<script>
  export default{
    props: {
      select_data: {
        default: () => {
          return {
            alert_select: [],
            betting_all: {},
            single_select: { x: 'da',da: 'x',dan: 's',s: 'dan',l:'hu',hu:'l',dd: 'ds',ds: 'dd',xd: 'xs',xs: 'xd' }
          };
        }
      }
    },
    mounted(){
        this.getHistoryForShow();
      this.getInfo();
      this.chipSet();
      this.$store.state.chart_open = true;
        this.now_url = this.formatUrl();
    },
    destroyed () { //组件销毁后调用
      this.$store.state.chart_open = false; 
      this.$store.state.chart_chg = false; 
	  },
    data () {
      return {
          chart:{},
          is_chart:false,
          dayHistory:false,
        alert: 0,
          next_expect:'',
          now_expect:'',
        opens: ['完全公开', '仅跟单人可见', '截止后公开','完全保密'],
        expect_s: [],
        zh_data: {
          expect_s: [],
          stop: false
        },
        hm_data: {
          open: '完全公开',
          explain: '',
          buy_money: 0,
          bd: 0,
          tc: ''
        },
          history:{
              expect:'',
              content:0,
          },
        data: {},
        leftValue: '',
        amount: 0,
        end_time: 0,
        now_time: '...',
        loading: false,
        down: 0,
        down_loading: true,
        setTimeout_ids: [],
        //筹码
        chip:[
          // {class:'chip0',text:'50',value:50},
        ],
        //顶部下拉开彩历史--
        top_height:0,
        //顶部历史开彩数据--
        top_list:{},
        name:'开始',
        betting_state: false,
          show_history_div:false,
          is_feng:false,
          now_url:this.$route.path,
      }
    },
    computed:{
        getRoom(){
            return this.$store.state.chart_chg;
        },
      expectTool(){
        let chat_data = [];
        for(let i = 0,j = this.zh_data.expect_s.length;i < j;i++){
          if(this.zh_data.expect_s[i] >= this.data.expect){
            chat_data.push(this.zh_data.expect_s[i]);
          }
        }
        chat_data.sort();
        this.zh_data.expect_s = chat_data;
        return chat_data;
      },
      amountTesting(){
        return (/^\d+$/.test(this.amount) && this.amount>0 && Object.keys(this.select_data.betting_all).length) && this.betting_state ? true : false;
      },
      zhushuSum(){
        let zhushu = 0;
        for(let i in this.select_data.betting_all){
          for(let j in this.select_data.betting_all[i]){
            zhushu += this.select_data.betting_all[i][j].num;
          }
        }
        return zhushu;
      }
    },
    methods: {
        fenxiang(){
            if(!this.amountTesting){
                return;
            }
            this.expectCheck();
            this.alert = 5;
            let _this = this;
            _this.$getData({
                url:'/api/home/Chartroom/Heel_throw',
                type:'post',
                data:'',
                callback:function(res){
                    if(res.type){
                        _this.$set(_this.chart,'chart',res.data);
                        _this.is_chart = true;
                    }
                }
            })
        },

        //发布跟投信息
        Send(){
            var str = document.getElementById('selectd').value;
            var index=str.lastIndexOf("\:");
            var chart_id=str.substring(index+1,str.length);
            let _this = this;
            _this.$getData({
                loading: true,
                url:'/api/Home/Chartroom/release_Heel_throw',
                data: {
                    chart_id:chart_id,
                    betting: JSON.stringify(_this.select_data.betting_all),
                    basic: JSON.stringify({
                        zh: _this.zh_data,
                        hm: _this.hm_data,
                        money: _this.amount
                    }),
                    type: _this.$route.params.id
                },
                callback: function(res){
                    _this.$total({message:res.Tips})
                    if(res.type){
                        _this.select_data.betting_all = {};
                        _this.amount = 0;
                        _this.hm_data = {
                            'open': '完全公开',
                            'buy_money': 0,
                            'explain': '',
                            'bd': 0,
                            'tc': 0
                        };
                        _this.zh_data = {
                            'expect_s': [],
                            'stop': false
                        };
                        _this.alert = 0;
                    }
                }
            });
        },
        formatUrl() {
            var url = this.now_url;
            var getPath = url.split('/');
            return '#/' + getPath[1] + '-gf/' + this.$route.params.id;
        },
        getHistoryForShow(){
            //禁止查询类型
            var _this = this;
            _this.$getData({
                url:'/api/home/home/getHistory-3',
                data:{type:_this.$route.params.id},
                type:'get',
                callback:function(res){
                        // console.log(res);
                    _this.dayHistory = res;
                }
            });
        },
        openAndClose(){
            if(this.show_history_div == false)
            {
                this.show_history_div = true;
            }
            else
            {
                this.show_history_div = false;
            }
        },
        closeThisDiv(){
            this.show_history_div = false;
        },
      styleTool(value){
        let _data = {};
        if(value){
          _data.background = this.$store.state.basic.main_color;
        }
        return _data;
      },
      styleTool_2(value){
        let _data = {};
        if(value){
          _data.background = this.$store.state.basic.main_color;
          _data.border = '1px solid ' + this.$store.state.basic.main_color;
        }
        return _data;
      },
      hmCheck(){
        let sum = this.amount * this.zhushuSum * (this.zh_data.expect_s.length ? this.zh_data.expect_s.length : 1)
        ,_this = this
        ,chat_data;
        if(this.data.set.zg > 0 && parseInt(this.hm_data.buy_money / (sum / 100)) < this.data.set.zg){
          chat_data = Math.ceil(sum / 100 * this.data.set.zg);
          _this.$total({ message:'自购至少认购' + chat_data,type: 2 });
          _this.hm_data.buy_money = chat_data;
          return;
        }
        if(this.hm_data.buy_money > sum){
          _this.$total({ message:'自购最多认购' + sum,type: 2 });
          _this.hm_data.buy_money = sum;
          _this.hm_data.bd = 0;
          return;
        }
        if(_this.hm_data.bd > (sum - _this.hm_data.buy_money)){
          _this.$total({ message:'保底最多保底' + (sum - _this.hm_data.buy_money),type: 2 });
          _this.hm_data.bd = (sum - _this.hm_data.buy_money);
          return;
        }
        if(this.data.set.bd > 0 && parseInt(this.hm_data.bd / ((sum - this.hm_data.buy_money) / 100))  < this.data.set.bd){
          chat_data = Math.ceil((sum - this.hm_data.buy_money) / 100 * this.data.set.bd);
          _this.$total({ message:'保底至少保底' + chat_data,type: 2 });
          _this.hm_data.bd = chat_data;
          return;
        }
        if(this.data.set.tc_num > 0 && this.hm_data.tc > this.data.set.tc_num){
          _this.$total({ message:'提成不能大于奖金的' + this.data.set.tc_num + '%',type: 2 });
          _this.hm_data.tc = this.data.set.tc_num;
          return;
        }
        this.expectCheck();
        this.alert = 3;
      },
      expectCheck(){
        let chat_data = [];
        for (let i = 0,j = this.zh_data.expect_s.length; i < j; i++) {
          if(this.zh_data.expect_s[i] >= this.data.expect){
            chat_data.push(this.zh_data.expect_s[i]);
          }
        }
        if(chat_data < 1){
          chat_data.push(this.data.expect);
        }
        this.zh_data.expect_s = chat_data;
      },
      zhui(){
        if(!this.amountTesting){
          return;
        }
        let expect_s = [];
        if('max_expect' in this.data && this.data.max_expect){
          let chat_data = (this.data.expect+'').substr(0,8) + '' + this.data.max_expect;
          if(chat_data > this.data.expect){
            for(let i=this.data.expect;i<=chat_data;i++){
              expect_s.push(i);
            }
          }
        }
        this.expectCheck();
        this.expect_s = expect_s;
        this.alert = 2;
      },
      he(){
        if(!this.amountTesting){
          return;
        }
        let sum = this.amount * this.zhushuSum * (this.zh_data.expect_s.length ? this.zh_data.expect_s.length : 1);
        this.hm_data.buy_money = Math.ceil(sum / 100 * this.data.set.zg);
        this.hm_data.bd = Math.ceil((sum - this.hm_data.buy_money) / 100 * this.data.set.bd);
        this.expectCheck();
        if(this.data.set.total > this.amount * this.zhushuSum * (this.zh_data.expect_s.length ? this.zh_data.expect_s.length : 1)){
            this.$total({ message:'发起合买总金额不能少于' + this.data.set.total,type:2 });
        }else{
          this.alert = 1;
        }
      },
      zi(){
        if(!this.amountTesting){
          return;
        }
        this.hm_data = {
          'open': '完全公开',
          'buy_money': 0,
          'bd': 0,
          'tc': 0
        };
        this.expectCheck();
        this.alert = 3;
      },
      //顶部历史开彩请求数据
      topData(type = 1){
        return;
        let _this = this;
        _this.top_height = (_this.top_height == 0 ? 200 : 0);
        // console.log(Object.keys(_this.top_list).length);
        if(_this.top_height > 0 && !Object.keys(_this.top_list).length){
          _this.$getData({
            url:'/api/home/Home/trend',
            type:'post',
            data:{type:_this.$route.params.id,expect:0},
            callback:function(res){
              if(res.data){
                _this.$set(_this,'top_list',res);
              }
            }
          });
        }
      },
      chipSet(){
        let arr = {
          chip0:['50',50],
          chip1:['100',100],
          chip2:['500',500],
          chip3:['1千',1000],
          chip4:['2千',2000],
          chip5:['5千',5000],
          chip6:['1万',10000],
        },
        rs = JSON.parse(localStorage.userConfig);
        if(rs['chip'].length == 0){
          rs['chip'] = { chip0: 1,chip1: 1,chip2: 1 };
        }
        for(let i in rs['chip']){
          this.chip.push({class:i,text:arr[i][0],value:arr[i][1]});
        }
      },
      initialization(){
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        this.now_time = '...';
        if(this.$route.path in this.$store.state.all_chat){
          this.data = this.$store.state.all_chat[this.$route.path];
          this.$store.state.title = this.$store.state.all_chat[this.$route.path].name;
          this.$store.state.all_chat[this.$route.path].basic && (this.leftValue = Object.keys(this.$store.state.all_chat[this.$route.path].basic)[0]);
        }
      },
      clearTimeout(){
        for (let i = 0,j = this.setTimeout_ids.length; i < j; i++) {
          clearTimeout(this.setTimeout_ids[i]);
        }
        this.setTimeout_ids = [];
      },
      arrayIndexOf (arr,obj) {
        if(arr){
          for (let i = 0,ii = arr.length; i < ii; i++) {
            if (arr[i] == obj) {
              return i;
            }
          }
        }
        return -1;
      },
        timeTool(){
            let _this = this
                ,cha = Math.round((_this.end_time - new Date().getTime()) / 1000); //秒
            this.clearTimeout();
            if(_this.data.expect == null || _this.data.expect == 0){
                _this.down > 0 && (_this.down % 5) == 0 && (_this.getInfo());
                _this.down++;
            }
            if(cha < 1){
                this.betting_state = false;
                this.alert = 0;
                if(parseInt(this.data.desc) + parseInt(cha) < 0 ){
                    _this.now_time = '加载中...';
                    _this.getInfo();
                }else{
                    _this.setTimeout_ids.push(setTimeout(()=>{
                        _this.data.history.expect = _this.data.expect;
                        _this.data.history.content = 0;
                        _this.is_feng = true;
                        _this.now_time = this.timeFormat(parseInt(this.data.desc) - cha * -1);
                        _this.timeTool();
                    },1000));
                }
            }else{
                this.betting_state = true;
                this.now_time = this.timeFormat(cha);
                _this.is_feng = false;
                _this.setTimeout_ids.push(setTimeout(() => {
                    if(_this.data.expect && _this.data.history && 'history' in this.data && 'content' in this.data.history && this.data.history.content == 0 && _this.down_loading){
                        _this.down > 0 && (_this.down % 5) == 0 && (_this.getHistory());
                        _this.down++;
                    }
                    _this.timeTool();
                },1000));
            }
        },
      timeFormat(cha){
        let day = parseInt(cha / 86400)
          ,h = parseInt(cha % 86400 / 3600)
          ,m = parseInt(cha % 86400 % 3600 / 60)
          ,s = Math.round(cha % 86400 % 3600 % 60);
          (h < 10) && (h = "0" + h);
          (m < 10) && (m = "0" + m);
          (s < 10) && (s = "0" + s);
          return ((day > 0 ? day + '天 ' : '') + h + ':' + m + ':' + s);
      },
      getInfo(loading){
        if(this.loading) return;
        this.clearTimeout();
        this.initialization();
        this.loading = true;
        let _this = this;
        _this.$getData({
          url:'/api/Home/' + (this.select_data.info_url ? this.select_data.info_url : 'Lottery') + '/getInfo',
          data: { type: _this.$route.params.id },
          callback: function(res){
            if(res.code){
              _this.data = res.data;
              _this.$store.state.all_chat[_this.$route.path] = res.data;
              _this.leftValue == '' && (_this.leftValue = Object.keys(res.data.basic)[0]);
              _this.$store.state.title == '' && (_this.$store.state.title = res.data.name);

                var now_expect = res.data.history['expect'];
                var next_expect = res.data.expect;
                var start_z = res.data.expect.length - res.data.max_expect.length;
                _this.now_expect = String(now_expect).substring(start_z);
                _this.next_expect = String(next_expect).substring(start_z);

                if(res.data.history['content'].length > 1){
                    _this.history['content'] = res.data.history['content'].split(',');
                    for(var i=0;i<_this.history['content'].length;i++)
                    {
                        if(_this.history['content'][i] < 10)
                        {
                            _this.history['content'][i] = _this.history['content'][i].substring(1);
                        }
                    }
                }

              _this.end_time = parseInt((new Date()).getTime())  + parseInt(res.data.number) * 1000;
              _this.timeTool();
              _this.loading = false;
            }else{
              //_this.$total({ message:res.msg,duration:2000,type: 0 });
              //setTimeout(()=>{ _this.$router.back(); },2500);
            }
          }
        });
      },
      getHistory(){
        if(this.loading) return;
        let _this = this;
        this.down_loading = false;
        _this.$getData({
          url:'/api/Home/Lottery/getHistory',
          data: { type: _this.$route.params.id },
          callback: function(res){
            if(res){
              _this.data.expect = res.expect;
              _this.data.number = res.time;
              _this.data.history = res.history;
              if(Object.keys(_this.top_list).length && _this.top_list.data.length && _this.top_list.data[0].expect < res.history.expect){
                _this.top_list.data.unshift({ expect: res.history.expect,content:res.history.content.split(',') });
              }
            }
            _this.down_loading = true;
          }
        });
      },
      target(key){
          let data = document.getElementById(key).offsetTop - (116+this.top_height);
          document.documentElement.scrollTop = data;
          document.body.scrollTop = data;
        this.leftValue = key;
      },
      leftSelect(key){
        return ((key in this.select_data.betting_all && Object.keys(this.select_data.betting_all[key]).length) ? true : false);
      },
      betting(key1,key2,data){
        if(this.data.expect == null || this.data.expect == 0){
          this.$total({ message:'未开始销售,您可以看看其它在售彩种',type: 2 });
          return;
        }
        if(data){
          this.$parent.betting(data,key1,key2,this.select_data.betting_all);
        }else{
          let betting_chat = {};
          if(!(key1 in this.select_data.betting_all)){
            this.select_data.betting_all[key1] = {};
          }
          if(key2 in this.select_data.betting_all[key1]){
              delete this.select_data.betting_all[key1][key2];
              if(Object.keys(this.select_data.betting_all[key1]).length < 1){
                delete this.select_data.betting_all[key1];
              }
          }else{
            if(this.data.basic[key1].number && Object.keys(this.select_data.betting_all[key1]).length >= this.data.basic[key1].number){
              this.$total({ message:this.data.basic[key1].name + '选择不能超过' + this.data.basic[key1].number + '注',duration:2000,type: 2 });
              return;
            }
            if(key2 in this.select_data.single_select){
              delete this.select_data.betting_all[key1][this.select_data.single_select[key2]];
            }
            this.select_data.betting_all[key1][key2] = {
              code: '',num: 1
            }
          }
          for(let _i in this.select_data.betting_all){
            betting_chat[_i] = this.select_data.betting_all[_i];
          }
          this.$set(this.select_data,'betting_all',betting_chat);
        }
      },
      clearBetting(){
        this.select_data.betting_all = {};
      },
      bettingAction(is_hm){
        let _this = this;
        // 这里投注限制 hook
        if(this.amountTesting && this.amount < 100000){
          let chat_data = [];
          for (let i = 0,j = this.zh_data.expect_s.length; i < j; i++) {
            if(this.zh_data.expect_s[i] >= this.data.expect){
              chat_data.push(this.zh_data.expect_s[i]);
            }
          }
          if(chat_data < 1){
            chat_data.push(this.data.expect);
          }
          this.zh_data.expect_s = chat_data;
          this.$getData({
            loading: true,
            url:'/api/Home/' + (this.select_data.betting_url ? this.select_data.betting_url : 'Lottery') + '/betting',
            data: {
              betting: JSON.stringify(_this.select_data.betting_all),
              basic: JSON.stringify({
                zh: _this.zh_data,
                hm: _this.hm_data,
                money: _this.amount
              }),
              type: _this.$route.params.id
            },
            callback: function(res){
              _this.$total({ message:res.msg,duration:2000,type: res.code });
              if(res.code){
                _this.select_data.betting_all = {};
                _this.amount = 0;
                _this.hm_data = {
                  'open': '完全公开',
                  'buy_money': 0,
          				'explain': '',
                  'bd': 0,
                  'tc': 0
                };
                _this.zh_data = {
                  'expect_s': [],
                  'stop': false
                };
                _this.alert = 0;
              }
              _this.data = res.data;
            }
          });
        }else{
          this.$total({ message:'您下注的金额有误',duration:1500,type: 2 });
        }
      }
    },
    watch: {
      $route(){
        this.getInfo();
        this.top_height = 0;
        this.top_list = {};
      },
        data:function () {
            this.getHistoryForShow();
        }
    }
  }
</script>

<style scoped>
    .kd-body.game {
        padding-top: 7.25rem !important;
    }
    .kd-buttons{
        padding-top: 10px;
        display: flex !important;
    }
    .btn-is-yuan{
        width: 30px !important;
        height: 30px !important;
        line-height: 30px !important;
        border-radius: 50% !important;
    }
    .btn-is-yuan>span{
        position: relative;
        top: -8px;
    }
    .btn-is-fangxing{
        width: 35px !important;
        height: 18px !important;
        line-height: 18px !important;
        /*position: relative;*/
        /*top: -10px;*/
        float: right;
        margin-bottom: 5px;
    }
    .btn-is-fangxing>span{
        position: relative;
        top: -8px;
    }
    .promptbox-overlay{
        height: 100%;
    }
    .bet-form{
        bottom: 3.0125rem !important;
    }
    .show-code-for-expect{
        width: 100%;
        color: red;
        margin-top: 5px;
        text-align: center;
        display: block;
    }
    .show-code-for-expect>span{
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        background: linear-gradient(-30deg,#dc4137,#ff6b52);
        color: #fff;
        line-height: 1.5rem;
        text-align: center;
        margin-right: 2px;
        font-size: 12px;
        border-radius: 50%;
    }
    .go-to-gf{
        position: absolute;
        top: 0.3rem;
        left: 0;
    }
    .show-left{}
    .show-left:before{
        content: "";
        width: 1px;
        border-left: 1px solid #e7e7e7;
        float: left;
        height: 54px;
        margin-top: 6px
    }
    @font-face{
        font-family: 'time_size';
        src: url('../../../assets/font/QuartzEF.otf');
    }

    .show-time{
        color: red;
        font-size: 1.4rem;
        font-family: 'time_size';
        font-weight: 500;
        font-style:normal
    }

    .for-show-content-history
    {
        max-width: 640px;
        width: 100%;
        height: 22%;
        position: fixed;
        background: #ffffff;
        z-index: 3;
        top: 7.1625rem;
        border-bottom: 3px solid #ccc;
        overflow: auto;
    }
  .bet-form .kd-button{
    width: 23%;
  }
  .bet-form .kd-button{
    margin-left: 2px;
  }
  .bet-form .kd-button:first-child{
    margin-right: 0%;
  }
  .bet-form .kd-buttons{
    text-align: center;
  }
  .change-to-official{
    right:5.5rem;
    top:2.5rem;
  }

    .jump-to-official:before {
        content: "";
        display: block;
        width: 1.625rem;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        background: #fff;
        border-radius: 2em;
    }
    .jump-to-official
    {
        padding: 0 .3125rem 0 1.75rem;
        display: inline-block;
        vertical-align: middle;
        background: red;
        border-radius: 2em;
        overflow: hidden;
        text-align: center;
        height: 1.25rem;
        line-height: 1rem;
        position: relative;
        font-size: .75rem;
        border: .125rem solid red;
        color: #fff;
    }
</style>

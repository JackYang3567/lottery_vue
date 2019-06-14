<template>
  <div>
    <main class="kd-body account">
      <div class="show-head-at-this-page">
        <div style="width: 100%;position: absolute;top: 1rem;">
          <div class="details_left" @click="$router.push({path:'/My/photo'})">
            <img class="" style="width: 3.9rem;border-radius:50%;" :src="require('@/assets/images/photo/'+ ($store.state.user['photo'] > 0 ?$store.state.user['photo'] : '0') +'.png')" />
          </div>
          <div class="details_right">
            <h3 data-v-0de7809a="" id="userName"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABdUlEQVQ4T6XTT4hPURjG8c9T/mZjJWrYWDILZcFeGrGYotiOUlLyX2KtWfiTbCYSa1GyMBvEQlgoqbGdpsSKhSxmEo7udK/O7zIs3OXznPd73/Oc943//NKvL6WswglsxibM4Q1e4nKSL3XNAKCUMopbWLlAYx+wN8mzzv8FKKWM4WZrfMZRPMUstmMCK/ADI0keNmfnAaWUNZjBkhZwLMmVuotSygWcbLWPWJdktgOM40xVsDPJZA9wGFcr7WCSax1gChsq80CSGz3AcVyqtAdJdnWAr1hcmaNJ7vcAe3Cn0t4m2dgBmqCWVebtJPt6gBfYUmlTSYY7wHNsrcwm6Sak923IQ3jXe9qBKxzBQOqYD6kF/Mk/lGSi62A5prG6+supJBdbwFmcr7xPGEoyVw9SM7qPcR2vcDfJ9xawqL3iNpzDjoFB6sillPU4jUe4l+RbC2heaDf2YzzJk99GuYI0XY1gGEvRLNdavP7nMi2wQH+VfwLEqYgRE/sTHwAAAABJRU5ErkJggg==" style="width: 20px;position: relative;top: 3px;" title="用户名">:{{$store.state.user['username']}}
              <!--<span style="border: 1px solid white;width: 30px;height: 18px;line-height: 18px;font-size: 0.875rem;display: inline-block;text-align: center;border-radius: 5px;">NO<span style="font-size: 0.5rem">●</span></span>-->
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABXElEQVQ4T6WTvysFUBzFP0eEDB4iSmxMCtlkMykli2Sh/APCSrEIZTIymlEmm5gMYnoGUhbFS5ISw9HVvS+en/Hdbvfezz3ne89X/LNUeN92LTAJdAEdwDNwAhwCK5Ju3t55B7A9CKwBmS+E5YBxSZtpPw+wPQas/9LRiKSNcPYVYLsROAeKgH2gGGgDjiKwFGgFquL6EWiUlEuAJWAKuJOUsV0DbEvqfqvI9hCwCoT9eUkzCXAKtHwGsF0Zm3km6dJ2L7ALHEtqT4DQ6SD7gwLbPcAe8AA0SLq3fQWUBbUJ8ASU/AAwUBt8274EKiRVJ0A2NukrBf3AgaQt283ARWiwpM4EWASmv1GQlXRtuw7YiSGbkzSbAA2RGmQuAOXAcMxFE3AL1AN9MWTvvzFm4e9BSn9teyC+mgJTGMwwB6OSgo3X+myYgs+J6LOzYJiWJQU7+foA+OUs5I+9AFtEpRFu02b+AAAAAElFTkSuQmCC" style="width: 20px;position: relative;top: 3px;">:{{$store.state.user['id']}}</h3>
            <p data-v-0de7809a="">
              <span data-v-0de7809a="" id="userBalanceP" style="margin-left: 0px;" @click="mingxi=!mingxi">
                ¥{{ $store.state.user ? $store.state.user.money : '00.00' }}</span>
              <span style="margin-left: 2px;">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAB1UlEQVQ4T5WTvUuWYRTGfxcWOUj4GkqIVNAQ+AcoODQ4OElDWw3xShbRByGmpIUfYUEUQR9GINbiEtHWWrQ0tDQETUFRDUmirxKK9nXkyP3E8fVRXs/0cO5z/879XOc6MrMdwGtgSNIrthlmthPoA+okXZKZdQGPE+cpcEHSTCVcM2tLdw8Bv4B6Bz4AzgXAAnAFeCjJ8sBmVg/cBk6E8xWgVZ4ws07gPnAgFLwDuiS9z3Jm5vWngJtAbah9AZyX9GUNmKC7gH5gEKhO6b/AeHrxPuAJ0BJAn4DTkl5muf/AAN4P3AGOhos/gD1AVcotAdeBW5J+R1k2AAO43XUEXPAYz4CLkr7n6ZtpWCtpvrwgWaIHGAa+At2S3mwyqIKkkk+5AHxOr7kmaTkH3ADMSnJN14WZ+SAngUVJRxzo3UdS1TegWInBzcyHeBkYAPzbLdbkwDMuLlATWj9PNpje5PcOJ0MfDOcfgY5Mw8YEPR4Kfvo6Avck/UvW2psccKysbhS4K+nPuimnVZoAmsMFN/ZJ3wLgBrA7nE0BvZLcVmuR50P32llgrOxy/PsP3kTS23JJtvKh76uvWDE0LgFXgUeZDBUDg8F91Xz9fLcHJM3lDSrLrQIf0qB8tksWbAAAAABJRU5ErkJggg==" style="position: relative;top: -5px;left: 0;width: 15px;height: 8px;" class="xiang-xia-jump" @click="mingxi=!mingxi" />
              </span>
              <span data-v-0de7809a=""><img data-v-0de7809a="" src="data:image/png;base64,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" alt="" class="lds-hourglass" :style="{'width': '1.5rem','position': 'relative','top': '2px'}">
              </span>
            </p>
            <div v-if="mingxi" class="show-ming-xi">
               <div class="show-ming-xi-content">
                 <p>剩余积分 ：{{$store.state.user['point']}}分</p>
                 <p>冻结资金 ：¥{{$store.state.user['no_money']}}</p>
                 <p>累计提款 ：¥{{out_money}}</p>
                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACRElEQVQ4T31TPWgUQRh9b8OdjTaCWIiKza23M0VEUygiVoEk/qMWIv4bBRt/EGMhoqAo4l8bUCGFoJAYUZJgG4hF/IWZ2RzYaGMj1wXEu51P5tgLyykZ2IF5O9+b9828R3QMpdRyAEcA9JFcIiK/ALj8e2etrRdLWFxorU+IyEOSnwHMeO8/hf8kN5LcDKAbwEVjzNN23QKBUuoOyUEAJ40xrzqVhbXWei+AJwAeG2NutMjDpJS6QvJSlmU9aZp+/19xG6tWq2u7urpmsywbTNN0nEqppQB+AjhgrZ3SWl8XkQlr7WyRSCnVA2CXtfaaUmorydF6vb6OWuuzAE4ZYzblarpJjnnvdzrnbMCSJFFRFL0RkX3W2i/5vkkRGQ8Eod8ZY8y99ol5wSjJ/oB570PxwTZhTnCB5LZA8DXLsqtpmk4UJeckIwFrNBqHarVarePFBkTkVovAez/knJssbojjOC6VSs+DgEajcbiToFqt9kdRdLvVgvd+2jn3oNgCyZfNZnOHiPwpl8uvvfdHiy1orS8D2MIkSc6Q3GOt7SteGIABY0wasEqlsqpcLo9774+1SbTWH0RkmHEcLyuVSt+89/udc9PhGZvN5tu5ubmPHT2vBLDdGPNCa90rIqPz8/OrW0ZKkmR3FEXDItJjrf2xmJGUUmtIhtPvW2vvFq18E8A5kqeNMWOLWTlIt9YOLVi5cHnHST4KYRKR9yRbbgzKQphEZIOInHfOPfsnTG0gj3NviAiA9SRXiMhvAFMARjrj/BepWB+8FoE0CAAAAABJRU5ErkJggg==" @click="mingxi=!mingxi">
               </div>
            </div>
          </div>
          <div class="qiandaoing" @click="targetHref('2')">
            <img data-v-0de7809a="" src="data:image/png;base64,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" title="" style="height: 2.2rem; border-radius: 50%;"></div>
          <div class="tab" style="top: 4.5rem;">
            <div class="tabcontent" @click="targetHref('/Capital')">
              <p>
                <span>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABJCAMAAABl9qo7AAAAh1BMVEUAAAD/ijv7jTv/gEj9cUP9dkT+eUb+fEf/ijr/jDn/jj32jDv/fEb9dET/f0b9dUT+fUX8f0T+dUX/gUn+dkX/gkj9dET+gEb9dUP+eEX9ekT8fET9c0T+eUT+d0P9ekT7fkT7gUD9cUT9dUX+dkX+d0X8dET+eEX7g0D8dUP8d0T+gUj7fEIcADYVAAAALXRSTlMABhTy8vLy8gkPDBe4l5eaqEq3j+m3qJGKw1dBoHpxZkYt38y839awIIVQozm7FXJaAAADEElEQVRYw+3Y63KiQBAF4J1Zshkg6BpZ5O7dmGze//m2ZSY20nMDqvZXjlVWTOTLSePIxB/f8Q/zvY1Xx7fweh4e4BE0vfqwKelk5vrbpkcSZn9OHLVZ/nTLr16e7/lpT2NszrrWHwBPxitbc8Zqs+3G1wDoiquTuHyagW+MM+/w5GkGvmZYnNRGm+B+tqk42hNwtI21xTIguHsqaBuKSzsLAJ868r/CVlyUr/e8+OUPphTW3iKKQggfmRASRULaWBxrz7d9evNwJM3RNs1bfNmj490bMrY26f2f510l1ixsWV+lTYrj2lGZsPjXtt4C1vwMfCGEpbZIbmh3m7D410L49fbGqc2orGzVPHtPO3y7z3R4irizN9oyNeflzX7lnJ8Jftzt1xKnNkS7LNFOwDwBvuc8TodjKa7w04LYG2Xrxx3hvD853wdBC8jbcOZFzCEvpPhG35vaRzg8O8NdOTyfLx29fZaZ0jtYxvwKE6mGL5a3OJY0wReRtjd7tI8JBAhI+5plF8SBBjtunjF9u8P1tZV94P0AVkhc0WCX5eohO8hqD7ahN9rpldgKP8dd1Pch+BDfCcEz9w4u+ft7nle3uTZt25zuM78gFvcysI29MTkcMVz8W4nZbaabd/jVO4O8fcARdXE6nQ49vOyw/PSbZmvtHZJzKfsVPfzj1nOle9v669P7EPdoZSO+ApvvzxTfuHpLvF4u67oCusnzPDk+Xil2YPPPFHG0Hb0xWyBSzWUorTikGIzFpzemBOGo5IcXyw2/nsnI7b0jYl8CdYV7xJv2SC9D5t7UTjiv1Jfgu69xjt510E/eHKSseAe+cPUmwd4WnPam+E4vy3sXXkVA0973obRpYIvFTlvTJtm+i40x7k0y/a8YcdSJ79zIYm1aXOEYHk7fI9PioDv48H5TjzoabapLHHUacHQZ0kQe4Bii6GGQcWdvwdH3DtLS0o0cdYyPizTKZObIjwpT0csMxzKMi8Wo6Rr8WQHAKENm6F4fx06FaWvqa2MisdX0j77tz/VR5/zGGb77uO+48w+8P2TDxhOPRAAAAABJRU5ErkJggg==" alt="">
                </span>
                <span style="margin-top: 1rem; text-align: left; border-right: 1px solid rgb(193, 192, 192); box-sizing: border-box;color: #575757;font-size: 0.875rem">充值</span>
              </p>
            </div>
            <div class="tabcontent" @click="targetHref('/Capital/moneyOut')">
              <p data-v-0de7809a="">
              <span>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABKCAMAAAABvsPsAAAAw1BMVEUAAABSiP9VhP9Kj/RWh/9Lh/pKl+1Km+pViP9WiP5Lg/1Viv9JouVKkvFKjPZJpeFJnudKivdKlPBJqd9LgP9Kh/lKnOxKl+5KkvFKnelLgf5JpONJqd9Lgf5Km+pJoOZRkfhKmupLkfJKpONKkfFKjPVJn+dJp+FPkPdKmupLh/hKlu5NlPFKk/BLhfpKnuhLnelLl+5JlPBKnOlKmOxKmupKl+xIqt1JpONLjPZKmOtLgP9Mk/JKj/FJqN9LgP9Mgf/x/LEKAAAAQXRSTlMABgvyD/Ly8hYa8hPy8vLy8vLy8vLgR9DBXOHS0sJt5yLnbVjOw9LHINLCbjLTw8NBXq2N79++tqGXe7A44uJmUUi78aEAAAL5SURBVFjD7djrVtNAFAVgMoyaWEWlSEEuKhQRrQItrW3Fy/s/lXNrd+jJzmmC/pKdX7BYX/Y6GWbSbjykebK6636mpuO6V1fdztroPKS+DjfLOrwq675KXw/7X0J6KRchH1IOSjlMOZ+eOl7X7XBzc/O5y/b245QnMS9DnsW8WKYb881CZ73NmbOJDhx6F3qm6dmJkxvq3RRMhtjZ2VYZ35Y49GSjenqu1biLeb2l62Qwh9GWuv+Vt4GvrXfdFXHj9Uo82B6H3mDJRNzE6tJe4K8UPeKye8Iz1txEvJUOXOhZCYe+1pLBYH6aVJ2N3Dq8Th8e71+77N/JacyuQXUxcrPAF2OX+rxYTe7T6XSstYY2X+KPpL7Ex4WMwGlz6/AavbcUJV5TPQMedLlkEs7mAtxbtLkLeajAr3ZXc+Uy0JtzPeH54JLsMlMbcNYcuFwyCc+LC7oPjIzcGT0NnOgJz/MB32XOMfRyc+A1es/b+S3ZByKuNydLpuftfHBTrQOnzZ8KvRaHDlysReA1ej+s6cGN3MOAY+hoXsbp2Pve7tySHTLhtc25nvABP5j05lzvO9tlSI+O4/rmb5wtxx6zwIvZ+P0yb5GDueHNgUsdeOA/+rxD3E9FYa1Rm3M9zDwlDxH7ot5cjh047KjnYkdXmjP9R3KAy+MiU5pzfZagfJGKU1Rrzse+Nz9Z5HPM8TKnbCpovkN0/V1mHHDY0IG31i+NT+VJBHyHj53rCa8+iYATXXtBBS5PIoE31st4TXM2dkW/VN9bjrzd7qFOlebG/tppre96mzRP1b9Db7ZkRkZ9P7cdRWdjH4ktUXyy8Prv2VEpX0M+xZzF7N3NZDIZXQWbN0+4DftSQZOvpCO2W0UHT2HQsPH/KXHogZdQ2UQ8jeLVNvTA4wbSE3RtcVRPOm7APQR2cKSNtQ6ehNC0OCZjkm/Wh2EHpf7LM9MsqA2aVUf7JnKwNT3w6QbZOqxOy9H8/a8t8QcN5Q1Nht/+0vLv4PY3eMh/kT8lP55CJQaEnwAAAABJRU5ErkJggg==" alt="">
              </span>
              <span style="margin-top: 1rem; text-align: left; border-right: 1px solid rgb(193, 192, 192); box-sizing: border-box;color: #575757;font-size: 0.875rem"">提现</span>
            </p>
            </div>
          </div>
        </div>
      </div>
      <div class="hb_box" v-if="hongbao" @click="hongbaoAction">
        <i class="icon icon-redpack-2 icon--large"></i>
      </div>

      <div class="show-ying-kui">
          <template v-for="data in user_count">
            <p>{{ data.text1 }} : {{data.note}}{{ data.text2 }}</p>
          </template>
      </div>
          <div class="account-nav-wrapper">
            <!--这里是转换金额弹窗-->
            <transition name="bounce2">
              <div class="promptbox-wrapper promptbox-transfer-money" v-show="change">
                <!-- :style="{background: $store.state.basic.main_color,borderTop: $store.state.basic.main_color,borderBottom:$store.state.basic.main_color} -->
                <section class="promptbox" :style="{borderColor:$store.state.basic.main_color}">
                  <div class="prompt-head" :style="{backgroundColor:$store.state.basic.main_color}">额度转换</div> 
                  <div class="prompt-body">
                      <!-- <ul class="nostyle account-sub-nav kd-row-middle">
                        <li :class="!inout? 'active':''" @click="inout = false">
                          <a>转入</a>
                        </li> 
                        <li :class="inout? 'active':''" @click="inout = true">
                          <a>转出</a>
                        </li>
                      </ul>  -->
                    <tab style="margin-bottom:1rem;font-size:20px;" :active-color="$store.state.basic.main_color">
                      <tab-item :selected="!inout" @on-item-click="inout = false">转入(上分)</tab-item>
                      <tab-item :selected="inout" @on-item-click="inout = true">转出(下分)</tab-item>
                    </tab>
                    <div class="kd-field">
                      <label class="kd-field-title">平台</label> 
                      <div class="kd-select">
                        <template  v-if="api_data.length" >
                          <span class="value"> {{api_data[api_sel] ?　api_data[api_sel]['name']:'请选择平台'}}</span> 
                          <select v-model="api_sel" >
                            <option value=""> 请选择平台 </option>
                            <option :value="key" v-for="(vo,key) in api_data"  :key="key">{{vo.name}}</option> 
                          </select>
                        </template>
                        <span class="value" v-else>加载中..</span> 
                      </div>
                    </div>
                    <!--加载显示余额的地方-->
                    <div class="kd-field" v-if="api_sel !== ''">
                      <label class="kd-field-title"> {{api_data[api_sel]['name']}}余额：{{viw_money}}</label>
                    </div>
                    <div class="kd-field">
                      <label for="transfer-money" class="kd-field-title">转换金额</label> 
                      <div class="kd-textinput number">
                        <input type="number" onfocus="this.select()" id="transfer-money" @blur="checkCoin()" v-model.trim="coin" placeholder="请输入转换金额">
                      </div>
                    </div>
                  </div> 
                  <div class="prompt-foot" @click="apiInOut()">
                    <div type="button" class="kd-button" :style="{backgroundColor:$store.state.basic.main_color,borderColor:$store.state.basic.main_color}">确定 <button type="button">Button</button></div>
                  </div> <a class="prompt-close kd-close" @click="change = false">close</a>
                </section> <div class="promptbox-overlay"></div>
              </div>
            </transition>

              <ul class="nostyle kd-row account-nav ">
                <!--<li>-->
                  <!--<a href="javascript:;" @click="Jump_friend_list">-->
                    <!--<i class="icon" style="text-align:center;"><img src="@/assets/images/svg/friends.png" style="height:40px;width:40px;"></i>互动大厅-->
                  <!--</a>-->
                <!--</li>-->
                <li>
                  <a href="javascript:;" @click="$router.push({path:'/With'})">
                    <i class="icon" style="text-align:center;"><img src="@/assets/images/svg/hegou.png" style="height:40px;width:40px;"></i>合购大厅
                  </a>
                </li>
                <li v-for="(item,key) in menu" :key="key">
                    <a href="javascript:;" @click="targetHref((item.href ? item.href : item.target))">
                      <i :class="['icon',item.class]"></i>{{ item.text }}
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;" @click="appDown">
                      <i class="icon" style="text-align:center;"><img src="@/assets/images/svg/APP.svg" style="height:40px;width:40px;"></i>APP下载
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;" @click="loginOut">
                      <i class="icon icon-account-logout"></i>安全退出
                    </a>
                  </li>
              </ul>
          </div>
      </main>
      <group>
        <x-dialog v-model="app_show" class="dialog-demo" hide-on-blur>
          <div style="margin:10px 0;">

            <x-button mini action-type="button" @click.native="chgApp(1)" type="primary">{{app_type == 'android' ? '切换苹果':'切换安卓' }}</x-button>
            <x-button mini action-type="button" type="warn" @click.native="chgApp(2)" >前往下载</x-button>
            <!-- <x-button mini type="warn">Delete</x-button> -->
            <div style="margin-bottom:5px;color:#555;font-size:14px;padding:6px 0;">{{app_type == 'android' ? '安卓':'苹果' }}app下载二维码</div>

            <qrcode :value="app_type == 'android' ? app_line['apk']:app_line['ipa'] " type="img"></qrcode>
          </div>
        </x-dialog>
      </group>
  </div>
</template>

<script>

import { Group,Actionsheet,XSwitch,XDialog,Qrcode,XButton,Tab,TabItem } from 'vux';
export default{
  mounted(){
    this.getInfo();
    //判断是什么手机登录
    this.judge();
    var path = this.$route.query.path;
    if(path && path == 'change')
    {
      this.change = 1;
    }
    else
    {
      this.change = 0;
    }
    this.deg = Math.floor(Math.random()*1000);
    // let _this = this;
    // _this.$store.state.title = '我的地盘';
  },
  components:{
    Qrcode,Group,Actionsheet,XSwitch,XDialog,XButton,Tab,TabItem
  },
  data () {
    return {
      //棋牌游戏内容
      api_data:[],
      mingxi:false,
      //选择的游戏,
      api_sel:'',
      //转入还是转出 false是转入游戏 true是从游戏转出
      inout:false,
      //金额转换
      change:false,
      //需要转换的金额
      coin:0,
      //显示厂商余额
      viw_money:0,
      //app下载弹窗
      app_show:false,
      //app下载地址
      app_line:{},
      //当前手机类型
      app_type:'',
      hongbao: 0,
      basic: { out_money: 0,ing: 0 },
      out_money:'0.00',
      user_count:[
        {text1:'今日盈亏',text2:'0.00',note:'￥'},
        {text1:'今日流水',text2:'0.00',note:'￥'},
      ],
      menu:[
        // {class:"my-friend",href:'/friend',text:'我的好友'},
        {class:"online-service",href:'goto_service',text:'在线客服'},
        {class:"icon-account-playing-record",href:'/My/record',text:'下注记录'},
        {class:"icon-account-balance-sheet",href:'/My/liquidity',text:'账户流水'},
        {class:"icon-shortcut-choujiang",href:'/My/lucky',text:'充值抽奖'},
        {class:"icon-account-promotion",href:'/My/promotion/',text:'代理推广'},
        {class:"icon-account-edit-profile",href:'/My/edit',text:'修改资料'},
        {class:"icon-account-bank-info",href:'/My/bank',text:'银行卡信息'},
        {class:"icon-account-messages-list ",href:'/My/messages',text:'信息中心'},
        // {class:"icon-account-game",href:'',text:'选择游戏',target:'1'},
        {class:"icon-account-chess",href:'/My/chess_record',text:'棋牌下注记录'},
        {class:"icon-account-change",href:'',text:'金额转换',target:'3'}
        // {class:"icon-account-setting",href:'/My/setting',text:'账户设置'},
        // {class:"icon-account-money-management",href:'/with',text:'合买大厅'},
      ]
    }
  },
  watch:{
    //获取游戏内容
    change(curVal,oldVal){
      let _this = this;
      if(_this.$store.state.user['type'] != 0){
        _this.change = false;
      }else if(curVal && !_this.api_data.length){
        _this.ApiGet();
      }
    },
    api_sel(now,old){
      if(now !== '' && this.api_data.length){
        this.ApiMoney(this.api_data[now]['list']);
      }
    },
  },
  methods: {
    //跳转至好友列表界面
    Jump_friend_list(){
      window.location.href = "#/my/chart/InteractiveCenter";
    },
    //游戏金额的转入转出
    apiInOut(){
      let _this = this;
      if(!_this.api_data.length || _this.api_data == ''){return;}
      // _this.$messagebox('', 123);
      if(_this.coin <= 0){
        _this.$total({ message:'金额错误',type: 0 });
        return;
      }else if(_this.api_sel === ''){
        _this.$total({ message:'请选择游戏平台',type: 0 });
        return;
      }
      let is_data = {
        's' : (_this.inout ? 3 :2),
        'list': _this.api_data[_this.api_sel]['list'],
        'money': _this.coin
      };
      _this.$getData({
        loading:true,
        url:'/api/home/api_game_config/gameInOut',
        data:is_data,
        callback:function(res){
          if(res['code'] > 0){
            _this.$total({ message:'操作成功',type: 1 });
            if(_this.inout){
              _this.user[3].text2 = (parseFloat(_this.user[3].text2) + parseFloat(_this.coin)).toFixed(2);
            }else{
              _this.user[3].text2 = (parseFloat(_this.user[3].text2) - parseFloat(_this.coin)).toFixed(2);
            }
            // console.log(_this.user[3].text2);
            // console.log(_this.coin);
            _this.coin = 0;
          }else{
            _this.$total({ message:res.msg,type: 0 });
          }
        }
      });
    },
    //查询游戏内部余额
    ApiMoney(list = ''){
      // console.log(list);
      if(list === ''){return;}
      let _this = this;
      _this.viw_money = '加载中...';
      // console.log('查询api');
      _this.$getData({
        url:'/api/home/api_game_config/queryDownMoney',
        data:{list:list},
        callback:function(res){
          if(res.code == 1){
            _this.viw_money = res.data;
          }else{
            _this.viw_money = 0;
          }
        }
      });
    },
    //查询游戏API
    ApiGet(){
      let _this = this;
      _this.$getData({
        url:'/api/home/Lottery/getLotteryListApi',
        data:{type:-1},
        callback:function(res){
          if(res){
            _this.$set(_this,'api_data',res);
          }
        }
      });
    },
    hongbaoAction(){
      let _this = this;
      if(_this.hongbao){
        _this.$getData({
          url:'/api/Home/My/getUserHongbao',
          callback: (res) => {
            _this.$messagebox('', res.msg);
            _this.$set(_this,'hongbao',res.data);
          }
        });
      }
    },
    checkCoin(){
      if(this.coin === '' || this.coin === null){ 
        this.coin = 0; 
      }else{
        this.coin = parseFloat(this.coin).toFixed(2);
      }
    },
    //app下载切换
    chgApp(type = 1){
      let _this = this;
      if(type == 1){
        if(_this.app_type == 'window'){
          return false;
        }else if(_this.app_type == 'android'){
          _this.app_type = 'iphone';
        }else{
          _this.app_type = 'android';
        }
      }else{
        let link = _this.app_type == 'android' ? _this.app_line['apk']:_this.app_line['ipa'];
        // console.log(link.indexOf('http'));
        if(link.indexOf('http') > -1){
          // console.log(link);
          location.href = link;
        }else{
          // console.log(link);
          location.href = '//' + link;
        }
      }
    },
    //个人中心初始化数据
    getInfo(){
      let _this = this;
      // console.log(_this.$store.state.user['level']);return;
      this.$getData({
        url:'/api/Home/My/getBasic',
        callback: function(data){
          if(data){
            _this.out_money = data.out_money;
            _this.user_count[0].text2 = data.win;     //今日盈亏
            _this.user_count[1].text2 = data.water;   //今日流水
            _this.$set(_this,'hongbao',data.hongbao);
            if(data.msg == 1){
              _this.menu[9].class = "icon-account-messages-list has-message";
            }
            if(data.jump){
              _this.$set(_this,'app_line',data.jump);
            }
            //console.log(_this.user[1].level);
          }
        }
      });
    },
    //判断用户安卓苹果pc,预留
    judge(){
      let agent = navigator.userAgent.toLowerCase(),_this = this;
      if(agent.indexOf("android") > -1){
        _this.app_type = 'android';
      }else if(agent.indexOf("iphone") > -1){
        _this.app_type = 'iphone';
      }else if(agent.indexOf("ipad") > -1){
        _this.app_type = 'ipad';
      }else{
        _this.app_type = 'window';
      }
      // return type;
    },
    //app下载
    appDown(){
      let _this = this;
      if(_this.app_type == '' || !Object.keys(_this.app_line).length){
        _this.$total({ message:'暂未开放',type: 2});
      }else if( (_this.app_type == 'iphone' || _this.app_type == 'ipad') && _this.app_line['ipa'] == '' ){
        _this.$total({ message:'暂未苹果下载地址,敬请期待！',type: 2});
      }else if( _this.app_type == 'android' && _this.app_line['apk'] == '' ){
        _this.$total({ message:'暂未安卓下载地址,敬请期待！',type: 2});
      }else if( _this.app_type == 'window' ){
        _this.$total({ message:'请用手机登录查看二维码',type: 2});
      }else{
        _this.app_show = !_this.app_show;
      }
    },
    loginOut(){
      let _this = this;
      // this.$router.push('/in');
      _this.$getData({
        loading: true,
        url:'/api/home/in/loginOut',
        callback:function(res){
          if(res.code){
            localStorage.removeItem('pragma');
            _this.$store.state.login = false;
            _this.$store.state.user = false;
            // _this.$store.state.basic.main_color = '';
            if(_this.$route.path.indexOf('My') > -1 || _this.$route.path.indexOf('Capital') > -1){
              _this.$router.push('/in');
            }
          }
          _this.$total({ message:res.msg,type: res.code });
        }
      });
    },
    targetHref(type){
      if(type == 'goto_service')
      {
        let _this = this;
        // _this.$store.state.service = !_this.$store.state.service;
        _this.$getData({
          url:'/api/home/in/onlineService',
          data:{type:2},
          type:'post',
          callback:function(res){
            if(res){
              window.location.href = res.online.online_service;
            }
          }
        });
      }
      else
      {
        let _this = this;
        if(type == 1){
          _this.$store.commit('setData',{ key:'trade',value: true });
        }else if(type == 2){
          _this.$getData({ //签到
            url:'/api/home/my/sign',
            data:'',
            callback:function(res){
              // console.log(res);
              _this.$toast(res.msg);
              if(res.code == 0){
                _this.$router.push('/in');
              }
            }
          });
        }else if(type == 3){
          _this.change = true;
        }else if(type == 4){
          _this.$total({ message:'暂时关闭',type: 2 });
        }else{
          if(type == '/My/promotion/'){
            if(_this.$store.state.user.type != 0){
              _this.$total({ message:'请先注册为有效会员',type: 2 });
              return false;
            }
          }
          _this.$router.push(type);
        }
      }
    },
  }
}
</script>
<style  scoped>
  .my-friend{
    display: block;
   margin: 0 auto;
    width: 40px;
    height: 40px;
    background: url('../../assets/images/a_icon/hud.png') no-repeat 100%;
    background-size: 40px 40px;
  }
  .online-service
  {
    display: block;
    margin: 0 auto;
    width: 40px;
    height: 40px;
    background: url('../../assets/images/a_icon/zxkf.png') no-repeat 100%;
    background-size: 40px 40px;
  }
  .show-ying-kui{
    margin-top: 9.875rem;
    background: white;
    width: 100%;
    border-top: none;
    margin-bottom: 10px;
    padding: 8px 10px;
    border-radius: 12px;
  }
  .show-ying-kui>p{
    margin-bottom: 3px;
    padding-top: 3px;
    padding-bottom: 3px;
    font-size: 14px;
  }
.show-ming-xi{
  width: 100%;
  background: rgba(0, 0, 0, 0.49);
  z-index: 99;
  height: 100%;
  border: 15px;
  position: fixed;
  top: 0px;
  left: 0;
}
.show-ming-xi-content{
  width: 70%;
  height: 100px;
  position: absolute;
  top: 40%;
  left: 15%;
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 2px 2px black;
  color: #444;
  padding: 6px 10px;
}
.show-ming-xi-content>p{
  margin-bottom: 3px;
  border-bottom: 1px solid #eee;
  padding-bottom: 3px;
  padding-top: 3px;
}
.show-ming-xi-content>img{
  position: absolute;
  top: 5px;
  right: 15px;
}
.xiang-xia-jump{
  animation: tiaodong 0.8s linear infinite;
}
@keyframes tiaodong {
  0% {
    transform:translateY(0px);
  }
  50% {
    transform:translateY(8px);
  }
  100% {
    transform:translateY(0px)
  }
}


.lds-hourglass{
  animation:lds-hourglass 1.2s
}
@keyframes lds-hourglass {
  0% {
    transform:rotate(0);
    animation-timing-function:cubic-bezier(.55,.055,.675,.19)
  }
  50% {
    transform:rotate(360deg);
    animation-timing-function:cubic-bezier(.215,.61,.355,1)
  }
  100% {
    transform:rotate(1080deg)
  }
}
  .kd-body{
    padding-top: 0 !important;
  }
  .show-head-at-this-page{
    width: 100%;
    max-width: 640px;
    background: red;
    height: 9rem;
    position: fixed;
    z-index: 8;
    color: white;
  }
  .details_right{
    margin-left: 3%;
    float: left;
  }
  .details_right h3{
    height: 2rem;
    line-height: 2rem;
    /*margin-top: 1.2rem;*/
    font-size: 1rem;
    text-align: left;
    color: #fff;
  }
  .details_right p span {
    display: block;
    line-height: 2rem;
    float: left;
    margin-left: 0.6rem;
    position: relative;
    color: #fff;
    font-size: 1.1rem;
  }
  .details_left{
    float: left;
    margin-left: 5%;
  }
  .details_left img {
    vertical-align: top;
    width: 6.8rem;
    /*margin-top: 1rem;*/
    border-radius: 50%;
  }
  .qiandaoing{
    margin-top: 0.7rem;
    z-index: 99;
    height: 2.2rem;
    background: #fff;
    font-size: 2.2rem;
    float: right !important;
    border-radius: 20px 0 0 20px;
    padding-right: 0.8rem;
    color: #fbb531;
  }
  .tab{
    background: #fff;
    display: flex;
    font-size: 1.6rem;
    position: absolute;
    width: 100%;
    border-radius: 6px;
  }
  .tabcontent{
    width: 50%;
    text-align: center;
    position: relative;
    height: 3rem;
  }
  .tabcontent img{
    width: 3rem;
    float: right;
    margin-top: 0.4125rem;
  }
  .tabcontent p{
    overflow: hidden;
  }
  .tabcontent span{
    float: left;
    width: 50%;
  }
  /* .dialog-demo{
    width: 50% ;
  } */
  .hb_box {
    position: fixed;
    right: 10px;
    top: 50%;
    z-index: 100;
  }
  .icon-redpack-2:before{
    width: 4.5rem;
    height: 4.5rem;
  }
  .user_basic{
    padding: 0 .3125rem;
    font-size: .875rem;
    border: 1px solid #c1d5ff;
    border-top-width: 0;
    border-left-width: 0;
    height: 40px;
    line-height: 40px;
    text-align: left;
    word-wrap: break-word;
    word-break: break-all;
  }
  @media screen and (max-width: 600px) {
    .account{
      background-color:#ebf3f3;
    }
  }
  .account-sub-nav{
    /* margin: 0; */
    border:none;
  }
  .account-sub-nav li{
    width:50%;
  }
</style>

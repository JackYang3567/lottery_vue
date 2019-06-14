<template>
  <div id="app">
    <template v-if="data.length>0">
        <div class="the-div">
            <div class="every-one-div" v-for="(item1,key) in data">
                <div :class="'kd-game-logo for-img ' + lotteryLocal['key' + item1.type].class" @click="$router.push('/' + lotteryLocal['key' + item1.type].path + '/' + item1.type);">
                    <img v-if="lotteryLocal['key' + item1.type].img" :src="lotteryLocal['key' + item1.type].img" alt="blank" data_ast="01">
                    <img v-else src="../../../assets/images/blank.gif" alt="blank">
                    <i :class="'icon icon-' + lotteryLocal['key' + item1.type].class1"></i>
                </div>
                <div class="show-every-info">
                    <p @click="$router.push('/' + lotteryLocal['key' + item1.type].path + '/' + item1.type);">{{item1.name}}</p>
                    <div class="show-delete-icon" @click="confirmDel(item1.type)"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACi0lEQVQ4T4VTPWgUQRT+3uztuYIaEKPgb4ibS+52EY2dIlhY2PhbKKRQiwgJaHoFFQPGxkIQjKJgLBS0UPCn0EYstBETJTu7l3M5FRFFQQyRu1lyN0/m2AuXFDrdzPfme99733uEBcd13bXZbPawEGIPgM0pPAHgKYB7QRB8af1CzYvneUsA3AZwgIjm3luDmZkBPARwVEr5x2CNQNd1FzmO8wrAVgBVZh4losvNbN3d3Utt294P4AqANgBvlVLb4zhOGgS+748CGGDmWGu9K4qizwtLM/eenp4Oy7KeEVEOwPUgCAbI87z1AD4SUaK13hSGYZzP57uI6CQRtRFRh9Z6FsCtMAzvuK7b7jjOODOv1lp3ku/7FwCcZuZhKeW5tIn9lmW9mJycfJkq3MnMffV6/VKxWCx5ntdPRDcAjBgF40S0pV6v56Io+pDL5dbYtj1IRD+YuZ2Zp4jI0VqbmJFSqfQ1VWHwCUMwDSArpVzc4sh5rXVIRCsB5Jk5ATATRdHZZozv+78AiCbBrJRyRQs4pJQay2QyyzOZzI5KpfLIcZwjYRgaFxrH9/3fzEyNEszAJEmyKo7jnyk4j6BarYbZbHZfU4FpsmVZJWZ+Z5o4AuAUMx+XUt40BIVCoY+Z32itv9u2PZAkSWTb9rIwDO8a3PO8YSI6A+Biw0YiKgP4ppTqTVUY4iFmrgDYSEQzQRCYRJxmf2/6xsydjUEqFApXhRCDAKZqtdruYrH46R+D9JyIugBcC4JgsHWUXwPoBTCttT6hlHpcLpeNQ8jn8xuEEENEZJIYt8aVUtvmRjmtyyzTGICD/1mmBwCOzVumVrm+76/TWh8SQuxl5kJj44gCrfUTIcT9hev8F+RiOfEouhf5AAAAAElFTkSuQmCC" /> </div>
                </div>
            </div>
        </div>
    </template>
    <template v-else>
        <div style="width: 100%;text-align: center;margin-top: 100%;">
           <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAgCAYAAACYTcH3AAAEeElEQVRYR+2YW2icVRDH/7PfhmCKJV6oVNRsFCpeH6wVtfogWkURKtWmCCLxUiPYom6+b+YLvuRBsjnni4muVk1bLSKCpFK00gfbWpCKfait4KW2Vkq8IdRbKhRW1nwjJ+6G3c1udpONbx7Yl52Z//ntnDNzhiU0uay1PoAIwD5mvrUZOaoWHEXRIlX9WlU9z/NW+b5/pNYmxpiniGhEVT8RkZW1/FSVrLVbiOgRAOuZeWulb02YOI6PE9FSABOJROI23/cPVdvIGLOBiF5U1c9E5JpqPqOjoy0TExNvE9Gagr2HmTc3BOOcoijqVNWPAFwI4DSAO5l5f6WAMeZxInoFwFFmvqzSPjw8fEY+n99FRLc4m6puFJGXqkFXzUzR0RhzPhHtAXA5gL+IaF0QBO+VCllrHwWwBcB3zJwqtRljzgSwl4iu+5dDHxKRN2od5awwLmhkZKQ9n8/vBbBcVWMiWsHMh4uC1tpuANsAnGTm8ypg9hPRTar6N4B1IrJjtgteF6ZwZIviON5NRMsBrCo9rsHBwSuI6ID7MPMdFVlzWb0BwBpm3l2v0hqCcSKZTOas1tbWtnQ6/VOlaBRFSzo6On7r6uqaLLUNDAyc42J6e3t/qAfi7A3DNCLWrM+sMC4bnudtAnD/PDZyWfq4GOfuTSKReCEIgvfndYGttVkAG+cBUivkdDKZvCidTv8+p9I2xlxARCcAtADYrKo/zxHqy0Qi8WsxJo7jbUSUUtXnReTpOcFYa10/eBDAYWZ2VdTUstauBTAGIK+qF4vIj5WCVe+MMeZSAEeIKEFENwZBcKApkkKwMca1gOsBvM7M7o0qW1VhrLXvAlitqjtE5N6FAHEa1lr3dh1yzdN1dRE5Vqo9A8YYcy0RHXTpnJycXNbX1ze+UDAFIHdUa1X1HRFxRze9ZsBYa105rpztojUDl8lkUp7nfeMKI47jq8Mw/KKoVwZjrb0dwAcA/kwmk521SrAZGBdrjHmOiNKqukdE3J5TqwzGGPM5EV0Vx3FvGIbDzW5aKz6bzS7O5XLuiVgcx/HNYRhONcdpmGLpqep4e3v7sp6envx/BVO4O67XDKvqpyKyYhpmbGzMGx8fPw7ADVQflrbxGkCTnudt933/aKW9oPWYqpaNEzPKmKhFVcNC+7jHzUlTmRkaGuqI43iuVXOQmd3QVLaMMfcR0fY5ZnUTM28og1HVPwC492jWRURPqmqbqi4Jw/BUqbO19jUAD6vqWwC+nU2oMB/draovi8gTlTAnROSSejDGmGeJ6BlV3eV5Xrfv+1NvUPF7Nw+nUqkrK+ebSt0oinpU9dWmYLLZbGsul9sJwJXlpKq6KuwAcLbrsER0VxAEJ+v9qAWBcZv09/cn2traulX1gcKm3xPRviAI3iQirQfi7AsG08hm9Xz+h6mVoaqZKbTnU6r6S2dn59J6VVAv/Y3ajTFCRINuumBmmX4OjDHHiGiZqn5FRNPjYqPC8/Rzg1arqq4WkZ2lb5P7B8ENVefOU3i+YVuZeb0L/gdc4FU/+4VvTQAAAABJRU5ErkJggg==">
           <p style="color: #8a8a8a;margin-top: 15px;">里面什么也没有</p>
        </div>
    </template>

      <div class="delete-div" v-if="show_confirm_del">
          <div class="show-confirm-delete">
              <div class="guanbi-btn" @click="guanbi()">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACRElEQVQ4T31TPWgUQRh9b8OdjTaCWIiKza23M0VEUygiVoEk/qMWIv4bBRt/EGMhoqAo4l8bUCGFoJAYUZJgG4hF/IWZ2RzYaGMj1wXEu51P5tgLyykZ2IF5O9+b9828R3QMpdRyAEcA9JFcIiK/ALj8e2etrRdLWFxorU+IyEOSnwHMeO8/hf8kN5LcDKAbwEVjzNN23QKBUuoOyUEAJ40xrzqVhbXWei+AJwAeG2NutMjDpJS6QvJSlmU9aZp+/19xG6tWq2u7urpmsywbTNN0nEqppQB+AjhgrZ3SWl8XkQlr7WyRSCnVA2CXtfaaUmorydF6vb6OWuuzAE4ZYzblarpJjnnvdzrnbMCSJFFRFL0RkX3W2i/5vkkRGQ8Eod8ZY8y99ol5wSjJ/oB570PxwTZhTnCB5LZA8DXLsqtpmk4UJeckIwFrNBqHarVarePFBkTkVovAez/knJssbojjOC6VSs+DgEajcbiToFqt9kdRdLvVgvd+2jn3oNgCyZfNZnOHiPwpl8uvvfdHiy1orS8D2MIkSc6Q3GOt7SteGIABY0wasEqlsqpcLo9774+1SbTWH0RkmHEcLyuVSt+89/udc9PhGZvN5tu5ubmPHT2vBLDdGPNCa90rIqPz8/OrW0ZKkmR3FEXDItJjrf2xmJGUUmtIhtPvW2vvFq18E8A5kqeNMWOLWTlIt9YOLVi5cHnHST4KYRKR9yRbbgzKQphEZIOInHfOPfsnTG0gj3NviAiA9SRXiMhvAFMARjrj/BepWB+8FoE0CAAAAABJRU5ErkJggg==">
              </div>
              <p style="height: 40px;line-height: 40px;font-size: 1rem;">
                  您确定要移除收藏吗？
              </p>
              <div style="width: 100%;height: 40px;line-height: 40px;text-align: center;">
                  <p style="width: 3rem;display: inline-block;border-radius: 5px;background: #0aac34;height: 20px;line-height: 20px;font-size: 1rem;color: white;margin-right: 10px;" @click="delCollection()">移除</p>
                  <p style="width: 3rem;display: inline-block;border-radius: 5px;background: rgba(0,0,0,0.58);height: 20px;line-height: 20px;font-size: 1rem;color: white;" @click="guanbi()">取消</p>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
  export default{
    mounted(){
      this.getInfo();
    },
    data(){
      return {
        data:[],
       /* 
       lotteryLocal: {
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
              key59: {class:'game-demo',path:'game-hlsb',class1:'',img:require('../../../assets/images/cptb/hltb.png')},
              key60: {class:'game-demo',path:'game-s',path_gf:'game-s-gf',class1:'',img:require('../../../assets/images/cptb/qqffc.png')},
          },
          */
        show_confirm_del:false,
        delType:'',
      }
    },

    methods:{
        delCollection(){
            var _this = this;
            this.$getData({
                type:'post',
                url:'/api/Home/My/delCollection',
                data: { type:_this.delType},
                callback: function(data){
                    if(data == 1)
                    {
                        _this.getInfo();
                        _this.show_confirm_del = false;
                    }
                }
            });
        },
        guanbi(){
            this.show_confirm_del = false;
            this.delType = '';
        },
        confirmDel(type){
            this.delType = type;
            this.show_confirm_del = true;
        },
      getInfo(){
          let _this = this;
          this.$getData({
              url:'/api/Home/My/getCollection',
              callback: function(data){
                  if(data){
                      _this.data = data;
                  }
              }
            });
        },
    },
  }
</script>
<style scoped>
    .guanbi-btn{
        height: 20px;
        text-align: right;
        padding-right: 10px;
        padding-top: 5px;
    }
    .delete-div{
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        text-align: center;
        background: rgba(0, 0, 0, 0.39);
        z-index: 6;
    }
    .show-confirm-delete{
        width: 70%;
        margin-top: 50%;
        margin-left: 15%;
        height: 100px;
        background: white;
        border-radius: 10px;
        z-index: 7;
    }
    .kd-game-logo{
        margin: 10px;
        border: none;
        width: 50px;
    }
    .the-div{
        overflow-x:hidden;
        width: 100%;
        padding: 0 2% 50px 2%;
        list-style: none;
        background: #ebf3f3 !important;
    }
    .every-one-div{
        background: white;
        margin-top: 10px;
        width: 100%;
        display: flex;
        height: 60px;
    }
    .show-every-info{
        width: 100%;
        padding-left: 10px;
    }
    .show-every-info>p{
        font-size: 0.875rem;
        margin-top: 25px;
        width: 100%;
    }
    .show-delete-icon{
        width: auto;
        position: relative;
        top: -30px;
        left: 80%;
        z-index: 5;
    }
</style>

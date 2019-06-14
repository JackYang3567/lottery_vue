<template>
    <div style="width: 100%;height: 100%;">
        <div class="for-findCentre-head">
            发现
        </div>
        <div class="for-findCentre-body">
            <img src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAKAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1NzcyREMwODRGOTAxMUU5QkEwMEJBNTBFRjEzRkNCQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1NzcyREMwOTRGOTAxMUU5QkEwMEJBNTBFRjEzRkNCQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU3NzJEQzA2NEY5MDExRTlCQTAwQkE1MEVGMTNGQ0JDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU3NzJEQzA3NEY5MDExRTlCQTAwQkE1MEVGMTNGQ0JDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAFBAQGRIZJxcXJzImHyYyLiYmJiYuPjU1NTU1PkRBQUFBQUFERERERERERERERERERERERERERERERERERERERAEVGRkgHCAmGBgmNiYgJjZENisrNkREREI1QkRERERERERERERERERERERERERERERERERERERERERERERERERE/8AAEQgBRQLuAwEiAAIRAQMRAf/EAHEAAQEBAQEBAAAAAAAAAAAAAAABAgMEBQEBAQADAQEAAAAAAAAAAAAAAAECAwQFBhABAQEBAAICAgIDAAAAAAAAAAECERIDITFBIlFhMkIEEQEBAAICAgICAwAAAAAAAAAAARECMQMhEkFxYTKBIkL/2gAMAwEAAhEDEQA/APEio6n0IAAAqAAACgAIgqKAAKIAogYFEDAogCiCiiAioAACgAqAgCoCoAKAgqACoAKCKigAIAKAAACoAAgCgAqAAACgAIAKIAAAqAAACgAIAKIAAAoACACgAAAI7gPId4AAAqAAACgAIAigAAAqAAACgAACCKIKKIAqAoACACgIKgAAAoAKgAAiiiACACgAAAqAAIAoAKgAAAoACCKKIAAAqAAACgAIAKIAAAoACACgAALMr4xh7zhfWuoDy3aAAAKgAAAAAqCKigAAAqAAACgAIIqKAAACoAAAKAAiAKACgAIAKAAAIoACACgAAAqAAIAoAKgAAAoACCKKIAAAqAAACgAIAKIAAAoACAsnWpOMNt5PtlNcpM/yvOKNF2t5bJJABFdEVHI3gAACoAAAKAAgiooAAAKgAAAoACCKigAAAqAAACgAIgCgAoACACgAAiiogAACgAAAqAAIAoAKgAAAoACAIoAAAKgAAAoACACiAAAKDUz/ACsitG+/xqz11+aANTYAKgADoio5G8AAAVAAABQAEEVFAAABUAAAFAAQRUUAAAFQAAAUABEAUAFAAQAUAAARUAAAFAAABUAAQBQAVAAABQAEEUUQAABUAAAFAAQAUQABrM/KSdbauzbH9Yz1nyANDYAKACoAA6IqORvAAAFQAAAUABBFRQAAAVAAABQAEEBQAAAVAAABQAEQBQAUABABQAABFAAQAUAAAFQAAQFABUAAAFAAQAUQAABUAAAFAAQAUQGsxLcTKyZak4Kjkzny3AAACgAqAAOiKjkbwAAAQAUAAAFQRUUAAAFQAAAUABEFRQAAAVAAABQAEQBQAUABABQAARUVAAABQAAAVAAEAUAFQAAAUABBFFEAAAVAAABQAEAFEdMz4YdGntvjDPSfIio0NoAqACgAqAAOiKjkbwAAAQAUAAAFQRUUAAAFQAAAUABBFRQAAAVAAABQAEQBQAUABABQAABFQAAAUAAAFQABBUUAFQAAAUABABRAAAFQAAAUABBFFDP26MZbc3Z+zbpwIqNbMAVABQAVAAHRHo9vq7+2XncOu02mY3S5AGagCoAAAKAAgiooAAAKgAAAoACCKigAAAqAAACgAIgCgAoACACgAAAqIAAAoACACgACAKACoAAAKAAgiiiAAAKgAAAoACACi5bYy25ez9m7XgRUYMgBUAFABUAAfRcPd6+ftHdXja7XW5jOXDwDp7fX4X+nN2yyzMZgDIAAAFAAQRUUAAAFQAAAUABBFRQAAAVAAABQAEQBQAUAAAFQAARUVAAABQAAAVAAEAUAFQAAAUABAEUAAAFQAAAUABABRctueft0c3Z+zbpwIqNbMAVABQAVAAH0QV4bJnWfKceOzxvK9zj78d/aN3Vti+t4qyvMA7GYAAAAAqCKigAAAqAAACgAIIqKAAACoAAAKAAiAKACgAIAKAACKioAAAKAAACoAAgCgAqAAACgAIAKIAAAqAAACgAIAKDo5Ok+mntnFbNFQGhsAFQAUAFQAB9FUHhslLOzgA8W8+N4y9H/AEZ/2ed36be2srOeQBmoAoACCKigAAAqAAACgAIIqKAAACoAAAKAAiAKACgAIAKAACKioAAAKAAACoAAgqKACoAAAKAAgAogAACoAAAKAAgiiguays+GO0zMLLiuiKjkbwBUAFABUAAfRVB4bJQAZ9mfLNeJ73h1OWx09F5jLVAHSyAFAAQRUUAAAFQAAAUABEFRQAAAVAAABQAEQBQAUABABQAARUVAAABQAAAVAAEFRQAVAAABQAEAFEAAAVAAABQAEAFEABvNViXjo5t9cX7bdbmIAwZACgAqAAPoqg8NkoAEeT3Tmq9ceX3/AOTd0/t/C68uQDsZgAACoIqKAAACoAAAKAAgiooAAAKgAAAoIoIgCgAoAAAKgAAioqAAACgAAAqAAIAoAKgAAAoACACiAAAKgAAAoACACiAAN5rCy8Y7a+0wsuK2H2OVuAFABUAAfRVFeGyAAI8nuvdV63i3e21v6Z5tXVkB1swBQAEEVFAAABUAAAFAAQRUUAAAFQAAAUABEAUAFAAABUAAEVFAAQAUAAAFQABBUUAFQAAAUABBFFEAAAVAAABQAEAFEAAAUazeNObea09mv+oz1vwoDS2ACoAA+iA8NkoAM+zXjl4nb377eT8OLs6tca/bOADcoAoACCKigAAAqAAACgAIICgAAAqAAACgAIgCgAoACACgAAioqAAACgAAAqAAIAoAKgAAAoACACiAAAKgAAAoACACiAAAKAAjcvVc+8dJeuffT18zht12yAMGQAD6IK8NkMezfhP7aupmdryb3d3tbevT2v4WTLFvQHYzAFAAABUEVFAAABUAAAFAAQRUUAAAFQAAAUABEAUAFAAQAUAAEVFQAAAUAAAFQABAFABUAAAFAAQRUUAAAFQAAAUABAEUAAAFAAQJeAcjcvVc5eNy9c+2nr9Ns2yoDBk+imtTM7WN+6Z+vmvPrV1e15OnXdvN8RskXfsu6wDqkkmIyAGQAAAAAKgiooAAAKgAAAoACCKigAAAqAAACgAIgCgAoACACgAAiiogAACgAAAqAAIAoAKgAAAoACAIoAAAKgAAAoACACiAAAKAAgAoHeADcvVc2vJpvXi+OGybePy6io851AAACoAAAAAKgiooAAAKgAAAoACCKigAAAqAAACgAIgCgAoACACgAAiooACACgAAAqAAIKigAqAAACgAIAigAAAqAAACgAIAKIAAAoACACgAAAI9CKjyHeAAACACgAAAqCKigAAAqAAACgAIIqKAAACoAAAKAAiAKACgAIAKAAAIqAAACgAAAqAAIAoAKgAAAoACCKigAAAqAAACgAIAKIAAAoACACgAAAI7gPHdwAoAAAKiAAAKAAgAoHyACAqAAACgAIAKAAACogAACgAqAAACggAAKgAAAoACACggAAKgAAAoACACiAKAAgAAAoAKAAiAAAKAAgAoAAAKIAIAKP/Z" style="position: fixed;top: 50px;z-index: -1;width: 100%;max-width: 640px;">
            <div class="zhong-jiang-bang-dan">
                <img src="../../assets/images/find/lastWinner1.png" @click="$router.push({path:'/goucai?selected=1'})">
                <div class="show-winner-list">
                    <div class="show-winner-info" v-for="info in winnings">
                        <div style="width: 33%;height: 20px;line-height: 20px;text-align: center;">
                            {{info.username}}
                        </div>
                        <div style="width: 33%;height: 20px;line-height: 20px;text-align: center;">
                            喜中{{info.win}}元
                        </div>
                        <div style="width: 33%;height: 20px;line-height: 20px;text-align: center;">
                            {{info.name}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="show-kaijiang-and-zoushi-div" @click="show_xin_shou_jiao_cheng=!show_xin_shou_jiao_cheng">
                <img src="../../assets/images/find/xinshou.png">
            </div>

            <div class="show-kaijiang-and-zoushi-div">
                <div class="this-title">竞彩前线</div>
                <div style="width: 96%;display: flex;margin-top: 15px;margin-left: 2%;">
                    <div style="width: 50%;margin-right: 1%;" @click="$router.push({path:'/My/allCode'})">
                        <img src="../../assets/images/find/kaijiangxinxi.png">
                    </div>
                    <div style="width: 50%;" @click="$router.push({path:'/trend/6'})">
                        <img src="../../assets/images/find/zoushitu.png">
                    </div>
                </div>
            </div>

            <div class="show-kaijiang-and-zoushi-div">
                <div class="this-title">平台推荐</div>
                <div style="width: 96%;display: flex;margin-top: 15px;margin-left: 2%;">
                    <div style="width: 50%;margin-right: 1%;">
                        <img src="../../assets/images/find/yaoqinghaoyou.png">
                    </div>
                    <div style="width: 50%;margin-right: 1%;">
                        <img src="../../assets/images/find/yuebao.png">
                    </div>
                    <div style="width: 50%;">
                        <img src="../../assets/images/find/mianxijiebei.png">
                    </div>
                </div>
            </div>

            <div class="show-kaijiang-and-zoushi-div">
                <div class="this-title">咨询平台</div>
                <div style="width: 96%;display: flex;margin-top: 15px;margin-left: 2%;">
                    <div style="width: 50%;margin-right: 1%;">
                        <img src="../../assets/images/find/zixunzhongxin.png">
                    </div>
                    <div style="width: 50%;">
                        <img src="../../assets/images/find/bangzhuzhongxin.png">
                    </div>
                </div>
            </div>

            <div class="show-kaijiang-and-zoushi-div">
                <div class="this-title">彩票规则</div>
                <div style="width: 96%;display: flex;margin-top: 15px;margin-left: 2%;">
                    <div style="width: 50%;margin-right: 1%;">
                        <img src="../../assets/images/find/wanfaguize.png">
                    </div>
                    <div style="width: 50%;">
                        <img src="../../assets/images/find/xiangxisheding.png">
                    </div>
                </div>
            </div>

        </div>

        <div class="show-shade-at-this-page" v-if="show_xin_shou_jiao_cheng">
            <div class="xinshou-first-floor">
                <div class="show-xinshou-contemt">
                    <img src="../../assets/images/find/close.png" style="width: 10%;height: 10%;position: absolute;top: 4%;right: -2%;" @click="show_xin_shou_jiao_cheng=!show_xin_shou_jiao_cheng">
                    <div style="width: 80%;display: flex;position: absolute;top: 14%;margin-left: 10%;">
                        <div style="width: 33%;height: 30px;line-height: 30px;text-align: center;color: white;font-weight: bold;font-size: 18px;text-shadow:0px 3px 3px #000;">
                            <template v-if="selected1">
                                <span class="this-has-be-selected">
                                    <img src="../../assets/images/find/zhuce.png">
                                </span>
                            </template>
                            <template v-else>
                                <span style="width: 80px;display: inline-block;" @click="selected_nav(1)">注册</span>
                            </template>
                        </div>
                        <div style="width: 33%;height: 30px;line-height: 30px;text-align: center;color: white;font-weight: bold;font-size: 18px;text-shadow:0px 3px 3px #000;">
                            <template v-if="selected2">
                                <span class="this-has-be-selected">
                                    <img src="../../assets/images/find/chongzhi.png">
                                </span>
                            </template>
                            <template v-else>
                                <span style="width: 80px;display: inline-block;" @click="selected_nav(2)">充值</span>
                            </template>
                        </div>
                        <div style="width: 33%;height: 30px;line-height: 30px;text-align: center;color: white;font-weight: bold;font-size: 18px;text-shadow:0px 3px 3px #000;">
                            <template v-if="selected3">
                                <span class="this-has-be-selected">
                                    <img src="../../assets/images/find/liaotian.png">
                                </span>
                            </template>
                            <template v-else>
                                <span style="width: 80px;display: inline-block;" @click="selected_nav(3)">聊天</span>
                            </template>
                        </div>
                    </div>
                    <img src="../../assets/images/find/xinshou_content.png">
                    <div class="show-xinshou-tishi">
                        <mt-swipe :auto="5000">
                            <div is="mt-swipe-item" :key="index" v-for="(i,k,index) in show_img">
                                <img :src="$store.state.basic.static_path + i" style="width: 100%;">
                            </div>
                        </mt-swipe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "findCentre",
        mounted(){
           // this.getWinning();
           // this.xunHuanGetWinning();
            this.getXinShouJiaoCheng();
        },
        data(){
            return {
                winning:[],
                selected1:true,
                selected2:false,
                selected3:false,
                data:[],
                show_xin_shou_jiao_cheng:false,
                show_img:[],
            }
        },
        methods:{
            /*
            xunHuanGetWinning(){
                let _this = this;
                setTimeout(function(){
                    _this.getWinning();
                    _this.xunHuanGetWinning();
                },60000);
            },
            getWinning(){
                let _this = this;
                _this.$getData({
                    url:'/api/Home/home/getWinning',
                    callback: function(data){
                        _this.winning = data;
                    }
                });
            },
            */
            selected_nav(num)
            {
                this.selected1 = false;
                this.selected2 = false;
                this.selected3 = false;
                if(num == 1)
                {
                    this.selected1 = true;
                    this.show_img = [];
                    this.show_img = this.data.zhuce;
                }
                else if(num == 2)
                {
                    this.selected2 = true;
                    this.show_img = [];
                    this.show_img = this.data.chongzhi;
                }
                else
                {
                    this.selected3 = true;
                    this.show_img = [];
                    this.show_img = this.data.liaotian;
                }
            },
            getXinShouJiaoCheng()
            {
                let _this = this;
                this.$getData({
                    url:'/api/Home/Qianghongbao/xinshou',
                    callback: function(data){
                        _this.data = data;
                        _this.show_img = [];
                        _this.show_img = _this.data.zhuce;
                    }
                });
            }
        },
    }
</script>

<style scoped>
.show-kaijiang-and-zoushi-div{
    display: block;
    width: 94%;
    margin-left: 3%;
    margin-top: 15px;
}
.show-kaijiang-and-zoushi-div .this-title{
    width: 100%;
    font-size: 18px;
    height: 20px;
    line-height: 20px;
    color: #2c2c38;
    font-weight: 600;
    padding-left: 8px;
}
.show-xinshou-tishi>>>.mint-swipe .mint-swipe-indicators .is-active{
    background: red !important;
}
.show-xinshou-tishi>>>.mint-swipe .mint-swipe-indicator {
    background: white !important;
    opacity:0.7 !important;
}
.show-xinshou-tishi{
    width: 88%;
    height: 268px;
    margin-left: 6%;
    position: absolute;
    top: 27%
}
.for-findCentre-head{
    width: 100%;
    max-width: 640px;
    position: fixed;
    top: 0;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: url(../../assets/images/find/head_bg.png) no-repeat 100%;
    background-size: 100% 50px;
    background-position: 0 bottom;
    color: white;
    font-size: 1.5rem;
    font-style: normal;
    z-index: 99;
}
.for-findCentre-body{
    width: 100%;
    max-width: 640px;
    height: 100%;
    overflow: auto;
    position: relative;
    top: 0;
    display: block;
    padding-bottom: 4rem;
}
.zhong-jiang-bang-dan{
    width: 98%;
    margin-left: 1%;
    height: auto;
    margin-top: 50px;
}
.show-winner-list{
    width: 97.4%;
    margin-left: 1.3%;
    background: url("../../assets/images/find/lastWinner2.png") no-repeat 100%;
    background-size: 100% 100%;
    height: 130px;
    margin-top: -2px;
    overflow: hidden;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    box-shadow: 0 2px 3px 3px rgba(175, 92, 217, 0.22);
}
.show-winner-info{
    width: 100%;
    display: flex;
    padding: 3px 0 3px 5px;
    animation-fill-mode: forwards;
    color: white;
    font-size: 12px;
    animation: myMove 4s linear infinite;
    font-family: '宋体';
    border-bottom: 1px solid #0e90d2;
}
@keyframes myMove {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-130px);
    }
}
.new-player-guide{
    display: block;
    width: 94%;
    margin-left: 3%;
    margin-top: 20px;
    height: 150px;
    border-radius: 10px;
}
.show-shade-at-this-page{
    width: 100%;
    max-width: 640px;
    height: 100%;
    z-index: 100;
    background: rgba(0, 0, 0, 0.36);
    position: fixed;
    top: 0;
}
.xinshou-first-floor{
    width: 96%;
    height: 400px;
    margin-left: 2%;
    margin-top: 24%;
    background: rgba(0, 0, 0, 0);
}
.show-xinshou-contemt{
    position: relative;
    width: 90%;
    margin-left: 5%;
}
.this-has-be-selected{
    display: inline-block;
    width: 80px;
    height: 30px;
    line-height: 30px;
    background: #cb1635;
    box-shadow:0.05rem -0.05rem 0.05rem 0.05rem rgba(212, 210, 204, 0.86);
    text-shadow:none;
    color: #fcc1c5;
    border-radius: 15px;
}
</style>
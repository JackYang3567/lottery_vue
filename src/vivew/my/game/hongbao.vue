<template>
    <div class="hongbao-page">
        <div class="snow">
        </div>
        <div class="my-head-hongbao">
            <div class="top-title">
                <div class="for-back-this-page" @click="$router.back()"><i class="icon icon-nav-arrow-left"></i></div>
                <div style="width:70%;color: white;text-align: center;">抢红包</div>
                <div style="width:20%;color: white;text-align: right;margin-right: 10px;" @click="$router.push({path:'/My/hongbaoRule'})">活动规则</div>
            </div>
        </div>
        <div class="top-img">
            <img src="../../../assets/images/img/content_on.png">
        </div>
        <div class="bt_img">
            <img src="../../../assets/images/img/red_envelope.png" style="height: 390px;width: 100%;">
            <div class="btn-qiang" @click="qiangHongBao()">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALAAAACwCAMAAACYaRRsAAACYVBMVEUAAAD6qUn4iBn7jw73oDf6jw76kRD6kA/6jw75iBn7jw/6jw76jg786IH62nv4jhf6kBD4ixj83G7zty338X/5kA/0gzT241b6kQ/952P0qyL4jhb91Fr80y/62F37/N772FD8+c3630v6x37988j94nD65GP64Ev964T6nxn+2FT522H79L7+13z84oP4sW395ob80jT822z5n2b9zmf4+M3nqS3985764lj8+cv+zi782I39xGT41zr7tGP0sy381DvyqCb9+OP/eAD+5iv/xiP9cgH/dgD/yCb/3Dn7jw7/1jH+ziv/0y/8yCT+40b7awL+xyD/yyj+2Df93jf82DL8zCf+yjH+4j3/wy/+3kX82zP4Xwb8zy/8xCH63z75ewH/bwb5ZQT90Sb+XxD+2Ef90jf6lRH6dQT+rhf71S/5yCr/aA764Db/2T77bQ7/wiL7phj/31D/wSf+ZRT2WwX5cAj+1yb2dwn+vCL7oBT+0T3/agfzcAT+yjr+yh/8gQn33TT55kr9Vwr/xjT8tBz+3ij4yyD+11H32S/+1yz/xhvyzCfsbgP240P42DX+0yz9YwT8uR3+0Ev0yzL8yhr8mxH1aQfueAb6+9b95lT43kzrhhP52D/9xxL450D50iLz3j38zkX52SnpZQTpXwTjdwP3xiLlbwT+2l/9ykL9v0H7si77uDv11TPwXgX87Z3v6EHunBvz7WX6qDP+hwj9x0j05TL8vS/4ixX00y340Rbw6U/u2zDnfwj5lyLokRP1gBP93HH6pCThhwzdbALwkBfrzDjzmy7w2h7orxvJFFA5AAAAQ3RSTlMACBbsDvmqd9kk88iN/hlK5Twj/vRiMf6c/v1WOOpS6Wbj22s34Ozw4unnqFPMs0/RsH93dnPw68So3prhzLKRhdDCA6c+RQAAIylJREFUeNrMmOtr01AYxq3six+sOIejIlOnm6JzXlBUxC8KShCJkATCSSGoTSmlaSHMKUyFRpF2YKpUUNuOUm1lVeesG/qlXvGyP8vnPWddO6+7qr+2M72RX98+531PXbF0+PzbQF/fwYNHjm8Cx48cPNjXR4/5fSv+L3zk2nfwyJYtWzZxHgjocAs4crCPrP8PbV+bv+H64Jc0rP1t/1YaKWjv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" />
            </div>
            <div :class="['show-daojishi',is_qiang?'':'not-qiang-time']">
                {{show_dao_ji_shi}}
            </div>
        </div>
        <div class="btn_group">
            <div class="com_btn" @click="$router.push({path:'/My/hongbaoBang'})">人品榜单</div>
            <div class="com_btn" @click="$router.push({path:'/My/myhongbao'})">我的红包</div>
            <div class="com_btn" @click="gotoService()">在线客服</div>
        </div>

        <div style="width: 100%;max-width: 640px;height: 100%;position: relative;top: -50px;background: rgba(0,0,0,0.48);z-index: 99;" v-if="xiahongbao">
            <template v-if="is_qiang && !is_tishi && !is_zhong">
                <div :class="['one-hong-bao','yidong_'+i.time]" v-for="i in hongbao" @click="qiangFunction(i.type)">
                    <!--<img src="" style="width: 50px;height: 70px;">-->
                </div>
            </template>
            <template v-if="is_tishi">
                <div class="time-is-not-qiang">
                    <div class="tishi-guanbi" @click="xiahongbao=!xiahongbao"></div>
                    <div class="show-tishi-sorry">很抱歉</div>
                    <div style="width: 100%;height: 280px;">
                        <img src="../../../assets/images/a_icon/tishi_hongbao.png" />
                    </div>
                    <div class="show-tishi-neirong" v-html="tishi_message">
                    </div>
                    <div style="width: 100%;text-align: center;margin-top: 20px;">
                        <template v-if="not_login">
                            <span style="display: inline-block;width: 50%;text-align: center;background-color: yellow;color: #ee470b;height: 35px;line-height: 35px;border-radius: 16px;" @click="$router.push({path:'/in'})">立即登录</span>
                        </template>
                        <template v-else>
                            <span style="display: inline-block;width: 50%;text-align: center;background-color: yellow;color: #ee470b;height: 35px;line-height: 35px;border-radius: 16px;" @click="$router.push({path:'/My/hongbaoRule'})">查看规则</span>
                        </template>
                    </div>
                </div>
            </template>
            <template v-if="is_zhong">
                <div class="time-is-not-qiang">
                    <div class="tishi-guanbi" @click="xiahongbao=!xiahongbao"></div>
                    <!--<div class="show-tishi-sorry">很抱歉</div>-->
                    <div class="show-guang-mang">
                        <img class="guangmang" src="../../../assets/images/a_icon/guang.png" />
                        <img src="../../../assets/images/a_icon/hb.jpg" style="width: 150px;position: absolute;top: 50px;left: 50%;margin-left: -75px;" />
                        <div style="width: 100%;text-align: center;height: 40px;line-height: 40px;color: yellow;font-size: 20px;position: absolute;top: 110px;">
                            恭喜您
                        </div>
                        <div style="width: 100px;text-align: center;height: 40px;line-height: 20px;color: yellow;font-size: 14px;position: absolute;top: 155px;left:50%;margin-left: -50px; " v-html="zhongjiang">

                        </div>
                    </div>
                    <!--<div class="show-tishi-neirong" v-html="tishi_message">-->
                    <!--</div>-->
                    <!--<div style="width: 100%;text-align: center;margin-top: 20px;">-->
                        <!--<span style="display: inline-block;width: 50%;text-align: center;background-color: yellow;color: #ee470b;height: 35px;line-height: 35px;border-radius: 16px;">查看规则</span>-->
                    <!--</div>-->
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "hongbao",
        mounted(){
            this.daojishi();
            this.getInfo();
        },
        data(){
            return {
                hongbao:[],
                xiahongbao:false,
                show_dao_ji_shi:'',
                is_qiang:false,
                is_tishi:false,
                data:[],
                is_zhong:false,
                zhongjiang:'',
                tishi_message:'非常抱歉，现在还未到抢红包时间！',
                not_login:false,
            }
        },
        methods:{
            getInfo(){
                let _this = this;
                _this.$getData({
                    url:'/api/home/Qianghongbao/getInfo',
                    data:{},
                    callback:function(res){
                        _this.data = res;
                    }
                });
            },
            qiangHongBao(){
                if(this.data.switch && this.data.switch == 1)
                {
                    this.is_tishi = false;
                    this.is_zhong = false;
                    for(var i=0;i<60;i++)
                    {
                        if([2,3,4].indexOf(i) != -1)
                        {
                            this.hongbao[i] = {'type':10,'time':Math.ceil(Math.random() * 8)};
                        }
                        else if(i == 19)
                        {
                            this.hongbao[i] = {'type':100,'time':Math.ceil(Math.random() * 8)};
                        }
                        else
                        {
                            this.hongbao[i] = {'type':0,'time':Math.ceil(Math.random() * 8)};
                        }
                    }
                    this.xiahongbao = true;
                    let _this = this;
                    setTimeout(function () {
                        if(!_this.is_zhong)
                        {
                            _this.xiahongbao = false;
                        }
                    },8000);
                }
                else
                {
                    this.xiahongbao = true;
                    this.is_tishi = true;
                    this.tishi_message = '非常抱歉，暂未开启抢红包玩法！';
                }
            },
            daojishi(){
                let _this = this;
                setTimeout(function () {
                    var today = new Date();//当前时间
                    //获取当前时间戳
                    var nowStamp = Date.parse(new Date());
                    //获取开始抢红包的时间的时间戳
                    var start_time = today.toLocaleDateString() + " " + _this.data.start_time + ':00';
                    var startStamp = Date.parse(start_time);
                    //获取抢红包结束时间的时间戳
                    var end_time = today.toLocaleDateString() + " " + _this.data.end_time + ':00';
                    var endStamp = Date.parse(end_time);
                    nowStamp = nowStamp/1000;
                    startStamp = startStamp/1000;
                    endStamp = endStamp/1000;
                    if(nowStamp < startStamp || nowStamp > endStamp)
                    {
                        _this.show_dao_ji_shi = '未到抢红包时间';
                        _this.is_qiang = false;
                        _this.is_tishi = true;
                    }
                    else
                    {
                        var H = parseInt((endStamp - nowStamp)/3600);
                        var M = parseInt((endStamp - nowStamp - 3600 * H)/60);
                        var S = (endStamp - nowStamp)%60;

                        if(H < 10)
                        {
                            H = '0'+H;
                        }
                        if(M < 10)
                        {
                            M = '0'+M;
                        }
                        if(S < 10)
                        {
                            S = '0'+S;
                        }
                        _this.show_dao_ji_shi = H+':'+M+':'+S;
                        _this.is_qiang = true;
                        // _this.is_tishi = false;
                    }
                    _this.daojishi();
                },1000);
            },
            qiangFunction(type){
                let _this = this;
                _this.$getData({
                    url:'/api/home/Qianghongbao/qiangAction',
                    data:{type:type},
                    type:'post',
                    callback:function(res){
                        if(res.status)
                        {
                            _this.xiahongbao = true;
                            _this.is_tishi = false;
                            _this.is_zhong = true;
                            _this.zhongjiang = res.msg;
                        }
                        else
                        {
                            _this.xiahongbao = true;
                            _this.is_tishi = true;
                            _this.tishi_message = res.msg;
                            if(res.type == 'login')
                            {
                                _this.not_login = true;
                            }
                        }
                    }
                });
            },
            gotoService(){
                this.$store.state.service = true;
                this.$router.push({path:'/'});
            },
        },
    }
</script>

<style scoped>

    .show-guang-mang{
        width: 100%;
        height: 300px;
        z-index: 999;
    }
    .show-guang-mang>.guangmang{
        height: 100%;
        animation: zhuandong 2s linear infinite;
    }
    @keyframes zhuandong {
        from{
            transform:rotate(0deg)
        }
        to {
            transform:rotate(360deg)
        }
    }
    .tishi-guanbi{
        width: 30px;
        height: 30px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAxlBMVEUAAAD94Kf/4Kj936f93qf+36b+36f94Kf936f936j93qb+3qb/36f/2KD/4KP936f+36f94Kf84Kf+36f+36j936b+4Kj94Kj/36j14KPpLw7936f////+9vX+/PzuXELvb1jqOBbwcVruXTbuXkTsSSX3rXvpNBL2pXT2oXHygVXygFP+9PL6xpH81p/3qXjvZj35ysLva1PvaFDxdkvvakLtWD3sTyr61tD61M35zcX4w7n4wLb3ua7816DsTjLrRSj6xZECAmr8AAAAGnRSTlMA/SK/8+/YpZqWWzINBhnev4JiyK+v3nthGeOMybkAAAIwSURBVEjHpZbrWsIwDIbHBuJEBOY57ZgTcIpDBBTPgvd/U6bLg4wmgNPvFzR7n7bJ17QOl3vme41yqVRueP6Z62yVe7qjVrRzupmqHZcUU+m4thY4ryqju2G/04shiXud/vAuG6oeyMRexUSvHhPIKXm8UqjKngDUd03o+gmYnq5NZLduE/seDg86IKozwKC3bxGHOHgTwxrFNxg+XGHqTRy6hQ26xQ+a+bWZfTzARj2Y/eRyxeeQ5/nJ20EF9wFbhfupLOpTxVxlO59/vE2Bafr2Mc9y8IU1JaKGM1J237UOI5uIQq3fKdf4IXnnCCtI0RetdRpxQr/Qb6zpUeZddGKPhiZtbeZhRHtCf3roUePrFvpq8cEFMTZxsfiLfmshgufjHhgjEnCP5wfXhW5PgDEiAQmeBdcJlBoCMIYRpKFSgeMr1QeBEQnoK+U7HhWFM5yg0nhOg1LMmDRlBKX5xCkrFYPESATESpUdLCQwjUNDhGMewWIaJGGBbmqQtCsi4sK6oc4UdsWF0fY5EYbECNv3jF840R6P2zZDjvGolJy4BLgkhpcyICNzAhnL12TlwNjyMxEIkUk+0ZaW+aMcwRkyPx0xTuSZNLKOWO4gTxeEzUxzB3m1XbxyXxHzumwXVlMaEcGZ0bIpWa1vNnqeANPkeTTLzDKg1le4wRZv48Uvi+JXUvGLr/j1WvwS//9Tgeqz8iAB9iD567OHy23Zj6vWb55kgd+kJ1zTD4TvvwGRSNVrvqbATQAAAABJRU5ErkJggg==) no-repeat 100%;
        background-size: 30px 30px;
        position: absolute;
        right: 5px;
    }
    .show-tishi-sorry{
        width: 100%;
        height: 25px;
        line-height: 25px;
        text-align: center;
        color: white;
        position: absolute;
        top: 115px;
        font-size: 16px;
        font-weight: 600;
    }
    .show-tishi-neirong{
        width: 50%;
        height: 50px;
        margin-left: 25%;
        margin-top: 20px;
        text-align: center;
        color: yellow;
        position: absolute;
        top: 155px;
        font-size: 15px;
        font-weight: 600;
    }
    .time-is-not-qiang{
        width: 250px;
        height: 350px;
        position: absolute;
        top: 20%;
        left: 50%;
        margin-left: -125px;
    }
    @font-face{
        font-family: 'time_size';
        src: url('../../../assets/font/QuartzEF.otf');
    }
    .show-daojishi{
        width: 100%;
        max-width: 640px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        position: absolute;
        bottom: 38%;
        color: white;
        font-weight: 500;
        font-size: 35px;
        font-family: 'time_size';
    }
    .not-qiang-time{
        font-size: 20px !important;
    }
    .one-hong-bao{
        width: 75px;
        height: 90px;
        background: url('data:image/png;base64,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') no-repeat 100%;
        background-size: 75px 90px;
        display: inline-block;
        position: relative;
        top: -1800px;
        z-index: 100;
        border-radius: 5px;
        margin: 5px;
        /*animation: zhuandong 3s linear;*/
    }
    .yidong_1{
        animation: tiaodong 1s linear;
    }
    .yidong_2{
        animation: tiaodong 2s linear;
    }
    .yidong_3{
        animation: tiaodong 3s linear;
    }
    .yidong_4{
        animation: tiaodong 4s linear;
    }
    .yidong_5{
        animation: tiaodong 5s linear;
    }
    .yidong_6{
        animation: tiaodong 6s linear;
    }
    .yidong_7{
        animation: tiaodong 7s linear;
    }
    .yidong_8{
        animation: tiaodong 8s linear;
    }
    .yidong_9{
        animation: tiaodong 9s linear;
    }
    .yidong_10{
        animation: tiaodong 10s linear;
    }
    @keyframes tiaodong {
        0% {
            transform:translateY(0px);
        }
        50% {
            transform:translateY(1000px);
        }
        100% {
            transform:translateY(2000px);
        }
    }
    .btn-qiang{
        width: 100%;
        height: 50px;
        text-align: center;
        z-index: 4;
        position: absolute;
        bottom: 55%;
    }
    .btn-qiang>img{
        width: 70px;
        z-index: 5;
        animation: suofang 1s infinite ease-in;
    }
    @keyframes suofang{
        50%{transform:scale(.8)}to{transform:scale(1)}
    }
    .snow{
        position: absolute;
        top: 50px;
        animation: animate-snow 10s linear infinite;
        width: 100%;
        max-width: 640px;
        height: 100%;
        z-index: 3;
        /*top: 0;*/
        /*margin: 0 auto;*/
        background: url(../../../assets/images/img/snow-bg.png) repeat-y center;
    }
.hongbao-page{
    width: 100%;
    max-width: 640px;
    height: 100%;
    position: fixed;
    /*top: 0;*/
    /*margin: 0 auto;*/
    background: url(../../../assets/images/img/grabPacBg.png) no-repeat 50%;
    background-size: 100% 100%;
}
@keyframes animate-snow

{
    0% {background-position:0 0,0 0,0 0}
    100% {background-position:440px 80%,540px 90%,640px 100%}
    /*0% { background-position: center 0, 0 0;}*/

    /*100% { background-position: center 500px, 0 0;}*/

}
.my-head-hongbao{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: red;
    z-index: 98;
}
.for-back-this-page{

    color: white;
    font-size: 1.875rem;
    margin-left: 10px;
    font-weight: bold;
    text-align: left;
    width:10%;
}
.top-title{
    width: 100%;
    display: flex;
}
.top-img{
    position: absolute;
    top: 50px;
    width: 100%;
    height: auto;
    z-index: 2;
}
.bt_img{
    position: absolute;
    bottom: -3px;
    width: 100%;
    z-index: 4;
}
.btn_group{
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    bottom: 0.75rem;
    left: 0;
    z-index: 5;
    display: flex;
    color: white;
    justify-content: space-around;
}
.com_btn{
    width: 7rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    background: url(data:image/png;base64,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) no-repeat 50%;
    background-size: contain;
    color: #fff9c4;
}
</style>
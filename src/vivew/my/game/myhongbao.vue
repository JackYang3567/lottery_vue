<template>
    <div class="my-hongbao-page">
        <div class="my-my-head-hongbao">
            <div class="my-top-title">
                <div class="my-for-back" @click="$router.back()"><i class="icon icon-nav-arrow-left"></i></div>
                <div style="width:70%;color: white;text-align: center;">我的红包</div>
                <div style="width:20%;color: white;text-align: right;margin-right: 10px;" @click="$router.push({path:'/My/hongbaoRule'})">活动规则</div>
            </div>
        </div>
        <div style="width: 100%;max-width: 640px;">
            <div style="width: 100%;display: flex;height: 80px;">
                <div style="width: 50%;height: 80px;line-height: 80px;color: white;font-size: 15px;font-weight: bold;padding-left: 20px;">红包总额：<span style="color: yellow">{{data.allHongBao}}</span> <span v-if="data.allHongBao>0">元</span></div>
                <div style="width: 50%;height: 80px;line-height: 80px;color: white;font-size: 15px;font-weight: bold;padding-right: 20px;text-align: right">红包个数：<span style="color: yellow">{{data.num}}</span></div>
            </div>
        </div>
        <div style="width: 96%;margin-left: 2%;background: #fff3e4;height: 450px;border-radius: 8px;">
            <div style="width: 100%;display: flex;">
                <div style="width: 50%;height: 60px;line-height: 60px;text-align: center;font-size: 14px;">时间</div>
                <div style="width: 25%;height: 60px;line-height: 60px;text-align: center;font-size: 14px;">红包类型</div>
                <div style="width: 25%;height: 60px;line-height: 60px;text-align: center;font-size: 14px;">金额</div>
            </div>
            <template v-if="data.log  !== undefined && data.log.length==0">
                <div style="width: 100%;height: 390px;background: white;text-align: center;">
                    <img src="data:image/png;base64,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" alt="" style="width: 80px;margin-top: 80px;">
                    <p style="margin-top: 15px;font-size: 14px;color: #777;">我的红包数据为空~</p>
                </div>
            </template>
            <template v-else>
                <div style="width: 100%;height: 390px;overflow: auto;">
                    <div style="width: 100%;background: white;margin-top: 2px;display: flex;" v-for="i in data.log">
                        <div style="width: 50%;height: 60px;line-height: 60px;text-align: center;font-size: 14px;">{{getLocalTime(i.qiang_time)}}</div>
                        <div style="width: 25%;height: 60px;line-height: 60px;text-align: center;font-size: 14px;">运气红包</div>
                        <div style="width: 25%;height: 60px;line-height: 60px;text-align: center;font-size: 14px;">{{i.money}}</div>
                    </div>


                </div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "myhongbao",
        mounted(){
            this.getInfo();
        },
        data(){
            return {
                data:[],
                notLogin:false,
            }
        },
        methods:{
            getInfo(){
                let _this = this;
                _this.$getData({
                    url:'/api/home/Qianghongbao/myHongBaoInfo',
                    callback:function (res) {
                        if(!res.status && res.type == 'login')
                        {
                            _this.$router.push({path:'/in'});
                        }
                        else
                        {
                            _this.data = res;
                        }
                    }
                });
            },
            add0(m){return m<10?'0'+m:m },
            getLocalTime(nS) {
                var time = new Date(nS*1000);
                var y = time.getFullYear();
                var m = time.getMonth()+1;
                var d = time.getDate();
                var h = time.getHours();
                var mm = time.getMinutes();
                var s = time.getSeconds();
                return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
            },
        },
    }
</script>

<style scoped>
    .my-hongbao-page{
        width: 100%;
        max-width: 640px;
        height: 100%;
        position: fixed;
        /*top: 0;*/
        /*margin: 0 auto;*/
        background: #dc4137
    }
    .my-my-head-hongbao{
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: red;
        z-index: 98;
    }
    .my-for-back{

        color: white;
        font-size: 1.875rem;
        margin-left: 10px;
        font-weight: bold;
        text-align: left;
        width:10%
    }
    .my-top-title{
        width: 100%;
        display: flex;
    }
</style>
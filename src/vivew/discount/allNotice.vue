<template>
    <div :style="{'width':'100%','height':'auto','padding':'55px 10px','background':data.length>0?'rgb(245, 245, 245)':'white'}">
        <template v-if="data.length>0">
            <div style="background: white;height: 120px;width: 100%;margin-bottom: 10px;padding: 6px;border-radius: 10px;" v-for="i in data">
                <img data-v-5e867672="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABACAMAAACHi2FiAAAATlBMVEUAAAD0NljxOVv4NVn2Nlj0NFX1NVj1NVf2Nlj1Nlj1Nlj1NFf1Nlj2NVj1NVj2Nlj1Nlj0NVf2OVj1Nlj1Nlj1Nlf2N1j1Nlj2Nlj1NlgtCMzvAAAAGXRSTlMAWhEh9QuSQVTo3krKu35uwykadmSuNKXUDI4CHAAAAUZJREFUWMPtmOuOgyAQRlvlKta7br/3f9GNpSa1gxGcZtNkPb/MkBxGQJ3xcvJpcjMFoteqS1d1PwDUe1SOQCFTXc5iJnuboZyDVZpKKnjcKjz5Gcq0tAo8ub6GjfDBW+JqhWT9EjTxrlogJJPLFGKIVk0lEJJlDTxWJy48lbXLKt7zWJexCMucgOeWxZ74GxCWaTxRsWkNAluyEZ46PS0q82PCHTgPVFbNl0V7ZBOpLLNAs7f0esYMqsC27EGu6t1XBShUtnDKTtlfyGS+giXrBVaU7XGZJkPNcVkPwpfIdm6TuwE565xlr8gvOrSn7D/JzINB2YiP8LaFXx7wC5dY2nK/pNKXaCowij3CdGeUoQRZCUaBTGgbRulOGQSjqSB0IxjtDsFZViNGHwhGi0jQBat5pclx2mqaHKPhp7jabfyKOPkMvy4wnG23jYPbAAAAAElFTkSuQmCC" alt="" style="width: 17px;position: relative;top: 2px;">
                <p style="font-size: 0.8125rem;display: inline-block;color: red">{{i.title}}</p>
                <div style="width: 100%;font-size: 0.8125rem;overflow: hidden;margin-top: 5px;letter-spacing:1.5px;line-height: 15px;height: 60px;" v-html="i.content">
                </div>
                <p style="font-size: 0.8125rem;height: 30px;line-height: 30px;">{{i.start_time}}<span style="float: right;font-size: 0.8125rem;" @click="$router.push({path:'/discount-son/'+i.id})">查看详情 >></span></p>
            </div>
        </template>
        <template v-else>
            <div style="width: 100%;text-align: center;margin-top: 30%;">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAgCAYAAACYTcH3AAAEeElEQVRYR+2YW2icVRDH/7PfhmCKJV6oVNRsFCpeH6wVtfogWkURKtWmCCLxUiPYom6+b+YLvuRBsjnni4muVk1bLSKCpFK00gfbWpCKfait4KW2Vkq8IdRbKhRW1nwjJ+6G3c1udpONbx7Yl52Z//ntnDNzhiU0uay1PoAIwD5mvrUZOaoWHEXRIlX9WlU9z/NW+b5/pNYmxpiniGhEVT8RkZW1/FSVrLVbiOgRAOuZeWulb02YOI6PE9FSABOJROI23/cPVdvIGLOBiF5U1c9E5JpqPqOjoy0TExNvE9Gagr2HmTc3BOOcoijqVNWPAFwI4DSAO5l5f6WAMeZxInoFwFFmvqzSPjw8fEY+n99FRLc4m6puFJGXqkFXzUzR0RhzPhHtAXA5gL+IaF0QBO+VCllrHwWwBcB3zJwqtRljzgSwl4iu+5dDHxKRN2od5awwLmhkZKQ9n8/vBbBcVWMiWsHMh4uC1tpuANsAnGTm8ypg9hPRTar6N4B1IrJjtgteF6ZwZIviON5NRMsBrCo9rsHBwSuI6ID7MPMdFVlzWb0BwBpm3l2v0hqCcSKZTOas1tbWtnQ6/VOlaBRFSzo6On7r6uqaLLUNDAyc42J6e3t/qAfi7A3DNCLWrM+sMC4bnudtAnD/PDZyWfq4GOfuTSKReCEIgvfndYGttVkAG+cBUivkdDKZvCidTv8+p9I2xlxARCcAtADYrKo/zxHqy0Qi8WsxJo7jbUSUUtXnReTpOcFYa10/eBDAYWZ2VdTUstauBTAGIK+qF4vIj5WCVe+MMeZSAEeIKEFENwZBcKApkkKwMca1gOsBvM7M7o0qW1VhrLXvAlitqjtE5N6FAHEa1lr3dh1yzdN1dRE5Vqo9A8YYcy0RHXTpnJycXNbX1ze+UDAFIHdUa1X1HRFxRze9ZsBYa105rpztojUDl8lkUp7nfeMKI47jq8Mw/KKoVwZjrb0dwAcA/kwmk521SrAZGBdrjHmOiNKqukdE3J5TqwzGGPM5EV0Vx3FvGIbDzW5aKz6bzS7O5XLuiVgcx/HNYRhONcdpmGLpqep4e3v7sp6envx/BVO4O67XDKvqpyKyYhpmbGzMGx8fPw7ADVQflrbxGkCTnudt933/aKW9oPWYqpaNEzPKmKhFVcNC+7jHzUlTmRkaGuqI43iuVXOQmd3QVLaMMfcR0fY5ZnUTM28og1HVPwC492jWRURPqmqbqi4Jw/BUqbO19jUAD6vqWwC+nU2oMB/draovi8gTlTAnROSSejDGmGeJ6BlV3eV5Xrfv+1NvUPF7Nw+nUqkrK+ebSt0oinpU9dWmYLLZbGsul9sJwJXlpKq6KuwAcLbrsER0VxAEJ+v9qAWBcZv09/cn2traulX1gcKm3xPRviAI3iQirQfi7AsG08hm9Xz+h6mVoaqZKbTnU6r6S2dn59J6VVAv/Y3ajTFCRINuumBmmX4OjDHHiGiZqn5FRNPjYqPC8/Rzg1arqq4WkZ2lb5P7B8ENVefOU3i+YVuZeb0L/gdc4FU/+4VvTQAAAABJRU5ErkJggg==">
                <p style="color: #8a8a8a;margin-top: 15px;">里面什么也没有</p>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "allNotice",
        mounted() {
            this.loadMore();
        },
        data(){
            return{
                data:[],
            }
        },
        methods:{
            loadMore() {
                let _this = this;
                _this.$getData({
                    data:{ notice_type:3 },
                    url:'/api/home/Discount/getInfo',
                    callback: function(res){
                        console.log(res);
                        _this.data = res;
                    }
                });
            },
        },
    }
</script>

<style scoped>

</style>
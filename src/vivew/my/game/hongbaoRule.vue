<template>
    <div>
        <div class="my-head-rule">
            <div class="top-title">
                <div @click="$router.back()" class="for-back" data-v-81846358=""><i class="icon icon-nav-arrow-left"
                                                                                    data-v-81846358=""></i>
                </div>
                <div style="width:100%;color: white;text-align: center;margin-right: 10px;">活动规则</div>
            </div>
        </div>
        <div style="width: 100%;height:auto;margin-top:50px;">
            <div class="content">
                <img alt="" src="../../../assets/images/img/rulesBg1.png" style="width: 100%;">
                <h1 class="top_tlt">{{data.title_hongbao}}</h1>
            </div>
            <div class="ruleCont">
                <div class="bgff" v-html="data.rule_hongbao">
                </div>
            </div>
            <div>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAABTCAMAAAD3CHJ6AAAAY1BMVEUWEDEWEDEVEDEWEDEVEDAVEDHUhyhfPi3rligXDzGdZSt2SCKrbStkQS2ycioWEDHwmSjegQAXEDAhFi6rbSqeXA7ZfQCGVizCeypUMiG6bAjFcgWMWiw7JytGLClhOh6PUxOEkcExAAAAD3RSTlP13Pvs8OP8/v7M/v3t4/1rjX+7AAABvElEQVR42uzYyXbCMAxAURMyMVWOnYSGlOH/v7K71qY1e6R3d96/4yPJ7ZrNk9Ox7T3w1vr2eNo8aXauqVzm0HpAhbZzmapxdagS8cMDauyrVKidk0T89IAiY5CEy3MfPaDKOc+9Tl6dB3Tpr/KrznJnS4U6Yyn3mwe06WMh97MH1OnS3LcsqlDtS35s09y5QkKhPbnDjjR3hhkolw8zrKpQrSvkfhsAbeZYyF0uA6DMJKXclwHQZb4Wc5dpAFQ5SDn3yDgDVabwIneJ/O9Q5BHkVe4S7usAqLAuIn9zz8X7tM4D8Nbmy2MJ8k/ugBHkDkPIHYaQOwwhdxhC7jCE3GEIucMQcoch5A5DyB2GkDsMIXcYQu4whNxhCLnDEHKHIeQOQ8gd3+zSQQ3AMAwAsWjL3pXKH+yAnI3BIboTojshuhOiOyG6E6I7IboTojshuhOiOyG6E6I7IboTojshuhOiOyG6E6I7IboTojshuhOiOyG6E6I7IboTojshuhOiOyG6E6I7IboTojshuhPyzh6IWN3p0J0Q3QnZmQMRozsdM3sfSLg73zP8GwUjAjCxMnCyMo6CUTAiACsnAFFfDssjU8olAAAAAElFTkSuQmCC ">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "hongbaoRule",
        mounted(){
            this.getInfo();
        },
        data(){
            return {
                data:[],
            }
        },
        methods:{
            getInfo(){
                let _this = this;
                _this.$getData({
                    url:'/api/home/Qianghongbao/getRule',
                    data:{},
                    callback:function(res){
                        _this.data = res;
                    }
                });
            },
        },
    }
</script>

<style scoped>

    .ruleCont{
        width: 100%;
        height: auto;
        margin: 0 auto;
        margin-top: -3px;
        background: url("../../../assets/images/img/rulesBg2.png") no-repeat 100%;
        background-color: #21163f;
        background-size: 100% auto;
        background-position: 0 0,0 0,0 0;
    }
    .bgff{
        width: 94%;
        margin: 0 auto;
        padding: 0 5px 30px 5px;
        height: 100%;
        background: #fff7eb;
    }
    .my-head-rule {
        position: fixed;
        top: 0;
        width: 100%;
        max-width: 640px;
        height: 50px;
        line-height: 50px;
        background: red;
        z-index: 99;
    }

    .for-back {
        color: white;
        font-size: 1.875rem;
        margin-left: 10px;
        font-weight: bold;
        text-align: left;
        width: 10%
    }

    .top-title {
        width: 100%;
        display: flex;
    }
    .top_tlt{
        width: 80%;
        position: absolute;
        top: 70px;
        color: #ffe88e;
        font-size: 1.175rem;
        margin-left: 10%;
        text-align: center;
        font-weight: 700 !important;
        letter-spacing: 2px;
        line-height: 20px;
    }
</style>
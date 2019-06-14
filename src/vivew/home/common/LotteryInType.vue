<template>
    <div style="width: 100%;max-width: 640px;height: 100%;margin-top: 50px;padding: 10px;">

        <div style="font-size: 18px;border-bottom: 1px solid #999;margin-top: 10px;" v-for="i in data">
            <div style="width: 100%">
                {{i.name}}
            </div>
            <div :class="['caipiao-name',type==item.type?'this-caipiao-selected':'']" :style="{'margin':(key+1)%3==0?'10px 0 10px 0;':'10px 5% 10px 0'}" v-for="(item,key) in i.data" @click="$router.push({path:'/trend/'+item.type})">
                {{item.name}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LotteryInType",
        mounted() {
            this.type = this.$route.params.id;
            this.getInfo();
        },
        data(){
            return {
                data:[],
                type:0,
            }
        },
        methods:{
            getInfo(){
                var _this = this;
                this.$getData({
                    url:'/api/Home/Lottery/getAllLottery',
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
.caipiao-name{
    width: 30%;
    height: 35px;
    line-height: 35px;
    background: white;
    display: inline-block;
    text-align: center;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #aaa;
}
.this-caipiao-selected{
    background: #ff7614 !important;
    color: white !important;
}
</style>
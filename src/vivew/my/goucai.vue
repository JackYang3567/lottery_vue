<template>
    <div>
        <div v-if="$route.query.selected==1">
            <trade></trade>
        </div>
        <div v-if="$route.query.selected==2">
            <qipaiyouxi></qipaiyouxi>
        </div>
    </div>
</template>

<script>
    import trade from '../trade/index.vue';
    import qipaiyouxi from '../my/game/gameApi.vue';
    export default {
        name: "goucai",
        mounted(){

        },
        data(){
            return {

            }
        },
        components: {
            'trade': trade,  //将别名demo 变成 组件 Demo
            'qipaiyouxi':qipaiyouxi
        },
        methods:{

        },
    }
</script>

<style scoped>

</style>
<template>
    <div class="hongbaoBang-page">
        <div class="my-head-hongbaoBang">
            <div class="top-titleBang">
                <div class="for-backBang" @click="$router.back()"><i class="icon icon-nav-arrow-left"></i></div>
                <div style="width:70%;color: white;text-align: center;">人品榜单</div>
                <div style="width:20%;color: white;text-align: right;margin-right: 10px;" @click="$router.push({path:'/My/hongbaoRule'})">活动规则</div>
            </div>
        </div>
        <div class="top-img-bang">
            <img src="../../../assets/images/a_icon/bang.png">
        </div>
        <div class="content-bang">
            <div style="width: 100%;display: flex;">
                <div style="width: 25%;height: 80px;line-height: 100px;text-align: center;">排名</div>
                <div style="width: 25%;height: 80px;line-height: 100px;text-align: center;">账号</div>
                <div style="width: 25%;height: 80px;line-height: 100px;text-align: center;">红包类型</div>
                <div style="width: 25%;height: 80px;line-height: 100px;text-align: center;">金额</div>
            </div>
            <div style="width: 100%;height: 80%;overflow: auto;">
                <div style="width: 100%;display: flex;background: white;margin-top: 2px;" v-for="(i,key) in data">
                    <div style="width: 25%;height: 40px;line-height: 40px;text-align: center;">
                        <template v-if="key==0">
                            <img src="data:image/png;base64,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" style="width: 28px;margin-top: 6px">
                        </template>
                        <template v-else-if="key==1">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA+CAMAAABEH1h2AAABGlBMVEUAAAAkVagiUai+vb4jVKghU6gjVam/vb+3t7e8vLyssLm+vb6+vb6+vb6+vb67u729vb2+vb6+vr69vb2+vr6/vr+mrbu+vr6+vb6/vb++vr6+vr69u728vLy/vb6+vb69vL2+vb6+vL6+vL4gUaUjVKe/vr8kVKh+k7QjVKe+vb6+vL69vb0kVakyXqo+Z6wkVah8j7MjU6ciU6nl5+m+vb4jVajd3d3+/v6rsLXZ3N7Z2dqtsrfQ0tTU1ti9vL3X2tuxtrrg4uS2u7/T1NbFyczExMXJy83Nz9HMzc7BxcjBwcPi5Oa9v8HHyMm+wsa7v8Pr7O3n6eq0uLy4ur3y8/PN0NPb3uDv7/D5+fn29vc2YauSn7hviLOQCCuXAAAANHRSTlMA5iv6oVLGVAMUCfGk68JySdd/Nedo/ffhszwoIA7zyG3PkIocmC745aiamF3bxqiBgGVKO/oBOgAABHxJREFUSMflldl20zAQQA0BsjZplrZJ071l3yFKI8WS5XiNncXODoX//w1GtkNPigsufeCB++DY5+R6pJnRWPo9pZJ0D7bz+e2/tw/qCNUP7ii9SWfDm8MiAoqH4VM2/SaR3kDl82ZGknKvUMCrnCRlmudl1Eikl0HZa5RKRRRRLJUae/BbTmIf1kLJtCjjhDO9P3IVJKgdJtCf5RFSXIsRwnS6WFC44dRE8Ib8syTFSimoz4luaKqMMZbVqbeAR1NBqSRFrCgmI9SL1KkqXjI1COkjpfJnu1obEe6AojqU9FqtVo/bmow1SnR3q/rbpDW3d17nLaJrENcW6ho+xrJBmJt/vbPdjE/gTnkrn0KKRaiK8bg3aW2gq9ghOoIE5LfKOzH6fgpByk0Cf5TttTWZrF/T08C3kSC1H6PngjZhXMM4sv35l06n82U+Wfs2GSmijXKxq4fgfeJgbIT2vBPxxQ+el6rK2BD0HSmObA25nMqyNmgJBl87P/1JEN7GY2IpqJaVYjmDvHmyzEN7Of/aWxhWT/i+sC8vPVmH8GdSPGnEdBmPo1TxnjEGvAno88C+1OUxGaXSt+gnJjEw1qNMMcsAHE+EXw3ABrQpp+gk3s6eWmSG1cE6OqWMc2r4YvGXIQamDJ3G7r1ZRJSp2FvXuUeWPbiQDtDtdgOdQu+Z6LgZs/EaCrZuRPoAgGtLlH7Sj/SuOiYm5P7m9nMVMU44DVvmGr8DzEcU7FDXlqJz9iqbnVNAAr7AeBGJ153jOyMd9IBQBwqbx/Q01DejB43Tm7l290Z0dFq9kfZCCvZOYe+b9tfFFAbXte4RMXYKvyQ/c3IUZT5iMBfbNmaupQs7yrwDmT86ycR+kfpkKqu9yG6JZjdmZj+MHdXd5u5t363zEYGpQqOu88XSBxPfX61Wk2jtmsp05fy2nh+KynnRiVl1rllFXYM9Yt3a8yVEOUxFNhE6/1XvzrBNXFSKt3PHyCQWnPdgvjKdWn2bUl3XWdSzFtYIVdAxtEz8sFMgPMzJQHemKoz56Qwwg8JTVbaDsu3H2RnReSahMtRe6CN3GOGOKOgwQsfhrCzE1e1gCyExpy3wnZbPaH+NTVkXYmONs6HQtw7iJmUKCShxsDyedwbdDQwZa0wsHUidxEXfT1cKx/WhTgzZ8Tt+kK5ueLU0LOyRUj8uVNL7Ino82cqQkoU6JVABx2agU8tVMZYdzkepymavx2ewT7gzxQJZgAGNEmYqkLM/klaUESPM0cALbdVbEGIPFSUt/ZnqEVKQxQhnluN53tignHDqQtKOqgn0bFBAZNqME7JcEsJg94oiCpZNoGfqCJjt7h65psAdwv0MAfWMlIAiUna/X7XfVcsooPyx3b76vptCRSkJZ41SG3giVbeCHnv2WDy+326cJdJzmYehLqX3YCanpUB/JGVyUjLWuvQCoReZtQ7cUX/w7dsD6R761dW99Hb7/9WBe+hPLy6e3kMX/Gv989315y8fXp+hTw/uqL99vDEaLl4+v4v+9EK6weMPUhw/ACvEfTVLnu4eAAAAAElFTkSuQmCC" style="width: 28px;margin-top: 6px">
                        </template>
                        <template v-else-if="key==2">
                            <img src="data:image/png;base64,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" style="width: 28px;margin-top: 6px">
                        </template>
                        <template v-else>
                            <span class="show-red-ball">{{key+1}}</span>
                        </template>
                    </div>
                    <div style="width: 25%;height: 40px;line-height: 40px;text-align: center;">{{i.username}}</div>
                    <div style="width: 25%;height: 40px;line-height: 40px;text-align: center;">运气红包</div>
                    <div style="width: 25%;height: 40px;line-height: 40px;text-align: center;">{{i.money}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "hongbaoBang",
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
                    url:'/api/home/Qianghongbao/bangdan',
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
    .hongbaoBang-page{
        width: 100%;
        max-width: 640px;
        height: 100%;
        position: fixed;
        padding-bottom: 15px;
        top: 0;
        /*margin: 0 auto;*/
        background: url(../../../assets/images/img/grabPacBg.png) no-repeat 50%;
        background-size: 100% 100%;
    }
    .my-head-hongbaoBang{
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: red;
        z-index: 98;
    }
    .for-backBang{

        color: white;
        font-size: 1.875rem;
        margin-left: 10px;
        font-weight: bold;
        text-align: left;
        width:10%
    }
    .top-titleBang{
        width: 100%;
        display: flex;
    }
    .top-img-bang{
        position: fixed;
        top: 50px;
        width: 100%;
        max-width: 640px;
        height: auto;
        z-index: 2;
    }
    .content-bang{
        width: 96%;
        height: 80%;
        background: #fff3e4;
        margin-left: 2%;
        margin-top: 18%;
    }
    .show-red-ball{
        font-style: normal;
        display: inline-block;
        width: 1.425rem;
        height: 1.425rem;
        line-height: 1.425rem;
        text-align: center;
        background: #ff524f;
        border-radius: 50%;
        color: #fff;
    }
</style>
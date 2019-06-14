<template>
  <div> <!-- position:relative; -->
    <main class="kd-body activities" style="margin-top: -15px;">
      <mt-loadmore :top-method="loadTop" ref="loadmore" @top-status-change="handleTopChange" topPullText="" topDropText="" topLoadingText="加载中" :distanceIndex="1">
        <ul class="nostyle kd-list activities" v-infinite-scroll="loadMore" infinite-scroll-disabled="dataOver" infinite-scroll-distance="10">
            <li v-for="i in data" class="show-one-info">
                <a :href="'#/discount-son/'+i.id">
                    <p>{{i.title}}</p>
                    <div class="show-img-div">
                        <img :src="('api_path' in $store.state && $store.state.api_path ? $store.state.api_path : $store.state.basic.static_path) + i.logo">
                    </div>
                    <p style="font-size: 0.75rem;height: 30px;line-height: 30px;width: 60%;display: inline-block;">活动时间：{{i.start_time}}至{{i.end_time}}</p>
                    <p style="font-size: 0.75rem;height: 30px;line-height: 30px;width: 39%;text-align: right;display: inline-block;float: right;padding-right: 15px;">查看详情 >></p>
                </a>
            </li>
            <li class="more_loading" style="text-align:center;">
                <mt-spinner type="triple-bounce" :color="$store.state.basic.main_color" v-show="!dataOver"></mt-spinner>
                <span style="color:#bfbfbf" v-show="dataOver">—— 数据加载完了 ——</span>
            </li>
        </ul>
      </mt-loadmore>
    </main>
  </div>
</template>

<script>
export default {
  created(){
    this.initialization();
  },
  // 55 - 70 不同的类型的图标
  data () {
    return {
      loading: false,
      topStatus: 'pull',
      dataOver: false,
      page: 1,
      data:[]
    }
  },
  methods: {
    initialization(){
      let _this = this;
      if(this.$route.path in this.$store.state.all_chat){
        this.data = this.$store.state.all_chat[this.$route.path]['list'];
        this.page = this.$store.state.all_chat[this.$route.path]['page'];
      }
      this.loadMore();
    },
    loadTop() {
      if(this.loading) return;
      this.loading = true;
      let _this = this;
      _this.$getData({
        data:{ id: (_this.data.length ? _this.data[0].id : 0) },
        url:'/api/home/Discount/getInfo',
        callback: function(data){
          if(data.length){
             _this.data = data.concat(_this.data);
             _this.$store.state.discount['list'] = _this.data;
          }
          _this.$total({ message:'获得'+data.length+'条最新优惠',duration:1000,type: 1 });
          _this.loading = false;
          _this.allLoaded = true;
          _this.$refs.loadmore.onTopLoaded();
        }
      });
    },
    loadMore() {
      if(this.loading) return;
      this.loading = true;
      let _this = this;
      _this.$getData({
        data:{ page:_this.page },
        url:'/api/home/Discount/getInfo',
        callback: function(res){
          if(res.data.length){
           _this.data = _this.data.concat(res.data);
           _this.page = parseInt(res.current_page) + 1;
           _this.$store.state.all_chat[_this.$route.path] = { list:_this.data,page:_this.page };
          }
          if(res.data.length < res.per_page){
            _this.$set(_this,'dataOver',true);
          }
          _this.loading = false;
        }
      });
    },
    handleTopChange(status) {
      this.topStatus = status;
    }
  }
}
</script>

<style scoped>
    .kd-body{
        padding-top: 4rem !important;
    }
  .activities{
      min-height: 500px;
      background: #f5f5f9 !important;
      height: 100%;
  }
.show-one-info{
    margin-top: 8px;
    width: 100%;
    height: auto;
    background: white;
}
.show-img-div{
    width: 100%;
    padding-left: 2%;
    padding-right: 2%;
    text-align: center;
}
  .show-one-info>a>p{
      height: 40px;
      line-height: 40px;
      padding-left: 15px;
      color: #444 !important;
  }
  .show-img-div>img{
    /*width: 95%;*/
    /*border: 1px solid red;*/
}
</style>

<template>
  <div>
    <main class="kd-body home">
      <!-- <divider> 123 </divider> -->
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item :span="1/5" v-for="(item,key,index) in photo" :key="index"><div class="flex-demo" @click="clickImg(key)"> <img :class="['list_user_img',{'img_sel':sel == key}]" :src="photo[key]" /> </div></flexbox-item>
        <!-- <flexbox-item :span="1/3"><div class="flex-demo">2</div></flexbox-item>
        <flexbox-item :span="1/3"><div class="flex-demo">2</div></flexbox-item>
        <flexbox-item :span="1/3"><div class="flex-demo">2</div></flexbox-item>
        <flexbox-item :span="1/3"><div class="flex-demo">2</div></flexbox-item> -->
      </flexbox>
    </main>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Divider  } from 'vux';
export default {
  name:'my-photo',
  components:{
    Flexbox,FlexboxItem,Divider
  },
  data () {
    return {
      photo:[
        require('@/assets/images/photo/0.png'),
        require('@/assets/images/photo/1.png'),
        require('@/assets/images/photo/2.png'),
        require('@/assets/images/photo/3.png'),
        require('@/assets/images/photo/4.png'),
        require('@/assets/images/photo/5.png'),
        require('@/assets/images/photo/6.png'),
        require('@/assets/images/photo/7.png'),
        require('@/assets/images/photo/8.png'),
        require('@/assets/images/photo/9.png'),
        require('@/assets/images/photo/10.png'),
        require('@/assets/images/photo/11.png'),
        require('@/assets/images/photo/12.png'),
        require('@/assets/images/photo/13.png'),
        require('@/assets/images/photo/14.png'),
        require('@/assets/images/photo/15.png'),
        require('@/assets/images/photo/16.png'),
        require('@/assets/images/photo/17.png'),
        require('@/assets/images/photo/18.png'),
        require('@/assets/images/photo/19.png'),
        require('@/assets/images/photo/20.png'),
        require('@/assets/images/photo/21.png'),
        require('@/assets/images/photo/22.png'),
        require('@/assets/images/photo/23.png'),
        require('@/assets/images/photo/24.png'),
        require('@/assets/images/photo/25.png'),
        require('@/assets/images/photo/26.png'),
        require('@/assets/images/photo/27.png'),
        require('@/assets/images/photo/28.png'),
        require('@/assets/images/photo/29.png'),
        require('@/assets/images/photo/30.png'),
        require('@/assets/images/photo/31.png'),
        require('@/assets/images/photo/32.png'),
        require('@/assets/images/photo/33.png'),
        require('@/assets/images/photo/34.png'),
        require('@/assets/images/photo/35.png'),
        require('@/assets/images/photo/36.png'),
        require('@/assets/images/photo/37.png'),
        require('@/assets/images/photo/38.png'),
        require('@/assets/images/photo/39.png'),
        require('@/assets/images/photo/40.png'),
        require('@/assets/images/photo/41.png'),
        require('@/assets/images/photo/42.png'),
        require('@/assets/images/photo/43.png'),
        require('@/assets/images/photo/44.png'),
        require('@/assets/images/photo/45.png'),
        require('@/assets/images/photo/46.png'),
        require('@/assets/images/photo/47.png'),
        require('@/assets/images/photo/48.png'),
        require('@/assets/images/photo/49.png'),
        require('@/assets/images/photo/50.png'),
        require('@/assets/images/photo/51.png'),
        require('@/assets/images/photo/52.png'),
        require('@/assets/images/photo/53.png'),
        require('@/assets/images/photo/54.png'),
        require('@/assets/images/photo/55.png'),
        require('@/assets/images/photo/56.png'),
        require('@/assets/images/photo/57.png'),
        require('@/assets/images/photo/58.png'),
        require('@/assets/images/photo/59.png'),
        require('@/assets/images/photo/60.png'),
      ],
      sel:0,
    }
  },
  mounted(){
    let _this = this;
    if(_this.$store.state.user == false){
      _this.$router.back();
    }else{
      _this.sel = _this.$store.state.user['photo'];
    }
  },
  methods: {
    clickImg(val){
      let _this = this,list = _this.sel;
      if(_this.sel == val){return;}
      _this.sel = val;
      _this.$messagebox.confirm('确认修改头像吗?', '提示').then(()=>{
        // _this.$total({message:'修改成功',type:1});
        _this.$getData({
          url:'/api/home/my/userPhoto',
          type:'post',
          data:{type:val},
          callback:function(res){
            if(res.code == 1){
              _this.$total({message:res.msg,type:1});
              _this.$store.state.user['photo'] = val;
              _this.$router.back();
            }else{
              _this.$total({message:res.msg,type:0});
            }
          }
        });

       },()=>{
          _this.sel = list;
       });
    },
  }
}
</script>

<style scoped>
  .kd-body {
    padding-top: 4rem!important;
  }
.flex-demo{
  /* border:1px solid red; */
  text-align: center;
}
.list_user_img{
  width: 3rem;
  height:3rem;
  border-radius: 50%;
  border:1px solid #eee;
}
.img_sel{
  box-shadow: 0 0 50px #f00; border:1px solid green;
  border:1px solid red;

}
</style>

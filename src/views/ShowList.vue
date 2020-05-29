<template>
  <div style="text-align: left;">
    <van-nav-bar
       left-text="返回"
       left-arrow
       right-text="首页"
       @click-left="onClickLeft"
       @click-right="onClickRight"
    />
    <van-cell-group v-if="showList">
      <van-cell v-for="item in searchList" :key="item.id" :title="item.title"  @click="toDetail(item.content)"/>
    </van-cell-group>
    <van-cell v-if="showDetail" :value="detailContent" />
  </div>
</template>

<script>
// 引入组件
import Vue from 'vue';
import axios from 'axios';
import { List, Cell, CellGroup, Overlay, NavBar, Toast } from "vant";
Vue.use(List);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Overlay);
Vue.use(NavBar);
Vue.use(Toast);

export default {
  name: 'ShowList',
    data() {
      return {
          searchList: this.$route.params.searchList,
          detailContent: "",
          showList: true,
          showDetail: false
      }
    },
    methods: {
        toDetail(content) {
            this.showList = false;
            this.showDetail=true;
            this.detailContent = content;
        },
        onClickLeft() {
            if( this.showDetail) {
                this.showList = true;
                this.showDetail=false;
            }else{
                this.$router.replace({
                    path:'/homeIndex'
                })
            }
        },
        onClickRight() {
            this.$router.replace({
                path:'/homeIndex'
            })
        }
    }
}
</script>
<style scoped>
</style>

<template>
    <div>
        <van-nav-bar
                title="收到的诉求"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
        />
        <div>
            <van-cell-group style="margin-top:20px;">
                <van-field v-model="item.applyType" label="诉求类别：" readonly />
                <van-field v-model="item.applyGoal" label="诉求目的：" type="textarea" utosize readonly />
                <van-field v-model="item.applyBy"  label="申请人：" readonly />
                <van-field v-model="item.applyTime"  label="申请时间：" readonly />
                <van-field label="问题图片：" />
                <van-row>
                    <van-col :span="spanValue" v-for="image in item.imageList">
                        <van-image
                                fit="contain"
                                :src="image.imgSrc"
                        />
                    </van-col>
                </van-row>
            </van-cell-group>
            <van-cell-group style="margin-top:20px;">
                <van-button round type="info" @click="handleReply">解决回复</van-button>
            </van-cell-group>
            <van-cell-group style="margin-top:20px;">
                <van-button round color="gray">反馈上级</van-button>
            </van-cell-group>
        </div>
        <!--解决回复模块框-->
        <van-dialog v-model="replyShow" title="解决回复" show-cancel-button>
            <span>dfa</span>
        </van-dialog>
    </div>
</template>

<script>
    // 引入组件
    import Vue from 'vue';
    import axios from 'axios';
    import { Image as VanImage, Col, Row, Dialog  } from 'vant';

    Vue.use(VanImage);
    Vue.use(Col);
    Vue.use(Row);
    Vue.use(Dialog);

    export default {
        name: "ReceivedDetail",
        data() {
            return {
                item:  this.$route.params.item,
                spanValue: '',
                replyShow: false
            }
        },
        created(){
          this.spanValue = 24 / this.item.imageList.length;
        },
        methods: {
            onClickLeft() {
                axios.post('/received/getReceivedList', {
                    tel: localStorage.getItem('tel')
                }).then(res=>{
                    this.$router.push({name: 'Received', params: {receivedList: res.data}});
                });
            },
            handleReply() {
                this.replyShow = true;
            }
        }
    }
</script>

<style scoped>

</style>
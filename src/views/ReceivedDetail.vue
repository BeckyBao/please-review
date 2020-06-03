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
                <van-button round color="gray" @click="feedbackReply">反馈上级</van-button>
            </van-cell-group>
        </div>
        <!--解决回复模块框-->
        <van-dialog v-model="replyShow" :showConfirmButton=false title="解决回复">
            <van-form @submit="submitReply">
                <van-field
                        v-model="replyInfo.replyContent"
                        rows="2"
                        autosize
                        label="答复意见："
                        type="textarea"
                        :rules="[{ required:true, message: '请输入答复意见' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit" >
                        提交
                    </van-button>
                    <van-button round block type="default" @click="replyShow=false">
                        取消
                    </van-button>
                </div>
            </van-form>
        </van-dialog>
        <!--反馈上级模块框-->
        <van-dialog v-model="feedbackShow" :showConfirmButton=false title="反馈上级">
            <van-form @submit="submitFeedback">
                <van-field
                        v-model="feedbackInfo.feedbackContent"
                        rows="2"
                        autosize
                        label="理由："
                        type="textarea"
                        :rules="[{ required:true, message: '请说明理由' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit" >
                        提交
                    </van-button>
                    <van-button round block type="default" @click="feedbackShow=false">
                        取消
                    </van-button>
                </div>
            </van-form>
        </van-dialog>
    </div>
</template>

<script>
    // 引入组件
    import Vue from 'vue';
    import axios from 'axios';
    import { Image as VanImage, Col, Row, NavBar, Dialog, Field, Form, Notify } from 'vant';
    import deepClone from '../utils/clone.js'

    Vue.use(VanImage);
    Vue.use(Col);
    Vue.use(Row);
    Vue.use(NavBar);
    Vue.use(Dialog);
    Vue.use(Field);
    Vue.use(Form);
    Vue.use(Notify);

    export default {
        name: "ReceivedDetail",
        data() {
            return {
                item:  this.$route.params.item,
                spanValue: '',
                replyShow: false,
                replyInfo:[],
                feedbackShow: false,
                feedbackInfo:[]
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
                this.replyInfo = deepClone(this.item);
            },
            submitReply() {
                axios.post('/received/replyApply', {
                    replyInfo:this.replyInfo
                }).then(res=>{
                    if(res.data.flag === 0) {
                        this.$notify({ type: 'success', message: '提交成功' });
                        this.replyShow = false;
                    }else {
                        this.$notify({ type: 'warning', message: '提交失败'+res.data.msg  });
                    }
                });
            },
            feedbackReply() {
                this.feedbackShow = true;
                this.feedbackInfo = deepClone(this.item);
            },
            submitFeedback() {
                axios.post('/received/feedbackApply', {
                    feedbackInfo:this.feedbackInfo
                }).then(res=>{
                    if(res.data.flag === 0) {
                        this.$notify({ type: 'success', message: '提交成功' });
                        this.feedbackShow = false;
                    }else {
                        this.$notify({ type: 'warning', message: '提交失败'+res.data.msg });
                    }

                });
            }
        }
    }
</script>

<style scoped>

</style>
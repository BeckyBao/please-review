<template>
    <div>
        <van-nav-bar
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
        />
        <div>
            <van-tag type="primary" size="large" class="tagStyle">我的诉求</van-tag>
            <van-field v-model="alreadyData.applyGoal" readonly style="padding-top: 0px;"></van-field>
            <van-field type="textarea" autosize v-model="alreadyData.applyContent" readonly></van-field>
        </div>
        <div style="margin-top:20px;">
            <van-tag type="primary" size="large" color="orange" class="tagStyle">答复意见</van-tag>
            <van-field type="textarea" autosize v-model="alreadyData.replyContent" readonly style="padding-top: 0px;"></van-field>
        </div>
        <div style="margin-top:20px;">
            <van-cell value="处理流程：" size="large" style="padding-bottom: 0px;padding-left: 10px; font-size:16px;"/>
            <van-steps direction="vertical" :active="0" active-color="#38f" style="text-align: left; font-size: 12px;">
                <van-step v-for="item in alreadyData.FlowList" :key="item.id">
                    <h3 style="margin:0px;">【{{item.state}}】{{item.stateDetail}}</h3>
                    <p style="margin:5px 0px 0px 0px;">{{item.time}}</p>
                </van-step>
            </van-steps>
        </div>
        <div style="margin-top:20px;">
            <van-cell value="反馈评价：" size="large" style="padding-bottom: 0px;padding-left: 10px; font-size:16px;"/>
            <van-form @submit="onSubmit">
                <van-field
                        readonly
                        clickable
                        name="picker"
                        :value="timelyType"
                        label="是否及时反馈："
                        label-width="130px"
                        label-align="right"
                        placeholder="请选择是否及时反馈"
                        @click="showTimelyPicker = true"
                        :rules="[{ required: true, message: '请选择是否及时反馈'}]"
                />
                <van-popup v-model="showTimelyPicker" position="bottom">
                    <van-picker
                            show-toolbar
                            :columns="timelyColumns"
                            @cancel="showTimelyPicker = false"
                            @confirm="onSelectTimely"
                    />
                </van-popup>
                <van-field
                        readonly
                        clickable
                        name="picker"
                        :value="satisfyType"
                        label="反馈结果满意度："
                        label-width="130px"
                        label-align="right"
                        placeholder="请选择反馈结果满意度"
                        @click="showSatisfyPicker = true"
                        :rules="[{ required: true, message: '请选择反馈结果满意度'}]"
                />
                <van-popup v-model="showSatisfyPicker" position="bottom">
                    <van-picker
                            show-toolbar
                            :columns="satisfyColumns"
                            @cancel="showSatisfyPicker = false"
                            @confirm="onSelectSatisfy"
                    />
                </van-popup>
                <van-field name="rate" label="对推广系统评分：" label-width="130px" label-align="right" :rules="[{ required: true, message: '请选择评分'}]">
                    <template #input>
                        <van-rate v-model="alreadyData.rate" />
                    </template>
                </van-field>
                <van-field
                        type="textarea"
                        v-model ="alreadyData.comments"
                        autosize label="评价内容："
                        label-width="130px"
                        label-align="right"
                        rows="2"
                        :rules="[{ required: true, message: '请输入评价内容'}]"
                >
                </van-field>
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
    // 引入组件
    import Vue from 'vue';
    import axios from 'axios';
    import { NavBar, Tag, Tabs, Field, Step, Steps, Cell, Form, Picker, Popup, Rate, Notify } from 'vant';
    Vue.use(NavBar);
    Vue.use(Tag );
    Vue.use(Tabs);
    Vue.use(Field);
    Vue.use(Step);
    Vue.use(Steps);
    Vue.use(Cell);
    Vue.use(Form);
    Vue.use(Picker);
    Vue.use(Popup);
    Vue.use(Rate);
    Vue.use(Notify);

    export default {
        name: "AlreadyDoDetail",
        data() {
            return {
                alreadyData: this.$route.params.alreadyData,
                showTimelyPicker: false,
                timelyColumns: [],
                timelyType: '',
                showSatisfyPicker: false,
                satisfyColumns: [],
                satisfyType: ''
            }
        },
        async created() {
            await this.getTimelyColumns();
            await this.getSatisfyColumns();
        },
        methods: {
            onClickLeft() {
                axios.post('/myApply/getMyWaitApply', {
                    tel: localStorage.getItem('tel')
                }).then(res=>{
                    this.$router.push({name: 'MyApply', params: {waitDoList: res.data}});
                });
            },
            getTimelyColumns() {
                axios.post('/myApply/getTimelyType', {
                }).then(res=>{
                    this.timelyColumns = res.data;
                });
            },
            onSelectTimely(value) {
                this.timelyType = value.text;
                this.alreadyData.timelyFeedBack = value.value;
                this.showTimelyPicker = false;
            },
            getSatisfyColumns() {
                axios.post('/myApply/getSatisfyType', {
                }).then(res=>{
                    this.satisfyColumns = res.data;
                });
            },
            onSelectSatisfy(value) {
                this.satisfyType = value.text;
                this.alreadyData.satisfaction = value.value;
                this.showSatisfyPicker = false;
            },
            onSubmit() {
                axios.post('/myApply/submitReply', {
                    replyInfo:this.alreadyData
                }).then(res=>{
                    if(res.data.flag === 0) {
                        this.$notify({ type: 'success', message: '提交成功' });
                    }else {
                        this.$notify({ type: 'warning', message: '提交失败'+res.data.msg  });
                    }
                });
            }
        }
    }
</script>

<style scoped>
.tagStyle{
    display: block;
    float: left;
    margin: 10px;
}
.van-field{
    padding-bottom: 0;
}
</style>
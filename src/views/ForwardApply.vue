<template>
    <div>
        <van-nav-bar
                title="诉求登记"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
        />

        <van-form :mode="sumbitInfo" @submit="submit">
            <van-field
                    readonly
                    clickable
                    name="picker"
                    :value="typeText"
                    label="诉求类别"
                    placeholder="请选择类型"
                    @click="showTypePicker = true"
                    :rules="[{ required: true, message: '请选择类型'}]"
            />
            <van-popup v-model="showTypePicker" position="bottom">
                <van-picker
                        show-toolbar
                        :columns="typeColumns"
                        @cancel="showTypePicker = false"
                        @confirm="onSelectType"
                />
            </van-popup>
            <van-field
                    readonly
                    clickable
                    :value="sumbitInfo.applyTime"
                    label="发布时间"
                    placeholder="请选择时间"
                    @click="showTimePicker = true"
                    :rules="[{ required: true, message: '请选择时间'}]"
            />
            <van-popup v-model="showTimePicker" position="bottom">
                <van-datetime-picker
                        type="date"
                        @cancel="showTimePicker = false"
                        @confirm="onSelectTime"
                />
            </van-popup>
            <van-field
                 v-model="sumbitInfo.applyGoal"
                 label="诉求目的："
                 rows="2"
                 autosize
                 maxlength="20"
                 show-word-limit
                 placeholder="请输入诉求目的（20字以内）"
                 :rules="[{ required: true, message: '请输入诉求目的'}]">
            </van-field>
            <van-field
                    v-model="sumbitInfo.applyContent"
                    label="诉求内容："
                    maxlength="200"
                    rows="5"
                    autosize
                    show-word-limit
                    placeholder="请输入诉求内容（200字以内）"
                    :rules="[{ required: true, message: '请输入诉求内容'}]">
            </van-field>
            <van-field name="uploader" label="上传图片">
                <template #input>
                    <van-uploader :before-read="beforeRead" multiple :max-count="6" v-model="fileList" />
                </template>
            </van-field>
            <van-field
                    v-model="sumbitInfo.name"
                    label="姓名："
                    placeholder="请输入姓名"
                    :rules="[{ required: true, message: '请输入姓名'}]">
            </van-field>
            <van-field
                 v-model="sumbitInfo.contact"
                 label="联系方式："
                 placeholder="请输入联系方式（手机号码）"
                 :rules="[{  pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机号'}]">
            </van-field>
            <van-field name="rate" label="对推广系统评分：" :rules="[{ required: true, message: '请选择评分'}]">
                <template #input>
                    <van-rate v-model="sumbitInfo.rate" />
                </template>
            </van-field>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    // 引入组件
    import Vue from 'vue';
    import axios from 'axios';
    import moment from 'moment'
    import { NavBar, Field, Form, Notify, Uploader, Toast, Picker, Rate, Popup, DatetimePicker } from 'vant';
    Vue.use(NavBar);
    Vue.use(Field);
    Vue.use(Form);
    Vue.use(Notify);
    Vue.use(Uploader);
    Vue.use(Toast);
    Vue.use(Picker);
    Vue.use(Rate);
    Vue.use(Popup);
    Vue.use(DatetimePicker);

    export default {
        name: "ForwardApply",
        data() {
            return{
                sumbitInfo: {
                    "applyContent": '',
                    "applyGoal": ''
                },
                typeText: '',
                showTypePicker: false,
                typeColumns: [],
                showTimePicker: false,
                fileList: []
            }
        },
        async created() {
            await this.getTypeColumns();
        },
        methods: {
            getTypeColumns() {
                axios.post('/forward/getReplyType', {
                }).then(res=>{
                    this.typeColumns = res.data;
                });
            },
            onClickLeft() {
                this.$router.replace({
                    path:'/homeIndex'
                })
            },
            beforeRead(file) {
                if (file.type !== 'image/jpeg') {
                    Toast('一次请选择一张照片，且请上传 jpg 格式图片');
                    return false;
                }
                return true;
            },
            onSelectType(value) {
                this.typeText = value.text;
                this.sumbitInfo.applyType = value.value;
                this.showTypePicker = false
            },
            onSelectTime(value) {
                this.sumbitInfo.applyTime = moment(value).format("YYYY-MM-DD");
                this.showTimePicker = false;
            },
            submit() {
                this.sumbitInfo.imageList = this.fileList;
                console.log(this.sumbitInfo);
            }
        }
    }
</script>

<style scoped>

</style>
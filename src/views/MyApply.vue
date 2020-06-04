<template>
    <div >
        <van-nav-bar
                title="我的诉求"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
        />
        <van-tabs v-model="activeName" @click="onClickTab">
            <van-tab title="处理中" name="waitDo">
                <div v-for="item in waitDoList" :key="item.id" style="margin:10px 10px; padding-bottom:10px;">
                    <van-field v-model="item.applyTime" readonly></van-field>
                    <van-field v-model="item.applyGoal" readonly></van-field>
                    <van-field type="textarea" autosize v-model="item.applyContent" readonly style="padding-bottom:5px;"></van-field>
                    <van-field label="当前状态：" v-model="item.applyState" disabled></van-field>
                </div>
            </van-tab>
            <van-tab title="已办结" name="alreadyDo">
                <div v-for="item in alreadyDoList" :key="item.id" style="margin:10px 10px; padding-bottom:10px;">
                    <van-field v-model="item.applyTime" readonly></van-field>
                    <van-field v-model="item.applyGoal" readonly></van-field>
                    <van-field type="textarea" autosize v-model="item.applyContent" readonly style="padding-bottom:5px;"></van-field>
                    <van-field label="办理时间：" v-model="item.dealTime" disabled>
                        <template #button>
                            <van-button size="small" type="info" @click="handleView(item.id)">查看</van-button>
                        </template>
                    </van-field>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    // 引入组件
    import Vue from 'vue';
    import axios from 'axios';
    import { NavBar, Tab, Tabs, Field } from 'vant';
    Vue.use(NavBar);
    Vue.use(Tab);
    Vue.use(Tabs);
    Vue.use(Field);

    export default {
        name: "MyApply",
        data() {
            return {
                activeName: "waitDo",
                waitDoList: [],
                alreadyDoList: []
            }
        },
        async created() {
            await this.getMyWaitApply();
            await this.getalreadyDoList();
        },
        methods: {
            onClickLeft() {
                this.$router.replace({
                    path:'/homeIndex'
                })
            },
            async onClickTab(name) {
                if( name === "waitDo") {
                    await this.getMyWaitApply();
                }else if ( name === "alreadyDo") {
                    await this.getalreadyDoList();
                }
            },
            getMyWaitApply() {
                axios.post('/myApply/getMyWaitApply', {
                    tel: localStorage.getItem('tel')
                }).then(res=>{
                    this.waitDoList = res.data;
                });
            },
            getalreadyDoList() {
                axios.post('/myApply/getAlreadyDoList', {
                    tel: localStorage.getItem('tel')
                }).then(res=>{
                    this.alreadyDoList = res.data;
                });
            },
            handleView(id){
                axios.post('/myApply/getAlreadyDoDetail', {
                    id: id
                }).then(res=>{
                    this.$router.push({name: 'AlreadyDoDetail', params: {alreadyData: res.data}})
                });
            }
        }
    }
</script>

<style scoped>
    .van-field{
        background-color: #f9f9f9;
        padding-bottom: 0;
    }
</style>
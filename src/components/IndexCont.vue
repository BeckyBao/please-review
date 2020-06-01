<template>
    <div>
        <div class="content">
            <div class="headDiv">
                建行请你评
            </div>
            <div v-if="type === 'employee'" class="inDiv">
                <div class="editDiv">
                    <van-icon name="edit" color="blue" size="50"/>
                    <div style="font-size: 14px;">提出诉求</div>
                </div>
                <div class="editDiv">
                    <van-icon name="chat" color="green" size="50"/>
                    <div style="font-size: 14px;">我的诉求</div>
                </div>
                <div class="editDiv" @click ="toReceived">
                    <van-icon name="invition" color="#1E74E6" size="50"/>
                    <div style="font-size: 14px;">收到的的诉求</div>
                </div>
            </div>
            <div v-else-if="type === 'client'" class="inDiv">
                <div class="editDiv2">
                    <van-icon name="edit" color="blue" size="50"/>
                    <div style="font-size: 14px;">提出诉求</div>
                </div>
                <div class="editDiv2">
                    <van-icon name="chat" color="green" size="50"/>
                    <div style="font-size: 14px;">我的诉求</div>
                </div>
            </div>
        </div>
        <div style="height: 160px; text-align: left;width:90%; margin: 0 5% 0 5%;">
            <van-panel>
                <template #header>
                    <div style="font-size: 14px; padding: 5px;  border: 1px solid #D4D4D7">
                        <van-icon name="notes-o" color="orange" style="margin-right: 5px;"/>
                        热点解答
                        <van-button type="default" size="mini" style="float: right;" @click="showMoreAnswer">更多</van-button>
                    </div>
                </template>
                <div>
                    <van-cell v-for="item in answerlist" :key="item.id" :title="item.title" style="padding: 5px;font-size: 14px;"/>
                </div>
            </van-panel>
        </div>
        <div  v-if="type === 'employee'" style="height: 160px; text-align: left;width:90%; margin: 0 5% 0 5%;">
            <van-panel>
                <template #header>
                    <div style="font-size: 14px; padding: 5px; border: 1px solid #D4D4D7">
                        <van-icon name="notes-o" color="blue" style="margin-right: 5px;"/>
                        最新系统
                        <van-button type="default" size="mini" style="float: right;" @click="showMoreSystem">更多</van-button>
                    </div>
                </template>
                <div>
                    <van-cell  v-for="item in systemlist" :key="item.id" :title="item.title" style="padding: 5px;font-size: 14px;"/>
                </div>
            </van-panel>
        </div>
    </div>
</template>

<script>
    // 引入组件
    import Vue from 'vue';
    import axios from 'axios';
    import { Button, Field, Icon, List, Panel, Cell} from "vant";

    Vue.use(List);
    Vue.use(Cell);
    Vue.use(Icon);
    Vue.use(Button);
    Vue.use(Field);
    Vue.use(Panel);
    export default {
        name: "IndexCont",
        props: {
            type: {
                type: String,
                default: 'employee'
            },
        },
        data() {
            return{
                searchKeyValue: '',
                answerlist: [],
                systemlist:[],
                activeNames: [1]
            }
        },
        async created() {
            await this.getAnswerlist();
            await this.getSystemlist();
        },
        methods: {
            getAnswerlist() {
                axios.post('/index/getAnswerlist', {
                }).then(res=>{
                    if(res.data.size <= 3) {
                        this.answerlist = res.data;
                    }else{
                        this.answerlist = res.data.slice(0, 3);
                    }
                })
            },
            getSystemlist() {
                axios.post('/index/getSystemlist', {
                }).then(res=>{
                    if(res.data.size <= 3) {
                        this.systemlist = res.data;
                    }else{
                        this.systemlist = res.data.slice(0, 3);
                    }
                })
            },
            showMoreAnswer() {
                this.$router.push({name: 'ShowList', params: {searchList: this.answerlist}})
            },
            showMoreSystem() {
                this.$router.push({name: 'ShowList', params: {searchList: this.systemlist}})
            },
            toReceived() {
                axios.post('/received/getReceivedList', {
                    tel: localStorage.getItem('tel')
                }).then(res=>{
                    this.$router.push({name: 'Received', params: {receivedList: res.data}});
                });
            }
        },
    }
</script>

<style scoped>
    .content{
        height:155px;
        position: relative;
    }
    .headDiv{
        height: 80px;
        background-color: #1E74E6;
        color:white;
        line-height:80px;
        font-size: 30px;
        font-weight: 900;
    }
    .inDiv{
        height: 80px;
        width: 80%;
        background-color: white;
        position: absolute;
        top: 60px;
        left: 10%;
        border-radius:5px;
    }
    .editDiv{
        display: inline-block;
        width: 33%;

        margin-top: 5px;
    }
    .editDiv2{
        display: inline-block;
        width: 50%;
        margin-top: 5px;
    }
    .van-panel__header{
        padding: 5px;
    }
    .van-cell{
        border: 1px solid #D4D4D7;
    }
</style>
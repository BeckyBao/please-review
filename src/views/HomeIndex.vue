<template>
    <div class="container">
        <header class="header">
            <van-field
                    v-model="searchKeyValue"
                    left-icon="search"
                    clearable
                    placeholder="智能回答--请输入问题关键词"
            >
                <template #button>
                    <van-button size="small" type="info">搜索</van-button>
                </template>
            </van-field>
        </header>
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
                <div class="editDiv">
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
                        <span style="color: gray; float: right;">更多</span>
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
                        <span style="color: gray; float: right;">更多</span>
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
        name: "web",
        data() {
            return{
                searchKeyValue: '',
                type: 'employee',
                answerlist: [],
                systemlist:[],
                activeNames: [1]
            }
        },
        async created() {
            await this.getAnswerlist();
            await this.getSystemlist();
            console.log(localStorage.getItem('isLogin'));
        },
        methods: {
             getAnswerlist() {
                 axios.post('/index/getAnswerlist', {
                 }).then(res=>{
                     this.answerlist = res.data;
                 })
            },
            getSystemlist() {
                axios.post('/index/getSystemlist', {
                }).then(res=>{
                    this.systemlist = res.data;
                })
            }
        }
    };
</script>
<style>
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
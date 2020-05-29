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
                    <van-button size="small" type="info" @click = "handleSearch">搜索</van-button>
                </template>
            </van-field>
        </header>
        <IndexCont :type="type"></IndexCont>


    </div>
</template>
<script>
    // 引入组件
    import Vue from 'vue';
    import axios from 'axios';
    import { Button, Field } from "vant";
    import IndexCont from "../components/IndexCont";

    Vue.use(Button);
    Vue.use(Field);

    export default {
        name: "web",
        components:{IndexCont},
        data() {
            return{
                searchKeyValue: '',
                type: 'employee',
                showIndex: true,
                showSearchList: false,
                searchList: []
            }
        },
        async created() {
        },
        methods: {
            handleSearch() {
                axios.post('/index/search', {
                    searchKeyValue: this.searchKeyValue
                }).then(res=>{
                    this.searchList = res.data;
                    this.$router.push({name: 'ShowList', params: {searchList: this.searchList}})
                })
            },
        }
    };
</script>
<style>

</style>
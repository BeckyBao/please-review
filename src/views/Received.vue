<template>
    <div>
        <van-nav-bar
                title="收到的诉求"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
        />
        <div>
            <van-cell-group v-for="item in receivedList"  :key="item.id" style="margin-top:20px;">
                <van-field v-model="item.applyType" label="诉求类别：" readonly />
                <van-field v-model="item.applyGoal" label="诉求目的：" type="textarea" utosize readonly />
                <van-field v-model="item.applyBy"  label="申请人：" readonly>
                    <template #button v-if="item.applyState === '待解决'">
                        <van-button size="small" plain color="red" @click = "toDetail(item)">{{item.applyState}}</van-button>
                    </template>
                    <template #button v-else-if="item.applyState !== '待解决'">
                        <van-button size="small" plain disabled>{{item.applyState}}</van-button>
                    </template>
                </van-field>
                <van-field v-model="item.applyTime"  label="申请时间：" readonly />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    // 引入组件
    import Vue from 'vue';
    import { List, Cell, CellGroup, Toast, NavBar } from "vant";
    import axios from 'axios';
    Vue.use(List);
    Vue.use(Cell);
    Vue.use(CellGroup);
    Vue.use(Toast);
    Vue.use(NavBar);
    export default {
        name: "Received",
        data() {
            return {
                receivedList: this.$route.params.receivedList,
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back();
            },
            toDetail(item) {
                this.$router.push({name: 'ReceivedDetail', params: {item: item}})

            }
        }

    }
</script>

<style scoped>
.van-field{
    padding-bottom: 0;
}
</style>
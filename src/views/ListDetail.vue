<template>
    <div>
        <van-nav-bar
                :title="detailTitle"
                left-text="返回"
                right-text="首页"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
        />
        {{this.content}}
    </div>
</template>

<script>
    import Vue from 'vue';
    import { NavBar,Toast } from 'vant';
    Vue.use(NavBar);
    Vue.use(Toast);

    export default {
        name: "ListDetail",
        data() {
            return {
                detailTitle: this.$route.params.detailTitle,
                content: this.$route.params.content
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            onClickRight() {
                this.$router.replace({
                    path:'/homeIndex'
                })
            },
        }
    }
</script>

<style scoped>

</style>
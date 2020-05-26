<template>
    <div>
        <van-button type="primary">主要按钮</van-button>
    </div>
</template>
<script>
    // 引入组件
    import { Button } from "vant";

    export default {
        name: "web",

        // 注册组件
        components: {
            [Button.name]: Button
        }
    };
</script>
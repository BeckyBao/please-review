<template>
    <div class="container">
        <header class="header">
            <div class="headDiv">
                建行请你评
            </div>
        </header>
        <div class="content">
            <van-field
                    v-model="tel"
                    placeholder="请输入手机号"
                    :error-message="usertel"

                    clearable
            />
            <van-field
                    v-model="password"
                    type="password"
                    placeholder="请输入密码"
                    :error-message="pass"
                    clearable
            />
            <van-field
                    v-model="sms"
                    center
                    clearable
                    placeholder="请输入验证码"
                    :error-message="test"
                    style="display: inline-block;"
            >
                <template #button>
                    <div class="code" @click="refreshCode">
                        <s-identify :identifyCode="identifyCode"></s-identify>
                    </div>
                </template>
            </van-field>
            <van-button type="info" :loading="loading" loading-text="注册..." size="large" :disabled="zhud" @click="register">注册</van-button>
            <van-divider @click="toLogin">去登录</van-divider>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { Field, Button,Toast } from 'vant'
    import axios from 'axios'
    import SIdentify from '../components/identify'
    Vue.use(Field)
    Vue.use(Button)
    Vue.use(Toast)
    export default {
        name: "Register.vue",
        components:{SIdentify},
        data () {
            return {
                tel:'',
                password:'',
                username: '',
                identifyCodes: "1234567890",
                identifyCode: "",
                sms:'',
                buttonmsg:'点击发送验证码',
                flag:false,
                adminCode:'',
                zhud:false,
                loading:false
            }
        },
        computed: {
            usertel () {
                if (this.tel === ""){
                    return ''
                }else if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.tel)){
                    return '手机号格式错误'
                }else {
                    return ''
                }
            },
            usernamemsg () {
                if (this.username === '') {
                    return ''
                } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.username)) {
                    return '手机号码格式错误'
                } else {
                    return ''
                }
            },
            pass () {
                if (this.password === ""){
                    return ''
                }else if(this.password.length<6){
                    return '密码不可小于6位'
                }else {
                    return ''
                }
            },
            test () {
                if (this.sms === ""){
                    return ''
                }else if(this.sms.length !== 4){
                    return '验证码格式错误'
                }else {
                    return ''
                }
            }
        },
        mounted() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        methods: {
            toLogin () {
                this.$router.replace('/')
            },
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                        ];
                }
            },
            register () {
                if (this.tel === '' || this.usertel === '手机号码格式错误') {
                    Toast('手机号码输入有误')
                    return
                }
                if (this.password === '' || this.pass === '密码格式错误，最少为6位') {
                    Toast('密码输入有误')
                    return
                }
                if (this.sms === '' || this.sms !== this.identifyCode) {
                    Toast('验证码输入有误')
                    return
                }
                this.reallR()
            },
            reallR () {
                this.zhud=true
                this.loading=true
                axios.post('/users/register', {
                    username: this.tel,
                    password: this.password
                }).then(res=>{
                    this.zhud=false
                    this.loading=false
                    if (res.data === 2) {
                        Toast('用户名已注册，请直接登录')
                    } else if (res.data === 0) {
                        Toast('注册失败')
                    } else {
                        Toast('注册成功')
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .headDiv{
        height: 80px;
        background-color: #1E74E6;
        color:white;
        line-height:80px;
        font-size: 30px;
        font-weight: 900;
    }
    .content{
        margin: 5%;
    }
    .code {
        /*display: inline-block;*/
        /*width: 100px;*/
        /*height: 40px;*/
        /*border: 1px solid #1E74E6;*/
    }
</style>
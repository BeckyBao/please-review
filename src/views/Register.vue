<template>
  <div class="container">
      <header class="header">注册</header>
      <div class="content">
          <van-field
                  v-model="username"
                  placeholder="请输入手机号"
                  clearable
                  :error-message="usernamemsg"
          />
          <van-field
                  v-model="password"
                  type="password"
                  clearable
                  placeholder="请输入密码"
                  error-message="密码格式错误"
          />
          <van-field
                  v-model="code"
                  center
                  clearable
                  placeholder="请输入短信验证码"
                  error-message="验证码格式错误"
          >
              <van-button slot="button" size="small" type="primary">发送验证码</van-button>
          </van-field>
      </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import { Field, Button } from 'vant'
    import axios from 'axios'
    Vue.use(Field)
    Vue.use(Button)
    export default {
        name: "Register.vue",
        data () {
            return {
                tel:'',
                password:'',
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
                }else if(this.sms.length !== 5){
                    return '验证码格式错误'
                }else {
                    return ''
                }
            }
        },
        methods: {
            toLogin () {
                this.$router.replace('/login')
            },
            sendCode () {
                let time = 4
                let timer
                timer = setInterval(()=>{
                    time --
                    if(time === 0){
                        clearInterval(timer)
                        this.flag=false
                        this.buttonmsg = '点击发送验证码'
                        return
                    }
                    this.flag = true
                    this.buttonmsg = time + '秒后重新发送'

                },1000)
                this.getCode()
            },
            getCode () {
                if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.tel) || this.tel===""){
                    console.log('手机号码输入有误')
                }else{
                    axios.get('https://www.daxunxun.com/users/sendCode?tel='+this.tel).then(res=>{
                        if(res.data === 1){
                            console.log('用户名已注册，请更改')
                        }else if(res.data === 0){
                            console.log('获取验证码失败')
                        }else{
                            this.adminCode = res.data.code
                            console.log(this.adminCode)
                        }
                    })
                }
            },
            register () {
                if (this.tel === '' || this.usertel === '手机号码格式错误') {
                    console.log('手机号码输入有误')
                    return
                }
                if (this.password === '' || this.pass === '密码格式错误，最少为6位') {
                    console.log('密码输入有误')
                    return
                }
                if (this.sms === '' || this.sms !== this.adminCode) {
                    console.log('验证码输入有误')
                    return
                }
                this.reallR()
            },
            reallR () {
                this.zhud=true
                this.loading=true
                axios.post('https://www.daxunxun.com/users/register', {
                    username: this.tel,
                    password: this.password
                }).then(res=>{
                    this.zhud=false
                    this.loading=false
                    if (res.data === 2) {
                        console.log('用户名已注册，请直接登录')
                    } else if (res.data === 0) {
                        console.log('注册失败')
                    } else {
                        console.log('注册成功')
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
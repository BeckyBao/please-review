<template>
  <div class="container">
    <header class="header">注册头部</header>
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
      <van-button type="primary" :loading="loading" loading-text="登录..." size="large" :disabled="zhud" @click="login">登录</van-button>
      <van-divider @click="toRegister">去注册</van-divider>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Field,Button,Toast,Divider} from 'vant'
import axios from 'axios'
Vue.use(Field)
Vue.use(Button)
Vue.use(Toast)
Vue.use(Divider)
export default {
  name: 'Login',
  data () {
      return {
          tel:'',
          password:'',
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
      }
  },
  methods: {
      toRegister () {
          this.$router.replace('/register')
      },
      login () {
          if (this.tel === '' || this.usertel === '手机号码格式错误') {
              Toast('手机号码输入有误')
              return
          }
          if (this.password === '' || this.pass === '密码格式错误，最少为6位') {
              Toast('密码输入有误')
              return
          }
          if (this.sms === '' || this.sms !== this.adminCode) {
              Toast('验证码输入有误')
              return
          }
          this.reallR()
      },
      reallR () {
          this.zhud=true
          this.loading=true
          axios.post('https://www.daxunxun.com/users/login', {
              username: this.tel,
              password: this.password
          }).then(res=>{
              this.zhud=false
              this.loading=false
              if (res.data === 2) {
                  Toast('用户未注册')
              } else if(res.data === -1){
                  Toast('密码错误')
              }else if (res.data === 0) {
                  Toast('登录失败')
              } else {
                  Toast('登录成功')
                  localStorage.setItem('isLogin','ok') //登录标识
                  this.$router.back()  //登陆成功返回上一页
              }
          })
      }
  }
}
</script>

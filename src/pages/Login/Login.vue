<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: isOnShow}" @click="isOnShow = true">短信登录</a>
          <a href="javascript:;" :class="{on: !isOnShow}" @click="isOnShow = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <!--短信登陆-->
          <div :class="{on: isOnShow}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!isCountdown" class="get_verification" :class="{right_phone: isCountdown}"
              @click="getCode">
                {{computeTime > 0 ? `已发送${computeTime}s` : '获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <!--密码登陆-->
          <div :class="{on: !isOnShow}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="密码" v-show="isPwdVisit" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-show="!isPwdVisit" v-model="pwd">
                <div class="switch_button" :class="isPwdVisit ? 'on' : 'off'" @click="isPwdVisit = !isPwdVisit">
                  <div class="switch_circle" :class="{right: isPwdVisit}"></div>
                  <span class="switch_text">{{isPwdVisit ? 'abc': '...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="pwdCode">
                <img class="get_verification" src="http://localhost:5000/captcha" alt="captcha"
                ref="svgCaptcha" @click.stop.prevent="getNewCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <router-link to="/app/profile" class="go_back">
        <i class="iconfont iconzuojiantou"></i>
      </router-link>
    </div>
  </section>
</template>

<script>
  import {sendCode} from "../../api/api";

  export default {
    name: "Login",
    data() {
      return {
        isOnShow: true, // true：短信登陆；false：密码登陆
        isPwdVisit: false, // true:密码可见；false：密码不可见
        phone: '', // 手机号
        code: '', // 短信登陆的验证码
        name: '', // 用户名
        pwd: '', // 密码
        pwdCode: '', // 密码登录的验证码
        computeTime: 0, // 验证码发送的计时时间
        isCountdown: false, // 能否点击发送验证码
      }
    },
    watch: {
      phone (val) {
        this.isCountdown = /^1[3456789]\d{9}$/.test(val)
      }
    },
    mounted () {
    },
    methods: {
    //  获取手机验证码
      getCode () {
        this.isCountdown = false
        this.computeTime = 30
        // 调用发送手机验证码接口
        sendCode({phone: this.phone})
          .then(res => {
            console.log('点击获取验证啊', res)
          })
        const timer = setInterval (() => {
          this.computeTime--
          if (this.computeTime <= 0) {
            clearInterval(timer)
            this.isCountdown = true
          }
        }, 1000)
      },

    //  点击验证码获取到新的验证码图片，只有每次地址刷新或是改变后才会返回新的验证码
      getNewCaptcha () {
        this.$refs.svgCaptcha.src = `http://localhost:5000/captcha?time=${new Date()}`
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          display flex
          justify-content center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                box-sizing content-box
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>

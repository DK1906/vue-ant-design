<template>
  <div class="login-container">
    <a-form
      :form="loginForm"
      class="login-form"
      @submit.stop.prevent="submitLoginForm"
    >
      <h1 class="login-form__title">
        {{ PROJECTTITLE }}
      </h1>
      <a-form-item>
        <a-input
          class="login-form__input"
          placeholder="请输入用户名"
          size="large"
          v-decorator="[
            'username',
            { rules: [{ required: true, message: '请输入用户名' }] }
          ]"
        >
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input-password
          class="login-form__input"
          placeholder="请输入密码"
          size="large"
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: '请输入密码' },
                { min: 5, message: '请输入正确的密码' }
              ]
            }
          ]"
        >
          <a-icon slot="prefix" type="lock" />
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button
          html-type="submit"
          style="width:100%;"
          type="primary"
          size="large"
          :loading="loading"
        >
          登录
        </a-button>
      </a-form-item>
      <a-alert message="账号/密码：admin" type="info" />
    </a-form>
  </div>
</template>
<script>
import store from '@/store'
import { PROJECTTITLE } from '@/utils/config'
export default {
  data () {
    return {
      loginForm: {},
      PROJECTTITLE,
      loading: false
    }
  },
  methods: {
    submitLoginForm () {
      this.loginForm.validateFields((err, formData) => {
        if (!err) {
          this.loading = true
          store
            .dispatch({ type: 'user/login', formData })
            .then(() => {
              this.$router.push({
                path: (this.$route.query && this.$route.query.redirect) || '/'
              })
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    }
  },
  created () {
    this.loginForm = this.$form.createForm(this, { name: 'loginForm' })
  }
}
</script>
<style lang="less" scoped>
.login-container {
  height: 100vh;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: #f0f2f5;
  .login-form {
    width: 480px;
    margin: 240px auto;
    &__title {
      text-align: center;
    }
  }
}
</style>

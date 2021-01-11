<template>
  <div class="layout-header__header-action">
    <!-- <a-avatar icon="user" /> -->
    <a-popover v-model="visible"  trigger="click" placement="bottom">
    <div slot="content">
      <div>
       <a-icon type="user" />
        <a-button type="link" size="small" @click="editInfo">
      修改资料
    </a-button>
    </div>
    <div>
       <a-icon type="logout" />
      <a-button type="link" size="small" @click="logout">
      退出登录
    </a-button>
    </div>
    </div>
    <a-avatar icon="user" />
  </a-popover>
    <span>{{ userInfo.name }}</span>
    <!-- <a-divider type="vertical" />
    <a-button type="link" size="small" @click="logout">
      退出
    </a-button> -->
    <InfoBox ref="infoBox"> </InfoBox>
  </div>
</template>
<script>
import  InfoBox  from "./personalInfoBox"
export default {
  components:{
  InfoBox
  },
  data(){
    return {
      personalInfoBoxVisible:false,
      visible:false
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo || {}
    }
  },
  methods: {
    // 登出
    logout () {
      this.$store.dispatch({ type: 'user/logout' }).then(() => {
        this.$message.success('退出登录成功')
      })
    },
    editInfo () {
     this.$refs.infoBox.show()
    }
  }
}
</script>
<style lang="less" scoped>
.layout-header__header-action {
  padding-right: 24px;
  .ant-avatar {
    margin-right: 8px;
  }
  .ant-btn {
    padding: 0;
    color: #333;
  }
}
</style>

<template>
  <a-layout-content class="layout-content">
    <div class="layout-content__main">
      <div  class="layout-content__header">
        <a-tag 
        v-for="tag in this.$store.state.app.tagList"
       :key="tag.name"
       :closable="tag.name==='节点授权信息'?false:true"
       @close="handleClose(tag.key)"
       @click="handleClick(tag)"
       :class="[tag.checked?'checked-tag':'',tag.show?'show-tag':'hide-tag']"
       >
      {{ tag.name }}
    </a-tag>
      </div>
      <router-view />
    </div>
  </a-layout-content>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods:{
    handleClose(key){ 
      this.$store.dispatch('app/deleteTag',key)
    },
    handleClick(tag){
      this.$store.dispatch('app/checkedTag',tag.key)
      this.$router.push( { path:tag.path })
    }
  }
}
</script>
<style lang="less" scoped>
.layout-content {
  .layout-content__main{
    .layout-content__header{
      background: white;
       color:#108ee9;
       /deep/.ant-tag{
        width:119px;
        text-align: center;
         position: relative;
         height:36px;
         line-height: 36px;
         margin-right: 0;
         color:#3e4853;
         font-size:14px;
         font-family: "Microsoft YaHei";
         i{
          position: absolute;
          right:0;
          padding: 2px;
          font-weight: bold;
         &:hover{
           background:orangered;
           color:white;
         }
         }
       }
       .checked-tag{
         background:#1890ff;
         color:white;
       }
       .show-tag{
         display: inline-block !important;
       }
       .hide-tag{
         display: none !important;
       }

    }
  }
 
}
</style>

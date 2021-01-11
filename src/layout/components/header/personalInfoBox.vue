<template>
    <a-modal 
    v-model="visible" 
    title="修改个人信息" 
    :footer="null" 
    width="700px" >
      <a-form-model 
      :form="form" 
      layout="inline"  
      ref="infoForm" 
      :model="form" 
      :rules="rules"
      :labelCol ="{ style: 'width: 100px' }"
      >  
      <a-form-model-item label="用户姓名" prop="username">
        <a-input
        disabled
        v-model="form.username"
        />
      </a-form-model-item>
        <a-form-model-item label="性别" prop="sex">
        <a-select v-model="form.sex"  class="sex-select">
        <a-select-option value="1">
         男
        </a-select-option>
        <a-select-option value="0">
         女
        </a-select-option>
      </a-select>
      </a-form-model-item> 
      <a-form-model-item label="用户昵称" prop="username">
        <a-input
        v-model="form.username"
        />
      </a-form-model-item> 
        <a-form-model-item label="修改密码" prop="update">
          <a-radio-group v-model="form.update">
        <a-radio value="1">
          是
        </a-radio>
        <a-radio value="0">
          否
        </a-radio>
      </a-radio-group>
      </a-form-model-item> 
      <a-form-model-item label="电子邮箱" prop="username">
        <a-input
        v-model="form.username"
        />
      </a-form-model-item>
        <a-form-model-item label="原密码" prop="username" v-if="form.update==='1'">
        <a-input
        v-model="form.username"
        />
       
      </a-form-model-item>
       <span v-else class="empty-span"></span>
      <a-form-model-item label="手机号码" prop="username">
        <a-input
        v-model="form.username"
        />
      </a-form-model-item>
        <a-form-model-item label="新密码" prop="username"  v-if="form.update==='1'">
        <a-input
        v-model="form.username"
        />
      </a-form-model-item>
       <span v-else class="empty-span"></span>
      <a-form-model-item label="固定电话" prop="username">
        <a-input
        v-model="form.username"
        />
      </a-form-model-item>
        <a-form-model-item label="确认新密码" prop="username"  v-if="form.update==='1'">
        <a-input
        v-model="form.username"
        />
      </a-form-model-item> 
    </a-form-model>
      <a-divider />
      <footer>
     <a-button type="primary"  @click="hideModal" class="save-button">
      保存
    </a-button>
    <a-button type="info"  @click="hideModal">
      关闭
    </a-button>
      </footer>
    </a-modal>
</template>
<script>
export default {
    data(){
        return {
            visible:false,
            labelCol: { span: 6 ,},
            form: {
                username: '',
                sex:'1',
                update:'0'
              },
            rules:{
                 username: [
                    { required: true, message: 'Please input Activity name', trigger: 'blur' },
                    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
                  ],
                  sex: [
                    { required: true, message: 'Please input Activity name', trigger: 'blur' },
                  ],
                  update: [
                    { required: true, message: 'Please input Activity name', trigger: 'blur' },
                  ],
              }
        }
    },
    methods:{
        show(){
            this.visible = true
        },
        hideModal(){
            this.visible = false
        }
    }
}
</script>
<style lang="less" scoped>
.sex-select{
    width:174px;
}
.empty-span{
    padding: 0 50px;
}
footer{
    text-align: center;
    .save-button{
        margin-right: 10px;
    }
}
    
</style>
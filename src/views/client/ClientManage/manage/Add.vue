<template>
  <div>
    <a-modal
      title="新建客户信息"
      :width="640"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel">
      <a-form :form="form">
        <a-form-item
          label="客户名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入客户名称"
            v-decorator="['name',{ rules: [
                                     { required: true, message: '请输入客户名称' },
                                     { min: 1,max:24, message: '名称长度为1-24个字符' },
                                     { validator}],
                                   validateFirst: true}]" />
        </a-form-item>
        <a-form-item
          label="客户地址"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-textarea
            :rows="4"
            placeholder="请输入客户地址"
            v-decorator="['address',{ rules: [
                                        { required: true, message: '请输入客户地址' }],
                                      validateFirst: true}]" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { CustomertAdd, CustomertList } from '@/api/client'
import { nameRepeatValidator } from '@/utils/validator'
import { debounce } from '@/utils/util'

export default {
    mixins: [mixinFormModal],
    data () {
        return {
            validatorName: []
        }
    },
    methods: {
        Add (userList) {
            this.visible = true
            this.$nextTick(() => {
                setTimeout(() => {
                    this.form.setFieldsValue({ name: '', address: '' })
                })
            })
        },
        handleSubmit () {
            this.form.validateFields(async (errors, values) => {
                if (!errors) {
                    this.confirmLoading = true
                    CustomertAdd(values)
                        .then(res => {
                            this.$message.success('添加成功')
                            this.confirmLoading = false
                            this.$emit('ok', res)
                            this.visible = false
                        })
                        .catch(() => {
                            this.confirmLoading = false
                        })
                }
            })
        },
        // 校验重名称
        validator: debounce(function (rule, value, callback) {
            nameRepeatValidator(
                {
                    data: async () => {
                        try {
                            const data = this.deepGet(await CustomertList(), 'data', [])
                            return data
                        } catch (error) {
                            return []
                        }
                    },
                    field: 'name'
                },
                { rule, value, callback }
            )
        })
    }
}
</script>

<style lang="less" scoped>
/deep/input#name {
    background: content-box;
    height: 0;
    padding: 1.2em 0.5em;
    color: white !important;
}
/deep/input#name::first-line {
    color: white;
}
/deep/.ant-modal-title {
    margin: 0;
    color: white;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    word-wrap: break-word;
}
/deep/i.anticon.anticon-close.ant-modal-close-icon {
    color: white;
}
</style>

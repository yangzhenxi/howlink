<template>
  <div>
    <a-modal
      title="修改客户信息"
      :width="640"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel">
      <a-form :form="form">
        <a-form-item
          label="选择客户"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-select placeholder="请选择客户" style="width: 320px" v-decorator="['customer_id', { rules: [{required: true, message: '请选择客户'}] }]">
            <a-select-option v-for="i in customer" :value="i.id" :key="i.id">
              {{ i.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="机器名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入机器名"
            v-decorator="['name',{ rules: [
                                     { required: true, message: '请输入机器名' },
                                     { min: 1,max:24, message: '名称长度为1-24个字符' }],
                                   validateFirst: true}]" />
        </a-form-item>
        <a-form-item
          label="机器码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入机器码"
            v-decorator="['code',{ rules: [
                                     { required: true, message: '请输入机器码' },
                                     { validator:codeValidator}],
                                   validateFirst: true}]" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { CustomertCodePatch } from '@/api/client/machine'
import { CustomertList } from '@/api/client'
import { codeValidator } from '@/utils/validator'

export default {
  mixins: [mixinFormModal],
  data () {
    return {
        customer: [],
        record: []
    }
  },
  methods: {
    async Edit (item) {
        const { data } = await CustomertList()
        this.customer = data
        this.$nextTick(() => {
        setTimeout(() => {
          this.form.setFieldsValue(
            this.pick(item, ['customer_id', 'name', 'code'])
          )
        })
      })
        this.record = item
        this.visible = true
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
          this.confirmLoading = true
          CustomertCodePatch(values)
            .then((res) => {
              this.$message.success('修改成功')
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
    codeValidator
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

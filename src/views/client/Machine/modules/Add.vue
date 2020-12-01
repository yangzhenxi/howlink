<template>
  <div>
    <a-modal
      title="新建机器码"
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
import { CustomertList } from '@/api/client'
import { CustomertCodeList, CustomertCodeAdd } from '@/api/client/machine'
import { nameRepeatValidator, codeValidator } from '@/utils/validator'
import { debounce } from '@/utils/util'

export default {
    mixins: [mixinFormModal],
    data () {
        return {
            customer: [],
            validatorName: []
        }
    },
    methods: {
        async Add (userList) {
            this.visible = true
            const { data } = await CustomertList()
            this.customer = data
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
                    CustomertCodeAdd(values)
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
                            const data = this.deepGet(await CustomertCodeList(), 'data', [])
                            return data
                        } catch (error) {
                            return []
                        }
                    },
                    field: 'name'
                },
                { rule, value, callback }
            )
        }),
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

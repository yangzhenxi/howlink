<template>
  <div>
    <a-modal
      title="修改部门信息"
      :width="640"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel">
      <a-form :form="form">
        <a-form-item
          label="名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-input
            placeholder="请输入名称"
            v-decorator="['name',
                          { rules: [
                              { required: true, message: '请输入名称' },
                              {validator}
                            ],
                            validateFirst: true
                          }]" />
        </a-form-item>
        <a-form-item
          label="部门介绍"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-textarea
            :rows="4"
            placeholder="请输入部门介绍"
            v-decorator="['description',
                          { rules: [
                              { required: true, message: '请输入部门介绍' },
                            ],
                            validateFirst: true
                          }]" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { nameRepeatValidator } from '@/utils/validator'
import { debounce } from '@/utils/util'
import { mixinFormModal } from '@/utils/mixin'
import { departmentPatch } from '@/api/system/Department'
export default {
  mixins: [mixinFormModal],
  data () {
    return {
		record: {}
    }
  },
  methods: {
    Edit (item, validatorName) {
		this.visible = true
		this.record = item
		this.validatorName = validatorName
		this.$nextTick(() => {
			this.form.setFieldsValue({ name: item.name, description: item.description })
        })
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
			this.record.name = values.name
			this.record.description = values.description
		try {
			await departmentPatch({ department: values })
			this.$message.success('添加成功')
			this.$emit('ok')
			this.visible = false
		} catch (error) {
			this.$message.error('添加失败')
		}
        }
      })
	},
	// 校验重名称
    validator: debounce(function (rule, value, callback) {
        nameRepeatValidator({
            data: () => {
                try {
                    const data = this.validatorName
                    return data
                } catch (error) {
                    return []
                }
            },
            field: 'name',
            initialValue: this.deepGet(this.record, 'name')
        },
        { rule, value, callback }
        )
      })
  }
}
</script>

<style>
</style>

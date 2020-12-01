<template>
  <div>
    <a-modal
      title="新建部门"
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
            placeholder="请输入部门名称"
            v-decorator="['name',
                          { rules: [
                              { required: true, message: '请输入部门名称' },
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
import { departmentAdd } from '@/api/system/Department'
export default {
  mixins: [mixinFormModal],
  data () {
    return {
		validatorName: []
    }
  },
  methods: {
    async Add (item) {
		this.visible = true
		this.validatorName = item
    },
    handleSubmit () {
      this.form.validateFields(async (errors, values) => {
        if (!errors) {
			try {
				await departmentAdd({ department: values })
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
      nameRepeatValidator(
        {
          data: () => {
            try {
				console.log(this.validatorName)
              const data = this.validatorName
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

<style>
</style>

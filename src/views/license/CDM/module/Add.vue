<template>
  <div>
    <a-modal
      title="新建授权码"
      :width="840"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel"
      destroyOnClose>
      <!-- <a-form
        :form="form"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol" >
        <a-form-item label="客户">
          <a-select placeholder="请选择客户" @change="handleChange" v-decorator="['client',{rules:[{required: true, message: '请选择客户' }]}]" >
            <a-select-option v-for="(i,index) in clients" :key="index" :value="i.id">{{ i.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="机器码">
          <a-select placeholder="请选择机器码" v-decorator="['customer_machine_code_id',{rules:[{required: true, message: '请选择机器码' }]}]" >
            <a-select-option v-for="(i,index) in machineIds" :key="index" :value="i.id">{{ i.code }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="有效期">
          <a-input suffix="月" placeholder="有效期(月)" v-decorator="['last',{ rules: [{ required: true, message: '请输入客户名称' },{validator:numberValidator}],validateFirst: true}]" />
        </a-form-item>
        <a-form-item label="CDM" :required="false">
          <a-checkbox-group v-decorator="['cdm_modules']" style="width: 100%;">
            <a-row><a-col :span="8" v-for="(i,index) in CDMLicenseModule" :key="index"><a-checkbox :value="i.val" style="color:white">{{ i.key }}</a-checkbox></a-col></a-row>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="数据备份" :required="false">
          <a-checkbox-group v-decorator="['data_backup_modules']" style="width: 100%;">
            <a-row><a-col :span="8" v-for="(i,index) in dataBackUpLicenseModule" :key="index"><a-checkbox :value="i.val" style="color:white">{{ i.key }}</a-checkbox></a-col></a-row>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item
          v-for="(k, index) in form.getFieldValue('keys')"
          :key="k"
          v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
          :label="index === 0 ? '池配置' : ''"
          :required="true">
          <div style="display: flex;">
            <a-form-item style="flex:1;">
              <div>
                <a-select placeholder="池类型" v-decorator="[`type[${k}]`,{rules:[{required: true, message: '请选择池类型' }]}]" >
                  <a-select-option v-for="(i,p) in LinkBackupPoolLicenseType" :key="p" :value="i.val">{{ i.key }}</a-select-option>
                </a-select>
              </div>
            </a-form-item >
            <div style="flex:1;padding-left:10px;">
              <a-form-item>
                <a-select placeholder="池位置" v-decorator="[`location[${k}]`,{rules:[{required: true, message: '请选择池类型' }]}]" >
                  <a-select-option v-for="(i,_) in LinkBackupPoolLicenseLocation" :key="_" :value="i.val">{{ i.key }}</a-select-option>
                </a-select>
              </a-form-item>
            </div>
            <div style="flex:1;padding-left:10px;">
              <a-form-item>
                <a-input suffix="GB" placeholder="授权池容量" v-decorator="[`capacity[${k}]`,{rules:[{required: true, message: '请填写池容量' },{validator:numberValidator}]}]" />
              </a-form-item>
            </div>
            <a-icon
              style="position:absolute;top: 8px;left:480px"
              class="dynamic-delete-button"
              type="minus-circle"
              @click="() => remove(k)"/>
          </div>
        </a-form-item>
        <a-form-item v-bind="formItemLayoutWithOutLabel" style="text-align: center;">
          <a-button type="dashed" style="width: 60%" @click="add">
            <a-icon type="plus" /> 添加池选项
          </a-button>
        </a-form-item>
      </a-form> -->
      <a-row style="padding-top:25px;">
        <a-col
          :span="16"
          :offset="4">
          <a-steps
            class="steps"
            size="small"
            :current="currentTab">
            <a-step title="填写授权码信息" />
            <a-step title="完成" />
          </a-steps>
        </a-col>
      </a-row>

      <div class="content">
        <step1
          v-if="currentTab === 0"
          @close="close"
          @nextStep="nextStep" />
        <step2
          v-if="currentTab === 1"
          @close="close"
          @finish="finish"/>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { CustomertList, CustomertCodes } from '@/api/client'
import { licenseAdd } from '@/api/license/CDM'
import { deepGet } from '@/utils/util'
import { numberValidator } from '@/utils/validator'
let id = 0
export default {
    mixins: [mixinFormModal],
    data () {
        return {
			clients: [],
            currentTab: 0,
            machineIds: [],
            CDMLicenseModule: [
                { key: 'oracle', val: 'LINK_BACKUP_LICENSE_MODULE_ORACLE' },
                { key: 'mssql', val: 'LINK_BACKUP_LICENSE_MODULE_MSSQL' },
                { key: 'mysql', val: 'LINK_BACKUP_LICENSE_MODULE_MYSQL' },
                { key: 'file', val: 'LINK_BACKUP_LICENSE_MODULE_FILE' },
                { key: 'pgsql', val: 'LINK_BACKUP_LICENSE_MODULE_PGSQL' },
                { key: 'VMware', val: 'LINK_BACKUP_LICENSE_MODULE_VMWARE' },
                { key: 'hyper_v', val: 'LINK_BACKUP_LICENSE_MODULE_HYPER_V' }
            ],
            dataBackUpLicenseModule: [
                { key: 'mssql', val: 'LINK_BACKUP_LICENSE_MODULE_MSSQL' },
                { key: 'mysql', val: 'LINK_BACKUP_LICENSE_MODULE_MYSQL' }
            ],
            LinkBackupPoolLicenseType: [
                // { key: '1', val: 'POOL_LICENSE_TYPE_UNSPECIFIED' },
                { key: '快照池', val: 'LINK_BACKUP_POOL_LICENSE_TYPE_SNAPSHOT' },
                { key: '重删池', val: 'LINK_BACKUP_POOL_LICENSE_TYPE_DEDUP' }
            ],
            LinkBackupPoolLicenseLocation: [
                // { key: '2', val: 'POOL_LICENSE_LOCATION_UNSPECIFIED' },
                { key: '本地', val: 'LINK_BACKUP_POOL_LICENSE_LOCATION_LOCAL' },
                { key: '云端', val: 'LINK_BACKUP_POOL_LICENSE_LOCATION_CLOUD' }
            ],
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 }
            },
            formItemLayout: {
                labelCol: this.labelCol,
                wrapperCol: this.wrapperCol
            },
            formItemLayoutWithOutLabel: {
                wrapperCol: {
                    xs: { span: 18, offset: 4 },
                    sm: { span: 18, offset: 4 }
                }
            },
            key: [1],
            validatorName: []
        }
    },
    beforeCreate () {
        this.form = this.$form.createForm(this, { name: 'dynamic_form_item' })
        this.$nextTick(() => {
                this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
                this.form.getFieldDecorator('last', { initialValue: 1, preserve: true })
        })
    },
    methods: {
        async Add (userList) {
            this.visible = true
            this.clients = deepGet(await CustomertList(), 'data', [])
            this.$nextTick(() => {
                this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
                this.form.getFieldDecorator('last', { initialValue: 1, preserve: true })
            })
        },
        async  handleChange (val) {
            this.form.resetFields(['customer_machine_code_id'])
            this.machineIds = deepGet(await CustomertCodes({ id: val }), 'data', [])
        },
        handleSubmit () {
            this.form.validateFields(async (errors, values) => {
                if (!errors) {
                    this.confirmLoading = true
                    if (values.cdm_modules === undefined && values.data_backup_modules === undefined && values.location[0] === undefined) {
                      this.$message.error('CDM,数据备份,必须要选择一项')
                      this.confirmLoading = false
                      return false
                    }
                    const obj = {
                      customer_machine_code_id: +values.customer_machine_code_id,
                      last: values.last,
                      cdm_modules: values.cdm_modules,
                      data_backup_modules: values.data_backup_modules,
                      pools: []
                    }
                    if (values.capacity !== undefined) {
                        values.capacity.forEach((u, index) => {
                            obj.pools.push({
                                capacity: values.capacity[index],
                                type: values.type[index],
                                location: values.location[index]
                            })
                        })
                    }

                    try {
                        const { data } = await licenseAdd(obj)
                        const a = document.createElement('a')
                        a.href = 'data:text/plain;charset=utf-8,' + data
                        let name = ''
                        this.clients.forEach(u => {
                            if (u.id === values.client) {
                                name = u.name
                            }
                        })
                        a.download = name + '.license'
                        document.body.appendChild(a)
                        a.click()
                        document.body.removeChild(a)
                        this.confirmLoading = false
                        this.$message.success('添加成功')
                        this.$emit('ok', data)
                        this.visible = false
                    } catch (error) {
                        this.$message.error('添加失败，请稍后重试')
                        this.confirmLoading = false
                    }
                }
            })
        },
        remove (k) {
            const { form } = this
            const keys = form.getFieldValue('keys')
            form.setFieldsValue({
                keys: keys.filter(key => key !== k)
            })
        },
        add () {
            const { form } = this
            const keys = form.getFieldValue('keys')
            console.log(keys)
            const nextKeys = keys.concat(id++)
            form.setFieldsValue({
                keys: nextKeys
            })
		},
		nextStep () {
            if (this.currentTab < 1) {
                this.currentTab += 1
            }
        },
        finish () {
            this.currentTab = 0
        },
        close () {
            this.visible = false
        },
        numberValidator
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
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
.position{
    position:absolute;
    right: 25px;
    font-size: 16px;
    color:white;
    font-weight: 500;
}
.ant-input-affix-wrapper /deep/.ant-input-suffix{
    color: rgba(255, 255, 255, 0.65);
}
/deep/.has-error /deep/.ant-input-affix-wrapper .ant-input, .has-error .ant-input-affix-wrapper /deep/.ant-input:hover {
    border-color: #f5222d;
    background-color:none;
}
</style>

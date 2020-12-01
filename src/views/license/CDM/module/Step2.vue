<template>
  <div class="step2">
    <a-descriptions>
      <a-descriptions-item v-for="(i,index) in CDMinfo" :key="index" :label="i.title" :span="i.span">
        {{ i.value }}
      </a-descriptions-item>
      <a-descriptions-item :label="CDM.title" :span="CDM.span">
        <a-tag v-for="(i,index) in CDM.value" :key="index" color="#108ee9"> {{ i.val }} </a-tag>
      </a-descriptions-item>
      <a-descriptions-item :label="backUP.title" :span="backUP.span">
        <a-tag v-for="(i,index) in backUP.value" :key="index" color="#108ee9">
          {{ i.val }}
        </a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="有效期" :span="2">
        <a-badge :count="$store.state.CDM.AddCDMData.last +'个月'" :number-style="{ backgroundColor: '#52c41a' }">
        </a-badge>
      </a-descriptions-item>
      <a-descriptions-item v-for="(i,index) in Pool" :key="index" :label="i.title">
        <a-tag color="#108ee9">
          {{ i.value }}
        </a-tag>
      </a-descriptions-item>
    </a-descriptions>
    <a-row style="margin-top:40px">
      <a-col :offset="9" :span="10">
        <a-button @click="prevStep">上一步</a-button>
        <a-button type="primary" style="margin-left: 8px" @click="nextStep" :loading="loading">提交</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { deepGet, toDict } from '@/utils/util'
import { licenseAdd } from '@/api/license/CDM'
export default {
    watch: {
        '$store.state.CDM.AddCDMData': {
            handler (newval, oldval) {
                this.data = this.CDMinfo.map(u => {
                    Object.assign(u, { value: deepGet(newval, u.key) })
				})
				if (newval.cdm_modules && newval.cdm_modules.length > 0) {
					this.CDM.value = newval.cdm_modules.map(u => { return toDict(u, 'L_CDM_MODULE') })
				}
				if (newval.data_backup_modules && newval.data_backup_modules.length > 0) {
					this.backUP.value = newval.data_backup_modules.map(u => { return toDict(u, 'L_CDM_MODULE') })
				}
                if (newval.type && newval.type.length > 0) {
                    newval.type.forEach((u, index) => {
                        const pool = [
                            {
                                title: '池类型',
                                value: toDict(u, 'L_CDM_TYPE').val
                            },
                            {
                                title: '池位置',
                                value: toDict(
                                    newval.location[index],
                                    'L_CDM_LOCATION'
                                ).val
                            },
                            {
                                title: '授权池容量',
                                value: newval.capacity[index] + 'GB'
                            }
                        ]
                        this.Pool.push(...pool)
                    })
                }
            },
            deep: true,
            immediate: true
        }
    },
    data () {
        return {
            data: [],
            loading: false,
            CDMinfo: [
                {
                    title: '客户名称',
                    key: 'client_name',
                    value: '客户名称',
                    span: 1
                },
                {
                    title: '机器码',
                    key: 'customer_name',
                    value: '机器码',
                    span: 2
                }
                // {
                //     title: '有效期',
                //     key: 'last',
                //     value: '有效期',
                //     span: 1
                // }
            ],
            CDM: {
                title: 'CDM',
                key: 'cdm_modules',
                value: [],
                span: 3
            },
            backUP: {
                title: '数据备份',
                key: 'data_backup_modules',
                value: [],
                span: 1
            },
            Pool: []
        }
    },
    methods: {
        prevStep () {
            this.$emit('prevStep')
        },
        async nextStep () {
			this.loading = true
			const values = this.$store.state.CDM.AddCDMData
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
                const result = await licenseAdd(obj)
				this.$emit('nextStep', result)
				this.loading = false
            } catch (error) {
                this.$message.error('添加失败，请稍后重试')
                this.loading = false
			}
        }
    }
}
</script>

<style lang="less" scoped>
.step2 {
    margin-top: 40px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    padding: 50px 60px;
}
.modules {
    padding: 10px;
    background-color: wheat;
    margin: 10px;
    box-sizing: border-box;
}
/deep/.ant-descriptions-title,
/deep/.ant-descriptions-item-label,
/deep/.ant-descriptions-item-content {
    color: white;
}
.ant-descriptions-row > th, .ant-descriptions-row > td {
    // padding-bottom: 16px;
    padding-top: 10px;
    /* padding: 12px 0; */
}
</style>

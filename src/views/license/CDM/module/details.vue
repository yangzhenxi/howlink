<template>
  <div>
    <a-modal
      title="授权码详情"
      :width="640"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleSubmit"
      @cancel="handleCancel">
      <a-descriptions>
        <a-descriptions-item
          v-for="(u,index) in data"
          :key="index"
          style="color:white"
          :span="u.span">
          <template slot="label" v-if="u.isBoole">
            {{ u.name }}
          </template>
          <ellipsis :length="34" tooltip v-if="u.isBoole">{{ u.val }}</ellipsis>
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script>
import { mixinFormModal } from '@/utils/mixin'
import { deepGet, convert } from '@/utils/util'
import { Ellipsis } from '@/components'
// import { licenseGet } from '@/api/license/CDM'
export default {
    mixins: [mixinFormModal],
    components: {
        Ellipsis
    },
    data () {
        return {
            record: [
                { key: 'id', name: 'ID', val: '', span: '1', filter: false },
                { key: 'customer_id', name: '客户id', val: '', span: '1', filter: false },
                { key: 'customer_name', name: '客户名', val: '', span: '1', filter: false },
                { key: 'customer_machine_code_id', name: '机器码id', val: '', span: '1', filter: false },
                { key: 'customer_machine_code', name: '机器码', val: '', span: '2', filter: false },
                { key: 'kind', name: '主模块', val: '', span: '1', filter: 'L_CDM_KIND' },
                { key: 'code', name: '密匙', val: '', span: '2', filter: false },
                { key: 'created', name: '创建时间', val: '', span: '2', filter: 'unix' },
                { key: 'module', name: '类型', val: '', span: '1', filter: 'L_CDM_MODULE' },
                { key: 'pool[capacity]', name: '池大小', val: '', span: '1', filter: false },
                { key: 'pool[location]', name: '池位置', val: '', span: '2', filter: 'L_CDM_LOCATION' },
                { key: 'pool[type]', name: '池类型', val: '', span: '1', filter: 'L_CDM_TYPE' }
            ],
            data: []
        }
    },
    methods: {
        async Details (item) {
            this.visible = true
            // const result = await licenseGet({ id: item.id })
            this.data = this.record.map(u => {
                return Object.assign(u, {
                    val: convert(deepGet(item, u.key), u.filter),
                    isBoole: deepGet(item, u.key)
                })
            })
        },
        handleSubmit () {
            this.visible = false
        },
        convert
    }
}
</script>

<style lang="less" scoped>
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
/deep/.ant-descriptions-item-content,/deep/.ant-descriptions-item-label{
    color: white;
}
</style>

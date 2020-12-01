<template>
  <page-header-wrapper :title="false">
    <a-row>
      <a-col :span="2">
        <a-button
          type="primary"
          @click="$refs.clientAdd.Add()">
          添加客户
        </a-button>
      </a-col>
      <!-- <a-col :span="10">
        <a-select style="width: 200px" placeholder="请选择要查询的严重性" @change="handleChange">
          <a-select-option value="Prompts">
            提示
          </a-select-option>
          <a-select-option value="Warn">
            警告
          </a-select-option>
          <a-select-option value="Critical">
            严重
          </a-select-option>
          <a-select-option value="">
            全部
          </a-select-option>
        </a-select>
      </a-col> -->
    </a-row>
    <s-table
      style="margin-top:10px;"
      ref="table"
      :columns="columns"
      rowKey="id"
      :data="loadData">
      <template
        slot="Action"
        slot-scope="text,record">
        <a-button
          type="primary"
          size="small"
          style="margin-right:15px"
          @click="$refs.clientEdit.Edit(record)">修改</a-button>
        <a-button
          type="danger"
          size="small"
          @click="Delete(record)">删除</a-button>
      </template>
    </s-table>
    <add ref="clientAdd" @ok="handleOk"/>
    <edit ref="clientEdit" @ok="handleOk"/>
  </page-header-wrapper>
</template>
<script>
import { MIcon, STable } from '@/components'
import { mixinTable } from '@/utils/mixin'
import Add from './manage/Add'
import Edit from './manage/Edit'
import { CustomertList, CustomertDelete } from '@/api/client'
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true
    },
    {
        title: '客户名称',
        dataIndex: 'name',
        sorter: true
    },
    {
        title: '客户地址',
        dataIndex: 'address',
        sorter: true
    },
    {
        title: '添加时间',
        dataIndex: 'created',
        sorter: true,
        scopedSlots: { customRender: 'time' }
    },
    {
        title: '更新时间',
        dataIndex: 'updated',
        scopedSlots: { customRender: 'time' },
        sorter: true
    },
    {
        title: '操作',
        scopedSlots: { customRender: 'Action' },
        sorter: true
    }
]
export default {
    mixins: [mixinTable],
    components: {
        MIcon,
        STable,
        Edit,
        Add
    },
    data () {
        return {
            columns,
            loadData: async parameter => {
                try {
                  return await CustomertList(Object.assign(parameter, this.queryBuild(this.queryParam)))
                } catch (error) {
                    return false
                }
            }
        }
    },
    methods: {
        Delete (record) {
            const obj = { id: record.id }
            this.$confirm({
                title: '是否要删除？',
                content: '点击确定即可删除',
                okType: 'danger',
                onOk: async () => {
                    await CustomertDelete(obj)
                        .then(res => {
                            this.$message.success('删除成功！')
                            this.$refs.table.refresh()
                        })
                        .catch(() => {
                            this.$message.error('删除失败')
                        })
                }
            })
        },
        handleChange (value) {
            this.queryParam.level = value
            this.$refs.table.refresh(true)
        }
    }
}
</script>

<template>
  <page-header-wrapper :title="false">
    <a-card>
      <a-row>
        <a-col :span="2">
          <a-button
            type="primary"
            @click="$refs.CodeAdd.Add()">
            添加机器码
          </a-button>
        </a-col>
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
            icon="edit"
            style="margin-right:15px"
            @click="$refs.CodeEdit.Edit(record)">修改</a-button>
          <a-button
            type="danger"
            icon="delete"
            @click="Delete(record)">删除</a-button>
        </template>
      </s-table>
    </a-card>
    <add ref="CodeAdd" @ok="handleOk"/>
    <edit ref="CodeEdit" @ok="handleOk"/>
  </page-header-wrapper>
</template>
<script>
import { MIcon, STable } from '@/components'
import { mixinTable } from '@/utils/mixin'
import Add from './modules/Add'
import Edit from './modules/Edit'
import { CustomertCodeList, CustomertCodeDelete } from '@/api/client/machine'
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true
    },
    {
        title: '机器名',
        dataIndex: 'name',
        sorter: true
    },
    {
        title: '用户ID',
        dataIndex: 'customer_id',
        sorter: true
    },
    {
        title: '用户名',
        dataIndex: 'customer_name',
        sorter: true
    },
    {
        title: '机器码',
        dataIndex: 'code',
        sorter: true
    },
    {
        title: '创建时间',
        dataIndex: 'created',
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
                  return await CustomertCodeList(Object.assign(parameter, this.queryBuild(this.queryParam)))
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
                    await CustomertCodeDelete(obj)
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

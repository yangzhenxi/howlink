<template>
  <page-header-wrapper :title="false">
    <a-card>
      <div class="head">
        <a-button type="primary" @click="$refs.Add.Add(validatorNames)">添加部门</a-button>
      </div>
      <m-table
        style="margin-top:10px;"
        ref="table"
        :columns="columns"
        rowKey="id"
        :data="loadData">
        <template
          slot-scope="item,record"
          slot="Action">
          <a-button
            @click="$refs.Edit.Edit(record,validatorNames)"
            type="primary"
            style="margin-right:15px;"
            size="small">修改</a-button>
          <a-button
            @click="Delete(record)"
            type="danger"
            size="small">删除</a-button>
        </template>
      </m-table>
    </a-card>
    <add ref="Add" @ok="handleOk"/>
    <edit ref="Edit" @ok="handleOk"/>
  </page-header-wrapper>
</template>

<script>
import { deepGet } from '@/utils/util'
import { MTable, Ellipsis, MIcon } from '@/components'
import Add from './module/Add.vue'
import Edit from './module/Edit.vue'
import { mixinTable } from '@/utils/mixin'
import { departmentList, departmentDelete } from '@/api/system/Department'
export default {
    components: {
		Add,
		Edit,
        MIcon,
        MTable,
        Ellipsis
    },
    mixins: [mixinTable],
    data () {
        return {
			validatorNames: [],
            columns: [
                {
					key: 'id',
                    dataIndex: 'id',
					title: 'id'
                },
                {
                    dataIndex: 'name',
                    title: '名称'
                },
                {
                    dataIndex: 'description',
                    title: '部门介绍'
                },
                {
                    dataIndex: 'created',
					title: '创建时间',
                    scopedSlots: { customRender: 'time' }
                },
                {
					title: '操作',
                    scopedSlots: { customRender: 'Action' }
                }
            ],
            loadData: async parameter => {
                try {
					this.validatorNames = deepGet(deepGet(await departmentList(), 'data', []), 'departments', [])
                  return {
					data: this.validatorNames
				}
                } catch (error) {
                    return false
                }
            }
        }
    },
    created () {
    },
    methods: {
		Delete (i) {
			this.$confirm({
                title: '确认要删除' + i.name + '吗？',
                content: '点击确定即可删除',
                okType: 'danger',
                onOk: async () => {
                    try {
						await departmentDelete({ id: i.id })
						this.$message.success('删除成功')
						this.$refs.table.refresh()
					} catch (error) {
						this.$message.error('删除失败')
					}
                }
            })
		}
	}
}
</script>

<style lang="less" scoped>
.icon{
    font-size: 40px;
}
</style>

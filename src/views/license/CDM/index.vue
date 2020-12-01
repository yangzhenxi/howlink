<template>
  <page-header-wrapper :title="false">
    <a-card>
      <div class="head">
        <a-button type="primary" @click="$refs.Add.Add()">添加授权码</a-button>
        <a-button
          type="primary"
          style="margin-left:15px"
          @click="download(row)">批量下载</a-button>
      </div>
      <s-table
        style="margin-top:10px;"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        ref="table"
        :columns="columns"
        rowKey="id"
        :data="loadData">
        <template slot="Machine_code" slot-scope="text">
          {{ text }}
        </template>
        <template slot="customer" slot-scope="text">
          <a-tag color="#108ee9">
            {{ text }}
          </a-tag>
        </template>
        <template slot="kind" slot-scope="text">
          <a-tag color="purple">
            {{ text |convert('L_CDM_KIND') }}
          </a-tag>
          <!-- <a-tag
            v-for="tag in tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag> -->
        </template>
        <template slot="module" slot-scope="text">
          <m-icon :type="toDict(text,'L_CDM_MODULE').icon" :class="['icon',toDict(text,'L_CDM_MODULE').icon]"></m-icon>
        </template>
        <template slot="created" slot-scope="text">
          {{ unixToDate(text,'YYYY-MM-DD') }}
        </template>
        <template slot="expire" slot-scope="text,record">
          {{ moment( unixToDate(record.created,'YYYY-MM-DD') ).add(record.last,'months').format('YYYY-MM-DD') }}
        </template>
        <template
          slot="Action"
          slot-scope="text,record">
          <a-button
            type="primary"
            size="small"
            style="margin-right:15px"
            @click="$refs.detail.Details(record)">详情</a-button>
          <a-button
            type="primary"
            size="small"
            style="margin-right:15px"
            @click="download(record)">下载</a-button>
          <a-button
            type="danger"
            size="small"
            @click="Delete(record)">删除</a-button>
        </template>
      </s-table>
    </a-card>
    <add ref="Add" @ok="handleOk"/>
    <detail ref="detail" @ok="handleOk"/>
  </page-header-wrapper>
</template>

<script>
import { STable, Ellipsis, MIcon } from '@/components'
import moment from 'moment'
import { mixinTable } from '@/utils/mixin'
import Add from './module/index'
import detail from './module/details'
import { licenseList } from '@/api/license/CDM'
import { unixToDate } from '@/utils/util'
export default {
    components: {
        Add,
        MIcon,
        STable,
        detail,
        Ellipsis
    },
    mixins: [mixinTable],
    data () {
        return {
			row: [],
			selectedRowKeys: [],
            columns: [
                {
                    title: 'ID',
                    dataIndex: 'id',
                    sorter: true
                },
                {
                    title: '客户',
					dataIndex: 'customer_name',
                    scopedSlots: { customRender: 'customer' },
                    sorter: true
                },
                {
                    title: '机器码',
                    dataIndex: 'customer_machine_code',
                    scopedSlots: { customRender: 'Machine_code' },
                    sorter: true
                },
                {
                    title: '主模块',
                    dataIndex: 'kind',
                    sorter: true,
                    scopedSlots: { customRender: 'kind' }
                },
                {
                    title: '模块类型',
                    dataIndex: 'module',
                    sorter: true,
                    scopedSlots: { customRender: 'module' }
                },
                {
                    title: '创建时间',
                    dataIndex: 'created',
                    sorter: true,
                    scopedSlots: { customRender: 'created' }
                },
                {
                    title: '过期时间',
                    sorter: true,
                    scopedSlots: { customRender: 'expire' }
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    scopedSlots: { customRender: 'Action' },
                    sorter: true
                }
            ],
            loadData: async parameter => {
                try {
                  return await licenseList(Object.assign(parameter, this.queryBuild(this.queryParam)))
                } catch (error) {
                    return false
                }
            }
        }
    },
    methods: {
        download (row) {
			let data = ''
			let name = ''
			if (Array.isArray(row)) {
				this.row.forEach((u, index) => { index !== row.length - 1 && row.length !== 1 ? data = data + u.code + ',' : data = data + u.code })
				name = row[0].customer_name
			} else {
				data = row.code
				name = row.customer_name
			}
			const a = document.createElement('a')
			a.href = 'data:text/plain;charset=utf-8,' + data
			a.download = name + '.license'
			document.body.appendChild(a)
			a.click()
			document.body.removeChild(a)
        },
		// 选中用户
        onSelectChange (selectedRowKeys, row) {
			let str = true
			row.forEach(u => { if (u.customer_machine_code !== row[0].customer_machine_code) { str = false } })
			if (!str) {
				this.$message.info('请选择相同的客户来进行批量下载')
				return false
			}
			this.row = row

			this.selectedRowKeys = selectedRowKeys
        },
        moment,
        unixToDate
    }
}
</script>

<style lang="less" scoped>
.icon{
    font-size: 40px;
}
// .ant-tag, .ant-tag a, .ant-tag a:hover {
//     color: rgba(0, 0, 0, 0.65);
// }
</style>

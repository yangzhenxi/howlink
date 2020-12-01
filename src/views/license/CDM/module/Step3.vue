<template>
  <div class="step3">
    <a-result
      :status="result.msg === '添加成功' ? 'success' : 'error'"
      :title="result.msg"
    >
      <template v-if="result.msg === '添加成功'" slot="subTitle">
        <!-- <span>授权码 </span><span>{{ result.data }}</span> -->
        <a-spin :spinning="spinning">
        </a-spin>
        <div style="color:#1890ff">
          系统会在3秒内下载授权码 如未响应，请点击按钮手动下载
        </div>
      </template>
      <template #extra>
        <a-button @click="download" type="primary">
          下载文件
        </a-button>
        <a-button @click="close">
          关闭
        </a-button>
      </template>
    </a-result>
  </div>

</template>

<script>
export default {
	props: {
		result: {
			type: Object,
			required: true
		}
	},
	data () {
		return {
			spinning: true
		}
	},
	mounted () {
		setTimeout(() => {
			const a = document.createElement('a')
			a.href = 'data:text/plain;charset=utf-8,' + this.result.data
			a.download = this.$store.state.CDM.AddCDMData.client_name + '.license'
			document.body.appendChild(a)
			a.click()
			document.body.removeChild(a)
			this.spinning = false
		}, 2000)
	},
	methods: {
		download () {
			const a = document.createElement('a')
			a.href = 'data:text/plain;charset=utf-8,' + this.result.data
			a.download = this.$store.state.CDM.AddCDMData.client_name + '.license'
			document.body.appendChild(a)
			a.click()
			document.body.removeChild(a)
		},
		close () {
			this.$emit('close')
		}
	}

}
</script>

<style lang="less" scoped>
.step3{
    margin-top: 40px;
    border: 1px solid #cccccc;
    border-radius: 5px;
}
/deep/.ant-result-title,/deep/.ant-result-subtitle{
	color: white;
}
</style>

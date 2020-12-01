<template>
  <div>
    <a-modal
      title="新建授权码"
      :width="840"
      :visible="visible"
      :footer="null"
      :closable="false"
      :confirm-loading="confirmLoading"
      :maskClosable="maskClosable"
      destroyOnClose>
      <a-row style="padding-top:25px;">
        <a-col
          :span="16"
          :offset="4">
          <a-steps
            class="steps"
            size="small"
            :current="currentTab">
            <a-step title="填写授权码信息" />
            <a-step title="提交" />
            <a-step title="查看结果" />
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
          @prevStep="prevStep"
          @nextStep="nextStep" />
        <step3
          :result="result"
          v-if="currentTab === 2"
          @prevStep="prevStep"
          @close="close"/>
      </div>
    </a-modal>
  </div>
</template>

<script>
import step1 from './Step1'
import step2 from './Step2'
import step3 from './Step3'
import { mapMutations } from 'vuex'
import { mixinFormModal } from '@/utils/mixin'
export default {
	mixins: [mixinFormModal],
	components: {
		step1,
		step2,
		step3
	},
    data () {
        return {
			currentTab: 0,
			result: {},
            maskClosable: false

		}
    },
    methods: {
		...mapMutations(['SET_ADDCDMDATA']),
		Add (userList) {
            this.visible = true
        },
		nextStep (res) {
			if (res) { this.result = res }
            if (this.currentTab < 2) { this.currentTab += 1 }
        },
        close () {
            this.currentTab = 0
			this.visible = false
			this.SET_ADDCDMDATA(false)
		},
		prevStep () {
            if (this.currentTab > 0) {
                this.currentTab -= 1
            }
        }
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

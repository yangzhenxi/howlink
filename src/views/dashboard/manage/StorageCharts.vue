<template>
  <div>
    <empty :isEmpty="isEmpty(data)">
      <v-chart
        :scale="scale"
        :forceFit="true"
        :height="height"
        :data="data">
        <v-tooltip/>
        <v-axis
          dataKey="valName"
          :label="label" />
        <v-axis
          dataKey="val"
          :label="label"
        />
        <v-legend />
        <v-stack-bar
          :label="labelInterval"
          position="valName*val"
          :color="color" />
      </v-chart>
    </empty>
  </div>
</template>

<script>
import Empty from '@/components/Empty'
import { isEmpty } from '@/utils/util'
export default {
    name: 'StorageCharts',
    props: {
        dataSource: {
            type: Array,
            required: true
        }
    },
    components: {
        Empty
    },
    data () {
        return {
            data: [],
            height: 400,
            label: {
                textStyle: {
                    fill: '#fff'
                }
            },
            labelInterval: ['val', {
              formatter: function formatter (text) {
                // var val = (text).toFixed(2)
                  // return text
              },
              offset: 10
            }],
            scale: [{
              dataKey: 'valName',
              alias: '销售额(万)'
            }],
            color: ['name', ['rgb(57, 198, 111)', 'rgb(119, 147, 227)']]
        }
    },
    watch: {
        dataSource: {
            handler (newdata, olddata) {
                this.data = newdata
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        isEmpty
    }
}
</script>

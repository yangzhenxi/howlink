export default {
    state: {
        // 添加模版数据
        AllData: {},
        isCluster: Boolean
    },
    mutaions: {
        SET_ISCLUSTER: (state, isCluster) => {
            state.isCluster = isCluster
        },
        SET_ALLDATA: (state, AllData) => {
            state.AllData = AllData
        }
    }
}

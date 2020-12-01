const state = {
    // 添加CDM数据
    AddCDMData: null // 中心数据
}
const mutations = {
    SET_ADDCDMDATA: (state, AddCDMData) => {
		AddCDMData ? state.AddCDMData = AddCDMData : state.AddCDMData = null
    }
}
const actions = {
}
export default {
    state,
    mutations,
    actions
}

const state = {
    // 添加模版数据
    AllTP: [],
    OUList: [],
    AllVersion: [],
    formValue: {},
    HostingUnit: [],
    networks: [],
    // 当前选中的DN
    dn: {},
    // 详情数据
    DetailsData: {},
    // 当前在哪一个桌面组下
    record: {}
}
const mutations = {
    SET_FORMVALUE: (state, formValue) => {
        if (formValue) {
            Object.assign(state.formValue, formValue)
        } else {
            state.formValue = {}
        }
    },

    SET_VERSION: (state, AllVersion) => {
        if (AllVersion) {
            state.AllVersion = AllVersion
        }
    },
    SET_OULIST: (state, OUList) => {
        if (OUList) {
            state.OUList = OUList
        }
    },
    SET_TPLIST: (state, AllTP) => {
        if (AllTP) {
            state.AllTP = AllTP
        }
    },
    SET_NETWORKS: (state, networks) => {
        if (networks) {
            state.networks = networks
        }
    },
    SET_HOSTINGUNIT: (state, HostingUnit) => {
        if (HostingUnit) {
            state.HostingUnit = HostingUnit
        }
    },
    SET_DN: (state, DN) => {
            state.dn = DN
    },
    SET_DETAILSDATA: (state, DetailsData) => {
            state.DetailsData = DetailsData
    },
    SET_RECORD: (state, record) => {
            state.record = record
    }
}
export default {
    state,
    mutations
}

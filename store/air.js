// state,mutations，actions

export const state = () => ({
    ariHistory:[]
})

export const mutations =  {
    setAriHistory(state,data){
        state.ariHistory.unshift(data)
        // 只保留5项历史记录
        state.ariHistory.splice(5)
    }
}
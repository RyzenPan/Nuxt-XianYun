// state,mutations，actions

export const state = () => ({
    ariHistory:[],
    allPrice:0
})

export const mutations =  {
    setAriHistory(state,data){
        state.ariHistory.unshift(data)
        // 只保留5项历史记录
        state.ariHistory.splice(5)
    },
    // 计算总价
    setAllPrice(state,data){
        state.allPrice = data
    }
}
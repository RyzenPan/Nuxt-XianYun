// state,mutations，actions

export const state = () => ({
    post:[]
})

export const mutations =  {
    savePostDrafts(state,data){
        state.post.unshift(data)
        // 只保留5项历史记录
        state.post.splice(5)
    }
}
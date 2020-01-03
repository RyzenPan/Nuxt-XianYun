// 保存user下的数据
export const state = () => ({
    // name: "某jack"

    // 登录后的数据，包含token和user对象
    userInfo: {}
});

export const mutations = {
    setUserInfo(state,data){
        state.userInfo = data
    },
    // 清除用户数据
    cleanUserInfo(state, info){
        if(process.browser){
            localStorage.removeItem("userInfo");
        }
        state.userInfo = {};
    }
};

export const actions = {
    login(store,data){
        return this.$axios({
            url:'/accounts/login',
            method:'POST',
            data
        }).then(res => {
            this.$router.back()
            store.commit('setUserInfo',res.data)
            return true
        })
    },
    
    register(store,data){
        return this.$axios({
            url:`/accounts/register`,
            method:"POST",
            data
          }).then(res=>{
            this.$router.back()
            store.commit('setUserInfo',res.data)
            return true
        })
    }
};


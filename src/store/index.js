import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data:[]
  },
  mutations: {
    'FETCH_GET_DATA' ( state, action ) {
      state.data=action
    }
  },
  actions: {
    //获取列表数据
    'FETCH_DATA' ({commit}) {
      axios.get ("https://api.baxiaobu.com/index.php/home/v5/getuser")
        .then( res => {
          commit ('FETCH_GET_DATA', res.data.users)
        })
    },
    //删除接口
    'FETCH_DELETE'(context, payload) {
      axios
        .post(
          "https://api.baxiaobu.com/index.php/home/v5/deleteUser",
          qs.stringify(payload)
        )
        .then((res) => {
          if (res.data.status === "200") {
            context.dispatch("FETCH_DATA");
          }
        });
    },
    //添加接口
    'FETCH_ADD'(context, payload) {
      axios
        .post(
          "http://api.baxiaobu.com/index.php/home/v5/add",
          qs.stringify(payload)
        )
        .then((res) => {
          if (res.data.status === "200") {
            context.dispatch("FETCH_DATA");
          }
        });
    },
    //编辑接口
    'FETCH_EDIT'(context, payload) {
      axios
        .post(
          "https://api.baxiaobu.com/index.php/home/v5/updateUser",
          qs.stringify(payload)
        )
        .then((res) => {
          if (res.data.status === "200") {
            context.dispatch("FETCH_DATA");
          }
        });
    },
    //搜索接口
    'FETCH_SEARCH'(context, payload) {
      axios
        .get("https://api.baxiaobu.com/index.php/home/v5/findUser?keyword="+payload)
         .then((res) => {
          context.commit("FETCH_GET_DATA", res.data.users);
        });
    },
  },
  modules: {
  }
})

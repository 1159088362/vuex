<template>
  <div class="search">
    <el-input
    v-model="searValue"
    @blur="sear"
    placeholder="请输入搜索内容"
    prefix-icon="el-icon-search">
    </el-input>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searValue:'',//搜索的数据
    }
  },
  methods: {
     //搜索
     sear() {
       this.$store.dispatch('FETCH_SEARCH',this.searValue)
      },
  }
}
</script>
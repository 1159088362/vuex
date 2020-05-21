<template>
  <div id="app">
  <!--搜索部分 -->
  <Search />
  <!--添加按钮 -->
   <el-button type="primary" @click="add">添加</el-button>
   <!--tab表格 -->
  <el-table
      :data="data"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        style="width: 25%">
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        style="width: 25%">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        style="width: 25%">
      </el-table-column>
      <el-table-column
        label="操作"
        style="width: 25%">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text">删除</el-button>
          <el-button type="text" @click="handDate(scope.row)">编辑</el-button>
        </template>
       </el-table-column>
    </el-table>
    <!--模态框 -->
   <el-dialog :title="title" :visible.sync="outerVisible">
    <el-form :model="form">
      <el-form-item label="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="age" :label-width="formLabelWidth">
        <el-input v-model="form.age" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUser">确 定</el-button>
    </div>
</el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Search from './components/search'
import './style.less'
export default {
  data () {
    return {
      outerVisible:false,//模态框控制显示隐藏
      //表单数据
       form: {
          name: '',
          age:'',
        },
        title:'',//模态框标题
        formLabelWidth: '120px',
        id:'',//确认编辑的id
    }
  },
  //获取列表数据
  created () {
    this.$store.dispatch('FETCH_DATA')
  },
  computed: {
    ...mapState(['data'])
  },
  methods: {
    //添加按钮
    add () {
      this.shows()
      this.title="添加"
      this.form.name='',
      this.form.age=''
    },
    //点击编辑按钮
    handDate (opt) {
       this.shows()
       this.title="编辑"
       this.id=opt.id
       this.form.name=opt.name
       this.form.age=opt.age
    },
    //模态框控制按钮
    shows () {
      this.outerVisible=!this.outerVisible
    },
    //删除按钮
    handleClick (opt) {
      let obj={id:opt.id}
      this.$store.dispatch('FETCH_DELETE',obj)
    },
    //模态框确认按钮
    addUser () {
      this.shows()
      if(this.title==='添加') {
        this.$store.dispatch('FETCH_ADD',this.form)
      } else {
        let obj = { ...this.form, id: this.id };
        this.$store.dispatch('FETCH_EDIT',obj)
      }
    }
  },
  components : {
    Search
  }
}
</script>
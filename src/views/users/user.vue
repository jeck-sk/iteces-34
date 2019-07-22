<template>
<div class="user">
  <!-- 面包屑 -->
   <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
   </el-breadcrumb>
  <!-- 搜素 -->
  <div style="margin: 15px 0;" >
      <el-input @keyup.enter.native="int" placeholder="请输入内容" v-model="userobj.query" class="input-with-select" style="width:310px;margin-right:8px">
       <el-button @click="int" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button  type="success" plain>添加用户</el-button>
  </div>
  <!-- 表格 -->
    <el-table :data="userlist" style="width: 100%; margin-top:10px" border>
    <el-table-column type="index" style="width:50px" >
    </el-table-column>
    <el-table-column prop="username" label="姓名" width="180">
    </el-table-column>
    <el-table-column prop="email" label="邮箱" width="300">
    </el-table-column>
    <el-table-column prop="mobile" label="电话" width="300">
    </el-table-column>
    <!-- 状态 -->
   <el-table-column label="用户状态" width="80">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949"
         ></el-switch>
        </template>
      </el-table-column>
   <!-- 操作 -->
    <el-table-column label="操作" width='280'>
      <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
            <el-button type="primary" icon="el-icon-loading"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="primary" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userobj.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="userobj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</div>
</template>
<script>
import { getuserlist } from '@/apl/user_index.js'
export default {
  data () {
    return {
      total: 0,
      userobj: {
        query: '',
        // 总共几页
        pagenum: 1,
        // 每页个数
        pagesize: 5
      },
      userlist: []
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      // 修改全局pagesize
      this.userobj.pagesize = val
      // 重新获取数据
      this.int()
    },
    // 切换当前页码时触发
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      // 修改全局的pagenum
      this.userobj.pagenum = val
      // 重新获取数据
      this.int()
    },
    //  数据初始化
    int () {
      getuserlist(this.userobj)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.userlist = res.data.data.users
            this.total = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    // this调用
    this.int()
  }
}
</script>
<style lang="less" scoped>

</style>

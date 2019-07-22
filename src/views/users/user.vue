<template>
<div class="user">
   <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
   </el-breadcrumb>
  <div style="margin: 15px 0;" >
      <el-input @keyup.enter.native="int" placeholder="请输入内容" v-model="userobj.query" class="input-with-select" style="width:310px;margin-right:8px">
       <el-button @click="int" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button  type="success" plain>添加用户</el-button>
  </div>
    <el-table :data="userlist" style="width: 100%; margin-top:10px" border>
    <el-table-column type="index" style="width:50px" >
    </el-table-column>
    <el-table-column prop="username" label="姓名" width="180">
    </el-table-column>
    <el-table-column prop="email" label="邮箱" width="300">
    </el-table-column>
    <el-table-column prop="mobile" label="电话" width="300">
    </el-table-column>
   <el-table-column label="用户状态" width='80' >
      <template slot-scope="scope">
   <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949">
  </el-switch>
  </template>
   </el-table-column>
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
</div>
</template>
<script>
import { getuserlist } from '@/apl/user_index.js'
export default {
  data () {
    return {
      value1: true,
      userobj: {
        query: '',
        pagenum: '1',
        pagesize: '5'
      },
      userlist: []

    }
  },
  methods: {

    int () {
      getuserlist(this.userobj)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.userlist = res.data.data.users
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.int()
  }
}
</script>
<style lang="less" scoped>

</style>

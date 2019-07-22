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
      <el-button  @click="adddialogFormVisible = true" type="success" plain>添加用户</el-button>
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
          <el-tooltip class="item"  effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit"  @click='showEditDialog(scope.row)'></el-button>
          </el-tooltip>
         <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="primary" icon="el-icon-delete" @click='del(scope.row.id)'></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
            <el-button type="primary" icon="el-icon-loading"></el-button>
          </el-tooltip>
        </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userobj.pagenum"
      :page-sizes="[1,2, 3, 4]"
      :page-size="userobj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加对话框 -->
    <el-dialog title="添加用户" :visible.sync="adddialogFormVisible" >
      <el-form  :model="addForm" ref="addForm" label-width="100px"  :rules='rules' class="demo-addForm">
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="addForm.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="text" v-model="addForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" v-model="addForm.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="mobile">
        <el-input type="text" v-model="addForm.mobile" auto-complete="off"></el-input>
      </el-form-item>
     </el-form>
     <span slot="footer" class="dialog-footer">
      <el-button @click="adddialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addsubmit">确 定</el-button>
     </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editdialogFormVisible">
      <el-form :model="editform"  ref='editform'  :label-width="'80px'" :rules='rules'>
        <el-form-item label="用户名">
          <el-input v-model="editform.username" auto-complete="off" disabled style='width:100px'></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop='email'>
          <el-input v-model="editform.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop='mobile'>
          <el-input v-model="editform.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click='editsubmit'>确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
import { getuserlist, adduser, edituser, deluserByld } from '@/apl/user_index.js'
export default {
  data () {
    return {
      total: 0,
      adddialogFormVisible: false,
      userobj: {
        query: '',
        // 总共几页
        pagenum: 1,
        // 每页个数
        pagesize: 5
      },
      userlist: [],
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editdialogFormVisible: false,
      editform: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          // 添加正则验证规则
          { pattern: /\w+[@]\w+[.]\w+/, message: '请输入合法的电子邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入合法的手机号', trigger: 'blur' }
        ]
      }
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
    // 添加
    addsubmit () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 是this.addfrom
          adduser(this.addForm)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 201) {
                this.$message({
                  type: 'success',
                  message: '成功添加'
                })
                this.adddialogFormVisible = false
                this.$refs.addForm.resetFields()
                this.int()
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message({
            type: 'error',
            message: '添加'
          })
        }
      })
    },
    showEditDialog (row) {
      this.editdialogFormVisible = true
      this.editform.id = row.id
      this.editform.username = row.username
      this.editform.email = row.email
      this.editform.mobile = row.mobile
      var res = this.editform.id = row.id
      console.log(res)
    },
    // 编辑
    async editsubmit () {
      let res = await edituser(this.editform)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '成功编辑'
        })
        this.editdialogFormVisible = false
        this.$refs.editform.resetFields()
        this.int()
      } else {
        this.$message({
          type: 'error',
          message: '数据编辑失败'
        })
      }
    },
    // 删除
    del (id) {
      this.$confirm(`此操作将永久删除id号为${id}的用户, 是否继续?`, '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deluserByld(id)
          .then(res2 => {
            if (res2.data.meta.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.userobj.pagenum = Math.cail((this.total - 1) / this.userobj.pagesize) ? --this.userobj.pagenum
                : this.userobj.pagesize
              this.int()
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消删除失败'
            })
          })
      })
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

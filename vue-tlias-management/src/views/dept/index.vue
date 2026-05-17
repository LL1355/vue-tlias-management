<script setup>
import { ref , onMounted } from 'vue'
import { queryAllApi,addApi,queryApi ,updateApi,deleteApi} from '@/api/dept'
import { ElMessage,ElMessageBox } from 'element-plus'



onMounted(()=>{
  search()
})
const search = async ()=>{
  const result = await queryAllApi()
  if(result.code){
    tableData.value = result.data
  }
}
const tableData = ref([])
const dialogFormVisible = ref(false)
const dept = ref({
  name: ''
})
const addDept = ()=>{
  dialogFormVisible.value = true
  formtitle.value = '新增部门'
  dept.value = {
    name: ''
  }
  if(!deptForm.value){
    return
  }
  deptForm.value.resetFields()
}
const save =  async ()=>{
  if(!deptForm.value){
    return
  }
  deptForm.value.validate(async (valid)=>{
    if(valid){
      let result;
      if(dept.value.id){
         result = await updateApi(dept.value)
      }
      else{
        result = await addApi(dept.value)
      }
        if(result.code){
          ElMessage.success('操作成功')
          dialogFormVisible.value = false
          search()
        }
      
        else{
          ElMessage.error(result.msg)
        }
      }
    else{
      ElMessage.error('请填写完整信息')
    }
  })
}

const formtitle = ref('')
const rules = ref({
  name: [
    { required: true, message: '部门名称是必填项', trigger: 'blur' },
    { min: 2, max: 10, message: '部门名称长度必须在2到10之间', trigger: 'blur' },
  ],
  
})
const deptForm = ref()
// 编辑
const edit = async (id)=>{
  const result = await queryApi(id)
  formtitle.value = '编辑部门'
  if(result.code){
    dialogFormVisible.value = true
    dept.value = result.data
    if(!deptForm.value){
      return
    }
  }
 deptForm.value.resetFields()
}
// 删除
const deleteDept = async (id)=>{
  // 确认删除
  ElMessageBox.confirm('确认删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const result = await deleteApi(id)
    if(result.code){
      ElMessage.success('操作成功')
      search()
    }
    else{
      ElMessage.error(result.msg)
    }
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}
</script>

<template>
 <h2>部门管理</h2>
 <div class="container">
      
      <el-button type="primary" @click="addDept">+新增部门</el-button>
    </div>
    <div class="container">
      <el-table :data="tableData" border  style="width: 100%">
      <el-table-column type="index" label="序号" width="100" align="center" />
      <el-table-column prop="name" label="部门名称" width="260" align="center" />
      <el-table-column prop="updateTime" label="最后操作时间" width="300" align="center" />
      <el-table-column  label="操作"  align="center">
        <template #default="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.id)"><el-icon><EditPen /></el-icon>编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteDept(scope.row.id)"><el-icon><Delete /></el-icon>删除</el-button>
        </template>
      </el-table-column>
     </el-table>
    </div>
     <el-dialog v-model="dialogFormVisible":title="formtitle" width="500">
    <el-form :model="dept" :rules="rules" ref="deptForm">
      <el-form-item label="部门名称" label-width="80px" prop="name">
        <el-input v-model="dept.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.container {
  margin: 10px 0px;
}
</style>

import request from '@/utils/request'
//获取部门列表
export const queryAllApi = () => request.get('/depts')
//新增部门
export const addApi = (dept) => request.post('/depts',dept)
//查询部门详情
export const queryApi = (id) => request.get(`/depts/${id}`)
//修改部门
export const updateApi = (dept) => request.put('/depts',dept)
//删除部门
export const deleteApi = (id) => request.delete(`/depts/${id}`)

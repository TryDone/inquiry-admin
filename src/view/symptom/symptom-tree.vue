<style lang="less">
    @import "./symptom.less";
</style>
<template>
  <div class="content">
    <!--左侧布局-->
    <div class="tree-con">
        <div class="btn-con">
            <Button type="primary" class="symptom-btn" @click="modal1 = true">添加一级症状</Button>
            <Button type="primary" class="symptom-btn" @click="addNodesClick">添加子症状</Button>
            <Button class="symptom-btn" @click="delTreeNode">删除</Button>
            <Button type="primary" class="symptom-btn" @click="relationNodeClick">关联</Button>
        </div>
        <el-tree :props="defaultProps" node-key="id" ref="tree" @check="onSelectChange" :data="treeData" show-checkbox check-strictly check-on-click-node></el-tree>
    </div>
    <!--右侧布局-->
    <div class="edit-con">
        <div class="form-con">
            <Form ref="updateNode" :model="updateNode" :rules="ruleValidate" :label-width="80">
                <FormItem label="症状名称" prop="content">
                    <Input v-model="updateNode.content" placeholder="请填写症状名称"></Input>
                </FormItem>
                <FormItem label="上级症状" prop="pname">
                    <Input v-model="updateNode.pname"  placeholder="请填写上级症状" disabled></Input>
                </FormItem>
                <FormItem label="症状编码" prop="id">
                    <Input v-model="updateNode.id" placeholder="" disabled></Input>
                </FormItem>
                <FormItem label="症状类型" prop="type">
                    <RadioGroup v-model="updateNode.type" @on-change="updateNodeTypeChange">
                      <Radio label="0">症状</Radio>
                      <Radio label="1">诊断结果</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="紧急程度" prop="level" v-if='updateLeveShow'>
                    <RadioGroup v-model="updateNode.level">
                        <Radio label="0">一般</Radio>
                        <Radio label="1">紧急</Radio>
                        <Radio label="2">非常紧急</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="常见类型" prop="common">
                    <RadioGroup v-model="updateNode.common">
                        <Radio label="1">是</Radio>
                        <Radio label="0">否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="updateSubmit('updateNode')">修改并保存</Button>
                </FormItem>
            </Form>
        </div>
    </div>
    <!-- 增加一级菜单弹框  -->
    <Modal v-model="modal1" title="新增一级症状" :mask-closable="false" @on-ok="savePriSymp" @on-cancel="parentNodeCancel">
    <div style="padding: 30px;">
        <Form :model="parentForm" :rules="ruleValidate_modal1" :label-width="80">
            <FormItem label="症状名称" prop="content">
              <Input v-model="parentForm.content" placeholder="请填写症状名称" style="width: 60%"></Input>
            </FormItem>
            <FormItem label="症状类型" prop="type">
                <RadioGroup v-model="parentForm.type" @on-change="addParentTypeChange">
                    <Radio label="0">症状</Radio>
                    <Radio label="1">诊断结果</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="紧急程度" prop="level" v-if='addPrentLevelShow'>
              <RadioGroup v-model="parentForm.level">
                  <Radio label="0">一般</Radio>
                  <Radio label="1">紧急</Radio>
                  <Radio label="2">非常紧急</Radio>
              </RadioGroup>
          </FormItem>
        </Form>
     </div>
    </Modal>
    <!-- 增加子级菜单弹框  -->
    <Modal v-model="modal2" title="新增子症状" :mask-closable="false" @on-ok="saveNode" @on-cancel="clearNodeData">
    <div style="padding: 30px;">
         <Form :model="node" :rules="formValidate_modal2" :label-width="80">
            <FormItem label="症状名称" prop="content">
                <Input v-model="node.content" placeholder="请填写症状名称"></Input>
            </FormItem>
            <FormItem label="上级症状" prop="pname">
                <Input v-model="node.pname" placeholder="请填写上级症状" disabled></Input>
            </FormItem>
            <FormItem label="症状类型" prop="type">
                <RadioGroup v-model="node.type" @on-change="addNodeTypeChange">
                    <Radio label="0">症状</Radio>
                    <Radio label="1">诊断结果</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="紧急程度" prop="level" v-if="showAddLevel">
                <RadioGroup v-model="node.level">
                    <Radio label="0">一般</Radio>
                    <Radio label="1">紧急</Radio>
                    <Radio label="2">非常紧急</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="常见类型" prop="common">
                <RadioGroup v-model="node.common">
                    <Radio label="1">是</Radio>
                    <Radio label="0">否</Radio>
                </RadioGroup>
            </FormItem>
        </Form>
     </div>
    </Modal>
    <!-- 关联节点 -->
    <Modal v-model="modal3" title="节点关联" :mask-closable="false" @on-ok="saveRelation">
      <el-tree :props="defaultProps" node-key="id" ref="treeModel" :data="treeData" show-checkbox check-on-click-node check-strictly></el-tree>
    </Modal>
  </div>
</template>
<script>
import { symptomInsert, symptomDelete, selectInsert, symptomGet, symptomUpdate, symptomQueryAll } from '@/api/symptom'
export default {
  data () {
    return {
      parentForm: { // 添加一级节点时需要
        content: '', // 添加一级症状-症状名
        type: '', // 添加一级症状-类型
        level: ''
      },
      updateNode: { // 修改节点时需要
        content: '',
        id: '',
        type: '',
        level: '',
        common: '',
        pname: ''
      },
      selectNodeId: [], // 选中的节点
      node: { // 添加子节点时需要
        content: '',
        pname: '',
        pId: '',
        type: '',
        level: '',
        common: ''
      },
      callbackF: null,
      addNode: null, // 记录当前选择的树节
      modal1: false,
      modal2: false,
      modal3: false,
      showAddLevel: false, // 添加子节点是否显示急救程度
      updateLeveShow: false, // 更新节点是否显示急救程度
      addPrentLevelShow: false, // 新增树节点时是否显示急救程度
      relationId: '', // 关联节点id
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeData: [], // 树节点数据
      ruleValidate: {
        content: [
          { required: true, message: '症状名称不能为空', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '症状编码不能为空', trigger: 'blur' }
        ]
      },
      ruleValidate_modal1: {
        content: [
          { required: true, message: '症状名称不能为空', trigger: 'blur' }
        ]
      },
      formValidate_modal2: {
        content: [
          { required: true, message: '症状名称不能为空', trigger: 'blur' }
        ],
        pname: [
          { required: true, message: '症状编码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 初始一级树节点
    getTreeData () {
      symptomQueryAll().then(res => {
        this.treeData = res.data
      }).catch(err => {
        reject(err)
      })
    },
    // 添加一级症状
    savePriSymp () {
      var param = {
        'content': this.parentForm.content,
        'type': this.parentForm.type,
        'level': this.parentForm.level
      }
      symptomInsert(param).then(res => {
        if (res.data) {
          debugger
          // 一级节点添加成功时修改树节点数据
          this.treeData.push({
            label: this.parentForm.content,
            type: this.parentForm.type,
            parentId: '-1',
            parentName: '无',
            id: res.data.id,
            loading: false,
            children: []
          })
          this.$Message.info('添加成功！')
          this.parentForm.content = ''
          this.parentForm.type = ''
          this.parentForm.level = ''
          this.addPrentLevelShow = false
        }
      })
    },
    // 弹出添加子节点弹框
    addNodesClick () {
      let selectedInfo = this.$refs.tree.getCheckedNodes()
      if (selectedInfo.length > 0 && selectedInfo.length < 2) { // 确定选中一个
        this.node.pname = selectedInfo[0].label
        this.node.pid = selectedInfo[0].id
        this.modal2 = true
      } else {
        this.$Message.error('请选择一个节点！')
      }
    },
    // 添加子节点
    saveNode () {
      var param = {
        'content': this.node.content, // 症状
        'type': this.node.type, // 症状类型:0症状,1诊断
        'parentId': this.node.pid, // 父节点id
        'level': this.node.level, // 紧急程度
        'common': this.node.common // 是否常见症状:1是,0否
      }
      symptomInsert(param).then(res => {
        if (res.data) {
          let vm = this
          let dataset = vm.$refs.tree.getCheckedNodes()
          let childList = dataset[0].children
          childList.push({
            label: this.node.content,
            type: this.node.type,
            parentId: this.node.pid,
            level: this.node.level,
            parentName: this.node.pname,
            id: res.data.id,
            loading: false,
            children: []
          })
          this.$set(dataset[0], 'children', childList)

          this.node.content = ''
          this.node.type = ''
          this.node.pid = ''
          this.node.pname = ''
          this.node.common = ''
          this.node.level = ''
          this.showAddLevel = false
          this.$Message.info('添加成功！')
        }
      })
    },
    // 选中某个节点展示信息
    onSelectChange (selectedInfoList) {
      debugger
      let id = selectedInfoList.id
      symptomGet(id).then(res => {
        let rtndata = res.data
        this.updateNode.common = rtndata.common
        this.updateNode.type = rtndata.type
        this.updateNode.content = rtndata.content
        this.updateNode.level = rtndata.level
        this.updateNode.id = id
        this.updateNode.pid = selectedInfoList.parentId
        this.updateNode.pname = selectedInfoList.parentName
        if (rtndata.type === '1') {
          this.updateLeveShow = true
        } else {
          this.updateLeveShow = false
        }
      })
    },
    // 删除子节点
    // 1. 不是父节点（一级节点）2.删除节点没有子节点 3.删除节点相关的关系
    delTreeNode () {
      let selectedNode = this.$refs.tree.getCheckedNodes()
      if (selectedNode.length > 0) {
        let getNode = this.$refs.tree.getNode(selectedNode[0].id)
        symptomDelete(selectedNode[0].id).then(res => {
          if (res.data) {
            this.$Message.info('删除成功！')
            // 删除树节点
            this.$refs.tree.remove(getNode)
            this.updateNode.common = ''
            this.updateNode.type = ''
            this.updateNode.content = ''
            this.updateNode.level = ''
            this.updateNode.id = ''
            this.updateNode.pid = ''
            this.updateNode.pname = ''
          } else {
            this.$Message.error('先删除子节点！')
          }
        })
      } else {
        this.$Message.error('请选择至少一个节点！')
      }
    },
    parentNodeCancel () {
      this.parentForm.content = ''
      this.parentForm.type = ''
    },
    clearNodeData () {
      let vm = this
      vm.node.content = ''
      vm.node.pname = ''
      vm.node.pId = ''
      vm.node.type = ''
      vm.node.level = ''
      vm.node.common = ''
      this.showAddLevel = false
    },
    updateSubmit (name) {
      debugger
      this.$refs[name].validate((valid) => {
        if (valid) {
          let vm = this
          let param = {
            common: vm.updateNode.common,
            content: vm.updateNode.content,
            id: vm.updateNode.id,
            level: vm.updateNode.level,
            parentId: vm.updateNode.pId,
            type: vm.updateNode.type
          }
          symptomUpdate(param).then(res => {
            if (res.data) {
              this.$Message.success('更新成功!')
              // 更新节点
              let getNode = this.$refs.tree.getNode(vm.updateNode.pid)
              let children = getNode.childNodes
              for (let i = 0; i < children.length; i++) {
                if (children[i].data.id === vm.updateNode.id) {
                  children[i].data.common = vm.updateNode.common
                  children[i].data.label = vm.updateNode.content
                  children[i].data.level = vm.updateNode.level
                  children[i].data.type = vm.updateNode.type
                  return
                }
              }
              this.$set(getNode, 'children', children)
            } else {
              this.$Message.error('更新失败！')
            }
          })
        } else {
          this.$Message.error('请填写必要信息!')
        }
      })
    },
    // 节点之间做关联
    relationNodeClick () {
      let vm = this
      let selectedInfo = vm.$refs.tree.getCheckedNodes()
      if (selectedInfo.length > 0 && selectedInfo.length < 2) { // 确定选中一个
        vm.relationId = selectedInfo[0].id
        vm.modal3 = true
      } else if (selectedInfo.length > 1) {
        vm.$Message.error('只能选择一个树节点！')
      } else {
        vm.$Message.error('请选择一个节点！')
      }
    },
    // 保存关联
    saveRelation () {
      let vm = this
      let selectedInfo = vm.$refs.treeModel.getCheckedNodes()
      debugger
      if (selectedInfo.length > 0) {
        for (let i = 0; i < selectedInfo.length; i++) {
          let param = {
            id: '',
            targetId: vm.relationId,
            srcId: selectedInfo[i].id
          }
          debugger
          selectInsert(param).then(res => {
            if (res.data) {
              // this.getTreeData()
              let getNode = this.$refs.tree.getNode(vm.relationId)
              let children = selectedInfo[i].children
              children.push({
                common: getNode.data.common,
                label: getNode.data.label,
                id: getNode.data.id,
                level: getNode.data.level,
                parentId: getNode.data.pId,
                type: getNode.data.type
              })
              this.$set(selectedInfo[i].children, 'children', children)
              this.$Message.success('关联成功！')
            }
          })
        }
      } else {
        vm.$Message.error('请选择至少一个节点！')
      }
    },
    addNodeTypeChange (data) {
      if (data === '1') {
        this.showAddLevel = true
      } else {
        this.showAddLevel = false
      }
    },
    updateNodeTypeChange (data) {
      if (data === '1') {
        this.updateLeveShow = true
      } else {
        this.updateLeveShow = false
      }
    },
    addParentTypeChange (data) {
      if (data === '1') {
        this.addPrentLevelShow = true
      } else {
        this.addPrentLevelShow = false
      }
    }
  },
  mounted () {
    this.getTreeData()
  }
}
</script>

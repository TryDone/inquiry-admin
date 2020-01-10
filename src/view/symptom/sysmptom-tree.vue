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
        </div>
        <Tree ref="tree" :data="treeData" :load-data="loadTreeData" check-strictly @on-select-change="onSelectChange"></Tree>
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
                    <RadioGroup v-model="updateNode.type">
                        <Radio label="0">症状</Radio>
                        <Radio label="1">诊断结果</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="紧急程度" prop="level">
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
                <RadioGroup v-model="parentForm.type">
                    <Radio label="0">症状</Radio>
                    <Radio label="1">诊断结果</Radio>
                </RadioGroup>
            </FormItem>
        </Form>
     </div>
    </Modal>
    <!-- 增加子级菜单弹框  -->
    <Modal v-model="modal2" title="新增子症状" :mask-closable="false" @on-ok="saveNode">
    <div style="padding: 30px;">
         <Form :model="node" :rules="formValidate_modal2" :label-width="80">
            <FormItem label="症状名称" prop="content">
                <Input v-model="node.content" placeholder="请填写症状名称"></Input>
            </FormItem>
            <FormItem label="上级症状" prop="pname">
                <Input v-model="node.pname" placeholder="请填写上级症状" disabled></Input>
            </FormItem>
            <FormItem label="症状类型" prop="type">
                <RadioGroup v-model="node.type">
                    <Radio label="0">症状</Radio>
                    <Radio label="1">诊断结果</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="紧急程度" prop="level">
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
  </div>
</template>
<script>
import { symptomInsert, symptomDelete, symptomQuery, symptomGet, symptomUpdate } from '@/api/symptom'
export default {
  data () {
    return {
      parentForm: {
        content: '', // 添加一级症状-症状名
        type: '' // 添加一级症状-类型
      },
      updateNode: {
        content: '',
        id: '',
        type: '',
        level: '',
        common: '',
        pname: ''
      },
      selectNodeId: [], // 选中的节点
      node: {
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
      treeData: [],
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
      let id = '-1'
      symptomQuery(id).then(res => {
        this.treeData = res.data
        for (let i = 0; i < this.treeData.length; i++) {
          this.treeData[i].title = this.treeData[i].content
          this.treeData[i].loading = false
          this.treeData[i].children = []
          this.treeData[i].parentId = '-1'
          this.treeData[i].parentName = '无'
        }
      }).catch(err => {
        reject(err)
      })
    },
    // 查询子节点
    loadTreeData (item, callback) {
      debugger
      this.callbackF = callback
      setTimeout(() => {
        let id = item.id
        symptomQuery(id).then(res => {
          let rtndata = res.data
          for (let i = 0; i < rtndata.length; i++) {
            rtndata[i].title = rtndata[i].content
            rtndata[i].loading = false
            rtndata[i].parentId = id // 用于查询、删除
            rtndata[i].parentName = item.title
            rtndata[i].children = []
          }
          callback(rtndata)
        })
      }, 1000)
    },
    // 添加一级症状
    savePriSymp () {
      var param = {
        'content': this.parentForm.content,
        'type': this.parentForm.type
      }
      symptomInsert(param).then(res => {
        if (res.data) {
          debugger
          this.treeData.push({
            title: this.parentForm.content,
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
        }
      })
    },
    // 弹出添加子节点弹框
    addNodesClick () {
      let selectedInfo = this.$refs.tree.getSelectedNodes()
      if (selectedInfo.length > 0 && selectedInfo.length < 2) { // 确定选中一个
        this.node.pname = selectedInfo[0].content
        this.node.pid = selectedInfo[0].id
        debugger
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
          // let root = vm.$refs.tree.$root
          // let nodeobj = vm.$refs.tree.$attrs
          // const parentKey = root.find(el => el === nodeobj).parent;
          // const parent = root.find(el => el.nodeKey === parentKey).node;
          // const index = parent.children.indexOf(data);
          let dataset = vm.$refs.tree.getSelectedNodes()
          let childList = dataset[0].children
          childList.push({
            title: this.node.content,
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
          this.$Message.info('添加成功！')
        }
      })
    },
    // 选中某个节点展示信息
    onSelectChange (selectedInfoList) {
      if (selectedInfoList.length > 0) {
        let id = selectedInfoList[0].id
        symptomGet(id).then(res => {
          let rtndata = res.data
          this.updateNode.common = rtndata.common
          this.updateNode.type = rtndata.type
          this.updateNode.content = rtndata.content
          this.updateNode.level = rtndata.level
          this.updateNode.id = id
          this.updateNode.pid = selectedInfoList[0].parentId
          this.updateNode.pname = selectedInfoList[0].parentName
        })
      }
    },
    // 删除子节点
    // 1. 不是父节点（一级节点）2.删除节点没有子节点 3.删除节点相关的关系
    delTreeNode () {
      let selectedNode = this.$refs.tree.getSelectedNodes()
      if (selectedNode.length > 0) {
        symptomDelete(selectedNode[0].id).then(res => {
          if (res.data) {
            this.$Message.info('删除成功！')
            // 删除树节点
            let vm = this
            let root = vm.$refs.tree.$root
            let nodeobj = vm.$refs.tree.$attrs
            const parentKey = root.find(el => el === nodeobj).parent
            const parent = root.find(el => el.nodeKey === parentKey).node
            const index = parent.children.indexOf(data)
            parent.children.splice(index, 1)
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
    updateSubmit (name) {
      debugger
      this.$refs[name].validate((valid) => {
        if (valid) {
          var param = {
            common: this.updateNode.common,
            content: this.updateNode.content,
            id: this.updateNode.id,
            level: this.updateNode.level,
            parentId: this.updateNode.pId,
            type: this.updateNode.type
          }
          let selectNode = this.$refs.tree.getSelectedNodes()
          symptomUpdate(param).then(res => {
            if (res.data) {
              this.$Message.success('更新成功!')
              // 更新节点
              this.setStates(selectNode[0])
            } else {
              this.$Message.error('更新失败！')
            }
          })
        } else {
          this.$Message.error('请填写必要信息!')
        }
      })
    }
  },
  mounted () {
    this.getTreeData()
  }
}
</script>

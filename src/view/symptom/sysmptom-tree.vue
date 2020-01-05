<style lang="less">
    @import "./symptom.less";
</style>
<template>
  <div class="content">
    <!--左侧布局-->
    <div class="tree-con">
        <div class="btn-con">
            <Button type="primary" class="symptom-btn" @click="modal1 = true">添加一级症状</Button>
            <Button type="primary" class="symptom-btn" @click="modal2 = true">添加子症状</Button>
            <Button class="symptom-btn">删除</Button>
        </div>
        <Tree :data="data2" show-checkbox></Tree>
    </div>
    <!--右侧布局-->
    <div class="edit-con">
        <div class="form-con">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="症状名称" prop="content">
                    <Input  placeholder="请填写症状名称"></Input>
                </FormItem>
                <FormItem label="上级症状" prop="pcontent">
                    <Input  placeholder="请填写上级症状"></Input>
                </FormItem>
                <FormItem label="症状编码" prop="id">
                    <Input  placeholder="" disabled></Input>
                </FormItem>
                <FormItem label="症状类型" prop="type">
                    <RadioGroup>
                        <Radio label="0">症状</Radio>
                        <Radio label="1">诊断结果</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="紧急程度" prop="level">
                    <RadioGroup>
                        <Radio label="0">一般</Radio>
                        <Radio label="1">紧急</Radio>
                        <Radio label="2">非常紧急</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="常见类型" prop="common">
                    <RadioGroup>
                        <Radio label="1">是</Radio>
                        <Radio label="0">否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">修改并保存</Button>
                </FormItem>
            </Form>
        </div>
    </div>
    <!-- 增加一级菜单弹框  -->
    <Modal v-model="modal1" title="新增一级症状" :mask-closable="false">
    <div style="padding: 30px;">
        <Form :rules="ruleValidate_modal1" :label-width="80">
            <FormItem label="症状名称" prop="content">
            <Input  placeholder="请填写症状名称" style="width: 60%"></Input>
            </FormItem>
            <FormItem label="症状类型" prop="type">
                <RadioGroup>
                    <Radio label="0">症状</Radio>
                    <Radio label="1">诊断结果</Radio>
                </RadioGroup>
            </FormItem>
        </Form>
     </div>
    </Modal>
    <!-- 增加子级菜单弹框  -->
    <Modal v-model="modal2" title="新增子症状" :mask-closable="false">
    <div style="padding: 30px;">
         <Form :model="formValidate_modal2" :rules="ruleValidate" :label-width="80">
            <FormItem label="症状名称" prop="content">
                <Input  placeholder="请填写症状名称"></Input>
            </FormItem>
            <FormItem label="上级症状" prop="pcontent">
                <Input  placeholder="请填写上级症状"></Input>
            </FormItem>
            <FormItem label="症状类型" prop="type">
                <RadioGroup>
                    <Radio label="0">症状</Radio>
                    <Radio label="1">诊断结果</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="紧急程度" prop="level">
                <RadioGroup>
                    <Radio label="0">一般</Radio>
                    <Radio label="1">紧急</Radio>
                    <Radio label="2">非常紧急</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="常见类型" prop="common">
                <RadioGroup>
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
export default {
  data () {
    return {
      modal1: false,
      modal2: false,
      data2: [
        {
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1'
                },
                {
                  title: 'leaf 1-1-2'
                }
              ]
            },
            {
              title: 'parent 1-2',
              expand: true,
              children: [
                {
                  title: 'leaf 1-2-1'
                },
                {
                  title: 'leaf 1-2-1'
                }
              ]
            }
          ]
        }
      ],
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
        id: [
          { required: true, message: '症状编码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    }
  }
}
</script>

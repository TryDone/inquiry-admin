<style lang="less">
    @import "./symptom.less";
</style>
<template>
  <div class="content">
    <!--左侧布局-->
    <div class="tree-con">
        <div class="btn-con">
            <Button type="primary" class="symptom-btn">添加一级症状</Button>
            <Button type="primary" class="symptom-btn">添加子症状</Button>
            <Button class="symptom-btn">删除</Button>
        </div>
        <Tree :data="data2" show-checkbox></Tree>
    </div>
    <!--右侧布局-->
    <div class="edit-con">
        <div class="form-con">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="症状名称" prop="name">
                    <Input  placeholder="请填写症状名称"></Input>
                </FormItem>
                <FormItem label="上级症状" prop="name">
                    <Input  placeholder="请填写上级症状"></Input>
                </FormItem>
                <FormItem label="症状编码" prop="name">
                    <Input  placeholder="" disabled></Input>
                </FormItem>
                <FormItem label="症状类型" prop="gender">
                    <RadioGroup>
                        <Radio label="0">症状</Radio>
                        <Radio label="1">诊断结果</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="紧急程度" prop="gender">
                    <RadioGroup>
                        <Radio label="0">一般</Radio>
                        <Radio label="1">紧急</Radio>
                        <Radio label="2">非常紧急</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="常见类型" prop="gender">
                    <RadioGroup>
                        <Radio label="0">是</Radio>
                        <Radio label="1">否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">修改并保存</Button>
                </FormItem>
            </Form>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
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
      ]
    }
  }
}
</script>

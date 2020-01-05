<style lang="less">
    @import "./symptom.less";
</style>
<template>
  <div class="content">
    <div class="btn-con">
      <Button type="primary" class="symptom-btn">添加一级症状</Button>
      <Button type="primary" class="symptom-btn">添加子症状</Button>
      <Button class="symptom-btn">删除</Button>
    </div>
    <Tree :data="data2" show-checkbox></Tree>
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

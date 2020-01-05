<style lang="less">
    @import "./past-history.less";
</style>
<template>
  <div class="content">
      <div class="query-con">
        <label>症状：</label>
        <Input value="" placeholder="请输入症状" style="width: 300px" />
        <Button type="primary" id="queryBtn">查询</Button>
      </div>
      <div class="result-con">
           <Table border :columns="columns1" :data="data1"></Table>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      columns1: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '性别',
          key: 'sex'
        },
        {
          title: '出生日期',
          key: 'birthday'
        },
        {
          title: '既往史',
          key: 'past_history'
        }
      ],
      data1: [
        {
          name: 'John Brown',
          sex: 18,
          past_history: 'New York No. 1 Lake Park',
          birthday: '2016-10-03'
        },
        {
          name: 'John Brown',
          sex: 18,
          past_history: 'New York No. 1 Lake Park',
          birthday: '2016-10-03'
        },
        {
          name: 'John Brown',
          sex: 18,
          past_history: 'New York No. 1 Lake Park',
          birthday: '2016-10-03'
        },
        {
          name: 'John Brown',
          sex: 18,
          past_history: 'New York No. 1 Lake Park',
          birthday: '2016-10-03'
        }
      ]
    }
  }
}
</script>

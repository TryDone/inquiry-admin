<style lang="less">
    @import "./past-history.less";
</style>
<template>
  <div class="content">
      <div class="query-con">
        <label>症状：</label>
        <Input v-model="hisDiseaseStr" placeholder="请输入症状" style="width: 300px" />
        <Button type="primary" id="queryBtn" @click="queryHisDisease">查询</Button>
      </div>
      <div class="result-con">
           <Table border :columns="columns1" :data="data1"></Table>
      </div>
        <Page class="page-con" :total="totalNum" show-sizer show-total></Page>
  </div>
</template>
<script>
import { historyDisease } from '@/api/historydisease'

export default {
  data () {
    return {
      hisDiseaseStr: '',
      columns1: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '性别',
          key: 'sexName'
        },
        {
          title: '出生日期',
          key: 'birthday'
        },
        {
          title: '既往史',
          key: 'pastHistory'
        },
        {
          title: '关系',
          key: 'relationType'
        }
      ],
      data1: [
      ]
    }
  },
  methods: {
    queryHisDisease () {
      historyDisease(this.hisDiseaseStr).then(res => {
        if (res.data) {
          this.data1 = res.data.map(item => {
            return Object.assign({}, item, { sexName: item === 0 ? '女' : '男' })
          })
        }
      }).catch(err => {
        reject(err)
      })
    }
  },
  computed: {
    totalNum: function () {
      return this.data1.length
    }
  },
  mounted () {
    this.queryHisDisease()
  }
}
</script>

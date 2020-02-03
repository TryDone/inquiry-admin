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
        <Page class="page-con" :total="totalNum" show-sizer show-total @on-change="changePage" @on-page-size-change="pageSizeChange"></Page>
  </div>
</template>
<script>
import { historyJZ } from '@/api/historydisease'

export default {
  data () {
    return {
      hisDiseaseStr: '',
      start: 0,
      limit: 10,
      total: 0,
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
          title: '关系',
          key: 'relationType'
        },
        {
          title: '症状',
          key: 'pastHistory'
        }
      ],
      data1: [
      ]
    }
  },
  methods: {
    queryHisDisease () {
      let vm = this
      let param = {
        'start': vm.start,
        'limit': vm.limit,
        'pastHistory': vm.hisDiseaseStr
      }
      historyJZ(param).then(res => {
        if (res.data) {
          debugger
          vm.data1 = res.data.data.map(item => {
            return Object.assign({}, item, { sexName: item === 0 ? '女' : '男' })
          })
          vm.total = res.data.total
        }
      }).catch(err => {
        reject(err)
      })
    },
    changePage (data) {
      debugger
      let vm = this
      vm.start = (data - 1) * vm.limit
      this.queryHisDisease()
    },
    pageSizeChange (data) {
      let vm = this
      vm.limit = data
      this.queryHisDisease()
    }
  },
  computed: {
    totalNum: function () {
      return this.total
    }
  },
  mounted () {
    this.queryHisDisease()
  }
}
</script>

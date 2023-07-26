<template>
  <div>
    <el-table
      border
      height="400px"
      ref="tableRef"
      row-key="id"
      v-el-table-infinite-scroll="load"
      :data="tableData1"
      @selection-change="contractListChange"
      @select-all="selectList"
    >
      <el-table-column
        type="selection"
        width="40"
        align="center"
        fixed="left"
      ></el-table-column>
      <el-table-column prop="id" label="序号" width="180"> </el-table-column>
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>

    <div>
      勾选数据
      {{ contractList.length }}
    </div>

    <div>
      全部数据
      {{ tableData.length }}
    </div>
    <div>
      <el-button type="primary" @click="allClick">选中</el-button>
    </div>
  </div>
</template>

<script>
import elTableInfiniteScroll from "el-table-infinite-scroll";

export default {
  directives: {
    "el-table-infinite-scroll": elTableInfiniteScroll,
  },
  data() {
    return {
      tableData1: [],
      allinde: 0,
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 3,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 4,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 5,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 6,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 7,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 8,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 9,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 10,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 11,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 12,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 13,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 14,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 15,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 16,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 17,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 18,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 19,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 20,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      contractList: [],
    };
  },
  mounted() {
    // this.tableData1 = this.tableData.slice(
    //   this.allinde,
    //   (this.allinde + 1) * 5
    // );
  },
  methods: {
    allClick() {
      this.$nextTick(() => {
        this.contractList.forEach((row) => {
          this.$refs.tableRef.toggleRowSelection(row, true);
        });
      });
    },
    load() {
      this.allinde ++
      console.log(
        this.tableData.slice((this.allinde - 1) * 5, 5 * this.allinde)
      );
      if (
        this.tableData.slice((this.allinde - 1) * 5, 5 * this.allinde).length ==
        0
      ) {
        this.$message.success("没有数据了");
      } else {
        this.tableData
          .slice((this.allinde - 1) * 5, 5 * this.allinde)
          .forEach((el) => {
            this.tableData1.push(el);
          });

        
        this.$message.success("加载下一页");
      }

      //   this.tableData = this.tableData.concat(exampleData);
    },
    // 点击勾选合同列表
    contractListChange(val) {
      this.contractList = val;
    },
    // 点击全部勾选
    selectList(val) {
      this.contractList = this.tableData;

      return;
      console.log(this.tableData.length);
      console.log(val);
      let dataAll = this.tableData.length;
      let arr = [];
      this.tableData.forEach((el) => {
        arr.push(el);
      });
      for (let index = 0; index < 50 - dataAll; index++) {
        arr.push({
          id: this.tableData[this.tableData.length - 1].id + 1 + index,
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        });
      }
      this.contractList = arr;
      console.log(arr);
    },
  },
};
</script>

<style scoped>
.el-table {
  width: 100%;
}
</style>
<template>
  <div>
    <el-table
      id="printMe"
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      style="width: 100%"
      @click.native="click"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip
      ></el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData3[1], tableData3[2]])"
        >切换第二、第三行的选中状态</el-button
      >
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>

    <div class="slider" ref="slider" @click="toSetTimeLine($event)">
      <div class="process" :style="{ width }"></div>
      <div class="thunk" ref="trunk" :style="{ left }">
        <div class="block"></div>
        <!-- <div class="tips">
        <span>{{scale*100}}</span>
        <i class="fas fa-caret-down"></i>
      </div> -->
      </div>
      <!-- <div class="opacity" style="left:-21px;top:-5px;">0%</div> -->
      <div class="opacity" style="color: #83c8fe; right: -50px; top: -5px">
        {{ parseInt(scale * 100) }}%
      </div>
    </div>
    <button v-print="'#printMe'">Print local range</button>
  </div>
</template>;
<script>
export default {
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    value: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      slider: null, //滚动条DOM元素
      thunk: null, //拖拽DOM元素
      per: this.value, //当前值
      tableData3: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      multipleSelection: [],
    };
  },
  mounted() {
    this.slider = this.$refs.slider;
    this.thunk = this.$refs.trunk;
    var _this = this;
    this.thunk.onmousedown = function (e) {
      var width = parseInt(_this.width);
      var disX = e.clientX;
      document.onmousemove = function (e) {
        // value, left, width
        // 当value变化的时候，会通过计算属性修改left，width

        // 拖拽的时候获取的新width
        var newWidth = e.clientX - disX + width;
        // 拖拽的时候得到新的百分比
        var scale = newWidth / _this.slider.offsetWidth;
        _this.per = Math.ceil((_this.max - _this.min) * scale + _this.min);
        _this.per = Math.max(_this.per, _this.min);
        _this.per = Math.min(_this.per, _this.max);
      };
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      };
      return false;
    };
  },
  computed: {
    // 设置一个百分比，提供计算slider进度宽度和trunk的left值
    // 对应公式为  当前值-最小值/最大值-最小值 = slider进度width / slider总width
    // trunk left =  slider进度width + trunk宽度/2
    scale() {
      return (this.per - this.min) / (this.max - this.min);
    },
    width() {
      if (this.slider) {
        return this.slider.offsetWidth * this.scale + "px";
      } else {
        return 0 + "px";
      }
    },
    left() {
      if (this.slider) {
        return (
          this.slider.offsetWidth * this.scale -
          this.thunk.offsetWidth / 2 +
          "px"
        );
      } else {
        return 0 + "px";
      }
    },
  },
  watch: {
    scale(val, oldVal) {
      // console.log('per',val, oldVal)
      this.$emit("SetOpacityConfig", this.list, val);
    },
  },
  methods: {
    toSetTimeLine(e) {
      console.log(e);
      let widX = parseInt(((e.clientX - 30) / 700) * 100);
      this.per = widX;
      console.log(widX);
      console.log(this.$refs.slider);
    },
    toggleSelection(rows, idx) {
      if (rows) {
        //rows就是限贷的表格所有选中的数据list
        let selected = true;
        // 再次选中之前先把限贷所有的选中全部清空一下
        this.$refs.refs.multipleTable.clearSelection();

        rows.forEach((row) => {
          this.$refs.refs.multipleTable.toggleRowSelection(row, selected);
        });
        //下面我这个方法是升级版的,动态的表格
        //refs[`multipleTable${idx}`][0].clearSelection()
        //rows.forEach(row => {
        //    refs[`multipleTable${idx}`][0].toggleRowSelection(row, selected)
        //})
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style scoped >
.clear:after {
  content: "";
  display: block;
  clear: both;
}

</style>
  <template>
  <div>
    <p style="margin: 20px 0">
      <el-button @click="allSelection">全选</el-button>
      <el-checkbox style="margin-left: 30px" v-model="checked"
        >解决全选||取消全选卡顿？？</el-checkbox
      >
    </p>
    <u-table
  
      ref="plTable"
      :height="height"
      row-key="id"
      use-virtual
      :big-data-checkbox="checked"
      showBodyOverflow="title"
      showHeaderOverflow="title"
      :row-height="rowHeight"
      @select-all="selectall"
      @select="select"
      @sort-change="sortChange"
      border
    >
      <u-table-column
        type="selection"
        width="55"
       
        fixed="left"
        align="center"
      />

      <u-table-column
        label="任务名"
        width="230"
        prop="taskName"
        fixed="left"
        :sortable="'custom'"
      >
        <template slot-scope="data">
          <span class="ellipsisFlag">
            <span v-if="data.row.type == '2'">
              {{ data.row.taskName }}
            </span>
            <span v-else>
              {{ chinesechecked ? data.row.chinesename : data.row.taskName }}
            </span>
          </span>
        </template>
      </u-table-column>

      <u-table-column
        label="节点"
        prop="node_name"
        width="90"
        :sortable="'custom'"
      >
      </u-table-column>
      <u-table-column
        label="总工时"
        prop="forecast"
        align="center"
        width="90"
        :sortable="'custom'"
      >
        <template slot-scope="data">
          <span
            @click="showEditer(data.row, 'forecast', $event)"
            class="ellipsisFlag"
            style="font-size: 14px"
            >{{ data.row.forecast }}</span
          >
        </template>
      </u-table-column>

      <u-table-column
        label="周工时"
        prop="workingHours"
        align="center"
        width="90"
        :sortable="'custom'"
      >
        <template slot-scope="data">
          <span class="ellipsisFlag" style="font-size: 14px">{{
            data.row.workingHours
          }}</span>
        </template>
      </u-table-column>
      <u-table-column prop="producername" label="制作人" width="200">
        <template slot-scope="data">
          <span
            v-if="data.row.producername.length == 0"
           
            class="ellipsisFlag"
          >
            --
          </span>
          <span
            v-else
            v-for="(item, index) in data.row.producername"
            :key="index"
           
            class="ellipsisFlag"
          >
            {{ item.name }}
          </span>
        </template>
      </u-table-column>
      <u-table-column prop="company_name" label="制作公司" width="200">
        <template slot-scope="data">
          <span class="ellipsisFlag">
            {{ data.row.company_name }}
          </span>
        </template>
      </u-table-column>
      <u-table-column prop="base" label="备注说明" width="200">
      </u-table-column>

      <u-table-column label="状态" align="center" fixed="right">
        <template slot-scope="data">
          <div
            :style="data.row.nodeState.style"
            style="font-size: 12px"
          
          >
            {{ data.row.nodeState.label }}
          </div>
        </template>
      </u-table-column>
      <u-table-column
        label="操作"
        align="center"
        width="50"
        fixed="right"
        
      >
        <template slot-scope="data">
          <div
            v-if="data.row.is_del != '1'"
            class="delPlanTaskStyle"
           
          >
            <i class="el-icon-error"></i>
            <!-- {{ data.row.nodeState.label }} -->
          </div>
        </template>
      </u-table-column>
    </u-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([datas[0], datas[2]])"
        >切换第一、第三行的选中状态</el-button
      >
      <el-button @click="toggleSelection([datas[3]], '固定选中')"
        >选中第四行</el-button
      >
      <el-button @click="partRowSelections(true)">选中前面500条</el-button>
      <el-button @click="partRowSelections(false)"
        >取消前面选中的500条</el-button
      >
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-button @click="getCheckboxRecords()">获取选中的行</el-button>
    </div>
  </div>
</template>

  <script>
  import data from '../../static/data.json'
export default {
  data() {
    return {
      chinesechecked:true,
      tableData:data,
      checked: true,
      height: 619,
      rowHeight: 50,
      columns: Array.from({ length: 10 }, (_, idx) => ({
        prop: "address",
        id: idx,
        label: "地址" + idx,
        width: 200,
      })),
    };
  },
  mounted() {
    console.log(this.tableData);

    // this.datas = this.tableData;
    // 设置表格数据
    this.$refs.plTable.reloadData(this.tableData);
  },
  methods: {
    sortChange(prop, order){
      console.log(prop);
      console.log(order);
    },
    select(selection, row){
      console.log(selection);
      console.log(row);
      console.log('点击单项勾选');
    },
    selectall(val) {
      console.log("选中");
      console.log(val);
      // console.log(JSON.stringify(val));
    },
    selectable(row, index) {
      if (index === 1) {
        return false;
      } else {
        return true;
      }
    },
    allSelection() {
      this.$refs.plTable.toggleAllSelection();
    },
    clearSelection() {
      this.$refs.plTable.clearSelection();
    },
    // 适用于多量的数据选中
    partRowSelections(state) {
      // 获取前面的500条数据。实际场景自己去给你要选中的数据
      let data = this.datas.slice(0, 500);
      // data是数据，state是选中还是取消选中
      this.$refs.plTable.partRowSelections(data, state);
    },
    // 适用于少量的数据选中,如果你要选择大量数据，请使用partRowSelections方法。
    toggleSelection(rows, type) {
      if (rows) {
        rows.forEach((row) => {
          // 注意： 勾选方法与element不同哦
          // this.$refs.plTable.toggleRowSelection(row); // element表格是这样写的
          // 我们得这样写

          // 如果是固定选中
          if (type === "固定选中") {
            // toggleRowSelection方法参数不懂得去看文档api哦
            this.$refs.plTable.toggleRowSelection([
              {
                row: row,
                selected: true,
              },
            ]);
            // 下面这是切换选中
          } else {
            this.$refs.plTable.toggleRowSelection([
              {
                row: row,
              },
            ]);
          }
        });
      } else {
        this.$refs.plTable.clearSelection();
      }
    },
    // 获取复选框选中的行
    getCheckboxRecords() {
      console.log(this.$refs.plTable.getCheckboxRecords());
    },
  },
};
</script>
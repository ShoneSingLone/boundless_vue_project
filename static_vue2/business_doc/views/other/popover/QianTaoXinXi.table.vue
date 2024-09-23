<template>
	<el-table :data="gridData">
		<el-table-column width="150" property="date" label="日期"></el-table-column>
		<el-table-column width="100" property="name" label="姓名"></el-table-column>
		<el-table-column width="300" property="address" label="地址"></el-table-column>
	</el-table>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				gridData: [
					{
						date: "2016-05-02",
						name: "上海市普陀区金沙江路",
						address: "上海市普陀区金沙江路 1518 弄"
					},
					{
						date: "2016-05-04",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1518 弄"
					},
					{
						date: "2016-05-01",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1518 弄"
					},
					{
						date: "2016-05-03",
						name: "王小虎",
						address: "上海市普陀区金沙江路 1518 弄"
					}
				]
			};
		}
	});
}
</script>
<style lang="less"></style>

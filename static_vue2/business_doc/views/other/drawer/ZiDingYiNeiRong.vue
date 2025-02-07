<template>
	<div class="message-JiChuYongFa">
		<xMd :md="md" />
		<xBtn preset="text" @click="table = true">打开嵌套表格的 Drawer</xBtn>
		<xBtn preset="text" @click="dialog = true">打开嵌套 Form 的 Drawer</xBtn>
		<xDrawer title="我嵌套了表格!" :visible.sync="table" direction="rtl" size="50%">
			<xCard>
				<!-- <el-table :data="gridData">
					<el-table-column property="date" label="日期" width="150"></el-table-column>
					<el-table-column property="name" label="姓名" width="200"></el-table-column>
					<el-table-column property="address" label="地址"></el-table-column>
				</el-table> -->
			</xCard>
		</xDrawer>

		<xDrawer
			title="我嵌套了 Form !"
			:before-close="handleClose"
			:visible.sync="dialog"
			direction="ltr"
			custom-class="demo-drawer"
			ref="drawer">
			<div class="demo-drawer__content">
				<xForm :col="1">
					<xItem :configs="{ label: '活动名称' }" v-model="form.name" />
					<xItem
						:configs="{
							label: '活动区域',
							itemType: 'xItemSelect',
							options: [
								{ label: '区域一', value: 'shanghai' },
								{ label: '区域二', value: 'beijing' }
							]
						}"
						v-model="form.name" />
				</xForm>

				<div class="demo-drawer__footer flex center width100 mt">
					<xBtn @click="cancelForm">取 消</xBtn>
					<xBtn preset="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{
						loading ? "提交中 ..." : "确 定"
					}}</xBtn>
				</div>
			</div>
		</xDrawer>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: ["和 `Dialog` 组件一样, `Drawer` 同样可以在其内部嵌套各种丰富的操作"].join(
					"\n"
				),
				table: false,
				dialog: false,
				loading: false,
				gridData: [
					{
						date: "2016-05-02",
						name: "王小虎",
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
				],
				form: {
					name: "",
					region: "",
					date1: "",
					date2: "",
					delivery: false,
					type: [],
					resource: "",
					desc: ""
				},
				formLabelWidth: "80px",
				timer: null
			};
		},
		methods: {
			handleClose(done) {
				if (this.loading) {
					return;
				}
				_.$confirm("确定要提交表单吗？").then(_ => {
					this.loading = true;
					this.timer = setTimeout(() => {
						done();
						// 动画关闭需要一定的时间
						setTimeout(() => {
							this.loading = false;
						}, 400);
					}, 2000);
				});
			},
			cancelForm() {
				this.loading = false;
				this.dialog = false;
				clearTimeout(this.timer);
			}
		}
	});
}
</script>
<style lang="less"></style>

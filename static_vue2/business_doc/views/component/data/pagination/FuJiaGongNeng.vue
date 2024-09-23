<template>
	<div class="flex vertical mr">
		<xMd
			:md="'根据场景需要，可以添加其他功能模块。\n\n此例是一个完整的用例，使用了`size-change`和`current-change`事件来处理页码大小和当前页变动时候触发的事件。`page-sizes`接受一个整型数组，数组元素为展示的选择每页显示个数的选项，`[100, 200, 300, 400]`表示四个选项，每页显示 100 个，200 个，300 个或者 400 个。'" />
		<div class="block">
			<xMd md="### 显示总数" />
			<xPagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page.sync="currentPage1"
				:page-size="100"
				layout="total, prev, pager, next"
				:total="1000">
			</xPagination>
		</div>
		<div class="block">
			<xMd md="### 调整每页显示条数" />
			<xPagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page.sync="currentPage2"
				:page-sizes="[100, 200, 300, 400]"
				:page-size="100"
				layout="sizes, prev, pager, next"
				:total="1000">
			</xPagination>
		</div>
		<div class="block">
			<xMd md="### 直接前往" />
			<xPagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page.sync="currentPage3"
				:page-size="100"
				layout="prev, pager, next, jumper"
				:total="1000">
			</xPagination>
		</div>
		<div class="block">
			<xMd md="### 完整功能" />
			<xPagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage4"
				:page-sizes="[100, 200, 300, 400]"
				:page-size="100"
				layout="total, sizes, prev, pager, next, jumper"
				:total="400">
			</xPagination>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		},
		data() {
			return {
				currentPage1: 5,
				currentPage2: 5,
				currentPage3: 5,
				currentPage4: 4
			};
		}
	});
}
</script>
<style lang="less"></style>

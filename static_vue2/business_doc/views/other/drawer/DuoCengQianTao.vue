<template>
	<div class="message-JiChuYongFa">
		<xMd :md="md" />
		<xBtn @click="drawer = true" preset="primary" style="margin-left: 16px"> 点我打开 </xBtn>

		<xDrawer title="我是外面的 Drawer" :visible.sync="drawer" size="50%">
			<div>
				<xBtn @click="innerDrawer = true">打开里面的!</xBtn>
				<xDrawer
					title="我是里面的"
					:append-to-body="true"
					:before-close="handleClose"
					:visible.sync="innerDrawer">
					<p>_(:зゝ∠)_</p>
				</xDrawer>
			</div>
		</xDrawer>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: [
					"`Drawer` 组件也拥有多层嵌套的方法",
					"同样, 如果你需要嵌套多层 `Drawer` 请一定要设置 `append-to-body` 属性为 **true**"
				].join("\n"),
				drawer: false,
				innerDrawer: false
			};
		},
		methods: {
			handleClose(done) {
				_.$confirm("还有未保存的工作哦确定关闭吗？").then(done);
			}
		}
	});
}
</script>
<style lang="less"></style>

<template>
	<div class="message-JiChuYongFa">
		<xMd :md="md" />
		<xBtn @click="drawer = true" preset="primary" style="margin-left: 16px"> 点我打开 </xBtn>
		<xDrawer title="我是标题" :visible.sync="drawer" :with-header="false">
			<span>我来啦!</span>
		</xDrawer>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: [
					"当你不需要标题到时候, 你还可以去掉标题",
					"当遇到不需要 title 的场景时, 可以通过 `withHeader` 这个属性来关闭掉 title 的显示, 这样可以留出更大的空间给到用户, 为了用户的可访问性, 请务必设定 `title` 的值"
				].join("\n"),
				drawer: false
			};
		},
		methods: {}
	});
}
</script>
<style lang="less"></style>

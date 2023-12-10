<template>
	<div>
		<p>这是一段内容这是一段内容确定删除吗？</p>
		<div style="text-align: right; margin: 0">
			<xBtn size="mini" type="text" @click="cancel">取消</xBtn>
			<xBtn preset="primary" size="mini" @click="ok">确定</xBtn>
		</div>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {};
		},
		methods: {
			ok() {
				this.$emit("selected", { isOk: true });
			},
			cancel() {
				this.$emit("selected", { isOk: false });
			}
		}
	});
}
</script>
<style lang="less"></style>

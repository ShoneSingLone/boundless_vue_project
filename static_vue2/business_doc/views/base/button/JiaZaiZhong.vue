<template>
	<div class="card-JiChuYongFa">
		<Md :md="mdTitle" />
		<xBtn preset="primary" :loading="true">加载中</xBtn>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle: "点击按钮后进行数据加载操作，在按钮上显示加载状态。\n\n要设置为 loading 状态，只要设置`loading`属性为`true`即可。 "
			};
		}
	});
}
</script>
<style lang="less"></style>

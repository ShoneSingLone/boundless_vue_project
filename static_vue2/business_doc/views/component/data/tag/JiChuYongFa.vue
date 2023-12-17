<template>
	<div class="margin16">
		<xMd :md="'由`type`属性来选择tag的类型，也可以通过`color`属性来自定义背景色。'" />
		<xTag>标签一</xTag>
		<xTag type="success">标签二</xTag>
		<xTag type="info">标签三</xTag>
		<xTag type="warning">标签四</xTag>
		<xTag type="danger">标签五</xTag>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {};
		}
	});
}
</script>

<template>
	<div>
		<md :md="'>通用的资源放在commonn/assets/SVG 文件夹下\n\n直接使用svg的名字作为icon\n'" />
		<xIcon icon="icon_no_data" class="empty" />
		<xIcon icon="arrow_triangle-left" class="empty" />
		<xIcon icon="x-loading" class="empty" />
		<xIcon icon="icon_table_filter" class="empty" />
	</div>
</template>
<script>
export default async function () {
	return defineComponent({});
}
</script>
<style lang="less"></style>

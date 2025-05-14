<template>
	<xBtn preset="blue" @click="() => $emit('click')">
		{{ i18n("search") }}
	</xBtn>
</template>
<script lang="ts">
export default async function () {
	/* 列表上面的查询按钮 */
	return {};
}
</script>

<template>
	<xForm col="3" id="descriptions-JiChuYongFa">
		<xItemDesc
			v-for="(item, index) in DemoDescriptions.items"
			:key="index"
			:item="item"
			:span="item.span" />
	</xForm>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["DemoDescriptions"]
	});
}
</script>

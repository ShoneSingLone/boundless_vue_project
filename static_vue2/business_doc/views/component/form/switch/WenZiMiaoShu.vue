<template>
	<div>
		<xMd :md="md" />
		<xSwitch v-model="value1" active-text="按月付费" inactive-text="按年付费" />
		<xGap t />
		<xSwitch
			style="display: block"
			v-model="value2"
			active-color="#13ce66"
			inactive-color="#ff4949"
			active-text="按月付费"
			inactive-text="按年付费" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "使用`active-text`属性与`inactive-text`属性来设置开关的文字描述。",
				value1: true,
				value2: true
			};
		}
	});
}
</script>
<style lang="less"></style>

<style lang="less"></style>
<template>
	<div class="flex vertical">
		<xItem label="cronValue">
			<div>{{ cronValue }}</div>
		</xItem>
		<xItem v-model="cronValue" :configs="cron" style="--xItem-wrapper-width: 450px" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		components: {
			xItemCronExpression: () =>
				_.$importVue(
					"/common/ui-x/common/xItem/xItemCronExpression/xItemCronExpression.vue"
				)
		},
		data() {
			return {
				cronValue: "****",
				cron: defItem({
					label: "cron-expression",
					itemType: "xItemCronExpression",
					msg: ``,
					rules: []
				})
			};
		}
	});
}
</script>

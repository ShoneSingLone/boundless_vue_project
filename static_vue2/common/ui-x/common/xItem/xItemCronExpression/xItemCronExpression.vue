<style lang="less"></style>
<template>
	<div class="flex middle">
		<xInput v-model="mixin_value" />
		<xBtn @click="openCronExpressionDialog">{{ cptLabel }}</xBtn>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");

	return defineComponent({
		mixins: [mixins],
		props: ["value", "configs"],
		components: {
			xItemCronExpression: () =>
				_.$importVue(
					"/common/ui-x/common/xItem/xItemCronExpression/xItemCronExpression.vue"
				)
		},
		data() {
			return {};
		},
		computed: {
			cptLabel() {
				return i18n("生成表达式");
			}
		},
		methods: {
			onInput(e) {
				debugger;
				this.mixin_value = e;
			},
			async openCronExpressionDialog() {
				_.$openModal({
					title: "Cron表达式生成器",
					url: "/common/ui-x/common/xItem/xItemCronExpression/xItemCronExpression.dialog.vue"
				});
			}
		}
	});
}
</script>

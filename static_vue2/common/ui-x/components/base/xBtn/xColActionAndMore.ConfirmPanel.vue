<template>
	<div v-clickoutside="handleClose">
		<div class="x-confirm-panel-content">
			<xRender :render="tips" />
		</div>
		<div class="flex center middle">
			<xBtn size="mini" @click="onOk">{{ i18n("确定") }}</xBtn>
			<xBtn preset="primary" size="mini" @click="onCancel">{{ i18n("取消") }}</xBtn>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	const [Clickoutside] = await Promise.all([
		_.$importVue("/common/ui-x/directive/clickoutside.vue")
	]);
	return defineComponent({
		props: ["tips"],
		directives: { Clickoutside },
		data() {
			return {};
		},
		methods: {
			handleClose() {
				this.$emit("outside");
			},
			onOk() {
				this.$emit("ok", { isOk: true });
			},
			onCancel() {
				this.$emit("cancel", { isOk: false });
			}
		}
	});
}
</script>
<style lang="less">
.x-confirm-panel-content {
	width: var(--x-confirm-panel-content, 200px);
	padding-bottom: var(--ui-half);
}
</style>

<style lang="less"></style>
<template>
	<xBtn v-xtips="manual" @click="handleClick" :configs="configs" />
</template>
<script lang="ts">
export default async function () {
	const xColActionAndMoreConfirmPanel = await _.$importVue("/common/ui-x/components/base/xBtn/xColActionAndMore.ConfirmPanel.vue");

	return defineComponent({
		props: {
			configs: {
				type: Object,
				default: () => ({})
			},
			tips: {
				type: String,
				default: ""
			},
			onOk: {
				type: Function,
				default: () => {}
			},
			onCancel: {
				type: Function,
				default: () => {}
			}
		},
		data() {
			const vm = this;
			return {
				manual: {
					content() {
						return h(xColActionAndMoreConfirmPanel, {
							tips: vm.tips,
							async onOk() {
								const isStop = await vm.onOk();
								if (!isStop) {
									vm.manual.visible = false;
								}
							},
							async onOutside() {
								vm.manual.visible = false;
							},
							async onCancel() {
								const isStop = await vm.onCancel();
								if (!isStop) {
									vm.manual.visible = false;
								}
							}
						});
					},
					trigger: "manual",
					visible: false,
					placement: "top"
				}
			};
		},
		methods: {
			handleClick() {
				this.manual.visible = true;
			}
		}
	});
}
</script>

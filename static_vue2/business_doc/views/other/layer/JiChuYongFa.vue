<template>
	<div class="flex vertical">
		<textarea v-model="code" style="height: 200px; height: 200px" />
		<div class="flex start">
			<xBtn :configs="runCode" />
		</div>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				code: `layer.open({
  title: '在线调试'
  ,content: '配置各种参数，试试效果'
});
  `
			};
		},
		mounted() {
			// this.runCode.onClick();
			// this.openDialog();
		},
		methods: {
			async openDialog() {
				const WindowImageModify = await _.$importVue("@/views/other/WindowModify.vue", { parent: this });
				_.$openWindow(i18n("modifyImageInfo"), WindowImageModify);
			}
		},
		computed: {
			runCode() {
				const vm = this;
				return {
					preset: "blue",
					label: "运行代码",
					onClick() {
						(function () {
							with (window) {
								try {
									eval(vm.code);
								} catch (error) {
									console.error(error);
								}
							}
						})();
					}
				};
			}
		}
	});
}
</script>
<style lang="less"></style>

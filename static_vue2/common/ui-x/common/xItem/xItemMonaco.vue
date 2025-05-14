<template>
	<div class="xItemMonaco mt x-loading" ref="refMonacoContainer" />
</template>
<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	const theme = ["vs", "vs-dark", "hc-black", "hc-light"];
	return defineComponent({
		mixins: [mixins],
		props: ["options"],
		async mounted() {
			const vm = this;
			const container = this.$refs.refMonacoContainer;
			const require = await _.$appendScript(
				"//repo.bfw.wiki/bfwrepo/js/monaco-editor/loader.js",
				"require"
			);
			require.config({ paths: { vs: "//repo.bfw.wiki/bfwrepo/js/monaco-editor" } });

			require(["vs/editor/editor.main"], function () {
				const { monaco } = window;
				vm.raw$editor = monaco.editor.create(container, {
					value: vm.mixin_value || "",
					language: _.$val(vm, "configs.language") || "json",
					automaticLayout: true, //自动布局
					readOnly: _.$val(vm, "configs.readOnly") || false,
					theme: _.$val(vm, "configs.theme") || theme[1]
				});
				vm.raw$editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, function () {
					vm.raw$editor.getAction("editor.action.formatDocument").run();
					vm.xItem.$emit("save");
				});
				vm.$nextTick(() => {
					vm.raw$editor.getAction("editor.action.formatDocument").run();
					vm.raw$editor.onDidChangeModelContent(data =>
						vm.setEditorValue({
							data,
							direction: "bottomToUp"
						})
					);
					$(vm.$refs.refMonacoContainer).removeClass("x-loading");
				});
			});
		},
		methods: {
			setEditorValue(options = {}) {
				if (!_.$val(this, "raw$editor.getValue")) {
					return;
				}
				try {
					const currentEditorContent = this.raw$editor.getValue();
					if (!_.isEqual(currentEditorContent, this.value)) {
						const { direction } = options || {};
						if (direction === "bottomToUp") {
							this.mixin_value = currentEditorContent;
						} else {
							this.raw$editor.setValue(this.value);
						}
					}
				} catch (error) {
					console.error(error);
				}
			}
		},
		watch: {
			value: {
				immediate: true,
				handler() {
					this.setEditorValue();
				}
			}
		}
	});
}
</script>
<style lang="less">
.xItemMonaco {
	width: 100%;
	height: var(--xItemMonaco-height, 800px);
}
</style>

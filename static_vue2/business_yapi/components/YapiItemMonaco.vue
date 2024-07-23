<template>
	<div class="YapiItemMonaco mt x-loading" ref="refMonacoContainer" />
</template>

<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	const theme = ["vs", "vs-dark", "hc-black", "hc-light"];
	return defineComponent({
		mixins: [mixins],
		inject: ["APP", "xItem"],
		props: ["value", "options", "configs"],
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
					language: vm.configs?.language || "json",
					automaticLayout: true, //自动布局
					readOnly: vm.configs?.readOnly || false,
					theme: vm.configs?.theme || theme[1]
				});
				vm.raw$editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, function () {
					vm.raw$editor.getAction("editor.action.formatDocument").run();
					vm.xItem.$emit("save");
				});
				vm.$nextTick(() => {
					vm.raw$editor.getAction("editor.action.formatDocument").run();
					vm.raw$editor.onDidChangeModelContent(vm.syncData);

					$(vm.$refs.refMonacoContainer).removeClass("x-loading");
				});
			});
		},
		methods: {
			syncData() {
				try {
					const newCode = this.raw$editor.getValue();

					if (newCode !== this.mixin_value) {
						this.mixin_value = newCode;
					} else if (this.mixin_value && !newCode) {
						this.raw$editor.setValue(this.mixin_value);
					}
				} catch (error) {
					console.error(error);
				}
			}
		},
		watch: {
			value() {
				this.syncData();
			}
		}
	});
}
</script>

<style lang="less">
.YapiItemMonaco {
	width: 100%;
	height: var(--YapiItemMonaco-height, 800px);
}
</style>

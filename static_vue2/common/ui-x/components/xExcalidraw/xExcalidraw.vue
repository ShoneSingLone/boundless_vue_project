<style lang="less"></style>
<template>
	<div />
</template>
<script lang="ts">
export default async function () {
	let { React, ReactDOM } = await _.$importVue("/common/react/useReact.vue");
	if (!window.ExcalidrawLib) {
		await _.$appendScript(
			"https://unpkg.com/@excalidraw/excalidraw/dist/excalidraw.development.js",
			"ExcalidrawLib"
		);
	}
	let { ExcalidrawLib } = window;
	debugger;
	return defineComponent({
		mounted() {
			const AppExcalidrawLib = () => {
				debugger;
				return React.createElement(
					React.Fragment,
					null,
					React.createElement(
						"div",
						{
							style: { height: "500px" }
						},
						React.createElement(ExcalidrawLib.Excalidraw)
					)
				);
			};

			const excalidrawWrapper = this.$el;
			const root = ReactDOM.createRoot(excalidrawWrapper);
			root.render(React.createElement(AppExcalidrawLib));
			debugger;
		}
	});
}
</script>

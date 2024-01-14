<script lang="ts">
export default async function () {
	return defineComponent({
		name: "xNodeContent",
		inject: ["injectRootTree"],
		props: _useXui.buildProps({
			node: {
				type: Object,
				required: true
			}
		}),
		setup() {
			const vm = this;
			/* @ts-ignore */
			const injectRootTree = vm.injectRootTree;
			const ns = _useXui.useNamespace("tree");
			return () => {
				const node = vm.node;
				const { data } = node;
				if (injectRootTree.$attrs.contentRender) {
					return injectRootTree.$attrs.contentRender({ node, data });
				} else {
					return h("span", { class: ns.be("node", "label") }, [node ? node.label : null]);
				}
			};
		}
	});
}
</script>

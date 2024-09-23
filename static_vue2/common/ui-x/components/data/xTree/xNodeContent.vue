<script lang="ts">
export default async function () {
	return defineComponent({
		name: "xNodeContent",
		inject: ["injectRootTree"],
		props: _xUtils.buildProps({
			node: {
				type: Object,
				required: true
			}
		}),
		setup() {
			const vm = this;
			/* @ts-ignore */
			const injectRootTree = vm.injectRootTree;
			const ns = _xUtils.useNamespace("tree");
			return () => {
				const { node } = vm;
				const { data } = node;
				if (injectRootTree.$attrs.contentRender) {
					return injectRootTree.$attrs.contentRender({ node, data, injectRootTree });
				} else {
					return h("span", { class: ns.be("node", "label") }, [node?.label]);
				}
			};
		}
	});
}
</script>

<script lang="ts">
export default async function () {
	return defineComponent({
		render() {
			return h("div", [
				h("xMd", {
					md: "如果\`404\`找不到，默认显示loading。并且会添加旋转动画"
				}),
				h("xIcon", {
					icon: "_nerver_find_it",
					class: "empty"
				})
			]);
		}
	});
}
</script>

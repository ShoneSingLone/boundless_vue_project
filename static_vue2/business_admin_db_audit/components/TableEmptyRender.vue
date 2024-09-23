<script lang="ts">
export default async function () {
	return {
		emptyRender() {
			return h("div", { staticClass: "flex vertical middle center" }, [
				h(
					"xIcon",
					{
						icon: "_tableNoData",
						staticClass: "empty"
					},
					[]
				),
				h("span", { staticClass: "el-table__empty-text flex center" }, [i18n("暂无数据")])
			]);
		}
	};
}
</script>

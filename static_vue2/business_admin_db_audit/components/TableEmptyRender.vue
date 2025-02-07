<script lang="ts">
export default async function () {
	return {
		emptyRender() {
			return hDiv(
				{
					staticClass: "flex vertical middle center",
					style: {
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%,-50%)"
					}
				},
				[
					h(
						"xIcon",
						{
							icon: "_tableNoData",
							staticClass: "empty"
						},
						[]
					),
					hSpan({ staticClass: "el-table__empty-text flex center" }, [i18n("暂无数据")])
				]
			);
		}
	};
}
</script>

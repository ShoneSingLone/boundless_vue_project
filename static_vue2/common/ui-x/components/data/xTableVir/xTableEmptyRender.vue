<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	const { x_table_vir_empty_component_icon } = PRIVATE_GLOBAL;
	return {
		emptyRender() {
			return hDiv({ staticClass: "flex vertical middle center flex1-overflow-auto" }, [
				h(
					"xIcon",
					{
						icon: x_table_vir_empty_component_icon || "icon_no_data",
						staticClass: "empty"
					},
					[]
				),
				hSpan({ staticClass: "el-table__empty-text flex center" }, [i18n("暂无数据")])
			]);
		}
	};
}
</script>

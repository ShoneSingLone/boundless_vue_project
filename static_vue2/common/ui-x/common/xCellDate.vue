<template>
	<span>{{ cpt_label }}</span>
</template>

<script>
export default async function () {
	/**
	 * xCellText: {
	 *     setLabel({ row, label }) {
	 *         if (row?.canMigratevol) {
	 *             label = row.canMigratevol.result ? i18n("是") : i18n("否");
	 *         }
	 *         return label;
	 *     }
	 * }
	 */
	return {
		data() {
			return {};
		},
		computed: {
			cpt_type() {
				/* _.$dateFormat 默认0、1、 自定义 */
				return (
					this?.$options?.propsData?.configs?.col?.componentOptions?.type || 0
				);
			},
			cpt_prop() {
				return (
					this?.$options?.propsData?.configs?.col?.componentOptions?.prop ||
					this?.$options?.propsData?.configs?.prop
				);
			},
			cpt_label() {
				return _.$dateFormat(this.row[this.cpt_prop], this.cpt_type);
			}
		}
	};
}
</script>

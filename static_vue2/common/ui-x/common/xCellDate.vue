<template>
	<span>{{ cpt_label }}</span>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {};
		},
		computed: {
			cpt_type() {
				/* _.$dateFormat 默认0、1、 自定义 */
				return this?.$options?.propsData?.configs?.col?.componentOptions?.type || 0;
			},
			cpt_prop() {
				return this?.$options?.propsData?.configs?.col?.componentOptions?.prop || this?.$options?.propsData?.configs?.prop;
			},
			cpt_label() {
				return _.$dateFormat(this.row[this.cpt_prop], this.cpt_type);
			}
		}
	};
}
</script>

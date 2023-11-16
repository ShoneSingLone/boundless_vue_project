<template>
	<div>
		{{ cpt_label }}
	</div>
</template>

<script>
export default async function () {
	return {
		data() {
			return {};
		},
		computed: {
			cpt_prop() {
				return this.configs.prop;
			},
			cpt_value() {
				return this.row(this.cpt_prop);
			},
			cpt_item() {
				const item = _.find(this.configs.col?.componentOptions?.options);
				return item || {};
			},
			cpt_label() {
				return this.cpt_item.label || this.cpt_value;
			}
		}
	};
}
</script>

<style lang="less"></style>

<template>
	<div>
		<a v-if="cpt_onClick" @click="cpt_onClick">{{ cpt_label }}</a>
		<span v-else>{{ cpt_label }}</span>
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
				return this?.$vnode?.data?.prop;
			},
			cpt_label() {
				let label = "--";
				const { cpt_label } = this?.$options?.propsData?.configs?.col?.componentOptions || {};
				if (_.isString(cpt_label)) {
					return cpt_label;
				}
				if (_.isFunction(cpt_label)) {
					label = cpt_label.call(this?.$options?.propsData?.configs?.col?.componentOptions, { row: this.row, label });
				}
				return label;
			},
			cpt_onClick() {
				const vm = this;
				if (vm?.$options?.propsData?.configs?.col?.componentOptions?.onClick) {
					return () => {
						vm?.$options?.propsData?.configs?.col?.componentOptions?.onClick({
							row: vm.row,
							configs: vm.configs
						});
					};
				}
				return false;
			}
		}
	};
}
</script>

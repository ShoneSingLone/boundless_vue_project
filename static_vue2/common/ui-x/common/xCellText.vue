<template>
	<div>
		<a v-if="cpt_onClick" @click="cpt_onClick">{{ cpt_label }}</a>
		<span v-else>{{ cpt_label }}</span>
	</div>
</template>
<script lang="ts">
export default async function () {
	return {
		data() {
			return {};
		},
		computed: {
			cpt_prop() {
				return _.$val(this, "$vnode.data.prop");
			},
			cpt_label() {
				let label = "--";
				const { cpt_label } =
					_.$val(this, "$options.propsData.configs.col.componentOptions") || {};
				if (_.isString(cpt_label)) {
					return cpt_label;
				}
				if (_.isFunction(cpt_label)) {
					label = cpt_label.call(
						_.$val(this, "$options.propsData.configs.col.componentOptions"),

						{ row: this.row, label }
					);
				}
				return label;
			},
			cpt_onClick() {
				const vm = this;
				if (_.$val(vm, "$options.propsData.configs.col.componentOptions.onClick")) {
					return () => {
						_.$callFn(
							vm,
							"$options.propsData.configs.col.componentOptions.onClick"
						)({
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

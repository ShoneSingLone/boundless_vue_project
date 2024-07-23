<template>
	<xRadioGroup v-model="mixin_value">
		<xRadioButton label="上海" />
	</xRadioGroup>
</template>

<script lang="ts">
export default async function () {
	const [{ mixins }] = await _.$importVue(["/common/ui-x/common/ItemMixins.vue"]);
	return {
		mixins: [mixins],
		props: ["value", "configs"],
		mounted() {
			this.getOptions();
		},
		computed: {},
		setup() {
			const vm = this;

			vm.getOptions = _.debounce(async function () {
				_.$loading(true);
				try {
					const res = await _api.restCtyunV10VpcList(params);
					if (res.code == 200) {
						vm.configs.options = _.map(res.result.records, item => {
							return {
								label: item.vpcName,
								value: item.vpcId,
								_item: item
							};
						});

						this.configs.i18nMany = () => {
							const item = _.$getSelectedItemFrom(this.configs);
							debugger;
							return [];
						};

						vm.$emit("configschange", vm.configs);
					}
				} catch (error) {
					console.error(error);
				} finally {
					_.$loading(false);
				}
			}, 1000);
		},
		watch: {
			cptEnterprise: {
				immediate: true,
				handler() {
					this.getOptions();
				}
			}
		}
	};
}
</script>

<style lang="less"></style>

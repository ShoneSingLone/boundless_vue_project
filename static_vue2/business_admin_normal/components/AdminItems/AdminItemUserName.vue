<template>
	<div class="flex middle">
		<xSelect
			class="flex1"
			v-model="mixin_value"
			v-bind="$attrs"
			v-on="mixin_listeners"
			:disabled="cptDisabledSelector">
			<xOption
				v-for="item in configs.options"
				:key="item.value || item.label"
				:value="item.value"
				:label="item.label"
				:disabled="item.disabled || false">
			</xOption>
		</xSelect>
		<xIcon icon="icon_refresh" @click="getOptions" class="ml4 pointer" />
	</div>
</template>

<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return {
		mixins: [mixins],
		props: ["value", "configs"],
		mounted() {
			if (this.isInit) {
				this.getOptions();
			}

			this.$watch(
				() => {
					return this.cptEnterprise;
				},
				() => {
					this.getOptions();
				}
			);
		},
		computed: {
			cptDisabledSelector() {
				if (!this.configs.options.length) {
					return true;
				}
				if (this.xItem.cptDisabled) {
					return true;
				}
				return false;
			},
			cptEnterprise() {
				const val = this.$xItemAttr("enterprise");
				return _.$isInput(val) ? val : "";
			},
			isInit({ configs }) {
				return configs?.isInit ?? true;
			}
		},
		setup() {
			const vm = this;

			vm.getOptions = _.debounce(async function () {
				_.$loading(true);
				vm.mixin_value = "";
				try {
					const params = {
						start: 1,
						limit: -1
					};

					if (vm.cptEnterprise) {
						params.enterpriseProjectId = vm.cptEnterprise;
					}

					const res = await _api.ctyun.VpcController.restCtyunV10VpcList(params);
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

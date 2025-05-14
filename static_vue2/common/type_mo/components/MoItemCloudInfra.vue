<template>
	<div class="flex middle">
		<xSelect class="flex1" v-model="mixin_value" v-bind="$attrs" v-on="mixin_listeners">
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
		name: "MoItemRegionId",
		mixins: [mixins],
		props: ["value", "configs"],
		mounted() {
			this.getOptions();
		},
		data() {
			return {};
		},
		methods: {
			async getOptions() {
				_.$loading(true);
				try {
					const { projectId, regionId } = _MoCfContext.commonParams();
					const { project = {} } =
						await _MoCfContext._api.getProjectDetailByProjectId(projectId);
					const regionItem = _.find(project.regions, { region_id: regionId });

					const options = _.map(regionItem.cloud_infras, item => {
						return {
							...item,
							label: item.cloud_infra_name,
							value: item.cloud_infra_id,
							_item: item
						};
					});
					this.configs.i18nMany = () => {
						const cloud_infra_id = this.value;
						const item = _.find(options, item => item.value === cloud_infra_id);
						return [item.label, item.label];
					};
					this.configs.xItemRender = () => {
						const cloud_infra_id = this.value;
						const item = _.find(options, item => item.value === cloud_infra_id);
						return item.label;
					};
					this.configs.options = options;
					this.$emit("configschange", this.configs);
					this.mixin_value = _.$getFirstOrDefaultValue(this.configs.options, "");
				} catch (error) {
					console.error(error);
				} finally {
					_.$loading(false);
				}
			}
		}
	};
}
</script>

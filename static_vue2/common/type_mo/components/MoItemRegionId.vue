<template>
	<div class="flex middle">
		<xSelect
			class="flex1"
			v-model="mixin_value"
			v-bind="$attrs"
			v-on="mixin_listeners"
			:disabled="true || configs.options.length === 0">
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
					const options = _.$callFn(
						project,
						"regions.map"
					)(item => {
						let label;

						if (I18N_LANGUAGE === "zh-CN") {
							label = _.$val(item, "region_name.zh_cn");
						} else {
							label = _.$val(item, "region_name.en_us");
						}
						return {
							...item,
							label,
							value: item.region_id,
							_item: item
						};
					});
					this.configs.i18nMany = () => {
						const region_id = this.value;
						const item = _.find(options, item => item.region_id === region_id);
						return [
							_.$val(item, "region_name.zh_cn"),
							_.$val(item, "region_name.en_us")
						];
					};
					this.configs.options = options;
					this.$emit("configschange", this.configs);
					this.$emit("change", regionId);
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

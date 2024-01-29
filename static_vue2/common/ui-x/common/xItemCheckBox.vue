<template>
	<div>
		<template v-if="isGroup">
			<el-checkbox-group v-model="mixin_value" v-bind="$attrs" v-on="mixin_listeners">
				<el-checkbox v-for="option in selectOptions" :label="option.value" :key="option.label">
					{{ option.label }}
				</el-checkbox>
			</el-checkbox-group>
		</template>
		<template v-else>
			<el-checkbox v-for="option in selectOptions" :label="option.value" :key="option.label" v-model="mixin_value" v-bind="$attrs" v-on="mixin_listeners">
				{{ option.label }}
			</el-checkbox>
		</template>
	</div>
</template>

<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return {
		name: "xItemCheckBox",
		mixins: [mixins],
		props: ["value", "options", "configs"],
		computed: {
			selectOptions() {
				return this.options || this?.configs?.options || [];
			},
			isGroup() {
				return this.configs?.group || false;
			}
		}
	};
}
</script>

<style lang="less"></style>

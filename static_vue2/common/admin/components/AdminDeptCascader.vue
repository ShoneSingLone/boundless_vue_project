<template>
	<xCascader
		:options="options"
		:props="{ checkStrictly: true }"
		clearable
		filterable
		:show-all-levels="true"
		v-model="cptValue" />
</template>

<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return {
		mixins: [mixins],
		props: ["value", "configs"],
		mounted() {
			this.setOptions();
		},
		data() {
			return {
				options: [],
				NODES_OBJ: {},
				CHILDREN_MAP: {}
			};
		},
		computed: {
			cptValue: {
				get() {
					return this.valueToArray(this.mixin_value);
				},
				set(val) {
					this.mixin_value = _.last(val) || "";
				}
			}
		},
		methods: {
			valueToArray(id, newValue = []) {
				const item = this.NODES_OBJ[id];

				if (!item) {
					if (!_.isEmpty(newValue)) {
						return newValue;
					}
					return [];
				}
				newValue.unshift(id);
				if (_.$isDef(item.parentId)) {
					return this.valueToArray(item.parentId, newValue);
				}
				return newValue;
			},
			async setOptions() {
				try {
					_.$loading(true);
					const { data } = await _adminTools.api_dept_list(this.cptSearchParams);
					const { TREE, CHILDREN_MAP, NODES_OBJ } = _.$arrayToTree({
						data,
						id: "deptId",
						label: "deptName",
						value: "deptId"
					});
					this.CHILDREN_MAP = CHILDREN_MAP;
					this.NODES_OBJ = NODES_OBJ;
					this.options = TREE;
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading(false);
				}
			}
		}
	};
}
</script>

<style lang="less"></style>

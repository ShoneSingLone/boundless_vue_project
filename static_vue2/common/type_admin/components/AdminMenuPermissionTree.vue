<template>
	<div class="AdminTree flex vertical">
		<xInput
			v-model="search"
			clearable
			:placeholder="cptPlaceholder"
			@input="handleQueryChange" />
		<div class="flex1 AdminTree-tree mt">
			<xTree
				ref="refTree"
				show-checkbox
				:filterHandler="treeFilterMethod"
				:data="treeData"
				:props="propsForTree"
				:checkedKeys.sync="mixin_value"
				:expandedKeys.sync="expandedNodes"
				@current-change="handleDeptChange"
				:current-node-key="currentNodeKey" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");

	return defineComponent({
		mixins: [mixins],
		props: ["value", "configs"],
		mounted() {
			this.getSystemMenuTree();
		},
		data() {
			return {
				search: "",
				propsForTree: {
					value: "id",
					label: "label",
					children: "children"
				},
				treeData: [],
				expandedNodes: [],
				currentNodeKey: ""
			};
		},
		computed: {
			cptRoleId() {
				const val = this.$xItemAttr("roleId");
				return _.$isInput(val) ? val : "";
			},
			cptPlaceholder() {
				return i18n("input_menu_name");
			}
		},
		methods: {
			handleQueryChange(query) {
				if (_.$val(this, "$refs.refTree.filter")) {
					this.$refs.refTree.filter(query);
				}
			},
			treeFilterMethod(query, node) {
				return new RegExp(query, "i").test(node.label);
			},
			handleDeptChange(data, item) {
				this.$emit("change", data.id, item);
			},
			async getSystemMenuTree() {
				try {
					const { data } = await _adminTools.api_menu_tree();
					this.treeData = data;
				} catch (error) {}
			}
		}
	});
}
</script>

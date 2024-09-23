<style lang="less">
.AdminDepartmentTree {
	* {
		// outline: 1px solid red;
	}
	height: 100%;
	.AdminDepartmentTree-tree {
		position: relative;
	}
}
</style>
<template>
	<div class="AdminDepartmentTree flex vertical">
		<xInput
			v-model="search"
			clearable
			:placeholder="cptPlaceholder"
			@input="handleQueryChange" />
		<div class="flex1 AdminDepartmentTree-tree mt">
			<xTree
				ref="refTree"
				:filterHandler="treeFilterMethod"
				:data="dataDepartment"
				:props="propsDepartment"
				:expandedKeys.sync="expandedDepartment"
				@current-change="handleDeptChange"
				:current-node-key="currentNodeKey" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		props: ["roleId"],
		mounted() {
			this.getDepartmentTree();
		},
		setup() {},
		data() {
			return {
				search: "",
				/* 部门 */
				propsDepartment: {
					value: "id",
					label: "label",
					children: "children"
				},
				dataDepartment: [],
				expandedDepartment: [],
				currentNodeKey: ""
			};
		},
		computed: {
			cptPlaceholder() {
				return i18n("请输入部门名称");
			}
		},
		methods: {
			handleQueryChange(query) {
				if (this.$refs.refTree?.filter) {
					this.$refs.refTree.filter(query);
				}
			},
			treeFilterMethod(query, node) {
				return new RegExp(query, "i").test(node.label);
			},
			handleDeptChange(data, item) {
				this.$emit("change", data.id, item);
			},
			async getDepartmentTree() {
				try {
					const { data } = await _adminTools.api_user_dept_tree({ roleId: this.roleId });
					const expandedDepartment = [];
					_.$traverse(data, item => {
						if (!this.currentNodeKey) {
							this.currentNodeKey = item.id;
						}
						if (_.$isArrayFill(item.children)) {
							expandedDepartment.push(item.id);
						}
					});
					this.expandedDepartment = expandedDepartment;
					this.dataDepartment = data;
				} catch (error) {}
			}
		}
	});
}
</script>

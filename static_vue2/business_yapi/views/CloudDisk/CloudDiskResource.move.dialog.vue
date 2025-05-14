<style lang="less">
.CloudDiskResource-NewDir-dialog {
	--xItem-label-width: 80px;
}
</style>
<template>
	<xDialog class="CloudDiskResource-NewDir-dialog">
		<xCard style="height: 100%; width: 100%">
			<template #header> 选择目标文件夹: {{ currentNode.label }} </template>
			<xTree
				:data="APP.dirTree"
				:props="props"
				:expandedKeys.sync="expandedKeys"
				ref="refDirTree"
				@node-click="nodeClick" />
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("cancel") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ selected, refreshList }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP"],
		props: useDialogProps(),
		async mounted() {
			this.loadDirs();
		},
		data() {
			return {
				props: {
					value: "value",
					label: "label",
					children: "children"
				},
				currentNode: {},
				expandedKeys: ["0"]
			};
		},
		computed: {
			btnOk() {
				const vm = this;
				return {
					label: i18n("ok"),
					preset: "blue",
					async onClick() {
						_.$loading(true);
						try {
							await _api.yapi.resourceCloudDiskMoveDir({
								ids: selected,
								targetDirId: vm.currentNode.value
							});
							vm.closeModal();
							refreshList();
						} catch (error) {
							_.$msgError(error);
							console.error(error);
						} finally {
							_.$loading(false);
						}
					}
				};
			}
		},
		methods: {
			nodeClick(node) {
				this.currentNode = node;
			},
			async loadDirs() {
				await this.APP.loadDirs();
				_.$traverse(this.APP.dirTree, node => {
					if (_.$isSame(node.value, this.APP.fileId)) {
						this.currentNode = node;
						this.$refs.refDirTree.setCurrentKey(node.value);
					}
					if (node.children) {
						this.expandedKeys.push(node.value);
					}
				});
			}
		}
	});
}
</script>

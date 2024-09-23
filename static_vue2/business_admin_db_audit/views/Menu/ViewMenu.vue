<style lang="less">
.ViewMenu {
	.ViewMenu-menu-tree-card {
		width: 300px;
	}
}
</style>
<template>
	<div class="x-page-view page-is-chart ViewMenu" id="home">
		<xPageTitle>
			<NavbarBreadcrumb />
		</xPageTitle>
		<xPageContent style="padding-top: 0; padding-bottom: 0">
			<div class="height100 flex">
				<div
					class="ViewMenu-menu-tree-card pl pt pb el-card is-always-shadow"
					style="
						box-shadow: var(--normal-box-shadow);
						background-color: white;
						border-radius: 8px;
					">
					<ViewMenuTree ref="ViewMenuTree" />
				</div>
				<xGap l />
				<ViewMenuContent />
			</div>
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		provide() {
			return { injectViewMenu: this };
		},
		computed: {
			ViewMenuTree() {
				return this.refs.ViewMenuTree;
			}
		},
		components: {
			ViewMenuContent: () => _.$importVue("@/views/Menu/ViewMenuContent.vue"),
			ViewMenuTree: () => _.$importVue("@/views/Menu/ViewMenuTree.vue")
		},
		data() {
			return {
				currentNode: {},
				menuArrTree: []
			};
		},
		methods: {
			onRefresh() {
				this.ViewMenuTree.handlexdsMenuPage();
			}
		}
	});
}
</script>

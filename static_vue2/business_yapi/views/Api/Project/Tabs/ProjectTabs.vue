<template>
	<aside id="ViewProjectTabs" class="box-shadow">
		<div :class="{ 'project-tab': true, active: inject_project.cptTabName === item.label }" v-for="(item, index) in items" :key="index" @click="inject_project.cptTabName = item.label">
			<div class="tab-icon">
				<xIcon :icon="item.icon" />
			</div>
		</div>
	</aside>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["inject_project"],
		data() {
			return {
				items: [
					{
						icon: "_icon_project_wiki",
						label: "文档"
					},
					{
						icon: "_icon_interface_mgr",
						label: "接口"
					},
					{
						icon: "_icon_project_setting",
						label: "设置"
					}
				]
			};
		}
	});
}
</script>
<style lang="less">
#ViewProjectTabs {
	height: 100%;
	width: 48px;
	overflow: hidden;
	background-color: white;
	border: 1px solid var(--el-border-color-lighter);
	.project-tab {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: center;
		padding: var(--ui-half);
		&:hover {
			cursor: pointer;
			background-color: var(--el-fill-color-light);
		}

		.tab-icon {
			padding: var(--ui-half);
			border-radius: 4px;
			.xIcon {
				width: var(--ui-one);
				height: var(--ui-one);
			}
		}

		&.active {
			.tab-icon {
				border: 1px solid var(--ui-primary);
			}
		}
	}
}
</style>

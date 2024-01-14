<template>
	<div id="ViewProject">
		<ProjectTabs />
		<ProjectDoc />
		<ProjectInterface />
		<ProjectSetting />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		components: {
			ProjectTabs: () => _.$importVue("@/views/Api/Project/Tabs/ProjectTabs.vue"),
			ProjectDoc: () => _.$importVue("@/views/Api/Project/Tabs/ProjectDoc.vue"),
			ProjectInterface: () => _.$importVue("@/views/Api/Project/Tabs/ProjectInterface.vue"),
			ProjectSetting: () => _.$importVue("@/views/Api/Project/Tabs/ProjectSetting.vue")
		},
		provide() {
			return {
				inject_project: this
			};
		},
		data() {
			return {
				projectViewTab: "asdf"
			};
		},
		computed: {
			cptTabName: {
				get() {
					if (!this.$route.query?.projectTabName) {
						this.cptTabName = "接口";
					}
					return this.$route.query.projectTabName;
				},
				set(projectTabName) {
					if (projectTabName) {
						this.$router.push({
							path: this.$route.path,
							query: {
								...this.$route.query,
								projectTabName: projectTabName
							}
						});
					}
				}
			}
		}
	});
}
</script>
<style lang="less">
#ViewProject {
	height: 100%;
	display: flex;
	flex-flow: row nowrap;
}
</style>

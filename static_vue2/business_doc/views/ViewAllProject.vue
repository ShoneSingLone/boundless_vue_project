<template>
	<div class="page-view">
		<xPageContent>
			<div v-for="(projectName, index) in allProject" :key="index">
				<xTag class="mt16">
					<a :href="'/' + projectName">{{ projectName }}</a>
				</xTag>
			</div>
			<xDropdown split-button preset="blue">
				更多菜单
				<xDropdownMenu slot="dropdown">
					<xDropdownItem>黄金糕</xDropdownItem>
					<xDropdownItem>狮子头</xDropdownItem>
					<xDropdownItem>螺蛳粉</xDropdownItem>
					<xDropdownItem>双皮奶</xDropdownItem>
					<xDropdownItem>蚵仔煎</xDropdownItem>
				</xDropdownMenu>
			</xDropdown>
			<xMd :md="md" />
		</xPageContent>
	</div>
</template>

<script>
export default async function () {
	return defineComponent({
		async mounted() {
			const { data: allProject } = await Vue._api.allProject();
			this.allProject = allProject;
			const tutorial = await _.$loadText("@/doc/reuseElementUI.md");
			this.md = tutorial;
		},
		data() {
			return {
				allProject: [],
				md: ""
			};
		}
	});
}
</script>

<style lang="less"></style>

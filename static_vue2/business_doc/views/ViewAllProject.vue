<template>
	<div class="page-view">
		<xPageContent>
			<div v-for="(projectName, index) in allProject" :key="index">
				<xTag class="mt16">
					<a :href="'/' + projectName">{{ projectName }}</a>
				</xTag>
			</div>
		</xPageContent>
	</div>
</template>

<script>
export default async function () {
	return defineComponent({
		async mounted() {
			const { data: allProject } = await Vue._api.allProject();
			this.allProject = allProject;
		},
		data() {
			return {
				allProject: []
			};
		}
	});
}
</script>

<style lang="less"></style>

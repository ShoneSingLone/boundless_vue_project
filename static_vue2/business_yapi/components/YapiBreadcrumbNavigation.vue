<template>
	<xBreadcrumb :items="breadcrumbItems" />
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		computed: {
			breadcrumbItems() {
				const home = {
					label: "首页",
					href: _.$aHashLink("/api")
				};
				const group = {
					label: this.APP.cptCurrentGroup?.group_name,
					href: _.$aHashLink("/api/group", {})
				};

				const { projectname, name } = this.APP.cptProject || {};
				const project = {
					label: projectname || name,
					href: _.$aHashLink("/api/project", {
						groupId: this.APP.cptCurrentGroup?._id,
						projectId: this.APP.cptProject?._id
					})
				};

				const map = {
					"/api/group": [group],
					"/api/project": [group, project]
				};

				return map[this.$route.path] || [];
			}
		}
	});
}
</script>

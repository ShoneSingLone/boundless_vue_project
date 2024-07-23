<template>
	<div v-if="isShow" class="flex1">
		<YapiNoteComponent />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["inject_project"],
		components: {
			YapiNoteComponent: () => _.$importVue("@/views/Note/Note.vue")
		},
		data() {
			return {
				title: ""
			};
		},
		computed: {
			isShow() {
				return this.inject_project.cptTabName === "文档";
			}
		}
	});
}
</script>
<style lang="less"></style>

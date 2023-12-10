<script>
export default async function () {
	const GroupAside = await _.$importVue("@/views/api/GroupAside.vue");

	return defineComponent({
		inject: ["stateApp"],
		data() {
			return {
				title: "MUST_MODIFY"
			};
		},
		render() {
			return h("section", { id: "ViewGroup" }, [
				h("aside", { id: "ViewGroup_sider" }, [h(GroupAside)]),
				h(
					"section",
					{ class: "view-main-section" },
					[JSON.stringify(this.stateApp.cptCurrentGroup)] /* [this.vDomSwitchPanel, this.vDomTabProjectList, this.vDomTabMember, this.vDomTabGroupLog, this.vDomTabGroupWiki] */
				)
			]);
		}
	});
}
</script>
<style lang="less">
.MUST_MODIFY {
	color: gray;
}
</style>

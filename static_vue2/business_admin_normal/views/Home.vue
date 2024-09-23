<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageContent>
			<xForm>
				<xItem :configs="form.menuIds" />
				{{ form.menuIds.value }}
			</xForm>
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		name: "Index",
		components: {
			AdminIconSelector: () =>
				_.$importVue(
					"/common/type_admin/components/AdminIconSelector/AdminIconSelector.vue"
				)
		},
		data() {
			return {
				// 版本号
				version: "3.8.7",
				form: defItems({
					menuIds: {
						value: [],
						label: "菜单权限",
						rules: [_rules.required()],
						itemType: "AdminIconSelector"
					}
				})
			};
		},
		methods: {
			goTarget(href) {
				window.open(href, "_blank");
			}
		}
	});
}
</script>

<template>
	<div class="card-JiChuYongFa">
		<xMd :md="mdTitle" />
		<xMd :md="'### 推荐使用v-xtips'" />
		<xBtn v-xtips="manual">click 激活</xBtn>
		<xMd :md="'#### 普通dom\n\n'" />
		<elPopover placement="right" width="400" trigger="click">
			<DemoTable />
			<xBtn slot="reference">click 激活</xBtn>
		</elPopover>
	</div>
</template>
<script>
export default async function () {
	const DemoTable = await _.$importVue("@/views/other/popover/QianTaoXinXi.table.vue");
	return defineComponent({
		components: {
			DemoTable
		},
		computed: {
			table() {}
		},
		data() {
			return {
				mdTitle: `\`trigger\`属性用于设置何时触发 Popover，支持四种触发方式：\`hover\`，\`click\`，\`focus\` 和 \`manual\`。对于触发 Popover 的元素，有两种写法：使用 \`slot="reference"\` 的具名插槽，或使用自定义指令\`v-popover\`指向 Popover 的索引\`ref\``,
				manual: {
					title: "标题如果不填就不展示",
					content() {
						return h(DemoTable);
					},
					trigger: "click",
					placement: "top"
				}
			};
		}
	});
}
</script>
<style lang="less"></style>

<template>
	<div class="card-JiChuYongFa">
		<Md :md="mdTitle" />
		<Md :md="mdConfigs" />
		<xBtn :configs="configs" />
		<xBtn :configs="configs">slot优先级更高</xBtn>
		<xForm>
			<xItem v-model="btnSets.label" :configs="configsLabel" />
			<xItem v-model="btnSets.preset" :configs="configsPreset" />
			<xInput v-model="btnSets.preset" />
		</xForm>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		computed: {
			mdConfigs() {
				return "```json\n\n" + JSON.stringify(this.btnSets, null, 2) + "\n```";
			},
			configs() {
				return {
					...this.btnSets,
					async onClick() {
						_.$msgSuccess("点击成功");
						await _.$sleep(1000 * 3);
						_.$msgSuccess("等待结束");
					}
				};
			}
		},
		data() {
			return {
				mdTitle: "基础的按钮用法。\n\n使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。",
				btnSets: {
					label: "按钮",
					preset: "blue",
					icon: "",
					isHide: false,
					disabled: false
				},
				configsLabel: defItem({
					label: "按钮显示标签"
				}),
				configsPreset: defItem({
					label: "预设颜色",
					type: "select",
					itemType: "xItemSelect",
					options: [
						{ label: "blue", value: "blue" },
						{ label: "primary", value: "primary" },
						{ label: "success", value: "success" },
						{ label: "warning", value: "warning" },
						{ label: "danger", value: "danger" },
						{ label: "info", value: "info" },
						{ label: "text", value: "text" }
					]
				})
			};
		}
	});
}
</script>
<style lang="less"></style>

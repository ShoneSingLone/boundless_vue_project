<template>
	<div class="card-JiChuYongFa">
		<xMd :md="mdTitle" />
		<xMd :md="mdConfigs" />
		<xForm col="3">
			<xItem v-model="btnSets.label" :configs="configsLabel" />
			<xItem v-model="btnSets.preset" :configs="configsPreset" />
			<div>
				<xBtn :configs="configs" />
				<xBtn :configs="configs">template slot内容优先级更高</xBtn>
				<xBtn :configs="configsDisabled">展示disabled结果是字符的情况</xBtn>
			</div>
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
						_.$msgSuccess("点击时间如果是异步的，会有loading效果，同时禁止点击");
						await _.$sleep(1000 * 3);
						_.$msgSuccess("等待结束，恢复点击功能");
					}
				};
			},
			configsDisabled() {
				return {
					...this.configs,
					disabled() {
						/*return h("div", { style: "color: red" }, [h("div", [i18n("展示disabled是字符的情况")]), h("div", [i18n(`返回vNode也可以`)])]); */
						return "disabled 返回的是字符串或者vNode，会有提示信息（disabled可以是方法，会用于watch）";
					}
				};
			}
		},
		data() {
			return {
				mdTitle: "基础的按钮用法。\n\n使用`preset`、`plain`、`round`和`circle`属性来定义 Button 的样式。",
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
					// type: "select",
					itemType: "xItemRadioGroup",
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

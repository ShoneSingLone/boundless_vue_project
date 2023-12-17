<script>
export default async function () {
	return function render() {
		const vm = this;
		const xItem_controllerProps = {
			...vm.configs,
			readonly: vm.configs.readonly,
			disabled: vm.cptDisabled,
			attrs: {
				...vm.cpt_bindProps.attrs,
				disabled: vm.cptDisabled
			},
			props: {
				...vm.cpt_bindProps.props,
				disabled: vm.cptDisabled
			},
			configs: {
				...vm.configs,
				disabled: vm.cptDisabled,
				options: vm.cpt_options
			},
			value: vm.p_value,
			on: vm.p_listeners,
			onChange: val => {
				vm.p_value = val;
			}
		};
		return h(
			"div",
			{
				vIf: !vm.cpt_isHide,
				staticClass: "xItem-wrapper flex vertical",
				attrs: {
					"data-form-item-id": vm.cpt_id
				}
			},
			[
				h(
					"div",
					{
						staticClass: "flex middle center flex1"
					},
					[
						/* label */
						h(
							"label",
							{
								ref: "refItemLabel",
								vIf: vm.cpt_label,
								staticClass: "xItem_label flex end middle"
							},
							[
								h(
									"span",
									{
										vIf: vm.cpt_isRequired,
										staticClass: "xItem_label-required"
									},
									["*"]
								),
								h("span", { staticClass: "xItem_label-text" }, [vm.cpt_label]),
								h(
									"elTooltip",
									{
										vIf: vm.cptTips,
										// effect: "dark",
										content: vm.cptTips,
										placement: "top-end"
									},
									[
										h("xIcon", {
											icon: "tips",
											staticClass: "ml4"
										})
									]
								)
							]
						),
						/* contorller */
						h(
							"div",
							{
								class: {
									xItem_controller: true,
									"el-form-item is-error": !!vm.errorTips
								}
							},
							[h(vm.itemType, xItem_controllerProps)]
						),
						/* afterController插槽 */
						h("xRender", {
							vIf: vm.configs?.itemSlots?.afterController,
							render: vm.configs?.itemSlots?.afterController,
							payload: { xItem: vm }
						}),
						/* 校验错误提示 */
						h(
							"elTooltip",
							{
								vIf: vm.errorTips,
								effect: "dark",
								content: vm.errorTips,
								placement: "top-end"
							},
							[
								h("xIcon", {
									icon: "exclamationMark",
									staticClass: "xItem_error-msg ml4"
								})
							]
						)
					]
				),
				/* 信息提示 */
				h("div", { vIf: vm.cptMsg, staticClass: "xItem_info-msg", style: { overflow: "hidden", margin: `8px 0 16px ${vm.width + 16}px` } }, [vm.cptMsg])
			]
		);
	};
}
</script>

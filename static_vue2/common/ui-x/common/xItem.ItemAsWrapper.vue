<script lang="ts">
export default async function () {
	return function render() {
		const vm = this;
		return h(
			"div",
			{
				vIf: !vm.cpt_isHide,
				staticClass: "xItem-wrapper flex vertical",
				attrs: {
					"data-form-item-type": vm.itemType,
					"data-form-item-id": vm.cpt_id
				}
			},
			[
				h(
					"div",
					{
						staticClass: "xItem-wrapper_layout"
					},
					[
						/* label */
						h(
							"label",
							{
								ref: "refItemLabel",
								vIf: vm.cpt_label,
								staticClass: "xItem_label flex middle"
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
										vIf: vm.calTips(),
										// effect: "dark",
										content: vm.calTips(),
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
							vm.$slots.default
						),
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
				h("div", { vIf: vm.calMsg(), staticClass: "xItem_info-msg", style: { overflow: "hidden", margin: `8px 0 16px ${vm.width + 16}px` } }, [vm.calMsg()])
			]
		);
	};
}
</script>

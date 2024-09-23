<script lang="ts">
export default async function () {
	return function render() {
		const vm = this;
		/* 使用slots，不需要传递controller参数 */
		return h(
			"div",
			{
				vIf: !vm.cpt_isHide,
				staticClass: "xItem-wrapper flex vertical",
				attrs: {
					"data-form-item-type": vm.itemType,
					"data-form-item-id": vm.cpt_id,
					key: vm.itemType + vm.cpt_id
				},
				// props: {},
				style: vm.cptStyle
			},
			[
				h(
					"div",
					{
						staticClass: "xItem-label-controller"
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
								h("span", { staticClass: "xItem_label-text" }, [
									"X_ITEM_LABEL_IS_EMPTY" === vm.cpt_label ? "" : vm.cpt_label
								]),
								h(
									"xTooltip",
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
						/* controller */
						h(
							"div",
							{
								class: {
									xItem_controller: true,
									"el-form-item is-error": !!vm.errorTips
								}
							},
							/* 使用slots */
							vm.$slots.default
							/* 使用slots */
						),
						/* 因为使用slots 所以这里不渲染 */
						/* 校验错误提示 */
						h(
							"xTooltip",
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
				h("div", { vIf: vm.calMsg(), staticClass: "xItem-msg" }, [vm.calMsg()])
			]
		);
	};
}
</script>

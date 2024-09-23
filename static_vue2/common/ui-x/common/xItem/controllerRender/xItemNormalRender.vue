<script lang="ts">
export default async function () {
	return function render() {
		const vm = this;
		const CONFIGS = this.cptConfigs;

		const xItem_controllerProps = {
			...CONFIGS,
			readonly: CONFIGS.readonly,
			disabled: vm.cptDisabled,
			attrs: {
				...vm.cpt_bindProps.attrs,
				disabled: vm.cptDisabled,
				queryData: vm.cptDepdata
			},
			props: {
				...vm.cpt_bindProps.props,
				disabled: vm.cptDisabled,
				queryData: vm.cptDepdata
			},
			configs: {
				...CONFIGS,
				disabled: vm.cptDisabled,
				options: vm.cpt_options
			},
			value: vm.p_value,
			on: vm.p_listeners,
			/* 监听配置项变化 */
			onConfigschange: configs => {
				_.each(configs, (value, prop) => {
					vm.$set(vm.configs, prop, value);
				});
			},
			onChange: val => {
				vm.p_value = val;
			}
		};

		const xItemWrapperProps = {
			vIf: !vm.cpt_isHide,
			staticClass: "xItem-wrapper flex vertical",
			attrs: {
				"data-form-item-type": vm.itemType,
				"data-form-item-id": vm.cpt_id,
				disabled: vm.cptDisabled,
				key: vm.itemType + vm.cpt_id
			},
			style: vm.cptStyle
		};

		const controllerWrapperProps = {
			class: {
				xItem_controller: true,
				"el-form-item is-error": !!vm.errorTips
			}
		};

		if (_.isString(vm.cptDisabled)) {
			/* @ts-ignore */
			controllerWrapperProps.directives = [
				hTipsHover({ msg: vm.cptDisabled, placement: "top" })
			];
		}

		const controllerChildren = [h(vm.itemType, xItem_controllerProps)];

		if (CONFIGS?.itemSlots?.beforeController) {
			controllerChildren.unshift(
				/* beforeController插槽 */
				h("xRender", {
					render: CONFIGS?.itemSlots?.beforeController,
					payload: { xItem: vm }
				})
			);
		}
		if (CONFIGS?.itemSlots?.afterController) {
			controllerChildren.push(
				/* afterController插槽 */
				h("xRender", {
					render: CONFIGS?.itemSlots?.afterController,
					payload: { xItem: vm }
				})
			);
		}

		return h("div", xItemWrapperProps, [
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
							),
							h(
								"span",
								{
									staticClass: "xItem_label-colon",
									vIf: vm.cptIsShowItemColon
								},
								[":"]
							)
						]
					),
					/* controller */
					h("div", controllerWrapperProps, controllerChildren),

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
			h("div", { vIf: vm.calMsg(), staticClass: "xItem-msg mt4" }, [vm.calMsg()])
		]);
	};
}
</script>

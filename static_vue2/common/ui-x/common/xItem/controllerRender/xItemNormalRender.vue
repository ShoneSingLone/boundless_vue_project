<script lang="ts">
export default async function () {
	return function render() {
		const vm = this;
		const CONFIGS = this.cptConfigs;

		const xItem_controllerProps = {
			...CONFIGS,
			readonly: vm.cptReadonly,
			disabled: vm.cptDisabled,
			attrs: {
				...vm.cpt_bindProps.attrs,
				readonly: vm.cptReadonly,
				disabled: vm.cptDisabled,
				queryData: vm.cptDepdata
			},
			props: {
				...vm.cpt_bindProps.props,
				readonly: vm.cptReadonly,
				disabled: vm.cptDisabled,
				queryData: vm.cptDepdata
			},
			configs: {
				...CONFIGS,
				readonly: vm.cptReadonly,
				disabled: vm.cptDisabled,
				options: vm.cpt_options
			},
			value: vm.p_value,
			on: vm.p_listeners,
			/* 监听配置项变化,需要主动调用 */
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
			class: CONFIGS.class || {},
			attrs: {
				"data-form-item-selector": CONFIGS.selector || "",
				"data-form-item-type": vm.itemType,
				"data-form-item-id": vm.cpt_id,
				disabled: vm.cptDisabled,
				key: vm.itemType + vm.cpt_id
			},
			style: vm.cptStyle
		};

		const controllerWrapperProps = {
			class: {
				"xItem_controller overflow-hidden": true,
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

		if (_.$val(CONFIGS, "itemSlots.beforeController")) {
			controllerChildren.unshift(
				/* beforeController插槽 */
				h("xRender", {
					render: _.$val(CONFIGS, "itemSlots.beforeController"),
					payload: { xItem: vm }
				})
			);
		}
		if (_.$val(CONFIGS, "itemSlots.afterController")) {
			controllerChildren.push(
				/* afterController插槽 */
				h("xRender", {
					render: _.$val(CONFIGS, "itemSlots.afterController"),
					payload: { xItem: vm }
				})
			);
		}

		return hDiv(xItemWrapperProps, [
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
							hSpan({ staticClass: "xItem_label-text" }, [
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
					hDiv(controllerWrapperProps, controllerChildren),

					/* 校验错误提示 */
					(() => {
						if (vm.errorTips) {
							if (_.isString(vm.errorTips)) {
								/* 默认 tooltips 弹窗 */
								return hDiv(
									{ class: "xItemerror-tips_wrapper flex middle" },
									h(
										"xTooltip",
										{
											effect: "dark",
											content: vm.errorTips,
											placement: "right"
										},
										[
											h("xIcon", {
												icon: "exclamationMark",
												staticClass: "xItem_error-msg ml4"
											})
										]
									)
								);
							} else {
								return h("xRender", { render: vm.errorTips });
							}
						} else {
							return null;
						}
					})()
				]
			),
			/* 信息提示 */
			hDiv({ vIf: vm.calMsg(), staticClass: "xItem-msg mt4" }, [vm.calMsg()])
		]);
	};
}
</script>

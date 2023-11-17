<script>
export default async function () {
	const RULES = await _.$importVue("/common/utils/rules.vue");
	const { EVENT_ARRAY } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	/* configs {
  label:string
  disabled:boolean||function
  isHide:boolean||function
  itemType?:默认xItemInput，
  once:function 挂载的时候调用一次
  onEmitValue:function value每次变动后触发
  } */

	return {
		props: ["configs", "value"],
		provide() {
			const xItem = this;
			return {
				xItem: xItem
			};
		},
		model: {
			prop: "value",
			event: "change"
		},
		setup(props) {
			const vm = this;

			/**
			 * 配合modifyItemsAttrs的私有变量
			 */
			const privateState = reactive({
				isDisabled: ""
			});
			if (!vm.configs) {
				alert("xItem的configs为必填项");
				vm.configs = {
					label: "xItem的configs为必填项",
					value: "当前xItem缺失必要configs",
					rules: [RULES.required()]
				};
			}
			vm.configs = reactive(vm.configs);
			// this.configs = reactive(this.configs);
			Vue.GH_FORM_ITEM_MAP = Vue.GH_FORM_ITEM_MAP || {};

			/* options\disabled\readOnly\做统一处理，其他的使用透传 */

			/* options()计算后的数组，有find等数组的方法 */
			vm._calOptionsArray = [];
			let cpt_options = computed(() => {
				const optionsProperty = _.find(props.configs, (val, prop) => prop === "options");
				if (_.isFunction(optionsProperty) || props.configs?.options?._is_function) {
					props.configs.options._is_function = true;
					props.configs.options = new Proxy(props.configs.options, {
						get(obj, prop) {
							try {
								return vm._calOptionsArray[prop];
							} catch (error) {
								return obj[prop];
							}
						}
					});
					vm._calOptionsArray = props.configs.options({
						xItem: this
					});
					return vm._calOptionsArray;
				}
				return optionsProperty || vm._calOptionsArray;
			});

			let cpt_disabled = computed(() => {
				if (privateState.isDisabled === "disabled") {
					return true;
				}
				if (_.isFunction(vm.configs?.disabled)) {
					return vm.configs.disabled.call(vm.configs, { xItem: vm, val: vm.p_value });
				} else {
					return !!vm.configs?.disabled;
				}
			});

			onMounted(() => {
				Vue.GH_FORM_ITEM_MAP[this.cpt_id] = this;
				if (this.configs?.once) {
					this.configs.once.call(this.configs, { xItem: this });
				}
				if (this.configs.style) {
					this.$watch("configs.style", this.setStyle);
				}
				if (this.configs.attrs) {
					this.$watch("configs.attrs", this.setAttrs);
				}
				if (this.configs.multiple) {
					this.$watch("configs.multiple", this.setAttrs);
				}
				if (this.configs.value !== undefined) {
					this.$watch("configs.value", this.emitValueChange);
				}
				if (this.value !== undefined) {
					this.$watch("value", this.emitValueChange, { deep: true });
				}
				this.$watch("p_value", this.emitValueChange, { deep: true });

				this.setStyle();
				this.setProps();
				this.setAttrs();
				this.setListeners();
				this.emitValueChange(this.p_value);
			});

			onBeforeUnmount(() => {
				delete Vue.GH_FORM_ITEM_MAP[this.cpt_id];
			});

			return {
				privateState,
				cpt_disabled,
				cpt_options
			};
		},
		computed: {
			p_value: {
				get() {
					const isValueUndefined = this.value === undefined;
					const isModelValueUndefined = this.configs?.value === undefined;
					return (() => {
						if (!isValueUndefined) {
							return this.value;
						}
						if (!isModelValueUndefined) {
							return this.configs.value;
						}
						console.error("eigther v-model or configs has value property");
					})();
				},
				set(val) {
					this.emitValueChange(val);
					return;
				}
			},
			cpt_bindProps() {
				return {
					class: this.cpt_class,
					style: this.p_style,
					props: {
						...this.p_props,
						options: this.cpt_options
					},
					attrs: {
						...this.p_props,
						options: this.cpt_options
					}
				};
			},
			cpt_class() {
				return {
					"form-controller": true,
					[this.componentTag]: true,
					"show-error": this.errorTips
				};
			},
			cpt_id() {
				return `gh_form_id_${this._uid}`;
			},
			cpt_label() {
				return this.configs?.label;
			},
			cpt_msg() {
				if (_.isString(this.configs?.msg) && this.configs?.msg) {
					return this.configs?.msg;
				}
				if (this.configs?.msg) {
					return this.configs.msg.call(this.configs, { xItem: this });
				}
				return null;
			},
			cpt_isRequired() {
				try {
					return _.some(this.configs.rules, rule => rule.name === "required");
				} catch (error) {}
				return false;
			},
			cpt_rulesByTrigger() {
				return (
					_.reduce(
						this.configs?.rules,
						(rulesByTrigger, rule) => {
							_.each(rule.trigger, triggerName => {
								rulesByTrigger[triggerName] = rulesByTrigger[triggerName] || [];
								rulesByTrigger[triggerName].push(rule);
							});
							return rulesByTrigger;
						},
						{}
					) || {}
				);
			},
			cpt_isHide() {
				const vm = this;
				if (_.isBoolean(vm.configs?.isHide)) {
					return vm.configs.isHide;
				}
				if (_.isFunction(vm.configs?.isHide)) {
					return vm.configs.isHide();
				}
				return false;
			},
			itemType() {
				return this.configs.itemType || "xItemInput";
			},
			tips() {
				return this.configs.tips ?? "";
			}
		},
		data() {
			const vm = this;
			/* vm.emitValueChange = _.debounce(vm.emitValueChange, 32); */
			setTimeout(() => {
				/* 前3s（即初始化之后）不校验， */
				vm.p_debounceValidate = _.debounce(vm.validate, 1000);
			}, 1000 * 3);
			return {
				errorTips: "",
				p_style: {},
				p_props: {},
				p_attrs: {},
				p_listeners: {},
				curUid: 0
			};
		},
		methods: {
			triggerOnEmitValue(val) {
				try {
					if (this.configs?.onEmitValue) {
						this.configs.onEmitValue({
							val,
							...(this?.configs?.payload || {})
						});
					}
				} catch (error) {
					console.error(error);
				}
			},
			emitValueChange(val) {
				// set=>emit=>prop=>render
				const isRended = this.p_value === val;
				// prop=>render=>emit
				const isEmited = this.emitValueChange.val === val;
				if (isRended && isEmited) {
					return;
				} else {
					this.emitValueChange.val = val;
					if (this.configs?.value !== undefined) {
						this.configs.value = val;
					}
					this.$emit("change", val);
					this.triggerOnEmitValue(val);
					const rule = this.cpt_rulesByTrigger["change"];
					if (rule) {
						this.debounceValidate();
					}
				}
			},
			debounceValidate() {
				if (this.p_debounceValidate) {
					/* 表单初始化之后的数据3s内不检查 */
					this.p_debounceValidate();
				}
			},
			reset() {},
			async validate() {
				if (this.configs.rules && this.configs.rules.length > 0) {
					for await (const rule of this.configs.rules) {
						const msg = await rule.validator.call(this.configs, {
							val: this.p_value,
							xItem: this
						});
						if (msg) {
							this.errorTips = msg;
							break;
						} else {
							this.errorTips = "";
						}
					}
				}
				return this.errorTips;
			},
			setStyle() {
				this.p_style = (() => {
					return _.merge(
						{
							width: "100%"
						},
						this.configs.style
					);
				})();
			},
			setProps() {
				const vm = this;
				const _props = {
					...(vm.configs.props || {}),
					...(vm.p_attrs || {}),
					configs: vm.configs
				};
				this.p_props = _props;
			},
			setAttrs() {
				const vm = this;
				const clearable = vm.configs.clearable === undefined ? false : vm.configs.clearable;
				this.p_attrs = {
					...(vm.configs.attrs || {}),
					clearable,
					multiple: !!vm.configs?.multiple,
					placeholder: vm.configs.placeholder || ""
				};
				this.setProps();
			},
			setListeners() {
				/* TODO:透传机制，onEmitEvent,AOP */
				const vm = this;
				const handleListener = (listeners, eventName) => {
					listeners[eventName] = function (value, $event) {
						const on = vm.configs.on;
						const rule = vm.cpt_rulesByTrigger[eventName];
						if (rule) {
							vm.debounceValidate();
						}
						if (on?.[eventName]) {
							on[eventName]({
								val: value,
								$event,
								xItem: vm
							});
						} else {
							vm.$emit(eventName, value);
						}
					};
					return listeners;
				};

				this.p_listeners = EVENT_ARRAY.reduce(handleListener, {});
			}
		},
		render() {
			const vm = this;
			const xItem_controllerProps = {
				...vm.configs,
				readonly: vm.configs.readonly,
				disabled: vm.cpt_disabled,
				attrs: {
					...vm.cpt_bindProps.attrs,
					disabled: vm.cpt_disabled
				},
				props: {
					...vm.cpt_bindProps.props,
					disabled: vm.cpt_disabled
				},
				on: vm.p_listeners,
				configs: {
					...vm.configs,
					disabled: vm.cpt_disabled,
					options: vm.cpt_options
				},
				value: vm.p_value,
				onChange: val => {
					vm.p_value = val;
				}
			};

			return h(
				"div",
				{
					vIf: !vm.cpt_isHide,
					staticClass: "xItem-wrapper flex middle",
					attrs: {
						"data-form-item-id": vm.cpt_id
					}
				},
				[
					h(
						"label",
						{
							vIf: vm.cpt_label,
							staticClass: "xItem_label"
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
							h("span", { staticClass: "xItem_label-text" }, [vm.cpt_label])
						]
					),
					h(
						"div",
						{
							staticClass: "xItem_controller"
						},
						[
							h(vm.itemType, xItem_controllerProps),
							h(
								"span",
								{
									vIf: !!vm.cpt_msg,
									staticClass: "xItem_msg"
								},
								[vm.cpt_msg]
							),
							h(
								"span",
								{
									vIf: vm.errorTips,
									staticClass: "xItem_error-msg"
								},
								[vm.errorTips]
							)
						]
					),
					h("xRender", {
						vIf: vm.configs?.itemSlots?.afterController,
						render: vm.configs?.itemSlots?.afterController,
						payload: { xItem: vm }
					})
				]
			);
		}
	};
}
</script>

<style lang="less">
.xItem-wrapper + .xItem-wrapper {
	margin-top: 24px;
}

.horizontal {
	.xItem-wrapper + .xItem-wrapper {
		margin-top: 0;
	}
}

.xItem_label {
	width: var(--xItem-label-width);
	text-align: right;
	margin-right: 16px;
}

.xItem_label-required {
	color: var(--ui-danger);
}

.xItem_controller {
	flex: 1;
	display: flex;
	flex-flow: column nowrap;

	.show-error {
		[class$="__inner"],
		.el-textarea__inner,
		.el-input__inner,
		> input {
			border: 1px solid var(--ui-danger);
		}
	}
}

.xItem_controller > [class^="el-"] {
	width: 100%;
}

.xItem_error-msg {
	height: 20px;
	line-height: 20px;
	margin-top: 4px;
	color: var(--ui-danger);
}

.xItem_msg {
	// border-width: 1px;
	// border-style: solid;
	// border-color: var(--el-border-color-lighter);
	display: inline-block;
	padding: 9px 12px;
	// margin-top: var(--ui-half);
	background: #ffffff;
	border-radius: var(--ui-half);
	// box-shadow:
	// 	0 6px 16px 0 rgba(0, 0, 0, 0.08),
	// 	0 3px 6px -4px rgba(0, 0, 0, 0.12),
	// 	0 9px 28px 8px rgba(0, 0, 0, 0.05);
	pointer-events: all;
}
</style>

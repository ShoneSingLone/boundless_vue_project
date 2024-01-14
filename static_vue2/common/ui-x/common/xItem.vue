<script lang="ts">
export default async function () {
	const { useProps } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	const RULES = await _.$importVue("/common/utils/rules.vue");
	const { EVENT_ARRAY } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	const { useAutoResize } = _useXui;
	const NormalRender = await _.$importVue("/common/ui-x/common/xItem.NormalRender.vue");

	/* TODO:
	xForm disabled
	xTable disabled
	xTableRow disabled
	xTableCol disabled
	*/
	/* configs {
  label:string
  disabled:boolean||function
  isHide:boolean||function
  itemType?:默认xItemInput，
  once:function 挂载的时候调用一次
  onEmitValue:function value每次变动后触发
  } */

	return {
		props: ["configs", "value", "payload"],
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
			const { cptPlaceholder } = useProps(vm);

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
			Vue._X_ITEM_VM_S = Vue._X_ITEM_VM_S || {};

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

			let cptDisabled = computed(() => {
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
				Vue._X_ITEM_VM_S[this.cpt_id] = this;
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
				delete Vue._X_ITEM_VM_S[this.cpt_id];
			});
			const { height, width, sizer } = useAutoResize(props);

			return {
				height,
				width,
				refItemLabel: sizer,
				privateState,
				cptDisabled,
				cpt_options,
				cptPlaceholder
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
				return `x_form_id_${this._uid}`;
			},
			cpt_label() {
				return this.configs?.label;
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
			cptMsg() {
				if (_.isString(this.configs?.msg) && this.configs?.msg) {
					return h("div", [this.configs.msg]);
				}
				if (_.isFunction(this.configs?.msg)) {
					return this.configs.msg.call(this.configs, { xItem: this });
				}

				if (this.configs?.msg?.TYPE_IS_VNODE) {
					return this.configs.msg;
				}
				return null;
			},
			cptTips() {
				if (_.isString(this.configs.tips)) {
					return this.configs.tips;
				}
				return this.configs.tips || "";
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
						this.configs.onEmitValue.call(this.configs, {
							val,
							...(this?.configs?.payload || {}),
							xItem: this
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
					/* 设置了configs.value，未设置model ；二者只能取其一*/
					if (this.configs?.value !== undefined && this.value === undefined) {
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
			async validate(payload) {
				if (this.configs.rules && this.configs.rules.length > 0) {
					for await (const rule of this.configs.rules) {
						const msg = await rule.validator.call(this.configs, {
							val: this.p_value,
							xItem: this,
							payload
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
					placeholder: vm.cptPlaceholder
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
			return NormalRender.call(this);
		}
	};
}
</script>

<style lang="less">
.xItem-wrapper {
	width: var(--xItem-wrapper-width);
	&.w-100 {
		width: 100%;
	}
	overflow: hidden;
	.xItem_controller.el-form-item {
		margin-bottom: unset;
	}

	.xItem_info-msg {
		max-width: 90%;
		overflow: auto;
	}
}
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
	justify-content: var(--xItem-label-position);
}

.xItem_label-required {
	color: var(--ui-danger);
}

.xItem_controller {
	width: 1px;
	flex: 1;
	display: flex;
	flex-flow: column nowrap;
	overflow: hidden !important;
	&.center {
		align-self: center;
	}

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
	display: absolute;
	height: 20px;
	line-height: 20px;
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

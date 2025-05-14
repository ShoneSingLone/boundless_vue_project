<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	const { useProps } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	const RULES = await _.$importVue("/common/utils/rules.vue");
	const { EVENT_ARRAY } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	const { useAutoResize } = _xUtils;

	/* 懒加载对应的渲染器  */
	const _xItem_lazyLoadRender = {
		ItemAsWrapper: false,
		NormalRender: false,
		ReadonlyAsRender: false
	};

	/* TODO:
  xForm disabled
  xTable disabled
  xTableRow disabled
  xTableCol disabled
  */
	/* cptConfigs {
   	label:string
   	disabled:boolean||function
   	isHide:boolean||function
   	itemType?:默认xItemInput，
   	once:function 挂载的时候调用一次
   	onEmitValue:function value每次变动后触发
   } */

	return {
		name: "xItem",
		componentName: "xItem",
		props: [
			"readonly",
			"configs",
			"value",
			"payload",
			"readOnlyAs",
			/* 直接加在xItem上 */
			"label",
			"rules",
			"disabled"
		],

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

			const { onSetup } = vm.configs || {};
			if (onSetup) {
				onSetup.call(vm, props);
			}

			/*** xItem对外暴露自身实例*/
			vm.$emit("setup", { xItem: vm });
			const { cptPlaceholder } = useProps(vm);

			function forceUpdate() {
				vm.$forceUpdate();
			}
			_.$single.win.on("X_ITEM_RENDER_UPDATE", forceUpdate);

			onBeforeUnmount(() => {
				_.$single.win.off("X_ITEM_RENDER_UPDATE", forceUpdate);
			});

			/**
			 * 配合modifyItemsAttrs的私有变量
			 */
			const privateState = reactive({
				isDisabled: ""
			});

			const cptConfigs = computed({
				get() {
					if (vm.configs) {
						return vm.configs;
					} else if (vm.CONFIGS_ONLY_AS_WRAPPER) {
						return vm.CONFIGS_ONLY_AS_WRAPPER;
					} else if (this.$slots.default) {
						vm.CONFIGS_ONLY_AS_WRAPPER = new Proxy(
							{
								THIS_CONFIGS_ONLY_FOR_LABEL: true,
								label: this.label
							},
							{
								get(obj, prop) {
									return obj[prop];
								},
								set(obj, prop, value) {
									obj[prop] = value;
									return true;
								}
							}
						);

						if (this.rules) {
							vm.CONFIGS_ONLY_AS_WRAPPER.rules = this.rules;
						}
						return vm.CONFIGS_ONLY_AS_WRAPPER;
					} else {
						console.error("xItem configs either not set or not a function.", vm);
						return {};
					}
				},
				set(val) {
					vm.CONFIGS_ONLY_AS_WRAPPER = val;
				}
			});

			// cptConfigs.value = reactive(cptConfigs.value);
			Vue._X_ITEM_VM_S = Vue._X_ITEM_VM_S || {};

			/* options\disabled\readOnly\做统一处理，其他的使用透传 */

			/* options()计算后的数组，有find等数组的方法 */
			vm._calOptionsArray = [];
			let cpt_options = computed(() => {
				const optionsProperty = _.find(cptConfigs.value, (val, prop) => prop === "options");
				if (
					_.isFunction(optionsProperty) ||
					_.$val(cptConfigs, "value.options._is_function")
				) {
					cptConfigs.value.options._is_function = true;
					cptConfigs.value.options = new Proxy(cptConfigs.value.options, {
						get(obj, prop) {
							try {
								return vm._calOptionsArray[prop];
							} catch (error) {
								return obj[prop];
							}
						}
					});
					vm._calOptionsArray = cptConfigs.value.options({
						xItem: this
					});
					return vm._calOptionsArray;
				}
				return optionsProperty || vm._calOptionsArray;
			});

			/*场景： 获取xItem 的 options 函数中，需要使用其他value，而且这个value是动态变化的 */
			/* TODO: rename queryData => depdata */
			let cptDepdata = computed(() => {
				if (_.isFunction(_.$val(cptConfigs, "value.queryData"))) {
					cptConfigs.value.queryData = _.$callFn(cptConfigs, "value.queryData")();
					return cptConfigs.value.queryData;
				}
			});

			let cptDisabled = computed(() => {
				if (privateState.isDisabled === "disabled") {
					return true;
				}
				if (this.disabled) {
					return true;
				}
				if (_.isFunction(_.$val(vm, "cptConfigs.disabled"))) {
					return vm.cptConfigs.disabled.call(vm.cptConfigs, {
						xItem: vm,
						val: vm.p_value
					});
				} else {
					return !!_.$val(vm, "cptConfigs.disabled");
				}
			});
			let cptReadonly = computed(() => {
				if (vm.readonly || _.$val(vm, "cptConfigs.attrs.readonly")) {
					return true;
				}
				if (_.isFunction(_.$val(vm, "cptConfigs.readonly"))) {
					return vm.cptConfigs.readonly.call(vm.cptConfigs, {
						xItem: vm,
						val: vm.p_value
					});
				} else {
					return !!_.$val(vm, "cptConfigs.readonly");
				}
			});

			(() => {
				let timer;
				onMounted(() => {
					/* FIXED: xItem xItem_controller overflow-hidden 高度产生滑动条 */
					if (cptConfigs.value.KEEP_SCROLL_TOP_0) {
						timer = setInterval(() => {
							try {
								const xItem_controller = $(this.$el).find(".xItem_controller");
								if (xItem_controller[0]) {
									const scrollTop = xItem_controller[0].scrollTop;
									if (scrollTop !== 0) {
										xItem_controller[0].scrollTop = 0;
									}
								}
							} catch (e) {}
						}, 50);
					}
				});
				onBeforeUnmount(() => {
					timer && clearInterval(timer);
				});
			})();

			onMounted(() => {
				/* TODO:优化逻辑 */
				Vue._X_ITEM_VM_S[this.cpt_id] = this;
				if (_.$val(cptConfigs, "value.once")) {
					cptConfigs.value.once.call(cptConfigs.value, { xItem: this });
				}
				if (cptConfigs.value.style) {
					this.$watch("cptConfigs.style", this.updateStyle);
				}
				if (cptConfigs.value.attrs) {
					this.$watch("cptConfigs.attrs", this.setAttrs);
				}
				if (cptConfigs.value.multiple) {
					this.$watch("cptConfigs.multiple", this.setAttrs);
				}
				if (cptConfigs.value.placeholder) {
					this.$watch("cptConfigs.placeholder", this.setAttrs);
				}
				if (cptConfigs.value.value !== undefined) {
					this.$watch("cptConfigs.value", this.emitValueChange);
				}
				if (this.value !== undefined) {
					this.$watch("value", this.emitValueChange, { deep: true });
				}
				this.$watch("p_value", this.emitValueChange, { deep: true });

				this.updateStyle();
				this.setProps();
				this.setAttrs();
				this.setListeners();
				this.emitValueChange(this.p_value);
			});

			onBeforeUnmount(() => {
				delete Vue._X_ITEM_VM_S[this.cpt_id];
			});
			const { height, width: labelWidth, sizer } = useAutoResize(props);

			return {
				height,
				labelWidth,
				refItemLabel: sizer,
				privateState,
				cptDisabled,
				cptReadonly,
				cpt_options,
				cptDepdata,
				cptPlaceholder,
				cptConfigs
			};
		},
		onUpdate() {
			console.log("xItem onUpdate");
		},
		computed: {
			cptIsShowItemColon() {
				if (_.$isInput(this.cptConfigs.isShowItemColon)) {
					return this.cptConfigs.isShowItemColon;
				} else {
					return PRIVATE_GLOBAL.x_item_is_show_item_colon;
				}
			},
			cptStyle() {
				const vm = this;
				return {
					"--xItem-msg-padding-left": `${vm.labelWidth + 16}px`
				};
			},
			p_value: {
				get() {
					const isValueUndefined = this.value === undefined;
					const isModelValueUndefined = _.$val(this, "cptConfigs.value") === undefined;
					return (() => {
						if (!isValueUndefined) {
							return this.value;
						}
						if (!isModelValueUndefined) {
							return this.cptConfigs.value;
						}

						if (this.cptConfigs.THIS_CONFIGS_ONLY_FOR_LABEL) {
							return "";
						}
						console.error(
							"xItem configs either v-model or cptConfigs has value property.",
							this
						);
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
						options: this.cpt_options,
						queryData: this.cptDepdata
					},
					attrs: {
						...this.p_props,
						options: this.cpt_options,
						queryData: this.cptDepdata
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
				if (_.isString(_.$val(this, "cptConfigs.label"))) {
					return this.cptConfigs.label;
				}
				if (_.isFunction(_.$val(this, "cptConfigs.label"))) {
					return this.cptConfigs.label();
				}
				return false;
			},
			cpt_isRequired() {
				try {
					return _.some(this.cptConfigs.rules, rule => rule.name === "required");
				} catch (error) {}
				return false;
			},
			cpt_rulesByTrigger() {
				return (
					_.reduce(
						_.$val(this, "cptConfigs.rules"),

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
				if (_.isBoolean(_.$val(vm, "cptConfigs.isHide"))) {
					return vm.cptConfigs.isHide;
				}
				if (_.isFunction(_.$val(vm, "cptConfigs.isHide"))) {
					return vm.cptConfigs.isHide();
				}
				return false;
			},
			itemType() {
				return this.cptConfigs.itemType || "xItemInput";
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
				componentName: "xItem",
				errorTips: "",
				p_style: {},
				p_props: {},
				p_attrs: {},
				p_listeners: {},
				curUid: 0
			};
		},
		methods: {
			calTips() {
				if (_.isString(this.cptConfigs.tips)) {
					return this.cptConfigs.tips;
				}
				if (_.isFunction(_.$val(this, "cptConfigs.tips"))) {
					return this.cptConfigs.tips.call(this.cptConfigs, { xItem: this });
				}
				return this.cptConfigs.tips || "";
			},
			calMsg() {
				/* msg之前一直是计算属性，但是msg可用作为render函数，里面的组件可能是懒加载，懒加载完成后触发update，由于计算属性的缓存机制无法更新，所以改用方法tips */
				if (_.isString(_.$val(this, "cptConfigs.msg")) && _.$val(this, "cptConfigs.msg")) {
					return hDiv({ staticClass: "xItem-msg-content" }, [this.cptConfigs.msg]);
				}
				if (_.isFunction(_.$val(this, "cptConfigs.msg"))) {
					return this.cptConfigs.msg.call(this.cptConfigs, { xItem: this });
				}

				if (_.$val(this, "cptConfigs.msg.TYPE_IS_VNODE")) {
					return this.cptConfigs.msg;
				}
				return null;
			},
			async asyncLoadRender(renderName) {
				if (_xItem_lazyLoadRender[renderName]) {
					return;
				}
				if (_.isString(_xItem_lazyLoadRender[renderName])) {
					return;
				}
				_xItem_lazyLoadRender[renderName] = "";
				const item = {
					ItemAsWrapper: () =>
						_.$importVue(
							"/common/ui-x/common/xItem/controllerRender/xItemItemAsWrapper.vue"
						),
					NormalRender: () =>
						_.$importVue(
							"/common/ui-x/common/xItem/controllerRender/xItemNormalRender.vue"
						),
					ReadonlyAsRender: () =>
						_.$importVue(
							"/common/ui-x/common/xItem/controllerRender/xItemReadonlyAsRender.vue"
						)
				};
				const getter = item[renderName];
				const render = await getter();
				console.log(
					renderName,
					`this.$root.broadcast("xItem", "xItemRenderUpdate", render);`
				);
				_xItem_lazyLoadRender[renderName] = render;
				_.$single.win.trigger("X_ITEM_RENDER_UPDATE");
			},
			triggerOnEmitValue(val) {
				try {
					if (_.$val(this, "cptConfigs.onEmitValue")) {
						this.cptConfigs.onEmitValue.call(this.cptConfigs, {
							val,
							...(_.$val(this, "cptConfigs.payload") || {}),
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
					if (
						_.$val(this, "cptConfigs.value") !== undefined &&
						this.value === undefined
					) {
						this.cptConfigs.value = val;
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
				if (this.cptConfigs.rules && this.cptConfigs.rules.length > 0) {
					for await (const rule of this.cptConfigs.rules) {
						const msg = await rule.validator.call(this.cptConfigs, {
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
			updateStyle() {
				this.p_style = (() => {
					return _.merge(
						{
							width: "100%"
						},
						this.cptConfigs.style
					);
				})();
			},
			setProps() {
				const vm = this;
				const _props = {
					...(vm.cptConfigs.props || {}),
					...(vm.p_attrs || {}),
					cptConfigs: vm.cptConfigs
				};
				this.p_props = _props;
			},
			setAttrs() {
				const vm = this;
				const clearable =
					vm.cptConfigs.clearable === undefined ? false : vm.cptConfigs.clearable;

				this.p_attrs = {
					...(vm.cptConfigs.attrs || {}),
					clearable,
					multiple: !!_.$val(vm, "cptConfigs.multiple"),
					placeholder: vm.cptPlaceholder
				};
				this.setProps();
			},
			setListeners() {
				/* TODO:透传机制，onEmitEvent,AOP */
				const vm = this;
				const handleListener = (listeners, eventName) => {
					listeners[eventName] = function (value, $event) {
						const on = vm.cptConfigs.on;
						const rule = vm.cpt_rulesByTrigger[eventName];
						if (rule) {
							vm.debounceValidate();
						}
						if (_.$val(on, `${eventName}`)) {
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
			if (!this.cptConfigs) debugger;

			/* TODO:只读模式 */
			if (this.readOnlyAs) {
				if (_xItem_lazyLoadRender.ReadonlyAsRender) {
					return _xItem_lazyLoadRender.ReadonlyAsRender.call(this);
				} else {
					this.asyncLoadRender("ReadonlyAsRender");
				}
			}

			/* 与表单一致，只为了统一样式 */
			if (_.$val(this, "cptConfigs.THIS_CONFIGS_ONLY_FOR_LABEL")) {
				if (_xItem_lazyLoadRender.ItemAsWrapper) {
					return _xItem_lazyLoadRender.ItemAsWrapper.call(this);
				} else {
					this.asyncLoadRender("ItemAsWrapper");
				}
			}

			/* 正常 */
			if (_xItem_lazyLoadRender.NormalRender) {
				return _xItem_lazyLoadRender.NormalRender.call(this);
			} else {
				this.asyncLoadRender("NormalRender");
			}

			/* 骨架 */
			return hDiv({ staticClass: "el-skeleton is-animated " }, [
				hDiv({
					staticClass: "el-skeleton__item el-skeleton__p el-skeleton__paragraph"
				})
			]);
		}
	};
}
</script>
<style lang="less">
.xItem-wrapper {
	overflow: hidden;
	width: var(--xItem-wrapper-width, 320px);
	min-width: 1px;

	.xItem-label-controller {
		position: relative;
		display: flex;
		flex-flow: var(--xItem-flex-flow, row nowrap);
		justify-content: var(--xItem-layout-justify-content, center);
		align-items: var(--xItem-layout-align-items, center);
		flex: 1;
		width: var(--xItem-controller-width, unset);

		.xItem_label {
			width: var(--xItem-label-width, 120px);
			display: flex;
			flex-flow: row nowrap;
			justify-content: var(--xItem-label-position, flex-end);
			align-items: flex-end;
			margin: var(--xItem-label-margin, 0 16px 0 0);
		}

		.xItem_controller {
			width: var(--xItem-controller-width, unset);
			height: var(--xItem-controller-height, unset);
			flex: var(--xItem-controller-flex, 1);
			display: flex;
			flex-flow: row nowrap;
			align-items: center;

			> [disabled="disabled"] {
				// opacity: 0.5;
				&:hover {
					cursor: not-allowed;
				}
			}
			.after-flex1 + * {
				flex: 1;
			}

			> [class^="el-"] {
				width: 100%;
			}

			> .xCascader,
			.el-descriptions {
				width: 100%;
			}

			&.el-form-item {
				margin-bottom: unset;
			}

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
	}

	.xItem-msg {
		max-width: 100%;
		overflow: var(--xItem-info-msg-overflow, hidden);
		color: var(--el-text-color-secondary);
		padding-left: var(--xItem-msg-padding-left);
		.xItem-msg-content {
			margin-top: 10px;
		}
	}
}

/* 加在父元素上也可以 */
.xItem-pos {
	&.top {
		--xItem-label-position: flex-start;
		--xItem-label-margin: var(--ui-one) 0;
		--xItem-controller-width: 100%;
		--xItem-flex-flow: column nowrap;
		--xItem-layout-align-items: flex-start;

		&.right {
			// --xItem-layout-align-items: flex-end;
			.xItem_label {
				align-self: end;
				justify-content: flex-end;
			}
		}

		&.center {
			--xItem-label-margin: var(--ui-one);
			--xItem-label-position: center;
			--xItem-controller-width: 100%;
			--xItem-layout-align-items: flex-start;
			--xItem-flex-flow: column nowrap;
			--xItem-label-wrappr-align-self: center;

			.xItem_label {
				align-self: center;
			}
		}
		.xItem-msg {
			padding-left: 0;
		}
	}

	&.left {
		--xItem-controller-width: 100%;
		--xItem-label-position: flex-start;
		--Xitem-label-text-align: left;
	}
}

.xItem-wrapper + .xItem-wrapper {
	// margin-top: 24px;
}

.horizontal {
	.xItem-wrapper + .xItem-wrapper {
		margin-top: 0;
	}
}

.xItem_label-required {
	color: var(--ui-danger);
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

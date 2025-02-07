<script lang="ts">
export default async function () {
	if (!Vue._itemMixins) {
		const EVENT_ARRAY = ["change", "blur", "input", "focus", "keyup", "keydown"];
		var HIDDEN_STYLE =
			"\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n";
		var CONTEXT_STYLE = [
			"letter-spacing",
			"line-height",
			"padding-top",
			"padding-bottom",
			"font-family",
			"font-weight",
			"font-size",
			"text-rendering",
			"text-transform",
			"width",
			"text-indent",
			"padding-left",
			"padding-right",
			"border-width",
			"box-sizing"
		];
		let hiddenTextarea;

		function calculateNodeStyling(targetElement) {
			var style = window.getComputedStyle(targetElement);
			var boxSizing = style.getPropertyValue("box-sizing");
			var paddingSize =
				parseFloat(style.getPropertyValue("padding-bottom")) +
				parseFloat(style.getPropertyValue("padding-top"));
			var borderSize =
				parseFloat(style.getPropertyValue("border-bottom-width")) +
				parseFloat(style.getPropertyValue("border-top-width"));
			var contextStyle = CONTEXT_STYLE.map(function (name) {
				return name + ":" + style.getPropertyValue(name);
			}).join(";");
			return { contextStyle, paddingSize, borderSize, boxSizing };
		}

		function calcTextareaHeight(targetElement) {
			var minRows = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
			var maxRows = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
			if (!hiddenTextarea) {
				hiddenTextarea = document.createElement("textarea");
				document.body.appendChild(hiddenTextarea);
			}
			var _calculateNodeStyling = calculateNodeStyling(targetElement),
				paddingSize = _calculateNodeStyling.paddingSize,
				borderSize = _calculateNodeStyling.borderSize,
				boxSizing = _calculateNodeStyling.boxSizing,
				contextStyle = _calculateNodeStyling.contextStyle;
			hiddenTextarea.setAttribute("style", contextStyle + ";" + HIDDEN_STYLE);
			hiddenTextarea.value = targetElement.value || targetElement.placeholder || "";
			var height = hiddenTextarea.scrollHeight;
			var result = {};
			if (boxSizing === "border-box") {
				height = height + borderSize;
			} else if (boxSizing === "content-box") {
				height = height - paddingSize;
			}
			hiddenTextarea.value = "";
			var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
			if (minRows !== null) {
				var minHeight = singleRowHeight * minRows;
				if (boxSizing === "border-box") {
					minHeight = minHeight + paddingSize + borderSize;
				}
				height = Math.max(minHeight, height);
				result.minHeight = minHeight + "px";
			}
			if (maxRows !== null) {
				var maxHeight = singleRowHeight * maxRows;
				if (boxSizing === "border-box") {
					maxHeight = maxHeight + paddingSize + borderSize;
				}
				height = Math.min(maxHeight, height);
			}
			result.height = height + "px";
			hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea);
			hiddenTextarea = null;
			return result;
		}

		Vue._itemMixins = {
			calcTextareaHeight,
			EVENT_ARRAY,
			useProps(vm) {
				const cptPlaceholder = computed(() => {
					if (_.isFunction(vm.configs?.placeholder)) {
						return vm.configs.placeholder.call(vm.configs, { vm });
					}
					if (_.isString(vm.configs?.placeholder)) {
						return vm.configs?.placeholder;
					}
				});

				const cptIsHide = computed(() => {
					if (_.isFunction(vm.configs?.isHide)) {
						return vm.configs.isHide.call(vm.configs, { vm });
					} else {
						return !!vm.configs?.isHide;
					}
				});

				const cptIsLoading = computed(() => {
					if (_.isFunction(vm.configs?.isLoading)) {
						return vm.configs.isLoading.call(vm.configs, { vm });
					} else {
						return !!vm.configs?.isLoading;
					}
				});

				const cptDisabled = computed(() => {
					if (_.isFunction(vm.configs?.disabled)) {
						return vm.configs.disabled.call(vm.configs, { vm });
					} else {
						return !!vm.configs?.disabled;
					}
				});

				const cptLabel = computed(() => {
					if (_.isFunction(vm.configs?.label)) {
						return vm.configs.label.call(vm.configs, { xBtn: vm });
					}
					if (_.isString(vm.configs?.label)) {
						return vm.configs.label;
					}
					return "";
				});

				const cptChildren = computed(() => {
					if (_.isFunction(vm.$vSlots?.default)) {
						return hSpan(vm.$vSlots.default());
					}
					if (vm.$vSlots?.TYPE_IS_VNODE) {
						return vm.$vSlots;
					}
					return cptLabel.value;
				});

				return {
					cptIsHide,
					cptIsLoading,
					cptPlaceholder,
					cptDisabled,
					cptLabel,
					cptChildren
				};
			},

			useCellArgs({ vm, itemType, cellConfigs }) {
				const innerComponentConfigs = reactive({
					...cellConfigs,
					itemType,
					payload: {
						xCell: vm,
						configs: vm.configs,
						row: vm.configs.row,
						col: vm.configs.col,
						index: vm.configs.index,
						prop: vm.configs.prop
					}
				});

				const privateModel = computed(() => {
					return vm.row[vm.configs.prop] || "";
				});

				return {
					innerComponentConfigs,
					privateModel
				};
			},
			mixins: {
				/* xItem,value,configs,mixin_attrs,mixin_value,mixin_listeners */
				inject: {
					xItem: {
						default: {}
					}
				},
				model: {
					prop: "value",
					event: "change"
				},
				props: ["value", "configs"],
				computed: {
					mixin_attrs() {
						return {
							...this.configs,
							...this.$attrs
						};
					},
					mixin_value: {
						get() {
							return this.value;
						},
						set(val) {
							if (_.isEqual(this.value, val)) {
								return;
							}
							return this.$emit("change", val);
						}
					},
					mixin_listeners() {
						const vm = this;
						return EVENT_ARRAY.reduce((listeners, eventName) => {
							listeners[eventName] = function ($event, ...args) {
								if (eventName === "change") {
									return;
								}
								vm.$emit(eventName, vm.value, $event);
							};
							return listeners;
						}, {});
					}
				}
			}
		};
	}

	return Vue._itemMixins;
}
</script>

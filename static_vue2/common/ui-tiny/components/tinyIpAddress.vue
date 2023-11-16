<template>
	<div class="tiny-ip-address">
		<ul :class="cptClassName" :style="state.heightStyle">
			<li v-for="(item, index) of state.address" :key="index" :style="state.lineHeightStyle">
				<input
					:style="state.allHeightStyle"
					ref="inputs"
					:readonly="readonly"
					:disabled="state.disabled"
					v-model="item.value"
					type="text"
					@select="select({ value: item, index, event: $event })"
					@focus="focus({ index, event: $event })"
					@input="inputEvent({ item, index })"
					@change="change"
					@blur="blur({ item, index })"
					@keyup="keyup({ item, index, event: $event })"
					@keydown="keydown({ item, index, event: $event })"
					tabindex="1" />
				<xRender :render="delimiterRender" :payload="{ index, item }" v-if="index < cpt_address.length - 1" />
			</li>
		</ul>
	</div>
</template>
<script>
export default async function () {
	const { renderless, tools, resolveMode } = await _.$importVue("/common/ui-tiny/components/tinyIpAddress.helper.vue");

	return defineComponent({
		props: {
			value: {
				type: String
			},
			type: {
				type: String,
				default: "IPv4",
				validator: value => ["IPv4", "IPv6"].includes(value)
			},
			readonly: Boolean,
			disabled: Boolean,
			delimiter: {
				default() {
					return "icon_ip_v4";
				}
			}
		},
		model: {
			prop: "value",
			event: "change"
		},
		setup(props, context) {
			const $prefix = "tiny";
			const utils = {
				$prefix,
				...tools(context, resolveMode(props, context)),
				mergeClass
			};

			const sdk = renderless(props, hooks, utils, extendOptions);

			const attrs = {
				t,
				vm: utils.vm,
				f: bindFilter,
				a: filterAttrs,
				d: utils.defineInstanceProperties,
				dp: utils.defineParentInstanceProperties,
				gcls: key => getElementCssClass(classes, key),
				m: mergeClass
			};

			/**
			 * 修复 render 函数下 this.slots 不会动态更新的问题（vue3 环境没有问题）
			 * 解决方法：在 instance 下注入 slots、scopedSlots
			 * 注意：renderless 下尽量使用 vm.$refs、vm.$slots
			 */
			attrs.d({
				slots: { get: () => utils.vm.$slots },
				scopedSlots: { get: () => utils.vm.$scopedSlots }
			});

			attrs.dp({
				slots: { get: () => utils.parent.$slots },
				scopedSlots: { get: () => utils.parent.$scopedSlots }
			});

			initComponent();

			_each(api, name => {
				const value = sdk[name];

				if (typeof value !== "undefined") {
					attrs[name] = value;
					// 只有单层组件，才需要给setup传递： mono:true
					// 双层组件，需要把内层的api复制到外层，这样用户应用的ref才能拿到组件的api
					if (!mono) {
						utils.setParentAttribute({ name, value });
					}
				}
			});

			return attrs;
		},
		computed: {
			cptClassName() {
				return {
					active: this.state.active,
					disabled: this.state.disabled,
					"tiny-ip-address__input": true
				};
			},
			delimiterRender() {
				return function (...args) {
					return [h("span", { staticClass: "mr4" }, [":"])];
				};
			},
			cpt_address: {
				get() {
					if (this.type === "IPv4") {
						const [a, b, c, d] = String(this.value).split(".") || [];
						return [newItem(a), newItem(b), newItem(c), newItem(d)];
					} else {
						const [, a, b, c, d, e] = String(this.value).match(/(.*)::(.*):(.*):(.*):(.*)/) || [];
						return [newItem(a), newItem(b), newItem(c), newItem(d), newItem(e)];
					}
				}
			}
		},
		methods: {
			handleValueChange({ item, index }) {
				const newValue = (() => {
					let ipAddress;
					if (this.type === "IPv4") {
						ipAddress = String(this.value).split(".") || [];
						ipAddress[index] = item.value;
						return ipAddress.join(".");
					} else {
						ipAddress = String(this.value).match(/(.*)::(.*):(.*):(.*):(.*)/) || [];
						ipAddress[index] = item.value;
						const [a, b, c, d, e] = ipAddress;
						return `${a}::${b}:${c}:${d}:${e}`;
					}
				})();
				this.$emit("change", newValue);
			},
			handleEvent(type, payload) {
				if (type === "input") {
					this.handleValueChange(payload);
					// this.$emit("input", payload);
				} else if (type === "change") {
					this.handleValueChange(payload);
				} else {
					console.log(type);
					this.$emit(type, payload);
				}
			}
		}
	});
}
</script>
<style lang="less">
.tiny-ip-address {
	// IP地址输入框高度
	--ti-ip-address-normal-height: var(--ti-common-size-7x);
	// IP地址输入框宽度
	--ti-ip-address-normal-width: calc(var(--ti-common-size-base) * 40);
	// IP地址输入框默认水平内边距
	--ti-ip-address-padding-horizontal: var(--ti-common-space-0);
	// IP地址输入框默认文本色
	--ti-ip-address-normal-text-color: var(--ti-common-color-info-normal);
	// IP地址输入框图标文本色
	--ti-ip-address-icon-color: var(--ti-common-color-info-normal);
	// IP地址输入框图标尺寸
	--ti-ip-address-icon-size: calc(var(--ti-common-size-base) * 2.5);
	// IP地址输入框禁用文本色
	--ti-ip-address-normal-disabled-text-color: var(--ti-common-color-text-disabled);
	// IP地址输入框默认边框色
	--ti-ip-address-normal-border-color: var(--ti-common-color-border);
	// IP地址输入框默认背景色
	--ti-ip-address-normal-bg-color: var(--ti-common-color-light);
	// IP地址输入框圆角
	--ti-ip-address-border-radius: var(--ti-common-border-radius-normal);
	// IP地址输入框字号
	--ti-ip-address-font-size: var(--ti-common-font-size-base);
	// IP地址输入框字族
	--ti-ip-address-normal-font-family: var(--ti-common-font-family);
	// IP地址输入框行高
	--ti-ip-address-line-height: var(--ti-common-line-height-2);
	// IP地址输入框聚焦边框色
	--ti-ip-address-border-color-focus: var(--ti-common-color-line-active);
	// IP地址输入框悬浮边框色
	--ti-ip-address-border-color-hover: var(--ti-common-color-line-hover);
	// IP地址输入框禁用背景色
	--ti-ip-address-disabled-bg-color: var(--ti-common-color-bg-disabled);
	// IP地址输入框禁用边框色
	--ti-ip-address-disabled-border-color: var(--ti-common-color-line-disabled);
	// Ip地址输入框item宽度
	--ti-ip-address-input-width: var(--ti-common-size-8x);

	width: var(--ti-ip-address-normal-width);
	max-width: 100%;
	outline: 0;
	display: inline-table;
	text-align: left;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.tiny-ip-address__input {
	position: relative;
	width: 100%;
	height: var(--ti-ip-address-normal-height);
	line-height: var(--ti-ip-address-line-height);
	border: 1px solid var(--ti-ip-address-normal-border-color);
	color: var(--ti-ip-address-normal-text-color);
	border-radius: var(--ti-ip-address-border-radius);
	background: var(--ti-ip-address-normal-bg-color);
	font-size: var(--ti-ip-address-font-size);
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	white-space: nowrap;
	background-image: none;
	-ms-user-select: auto;
	-webkit-user-select: auto;
	-o-user-select: auto;
	-moz-user-select: auto;
	user-select: auto;
	-webkit-transition: border 0.3s;
	transition: border 0.3s;
	outline: 0;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.tiny-ip-address__input.readonly,
.tiny-ip-address__input[readonly] {
	cursor: not-allowed;
	-webkit-box-shadow: none;
	box-shadow: none;
}

.tiny-ip-address__input.readonly.active,
.tiny-ip-address__input.readonly:active,
.tiny-ip-address__input.readonly:focus,
.tiny-ip-address__input.readonly:hover,
.tiny-ip-address__input.readonly[active],
.tiny-ip-address__input[readonly].active,
.tiny-ip-address__input[readonly]:active,
.tiny-ip-address__input[readonly]:focus,
.tiny-ip-address__input[readonly]:hover,
.tiny-ip-address__input[readonly][active] {
	border-color: var(--ti-ip-address-border-color-hover);
}

.tiny-ip-address__input::-moz-placeholder {
	color: var(--ti-ip-address-normal-disabled-text-color);
	opacity: 1;
}

.tiny-ip-address__input:-ms-input-placeholder {
	color: var(--ti-ip-address-normal-disabled-text-color);
}

.tiny-ip-address__input::-webkit-input-placeholder {
	color: var(--ti-ip-address-normal-disabled-text-color);
}

.tiny-ip-address__input::-ms-input-placeholder {
	color: var(--ti-ip-address-normal-disabled-text-color);
}

.tiny-ip-address__input::placeholder {
	color: var(--ti-ip-address-normal-disabled-text-color);
}

.tiny-ip-address__input:hover {
	cursor: pointer;
	border: 1px solid var(--ti-ip-address-border-color-hover);
	color: var(--ti-ip-address-normal-text-color);
}

.tiny-ip-address__input:hover::-moz-placeholder {
	color: var(--ti-ip-address-normal-disabled-text-color);
	opacity: 1;
}

.tiny-ip-address__input:hover:-ms-input-placeholder {
	color: var(--ti-ip-address-normal-disabled-text-color);
}

.tiny-ip-address__input:hover::-webkit-input-placeholder {
	color: var(--ti-ip-address-normal-disabled-text-color);
}

.tiny-ip-address__input:hover::-ms-input-placeholder {
	color: var(--ti-ip-address-normal-disabled-text-color);
}

.tiny-ip-address__input:hover::placeholder {
	color: var(--ti-ip-address-normal-disabled-text-color);
}

.tiny-ip-address__input.active,
.tiny-ip-address__input:active,
.tiny-ip-address__input:focus,
.tiny-ip-address__input[active] {
	border: 1px solid var(--ti-ip-address-border-color-focus);
	color: var(--ti-ip-address-normal-text-color);
}

.tiny-ip-address__input:focus::-moz-placeholder {
	color: #d9d9d9;
	opacity: 1;
}

.tiny-ip-address__input:focus:-ms-input-placeholder {
	color: #d9d9d9;
}

.tiny-ip-address__input:focus::-webkit-input-placeholder {
	color: #d9d9d9;
}

.tiny-ip-address__input:focus::-ms-input-placeholder {
	color: #d9d9d9;
}

.tiny-ip-address__input:focus::placeholder {
	color: #d9d9d9;
}

.tiny-ip-address__input.disabled,
.tiny-ip-address__input[disabled] {
	cursor: not-allowed;
	pointer-events: none;
	border: 1px solid var(--ti-ip-address-disabled-border-color);
	color: var(--ti-ip-address-normal-disabled-text-color);
	background: var(--ti-ip-address-disabled-bg-color);
	-webkit-box-shadow: none;
	box-shadow: none;
}

.tiny-ip-address__input.disabled .tiny-svg,
.tiny-ip-address__input[disabled] .tiny-svg {
	fill: var(--ti-ip-address-normal-disabled-text-color);
}

.tiny-ip-address__input li {
	float: left;
	overflow: hidden;
	display: -webkit-inline-box;
	display: -ms-inline-flexbox;
	display: inline-flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}

.tiny-ip-address__input li > input {
	font-size: var(--ti-ip-address-font-size);
	border: none;
	text-align: center;
	outline: 0;
	background: 0 0;
	color: var(--ti-ip-address-normal-text-color);
	font-family: var(--ti-ip-address-normal-font-family);
	width: var(--ti-ip-address-input-width);
	float: left;
	height: calc(var(--ti-ip-address-normal-height) - 2px);
	line-height: var(--ti-ip-address-line-height);
	padding: 0;
}

.tiny-ip-address__input li > input.active,
.tiny-ip-address__input li > input:active,
.tiny-ip-address__input li > input:focus,
.tiny-ip-address__input li > input[active] {
	color: var(--ti-ip-address-normal-text-color);
}

.tiny-ip-address__input li > input:hover {
	cursor: pointer;
	color: var(--ti-ip-address-normal-text-color);
}

.tiny-ip-address__input li > input.disabled,
.tiny-ip-address__input li > input[disabled] {
	color: var(--ti-ip-address-normal-disabled-text-color);
}

.tiny-ip-address__input li svg {
	vertical-align: middle;
	fill: var(--ti-ip-address-icon-color);
	width: var(--ti-ip-address-icon-size);
	height: var(--ti-ip-address-icon-size);
}

.tiny-ip-address__input li:last-child {
	margin-right: var(--ti-ip-address-padding-horizontal);
}

.tiny-ip-address__input li:last-child > svg {
	display: none;
}

.tiny-ip-address__input li:first-child {
	margin-left: var(--ti-ip-address-padding-horizontal);
}

.tiny-ip-address__input__ipv6-delimiter {
	width: var(--ti-ip-address-icon-width);
	text-align: center;
}
</style>

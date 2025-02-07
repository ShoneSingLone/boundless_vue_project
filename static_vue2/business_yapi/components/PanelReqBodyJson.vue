<style lang="less">
.panel-req-body-json-row,
.panel-req-body-json-cell {
	&:hover {
		background-color: var(--el-fill-color-light);
		// border-bottom: 1px solid var(--el-fill-color-light);
	}
}
.PanelReqBodyJson {
	&.unknown {
		color: gold;
	}
	.pointer.disabled {
		opacity: 0.5;
		&:hover {
			cursor: not-allowed;
		}
	}
	.el-input__inner {
		border-color: transparent;
	}
}
.panel-req-body-json-row_header {
	line-height: 48px;
}

.PanelReqBodyJson-root {
	height: 300px;
	overflow: auto;
}
.PanelReqBodyJson-name {
	font-weight: bold;
	height: 32px;
	line-height: 32px;
}

.PanelReqBodyJson-type {
	&-integer {
		color: green;
		.el-input__inner {
			color: green;
		}
	}
	&-string {
		color: rgb(201, 59, 59);
		.el-input__inner {
			color: rgb(201, 59, 59);
		}
	}
	&-boolean {
		color: rgb(61, 59, 201);
		.el-input__inner {
			color: rgb(61, 59, 201);
		}
	}
	&-object {
		color: rgb(231, 199, 13);
		.el-input__inner {
			color: rgb(231, 199, 13);
		}
	}
	&-array {
		color: rgb(178, 228, 221);
		.el-input__inner {
			color: rgb(178, 228, 221);
		}
	}
}
</style>
<template></template>
<script lang="ts">
export default async function () {
	const CELL_WIDTH = 300;

	const genConfigsType = isRoot => {
		if (isRoot) {
			return {
				itemType: "xItemSelect",
				options: [
					{ label: "object", value: "object" },
					{ label: "array", value: "array" }
				]
			};
		} else {
			return {
				itemType: "xItemSelect",
				options: [
					{ label: "string", value: "string" },
					{ label: "number", value: "number" },
					{ label: "boolean", value: "boolean" },
					{ label: "object", value: "object" },
					{ label: "array", value: "array" }
				]
			};
		}
	};

	const newPropString = propArray => {
		return _.filter(propArray, prop => _.$isInput(prop)).join(".");
	};

	return defineComponent({
		props: ["value"],
		model: {
			prop: "value",
			event: "change"
		},
		data(vm) {
			return {};
		},
		computed: {
			cptReadonly() {
				return Boolean(this.$attrs.readonly);
			},
			/* url 参数 */
			cptReqBodyJson: {
				get() {
					try {
						return JSON.parse(this.value);
					} catch (error) {
						return {};
					}
				},
				set(val) {
					const newString = JSON.stringify(val, null, 2);
					if (!_.isEqual(newString, this.value)) {
						this.$emit("change", newString);
					}
				}
			}
		},
		methods: {
			genFnOnChange({ item, prop, parentProp }) {
				return newValue => {
					const oldValue = item[prop];
					if (_.isEqual(newValue, oldValue)) {
						return;
					}
					let props = newPropString([parentProp, prop]);
					_.$val(this.cptReqBodyJson, props, newValue);
					this.cptReqBodyJson = { ...this.cptReqBodyJson };
				};
			},
			removeProperty({ parentProp, item }) {
				let _ReqBodyJson = _.cloneDeep(this.cptReqBodyJson);
				_.$val(_ReqBodyJson, parentProp, undefined, { delete: true });
				this.cptReqBodyJson = { ..._ReqBodyJson };
			},
			async addNewProperty(parentProp = "") {
				const [error] = await _.$validateForm(".PanelReqBodyJson");
				if (error) {
					return;
				}

				const newItem = {
					type: "string",
					description: "",
					format: "",
					enum: "",
					example: "",
					required: [],
					properties: []
				};

				const parent = _.$val(this.cptReqBodyJson, `${parentProp}`);
				if (parent?.type === "object") {
					parent.properties = (() => {
						if (_.isArray(parent.properties)) {
							return parent.properties;
						} else {
							return [];
						}
					})();
					parent.properties.push(newItem);
				}
				if (parent?.type === "array") {
					parent.items = parent.items || [];
					parent.items.push(newItem);
				}
				this.cptReqBodyJson = { ...this.cptReqBodyJson };
			},

			gen_row({ item, level = 1, parentProp = "", index, isArryItem = false }) {
				const GAP = 16 * level;
				const isRoot = level === 1;

				/* 有一个根节点，不可删除,但是可以改变类型:[] or {} */
				return hDiv(
					{
						class: `PanelReqBodyJson ${item?.type || "unknown"}`,
						attrs: {
							"data-prop": parentProp
						}
					},
					this.gen_row_cells({
						isArryItem,
						GAP,
						level,
						isRoot,
						item,
						parentProp: newPropString([parentProp, index])
					})
				);
			},
			gen_row_cells({ GAP, isRoot, item, parentProp, level, isArryItem = false }) {
				const vm = this;

				return [
					hDiv({ class: "flex middle panel-req-body-json-row" }, [
						hxIcon({
							vIf: !vm.cptReadonly,
							icon: "delete",
							configs: {},
							class: {
								pointer: true,
								disabled: level == 1
							},
							style: { width: `32px` },
							onClick: () => {
								if (level == 1) {
									return;
								}
								vm.removeProperty({ parentProp, item });
							}
						}),
						hDiv({ style: { width: `${GAP}px` } }, []),
						hDiv(
							{
								class: "flex middle",
								style: {
									width: `${CELL_WIDTH - GAP}px`
								}
							},
							(() => {
								if (isArryItem) {
									return [
										hSpan(
											{
												class: "flex1",
												style: `width:1px;padding-left:15px;`
											},
											[item.propname]
										)
									];
								} else {
									return [
										hxItem({
											class: "flex1",
											style: `width:1px;`,
											readonly: vm.cptReadonly,
											value: isRoot ? "root" : item.propname || "",
											configs: {
												placeholder: "属性名称",
												rules: [
													_rules.required(),
													_rules.validator(({ val: propname }) => {
														const _parentProp = parentProp.split(".");
														_parentProp.pop();
														const paremtItem =
															vm.cptReqBodyJson[
																_parentProp.join(".")
															];
														const items = _.filter(paremtItem, {
															propname
														});
														if (items.length > 1) {
															return "参数名重复";
														}
														return "";
													})
												]
											},
											onChange: vm.genFnOnChange({
												item,
												parentProp,
												prop: "propname"
											})
										}),
										hxIcon({
											style: "width:32px",
											icon: "_add",
											class: "pointer",
											vIf:
												!vm.cptReadonly &&
												((isRoot && item.type == "object") ||
													item.type == "object"),
											onClick() {
												vm.addNewProperty(parentProp);
											}
										}),
										(() => {
											if (vm.cptReadonly) {
												if (!!item.required) {
													return h(
														"span",
														{
															style: "width:48px;color:red"
														},
														["*"]
													);
												}
											} else {
												return h("xSwitch", {
													directives: [
														hTipsHover({
															msg: "必填",
															placement: "left"
														})
													],
													style: "width:48px",
													value: !!item.required,
													onChange: vm.genFnOnChange({
														item,
														parentProp,
														prop: "required"
													})
												});
											}
										})()
									];
								}
							})()
						),
						hxItem({
							readonly: vm.cptReadonly,
							configs: genConfigsType(isRoot),
							value: item.type || "",
							class: `PanelReqBodyJson-type-${item.type}`,
							style: { width: `${CELL_WIDTH}px` },
							onChange: vm.genFnOnChange({
								item,
								parentProp,
								prop: "type"
							})
						}),
						hxItem({
							configs: { placeholder: "格式" },
							style: { width: `${CELL_WIDTH}px` },
							value: item.format || "",
							onChange: vm.genFnOnChange({
								item,
								parentProp,
								prop: "format"
							})
						}),
						hxItem({
							configs: { placeholder: "描述" },
							style: { width: `${CELL_WIDTH}px` },
							value: item.description || "",
							onChange: vm.genFnOnChange({
								item,
								parentProp,
								prop: "description"
							})
						}),
						hxItem({
							configs: { placeholder: "示例" },
							style: { width: `${CELL_WIDTH}px` },
							value: String(item.enum || ""),
							onChange: vm.genFnOnChange({
								item,
								parentProp,
								prop: "enum"
							})
						})
					]),
					(() => {
						if (item.type === "object") {
							if (_.isPlainObject(item.properties)) {
								const itemProperties = _.map(
									item.properties,
									(propertie, propname) => {
										return {
											...propertie,
											propname
										};
									}
								);
								item.properties = itemProperties;
							}

							return h(
								"ul",
								{ class: isRoot ? "PanelReqBodyJson-root" : "" },
								_.map(item.properties, (subitem, index) =>
									this.gen_row({
										item: subitem || {},
										level: level + 1,
										index,
										parentProp: newPropString([parentProp, "properties"])
									})
								)
							);
						}
						if (item.type === "array") {
							item.items = item.items || {
								type: "string"
							};
							item.items.propname = `${item.propname}_item`;
							return this.gen_row({
								isArryItem: true,
								item: item.items,
								level: level + 1,
								parentProp: newPropString([parentProp, "items"])
							});
						}
					})()
				];
			}
		},
		render() {
			const width = `${CELL_WIDTH}px`;
			const center = "center";
			return hDiv([
				hDiv(
					{ class: "flex middle panel-req-body-json-row panel-req-body-json-row_header" },
					[
						hDiv({ style: { width: `${16}px` } }, []),
						hDiv({ style: { "text-align": center, width: `${CELL_WIDTH - 16}px` } }, [
							"属性名称"
						]),
						hDiv({ style: { "text-align": center, width } }, ["类型"]),
						hDiv({ style: { "text-align": center, width } }, ["格式"]),
						hDiv({ style: { "text-align": center, width } }, ["描述"]),
						hDiv({ style: { "text-align": center, width } }, ["示例"]),
						hDiv({ style: { "text-align": center, width: `32px` } })
					]
				),
				this.gen_row({ item: this.cptReqBodyJson })
			]);
		}
	});
}
</script>

<script>
export default async function () {
	const { useCellArgs } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	Vue._CurrentCellId = Vue._CurrentCellId || ref(0);
	return {
		created() {
			const res = useCellArgs({
				vm: this,
				itemType: "xItemInput",
				cellConfigs: this.configs?.col?.componentOptions
			});
			// 这里已经赋值过了，所以使用时不需要在.value
			this.res = res;
		},
		data() {
			const vm = this;
			return {
				res: {}
			};
		},
		computed: {
			params() {
				return {
					xCellSelectOrInput: this,
					configs: this.configs,
					col: this.configs.col,
					index: this.configs.index,
					prop: this.configs.prop,
					row: this.configs.row
				};
			},
			cpt_label() {
				const item = _.find(this.options, { value: this.privateModel });
				if (item) {
					return item.label;
				}
			},
			privateModel: {
				get() {
					return this.row[this.configs.prop] || "";
				},
				set(val) {
					if (this.configs?.col?.componentOptions?.onEmitValue) {
						if (this.row[this.configs.prop] !== val) {
							this.configs.col.componentOptions.onEmitValue({
								...this.params,
								val
							});
						}
					}
				}
			},
			searchDisabled() {
				let dis = this.configs?.col?.componentOptions?.search?.disabled;
				if (_.isFunction(dis)) {
					return dis();
				}
				return dis ?? false;
			}
		},
		mounted() {},
		render() {
			const vm = this;
			let opts = vm.configs?.col?.componentOptions?.search?.options ?? [];

			return h("div", { class: "select-search" }, [
				h(
					"el-select",
					{
						value: vm.configs?.col?.componentOptions?.search?.value,
						disabled: vm.searchDisabled,
						onChange: val => {
							if (vm.configs?.col?.componentOptions?.search?.value) {
								vm.configs.col.componentOptions.search.value = val;
								vm.configs.row.searchValue = val;
								vm.configs.row[vm.configs.prop] = "";
							}
							// if (_.isFunction(vm.configs?.col?.componentOptions?.search?.change)) {
							// 	vm.configs.col.componentOptions.search.change(val);
							// }
						}
					},
					[
						...opts.map(item => {
							return h("el-option", {
								key: item.value,
								label: item.label,
								value: item.value
							});
						})
					]
				),
				vm.configs?.col?.componentOptions?.search?.value == "true"
					? h("xItem", {
							configs: {
								...(vm.configs?.col?.componentOptions || {}),
								itemType: "xItemSelect",
								payload: vm.params
							},
							size: "mini",
							value: vm.privateModel,
							onChange: val => (vm.privateModel = val)
					  })
					: h("xItem", {
							configs: this.res.innerComponentConfigs,
							value: this.res.privateModel,
							size: "mini"
					  })
			]);
		}
	};
}
</script>
<style lang="less" scoped>
.select-search {
	display: flex;

	div {
		&:first-child {
			flex: 1;
		}

		&:last-child {
			flex: 2;
		}
	}
}
</style>

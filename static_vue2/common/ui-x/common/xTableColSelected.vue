<script lang="ts">
export default async function () {
	function setSelectedRows(vm, rows) {
		vm.configs.selectedRows = rows;
		/*在初始时设置 onSelectedRowsChange 会监听 configs.selectedRows  mixinHandleSelectedRowsChange*/
		vm.$emit("update:selectedRows", rows);
	}

	return {
		props: ["configs", "type", "slotname", "row", "index"],
		methods: {
			getDisableByDisabledBy() {
				return _.isFunction(this.disabledBy) ? this.disabledBy(this.row, this.index) : !!this.row[this.disabledBy];
			},
			setSelectedRows(rows) {
				this.configs.data.selected = rows;
				this.$emit("update:selected", rows);
			},
			changeSelectedSingle() {
				const id = this.row[this.selectedBy];
				const targetSelectedRows = [id];
				this.setSelectedRows(targetSelectedRows);
			},
			changeSelected() {
				const vm = this;
				const id = this.row[vm.selectedBy];
				const index = vm.configs.data.selected.indexOf(id);
				const targetSelectedRows = (isPush => {
					if (isPush) {
						return [...vm.configs.data.selected, id];
					} else {
						const a = [...vm.configs.data.selected];
						a.splice(index, 1);
						return a;
					}
				})(index === -1);
				this.setSelectedRows(targetSelectedRows);
			}
		},
		computed: {
			selectedBy() {
				return this.configs.colInfo[this.type].selectedBy || "";
			},
			disabledBy() {
				return this.configs.colInfo[this.type].disabledBy || "";
			}
		},
		render(h) {
			const vm = this;
			if (vm.type === "COL_MULTIPLE") {
				const ComponentSlots = {
					header: () => {
						const isSelectAll = (() => {
							if (vm.configs.data.list.length === 0) {
								return false;
							}
							return vm.configs.data.selected.length === vm.configs.data.list.length;
						})();
						const property = {
							style: {
								width: "16px"
							},
							props: {
								value: isSelectAll,
								indeterminate: vm.configs.data.selected.length > 0 && vm.configs.data.selected.length < vm.configs.data.list.length
							},
							on: {
								change: () => {
									/**/
									const handleSetDisabled = () => {
										const canSelectRows = (() => {
											if (_.isFunction(vm.disabledBy)) {
												return vm.configs.data.list.filter((row, index) => !vm.disabledBy(row, index));
											}
											if (_.isString(vm.disabledBy)) {
												return vm.configs.data.list.filter(row => !row[vm.disabledBy]);
											}
											return vm.configs.data.list;
										})();

										if (vm.configs.data.selected.length === canSelectRows.length) {
											vm.setSelectedRows([]);
										} else {
											const currentSelectedRows = canSelectRows.map(row => row[vm.selectedBy]);
											vm.setSelectedRows(currentSelectedRows);
										}
									};
									/**/
									const handleUnsetDisabled = () => {
										if (vm.configs.data.selected.length === vm.configs.data.list.length) {
											vm.setSelectedRows([]);
										} else {
											const currentSelectedRows = vm.configs.data.list.map(row => row[vm.selectedBy]);
											vm.setSelectedRows(currentSelectedRows);
										}
									};
									/**/
									if (vm.disabledBy) {
										handleSetDisabled();
									} else {
										handleUnsetDisabled();
									}
								}
							}
						};
						return h("el-checkbox", property);
					},
					default: () => {
						const disabled = vm.getDisableByDisabledBy();
						return h("el-checkbox", {
							props: {
								width: 35,
								value: vm.configs.data.selected.includes(this.row[vm.selectedBy]),
								disabled
							},
							on: {
								change() {
									vm.changeSelected(this.scope, vm.selectedBy);
								}
							}
						});
					}
				};

				return ComponentSlots[this.slotname]();
			} else {
				const ComponentSlots = {
					header: () => null,
					default: () => {
						const disabled = vm.getDisableByDisabledBy();
						const value = vm.configs.data.selected[0] === this.row[vm.selectedBy];
						return h("el-checkbox", {
							props: {
								width: 35,
								value,
								disabled
							},
							on: {
								change: () => vm.changeSelectedSingle(this.scope, vm.selectedBy)
							}
						});
					}
				};
				return ComponentSlots[this.slotname]();
			}
		}
	};
}
</script>

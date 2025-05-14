<script lang="ts">
export default async function () {
	Vue._CurrentCellId = Vue._CurrentCellId || ref(0);
	return defineComponent({
		created() {
			if (_.isArray(_.$val(this, "configs.col.componentOptions.options"))) {
				/* 
        this.$watch(
        	"configs.col.options",
        	(options, oldOptions) => {
        		const a = JSON.stringify(options || []);
        		const b = JSON.stringify(oldOptions || []);
        		if (a !== b) {
        			this.configsSelectComponent.options = options || [];
        		}
        	},
        	{ immediate: true }
        );
        if (this.configs?.col?.componentOptions?.props) {
        	this.$watch(
        		"configs.col.xCellSelect.props",
        		(options, oldOptions) => {
        			const a = JSON.stringify(options || []);
        			const b = JSON.stringify(oldOptions || []);
        			if (a !== b) {
        				this.configsInputComponent.props = options || [];
        			}
        		},
        		{ immediate: true }
        	);
        }
        */
			}
		},
		data() {
			const vm = this;
			return {};
		},
		computed: {
			configsMerged() {
				return {
					payload: this.params,
					...(_.$val(this, "configs.col.componentOptions") || {}),
					itemType: "xItemSelect"
				};
			},
			params() {
				return {
					xCell: this,
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
					if (_.$val(this, "configs.col.componentOptions.onEmitValue")) {
						if (this.row[this.configs.prop] !== val) {
							this.configs.col.componentOptions.onEmitValue({
								...this.params,
								val
							});
						}
					}
				}
			}
		},
		render() {
			/* const vNodeChild = (function () { if (Vue._CurrentCellId.value === vm._uid) { return hxItem( { configs: vm.configsSelectComponent, size: "mini", value: vm.privateModel, onChange: val => vm.privateModel = val }); } return this.label || "___"; })(); return hDiv( { attrs: { "data-x-cell-id": vm._uid, }, class: "width100 height100", onMouseenter(event) { try { const { currentTarget } = event; Vue._CurrentCellId.value = Number(currentTarget.dataset.ghCellId); } catch (error) { } } }, [vNodeChild]); */
			const vm = this;
			return hxItem({
				configs: {
					...vm.configsMerged,
					itemType: "xItemSelect"
				},
				size: "mini",
				value: vm.privateModel,
				onChange: val => (vm.privateModel = val)
			});
		}
	});
}
</script>

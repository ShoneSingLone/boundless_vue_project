<script>
export default async function () {
	const EVENT_ARRAY = ["change", "blur", "input", "focus"];
	return {
		EVENT_ARRAY,
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
			inject: {
				xItem: {
					default: {}
				}
			},
			model: {
				prop: "value",
				event: "change"
			},
			computed: {
				mixin_value: {
					get() {
						return this.value;
					},
					set(val) {
						if (this.value === val) {
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
</script>

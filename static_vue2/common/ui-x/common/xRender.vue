<script lang="ts">
export default async function () {
	return {
		props: [
			/* render: 渲染函数| 字符串| vNode| vNode[] */
			"render",
			/* payload: object */
			"payload"
		],

		render() {
			let log_message = "";
			try {
				let cell_any_type = this.render;
				if (_.isFunction(cell_any_type)) {
					log_message = "isFunction";
					cell_any_type = cell_any_type.call(this.$parent, this.payload);
				}

				if (_.isString(cell_any_type)) {
					log_message = "isString";
					return this.createTextVNode(cell_any_type);
				}

				if (_.isArray(cell_any_type)) {
					log_message = "isArray";
					return h("xFragment", cell_any_type);
				}
				if (_.$val(cell_any_type, "TYPE_IS_VNODE")) {
					log_message = "TYPE_IS_VNODE";
					return cell_any_type;
				}
				if (cell_any_type === undefined) {
					log_message = "undefined";
					return;
				}
				if (_.$isInput(cell_any_type)) {
					log_message = "isInput";
					return this.createTextVNode(cell_any_type);
				}
				return this.createTextVNode(cell_any_type || "");
			} catch (error) {
				console.warn(`${log_message} => ${error.message}`);
				return null;
			}
		}
	};
}
</script>

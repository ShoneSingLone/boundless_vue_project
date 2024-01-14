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
			let tips = "";
			try {
				let cellAny = this.render;
				if (_.isFunction(cellAny)) {
					tips = "isFunction";
					cellAny = cellAny.call(this.$parent, this.payload);
				}

				if (_.isString(cellAny)) {
					tips = "isString";
					return this.createTextVNode(cellAny);
				}

				if (_.isArray(cellAny)) {
					tips = "isArray";
					return h("xFragment", cellAny);
				}
				if (cellAny?.TYPE_IS_VNODE) {
					tips = "TYPE_IS_VNODE";
					return cellAny;
				}
				if (cellAny === undefined) {
					tips = "undefined";
					return;
				}
				if (_.$isInput(cellAny)) {
					tips = "isInput";
					return this.createTextVNode(cellAny);
				}
				return this.createTextVNode(cellAny || "");
			} catch (error) {
				console.warn(`${tips} => ${error.message}`);
				return null;
			}
		}
	};
}
</script>
<style lang="less"></style>

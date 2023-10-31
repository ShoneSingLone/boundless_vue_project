<script only-use-in-dev-model>
window.ONLY_USE_IN_DEV_MODEL = function () {
	const $win = $(window);

	/* window.io */

	/* 默认 socket.io */
	var ws = io("LOCALHOST_PORT/ws");
	window.APP_WS = ws;

	ws.on("message", function (event) {
		$win.trigger("WS_MESSAGE", event);
	});

	ws.on("hmr", function (data) {
		$win.trigger("WS_HMR", data);
	});
	/* ********************************** */

	const loadSfcProd = _.$importVue;

	async function $importVue_hmr(...args) {
		const module = await loadSfcProd.apply(_, args);

		if (!module) {
			console.log(args);
		}
		/* 主要是有些不是VueSFC组件，就是纯模块代码 */
		if (!module?.NEED_HMR) {
			return module;
		}

		let newModule = {
			_hmr_socket_io_script_block: true,
			inheritAttrs: false,
			data() {
				return {
					CurrentComponennt: module
				};
			},
			setup() {
				const vm = this;
				/**
				 * 为vue绑定真实的ref，转发ref到BaseComponent
				 * @param target 当前高阶组件真实实例
				 * @param componnet 转发到指定的组件
				 */
				function bindRef($parent, refProp) {
					let $refs = $parent.$refs || {};
					const isBind = (() => {
						if (Object.keys($refs).length > 0) {
							return _.some($refs, (value, key) => {
								if (key === refProp) {
									$parent.$refs[key] = vm.$refs[key];
									return true;
								}
								return false;
							});
						}
						return false;
					})();

					if (!isBind) {
						bindRef($parent.$parent, refProp);
					}
				}

				async function reloadComponent(event, { filename }) {
					const path = _.toLower(_.camelCase(filename));
					const file = _.toLower(_.camelCase(args[0]));
					if (path.indexOf(file) > -1) {
						vm.CurrentComponennt = await loadSfcProd.apply(_, args);
					}
				}

				$win.on("WS_HMR", reloadComponent);

				Vue.onBeforeUnmount(() => {
					$win.off("WS_HMR", reloadComponent);
				});

				return function () {
					const refProp = this?.$vnode?.data?.ref;
					if (refProp && this.$refs[refProp]) {
						bindRef(this.$parent, refProp);
					}

					return Vue.h(
						this.CurrentComponennt,
						Vue.merge_hFnProps([
							{ on: this.$listeners },
							this?.$options?.propsData || {},
							this?.$vnode?.data || {},
							this?.$vnode?.data?.attrs || {}
						]),
						[this.$vSlots]
					);
				};
			}
		};

		if (module.$parent) {
			newModule.parent = module.$parent;
		}

		return newModule;
	}

	_.$importVue = $importVue_hmr;
};
</script>

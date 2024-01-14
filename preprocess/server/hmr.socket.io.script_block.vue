<script only-use-in-dev-model>
window.ONLY_USE_IN_DEV_MODEL = function () {
	const $win = $(window);

	/* 运行时会replace */
	/* window.io */
	/* 运行时会replace */

	/* 默认 socket.io */
	var ws = io("LOCALHOST_PORT/ws");
	window.APP_WS = ws;

	ws.on("message", function (event) {
		$win.trigger("WS_MESSAGE", event);
	});

	const HMR_COMPONENT_COLLECTION = {};

	Vue._HandleAsyncComponentResolved = function ({ res, factory, baseCtor, isSync, owners, owner, ownerForceUpdate, ensureCtor }) {
		const { FILE_URL } = res;
		if (HMR_COMPONENT_COLLECTION && FILE_URL) {
			HMR_COMPONENT_COLLECTION[FILE_URL] = { factory };
		}
		// cache resolved
		factory.resolved = ensureCtor(res, baseCtor);
		// invoke callbacks only if this is not a synchronous resolve
		// (async resolves are shimmed as synchronous during SSR)
		if (!isSync) {
			ownerForceUpdate(true);
		} else {
			owners.length = 0;
		}
	};
	/* VueRouter 加载的组件 */
	Vue._HandleVueRouterAsyncComponentResolved = function ({ resolvedDef, def, match, key, pending, next }) {
		if (Vue.isESModule(resolvedDef)) {
			resolvedDef = resolvedDef.default;
		}

		const { FILE_URL } = resolvedDef;
		if (HMR_COMPONENT_COLLECTION && FILE_URL) {
			HMR_COMPONENT_COLLECTION[FILE_URL] = { factory: def, match, key };
		}
		// save resolved on async factory in case it's used elsewhere
		def.resolved = typeof resolvedDef === "function" ? resolvedDef : Vue.extend(resolvedDef);
		match.components[key] = def.resolved;
		pending.count--;
		if (pending.count <= 0) {
			next();
		}
	};

	const forceUpdate = _.debounce(function () {
		window.HMR_APP && HMR_APP.$forceUpdate();
	}, 600);

	ws.on("hmr", async ({ filename: changedPath, content }) => {
		changedPath = _.toLower(_.camelCase(changedPath));
		_.some(HMR_COMPONENT_COLLECTION, ({ factory, match, key }, resolvedURL) => {
			const oldPath = _.toLower(_.camelCase(resolvedURL));
			if (~oldPath.indexOf(changedPath)) {
				(async function () {
					try {
						const newComponent = await _.$sfcVueObject({ resolvedURL, sourceCode: content });
						factory.resolved = Vue.extend(newComponent);
						if (match && key) {
							match.components[key] = factory.resolved;
						}
						forceUpdate();
					} catch (error) {
						console.error(error);
					}
				})();
				return true;
			} else {
				return false;
			}
		});
	});

	/* ********************************** */
};
</script>

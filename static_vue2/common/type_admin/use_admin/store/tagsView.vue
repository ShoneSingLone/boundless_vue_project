<script lang="ts">
export default async function () {
	return {
		useAdminTagsView({ rootApp }) {
			const state = reactive({
				visitedViews: [],
				cachedViews: [],
				iframeViews: []
			});

			const storeTagsView = {
				state,
				delCachedView(view) {
					const index = _.findIndex(state.cachedViews, view.name);
					index > -1 && state.cachedViews.splice(index, 1);
					return state.cachedViews;
				},
				delVisitedView(view) {
					_.remove(state.visitedViews, v => v.path === view.path);
					console.log(state.visitedViews);
					state.visitedViews = [...state.visitedViews];
					state.iframeViews = _.filter(state.iframeViews, v => v.path !== view.path);
					return state.visitedViews;
				},
				delView(view) {
					return {
						visitedViews: [...storeTagsView.delVisitedView(view)],
						cachedViews: [...storeTagsView.delCachedView(view)]
					};
				},
				closePage(route) {
					if (route) {
						const { visitedViews } = storeTagsView.delView(
							rootApp.$router.currentRoute
						);
						const latestView = _.last(visitedViews);
						if (latestView) {
							return rootApp.$router.push(latestView.fullPath);
						}
						return rootApp.$router.push("/");
					} else {
						return storeTagsView.delView(route);
					}
				},
				addVisitedView(view) {
					(() => {
						if (_.some(state.visitedViews, v => v.path === view.path)) {
							return;
						}
						state.visitedViews.push(
							Object.assign({}, view, {
								title: view.meta.title || "no-name"
							})
						);
					})();
					this.addCachedView(view);
				},
				addCachedView(view) {
					if (state.cachedViews.includes(view.name)) {
						return;
					}
					if (view.meta && !view.meta.noCache) {
						state.cachedViews.push(view.name);
					}
				},
				addView(view) {
					this.addVisitedView(view);
					this.addCachedView(view);
				},
				addIframeView(view) {
					if (state.visitedViews.some(v => v.path === view.path)) return;
					state.visitedViews.push(
						Object.assign({}, view, {
							title: view.meta.title || "no-name"
						})
					);
				},
				updateVisitedView(view) {
					for (let v of state.visitedViews) {
						if (v.path === view.path) {
							v = Object.assign(v, view);
							break;
						}
					}
				},
				delIframeView(view) {
					return new Promise(resolve => {
						state.iframeViews = state.iframeViews.filter(
							item => item.path !== view.path
						);
						resolve([...state.iframeViews]);
					});
				}
			};
			return storeTagsView;
		}
	};
}
</script>

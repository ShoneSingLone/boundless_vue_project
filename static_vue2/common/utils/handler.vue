<script>
export default async function () {
	return {
		dispatch: function (componentName, eventName, eventPayload) {
			var current = this;
			var $parent = current.$parent;
			while ($parent) {
				if (componentName === $parent.$options.name) {
					current.$emit.apply($parent, [eventName].concat(eventPayload));
				}
				var current = $parent;
				$parent = current?.$parent;
			}
		},
		broadcast: function (e, t, i) {
			(function e(t, i, n) {
				this.$children.forEach(function (r) {
					r.$options.componentName === t
						? r.$emit.apply(r, [i].concat(n))
						: e.apply(r, [t, i].concat([n]));
				});
			}).call(this, e, t, i);
		}
	};
}
</script>

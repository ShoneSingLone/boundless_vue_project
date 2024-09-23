<template>
	<div class="el-tabs__active-bar" :class="cptClassName" :style="barStyle"></div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "xTabBar",
		props: {
			tabs: Array
		},
		inject: ["rootTabs"],
		computed: {
			cptClassName() {
				return `is-${this.cptPosition}`;
			},
			cptPosition() {
				return this.rootTabs.tabPosition;
			},
			barStyle: {
				get() {
					let style = {};
					let offset = 0;
					let tabSize = 0;
					const sizeName =
						["top", "bottom"].indexOf(this.cptPosition) !== -1 ? "width" : "height";
					const sizeDir = sizeName === "width" ? "x" : "y";
					_.every(this.tabs, (tab, index) => {
						let $el = _.find(this.$parent.$refs.tabs, _tab => {
							return _tab.id.replace("tab-", "") === tab.paneName;
						});
						if (!$el) {
							return false;
						}

						if (!tab.active) {
							offset += $el[`client${_.$firstUpperCase(sizeName)}`];
							return true;
						} else {
							tabSize = $el[`client${_.$firstUpperCase(sizeName)}`];
							const tabStyles = window.getComputedStyle($el);
							if (sizeName === "width" && this.tabs.length > 1) {
								tabSize -=
									parseFloat(tabStyles.paddingLeft) +
									parseFloat(tabStyles.paddingRight);
							}
							if (sizeName === "width") {
								offset += parseFloat(tabStyles.paddingLeft);
							}
							return false;
						}
					});

					const transform = `translate${_.$firstUpperCase(sizeDir)}(${offset}px)`;
					style[sizeName] = tabSize + "px";
					style.transform = transform;
					style.msTransform = transform;
					style.webkitTransform = transform;

					return style;
				}
			}
		}
	});
}
</script>
<style lang="less"></style>

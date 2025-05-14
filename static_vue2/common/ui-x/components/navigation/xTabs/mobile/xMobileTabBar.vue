<template>
	<div class="x-mobile-tab-bar" :class="{ 'x-mobile-tab-bar_inline': inline }">
		<slot>
			<xMobileTab
				v-for="(item, index) in data"
				:label="item.label"
				:value="item.value"
				:icon="item.icon"
				:key="item.value || item.label" />
		</slot>
		<div v-if="showSlider" ref="slider" class="x-mobile-tab-bar-slider"></div>
	</div>
</template>
<script lang="ts">
export default async function () {
	function prefixStyle(style) {
		return style;
	}

	const COMPONENT_NAME = "x-mobile-tab-bar";

	const EVENT_INPUT = "input";
	const EVENT_CHANGE = "change";
	const EVENT_CLICK = "click";

	const TRANSFORM = prefixStyle("transform");
	const TRANSITION = prefixStyle("transition");

	return defineComponent({
		name: COMPONENT_NAME,
		components: {
			xMobileTab: () =>
				_.$importVue("/common/ui-x/components/navigation/xTabs/mobile/xMobileTab.vue")
		},
		props: {
			value: {
				type: [String, Number],
				required: true
			},
			data: {
				type: Array,
				default() {
					return [];
				}
			},
			inline: {
				type: Boolean,
				default: false
			},
			showSlider: {
				type: Boolean,
				default: false
			},
			useTransition: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			value() {
				this._updateSliderStyle();
			}
		},
		created() {
			this.tabs = [];
		},
		mounted() {
			this._updateSliderStyle();
			window.addEventListener("resize", this._resizeHandler);
		},
		activated() {
			/* istanbul ignore next */
			window.addEventListener("resize", this._resizeHandler);
		},
		deactivated() {
			/* istanbul ignore next */
			this._cleanUp();
		},
		beforeDestroy() {
			/* istanbul ignore next */
			this._cleanUp();
		},
		methods: {
			addTab(tab) {
				this.tabs.push(tab);
			},
			removeTab(tab) {
				const index = this.tabs.indexOf(tab);
				if (index > -1) this.tabs.splice(index, 1);
			},
			trigger(value) {
				// emit click event as long as tab is clicked
				this.$emit(EVENT_CLICK, value);
				// only when value changed, emit change & input event
				if (value !== this.value) {
					const changedEvents = [EVENT_INPUT, EVENT_CHANGE];
					changedEvents.forEach(eventType => {
						this.$emit(eventType, value);
					});
				}
			},
			_updateSliderStyle() {
				/* istanbul ignore if */
				if (!this.showSlider) return;
				const slider = this.$refs.slider;
				this.$nextTick(() => {
					const { width, index } = this._getSliderWidthAndIndex();
					slider.style.width = `${width}px`;
					this.setSliderTransform(this._getOffsetLeft(index));
				});
			},
			setSliderTransform(offset) {
				const slider = this.$refs.slider;
				if (typeof offset === "number") {
					offset = `${offset}px`;
				}
				if (slider) {
					if (this.useTransition) slider.style[TRANSITION] = `${TRANSFORM} 0.2s linear`;
					slider.style[TRANSFORM] = `translateX(${offset}) translateZ(0)`;
				}
			},
			_getSliderWidthAndIndex() {
				let width = 0;
				let index = 0;
				if (this.tabs.length > 0) {
					index = _.findIndex(this.tabs, tab => tab.value === this.value);
					width = this.tabs[index].$el.clientWidth;
				}
				return {
					width,
					index
				};
			},
			_getOffsetLeft(index) {
				return this.tabs[index].$el.offsetLeft || 0;
			},
			_resizeHandler() {
				clearTimeout(this._resizeTimer);
				this._resizeTimer = setTimeout(() => {
					this._updateSliderStyle();
				}, 60);
			},
			_cleanUp() {
				clearTimeout(this._resizeTimer);
				window.removeEventListener("resize", this._resizeHandler);
			}
		}
	});
}
</script>
<style lang="less">
.x-mobile-tab-bar {
	position: relative;
	align-items: center;
}

.x-mobile-tab-bar,
.x-mobile-tab-bar_inline .x-mobile-tab {
	display: flex;
	justify-content: center;
}

.x-mobile-tab-bar_inline .x-mobile-tab {
	align-content: center;
}

.x-mobile-tab-bar-slider {
	position: absolute;
	left: 0;
	bottom: 0;
	height: 2px;
	width: 20px;
	background-color: var(--el-color-primary);
}

.x-mobile-tab {
	flex: 1;
	padding: 7px 0;
	color: #666;
	text-align: center;
}

.x-mobile-tab_active {
	color: var(--el-color-primary);
}

.x-mobile-tab-panels {
	position: relative;
	overflow: hidden;
}

.x-mobile-tab-panels-group {
	display: flex;
	transition: all 0.4s cubic-bezier(0.86, 0, 0.07, 1);
}

.x-mobile-tab-panel {
	width: 100%;
	flex: 1 0 auto;
}
</style>

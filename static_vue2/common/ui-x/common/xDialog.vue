<template>
	<div class="xDialog xDialog-wrapper" v-bind="$attrs" ref="refDialog" :style="cptRootStyle">
		<div class="xDialog-body">
			<slot />
		</div>
		<div class="xDialog-footer">
			<slot name="footer" />
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		props: ["title"],
		setup(props) {
			const { useAutoResize } = _useXui;
			const { height, width, sizer: refDialog } = useAutoResize(props);
			const { height: windowHeight, width: windowWidth } = _useXui.useWindowSize();

			const cptRootStyle = computed(() => {
				let _height,
					_width,
					_style = {};
				if (height.value && height.value > windowHeight.value) {
					_height = windowHeight.value;
				}
				if (width.value && width.value > windowWidth.value) {
					_width = windowWidth.value;
				}

				if (_height) {
					_style.height = _height + "px";
				}
				if (_width) {
					_style.width = _width + "px";
				}
				return _style;
			});

			return { refDialog, cptRootStyle };
		}
	};
}
</script>

<style lang="less">
.xDialog-current-is-fullscreen {
	.xDialog {
		&.xDialog-wrapper {
			max-height: 100vh;
		}
	}
}
.xDialog {
	--xDialog-padding: var(--ui-one);

	&.xDialog-wrapper {
		display: flex;
		flex-flow: column nowrap;
		height: 100%;
		max-height: calc(100vh - 200px);
	}

	&.xDialog-wrapper.xDialog-list-view {
		max-height: 100%;

		.xDialog-body {
			padding-top: 0;
			padding-left: 0;
			padding-right: 0;
		}

		.page-content-wrapper {
			// padding: 0;
		}
	}
}

.xDialog-body {
	height: 1px;
	flex: 1;
	overflow: auto;
	padding: var(--xDialog-padding);
	display: flex;
	flex-flow: column nowrap;
}

.xDialog-footer {
	padding: 0 var(--xDialog-padding) var(--xDialog-padding);
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-end;
	align-items: center;
}
</style>

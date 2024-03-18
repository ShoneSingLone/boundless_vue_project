<style lang="less">
.el-dialog__wrapper {
	overflow: hidden;
	z-index: var(--xModal-zIndex);
	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		// background-color: rgba(255, 255, 255, 0.5);
		// backdrop-filter: blur(1px);
	}

	> .el-dialog {
		position: relative;
		margin: auto;
		border-radius: var(--border-radius--mini);
		-webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
		box-sizing: border-box;
		width: auto;

		position: absolute;
		transition: opacity 0.3s ease-in-out;
		box-shadow:
			0 6px 16px 0 rgba(0, 0, 0, 0.08),
			0 3px 6px -4px rgba(0, 0, 0, 0.12),
			0 9px 28px 8px rgba(0, 0, 0, 0.05);

		> .el-dialog__header {
			padding: var(--ui-one);
			border-bottom: 1px solid #eee;
			.el-dialog__title-bar {
				cursor: move;
				background-color: transparent;
				position: absolute;
				top: 0;
				right: 0;
				height: 10px;
				z-index: 1;
				left: 0;
			}
		}

		> .xDialog.xDialog-wrapper {
			--xDialog-wrapper-width: unset;
			min-width: unset;
			width: var(--xDialog-wrapper-width, 600px);
		}
	}
}
</style>
<template>
	<transition name="viewer-fade">
		<div class="el-dialog__wrapper" :style="cptWrapperStyle">
			<div role="dialog" class="el-dialog" :style="dialogStyle" ref="refDialog">
				<div class="el-dialog__header">
					<div class="el-dialog__title-bar" v-xmove="moveOptions" />
					<span class="el-dialog__title">
						<xRender :render="cptTitle" />
					</span>
					<button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="closeModal">
						<i class="el-dialog__close el-icon el-icon-close"></i>
					</button>
				</div>
				<ComponentContent ref="refContent" :closeModal="closeModal" @hook:mounted="setDialogOffset" />
			</div>
		</div>
	</transition>
</template>
<script lang="ts">
export default async function ({ options }) {
	function useModal(vm) {
		onMounted(() => {
			vm.deviceSupportInstall();
			document.body.appendChild(vm.$el);
			vm.styleOverflow = document.body.style.overflow;
			// vm.stylePointerEvents = document.body.style.pointerEvents;
			document.body.style.overflow = "hidden";
			// document.body.style.pointerEvents = "none";
		});

		onBeforeUnmount(() => {
			document.body.style.overflow = vm.styleOverflow;
			// document.body.style.pointerEvents = vm.stylePointerEvents;
			if (vm.$el && vm.$el.parentNode) {
				vm.$el.parentNode.removeChild(vm.$el);
			}
		});
	}
	return defineComponent({
		setup(props) {
			const vm = this;
			useModal(this);
			const { useAutoResize } = _useXui;

			const { height: refDialogRectHeight, width: refDialogRectWidth, sizer: refDialog } = useAutoResize(props);
			const { height: refContentHeight, width: refContentWidth, sizer: refContent } = useAutoResize(props);

			const setDialogOffset = _.debounce(() => {
				try {
					let left = (_.$single.win.width() - refDialogRectWidth.value) / 2;
					if (left < 0) {
						left = 0;
					}
					let topOnepice = 2;
					const topTotal = _.$single.win.height() - refDialogRectHeight.value;
					if (topTotal >= 4) {
						topOnepice = topTotal / 4;
					}

					vm.dialogStyle = {
						"margin-top": "0",
						opacity: 1,
						left: `${left}px`,
						top: `${topOnepice}px`
					};
				} catch (error) {
					return {};
				}
			}, 100);

			watch(
				() => {
					return [refDialogRectHeight.value, refDialogRectWidth.value, refContentHeight.value, refContentWidth.value];
				},
				rectArray => {
					if (_.every(rectArray, val => !!val)) {
						setDialogOffset();
					}
				}
			);

			const setPosition = _.throttle(function ({ left, top }) {
				vm.dialogStyle = _.merge(vm.dialogStyle, {
					left: `${left}px`,
					top: `${top}px`
				});
			}, 18);

			onMounted(() => {
				_.$single.win.on("resize.xModal", setDialogOffset);
			});
			onBeforeUnmount(() => {
				_.$single.win.off("resize.xModal", setDialogOffset);
			});

			return {
				setPosition,
				setDialogOffset,
				/*  */
				refDialog,
				refContent,
				moveOptions: {
					left: 0,
					width: 0,
					onStart() {
						const { left, top } = vm.$refs.refDialog.getBoundingClientRect();

						vm.moveOptions.left = left;
						vm.moveOptions.top = top;
					},
					onMoving({ clickEvent, movingEvent }) {
						const offsetLeft = movingEvent.clientX - clickEvent.clientX;
						const offsetTop = movingEvent.clientY - clickEvent.clientY;
						let left = vm.moveOptions.left + offsetLeft;
						let top = vm.moveOptions.top + offsetTop;

						(function () {
							if (left <= 0) {
								left = 0;
								return;
							}

							const width = refDialogRectWidth.value;
							if (left + width > _.$single.win.width()) {
								left = _.$single.win.width() - width;
								return;
							}
						})();

						(function () {
							if (top <= 0) {
								top = 0;
								return;
							}

							const height = refDialogRectHeight.value;
							if (top + height > _.$single.win.height()) {
								top = _.$single.win.height() - height;
								return;
							}
						})();
						setPosition({
							left,
							top
						});
					}
				}
			};
		},
		components: {
			ComponentContent: () => {
				if (options._VueCtor) {
					return Promise.resolve(options._VueCtor);
				}
				return _.$importVue(options.url, options);
			}
		},
		data() {
			return {
				viewerZIndex: 0,
				left: 0,
				dialogStyle: {
					transform: "unset",
					marginTop: 0,
					opacity: 0,
					left: 0,
					top: 0
				}
			};
		},
		methods: {
			deviceSupportInstall() {},
			async closeModal() {
				let isClose = true;
				if (options.onCancel) {
					isClose = await options.onCancel();
				}
				if (isClose) {
					this.dialogStyle = {
						...this.dialogStyle,
						opacity: 0
					};
					setTimeout(() => {
						this.$destroy();
					}, 300);
				}
			}
		},
		computed: {
			cptTitle() {
				return options.title;
			},
			cptWrapperStyle() {
				return {
					"--xModal-zIndex": this.viewerZIndex
				};
			}
		}
	});
}
</script>

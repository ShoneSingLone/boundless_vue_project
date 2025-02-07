<template>
	<transition name="el-notification-fade">
		<div
			:class="['el-notification', wrapperClass, customClass, horizontalClass]"
			v-show="visible"
			:style="positionStyle"
			@mouseenter="clearTimer()"
			@mouseleave="startTimer()"
			@click="click"
			role="alert">
			<!-- <i class="el-notification__icon" :class="[typeClass, iconClass]" v-if="type || iconClass"> </i> -->
			<xIcon
				:class="['el-notification__icon', typeClass, iconClass]"
				:icon="typeClass"
				v-if="type || iconClass"
				@click="close" />
			<div
				:class="{
					'el-notification__group flex1': true,
					'is-with-icon': typeClass || iconClass
				}">
				<h2 class="el-notification__title" v-if="isShowTitle">
					{{ title }}
				</h2>
				<div class="el-notification__content" v-show="message">
					<p v-if="dangerouslyUseHTMLString" v-html="message"></p>
					<xRender v-else :render="message" />
				</div>
				<div
					class="el-notification__closeBtn el-icon-close"
					v-if="showClose"
					@click.stop="close"></div>
			</div>
		</div>
	</transition>
</template>
<script lang="ts">
export default async function () {
	let typeMap = {
		success: "success",
		info: "info",
		warning: "warning",
		error: "error"
	};

	return defineComponent({
		componentName: "xNotification",
		data() {
			return {
				visible: false,
				title: "",
				message: "",
				duration: 4500,
				type: "",
				icon: "",
				showClose: true,
				customClass: "",
				iconClass: "",
				onClose: null,
				onClick: null,
				closed: false,
				verticalOffset: 0,
				timer: null,
				dangerouslyUseHTMLString: false,
				position: "top-right"
			};
		},

		computed: {
			isShowTitle() {
				if (_.isBoolean(this.title) && !this.title) {
					return false;
				}
				return true;
			},
			wrapperClass() {
				return this.type ? `xNotification ${this.type}` : "xNotification";
			},
			typeClass() {
				if (this.icon) {
					/* 使用xIcon */
					return this.icon;
				} else {
					return this.type && typeMap[this.type] ? `el-icon-${typeMap[this.type]}` : "";
				}
			},

			horizontalClass() {
				return this.position.indexOf("right") > -1 ? "right" : "left";
			},

			verticalProperty() {
				return /^top-/.test(this.position) ? "top" : "bottom";
			},

			positionStyle() {
				return {
					[this.verticalProperty]: `${this.verticalOffset}px`
				};
			}
		},

		watch: {
			closed(newVal) {
				if (newVal) {
					this.visible = false;
					setTimeout(() => {
						this.destroyElement();
					}, 1000);
				}
			}
		},

		methods: {
			destroyElement() {
				this.$destroy(true);
				this.$el.parentNode.removeChild(this.$el);
			},

			click() {
				if (typeof this.onClick === "function") {
					this.onClick();
				}
			},

			close() {
				this.closed = true;
				if (typeof this.onClose === "function") {
					this.onClose();
				}
			},

			clearTimer() {
				clearTimeout(this.timer);
			},

			startTimer() {
				if (this.duration > 0) {
					this.timer = setTimeout(() => {
						if (!this.closed) {
							this.close();
						}
					}, this.duration);
				}
			},
			keydown(e) {
				if (e.keyCode === 46 || e.keyCode === 8) {
					this.clearTimer(); // detele 取消倒计时
				} else if (e.keyCode === 27) {
					// esc关闭消息
					if (!this.closed) {
						this.close();
					}
				} else {
					this.startTimer(); // 恢复倒计时
				}
			}
		},
		mounted() {
			if (this.duration > 0) {
				this.timer = setTimeout(() => {
					if (!this.closed) {
						this.close();
					}
				}, this.duration);
			}
			document.addEventListener("keydown", this.keydown);
		},
		beforeDestroy() {
			document.removeEventListener("keydown", this.keydown);
		}
	});
}
</script>
<style lang="less">
.el-notification {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	width: 330px;
	padding: 14px 26px 14px 13px;
	border-radius: 8px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	border: 1px solid var(--el-border-color-lighter);
	position: fixed;
	background-color: #fff;
	-webkit-box-shadow: var(--normal-box-shadow);
	box-shadow: var(--normal-box-shadow);
	-webkit-transition:
		opacity 0.3s,
		left 0.3s,
		right 0.3s,
		top 0.4s,
		bottom 0.3s,
		-webkit-transform 0.3s;
	transition:
		opacity 0.3s,
		left 0.3s,
		right 0.3s,
		top 0.4s,
		bottom 0.3s,
		-webkit-transform 0.3s;
	transition:
		opacity 0.3s,
		transform 0.3s,
		left 0.3s,
		right 0.3s,
		top 0.4s,
		bottom 0.3s;
	transition:
		opacity 0.3s,
		transform 0.3s,
		left 0.3s,
		right 0.3s,
		top 0.4s,
		bottom 0.3s,
		-webkit-transform 0.3s;
	overflow: hidden;
}

.el-notification.right {
	right: 16px;
}

.el-notification.left {
	left: 16px;
}

.el-notification__group {
	margin-left: 13px;
	margin-right: 8px;
}

.el-notification__title {
	font-weight: 700;
	font-size: 16px;
	color: var(--el-text-color-primary);
	margin: 0;
}

.el-notification__content {
	font-size: 14px;
	line-height: 21px;
	margin: 6px 0 0;
	color: var(--el-text-color-regular);
	text-align: justify;
	word-break: break-all;
}

.el-notification__content p {
	margin: 0;
}

.el-notification__icon {
	height: 24px;
	width: 24px;
	font-size: 24px;
}

.el-notification__closeBtn {
	position: absolute;
	top: 18px;
	right: 15px;
	cursor: pointer;
	color: var(--el-text-color-secondary);
	font-size: 16px;
}

.el-notification__closeBtn:hover {
	color: var(--el-text-color-regular);
}

.el-notification .el-icon-success {
	color: var(--el-color-success);
}

.el-notification .el-icon-error {
	color: var(--el-color-error);
}

.el-notification .el-icon-info {
	color: var(--el-text-color-secondary);
}

.el-notification .el-icon-warning {
	color: var(--el-color-warning);
}

.el-notification-fade-enter.right {
	right: 0;
	-webkit-transform: translateX(100%);
	transform: translateX(100%);
}

.el-notification-fade-enter.left {
	left: 0;
	-webkit-transform: translateX(-100%);
	transform: translateX(-100%);
}
</style>

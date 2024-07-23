<style lang="less">
.el-message {
	min-width: 380px;
	box-sizing: border-box;
	border-width: 1px;
	border-style: solid;
	border-color: var(--el-border-color-lighter);
	position: fixed;
	left: 50%;
	top: 20px;
	transform: translateX(-50%);
	background-color: #edf2fc;
	transition:
		opacity 0.3s,
		transform 0.4s,
		top 0.4s;
	padding: 15px 15px 15px 20px;
	display: flex;
	align-items: center;

	p {
		margin: 0;
	}

	&.is-closable {
		.el-message__content {
			padding-right: 16px;
		}
	}

	&.is-center {
		justify-content: center;
	}

	&.el-message--info {
		background-color: var(--xAlert-info-light-bg-color);
		border-color: var(--xMessage-info-border-color, var(--el-color-info-light-8));
		.el-message__content {
			color: var(--xAlert-info-light-color);
		}
	}

	&.el-message--success {
		background-color: var(--xAlert-success-light-bg-color);
		border-color: var(--xMessage-success-border-color, var(--el-color-success-light-8));
		.el-message__content {
			color: var(--xAlert-success-light-color);
		}
	}

	&.el-message--warning {
		background-color: var(--xAlert-warning-light-bg-color);
		border-color: var(--xMessage-warning-border-color, var(--el-color-warning-light-8));
		.el-message__content {
			color: var(--xAlert-warning-light-color);
		}
	}

	&.el-message--error {
		background-color: var(--xAlert-error-light-bg-color);
		border-color: var(--xMessage-error-border-color, var(--el-color-error-light-8));

		.el-message__content {
			color: var(--xAlert-error-light-color);
		}
	}

	.el-message__icon {
		margin-right: 10px;
	}

	.el-message__content {
		padding: 0;
		font-size: 14px;
		line-height: 1;
	}

	.el-message__closeBtn {
		position: absolute;
		top: 50%;
		right: 15px;
		transform: translateY(-50%);
		cursor: pointer;
		color: var(--xAlert-close-btn-color);
		font-size: 16px;

		&:hover {
			color: var(--el-text-color-secondary);
		}
	}

	.el-icon- {
		&success {
			color: var(--el-color-success);
		}

		&error {
			color: var(--el-color-error);
		}

		&info {
			color: var(--el-text-color-secondary);
		}

		&warning {
			color: var(--el-color-warning);
		}
	}

	.el-message-fade-enter,
	.el-message-fade-leave-active {
		opacity: 0;
		-webkit-transform: translate(-50%, -100%);
		transform: translate(-50%, -100%);
	}
}
</style>
<template>
	<transition name="el-message-fade" @after-leave="handleAfterLeave">
		<div
			:class="cptClass"
			:style="positionStyle"
			v-show="visible"
			@mouseenter="clearTimer"
			@mouseleave="startTimer"
			role="alert">
			<i :class="iconClass" v-if="iconClass"></i>
			<i :class="typeClass" v-else></i>
			<xRender :render="msgRender" />
			<i v-if="showClose" class="el-message__closeBtn el-icon-close" @click="close"></i>
		</div>
	</transition>
</template>
<script lang="ts">
export default async function () {
	const typeMap = {
		success: "success",
		info: "info",
		warning: "warning",
		error: "error"
	};

	return defineComponent({
		data() {
			return {
				visible: false,
				message: "",
				duration: 3000,
				type: "info",
				iconClass: "",
				customClass: "",
				onClose: null,
				showClose: false,
				closed: false,
				verticalOffset: 20,
				timer: null,
				dangerouslyUseHTMLString: false,
				center: false
			};
		},

		computed: {
			cptClass() {
				const { type, iconClass, center, showClose, customClass } = this;
				return [
					"el-message",
					type && !iconClass ? `el-message--${type}` : "",
					center ? "is-center" : "",
					showClose ? "is-closable" : "",
					customClass
				];
			},
			typeClass() {
				return this.type && !this.iconClass
					? `el-message__icon el-icon-${typeMap[this.type]}`
					: "";
			},
			positionStyle() {
				return {
					top: `${this.verticalOffset}px`
				};
			}
		},

		watch: {
			closed(newVal) {
				if (newVal) {
					this.visible = false;
				}
			}
		},

		methods: {
			msgRender() {
				const { dangerouslyUseHTMLString, message } = this;
				if (dangerouslyUseHTMLString) {
					return h("p", {
						class: "el-message__content",
						domProps: { innerHTML: message }
					});
				} else {
					let children;
					if (_.isFunction(message)) {
						children = message.call();
					} else {
						children = message;
					}
					return h("p", {
						class: "el-message__content",
						children
					});
				}
			},
			handleAfterLeave() {
				this.$destroy(true);
				this.$el.parentNode.removeChild(this.$el);
			},

			close() {
				this.closed = true;
				if (typeof this.onClose === "function") {
					this.onClose(this);
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
				if (e.keyCode === 27) {
					// esc关闭消息
					if (!this.closed) {
						this.close();
					}
				}
			}
		},
		mounted() {
			this.startTimer();
			document.addEventListener("keydown", this.keydown);
		},
		beforeDestroy() {
			document.removeEventListener("keydown", this.keydown);
		}
	});
}
</script>

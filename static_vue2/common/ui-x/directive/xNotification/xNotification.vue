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
			<i
				class="el-notification__icon"
				:class="[typeClass, iconClass]"
				v-if="type || iconClass">
			</i>
			<div class="el-notification__group" :class="{ 'is-with-icon': typeClass || iconClass }">
				<h2 class="el-notification__title" v-text="title"></h2>
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
		data() {
			return {
				visible: false,
				title: "",
				message: "",
				duration: 4500,
				type: "",
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
			wrapperClass() {
				return this.type ? `xNotification ${this.type}` : "xNotification";
			},
			typeClass() {
				return this.type && typeMap[this.type] ? `el-icon-${typeMap[this.type]}` : "";
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
<style lang="less"></style>

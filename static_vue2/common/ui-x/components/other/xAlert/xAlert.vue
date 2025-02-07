<style lang="less">
.el-alert.x-alert {
	width: 100%;
	padding: 8px 16px;
	margin: 0;
	box-sizing: border-box;
	border-radius: var(--xAlert-border-radius);
	position: relative;
	background-color: var(--xAlert-color);
	// overflow: hidden;
	opacity: 1;
	display: flex;
	align-items: center;
	transition: opacity 0.2s;

	&.is-light {
		.el-alert__closebtn {
			color: var(--xAlert-close-btn-color);
		}
	}

	&.is-dark {
		.el-alert__description,
		.el-alert__closebtn {
			color: var(--xAlert-color);
		}
	}

	&.is-center {
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
	}

	.el-alert__description {
		font-size: 12px;
		margin: 5px 0 0;
	}

	&.el-alert {
		&--info {
			&.is-light {
				background-color: var(--xAlert-info-light-bg-color);
				color: var(--xAlert-info-light-color);

				.el-alert__description {
					color: var(--xAlert-info-light-color);
				}
			}

			&.is-dark {
				background-color: var(--xAlert-info-light-color);
				color: var(--xAlert-color);
			}
		}

		&--success {
			&.is-light {
				background-color: var(--xAlert-success-light-bg-color);
				color: var(--xAlert-success-light-color);
				.el-alert__description {
					color: var(--xAlert-success-light-color);
				}
			}
			&.is-dark {
				background-color: var(--xAlert-success-light-color);
				color: var(--xAlert-color);
			}
		}

		&--warning {
			&.is-light {
				background-color: var(--xAlert-warning-light-bg-color);
				color: var(--xAlert-warning-light-color);
				.el-alert__description {
					color: var(--xAlert-warning-light-color);
				}
			}

			&.is-dark {
				background-color: var(--xAlert-warning-light-color);
				color: var(--xAlert-color);
			}
		}

		&--error {
			&.is-light {
				background-color: var(--xAlert-error-light-bg-color);
				color: var(--xAlert-error-light-color);

				.el-alert__description {
					color: var(--xAlert-error-light-color);
				}
			}

			&.is-dark {
				background-color: var(--xAlert-error-light-color);
				color: var(--xAlert-color);
			}
		}
	}
}

.el-alert__content {
	display: table-cell;
	padding: 0 8px;
}

.el-alert__icon {
	font-size: 16px;
	width: 16px;
	&.is-big {
		font-size: 28px;
		width: 28px;
	}
}

.el-alert__title {
	font-size: 13px;
	line-height: 18px;
	&.is-bold {
		font-weight: 700;
	}
}

.el-alert__closebtn {
	font-size: 12px;
	opacity: 1;
	position: absolute;
	top: 12px;
	right: 15px;
	cursor: pointer;
	&.is-customed {
		font-style: normal;
		font-size: 13px;
		top: 9px;
	}
}

.el-alert-fade-enter,
.el-alert-fade-leave-active,
.el-loading-fade-enter,
.el-loading-fade-leave-active,
.el-notification-fade-leave-active {
	opacity: 0;
}
</style>
<template>
	<transition name="el-alert-fade">
		<div
			class="el-alert x-alert"
			:class="[typeClass, center ? 'is-center' : '', 'is-' + effect]"
			v-show="visible"
			role="alert">
			<xIcon :icon="iconName" v-if="showIcon" :class="['alert__icon', iconName, isBigIcon]" />
			<div class="el-alert__content">
				<span class="el-alert__title" :class="[isBoldTitle]" v-if="title || $slots.title">
					<slot name="title">{{ title }}</slot>
				</span>
				<p class="el-alert__description" v-if="$slots.default && !description">
					<slot></slot>
				</p>
				<p class="el-alert__description" v-if="description && !$slots.default">
					{{ description }}
				</p>
				<xIcon
					icon="close"
					:class="cptCloseClassName"
					v-show="closable && !closeText"
					@click="close()" />
				<span v-show="closeText" :class="cptCloseClassName">{{ closeText }}</span>
			</div>
		</div>
	</transition>
</template>
<script lang="ts">
export default async function () {
	const TYPE_CLASSES_MAP = {
		success: "el-icon-success",
		warning: "el-icon-warning",
		error: "el-icon-error"
	};

	return defineComponent({
		name: "xAlert",
		props: {
			title: {
				type: String,
				default: ""
			},
			description: {
				type: String,
				default: ""
			},
			type: {
				type: String,
				default: "info"
			},
			closable: {
				type: Boolean,
				default: true
			},
			closeText: {
				type: String,
				default: ""
			},
			showIcon: Boolean,
			center: Boolean,
			effect: {
				type: String,
				default: "light",
				validator: function (value) {
					return ["light", "dark"].indexOf(value) !== -1;
				}
			}
		},

		data() {
			return {
				visible: true
			};
		},

		methods: {
			close() {
				this.visible = false;
				this.$emit("close");
			}
		},

		computed: {
			cptCloseClassName({ closeText }) {
				return [
					"el-alert__closebtn",
					{
						"is-customed": closeText !== "",
						"el-icon-close": closeText === ""
					}
				];
			},
			typeClass() {
				return `el-alert--${this.type}`;
			},

			iconName() {
				return TYPE_CLASSES_MAP[this.type] || "info-filled";
			},

			isBigIcon() {
				return this.description || this.$slots.default ? "is-big" : "";
			},

			isBoldTitle() {
				return this.description || this.$slots.default ? "is-bold" : "";
			}
		}
	});
}
</script>

<template>
	<div :class="['el-card xCard flex vertical', cptCardClass]">
		<div class="el-card__header width100" v-if="$slots.header || header">
			<xRender :render="$slots.header || header" />
		</div>
		<div :class="cptBodyClass" :style="bodyStyle">
			<slot></slot>
		</div>
	</div>
</template>
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return defineComponent({
		name: "xCard",
		props: {
			header: {},
			bodyStyle: {},
			bodyClass: {},
			shadow: {
				type: String
			}
		},
		setup() {
			const state = reactive({
				defaultClass: "is-always-shadow"
			});

			(() => {
				function onThemeChange() {
					const { theme } = PRIVATE_GLOBAL.x_ui;

					if (theme && onThemeChange.old_theme !== theme) {
						onThemeChange.old_theme = theme;

						const x_ui_collection = PRIVATE_GLOBAL.x_ui_collection || {};
						const configs = x_ui_collection[theme] || {};
						const x_card = configs.x_card || {};

						const { defaultClass } = x_card;

						if (_.isString(defaultClass) && defaultClass !== state.defaultClass) {
							state.defaultClass = defaultClass;
						} else {
							state.defaultClass = "is-always-shadow";
						}
					}
				}

				$(window).on(`x_ui_theme_change.${this._uid}`, onThemeChange);
				onBeforeUnmount(() =>
					$(window).off(`x_ui_theme_change.${this._uid}`, onThemeChange)
				);
				onThemeChange();
			})();

			return { state };
		},
		computed: {
			cptCardClass() {
				if (this.shadow) {
					return `is-${this.shadow}-shadow`;
				} else {
					return this.state.defaultClass;
				}
			},
			cptBodyClass() {
				return ["el-card__body flex1", this.bodyClass || {}];
			}
		}
	});
}
</script>
<style lang="less">
.xCard {
	.el-card__body {
		position: relative;
	}
}

.el-card {
	border: 1px solid var(--el-border-color-lighter);
	background-color: #fff;
	color: var(--el-text-color-primary);
	-webkit-transition: 0.3s;
	transition: 0.3s;
}

.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
	-webkit-box-shadow: var(--normal-box-shadow);
	box-shadow: var(--normal-box-shadow);
}

.el-card__header {
	padding: 18px 20px;
	border-bottom: 1px solid var(--el-border-color-lighter);
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.el-card__body {
	padding: var(--ui-card-body-padding);
}
</style>

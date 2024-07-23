<style lang="less">
.heightAuto {
	height: auto !important;
}
.x-page-view {
	display: flex;
	flex-flow: column nowrap;
	height: 100%;
	justify-content: center;
	> .page-body {
		background-color: transparent;
	}
}

.xPageContent {
	height: 100%;
	padding: var(--ui-one);
	flex: 1;
	overflow: hidden;
	align-items: center;
	display: flex;
	position: relative;
	flex-flow: row nowrap;

	> .xPageContentAffix {
		height: 100%;
	}

	&[no-border] {
		> .inner-wrapper {
			box-shadow: unset;
			> .page-body {
				background: transparent;
				padding: 0;
			}
		}
	}

	> .inner-wrapper {
		margin: auto;
		height: 100%;
		overflow: hidden;
		flex: 1;
		border-radius: var(--border-radius);
		// box-shadow: var(--el-box-shadow);

		> .page-header {
			background: var(--el-color-white);
		}

		> .page-body {
			flex: 1;
			display: flex;
			flex-flow: column nowrap;
			height: 1px;
			overflow: auto;
			padding: var(--ui-one);
			background: var(--el-color-white);
		}
	}

	footer {
		border-top: 1px solid var(--el-border-color-lighter);
		padding: var(--ui-one);
		background: var(--el-color-white);
	}
}
</style>

<template>
	<div class="xPageContent">
		<div class="inner-wrapper flex vertical">
			<div class="page-header pt pr pl" v-if="cptIsShowTop">
				<slot name="top" />
			</div>
			<div class="el-card__header page-header" v-if="cptIsShowHeader">
				<slot name="header">
					<span>{{ cptHeader }}</span>
				</slot>
			</div>
			<div class="page-body">
				<slot />
			</div>
			<footer v-if="cptIsShowFooter">
				<slot name="footer" />
			</footer>
		</div>
		<div class="xPageContentAffix x-padding" v-if="$slots.affix"><slot name="affix" /></div>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		props: ["title", "header", "footer"],
		setup(props) {
			return {
				xCardStyle: `min-width: 200px;
margin: var(--ui-one);
max-height:calc(100vh - 200px);
overflow:auto;`
			};
		},
		computed: {
			cptNoBorder() {
				return hasOwn(this.$attrs, "no-border");
			},
			cptIsShowTop() {
				if (this.$slots.top) {
					return true;
				}
				return false;
			},
			cptIsShowHeader() {
				if (this.$slots.header) {
					return true;
				}
				if (this.cptHeader) {
					return true;
				}
				return false;
			},
			cptIsShowFooter() {
				if (this.$slots.footer) {
					return true;
				}
				if (this.cpt_footer) {
					return true;
				}
				return false;
			},
			cptHeader() {
				if (this.header) {
					return i18n(this.header);
				}
				return "";
			},
			cpt_footer() {
				if (this.footer) {
					return i18n(this.footer);
				}
				return "";
			}
		},
		methods: {
			async scrollTo(selector) {
				let $target;
				await _.$ensure(() => {
					$target = $(this.$el).find(selector);
					return $target;
				}, 1000 * 3);

				try {
					$target[0].scrollIntoView({ behavior: "smooth", block: "center" });
				} catch (e) {
					console.error(e);
				}
			}
		}
	};
}
</script>

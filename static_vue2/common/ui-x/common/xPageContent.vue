<template>
	<div class="xPageContent">
		<div class="inner-wrapper flex vertical">
			<div class="el-card__header page-header" v-if="cpt_isShowHeader">
				<slot name="header">
					<span>{{ cpt_header }}</span>
				</slot>
			</div>
			<div class="page-body flex vertical">
				<slot />
			</div>
			<footer v-if="cpt_isShowFooter">
				<slot name="footer" />
			</footer>
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		props: ["title", "header", "footer"],
		computed: {
			cpt_isShowHeader() {
				if (this.$slots.header) {
					return true;
				}
				if (this.cpt_header) {
					return true;
				}
				return false;
			},
			cpt_isShowFooter() {
				if (this.$slots.footer) {
					return true;
				}
				if (this.cpt_footer) {
					return true;
				}
				return false;
			},
			cpt_header() {
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

<style lang="less">
.xPageContent {
	height: 100%;
	padding: var(--ui-one);
	flex: 1;
	overflow: hidden;
	align-items: center;

	> .inner-wrapper {
		margin: auto;
		height: 100%;
		overflow: hidden;
		flex: 1;
		border-radius: var(--border-radius);
		box-shadow: var(--el-box-shadow);

		> .page-header {
			background: var(--el-color-white);
		}

		> .page-body {
			flex: 1;
			padding: var(--ui-one);
			height: 100%;
			overflow: auto;
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

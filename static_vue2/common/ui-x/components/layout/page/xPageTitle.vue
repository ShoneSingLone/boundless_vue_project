<style lang="less">
.xPageTitle {
	--xPageTitle-back-color: var(--ti-base-color-white);
	--xPageTitle-back-bg: var(--ti-base-color-common-6);

	height: var(--xPageTitle-height, 48px);
	font-size: 18px;
	padding: var(--xPageTitle-padding, var(--ui-one));
	padding-bottom: 0;
	color: var(--el-text-color-primary);
	.title-text {
		// text-shadow: 0.4px 1px 2px #a5a5a5;
		// text-shadow: 1px 1px 1px var(--el-color-black);
		// text-shadow: 0.4px 1px 2px var(--el-color-black);
	}

	&.back {
		font-size: 14px;
		color: var(--xPageTitle-back-color);
		background-color: var(--xPageTitle-back-bg);
		padding: var(--ui-one);
	}
}
</style>
<template>
	<div class="xPageTitle back" v-if="back">
		<div class="xPageTitle__left flex middle pointer" @click="back">
			<i class="el-icon-back mr"></i>
			<div class="xPageTitle__title flex middle">
				<slot name="title">
					<xRender :render="cptTitle" :payload="title" />
				</slot>
			</div>
		</div>
		<div class="xPageTitle__content" v-if="content">
			<slot name="content">{{ content }}</slot>
		</div>
	</div>
	<div class="flex middle xPageTitle" v-else>
		<slot name="title">
			<span class="title-text mr4"> <xRender :render="cptTitle" :payload="title" /> </span>
			<xIcon icon="tips" v-if="tips" v-xtips="cptTips" />
		</slot>
		<span class="flex1"> </span>
		<slot />
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		props: ["title", "tips", "back", "content", "breadcrumb"],
		computed: {
			cptTips() {
				return { content: this.tips, width: 200, trigger: "hover", placement: "right-end" };
			},
			cptTitle() {
				if (_.isFunction(this.breadcrumb)) {
					return this.breadcrumb;
				}
				return this.title;
			}
		}
	};
}
</script>

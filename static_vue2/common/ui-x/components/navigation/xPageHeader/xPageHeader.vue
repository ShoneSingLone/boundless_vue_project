<template>
	<div class="el-page-header xPageHeader">
		<div class="el-page-header__left flex middle" @click="$emit('back')">
			<xIcon :icon="cptBackIcon" class="mr4" />
			<div class="el-page-header__title">
				<slot name="title">{{ title }}</slot>
			</div>
		</div>
		<div class="el-page-header__content">
			<slot name="content">{{ content }}</slot>
		</div>
	</div>
</template>
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return defineComponent({
		name: "ElPageHeader",
		props: {
			title: {
				type: String,
				default() {
					return i18n("el.pageHeader.title");
				}
			},
			content: String,
			backIcon: String
		},
		computed: {
			cptBackIcon() {
				return this.backIcon || PRIVATE_GLOBAL.x_page_title_back_icon;
			}
		}
	});
}
</script>

a
<template>
	<div class="margin16">
		<xMd :md="'Tag 组件提供了三个不同的主题：`dark`、`light` 和 `plain`。通过设置`effect`属性来改变主题，默认为 `light`'" />
		<div class="tag-group">
			<span class="tag-group__title">Dark</span>
			<xTag v-for="item in items" :key="item.label" :type="item.type" effect="dark" class="mr4">
				{{ item.label }}
			</xTag>
		</div>
		<div class="tag-group mt16">
			<span class="tag-group__title">Plain</span>
			<xTag v-for="item in items" :key="item.label" :type="item.type" effect="plain" class="mr4">
				{{ item.label }}
			</xTag>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				items: [
					{ type: "", label: "标签一" },
					{ type: "success", label: "标签二" },
					{ type: "info", label: "标签三" },
					{ type: "danger", label: "标签四" },
					{ type: "warning", label: "标签五" }
				]
			};
		}
	});
}
</script>

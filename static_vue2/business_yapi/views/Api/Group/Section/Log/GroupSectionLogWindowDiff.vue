<template>
	<xDialog>
		<div class="flex vertical flex1" id="ViewApiModify">
			<div class="padding20">
				<xAlert title="注： 绿色代表新增内容，红色代表删除内容" type="info" closable class="width100" />
			</div>
			<div class="project-interface-change-content flex1 padding20">
				<xRender :render="renderContentItem" />
			</div>
		</div>
		<template #footer>
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>

<script lang="ts">
export default async function ({ diffView }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");

	return {
		inject: ["APP"],
		props: useDialogProps(),
		methods: {
			renderContentItem() {
				if (diffView.length === 0) {
					return h("YapiPlaceholderView", { view: "GroupSectionLogWindowDiff" });
				} else {
					return _.map(diffView, (item, index) => {
						if (!item.content) {
							return null;
						}
						return h("div", { class: "item-content" }, [h("h3", { class: "title" }, [item.title]), h("div", { domProps: { innerHTML: item.content } })]);
					});
				}
			}
		}
	};
}
</script>

<style lang="less"></style>

<style lang="less">
#NoteSection {
	width: 1px;
}
</style>
<template>
	<section class="page-view flex1" id="NoteSection">
		<xPageContent>
			<div class="flex mb10 middle" style="height: 48px">
				<xRender :render="vDomTitle" class="flex1" />
				<xGap l />
				<xBtn :configs="btnSave" />
				<xBtn :configs="btnCancel" />
			</div>
			<!--      <div class="flex1-overflow-auto" style="width: 50vw;">{{ inject_note.cptCurrentWiki }}</div>-->
			<TuiEditor :value="inject_note.cptCurrentWiki" :asRender="!isShowEditor" @change="onMarkdownChange" />
		</xPageContent>
	</section>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "inject_note"],
		data() {
			const vm = this;
			return {
				markdown: "",
				title: "",
				editingWikiTitle: "",
				isShowEditor: false,
				form: defItems({
					titleConfigs: {
						placeholder: "文档名称",
						onEmitValue({ val }) {
							vm.editingWikiTitle = val;
						}
					}
				})
			};
		},
		computed: {
			btnSave() {
				const vm = this;
				return {
					label: vm.isShowEditor ? "保存" : "修改",
					preset: "blue",
					async onClick() {
						if (vm.isShowEditor) {
							await vm.save();
						} else {
							vm.editingWikiTitle = vm.inject_note.cptCurrentWiki?.title || "";
						}
						vm.isShowEditor = !vm.isShowEditor;
					}
				};
			},
			btnCancel() {
				const vm = this;
				return {
					label: "取消",
					isHide() {
						return !vm.isShowEditor;
					},
					onClick() {
						vm.isShowEditor = false;
					}
				};
			}
		},
		methods: {
			onMarkdownChange({ md }) {
				this.markdown = md;
			},
			async save() {
				const vm = this;
				try {
					_.$loading(true);
					const params = _.merge(
						{},
						vm.inject_note.currentWiki,
						{
							markdown: vm.markdown
						},
						{ title: vm.editingWikiTitle }
					);
					await _api.yapi.wikiUpsertOne(params);
					vm.inject_note.currentWiki = {};
					await vm.inject_note.updateWikiMenuList();
					await vm.inject_note.updateCurrentWiki();
					_.$msgSuccess("保存成功");
				} catch (error) {
					console.error(error);
				} finally {
					_.$loading();
				}
			},
			vDomTitle() {
				const vm = this;
				if (vm.isShowEditor) {
					const itemProps = {
						style: "flex1",
						configs: vm.form.titleConfigs,
						value: vm.editingWikiTitle || ""
					};
					return h("xItem", itemProps);
				} else {
					return h(
						"span",
						{
							class: "ml",
							style: "font-weight:700;font-size:18px;"
						},
						[vm.inject_note.cptCurrentWiki.title]
					);
				}
			}
		}
	});
}
</script>

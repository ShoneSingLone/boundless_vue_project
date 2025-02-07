<style lang="less">
#NoteSection {
	width: 1px;
}
</style>
<template>
	<section class="x-page-view flex1 flash-when" id="NoteSection">
		<xPageContent>
			<div class="flex mb10 middle" style="height: 48px">
				<xRender :render="vDomTitle" class="flex1" />
				<xGap l />
				<xBtn :configs="btnSave" />
				<xBtn :configs="btnCancel" />
			</div>
			<!--      <div class="flex1-overflow-auto" style="width: 50vw;">{{ inject_note.cptCurrentWiki }}</div>-->
			<TuiEditor
				:value="inject_note.cptCurrentWiki"
				:asRender="!inject_note.isShowEditor"
				@change="onMarkdownChange" />
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
		watch: {
			"inject_note.cptCurrentWiki"() {
				const vm = this;
				vm.markdown = vm.inject_note.cptCurrentWiki?.markdown || "";
				vm.title = vm.inject_note.cptCurrentWiki?.title || "";
			}
		},
		computed: {
			btnSave() {
				const vm = this;
				return {
					label: vm.inject_note.isShowEditor ? "保存" : "修改",
					preset: "blue",
					disabled() {
						if (!vm.inject_note.cptCurrentWiki._id) {
							return "当前无可编辑文档";
						}
					},
					async onClick() {
						if (vm.inject_note.isShowEditor) {
							await vm.save();
						} else {
							vm.editingWikiTitle = vm.inject_note.cptCurrentWiki?.title || "";
						}
						vm.inject_note.isShowEditor = !vm.inject_note.isShowEditor;
					}
				};
			},
			btnCancel() {
				const vm = this;
				return {
					label: "取消",
					isHide() {
						return !vm.inject_note.isShowEditor;
					},
					async onClick() {
						vm.inject_note.isShowEditor = false;
						vm.inject_note.currentWiki = {};
						await vm.inject_note.updateWikiMenuList();
						await vm.inject_note.updateCurrentWiki();
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
					await _api.yapi.wiki_upsert_one(params);
					vm.inject_note.currentWiki = {};
					await vm.inject_note.updateWikiMenuList();
					await vm.inject_note.updateCurrentWiki();
					_.$msg("保存成功");
				} catch (error) {
					console.error(error);
				} finally {
					_.$loading();
				}
			},
			vDomTitle() {
				const vm = this;
				if (vm.inject_note.isShowEditor) {
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

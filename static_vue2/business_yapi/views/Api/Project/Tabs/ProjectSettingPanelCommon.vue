<template>
	<div class="flex vertical height100 overflow-auto">
		<xBlock class="flex1">
			<xForm col="1" style="--xItem-wrapper-width: 446px; --xItem-label-width: 220px">
				<xItem :configs="form.img" />
				<xItem :configs="form.group_id" />
				<xItem :configs="form.name" />
				<!-- <xItem :configs="form.icon" /> -->
				<!-- <xItem :configs="form.color" /> -->
				<xItem :configs="form.basepath" span="full" />
				<xItem :configs="form.desc" span="full" />
				<xItem :configs="form.project_type" />
				<xItem :configs="form.proxyHostPort" span="full" />
				<xItem :configs="form.strice" />
				<xItem :configs="form.is_json5" />
				<xItem :configs="form.switch_notice" />
				<xGap />
				<div>
					<xBtn :configs="configsBtnOpenUpsertTagDialog" />
					<xBtn :configs="configsBtnOpenProxyEnvDialog" />
					<xBtn :configs="btnDeleteProject" />
				</div>
			</xForm>
		</xBlock>
		<div class="flex middle mt">
			<xGap f />
			<xBtn :configs="btnSave" />
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	const [{ useTabName }, { useProjectForm }] = await _.$importVue([
		"/common/utils/hooks.vue",
		"@/views/Api/Group/Section/ProjectList/GroupSectionProjectListAddProject.vue"
	]);

	return {
		name: "ProjectSettingPanelCommonVue",
		inject: ["APP", "inject_project"],
		components: {},
		setup() {
			const cptProjectSettingTab = useTabName({
				vm: this,
				propName: "project_setting_tab",
				defaultName: "1"
			});
			return {
				cptProjectSettingTab
			};
		},
		data() {
			const vm = this;
			const { group_id, name, basepath, desc, project_type } = useProjectForm(vm);
			const p = vm.APP.cptProject;
			group_id.value = vm.APP.cptGroupId;

			return {
				form: defItems({
					img: {
						value: p._id || "",
						usedBy: "project",
						itemType: "YapiItemAvatar",
						label: i18n("头像")
					},
					group_id: {
						...group_id,
						value: String(p.group_id)
					},
					name: {
						...name,
						value: p.name
					},
					basepath: {
						...basepath,
						value: p.basepath
					},
					desc: {
						...desc,
						value: p.desc || ""
					},
					project_type: {
						...project_type,
						value: p.project_type
					},
					proxyHostPort: {
						value: p.proxyHostPort || "",
						label: "代理服务器地址",
						tips: () =>
							hDiv([
								hDiv(["如果请求需要使用VPN，则需要有一台开启VPN的PC作为代理机。"]),
								hDiv([
									"利用",
									h(
										"a",
										{
											class: "pointer",

											attrs: {
												href: "https://wproxy.org/whistle/",
												target: "_blank"
											}
										},
										[h("b", { style: { color: "green" } }, ["whistle"])]
									),
									"可以开启代理服务http://loclhost:8899"
								])
							]),
						placeholder: "ip:port"
					},
					strice: {
						itemType: "xItemSwitch",
						label: "mock严格模式",
						tips: "开启后 moc 请求会对 query，body form 的必须字段和 json schema 进行校验",
						value: !!p.strice
					},
					is_json5: {
						itemType: "xItemSwitch",
						label: "开启json5",
						tips: "开启后可在接口 body 和返回值中写 json 字段",
						value: !!p.is_json5
					},
					switch_notice: {
						itemType: "xItemSwitch",
						label: "默认开启消息通知",
						value: !!p.switch_notice
					}
				})
			};
		},
		computed: {
			btnDeleteProject() {
				const vm = this;
				return {
					label: "删除项目",
					preset: "danger",
					icon: "fa fa-trash",
					onClick: () => {
						_.$confirm({
							title: "请慎重操作！",
							content: () => {
								return h(
									"xAlert",
									{ type: "error", showIcon: true, closable: false },
									[
										hDiv({ class: "flex vertical" }, [
											h(
												"div",
												{
													class: "card-danger-content"
												},
												[
													h("p", [
														"此操作非常危险,会删除该项目下面所有接口"
													]),
													h("p", ["项目一旦删除，将无法恢复数据"]),
													h("p", ["只有组长和管理员有权限删除项目。"])
												]
											)
										])
									]
								);
							}
						}).then(async () => {
							try {
								const res = await _api.yapi.project_del({
									id: vm.APP.cptProjectId
								});
								if (res.errcode === 0) {
									await vm.APP.updateGroupList();
									vm.$router.push({
										path: "/api/group",
										query: {}
									});
									_.$msg("删除成功");
								} else {
									throw new Error(res.message);
								}
							} catch (error) {
								_.$msgError(error);
							}
						});
					}
				};
			},
			configsBtnOpenUpsertTagDialog() {
				return {
					label: i18n("管理接口Tags"),
					async onClick() {}
				};
			},
			configsBtnOpenProxyEnvDialog() {
				return {
					label: i18n("管理转发环境"),
					onClick: async () => {
						_.$openModal(
							{
								title() {
									return h({
										template: `
<div class="flex middle">
	{{i18n("管理转发环境")}}			
	<xPopover placement="top-start"  width="600" trigger="hover">
		<xMd :md="mdTips" />
        <xIcon icon="tips" slot="reference"/>
    </xPopover>
</div>`,
										data() {
											return {
												mdTips: `
- 新增时，不需要填写\`_id\`；保存之后会带出来
- \`cookie\` 也在\`header\`中,value为cookie的值

> 环境变量数据结构如下：
\`\`\`js
[
        {
			"name" : "local",
			"domain" : "http://127.0.0.1",
            "header" : [
                { "name" : "x-auth-token", "value" : "*******" },
                { "name" : "Cookie", "value" : "key=val;key2=val2" }
            ],
            "global" : [
                { "name" : "token", "value" : "######" }
            ]
        }
]
\`\`\`
`
											};
										}
									});
								},
								url: "@/components/YapiItemProxyEnvManager.vue",
								parent: this
							},
							{ fullscreen: true }
						);
					}
				};
			},
			btnSave() {
				return {
					label: "更新",
					preset: "blue",
					onClick: async () => {
						const [atLeastOne] = await _.$validateForm(this.$el);
						if (atLeastOne) {
							return;
						}
						this.update();
					}
				};
			},
			cptParams() {
				return _.$pickFormValues(this.form);
			}
		},
		methods: {
			async update() {
				try {
					const dataForm = {
						...this.cptParams,
						id: this.APP.cptProjectId
					};
					await _api.yapi.project_update(dataForm);
					this.APP.updateGroupProjectList();
					_.$msg("更新成功");
				} catch (error) {
					_.$msgError(error);
				}
			}
		}
	};
}
</script>

<style scoped lang="scss"></style>

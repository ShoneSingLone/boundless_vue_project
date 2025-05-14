<template>
	<xDialog id="YapiItemProxyEnvManager">
		<div class="flex height100">
			<aside class="mr height100 flex vertical">
				<div class="flex middle">
					<h1>环境列表</h1>
					<xGap f />
					<xIcon icon="_add" class="pointer" @click="addNewEnv" />
				</div>
				<ul class="flex1 overflow-auto env-item-wrapper">
					<li
						v-for="item in cptOptions"
						class="flex vertical env-item pointer"
						:key="item.value"
						:data-name="item.name"
						:data-id="item._id"
						@click="currentEnvId = item._id">
						<div class="env-item-inner">
							<div class="flex middle">
								<div>{{ item.name }}</div>
								<xGap f />
								<xIcon icon="_delete" class="pointer" @click="removeEnv(item)" />
							</div>
							<div>{{ item.domain }}</div>
						</div>
					</li>
				</ul>
			</aside>
			<main class="height100 flex vertical flex1">
				<div class="flex1 overflow-auto">
					<h1>{{ cptCurrentEnv?.name }}</h1>
					<xTabs v-model="panelType">
						<xTabPane label="属性" name="properties">
							<xForm col="1">
								<xItem :configs="form.name" />
								<xItem :configs="form.domain" />
								<xItem :configs="form.header" />
								<xItem :configs="form.Cookie" />
								<xItem :configs="form.global" />
							</xForm>
						</xTabPane>
						<xTabPane label="JSON" name="json"
							><xItem
								:configs="form.editor"
								@save="btnOk.onClick"
								style="height: 500px; --xItem-wrapper-width: 100%"
						/></xTabPane>
					</xTabs>
				</div>
			</main>
		</div>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn :configs="btnCancel">{{ i18n("cancel") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({}) {
	/* 必要，混入"closeModal", "$layerMax", "$layerMin", "$layerRestore" */
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		inject: ["APP"],
		props: useDialogProps(),
		data() {
			return {
				panelType: "properties",
				currentEnvId: "",
				form: defItems({
					name: { label: "name", value: "", rules: [_rules.required()] },
					domain: { label: "domain", value: "", rules: [_rules.required()] },
					header: {
						label: "header",
						value: [],
						itemType: "YapiItemKeyValTable"
					},
					Cookie: { label: "Cookie", value: [], itemType: "YapiItemKeyValTable" },
					global: { label: "global", value: [], itemType: "YapiItemKeyValTable" },
					editor: {
						label: "",
						type: "textarea",
						itemType: "xItemMonaco",
						value: ""
					}
				})
			};
		},
		computed: {
			cptCurrentEnv() {
				if (this.currentEnvId) {
					return _.find(this.cptOptions, { _id: this.currentEnvId });
				} else {
					return {
						name: "新环境",
						domain: "",
						header: [],
						Cookie: [],
						global: []
					};
				}
			},
			cptOptions() {
				try {
					return _.map(JSON.parse(this.form.editor.value), row => row);
				} catch (error) {
					return [];
				}
			},
			btnOk() {
				const vm = this;
				return {
					label: "确定",
					preset: "blue",
					onClick: async () => {
						try {
							let env_array = JSON.parse(this.form.editor.value);

							if (vm.panelType === "properties") {
								const [error] = await _.$validateForm(vm.$el);

								if (error) {
									return;
								}

								env_array = vm.modifyEnvFromPanel(env_array);
							}

							const dataForm = {
								env: env_array,
								id: this.APP.cptProjectId
							};

							await _api.yapi.project_update(dataForm);

							this.APP.updateGroupProjectList();

							_.$msg("更新成功");
						} catch (error) {
							_.$msgError(error);
						}
					}
				};
			},
			btnCancel() {
				return {
					label: i18n("cancel"),
					onClick: async () => {
						this.closeModal();
					}
				};
			}
		},
		methods: {
			modifyEnvFromPanel(env_array) {
				const vm = this;

				const formData = _.$pickFormValues(vm.form);
				const toNameValue = item => {
					return _.map(item, i =>
						_.merge(i, {
							name: i.key,
							value: i.value
						})
					);
				};
				formData.header = toNameValue(formData.header);
				const toString = item => {
					return _.map(item, row => {
						return `${row.key}=${row.value}`;
					}).join(";");
				};
				debugger;
				const Cookie = toString(formData.Cookie);

				if (Cookie) {
					formData.header.push({
						name: "Cookie",
						value: Cookie
					});
				}

				const new_env = {
					name: formData.name,
					domain: formData.domain,
					header: formData.header,
					global: toNameValue(formData.global)
				};

				if (vm.currentEnvId) {
					new_env._id = vm.currentEnvId;
					const index = _.findIndex(env_array, {
						_id: vm.currentEnvId
					});
					env_array.splice(index, 1, new_env);
				} else {
					env_array.push(new_env);
				}

				return env_array;
			},
			async removeEnv(item) {
				try {
					await _.$confirm_important("是否删除当前选择的环境？");
					const env_array = JSON.parse(this.form.editor.value);
					_.remove(env_array, { _id: item._id });

					const dataForm = {
						env: env_array,
						id: this.APP.cptProjectId
					};

					await _api.yapi.project_update(dataForm);
					this.APP.updateGroupProjectList();
					_.$msg("更新成功");
				} catch (error) {
					_.$msgError(error);
					console.error(error);
				} finally {
					_.$loading(false);
				}
			},
			addNewEnv() {
				this.currentEnvId = "";
			}
		},
		watch: {
			cptCurrentEnv: {
				immediate: true,
				async handler(env) {
					try {
						const [Cookie] = _.remove(env.header, { name: "Cookie" }) || [];
						if (Cookie) {
							env.Cookie = _.map(Cookie.value.split(";"), i => {
								const [key, value] = i.split("=");
								return {
									key: String(key).trim(),
									value
								};
							});
						} else {
							env.Cookie = [];
						}
					} catch (error) {
						console.error(error);
					}

					const toKeyValue = item =>
						_.map(item, i =>
							_.merge(i, {
								key: String(i.name).trim(),
								value: i.value
							})
						);

					_.$setFormValues(
						this.form,
						_.merge(env, {
							header: toKeyValue(env.header),
							global: toKeyValue(env.global)
						})
					);

					await _.$ensure(() => $(".env-item-wrapper")?.length);
					$(".env-item").removeClass("active");
					$(`.env-item[data-id=${env._id}]`).addClass("active");
				}
			},
			"APP.cptProject.env": {
				immediate: true,
				async handler(env) {
					this.form.editor.value = JSON.stringify(env, null, 4);
				}
			}
		}
	});
}
</script>
<style lang="less">
#YapiItemProxyEnvManager {
	min-width: 1024px;
	background-color: var(--body-bg-color, var(--ui-embed-search-bg-hover));
	padding: var(--ui-one);

	.el-card__body {
		min-height: 100px;
	}

	.env-item-wrapper {
		// background-color: var(--ti-base-color-white);
		border-radius: var(--border-radius);
	}

	.env-item {
		padding: var(--ui-one);
		border-radius: var(--border-radius);
		transition: all 0.3s ease-in-out;
		&.active {
			.env-item-inner {
				// padding: var(--ui-one) 0;
				// background: #f5f7fa;
				text-shadow: 0.4px 1px 2px #a5a5a5;
			}
		}

		svg[data-icon-name="_delete"] {
			display: none;

			&:hover {
				cursor: pointer;
			}
		}
		&:hover {
			svg[data-icon-name="_delete"] {
				display: block;
			}
		}
	}
}
</style>

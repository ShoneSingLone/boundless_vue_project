<template>
	<xDialog :style="labelStyle">
		<xCard>
			<xForm col="1">
				<xItem :configs="item" v-for="(item, prop) in form" :key="prop" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="$closeWindow">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>

<script lang="ts">
export default async function ({ onOk, userId, canModifyAvatar }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return {
		inject: ["APP"],
		props: useDialogProps(),
		mounted() {
			this.init();
		},
		data() {
			const vm = this;
			return {
				form: {
					img: {
						value: "",
						itemType: "YapiItemAvatar",
						label: i18n("头像"),
						attrs: { readonly: !canModifyAvatar }
					},
					uid: {
						value: "",
						label: i18n("用户ID"),
						attrs: { readonly: true }
					},
					username: {
						value: "",
						label: i18n("用户名"),
						rules: [_rules.required()],
						attrs: { readonly: true }
					},
					email: {
						value: "",
						label: i18n("邮箱地址"),
						attrs: { readonly: true }
					},
					role: {
						value: "",
						label: i18n("角色"),
						attrs: { readonly: true }
					},
					type: {
						value: "",
						label: i18n("登陆方式"),
						attrs: { readonly: true }
					},
					add_time: {
						value: "",
						label: i18n("创建时间"),
						attrs: { readonly: true }
					},
					up_time: {
						value: "",
						label: i18n("更新时间"),
						attrs: { readonly: true }
					}
				}
			};
		},
		computed: {
			labelStyle() {
				return {
					"--xItem-label-width": "144px"
				};
			},
			cptFormData() {
				return _.$pickValueFromConfigs(this.form);
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						vm.$closeWindow();
					}
				};
			}
		},
		methods: {
			async init() {
				this.fillFormData();
			},
			async fillFormData() {
				const { data: userInfo } = await _api.yapi.getUserById(userId);
				_.$fillBackData({
					form: this.form,
					data: {
						...userInfo,
						uid: userInfo.uid,
						img: userInfo.uid,
						add_time: _.$dateFormat(userInfo.add_time),
						up_time: _.$dateFormat(userInfo.up_time)
					},
					order: ["img", "uid", "username", "email", "role", "type", "add_time", "up_time"]
				});
			}
		}
	};
}
</script>

<style lang="less"></style>

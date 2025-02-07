<template>
	<div class="flex middle">
		<xDropdown class="flex middle">
			<div style="--xItem-wrapper-width: 32px">
				<xItem :configs="cptAvatar" readonly="true" />
			</div>
			<xDropdownMenu slot="dropdown">
				<xDropdownItem>
					<span class="flex middle" @click="showUserProfileDialog">
						<xIcon icon="_icon_user" />
						<span class="ml4">个人中心</span>
					</span>
				</xDropdownItem>
				<xDropdownItem>
					<a class="flex middle" :href="privateNoteHref" target="_blank">
						<xIcon icon="_icon_private_note" />
						<span class="ml4">私人文档</span>
					</a>
				</xDropdownItem>
				<xDropdownItem>
					<a class="flex middle" :href="cptImHref" target="_blank">
						<xIcon icon="_icon_contact" />
						<span class="ml4">联系人</span>
					</a>
				</xDropdownItem>
				<xDropdownItem>
					<span class="flex middle" @click="APP.logoutActions">
						<xIcon icon="_logout" />
						<span class="ml4">退出</span>
					</span>
				</xDropdownItem>
			</xDropdownMenu>
		</xDropdown>
		<xGap r="16" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		computed: {
			cptImHref() {
				return _.$aHashLink("/im", { privateId: this.APP.user._id });
			},
			privateNoteHref() {
				return _.$aHashLink("/note", { privateId: this.APP.user._id });
			},
			cptAvatar() {
				return {
					itemType: "YapiItemAvatar",
					value: this.APP.user._id || "",
					disabled: true
				};
			}
		},
		methods: {
			async showUserProfileDialog() {
				const vm = this;
				_.$openModal({
					title: i18n("个人中心"),
					url: "@/views/User/UserProfile.Dialog.vue",
					parent: vm,
					userId: vm.APP.user._id,
					canModifyAvatar: true,
					onOk() {
						vm.APP.updateGroupMemberList();
					}
				});
			}
		}
	});
}
</script>
<style lang="less"></style>

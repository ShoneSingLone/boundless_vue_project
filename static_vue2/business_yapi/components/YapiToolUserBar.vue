<template>
	<div class="flex middle">
		<xDropdown class="flex middle">
			<div>
				<xItem :configs="cptAvatar" />
			</div>
			<xDropdownMenu slot="dropdown">
				<xDropdownItem>
					<span class="flex middle" @click="showUserProfileDialog">
						<xIcon icon="_user" />
						<span class="ml4">个人中心</span>
					</span>
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
			cptAvatar() {
				return {
					itemType: "YapiItemAvatar",
					value: this.APP.user._id,
					style: "width:100px",
					disabled: true
				};
			}
		},
		methods: {
			async showUserProfileDialog() {
				const vm = this;
				const Component = await _.$importVue("@/views/User/UserProfile.Dialog.vue", {
					parent: this,
					userId: this.APP.user._id,
					canModifyAvatar: true,
					onOk() {
						vm.APP.updateGroupMemberList();
					}
				});
				_.$openWindow(i18n("个人中心"), Component);
			}
		}
	});
}
</script>
<style lang="less"></style>

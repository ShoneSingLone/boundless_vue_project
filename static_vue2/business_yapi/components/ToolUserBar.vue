<template>
	<div class="flex middle">
		<xDropdown class="flex middle">
			<elAvatar :src="APP.cptAvatarUrl" />
			<xDropdownMenu slot="dropdown">
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
<script>
export default async function () {
	return defineComponent({
		inject: ["APP"],
		data() {
			return {};
		},
		methods: {}
	});
}
</script>
<style lang="less"></style>

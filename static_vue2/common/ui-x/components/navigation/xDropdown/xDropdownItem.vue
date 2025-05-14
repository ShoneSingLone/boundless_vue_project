<template>
	<li
		class="el-dropdown-menu__item"
		:class="{
			'is-disabled': disabled,
			'el-dropdown-menu__item--divided': divided
		}"
		@click="handleClick"
		:aria-disabled="disabled"
		:tabindex="disabled ? null : -1">
		<i :class="icon" v-if="icon"></i>
		<slot></slot>
	</li>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "xDropdownItem",
		props: {
			command: {},
			disabled: Boolean,
			divided: Boolean,
			icon: String
		},
		methods: {
			handleClick(e) {
				this.dispatch("xDropdown", "menu-item-click", [this.command, this]);
			}
		}
	});
}
</script>

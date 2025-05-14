<template>
	<div class="x-app-layout_header-oc-oprs">
		<div class="menu-wrapper" v-for="(item, index) in items" :key="index">
			<a class="menu-text" @click="handleClick(item)" :href="item.href">{{ item.label }}</a>
			<div class="menu-drop-wrapper" v-if="item.children">
				<ul class="dropdown-menu">
					<li
						v-for="subItem in item.children"
						class="dropdown-menu-item-menu-item"
						:key="subItem.value"
						@click="handleClickChild(item, subItem)">
						<a class="dropdown-menu-item-menu-item-text" :href="item.href">{{
							subItem.label
						}}</a>
					</li>
				</ul>
			</div>
		</div>
		<xGap l />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		props: ["items"],
		data() {
			return {};
		},
		methods: {
			handleClickChild(item, subItem) {
				if (_.$val(item, "onClickChild")) {
					item.onClickChild(subItem);
				}
			},
			handleClick(item) {
				if (_.$val(item, "onClick")) {
					item.onClick(item);
				}
			}
		}
	});
}
</script>
<style lang="less">
.x-app-layout_header-oc-oprs {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	position: relative;
	color: var(--ti-base-color-common-2);
	height: var(--x-app-layout_header-oc-height);
	font-size: 12px;
	.menu-wrapper {
		cursor: pointer;
		height: var(--x-app-layout_header-oc-height);
		padding: 0 16px;
		position: relative;

		.menu-text,
		.dropdown-menu-item-menu-item-text {
			color: var(--ti-base-color-common-2);
		}

		.menu-drop-wrapper {
			display: none;
			opacity: 0;
			position: absolute;
			padding-top: 16px;
			top: var(--x-app-layout_header-oc-height);
			right: 0;

			.dropdown-menu-item-menu-item {
				padding: 0 16px;
			}
		}

		&:hover {
			background-color: var(--ti-base-color-common-6);
			.menu-text {
				color: var(--ti-base-color-white);
			}
			/* menu-drop-wrapper */
			.menu-drop-wrapper {
				width: 200px;
				display: block;
				opacity: 1;
				background-color: var(--ti-base-color-common-6);
				.dropdown-menu {
					margin-bottom: 16px;
					.dropdown-menu-item-menu-item {
						&:hover {
							background-color: var(--ti-base-color-common-4);
							.dropdown-menu-item-menu-item-text {
								color: var(--ti-base-color-white);
							}
						}
					}
				}
			}
			/* menu-drop-wrapper */
		}
	}
}
</style>

<style lang="less">
.navbar {
	height: 50px;
	overflow: hidden;
	position: relative;
	background: #fff;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

	.hamburger-container {
		line-height: 46px;
		height: 100%;
		float: left;
		cursor: pointer;
		transition: background 0.3s;
		-webkit-tap-highlight-color: transparent;

		&:hover {
			background: rgba(0, 0, 0, 0.025);
		}
	}

	.breadcrumb-container {
		float: left;
	}

	.topmenu-container {
		position: absolute;
		left: 50px;
	}

	.errLog-container {
		display: inline-block;
		vertical-align: top;
	}

	.right-menu {
		float: right;
		height: 100%;
		line-height: 50px;
		display: flex;

		&:focus {
			outline: none;
		}

		.right-menu-item {
			display: inline-block;
			padding: 0 8px;
			height: 100%;
			font-size: 18px;
			color: #5a5e66;
			vertical-align: text-bottom;

			&.hover-effect {
				cursor: pointer;
				transition: background 0.3s;

				&:hover {
					background: rgba(0, 0, 0, 0.025);
				}
			}
		}

		.avatar-container {
			margin-right: 40px;

			.avatar-wrapper {
				margin-top: 5px;
				position: relative;

				.user-avatar {
					cursor: pointer;
					width: 40px;
					height: 40px;
					border-radius: 10px;
				}

				i {
					cursor: pointer;
					position: absolute;
					right: -20px;
					top: 25px;
					font-size: 12px;
				}
			}
		}
	}
}
</style>
<template>
	<div class="navbar">
		<NavbarHamburger
			id="hamburger-container"
			:is-active="APP.sidebar.isCollapse"
			class="hamburger-container"
			@toggleClick="APP.toggleSideBar" />
		<NavbarBreadcrumb
			id="breadcrumb-container"
			class="breadcrumb-container"
			v-if="!APP.settings.topNav" />
		<NavbarTopNav id="topmenu-container" class="topmenu-container" v-if="APP.settings.topNav" />
		<div class="right-menu">
			<div class="avatar-container">
				<xDropdown
					@command="handleCommand"
					class="right-menu-item hover-effect"
					trigger="hover">
					<div class="avatar-wrapper">
						<xIcon :img="cptAvatarUrl" class="user-avatar" />
					</div>
					<template #dropdown>
						<xDropdownMenu>
							<RouterLink to="/user/profile">
								<xDropdownItem>个人中心</xDropdownItem>
							</RouterLink>
							<xDropdownItem divided command="logout">
								<span>退出登录</span>
							</xDropdownItem>
						</xDropdownMenu>
					</template>
				</xDropdown>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		components: {
			NavbarHamburger: () => _.$importVue("@/components/NavbarHamburger.vue"),
			NavbarBreadcrumb: () => _.$importVue("@/components/NavbarBreadcrumb.vue"),
			NavbarTopNav: () => _.$importVue("@/components/NavbarTopNav.vue")
		},
		data() {
			return {};
		},
		methods: {
			handleCommand(command) {
				switch (command) {
					case "setLayout":
						// setLayout();
						break;
					case "logout":
						this.APP.logout();
						break;
					default:
						break;
				}
			}
		},
		computed: {
			cptAvatarUrl() {
				return _.$ajax.urlWrapper(this.APP.user.avatar) || "@/assets/img/logo.png";
			}
		}
	});
}
</script>

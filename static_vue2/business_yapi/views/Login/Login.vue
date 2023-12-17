<template>
	<div class="View-login flex1" style="overflow: auto">
		<div class="m-bg">
			<div class="m-bg-mask m-bg-mask0" />
			<div class="m-bg-mask m-bg-mask1" />
			<div class="m-bg-mask m-bg-mask2" />
			<div class="m-bg-mask m-bg-mask3" />
		</div>
		<div class="login-register-container">
			<div class="flex vertical center middle">
				<div class="middle flex center">
					<div class="login-logo">
						<xIcon icon="_yapi_logo" class="yapi_logo" />
					</div>
				</div>
				<LoginWrap />
			</div>
		</div>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		components: {
			LoginWrap: () => _.$importVue("@/views/Login/LoginWrap.vue")
		},
		computed: {
			styleLogo() {
				return {
					width: "100px",
					height: "100px"
				};
			}
		},
		data() {
			return {
				title: "MUST_MODIFY"
			};
		}
	});
}
</script>
<style lang="less">
@keyframes spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

body.app-mobile {
	.login-register-form {
		width: 90%;
	}
}

.View-login {
	position: relative;

	.login-register-form {
		margin-bottom: 25.6px;
		border-radius: 0.64px;
		position: relative;
		width: 632px;
		padding: 32px;
		background-color: var(--color-white);
		border-radius: var(--border-radius);
		box-shadow:
			0 4px 6px rgba(50, 50, 93, 0.11),
			0 1px 3px rgba(0, 0, 0, 0.08);

		.xTabs__nav-wrap::after {
			opacity: 0;
		}
	}

	.login-register-container {
		padding-bottom: 0.6rem;
		height: 100%;
		position: relative;
		z-index: 1;

		.main-one-left {
			padding-right: 2.4px;
			margin-top: 3.2px;
		}

		.main-one-right {
			padding-left: 8px;
			padding-top: 4.8px;
		}
	}

	.login-title {
		text-align: center;
		padding-top: 48px;
		font-size: 48px;
		font-weight: 200;
		color: #2e2e5a;
		margin: 0;
	}

	.login-logo {
		position: relative;
		top: 50px;
		z-index: 1;
		font-size: 0;
		height: 100px;
		width: 100px;
		background-image: linear-gradient(-20deg, #21d4fd 0%, #b721ff 100%);
		padding: 8px;
		border-radius: 50%;
		box-shadow:
			0 4px 6px rgba(50, 50, 93, 0.11),
			0 1px 3px rgba(0, 0, 0, 0.08);
		animation: spin 5s linear infinite;

		.yapi_logo {
			width: 100%;
			height: 100%;
		}
	}

	.m-bg {
		position: absolute;
		left: 0;
		top: -400px;
		height: 1000px;
		width: 100%;
		transform: skewY(-11deg);
		background-image: linear-gradient(-20deg, #21d4fd 0%, #b721ff 100%);
		.m-bg-mask {
			position: absolute;
			height: 180px;
		}
		.m-bg-mask0 {
			bottom: 0;
			left: 0;
			width: 30%;
			background-image: linear-gradient(120deg, #6ab3fd 0%, #8ba3fd 102%);
		}
		.m-bg-mask1 {
			bottom: 180px;
			right: 0;
			width: 36%;
			background-image: linear-gradient(120deg, #28c5f5 0%, #6682fe 100%);
		}
		.m-bg-mask2 {
			bottom: 540px;
			left: 0;
			width: 20%;
			height: 240px;
			background-image: linear-gradient(120deg, #8121ff 0%, #5e5ef7 100%);
		}
		.m-bg-mask3 {
			bottom: 540px;
			left: 20%;
			width: 70%;
			height: 240px;
			background-image: linear-gradient(-225deg, #5f2bff 0%, #6088fe 48%, #22ccf6 100%);
		}
	}

	.login-form-button {
		background-image: linear-gradient(to right, #6d69fe 0%, #48a0fa 100%) !important;
		border: none !important;
		margin-top: 0.2rem;
		width: 100%;
	}
}
</style>

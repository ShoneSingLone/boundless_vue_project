<template>
	<xDialog class="as-div">
		<div class="container width100">
			<div class="terminal_toolbar flex">
				<xGap f />
				<div class="butt">
					<button class="btn btn-color" @click="closeModal">X</button>
				</div>
			</div>
			<div class="terminal_body">
				<div class="terminal_promt flex vertical pl pr">
					<div class="terminal_user" v-for="(item, index) in msg" :key="index">
						{{ item }}
					</div>
					<span class="terminal_cursor"></span>
				</div>
			</div>
		</div>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ row }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");

	return defineComponent({
		props: useDialogProps(),
		async mounted() {
			const TRIGGER_EVENT_NAME = "PRIVATE_WS_MESSAGE";
			try {
				const id = await new Promise(async resolve => {
					this.WS = await _.$importVue("/common/libs/socket.io.vue", {
						TRIGGER_EVENT_NAME,
						onConnection({ id }) {
							resolve(id);
						}
					});
				});
				$(window).on(TRIGGER_EVENT_NAME, (event, { payload }) => {
					if (payload?.data) {
						this.msg.push(payload.data);
					}
				});
				await _.$sleep(1000 * 3);
				await _.$ajax.post("/api/super_admin/deploy", { data: { id } });
			} catch (error) {
				console.error(error);
			} finally {
				this.WS?.close && this.WS.close();
				$(window).off(TRIGGER_EVENT_NAME);
			}
		},
		data() {
			return {
				msg: []
			};
		},
		computed: {
			isUpdate() {
				return !!row;
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						vm.onClickOk();
					}
				};
			}
		},
		methods: {
			async onClickOk() {
				const [error] = await _.$validateForm(this.el);
				if (error) {
					return;
				}
				this.closeModal();
			}
		}
	});
}
</script>
<style lang="less">
.container {
	width: 100%;
	height: 250px;
	overflow: auto;
}

.terminal_toolbar {
	display: flex;
	height: 30px;
	align-items: center;
	padding: 0 8px;
	box-sizing: border-box;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	background: #212121;
	justify-content: space-between;
}

.butt {
	display: flex;
	align-items: center;
}

.btn {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0;
	margin-right: 5px;
	font-size: 8px;
	height: 12px;
	width: 12px;
	box-sizing: border-box;
	border: none;
	border-radius: 100%;
	background: linear-gradient(#7d7871 0%, #595953 100%);
	text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.2);
	box-shadow:
		0px 0px 1px 0px #41403a,
		0px 1px 1px 0px #474642;
}

.btn-color {
	background: #ee411a;
}

.btn:hover {
	cursor: pointer;
}

.btn:focus {
	outline: none;
}

.butt--exit {
	background: linear-gradient(#f37458 0%, #de4c12 100%);
}

.add_tab {
	border: 1px solid #fff;
	color: #fff;
	padding: 0 6px;
	border-radius: 4px 4px 0 0;
	border-bottom: none;
	cursor: pointer;
}

.user {
	color: #d5d0ce;
	margin-left: 6px;
	font-size: 14px;
	line-height: 15px;
}

.terminal_body {
	background: rgba(0, 0, 0, 0.6);
	height: calc(100% - 30px);
	padding-top: 2px;
	margin-top: -1px;
	font-size: 12px;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	overflow: auto;
}

.terminal_promt {
	display: flex;
}

.terminal_promt span {
	margin-left: 4px;
}

.terminal_user {
	color: #1eff8e;
}

.terminal_location {
	color: #4878c0;
}

.terminal_bling {
	color: #dddddd;
}

.terminal_cursor {
	display: block;
	height: 14px;
	width: 5px;
	margin-left: 10px;
	animation: curbl 1200ms linear infinite;
}

@keyframes curbl {
	0% {
		background: #ffffff;
	}

	49% {
		background: #ffffff;
	}

	60% {
		background: transparent;
	}

	99% {
		background: transparent;
	}

	100% {
		background: #ffffff;
	}
}
</style>

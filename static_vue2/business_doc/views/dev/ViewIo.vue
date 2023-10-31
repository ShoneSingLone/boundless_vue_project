<template>
	<div class="page-view view-icon">
		<xPageContent>
			<xBtn class="js-btn" @click="onEmit_All">onEmit_All</xBtn>
			<xBtn class="js-btn" @click="onEmit_Self">onEmit_Self</xBtn>
			<xBtn class="js-btn" @click="onEmit_Other">onEmit_Other</xBtn>
			<div>{{ state.content }}</div>
		</xPageContent>
	</div>
</template>

<script>
export default async function () {
	return defineComponent({
		inject: ["APP"],
		setup() {
			let state = { content: 0 };
			state = reactive(state);
			function setContent(event, content) {
				state.content = content;
			}
			function onEmit_All() {
				window.APP_ws.emit("all", { msg: "yo central, are you on the line?" });
			}
			function onEmit_Self() {
				window.APP_ws.emit("self", { foo: "foo" });
			}
			function onEmit_Other() {
				function handleAcknowledge(content) {
					state.content = "acknowledgement: " + content;
				}
				window.APP_ws.emit("other", { foo: "foo" }, handleAcknowledge);
			}

			onMounted(() => {
				$(window).on("WS_MESSAGE", setContent);
			});

			onBeforeUnmount(() => {
				$(window).off("WS_MESSAGE", setContent);
			});

			return {
				state,
				onEmit_All,
				onEmit_Self,
				onEmit_Other
			};
		}
	});
}
</script>

<style lang="less">
button {
	display: block;
	margin-top: 0.5em;
	border: none;
	border-radius: 4px;
	font-size: 18px;
	font-weight: 600;
	text-align: center;
	padding: 0.3em 3em;
	background: #13c4a3;
	transition: all 0.177s linear;
	text-decoration: none;
	cursor: pointer;
}

button:hover {
	background: #36f1cd;
	text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
}

.small {
	font-size: 70%;
}

.connections {
	width: 44px;
	height: 44px;
	top: 20px;
	right: 20px;
	line-height: 44px;
	font-size: 16px;
	font-weight: 700;
	background: rgba(0, 0, 0, 0.45);
	color: white;
	border-radius: 4px;
}

.connections span {
	display: block;
	text-align: center;
}
</style>

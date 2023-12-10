<template>
	<div class="page-view view-ripple">
		<xPageContent>
			<xBlock>
				<template #header>
					<div class="flex">
						<h1>heaer</h1>
						<xItem :configs="form.xItemSelect" @focus="handleFocus" />
					</div>
				</template>
				content
			</xBlock>
		</xPageContent>
	</div>
</template>

<script>
export default async function () {
	/* TODO:首次刷新加载不成功 */
	return {
		setup() {
			const form = reactive({
				xItemSelect: {
					value: "",
					label: "xItemSelect",
					itemType: "xItemSelect",
					options: [
						{ label: "foo", value: "foo" },
						{ label: "bar", value: "bar" },
						{ label: "fiz", value: "fiz" }
					],
					on: {
						blur(...args) {
							console.log("🚀 ~ file: base.vue:28 ~ blur ~ args:", args);
						}
					}
				}
			});

			function handleFocus(...args) {
				console.log("🚀 ~ file: base.vue:50 ~ handleFocus ~ args:", args);
			}

			return {
				form,
				handleFocus
			};
		}
	};
}
</script>

<style lang="less">
.view-ripple {
	ul {
		li {
			height: 48px;
			padding: 10px;
		}
	}
}
</style>

<template>
	<div>
		<div class="flex middle">
			<span>{{ xItemInput.value }}</span>
			<xItem :configs="xItemInput" />
		</div>
	</div>
</template>

<script>
export default async function () {
	const file = this.THIS_FILE_URL;
	return defineComponent({
		data() {
			return {
				xItemInput: {
					value: "",
					label: "xItemSelect",
					itemType: "xItemSelect",
					on: {
						focus(...args) {
							console.log("🚀 ~ file: base.vue:30 ~ focus ~ args:", args);
						}
					},
					options() {
						const arr = [...Vue._opts.normal];
						return arr;
					}
				}
			};
		}
	});
}
</script>

<style lang="less"></style>

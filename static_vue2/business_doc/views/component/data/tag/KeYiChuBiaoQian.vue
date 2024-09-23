<template>
	<div class="margin16">
		<xMd
			:md="'设置`closable`属性可以定义一个标签是否可移除。默认的标签移除时会附带渐变动画，如果不想使用，可以设置`disable-transitions`属性，它接受一个`Boolean`，true 为关闭。'" />
		<xTag
			v-for="tag in tags"
			:key="tag.name"
			closable
			:type="tag.type"
			class="mr4"
			@close="$event => handleClose(tag)">
			{{ tag.name }}
		</xTag>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				tags: [
					{ name: "标签一", type: "" },
					{ name: "标签二", type: "success" },
					{ name: "标签三", type: "info" },
					{ name: "标签四", type: "warning" },
					{ name: "标签五", type: "danger" }
				]
			};
		},
		methods: {
			handleClose(tag) {
				_.remove(this.tags, ({ name }) => name === tag.name);
				this.tags = [...this.tags];
			}
		}
	});
}
</script>
<style lang="less"></style>

<style lang="less"></style>
<template>
	<div :is="cptType" v-bind="linkProps()">
		<slot />
	</div>
</template>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		props: {
			to: {
				type: [String, Object],
				required: true
			}
		},
		data() {
			return { THIS_FILE_URL };
		},
		computed: {
			cptIsExt() {
				return _.$isExternal(this.to);
			},
			cptType() {
				if (this.cptIsExt) {
					return "a";
				}
				return "router-link";
			}
		},
		methods: {
			linkProps() {
				if (this.isExt) {
					return {
						href: this.to,
						target: "_blank",
						rel: "noopener"
					};
				}
				return {
					to: this.to
				};
			}
		}
	});
}
</script>

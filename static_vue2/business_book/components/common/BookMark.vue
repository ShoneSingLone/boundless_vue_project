<template>
	<div class="bookmark" :style="style" ref="bookmark"></div>
</template>

<script>
export default async function () {
	const { px2rem } = await _.$importVue("@/utils/utils.vue");
	return {
		props: {
			width: Number,
			height: Number,
			color: String
		},
		computed: {
			style() {
				if (!this.color) {
					return {};
				}
				return {
					borderColor: `${this.color} ${this.color} transparent ${this.color}`
				};
			}
		},
		methods: {
			refresh() {
				if (this.width && this.height) {
					this.$refs.bookmark.style.borderWidth = `${px2rem(
						this.height - 5
					)} ${px2rem(this.width / 2)}rem`;
				}
			}
		},
		mounted() {
			this.refresh();
		}
	};
}
</script>

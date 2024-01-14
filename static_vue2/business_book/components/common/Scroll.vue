<template>
	<div class="scroll-wrapper" :class="{ 'no-scroll': ifNoScroll }" @scroll.passive="handleScroll" ref="scrollWrapper">
		<slot></slot>
	</div>
</template>

<script lang="ts">
export default async function () {
	const { realPx } = await _.$importVue("@/utils/utils.vue");

	return {
		props: {
			top: {
				type: Number,
				default: 0
			},
			bottom: {
				type: Number,
				default: 0
			},
			ifNoScroll: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			handleScroll(e) {
				const offsetY = e.target.scrollTop || window.pageYOffset || document.body.scrollTop;
				this.$emit("onScroll", offsetY);
			},
			scrollTo(x, y) {
				this.$refs.scrollWrapper.scrollTo(x, y);
			},
			refresh() {
				if (this.$refs.scrollWrapper) {
					this.$refs.scrollWrapper.style.height = window.innerHeight - realPx(this.top) - realPx(this.bottom) + "px";
					this.$refs.scrollWrapper.addEventListener("scroll", this.handleScroll);
				}
			}
		},
		mounted() {
			this.refresh();
		}
	};
}
</script>

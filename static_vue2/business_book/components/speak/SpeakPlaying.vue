<template>
	<div class="playing-item-wrapper">
		<div
			class="playing-item"
			:style="item"
			v-for="(item, index) in styles"
			:key="index"
			ref="playingItem"></div>
	</div>
</template>

<script>
export default async function () {
	const { px2rem } = await _.$importVue("@/utils/utils.vue");

	return {
		props: {
			number: Number
		},
		computed: {
			styles() {
				const styles = new Array(this.number);
				for (let i = 0; i < styles.length; i++) {
					styles[i] = {
						height: px2rem(this.random()) + "rem"
					};
				}
				return styles;
			}
		},
		methods: {
			startAnimation() {
				this.task = setInterval(() => {
					this.$refs.playingItem.forEach(item => {
						item.style.height = px2rem(this.random()) + "rem";
					});
				}, 200);
			},
			stopAnimation() {
				if (this.task) {
					clearInterval(this.task);
				}
			},
			random() {
				return Math.ceil(Math.random() * 10);
			}
		}
	};
}
</script>

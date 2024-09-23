<template>
	<div class="ebook" ref="ebook">
		<ebook-header />
		<ebook-title />
		<ebook-reader />
		<ebook-menu />
		<ebook-bookmark />
		<ebook-footer />
	</div>
</template>

<script lang="ts">
export default async function () {
	const EbookReader = await _.$importVue("../../components/ebook/EbookReader");
	const EbookTitle = await _.$importVue("../../components/ebook/EbookTitle");
	const EbookMenu = await _.$importVue("../../components/ebook/EbookMenu");
	const EbookBookmark = await _.$importVue("../../components/ebook/EbookBookmark");
	const EbookHeader = await _.$importVue("../../components/ebook/EbookHeader");
	const EbookFooter = await _.$importVue("../../components/ebook/EbookFooter.vue");
	const { getReadTime, saveReadTime } = await _.$importVue("@/utils/localStorage.vue");
	const { ebookMixin } = await _.$importVue("@/utils/mixin.vue");
	return {
		components: {
			EbookReader,
			EbookTitle,
			EbookMenu,
			EbookBookmark,
			EbookHeader,
			EbookFooter
		},
		mixins: [ebookMixin],
		watch: {
			offsetY(v) {
				if (!this.menuVisible && this.bookAvailable) {
					if (v > 0) {
						this.move(v);
					} else if (v === 0) {
						this.restore();
					}
				}
			}
		},
		methods: {
			restore() {
				this.$refs.ebook.style.top = 0;
				this.$refs.ebook.style.transition = "all .2s linear";
				setTimeout(() => {
					this.$refs.ebook.style.transition = "";
				}, 200);
			},
			move(v) {
				this.$refs.ebook.style.top = v + "px";
			},
			startLoopReadTime() {
				let readTime = getReadTime(this.fileName);
				if (!readTime) {
					readTime = 0;
				}
				this.task = setInterval(() => {
					readTime++;
					if (readTime % 30 === 0) {
						saveReadTime(this.fileName, readTime);
					}
				}, 1000);
			}
		},
		mounted() {
			this.startLoopReadTime();
		},
		beforeDestroy() {
			if (this.task) {
				clearInterval(this.task);
			}
		}
	};
}
</script>

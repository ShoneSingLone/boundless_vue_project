<template>
	<transition name="slide-up">
		<div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
			<div class="setting-progress">
				<div class="read-time-wrapper">
					<span class="read-time-text">{{ getReadTimeText() }}</span>
					<span class="icon-forward"></span>
				</div>
				<div class="progress-wrapper">
					<div class="progress-icon-wrapper" @click="prevSection()">
						<span class="icon-back"></span>
					</div>
					<input
						type="range"
						class="progress"
						max="100"
						min="0"
						step="1"
						@change="onProgressChange($event.target.value)"
						@input="onProgressInput($event.target.value)"
						:value="progress"
						:disabled="!bookAvailable"
						ref="progress" />
					<div class="progress-icon-wrapper" @click="nextSection">
						<span class="icon-forward"></span>
					</div>
				</div>
				<div class="text-wrapper">
					<span class="progress-section-text">{{ getSectionName }}</span>
					<span>({{ bookAvailable ? progress + "%" : "加载中..." }})</span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default async function () {
	const { ebookMixin } = await _.$importVue("@/utils/mixin.vue");
	return {
		mixins: [ebookMixin],
		methods: {
			onProgressChange(progress) {
				this.setProgress(progress).then(() => {
					this.displayProgress();
				});
			},
			onProgressInput(progress) {
				this.setProgress(progress);
				this.updateProgressBg();
			},
			displayProgress() {
				const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100);
				this.display(cfi);
			},
			updateProgressBg() {
				this.$refs.progress.style.backgroundSize = this.progress + "% " + "100% ";
			},
			displaySection() {
				const sectionInfo = this.currentBook.section(this.section);
				if (sectionInfo && sectionInfo.href) {
					this.display(sectionInfo.href);
				}
			},
			prevSection() {
				if (this.section > 0 && this.bookAvailable) {
					this.setSection(this.section - 1).then(() => {
						this.displaySection();
					});
				}
			},
			nextSection() {
				if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
					this.setSection(this.section + 1).then(() => {
						this.displaySection();
					});
				}
			}
		},
		updated() {
			this.updateProgressBg();
		}
	};
}
</script>

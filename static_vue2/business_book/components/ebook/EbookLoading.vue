<template>
	<div class="ebook-loading">
		<div class="ebook-loading-wrapper">
			<div
				class="ebook-loading-item"
				v-for="(item, index) in data"
				:key="index">
				<div
					class="ebook-loading-line-wrapper"
					v-for="(subItem, subIndex) in item"
					:key="subIndex">
					<transition name="switch-width">
						<div
							class="ebook-loading-line"
							v-show="subIndex === currentIndex"></div>
					</transition>
				</div>
			</div>
			<div class="ebook-loading-center"></div>
		</div>
	</div>
</template>

<script>
export default async function () {
	return {
		data() {
			return {
				data: [
					[{}, {}, {}],
					[{}, {}, {}]
				],
				currentIndex: 0,
				indexs: [0, 1, 2]
			};
		},
		methods: {
			switch() {
				let nextIndex = this.indexs.indexOf(this.currentIndex) + 1;
				if (nextIndex > 2) {
					nextIndex = 0;
				}
				this.currentIndex = this.indexs[nextIndex];
			}
		},
		mounted() {
			this.task = setInterval(() => {
				this.switch();
			}, 600);
		}
	};
}
</script>

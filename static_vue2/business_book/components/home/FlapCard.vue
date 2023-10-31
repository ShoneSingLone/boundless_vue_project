<template>
	<div class="flap-card-wrapper" v-show="flapCardVisible">
		<div
			class="flap-card-bg"
			:class="{ animation: runFlapCardAnimation }"
			v-show="runFlapCardAnimation">
			<div
				class="flap-card"
				v-for="(item, index) in flapCardList"
				:key="index"
				:style="{ zIndex: item.zIndex }">
				<div class="flap-card-circle">
					<div
						class="flap-card-semi-circle flap-card-semi-circle-left"
						:style="semiCircleStyle(item, 'left')"
						ref="left"></div>
					<div
						class="flap-card-semi-circle flap-card-semi-circle-right"
						:style="semiCircleStyle(item, 'right')"
						ref="right"></div>
				</div>
			</div>
			<div class="point-wrapper">
				<div
					class="point"
					:class="{ animation: runPointAnimation }"
					v-for="item in pointList"
					:key="item"></div>
			</div>
		</div>
		<div
			class="book-card"
			:class="{ animation: runBookCardAnimation }"
			v-show="runBookCardAnimation">
			<div class="book-card-wrapper">
				<div class="img-wrapper">
					<img class="img" :src="data ? data.cover : ''" />
				</div>
				<div class="content-wrapper">
					<div class="content-title">{{ data ? data.title : "" }}</div>
					<div class="content-author sub-title-medium">
						{{ data ? data.author : "" }}
					</div>
					<div class="content-category">{{ categoryText() }}</div>
				</div>
				<div class="read-btn" @click.stop="showBookDetail(data)">
					{{ $t("home.readNow") }}
				</div>
			</div>
		</div>
		<div class="close-btn-wrapper" @click="close">
			<div class="icon-close"></div>
		</div>
	</div>
</template>

<script>
export default async function () {
	const { storeHomeMixin } = await _.$importVue("@/utils/mixin.vue");
	const { flapCardList, categoryText } =
		await _.$importVue("@/utils/store.vue");

	return {
		mixins: [storeHomeMixin],
		props: {
			data: Object
		},
		data() {
			return {
				flapCardList,
				front: 0,
				back: 1,
				intervalTime: 25,
				runFlapCardAnimation: false,
				pointList: null,
				runPointAnimation: false,
				runBookCardAnimation: false
			};
		},
		watch: {
			flapCardVisible(v) {
				if (v) {
					this.runAnimation();
				}
			}
		},
		methods: {
			close() {
				this.stopAnimation();
				this.setFlapCardVisible(false);
			},
			semiCircleStyle(item, dir) {
				return {
					backgroundColor: `rgb(${item.r}, ${item.g}, ${item.b})`,
					backgroundSize: item.backgroundSize,
					backgroundImage: dir === "left" ? item.imgLeft : item.imgRight
				};
			},
			rotate(index, type) {
				const item = this.flapCardList[index];
				let dom;
				if (type === "front") {
					dom = this.$refs.right[index];
				} else {
					dom = this.$refs.left[index];
				}
				dom.style.transform = `rotateY(${item.rotateDegree}deg)`;
				dom.style.backgroundColor = `rgb(${item.r}, ${item._g}, ${item.b})`;
			},
			flapCardRotate() {
				const frontFlapCard = this.flapCardList[this.front];
				const backFlapCard = this.flapCardList[this.back];
				frontFlapCard.rotateDegree += 10;
				frontFlapCard._g -= 5;
				backFlapCard.rotateDegree -= 10;
				if (backFlapCard.rotateDegree < 90) {
					backFlapCard._g += 5;
				}
				if (
					frontFlapCard.rotateDegree === 90 &&
					backFlapCard.rotateDegree === 90
				) {
					backFlapCard.zIndex += 2;
				}
				this.rotate(this.front, "front");
				this.rotate(this.back, "back");
				if (
					frontFlapCard.rotateDegree === 180 &&
					backFlapCard.rotateDegree === 0
				) {
					this.next();
				}
			},
			next() {
				const frontFlapCard = this.flapCardList[this.front];
				const backFlapCard = this.flapCardList[this.back];
				frontFlapCard.rotateDegree = 0;
				backFlapCard.rotateDegree = 0;
				frontFlapCard._g = frontFlapCard.g;
				backFlapCard._g = backFlapCard.g;
				this.rotate(this.front, "front");
				this.rotate(this.back, "back");
				this.front++;
				this.back++;
				const len = this.flapCardList.length;
				if (this.front >= len) {
					this.front = 0;
				}
				if (this.back >= len) {
					this.back = 0;
				}
				// 动态设置zIndex
				// 100 -> 96
				// 99 -> 100
				// 98 -> 99
				// 97 -> 98
				// 96 -> 97
				// (0 - 1 + 5) % 5 = 4
				// (1 - 1 + 5) % 5 = 0
				this.flapCardList.forEach((item, index) => {
					item.zIndex = 100 - ((index - this.front + len) % len);
				});
				this.prepare();
			},
			prepare() {
				const backFlapCard = this.flapCardList[this.back];
				backFlapCard.rotateDegree = 180;
				backFlapCard._g = backFlapCard.g - 5 * 9;
				this.rotate(this.back, "back");
			},
			reset() {
				this.front = 0;
				this.back = 1;
				this.flapCardList.forEach((item, index) => {
					item.zIndex = 100 - index;
					item._g = item.g;
					item.rotateDegree = 0;
					this.rotate(index, "front");
					this.rotate(index, "back");
				});
				this.runBookCardAnimation = false;
				this.runFlapCardAnimation = false;
				this.runPointAnimation = false;
			},
			startFlapCardAnimation() {
				this.prepare();
				this.task = setInterval(() => {
					this.flapCardRotate();
				}, this.intervalTime);
			},
			startPointAnimation() {
				this.runPointAnimation = true;
				setTimeout(() => {
					this.runPointAnimation = false;
				}, 750);
			},
			stopAnimation() {
				if (this.task) {
					clearInterval(this.task);
				}
				if (this.timeout) {
					clearTimeout(this.timeout);
				}
				if (this.timeout2) {
					clearTimeout(this.timeout2);
				}
				this.reset();
			},
			runAnimation() {
				this.runFlapCardAnimation = true;
				this.timeout = setTimeout(() => {
					this.startFlapCardAnimation();
					this.startPointAnimation();
				}, 300);
				this.timeout2 = setTimeout(() => {
					this.stopAnimation();
					this.runBookCardAnimation = true;
				}, 2500);
			},
			categoryText() {
				if (this.data) {
					return categoryText(this.data.category, this);
				} else {
					return "";
				}
			}
		},
		created() {
			this.pointList = [];
			for (let i = 0; i < 18; i++) {
				this.pointList.push(`point${i}`);
			}
		}
	};
}
</script>

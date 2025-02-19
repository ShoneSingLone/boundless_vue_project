<style lang="less">
.el-calendar {
	background-color: #fff;
}

.el-calendar__header {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
	padding: 12px 20px;
	border-bottom: 1px solid var(--el-border-color-lighter);
}

.el-calendar__title {
	color: #000;
	-ms-flex-item-align: center;
	align-self: center;
}

.el-calendar__body {
	padding: 12px 20px 35px;
}

.el-calendar-table {
	table-layout: fixed;
	width: 100%;
}

.el-calendar-table thead th {
	padding: 12px 0;
	color: #606266;
	font-weight: 400;
}

.el-calendar-table:not(.is-range) td.next,
.el-calendar-table:not(.is-range) td.prev {
	color: var(--el-text-color-disabled);
}

.el-calendar-table td {
	border-bottom: 1px solid var(--el-border-color-lighter);
	border-right: 1px solid var(--el-border-color-lighter);
	vertical-align: top;
	-webkit-transition: background-color 0.2s ease;
	transition: background-color 0.2s ease;
}

.el-calendar-table td.is-selected {
	background-color: #f2f8fe;
}

.el-calendar-table tr:first-child td {
	border-top: 1px solid var(--el-border-color-lighter);
}

.el-calendar-table tr td:first-child {
	border-left: 1px solid var(--el-border-color-lighter);
}

.el-calendar-table tr.el-calendar-table__row--hide-border td {
	border-top: none;
}

.el-calendar-table .el-calendar-day {
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	padding: 8px;
	height: 85px;
}

.el-calendar-table .el-calendar-day:hover {
	cursor: pointer;
	background-color: #f2f8fe;
}
</style>
<template>
	<div class="el-calendar">
		<div class="el-calendar__header">
			<div class="el-calendar__title">
				{{ i18nDate }}
			</div>
			<div class="el-calendar__button-group" v-if="validatedRange.length === 0">
				<xBtnGroup>
					<xBtn preset="plain" size="mini" @click="selectDate('prev-month')">
						{{ i18n("el.datepicker.prevMonth") }}
					</xBtn>
					<xBtn preset="plain" size="mini" @click="selectDate('today')">
						{{ i18n("el.datepicker.today") }}
					</xBtn>
					<xBtn preset="plain" size="mini" @click="selectDate('next-month')">
						{{ i18n("el.datepicker.nextMonth") }}
					</xBtn>
				</xBtnGroup>
			</div>
		</div>
		<div class="el-calendar__body" v-if="validatedRange.length === 0" key="no-range">
			<xCalendarDateTable
				:date="date"
				:selected-day="realSelectedDay"
				:first-day-of-week="realFirstDayOfWeek"
				@pick="pickDay" />
		</div>
		<div v-else class="el-calendar__body" key="has-range">
			<xCalendarDateTable
				v-for="(range, index) in validatedRange"
				:key="index"
				:date="range[0]"
				:selected-day="realSelectedDay"
				:range="range"
				:hide-header="index !== 0"
				:first-day-of-week="realFirstDayOfWeek"
				@pick="pickDay" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	const [
		{
			fecha: { format },
			range: rangeArr,
			getFirstDayOfMonth,
			getPrevMonthLastDays,
			getMonthDays,
			getI18nSettings,
			validateRangeInOneMonth
		}
	] = await _.$importVue(["/common/ui-x/components/form/xDatePicker/dateUtils.vue"]);

	const validTypes = ["prev-month", "today", "next-month"];
	const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const oneDay = 86400000;

	const xCalendarDateTable = {
		props: {
			selectedDay: String,
			// formated date yyyy-MM-dd
			range: {
				type: Array,
				validator(val) {
					if (!(val && val.length)) return true;
					const [start, end] = val;
					return validateRangeInOneMonth(start, end);
				}
			},
			date: Date,
			hideHeader: Boolean,
			firstDayOfWeek: Number
		},
		inject: ["elCalendar"],
		methods: {
			toNestedArr(days) {
				return rangeArr(days.length / 7).map((_, index) => {
					const start = index * 7;
					return days.slice(start, start + 7);
				});
			},
			getFormateDate(day, type) {
				if (!day || ["prev", "current", "next"].indexOf(type) === -1) {
					throw new Error("invalid day or type");
				}
				let prefix = this.curMonthDatePrefix;
				if (type === "prev") {
					prefix = this.prevMonthDatePrefix;
				} else if (type === "next") {
					prefix = this.nextMonthDatePrefix;
				}
				day = `00${day}`.slice(-2);
				return `${prefix}-${day}`;
			},
			getCellClass({ text, type }) {
				const classes = [type];
				if (type === "current") {
					const date = this.getFormateDate(text, type);
					if (date === this.selectedDay) {
						classes.push("is-selected");
					}
					if (date === this.formatedToday) {
						classes.push("is-today");
					}
				}
				return classes;
			},
			pickDay({ text, type }) {
				const date = this.getFormateDate(text, type);
				this.$emit("pick", date);
			},
			cellRenderProxy({ text, type }) {
				let render = this.elCalendar.$scopedSlots.dateCell;
				if (!render)
					return hSpan({
						children: text
					});
				const day = this.getFormateDate(text, type);
				const date = new Date(day);
				const data = {
					isSelected: this.selectedDay === day,
					type: `${type}-month`,
					day
				};
				return render({
					date,
					data
				});
			}
		},
		computed: {
			WEEK_DAYS() {
				return getI18nSettings().dayNames;
			},
			prevMonthDatePrefix() {
				const temp = new Date(this.date.getTime());
				temp.setDate(0);
				return format(temp, "yyyy-MM");
			},
			curMonthDatePrefix() {
				return format(this.date, "yyyy-MM");
			},
			nextMonthDatePrefix() {
				const temp = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
				return format(temp, "yyyy-MM");
			},
			formatedToday() {
				return this.elCalendar.formatedToday;
			},
			isInRange() {
				return this.range && this.range.length;
			},
			rows() {
				let days = [];
				// if range exists, should render days in range.
				if (this.isInRange) {
					const [start, end] = this.range;
					const currentMonthRange = rangeArr(end.getDate() - start.getDate() + 1).map(
						(_, index) => ({
							text: start.getDate() + index,
							type: "current"
						})
					);
					let remaining = currentMonthRange.length % 7;
					remaining = remaining === 0 ? 0 : 7 - remaining;
					const nextMonthRange = rangeArr(remaining).map((_, index) => ({
						text: index + 1,
						type: "next"
					}));
					days = currentMonthRange.concat(nextMonthRange);
				} else {
					const date = this.date;
					let firstDay = getFirstDayOfMonth(date);
					firstDay = firstDay === 0 ? 7 : firstDay;
					const firstDayOfWeek =
						typeof this.firstDayOfWeek === "number" ? this.firstDayOfWeek : 1;
					const offset = (7 + firstDay - firstDayOfWeek) % 7;
					const prevMonthDays = getPrevMonthLastDays(date, offset).map(day => ({
						text: day,
						type: "prev"
					}));
					const currentMonthDays = getMonthDays(date).map(day => ({
						text: day,
						type: "current"
					}));
					days = [...prevMonthDays, ...currentMonthDays];
					const nextMonthDays = rangeArr(42 - days.length).map((_, index) => ({
						text: index + 1,
						type: "next"
					}));
					days = days.concat(nextMonthDays);
				}
				return this.toNestedArr(days);
			},
			weekDays() {
				const start = this.firstDayOfWeek;
				const { WEEK_DAYS } = this;
				if (typeof start !== "number" || start === 0) {
					return WEEK_DAYS.slice();
				} else {
					return WEEK_DAYS.slice(start).concat(WEEK_DAYS.slice(0, start));
				}
			}
		},
		render() {
			const thead = this.hideHeader
				? null
				: h("thead", {
						children: this.weekDays.map(day =>
							h(
								"th",
								{
									children: day
								},
								day
							)
						)
					});
			return h("table", {
				class: {
					"el-calendar-table": true,
					"is-range": this.isInRange
				},
				cellspacing: "0",
				cellpadding: "0",
				children: [
					thead,
					h("tbody", {
						children: this.rows.map((row, index) =>
							h(
								"tr",
								{
									class: {
										"el-calendar-table__row": true,
										"el-calendar-table__row--hide-border":
											index === 0 && this.hideHeader
									},
									children: row.map((cell, key) =>
										h(
											"td",
											{
												class: this.getCellClass(cell),
												onClick: this.pickDay.bind(this, cell),
												children: hDiv({
													class: "el-calendar-day",
													children: this.cellRenderProxy(cell)
												})
											},
											key
										)
									)
								},
								index
							)
						)
					})
				]
			});
		}
	};

	return defineComponent({
		name: "ElCalendar",
		components: {
			xCalendarDateTable
		},
		props: {
			value: [Date, String, Number],
			range: {
				type: Array,
				validator(range) {
					if (Array.isArray(range)) {
						return (
							range.length === 2 &&
							range.every(
								item =>
									typeof item === "string" ||
									typeof item === "number" ||
									item instanceof Date
							)
						);
					} else {
						return true;
					}
				}
			},
			firstDayOfWeek: {
				type: Number,
				default: 1
			}
		},

		provide() {
			return {
				elCalendar: this
			};
		},

		methods: {
			pickDay(day) {
				this.realSelectedDay = day;
			},

			selectDate(type) {
				if (validTypes.indexOf(type) === -1) {
					throw new Error(`invalid type ${type}`);
				}
				let day = "";
				if (type === "prev-month") {
					day = `${this.prevMonthDatePrefix}-01`;
				} else if (type === "next-month") {
					day = `${this.nextMonthDatePrefix}-01`;
				} else {
					day = this.formatedToday;
				}

				if (day === this.formatedDate) return;
				this.pickDay(day);
			},

			toDate(val) {
				if (!val) {
					throw new Error("invalid val");
				}
				return val instanceof Date ? val : new Date(val);
			},

			rangeValidator(date, isStart) {
				const firstDayOfWeek = this.realFirstDayOfWeek;
				const expected = isStart
					? firstDayOfWeek
					: firstDayOfWeek === 0
						? 6
						: firstDayOfWeek - 1;
				const message = `${isStart ? "start" : "end"} of range should be ${weekDays[expected]}.`;
				if (date.getDay() !== expected) {
					console.warn("[ElementCalendar]", message, "Invalid range will be ignored.");
					return false;
				}
				return true;
			}
		},

		computed: {
			prevMonthDatePrefix() {
				const temp = new Date(this.date.getTime());
				temp.setDate(0);
				return format(temp, "yyyy-MM");
			},

			curMonthDatePrefix() {
				return format(this.date, "yyyy-MM");
			},

			nextMonthDatePrefix() {
				const temp = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
				return format(temp, "yyyy-MM");
			},

			formatedDate() {
				return format(this.date, "yyyy-MM-dd");
			},

			i18nDate() {
				const year = this.date.getFullYear();
				const month = this.date.getMonth() + 1;
				return `${year} ${this.i18n("el.datepicker.year")} ${this.i18n("el.datepicker.month" + month)}`;
			},

			formatedToday() {
				return format(this.now, "yyyy-MM-dd");
			},

			realSelectedDay: {
				get() {
					if (!this.value) return this.selectedDay;
					return this.formatedDate;
				},
				set(val) {
					this.selectedDay = val;
					const date = new Date(val);
					this.$emit("input", date);
				}
			},

			date() {
				if (!this.value) {
					if (this.realSelectedDay) {
						const d = this.selectedDay.split("-");
						return new Date(d[0], d[1] - 1, d[2]);
					} else if (this.validatedRange.length) {
						return this.validatedRange[0][0];
					}
					return this.now;
				} else {
					return this.toDate(this.value);
				}
			},

			// if range is valid, we get a two-digit array
			validatedRange() {
				let range = this.range;
				if (!range) return [];
				range = range.reduce((prev, val, index) => {
					const date = this.toDate(val);
					if (this.rangeValidator(date, index === 0)) {
						prev = prev.concat(date);
					}
					return prev;
				}, []);
				if (range.length === 2) {
					const [start, end] = range;
					if (start > end) {
						console.warn("[ElementCalendar]end time should be greater than start time");
						return [];
					}
					// start time and end time in one month
					if (validateRangeInOneMonth(start, end)) {
						return [[start, end]];
					}
					const data = [];
					let startDay = new Date(start.getFullYear(), start.getMonth() + 1, 1);
					const lastDay = this.toDate(startDay.getTime() - oneDay);
					if (!validateRangeInOneMonth(startDay, end)) {
						console.warn(
							"[ElementCalendar]start time and end time interval must not exceed two months"
						);
						return [];
					}
					// 第一个月的时间范围
					data.push([start, lastDay]);
					// 下一月的时间范围，需要计算一下该月的第一个周起始日
					const firstDayOfWeek = this.realFirstDayOfWeek;
					const nextMontFirstDay = startDay.getDay();
					let interval = 0;
					if (nextMontFirstDay !== firstDayOfWeek) {
						if (firstDayOfWeek === 0) {
							interval = 7 - nextMontFirstDay;
						} else {
							interval = firstDayOfWeek - nextMontFirstDay;
							interval = interval > 0 ? interval : 7 + interval;
						}
					}
					startDay = this.toDate(startDay.getTime() + interval * oneDay);
					if (startDay.getDate() < end.getDate()) {
						data.push([startDay, end]);
					}
					return data;
				}
				return [];
			},

			realFirstDayOfWeek() {
				if (this.firstDayOfWeek < 1 || this.firstDayOfWeek > 6) {
					return 0;
				}
				return Math.floor(this.firstDayOfWeek);
			}
		},

		data() {
			return {
				selectedDay: "",
				now: new Date()
			};
		}
	});
}
</script>

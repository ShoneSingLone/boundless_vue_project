const { val, fs, path, _ } = require("../../preprocess.utils");
/* 把分开的zh-cn en 合并为数组的形式 */
let target = {};
//js遍历对象
function TraversalObject(obj, prePropArray = []) {
	_.each(obj, (objOrLabel, prop) => {
		prePropArray.push(prop);
		if (_.isPlainObject(objOrLabel)) {
			//递归遍历
			TraversalObject(objOrLabel, prePropArray);
		} else {
			const props = prePropArray.join(".");
			console.log(props, prePropArray);
			const zh = objOrLabel;
			const en = val(b, props);
			val(target, props, [zh, en]);
		}
		prePropArray.pop();
	});
}

var a = {
	el: {
		colorpicker: {
			confirm: "确定",
			clear: "清空"
		},
		datepicker: {
			now: "此刻",
			today: "今天",
			cancel: "取消",
			clear: "清空",
			confirm: "确定",
			selectDate: "选择日期",
			selectTime: "选择时间",
			startDate: "开始日期",
			startTime: "开始时间",
			endDate: "结束日期",
			endTime: "结束时间",
			prevYear: "前一年",
			nextYear: "后一年",
			prevMonth: "上个月",
			nextMonth: "下个月",
			year: "年",
			month1: "1 月",
			month2: "2 月",
			month3: "3 月",
			month4: "4 月",
			month5: "5 月",
			month6: "6 月",
			month7: "7 月",
			month8: "8 月",
			month9: "9 月",
			month10: "10 月",
			month11: "11 月",
			month12: "12 月",
			// week: '周次',
			weeks: {
				sun: "日",
				mon: "一",
				tue: "二",
				wed: "三",
				thu: "四",
				fri: "五",
				sat: "六"
			},
			months: {
				jan: "一月",
				feb: "二月",
				mar: "三月",
				apr: "四月",
				may: "五月",
				jun: "六月",
				jul: "七月",
				aug: "八月",
				sep: "九月",
				oct: "十月",
				nov: "十一月",
				dec: "十二月"
			}
		},
		select: {
			loading: "加载中",
			noMatch: "无匹配数据",
			noData: "无数据",
			placeholder: "请选择"
		},
		cascader: {
			noMatch: "无匹配数据",
			loading: "加载中",
			placeholder: "请选择",
			noData: "暂无数据"
		},
		pagination: {
			goto: "前往",
			pagesize: "条/页",
			total: "共 {total} 条",
			pageClassifier: "页"
		},
		messagebox: {
			title: "提示",
			confirm: "确定",
			cancel: "取消",
			error: "输入的数据不合法!"
		},
		upload: {
			deleteTip: "按 delete 键可删除",
			delete: "删除",
			preview: "查看图片",
			continue: "继续上传"
		},
		table: {
			emptyText: "暂无数据",
			confirmFilter: "筛选",
			resetFilter: "重置",
			clearFilter: "全部",
			sumText: "合计"
		},
		tree: {
			emptyText: "暂无数据"
		},
		transfer: {
			noMatch: "无匹配数据",
			noData: "无数据",
			titles: ["列表 1", "列表 2"],
			filterPlaceholder: "请输入搜索内容",
			noCheckedFormat: "共 {total} 项",
			hasCheckedFormat: "已选 {checked}/{total} 项"
		},
		image: {
			error: "加载失败"
		},
		pageHeader: {
			title: "返回"
		},
		popconfirm: {
			confirmButtonText: "确定",
			cancelButtonText: "取消"
		},
		empty: {
			description: "暂无数据"
		}
	}
};

var b = {
	el: {
		colorpicker: {
			confirm: "OK",
			clear: "Clear"
		},
		datepicker: {
			now: "Now",
			today: "Today",
			cancel: "Cancel",
			clear: "Clear",
			confirm: "OK",
			selectDate: "Select date",
			selectTime: "Select time",
			startDate: "Start Date",
			startTime: "Start Time",
			endDate: "End Date",
			endTime: "End Time",
			prevYear: "Previous Year",
			nextYear: "Next Year",
			prevMonth: "Previous Month",
			nextMonth: "Next Month",
			year: "",
			month1: "January",
			month2: "February",
			month3: "March",
			month4: "April",
			month5: "May",
			month6: "June",
			month7: "July",
			month8: "August",
			month9: "September",
			month10: "October",
			month11: "November",
			month12: "December",
			week: "week",
			weeks: {
				sun: "Sun",
				mon: "Mon",
				tue: "Tue",
				wed: "Wed",
				thu: "Thu",
				fri: "Fri",
				sat: "Sat"
			},
			months: {
				jan: "Jan",
				feb: "Feb",
				mar: "Mar",
				apr: "Apr",
				may: "May",
				jun: "Jun",
				jul: "Jul",
				aug: "Aug",
				sep: "Sep",
				oct: "Oct",
				nov: "Nov",
				dec: "Dec"
			}
		},
		select: {
			loading: "Loading",
			noMatch: "No matching data",
			noData: "No data",
			placeholder: "Select"
		},
		cascader: {
			noMatch: "No matching data",
			loading: "Loading",
			placeholder: "Select",
			noData: "No data"
		},
		pagination: {
			goto: "Go to",
			pagesize: "/page",
			total: "Total {total}",
			pageClassifier: ""
		},
		messagebox: {
			title: "Message",
			confirm: "OK",
			cancel: "Cancel",
			error: "Illegal input"
		},
		upload: {
			deleteTip: "press delete to remove",
			delete: "Delete",
			preview: "Preview",
			continue: "Continue"
		},
		table: {
			emptyText: "No Data",
			confirmFilter: "Confirm",
			resetFilter: "Reset",
			clearFilter: "All",
			sumText: "Sum"
		},
		tree: {
			emptyText: "No Data"
		},
		transfer: {
			noMatch: "No matching data",
			noData: "No data",
			titles: ["List 1", "List 2"], // to be translated
			filterPlaceholder: "Enter keyword", // to be translated
			noCheckedFormat: "{total} items", // to be translated
			hasCheckedFormat: "{checked}/{total} checked" // to be translated
		},
		image: {
			error: "FAILED"
		},
		pageHeader: {
			title: "Back" // to be translated
		},
		popconfirm: {
			confirmButtonText: "Yes",
			cancelButtonText: "No"
		},
		empty: {
			description: "No Data"
		}
	}
};
TraversalObject(a);
fs.writeFileSync(path.resolve(__dirname, "./reversal.json"), JSON.stringify(target, null, 2));

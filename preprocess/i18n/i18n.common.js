/*node makeLanguageFile.js */
module.exports = {
	info: ["信息", "info"],
	Operation: ["操作", "Operation"],
	sun: ["星期天", "Sun"],
	mon: ["星期一", "Mon"],
	tue: ["星期二", "Tue"],
	wed: ["星期三", "Wed"],
	thu: ["星期四", "Thu"],
	fri: ["星期五", "Fri"],
	sat: ["星期六", "Sat"],
	el: {
		colorpicker: {
			confirm: ["确定", "OK"],
			clear: ["清空", "Clear"]
		},
		datepicker: {
			now: ["此刻", "Now"],
			today: ["今天", "Today"],
			cancel: ["取消", "Cancel"],
			clear: ["清空", "Clear"],
			confirm: ["确定", "OK"],
			selectDate: ["选择日期", "Select date"],
			selectTime: ["选择时间", "Select time"],
			startDate: ["开始日期", "Start Date"],
			startTime: ["开始时间", "Start Time"],
			endDate: ["结束日期", "End Date"],
			endTime: ["结束时间", "End Time"],
			prevYear: ["前一年", "Previous Year"],
			nextYear: ["后一年", "Next Year"],
			prevMonth: ["上个月", "Previous Month"],
			nextMonth: ["下个月", "Next Month"],
			year: ["年", ""],
			month1: ["1 月", "January"],
			month2: ["2 月", "February"],
			month3: ["3 月", "March"],
			month4: ["4 月", "April"],
			month5: ["5 月", "May"],
			month6: ["6 月", "June"],
			month7: ["7 月", "July"],
			month8: ["8 月", "August"],
			month9: ["9 月", "September"],
			month10: ["10 月", "October"],
			month11: ["11 月", "November"],
			month12: ["12 月", "December"],
			weeks: {
				sun: ["日", "Sun"],
				mon: ["一", "Mon"],
				tue: ["二", "Tue"],
				wed: ["三", "Wed"],
				thu: ["四", "Thu"],
				fri: ["五", "Fri"],
				sat: ["六", "Sat"]
			},
			months: {
				jan: ["一月", "Jan"],
				feb: ["二月", "Feb"],
				mar: ["三月", "Mar"],
				apr: ["四月", "Apr"],
				may: ["五月", "May"],
				jun: ["六月", "Jun"],
				jul: ["七月", "Jul"],
				aug: ["八月", "Aug"],
				sep: ["九月", "Sep"],
				oct: ["十月", "Oct"],
				nov: ["十一月", "Nov"],
				dec: ["十二月", "Dec"]
			}
		},
		select: {
			loading: ["加载中", "Loading"],
			noMatch: ["无匹配数据", "No matching data"],
			noData: ["无数据", "No data"],
			placeholder: ["请选择", "Select"]
		},
		cascader: {
			noMatch: ["无匹配数据", "No matching data"],
			loading: ["加载中", "Loading"],
			placeholder: ["请选择", "Select"],
			noData: ["暂无数据", "No data"]
		},
		pagination: {
			goto: ["前往", "Go to"],
			pagesize: ["条/页", "/page"],
			total: ["共 {total} 条", "Total {total}"],
			pageClassifier: ["页", ""]
		},
		messagebox: {
			title: ["提示", "Message"],
			confirm: ["确定", "OK"],
			cancel: ["取消", "Cancel"],
			error: ["输入的数据不合法!", "Illegal input"]
		},
		upload: {
			deleteTip: ["按 delete 键可删除", "press delete to remove"],
			delete: ["删除", "Delete"],
			preview: ["查看图片", "Preview"],
			continue: ["继续上传", "Continue"]
		},
		table: {
			emptyText: ["暂无数据", "No Data"],
			confirmFilter: ["筛选", "Confirm"],
			resetFilter: ["重置", "Reset"],
			clearFilter: ["全部", "All"],
			sumText: ["合计", "Sum"]
		},
		tree: {
			emptyText: ["暂无数据", "No Data"]
		},
		transfer: {
			noMatch: ["无匹配数据", "No matching data"],
			noData: ["无数据", "No data"],
			titles: [
				["列表 1", "列表 2"],
				["List 1", "List 2"]
			],
			filterPlaceholder: ["请输入搜索内容", "Enter keyword"],
			noCheckedFormat: ["共 {total} 项", "{total} items"],
			hasCheckedFormat: ["已选 {checked}/{total} 项", "{checked}/{total} checked"]
		},
		image: {
			error: ["加载失败", "FAILED"]
		},
		pageHeader: {
			title: ["返回", "Back"]
		},
		popconfirm: {
			confirmButtonText: ["确定", "Yes"],
			cancelButtonText: ["取消", "No"]
		},
		empty: {
			description: ["暂无数据", "No Data"]
		}
	},
	/* ************ */
	ruleMsgWordLessThan: ["字数应少于{size}", "Word count should be less than {size}"],
	__success: ["{action} 成功!", "{action} successfully!"],
	__failed: ["{action} 失败!", "{action} failed!"],

};

/*node makeLanguageFile.js */
module.exports = {
	"name": ["名称", "name"],
	ok: ["确定", "OK"],
	cancel: ["取消", "Cancel"],
	error: ["错误", "Error"],
	operation: ["操作", "Operation"],
	search: ["查询", "Search"],
	tips: ["提示", "Tips"],
	message: ["信息", "Message"],
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
			week: ['', "week"],
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
	form: {
		rules: {
			msg: {
				wordLessThan: ["字数应少于{size}", "Word count should be less than {size}"],
			}
		}
	},
	__success: ["{action} 成功!", "{action} successfully!"],
	__failed: ["{action} 失败!", "{action} failed!"],

	"please_enter_department_name": ["请输入部门名称", "Please enter the department name"],
	"please_enter_menu_name": ["请输入菜单名称", "Please enter the menu name"],
	"please_enter_characters": ["请输入字符", "Please enter characters"],
	"state": ["状态", "state"],
	"time_range": ["时间范围", "Time range"],
	"apply_now": ["立即申请", "Apply Now"],
	"close": ["关闭", "close"],
	"please_enter_service_name": ["请输入服务名称", "Please enter the service name"],
	"configuration_cost": ["配置费用", "Configuration cost"],
	"current_configuration": ["当前配置", "currently allocated"],
	"hour": ["小时", "hour"],
	"select_service": ["选择服务", "Select Service"],
	"jump_to": ["跳转", "Jump to"],
	"submitted_successfully": ["提交成功", "Submitted successfully"],
	"view_orders": ["查看订单", "View orders"],
	"return_to_list": ["返回列表", "Return to List"],
	"generate_expression": ["生成表达式", "Generate expression"],
	"url": ["URL", "URL"],
	"more": ["更多", "more"],
	"reset": ["重置", "Reset"],
	"yes": ["是", "yes"],
	"no": ["否", "no"],
	"no_data_available": ["暂无数据", "No data available at the moment"],
	"advanced_search": ["高级搜索", "Advanced Search"],
	"please_enter_correct_phone_number": ["请输入正确的手机号码", "Please enter the correct phone number"],
	"required_field": ["必填项", "Required "],
	"please_enter_email": ["请输入Email", "Please enter your email address"],
	"starting_with_lowercase_or_number": [
		"以小写英文字母或数字开头，并且只包含字母、数字或者-",
		"Starting with a lowercase English letter or number and containing only letters, numbers, or-"],
	"licenseExpired": ["license 过期", "licenseExpired"],
};

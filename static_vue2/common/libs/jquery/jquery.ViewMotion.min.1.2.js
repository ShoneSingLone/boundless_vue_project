var AUI = AUI || {};
!(function (window, $, AUI) {
	"use strict";
	var gapCount = 0;
	$.fn.scrolled = function (t, i) {
		"function" == typeof t && ((i = t), (t = 100));
		var a = "vm-gap-" + gapCount++;
		this.scroll(function () {
			var e = $(this),
				n = e.data(a);
			n && clearTimeout(n),
				(n = setTimeout(function () {
					e.removeData(a), i.call(e[0]);
				}, t)),
				e.data(a, n);
		});
	};

	AUI.ViewMotion = function (options) {
		function e(i) {
			var e = $(i).offset(),
				a = e.top + $(i).scrollTop(),
				l =
					(e.top + $(i).scrollTop() + $(i).height(),
					$(window).scrollTop() + $(window).height());
			return a < l - _configs.motionThreshold ? !0 : !1;
		}
		function resetVisibility() {
			$(_configs.filter).each(function (t, i) {
				var a = $(i),
					n = a.attr("vm-level");
				n && $(i).addClass("level" + n),
					a.is("[vm-animation]") &&
						e(i) &&
						(a.addClass("animated " + a.attr("vm-animation")),
						a.css("visibility", "visible"),
						a.attr("vm-type", "0"));
			});
		}
		var _configs = $.extend(
			{ obj: window, filter: "[vm-type=1]", motionThreshold: 0, motionGap: 1e3 / 60 },
			options
		);
		var allEle = $(_configs.filter);
		if (allEle.length) {
			allEle.each(function (t, el) {
				var e = $(el).attr("vm-level");
				e && $(el).addClass("level" + e);
			});
		}
		/* 监听 滚动事件 */
		$(_configs.obj).scrolled(_configs.motionGap, function () {
			resetVisibility();
		});

		resetVisibility();
	};
})(window, jQuery, AUI);

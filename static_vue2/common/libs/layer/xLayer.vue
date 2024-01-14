<script lang="ts">
export default async function () {
	if (!Vue._xLayer) {
		const layerType = {
			/* TODO: 弹窗类型 */
			dialog: "dialog",
			/* 目前只需要一个弹窗 */
			page: "page",
			iframe: "iframe",
			loading: "loading",
			tips: "tips"
		};

		const className = {
			layuiLayer: "layui-layer",
			resize: "x-layer-resize",
			shade: "layui-layer-shade",
			move: "x-layer-move"
		};

		const xLayerTools = {
			zIndex: 0,
			/* 默认zIndex从2开始 */
			pointMousedown: [],
			/*  */
			config: {},
			end: {},
			minIndex: 0,
			minLeft: [],
			/* 五种原始层模式 */
			/* 获取节点的style属性值 */
			getStyle: function (node, name) {
				var style = node.currentStyle ? node.currentStyle : window.getComputedStyle(node, null);
				return style[style.getPropertyValue ? "getPropertyValue" : "getAttribute"](name);
			},
			/* 记录宽高坐标，用于还原 */
			record($layer) {
				const [windowHeight, windowWidth] = [$win.height(), $win.width()];

				const isLimit = $layer.height() > windowHeight;
				const isLimitWidth = $layer.width() > windowWidth;
				var area = [
					isLimitWidth ? windowWidth - 64 : $layer.width(),
					isLimit ? windowHeight - 64 : $layer.height(),
					isLimit ? 32 : $layer.position().top,
					$layer.position().left + parseFloat($layer.css("margin-left"))
				];
				$layer.find(".x-layer-max").addClass("x-layer-maxmin");
				$layer.attr({ area: area });
			},
			rescollbar(index) {
				if ($html.attr("layer-full") == index) {
					if ($html[0].style.removeProperty) {
						$html[0].style.removeProperty("overflow");
					} else {
						$html[0].style.removeAttribute("overflow");
					}
					$html.removeAttr("layer-full");
				}
			}
		};

		/* 点击层zIndex在最上层 */
		_.$single.body
			.on("click.setLayerTop", "[layer-wrapper]", event => {
				const { currentTarget } = event;
				const $currentTarget = $(currentTarget);
				xLayer.setLayerTop($currentTarget);
			})
			.on("mousemove", `.${className.move}`, function (e) {
				const { moveOrResizeInstance, moveOrResizeType, onMoving } = xLayerTools;
				/* 拖拽移动 */
				if (moveOrResizeInstance instanceof xLayer) {
					const { $eleDialog, config } = moveOrResizeInstance;
					if (moveOrResizeType === "move") {
						e.preventDefault();
						let X = e.clientX - xLayerTools.pointMousedown[0];
						let Y = e.clientY - xLayerTools.pointMousedown[1];
						const fixed = $eleDialog.css("position") === "fixed";

						xLayerTools.stX = fixed ? 0 : $win.scrollLeft();
						xLayerTools.stY = fixed ? 0 : $win.scrollTop();
						/* 控制元素不被拖出窗口外 */
						if (!config.moveOut) {
							let setRig = $win.width() - $eleDialog.outerWidth() + xLayerTools.stX;
							let setBot = $win.height() - $eleDialog.outerHeight() + xLayerTools.stY;

							if (X < xLayerTools.stX) {
								X = xLayerTools.stX;
							}

							if (X > setRig) {
								X = setRig;
							}

							if (Y < xLayerTools.stY) {
								Y = xLayerTools.stY;
							}

							if (Y > setBot) {
								Y = setBot;
							}
						}

						$eleDialog.css({ left: X, top: Y });
					}

					if (config.resize) {
						if (xLayerTools.moveOrResizeType === "resize") {
							e.preventDefault();
							const X = e.clientX - xLayerTools.pointMousedown[0];
							const Y = e.clientY - xLayerTools.pointMousedown[1];

							$eleDialog.css({
								width: xLayerTools.moveOrResizeWH[0] + X,
								height: xLayerTools.moveOrResizeWH[1] + Y
							});

							config.onResizing && config.onResizing($eleDialog);
						}
					}
				} else if (_.isFunction(onMoving)) {
					event && onMoving(event);
				}
				/* Resize */
			})
			.on("mouseup", function (e) {
				if (xLayerTools.moveOrResizeInstance instanceof xLayer) {
					const { config } = xLayerTools.moveOrResizeInstance;
					if (config.onMoveEnd) {
						config.onMoveEnd(xLayerTools.moveOrResizeInstance);
					}
					xLayerTools.moveOrResizeInstance = false;
				}
				_.$single.mask.hide();
			});

		class xLayer {
			static vms = {};
			static index = 2;
			/* 基础方法，通过配置展示内容 */
			static open = setings => {
				const layerVm = new xLayer(setings);
			};

			static close = index => {
				let layerVm = xLayer.vms[index];
				if (layerVm) {
					layerVm.close();
					layerVm = null;
					delete xLayer.vms[index];
				}
			};

			config = {
				id: "",
				type: layerType.page,
				shade: 0.3,
				fixed: true,
				/* 是否允许拖拽 */
				move: true,
				resize: true,
				title: "",
				offset: "auto",
				area: "auto",
				closeIcon: true,
				time: 0, //0表示不自动关闭
				zIndex: 10,
				maxWidth: 360,
				anim: 0,
				isOutAnim: true, //退出动画
				minStack: true, //最小化堆叠
				icon: -1
			};

			get layerId() {
				return className.layuiLayer + this.config.id;
			}
			get shadeId() {
				return className.shade + this.config.id;
			}

			get cptIconMove() {
				if (this.config.move) {
					return `<a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>`;
				} else {
					return "";
				}
			}
			get cptIconClose() {
				if (this.config.closeIcon) {
					return `<a class="layui-layer-ico layui-layer-close layui-layer-close1" href="javascript:;"></a>`;
				} else {
					return "";
				}
			}
			get cptTitle() {
				if (this.config.title) {
					return `<div class="layui-layer-title">
						${this.config.title}
						</div>`;
				} else {
					return "";
				}
			}
			get cptContent() {
				if (this.config.content) {
					return `<div id class="layui-layer-content">
                ${this.config.content}
            </div>`;
				} else {
					return "";
				}
			}
			get cptOprations() {
				if (this.config.content) {
					return `<div id class="layui-layer-content">
                ${this.config.content}
            </div>`;
				} else {
					return "";
				}
			}
			get cptOprations() {
				return `<span class="layui-layer-setwin">
				${this.cptIconMove}
				${this.cptIconClose}
			</span>`;
			}
			get cptResize() {
				if (this.config.resize) {
					return `<span class="${className.resize}"></span>`;
				} else {
					return "";
				}
			}

			get cptShade() {
				if (this.config.shade) {
					return `<div class="${className.shade} 
				id="${this.shadeId}" 
				index="${this.index}"
				style="z-index: ${this.config.zIndex - 1};"></div>`;
				}
				return "";
			}
			get cptBody() {
				return `
<div
	class="layui-layer layui-layer-page"
	id="${this.layerId}"
    times="${this.index}"
	showtime="0"
	style="display: block;"
	>
            ${this.cptTitle}
            ${this.cptContent}
            ${this.cptOprations}
            ${this.cptResize}
        </div>`;
			}

			get $layer() {
				return $("#" + this.layerId);
			}
			get $shade() {
				return $("#" + this.shadeId);
			}

			constructor(setings) {
				this.index = ++xLayer.index;
				this.zIndex = this.index + 1;

				this.config = _.merge(
					{},
					this.config,
					{
						/* 初始最大宽度：当前屏幕宽，左右留 15px 边距 */
						maxWidth: _.$single.win.width() - 15 * 2
					},
					setings
				);
				if (!this.config.area) {
					this.config.area = "auto";
				}

				if (typeof this.config.area === "string") {
					this.config.area = this.config.area === "auto" ? ["", ""] : [this.config.area, ""];
				}

				/* 初始化 */
				var { config } = this;
				if (config.id && $("#" + config.id)[0]) {
					return this;
				}
				//建立容器和遮罩
				_.$single.body.append(this.cptBody);

				this.create();
			}

			create() {
				const { config, $shade, $layer } = this;

				//遮罩
				$shade.css({
					"background-color": config.shade[1] || "#000",
					opacity: config.shade[0] || config.shade
				});

				$layer.css("visibility", "hidden");
				//坐标自适应浏览器窗口尺寸
				this.offset();
				$layer.css("visibility", "visible");

				//如果是固定定位
				if (config.fixed) {
					_.$single.win.on("resize", () => {
						this.offset();
						(/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1])) && this.auto(this.index);
					});
				}

				config.time <= 0 ||
					setTimeout(() => {
						xLayer.close(this.index);
					}, config.time);

				this.move().callback();

				//为兼容jQuery3.0的css动画影响元素尺寸计算
				if (doms.anim[config.anim]) {
					var animClass = "layer-anim " + doms.anim[config.anim];
					$layer.addClass(animClass).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
						$(this).removeClass(animClass);
					});
				}

				//记录关闭动画
				if (config.isOutAnim) {
					$layer.data("isOutAnim", true);
				}
			}

			offset() {
				const { win: $win } = _.$single;
				const { config } = this;

				var area = [this.$layer.outerWidth(), this.$layer.outerHeight()];

				/* 默认居中 */
				this.offsetTop = ($win.height() - area[1]) / 2;
				this.offsetLeft = ($win.width() - area[0]) / 2;

				/* 如果设置了偏移量 */
				if (config.offset?.top) {
					this.offsetTop = config.offset.top;
				}

				if (config.offset?.left) {
					this.offsetLeft = config.offset.left;
				}

				/* min max  */
				if (this.$layer.attr("minLeft")) {
					this.offsetTop = $win.height() - (this.$layer.find(doms[1]).outerHeight() || 0);
					this.offsetLeft = this.$layer.css("left");
				}

				this.$layer.css({ top: this.offsetTop, left: this.offsetLeft });
			}

			move() {
				/* 拖拽层 */
				const { config, $layer } = this;
				const $eleMove = $layer.find(config.move);
				const $eleResize = $layer.find("." + className.resize);

				/*  */
				$eleMove.css("cursor", "move");
				$eleMove.on("mousedown", function (e) {
					xLayer.setLayerTop($layer);
					e.preventDefault();
					if (config.move) {
						// xLayerTools.$eleMoveOrResize = $(e.currentTarget).parent(`[layer-wrapper]`);
						xLayerTools.moveOrResizeInstance = dialogInst;
						xLayerTools.moveOrResizeType = "move";
						xLayerTools.pointMousedown = [e.clientX - parseFloat($layer.css("left")), e.clientY - parseFloat($layer.css("top"))];
						_.$single.mask.css("cursor", "move").show();
					}
				});

				$eleResize.on("mousedown", function (e) {
					xLayer.setLayerTop($layer);
					e.preventDefault();
					xLayerTools.moveOrResizeInstance = dialogInst;
					xLayerTools.moveOrResizeType = "resize";
					xLayerTools.pointMousedown = [e.clientX, e.clientY];
					xLayerTools.moveOrResizeWH = [$layer.outerWidth(), $layer.outerHeight()];
					_.$single.mask.css("cursor", "se-resize").show();
				});
				return dialogInst;
			}
		}
		Vue._xLayer = { xLayer, xLayerTools };
	}

	return Vue._xLayer;
}
</script>
<style lang="less">
/* 只监听在move上的鼠标移动事件 */
.x-layer-move {
	display: none;
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	cursor: move;
	opacity: 0;
	// opacity: 0.4;
	filter: alpha(opacity=0);
	background-color: #000;
	z-index: 2147483647;
}
</style>

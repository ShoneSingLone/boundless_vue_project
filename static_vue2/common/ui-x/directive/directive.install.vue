<script lang="ts">
export default async function () {
	(function (/* 预览图片 */) {
		let instance;
		_.$previewImgs = async function (options) {
			const ImageViewer = await _.$importVue("/common/ui-x/directive/xImg/ImageViewer.vue");
			const PopupManager = await _.$importVue("/common/libs/VuePopper/popupManager.vue");

			if (options.currentUrl) {
				options.index = _.findIndex(options.urlList, i => i === options.currentUrl) || 0;
			}
			const ViewerConstructor = Vue.extend(ImageViewer);
			instance = new ViewerConstructor({
				data: options
			});
			instance.$mount();
			document.body.appendChild(instance.$el);
			instance.viewerZIndex = PopupManager.nextZIndex();
			return instance;
		};
	})();

	(function (/* 弹窗 */) {
		_.$openModal = async function (options, modalConfigs) {
			const xModal = await _.$importVue("/common/ui-x/directive/xModal/xModal.vue", {
				options,
				modalConfigs
			});
			const PopupManager = await _.$importVue("/common/libs/VuePopper/popupManager.vue");
			xModal.parent = options.parent || Vue.forceUpdate.getVM();
			let instance = new Vue(xModal);
			instance.$mount();
			document.body.appendChild(instance.$el);
			instance.viewerZIndex = PopupManager.nextZIndex();
			return instance;
		};
	})();
	(function (/* xDrawer */) {
		_.$openDrawer = async function (options) {
			const [xDrawer, PopupManager] = await _.$importVue([
				"/common/ui-x/directive/xDrawer/xDrawer.vue",
				"/common/libs/VuePopper/popupManager.vue"
			]);
			xDrawer.parent = options.parent || Vue.forceUpdate.getVM();
			const xDrawerComponent = Vue.extend(xDrawer);
			let instance = new xDrawerComponent({
				_parentListeners: {
					"update:visible"(val) {
						if (!val) {
							instance.closeModal();
						}
					}
				},
				propsData: _.merge(
					{
						destroyOnClose: true
					},
					options
				)
			});
			instance.ALLOW_MUTATING_A_PROP_DIRECTLY = true;
			instance.closeModal = () => {
				instance.$props.visible = false;
				instance.$nextTick(() => {
					setTimeout(() => {
						instance.$destroy();
					}, 600);
				});
			};
			const contentComponent = await _.$importVue(options.url, {
				options,
				xDrawerVm: instance
			});
			instance.currentContentComponent = contentComponent;
			instance.$mount();
			document.body.appendChild(instance.$el);
			instance.viewerZIndex = PopupManager.nextZIndex();
			instance.$nextTick(() => {
				instance.$props.visible = true;
			});
			return instance;
		};
	})();

	(function (/* notification */) {
		let instances = [];
		let seed = 1;

		const getCurrentNotifyComponent = componentName => {
			if (!componentName) {
				return _.$importVue("/common/ui-x/directive/xNotification/xNotification.vue");
			}
			/* TODO:可以作为prop传递 在 xNotification 内部用vIf添加新的样式*/
		};

		_.$notify = async function (options) {
			const xNotification = await getCurrentNotifyComponent(
				_xUtils.globalConfigs?.xNotification?.componentName
			);
			const PopupManager = await _.$importVue("/common/libs/VuePopper/popupManager.vue");

			const NotificationConstructor = Vue.extend(xNotification);
			options = _.merge({}, options);
			const userOnClose = options.onClose;
			const id = "notification_" + seed++;
			const position = options.position || "top-right";

			options.onClose = function () {
				_.$notify.close(id, userOnClose);
			};
			let instance = new NotificationConstructor({
				data: options
			});

			instance.id = id;
			instance.$mount();
			document.body.appendChild(instance.$el);
			instance.visible = true;
			instance.dom = instance.$el;
			instance.dom.style.zIndex = PopupManager.nextZIndex();

			let verticalOffset = options.offset || 0;
			instances
				.filter(item => item.position === position)
				.forEach(item => {
					verticalOffset += item.$el.offsetHeight + 16;
				});
			verticalOffset += 16;
			instance.verticalOffset = verticalOffset;
			instances.push(instance);
			return instance;
		};

		["success", "warning", "info", "error"].forEach(type => {
			_.$notify[type] = options => {
				if (typeof options === "string" || _.isFunction(options)) {
					options = {
						message: options
					};
				}
				options.type = type;
				return _.$notify(options);
			};
		});

		_.$notify.close = function (id, userOnClose) {
			let index = -1;
			const len = instances.length;
			const instance = instances.filter((instance, i) => {
				if (instance.id === id) {
					index = i;
					return true;
				}
				return false;
			})[0];
			if (!instance) return;

			if (typeof userOnClose === "function") {
				userOnClose(instance);
			}
			instances.splice(index, 1);
			instance.close();

			if (len > 1) {
				/* 调整其他Notify的位置 */
				const position = instance.position;
				const removedHeight = instance.dom.offsetHeight;
				for (let i = index; i < len - 1; i++) {
					if (instances[i].position === position) {
						instances[i].dom.style[instance.verticalProperty] =
							parseInt(instances[i].dom.style[instance.verticalProperty], 10) -
							removedHeight -
							16 +
							"px";
					}
				}
			}
		};

		_.$notify.closeAll = function () {
			for (let i = instances.length - 1; i >= 0; i--) {
				instances[i].close();
			}
		};
	})();

	(function (/* message */) {
		let instances = [];
		let seed = 1;

		const getCurrentMessageComponent = componentName => {
			if (!componentName) {
				return _.$importVue("/common/ui-x/directive/xMessage/xMessage.vue");
			}
		};

		_.$msg = async function (options) {
			const xMsg = await getCurrentMessageComponent(
				_xUtils.globalConfigs?.xNotification?.componentName
			);
			const PopupManager = await _.$importVue("/common/libs/VuePopper/popupManager.vue");

			const MsgConstructor = Vue.extend(xMsg);

			if (_.isString(options) || _.isNumber(options)) {
				options = {
					message: options
				};
			}
			options = _.merge({}, options);

			const { message } = options;

			/* 如果页面当中有完全一样的提示信息，则不显示重复信息 */
			const isDuplicateMessage = _.some(
				instances,
				instance => message === $(instance.$el).find(".el-message__content").text()
			);

			if (isDuplicateMessage) {
				return;
			}

			const userOnClose = options.onClose;
			const id = "message_" + seed++;

			options.onClose = function () {
				_.$msg.close(id, userOnClose);
			};
			let instance = new MsgConstructor({
				data: options
			});

			instance.id = id;
			instance.$mount();
			document.body.appendChild(instance.$el);
			let verticalOffset = options.offset || 20;
			instances.forEach(item => {
				verticalOffset += item.$el.offsetHeight + 16;
			});
			instance.verticalOffset = verticalOffset;
			instance.visible = true;
			instance.$el.style.zIndex = PopupManager.nextZIndex();
			instances.push(instance);
			instance.$on("hook:beforeDestroy", () => {});

			return instance;
		};
		["success", "warning", "info", "error"].forEach(type => {
			_.$msg[type] = options => {
				if (isObject(options) && !isVNode(options)) {
					return _.$msg({
						...options,
						type
					});
				}
				return _.$msg({
					type,
					message: options
				});
			};
		});

		_.$msg.close = function (id, userOnClose) {
			let len = instances.length;
			let index = -1;
			let removedHeight;
			for (let i = 0; i < len; i++) {
				if (id === instances[i].id) {
					removedHeight = instances[i].$el.offsetHeight;
					index = i;
					if (typeof userOnClose === "function") {
						userOnClose(instances[i]);
					}
					instances.splice(i, 1);
					break;
				}
			}
			if (len <= 1 || index === -1 || index > instances.length - 1) return;
			for (let i = index; i < len - 1; i++) {
				let dom = instances[i].$el;
				dom.style["top"] = parseInt(dom.style["top"], 10) - removedHeight - 16 + "px";
			}
		};

		_.$msg.closeAll = function () {
			for (let i = instances.length - 1; i >= 0; i--) {
				instances[i].close();
			}
		};
	})();
}
</script>
<style lang="less"></style>

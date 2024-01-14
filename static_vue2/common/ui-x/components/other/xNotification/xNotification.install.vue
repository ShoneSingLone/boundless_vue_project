<script lang="ts">
export default async function () {
	if (!_.$notify) {
		let instance;
		let instances = [];
		let seed = 1;

		const getCurrentNotifyComponent = componentName => {
			if (!componentName) {
				return _.$importVue("/common/ui-x/components/other/xNotification/xNotification.vue");
			}
			/* TODO:可以作为prop传递 在 xNotification 内部用vIf添加新的样式*/
		};

		_.$notify = async function (options) {
			console.time("xNotification");
			const xNotification = await getCurrentNotifyComponent(_useXui.globalConfigs?.xNotification?.componentName);
			const PopupManager = await _.$importVue("/common/libs/VuePopper/popupManager.vue");
			console.timeEnd("xNotification");

			const NotificationConstructor = Vue.extend(xNotification);

			options = _.merge({}, options);
			const userOnClose = options.onClose;
			const id = "notification_" + seed++;
			const position = options.position || "top-right";

			options.onClose = function () {
				_.$notify.close(id, userOnClose);
			};

			instance = new NotificationConstructor({
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
						instances[i].dom.style[instance.verticalProperty] = parseInt(instances[i].dom.style[instance.verticalProperty], 10) - removedHeight - 16 + "px";
					}
				}
			}
		};

		_.$notify.closeAll = function () {
			for (let i = instances.length - 1; i >= 0; i--) {
				instances[i].close();
			}
		};
	}
}
</script>
<style lang="less"></style>

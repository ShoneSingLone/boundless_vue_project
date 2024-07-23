<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	let { _PopupManager } = PRIVATE_GLOBAL;

	if (!_PopupManager) {
		let hasModal = false;
		let hasInitZIndex = false;
		let zIndex;

		const getModal = function () {
			if (Vue.prototype.$isServer) return;
			let modalDom = _PopupManager.modalDom;
			if (modalDom) {
				hasModal = true;
			} else {
				hasModal = false;
				modalDom = document.createElement("div");
				_PopupManager.modalDom = modalDom;

				modalDom.addEventListener("touchmove", function (event) {
					event.preventDefault();
					event.stopPropagation();
				});

				modalDom.addEventListener("click", function () {
					_PopupManager.doOnModalClick && _PopupManager.doOnModalClick();
				});
			}

			return modalDom;
		};

		const instances = {};

		_PopupManager = {
			modalFade: true,

			getInstance: function (id) {
				return instances[id];
			},

			register: function (id, instance) {
				if (id && instance) {
					instances[id] = instance;
				}
			},

			deregister: function (id) {
				if (id) {
					instances[id] = null;
					delete instances[id];
				}
			},

			nextZIndex: function () {
				return _PopupManager.zIndex++;
			},

			modalStack: [],

			doOnModalClick: function () {
				const topItem = _PopupManager.modalStack[_PopupManager.modalStack.length - 1];
				if (!topItem) return;

				const instance = _PopupManager.getInstance(topItem.id);
				if (instance && instance.closeOnClickModal) {
					instance.close();
				}
			},

			openModal: function (id, zIndex, dom, modalClass, modalFade) {
				if (Vue.prototype.$isServer) return;
				if (!id || zIndex === undefined) return;
				this.modalFade = modalFade;

				const modalStack = this.modalStack;

				for (let i = 0, j = modalStack.length; i < j; i++) {
					const item = modalStack[i];
					if (item.id === id) {
						return;
					}
				}

				const modalDom = getModal();
				const $modalDom = $(modalDom);

				$modalDom.addClass("v-modal");
				if (this.modalFade && !hasModal) {
					$modalDom.addClass("v-modal-enter");
				}
				if (modalClass) {
					let classArr = modalClass.trim().split(/\s+/);
					classArr.forEach(item => $modalDom.addClass(item));
				}
				setTimeout(() => {
					$modalDom.removeClass("v-modal-enter");
				}, 200);

				if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
					dom.parentNode.appendChild(modalDom);
				} else {
					document.body.appendChild(modalDom);
				}

				if (zIndex) {
					modalDom.style.zIndex = zIndex;
				}
				modalDom.tabIndex = 0;
				modalDom.style.display = "";

				this.modalStack.push({ id: id, zIndex: zIndex, modalClass: modalClass });
			},

			closeModal: function (id) {
				const modalStack = this.modalStack;
				const modalDom = getModal();
				const $modalDom = $(modalDom);

				if (modalStack.length > 0) {
					const topItem = modalStack[modalStack.length - 1];
					if (topItem.id === id) {
						if (topItem.modalClass) {
							let classArr = topItem.modalClass.trim().split(/\s+/);
							classArr.forEach(item => $modalDom.removeClass(item));
						}

						modalStack.pop();
						if (modalStack.length > 0) {
							modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
						}
					} else {
						for (let i = modalStack.length - 1; i >= 0; i--) {
							if (modalStack[i].id === id) {
								modalStack.splice(i, 1);
								break;
							}
						}
					}
				}

				if (modalStack.length === 0) {
					if (this.modalFade) {
						$modalDom.addClass("v-modal-leave");
					}
					setTimeout(() => {
						if (modalStack.length === 0) {
							if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
							modalDom.style.display = "none";
							_PopupManager.modalDom = undefined;
						}
						$modalDom.removeClass("v-modal-leave");
					}, 200);
				}
			}
		};

		Object.defineProperty(_PopupManager, "zIndex", {
			configurable: true,
			get() {
				if (!hasInitZIndex) {
					zIndex = zIndex || PRIVATE_GLOBAL.x_ui_z_index || 2000;
					hasInitZIndex = true;
				}
				return zIndex;
			},
			set(value) {
				zIndex = value;
			}
		});

		const getTopPopup = function () {
			if (Vue.prototype.$isServer) return;
			if (_PopupManager.modalStack.length > 0) {
				const topPopup = _PopupManager.modalStack[_PopupManager.modalStack.length - 1];
				if (!topPopup) return;
				const instance = _PopupManager.getInstance(topPopup.id);

				return instance;
			}
		};

		if (!Vue.prototype.$isServer) {
			// handle `esc` key when the popup is shown
			window.addEventListener("keydown", function (event) {
				if (event.keyCode === 27) {
					const topPopup = getTopPopup();

					if (topPopup && topPopup.closeOnPressEscape) {
						topPopup.handleClose
							? topPopup.handleClose()
							: topPopup.handleAction
								? topPopup.handleAction("cancel")
								: topPopup.close();
					}
				}
			});
		}
		PRIVATE_GLOBAL._PopupManager = _PopupManager;
	}

	return _PopupManager;
}
</script>

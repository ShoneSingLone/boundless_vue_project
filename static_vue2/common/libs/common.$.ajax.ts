(function () {
	/**
	 * ajax请求
	 * @param {Object} API_OPTIONS
	 * @param {String} API_OPTIONS.type 请求类型
	 * @param {String} API_OPTIONS.url 请求地址
	 * @param {Object} API_OPTIONS.options 请求参数
	 * @param {Function} API_OPTIONS.success 请求成功回调
	 * @param {Function} API_OPTIONS.error 请求失败回调
	 */
	_.$ajax = (function () {
		function configs(API_OPTIONS) {
			let { requestInjector, responseInjector } = this;

			const normal = options => options;
			requestInjector = requestInjector || normal;
			responseInjector = responseInjector || normal;

			let { type, url, options, success: resolve, error: reject } = API_OPTIONS;

			options = options || {};
			reject = reject || (() => null);

			const data = (isUseBodyParams => {
				if (isUseBodyParams) {
					if (options.query) {
						url = (() => {
							if (options.query) {
								if (_.isString(options.query)) {
									return url + "?" + options.query;
								}
								if (_.isPlainObject(options.query)) {
									return (
										url +
										"?" +
										_.map(
											options.query,
											(value, key) => `${key}=${encodeURIComponent(value)}`
										).join("&")
									);
								}
							}
						})();
					}
					return JSON.stringify(options.data || {});
				} else {
					if (_.isString(options.data)) {
						return options.data;
					}
					if (_.isPlainObject(options.data)) {
						return _.map(
							options.data,
							(value, key) => `${key}=${encodeURIComponent(value)}`
						).join("&");
					}
				}
			})(["POST", "PUT"].includes(_.toUpper(type)));

			const headers = _.merge({ "X-Language": localStorage["X-Language"] }, options.headers);
			const errorCodeArray = [400, 401, 402, 403, 404, 405, 500, 555];
			const configs = requestInjector(
				_.merge(
					{
						headers,
						dataType: "json",
						url,
						type,
						data,
						contentType: "application/json",
						success(response) {
							response = responseInjector(response);
							if (_.isPlainObject(response)) {
								/* 兼容 */
								const errcode = response?.errcode || response?.code;

								if (errcode) {
									if (errorCodeArray.includes(errcode)) {
										reject(response.body || response);
										return;
									}
								}
								if (response?.status) {
									if (errorCodeArray.includes(response.status)) {
										const { body, message } = response || {};
										reject(body || message);
										return;
									}
								}
							}
							return resolve(response);
						},
						error(response) {
							response = responseInjector(response);
							return reject(response);
						}
					},
					_.omit(API_OPTIONS, ["success", "error"])
				)
			);
			return configs;
		}

		const urlWrapper = url => {
			return `${window._URL_PREFIX_4_DEV || ""}${url}`;
		};
		const $ajax = {
			urlWrapper,
			upload: ({ method, url, formData, callback }) => {
				method = method || "post";
				callback = callback || (() => null);
				return new Promise((resolve, reject) => {
					const options = configs.call($ajax, {
						type: method,
						options: {},
						url: urlWrapper(url),
						success: resolve,
						error: reject
					});

					delete options.dateType;
					options.data = formData;
					options.processData = false;
					options.contentType = false;
					options.xhr = () => {
						// 监听 xhr
						const xhr = $.ajaxSettings.xhr();
						if (xhr.upload) {
							xhr.upload.addEventListener(
								"progress",
								event => {
									console.log("🚀 ~ xhr ~ event:", event);
									callback("onprogress", event);
								},
								false
							);
							return xhr;
						}
					};
					$.ajax(options);
				});

				// return new Promise((resolve, reject) => {
				// 	let xhr = new XMLHttpRequest();
				// 	xhr.onprogress = event => {
				// 		callback("onprogress", event);
				// 	};
				// 	// 当上传完成时调用
				// 	xhr.onload = function () {
				// 		if (xhr.status === 200) {
				// 			return resolve(file);
				// 		}
				// 	};
				// 	xhr.onerror = () => reject(file);
				// 	xhr.open(method, urlWrapper(url), true);
				// 	xhr.send(file);
				// });
			},
			downloadOctetStream({ url, method, beforeSend, payload }) {
				payload = payload || {};
				method = method || "get";
				beforeSend = beforeSend || (() => null);
				// ajax支持的服务器返回数据类型有：xml、json、script、html 、binary，
				// 其他类型(例如二进制流)将被作为String返回，无法触发浏览器的下载处理机制和程序。
				return new Promise((resolve, reject) => {
					$.ajax(
						configs.call($ajax, {
							url: url,
							method,
							beforeSend,
							xhrFields: {
								responseType: "blob"
							},
							dataType: "binary",
							/* 需要发送的数据 */
							data: payload,
							error(...args) {
								return reject(args);
							},
							success(result, state, xhr) {
								try {
									//result:请求到的结果数据
									//state:请求状态（success）
									//xhr:XMLHttpRequest对象
									// 从Response Headers中获取fileName
									let header = xhr.getResponseHeader("content-disposition");
									let fileName = header
										.split(";")[1]
										.split("=")[1]
										.replace(/\"/g, "");
									//获取下载文件的类型
									let type = xhr.getResponseHeader("content-type");
									//结果数据类型处理
									let blob = new Blob([result], { type: "image/jpeg" });

									//对于<a>标签，只有 Firefox 和 Chrome（内核）支持 download 属性
									//IE10以上支持blob，但是依然不支持download
									if ("download" in document.createElement("a")) {
										//支持a标签download的浏览器
										//通过创建a标签实现
										let link = document.createElement("a");
										//文件名
										link.download = fileName;
										link.style.display = "none";
										link.href = URL.createObjectURL(blob);
										document.body.appendChild(link);
										link.click(); //执行下载
										URL.revokeObjectURL(link.href); //释放url
										document.body.removeChild(link); //释放标签
									} else {
										//不支持
										if (window.navigator.msSaveOrOpenBlob) {
											window.navigator.msSaveOrOpenBlob(blob, fileName);
										}
									}
								} catch (error) {
									console.error(error);
								} finally {
									resolve();
								}
							}
						})
					);
				});
			},
			post: (url, options = {}) => {
				return new Promise((resolve, reject) => {
					$.ajax(
						configs.call($ajax, {
							type: "POST",
							url: urlWrapper(url),
							options,
							success: resolve,
							error: reject
						})
					);
				});
			},
			get: (url, options = {}) => {
				return new Promise((resolve, reject) => {
					$.ajax(
						configs.call($ajax, {
							type: "GET",
							url: urlWrapper(url),
							options,
							timeout: 1000 * 60,
							success: resolve,
							error: reject
						})
					);
				});
			},
			put: (url, options = {}) => {
				return new Promise((resolve, reject) => {
					$.ajax(
						configs.call($ajax, {
							type: "put",
							url: urlWrapper(url),
							options,
							success: resolve,
							error: reject
						})
					);
				});
			},
			delete: (url, options = {}) => {
				return new Promise((resolve, reject) => {
					$.ajax(
						configs.call($ajax, {
							type: "delete",
							url: urlWrapper(url),
							options,
							success: resolve,
							error: reject
						})
					);
				});
			}
		};
		return $ajax;
	})();
})();

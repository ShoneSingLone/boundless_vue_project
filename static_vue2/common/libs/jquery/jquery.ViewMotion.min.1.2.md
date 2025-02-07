### 用法说明

用于在页面滚动时动态添加动画效果。以下是具体的使用方法和示例：

#### 使用步骤

1. **引入依赖**：

    - 确保已经引入了 jQuery 库。
    - 引入这段代码所在的 JavaScript 文件。

2. **配置元素属性**：

    - 在 HTML 中为需要添加动画效果的元素设置特定的属性：
        - `vm-type="1"`：标识该元素需要参与动画效果。
        - `vm-level`：指定元素的层级（可选）。
        - `vm-animation`：指定动画类名（如 `fadeIn`, `bounceIn` 等）。

3. **调用 `ViewMotion` 函数**：
    - 在页面加载或初始化时调用 `ViewMotion` 函数，并传入自定义配置（可选）。

#### 示例代码

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>ViewMotion Example</title>
		<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
		<script src="path/to/ViewMotion.min.1.2.js"></script>
		<style>
			.animated {
				visibility: hidden;
			}
			.fadeIn {
				animation: fadeIn 1s ease-in-out;
			}
			@keyframes fadeIn {
				from {
					opacity: 0;
				}
				to {
					opacity: 1;
				}
			}
		</style>
	</head>
	<body>
		<div class="content" vm-type="1" vm-level="1" vm-animation="fadeIn">
			This content will fade in when scrolled into view.
		</div>

		<script>
			$(document).ready(function () {
				// 调用 ViewMotion 函数，可以传入自定义配置
				AUI.ViewMotion({
					obj: window, // 监听的对象，默认是 window
					filter: "[vm-type=1]", // 选择器，默认是 [vm-type=1]
					motionThreshold: 100, // 可视区域阈值，默认是 0
					motionGap: 1000 / 60 // 滚动事件触发间隔时间，默认是 16ms (约60fps)
				});
			});
		</script>
	</body>
</html>
```

### 解释

1. **HTML 部分**：

    - 定义了一个带有 `vm-type="1"` 和 `vm-animation="fadeIn"` 属性的 `div` 元素。
    - 这个元素将在滚动到可视区域内时应用 `fadeIn` 动画效果。

2. **CSS 部分**：

    - 定义了 `.animated` 类，初始状态下将元素隐藏。
    - 定义了 `@keyframes` 规则，描述了 `fadeIn` 动画的效果。

3. **JavaScript 部分**：
    - 页面加载完成后，调用 `AUI.ViewMotion` 函数。
    - 传递了自定义配置对象，指定了监听对象、选择器、可视区域阈值和滚动事件触发间隔时间。

通过这种方式，当用户滚动页面时，符合条件的元素会根据设定的动画类自动显示并执行动画效果，从而提升用户体验。

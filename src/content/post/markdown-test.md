---
title: Markdown渲染测试
description: 测试博客文章页面的Markdown渲染效果，包括标题、代码块、列表等各种元素
publishDate: 2025-01-04
category: 技术类
tags: ["测试", "Markdown", "渲染", "技术"]
---

# 一级标题测试

这是一个一级标题的测试段落。

## 二级标题测试

这是一个二级标题的测试段落，用来验证标题的渲染效果。

### 三级标题测试

这是一个三级标题的测试段落。

#### 四级标题测试

这是一个四级标题的测试段落。

##### 五级标题测试

这是一个五级标题的测试段落。

###### 六级标题测试

这是一个六级标题的测试段落。

## 段落和文本测试

这是一个普通段落，用来测试段落的渲染效果。段落应该有适当的行高和间距，使用霞鹜文楷字体，并且与汉白玉主题保持一致。

这是另一个段落，用来测试段落之间的间距。**这是粗体文本**，*这是斜体文本*，`这是行内代码`。

## 列表测试

### 无序列表

- 第一个列表项
- 第二个列表项
  - 嵌套列表项1
  - 嵌套列表项2
- 第三个列表项

### 有序列表

1. 第一个有序列表项
2. 第二个有序列表项
   1. 嵌套有序列表项1
   2. 嵌套有序列表项2
3. 第三个有序列表项

## 代码块测试

### 行内代码

这是一个包含 `console.log('Hello World')` 行内代码的段落。

### JavaScript代码块

```javascript
function greetUser(name) {
    console.log(`Hello, ${name}!`);
    return `Welcome to our blog, ${name}`;
}

const user = "李希宁";
const message = greetUser(user);
console.log(message);
```

### Python代码块

```python
def calculate_fibonacci(n):
    """计算斐波那契数列的第n项"""
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)

# 测试函数
for i in range(10):
    print(f"F({i}) = {calculate_fibonacci(i)}")
```

### CSS代码块

```css
.prose {
    font-family: 'LXGW Bright SemiLight', 'Microsoft YaHei', 'PingFang SC', sans-serif;
    color: hsl(var(--theme-text));
    max-width: none;
}

.prose code {
    background-color: hsl(var(--theme-link) / 0.1);
    padding: 0.125rem 0.25rem;
    border-radius: 3px;
    font-size: 0.875rem;
}
```

## 引用块测试

> 这是一个引用块的测试。引用块应该有适当的左边框和缩进，使用汉白玉主题的颜色。
> 
> 这是引用块的第二段。

> 道生一，一生二，二生三，三生万物。
> 
> —— 《道德经》

## 链接测试

这是一个指向 [GitHub](https://github.com) 的外部链接。

这是一个指向 [首页](/) 的内部链接。

## 表格测试

| 功能 | 状态 | 描述 |
|------|------|------|
| 标题渲染 | ✅ | 支持H1-H6标题 |
| 代码高亮 | ✅ | 支持多种语言 |
| 列表显示 | ✅ | 支持有序和无序列表 |
| 引用块 | ✅ | 支持多段引用 |
| 链接样式 | ✅ | 支持内外链接 |

## 分隔线测试

---

这是分隔线上方的内容。

这是分隔线下方的内容。

## 总结

这个测试文件包含了各种Markdown元素，用来验证博客文章页面的渲染效果是否正确。所有元素都应该与汉白玉主题保持一致，使用霞鹜文楷字体，并且有良好的可读性。

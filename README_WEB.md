# 🍽️ 我家的小饭桌 - 网页版

> 一个温馨的家庭菜谱网站，记录我家喜欢的每一道美味

## ✨ 功能特点

- 📱 **手机友好** - 完美适配手机、平板、电脑
- 🔍 **智能搜索** - 快速找到想吃的菜
- 🏷️ **分类浏览** - 早餐、午餐、晚餐、小食
- 🎲 **随机推荐** - 不知道吃什么？让它帮你选！
- ⭐ **评分标签** - 一眼看出哪些菜最受欢迎
- 📖 **详细食谱** - 食材、做法、小贴士一应俱全

## 🚀 部署到 Vercel

1. Fork 这个仓库
2. 登录 [Vercel](https://vercel.com)
3. 点击 "New Project"
4. 导入这个 GitHub 仓库
5. 点击 "Deploy"
6. 完成！分享链接给家人

## 📝 添加新菜谱

编辑 `recipes.js` 文件，按照现有格式添加新菜谱：

```javascript
{
    id: 2,  // 自增 ID
    name: "菜名",
    category: "早餐/午餐/晚餐/小食",
    rating: 5,  // 1-5 星
    difficulty: 1,  // 1-3，简单/中等/复杂
    time: 30,  // 分钟
    date: "2026-02-08",
    image: "./图片/xxx_精美版.png",
    originalImage: "./图片/xxx_原图.png",
    ingredients: [...],
    steps: [...],
    tips: [...],
    tags: [...],
    notes: "备注"
}
```

## 📷 添加图片

1. 将菜品照片放到 `图片/` 文件夹
2. 在菜谱数据中引用图片路径
3. 提交并推送到 GitHub
4. Vercel 自动重新部署

## 💻 本地开发

直接打开 `index.html` 即可，或者使用本地服务器：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve
```

然后访问 `http://localhost:8000`

## 📊 技术栈

- 纯静态网站（HTML + CSS + JavaScript）
- 无需数据库，无需后端
- 零成本部署到 Vercel

## 💖 致家人

希望这个小网站能让我们的餐桌更丰富多彩！

---

*用爱记录每一餐 🍽️*

// 全局状态
let currentCategory = 'all';
let currentSearch = '';

// DOM 元素
const recipesContainer = document.getElementById('recipes-container');
const searchInput = document.getElementById('search');
const randomBtn = document.getElementById('random');
const tabs = document.querySelectorAll('.tab');
const modal = document.getElementById('recipe-modal');
const closeModal = document.querySelector('.close');
const totalCount = document.getElementById('total-count');

// 初始化
function init() {
    renderRecipes();
    updateStats();
    bindEvents();
}

// 绑定事件
function bindEvents() {
    // 分类切换
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.dataset.category;
            renderRecipes();
        });
    });

    // 搜索
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        renderRecipes();
    });

    // 随机推荐
    randomBtn.addEventListener('click', () => {
        const filtered = getFilteredRecipes();
        if (filtered.length > 0) {
            const random = filtered[Math.floor(Math.random() * filtered.length)];
            showRecipeDetail(random);
        }
    });

    // 关闭模态框
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// 获取筛选后的菜谱
function getFilteredRecipes() {
    return recipes.filter(recipe => {
        const matchCategory = currentCategory === 'all' || recipe.category === currentCategory;
        const matchSearch = !currentSearch || 
            recipe.name.toLowerCase().includes(currentSearch) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(currentSearch));
        return matchCategory && matchSearch;
    });
}

// 渲染菜谱列表
function renderRecipes() {
    const filtered = getFilteredRecipes();
    
    if (filtered.length === 0) {
        recipesContainer.innerHTML = `
            <div class="empty-state">
                <h2>😔 没有找到菜谱</h2>
                <p>试试其他分类或搜索关键词吧</p>
            </div>
        `;
        return;
    }

    recipesContainer.innerHTML = filtered.map(recipe => `
        <div class="recipe-card" onclick="showRecipeDetail(${recipe.id})">
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image" onerror="this.src='${recipe.originalImage}'">
            <div class="recipe-info">
                <div class="recipe-title">${recipe.name}</div>
                <div class="recipe-meta">
                    <span>${'⭐'.repeat(recipe.rating)}</span>
                    <span>⏱️ ${recipe.time}分钟</span>
                </div>
                <div class="recipe-tags">
                    ${recipe.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// 显示菜谱详情
function showRecipeDetail(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    const detailHtml = `
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-detail-image" onerror="this.src='${recipe.originalImage}'">
        <h2>${recipe.name}</h2>
        <div class="recipe-meta">
            <span>${'⭐'.repeat(recipe.rating)} (${recipe.rating}/5)</span>
            <span>⏱️ ${recipe.time}分钟</span>
            <span>🍳 难度: ${'⭐'.repeat(recipe.difficulty)}</span>
        </div>
        
        <h3>🥘 食材清单</h3>
        ${recipe.ingredients.map(group => `
            <h4>${group.type}</h4>
            <ul>
                ${group.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `).join('')}
        
        <h3>👨‍🍳 做法</h3>
        <ol>
            ${recipe.steps.map(step => `
                <li><strong>${step.title}:</strong> ${step.detail}</li>
            `).join('')}
        </ol>
        
        <h3>💡 小贴士</h3>
        <ul>
            ${recipe.tips.map(tip => `<li>${tip}</li>`).join('')}
        </ul>
        
        <h3>🏷️ 标签</h3>
        <div class="recipe-tags">
            ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        
        ${recipe.notes ? `
            <h3>📝 备注</h3>
            <p>${recipe.notes}</p>
        ` : ''}
        
        <p style="margin-top: 2rem; color: #999; font-size: 0.9rem;">添加日期：${recipe.date}</p>
    `;

    document.getElementById('recipe-detail').innerHTML = detailHtml;
    modal.style.display = 'block';
}

// 更新统计
function updateStats() {
    totalCount.textContent = recipes.length;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

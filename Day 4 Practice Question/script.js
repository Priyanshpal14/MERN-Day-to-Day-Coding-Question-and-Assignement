/* ============================================================
   FETCH API ASSIGNMENT - BLOG & TODO PLATFORM
   ============================================================ */

const BlogPlatform = (function() {
  const API_CONFIG = {
    BASE_URL: 'https://jsonplaceholder.typicode.com',
    ENDPOINTS: { POSTS: '/posts', TODOS: '/todos' },
    LIMITS: { POSTS: 15, TODOS: 25 }
  };

  const DOM_ELEMENTS = { postsContainer: null, todosContainer: null };

  function initializeDOMReferences() {
    DOM_ELEMENTS.postsContainer = document.getElementById('posts-container');
    DOM_ELEMENTS.todosContainer = document.getElementById('todos-container');
  }

  function showLoadingState(container, message) {
    container.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        <p>${message}</p>
      </div>`;
  }

  function showErrorState(container, title, message) {
    container.innerHTML = `
      <div class="error">
        <div class="error-title">❌ ${title}</div>
        <div class="error-details">${message}</div>
      </div>`;
  }

  function showEmptyState(container, icon, message) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">${icon}</div>
        <div class="empty-state-text">${message}</div>
      </div>`;
  }

  function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  async function fetchDataFromAPI(endpoint) {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(`Fetch Error: ${err.message}`);
    }
  }

  function renderPosts(posts) {
    const container = DOM_ELEMENTS.postsContainer;
    if (!posts.length) return showEmptyState(container, '📭', 'No blog posts available');
    const limited = posts.slice(0, API_CONFIG.LIMITS.POSTS);
    container.innerHTML = `
      <div class="posts-list">
        ${limited.map(p => `
          <div class="post-card">
            <span class="post-id">Post #${p.id}</span>
            <h3 class="post-title">${escapeHTML(p.title)}</h3>
            <p class="post-body">${escapeHTML(p.body)}</p>
          </div>`).join('')}
      </div>`;
  }

  async function fetchAndDisplayPosts() {
    const container = DOM_ELEMENTS.postsContainer;
    showLoadingState(container, 'Fetching blog posts...');
    try {
      const posts = await fetchDataFromAPI(API_CONFIG.ENDPOINTS.POSTS);
      renderPosts(posts);
    } catch (err) {
      showErrorState(container, 'Failed to Load Blog Posts', err.message);
    }
  }

  function calculateTodoStats(todos) {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }

  function renderTodos(todos) {
    const container = DOM_ELEMENTS.todosContainer;
    if (!todos.length) return showEmptyState(container, '📋', 'No todos available');
    const limited = todos.slice(0, API_CONFIG.LIMITS.TODOS);
    const stats = calculateTodoStats(limited);

    const todosHTML = limited.map(t => `
      <div class="todo-item ${t.completed ? 'completed' : ''}">
        <div class="todo-content">
          <div class="todo-text">${escapeHTML(t.title)}</div>
        </div>
        <span class="todo-id">#${t.id}</span>
      </div>`).join('');

    container.innerHTML = `
      <div class="todos-list">${todosHTML}</div>
      <div class="stats-section">
        <div class="stats-grid">
          <div class="stat-card"><div class="stat-value">${stats.total}</div><div class="stat-label">Total</div></div>
          <div class="stat-card"><div class="stat-value">${stats.completed}</div><div class="stat-label">Completed</div></div>
          <div class="stat-card"><div class="stat-value">${stats.pending}</div><div class="stat-label">Pending</div></div>
        </div>
      </div>`;
  }

  async function fetchAndDisplayTodos() {
    const container = DOM_ELEMENTS.todosContainer;
    showLoadingState(container, 'Fetching todo list...');
    try {
      const todos = await fetchDataFromAPI(API_CONFIG.ENDPOINTS.TODOS);
      renderTodos(todos);
    } catch (err) {
      showErrorState(container, 'Failed to Load Todo List', err.message);
    }
  }

  async function init() {
    initializeDOMReferences();
    await Promise.allSettled([fetchAndDisplayPosts(), fetchAndDisplayTodos()]);
  }

  return { init, fetchAndDisplayPosts, fetchAndDisplayTodos };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', BlogPlatform.init);
} else {
  BlogPlatform.init();
}

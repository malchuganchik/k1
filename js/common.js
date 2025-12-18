// Общие функции для всех страниц

document.addEventListener('DOMContentLoaded', () => {
    // Мобильное меню
    const burgerBtn = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');
    
    if (burgerBtn && nav) {
        burgerBtn.addEventListener('click', () => {
            nav.classList.toggle('header__nav--active');
            burgerBtn.classList.toggle('header__burger--active');
        });
        
        // Закрытие меню при клике на ссылку
        nav.querySelectorAll('.header__nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('header__nav--active');
                burgerBtn.classList.remove('header__burger--active');
            });
        });
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !burgerBtn.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                burgerBtn.classList.remove('active');
            }
        });
    }
    
    // Поиск (базовая функциональность)
    const searchInput = document.getElementById('header-search');
    const searchBtn = document.querySelector('.header__search-btn');
    
    if (searchInput && searchBtn) {
        const handleSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `catalog.html?search=${encodeURIComponent(query)}`;
            }
        };
        
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
});





// Функция для определения текущего сезона
function getCurrentSeason() {
    const month = new Date().getMonth() + 1; // 1-12
    if (month === 12 || month === 1 || month === 2) return "Зима";
    if (month >= 3 && month <= 5) return "Весна";
    if (month >= 6 && month <= 8) return "Лето";
    return "Осень";
}

// Функция для проверки, в сезоне ли продукт
function isProductInSeason(product) {
    if (!product.season || !Array.isArray(product.season)) return false;
    const currentSeason = getCurrentSeason();
    return product.season.includes(currentSeason);
}

document.addEventListener("DOMContentLoaded", () => {
    // Загрузка популярных товаров
    fetch("../data/products.json")
        .then(res => res.json())
        .then(products => {
            const container = document.querySelector(".products__grid");

            const popularNames = [
                "Молоко",
                "Морковь",
                "Яблоки",
                "Картофель",
                "Яйца 10 шт.",
                "Куриное мясо",
                "Говядина",
                "Свинина",
                "Огурцы",
                "Помидоры",
                "Капуста",
                "Клубника",
                "Малина",
                "Мёд",
                "Черника"
            ];

            const popularProducts = products.filter(product => popularNames.includes(product.name));

            popularProducts.forEach(product => {
                const card = document.createElement("div");
                card.classList.add("product-card");
                const inSeason = isProductInSeason(product);
                const seasonClass = inSeason 
                    ? "product-card__season" 
                    : "product-card__season product-card__season--placeholder";
                const imageSrc = "../" + product.image;

                card.innerHTML = `
                    <img src="${imageSrc}" alt="${product.name}" class="product-card__img">
                    <h3 class="product-card__name">${product.name}</h3>
                    <p class="product-card__price">${product.price} ₽</p>
                    <span class="${seasonClass}">В сезоне</span>
                    <p class="product-card__farmer">Фермер: ${product.farmer}</p>
                    <div class="product-card__actions">
                      <button class="product-card__btn product-card__btn--red btn-add" data-id="${product.id}" aria-label="Добавить в корзину">В корзину</button>
                      <a href="product.html?id=${product.id}" class="product-card__btn product-card__btn--green">Подробнее</a>
                    </div>
                `;

                container.appendChild(card);
            });
        })
        .catch(err => console.error("Ошибка загрузки товаров:", err));
});

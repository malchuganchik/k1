const cards = document.querySelectorAll('.season-card');

function showCardsOnScroll() {
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            card.style.animationPlayState = "running";
        }
    });
}

window.addEventListener("scroll", showCardsOnScroll);
showCardsOnScroll();

const seasonData = {
    winter: {
        title: "Зима",
        // Зимний сезон: корнеплоды и запасы
        products: ["Картофель", "Лук", "Чеснок", "Капуста", "Яблоки", "Грецкий орех"],
        chart: [90, 60, 40, 70, 65, 50]
    },
    spring: {
        title: "Весна",
        // Весна: первая свежая зелень и молочная продукция
        products: ["Зелень", "Редис", "Морковь", "Брокколи", "Молоко", "Йогурт"],
        chart: [80, 60, 55, 50, 70, 65]
    },
    summer: {
        title: "Лето",
        // Лето: максимум местных овощей, ягод и мёда
        products: ["Клубника", "Огурцы", "Помидоры", "Перец", "Малина", "Черника", "Мёд"],
        chart: [95, 90, 95, 80, 85, 80, 70]
    },
    autumn: {
        title: "Осень",
        // Осень: фрукты, тыква, орехи и мёд
        products: ["Яблоки", "Груши", "Тыква", "Виноград", "Капуста", "Грецкий орех", "Мёд"],
        chart: [90, 75, 80, 70, 85, 65, 60]
    }
};

const modal = document.getElementById("seasonModal");
const modalTitle = document.getElementById("modalTitle");
const productList = document.getElementById("productList");

let seasonChart = null;

// Клик по сезону
document.querySelectorAll(".season-card").forEach(card => {
    card.addEventListener("click", () => {
        const season = card.dataset.season;
        const data = seasonData[season];

        modalTitle.textContent = data.title;
        productList.innerHTML = "";

        data.products.forEach(p => {
            const li = document.createElement("li");
            li.textContent = p;
            productList.appendChild(li);
        });

        modal.style.display = "flex";
        renderChart(data);
    });
});

// Закрытие модалки
document.querySelector(".close-modal").onclick = () => {
    modal.style.display = "none";
};

// Клик вне окна
window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};

// Чарт
function renderChart(data) {
    const ctx = document.getElementById("seasonChart").getContext("2d");

    if (seasonChart) {
        seasonChart.destroy();
    }

    seasonChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: data.products,
            datasets: [{
                data: data.chart
            }]
        }
    });
}
// Анимация появления при прокрутке

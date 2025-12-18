document.addEventListener("DOMContentLoaded", () => {
    const reviewsList = document.getElementById("reviews-list");
    const reviewForm = document.getElementById("review-form");

    // Пример отзывов
    let reviews = [
       
    ];

    function renderReviews() {
        reviewsList.innerHTML = "";
        reviews.forEach(r => {
            const div = document.createElement("div");
            div.classList.add("review-item");
            div.innerHTML = `
                <div class="review-header">
                    <span class="review-author">${r.name}</span>
                    <span class="review-date">${r.date}</span>
                </div>
                <div class="review-text">${r.text}</div>
            `;
            reviewsList.appendChild(div);
        });
    }

    renderReviews();

    // Добавление нового отзыва
    reviewForm.addEventListener("submit", e => {
        e.preventDefault();
        const name = document.getElementById("review-name").value;
        const text = document.getElementById("review-text").value;
        const date = new Date().toISOString().split("T")[0];

        reviews.unshift({name, text, date});
        renderReviews();

        reviewForm.reset();
    });
});

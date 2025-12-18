document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("farmers-list");

    fetch("../data/farmers.json")
        .then(res => res.json())
        .then(farmers => {
            farmers.forEach(farmer => {
                const card = document.createElement("div");
                card.classList.add("farmer-card");

                card.innerHTML = `
                    <div class="farmer-card__content">
                        <h3>${farmer.name}</h3>
                        <p>${farmer.description}</p>
                        <p><strong>Опыт:</strong> ${farmer.experience}</p>
                        <p><strong>Регион:</strong> ${farmer.location}</p>
                        <p><strong>Телефон:</strong> ${farmer.phone}</p>

                        <h4>Продукция:</h4>
                        <div class="farmer-card__products">
                            ${farmer.products.map(p => `<span class="farmer-card__product-tag">${p}</span>`).join("")}
                        </div>
                    </div>

                    <div class="farmer-card__side-decor">
                        <div class="farmer-card__photo">
                            <img src="../${farmer.image}" alt="${farmer.name}">
                        </div>
                    </div>
                `;

                container.appendChild(card);
            });
        })
        .catch(err => console.error("Ошибка загрузки фермеров:", err));
});


document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('cart-content');
    const cartList = document.querySelector('.cart__list');
    const cartTotalEl = document.getElementById('cart-total');
    const cartEmpty = document.getElementById('cart-empty');
    const orderBtn = document.querySelector('.cart__order-button');

    let products = [];

    try {
        const res = await fetch('../data/products.json');
        products = await res.json();
    } catch (e) {
        console.error('Не удалось загрузить товары', e);
    }

    function getCart() {
        try { return JSON.parse(localStorage.getItem('cart')) || []; }
        catch { return []; }
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function renderCart() {
        const cart = getCart();
        cartList.innerHTML = '';

        if (cart.length === 0) {
            container.style.display = 'none';
            cartEmpty.style.display = 'block';
            return;
        }

        container.style.display = 'block';
        cartEmpty.style.display = 'none';

        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;

            const li = document.createElement('li');
            li.className = 'cart__item';
            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart__item-img" />
                <div class="cart__item-info">
                    <h3>${item.name}</h3>
                    <p>Цена: ${item.price} ₽</p>
                    <p>Количество: ${item.quantity}</p>
                </div>
                <button class="cart__item-remove" data-id="${item.id}">×</button>
            `;
            cartList.appendChild(li);

            li.querySelector('.cart__item-remove').addEventListener('click', () => {
                removeFromCart(item.id);
            });
        });

        cartTotalEl.textContent = total + ' ₽';
    }

    function removeFromCart(id) {
        const cart = getCart().filter(item => item.id != id);
        saveCart(cart);
        renderCart();
    }

    renderCart();

    // ===== Модальное окно =====
    const modal = document.createElement('div');
    modal.className = 'order-modal';
    modal.innerHTML = `
        <div class="order-modal__content">
            <h2>Спасибо за заказ!</h2>
            <p>Ваш заказ принят. Мы свяжемся с вами по телефону для подтверждения.</p>
            <p>Адрес доставки: <span id="order-address"></span></p>
            <p>Время доставки: на следующий день с 8:00 до 18:00</p>
            <p>Оплата при получении</p>
            <button class="order-modal__close">Закрыть</button>
        </div>
    `;
    document.body.appendChild(modal);

    const closeModal = modal.querySelector('.order-modal__close');
    closeModal.addEventListener('click', () => modal.classList.remove('active'));

    orderBtn.addEventListener('click', () => {
        const phone = prompt('Введите ваш номер телефона:');
        const address = prompt('Введите адрес доставки:');

        if (!phone || !address) {
            alert('Пожалуйста, заполните все данные для доставки.');
            return;
        }

        modal.querySelector('#order-address').textContent = address;
        modal.classList.add('active');

        localStorage.removeItem('cart');
        renderCart();
    });
});

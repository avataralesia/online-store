
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. УЛУЧШЕНИЕ КАРТОЧЕК ТОВАРОВ ==========
    
    // Добавляем эффект при наведении на карточку товара
    const productCards = document.querySelectorAll('.cart');
    
    productCards.forEach(card => {
        const addToCartBtn = card.querySelector('.add_cart');
        const productImage = card.querySelector('.cart_img');
        
        // Показываем кнопку "Add to Cart" при наведении
        card.addEventListener('mouseenter', function() {
            addToCartBtn.style.opacity = '1';
            addToCartBtn.style.visibility = 'visible';
            if (productImage) {
                productImage.style.transform = 'scale(1.05)';
                productImage.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            addToCartBtn.style.opacity = '0';
            addToCartBtn.style.visibility = 'hidden';
            if (productImage) {
                productImage.style.transform = 'scale(1)';
            }
        });
        
        // Обработка клика по "Add to Cart"
        addToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            addToCartAnimation(this);
            updateCartCounter();
        });
    });
    
    // Анимация добавления в корзину
    function addToCartAnimation(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '✓ Added!';
        button.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    }
    
    // Счетчик товаров в корзине (в хедере)
// Обновленная функция updateCartCounter
function updateCartCounter() {
    console.log('updateCartCounter called'); // Для отладки
    
    // Ищем иконку корзины - пробуем разные селекторы
    let basketIcon = document.querySelector('.basket');
    
    // Если не нашли, ищем в других местах
    if (!basketIcon) {
        basketIcon = document.querySelector('.header__box .basket');
        console.log('Trying alternative selector:', basketIcon);
    }
    
    if (!basketIcon) {
        basketIcon = document.querySelector('a[href="cart.html"]');
        console.log('Trying href selector:', basketIcon);
    }
    
    if (basketIcon) {
        console.log('Basket icon found:', basketIcon);
        
        let existingCounter = basketIcon.querySelector('.cart-counter');
        
        if (!existingCounter) {
            existingCounter = document.createElement('span');
            existingCounter.className = 'cart-counter';
            existingCounter.style.cssText = `
                position: absolute;
                top: -5px;
                right: -5px;
                background: #F16D7F;
                color: white;
                border-radius: 50%;
                width: 18px;
                height: 18px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                z-index: 10;
            `;
            basketIcon.style.position = 'relative';
            basketIcon.appendChild(existingCounter);
        }
        
        let currentCount = parseInt(existingCounter.textContent) || 0;
        existingCounter.textContent = currentCount + 1;
        existingCounter.style.display = 'flex';
        
        console.log('Counter updated to:', existingCounter.textContent);
    } else {
        console.log('Basket icon not found!');
        console.log('Available basket elements:', document.querySelectorAll('[href*="cart"], [class*="basket"]'));
    }
}    
    // ========== 2. УЛУЧШЕНИЕ ФОРМЫ ПОДПИСКИ ==========
    
    const subscribeForm = document.querySelector('.enter');
    const emailInput = document.querySelector('.email_text');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Симуляция успешной подписки
                showSubscriptionSuccess();
            } else {
                showSubscriptionError();
            }
        });
        
        // Валидация email в реальном времени
        emailInput.addEventListener('input', function() {
            const email = this.value.trim();
            if (email && !validateEmail(email)) {
                this.style.borderColor = '#F16D7F';
            } else {
                this.style.borderColor = '';
            }
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showSubscriptionSuccess() {
        const originalContent = document.querySelector('.footer_middle_right').innerHTML;
        document.querySelector('.footer_middle_right').innerHTML = `
            <div class="subscription-success" style="text-align: center; padding: 20px;">
                <h3 style="color: #4CAF50; margin-bottom: 10px;">✓ Subscribed Successfully!</h3>
                <p>Thank you for subscribing to our newsletter.</p>
                <button onclick="location.reload()" style="
                    margin-top: 15px;
                    padding: 10px 20px;
                    background: #F16D7F;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                ">Back</button>
            </div>
        `;
    }
    
    function showSubscriptionError() {
        alert('Please enter a valid email address.');
        emailInput.focus();
    }
    
    // ========== 3. ПЛАВНАЯ ПРОКРУТКА ==========
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ========== 4. LAZY LOAD ДЛЯ ИЗОБРАЖЕНИЙ ==========
    
    const lazyImages = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    // Преобразуем обычные изображения в lazy load
    lazyImages.forEach(img => {
        if (img.complete || img.src.includes('data:')) return;
        
        img.dataset.src = img.src;
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkZGRkIi8+PC9zdmc+';
        imageObserver.observe(img);
    });
    
    // ========== 5. УЛУЧШЕНИЕ МЕНЮ ==========
    
    const menuSwitcher = document.getElementById('switcher');
    const dropMenu = document.querySelector('.drop');
    
    if (menuSwitcher && dropMenu) {
        // Закрытие меню при клике outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.header_right') && menuSwitcher.checked) {
                menuSwitcher.checked = false;
                dropMenu.style.display = 'none';
            }
        });
        
        // Обработка изменения состояния чекбокса
        menuSwitcher.addEventListener('change', function() {
            if (this.checked) {
                dropMenu.style.display = 'block';
                dropMenu.style.animation = 'slideDown 0.3s ease';
            } else {
                dropMenu.style.animation = 'slideUp 0.3s ease';
                setTimeout(() => {
                    dropMenu.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // ========== 6. АНИМАЦИЯ ПРИ СКРОЛЛЕ ==========
    
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.sale_items, .cart');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    };
    
    // Инициализация анимации
    const animatedElements = document.querySelectorAll('.sale_items, .cart');
    animatedElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Запускаем сразу для видимых элементов
    animateOnScroll();
    
    console.log('Online store JS loaded successfully!');
});

// Добавляем CSS анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideUp {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }
    
    .add_cart {
        transition: all 0.3s ease !important;
    }
    
    @media (max-width: 768px) {
        .cart-counter {
            width: 18px !important;
            height: 18px !important;
            font-size: 10px !important;
        }
    }
`;
document.head.appendChild(style);
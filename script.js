// Ждем, пока весь HTML загрузится
document.addEventListener('DOMContentLoaded', () => {

    // 1. ЭФФЕКТ "СНЕГОПАДА"
    const snowContainer = document.getElementById('snow-container');
    const snowflakeCount = 100; // Количество снежинок

    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Рандомизация для "вау-эффекта"
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = (Math.random() * 5 + 5) + 's'; // 5-10 секунд
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowflake.style.opacity = Math.random() * 0.5 + 0.3; // 0.3 - 0.8
        const size = Math.random() * 3 + 1; // 1px - 4px
        snowflake.style.width = size + 'px';
        snowflake.style.height = size + 'px';

        snowContainer.appendChild(snowflake);
    }

    // 2. ЭФФЕКТ ПЕЧАТАЮЩЕГОСЯ ТЕКСТА
    const typingSpan = document.getElementById('typing-span');
    // Используем ваши навыки!
    const textArray = [
        "C# Разработчик",
        "Unity Expert",
        "Python Developer",
        "Web-Мастер",
        "Администратор Серверов"
    ];
    let textIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textIndex].length) {
            typingSpan.textContent += textArray[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            // Ждем перед стиранием
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingSpan.textContent = textArray[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            // Переход к следующему тексту
            textIndex = (textIndex + 1) % textArray.length;
            setTimeout(type, 500);
        }
    }

    // Запускаем анимацию
    setTimeout(type, 1000);

    // 3. ФИЛЬТР ПРОЕКТОВ (Самая важная функция)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-container');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Управление активной кнопкой
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Фильтрация карточек
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // 4. АНИМАЦИЯ ПРИ СКРОЛЛЕ
    const sectionsToFade = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null,
        threshold: 0.15 // 15% секции должно быть видно
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Отключить наблюдение после анимации
            }
        });
    }, observerOptions);

    sectionsToFade.forEach(section => {
        observer.observe(section);
    });

});
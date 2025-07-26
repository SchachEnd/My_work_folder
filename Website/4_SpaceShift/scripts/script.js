document.addEventListener('DOMContentLoaded', () => {
    const popap = document.getElementById('popap');
    const openPopapBtn = document.querySelectorAll('.open-popap-btn');
    const closeBtn = document.querySelector('.close-btn');
    const body = document.body;

    const popapContent = document.querySelector('.popap__content-block');
    popapContent.style.opacity = 0;

    const buttonUp = document.querySelector('.button-up');

    if (window.scrollY >= 900) {
        buttonUp.style.display = 'block';
        buttonUp.classList.add('fadeIn');
    }

    popap.addEventListener('click', (event) => {
        if (event.target === popap) {
            popap.style.display = 'none';
            body.classList.remove('body-no-scroll');
        }
    });

    closeBtn.addEventListener('click', () => {
        popap.style.display = 'none';
        body.classList.remove('body-no-scroll');
    });

    openPopapBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            popap.style.display = 'block'; // Показываем попап
            body.classList.add('body-no-scroll'); // Блокируем скролл
            popapContent.style.opacity = 1;
        });
    });

    addEventListener('scroll', () => {
        if (window.scrollY >= 300) {
            // Показываем кнопку
            buttonUp.style.display = 'block';
            // Запускаем анимацию появления
            requestAnimationFrame(() => {
                buttonUp.classList.remove('fadeOff');
                buttonUp.classList.add('fadeIn');
            });
        } else {
            // Запускаем анимацию исчезновения
            buttonUp.classList.remove('fadeIn');
            buttonUp.classList.add('fadeOff');
            
            // Скрываем кнопку после завершения анимации
            buttonUp.addEventListener('animationend', function handler() {
                if (buttonUp.classList.contains('fadeOff')) {
                    buttonUp.style.display = 'none';
                }
                buttonUp.removeEventListener('animationend', handler);
            }, {once: true});
        }
    });

    buttonUp.addEventListener('click', () => {
        const scroll = document.getElementById('scroll');

        scroll.scrollIntoView({behavior: 'smooth'});
    });
});
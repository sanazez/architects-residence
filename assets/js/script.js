const init = () => {
    document.addEventListener('DOMContentLoaded', function () {
        new Swiper('.main__promo-info-swiper', {
            slidesPerView: 2,
            spaceBetween: 22,
            pagination: {
                el: '.main__promo-info-pagination',
                clickable: true,
                dynamicBullets: true,
                bulletClass: 'main__promo-info-dot',
                bulletActiveClass: 'main__promo-info-dot--active',
            },
            touchRatio: 1,
            grabCursor: true,
            loop: false,
            breakpoints: {
                920: {
                    slidesPerView: 3,
                },
                648: {
                    slidesPerView: 2,
                },
                320: {
                    slidesPerView: 1,
                },
            },
        });
        new Swiper('.main__about-swiper', {
            slidesPerView: 2,
            spaceBetween: 45,
            touchRatio: 1,
            grabCursor: true,
            loop: false,
            navigation: {
                nextEl: '.main__about-button-next',
                prevEl: '.main__about-button-prev',
            },
            breakpoints: {
                1280: {
                    slidesPerView: 3,
                },
                848: {
                    slidesPerView: 2,
                },
                320: {
                    slidesPerView: 1,
                },
            },
            pagination: {
                el: '.main__about-pagination',
                clickable: true,
                dynamicBullets: true,
                bulletClass: 'main__about-dot',
                bulletActiveClass: 'main__about-dot--active',
            },
        });
    });

    const burgerButton = document.querySelector('.header__burger');
    const closeButton = document.querySelector('.header__close');
    const mobMenu = document.querySelector('.header__mobile-menu');
    const menuLinks = document.querySelectorAll('.header__menu a');

    burgerButton.addEventListener('click', () => {
        mobMenu.classList.add('active');
        burgerButton.classList.add('hidden');
    });

    closeButton.addEventListener('click', () => {
        mobMenu.classList.remove('active');
        burgerButton.classList.remove('hidden');
    });

    menuLinks.forEach((link) => {
        link.addEventListener('click', () => {
            mobMenu.classList.remove('active');
        });
    });
};
init();

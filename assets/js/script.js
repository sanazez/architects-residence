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
                920: {
                    slidesPerView: 3,
                },
            },
        });
    });
};
init();

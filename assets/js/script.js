const initSliders = () => {
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
            920: { slidesPerView: 3 },
            648: { slidesPerView: 2 },
            320: { slidesPerView: 1 },
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
        pagination: {
            el: '.main__about-pagination',
            clickable: true,
            dynamicBullets: true,
            bulletClass: 'main__about-dot',
            bulletActiveClass: 'main__about-dot--active',
        },
        breakpoints: {
            1280: { slidesPerView: 3 },
            848: { slidesPerView: 2 },
            320: { slidesPerView: 1 },
        },
    });
    new Swiper('.main__gallery-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '.main__gallery-pagination-btn--next',
            prevEl: '.main__gallery-pagination-btn--prev',
        },
        pagination: {
            el: '.main__gallery-pagination-dots',
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
        },
        breakpoints: {
            1024: { slidesPerView: 2 },
        },
    });
};

const initMobileMenu = () => {
    const burgerButton = document.querySelector('.header__burger');
    const closeButton = document.querySelector('.header__close');
    const mobMenu = document.querySelector('.header__mobile-menu');
    const menuLinks = document.querySelectorAll('.header__menu a');

    if (!burgerButton || !closeButton || !mobMenu) return;

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
            burgerButton.classList.remove('hidden');
        });
    });
};

class CustomSlider {
    constructor(slider) {
        this.slider = slider;
        this.thumb = slider.querySelector('.custom-slider__thumb');
        this.trackFilled = slider.querySelector('.custom-slider__track-filled');
        this.track = slider.querySelector('.custom-slider__track');
        this.input = slider.querySelector('input[type="range"]');
        this.valueSpan = slider.querySelector('span');
        this.isDragging = false;

        if (!this.thumb || !this.trackFilled || !this.track || !this.input || !this.valueSpan) return;

        this.init();
    }

    updateSlider(value) {
        const min = parseFloat(this.input.min);
        const max = parseFloat(this.input.max);
        const progress = ((value - min) / (max - min)) * 100;
        this.trackFilled.style.width = `${progress}%`;
        this.thumb.style.left = `${progress}%`;
        this.input.value = value;

        this.valueSpan.textContent =
            this.input.id === 'yearsRange' ? `${value} лет` : `${Number(value).toLocaleString('ru-RU')}`;
    }

    handleTrackClick(e) {
        const rect = this.track.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const progress = Math.min(1, Math.max(0, offsetX / rect.width));
        const value = parseFloat(this.input.min) + progress * (parseFloat(this.input.max) - parseFloat(this.input.min));
        const step = parseFloat(this.input.step);
        const snappedValue = Math.round(value / step) * step;
        this.updateSlider(snappedValue);
    }

    handleDrag(e) {
        if (!this.isDragging) return;
        const rect = this.track.getBoundingClientRect();
        const offsetX = (e.clientX || e.touches[0].clientX) - rect.left;
        const progress = Math.min(1, Math.max(0, offsetX / rect.width));
        const value = parseFloat(this.input.min) + progress * (parseFloat(this.input.max) - parseFloat(this.input.min));
        const step = parseFloat(this.input.step);
        const snappedValue = Math.round(value / step) * step;
        this.updateSlider(snappedValue);
    }

    init() {
        this.updateSlider(parseFloat(this.input.value));

        this.track.addEventListener('click', (e) => this.handleTrackClick(e));

        this.thumb.addEventListener('mousedown', () => {
            this.isDragging = true;
        });

        this.thumb.addEventListener('touchstart', () => {
            this.isDragging = true;
        });

        document.addEventListener('mousemove', (e) => this.handleDrag(e));
        document.addEventListener(
            'touchmove',
            (e) => {
                if (this.isDragging) e.preventDefault();
                this.handleDrag(e);
            },
            { passive: false },
        );

        document.addEventListener('mouseup', () => {
            this.isDragging = false;
        });

        document.addEventListener('touchend', () => {
            this.isDragging = false;
        });
    }
}

const initCustomSliders = () => {
    document.querySelectorAll('.main__profit-calc-slider').forEach((slider) => {
        new CustomSlider(slider);
    });
};

const init = () => {
    document.addEventListener('DOMContentLoaded', () => {
        initSliders();
        initMobileMenu();
        initCustomSliders();
    });
};

init();

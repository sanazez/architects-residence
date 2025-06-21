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
    new Swiper('.gallery-top-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.gallery-top-pagination-dots',
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
        },
        breakpoints: {
            650: { slidesPerView: 2 },
            1119: { slidesPerView: 3 },
        },
    });
    new Swiper('.gallery-bottom-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.gallery-bottom-pagination-dots',
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
        },
        breakpoints: {
            650: { slidesPerView: 2 },
            1119: { slidesPerView: 3 },
        },
    });
    new Swiper('.gallery-middle-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.gallery-middle-pagination-dots',
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
        },
        breakpoints: {
            1119: { slidesPerView: 2 },
        },
    });
    new Swiper('.improvement__slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '.improvement__slider-pagination-right',
            prevEl: '.improvement__slider-pagination-left',
        },
        pagination: {
            el: '.improvement-swiper-dots',
            clickable: true,
            bulletClass: 'improvement-pagination-bullet',
            bulletActiveClass: 'improvement-pagination-bullet-active',
        },
        breakpoints: {
            1024: { slidesPerView: 1 },
        },
    });
    new Swiper('.main__filters-right--apartments', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.apartments-swiper-dots',
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
        },
        breakpoints: {
            674: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1448: { slidesPerView: 4 },
        },
    });
};

const initCookieBanner = () => {
    const isCookieAccepted = localStorage.getItem('cookieAccepted');

    if (isCookieAccepted) {
        return;
    }

    const cookieBanner = document.createElement('div');
    cookieBanner.className = 'cookie';
    cookieBanner.style.display = 'flex';

    cookieBanner.innerHTML = `
        <p class="cookie__text">
            Мы обрабатываем cookies, чтобы сделать наш сайт удобнее и персонализированнее для вас.
            Политика использования <a class="cookie__link" href="cookie.pdf" target="_blank">cookies</a> и
            <a class="cookie__link" target="_blank" href="data_protection.pdf">защита данных</a>.
        </p>
        <button class="cookie__btn">Принять</button>
    `;

    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.appendChild(cookieBanner);
    } else {
        document.body.appendChild(cookieBanner);
    }

    const cookieAcceptButton = cookieBanner.querySelector('.cookie__btn');
    cookieAcceptButton.addEventListener('click', () => {
        cookieBanner.style.display = 'none';

        localStorage.setItem('cookieAccepted', 'true');
    });
};

const initYandexMap = () => {
    if (!ymaps) {
        console.error('Yandex Maps API не загружен');
        return;
    }

    ymaps.ready(() => {
        setTimeout(() => {
            const map = new ymaps.Map('yandex-map', {
                center: [55.779585, 37.700165],
                zoom: 17,
                controls: [],
            });
            map.options.set('copyrightLogoVisible', false);
            map.controls.remove('geolocationControl');
            map.controls.remove('searchControl');
            map.controls.remove('trafficControl');
            map.controls.remove('typeSelector');
            map.controls.remove('fullscreenControl');
            map.controls.remove('zoomControl');
            map.controls.remove('rulerControl');
            map.geoObjects.add(
                new ymaps.Rectangle(
                    [
                        [55.777899, 37.696814],
                        [55.780584, 37.702473],
                    ],
                    {},
                    {
                        stroke: false,
                        fillImageHref: 'assets/images/map_top.png',
                    },
                ),
            );
        }, 50);
    });
};

const initScrollToSection = () => {
    const promoButton = document.querySelector('.main__promo-btn'); // Находим кнопку
    const targetSection = document.querySelector('.main__property'); // Находим целевую секцию

    if (promoButton && targetSection) {
        promoButton.addEventListener('click', (e) => {
            e.preventDefault(); // Предотвращаем любое стандартное поведение кнопки (если, например, был submit)

            targetSection.scrollIntoView({
                behavior: 'smooth', // Плавная прокрутка
                block: 'start', // Прокрутка к началу секции
            });
        });
    } else {
        console.error('Не удалось найти кнопку или целевую секцию для прокрутки');
    }
};

const updateImprovementSliderPaginationWidth = () => {
    document.querySelectorAll('.improvement__slider-pagination-wrapper').forEach((wrapper) => {
        const imageWrapper = wrapper.closest('.improvement')?.querySelector('.improvement__image-wrapper');
        const image = imageWrapper?.querySelector('.improvement__image');
        if (imageWrapper && image) {
            const wrapperWidth = imageWrapper.offsetWidth;
            const imageWidth = image.offsetWidth;
            const newWidth = (wrapperWidth - imageWidth) / 2;
            wrapper.style.width = `${newWidth}px`;
        }
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

const getYearWordForm = (number) => {
    if (!Number.isInteger(number)) return 'года';
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;
    if (lastDigit === 1 && lastTwoDigits !== 11) return 'год';
    if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) return 'года';
    return 'лет';
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

        if (!this.thumb || !this.trackFilled || !this.track || !this.input || !this.valueSpan) {
            console.error('CustomSlider: Missing elements', {
                thumb: this.thumb,
                trackFilled: this.trackFilled,
                track: this.track,
                input: this.input,
                valueSpan: this.valueSpan,
            });
            return;
        }

        this.input.min = 0;

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
            this.input.id === 'yearsRange'
                ? `${value} ${getYearWordForm(value)}`
                : `${Number(value).toLocaleString('ru-RU')}`;

        this.updateResults();
    }

    updateResults() {
        const priceValue = parseFloat(document.querySelector('#priceRange')?.value || 0);
        const downPaymentValue = parseFloat(document.querySelector('#downPaymentRange')?.value || 0);
        const yearsValue = parseFloat(document.querySelector('#yearsRange')?.value || 0);

        const roiElement = document.querySelector('#roi');
        if (roiElement) {
            if (downPaymentValue === 0) {
                roiElement.textContent = '0';
            } else {
                const months = Math.ceil(priceValue / downPaymentValue);
                if (months % 12 === 0) {
                    const years = months / 12;
                    roiElement.textContent = `~ ${years} ${getYearWordForm(years)}`;
                } else {
                    const years = (months / 12).toFixed(1);
                    roiElement.textContent = `~ ${years} года`;
                }
            }
        }

        const rentIncomeElement = document.querySelector('#rentIncome');
        if (rentIncomeElement) {
            rentIncomeElement.textContent = `~ ${Math.round(downPaymentValue * yearsValue * 12).toLocaleString('ru-RU')}`;
        }

        const priceGrowthElement = document.querySelector('#priceGrowth');
        if (priceGrowthElement) {
            priceGrowthElement.textContent = '~ 7,5% + / в год';
        }
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
        const offsetX = (e.type === 'touchmove' ? e.touches[0].clientX : e.clientX) - rect.left;
        const progress = Math.min(1, Math.max(0, offsetX / rect.width));
        const value = parseFloat(this.input.min) + progress * (parseFloat(this.input.max) - parseFloat(this.input.min));
        const step = parseFloat(this.input.step);
        const snappedValue = Math.round(value / step) * step;
        this.updateSlider(snappedValue);
    }

    init() {
        this.updateSlider(parseFloat(this.input.value));

        this.track.addEventListener('click', (e) => this.handleTrackClick(e));

        const startDrag = () => {
            this.isDragging = true;
        };

        const stopDrag = () => {
            this.isDragging = false;
        };

        this.thumb.addEventListener('mousedown', startDrag);
        this.thumb.addEventListener('touchstart', startDrag);

        const dragHandler = (e) => this.handleDrag(e);
        document.addEventListener('mousemove', dragHandler);
        document.addEventListener('touchmove', dragHandler, { passive: false });

        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);

        this.input.addEventListener('input', () => {
            this.updateSlider(parseFloat(this.input.value));
        });

        this.updateResults();
    }
}

class RangeSlider {
    constructor(slider) {
        this.slider = slider;
        this.minThumb = slider.querySelector('.range-slider__thumb--min');
        this.maxThumb = slider.querySelector('.range-slider__thumb--max');
        this.trackFilled = slider.querySelector('.range-slider__track-filled');
        this.track = slider.querySelector('.range-slider__track');
        this.minInput = slider.querySelector('input[id$="Min"]');
        this.maxInput = slider.querySelector('input[id$="Max"]');
        this.valueSpan = slider.closest('.property-filter').querySelector('span');
        this.isDragging = null;

        if (
            !this.minThumb ||
            !this.maxThumb ||
            !this.trackFilled ||
            !this.track ||
            !this.minInput ||
            !this.maxInput ||
            !this.valueSpan
        ) {
            console.error('RangeSlider: не найден один из элементов', {
                minThumb: this.minThumb,
                maxThumb: this.maxThumb,
                trackFilled: this.trackFilled,
                track: this.track,
                minInput: this.minInput,
                maxInput: this.maxInput,
                valueSpan: this.valueSpan,
            });
            return;
        }

        this.init();
    }

    updateSlider(minValue, maxValue) {
        const min = parseFloat(this.minInput.min);
        const max = parseFloat(this.minInput.max);
        const minProgress = ((minValue - min) / (max - min)) * 100;
        const maxProgress = ((maxValue - min) / (max - min)) * 100;

        this.minThumb.style.left = `${minProgress}%`;
        this.maxThumb.style.left = `${maxProgress}%`;
        this.trackFilled.style.left = `${minProgress}%`;
        this.trackFilled.style.width = `${maxProgress - minProgress}%`;
        this.minInput.value = minValue;
        this.maxInput.value = maxValue;

        const formatValue = (value, id) => {
            if (id.includes('cost')) return (value / 1000000).toFixed(1);
            if (id.includes('pricePerMeter')) return (value / 1000).toFixed(0);
            return value;
        };

        this.valueSpan.textContent = `${formatValue(minValue, this.slider.dataset.id)} - ${formatValue(maxValue, this.slider.dataset.id)}`;
    }

    handleTrackClick(e) {
        const rect = this.track.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const progress = Math.min(1, Math.max(0, offsetX / rect.width));
        const value =
            parseFloat(this.minInput.min) + progress * (parseFloat(this.minInput.max) - parseFloat(this.minInput.min));
        const step = parseFloat(this.minInput.step);
        const snappedValue = Math.round(value / step) * step;

        const minValue = parseFloat(this.minInput.value);
        const maxValue = parseFloat(this.maxInput.value);
        const minDistance = Math.abs(snappedValue - minValue);
        const maxDistance = Math.abs(snappedValue - maxValue);

        if (minDistance < maxDistance) {
            this.updateSlider(snappedValue, maxValue);
        } else {
            this.updateSlider(minValue, snappedValue);
        }
    }

    handleDrag(e) {
        if (!this.isDragging) return;
        const rect = this.track.getBoundingClientRect();
        const offsetX = (e.type === 'touchmove' ? e.touches[0].clientX : e.clientX) - rect.left;
        const progress = Math.min(1, Math.max(0, offsetX / rect.width));
        const value =
            parseFloat(this.minInput.min) + progress * (parseFloat(this.minInput.max) - parseFloat(this.minInput.min));
        const step = parseFloat(this.minInput.step);
        const snappedValue = Math.round(value / step) * step;

        let minValue = parseFloat(this.minInput.value);
        let maxValue = parseFloat(this.maxInput.value);

        if (this.isDragging === 'min') {
            minValue = Math.min(snappedValue, maxValue - step);
            this.updateSlider(minValue, maxValue);
        } else if (this.isDragging === 'max') {
            maxValue = Math.max(snappedValue, minValue + step);
            this.updateSlider(minValue, maxValue);
        }
    }

    init() {
        this.updateSlider(parseFloat(this.minInput.value), parseFloat(this.maxInput.value));

        this.track.addEventListener('click', (e) => this.handleTrackClick(e));

        const startMinDrag = () => {
            this.isDragging = 'min';
        };

        const startMaxDrag = () => {
            this.isDragging = 'max';
        };

        const stopDrag = () => {
            this.isDragging = null;
        };

        this.minThumb.addEventListener('mousedown', startMinDrag);
        this.maxThumb.addEventListener('mousedown', startMaxDrag);
        this.minThumb.addEventListener('touchstart', startMinDrag);
        this.maxThumb.addEventListener('touchstart', startMaxDrag);

        const dragHandler = (e) => this.handleDrag(e);
        document.addEventListener('mousemove', dragHandler);
        document.addEventListener('touchmove', dragHandler, { passive: false });

        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
    }
}

const initCustomSliders = () => {
    document.querySelectorAll('.main__profit-calc-slider').forEach((slider) => {
        new CustomSlider(slider);
    });
    document.querySelectorAll('.range-slider').forEach((slider) => {
        new RangeSlider(slider);
    });
};

const initCustomSelects = () => {
    document.querySelectorAll('.custom-select').forEach((select) => {
        const trigger = select.querySelector('.custom-select__trigger');
        const value = select.querySelector('.custom-select__value');
        const options = select.querySelectorAll('.custom-select__option');

        if (!trigger || !value || !options.length) return;

        trigger.addEventListener('click', () => {
            select.classList.toggle('open');
        });

        options.forEach((option) => {
            option.addEventListener('click', () => {
                options.forEach((o) => o.classList.remove('selected'));
                option.classList.add('selected');
                value.textContent = option.textContent;
                select.classList.remove('open');
            });
        });

        document.addEventListener('click', (e) => {
            if (!select.contains(e.target)) {
                select.classList.remove('open');
            }
        });
    });
};

const initFiltersDropdown = () => {
    document.querySelectorAll('.filters-dropdown .custom-select__trigger').forEach((trigger) => {
        trigger.addEventListener('click', function (e) {
            e.stopPropagation();
            const select = this.closest('.filters-dropdown');
            select.classList.toggle('open');
        });
    });

    document.querySelectorAll('.filters-dropdown .filters-radio input[type="radio"]').forEach((radio) => {
        radio.addEventListener('change', function () {});
    });

    document.addEventListener('click', function (e) {
        document.querySelectorAll('.filters-dropdown').forEach((select) => {
            if (!select.contains(e.target)) {
                select.classList.remove('open');
            }
        });
    });
};

const initMobileFilters = () => {
    const filterToggleButton = document.querySelector('.filters-toggle');
    const filterCloseButton = document.querySelector('.filters-close');
    const filterContainer = document.querySelector('.filters-container');

    if (!filterToggleButton || !filterCloseButton || !filterContainer) return;

    filterToggleButton.addEventListener('click', () => {
        filterContainer.classList.add('active');
        filterToggleButton.classList.add('hidden');
    });

    filterCloseButton.addEventListener('click', () => {
        filterContainer.classList.remove('active');
        filterToggleButton.classList.remove('hidden');
    });
};

const initPhoneInput = () => {
    const phoneInput = document.querySelector('.main__callback-input');
    if (!phoneInput) return;

    phoneInput.value = '+7 ( _ _ _ ) _ _ _ - _ _ - _ _';

    const setCursorToFirstUnderscore = () => {
        const value = phoneInput.value;
        let cursorPos = value.indexOf('_');
        if (cursorPos === -1) cursorPos = value.length;
        phoneInput.setSelectionRange(cursorPos, cursorPos);
    };

    phoneInput.addEventListener('focus', () => {
        setCursorToFirstUnderscore();
    });

    phoneInput.addEventListener('click', (e) => {
        e.preventDefault();
        setCursorToFirstUnderscore();
    });

    phoneInput.addEventListener('input', (e) => {
        let input = e.target.value;
        let digits = input.replace(/\D/g, '').slice(1);
        let newValue = '+7 ( _ _ _ ) _ _ _ - _ _ - _ _';
        let digitIndex = 0;

        newValue = newValue
            .split('')
            .map((char) => {
                if (char === '_' && digitIndex < digits.length) {
                    return digits[digitIndex++];
                }
                return char;
            })
            .join('');

        phoneInput.value = newValue;

        setCursorToFirstUnderscore();
    });

    phoneInput.addEventListener('paste', (e) => {
        e.preventDefault();
        let pastedData = (e.clipboardData || window.clipboardData).getData('text');
        let digits = pastedData.replace(/\D/g, '');
        if (digits) {
            let newValue = '+7 ( _ _ _ ) _ _ _ - _ _ - _ _';
            let digitIndex = 0;

            newValue = newValue
                .split('')
                .map((char) => {
                    if (char === '_' && digitIndex < digits.length) {
                        return digits[digitIndex++];
                    }
                    return char;
                })
                .join('');

            phoneInput.value = newValue;
            setCursorToFirstUnderscore();
        }
    });

    phoneInput.addEventListener('keypress', (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });

    phoneInput.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
            let input = phoneInput.value;
            let digits = input.replace(/\D/g, '').slice(1);
            if (digits.length > 0) {
                digits = digits.slice(0, -1);
                let newValue = '+7 ( _ _ _ ) _ _ _ - _ _ - _ _';
                let digitIndex = 0;

                newValue = newValue
                    .split('')
                    .map((char) => {
                        if (char === '_' && digitIndex < digits.length) {
                            return digits[digitIndex++];
                        }
                        return char;
                    })
                    .join('');

                phoneInput.value = newValue;
                setCursorToFirstUnderscore();
            }
            e.preventDefault();
        }
    });
};

const setYearToCopyRight = () => {
    const footerYear = document.querySelector('.footer__year');
    if (!footerYear) return;
    footerYear.textContent = new Date().getFullYear();
};

const initNumberInput = () => {
    const numberInput = document.querySelector('#property-number-input');
    if (!numberInput) return;

    numberInput.addEventListener('keypress', (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });

    numberInput.addEventListener('paste', (e) => {
        e.preventDefault();
        let pastedData = (e.clipboardData || window.clipboardData).getData('text');
        let digits = pastedData.replace(/\D/g, '');
        if (digits) {
            numberInput.value = digits;
        }
    });

    numberInput.addEventListener('input', (e) => {
        let value = e.target.value;
        e.target.value = value.replace(/\D/g, '');
    });
};

const positionBlocks = () => {
    const contentBlock = document.querySelector('.section--apartment-details-content');
    const toggle = document.querySelector('.feature-toggle');
    if (!toggle) {
        return;
    }
    if (window.innerWidth > 679) {
        contentBlock.style.height = 'auto';
        return;
    }

    const planBlock = document.querySelector('.apartment-details__plan-block');
    const priceRow = document.querySelector('.property-card__price-row');
    const infoBlock = document.querySelector('.apartment-info-block');
    const chooseBtn = document.querySelector('.apartment-details__choose-btn');
    const favBtn = document.querySelector('.apartment-details__fav-btn');
    const printBtn = document.querySelector('.apartment-print-btn');
    const disclaimerBlock = document.querySelector('.apartment-details__disclaimer');

    if (
        !contentBlock ||
        !planBlock ||
        !priceRow ||
        !infoBlock ||
        !chooseBtn ||
        !favBtn ||
        !printBtn ||
        !disclaimerBlock
    ) {
        console.error('Missing required elements for positioning');
        return;
    }

    contentBlock.style.height = 'auto';

    const planBlockHeight = planBlock.offsetHeight;

    priceRow.style.top = `${planBlockHeight + 16}px`;
    infoBlock.style.top = `${planBlockHeight + priceRow.offsetHeight + 32}px`;
    chooseBtn.style.top = `${planBlockHeight + priceRow.offsetHeight + infoBlock.offsetHeight + 22}px`;
    favBtn.style.top = `${planBlockHeight + priceRow.offsetHeight + infoBlock.offsetHeight + chooseBtn.offsetHeight + 50}px`;
    printBtn.style.top = `${planBlockHeight + priceRow.offsetHeight + infoBlock.offsetHeight + chooseBtn.offsetHeight + favBtn.offsetHeight + 74}px`;
    disclaimerBlock.style.top = `${planBlockHeight + priceRow.offsetHeight + infoBlock.offsetHeight + chooseBtn.offsetHeight + favBtn.offsetHeight + printBtn.offsetHeight + 90}px`;

    const totalHeight =
        planBlockHeight +
        priceRow.offsetHeight +
        infoBlock.offsetHeight +
        chooseBtn.offsetHeight +
        favBtn.offsetHeight +
        printBtn.offsetHeight +
        disclaimerBlock.offsetHeight;

    contentBlock.style.height = `${totalHeight + 92}px`;
};

const createThanksModal = () => {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal__overlay';

    modalOverlay.innerHTML = `
        <div class="thanks-modal__window">
            <button class="modal__close" aria-label="Закрыть">&times;</button>
            <div class="modal__title">Спасибо за заявку!</div>
            <div class="thanks-modal__text">
                В ближайшее время мы вернемся к вам с деталями. Ожидайте обратной связи.
            </div>
            <button class="thanks-modal__btn">
                <span class="thanks-modal__btn-full">Вернуться на главную страницу</span>
                <span class="thanks-modal__btn-mobile">На главную</span>
            </button>
        </div>
    `;

    document.body.appendChild(modalOverlay);

    const closeButton = modalOverlay.querySelector('.modal__close');
    closeButton.addEventListener('click', () => {
        modalOverlay.remove();
    });

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            modalOverlay.remove();
        }
    });
    const redirectButton = modalOverlay.querySelector('.thanks-modal__btn');
    redirectButton.addEventListener('click', () => {
        window.location.href = 'index.html';
        modalOverlay.remove();
    });
};

const initSubmitThanksModal = () => {
    const callbackSubmitButton = document.querySelector('.main__callback-submit-btn'); // Находим кнопку

    if (callbackSubmitButton) {
        callbackSubmitButton.addEventListener('click', (event) => {
            event.preventDefault();
            createThanksModal();
        });
    } else {
        console.warn('Кнопка .main__callback-submit-btn не найдена');
    }
};

const createViewingModal = () => {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal__overlay';

    modalOverlay.innerHTML = `
        <div class="viewing-modal">
            <button class="modal__close" aria-label="Закрыть">&times;</button>
            <div class="modal__title">Записаться на просмотр</div>
            <div class="viewing-modal__content">
                <form class="viewing-modal__form">
                    <input type="text" class="viewing-modal__input" placeholder="Имя" required />
                    <input type="tel" class="viewing-modal__input" placeholder="Телефон" required />
                    <input type="email" class="viewing-modal__input" placeholder="E-mail" required />
                    <div class="viewing-modal__checkbox-row">
                        <label class="viewing-modal__checkbox-label">
                            <input type="checkbox" required class="viewing-modal__checkbox-input" />
                            <span class="viewing-modal__checkbox-custom"></span>
                            <span class="viewing-modal__checkbox-text">
                                Нажимая на кнопку Отправить, Вы соглашаетесь на обработку
                                <a href="#" class="viewing-modal__checkbox-link">персональных данных</a>
                            </span>
                        </label>
                    </div>
                    <button type="submit" class="viewing-modal__submit-btn">Отправить</button>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modalOverlay);

    const closeButton = modalOverlay.querySelector('.modal__close');
    closeButton.addEventListener('click', () => {
        modalOverlay.remove();
    });

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            modalOverlay.remove();
        }
    });

    const form = modalOverlay.querySelector('.viewing-modal__form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = form.querySelector('input[type="text"]').value;
        const phone = form.querySelector('input[type="tel"]').value;
        const email = form.querySelector('input[type="email"]').value;

        console.log(`Имя: ${name}, Телефон: ${phone}, Email: ${email}`);

        alert('Заявка отправлена! Спасибо.');

        modalOverlay.remove();
    });
};

const createConsultationModal = () => {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal__overlay';

    modalOverlay.innerHTML = `
        <div class="consultation-modal">
            <button class="modal__close" aria-label="Закрыть">&times;</button>
            <div class="modal__title">Заявка на консультацию</div>
            <div class="consultation-modal__content">
                <div class="consultation-modal__left">
                    <label class="consultation-modal__checkbox-label">
                        <input type="checkbox" required class="consultation-modal__checkbox-input" />
                        <span class="consultation-modal__checkbox-custom"></span>
                        <span class="consultation-modal__checkbox-text">О проекте</span>
                    </label>
                    <label class="consultation-modal__checkbox-label">
                        <input type="checkbox" required class="consultation-modal__checkbox-input" />
                        <span class="consultation-modal__checkbox-custom"></span>
                        <span class="consultation-modal__checkbox-text">Условия покупки</span>
                    </label>
                    <label class="consultation-modal__checkbox-label">
                        <input type="checkbox" required class="consultation-modal__checkbox-input" />
                        <span class="consultation-modal__checkbox-custom"></span>
                        <span class="consultation-modal__checkbox-text">
                            Стоимость, планировочное<br class="consultation-modal--br" />
                            решение
                        </span>
                    </label>
                    <label class="consultation-modal__checkbox-label">
                        <input type="checkbox" required class="consultation-modal__checkbox-input" />
                        <span class="consultation-modal__checkbox-custom"></span>
                        <span class="consultation-modal__checkbox-text">
                            Специальные<br class="consultation-modal--br" />
                            предложения и лоты
                        </span>
                    </label>
                    <label class="consultation-modal__checkbox-label">
                        <input type="checkbox" required class="consultation-modal__checkbox-input" />
                        <span class="consultation-modal__checkbox-custom"></span>
                        <span class="consultation-modal__checkbox-text">Другое</span>
                    </label>
                </div>

                <div class="consultation-modal__right">
                    <form class="consultation-modal__form">
                        <input type="text" class="consultation-modal__input" placeholder="Имя" required />
                        <input type="tel" class="consultation-modal__input" placeholder="Телефон" required />
                        <input type="email" class="consultation-modal__input" placeholder="E-mail" required />
                        <div class="consultation-modal__checkbox-row">
                            <label class="consultation-modal__checkbox-label">
                                <input type="checkbox" required class="consultation-modal__checkbox-input" />
                                <span class="consultation-modal__checkbox-custom"></span>
                                <span class="consultation-modal__checkbox-text">
                                    Нажимая на кнопку Отправить, Вы соглашаетесь на обработку
                                    <a href="#" class="consultation-modal__checkbox-link">персональных данных</a>
                                </span>
                            </label>
                        </div>
                        <button type="submit" class="consultation-modal__submit-btn">Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modalOverlay);

    const closeButton = modalOverlay.querySelector('.modal__close');
    closeButton.addEventListener('click', () => {
        modalOverlay.remove();
    });

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            modalOverlay.remove();
        }
    });

    const form = modalOverlay.querySelector('.consultation-modal__form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = form.querySelector('input[placeholder="Имя"]').value;
        const phone = form.querySelector('input[placeholder="Телефон"]').value;
        const email = form.querySelector('input[placeholder="E-mail"]').value;

        console.log('Данные: ', {
            name,
            phone,
            email,
        });

        modalOverlay.remove();
    });
};

const initConsultationModal = () => {
    const consultationButton = document.querySelector('.main__profit-calc-btn'); // Найти кнопку открытия модалки
    if (consultationButton) {
        consultationButton.addEventListener('click', () => {
            createConsultationModal();
        });
    } else {
        console.warn('Кнопка .main__profit-calc-btn не найдена.');
    }
};

const initViewingModal = () => {
    const viewingButton = document.querySelector('.footer__btn');
    if (viewingButton) {
        viewingButton.addEventListener('click', () => {
            createViewingModal();
        });
    } else {
        console.warn('Кнопка .footer__btn не найдена.');
    }
};

const initCheckboxLinksStopPropagation = () => {
    document
        .querySelectorAll(
            '.main__callback-checkbox-link, .viewing-modal__checkbox-link, .consultation-modal__checkbox-link',
        )
        .forEach((link) => {
            link.addEventListener('click', (e) => {
                console.log(111);
                e.stopPropagation();
            });
        });
};

const initHandleClickRiverMap = () => {
    const building14 = document.getElementById('building14');
    const building15 = document.getElementById('building15');
    const number1_14 = document.getElementById('number_1_14');
    const number4_14 = document.getElementById('number_4_14');
    const number1_15 = document.getElementById('number_1_15');
    const number5_15 = document.getElementById('number_5_15');

    const handleMouseOverBuilding14 = () => {
        if (!building14.classList.contains('selected')) {
            number1_14.setAttribute('fill', 'white');
            number4_14.setAttribute('fill', 'white');
        }
    };

    const handleMouseOutBuilding14 = () => {
        if (!building14.classList.contains('selected')) {
            number1_14.setAttribute('fill', 'black');
            number4_14.setAttribute('fill', 'black');
        }
    };

    const handleMouseOverBuilding15 = () => {
        if (!building15.classList.contains('selected')) {
            number1_15.setAttribute('fill', 'white');
            number5_15.setAttribute('fill', 'white');
        }
    };

    const handleMouseOutBuilding15 = () => {
        if (!building15.classList.contains('selected')) {
            number1_15.setAttribute('fill', 'black');
            number5_15.setAttribute('fill', 'black');
        }
    };
    building14.addEventListener('mouseover', handleMouseOverBuilding14);
    building14.addEventListener('mouseout', handleMouseOutBuilding14);
    building15.addEventListener('mouseover', handleMouseOverBuilding15);
    building15.addEventListener('mouseout', handleMouseOutBuilding15);

    building14.addEventListener('click', () => {
        building14.removeEventListener('mouseover', handleMouseOverBuilding14);
        building14.removeEventListener('mouseout', handleMouseOutBuilding14);
        number1_14.setAttribute('fill', 'white');
        number4_14.setAttribute('fill', 'white');

        building15.addEventListener('mouseover', handleMouseOverBuilding15);
        building15.addEventListener('mouseout', handleMouseOutBuilding15);
        number1_15.setAttribute('fill', 'black');
        number5_15.setAttribute('fill', 'black');

        building14.classList.add('selected');
        building15.classList.remove('selected');
    });
    building15.addEventListener('click', () => {
        building14.addEventListener('mouseover', handleMouseOverBuilding14);
        building14.addEventListener('mouseout', handleMouseOutBuilding14);
        number1_14.setAttribute('fill', 'black');
        number4_14.setAttribute('fill', 'black');

        building15.removeEventListener('mouseover', handleMouseOverBuilding15);
        building15.removeEventListener('mouseout', handleMouseOutBuilding15);
        number1_15.setAttribute('fill', 'white');
        number5_15.setAttribute('fill', 'white');

        building14.classList.remove('selected');
        building15.classList.add('selected');
    });
};

const init = () => {
    document.addEventListener('DOMContentLoaded', () => {
        initSliders();
        initMobileMenu();
        initCustomSliders();
        initCustomSelects();
        initMobileFilters();
        initFiltersDropdown();
        initPhoneInput();
        setYearToCopyRight();
        initNumberInput();
        positionBlocks();
        updateImprovementSliderPaginationWidth();
        initCookieBanner();
        initYandexMap();
        initScrollToSection();
        initSubmitThanksModal();
        initViewingModal();
        initConsultationModal();
        initCheckboxLinksStopPropagation();
        initHandleClickRiverMap();
        window.addEventListener('resize', () => {
            positionBlocks();
            updateImprovementSliderPaginationWidth();
        });
        const planImage = document.querySelector('.apartment-plan img');
        if (planImage) {
            planImage.addEventListener('load', positionBlocks);
        }
    });
};

init();

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
    document.getElementById('footer-year').textContent = new Date().getFullYear();
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
    });
};

init();

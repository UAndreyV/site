'use strict';

window.addEventListener("DOMContentLoaded", () => {

    //quiz
    //активный input text 
    function showInput() {
        const parent = document.querySelector('.quiz__field');
        const inputsRadio = parent.querySelectorAll('.quiz__items-input input[type="radio"]');
        inputsRadio.forEach(input => {
            const inputText = input.parentNode.querySelector('input[type="text"]');
            inputDisabledOff(input, inputText);
            inputDisabledOn(input, inputText);

        });
    }
    showInput();

    function inputDisabledOff(selector, input) {
        selector.addEventListener('change', () => {
            if (selector.checked) {
                input.removeAttribute('disabled');
            }
        });
    }
    function inputDisabledOn(selector, input) {
        const wrapper = selector.closest('.quiz__items');
        const allInputs = wrapper.querySelectorAll('input[type="radio"]');
        allInputs.forEach(item => {
            item.addEventListener('click', function (e) {
                if (selector.attributes.id.textContent !== item.attributes.id.textContent) {
                    input.setAttribute('disabled', 'disabled');
                    input.value = '';
                }
            });
        });
    }

    //смена вопросов
    function switchingItems(bodyItem, parentItems) {
        const parent = document.querySelector(parentItems);
        const items = parent.querySelectorAll(bodyItem);
        const btnNext = parent.querySelector('.quiz__next');
        const btnPrev = parent.querySelector('.quiz__prev');
        const btnSubmit = parent.querySelector('.quiz__submit');
        let current = 1;
        let itemsTotal = parent.querySelector('.quiz__status-total');
        let itemsCurrent = parent.querySelector('.quiz__status-current');

        itemsTotal.innerText = items.length;

        function itemsCurrentUload() {
            itemsCurrent.innerText = current;
        }

        function hiddenItem(items) {
            items.forEach(item => {
                item.classList.add('block-hidden');
            });
        }

        function showItem(i = 0) {
            items[i].classList.add('block-show');
        }

        hiddenItem(items);
        showItem();

        function btnPrevDisable(trigger) {
            if (trigger == 1) {
                btnPrev.setAttribute('disabled', 'disabled');
            } else {
                btnPrev.removeAttribute('disabled');
            }
        }
        btnPrevDisable(current);

        function showBtnSubmit(t) {
            if (t == items.length) {
                btnSubmit.classList.remove('block-hidden');
                btnSubmit.classList.add('block-show');
                btnNext.classList.add('block-hidden');
                btnNext.classList.remove('block-show');
            } else {
                btnSubmit.classList.add('block-hidden');
                btnSubmit.classList.remove('block-show');
                btnNext.classList.add('block-show');
                btnNext.classList.remove('block-hidden');
            }
        }

        showBtnSubmit(current);

        btnNext.addEventListener('click', (e) => {
            e.preventDefault();
            items[current - 1].classList.add('block-hidden');
            items[current - 1].classList.remove('block-show');
            items[current].classList.add('block-show', 'appearance');
            current += 1;
            btnPrevDisable(current);
            showBtnSubmit(current);
            itemsCurrentUload();
        });

        btnPrev.addEventListener('click', (e) => {
            e.preventDefault();
            items[current - 1].classList.add('block-hidden');
            items[current - 1].classList.remove('block-show');
            items[current - 2].classList.add('block-show');
            current -= 1;
            btnPrevDisable(current);
            showBtnSubmit(current);
            itemsCurrentUload();
        });

        /* btnSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            const thanks = document.querySelector('.thanks');
        }); */

    }

    switchingItems('.quiz__item', '.quiz__field');

    //маска телефона    
    let inputs = document.querySelectorAll('[name="tel"]');
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let matrix = '8 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = input.value.replace(/\D/g, '');

            if (def.length >= val.length) {
                val = def;
            }

            input.value = matrix.replace(/./g, function (a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
        });
    });

    //burger
    function showBurger() {
        const burger = document.querySelector('.burger');
        const menu = document.querySelector('.header__top-menu');
        const body = document.body;
        burger.addEventListener('click', () => {
            burger.classList.toggle('burger__active');
            menu.classList.toggle('header__top-menu-show');
            body.classList.toggle('over-hidden');
        });
        menu.addEventListener('click', () => {
            burger.classList.remove('burger__active');
            menu.classList.remove('header__top-menu-show');
            body.classList.remove('over-hidden');
        });
    }

    showBurger();

    //popup
    const modals = () => {
        function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
            const trigger = document.querySelectorAll(triggerSelector),
                modal = document.querySelector(modalSelector),
                close = document.querySelector(closeSelector),
                windows = document.querySelectorAll('[data-modal]'),
                scroll = calcScroll();

            trigger.forEach(item => {
                item.addEventListener('click', (e) => {
                    if (e.target) {
                        e.preventDefault();
                    }

                    windows.forEach(item => {
                        item.style.display = 'none';
                    });

                    modal.style.display = "flex";
                    document.body.style.overflow = "hidden";
                    document.body.style.marginRight = `${scroll}px`;
                    modal.classList.add('appearance');
                });
            });

            close.addEventListener('click', () => {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "none";
                modal.classList.remove('appearance');
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal && closeClickOverlay) {
                    windows.forEach(item => {
                        item.style.display = 'none';
                    });

                    modal.classList.remove('appearance');
                    modal.style.display = "none";
                    document.body.style.overflow = "";
                    document.body.style.marginRight = `0px`;
                }
            });
        }

        function showModalByTime(selector, time) {
            setTimeout(function () {
                let display;

                document.querySelectorAll('[data-modal]').forEach(item => {
                    if (getComputedStyle(item).display !== 'none') {
                        display = "block";
                    }
                });

                if (!display) {
                    document.querySelector(selector).style.display = 'block';
                    document.body.style.overflow = "hidden";
                    let scroll = calcScroll();
                    document.body.style.marginRight = `0px`;
                }
            }, time);
        }

        function calcScroll() {
            let div = document.createElement('div');

            div.style.width = '50px';
            div.style.height = '50px';
            div.style.overflowY = 'scroll';
            div.style.visibility = 'hidden';

            document.body.appendChild(div);
            let scrollWidth = div.offsetWidth - div.clientWidth;
            div.remove();

            return scrollWidth;
        }

        bindModal('[data-popup]', '.popup', '.popup__closed');

        //showModalByTime('.popup-consultation', 5000);
    };

    modals();

    //parallax
    const parent = document.querySelector('.header__content'),
        layer1 = parent.querySelector('.header__image-later1'),
        layer2 = parent.querySelector('.header__image-later2'),
        layer3 = parent.querySelector('.header__image-later3'),
        layer4 = parent.querySelector('.header__image-later4'),
        layer5 = parent.querySelector('.header__image-later5'),
        layer6 = parent.querySelector('.header__image-later6'),
        layer7 = parent.querySelector('.header__image-later7'),
        layer8 = parent.querySelector('.header__image-later8'),
        layer9 = parent.querySelector('.header__image-later9');


    parent.addEventListener("mousemove", function (e) {
        let offsetX5 = (e.clientX / window.innerWidth * 15) - 15;
        let offsetY5 = (e.clientY / window.innerHeight * 10) - 5;
        let offsetX = (e.clientX / window.innerWidth * 30) - 15;
        let offsetY = (e.clientY / window.innerHeight * 20) - 5;
        let offsetX1 = (e.clientX / window.innerWidth * 70) - 15;
        let offsetY1 = (e.clientY / window.innerHeight * 35) - 5;
        let offsetX2 = (e.clientX / window.innerWidth * 80) - 15;
        let offsetY2 = (e.clientY / window.innerHeight * 50) - 5;
        let offsetX3 = (e.clientX / window.innerWidth * 50) - 15;
        let offsetY3 = (e.clientY / window.innerHeight * 40) - 5;
        let offsetX4 = (e.clientX / window.innerWidth * 40) - 15;
        let offsetY4 = (e.clientY / window.innerHeight * 30) - 5;

        layer1.setAttribute("style", `transform: translate(${layer1.clientLeft + offsetX5}px, ${layer1.clientTop + offsetY5}px);`);
        layer2.setAttribute("style", `transform: translate(${layer2.clientLeft + offsetX3}px, ${layer1.clientTop + offsetY3}px);`);
        layer3.setAttribute("style", `transform: translate(${layer3.clientLeft + offsetX1}px, ${layer3.clientTop + offsetY1}px);`);
        layer4.setAttribute("style", `transform: translate(${layer4.clientLeft + offsetX4}px, ${layer4.clientTop + offsetY4}px);`);
        layer5.setAttribute("style", `transform: translate(${layer5.clientLeft + offsetX}px, ${layer5.clientTop + offsetY}px);`);
        layer6.setAttribute("style", `transform: translate(${layer6.clientLeft + offsetX1}px, ${layer6.clientTop + offsetY1}px);`);
        layer7.setAttribute("style", `transform: translate(${layer7.clientLeft + offsetX4}px, ${layer7.clientTop + offsetY4}px);`);
        layer8.setAttribute("style", `transform: translate(${layer8.clientLeft + offsetX3}px, ${layer8.clientTop + offsetY3}px);`);
        layer9.setAttribute("style", `transform: translate(${layer9.clientLeft + offsetX2}px, ${layer9.clientTop + offsetY2}px);`);
    });

});

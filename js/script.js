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
    }

    showBurger();

});

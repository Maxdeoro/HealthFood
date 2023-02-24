/*jshint esversion: 9*/

//SLIDER
function slider({container, slide, prevArrow, nextArrow, totalCounter, currentCounter, wrapper, field}) {
    const prev = document.querySelector(prevArrow);
    const slider = document.querySelector(container);
    const slides = document.querySelectorAll(slide);
    const next = document.querySelector(nextArrow);
    const current = document.querySelector(currentCounter);
    const total = document.querySelector(totalCounter);
    const slidesField = document.querySelector(field);
    const slidesWrapper = document.querySelector(wrapper);
    let slideIndex = 1;
    const width = window.getComputedStyle(slidesWrapper).width;           //получаем ширину окна для одного слайда
    let offset = 0;

if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
} else {
    total.textContent = `slides.length`;
    current.textContent = slideIndex;
}

slidesField.style.width = 100 * slides.length + '%';        //определяем ширину поля для всех слайдов
slidesField.style.display = 'flex';                         //установка слайдов в горизонтальную полосу
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';                    //скрыть все слайды кроме slidesWrapper
slides.forEach((slide) => {                                 //установка одинаковой ширины для всех слайдов
    slide.style.width = slidesWrapper;
});

slider.style.position = 'relative';

const indicators = document.createElement('ol'),        //indicators panel
      dots = [];
indicators.classList.add('carousel-indicators');
slider.append(indicators);

for(let i=0; i<slides.length; i++) {
    const dot = document.createElement('li');          //indicators
    dot.setAttribute('data-slide-to', i + 1);           //'привязка' индикаторов к слайдам
    dot.classList.add('dot');
    if(i == 0) {
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
}

function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
}

next.addEventListener('click', () => {
    // if(offset == +width.slice(0, width.length-2) * (slides.length - 1)) {   
    if(offset == deleteNotDigits(width) * (slides.length - 1)) {     //если слайдер в конце, показывать первый слайд
        offset = 0;
    } else {
        // offset += +width.slice(0, width.length-2); 
        offset += deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    
    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    if(slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }

    dots.forEach((dot) => {
        dot.style.opacity = '.5';
    });
    dots[slideIndex - 1].style.opacity = '1';
});
prev.addEventListener('click', () => {
    if(offset == 0) {
        // offset = +width.slice(0, width.length-2) * (slides.length - 1);
        offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
        // offset -= +width.slice(0, width.length-2); 
        offset -= deleteNotDigits(width);      //все нецифры удаляем
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    
    if(slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }

    if(slideIndex < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }

    dots.forEach((dot) => {
        dot.style.opacity = '.5';
    });
    dots[slideIndex - 1].style.opacity = '1';
});

dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');
        slideIndex = slideTo;
        // offset = +width.slice(0, width.length-2) * (slideTo - 1); 
        offset = deleteNotDigits(width) * (slideTo - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach((dot) => {
            dot.style.opacity = '.5';
        });
        dots[slideIndex - 1].style.opacity = '1';
    });
});
}

export default slider;
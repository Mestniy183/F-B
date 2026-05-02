let swiperInstance = null;
const initSwiper = () => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
        swiperInstance = new Swiper('.swiper', {
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 20
                }
            },
        })
    } else {
        swiperInstance = new Swiper('.swiper', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
                renderFraction: function (currentClass, totalClass) {
                    return '<span class="' + currentClass + '"></span>' +
                        ' из ' +
                        '<span class="' + totalClass + '"></span>';
                }
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    spaceBetween: 29
                },
                1025: {
                    slidesPerView: 4,
                    spaceBetween: 29
                }
            },
        })
    }
}

window.addEventListener('resize', () => {
    if (swiperInstance) {
        swiperInstance.destroy(true, true);
    }
    initSwiper();
})

initSwiper();

const formEl = document.querySelector('.help-project__form');
formEl.addEventListener('submit', async (event) => {
    event.preventDefault();
    const inputName = document.getElementById('name');
    const inputEmail = document.getElementById('email');
    try {
        const response = await fetch('https://6b3b300b2dd9a648.mokky.dev/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: inputName.value,
                email: inputEmail.value
            })
        })
        if (!response.ok) {
            console.log("Ошибка сервера:", response.status);
        }
        alert('Форма успешно отправлена');
        formEl.reset();
    } catch (error) {
        console.error('Ошибка:', error);
    }
})
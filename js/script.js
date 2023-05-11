const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // отображение и скрытие предыдущего/следующего значка в соответствии со значением прокрутки карусели влево
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // получение максимальной ширины прокрутки
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // получаем ширину первого изображения и добавляем значение поля 14
        // если щелкнутый значок оставлен, уменьшите значение ширины прокрутки карусели влево или добавьте к нему
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // вызов отображения скрытых значков через 60 мс
    });
});

const autoSlide = () => {
    // если не осталось изображения для прокрутки, то вернитесь отсюда
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // присвоение значению разности позиций положительного значения
    let firstImgWidth = firstImg.clientWidth + 14;
    // получение значения разницы, которое необходимо добавить или уменьшить слева от карусели, чтобы взять среднее изображение по центру
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // если пользователь прокручивает вправо
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // если пользователь прокручивает страницу влево
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    //  сохраняются значения текущего положения мыши и scrollLeft карусели.
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // перемещает карусель в соответствии с движением мыши или пальца на экране. 
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    //Вызывается при отпускании мыши или пальца и проверяет, было ли перетаскивание или нет, и если да, то вызывает функцию autoSlide.
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

/*================scroll=================*/

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0){
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(params) {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if(animItemHeight > window.innerHeight){
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
               animItem.classList.add('_active'); 
            } else {
                animItem.classList.remove('_active');
            }
        }
    }

    function offset(el){
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
setTimeout(() => {
    animOnScroll();
}, 300);
}


  
const form = document.querySelector('form');
const inputLogin = document.querySelector('#inputLogin');
const inputEmail = document.querySelector('#inputEmail');
const inputNumber = document.querySelector('#inputNumber');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // предотвращаем отправку формы по умолчанию

  // Валидация полей формы
  if (inputLogin.value.trim() === '') {
    alert('Пожалуйста, введите ваше имя');
    inputLogin.focus();
    return false;
  }
  if (inputEmail.value.trim() === '') {
    alert('Пожалуйста, введите ваш email');
    inputEmail.focus();
    return false;
  }
  if (inputNumber.value.trim() === '') {
    alert('Пожалуйста, введите ваш номер телефона');
    inputNumber.focus();
    return false;
  }

  // Открываем модальное окно при успешном заполнении формы
  const modal = document.querySelector('#openModal');
  modal.classList.add('show');
});

// Закрываем модальное окно по клику на крестик или вне окна
const modalClose = document.querySelector('.modal .close');
modalClose.addEventListener('click', () => {
  const modal = document.querySelector('#openModal');
  modal.classList.remove('show');
});

const modalOverlay = document.querySelector('.modal');
modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
    modalOverlay.classList.remove('show');
  }
});
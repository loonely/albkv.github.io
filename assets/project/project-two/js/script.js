// ----------------------------Header script------------------------------- //
const header = document.querySelector(".header"),
	  mainPage = document.querySelector('main');

window.addEventListener("scroll", () => {
	let e = window.scrollY;
	if (e > 30) {
		header.classList.remove("header__transparent");
	}else {
		header.classList.add("header__transparent");
	}
});

const burgerBtn = document.querySelector('.header__burger'),
	  menu = document.querySelector('.header');

burgerBtn.addEventListener('click', () => {
	menu.classList.toggle('header-open');
	document.body.style.overflow.toggle('hidden');
});

mainPage.addEventListener('click', () => {
	menu.classList.remove('header-open')
});



// ----------------------------Slider script------------------------------- //
const prev = document.querySelector('.slider-product__prev'),
	  next = document.querySelector('.slider-product__next'),
	  slideList = document.querySelector('.slider-product__list'),
	  dotsList = document.querySelector('.slider-product__list-dots'),
	  links = document.querySelectorAll('.slider-product__link'),
	  items = document.querySelectorAll('.slider-product__item');

	let	dotIndex = 0,
		isDown = false,
		isMove = false,
		prevPageX,
		prevScrollLeft,
		positionDiff,
		countItems;

// ------------ function next and prevent slide
const nextSlide = () => {
	slideList.scrollLeft += 1050;
	if (dotIndex >= countItems) {
		dotIndex = countItems;
	}else {
		dotIndex++;
	}
	thisSlide(dotIndex);
}

const prevSlide = () => {
	slideList.scrollLeft -= 1050;
	if (dotIndex <= 0) {
		dotIndex = 0;
	}else {
		dotIndex--;
	}
	thisSlide(dotIndex);
}

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);


// ------------ function dragging and touch slider
// click on slider
const dragStart = (e) => {
	isDown = true;
	prevPageX = e.pageX || e.touches[0].pageX;
	prevScrollLeft = slideList.scrollLeft;
	slideList.classList.add('slider-product__list_dragging');
}
// move on slider
const changeDot = (pos) => {
	if (pos >= 0 && pos <= 1050) {
		dotIndex = 0;
	}else if (pos >= 1050 * 1 && pos <= 1050 * 2) {
		dotIndex = 1;
	}else if (pos >= 1050 * 2 && pos < 1050 * 3) {
		dotIndex = 2;
	}else if (pos === 1050 * 3) {
		dotIndex = 3;
	}
	thisSlide(dotIndex);
}

const dragging = (e) => {
	if(!isDown) return;
	e.preventDefault();
	isMove = true;
	positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
	slideList.scrollLeft = prevScrollLeft - positionDiff;
	changeDot(slideList.scrollLeft);
}
// stop slider
const dragStop = () => {
	isDown = false;
	setTimeout(() => {
		isMove = false;
	}, 50);
	slideList.classList.remove('slider-product__list_dragging');
	console.log(slideList.scrollLeft)
}
// block activate link if stop move slider
links.forEach(el => {
  el.addEventListener('click', (e) => {
    if (isMove) e.preventDefault();
  });
});

slideList.addEventListener("mousedown", dragStart);
slideList.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
slideList.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
slideList.addEventListener("touchend", dragStop);

// ------------------------------------------------ function dots slider
// if more cards are added to the slider (only screen >  1024px)
countItems = (items.length / 3) - 1;

for (let i = 0; i < countItems; i++) {
	let createDots = document.createElement('span');
	createDots.classList.add('slider-product__dot');
	dotsList.append(createDots);
}

// click of dots
const dots = document.querySelectorAll('.slider-product__dot');

const thisSlide = (index) => {
	for (let dot of dots) {
		dot.classList.remove('slider-product__dot_active');
	}
	dots[index].classList.add('slider-product__dot_active');
}

dots.forEach((dot, index) => {
	dot.addEventListener('click', () => {
		prevScrollLeft = 1050 * index;
		slideList.scrollLeft = prevScrollLeft;
		thisSlide(index); 
	});
})

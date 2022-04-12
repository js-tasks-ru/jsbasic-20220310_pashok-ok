import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = this.render(steps, value);
    this.steps = steps;
  }

  render(steps, value) {

    let spans = '<span></span>'.repeat(steps);
    let slider = createElement(
      `<div class="slider">
        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb">
          <span class="slider__value">${value}</span>
        </div>

        <!--Полоска слайдера-->
        <div class="slider__progress"></div>

        <!-- Шаги слайдера (вертикальные чёрточки) -->
        <div class="slider__steps">         
          ${spans}          
        </div>
      </div>`
    );
    
    const spansList = slider.querySelector('.slider__steps').querySelectorAll('span');    
    spansList[value].classList.add("slider__step-active");

    const sliderProgress = slider.querySelector('.slider__progress');
    sliderProgress.style.width = `${(value / (steps - 1))*100}%`
    
    slider.addEventListener('click', event =>{ 
      
      let sliderWidth = slider.getBoundingClientRect().right - slider.getBoundingClientRect().x;
      let clickX = event.clientX - slider.getBoundingClientRect().x; 

      value = Math.round(clickX / (sliderWidth / (steps - 1)));
      console.log(value);

      slider.querySelector('.slider__step-active').classList = '';
      spansList[value].classList.add("slider__step-active");
      slider.querySelector(".slider__value").innerHTML = value;
      document.querySelector('.slider__thumb').style.left = `${value / (steps - 1) * 100}%`;
      sliderProgress.style.width = `${(value / (steps - 1)) * 100}%`;

      this.value = value;

      const pressEvent = new CustomEvent('slider-change', {
        detail: this.value, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      });
      event.target.dispatchEvent(pressEvent);
      
    });

    return slider;

  }
}

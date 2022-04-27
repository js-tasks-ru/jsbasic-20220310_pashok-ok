import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = this.render(steps, value);
    this.steps = steps;
    this.value = value;
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
    const thumb = slider.querySelector('.slider__thumb');
    
    sliderProgress.style.width = `${(value / (steps - 1)) * 100}%`;
    thumb.style.left = `${value / (steps - 1) * 100}%`;
           
    slider.addEventListener('click', event =>{       
      
      const sliderWidth = slider.getBoundingClientRect().right - slider.getBoundingClientRect().x;      
      let clickX = event.clientX - slider.getBoundingClientRect().x; 

      value = Math.round(clickX / (sliderWidth / (steps - 1)));      

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

    thumb.onpointerdown = function(event) {
      event.preventDefault(); 
      slider.classList.add(`slider_dragging`);
      let shiftX = event.clientX - thumb.getBoundingClientRect().left - thumb.getBoundingClientRect().width / 2;            
      
      document.addEventListener(`pointermove`, onMouseMove);
      document.addEventListener(`pointerup`, onMouseUp);      

      function onMouseMove(event) {  
        event.preventDefault();      
        let newLeft = (event.clientX - slider.getBoundingClientRect().left) / slider.offsetWidth;
        const sliderWidth = slider.getBoundingClientRect().width;
        
        if (newLeft < 0) {
          newLeft = 0;
        }
        
        if (newLeft > 1) {
          newLeft = 1;
        }  
                
        value = Math.round(newLeft * (steps - 1));
        slider.querySelector('.slider__step-active').classList = '';
        spansList[value].classList.add("slider__step-active");
        slider.querySelector(".slider__value").innerHTML = value;        
        sliderProgress.style.width = newLeft * 100 + '%';     

        thumb.style.left = newLeft * 100 + '%';
      }

      function onMouseUp() {
        event.preventDefault();
        slider.classList.remove(`slider_dragging`);
             
        slider.querySelector('.slider__step-active').classList = '';
        spansList[value].classList.add("slider__step-active");
        slider.querySelector(".slider__value").innerHTML = value;
        thumb.style.left = `${value / (steps - 1) * 100}%`;
        sliderProgress.style.width = `${(value / (steps - 1)) * 100}%`;      

        document.removeEventListener(`pointerup`, onMouseUp);
        document.removeEventListener(`pointermove`, onMouseMove);

        this.value = value;

        const pressEvent = new CustomEvent('slider-change', {
          detail: this.value, // значение 0, 1, 2, 3, 4
          bubbles: true // событие всплывает - это понадобится в дальнейшем
        });
        slider.dispatchEvent(pressEvent);     
      }  
      
      thumb.ondragstart = () => false;   
    };
     

    return slider;
  }
}

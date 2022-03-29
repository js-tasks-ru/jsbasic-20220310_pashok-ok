function initCarousel() {
  let counter = 0;
  let rightArrow = document.querySelector('.carousel__arrow_right');
  let leftArrow = document.querySelector('.carousel__arrow_left');
  let image = document.querySelector('.carousel__inner');
  let Xoffset = 0;
  let maxCount = document.querySelectorAll('.carousel__slide').length;
  console.log('max', maxCount);

  //функция, которая считает слайды и гасит стрелочки
  function arrowSwitcher() {    
    if (counter === 0) {
      leftArrow.style.display = 'none';
    } else {leftArrow.style.display = '';}
    if (counter === maxCount - 1) {
      rightArrow.style.display = 'none';    
    } else {rightArrow.style.display = '';}   
    //console.log(counter);
  }
  arrowSwitcher(); //инициализация отображения стрелочек
  
  rightArrow.onclick = function() {
    counter += 1;
    let offset = image.offsetWidth;
    Xoffset -= offset;    
    image.style.transform = `translateX(${Xoffset}px)`;
    arrowSwitcher(counter);     
  };

  leftArrow.onclick = function() {
    counter -= 1;
    let offset = image.offsetWidth;
    Xoffset += offset;
    image.style.transform = `translateX(${Xoffset}px)`;
    arrowSwitcher(counter);       
  };

}

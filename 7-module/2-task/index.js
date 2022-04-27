import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modalWindow = createElement(`
    <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title"></h3>
      </div>

      <div class="modal__body">
        
      </div>
    </div>

  </div>
  `);   
  }  

  open() { 
    const docBody = document.body;
    docBody.classList.add('is-modal-open');    
    docBody.insertAdjacentElement('beforeend', this.modalWindow);
        
    document.addEventListener('keydown', event =>{
      if (event.code === 'Escape') {
        this.close(); 
      }
    });

    document.querySelector('.modal').addEventListener('click', event =>{            
      if (event.target.closest('BUTTON').className === 'modal__close') {        
        this.close();         
      }           
    });
  }
  
  close() {    
    if (document.body.className != 'is-modal-open') {return};

        document.body.querySelector('.modal').remove();       
        document.body.classList.remove('is-modal-open');
  }

  setTitle(title) {    
    this.modalTitle = title;
    this.modalWindow.querySelector('.modal__title').insertAdjacentText('beforeend', this.modalTitle); 
  }

  setBody(body) {        
    this.modalBody = body;    
    this.modalWindow.querySelector(".modal__body").insertAdjacentElement('beforeend', this.modalBody);        
  }
}

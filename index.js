const map = L.map('map').setView([55.7726, 37.63], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

L.marker([55.7724, 37.6252])
    .addTo(map)
    .bindPopup('E-trans')
    .openPopup();


const  disabledScroll = () => {
    document.body.scrollPosition = window.scrollY;
    document.body.style.cssText = `
    overflow:hidden;
    position: fixed;
    top: -${document.body.scrollPosition}px;
    left: 0;
    height: 100wh;
    width: 100wv;
    padding-right: ${window.innerWidth - document.body.offsetWidth}px;
    `
};
const enableScroll = () => {
    document.body.style.cssText ='';
    window.scroll({top:document.body.scrollPosition});
};
const createModal = (title, text) => {
    const overlayElem = createElem('div', {className:'modal' });
    const modalElem = createElem('div', {className: 'modal__block'})
    const modalContainerElem = createElem('div', {className:'modal__container'});
    const titleElem = createElem('h2', {
        className: 'modal__title',
    textContent:`Заказать ${title}`,
    });
const textElem = createElem('p',{className: 'modal__text',
    textContent: text,
})
    const formElem = createElem('form', {
        className:'modal__form',
        method: 'post',
        action: 'https://jsonplaceholder.typicode.com/posts',
        id: 'order',
    });
const nameLabelElem = createElem('label', {className: 'modal__label'})
    const nameSpanElem = createElem('span', {
        className: 'modal__span',
        textContent: 'Имя'});
    const nameInputElem = createElem('input', {
        className:'modal__input',
    placeholder:'Введите ваше имя',
    name:'name',
    required:true,
     });
    const phoneLabelElem = createElem('label', {className: 'modal__label'})
    const phoneSpanElem = createElem('span', {
        className: 'modal__span',
        textContent: 'Телефон'});
    const phoneInputElem = createElem('input', {
        className:'modal__input',
        placeholder:'Введите ваше телефон',
        name:'phone',
        required:true,
    });

const hideInput = createElem('input', {
    type:'hidden',
    name:'product',
    value: title,
})
    const btnSubmit = createElem('button', {
        className:'modal__button',
        textContent: 'Заказать',
        type: 'submit'
    });
btnSubmit.setAttribute('form', 'order');

const  closeModalBtn = createElem('button',{
    className:'modal__close',
    innerHTML:`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#18171A"/>
</svg>`,
})
overlayElem.addEventListener('click', event=>{
    const target = event.target;
    if (target === overlayElem || target.closest('.modal__close')) {
        overlayElem.remove();
        enableScroll();
    }
});


    nameLabelElem.append(nameSpanElem, nameInputElem);
    phoneLabelElem.append(phoneSpanElem, phoneInputElem);
    formElem.append(nameLabelElem, phoneLabelElem, hideInput);


    modalContainerElem.append(titleElem, textElem, formElem, btnSubmit, closeModalBtn);
    modalElem.append(modalContainerElem);
    overlayElem.append(modalElem);
    disabledScroll();
    document.body.append(overlayElem);
}

const createElem = (tag, attr) => {
    const elem = document.createElement(tag);
    return Object.assign(elem, {...attr});
};

const productTitle = document.querySelectorAll('.product-title');
const productText = document.querySelectorAll('.product-text');
const productButton = document.querySelectorAll('.product-button');

for (let i= 0; i<productButton.length; i++){
  productButton[i].addEventListener('click', () =>{
    const title = productTitle[i].textContent;
    const text = productText[i].textContent;
    createModal(title, text);
  });
}

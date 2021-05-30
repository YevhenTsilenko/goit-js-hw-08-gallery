import pictures from './gallery-items.js';

const refs = {
    ul: document.querySelector('.js-gallery'),
    backdrop: document.querySelector('.js-lightbox'),
    closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
    modalImg: document.querySelector('.lightbox__image'),
    overlay: document.querySelector('.lightbox__overlay'),
}

const makeImage = ({ preview, original, description }) => {
    const liEl = document.createElement('li');
    liEl.classList.add('gallery__item');

    const linkEl = document.createElement('a');
    linkEl.classList.add('gallery__link');
    linkEl.href = original;

    const imgEl = document.createElement('img');
    imgEl.classList.add('gallery__image');
    imgEl.src = preview;
    imgEl.alt = description;
    imgEl.setAttribute('data-source', original)

    liEl.appendChild(linkEl);
    linkEl.appendChild(imgEl);

    return liEl;
}

const images = pictures.map(makeImage);
refs.ul.append(...images);

refs.ul.addEventListener('click', onModalOpen);
refs.closeModalBtn.addEventListener('click', onCloseModalBtnClick);
window.addEventListener('keydown', onEscapePress);
refs.overlay.addEventListener('click', onOverlayClick);
document.addEventListener('keydown', onArrowsPress);




function onModalOpen(event) {
    event.preventDefault();
    if(!event.target.classList.contains('gallery__image')) {
        return;
    }
    refs.backdrop.classList.add('is-open');
    refs.modalImg.src = event.target.dataset.source;
    refs.modalImg.alt = event.target.alt;
}  

function onCloseModalBtnClick() {
    refs.backdrop.classList.remove('is-open');
    refs.modalImg.src = '';
    refs.modalImg.alt = '';
}

function onOverlayClick(event) {
    if(event.currentTarget === event.target) {
        onCloseModalBtnClick();
    }
}

function onEscapePress(event) {
    if(event.code === 'Escape') {
        onCloseModalBtnClick();
    }
}

function onArrowsPress(event) {
    const imagesPull = document.querySelectorAll('.gallery__image');
    const arrayImages = [];
    imagesPull.forEach(el => {
        arrayImages.push(el.dataset.source);
    })

    let newIndex;
    const currentIndex = arrayImages.indexOf(refs.modalImg.src);

    if(event.key === 'ArrowLeft') {
        newIndex = currentIndex - 1;
        if(newIndex == - 1) {
            newIndex = arrayImages.length - 1;
        }
        
    } else if(event.key === 'ArrowRight') {
        newIndex = currentIndex + 1;
        if(newIndex === (arrayImages.length)) {
            newIndex = 0;
        }
    }

    refs.modalImg.src = (arrayImages[newIndex]);

}
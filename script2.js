document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("diplomasContainer");
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modalImg");
    const captionText = document.getElementById("caption");
    const closeModal = document.getElementsByClassName("close")[0];
    const prevButton = document.getElementsByClassName("prev")[0];
    const nextButton = document.getElementsByClassName("next")[0];

    let currentImageIndex = 0;
    let images = [];

    const misDiplomas = 'images/';

    fetch('images.json')
        .then(response => response.json())
        .then(imageFiles => {
            images = imageFiles;

            images.forEach(archivo => {
                const nombreArchivo = archivo.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, '');
                const diplomaHTML = `
                    <div class="diploma">
                        <img src="${misDiplomas}${archivo}" alt="" class="diploma-img" data-file="${nombreArchivo}" title="${nombreArchivo}">
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', diplomaHTML);
            });

            const diplomaImgs = document.querySelectorAll('.diploma-img');

            diplomaImgs.forEach((img, index) => {
                img.addEventListener('click', function() {
                    currentImageIndex = index;
                    openModal();
                });
            });

            closeModal.addEventListener('click', closeModalFunction);
            prevButton.addEventListener('click', prevSlide);
            nextButton.addEventListener('click', nextSlide);

        })
        .catch(error => console.error("Error al obtener los archivos de la carpeta de imágenes:", error));

    function openModal() {
        modal.style.display = "block";
        modalImg.src = `${misDiplomas}${images[currentImageIndex]}`;
        captionText.textContent = images[currentImageIndex].replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, '');
    }

    function closeModalFunction() {
        modal.style.display = "none";
    }

    function prevSlide() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            modalImg.src = `${misDiplomas}${images[currentImageIndex]}`;
            captionText.textContent = images[currentImageIndex].replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, '');
        }
    }

    function nextSlide() {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            modalImg.src = `${misDiplomas}${images[currentImageIndex]}`;
            captionText.textContent = images[currentImageIndex].replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, '');
        }
    }

    document.addEventListener("keydown", function(event) {
        switch(event.key) {
            case "ArrowLeft":
                prevSlide();
                break;
            case "ArrowRight":
                nextSlide();
                break;
            case "Escape":
                closeModalFunction();
                break;
        }
    });
});
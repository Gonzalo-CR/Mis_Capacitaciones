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

    fetch('JSON/softskills.json')
        .then(response => response.json())
        .then(imageFiles => {
            images = imageFiles;
            images.forEach(archivo => {
                const nombreArchivo = archivo.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, '');
                const diplomaHTML = `
                    <div class="diploma">
                        <img src="${misDiplomas}${archivo}" alt="${nombreArchivo}" class="diploma-img" data-file="${nombreArchivo}" title="${nombreArchivo}">
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', diplomaHTML);
            });

            document.querySelectorAll('.diploma-img').forEach((img, index) => {
                img.addEventListener('click', () => openModal(index));
            });

            closeModal.addEventListener('click', closeModalFunction);
            prevButton.addEventListener('click', prevSlide);
            nextButton.addEventListener('click', nextSlide);
        })
        .catch(error => console.error("Error al obtener los archivos de la carpeta de imágenes:", error));

        function openModal(index) {
            currentImageIndex = index;
            modal.style.display = "block";
            updateModalContent();
            modalImg.addEventListener('touchstart', handleTouchStart);
            modalImg.addEventListener('touchmove', handleTouchMove);
          }
        
          function updateModalContent() {
            modalImg.src = `${misDiplomas}${images[currentImageIndex]}`;
            captionText.textContent = images[currentImageIndex].replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, '');
          }
        
          let initialX = 0;
          let threshold = 50; // minimum swipe distance to change image
        
          function handleTouchStart(event) {
            initialX = event.touches[0].clientX;
          }
        
          function handleTouchMove(event) {
            currentX = event.touches[0].clientX;
            const deltaX = currentX - initialX;
        
            // Check for swipe direction and minimum distance
            if (deltaX > threshold) {
              prevSlide(); // Swipe left, go to previous image
            } else if (deltaX < -threshold) {
              nextSlide(); // Swipe right, go to next image
            }
        
            event.preventDefault();
          }
    function closeModalFunction() {
        modal.style.display = "none";
    }

    function prevSlide() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateModalContent();
        }
    }

    function nextSlide() {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            updateModalContent();
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

document.getElementById('hamburger').addEventListener('click', function() {
    var navBar = document.getElementById('nav-bar');
    navBar.querySelector('ul').classList.toggle('show');
});

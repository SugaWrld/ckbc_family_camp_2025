const gallery = document.getElementById("gallery");
const imageFolder = "images/";
const start = 2361;
const end = 3398;
const imagesPerPage = 50;

let currentPage = 0;

function loadPage(page) {
    gallery.innerHTML = "";
    const loading = document.getElementById("loading");
    loading.style.display = "block";

    const pageStart = start + page * imagesPerPage;
    const pageEnd = Math.min(pageStart + imagesPerPage - 1, end);
    let imagesTried = 0;
    const totalImages = pageEnd - pageStart + 1;

    for (let i = pageStart; i <= pageEnd; i++) {
        const src = `${imageFolder}IMG_${i}.JPG`; // or .jpg
        const img = new Image();
        img.src = src;

        img.onload = () => {
            const card = document.createElement("div");
            card.className = "card";

            const imgElement = document.createElement("img");
            imgElement.src = src;
            imgElement.alt = `IMG_${i}.JPG`;
            imgElement.onclick = () => openModal(imgElement.src); // optional

            card.appendChild(imgElement);
            card.innerHTML += `<a href="${src}" download class="btn">Download</a>`;
            gallery.appendChild(card);
            checkIfDone();
        };

        img.onerror = () => {
            // Skip broken image
            checkIfDone();
        };
    }

    function checkIfDone() {
        imagesTried++;
        if (imagesTried === totalImages) {
            loading.style.display = "none";
            updateNavButtons();
        }
    }
}


function updateNavButtons() {
    const totalPages = Math.ceil((end - start + 1) / imagesPerPage);
    document.getElementById("prevBtn").disabled = currentPage === 0;
    document.getElementById("nextBtn").disabled = currentPage >= totalPages - 1;
}

document.getElementById("prevBtn").onclick = () => {
    if (currentPage > 0) {
        currentPage--;
        loadPage(currentPage);
    }
};

document.getElementById("nextBtn").onclick = () => {
    const totalPages = Math.ceil((end - start + 1) / imagesPerPage);
    if (currentPage < totalPages - 1) {
        currentPage++;
        loadPage(currentPage);
    }
};

loadPage(currentPage);

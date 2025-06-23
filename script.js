const gallery = document.getElementById("gallery");
const imageFolder = "images/";
const start = 2361;
const end = 3398;
const imagesPerPage = 50;

let currentPage = 0;
let validImages = [];

function checkImageExists(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function preloadValidImages(batchSize = 50) {
  const total = end - start + 1;

  for (let i = 0; i < total; i += batchSize) {
    const batch = [];
    for (let j = i; j < i + batchSize && (start + j) <= end; j++) {
      const src = `${imageFolder}IMG_${start + j}.JPG`; // use .jpg if your files are lowercase
      batch.push(checkImageExists(src));
    }

    const results = await Promise.all(batch);
    validImages.push(...results.filter(Boolean));
  }

  document.getElementById("loading").style.display = "none";
  loadPage(currentPage);
}

function loadPage(page) {
  gallery.innerHTML = "";

  const pageStart = page * imagesPerPage;
  const pageEnd = Math.min(pageStart + imagesPerPage, validImages.length);

  for (let i = pageStart; i < pageEnd; i++) {
    const src = validImages[i];

    const card = document.createElement("div");
    card.className = "card";

    const imgElement = document.createElement("img");
    imgElement.src = src;
    imgElement.alt = src.split("/").pop();
    imgElement.onclick = () => openModal(imgElement.src); // optional, if you implement modal

    card.appendChild(imgElement);
    card.innerHTML += `<a href="${src}" download class="btn">Download</a>`;
    gallery.appendChild(card);
  }

  updateNavButtons();
}

function updateNavButtons() {
  const totalPages = Math.ceil(validImages.length / imagesPerPage);
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
  const totalPages = Math.ceil(validImages.length / imagesPerPage);
  if (currentPage < totalPages - 1) {
    currentPage++;
    loadPage(currentPage);
  }
};

// Start loading
preloadValidImages();

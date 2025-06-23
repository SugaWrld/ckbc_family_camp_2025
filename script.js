const gallery = document.getElementById("gallery");
const imageFolder = "images/";
const start = 2971;
const end = 3398;
let rotation = 0;

// Load images dynamically and attach click handler
for (let i = start; i <= end; i++) {
    const filename = `IMG_${i}.jpg`;
    const img = new Image();
    img.src = imageFolder + filename;

    img.onload = () => {
        const card = document.createElement("div");
        card.className = "card";

        // Create image element with click handler
        const imgElement = document.createElement("img");
        imgElement.src = img.src;
        imgElement.alt = filename;
        imgElement.style.cursor = "pointer";
        imgElement.onclick = () => openModal(img.src);

        // Append to card
        card.appendChild(imgElement);
        card.innerHTML += `<a href="${img.src}" download class="btn">Download</a>`;
        gallery.appendChild(card);
    };

    img.onerror = () => {
        // Skip missing image
    };
}

// Modal control functions
function openModal(src) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    rotation = 0;
    modal.style.display = "block";
    modalImg.src = src;
    modalImg.style.transform = "rotate(0deg)";
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

function rotateLeft() {
    rotation -= 90;
    document.getElementById("modalImg").style.transform = `rotate(${rotation}deg)`;
}

function rotateRight() {
    rotation += 90;
    document.getElementById("modalImg").style.transform = `rotate(${rotation}deg)`;
}

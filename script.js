const gallery = document.getElementById("gallery");
const imageFolder = "images/";
const start = 2361;
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


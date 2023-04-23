fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(categories => {
    const categoryLinks = document.querySelectorAll('.link');

    categoryLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const category = link.dataset.category;
        getWorksByCategory(category);
      });
    });
  });

function getWorksByCategory(category) {
  fetch(`http://localhost:5678/api/works`)
    .then(response => response.json())
    .then(data => {
      const filteredData = data.filter(image => {
        return image.categoryId == category || category == "all";
      });

      const gallery = document.querySelector('#portfolio .gallery');
      gallery.innerHTML = ''; // vide le contenu HTML

      const imageList = filteredData.map(image => {
        return `<img src="${image.imageUrl}" alt="${image.title}">`;
      }).join('');

      gallery.innerHTML = imageList;
    })
    .catch(error => console.error(error));
}

fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    const gallery = document.querySelector('#portfolio .gallery');
    gallery.innerHTML = ''; // vide le contenu HTML

    data.forEach(image => {
      const img = document.createElement("img");
      img.src = image.imageUrl;
      img.alt = image.title;
      gallery.appendChild(img);
    });
  })
  .catch(error => console.error(error));
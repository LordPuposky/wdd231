document.addEventListener('DOMContentLoaded', function () {
      document.getElementById('lastmod').textContent = document.lastModified;
    });
    const photos = [
      {
        src: 'images/bogota-montserrate.jpg',
        alt: 'View from Monserrate, Bogotá',
        title: 'Monserrate',
        caption: 'Monserrate is one of Bogotá\'s most iconic hills, offering panoramic views of the city and a pilgrimage site since colonial times.'
      },
      {
        src: 'images/bogota-goldmuseum.jpg',
        alt: 'Pre-Columbian Gold Museum',
        title: 'Museo del Oro',
        caption: 'The Gold Museum houses a world-renowned collection of pre-Columbian gold artifacts and is symbol of Colombia\'s ancestral culture.'
      },
      {
        src: 'images/bogota-candelaria.jpg',
        alt: 'La Candelaria colorful district',
        title: 'La Candelaria',
        caption: 'Historic center known for its colonial buildings, street art, museums, and lively cafés—heart of Bogotá\'s cultural life.'
      },
      {
        src: 'images/bogota-ciclovia.jpg',
        alt: 'Ciclovía bikes on main avenue',
        title: 'Ciclovía',
        caption: 'Every Sunday and holiday major roads are reserved for thousands of cyclists and pedestrians—an emblem of Bogotá’s active lifestyle.'
      },
      {
        src: 'images/bogota-parks.jpg',
        alt: 'Public parks in Bogotá',
        title: 'Parks and Green Zones',
        caption: 'Bogotá is dotted with beautiful public parks and green spaces, perfect for socializing, sports, and family activities.'
      },
      {
        src: 'images/bogota-events.jpg',
        alt: 'Street events and markets',
        title: 'Cultural Events & Markets',
        caption: 'From big events to street markets, Bogotá is always buzzing with culture, music, food, and uplifting communal spirit.'
      }
    ];

    let currentIdx = 0;

    function renderCarouselPhoto(idx) {
      const photoDiv = document.getElementById('carouselPhoto');
      const photo = photos[idx];
      photoDiv.innerHTML = `<img src="${photo.src}" alt="${photo.alt}" title="${photo.title}" style="max-width:340px; border-radius:13px; cursor:pointer;">`;
      photoDiv.onclick = () => showPhotoModal(idx);
    }
    renderCarouselPhoto(currentIdx);

    document.getElementById('prevBtn').onclick = () => {
      currentIdx = (currentIdx - 1 + photos.length) % photos.length;
      renderCarouselPhoto(currentIdx);
    };
    document.getElementById('nextBtn').onclick = () => {
      currentIdx = (currentIdx + 1) % photos.length;
      renderCarouselPhoto(currentIdx);
    };

    function showPhotoModal(idx) {
      const modal = document.getElementById('photoModal');
      const content = document.getElementById('photoModalContent');
      const photo = photos[idx];
      content.innerHTML = `
    <span class="close" onclick="document.getElementById('photoModal').style.display='none';">&times;</span>
    <img src="${photo.src}" alt="${photo.alt}" style="max-width:340px; border-radius:12px; margin-bottom:1.1rem;">
    <h3 style="margin-bottom:0.4rem;">${photo.title}</h3>
    <p>${photo.caption}</p>
  `;
      modal.style.display = 'flex';
    }

    window.onclick = function (event) {
      const modal = document.getElementById('photoModal');
      if (event.target == modal) { modal.style.display = "none"; }
    };
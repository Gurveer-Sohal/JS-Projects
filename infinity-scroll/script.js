const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = []


// Unsplash API
const count = 10;
const apiKey = 'zhYEYnj8QXa4y7isWI7GciQcCXVV_VBwQ-DkVDO9Cr4';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Helper Function to Set Attributes on DOM Elements
function setAttributes (element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}
    
// Create elements for links and photos, Add to DOM
function displayPhotos(){
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash 
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html, 
            target: '_blank'});
        // Create <img> for photo
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event listener, check when each is finished loading.
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos Unsplash API
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        // Catch error here
    }
}


// Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
        getPhotos()
    }
});
getPhotos()
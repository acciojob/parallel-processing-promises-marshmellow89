function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load image's URL: ${url}`);
        img.src = url;
    });
}

function downloadImages() {
    const outputDiv = document.getElementById('output');
    const errorDiv = document.getElementById('error');
    const loadingDiv = document.getElementById('loading');
    
    // Clear previous outputs and errors
    outputDiv.innerHTML = '';
    errorDiv.textContent = '';
    
    // Show loading spinner
    loadingDiv.style.display = 'block';
    
    // Create an array of download promises
    const downloadPromises = imageUrls.map(url => downloadImage(url));
    
    // Handle all download promises
    Promise.all(downloadPromises)
        .then(images => {
            // Hide loading spinner
            loadingDiv.style.display = 'none';
            
            // Append each image to the output container
            images.forEach(img => {
                outputDiv.appendChild(img);
            });
        })
        .catch(error => {
            // Hide loading spinner
            loadingDiv.style.display = 'none';
            
            // Display error message
            errorDiv.textContent = error;
        });
}
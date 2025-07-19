// DOM elements
const downloadButton = document.getElementById('download-images-button');
const resetButton = document.getElementById('reset-btn');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const outputDiv = document.getElementById('output');
const successMessage = document.getElementById('success-message');

// Image URLs as expected by the test
const imageUrls = [
    'https://picsum.photos/id/237/200/300',
    'https://picsum.photos/id/238/200/300',
    'https://picsum.photos/id/239/200/300'
];

/**
 * Downloads a single image
 * @param {string} url - The URL of the image to download
 * @returns {Promise<HTMLImageElement>} A promise that resolves with the image element if successful
 */
function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image from ${url}`));
        img.src = url;
        
        // Add a timeout to handle cases where the image never loads
        setTimeout(() => {
            if (!img.complete) {
                reject(new Error(`Image loading timed out for ${url}`));
            }
        }, 10000);
    });
}

/**
 * Downloads all images and handles the UI states
 */
async function downloadImages() {
    // Clear previous results
    errorDiv.style.display = 'none';
    errorDiv.textContent = '';
    successMessage.style.display = 'none';
    
    // Remove placeholder if it exists
    if (outputDiv.querySelector('.placeholder')) {
        outputDiv.innerHTML = '';
    }
    
    // Show loading spinner
    loadingDiv.style.display = 'block';
    
    try {
        // Create an array of promises for all image downloads
        const imagePromises = imageUrls.map(url => downloadImage(url));
        
        // Wait for all downloads to complete
        const images = await Promise.all(imagePromises);
        
        // Hide loading spinner
        loadingDiv.style.display = 'none';
        
        // Display all images
        images.forEach((img, index) => {
            const card = document.createElement('div');
            card.className = 'image-card';
            
            // Create image element
            const imgElement = document.createElement('img');
            imgElement.src = img.src;
            imgElement.alt = `Downloaded Image ${index + 1}`;
            
            // Create info element
            const info = document.createElement('div');
            info.className = 'image-info';
            info.textContent = `Image ${index + 1} loaded successfully`;
            
            card.appendChild(imgElement);
            card.appendChild(info);
            outputDiv.appendChild(card);
        });
        
        // Show success message
        successMessage.style.display = 'block';
        
    } catch (error) {
        // Hide loading spinner on error
        loadingDiv.style.display = 'none';
        
        // Display error message
        errorDiv.textContent = error.message;
        errorDiv.style.display = 'block';
        
        // Reset output to placeholder
        outputDiv.innerHTML = '<div class="placeholder"><p>Error occurred during download.</p><p>Try again or check console for details.</p></div>';
    }
}

/**
 * Reset the UI to initial state
 */
function reset() {
    loadingDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    errorDiv.textContent = '';
    successMessage.style.display = 'none';
    outputDiv.innerHTML = '<div class="placeholder"><p>No images loaded yet.</p><p>Click "Download Images" to start.</p></div>';
}

// Event listeners
downloadButton.addEventListener('click', downloadImages);
resetButton.addEventListener('click', reset);
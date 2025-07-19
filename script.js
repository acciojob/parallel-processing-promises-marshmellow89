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
            });
        }

        /**
         * Downloads all images and handles the UI states
         */
        async function downloadImages() {
            const loadingDiv = document.getElementById('loading');
            const errorDiv = document.getElementById('error');
            const outputDiv = document.getElementById('output');
            
            // Clear previous results
            errorDiv.textContent = '';
            outputDiv.innerHTML = '';
            
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
                images.forEach(img => {
                    outputDiv.appendChild(img);
                });
                
            } catch (error) {
                // Hide loading spinner on error
                loadingDiv.style.display = 'none';
                
                // Display error message
                errorDiv.textContent = error.message;
            }
        }

        // Start the download process when the page loads
        window.onload = downloadImages;
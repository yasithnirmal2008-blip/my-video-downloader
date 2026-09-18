async function downloadVideo() {
    const urlInput = document.getElementById('videoUrl').value.trim();
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');
    const downloadBtn = document.getElementById('downloadBtn');

    if (!urlInput) {
        alert('Please enter a valid video link!');
        return;
    }

    loading.classList.remove('hidden');
    result.classList.add('hidden');

    // RapidAPI Fetch Request
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '1861fb2938msh660393d9ef8eceep15844djsn12d892a83flf', // Insert your API key here
            'x-rapidapi-host': 'social-media-video-downloader.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: urlInput })
    };

    try {
        const response = await fetch('https://social-media-video-downloader.p.rapidapi.com/smvd/get-video-url', options);
        const data = await response.json();

        loading.classList.add('hidden');

        if (data && data.download_url) {
            downloadBtn.href = data.download_url;
            result.classList.remove('hidden');
        } else {
            alert('Unable to fetch video. Please check the URL and try again.');
        }
    } catch (error) {
        loading.classList.add('hidden');
        alert('An error occurred! Please check your RapidAPI key or connection.');
    }
}

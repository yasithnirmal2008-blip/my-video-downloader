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

    try {
        const response = await fetch(`https://youtube-media-downloader.p.rapidapi.com/v2/video/details?url=${encodeURIComponent(urlInput)}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '1861fb2938msh660393d9ef8eceep15844djsn12d892a83f1f',
                'x-rapidapi-host': 'youtube-video-fast-downloader-24-7.p.rapidapi.com'
            }
        });

        const data = await response.json();
        console.log("API Response:", data);

        loading.classList.add('hidden');

        // Extract download link from response
        if (data && data.videos && data.videos.items && data.videos.items.length > 0) {
            downloadBtn.href = data.videos.items[0].url;
            result.classList.remove('hidden');
        } else if (data && data.audios && data.audios.items && data.audios.items.length > 0) {
            downloadBtn.href = data.audios.items[0].url;
            result.classList.remove('hidden');
        } else {
            alert('Could not fetch video download link. Make sure the API plan is active.');
        }
    } catch (error) {
        loading.classList.add('hidden');
        console.error("Error:", error);
        alert('An error occurred while fetching the video.');
    }
}

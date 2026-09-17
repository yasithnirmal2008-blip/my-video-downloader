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
        const response = await fetch('https://api.cobalt.tools/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: urlInput,
                videoQuality: '720'
            })
        });

        const data = await response.json();
        loading.classList.add('hidden');

        if (data && (data.url || data.picker)) {
            // Direct Download Link එක ලැබුණු විට
            downloadBtn.href = data.url || data.picker[0].url;
            result.classList.remove('hidden');
        } else {
            alert('Unable to fetch video. Please check the URL or try another link.');
        }
    } catch (error) {
        loading.classList.add('hidden');
        alert('An error occurred while processing the video. Please try again!');
    }
}

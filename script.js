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
        // Vercel Serverless Function එකට Request එක යැවීම
        const response = await fetch(`/api/download?url=${encodeURIComponent(urlInput)}`);
        const data = await response.json();

        loading.classList.add('hidden');

        if (data && data.url) {
            downloadBtn.href = data.url;
            result.classList.remove('hidden');
        } else if (data && data.picker && data.picker.length > 0) {
            downloadBtn.href = data.picker[0].url;
            result.classList.remove('hidden');
        } else {
            alert('Could not fetch video. Please check the URL or try another link.');
        }
    } catch (error) {
        loading.classList.add('hidden');
        alert('An error occurred while connecting to the server.');
    }
}

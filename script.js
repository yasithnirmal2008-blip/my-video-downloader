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
                url: urlInput
            })
        });

        const data = await response.json();
        console.log("API Response:", data);

        loading.classList.add('hidden');

        if (data && data.url) {
            downloadBtn.href = data.url;
            result.classList.remove('hidden');
        } else if (data && data.picker && data.picker.length > 0) {
            downloadBtn.href = data.picker[0].url;
            result.classList.remove('hidden');
        } else {
            alert('Could not fetch video. Please try a different link.');
        }
    } catch (error) {
        loading.classList.add('hidden');
        console.error("Error:", error);
        alert('An error occurred while connecting to the server.');
    }
}

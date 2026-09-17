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
        const response = await fetch('https://api.cobalt.tools/api/json', {
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
        console.log("API Response Data:", data); // මෙයින් API එකෙන් එන දත්ත Console එකට Print වේ

        loading.classList.add('hidden');

        if (data && (data.url || data.picker)) {
            downloadBtn.href = data.url || data.picker[0].url;
            result.classList.remove('hidden');
        } else {
            alert('API Message: ' + (data.text || data.status || 'Unable to fetch video'));
        }
    } catch (error) {
        loading.classList.add('hidden');
        console.error("Fetch Error:", error);
        alert('An error occurred! Check the console for details.');
    }
}

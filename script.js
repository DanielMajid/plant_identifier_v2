export async function prepare_api() {
    const fileInput = document.getElementById("my_file");
    const files = fileInput.files;

// file validation (number, combined size, format)

    // pepare formdata
    const form = new FormData();
    for (let i =0; i < files.length; i++) {
        form.append("images", files[i]);
        // additional data to specify query
        //form.append("organs", i === 0 ? "flower" : "leaf");
    }
    console.log("FormData prepared:", form);

    await send_api(form);
}

async function send_api(form) {
    
    // const image1 = '/data/media/image_1.jpeg'
    // const image2 = '/data/media/image_2.jpeg'

    // const identify = () => {
    // const form = new FormData()

    // form.append('organs', 'flower');
    // form.append('images', fs.createReadStream(image1));

    // form.append('organs', 'leaf');
    // form.append('images', fs.createReadStream(image2));

    const project = 'all'; // You can choose a more specific flora, see: /docs/newfloras
    const apiKey = '2b108OvWhxjjceSLhrfgWXn0He';

    console.log("Sending API request...");

    fetch(`https://my-api.plantnet.org/v2/identify/${project}?api-key=${apiKey}`, {
        method: 'post',
        body: form,
        })
        .then((response) => {
            console.log("API response received:", response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("API Response:", data);
        })
        .catch((error) => {
            console.error("Error identifying plant:", error);
        });
}
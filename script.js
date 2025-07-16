import fs from 'node:fs'
import FormData from 'form-data' // npm install form-data

function prepare_api()
    const image1 = '/data/media/image_1.jpeg'
    const image2 = '/data/media/image_2.jpeg'

    const identify = () => {
    const form = new FormData()

    form.append('organs', 'flower');
    form.append('images', fs.createReadStream(image1));

    form.append('organs', 'leaf');
    form.append('images', fs.createReadStream(image2));

    const project = 'all'; // You can choose a more specific flora, see: /docs/newfloras
    const apiKey = process.env.PLANTNET_API_KEY;

    try {
        const response = await fetch(`https://my-api.plantnet.org/v2/identify/${project}?api-key=${apiKey}`,
        {
            method: 'post',
            body: form,
        }
        );

        console.log('status', response.status) // should be: 200

        const json = await response.json()
        console.log('json', json)
    } catch (error) {
        console.error('error', error);
    }
    };
identify()
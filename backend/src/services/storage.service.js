const ImageKit = require("imagekit");
require('dotenv').config();


const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT } = process.env;

let imagekit = null;
if (IMAGEKIT_PUBLIC_KEY && IMAGEKIT_PRIVATE_KEY && IMAGEKIT_URL_ENDPOINT) {
    imagekit = new ImageKit({
        publicKey: IMAGEKIT_PUBLIC_KEY,
        privateKey: IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: IMAGEKIT_URL_ENDPOINT
    });
} else {
    console.warn("ImageKit not configured: set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT");
}
async function uploadFile(file, fileName) {
  if (!imagekit) {
    throw new Error(
      "ImageKit not initialized. Ensure IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and IMAGEKIT_URL_ENDPOINT are set in the environment."
    );
  }

  const result = await imageKit.upload({
    file: file,
    fileName: fileName,
  });
  return result;
}

module.exports = { uploadFile };
const ImageKit = require("imagekit");

// Read ImageKit configuration from environment variables.
const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file, fileName) {
  if (!imageKit) {
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
import axios from "axios";

// Replace with your real Widevine license server
const LICENSE_SERVER_URL = 'https://key.salidaph.online/widevine';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const licenseRes = await axios.post(LICENSE_SERVER_URL, req.body, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Accept': '*/*',
      },
      responseType: 'arraybuffer',
    });

    res.setHeader('Content-Type', 'application/octet-stream');
    res.status(licenseRes.status).send(licenseRes.data);
  } catch (err) {
    console.error("Widevine proxy error:", err.message);
    res.status(err.response?.status || 500).send("Proxy failed");
  }
}

export const config = {
  api: {
    bodyParser: false, // required for binary requests
  },
};

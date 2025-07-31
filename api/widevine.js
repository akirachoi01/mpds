// /api/widevine.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const licenseRequest = req.body;

  try {
    const fetchResponse = await fetch("https://key.salidaph.online/widevine", {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream"
      },
      body: licenseRequest
    });

    const licenseResponse = await fetchResponse.arrayBuffer();

    res.setHeader("Content-Type", "application/octet-stream");
    res.send(Buffer.from(licenseResponse));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "License fetch failed" });
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const licenseServerURL = "https://key.salidaph.online/widevine"; // 🔁 Replace this

  try {
    const response = await fetch(licenseServerURL, {
      method: "POST",
      headers: {
        "Content-Type": req.headers["content-type"] || "application/octet-stream"
      },
      body: req.body
    });

    const buffer = await response.arrayBuffer();
    res.setHeader("Content-Type", response.headers.get("Content-Type") || "application/octet-stream");
    res.status(response.status).send(Buffer.from(buffer));
  } catch (err) {
    console.error("License proxy error:", err);
    res.status(500).json({ error: "Widevine proxy failed." });
  }
}

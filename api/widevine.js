export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Widevine License Request:', req.body);
    res.status(200).json({ message: 'Widevine license endpoint is working (Vercel)' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

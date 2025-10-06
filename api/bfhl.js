export default function handler(req, res) {
    if (req.method === 'POST') {
        // Place your logic from app.post('/bfhl', ...) here
    } else if (req.method === 'GET') {
        // Place your logic from app.get('/bfhl', ...) here
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

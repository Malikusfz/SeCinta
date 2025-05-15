// TODO: implement actual DB logic
export default async function handler(req, res) {
    if (req.method === 'GET') {
        // TODO: fetch goals for the user/family
        return res.status(200).json([]);
    }

    if (req.method === 'POST') {
        // TODO: create a new goal
        return res.status(201).json({ message: 'Goal created' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
} 
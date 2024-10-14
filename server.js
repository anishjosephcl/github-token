// Import the necessary modules
 // Adjust the path as needed
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to verify GitHub token
app.post('/verify-token', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    try {
        // Verify the GitHub token
        const userData = await verifyGithubToken(token);
        
        // If verification is successful, return user data
        return res.status(200).json({ user: userData });
    } catch (error) {
        // Handle errors (e.g., invalid token)
        return res.status(401).json({ error: 'Invalid token' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

import axios from 'axios';

// Verify the GitHub token and return user details
export async function verifyGithubToken(token) {
  const response = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Return the user details
  return response.data;
}
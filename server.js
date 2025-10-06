const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS middleware (if needed for frontend)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    next();
});

// POST route for /bfhl
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        // Validate input
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' should be an array"
            });
        }

        
        const user_id = "dnyanesh_purohit_21092004";  
        const email = "dnyaneshpurohit@gmail.com";
        const roll_number = "112216034";

        // Initialize arrays
        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;

        // Process each item in the data array
        data.forEach(item => {
            const itemStr = String(item);

            // Check if it's a number
            if (/^\d+$/.test(itemStr)) {
                const num = parseInt(itemStr);
                if (num % 2 === 0) {
                    even_numbers.push(itemStr);
                } else {
                    odd_numbers.push(itemStr);
                }
                sum += num;
            }
            // Check if it's alphabetic (can be multi-character)
            else if (/^[a-zA-Z]+$/.test(itemStr)) {
                alphabets.push(itemStr.toUpperCase());
            }
            // Otherwise it's a special character
            else {
                special_characters.push(itemStr);
            }
        });

        // Generate concat_string
        let all_alphabets = [];
        data.forEach(item => {
            const itemStr = String(item);
            if (/^[a-zA-Z]+$/.test(itemStr)) {
                all_alphabets.push(...itemStr.split(''));
            }
        });

        // Reverse and alternate caps (even index = uppercase, odd index = lowercase)
        all_alphabets.reverse();
        const concat_string = all_alphabets.map((char, index) => {
            return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
        }).join('');

        // Prepare response
        const response = {
            is_success: true,
            user_id: user_id,
            email: email,
            roll_number: roll_number,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: String(sum),
            concat_string: concat_string
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

// GET route for /bfhl (optional, for testing)
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Health check route
app.get('/', (req, res) => {
    res.json({ message: "API is running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
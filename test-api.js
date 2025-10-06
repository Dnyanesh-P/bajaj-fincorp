const axios = require('axios');

// Test cases from the assignment
const testCases = [
    {
        name: "Example A",
        input: ["a","1","334","4","R", "$"],
        expected: {
            odd_numbers: ["1"],
            even_numbers: ["334","4"],
            alphabets: ["A","R"],
            special_characters: ["$"],
            sum: "339",
            concat_string: "Ra"
        }
    },
    {
        name: "Example B", 
        input: ["2","a", "y", "4", "&", "-", "*", "5","92","b"],
        expected: {
            odd_numbers: ["5"],
            even_numbers: ["2","4","92"],
            alphabets: ["A", "Y", "B"],
            special_characters: ["&", "-", "*"],
            sum: "103",
            concat_string: "ByA"
        }
    },
    {
        name: "Example C",
        input: ["A","ABcD","DOE"],
        expected: {
            odd_numbers: [],
            even_numbers: [],
            alphabets: ["A","ABCD","DOE"],
            special_characters: [],
            sum: "0",
            concat_string: "EoDdCbAa"
        }
    }
];

// Function to test locally
async function testLocal() {
    const baseURL = 'http://localhost:3000';

    console.log('Testing local API...');

    for (const testCase of testCases) {
        try {
            const response = await axios.post(`${baseURL}/bfhl`, {
                data: testCase.input
            });

            console.log(`\n${testCase.name}:`);
            console.log('Input:', testCase.input);
            console.log('Expected concat_string:', testCase.expected.concat_string);
            console.log('Actual concat_string:', response.data.concat_string);
            console.log('Match:', response.data.concat_string === testCase.expected.concat_string);
        } catch (error) {
            console.error(`Error testing ${testCase.name}:`, error.message);
        }
    }
}

// Function to test deployed API
async function testDeployed(deployedURL) {
    console.log(`\nTesting deployed API at: ${deployedURL}`);

    try {
        const response = await axios.post(deployedURL, {
            data: testCases[0].input
        });

        console.log('Deployment test successful!');
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Deployment test failed:', error.message);
    }
}

// Export for use
module.exports = { testLocal, testDeployed, testCases };

// If running directly
if (require.main === module) {
    testLocal();
}

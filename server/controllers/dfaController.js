// Function to tokenize the input code
const tokenize = (input) => {
    // Define keywords as a set to easily check against
    const keywords = new Set(["int", "if", "else", "while", "return"]);

    // Token patterns with regex
    const tokenPatterns = [
        { type: "keyword", regex: /\b(int|if|else|while|return)\b/g },  // Match keywords first
        { type: "identifier", regex: /\b[a-zA-Z_]\w*\b/g },             // Match identifiers
        { type: "operator", regex: /[=+\-*/<>!]/g },                     // Match operators
        { type: "number", regex: /\b\d+\b/g },                           // Match numbers
        { type: "brackets", regex: /[\(\)\{\}\[\]]/g },                  // Match brackets
        { type: "semicolon", regex: /;/g }                               // Match semicolons
    ];
    

    let tokens = [];
    let remainingInput = input;

    // First, tokenize the keywords specifically, as they have precedence
    let keywordMatches;
    while ((keywordMatches = tokenPatterns[0].regex.exec(remainingInput)) !== null) {
        tokens.push({ type: "keyword", value: keywordMatches[0] });
        remainingInput = remainingInput.replace(keywordMatches[0], '');  // Remove matched keyword
    }

    // Now tokenize the rest of the input for numbers, operators, brackets, etc.
    tokenPatterns.slice(1).forEach(pattern => {
        let match;
        while ((match = pattern.regex.exec(remainingInput)) !== null) {
            // If the token is not a keyword, it is an identifier
            if (pattern.type === "identifier" && !keywords.has(match[0])) {
                tokens.push({ type: "identifier", value: match[0] });
            } else {
                tokens.push({ type: pattern.type, value: match[0] });
            }
            remainingInput = remainingInput.replace(match[0], '');  // Remove matched token
        }
    });

    return tokens;
};

// Simulated DFA generation (can be expanded with more logic)
const generateDFA = (input) => {
    return {
        states: ["q0", "q1", "q2"],
        transitions: {
            q0: { "i": "q1", "n": "q2" },
            q1: { "t": "q2" },
            q2: { "=": "q3" }
        },
        startState: "q0",
        finalStates: ["q2"]
    };
};

// Simulated DFA minimization (simplified)
const minimizeDFA = (dfa) => {
    return {
        states: ["q0", "q1"],
        transitions: {
            q0: { "i": "q1", "n": "q1" }
        },
        startState: "q0",
        finalStates: ["q1"]
    };
};

// Controller to process the input
const processInput = (req, res) => {
    const { input } = req.body;

    // Tokenize the input code
    const tokens = tokenize(input);

    // Generate the original DFA
    const originalDFA = generateDFA(input);

    // Minimize the DFA
    const minimizedDFA = minimizeDFA(originalDFA);

    // Send the response back to frontend
    res.json({
        tokens,
        originalDFA,
        minimizedDFA
    });
};

module.exports = { processInput };

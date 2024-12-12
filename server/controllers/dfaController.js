// Optimized DFA Minimization and Lexical Analysis

// Tokenization Function
const tokenize = (input) => {
    const keywords = new Set(["int", "if", "else", "while", "return"]);
    const tokenPatterns = [
        { type: "keyword", regex: /\b(int|if|else|while|return)\b/ },
        { type: "identifier", regex: /\b[a-zA-Z_]\w*\b/ },
        { type: "operator", regex: /[=+\-*/<>!]/ },
        { type: "number", regex: /\b\d+\b/ },
        { type: "brackets", regex: /[\(\)\{\}\[\]]/ },
        { type: "semicolon", regex: /;/ },
        { type: "comment", regex: /\/\/[^\n]*|\/\*[\s\S]*?\*\// },
        { type: "whitespace", regex: /\s+/ },
    ];

    let tokens = [];
    let position = 0;

    while (position < input.length) {
        let matchFound = false;

        for (const pattern of tokenPatterns) {
            const regex = new RegExp(`^${pattern.regex.source}`);
            const match = input.slice(position).match(regex);

            if (match) {
                const value = match[0];

                if (pattern.type !== "whitespace" && pattern.type !== "comment") {
                    if (pattern.type === "identifier" && keywords.has(value)) {
                        tokens.push({ type: "keyword", value });
                    } else {
                        tokens.push({ type: pattern.type, value });
                    }
                }

                position += value.length;
                matchFound = true;
                break;
            }
        }

        if (!matchFound) {
            throw new Error(`Unexpected token at position ${position}: ${input.slice(position, position + 10)}`);
        }
    }

    return tokens;
};

// Generate DFA Function
const generateDFA = (input) => {
    const tokens = tokenize(input);
    let states = ["q0"];
    let transitions = {};
    let finalStates = [];

    let currentState = "q0";
    let stateCounter = 1;
    transitions[currentState] = {};

    tokens.forEach((token, index) => {
        const tokenType = token.type;

        if (!transitions[currentState][tokenType]) {
            let newState = `q${stateCounter++}`;
            transitions[currentState][tokenType] = newState;
            states.push(newState);
            transitions[newState] = {};
        }

        currentState = transitions[currentState][tokenType];

        if (index === tokens.length - 1) {
            finalStates.push(currentState);
        }
    });

    return { states, transitions, startState: "q0", finalStates };
};

// Minimize DFA Function
const minimizeDFA = (dfa) => {
    const { states, transitions, startState, finalStates } = dfa;

    let partition = [finalStates, states.filter(s => !finalStates.includes(s))];
    let newPartition;

    do {
        newPartition = [];

        partition.forEach(group => {
            let groups = {};

            group.forEach(state => {
                let key = JSON.stringify(Object.keys(transitions[state] || {}).map(k => {
                    let targetState = transitions[state][k];
                    return partition.findIndex(g => g.includes(targetState));
                }));

                if (!groups[key]) groups[key] = [];
                groups[key].push(state);
            });

            newPartition.push(...Object.values(groups));
        });

        partition = newPartition;
    } while (partition.length !== newPartition.length);

    let minimizedStates = partition.map((group, idx) => `q${idx}`);
    let minimizedTransitions = {};
    let minimizedFinalStates = [];

    partition.forEach((group, idx) => {
        const stateName = `q${idx}`;
        minimizedTransitions[stateName] = {};

        group.forEach(state => {
            if (finalStates.includes(state)) {
                minimizedFinalStates.push(stateName);
            }

            Object.keys(transitions[state] || {}).forEach(symbol => {
                let targetState = transitions[state][symbol];
                let targetGroup = partition.findIndex(g => g.includes(targetState));
                minimizedTransitions[stateName][symbol] = `q${targetGroup}`;
            });
        });
    });

    return {
        states: minimizedStates,
        transitions: minimizedTransitions,
        startState: "q0",
        finalStates: [...new Set(minimizedFinalStates)]
    };
};

// Process Input Function
const processInput = (req, res) => {
    const { input } = req.body;
    const tokens = tokenize(input);
    const originalDFA = generateDFA(input);
    const minimizedDFA = minimizeDFA(originalDFA);

    res.json({
        tokens,
        originalDFA,
        minimizedDFA
    });
};

// Export for Testing
module.exports = { processInput };
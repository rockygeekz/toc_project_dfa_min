# DFA Minimization for Lexical Analysis in Compilers

This project demonstrates the minimization of Deterministic Finite Automata (DFA) for lexical analysis in compilers. It uses the MERN (MongoDB, Express.js, React.js, Node.js) stack and consists of a frontend and backend to handle the input, DFA construction, and DFA minimization processes. The project is structured into two main directories: `client` and `server`.

## Introduction
In compilers, lexical analysis is the first phase where the source code is scanned to break it into meaningful tokens. This process involves:

- **Scanning:** Identifying token patterns (e.g., keywords, identifiers, operators).
- **Tokenization:** Assigning labels to these patterns (e.g., `int`, `=`).
- **Automata:** Constructing a DFA to recognize these tokens.

DFA minimization ensures that the DFA used for lexical analysis is efficient in terms of state representation. Minimization reduces the number of states while preserving the functionality, making the compilation process faster and more resource-efficient.

Real-world applications of DFA minimization include:
- Optimizing lexical analyzers in programming language compilers.
- Pattern matching in text editors and search engines.
- Network traffic filtering.

This project takes a simple code snippet (e.g., `int x = 10;`), tokenizes it, constructs a DFA for the tokenized input, and minimizes the DFA to ensure an optimized representation.

---

## Features
- Input code snippets for tokenization.
- Generate and visualize the DFA for the input.
- Minimize the DFA to its simplest form.
- User-friendly frontend interface built with React.js.
- Backend logic implemented using Node.js and Express.js.
- Database storage for processed inputs using MongoDB.

---

## Project Structure

```
root
├── client    # Frontend React.js application
├── server    # Backend Node.js/Express.js application
```

### `client`
The frontend application provides a user interface to:
- Input code snippets.
- View the tokenized output.
- Visualize the constructed DFA and its minimized version.

### `server`
The backend application handles:
- Parsing the input code snippet.
- Tokenizing the input.
- Constructing and minimizing the DFA.
- Serving the minimized DFA to the frontend.

---

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/toc-dfa-project.git
   cd toc-dfa-project
   ```

2. Install dependencies for the server:
   ```bash
   cd server
   npm install
   ```

3. Install dependencies for the client:
   ```bash
   cd ../client
   npm install
   ```

### Running the Project
1. Start the server:
   ```bash
   cd server
   npm start
   ```

2. Start the client:
   ```bash
   cd ../client
   npm start
   ```

3. Open the frontend in your browser:
   - Frontend: [https://toc-frontend-dfa.vercel.app/](https://toc-frontend-dfa.vercel.app/)
   - Backend: [https://toc-backend.vercel.app/](https://toc-backend.vercel.app/)

---

## Input Examples
Here are some inputs you can try:

### Example 1
**Input:**
```c
int x = 10;
```
**Output:**
- Tokens: `int`, `x`, `=`, `10`, `;`
- DFA: Visualized as states and transitions.
- Minimized DFA: Optimized state representation.

### Example 2
**Input:**
```c
float y = x + 2.5;
```
**Output:**
- Tokens: `float`, `y`, `=`, `x`, `+`, `2.5`, `;`
- DFA: Visualized as states and transitions.
- Minimized DFA: Optimized state representation.

---

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Hosting:** Vercel for both frontend and backend

---

## Links
- [Frontend](https://toc-frontend-dfa.vercel.app/)
- [Backend](https://toc-backend.vercel.app/)

---

## Future Enhancements
- Add support for more complex token patterns.
- Integrate a DFA visualization library.
- Enhance the user interface for better interactivity.
- Provide detailed DFA minimization steps for educational purposes.

---

Feel free to contribute or report issues to improve this project!

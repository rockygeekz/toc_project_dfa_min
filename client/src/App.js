import React, { useState } from "react";
import axios from "axios";
import InputForm from "./Components/InputForm";
import Results from "./Components/Results";

function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const processCode = async (code) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/dfa/process", { input: code });
      setResults(response.data);
    } catch (error) {
      console.error("Error processing code:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">DFA Minimization and Lexical Analysis</h1>
        <InputForm onSubmit={processCode} />
        {loading ? (
          <div className="text-center mt-4">Loading...</div>
        ) : (
          <Results results={results} />
        )}
      </div>
    </div>
  );
}

export default App;

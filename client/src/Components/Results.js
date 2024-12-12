import React from "react";

function Results({ results }) {
  if (!results) return null;

  const { tokens, originalDFA, minimizedDFA } = results;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Tokenized Output</h3>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-300 text-left bg-gray-100">Type</th>
            <th className="px-4 py-2 border border-gray-300 text-left bg-gray-100">Value</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300">{token.type}</td>
              <td className="px-4 py-2 border border-gray-300">{token.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-2xl font-semibold mt-8 mb-4">Original DFA</h3>
      <pre className="bg-gray-100 p-4 rounded-lg">{JSON.stringify(originalDFA, null, 2)}</pre>

      <h3 className="text-2xl font-semibold mt-8 mb-4">Minimized DFA</h3>
      <pre className="bg-gray-100 p-4 rounded-lg">{JSON.stringify(minimizedDFA, null, 2)}</pre>
    </div>
  );
}

export default Results;

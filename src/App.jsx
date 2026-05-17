import { useState } from "react";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResearch = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/webhook-test/search-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
        }),
      });

      const data = await response.json();
      setResult(data[0].output);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch research results. Please try again.");
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && topic.trim()) {
      handleResearch();
    }
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Research Agent</h1>
        <p className="subtitle">Powered by AI</p>
      </div>

      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter a topic to research..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
            disabled={loading}
          />
          <button
            onClick={handleResearch}
            className="search-button"
            disabled={!topic.trim() || loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Researching...
              </>
            ) : (
              <>
                <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                Search
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <svg className="alert-icon" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10"></circle>
            <text x="12" y="16" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">!</text>
          </svg>
          {error}
        </div>
      )}

      {result && (
        <div className="result-section">
          <div className="result-header">
            <h2>Research Results</h2>
            <span className="result-badge">{topic}</span>
          </div>
          <div className="result-content">{result}</div>
        </div>
      )}

      {!result && !error && !loading && (
        <div className="empty-state">
          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <p>Enter a topic to get started with your research</p>
        </div>
      )}
    </div>
  );
}

export default App;
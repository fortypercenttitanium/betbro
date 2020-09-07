import React from "react";

function App() {
  fetch("/api/data.json")
    .then((res) => res.json())
    .then((json) => console.log(json));
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <ul></ul>
      </main>
    </div>
  );
}

export default App;

import { createRoot } from 'react-dom/client';
import { useState } from "react";
import WelcomePage from './WelcomePage';
import ToDo from './TodoPage'

function App() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      {!submitted ? (
        <WelcomePage
          name={name}
          setName={setName}
          onSubmit={() => setSubmitted(true)}
        />
      ) : (<ToDo name = {name}/>)}
    </>
  );
}
export default App;

createRoot(document.getElementById('root')).render(
    <App />
)

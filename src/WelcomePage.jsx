function WelcomePage({ name, setName, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) onSubmit();
  };

  return (
    <div className="welcome">
      <h1>Welcome to your To‑Do List</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter your name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default WelcomePage;
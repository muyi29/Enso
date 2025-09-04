import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase.jsx";

export default function NameSubmitForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter a name!");

    setLoading(true);
    try {
      await addDoc(collection(db, "shortcutNames"), {
        name: name,
        votes: 0,
        timestamp: new Date(),
        submittedBy: "anonymous", // replace with user auth if needed
      });
      setName("");
      alert("Name submitted!");
    } catch (error) {
      console.error("Error adding name:", error);
      alert("Something went wrong. Check console.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="flex max-w-md w-full mx-auto"
      >
        <input
          type="text"
          value={name}
          placeholder="💡 Suggest your own name"
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-2 rounded-l-lg border border-gray-600 bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white font-semibold px-4 py-2 rounded-r-lg hover:bg-green-600 disabled:bg-gray-400 flex items-center gap-1"
        >
          🚀 {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
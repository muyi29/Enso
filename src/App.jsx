import React, { useState, useEffect } from "react";
import { db } from "./firebase.jsx";
import { generateName } from "./namegenerator.jsx";
import logo from "./assets/logo.png";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  increment,
  updateDoc,
  doc,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { RiTwitterXFill } from "react-icons/ri"

function App() {
  const [currentName, setCurrentName] = useState(generateName());
  const [shortcutList, setShortcutList] = useState([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const q = query(collection(db, "shortcutNames"), orderBy("votes", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setShortcutList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleGenerate = () => setCurrentName(generateName());

  const handleSubmit = async () => {
    if (!newName.trim()) return;
    await addDoc(collection(db, "shortcutNames"), {
      name: newName,
      votes: 0,
      timestamp: new Date(),
    });
    setNewName("");
  };

  const handleUpvote = async (id) => {
    const docRef = doc(db, "shortcutNames", id);
    await updateDoc(docRef, { votes: increment(1) });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center p-6 relative">
      {/* Logo - Top Left */}
      <motion.img
        src={logo}
        alt="Enso Logo"
        className="w-9 h-9 absolute top-4 left-4"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Main Content */}
      <h1 className="text-4xl font-extrabold mb-8 text-center mt-16">
        🔮 Enso Shortcut Name Generator
      </h1>

      {/* Current Generated Name */}
   <motion.div
  className="bg-gray-800/60 backdrop-blur-md p-8 rounded-2xl shadow-lg text-center mb-8 border border-gray-700"
  key={currentName}
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3 }}
>
  <h2 className="text-3xl font-bold tracking-wide text-indigo-400 mb-4">
    {currentName}
  </h2>

  {/* Copy to clipboard button */}

    <button
    onClick={handleGenerate}
    className="mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 px-6 py-3 rounded-xl shadow-lg font-medium transition-transform hover:scale-105"
  >
    🔄 Generate New Name
  </button>
  
  <button
    onClick={() => {
      navigator.clipboard.writeText(currentName);
    }}
    className="mb-4 bg-gray-700 text-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition-colors"
  >
    📋 Copy
  </button>


</motion.div>


      {/* Submit New Name */}
      <div className="flex w-full max-w-md mb-10">
        <input
          placeholder="💡 Suggest your own name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="flex-1 px-4 py-3 rounded-l-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 px-5 py-3 rounded-r-xl font-medium transition-transform hover:scale-105"
        >
          🚀 Submit
        </button>
      </div>

      {/* Leaderboard */}
      <h2 className="text-2xl font-bold mb-6">🏆 Leaderboard</h2>
      <ul className="w-full max-w-md space-y-3">
        {shortcutList.map((item) => (
          <motion.li
            key={item.id}
            className="bg-gray-800/70 backdrop-blur-md flex justify-between items-center p-4 rounded-xl border border-gray-700 shadow-sm"
            whileHover={{ scale: 1.03 }}
          >
            <span className="font-medium">
              {item.name}{" "}
              <span className="text-gray-400">({item.votes} votes)</span>
            </span>
            <button
              onClick={() => handleUpvote(item.id)}
              className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-lg text-black font-semibold shadow transition-transform hover:scale-105"
            >
              👍 Upvote
            </button>
          </motion.li>
        ))}
      </ul>

      {/* Footer */}
      <footer className="mt-auto py-4 text-gray-400 text-sm flex items-center gap-2">
        <span>Created by</span>
        <a
          href="https://x.com/muyi_eth"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-400 hover:text-blue-500 transition"
        >
          <RiTwitterXFill /> @muyi_eth
        </a>
      </footer>

       <footer className="mt-auto py-4 text-gray-400 text-sm flex items-center gap-2">
        <span>Powered by</span>
        <a
          href="https://x.com/EnsoBuild"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-400 hover:text-blue-500 transition"
        >
          <RiTwitterXFill /> @Enso | ⌘ 🛠️
        </a>
      </footer>
    </div>
  );
}

export default App;

import { useState } from 'react';

function CreateUser() {
  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-12 p-6 rounded-2xl 
                 bg-white shadow-md border border-stone-200"
    >
      <p className="mb-4 text-sm md:text-base text-stone-600">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full rounded-lg border border-stone-300 
                   px-4 py-2 text-sm md:text-base
                   focus:outline-none focus:ring-2 focus:ring-black
                   focus:border-transparent
                   transition"
      />
      {/*ovako detaljan code sredjen css*/ }

      {username !== '' && (
        <div className="mt-4">
          <button
            type="submit"
            className="w-full rounded-lg bg-black py-2.5
                       text-white font-semibold
                       hover:bg-stone-800 active:scale-[0.98]
                       transition"
          >
            Start ordering
          </button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;

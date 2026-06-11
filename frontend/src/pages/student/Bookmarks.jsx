function Bookmarks() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-5xl font-black mb-10">
        Bookmarks 🔖
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-slate-900 p-6 rounded-3xl">
          <h2 className="text-2xl font-bold">
            DBMS Paper 2024
          </h2>

          <button className="mt-4 bg-red-600 px-4 py-2 rounded-lg">
            Remove
          </button>
        </div>

      </div>

    </div>
  );
}

export default Bookmarks;
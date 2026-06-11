import StudentLayout from "../../layouts/StudentLayout";

function Dashboard() {
  return (
    <StudentLayout>

      <h1 className="text-white text-5xl font-black mb-10">
        Welcome Back 👋
      </h1>

      <div className="grid lg:grid-cols-4 gap-6">

        <div className="bg-slate-900 p-8 rounded-3xl">
          <h2 className="text-slate-400">
            Downloads
          </h2>

          <h1 className="text-5xl font-bold text-blue-400 mt-3">
            120
          </h1>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl">
          <h2 className="text-slate-400">
            Bookmarks
          </h2>

          <h1 className="text-5xl font-bold text-green-400 mt-3">
            45
          </h1>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl">
          <h2 className="text-slate-400">
            Rank
          </h2>

          <h1 className="text-5xl font-bold text-yellow-400 mt-3">
            #5
          </h1>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl">
          <h2 className="text-slate-400">
            Points
          </h2>

          <h1 className="text-5xl font-bold text-purple-400 mt-3">
            1500
          </h1>
        </div>

      </div>

    </StudentLayout>
  );
}

export default Dashboard;
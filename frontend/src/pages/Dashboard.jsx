import StudentLayout from "../layouts/StudentLayout";

function Dashboard() {
  return (
    <StudentLayout>

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2>Downloads</h2>
          <p className="text-4xl font-bold">120</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2>Bookmarks</h2>
          <p className="text-4xl font-bold">45</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2>Points</h2>
          <p className="text-4xl font-bold">1500</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2>Rank</h2>
          <p className="text-4xl font-bold">#5</p>
        </div>

      </div>

    </StudentLayout>
  );
}

export default Dashboard;
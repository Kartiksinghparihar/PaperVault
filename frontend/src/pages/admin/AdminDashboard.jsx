function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-5xl font-black mb-10">
        Admin Dashboard ⚙️
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-slate-900 p-8 rounded-3xl">
          Total Students
          <h2 className="text-4xl font-bold text-blue-400 mt-3">
            1500
          </h2>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl">
          Total Papers
          <h2 className="text-4xl font-bold text-green-400 mt-3">
            5000
          </h2>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl">
          Downloads
          <h2 className="text-4xl font-bold text-yellow-400 mt-3">
            10000
          </h2>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;
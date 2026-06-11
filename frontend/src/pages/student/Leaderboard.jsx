function Leaderboard() {
  const users = [
    { name: "Rahul", points: 2100 },
    { name: "Kartik", points: 1800 },
    { name: "Priya", points: 1500 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-5xl font-black mb-10">
        Leaderboard 🏆
      </h1>

      {users.map((user, index) => (
        <div
          key={index}
          className="bg-slate-900 p-6 rounded-2xl mb-4"
        >
          #{index + 1} {user.name} — {user.points} Points
        </div>
      ))}

    </div>
  );
}

export default Leaderboard;
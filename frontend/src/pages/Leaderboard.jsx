import StudentLayout from "../layouts/StudentLayout";

function Leaderboard() {
  const users = [
    { name: "Rahul", points: 2100 },
    { name: "Kartik", points: 1800 },
    { name: "Priya", points: 1500 }
  ];

  return (
    <StudentLayout>

      <h1 className="text-4xl font-bold mb-8">

        Leaderboard

      </h1>

      {users.map((user, index) => (

        <div
          key={index}
          className="
          bg-white
          p-4
          rounded-xl
          shadow
          mb-4"
        >

          #{index + 1} {user.name}
          - {user.points} pts

        </div>

      ))}

    </StudentLayout>
  );
}

export default Leaderboard;
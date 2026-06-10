function StatsCard({ number, text }) {
  return (
    <div className="bg-white shadow rounded-xl p-6">

      <h1 className="text-5xl font-bold">
        {number}
      </h1>

      <p className="text-gray-500 mt-2">
        {text}
      </p>

    </div>
  );
}

export default StatsCard;
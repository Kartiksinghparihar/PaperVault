function DashboardCard({ title, value }) {
  return (
    <div
      className="
      bg-slate-900
      rounded-3xl
      p-8
      shadow-xl
      border
      border-slate-800
      "
    >
      <h2 className="text-slate-400">
        {title}
      </h2>

      <h1 className="
      text-5xl
      font-bold
      text-blue-400
      mt-3
      ">
        {value}
      </h1>
    </div>
  );
}

export default DashboardCard;
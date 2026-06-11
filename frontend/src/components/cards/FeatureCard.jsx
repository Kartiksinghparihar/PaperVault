function FeatureCard({ title, desc, icon }) {
  return (
    <div
      className="
      bg-white
      rounded-xl
      p-6
      shadow-lg
      hover:scale-105
      transition"
    >
      <div className="text-4xl mb-4">
        {icon}
      </div>

      <h2 className="font-bold text-xl">
        {title}
      </h2>

      <p className="text-gray-600 mt-2">
        {desc}
      </p>
    </div>
  );
}

export default FeatureCard;
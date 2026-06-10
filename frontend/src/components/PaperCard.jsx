function PaperCard() {
  return (
    <div
      className="
      bg-white
      p-5
      rounded-xl
      shadow"
    >

      <h2 className="font-bold text-xl">

        Data Structures

      </h2>

      <p className="text-gray-500">

        Semester 3

      </p>

      <div className="flex gap-3 mt-4">

        <button className="bg-blue-600 text-white px-4 py-2 rounded">

          View

        </button>

        <button className="bg-green-600 text-white px-4 py-2 rounded">

          Download

        </button>

      </div>

    </div>
  );
}

export default PaperCard;
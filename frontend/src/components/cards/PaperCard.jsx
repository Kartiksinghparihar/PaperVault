import {
  FaDownload,
  FaBookmark,
  FaEye
} from "react-icons/fa";

function PaperCard({ paper }) {
  return (
    <div
      className="
      bg-slate-900
      border
      border-slate-800
      rounded-3xl
      p-6
      hover:border-blue-500
      transition
      "
    >

      <h2 className="text-2xl font-bold">
        {paper.subject}
      </h2>

      <p className="text-slate-400 mt-3">
        Semester {paper.semester}
      </p>

      <p className="text-slate-400">
        Year {paper.year}
      </p>

      <p className="text-slate-400 mt-2">
        ⬇ {paper.downloads} Downloads
      </p>

      <div className="flex gap-3 mt-6">

        <button className="bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2">
          <FaDownload />
          Download
        </button>

        <button className="bg-slate-800 px-4 py-2 rounded-lg">
          <FaEye />
        </button>

        <button className="bg-slate-800 px-4 py-2 rounded-lg">
          <FaBookmark />
        </button>

      </div>

    </div>
  );
}

export default PaperCard;
import { FaDownload, FaBookmark } from "react-icons/fa";

function PaperModal({ paper, onClose }) {
  if (!paper) return null;

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/70
      flex
      items-center
      justify-center
      z-50
      "
    >
      <div
        className="
        bg-slate-900
        w-[700px]
        max-w-[95%]
        rounded-3xl
        p-8
        border
        border-slate-800
        "
      >

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold text-white">
            {paper.subject}
          </h2>

          <button
            onClick={onClose}
            className="text-white text-2xl"
          >
            ✕
          </button>

        </div>

        <div className="space-y-3 text-slate-300">

          <p>Semester: {paper.semester}</p>

          <p>Year: {paper.year}</p>

          <p>Downloads: {paper.downloads}</p>

        </div>

        {/* Fake PDF Preview */}

        <div
          className="
          mt-6
          h-72
          rounded-2xl
          bg-slate-800
          flex
          items-center
          justify-center
          text-slate-400
          "
        >
          PDF Preview Here
        </div>

        <div className="flex gap-4 mt-6">

          <button
            className="
            bg-blue-600
            px-5
            py-3
            rounded-xl
            flex
            items-center
            gap-2
            "
          >
            <FaDownload />
            Download
          </button>

          <button
            className="
            bg-slate-700
            px-5
            py-3
            rounded-xl
            flex
            items-center
            gap-2
            "
          >
            <FaBookmark />
            Bookmark
          </button>

        </div>

      </div>
    </div>
  );
}

export default PaperModal;
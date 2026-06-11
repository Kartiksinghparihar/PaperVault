import SearchBar from "../../components/common/SearchBar";
import FilterBar from "../../components/papers/FilterBar";
import PaperCard from "../../components/cards/PaperCard";

function Papers() {

  const papers = [
    {
      id: 1,
      subject: "Data Structures",
      semester: 3,
      year: 2024,
      downloads: 150,
    },
    {
      id: 2,
      subject: "DBMS",
      semester: 4,
      year: 2023,
      downloads: 120,
    },
    {
      id: 3,
      subject: "Operating System",
      semester: 4,
      year: 2024,
      downloads: 90,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-5xl font-black mb-8">
        Previous Year Papers
      </h1>

      <SearchBar />

      <FilterBar />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {papers.map((paper) => (
          <PaperCard
            key={paper.id}
            paper={paper}
          />
        ))}

      </div>

    </div>
  );
}

export default Papers;
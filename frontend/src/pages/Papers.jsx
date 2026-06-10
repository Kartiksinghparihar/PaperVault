import StudentLayout from "../layouts/StudentLayout";
import PaperCard from "../components/PaperCard";

function Papers() {
  return (
    <StudentLayout>

      <h1 className="text-4xl font-bold mb-8">
        Papers
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <PaperCard />
        <PaperCard />
        <PaperCard />
        <PaperCard />
        <PaperCard />

      </div>

    </StudentLayout>
  );
}

export default Papers;
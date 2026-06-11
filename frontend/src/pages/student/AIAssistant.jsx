import StudentLayout from "../../layouts/StudentLayout";

function AIAssistant() {
  return (
    <StudentLayout>

      <h1 className="text-5xl text-white font-black mb-8">
        AI Assistant 🤖
      </h1>

      <div className="bg-slate-900 rounded-3xl p-8">

        <input
          type="text"
          placeholder="Ask AI anything..."
          className="
          w-full
          p-4
          rounded-xl
          bg-slate-800
          text-white
          "
        />

        <div className="mt-6 bg-slate-800 p-6 rounded-xl">
          AI response will appear here...
        </div>

      </div>

    </StudentLayout>
  );
}

export default AIAssistant;
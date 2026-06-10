import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}

      <section
        className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-blue-950
        text-white
        flex
        items-center
        justify-center
        px-6
        "
      >
        <div className="text-center max-w-4xl">

          <h1
            className="
            text-7xl
            font-black
            leading-tight
            "
          >
            Previous Year Papers
            <span className="text-blue-400">
              {" "}Made Smart
            </span>
          </h1>

          <p
            className="
            mt-6
            text-xl
            text-slate-300
            "
          >
            Access previous year papers,
            bookmark important subjects,
            compete on leaderboards and
            study smarter using AI.
          </p>

          <div className="flex justify-center gap-4 mt-10">

            <button
              className="
              bg-blue-600
              hover:bg-blue-700
              px-8
              py-4
              rounded-xl
              font-semibold
              "
            >
              Get Started
            </button>

            <button
              className="
              border
              border-slate-500
              px-8
              py-4
              rounded-xl
              "
            >
              Explore Papers
            </button>

          </div>

        </div>
      </section>

      {/* Statistics */}

      <section className="bg-slate-950 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2
            className="
            text-white
            text-5xl
            font-bold
            text-center
            mb-16
            "
          >
            Platform Statistics
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-slate-900 p-8 rounded-3xl">
              <h1 className="text-5xl text-blue-400 font-bold">
                5000+
              </h1>
              <p className="text-slate-400 mt-3">
                Papers
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl">
              <h1 className="text-5xl text-blue-400 font-bold">
                1500+
              </h1>
              <p className="text-slate-400 mt-3">
                Students
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl">
              <h1 className="text-5xl text-blue-400 font-bold">
                50+
              </h1>
              <p className="text-slate-400 mt-3">
                Subjects
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl">
              <h1 className="text-5xl text-blue-400 font-bold">
                10K+
              </h1>
              <p className="text-slate-400 mt-3">
                Downloads
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="bg-slate-950 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2
            className="
            text-white
            text-5xl
            font-bold
            text-center
            mb-16
            "
          >
            Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-slate-900 p-8 rounded-3xl">
              📄 Previous Papers
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl">
              🔖 Bookmarks
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl">
              🏆 Leaderboard
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl">
              🤖 AI Assistant
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl">
              📊 Analytics
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl">
              🌙 Dark Mode
            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Home;
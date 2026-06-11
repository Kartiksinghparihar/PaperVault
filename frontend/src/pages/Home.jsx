import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import {
  FaRobot,
  FaBookmark,
  FaTrophy,
  FaChartLine,
  FaFilePdf,
  FaMoon,
} from "react-icons/fa";

function Home() {
  const features = [
    {
      icon: <FaFilePdf size={30} />,
      title: "Previous Year Papers",
      desc: "Access all previous year papers in one place.",
    },
    {
      icon: <FaBookmark size={30} />,
      title: "Bookmarks",
      desc: "Save important papers for quick revision.",
    },
    {
      icon: <FaTrophy size={30} />,
      title: "Leaderboard",
      desc: "Compete with other students.",
    },
    {
      icon: <FaRobot size={30} />,
      title: "AI Assistant",
      desc: "Ask questions and get smart recommendations.",
    },
    {
      icon: <FaChartLine size={30} />,
      title: "Analytics",
      desc: "Track your study progress.",
    },
    {
      icon: <FaMoon size={30} />,
      title: "Dark Mode",
      desc: "Modern dark theme for long study sessions.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* HERO */}

      <section className="min-h-screen bg-slate-950 text-white flex items-center px-8 pt-20">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 mb-6">
              🚀 AI Powered Study Platform
            </div>

            <h1 className="text-6xl lg:text-7xl font-black leading-tight">
              Previous Year Papers
              <span className="text-blue-500">
                {" "}Made Smart
              </span>
            </h1>

            <p className="mt-8 text-xl text-slate-400 max-w-xl">
              Access thousands of papers, bookmark important
              resources, track performance and study smarter
              with AI.
            </p>

            <div className="flex gap-4 mt-10">

              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-semibold">
                Get Started
              </button>

              <button className="border border-slate-700 hover:border-blue-500 px-8 py-4 rounded-2xl">
                Explore Papers
              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl">

              <h3 className="text-2xl font-bold mb-6">
                Student Dashboard
              </h3>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-slate-800 rounded-2xl p-5">
                  <p className="text-slate-400">Downloads</p>
                  <h1 className="text-4xl font-bold text-blue-400">
                    120
                  </h1>
                </div>

                <div className="bg-slate-800 rounded-2xl p-5">
                  <p className="text-slate-400">Bookmarks</p>
                  <h1 className="text-4xl font-bold text-green-400">
                    45
                  </h1>
                </div>

                <div className="bg-slate-800 rounded-2xl p-5">
                  <p className="text-slate-400">Rank</p>
                  <h1 className="text-4xl font-bold text-yellow-400">
                    #5
                  </h1>
                </div>

                <div className="bg-slate-800 rounded-2xl p-5">
                  <p className="text-slate-400">Points</p>
                  <h1 className="text-4xl font-bold text-purple-400">
                    1500
                  </h1>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="bg-slate-950 py-20">

        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 px-8">

          {[
            ["5000+", "Question Papers"],
            ["1500+", "Students"],
            ["50+", "Subjects"],
            ["10K+", "Downloads"],
          ].map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 p-8 rounded-3xl border border-slate-800"
            >
              <h1 className="text-5xl font-black text-blue-400">
                {item[0]}
              </h1>

              <p className="mt-3 text-slate-400">
                {item[1]}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* FEATURES */}

      <section className="bg-slate-950 py-24">

        <div className="max-w-7xl mx-auto px-8">

          <h2 className="text-5xl font-black text-center text-white mb-16">
            Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {features.map((feature, index) => (
              <div
                key={index}
                className="
                bg-slate-900
                border
                border-slate-800
                rounded-3xl
                p-8
                hover:border-blue-500
                transition
                "
              >
                <div className="text-blue-400 mb-6">
                  {feature.icon}
                </div>

                <h3 className="text-white text-2xl font-bold mb-3">
                  {feature.title}
                </h3>

                <p className="text-slate-400">
                  {feature.desc}
                </p>

              </div>
            ))}
          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Home;
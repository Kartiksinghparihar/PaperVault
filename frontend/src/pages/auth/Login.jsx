import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-black text-white text-center mb-8">
          Welcome Back 👋
        </h1>

        <form className="space-y-5">

          <input
            type="email"
            placeholder="College Email"
            className="w-full p-4 bg-slate-800 text-white rounded-xl outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 bg-slate-800 text-white rounded-xl outline-none"
          />

          <button
            className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-4
            rounded-xl
            font-semibold
            "
          >
            Login
          </button>

        </form>

        <p className="text-slate-400 text-center mt-6">
          Don't have an account?
          <Link
            to="/register"
            className="text-blue-400 ml-2"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;
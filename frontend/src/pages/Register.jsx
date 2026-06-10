function Register() {
  return (
    <div className="min-h-screen flex justify-center items-center">

      <div className="w-96 shadow-xl p-8 rounded-xl">

        <h2 className="text-3xl font-bold mb-6">

          Register

        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="email"
          placeholder="College Email"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="text"
          placeholder="Enrollment Number"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
        />

        <button
          className="
          w-full
          bg-green-600
          text-white
          py-3
          rounded"
        >
          Register
        </button>

      </div>

    </div>
  );
}

export default Register;
function Login() {
  return (

    <div
      className="
      min-h-screen
      flex
      justify-center
      items-center"
    >

      <div
        className="
        w-96
        p-8
        shadow-xl
        rounded-xl"
      >

        <h2 className="text-3xl font-bold mb-6">

          Login

        </h2>

        <input
          type="text"
          placeholder="Enrollment ID"
          className="
          w-full
          border
          p-3
          rounded
          mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="
          w-full
          border
          p-3
          rounded
          mb-4"
        />

        <button
          className="
          w-full
          bg-blue-600
          text-white
          py-3
          rounded"
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;
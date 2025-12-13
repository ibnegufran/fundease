// src/pages/OrganizerAuth.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const OrganizerAuth = () => {
  const [isSignIn, setIsSignIn] = useState(true); // true = Sign In, false = Sign Up
  const [role, setRole] = useState("organizer"); // "organizer" | "admin"

  return (
    <section className="min-h-screen flex items-center justify-center bg-secondary px-4 py-20 ">
      {/* Desktop / Tablet: sliding overlay */}
      <DesktopAuth
        isSignIn={isSignIn}
        setIsSignIn={setIsSignIn}
        role={role}
        setRole={setRole}
      />

      {/* Mobile: simple tab switch */}
      <MobileAuth
        isSignIn={isSignIn}
        setIsSignIn={setIsSignIn}
        role={role}
        setRole={setRole}
      />
    </section>
  );
};

export default OrganizerAuth;

/* ================= DESKTOP VERSION (GIF WALA EFFECT) ================= */

function DesktopAuth({ isSignIn, setIsSignIn, role, setRole }) {
  return (
    <div className="hidden md:block w-full">
      <div className="relative max-w-4xl mx-auto h-auto py-4 bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Top: Role toggle */}
        {/* <div className=" absolute z-50 top-0 left-0 right-0 flex justify-center mt-2 mb-1">
          <div className="inline-flex bg-secondary rounded-full p-1 text-xs">
            <button
              onClick={() => setRole("organizer")}
              className={`px-4 py-1 rounded-full font-semibold ${
                role === "organizer"
                  ? "bg-primary text-white"
                  : "text-gray-600"
              }`}
            >
              Organizer
            </button>
            <button
              onClick={() => setRole("admin")}
              className={`px-4 py-1 rounded-full font-semibold ${
                role === "admin" ? "bg-primary text-white" : "text-gray-600"
              }`}
            >
              Admin
            </button>
          </div>
        </div> */}

        {/* Role label */}
        {/* <p className="text-[11px] text-center text-gray-500 mb-2">
          You are signing {isSignIn ? "in" : "up"} as{" "}
          <span className="font-semibold text-primary">
            {role === "organizer" ? "Organizer" : "Admin"}
          </span>
        </p> */}

        {/* Two forms side-by-side in background */}
        <div className="grid grid-cols-2 h-full">
          {/* Sign In Form (left) */}
          <div className="flex items-center justify-center">
            <div
              className={`w-full max-w-xs px-2 transition-opacity duration-300 ${
                isSignIn ? "opacity-100" : "opacity-30 pointer-events-none"
              }`}
            >
              <SignInForm role={role} />
            </div>
          </div>

          {/* Sign Up Form (right) */}
          <div className="flex items-center justify-center">
            <div
              className={`w-full max-w-xs px-2 transition-opacity duration-300 ${
                !isSignIn ? "opacity-100" : "opacity-30 pointer-events-none"
              }`}
            >
              {/* signup successful → slide to Sign In */}
              <SignUpForm
                role={role}
                onSignUpSuccess={() => setIsSignIn(true)}
              />
            </div>
          </div>
        </div>

        {/* Gradient overlay panel that slides left/right (GIF effect) */}
        <div
          className={`
            absolute top-0 left-0 h-full w-1/2 
            bg-gradient-to-tr from-primary to-pink-500 
            text-white shadow-xl transform transition-transform 
            duration-500 ease-in-out
            ${isSignIn ? "translate-x-full" : "translate-x-0"}
          `}
        >
          <div className="h-full flex flex-col items-center justify-center px-8 text-center space-y-4">
            <h2 className="text-2xl font-bold">
              {isSignIn ? "Hello!" : "Welcome Back!"}
            </h2>
            <p className="text-sm text-white/90">
              {isSignIn
                ? "Sign in to manage college events and payments."
                : "Create your account and start using FundEase."}
            </p>
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="mt-2 px-6 py-2 rounded-full border border-white text-sm font-semibold hover:bg-white hover:text-pink-500 transition"
            >
              {isSignIn ? "Go to SIGN UP" : "Go to SIGN IN"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= MOBILE VERSION (TABS) ================= */

function MobileAuth({ isSignIn, setIsSignIn, role, setRole }) {
  return (
    <div className="md:hidden w-full">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Role toggle */}
        {/* <div className="flex justify-center mt-4">
          <div className="inline-flex bg-secondary rounded-full p-1 text-xs">
            <button
              onClick={() => setRole("organizer")}
              className={`px-4 py-1 rounded-full font-semibold ${
                role === "organizer"
                  ? "bg-primary text-white"
                  : "text-gray-600"
              }`}
            >
              Organizer 
            </button>
            <button
              onClick={() => setRole("admin")}
              className={`px-4 py-1 rounded-full font-semibold ${
                role === "admin" ? "bg-primary text-white" : "text-gray-600"
              }`}
            >
              Admin
            </button>
          </div>
        </div> */}

        {/* Tabs */}
        <div className="flex mt-3">
          <button
            className={`flex-1 py-3 text-sm font-semibold ${
              isSignIn
                ? "bg-primary text-white"
                : "bg-white text-gray-500 border-b border-gray-200"
            }`}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-3 text-sm font-semibold ${
              !isSignIn
                ? "bg-primary text-white"
                : "bg-white text-gray-500 border-b border-gray-200"
            }`}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>

        <p className="text-[11px] text-center text-gray-500 mt-1">
          You are {isSignIn ? "signing in" : "signing up"} as{" "}
          <span className="font-semibold text-primary">
            {role === "organizer" ? "Organizer" : "Admin"}
          </span>
        </p>

        <div className="p-6">
          {isSignIn ? (
            <SignInForm compact role={role} />
          ) : (
            <SignUpForm compact role={role} onSignUpSuccess={() => setIsSignIn(true)} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ================== FORMS (REUSED) ================== */

function SignInForm({ compact, role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
 if (email === "ibnegufran75074@gmail.com" && password === "Admin@123") {
        navigate("/admin/dashboard");
        localStorage.setItem("fundeaseAdmin", JSON.stringify({email,password}));
      } else {
         const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // role backend se hi milega
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // some backends send { user, token }, some direct user
      const user = data.user || data;

      // save in localStorage
      localStorage.setItem("fundeaseOrganizer", JSON.stringify(user));

      alert("Login successful!");
      navigate("/organizer/dashboard");
      }
     

      // Redirect based on role
     
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const title =
    "Sign In";

  return (
    <form
      className={`flex flex-col ${compact ? "gap-3" : "gap-4"}`}
      onSubmit={handleSignIn}
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left">
        {title}
      </h2>

      {!compact && (
        <p className="text-xs text-gray-500">
          Use your registered {role} email and password.
        </p>
      )}

      {error && (
        <p className="text-[11px] text-red-500 bg-red-50 border border-red-100 px-2 py-1 rounded-md">
          {error}
        </p>
      )}

      <label className="text-xs text-gray-600 mt-2">
        Email
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg bg-secondary px-3 py-2 text-sm outline-none border border-transparent focus:border-primary focus:bg-white"
          placeholder="you@college.edu"
        />
      </label>

      <label className="text-xs text-gray-600">
        Password
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg bg-secondary px-3 py-2 text-sm outline-none border border-transparent focus:border-primary focus:bg-white"
          placeholder="••••••••"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full rounded-lg bg-primary text-white text-sm font-semibold py-2.5 hover:opacity-90 transition disabled:opacity-60"
      >
        {loading ? "Signing in..." : "SIGN IN"}
      </button>

      <button
        type="button"
        className="text-[11px] text-gray-500 mt-1 self-end hover:text-primary"
      >
        Forgot password?
      </button>
    </form>
  );
}

function SignUpForm({ compact, onSignUpSuccess, role }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [upiId, setUpiId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPwd) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    try {
      setLoading(true);

      const body = {
        name,
        email,
        password,
        role, // 👈 important
      };

      // Organizer ke liye UPI bhi bhejo
      if (role === "organizer") {
        body.upiId = upiId;
      }

      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Signup successful: slide to Sign In
      alert("Registration successful! Please sign in.");
      if (onSignUpSuccess) onSignUpSuccess();

      // reset fields
      setName("");
      setEmail("");
      setUpiId("");
      setPassword("");
      setConfirmPwd("");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const title =
    role === "admin" ? "Create Admin Account" : "Create Organizer Account";

  return (
    <form
      className={`flex flex-col ${compact ? "gap-3" : "gap-4"}`}
      onSubmit={handleSignUp}
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left">
        {title}
      </h2>

      {!compact && (
        <p className="text-xs text-gray-500">
          Register as {role === "organizer" ? "an event organizer" : "admin"} to
          manage payments on FundEase.
        </p>
      )}

      {error && (
        <p className="text-[11px] text-red-500 bg-red-50 border border-red-100 px-2 py-1 rounded-md">
          {error}
        </p>
      )}

      <label className="text-xs text-gray-600 mt-2">
        Full Name
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg bg-secondary px-3 py-2 text-sm outline-none border border-transparent focus:border-primary focus:bg-white"
          placeholder="e.g. Cultural Head"
        />
      </label>

      <label className="text-xs text-gray-600">
        Email
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg bg-secondary px-3 py-2 text-sm outline-none border border-transparent focus:border-primary focus:bg-white"
          placeholder="you@college.edu"
        />
      </label>

      {/* UPI only for organizer */}
      {role === "organizer" && (
        <label className="text-xs text-gray-600">
          Organizer UPI ID
          <input
            type="text"
            required
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="mt-1 w-full rounded-lg bg-secondary px-3 py-2 text-sm outline-none border border-transparent focus:border-primary focus:bg-white"
            placeholder="yourupi@bank"
          />
        </label>
      )}

      <label className="text-xs text-gray-600">
        Password
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg bg-secondary px-3 py-2 text-sm outline-none border border-transparent focus:border-primary focus:bg-white"
          placeholder="Create a strong password"
        />
      </label>

      <label className="text-xs text-gray-600">
        Confirm Password
        <input
          type="password"
          required
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
          className="mt-1 w-full rounded-lg bg-secondary px-3 py-2 text-sm outline-none border border-transparent focus:border-primary focus:bg-white"
          placeholder="Re-type password"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full rounded-lg bg-primary text-white text-sm font-semibold py-2.5 hover:opacity-90 transition disabled:opacity-60"
      >
        {loading ? "Creating account..." : "SIGN UP"}
      </button>
    </form>
  );
}

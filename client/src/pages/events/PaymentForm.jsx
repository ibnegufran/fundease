// src/components/PaymentForm.jsx
import { useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export default function EventPaymentForm({
  organizerUpiId,
  defaultAmount,
  eventName,
  eventId,
}) {
  const [form, setForm] = useState({
    studentName: "",
    rollNo: "",
    className: "",
    mobile: "",
    upiName: "",
    amount: defaultAmount || "",
  });

  const [loading, setLoading] = useState(false);
  const [upiUrl, setUpiUrl] = useState("");
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.studentName ||
      !form.rollNo ||
      !form.className ||
      !form.mobile ||
      !form.amount
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      // 1) Save entry in DB as Pending
      const res = await fetch(`${API_BASE_URL}/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          studentName: form.studentName,
          rollNo: form.rollNo,
          className: form.className,
          mobile: form.mobile,
          amount: Number(form.amount),
          // 👇 YAHI JARURI HAI:
          note: form.upiName, // "jis naam se payment hoga" => note me
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to save payment.");
      }

      // 2) UPI URL generate
      const upiId = organizerUpiId;
      const amount = form.amount;
      const student = encodeURIComponent(form.studentName);
      const note = encodeURIComponent(`${eventName} - ${form.rollNo}`);

      const url = `upi://pay?pa=${encodeURIComponent(
        upiId
      )}&pn=${student}&am=${amount}&tn=${note}&cu=INR`;

      setUpiUrl(url);
      setStep(2);
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ... baaki code same (steps, inputs, copy buttons)



  const isMobile = /android|iphone|ipad|ipod/i.test(
    typeof navigator !== "undefined" ? navigator.userAgent : ""
  );

  const handlePayWithUpiApp = () => {
    if (!upiUrl) return;
    window.location.href = upiUrl;
  };

  return (
    <div className="space-y-4 text-xs">
      {/* STEP 1: FORM  */}
      {step === 1 && (
        <form className="space-y-4 text-xs" onSubmit={handleSubmit}>
          <div className="rounded-xl bg-secondary px-3 py-2 text-[11px] text-gray-600">
            <p className="font-semibold text-primary">Step 1:</p>
            <p>
              Fill your details and confirm the amount. Your entry will be saved
              as <b>Pending</b>.
            </p>
            <p className="mt-1 font-semibold text-primary">Step 2:</p>
            <p>Use UPI app / QR to complete payment.</p>
          </div>

          <div className="rounded-xl bg-white border border-dashed border-primary/40 px-3 py-2 text-[11px] text-gray-600">
            <p className="font-semibold text-primary mb-1">
              Organizer UPI ID
            </p>
            <p className="font-mono text-gray-800 break-all">{organizerUpiId}</p>
            <p className="mt-1 text-[10px] text-gray-500">
              Organizer will verify your payment by checking this UPI account
              statement (sender name + amount).
            </p>
          </div>

          {/* Student details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <LabelInput
              name="studentName"
              label="Student Name (as in UPI)"
              placeholder="Full name"
              value={form.studentName}
              onChange={handleChange}
              required
            />
            <LabelInput
              name="rollNo"
              label="Roll No / PRN"
              placeholder="e.g. TYBCA-21"
              value={form.rollNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <LabelInput
              name="className"
              label="Class / Year"
              placeholder="e.g. TY BCA"
              value={form.className}
              onChange={handleChange}
              required
            />
            <LabelInput
              name="mobile"
              label="Mobile Number"
              type="tel"
              placeholder="10 digit mobile"
              value={form.mobile}
              onChange={handleChange}
              required
            />
          </div>

          {/* Amount row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <LabelInput
              name="amount"
              label="Amount to Pay (₹)"
              type="number"
              placeholder="e.g. 150"
              value={form.amount}
              onChange={handleChange}
              required
            />
            <LabelInput
              name="upiName"
              label="Enter UPI Name (the name from which you will pay)"
              type="text"
              placeholder="e.g. john_doe"
              value={form.upiName}
              onChange={handleChange}
              required
            />

            <div className="text-[11px] text-gray-600 flex items-center">
              <p>
                Default amount is set by organizer. Edit only if told (team
                entry / multiple tickets).
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-primary text-white text-sm font-semibold py-2.5 hover:opacity-90 disabled:opacity-60 transition"
          >
            {loading ? "Saving..." : "Save & Show Payment Options"}
          </button>
        </form>
      )}

      {/* STEP 2: PAYMENT OPTIONS */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="rounded-xl bg-secondary px-3 py-2 text-[11px] text-gray-600">
            <p className="font-semibold text-primary mb-1">
              Step 2: Complete your UPI Payment
            </p>
            <p>
              Pay the amount using any UPI app. Organizer will verify using
              sender name and amount.
            </p>
          </div>

          {/* Amount + UPI ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-white px-3 py-2 border text-[11px]">
              <p className="text-gray-500">Amount</p>
              <p className="text-lg font-semibold text-primary">
                ₹{form.amount}
              </p>
            </div>
            <div className="rounded-xl bg-white px-3 py-2 border text-[11px]">
              <p className="text-gray-500">Pay to UPI ID</p>
              <p className="font-mono text-gray-800 break-all">
                {organizerUpiId}
              </p>
            </div>
          </div>

          {/* Mobile: direct UPI button */}
          {isMobile && (
            <button
              onClick={handlePayWithUpiApp}
              className="w-full rounded-lg bg-primary text-white text-sm font-semibold py-2.5 hover:opacity-90 transition"
            >
              Pay with UPI App
            </button>
          )}

          {/* QR area */}
          <div className="rounded-xl bg-white px-3 py-3 border text-[11px] flex flex-col items-center">
            <p className="font-semibold text-primary mb-2">
              Scan QR with any UPI app
            </p>

            {/* Future: react-qr-code yaha use kar sakte ho */}
            <div className="w-36 h-36 flex items-center justify-center border border-dashed border-gray-300 rounded-lg text-[10px] text-gray-400">
              QR Preview (use react-qr-code)
            </div>

            <p className="mt-2 text-[10px] text-gray-500 text-center">
              On desktop, open this page and scan the QR using your mobile UPI
              app.
            </p>
          </div>

          {/* copy helpers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(organizerUpiId);
                alert("UPI ID copied!");
              }}
              className="rounded-lg border px-3 py-2 hover:border-primary hover:text-primary text-left"
            >
              Copy UPI ID
            </button>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(upiUrl);
                alert("UPI link copied!");
              }}
              className="rounded-lg border px-3 py-2 hover:border-primary hover:text-primary text-left"
            >
              Copy UPI Payment Link
            </button>
          </div>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-[11px] text-gray-500 underline"
          >
            ← Edit details / amount
          </button>
        </div>
      )}
    </div>
  );
}

/* Reusable Input */
function LabelInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}) {
  return (
    <label className="text-[11px] text-gray-600">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg bg-secondary px-3 py-2 text-xs outline-none border border-transparent focus:border-primary focus:bg-white"
      />
    </label>
  );
}

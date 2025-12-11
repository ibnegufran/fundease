const Features = () => {
  return (
    <section className="py-24 bg-secondary px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-primary">Why FundEase?</h2>

        <div className="grid md:grid-cols-3 gap-8 mt-10">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-primary">Easy Payments</h3>
            <p className="text-gray-600 mt-2">
              Students can submit payments quickly via UPI or online methods.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-primary">Instant Admin Alerts</h3>
            <p className="text-gray-600 mt-2">
              Admins get real-time notifications for every fund submission.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-primary">Transparent Dashboard</h3>
            <p className="text-gray-600 mt-2">
              View verified & pending payments clearly in one place.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;

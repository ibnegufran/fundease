// src/pages/AboutPage.jsx

const AboutPage = () => {
  return (
    <main className="bg-secondary min-h-screen mt-12 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HERO */}
        <section className="flex flex-col md:flex-row items-center gap-10">
          {/* Text */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              About FundEase
            </h1>
            <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed">
              FundEase is a simple web platform created for colleges to manage
              event and fund payments in a clean, digital and transparent way.
              Instead of handling cash, screenshots and scattered Google Forms,
              everything comes to one place.
            </p>
            <p className="mt-3 text-sm md:text-base text-gray-600">
              Our goal is to make life easier for students, event coordinators
              and college management by automating payment collection and
              verification.
            </p>
          </div>

          {/* Illustration / Placeholder card */}
          <div className="flex-1 w-full">
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-semibold text-primary mb-3">
                At a Glance
              </h2>
              <ul className="space-y-2 text-sm md:text-base text-gray-600">
                <li>• Digital payment submission for college events</li>
                <li>• Automatic email alerts to event admins</li>
                <li>• Clear dashboard of verified & pending payments</li>
                <li>• Less manual work, more transparency</li>
              </ul>
            </div>
          </div>
        </section>

        {/* WHY WE BUILT FUNDEASE */}
        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            Why we built FundEase
          </h2>
          <div className="mt-4 grid gap-5 md:grid-cols-3">
            <ReasonCard
              title="Too Much Manual Work"
              text="Cash collection, WhatsApp screenshots and spreadsheets make fund management slow and confusing."
            />
            <ReasonCard
              title="Lack of Transparency"
              text="Students often do not know if their payment is received or verified, and admins struggle to track everything."
            />
            <ReasonCard
              title="No Single Source of Truth"
              text="Data is spread across chats, forms and paper receipts. FundEase brings all records into one system."
            />
          </div>
        </section>

        {/* WHAT FUNDEASE DOES */}
        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            What FundEase Does
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-600 max-w-3xl">
            FundEase acts as a small but powerful layer between students and
            event administrators. It collects payment data from students and
            helps admins verify it against their UPI transactions.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <FeatureCard
              title="For Students"
              text="Simple online form to select event, add payment details and receive confirmation without running behind coordinators."
            />
            <FeatureCard
              title="For Event Admins"
              text="Instant email alerts with all payment information and one place to verify and update the payment status."
            />
            <FeatureCard
              title="For College"
              text="Central record of funds collected for different events, which supports audits and transparency."
            />
          </div>
        </section>

        {/* WHO CAN USE */}
        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            Who can use FundEase
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <TagCard
              label="Student Council & Committees"
              text="Cultural, technical and sports committees collecting event fees."
            />
            <TagCard
              label="Class Representatives"
              text="CRs managing class-wise event or trip payments."
            />
            <TagCard
              label="College Administration"
              text="Accounts and faculty in-charge who need transparent records."
            />
          </div>
        </section>

        {/* STATS + CTA */}
        <section className="mt-16 bg-white rounded-2xl shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 grid grid-cols-2 gap-4">
            <StatBox
              number="100%"
              label="Transparency"
              sub="All payments recorded in one place."
            />
            <StatBox
              number="0"
              label="Paper Forms"
              sub="Fully digital flow from start to end."
            />
            <StatBox
              number="24x7"
              label="Access"
              sub="Students can submit anytime."
            />
            <StatBox
              number="1"
              label="Dashboard"
              sub="Single view for admins to manage funds."
            />
          </div>

          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-primary">
              Designed for real college workflows
            </h3>
            <p className="mt-3 text-sm md:text-base text-gray-600">
              FundEase is built keeping actual college scenarios in mind:
              multiple events, different committees, and many students paying at
              different times. The platform aims to reduce confusion and
              miscommunication.
            </p>
            <button className="mt-5 px-6 py-3 rounded-xl bg-primary text-white text-sm md:text-base font-semibold shadow hover:opacity-90">
              Get Started with FundEase
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;

// ----- Small reusable components -----

function ReasonCard({ title, text }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h3 className="text-base md:text-lg font-semibold text-gray-800">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-600">{text}</p>
    </div>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col">
      <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 flex-1">{text}</p>
    </div>
  );
}

function TagCard({ label, text }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <p className="text-sm font-semibold text-primary">{label}</p>
      <p className="mt-2 text-xs md:text-sm text-gray-600">{text}</p>
    </div>
  );
}

function StatBox({ number, label, sub }) {
  return (
    <div className="bg-secondary rounded-2xl p-4 text-center">
      <p className="text-2xl md:text-3xl font-bold text-primary">{number}</p>
      <p className="mt-1 text-sm font-semibold text-gray-700">{label}</p>
      <p className="mt-1 text-xs text-gray-500">{sub}</p>
    </div>
  );
}

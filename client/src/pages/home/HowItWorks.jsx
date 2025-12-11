// src/components/HowItWorks.jsx

const steps = [
  {
    id: 1,
    title: "Student Selects Event",
    desc: "Student chooses the event and fee type.",
  },
  {
    id: 2,
    title: "Submits Payment Details",
    desc: "UPI ID / UTR and basic info are submitted.",
  },
  {
    id: 3,
    title: "Admin Gets Notification",
    desc: "Event admin receives an instant email.",
  },
  {
    id: 4,
    title: "Payment Verified & Recorded",
    desc: "Admin verifies and it appears in dashboard.",
  },
];

// active step
const CURRENT_STEP = 4;

export default function HowItWorks() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary">
          How FundEase Works
        </h2>

        {/* ========== DESKTOP / TABLET (HORIZONTAL BAR) ========== */}
        <div className="mt-14 hidden md:block">
          {/* LINE + CIRCLES */}
          <div className="relative w-full h-20">
            {/* Base line (back) */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded-full z-0" />

            {/* Filled line (back) */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all"
              style={{
                width: `${((CURRENT_STEP - 1) / (steps.length - 1)) * 100}%`,
              }}
            />

            {/* Circles (front) */}
            <div className="relative flex justify-between items-center h-full z-10">
              {steps.map((step) => {
                const isCompleted = step.id < CURRENT_STEP;
                const isCurrent = step.id === CURRENT_STEP;

                return (
                  <div key={step.id} className="flex-1 flex justify-center">
                    <div
                      className={`
                        w-12 h-12 rounded-full 
                        flex items-center justify-center 
                        text-base font-semibold
                        shadow-md
                        ${
                          isCurrent
                            ? "bg-emerald-500 text-white"
                            : isCompleted
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-500"
                        }
                      `}
                    >
                      {step.id}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Text row */}
          <div className="mt-4 flex justify-between gap-4">
            {steps.map((step) => {
              const isCompleted = step.id < CURRENT_STEP;
              const isCurrent = step.id === CURRENT_STEP;

              return (
                <div
                  key={step.id}
                  className="flex-1 flex flex-col items-center text-center"
                >
                  <p
                    className={`
                      text-sm font-semibold
                      ${
                        isCurrent
                          ? "text-emerald-600"
                          : isCompleted
                          ? "text-primary"
                          : "text-gray-400"
                      }
                    `}
                  >
                    {step.title}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 max-w-[180px] mx-auto">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========== MOBILE (VERTICAL STEPPER) ========== */}
        <div className="mt-10 block md:hidden">
          <div className="relative pl-7">
            {/* vertical line */}
            <div className="absolute left-4 top-2 bottom-2 w-[2px] bg-gray-200" />

            {steps.map((step, index) => {
              const isCompleted = step.id < CURRENT_STEP;
              const isCurrent = step.id === CURRENT_STEP;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.id} className="relative flex mb-6 last:mb-0">
                  {/* circle */}
                  <div className="flex flex-col items-center mr-3">
                    <div
                      className={`
                        w-8 h-8 rounded-full 
                        flex items-center justify-center 
                        text-xs font-semibold shadow-md z-10
                        ${
                          isCurrent
                            ? "bg-emerald-500 text-white"
                            : isCompleted
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-500"
                        }
                      `}
                    >
                      {step.id}
                    </div>
                    {/* small gap so that last step line doesn't go beyond */}
                    {!isLast && <div className="flex-1" />}
                  </div>

                  {/* text card */}
                  <div className="bg-secondary rounded-xl px-3 py-2 flex-1 shadow-sm">
                    <p
                      className={`
                        text-sm font-semibold
                        ${
                          isCurrent
                            ? "text-emerald-600"
                            : isCompleted
                            ? "text-primary"
                            : "text-gray-600"
                        }
                      `}
                    >
                      {step.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });
  const [errors, setErrors] = useState({});

  function isValidDate(d, m, y) {
    const date = new Date(`${y}-${m}-${d}`);
    return (
      date.getFullYear() === parseInt(y) &&
      date.getMonth() + 1 === parseInt(m) &&
      date.getDate() === parseInt(d)
    );
  }

  function calculateAge() {
    const newErrors = {};
    const d = parseInt(day);
    const m = parseInt(month);
    const y = parseInt(year);

    if (!day) newErrors.day = "This field is required";
    if (!month) newErrors.month = "This field is required";
    if (!year) newErrors.year = "This field is required";

    if (month < 1 || month > 12) newErrors.month = "Must be a valid month";

    if (day < 1 || day > 31) newErrors.day = "Must be a valid day";

    if (year > new Date().getFullYear()) newErrors.year = "Must be in the past";

    if (Object.keys(newErrors).length === 0 && !isValidDate(d, m, y)) {
      newErrors.day = "Must be a valid date";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setAge({ years: "--", months: "--", days: "--" });
      return;
    }

    setErrors({});

    const today = new Date();
    const birthDate = new Date(y, m - 1, d);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  }

  return (
    <div className="flex flex-col lg:justify-center lg:p-0 pt-20 items-center h-screen font-poppins bg-[hsl(0,0%,94%)]">
      <div className="lg:p-10 p-5 bg-white rounded-3xl lg:rounded-br-[10rem] rounded-br-[5rem] overflow-hidden">
        <div className="flex lg:flex-row flex-col lg:items-end items-center">
          <div className="flex items-start lg:gap-7 gap-4 border-b-[1px] border-[hsl(0,0%,86%)] lg:pb-10 pb-15 ">
            <div className="flex flex-col">
              <span className="font-[600] tracking-[.15rem] text-sm text-[hsl(0,1%,44%)]">
                DAY
              </span>
              <input
                value={day}
                onChange={(e) => setDay(e.target.value)}
                type="text"
                placeholder="DD"
                className={`text-black lg:text-2xl text-xl font-bold focus:outline-hidden lg:max-w-32 max-w-20 border-[1px] rounded-md lg:px-4 px-3 py-3 ${
                  errors.day
                    ? "border-red-500"
                    : "border-[hsl(0,0%,86%)] focus:border-[hsl(259,100%,65%)]"
                }`}
              />
              {errors.day && (
                <span className="text-red-500 lg:text-xs text-[8px] mt-1">
                  {errors.day}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-[600] tracking-[.15rem] text-sm text-[hsl(0,1%,44%)]">
                MONTH
              </span>
              <input
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                type="text"
                placeholder="MM"
                className={`text-black lg:text-2xl text-xl font-bold focus:outline-hidden lg:max-w-32 max-w-20 border-[1px] rounded-md lg:px-4 px-3 py-3 ${
                  errors.month
                    ? "border-red-500"
                    : "border-[hsl(0,0%,86%)] focus:border-[hsl(259,100%,65%)]"
                }`}
              />
              {errors.month && (
                <span className="text-red-500 lg:text-xs text-[8px] mt-1">
                  {errors.month}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-[600] tracking-[.15rem] text-sm text-[hsl(0,1%,44%)]">
                YEAR
              </span>
              <input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                type="text"
                placeholder="YYYY"
                className={`text-black lg:text-2xl text-xl font-bold focus:outline-hidden lg:max-w-32 max-w-20 border-[1px] rounded-md lg:px-4 px-3 py-3 ${
                  errors.year
                    ? "border-red-500"
                    : "border-[hsl(0,0%,86%)] focus:border-[hsl(259,100%,65%)]"
                }`}
              />
              {errors.year && (
                <span className="text-red-500 lg:text-xs text-[8px] mt-1">
                  {errors.year}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={calculateAge}
            className="rounded-full bg-[hsl(259,100%,65%)] lg:size-18 size-14 items-center justify-center flex lg:-mb-9 -mt-7 cursor-pointer hover:bg-black"
          >
            <img
              src="src/images/icon-arrow.svg"
              alt="arrow"
              className="lg:h-8 h-6"
            />
          </button>
        </div>

        <div className="lg:mt-10 mt-7 lg:text-7xl text-5xl">
          <h1 className="font-[800] italic">
            <span className="text-[hsl(259,100%,65%)]">{age.years}</span> years
          </h1>
          <h1 className="font-[800] italic">
            <span className="text-[hsl(259,100%,65%)]">{age.months}</span>{" "}
            months
          </h1>
          <h1 className="font-[800] italic">
            <span className="text-[hsl(259,100%,65%)]">{age.days}</span> days
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";

const portals = [
  {
    title: "ECAP Portal",
    desc: "Access academic records, student profile, attendance, and internal updates through the ECAP system.",
    link: "http://103.42.248.219/ecap/default.aspx",
    gradient: "from-blue-400 via-blue-500 to-indigo-500",
  },
  {
    title: "Exam Cell Portal",
    desc: "Stay updated with exam schedules, results, hall tickets, and official examination notifications.",
    link: "https://smceexamcell.in/examcell/",
    gradient: "from-pink-400 via-rose-500 to-red-500",
  },
  {
    title: "Mock Tests",
    desc: "Practice and prepare with mock tests designed to simulate real exam environments and improve performance.",
    link: "https://s18181378.makebizservices.com",
    gradient: "from-yellow-400 via-orange-400 to-pink-400",
  },
];

const quotes = [
  {
    text: "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.",
    author: "A.P.J. Abdul Kalam",
    image: "https://i.pinimg.com/736x/74/00/08/7400084c072e5fa3e4a6e4e632fe4f6f.jpg",
  },
  {
    text: "Arise, awake, and stop not until the goal is reached.",
    author: "Swami Vivekananda",
    image: "https://i.pinimg.com/736x/53/0f/b1/530fb186723a0772ce259132f5976361.jpg",
  },
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
    image: "https://i.pinimg.com/736x/ff/79/a4/ff79a4a91ffc62bf40debb44711b1694.jpg",
  },
  {
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi",
    image: "https://i.pinimg.com/1200x/ed/38/52/ed3852d1daca8b7e176079adb179632e.jpg",
  },
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King",
    image: "https://i.pinimg.com/1200x/15/91/aa/1591aa478dd158e66a6de66e5651fba0.jpg",
  },
  {
    text: "An investment in knowledge pays the best interest.",
    author: "Benjamin Franklin",
    image: "https://i.pinimg.com/736x/e6/10/85/e61085ce772412bde37a543405e795c1.jpg",
  },
  {
    text: "The roots of education are bitter, but the fruit is sweet.",
    author: "Aristotle",
    image: "https://i.pinimg.com/1200x/14/c2/0f/14c20f81665e224d644415c66cd2582a.jpg",
  },
  {
    text: "Do not wait to strike till the iron is hot; but make it hot by striking.",
    author: "William Butler Yeats",
    image: "https://i.pinimg.com/736x/c6/34/2a/c6342a7cd6e5fa312ee2962663655e21.jpg",
  },
  {
    text: "Learning never exhausts the mind.",
    author: "Leonardo da Vinci",
    image: "https://i.pinimg.com/736x/4f/1a/b6/4f1ab6744b8025dfa62ecc559d005e06.jpg",
  },
  {
    text: "You can’t change your future, but you can change your habits, and surely your habits will change your future.",
    author: "Dr. A.P.J. Abdul Kalam",
    image: "https://i.pinimg.com/736x/cf/1b/40/cf1b40a3f6999ff5b40e3dd2e4fe8051.jpg",
  },
  {
    text: "Where the mind is without fear and the head is held high.",
    author: "Rabindranath Tagore",
    image: "https://i.pinimg.com/1200x/54/98/ef/5498ef0b7e47ede7e49e9c6a07ec6256.jpg",
  },
  {
    text: "Ask the right questions, and nature will open the doors to her secrets.",
    author: "C.V. Raman",
    image: "https://i.pinimg.com/736x/93/8c/64/938c6454cb8dc82e89074c71a9e37c87.jpg",
  },
  {
    text: "Take the stones people throw at you, and use them to build a monument.",
    author: "Ratan Tata",
    image: "https://i.pinimg.com/736x/16/60/42/166042de46dd1f59e26a994031a75c01.jpg",
  },
  {
    text: "A nation’s culture resides in the hearts and in the soul of its people.",
    author: "Mahatma Gandhi",
    image: "https://i.pinimg.com/1200x/a0/65/fb/a065fb40bc1c218643d3fd3df3d9987f.jpg",
  },
  {
    text: "If you want to shine like a sun, first burn like a sun.",
    author: "Dr. A.P.J. Abdul Kalam",
    image: "https://i.pinimg.com/1200x/37/3d/c2/373dc2aa305e1462d9235ccf8aacc203.jpg",
  },
  {
    text: "Strength does not come from physical capacity. It comes from an indomitable will.",
    author: "Mahatma Gandhi",
    image: "https://i.pinimg.com/736x/70/7f/61/707f612bf1affc84a8c31595f4f40ecf.jpg",
  },
  {
    text: "The power of imagination makes us infinite.",
    author: "Rabindranath Tagore",
    image: "https://i.pinimg.com/736x/c3/77/90/c377901c39d97153ed428d8c6f4c1e04.jpg",
  },
  {
    text: "Success is when your signature turns into your autograph.",
    author: "Amitabh Bachchan",
    image: "https://i.pinimg.com/1200x/40/fa/98/40fa98e99480b237661bc4a5128888ba.jpg",
  },
  {
    text: "Leadership is the capacity to translate vision into reality.",
    author: "Narayana Murthy",
    image: "https://i.pinimg.com/1200x/17/c8/8a/17c88a2a59c345e5bb30aafb10d93e29.jpg",
  },
];

function StudentPortal() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [shuffledQuotes, setShuffledQuotes] = useState(quotes);

  useEffect(() => {
    const shuffled = [...quotes];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledQuotes(shuffled);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % shuffledQuotes.length);
        setFade(true);
      }, 500); // fade out duration
    }, 9000);

    return () => clearInterval(interval);
  }, [shuffledQuotes.length]);

  return (
    <div className="min-h-screen bg-[#f7f5f3] mt-[90px] px-6 md:px-12 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">
          Student Portal
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base max-w-xl">
          Access all essential student services, examination portals, and
          practice platforms in one place.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portals.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
          >
            <div
              className={`h-full p-6 flex flex-col justify-between bg-gradient-to-br ${item.gradient} text-white`}
            >
              <div>
                <h2 className="text-xl md:text-2xl font-semibold leading-tight mb-3">
                  {item.title}
                </h2>
                <p className="text-white/80 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs uppercase tracking-wide text-white/70">
                  Open Portal
                </span>
                <span className="text-white text-lg transform group-hover:translate-x-1 transition">
                  →
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Inspiration Section */}
      <div className="mt-24">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
            Voices of Inspiration
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Learn from the thoughts of great minds across generations
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <div
            className={`py-12 flex flex-col md:flex-row items-center justify-between gap-10 transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
          >
            {/* Quote */}
            <div className="flex-1 max-w-2xl text-center md:text-left">
              <p className="text-xl md:text-3xl font-semibold text-gray-900 tracking-tight leading-relaxed">
                “{shuffledQuotes[quoteIndex].text}”
              </p>
              <p className="mt-4 text-sm text-gray-600 font-medium tracking-wide">
                — {shuffledQuotes[quoteIndex].author}
              </p>
            </div>

            {/* Image Placeholder */}
            <div className="flex-shrink-0 w-28 h-28 md:w-40 md:h-40 flex items-center justify-center overflow-hidden rounded-2xl">
              {shuffledQuotes[quoteIndex].image ? (
                <img
                  src={shuffledQuotes[quoteIndex].image}
                  alt={shuffledQuotes[quoteIndex].author}
                  className={`w-full h-full object-cover rounded-2xl shadow-md transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs rounded-2xl">
                  Image
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentPortal;
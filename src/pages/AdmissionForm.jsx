import { useState } from "react";
import { db } from "../services/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const villages = [
  "Guntur",
  "Tenali",
  "Mangalagiri",
  "Ponnur",
  "Repalle",
  "Bapatla",
  "Narasaraopet",
];

const branchOptions = {
  "B.Tech": ["CSE", "CSE-AI", "CSE-DS", "IT", "ECE"],
  "MBA": ["MBA"],
};

const generateUID = () => {
  return "SMCE-" + Date.now().toString().slice(-6);
};

export default function AdmissionForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    branch: "",
    village: "",
    otherVillage: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const uid = generateUID();
    setUserId(uid);

    const finalVillage =
      form.village === "other" ? form.otherVillage : form.village;

    try {
      await addDoc(collection(db, "admissions"), {
        ...form,
        village: finalVillage,
        userId: uid,
        createdAt: serverTimestamp(),
        status: "new",
      });

      setSubmitted(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="mt-[90px] px-6 bg-[#800000]/5 min-h-screen py-10">

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img loading="lazy" src="/src/assets/logo/logo.png" alt="SMCE Logo" className="h-20" />
      </div>

      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-[#800000]">
          Admission Enquiry
        </h1>
        <p className="text-gray-500 mt-2">
          Fill in your details and our admissions team will reach out to you.
        </p>
      </div>

      {submitted ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold text-[#800000] mb-3">
            Application Submitted Successfully
          </h2>
          <p className="text-gray-600">
            Thank you for your interest. We will contact you shortly.
          </p>
          <p className="mt-3 text-sm text-gray-500">
            Reference ID: <span className="font-semibold text-[#800000]">{userId}</span>
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto space-y-8 bg-white p-8 rounded-lg border border-gray-200"
        >

          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Full Name *</label>
              <input
                name="name"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#800000]"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number *</label>
              <input
                name="phone"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#800000]"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
              <input
                name="email"
                type="email"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#800000]"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Course */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Course *</label>
              <select
                name="course"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#800000]"
              >
                <option value="">Select Course</option>
                <option>B.Tech</option>
                <option>MBA</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Branch *</label>
              <select
                name="branch"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#800000]"
              >
                <option value="">Select Branch</option>
                {branchOptions[form.course]?.map((b, i) => (
                  <option key={i} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Village / Town *</label>
            <select
              name="village"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#800000]"
            >
              <option value="">Select</option>
              {villages.map((v, i) => (
                <option key={i} value={v}>
                  {v}
                </option>
              ))}
              <option value="other">Other</option>
            </select>
          </div>

          {form.village === "other" && (
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Enter Village Name</label>
              <input
                name="otherVillage"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#800000]"
                placeholder="Enter your village"
              />
            </div>
          )}

          {/* Submit */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#800000] text-white py-3 rounded-md font-medium hover:opacity-90 transition"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
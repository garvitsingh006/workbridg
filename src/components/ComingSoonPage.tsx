import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import toast from 'react-hot-toast';

export default function ComingSoonPage() {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState('freelancer');
  const [freelancerData, setFreelancerData] = useState({
    name: "",
    email: "",
    field: "",
    experience: "",
    phone: "",
  });

    const [clientData, setClientData] = useState({
    name: "",
    email: "",
    company: "",
    years: "",
    phone: "",
  });

  const handleChange = (type:any, field:any, value:any) => {
    if (type === 'freelancer') {
        setFreelancerData({ ...freelancerData, [field]: value });
    } else {
        setClientData({ ...clientData, [field]: value });
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
        formType,
        data: formType === "freelancer" ? freelancerData : clientData,
    };

    try {
            const res = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (res.ok) {
                toast.success("Form submitted!");
                if (formType === "freelancer") {
                    setFreelancerData({ name: "", email: "", field: "", experience: "", phone: "" });
                } else {
                    setClientData({ name: "", email: "", company: "", years: "", phone: "" });
                }
            } else {
                toast.error(result.error || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error. Try again later.");
        }
    };




  return (
    <div className="overflow-x-hidden min-h-screen bg-white text-black flex flex-col items-center justify-between font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-32 px-4 w-full bg-black text-white overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-white rounded-full opacity-5 -top-24 -left-24"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ repeat: Infinity, duration: 12 }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-white rounded-full opacity-5 bottom-0 -right-20"
          animate={{ scale: [1, 1.3, 1], rotate: [0, -45, 0] }}
          transition={{ repeat: Infinity, duration: 15 }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-7xl font-extrabold mb-6 tracking-tight z-10"
        >
          WorkBridg
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-xl mb-8 max-w-2xl opacity-90 z-10"
        >
          <span className="inline-block animate-pulse">🚀 Coming Soon</span> —  Where talent meets trust.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="z-10"
        >
          <Button onClick={() => setOpen(true)} className="rounded-2xl px-8 py-4 text-lg bg-white text-black font-semibold hover:bg-gray-200 transition cursor-pointer shadow-lg hover:shadow-xl">
            Join the Waitlist
          </Button>
        </motion.div>   
      </section>

      {/* How We Work */}
      <section className="py-24 px-6 mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-12"
        >
          How We Work
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Smart Matchmaking",
              desc: "We make sure the right freelancer finds the right project — no endless searching, just quick and smart connections.."
            },
            {
              title: "Transparent Process",
              desc: "What you see is what you get. No hidden charges, no messy steps — just clear communication all the way."
            },
            {
              title: "Secure & Fair",
              desc: "Payments, deadlines, and deliverables are protected. Both clients and freelancers get the security they need to work stress-free."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <Card className="rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-xl font-semibold mb-3"
                  >
                    {item.title}
                  </motion.h3>
                  <p className="opacity-80">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 px-6 max-w-4xl text-center bg-gray-100 rounded-3xl mx-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-6"
        >
          Who We Are
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-lg leading-relaxed opacity-90"
        >
         WorkBridg isn’t a marketplace — it’s a trusted space where projects run smoothly and connections feel genuine. We take care of the heavy lifting like matching, payments, and project management, so clients and freelancers can focus only on great work.
        </motion.p>
      </section>

      {/* Why Join Early */}
      <section className="py-24 px-6 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Why Join Early?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            "Be part of the foundation and grow with WorkBridg from day one",
            "Shape the platform with your feedback and help us design a smarter way for clients and freelancers to connect",
            "Build your profile early and stand out when projects start rolling in"
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <Card className="rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2">
                <CardContent className="p-6 text-center text-lg font-medium">
                  {item}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-sm bg-black text-white w-full relative z-10">
        <p>© {new Date().getFullYear()} WorkBridg.</p>
      </footer>

      {/* Popup Form */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <Card className="rounded-2xl shadow-2xl overflow-hidden bg-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Join the Waitlist</h3>

                {/* Switch Buttons */}
                <div className="flex justify-center gap-4 mb-6">
                  <Button variant={formType === 'freelancer' ? 'black' : 'white'} onClick={() => setFormType('freelancer')} >Freelancer</Button>
                  <Button variant={formType === 'client' ? 'black' : 'white'} onClick={() => setFormType('client')}>Client</Button>
                </div>

                {/* Forms */}
                {formType === 'freelancer' ? (
                  <form className="flex flex-col gap-3 " key="freelancer" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" className="border-none rounded-xl p-3" value={freelancerData.name} onChange={(e) => handleChange("freelancer", "name", e.target.value)} required />
                    <input type="text" placeholder="Email" className="border-none rounded-xl p-3" value={freelancerData.email} onChange={(e) => handleChange("freelancer", "email", e.target.value)} required />
                    <input type="text" placeholder="Field of Work" className="border-none rounded-xl p-3" value={freelancerData.field} onChange={(e) => handleChange("freelancer", "field", e.target.value)} required />
                    <input type="text" placeholder="Experience (years)" className="border-none rounded-xl p-3" value={freelancerData.experience} onChange={(e) => handleChange("freelancer", "experience", e.target.value)} required />
                    <input type="text" placeholder="Contact Number" className="border-none rounded-xl p-3" value={freelancerData.phone} onChange={(e) => handleChange("freelancer", "phone", e.target.value)} required />
                    <Button type="submit" variant="black" className="w-full rounded-2xl py-3 text-lg cursor-pointer">Submit</Button>
                  </form>
                ) : (
                  <form className="flex flex-col gap-3 border-none" key="client" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" className="border-none rounded-xl p-3" value={clientData.name} onChange={(e) => handleChange("client", "name", e.target.value)} required />
                    <input type="text" placeholder="Email" className="border-none rounded-xl p-3" value={clientData.email} onChange={(e) => handleChange("client", "email", e.target.value)} required />
                    <input type="text" placeholder="Company Name" className="border-none rounded-xl p-3" value={clientData.company} onChange={(e) => handleChange("client", "company", e.target.value)} required />
                    <input type="text" placeholder="Years in Business" className="border-none rounded-xl p-3" value={clientData.years} onChange={(e) => handleChange("client", "years", e.target.value)} required />
                    <input type="text" placeholder="Contact Number" className="border-none rounded-xl p-3" value={clientData.phone} onChange={(e) => handleChange("client", "phone", e.target.value)} required />
                    <Button type="submit"  variant='black' className="w-full rounded-2xl py-3 text-lg cursor-pointer">Submit</Button>
                  </form>
                )}

                <Button variant="white" onClick={() => setOpen(false)} className="w-full hover:shadow-md mt-3 rounded-2xl">Cancel</Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}



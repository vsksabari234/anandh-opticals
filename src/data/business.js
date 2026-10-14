export const BUSINESS_INFO = {
  name: "Anand Opticals & Eye Clinic",
  nameTamil: "ஆனந்த் ஆப்டிக்கல்ஸ் & கண் மருத்துவமனை",
  tagline: "Clear Vision. Modern Care. Precision Eyewear.",
  taglineTamil: "துல்லியமான கண் பரிசோதனை & நவீன கண்ணாடிகள்",
  established: 1998,
  doctor: {
    name: "Dr. S. Anand",
    qualifications: "B.Optom, M.Optom, FIACLE (Fellow of International Association of Contact Lens Educators)",
    title: "Senior Consultant Optometrist & Vision Scientist",
    experience: "26+ Years Clinical Experience",
    regNo: "TN-OPT-4182",
    photo: "/src/assets/images/doctor_portrait_1791949570094.jpg",
    showroomImage: "/src/assets/images/optical_showroom_1791949566865.jpg",
    specialities: [
      "Computerized 3D Objective Refraction",
      "Pediatric & Geriatric Vision Care",
      "Specialty Contact Lens Fitting (Keratoconus / Toric)",
      "Digital Eye Strain & Blue Light Ergonomics",
      "Low Vision Aids & Diabetic Retinal Screening"
    ]
  },
  address: {
    line1: "Shop No. 14, Salem Main Road",
    line2: "Opposite Govt. Headquarters Hospital (Near New Bus Stand)",
    city: "Kallakurichi",
    state: "Tamil Nadu",
    pincode: "606202",
    googleMapsUrl: "https://maps.google.com/?q=Anand+Opticals+Salem+Main+Road+Kallakurichi"
  },
  contact: {
    phone: "+91 94432 28456",
    landline: "04151-222345",
    whatsapp: "+919443228456",
    email: "care@anandopticals.in",
    emergencyPhone: "+91 98423 11890"
  },
  hours: [
    { days: "Monday - Saturday", time: "9:30 AM - 9:00 PM", status: "Open" },
    { days: "Sunday", time: "10:00 AM - 2:00 PM (Emergency & Appointments)", status: "Morning Only" }
  ],
  services: [
    {
      id: "computerized-testing",
      title: "Computerized Eye Testing",
      titleTamil: "கணினி வழி துல்லிய கண் பரிசோதனை",
      description: "Automated refractometry, keratometry, and subjective trial frame verification using German optical calibration.",
      icon: "Eye",
      duration: "15-20 mins",
      badge: "Free with Frame Purchase"
    },
    {
      id: "virtual-tryon",
      title: "3D Virtual Try-On",
      titleTamil: "3D ஆன்லைன் கண்ணாடி ட்ரை-ஆன்",
      description: "Live camera face-tracking to preview 1000+ designer frames before purchasing with zero guesswork.",
      icon: "ScanFace",
      duration: "Instant",
      badge: "AI Powered"
    },
    {
      id: "progressive-fitting",
      title: "Digital Progressive Lenses",
      titleTamil: "டிஜிட்டல் புரோகிரசிவ் லென்ஸ்கள்",
      description: "Smooth distance, intermediate (computer), and reading transitions without annoying image jumps or swimming effects.",
      icon: "Glasses",
      duration: "Same-Day Delivery",
      badge: "Zero Adaptation Time"
    },
    {
      id: "blue-blocker",
      title: "Blue-Light & Screen Protection",
      titleTamil: "ப்ளூ-ரே கணினி பாதுகாப்பு லென்ஸ்",
      description: "Blocks 99% harmful HEV blue rays from laptops, smartphones & TV to stop dry eyes and sleeplessness.",
      icon: "Laptop",
      duration: "Ready in 1 Hour",
      badge: "For Tech Workers & Students"
    },
    {
      id: "contact-lenses",
      title: "Contact Lens Clinic",
      titleTamil: "காண்டாக்ட் லென்ஸ் பொருத்துதல்",
      description: "Soft daily disposables, monthly torics, colored aesthetic lenses, and specialized rigid gas permeable lenses.",
      icon: "Sparkles",
      duration: "20 mins fitting",
      badge: "Trial Pairs Available"
    },
    {
      id: "express-lab",
      title: "1-Hour In-House Edging Lab",
      titleTamil: "1 மணி நேரத்தில் கண்ணாடி தயார்",
      description: "State-of-the-art robotic lens edger cut to micron-level tolerance right in our Kallakurichi clinic.",
      icon: "Clock",
      duration: "Under 60 mins",
      badge: "Express Service"
    }
  ]
};

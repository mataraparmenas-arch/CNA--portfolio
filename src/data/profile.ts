/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PROFILE DATA — single source of truth for everything written on the site.
 *
 *  • To update the CV: replace the PDF at  public/cv/glorious-moraa-cv.pdf
 *    (keep the same filename). No code change or rebuild is required.
 *  • To update the portrait: replace       public/images/glorious-portrait.jpg
 *  • Anything marked [EDIT] is a placeholder waiting for real CV details.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Glorious Moraa",
  firstName: "Glorious",
  title: "CNA & Physiotherapy Professional",
  longTitle: "Certified Nursing Assistant (CNA) & Physiotherapy Professional",
  label: "Healthcare • Care • Movement",

  phone: "0792268166",
  phoneHref: "tel:0792268166",
  email: "Moraaglorious14@gmail.com",
  emailHref: "mailto:Moraaglorious14@gmail.com",

  /** Stable, replaceable assets (served from /public) */
  portrait: "/images/glorious-portrait.jpg",
  portraitAlt:
    "Portrait of Glorious Moraa, Certified Nursing Assistant and physiotherapy professional, smiling warmly",
  cvPath: "/cv/glorious-moraa-cv.pdf",
  cvFileName: "Glorious-Moraa-CV.pdf",

  heroStatement:
    "Combining hands-on patient care with a movement-focused approach to rehabilitation — supporting people not only through treatment, but towards functional, confident everyday living.",

  about: {
    headline: ["Care is more than treatment.", "It's helping people move forward."],
    paragraphs: [
      "Glorious Moraa is a Certified Nursing Assistant whose professional path has grown into physiotherapy. Her foundation is simple and human: attentive, respectful care for the person in front of her.",
      "Working closely with patients as a CNA shaped how she understands recovery — comfort, dignity and daily function matter as much as any single intervention. Physiotherapy extends that understanding into movement: helping people regain mobility, strength and independence.",
      "The two paths meet in one conviction: good healthcare cares for the whole person, and it helps them move forward.",
    ],
    principles: [
      { title: "Person first", text: "Every plan begins with the individual — their comfort, goals and daily life." },
      { title: "Clinical discipline", text: "Careful observation, clear communication and consistent follow-through." },
      { title: "Movement as recovery", text: "Restoring function and confidence through purposeful, progressive movement." },
    ],
  },

  /** CNA → Physiotherapy pathway */
  pathway: [
    { step: "01", title: "Patient Care", text: "Direct, compassionate support for daily wellbeing and comfort." },
    { step: "02", title: "Clinical Support", text: "Working alongside care teams with attention to detail and safety." },
    { step: "03", title: "Understanding the Patient", text: "Listening closely to what recovery means for each person." },
    { step: "04", title: "Movement & Rehabilitation", text: "Supporting structured recovery and functional independence." },
    { step: "05", title: "Physiotherapy", text: "Movement-focused healthcare that helps people live more fully." },
  ],

  /** Areas of professional focus — add specialties here when the CV confirms them */
  expertise: [
    {
      key: "care",
      title: "Patient Care",
      text: "Compassionate, attentive support centred on patient wellbeing, dignity and comfort.",
    },
    {
      key: "mobility",
      title: "Mobility",
      text: "Understanding how people move, and what helps them regain functional independence.",
    },
    {
      key: "rehab",
      title: "Rehabilitation",
      text: "Supporting structured recovery and the return of everyday physical function.",
    },
    {
      key: "physio",
      title: "Physiotherapy",
      text: "Movement-focused healthcare and rehabilitation practice, guided by the person's goals.",
    },
  ],

  /**
   * Professional journey timeline.
   * [EDIT] Replace each entry with the real year, institution and role from the CV.
   */
  journey: [
    {
      year: "[YEAR]",
      role: "Certified Nursing Assistant",
      org: "[Institution / Employer]",
      text: "Hands-on patient care and clinical support. [EDIT: add 1–2 lines from the CV.]",
      placeholder: true,
    },
    {
      year: "[YEAR]",
      role: "Physiotherapy Training / Professional Development",
      org: "[Institution]",
      text: "Movement, rehabilitation and musculoskeletal health. [EDIT: add programme details.]",
      placeholder: true,
    },
    {
      year: "[YEAR]",
      role: "Current Professional Focus",
      org: "[Current setting]",
      text: "Physiotherapy practice grounded in patient-centred care. [EDIT: add current role.]",
      placeholder: true,
    },
  ],

  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Expertise", href: "#expertise" },
    { label: "Journey", href: "#journey" },
    { label: "CV", href: "#cv" },
    { label: "Contact", href: "#contact" },
  ],

  /**
   * Contact form provider.
   * Set `formEndpoint` to a real endpoint (e.g. Formspree: https://formspree.io/f/xxxx)
   * and the form will POST there. Leave empty to fall back to a pre-filled mailto draft.
   */
  formEndpoint: "",
} as const;

export type Profile = typeof profile;

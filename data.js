/* =====================================================================
   TM Fouzy Education Centre — website content
   ---------------------------------------------------------------------
   Edit this file to update the website. Every text has a Malay (ms) and
   English (en) version.
     CONFIG   – links and the registration form receiver
     CLASSES  – recurring classes at mosques (shown in the timetable)
     COURSES  – structured courses people can register for
     MARHALAH – the 14 stages of the syllabus
   ===================================================================== */

const CONFIG = {
  // Web app link of the Google Sheet that receives registrations (see SETUP-REGISTRATION.md)
  registrationEndpoint: "https://script.google.com/macros/s/AKfycbxGIQJy7Eyu-nVyWQqo4AgjbHWSf9yOqcfc5ybvKeWkUKQpnKl2uplGqzN-9gw2NTd74Q/exec",
  // PayNow details for paid courses. With proxy filled in, the form makes a QR code for each
  // person with the amount and their reference number already filled in.
  //   proxyType: "uen" (business account) or "mobile" (personal account)
  //   proxy:     the UEN, e.g. "T12AB3456C", or the mobile number, e.g. "91234567"
  //   receiverName: the name the student's bank app shows for this PayNow number (shown as a safety check)
  paynow: { proxyType: "mobile", proxy: "84559430", name: "TM Fouzy Education Centre", receiverName: "Muhsin Abdat", qrImage: "" },
  // WhatsApp number for enquiries (floating button on every page). 8-digit Singapore number.
  contactWhatsApp: "84559430",
  // Social links. Buttons with an empty link are hidden.
  whatsappCommunity: "",
  instagram: "",
  facebook: "",
  youtube: "",
  email: ""
};

const SUBJECTS = {
  adab:     { color: "var(--c-adab)",     ms: "Adab",     en: "Adab" },
  tauhid:   { color: "var(--c-tauhid)",   ms: "Tauhid",   en: "Tauhid" },
  fiqh:     { color: "var(--c-fiqh)",     ms: "Fiqh",     en: "Fiqh" },
  tasawwuf: { color: "var(--c-tasawwuf)", ms: "Tasawwuf", en: "Tasawwuf" }
};

/* Timetable rows */
const SLOTS = {
  pagi:    { ms: "9:30 pagi",       en: "9:30 am" },
  maghrib: { ms: "Selepas Maghrib", en: "After Maghrib" },
  isyak:   { ms: "Selepas Isyak",   en: "After Isyak" }
};

/* day: 0 = Sunday … 6 = Saturday.  slot: a key of SLOTS.
   frequency: "weekly" or "monthly" (nth = which week of the month) */
const CLASSES = [
  {
    subject: "fiqh", day: 1, slot: "maghrib", frequency: "weekly",
    title: { ms: "Kuliah Ilmu Fiqh", en: "Fiqh Lecture" },
    kitab: { ms: "Kitab al-Risalah al-Jami'ah — al-Habib Ahmad Zain al-Habsyi", en: "Al-Risalah al-Jami'ah — al-Habib Ahmad Zain al-Habsyi" },
    venue: "Masjid Malabar", address: "471 Victoria St, Singapore 198370",
    recording: "https://www.youtube.com/@masjidmalabar"
  },
  {
    subject: "tasawwuf", day: 2, slot: "pagi", frequency: "weekly",
    title: { ms: "Kuliah Ilmu Tasawwuf", en: "Tasawwuf Lecture" },
    kitab: { ms: "Kitab Risalah al-Mu'awanah — Imam al-Haddad", en: "Risalat al-Mu'awanah — Imam al-Haddad" },
    venue: "Masjid Al-Istiqamah", address: "2 Serangoon North Ave 2, Singapore 555876"
  },
  {
    subject: "tasawwuf", day: 2, slot: "maghrib", frequency: "weekly",
    title: { ms: "Kuliah Ilmu Tasawwuf", en: "Tasawwuf Lecture" },
    kitab: { ms: "Kitab Siyarus Salikin (Juz 4) — Syeikh Abdul Samad al-Palimbani", en: "Siyar al-Salikin (Vol. 4) — Syeikh Abdul Samad al-Palimbani" },
    venue: "Masjid Mydin", address: "67 Jalan Lapang, Singapore 419007",
    recording: "https://www.youtube.com/@MasjidMydin"
  },
  {
    subject: "tasawwuf", day: 2, slot: "isyak", frequency: "weekly",
    title: { ms: "Kuliah Ilmu Tasawwuf", en: "Tasawwuf Lecture" },
    kitab: { ms: "Kitab Kurnia Rabbani Limpahan Rahmani", en: "Kurnia Rabbani Limpahan Rahmani" },
    venue: "Masjid Kassim", address: "450 Changi Rd, Singapore 419877",
    recording: "https://www.youtube.com/@MasjidKassim"
  },
  {
    subject: "tasawwuf", day: 6, slot: "maghrib", frequency: "weekly",
    title: { ms: "Kuliah Ilmu Tasawwuf", en: "Tasawwuf Lecture" },
    kitab: { ms: "Kitab Bidayah al-Hidayah — Imam al-Ghazali", en: "Bidayah al-Hidayah — Imam al-Ghazali" },
    venue: "Masjid Hajjah Fatimah", address: "4001 Beach Rd, Singapore 199584",
    recording: "https://www.youtube.com/playlist?list=PLirHDhLxYck45rszF3K5VVur8JN-PZF12"
  },
  {
    subject: "tauhid", day: 5, slot: "isyak", frequency: "monthly", nth: 3,
    title: { ms: "Kuliah Bulanan Ilmu Tauhid", en: "Monthly Tauhid Lecture" },
    kitab: { ms: "Kitab Qawa'id al-'Aqa'id — Imam al-Ghazali", en: "Qawa'id al-'Aqa'id — Imam al-Ghazali" },
    venue: "Masjid Al-Abdul Razak", address: "30 Jalan Ismail, Singapore 419285"
  }
];

/* Status is worked out from the dates: before the first date = open,
   during = ongoing, after the last date = done.
   Set status: "open" to take registrations for a course whose dates are not fixed yet.
   fee: adds a PayNow step to the form.  start / end ("15:00"): lets students add the
   sessions to their calendar and get a reminder email the day before each one.
   id must be unique — it is saved with each registration. */
const COURSES = [
  {
    id: "tanwir-nubuwwat-2026-11", marhalah: 5, subject: "tauhid",
    title: { ms: "Kursus Tanwirul Qulub Bahagian 2: Kenabian (Nubuwwat)", en: "Tanwir al-Qulub Part 2: Prophethood (Nubuwwat)" },
    desc: { ms: "Kesinambungan pengajian Tanwirul Qulub karangan Syeikh Muhammad Amin al-Kurdi bagi peserta yang telah menamatkan Bab Ketuhanan.",
            en: "The continuation of Tanwir al-Qulub by Syeikh Muhammad Amin al-Kurdi, for students who have completed the chapter on Divinity." },
    dates: ["2026-11-15", "2026-11-22", "2026-11-29"],
    time: { ms: "Ahad, 3:00 – 5:00 ptg", en: "Sundays, 3:00 – 5:00 pm" }, start: "15:00", end: "17:00",
    venue: "Masjid Abdul Aleem Siddique", address: "90 Lorong K Telok Kurau, Singapore 425723",
    fee: 80, feeNote: { ms: "3 sesi, termasuk buku", en: "3 sessions, book included" },
    arabic: "تنوير القلوب"
  },
  {
    id: "adab-penuntut-ilmu", marhalah: 1, subject: "adab", status: "soon",
    title: { ms: "Kursus Khas Permulaan: Adab Penuntut Ilmu", en: "Foundation Course: Etiquette of the Seeker of Knowledge" },
    desc: { ms: "Titik permulaan perjalanan menuntut ilmu — petikan daripada Ihya' Ulumuddin, Majmu' Imam Nawawi, Tazkiratus Sami' dan Ta'lim al-Muta'allim. Sesuai untuk peserta baharu.",
            en: "Where the journey begins — selected from Ihya' Ulum al-Din, al-Majmu' of Imam Nawawi, Tadhkirat al-Sami' and Ta'lim al-Muta'allim. Ideal for new students." },
    time: { ms: "Tarikh & yuran akan diumumkan", en: "Dates & fee to be announced" },
    venue: "", address: "",
    arabic: "آداب طالب العلم"
  },
  {
    id: "asas-tauhid-2026-10", marhalah: 2, subject: "tauhid",
    title: { ms: "Kursus Lanjutan Tingkatan 1: Asas-asas Ilmu Tauhid", en: "Advanced Course Level 1: Foundations of Tauhid" },
    desc: { ms: "Pembelajaran al-Mabadi' al-'Asyarah (10 Dasar Ilmu Tauhid) berpandukan kitab terbitan khas TMFEC yang merujuk Ummul Barahin, Jauharah al-Tauhid, Faridatul Faraaid dan Sifat 20.",
            en: "Learn al-Mabadi' al-'Asyarah (the 10 Principles of Tauhid) using TMFEC's own course book, drawing on Umm al-Barahin, Jawharat al-Tawhid, Faridat al-Fara'id and the 20 Attributes." },
    dates: ["2026-10-03", "2026-10-10", "2026-10-17"],
    time: { ms: "Sabtu, 3:00 – 5:30 ptg", en: "Saturdays, 3:00 – 5:30 pm" }, start: "15:00", end: "17:30",
    venue: "Masjid Abdul Aleem Siddique", address: "90 Lorong K Telok Kurau, Singapore 425723",
    fee: 80, feeNote: { ms: "3 sesi, buku & kertas kerja", en: "3 sessions, book & worksheets" },
    image: "assets/poster-tauhid.jpg"
  },
  {
    id: "tanwir-ilahiyyat-k1k2", marhalah: 4, subject: "tauhid",
    title: { ms: "Kursus Tanwirul Qulub — Ketuhanan (Kohort 1 & 2)", en: "Tanwir al-Qulub — Divinity (Cohorts 1 & 2)" },
    desc: { ms: "11 sesi pengajian Bab Ketuhanan (Ilahiyyat), diakhiri dengan Majlis Khataman.",
            en: "11 sessions on the chapter of Divinity (Ilahiyyat), concluded with a Khataman ceremony." },
    dates: ["2026-09-19"],
    time: { ms: "Majlis Khataman: 19 Sep 2026 / 7 Rabiul Akhir 1448H", en: "Khataman: 19 Sep 2026 / 7 Rabi' al-Akhir 1448H" },
    venue: "Masjid Abdul Aleem Siddique", address: "",
    image: "assets/community.jpg"
  },
  {
    id: "seminar-imam-syafie", subject: "fiqh", guest: true,
    title: { ms: "Seminar: Imam Syafie — Perjuangan, Pemikiran & Warisannya", en: "Seminar: Imam al-Shafi'i — His Struggle, Thought & Legacy" },
    desc: { ms: "Anjuran Masjid Al Taqua bersama Ustaz Hassanuddin Razali.", en: "Organised by Masjid Al Taqua with Ustaz Hassanuddin Razali." },
    dates: ["2026-10-17"],
    time: { ms: "Sabtu, 9:00 pg – 1:00 ptg", en: "Saturday, 9:00 am – 1:00 pm" },
    venue: "Masjid Al Taqua", address: "11A Jalan Bilal, off Bedok Road",
    fee: 15,
    image: "assets/poster-syafie.jpg"
  }
];

const MARHALAH = [
  { s: "adab",     type: { ms: "Kursus Khas Permulaan", en: "Foundation Course" }, title: { ms: "Adab Penuntut Ilmu", en: "Etiquette of the Seeker of Knowledge" } },
  { s: "tauhid",   type: { ms: "Kursus Lanjutan", en: "Advanced Course" }, title: { ms: "Asas-asas Ilmu Tauhid", en: "Foundations of Tauhid" } },
  { s: "tauhid",   type: { ms: "Pengajian Kitab", en: "Kitab Study" }, title: { ms: "Aqidatul Awam", en: "Aqidat al-Awam" }, author: "Imam Ahmad al-Marzuqi" },
  { s: "tauhid",   type: { ms: "Pengajian Kitab", en: "Kitab Study" }, title: { ms: "Tanwirul Qulub — Ketuhanan (Ilahiyyat)", en: "Tanwir al-Qulub — Divinity (Ilahiyyat)" }, author: "Syeikh Muhammad Amin al-Kurdi" },
  { s: "tauhid",   type: { ms: "Pengajian Kitab", en: "Kitab Study" }, title: { ms: "Tanwirul Qulub — Kenabian (Nubuwwat)", en: "Tanwir al-Qulub — Prophethood (Nubuwwat)" }, author: "Syeikh Muhammad Amin al-Kurdi" },
  { s: "tauhid",   type: { ms: "Pengajian Kitab", en: "Kitab Study" }, title: { ms: "Tanwirul Qulub — Alam Ghaib (Sam'iyyat)", en: "Tanwir al-Qulub — The Unseen (Sam'iyyat)" }, author: "Syeikh Muhammad Amin al-Kurdi" },
  { s: "fiqh",     type: { ms: "Kursus Permulaan", en: "Introductory Course" }, title: { ms: "Asas-asas Ilmu Fiqh — al-Mabadi' al-'Asyarah", en: "Foundations of Fiqh — al-Mabadi' al-'Asyarah" } },
  { s: "fiqh",     type: { ms: "Pengajian Kitab", en: "Kitab Study" }, title: { ms: "al-Mukhtasar al-Lathif — Bahagian Taharah", en: "al-Mukhtasar al-Latif — Purification" }, author: "Imam Abdullah Ba Fadhl al-Hadhramy" },
  { s: "fiqh",     type: { ms: "Pengajian Kitab", en: "Kitab Study" }, title: { ms: "al-Mukhtasar al-Lathif — Bahagian Solat", en: "al-Mukhtasar al-Latif — Prayer" }, author: "Imam Abdullah Ba Fadhl al-Hadhramy" },
  { s: "fiqh",     type: { ms: "Pengajian Kitab", en: "Kitab Study" }, title: { ms: "al-Mukhtasar al-Lathif — Bahagian Zakat", en: "al-Mukhtasar al-Latif — Zakat" }, author: "Imam Abdullah Ba Fadhl al-Hadhramy" },
  { s: "fiqh",     type: { ms: "Pengajian Kitab", en: "Kitab Study" }, title: { ms: "al-Mukhtasar al-Lathif — Bahagian Puasa", en: "al-Mukhtasar al-Latif — Fasting" }, author: "Imam Abdullah Ba Fadhl al-Hadhramy" },
  { s: "fiqh",     type: { ms: "Pengajian Kitab", en: "Kitab Study" }, title: { ms: "al-Mukhtasar al-Lathif — Bahagian Haji", en: "al-Mukhtasar al-Latif — Hajj" }, author: "Imam Abdullah Ba Fadhl al-Hadhramy" },
  { s: "tasawwuf", type: { ms: "Kursus Permulaan", en: "Introductory Course" }, title: { ms: "Asas-asas Ilmu Tasawwuf — al-Mabadi' al-'Asyarah", en: "Foundations of Tasawwuf — al-Mabadi' al-'Asyarah" } },
  { s: "tasawwuf", type: { ms: "Pengajian Kitab", en: "Kitab Study" }, title: { ms: "Bidayatul Hidayah", en: "Bidayat al-Hidayah" }, author: "Imam Abu Hamid al-Ghazali" }
];

const WHY = [
  { icon: "layers",   ms: ["Ilmu tersusun, guru yang sama", "Ilmu dipelajari secara tersusun, daripada asas kepada peringkat yang lebih mendalam dengan bimbingan guru yang sama."],
                      en: ["Structured learning, one teacher", "Knowledge is built step by step, from the basics to deeper levels, under the guidance of the same teacher."] },
  { icon: "book",     ms: ["Nota & visual yang mudah difahami", "Inti perbahasan daripada beberapa kitab utama dirumuskan menjadi buku, nota dan visual yang mudah difahami."],
                      en: ["Clear notes & visuals", "The core discussions of several major texts are distilled into course books, notes and easy-to-follow visuals."] },
  { icon: "calendar", ms: ["Sebulan Belajar, Sebulan Rehat", "Memberi ruang untuk menghadam, mengulang kaji dan mengamalkan ilmu sebelum meneruskan ke tahap berikutnya."],
                      en: ["One month study, one month rest", "Time to absorb, revise and practise what was learnt before moving on to the next level."] },
  { icon: "video",    ms: ["Rakaman video untuk ulang kaji", "Rakaman pengajian disediakan supaya penuntut boleh merujuk pada bila-bila masa dan mengulang bahagian yang terlepas."],
                      en: ["Video recordings to revise", "Every session is recorded so students can revisit lessons any time and catch up on anything missed."] },
  { icon: "award",    ms: ["Sijil Penyertaan", "Sijil Penyertaan akan diberikan setiap kali selesai sebuah marhalah, InsyaAllah."],
                      en: ["Certificate of Participation", "A certificate is awarded on completing each marhalah (stage), InsyaAllah."] }
];

/* Fawaid (weekly reflections). Each series is a set of posters; the first image is the cover.
   Add new posters to assets/fawaid/ and a new entry at the TOP of this list. */
const FAWAID = [
  {
    title: { ms: "Halusnya Penyakit Riya'", en: "The Subtlety of Riya' (Showing Off)" },
    source: { ms: "Kuliah Tasawwuf: Kitab Kurnia Rabbani Limpahan Rahmani · Masjid Kassim", en: "Tasawwuf class: Kurnia Rabbani Limpahan Rahmani · Masjid Kassim" },
    date: "2026-10-13", subject: "tasawwuf",
    summary: { ms: "Syirik itu lebih tersembunyi dalam kalangan umat daripada rayapan semut hitam di atas batu pejal pada malam yang gelap-gelita. Kata Imam al-Fudhail bin 'Iyadh r.h: meninggalkan amal kerana manusia itu riya', beramal kerana manusia itu syirik, dan ikhlas ialah Allah memeliharamu daripada kedua-duanya.",
               en: "Shirk is more hidden among the ummah than a black ant crawling on a hard rock on a pitch-dark night. Imam al-Fudhail ibn 'Iyadh r.h said: leaving a deed for people's sake is riya', doing it for people is shirk, and sincerity is that Allah protects you from both." },
    images: ["assets/fawaid/riya-halusnya.jpg", "assets/fawaid/riya-hadis-semut.jpg", "assets/fawaid/riya-fudhail.jpg", "assets/fawaid/kassim-cover.jpg"]
  },
  {
    title: { ms: "Bacaan Surah dalam Solat Fardhu & Jadual Surah al-Habib 'Abdullah al-Haddad", en: "Surah Recitation in the Obligatory Prayers & al-Habib 'Abdullah al-Haddad's Surah Table" },
    source: { ms: "Kuliah Tasawwuf: Kitab Bidayah al-Hidayah · Masjid Hajjah Fatimah", en: "Tasawwuf class: Bidayah al-Hidayah · Masjid Hajjah Fatimah" },
    date: "2026-10-02", subject: "tasawwuf",
    summary: { ms: "Sunnah memanjangkan bacaan Subuh dan Zuhur, meringankan Asar, membaca surah pendek al-Mufassal ketika Maghrib dan pertengahan ketika Isyak; erti al-Mufassal dan pembahagiannya; serta surah-surah yang dibaca oleh al-Habib 'Abdullah al-Haddad bagi setiap hari.",
               en: "The sunnah of long recitation at Subuh and Zuhur, lighter at Asar, short surahs of al-Mufassal at Maghrib and middle ones at Isyak; what al-Mufassal means and its divisions; and the surahs al-Habib 'Abdullah al-Haddad recited each day." },
    images: ["assets/fawaid/surah-sunnah-bacaan.jpg", "assets/fawaid/surah-mufassal.jpg", "assets/fawaid/surah-haddad-1.jpg", "assets/fawaid/surah-haddad-2.jpg", "assets/fawaid/hajjah-fatimah-cover.jpg"]
  },
  {
    title: { ms: "Syariat, Tarekat & Hakikat", en: "Shari'ah, Tariqah & Haqiqah" },
    source: { ms: "Kuliah Fiqh: Kitab al-Risalah al-Jami'ah · Masjid Malabar", en: "Fiqh class: al-Risalah al-Jami'ah · Masjid Malabar" },
    date: "2026-09-07", subject: "fiqh",
    summary: { ms: "Syeikh Zainuddin al-Malibari r.h mengumpamakan Syariat sebagai bahtera, Tarekat sebagai lautan dan Hakikat sebagai mutiara yang amat tinggi nilainya.",
               en: "Syeikh Zainuddin al-Malibari r.h likens the Shari'ah to a ship, the Tariqah to the sea and the Haqiqah to a priceless pearl." },
    images: ["assets/fawaid/syariat-infografik.jpg", "assets/fawaid/syariat-arab.jpg", "assets/fawaid/syariat-terjemahan.jpg", "assets/fawaid/malabar-cover.jpg"]
  },
  {
    title: { ms: "Fadhilat Menuntut Ilmu", en: "The Virtue of Seeking Knowledge" },
    source: { ms: "Kuliah Fiqh: Kitab al-Risalah al-Jami'ah · Masjid Malabar", en: "Fiqh class: al-Risalah al-Jami'ah · Masjid Malabar" },
    date: "", subject: "fiqh",
    summary: { ms: "Barangsiapa menempuh jalan menuntut ilmu: (1) dipermudahkan jalannya ke syurga, (2) para malaikat menebarkan sayap untuknya, dan (3) seorang 'alim didoakan istighfar oleh segala makhluk, hingga ikan-ikan di lautan. [H.R Abu Daud 3643 & Ibn Majah 228]",
               en: "Whoever takes a path seeking knowledge: (1) their way to Paradise is made easy, (2) the angels lower their wings for them, and (3) all creation, even the fish in the sea, seek forgiveness for the scholar. [Abu Dawud 3643 & Ibn Majah 228]" },
    images: ["assets/fawaid/ilmu-infografik.jpg", "assets/fawaid/ilmu-hadis.jpg", "assets/fawaid/malabar-cover.jpg"]
  },
  {
    title: { ms: "Fadhilat Berselawat ke atas Nabi ﷺ", en: "The Virtue of Sending Salawat upon the Prophet ﷺ" },
    source: { ms: "Petikan Kitab al-Qaul al-Badi' karangan Imam as-Sakhawi", en: "From al-Qawl al-Badi' by Imam al-Sakhawi" },
    date: "", subject: "tasawwuf",
    summary: { ms: "\"Barangsiapa berselawat ke atasku sekali, nescaya Allah berselawat ke atasnya sepuluh kali\" (H.R Muslim). Kata Imam al-Fakihani r.h: puncak cita-cita orang terdahulu dan terkemudian ialah memperoleh satu selawat daripada Allah, maka bagaimana pula sepuluh kali?",
               en: "\"Whoever sends salawat upon me once, Allah sends salawat upon them ten times\" (Muslim). Imam al-Fakihani r.h said: the highest hope of all people is to receive one salawat from Allah — so what of ten?" },
    images: ["assets/fawaid/selawat-fadhilat.jpg", "assets/fawaid/selawat-hadis-10kali.jpg", "assets/fawaid/selawat-fakihani-1.jpg", "assets/fawaid/selawat-fakihani-2.jpg"]
  },
  {
    title: { ms: "Perbanyakkan Selawat pada Hari Jumaat", en: "Send Abundant Salawat on Friday" },
    source: { ms: "Salam Jumaat", en: "Jumu'ah greetings" },
    date: "", subject: "tasawwuf",
    summary: { ms: "Hadis riwayat Abu Mas'ud al-Ansari r.a: tiadalah seseorang berselawat ke atas Nabi ﷺ pada hari Jumaat melainkan diperhadapkan kepada Baginda akan selawatnya.",
               en: "Hadith of Abu Mas'ud al-Ansari r.a: no one sends salawat upon the Prophet ﷺ on Friday except that it is presented to him." },
    images: ["assets/fawaid/jumaat-hadis-terjemahan.jpg", "assets/fawaid/jumaat-hadis-arab.jpg", "assets/fawaid/jumaat-salam.jpg", "assets/fawaid/jumaat-selawat.jpg"]
  },
  {
    title: { ms: "Memahami Hakikat Ikhlas", en: "Understanding True Sincerity (Ikhlas)" },
    source: { ms: "Imam al-Ghazali r.h, Ihya' 'Ulumiddin", en: "Imam al-Ghazali r.h, Ihya' 'Ulum al-Din" },
    date: "", subject: "tasawwuf",
    summary: { ms: "Sesuatu yang bersih daripada segala campuran dinamakan khalis; dan perbuatan yang telah dibersihkan serta dimurnikan itu dinamakan ikhlas.",
               en: "Something purified of every mixture is called khalis; and a deed that has been cleansed and purified is called ikhlas." },
    images: ["assets/fawaid/ikhlas-hakikat.jpg"]
  }
];

/* Recordings. channel: the YouTube channel link. Each series can link to a playlist. */
const RECORDINGS = {
  channel: "",   // TODO: e.g. "https://www.youtube.com/@..."
  series: [
    { subject: "tasawwuf", title: { ms: "Kitab Bidayah al-Hidayah — Imam al-Ghazali", en: "Bidayah al-Hidayah — Imam al-Ghazali" },
      note: { ms: "Kuliah Sabtu · Masjid Hajjah Fatimah · senarai main YouTube", en: "Saturday class · Masjid Hajjah Fatimah · YouTube playlist" },
      url: "https://www.youtube.com/playlist?list=PLirHDhLxYck45rszF3K5VVur8JN-PZF12" },
    { subject: "fiqh", title: { ms: "Kitab al-Risalah al-Jami'ah", en: "Al-Risalah al-Jami'ah" },
      note: { ms: "Kuliah Isnin · saluran YouTube Masjid Malabar", en: "Monday class · Masjid Malabar YouTube channel" },
      url: "https://www.youtube.com/@masjidmalabar" },
    { subject: "tasawwuf", title: { ms: "Kitab Siyarus Salikin (Juz 4)", en: "Siyar al-Salikin (Vol. 4)" },
      note: { ms: "Kuliah Selasa · saluran YouTube Masjid Mydin", en: "Tuesday class · Masjid Mydin YouTube channel" },
      url: "https://www.youtube.com/@MasjidMydin" },
    { subject: "tasawwuf", title: { ms: "Kitab Kurnia Rabbani Limpahan Rahmani", en: "Kurnia Rabbani Limpahan Rahmani" },
      note: { ms: "Kuliah Selasa · saluran YouTube Masjid Kassim", en: "Tuesday class · Masjid Kassim YouTube channel" },
      url: "https://www.youtube.com/@MasjidKassim" },
    { subject: "tauhid", title: { ms: "Pengajian Asas Ilmu Tauhid", en: "Foundations of Tauhid" },
      note: { ms: "3 sesi · Kursus Lanjutan Tingkatan 1", en: "3 sessions · Advanced Course Level 1" }, url: "" }
  ]
};

/* Testimonials: { name, ms, en }. Shown on the About page once at least one is added. */
const TESTIMONIALS = [];

/* Photo gallery on the About page */
const GALLERY = [
  { src: "assets/community.jpg", ms: "Majlis Khataman Kursus Tanwirul Qulub (Kohort 1 & 2), 19 Sep 2026", en: "Khataman of the Tanwir al-Qulub course (Cohorts 1 & 2), 19 Sep 2026" },
  { src: "assets/certificates.jpg", ms: "Sijil Penyertaan bagi setiap marhalah", en: "Certificates of Participation for each marhalah" }
];

/* Frequently asked questions */
const FAQ = [
  { q: { ms: "Perlukah saya mendaftar untuk kuliah di masjid?", en: "Do I need to register for the mosque classes?" },
    a: { ms: "Tidak. Kuliah mingguan dan bulanan di masjid terbuka kepada orang ramai, datang sahaja. Lihat Jadual Kelas untuk hari, masa dan tempat.", en: "No. The weekly and monthly mosque classes are open to the public, just come along. See the Class Schedule for days, times and venues." }, link: "classes.html" },
  { q: { ms: "Apakah beza kuliah masjid dengan kursus berstruktur?", en: "How are the mosque classes different from the structured courses?" },
    a: { ms: "Kursus berstruktur mengikut silibus 14 marhalah, disertakan buku dan nota, rakaman untuk ulang kaji dan sijil penyertaan. Kursus memerlukan pendaftaran dan yuran.", en: "Structured courses follow the 14-stage syllabus and come with a book and notes, recordings for revision and a certificate. They need registration and a fee." }, link: "syllabus.html" },
  { q: { ms: "Siapa boleh menyertai kursus?", en: "Who can join a course?" },
    a: { ms: "Terbuka kepada muslimin dan muslimat. Jika tidak pasti marhalah mana untuk bermula, hubungi kami melalui WhatsApp.", en: "Open to both men and women. If you're unsure which stage to start from, contact us on WhatsApp." } },
  { q: { ms: "Bagaimana cara mendaftar dan membayar?", en: "How do I register and pay?" },
    a: { ms: "Pergi ke halaman Kursus, tekan \"Daftar Sekarang\" dan isi borang. Imbas kod QR PayNow (jumlah dan rujukan sudah dimasukkan), kemudian muat naik tangkapan skrin halaman 'Successful' daripada aplikasi bank anda.", en: "Go to the Courses page, tap \"Register Now\" and fill in the form. Scan the PayNow QR code (amount and reference already filled in), then upload a screenshot of the 'Successful' page from your banking app." }, link: "courses.html" },
  { q: { ms: "Mengapa pendaftaran saya \"Tidak Berjaya\"?", en: "Why does it say my registration was \"Unsuccessful\"?" },
    a: { ms: "Tangkapan skrin mesti menunjukkan halaman 'Successful' daripada aplikasi bank dengan jumlah yang betul, nombor rujukan TMF anda dan tarikh hari ini. Bayar dengan mengimbas kod QR dalam borang supaya rujukan dimasukkan, dan jangan potong maklumat tersebut. Jika masih tidak berjaya, WhatsApp kami tangkapan skrin anda.", en: "The screenshot must show your bank's 'Successful' page with the right amount, your TMF reference and today's date. Pay by scanning the QR code in the form so the reference is included, and don't crop these details. If it still fails, WhatsApp us your screenshot." } },
  { q: { ms: "Saya tersilap bayar atau terbayar dua kali.", en: "I paid the wrong amount or paid twice." },
    a: { ms: "Jangan risau. Hubungi kami melalui WhatsApp bersama tangkapan skrin bayaran, dan kami akan menguruskannya.", en: "Don't worry. Contact us on WhatsApp with your payment screenshot and we'll sort it out." } },
  { q: { ms: "Bagaimana saya menyertai grup WhatsApp kursus?", en: "How do I join the course WhatsApp group?" },
    a: { ms: "Selepas pendaftaran berjaya, butang \"Sertai Grup WhatsApp\" dipaparkan di skrin dan juga dalam e-mel \"Pendaftaran Berjaya\". Semak folder Spam jika e-mel tidak diterima.", en: "After a successful registration, a \"Join WhatsApp Group\" button appears on screen and in the \"Registration Successful\" email. Check your Spam folder if the email hasn't arrived." } },
  { q: { ms: "Adakah rakaman kelas disediakan?", en: "Are classes recorded?" },
    a: { ms: "Ya. Rakaman pengajian kursus disediakan untuk ulang kaji.", en: "Yes. Course sessions are recorded for revision." }, link: "rakaman.html" },
  { q: { ms: "Adakah sijil diberikan?", en: "Is a certificate given?" },
    a: { ms: "Sijil Penyertaan diberikan setiap kali selesai sebuah marhalah, InsyaAllah.", en: "A Certificate of Participation is given on completing each marhalah, InsyaAllah." } },
  { q: { ms: "Bagaimana data peribadi saya digunakan?", en: "How is my personal data used?" },
    a: { ms: "Data anda digunakan hanya untuk menguruskan pendaftaran dan kursus anda. Baca Notis Privasi kami untuk butiran.", en: "Your data is only used to manage your registration and courses. See our Privacy Notice for details." }, link: "privacy.html" }
];

/* Privacy notice (PDPA), shown on privacy.html */
const PRIVACY = {
  updated: "2026-10-24",
  sections: [
    { h: { ms: "Siapa kami", en: "Who we are" },
      p: { ms: "TM Fouzy Education Centre (\"TMFEC\", \"kami\") ialah pusat pengajian Islam di Singapura. Notis ini menerangkan bagaimana kami mengumpul, menggunakan dan melindungi data peribadi anda selaras dengan Akta Perlindungan Data Peribadi 2012 (PDPA) Singapura.",
           en: "TM Fouzy Education Centre (\"TMFEC\", \"we\") is an Islamic learning centre in Singapore. This notice explains how we collect, use and protect your personal data in line with Singapore's Personal Data Protection Act 2012 (PDPA)." } },
    { h: { ms: "Data yang kami kumpul", en: "What we collect" },
      p: { ms: "Apabila anda mendaftar kursus: nama penuh, nombor telefon (WhatsApp), alamat e-mel, jantina, sama ada anda pernah menyertai kursus TMFEC, nama pada akaun bank pembayar, tangkapan skrin bayaran, nombor rujukan pendaftaran, serta catatan yang anda berikan. Laman web ini tidak menggunakan kuki pengiklanan atau penjejakan.",
           en: "When you register for a course: full name, phone number (WhatsApp), email address, gender, whether you have joined a TMFEC course before, the name on the paying bank account, your payment screenshot, your registration reference, and any notes you give us. This website does not use advertising or tracking cookies." } },
    { h: { ms: "Tujuan penggunaan", en: "Why we use it" },
      p: { ms: "Untuk memproses dan mengesahkan pendaftaran dan bayaran anda; menghubungi anda mengenai kursus (termasuk e-mel pengesahan dan peringatan kelas); menjemput anda ke grup WhatsApp kursus; mengeluarkan sijil penyertaan; dan menyimpan rekod pengajian anda supaya kami dapat memaklumkan marhalah seterusnya.",
           en: "To process and verify your registration and payment; contact you about your course (including confirmation emails and class reminders); invite you to the course WhatsApp group; issue certificates; and keep a record of your studies so we can let you know about the next stage." } },
    { h: { ms: "Penyimpanan & keselamatan", en: "Storage & security" },
      p: { ms: "Data disimpan dalam Google Sheets dan Google Drive TMFEC, yang hanya boleh diakses oleh pentadbir TMFEC. Kami menyimpan data selagi perlu untuk tujuan di atas dan rekod pentadbiran, kemudian memadamnya.",
           en: "Your data is stored in TMFEC's Google Sheets and Google Drive, accessible only to TMFEC administrators. We keep it for as long as needed for the purposes above and our records, and then delete it." } },
    { h: { ms: "Pendedahan", en: "Disclosure" },
      p: { ms: "Kami tidak menjual atau menyewakan data anda, dan tidak mendedahkannya kepada pihak lain kecuali dengan persetujuan anda atau jika dikehendaki oleh undang-undang.",
           en: "We do not sell or rent your data, and do not disclose it to others except with your consent or where required by law." } },
    { h: { ms: "Hak anda", en: "Your rights" },
      p: { ms: "Anda boleh meminta untuk melihat atau membetulkan data anda, atau menarik balik persetujuan (contohnya berhenti menerima makluman). Menarik balik persetujuan mungkin bermakna kami tidak dapat meneruskan pendaftaran anda.",
           en: "You may ask to access or correct your data, or withdraw your consent (for example, to stop receiving updates). Withdrawing consent may mean we cannot continue your registration." } },
    { h: { ms: "Hubungi kami", en: "Contact us" },
      p: { ms: "Untuk sebarang pertanyaan mengenai data peribadi anda, hubungi TMFEC melalui WhatsApp di +65 8455 9430.",
           en: "For any questions about your personal data, contact TMFEC on WhatsApp at +65 8455 9430." } }
  ]
};

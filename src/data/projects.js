import work1 from "../assets/accounting.png";
import work2 from "../assets/Sans.jpeg";
import work3 from "../assets/vision.png";
import handCricket from "../assets/hand cricket.png";
import kbc from "../assets/kbc.png";
import kbc_q from "../assets/kbc q.png";
import ludo from "../assets/ludo.png";
import snake from "../assets/snake.png";
import tagger from "../assets/tagger.png";
import rfid from "../assets/RFID attendance.png";
import upp from "../assets/upp.jfif";
import lex from "../assets/lex.jpeg";
import startImg from "../assets/start.png";
import emailImg from "../assets/email.png";
import calculator from "../assets/calculator.png";
import trivia from "../assets/Trivia.jpg";

const projects = [
  {
    slug: "accounting",
    title: "Utkarsh Accounting System",
    description: "Inventory management and accounting desktop application.",
    images: [work1],
    external: "https://github.com/Utkarshagrawal1906/Accounting",
    tags: ["Desktop Application","Java","SQLite","Android"],
  },
  {
    slug: "sanskrit-dictionary",
    title: "Sanskrit-Hin-Eng Dictonary",
    description: "English–Hindi–Sanskrit dictionary (Android app).",
    images: [work2],
    external: "https://play.google.com/store/apps/details?id=com.utkarsh.sanskritdictonary&hl=en_IN",
    tags: ["Android","Java"],
  },
  {
    slug: "vision",
    title: "Desktop Voice Assistant: Vision",
    description: "Personal voice assistant built for desktop (Vision).",
    images: [work3],
    external: "https://github.com/Utkarshagrawal1906/Vision1",
    tags: ["Desktop Application", "AI","Python"],
  },
  {
    slug: "hand-cricket",
    title: "Hand Cricket",
    description: "Simple hand cricket game against the computer.",
    images: [handCricket],
    external: "https://github.com/Utkarshagrawal1906/hand-cricket",
    tags: ["Desktop Application","Java"],
  },
  {
    slug: "ludo",
    title: "Ludo",
    description: "Desktop Ludo game.",
    images: [ludo],
    external: "https://github.com/Utkarshagrawal1906/ludo",
    tags: ["Desktop Application","Java"],
  },
  {
    slug: "snake",
    title: "Snake Game",
    description: "Classic snake game.",
    images: [snake],
    external: "https://github.com/Utkarshagrawal1906/snake",
    tags: ["Desktop Application","Python"],
  },
  {
    slug: "tagger",
    title: "Tagging System",
    description: "Tool to tag system files for fast searching.",
    images: [tagger],
    external: "#",
    tags: ["Desktop Application","Java"],
  },
  {
    slug: "rfid",
    title: "RFID Attendance",
    description: "Attendance management using RFID.",
    images: [rfid],
    external: "#",
    tags: ["Desktop Application","Java"],
  },
  {
    slug: "upp",
    title: "UPP",
    description: "UPP project repository and screenshot.",
    images: [upp],
    external: "https://github.com/Utkarshagrawal1906/UPP",
    tags: ["Web","JavaScript"],
  },
  {
    slug: "lex-chatbot",
    title: "Doctor Appointment ChatBot",
    description: "ChatBot built on Amazon Lex for appointment booking.",
    images: [lex],
    external: "#",
    tags: ["cloud", "AI","AWS"],
  },
  {
    slug: "start",
    title: "Start",
    description: "Desktop startup application.",
    images: [startImg],
    external: "#",
    tags: ["desktop application","Java"],
  },
  {
    slug: "emailer",
    title: "Emailer",
    description: "Java email-sending application.",
    images: [emailImg],
    external: "#",
    tags: ["desktop application","Java"],
  },
  {
    slug: "calculator",
    title: "Desktop Calculator",
    description: "Advanced calculator for programmers.",
    images: [calculator],
    external: "#",
    tags: ["desktop application","Java"],
  },
  {
    slug: "trivia",
    title: "Quiz (Trivia)",
    description: "Small Android quiz app with animations.",
    images: [trivia],
    external: "#",
    tags: ["Android","Java"],
  },
  {
    slug: "KBC Game",
    title: "KBC Game",
    description: "KBC Game screenshot.",
    images: [kbc, kbc_q],
    external: "#",
    tags: ["Desktop Application","Java","MySQL"],
  },
];

export default projects;

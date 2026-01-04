import work1 from "../assets/accounting.png";
import work2 from "../assets/Sans.jpeg";
import work3 from "../assets/vision.png";
import handCricket from "../assets/hand cricket.png";
import kbc from "../assets/kbc q.png";
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
  },
  {
    slug: "sanskrit-dictionary",
    title: "Sanskrit-Hin-Eng Dictonary",
    description: "English–Hindi–Sanskrit dictionary (Android app).",
    images: [work2, kbc],
    external: "https://play.google.com/store/apps/details?id=com.utkarsh.sanskritdictonary&hl=en_IN",
  },
  {
    slug: "vision",
    title: "Desktop Voice Assistant: Vision",
    description: "Personal voice assistant built for desktop (Vision).",
    images: [work3],
    external: "https://github.com/Utkarshagrawal1906/Vision1",
  },
  {
    slug: "hand-cricket",
    title: "Hand Cricket",
    description: "Simple hand cricket game against the computer.",
    images: [handCricket],
    external: "https://github.com/Utkarshagrawal1906/hand-cricket",
  },
  {
    slug: "ludo",
    title: "Ludo",
    description: "Desktop Ludo game.",
    images: [ludo],
    external: "https://github.com/Utkarshagrawal1906/ludo",
  },
  {
    slug: "snake",
    title: "Snake Game",
    description: "Classic snake game.",
    images: [snake],
    external: "https://github.com/Utkarshagrawal1906/snake",
  },
  {
    slug: "tagger",
    title: "Tagging System",
    description: "Tool to tag system files for fast searching.",
    images: [tagger],
    external: "#",
  },
  {
    slug: "rfid",
    title: "RFID Attendance",
    description: "Attendance management using RFID.",
    images: [rfid],
    external: "#",
  },
  {
    slug: "upp",
    title: "UPP",
    description: "UPP project repository and screenshot.",
    images: [upp],
    external: "https://github.com/Utkarshagrawal1906/UPP",
  },
  {
    slug: "lex-chatbot",
    title: "Doctor Appointment ChatBot",
    description: "ChatBot built on Amazon Lex for appointment booking.",
    images: [lex],
    external: "#",
  },
  {
    slug: "start",
    title: "Start",
    description: "Desktop startup application.",
    images: [startImg],
    external: "#",
  },
  {
    slug: "emailer",
    title: "Emailer",
    description: "Java email-sending application.",
    images: [emailImg],
    external: "#",
  },
  {
    slug: "calculator",
    title: "Desktop Calculator",
    description: "Advanced calculator for programmers.",
    images: [calculator],
    external: "#",
  },
  {
    slug: "trivia",
    title: "Quiz (Trivia)",
    description: "Small Android quiz app with animations.",
    images: [trivia],
    external: "#",
  },
  {
    slug: "sanskrit-image",
    title: "Sanskrit Dictionary (image)",
    description: "Sanskrit dictionary preview image.",
    images: [kbc],
    external: "#",
  },
];

export default projects;

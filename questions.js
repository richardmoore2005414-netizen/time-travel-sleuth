/**
 * Time-Travel Sleuth — Question Bank
 * ----------------------------------
 * Replace or expand this array with your Gemini Pro–generated questions.
 * Each question object must follow this shape:
 *
 * {
 *   question: "The question text",
 *   options: ["Option A", "Option B", "Option C", "Option D"],
 *   correct: 0,   // 0-based index of the correct option
 *   explanation: "Optional short explanation shown after answer (optional)"
 * }
 *
 * Tip: Keep options short for mobile. Aim for 8–15 questions per run.
 */

const QUESTIONS = [
  {
    question: "In which year did the first successful powered flight by the Wright brothers take place?",
    options: ["1899", "1903", "1912", "1908"],
    correct: 1,
    explanation: "Orville and Wilbur Wright achieved the first powered flight on December 17, 1903, at Kitty Hawk."
  },
  {
    question: "Who was the British Prime Minister during most of World War II?",
    options: ["Neville Chamberlain", "Clement Attlee", "Winston Churchill", "Stanley Baldwin"],
    correct: 2,
    explanation: "Winston Churchill led Britain from 1940 to 1945 (and again later)."
  },
  {
    question: "The ancient city of Pompeii was buried by the eruption of which volcano?",
    options: ["Etna", "Vesuvius", "Stromboli", "Olympus"],
    correct: 1,
    explanation: "Mount Vesuvius erupted in 79 AD, preserving Pompeii under ash."
  },
  {
    question: "Which explorer is credited with the first circumnavigation of the globe?",
    options: ["Christopher Columbus", "Vasco da Gama", "Ferdinand Magellan", "James Cook"],
    correct: 2,
    explanation: "Magellan's expedition (1519–1522) completed the first circumnavigation, though Magellan himself died en route."
  },
  {
    question: "The Declaration of Independence of the United States was adopted in which year?",
    options: ["1770", "1776", "1783", "1787"],
    correct: 1,
    explanation: "The Continental Congress adopted the Declaration on July 4, 1776."
  },
  {
    question: "Which ancient wonder was located in the city of Babylon?",
    options: ["Colossus of Rhodes", "Hanging Gardens", "Lighthouse of Alexandria", "Statue of Zeus"],
    correct: 1,
    explanation: "The Hanging Gardens of Babylon are one of the Seven Wonders of the Ancient World."
  },
  {
    question: "Who painted the ceiling of the Sistine Chapel?",
    options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
    correct: 2,
    explanation: "Michelangelo painted the Sistine Chapel ceiling between 1508 and 1512."
  },
  {
    question: "The Titanic sank on its maiden voyage in which year?",
    options: ["1905", "1912", "1918", "1923"],
    correct: 1,
    explanation: "RMS Titanic struck an iceberg and sank on April 15, 1912."
  },
  {
    question: "Which Chinese dynasty is famous for beginning construction of the Great Wall?",
    options: ["Han", "Tang", "Qin", "Ming"],
    correct: 2,
    explanation: "The first emperor of the Qin dynasty (Qin Shi Huang) ordered the linking of existing walls."
  },
  {
    question: "In Greek mythology, who was the messenger of the gods?",
    options: ["Apollo", "Hermes", "Ares", "Hephaestus"],
    correct: 1,
    explanation: "Hermes was the swift messenger god, often depicted with winged sandals."
  }
];

// Export for the game engine (browser global)
if (typeof window !== 'undefined') {
  window.QUESTIONS = QUESTIONS;
}

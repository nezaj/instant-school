interface FunnyQuestion {
  id: number;
  text: string;
}

interface FunnyAnswer {
  question_id: number;
  text: string;
}

const funnyQuestions: FunnyQuestion[] = [
  { id: 1, text: "If you were a vegetable, what vegetable would you be and why?" },
  { id: 2, text: "If you could have any superpower, but it had to be completely useless, what would it be?" },
  { id: 3, text: "If animals could talk, which species would be the rudest?" },
  { id: 4, text: "If you could only eat one food for the rest of your life, what would it be and why?" },
  { id: 5, text: "If you could switch lives with any fictional character for a day, who would it be?" }
];

const funnyAnswers: FunnyAnswer[] = [
  { question_id: 1, text: "I'd be a potato because I'm versatile and I like to chill." },
  { question_id: 1, text: "I'd be a carrot so I could see in the dark and have great vision." },
  { question_id: 1, text: "I'd be an avocado because everyone wants me around, but they don't really know why." },
  { question_id: 1, text: "I'd be a chili pepper because I like to spice things up." },
  { question_id: 1, text: "I'd be a cucumber because I'm cool, refreshing, and slightly awkward." },

  { question_id: 2, text: "I'd have the power to perfectly parallel park every time." },
  { question_id: 2, text: "I'd have the ability to make my hair look perfect in any weather condition." },
  { question_id: 2, text: "I'd have the power to make traffic lights always turn green as soon as I approach." },
  { question_id: 2, text: "I'd have the ability to refill anything instantly, like my coffee cup or my bank account." },
  { question_id: 2, text: "I'd have the power to make people sneeze on command." },

  { question_id: 3, text: "Cats, no doubt. They already give us attitude without speaking." },
  { question_id: 3, text: "Geese. Have you ever seen how they act at the park?" },
  { question_id: 3, text: "Squirrels. They're always chattering and seem like they'd have some snarky comments." },
  { question_id: 3, text: "Seagulls. They'd probably just yell 'Mine!' over and over." },
  { question_id: 3, text: "Chihuahuas. They're tiny and feisty, just like their comments would be." },

  { question_id: 4, text: "Pizza, because it's like a food group all on its own." },
  { question_id: 4, text: "Tacos, because they're versatile enough to have different varieties every day." },
  { question_id: 4, text: "Sushi, because it's healthy, delicious, and there's so much variety." },
  { question_id: 4, text: "Chocolate, because life without chocolate is just dull." },
  { question_id: 4, text: "Ice cream, because it's the solution to all of life's problems." },

  { question_id: 5, text: "I'd be Iron Man so I could experience being a genius billionaire playboy philanthropist." },
  { question_id: 5, text: "I'd be Hermione Granger so I could use magic to solve all my problems." },
  { question_id: 5, text: "I'd be Spider-Man so I could swing through the city and fight crime." },
  { question_id: 5, text: "I'd be the Doctor from Doctor Who so I could travel through time and space in the TARDIS." },
  { question_id: 5, text: "I'd be Batman so I could brood in the Batcave and drive the Batmobile." }
];

export function randomQuestion(): string {
  const randomIndex = Math.floor(Math.random() * funnyQuestions.length);
  return funnyQuestions[randomIndex].text;
}

export function getRandomFunnyAnswer(questionText: string): string {
  const filteredAnswers = funnyAnswers.filter(answer => answer.question_id === funnyQuestions.find(question => question.text === questionText)?.id);
  const randomIndex = Math.floor(Math.random() * filteredAnswers.length);
  return filteredAnswers[randomIndex].text;
}

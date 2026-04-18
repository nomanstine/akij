const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const tests = [
  {
    title: "Psychometric Test for Management Trainee Officer",
    duration: "1 min",
    questionCount: 3,
    negativeMarking: "-0.25/wrong",
    candidates: "10,000",
    questionSets: "3",
    examSlots: "3",
    questionTypes: JSON.stringify(["Multiple Choice", "Personality", "Essay"]),
    questions: {
      create: [
        {
          text: "Q1. Which personality trait is most associated with leadership readiness?",
          type: "radio",
          points: 1,
          options: {
            create: [
              { text: "Empathy", isCorrect: false },
              { text: "Resilience", isCorrect: true },
              { text: "Introversion", isCorrect: false },
              { text: "Impulsiveness", isCorrect: false }
            ]
          }
        },
        {
          text: "Q2. How would you describe your reaction to unexpected feedback?",
          type: "rich-text",
          points: 5,
          correctAnswer: "Ideal keywords: Receptive, Adaptive, Professional"
        },
        {
          text: "Q3. Which of the following is an example of strong analytical reasoning?",
          type: "checkbox",
          points: 2,
          options: {
            create: [
              { text: "Guessing the outcome", isCorrect: false },
              { text: "Using data to support a conclusion", isCorrect: true },
              { text: "Evaluating different patterns", isCorrect: true },
              { text: "Following routine steps blindly", isCorrect: false }
            ]
          }
        }
      ]
    }
  },
  {
    title: "Technical Assessment for Software Engineers",
    duration: "45 min",
    questionCount: 2,
    negativeMarking: "-0.33/wrong",
    candidates: "Not Set",
    questionSets: "Not Set",
    examSlots: "Not Set",
    questionTypes: JSON.stringify(["Multiple Choice", "Coding", "Essay"]),
    questions: {
      create: [
        {
          text: "Q1. What is the primary benefit of using a typed language like TypeScript?",
          type: "radio",
          points: 1,
          options: {
            create: [
              { text: "Faster runtime performance", isCorrect: false },
              { text: "Improved developer tooling and safety", isCorrect: true },
              { text: "Smaller bundle size", isCorrect: false },
              { text: "Automatic memory management", isCorrect: false }
            ]
          }
        },
        {
          text: "Q2. Explain how you would approach debugging a failing production build.",
          type: "rich-text",
          points: 5,
        }
      ]
    }
  },
  {
    title: "General Knowledge Test",
    duration: "25 min",
    questionCount: 2,
    negativeMarking: "No",
    candidates: "10,000",
    questionSets: "3",
    examSlots: "3",
    questionTypes: JSON.stringify(["Multiple Choice", "Short Answer"]),
    questions: {
      create: [
        {
          text: "Q1. Which country is known as the Land of the Rising Sun?",
          type: "radio",
          points: 1,
          options: {
            create: [
              { text: "China", isCorrect: false },
              { text: "Japan", isCorrect: true },
              { text: "South Korea", isCorrect: false },
              { text: "Thailand", isCorrect: false }
            ]
          }
        },
        {
          text: "Q2. Name one major river that flows through Bangladesh.",
          type: "rich-text",
          points: 2,
        }
      ]
    }
  },
  {
    title: "Aptitude Test for Graduates",
    duration: "40 min",
    questionCount: 2,
    negativeMarking: "-0.25/wrong",
    candidates: "5,000",
    questionSets: "2",
    examSlots: "2",
    questionTypes: JSON.stringify(["Multiple Choice", "Written Response"]),
    questions: {
      create: [
        {
          text: "Q1. What is 15% of 200?",
          type: "radio",
          points: 1,
          options: {
            create: [
              { text: "25", isCorrect: false },
              { text: "30", isCorrect: true },
              { text: "35", isCorrect: false },
              { text: "40", isCorrect: false }
            ]
          }
        },
        {
          text: "Q2. Describe the steps you would take to solve a logical reasoning problem under time pressure.",
          type: "rich-text",
          points: 4,
        }
      ]
    }
  }
];

const independentQuestions = [
  {
    text: "Q1. Which of the following indicators is used to measure market volatility?",
    type: "radio",
    points: 1,
    options: {
      create: [
        { text: "Relative Strength Index (RSI)" },
        { text: "Moving Average Convergence Divergence (MACD)" },
        { text: "Bollinger Bands", isCorrect: true },
        { text: "Fibonacci Retracement" }
      ]
    }
  },
  {
    text: "Q2. What does RSI stand for?",
    type: "radio",
    points: 1,
    options: {
      create: [
        { text: "Relative Strength Indicator" },
        { text: "Relative Strength Index", isCorrect: true },
        { text: "Relative Speed Indicator" },
        { text: "Relative Strength Oscillator" }
      ]
    }
  },
];

async function main() {
  console.log('Seeding the database...');

  // Create explicit users
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      email: 'admin@demo.com',
      name: 'Demo Admin',
      password: adminPassword,
      role: 'admin',
    },
  });

  const userPassword = await bcrypt.hash('user123', 10);
  await prisma.user.upsert({
    where: { email: 'user@demo.com' },
    update: {},
    create: {
      email: 'user@demo.com',
      name: 'Demo Candidate',
      password: userPassword,
      role: 'user',
    },
  });

  for (const test of tests) {
    await prisma.test.create({
      data: test,
    });
  }

  for (const q of independentQuestions) {
    await prisma.question.create({
      data: q,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

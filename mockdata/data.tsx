import { QuestionOption, Question } from '@/lib/schemas';

export interface Test {
  id: number;
  title: string;
  duration: string;
  questionCount: number;
  negativeMarking: string;
  candidates: string;
  questionSets: string;
  examSlots: string;
  questionTypes: string[];
  questions: Question[];
}

export const tests: Test[] = [
	{
		id: 1,
		title: "Psychometric Test for Management Trainee Officer",
		duration: "1 min",
		questionCount: 3,
		negativeMarking: "-0.25/wrong",
		candidates: "10,000",
		questionSets: "3",
		examSlots: "3",
		questionTypes: ["Multiple Choice", "Personality", "Essay"],
		questions: [
			{
				id: '1',
				text: 'Q1. Which personality trait is most associated with leadership readiness?',
				type: 'radio',
				points: 1,
				options: [
					{ id: 'a', text: 'Empathy', isCorrect: false },
					{ id: 'b', text: 'Resilience', isCorrect: true },
					{ id: 'c', text: 'Introversion', isCorrect: false },
					{ id: 'd', text: 'Impulsiveness', isCorrect: false }
				]
			},
			{
				id: '2',
				text: 'Q2. How would you describe your reaction to unexpected feedback?',
				type: 'text',
				points: 5,
				correctAnswer: "Ideal keywords: Receptive, Adaptive, Professional"
			},
			{
				id: '3',
				text: 'Q3. Which of the following is an example of strong analytical reasoning?',
				type: 'checkbox',
				points: 2,
				options: [
					{ id: 'a', text: 'Guessing the outcome', isCorrect: false },
					{ id: 'b', text: 'Using data to support a conclusion', isCorrect: true },
					{ id: 'c', text: 'Evaluating different patterns', isCorrect: true },
					{ id: 'd', text: 'Following routine steps blindly', isCorrect: false }
				]
			}
		]
	},
	{
		id: 2,
		title: "Technical Assessment for Software Engineers",
		duration: "45 min",
		questionCount: 2,
		negativeMarking: "-0.33/wrong",
		candidates: "Not Set",
		questionSets: "Not Set",
		examSlots: "Not Set",
		questionTypes: ["Multiple Choice", "Coding", "Essay"],
		questions: [
			{
				id: '1',
				text: 'Q1. What is the primary benefit of using a typed language like TypeScript?',
				type: 'multiple-choice',
				options: [
					{ id: 'a', text: 'Faster runtime performance' },
					{ id: 'b', text: 'Improved developer tooling and safety' },
					{ id: 'c', text: 'Smaller bundle size' },
					{ id: 'd', text: 'Automatic memory management' }
				]
			},
			{
				id: '2',
				text: 'Q2. Explain how you would approach debugging a failing production build.',
				type: 'rich-text'
			}
		]
	},
	{
		id: 3,
		title: "General Knowledge Test",
		duration: "25 min",
		questionCount: 2,
		negativeMarking: "No",
		candidates: "10,000",
		questionSets: "3",
		examSlots: "3",
		questionTypes: ["Multiple Choice", "Short Answer"],
		questions: [
			{
				id: '1',
				text: 'Q1. Which country is known as the Land of the Rising Sun?',
				type: 'multiple-choice',
				options: [
					{ id: 'a', text: 'China' },
					{ id: 'b', text: 'Japan' },
					{ id: 'c', text: 'South Korea' },
					{ id: 'd', text: 'Thailand' }
				]
			},
			{
				id: '2',
				text: 'Q2. Name one major river that flows through Bangladesh.',
				type: 'rich-text'
			}
		]
	},
	{
		id: 4,
		title: "Aptitude Test for Graduates",
		duration: "40 min",
		questionCount: 2,
		negativeMarking: "-0.25/wrong",
		candidates: "5,000",
		questionSets: "2",
		examSlots: "2",
		questionTypes: ["Multiple Choice", "Written Response"],
		questions: [
			{
				id: '1',
				text: 'Q1. What is 15% of 200?',
				type: 'multiple-choice',
				options: [
					{ id: 'a', text: '25' },
					{ id: 'b', text: '30' },
					{ id: 'c', text: '35' },
					{ id: 'd', text: '40' }
				]
			},
			{
				id: '2',
				text: 'Q2. Describe the steps you would take to solve a logical reasoning problem under time pressure.',
				type: 'rich-text'
			}
		]
	},
];

export const mockQuestions: Question[] = [
  {
    id: '1',
    text: 'Q1. Which of the following indicators is used to measure market volatility?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Relative Strength Index (RSI)' },
      { id: 'b', text: 'Moving Average Convergence Divergence (MACD)' },
      { id: 'c', text: 'Bollinger Bands' },
      { id: 'd', text: 'Fibonacci Retracement' }
    ]
  },
  {
    id: '2',
    text: 'Q2. What does RSI stand for?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Relative Strength Indicator' },
      { id: 'b', text: 'Relative Strength Index' },
      { id: 'c', text: 'Relative Speed Indicator' },
      { id: 'd', text: 'Relative Strength Oscillator' }
    ]
  },
  {
    id: '3',
    text: 'Q3. MACD stands for?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Moving Average Convergence Divergence' },
      { id: 'b', text: 'Moving Average Cross Divergence' },
      { id: 'c', text: 'Momentum Average Convergence Divergence' },
      { id: 'd', text: 'Moving Average Convergence Difference' }
    ]
  },
  {
    id: '4',
    text: 'Q4. What is the primary purpose of Fibonacci Retracement?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'To measure volatility' },
      { id: 'b', text: 'To identify potential support and resistance levels' },
      { id: 'c', text: 'To show momentum' },
      { id: 'd', text: 'To calculate moving averages' }
    ]
  },
  {
    id: '5',
    text: 'Q5. Which indicator is commonly used to identify overbought or oversold conditions?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Bollinger Bands' },
      { id: 'b', text: 'Fibonacci Retracement' },
      { id: 'c', text: 'RSI' },
      { id: 'd', text: 'MACD' }
    ]
  },
  {
    id: '6',
    text: 'Q6. Bollinger Bands consist of?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Two moving averages' },
      { id: 'b', text: 'A moving average and two standard deviation bands' },
      { id: 'c', text: 'Three exponential moving averages' },
      { id: 'd', text: 'Fibonacci levels' }
    ]
  },
  {
    id: '7',
    text: 'Q7. MACD is calculated as the difference between?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Two simple moving averages' },
      { id: 'b', text: 'Fast and slow exponential moving averages' },
      { id: 'c', text: 'Bollinger Bands' },
      { id: 'd', text: 'RSI and Fibonacci' }
    ]
  },
  {
    id: '8',
    text: 'Q8. What is the default period for calculating RSI?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: '10' },
      { id: 'b', text: '14' },
      { id: 'c', text: '20' },
      { id: 'd', text: '30' }
    ]
  },
  {
    id: '9',
    text: 'Q9. Fibonacci Retracement levels typically include?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: '10%, 20%, 30%' },
      { id: 'b', text: '23.6%, 38.2%, 50%, 61.8%' },
      { id: 'c', text: '50%, 75%, 100%' },
      { id: 'd', text: '5%, 15%, 25%' }
    ]
  },
  {
    id: '10',
    text: 'Q10. Which of the following is a momentum oscillator?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Bollinger Bands' },
      { id: 'b', text: 'Fibonacci Retracement' },
      { id: 'c', text: 'RSI' },
      { id: 'd', text: 'Moving Average' }
    ]
  },
  {
    id: '11',
    text: 'Q11. Bollinger Bands were developed by?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'John Bollinger' },
      { id: 'b', text: 'Gerald Appel' },
      { id: 'c', text: 'J. Welles Wilder' },
      { id: 'd', text: 'Leonardo Fibonacci' }
    ]
  },
  {
    id: '12',
    text: 'Q12. The MACD signal line is typically a?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Simple moving average' },
      { id: 'b', text: '9-period exponential moving average of MACD' },
      { id: 'c', text: 'Bollinger Band' },
      { id: 'd', text: 'Fibonacci level' }
    ]
  },
  {
    id: '13',
    text: 'Q13. RSI values range from?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: '-100 to 100' },
      { id: 'b', text: '0 to 100' },
      { id: 'c', text: '0 to 50' },
      { id: 'd', text: '50 to 100' }
    ]
  },
  {
    id: '14',
    text: 'Q14. The Fibonacci sequence is used in technical analysis for?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Calculating moving averages' },
      { id: 'b', text: 'Identifying retracement levels' },
      { id: 'c', text: 'Measuring volatility' },
      { id: 'd', text: 'Showing momentum' }
    ]
  },
  {
    id: '16',
    text: 'Q16. Describe your understanding of technical analysis and how indicators like RSI, MACD, Bollinger Bands, and Fibonacci Retracement can be used in trading decisions. Provide examples.',
    type: 'rich-text'
  }
];

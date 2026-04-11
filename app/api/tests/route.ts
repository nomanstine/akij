import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const tests = await prisma.test.findMany({
      include: {
        questions: {
          include: {
            options: true,
          }
        }
      }
    });

    const formattedTests = tests.map((test: any) => ({
      ...test,
      questionTypes: JSON.parse(test.questionTypes),
      questions: test.questions.map((q: any) => ({
        id: q.id,
        text: q.text,
        type: q.type,
        points: q.points,
        correctAnswer: q.correctAnswer,
        options: q.options.map((opt: any) => ({
          id: opt.id,
          text: opt.text,
          isCorrect: opt.isCorrect
        }))
      }))
    }));

    return NextResponse.json(formattedTests);
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch tests" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, duration, questionCount, negativeMarking, candidates, questionSets, examSlots, questionTypes, questions } = body;

    const test = await prisma.test.create({
      data: {
        title,
        duration,
        questionCount: parseInt(questionCount),
        negativeMarking,
        candidates,
        questionSets,
        examSlots,
        questionTypes: JSON.stringify(questionTypes),
        questions: {
          create: questions.map((q: any) => ({
            text: q.text,
            type: q.type,
            points: q.points || 1,
            correctAnswer: q.correctAnswer,
            options: {
              create: q.options.map((opt: any) => ({
                text: opt.text,
                isCorrect: opt.isCorrect || false
              }))
            }
          }))
        }
      },
      include: {
        questions: {
          include: {
            options: true
          }
        }
      }
    });

    return NextResponse.json(test, { status: 201 });
  } catch (error) {
    console.error("Database create error:", error);
    return NextResponse.json({ error: "Failed to create test" }, { status: 500 });
  }
}

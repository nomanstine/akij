import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      include: {
        options: true,
      }
    });

    const formattedQuestions = questions.map(q => ({
      id: q.id,
      text: q.text,
      type: q.type,
      points: q.points,
      correctAnswer: q.correctAnswer,
      options: q.options.map(opt => ({
        id: opt.id,
        text: opt.text,
        isCorrect: opt.isCorrect
      }))
    }));

    return NextResponse.json(formattedQuestions);
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, type, points, correctAnswer, options, testId } = body;

    const question = await prisma.question.create({
      data: {
        text,
        type,
        points: points || 1,
        correctAnswer,
        testId: testId ? parseInt(testId) : null,
        options: {
          create: options.map((opt: any) => ({
            text: opt.text,
            isCorrect: opt.isCorrect || false
          }))
        }
      },
      include: {
        options: true
      }
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error("Database create error:", error);
    return NextResponse.json({ error: "Failed to create question" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const test = await prisma.test.findUnique({
      where: { id: parseInt(id) },
      include: {
        questions: {
          include: {
            options: true
          }
        }
      }
    });

    if (!test) {
      return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }

    const formattedTest = {
      ...test,
      questionTypes: JSON.parse(test.questionTypes),
      questions: test.questions.map(q => ({
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
      }))
    };

    return NextResponse.json(formattedTest);
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch test" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, duration, questionCount, negativeMarking, candidates, questionSets, examSlots, questionTypes, questions } = body;

    // First, delete existing questions and options
    await prisma.questionOption.deleteMany({
      where: {
        question: {
          testId: parseInt(id)
        }
      }
    });

    await prisma.question.deleteMany({
      where: { testId: parseInt(id) }
    });

    // Update test and create new questions
    const test = await prisma.test.update({
      where: { id: parseInt(id) },
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

    return NextResponse.json(test);
  } catch (error) {
    console.error("Database update error:", error);
    return NextResponse.json({ error: "Failed to update test" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.test.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: "Test deleted successfully" });
  } catch (error) {
    console.error("Database delete error:", error);
    return NextResponse.json({ error: "Failed to delete test" }, { status: 500 });
  }
}
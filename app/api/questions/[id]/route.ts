import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const question = await prisma.question.findUnique({
      where: { id: params.id },
      include: {
        options: true
      }
    });

    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    const formattedQuestion = {
      id: question.id,
      text: question.text,
      type: question.type,
      points: question.points,
      correctAnswer: question.correctAnswer,
      options: question.options.map(opt => ({
        id: opt.id,
        text: opt.text,
        isCorrect: opt.isCorrect
      }))
    };

    return NextResponse.json(formattedQuestion);
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch question" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { text, type, points, correctAnswer, options } = body;

    // Delete existing options
    await prisma.questionOption.deleteMany({
      where: { questionId: params.id }
    });

    // Update question and create new options
    const question = await prisma.question.update({
      where: { id: params.id },
      data: {
        text,
        type,
        points: points || 1,
        correctAnswer,
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

    return NextResponse.json(question);
  } catch (error) {
    console.error("Database update error:", error);
    return NextResponse.json({ error: "Failed to update question" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.question.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Database delete error:", error);
    return NextResponse.json({ error: "Failed to delete question" }, { status: 500 });
  }
}
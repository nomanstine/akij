import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { answers } = body;

    // Here you would typically save the submission to a submissions table
    // For now, we'll just log it and return success
    console.log(`Submission received for test ${id}:`, answers);

    // You could create a submissions table in the future to store:
    // - testId
    // - userId (from session)
    // - answers (JSON)
    // - submittedAt
    // - score (calculated)

    return NextResponse.json({
      message: "Submission received successfully",
      testId: id,
      answerCount: answers?.length || 0
    });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json({ error: "Failed to submit test" }, { status: 500 });
  }
}
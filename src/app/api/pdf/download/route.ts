import { NextResponse } from 'next/server';
import { notes as serverNotes } from '@/data/notes';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const noteId = searchParams.get('id');

  if (!noteId) {
    return NextResponse.json(
      { success: false, error: 'PDF ID is required.' },
      { status: 400 }
    );
  }

  // Find note in server default data
  const note = serverNotes.find((n) => n.id === noteId);

  // Check if downloadable is explicitly set to false
  if (note && note.downloadable === false) {
    return NextResponse.json(
      {
        success: false,
        error: 'Download permission denied. The administrator has disabled downloading for this PDF.',
      },
      { status: 403 }
    );
  }

  // Generate downloadable file for valid/allowed downloads
  const noteTitle = note ? note.title : 'Technical Note';
  const content = `=== ${noteTitle} ===\n\nOfficial Notes Document from Prasanthi Views.\nAll rights reserved.\n\nThank you for choosing Prasanthi Views!`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': `attachment; filename="${noteTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}.txt"`,
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { noteId, downloadable } = body;

    if (!noteId) {
      return NextResponse.json({ success: false, error: 'Note ID required' }, { status: 400 });
    }

    if (downloadable === false) {
      return NextResponse.json(
        {
          success: false,
          error: 'Download permission denied. Downloading is disabled by the administrator.',
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      downloadUrl: `/api/pdf/download?id=${noteId}`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

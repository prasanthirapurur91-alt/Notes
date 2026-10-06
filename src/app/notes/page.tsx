import { Suspense } from 'react';
import { NotesCatalogue } from '@/components/notes/NotesCatalogue';

export const metadata = {
  title: 'PDF Notes Collection — Handwritten Technical Notes',
  description: 'Browse, filter and search 160+ handwritten technical PDF notes, interview resources, and quick revision handbooks.',
};

export default function NotesPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-slate-500 font-medium">
          Loading Notes Catalogue...
        </div>
      }
    >
      <NotesCatalogue />
    </Suspense>
  );
}

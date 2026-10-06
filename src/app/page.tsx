import { Suspense } from 'react';
import { NotesCatalogue } from '@/components/notes/NotesCatalogue';

export const metadata = {
  title: 'Prep Library — Minimal PDF Notes Store & Category Marketplace',
  description: 'Explore handwritten notes for Java, Python, System Design, Backend, and more. Buy category notes or full access.',
};

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-slate-400 font-medium">
          Loading Notes Store...
        </div>
      }
    >
      <NotesCatalogue />
    </Suspense>
  );
}




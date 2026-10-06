import React from 'react';
import { notes } from '@/data/notes';
import { NoteCard } from '@/components/cards/NoteCard';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/common/Button';
import { ArrowRight } from 'lucide-react';

export const FeaturedNotesSection: React.FC = () => {
  const featured = notes.filter((n) => n.isFeatured).slice(0, 8);

  return (
    <section className="py-16 sm:py-24 bg-black border-t border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FEATURED SELECTION"
          title="Handwritten Notes. Quick Revision."
          subtitle="Preview high-density study sheets, interview Q&A guides, and technical architecture cheat sheets created for fast learning."
        />

        {/* Responsive Grid: 1 col on Mobile, 2 on Tablet, 3-4 on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {featured.map((note, index) => (
            <NoteCard key={note.id} note={note} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            href="/notes"
            variant="outline"
            size="lg"
            icon={<ArrowRight className="w-5 h-5 text-white" />}
          >
            Explore All 160+ Notes
          </Button>
        </div>
      </div>
    </section>
  );
};

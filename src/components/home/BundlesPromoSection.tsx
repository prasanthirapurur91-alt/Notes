import React from 'react';
import { bundles } from '@/data/bundles';
import { BundleCard } from '@/components/cards/BundleCard';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/common/Button';
import { ArrowRight } from 'lucide-react';

export const BundlesPromoSection: React.FC = () => {
  const sampleBundles = bundles.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-black text-white border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="CURATED PACKAGES"
          title="Learn More. Pay Less with Bundles."
          subtitle="Get related handwritten notes, architecture guides, and practice Q&As grouped together at heavily discounted bundle prices."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleBundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            href="/bundles"
            variant="outline"
            size="lg"
            icon={<ArrowRight className="w-5 h-5 text-white" />}
          >
            View All Curated Bundles
          </Button>
        </div>
      </div>
    </section>
  );
};

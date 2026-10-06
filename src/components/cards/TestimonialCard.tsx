import React from 'react';
import { Testimonial } from '@/types';
import { Star, Quote } from 'lucide-react';
import { Badge } from '@/components/common/Badge';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="relative flex flex-col justify-between p-6 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-xl hover:border-white transition-all text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 text-white">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-white text-white" />
          ))}
        </div>
        <Quote className="w-6 h-6 text-neutral-600" />
      </div>

      <p className="text-sm text-neutral-300 italic leading-relaxed mb-6 font-medium">
        &quot;{testimonial.content}&quot;
      </p>

      <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-white">{testimonial.name}</h4>
          <p className="text-xs text-neutral-400 font-medium">{testimonial.role} • {testimonial.companyOrCollege}</p>
          <span className="text-[11px] font-semibold text-neutral-400 block mt-0.5">
            Verified Purchase: {testimonial.purchasedItem}
          </span>
        </div>
        {testimonial.isDemo && (
          <Badge variant="demo" className="shrink-0">
            DEMO
          </Badge>
        )}
      </div>
    </div>
  );
};

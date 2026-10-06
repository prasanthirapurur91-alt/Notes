import React from 'react';
import { Category } from '@/types';
import Link from 'next/link';
import {
  Code,
  Server,
  Binary,
  Layout,
  CheckCircle,
  Cloud,
  Database,
  Cpu,
  Sparkles,
  BookOpen,
  Calculator,
  ArrowRight,
} from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="w-6 h-6 text-white" />,
  Server: <Server className="w-6 h-6 text-white" />,
  Binary: <Binary className="w-6 h-6 text-white" />,
  Layout: <Layout className="w-6 h-6 text-white" />,
  CheckCircle: <CheckCircle className="w-6 h-6 text-white" />,
  Cloud: <Cloud className="w-6 h-6 text-white" />,
  Database: <Database className="w-6 h-6 text-white" />,
  Cpu: <Cpu className="w-6 h-6 text-white" />,
  Sparkles: <Sparkles className="w-6 h-6 text-white" />,
  BookOpen: <BookOpen className="w-6 h-6 text-white" />,
  Calculator: <Calculator className="w-6 h-6 text-white" />,
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      href={`/notes/category/${category.id}`}
      className="group flex flex-col justify-between p-6 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-xl hover:shadow-2xl hover:border-white transition-all duration-300 transform hover:-translate-y-1 text-white"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center group-hover:bg-neutral-800 transition-colors duration-300">
            {iconMap[category.iconName] || <BookOpen className="w-6 h-6 text-white" />}
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-black text-neutral-300 rounded-full border border-neutral-800">
            {category.resourceCount} Resources
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neutral-300 transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3 mb-6 font-medium">
          {category.description}
        </p>
      </div>

      <div className="flex items-center text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
        Explore Category
        <ArrowRight className="w-4 h-4 ml-1.5 text-white" />
      </div>
    </Link>
  );
};

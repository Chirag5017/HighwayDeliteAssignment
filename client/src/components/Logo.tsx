import { Sparkles } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 mb-8">
      <Sparkles className="w-6 h-6 text-blue-500" />
      <span className="text-xl font-semibold text-gray-900">HD</span>
    </div>
  );
}
import { Sparkles } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 mb-8">
      <div className="p-2 bg-blue-100 rounded-full">
        <Sparkles className="w-5 h-5 text-blue-500" />
      </div>
      <span className="text-xl font-semibold text-gray-900">HD</span>
    </div>
  );
}
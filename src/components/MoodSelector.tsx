
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Tag, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MoodSelectorProps {
  onMoodSubmit: (moodData: any) => void;
}

const moodOptions = [
  { value: 1, emoji: '😢', label: 'Very Sad', color: 'from-red-400 to-red-500' },
  { value: 2, emoji: '😞', label: 'Sad', color: 'from-orange-400 to-orange-500' },
  { value: 3, emoji: '😐', label: 'Neutral', color: 'from-yellow-400 to-yellow-500' },
  { value: 4, emoji: '🙂', label: 'Happy', color: 'from-green-400 to-green-500' },
  { value: 5, emoji: '😄', label: 'Very Happy', color: 'from-blue-400 to-blue-500' },
];

const moodTags = [
  'energetic', 'tired', 'stressed', 'calm', 'productive', 'creative',
  'anxious', 'grateful', 'overwhelmed', 'focused', 'restless', 'accomplished'
];

export const MoodSelector = ({ onMoodSubmit }: MoodSelectorProps) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling today",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    const selectedMoodData = moodOptions.find(m => m.value === selectedMood);
    
    setTimeout(() => {
      onMoodSubmit({
        mood: selectedMood,
        emoji: selectedMoodData?.emoji,
        tags: selectedTags
      });
      
      toast({
        title: "Mood logged successfully!",
        description: `You're feeling ${selectedMoodData?.label.toLowerCase()} today`,
      });
      
      setSelectedMood(null);
      setSelectedTags([]);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center py-8">
        <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">How are you feeling today?</h2>
        <p className="text-gray-600">Track your mood and add some context</p>
      </div>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center">Select Your Mood</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {moodOptions.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`
                  p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
                  ${selectedMood === mood.value
                    ? `border-purple-400 bg-gradient-to-br ${mood.color} text-white shadow-lg`
                    : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                  }
                `}
              >
                <div className="text-4xl mb-2">{mood.emoji}</div>
                <div className="text-sm font-medium">{mood.label}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Tag className="h-5 w-5" />
            <span>Add Some Context</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {moodTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedTags.includes(tag)
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    : 'hover:bg-purple-50 hover:border-purple-300'
                }`}
                onClick={() => handleTagToggle(tag)}
              >
                {selectedTags.includes(tag) && <Plus className="h-3 w-3 mr-1 rotate-45" />}
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          onClick={handleSubmit}
          disabled={!selectedMood || isSubmitting}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {isSubmitting ? 'Logging Mood...' : 'Log My Mood'}
        </Button>
      </div>
    </div>
  );
};

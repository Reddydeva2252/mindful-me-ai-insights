
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Calendar, Mic } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface JournalEntryProps {
  onJournalSubmit: (content: string) => void;
  journalEntries: any[];
}

export const JournalEntry = ({ onJournalSubmit, journalEntries }: JournalEntryProps) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast({
        title: "Please write something",
        description: "Your journal entry cannot be empty",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      onJournalSubmit(content);
      
      toast({
        title: "Journal entry saved!",
        description: "Your thoughts have been recorded",
      });
      
      setContent('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center py-8">
        <BookOpen className="h-12 w-12 text-purple-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Journal Your Thoughts</h2>
        <p className="text-gray-600">Reflect on your day and capture your feelings</p>
      </div>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Today's Entry</span>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="How was your day? What's on your mind? Write about your thoughts, feelings, or anything that happened today..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-40 resize-none border-gray-200 focus:border-purple-400 focus:ring-purple-400"
          />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="hover:bg-purple-50">
                <Mic className="h-4 w-4 mr-2" />
                Voice Note
              </Button>
              <span className="text-sm text-gray-500">
                {content.length}/1000 characters
              </span>
            </div>
            
            <Button
              onClick={handleSubmit}
              disabled={!content.trim() || isSubmitting}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {isSubmitting ? 'Saving...' : 'Save Entry'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {journalEntries.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No journal entries yet. Start writing your first entry above!</p>
            ) : (
              journalEntries.slice(0, 3).map((entry, index) => (
                <div
                  key={entry.id}
                  className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100 animate-fade-in hover:shadow-md transition-shadow duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700 text-sm line-clamp-3">{entry.content}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

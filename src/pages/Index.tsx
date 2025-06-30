
import { useState } from 'react';
import { MoodSelector } from '@/components/MoodSelector';
import { JournalEntry } from '@/components/JournalEntry';
import { Dashboard } from '@/components/Dashboard';
import { WellnessHeader } from '@/components/WellnessHeader';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [moodEntries, setMoodEntries] = useState([
    { id: 1, mood: 4, emoji: '😊', tags: ['productive', 'energetic'], date: new Date().toISOString().split('T')[0] },
    { id: 2, mood: 3, emoji: '😐', tags: ['tired'], date: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
    { id: 3, mood: 5, emoji: '😄', tags: ['happy', 'accomplished'], date: new Date(Date.now() - 172800000).toISOString().split('T')[0] }
  ]);
  const [journalEntries, setJournalEntries] = useState([
    { id: 1, content: "Had a great day today! Completed all my tasks and felt really productive.", date: new Date().toISOString().split('T')[0] }
  ]);

  const handleMoodSubmit = (moodData: any) => {
    const newEntry = {
      id: Date.now(),
      ...moodData,
      date: new Date().toISOString().split('T')[0]
    };
    setMoodEntries(prev => [newEntry, ...prev]);
  };

  const handleJournalSubmit = (content: string) => {
    const newEntry = {
      id: Date.now(),
      content,
      date: new Date().toISOString().split('T')[0]
    };
    setJournalEntries(prev => [newEntry, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <WellnessHeader />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="animate-fade-in">
          {activeTab === 'dashboard' && (
            <Dashboard moodEntries={moodEntries} journalEntries={journalEntries} />
          )}
          {activeTab === 'mood' && (
            <MoodSelector onMoodSubmit={handleMoodSubmit} />
          )}
          {activeTab === 'journal' && (
            <JournalEntry onJournalSubmit={handleJournalSubmit} journalEntries={journalEntries} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;

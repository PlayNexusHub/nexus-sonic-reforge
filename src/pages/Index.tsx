import React, { useState } from 'react';
import { WaveformDisplay } from '@/components/audio/WaveformDisplay';
import { AudioToolbar } from '@/components/audio/AudioToolbar';
import { AudioTimeline } from '@/components/audio/AudioTimeline';
import { EffectsPanel } from '@/components/audio/EffectsPanel';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, Music, Headphones, Upload } from 'lucide-react';
import heroImage from '@/assets/hero-audio-studio.jpg';

const Index = () => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setCurrentFile(file);
  };

  const handleExport = () => {
    // Export functionality would be implemented here
    console.log('Exporting audio...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Sonic Forge 24
                </h1>
                <p className="text-xs text-muted-foreground">Professional Audio Editor</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                <Music className="w-3 h-3 mr-1" />
                Ready
              </Badge>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                <Headphones className="w-3 h-3 mr-1" />
                24-bit / 48kHz
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6 space-y-6">
        {/* Hero Section */}
        {!currentFile && (
          <Card className="relative overflow-hidden bg-gradient-to-r from-card/80 to-card/40 backdrop-blur-sm border-border/50 glow-primary">
            <div className="absolute inset-0 opacity-10">
              <img 
                src={heroImage} 
                alt="Professional audio studio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative p-8 text-center">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Professional Audio Editing Suite
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Experience the power of professional audio editing with our advanced waveform editor, 
                multi-track timeline, and comprehensive effects suite. Built for creators who demand excellence.
              </p>
              <div className="flex items-center justify-center gap-4">
                <label htmlFor="hero-upload">
                  <Button size="lg" className="cursor-pointer bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all">
                    <Upload className="w-5 h-5 mr-2" />
                    Import Audio File
                  </Button>
                </label>
                <input
                  id="hero-upload"
                  type="file"
                  accept="audio/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  className="hidden"
                />
                <Button variant="outline" size="lg" className="hover:bg-accent/20 hover:border-accent/50">
                  Load Demo Track
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Audio Toolbar */}
        <AudioToolbar 
          onFileUpload={handleFileUpload}
          onExport={handleExport}
        />

        {/* Main Editor Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Waveform Editor */}
          <div className="xl:col-span-3 space-y-6">
            <WaveformDisplay audioFile={currentFile || undefined} />
            <AudioTimeline />
          </div>

          {/* Effects Panel */}
          <div className="xl:col-span-1">
            <EffectsPanel />
          </div>
        </div>

        {/* Status Bar */}
        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
          <div className="p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  Ready for audio processing
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>CPU: 12%</span>
                <span>Memory: 2.1GB</span>
                <span>Latency: 5.2ms</span>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Index;

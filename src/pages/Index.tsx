import React, { useState, useCallback } from 'react';
import { WaveformDisplay } from '@/components/audio/WaveformDisplay';
import { AudioToolbar } from '@/components/audio/AudioToolbar';
import { AudioTimeline } from '@/components/audio/AudioTimeline';
import { EffectsPanel } from '@/components/audio/EffectsPanel';
import { SpectralAnalyzer } from '@/components/audio/SpectralAnalyzer';
import { AudioMeters } from '@/components/audio/AudioMeters';
import { ProjectManager } from '@/components/audio/ProjectManager';
import { ZoomControls } from '@/components/audio/ZoomControls';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, Music, Headphones, Upload, Info } from 'lucide-react';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { validateAudioFile, formatFileSize } from '@/utils/audioValidation';
import { ErrorHandler, ErrorSeverity } from '@/utils/errorHandler';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-audio-studio.jpg';

const Index = () => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [masterVolume, setMasterVolume] = useState(80);

  const handleFileUpload = useCallback((file: File) => {
    // Validate file
    const validation = validateAudioFile(file);
    
    if (!validation.valid) {
      ErrorHandler.handle(validation.error || 'Invalid audio file', ErrorSeverity.ERROR);
      return;
    }

    // Show warnings if any
    if (validation.warnings) {
      validation.warnings.forEach(warning => {
        ErrorHandler.handle(warning, ErrorSeverity.WARNING);
      });
    }

    setCurrentFile(file);
    const fileSize = formatFileSize(file.size);
    setUploadStatus(`Loaded: ${file.name} (${fileSize})`);
    
    toast.success('Audio file loaded successfully', {
      description: `${file.name} - ${fileSize}`
    });
    
    // Clear status after 5 seconds
    setTimeout(() => setUploadStatus(''), 5000);
    
    // Load audio metadata
    const audio = new Audio(URL.createObjectURL(file));
    audio.addEventListener('loadedmetadata', () => {
      if (import.meta.env.DEV) {
        console.info(`Audio metadata: ${audio.duration}s, ${file.type}`);
      }
    });
    
    audio.addEventListener('error', () => {
      ErrorHandler.handle('Failed to load audio metadata', ErrorSeverity.WARNING);
    });
  }, []);

  const handleExport = useCallback(() => {
    if (!currentFile) {
      ErrorHandler.handle('Please upload an audio file first', ErrorSeverity.WARNING);
      return;
    }
    
    try {
      // Create a download link for the current file
      const url = URL.createObjectURL(currentFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = currentFile.name.replace(/\.[^/.]+$/, '_processed.wav');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Clean up
      setTimeout(() => URL.revokeObjectURL(url), 100);
      
      toast.success('Audio exported successfully!', {
        description: `Saved as: ${a.download}`
      });
      
      setUploadStatus('Audio exported successfully!');
      setTimeout(() => setUploadStatus(''), 5000);
    } catch (error) {
      ErrorHandler.handle(
        error instanceof Error ? error : new Error('Export failed'),
        ErrorSeverity.ERROR
      );
    }
  }, [currentFile]);

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
                <p className="text-xs text-muted-foreground">
                  Professional Audio Editor | <span className="text-primary">PlayNexus</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/about">
                  <Info className="w-4 h-4 mr-1" />
                  About
                </Link>
              </Button>
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
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="hover:bg-accent/20 hover:border-accent/50"
                  onClick={() => {
                    // Load a demo waveform
                    setUploadStatus('Demo track loaded - Electronic Music Sample');
                    setTimeout(() => setUploadStatus(''), 3000);
                  }}
                >
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
          isPlaying={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onStop={() => setIsPlaying(false)}
          masterVolume={masterVolume}
          onMasterVolumeChange={setMasterVolume}
        />

        {/* Main Editor Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Main Waveform Editor */}
          <div className="xl:col-span-3 space-y-6">
            <WaveformDisplay 
              audioFile={currentFile || undefined} 
              zoom={zoom}
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              onStop={() => setIsPlaying(false)}
            />
            <AudioTimeline />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SpectralAnalyzer audioFile={currentFile || undefined} isPlaying={isPlaying} />
              <AudioMeters isPlaying={isPlaying} />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="xl:col-span-2 space-y-6">
            <ZoomControls 
              onZoomChange={setZoom}
              onZoomIn={() => setZoom(prev => Math.min(8, prev * 1.5))}
              onZoomOut={() => setZoom(prev => Math.max(0.1, prev / 1.5))}
              onZoomFit={() => setZoom(1)}
              onZoomReset={() => setZoom(1)}
            />
            <ProjectManager 
              currentProject={currentFile?.name}
              onSaveProject={(name) => {
                toast.success('Project saved', { description: String(name) });
                if (import.meta.env.DEV) console.info('Save project:', name);
              }}
              onLoadProject={(project) => {
                toast.success('Project loaded', { description: String(project) });
                if (import.meta.env.DEV) console.info('Load project:', project);
              }}
            />
            <EffectsPanel />
          </div>
        </div>

        {/* Status Bar */}
        <Card className="bg-card/30 backdrop-blur-sm border-border/50">
          <div className="p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">Status:</span>
                {uploadStatus ? (
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                    {uploadStatus}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    {currentFile ? `Loaded: ${currentFile.name}` : 'Ready for audio processing'}
                  </Badge>
                )}
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

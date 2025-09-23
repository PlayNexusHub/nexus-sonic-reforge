import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square } from 'lucide-react';

interface WaveformDisplayProps {
  audioFile?: File;
  className?: string;
}

export const WaveformDisplay: React.FC<WaveformDisplayProps> = ({ 
  audioFile, 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioData, setAudioData] = useState<number[]>([]);

  // Generate sample waveform data for demo
  useEffect(() => {
    const generateSampleWaveform = () => {
      const samples = 2000;
      const data = [];
      for (let i = 0; i < samples; i++) {
        const frequency = 0.02;
        const amplitude = Math.sin(i * frequency) * 0.5 + Math.random() * 0.3;
        data.push(amplitude);
      }
      setAudioData(data);
    };

    generateSampleWaveform();
  }, []);

  // Draw waveform
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || audioData.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    // Set up drawing style
    const centerY = height / 2;
    const barWidth = width / audioData.length;

    // Draw waveform
    audioData.forEach((amplitude, index) => {
      const barHeight = amplitude * centerY;
      const x = index * barWidth;
      
      // Create gradient for bars
      const gradient = ctx.createLinearGradient(0, centerY - barHeight, 0, centerY + barHeight);
      gradient.addColorStop(0, '#4ade80'); // Primary color
      gradient.addColorStop(0.5, '#22d3ee'); // Accent blend
      gradient.addColorStop(1, '#a855f7'); // Accent color
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, centerY - barHeight, barWidth - 1, barHeight * 2);
    });

    // Draw playhead
    if (duration > 0) {
      const playheadX = (currentTime / duration) * width;
      ctx.strokeStyle = '#4ade80';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(playheadX, 0);
      ctx.lineTo(playheadX, height);
      ctx.stroke();
    }
  }, [audioData, currentTime, duration]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className={`bg-card/50 backdrop-blur-sm border-border/50 ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Waveform Editor</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePlayPause}
              className="hover:bg-primary/20 hover:border-primary/50"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleStop}
              className="hover:bg-destructive/20 hover:border-destructive/50"
            >
              <Square className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={800}
            height={200}
            className="w-full h-48 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/40 transition-colors"
            style={{ imageRendering: 'pixelated' }}
          />
          <div className="absolute inset-0 rounded-lg glow-primary opacity-20" />
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span className="text-primary">Sample Rate: 44.1kHz | Bit Depth: 24-bit</span>
          <span>{formatTime(duration || 180)}</span>
        </div>

        {audioFile && (
          <audio
            ref={audioRef}
            src={URL.createObjectURL(audioFile)}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onEnded={() => setIsPlaying(false)}
          />
        )}
      </div>
    </Card>
  );
};
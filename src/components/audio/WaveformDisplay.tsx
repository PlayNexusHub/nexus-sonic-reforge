import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Square, Volume2, Scissors, Copy } from 'lucide-react';

interface WaveformDisplayProps {
  audioFile?: File;
  className?: string;
  zoom?: number;
  onSelectionChange?: (start: number, end: number) => void;
  isPlaying?: boolean;
  onPlayPause?: () => void;
  onStop?: () => void;
}

export const WaveformDisplay: React.FC<WaveformDisplayProps> = ({ 
  audioFile, 
  className = '',
  zoom = 1,
  onSelectionChange,
  isPlaying: externalIsPlaying,
  onPlayPause: externalOnPlayPause,
  onStop: externalOnStop
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioData, setAudioData] = useState<number[]>([]);
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [showWaveformDetails, setShowWaveformDetails] = useState(true);

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

  // Enhanced waveform drawing with zoom and selection
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || audioData.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    // Apply zoom to audio data
    const zoomedLength = Math.floor(audioData.length / zoom);
    const startIndex = Math.floor((audioData.length - zoomedLength) / 2);
    const visibleData = audioData.slice(startIndex, startIndex + zoomedLength);

    const centerY = height / 2;
    const barWidth = width / visibleData.length;

    // Draw selection background
    if (selection) {
      const selectionStartX = (selection.start / duration) * width;
      const selectionEndX = (selection.end / duration) * width;
      ctx.fillStyle = 'hsl(270, 95%, 75%, 0.2)';
      ctx.fillRect(selectionStartX, 0, selectionEndX - selectionStartX, height);
    }

    // Draw waveform with enhanced detail
    visibleData.forEach((amplitude, index) => {
      const barHeight = amplitude * centerY * (volume[0] / 100);
      const x = index * barWidth;
      
      // Create enhanced gradient
      const gradient = ctx.createLinearGradient(0, centerY - barHeight, 0, centerY + barHeight);
      
      if (selection && x >= (selection.start / duration) * width && x <= (selection.end / duration) * width) {
        // Selected region - different color
        gradient.addColorStop(0, 'hsl(270, 95%, 65%)');
        gradient.addColorStop(0.5, 'hsl(270, 95%, 75%)');
        gradient.addColorStop(1, 'hsl(270, 95%, 85%)');
      } else {
        // Normal waveform
        gradient.addColorStop(0, 'hsl(142, 86%, 45%)');
        gradient.addColorStop(0.5, 'hsl(142, 86%, 59%)');
        gradient.addColorStop(1, 'hsl(142, 86%, 75%)');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, centerY - barHeight, Math.max(1, barWidth - 0.5), barHeight * 2);

      // Draw sample points at high zoom
      if (zoom > 4 && showWaveformDetails) {
        ctx.fillStyle = 'hsl(142, 86%, 90%)';
        ctx.fillRect(x, centerY - 1, 1, 2);
      }
    });

    // Draw playhead
    if (duration > 0) {
      const playheadX = (currentTime / duration) * width;
      ctx.strokeStyle = 'hsl(142, 86%, 70%)';
      ctx.lineWidth = 2;
      ctx.shadowColor = 'hsl(142, 86%, 59%)';
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.moveTo(playheadX, 0);
      ctx.lineTo(playheadX, height);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Draw time markers
    if (showWaveformDetails) {
      ctx.fillStyle = 'hsl(220, 9%, 65%)';
      ctx.font = '10px monospace';
      for (let i = 0; i <= 10; i++) {
        const x = (width / 10) * i;
        const time = (duration / 10) * i;
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        ctx.fillText(`${minutes}:${seconds.toString().padStart(2, '0')}`, x, height - 5);
        
        // Draw tick marks
        ctx.strokeStyle = 'hsl(220, 13%, 18%)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, height - 20);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
    }
  }, [audioData, currentTime, duration, zoom, selection, volume, showWaveformDetails]);

  // Mouse interaction handlers
  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const clickTime = (x / canvas.width) * (duration || 180);
    
    if (event.shiftKey && selection) {
      // Extend selection
      const newSelection = {
        start: Math.min(selection.start, clickTime),
        end: Math.max(selection.start, clickTime)
      };
      setSelection(newSelection);
      onSelectionChange?.(newSelection.start, newSelection.end);
    } else if (event.ctrlKey || event.metaKey) {
      // Set playhead position
      setCurrentTime(clickTime);
    } else {
      // Start new selection
      setSelection({ start: clickTime, end: clickTime });
      setIsDragging(true);
    }
  }, [duration, selection, onSelectionChange]);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selection) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const time = (x / canvas.width) * (duration || 180);
    
    const newSelection = {
      start: selection.start,
      end: time
    };
    setSelection(newSelection);
    onSelectionChange?.(newSelection.start, newSelection.end);
  }, [isDragging, selection, duration, onSelectionChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handlePlayPause = () => {
    if (externalOnPlayPause) {
      externalOnPlayPause();
      return;
    }

    const audio = audioRef.current;
    if (!audio) {
      // Demo functionality for when no audio file is loaded
      setIsPlaying(!isPlaying);
      if (!isPlaying) {
        const startTime = selection ? selection.start : currentTime;
        const endTime = selection ? selection.end : (duration || 180);
        
        // Simulate playback progress
        const interval = setInterval(() => {
          setCurrentTime(prev => {
            const nextTime = prev + 0.1;
            if (nextTime >= endTime) {
              clearInterval(interval);
              setIsPlaying(false);
              return startTime;
            }
            return nextTime;
          });
        }, 100);
        
        setCurrentTime(startTime);
        (window as any).playbackInterval = interval;
      } else {
        clearInterval((window as any).playbackInterval);
      }
      return;
    }

    if (isPlaying) {
      audio.pause();
    } else {
      if (selection) {
        audio.currentTime = selection.start;
      }
      audio.play().catch(err => {
        console.error('Audio playback failed:', err);
        setIsPlaying(false);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    if (externalOnStop) {
      externalOnStop();
      return;
    }

    const audio = audioRef.current;
    
    // Clear demo playback interval if it exists
    if ((window as any).playbackInterval) {
      clearInterval((window as any).playbackInterval);
    }
    
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    
    setIsPlaying(false);
    setCurrentTime(0);
    setSelection(null);
  };

  const handleCut = () => {
    if (selection) {
      // In a real implementation, this would cut the audio
      console.log(`Cutting audio from ${selection.start}s to ${selection.end}s`);
      setSelection(null);
    }
  };

  const handleCopy = () => {
    if (selection) {
      // In a real implementation, this would copy the audio to clipboard
      console.log(`Copying audio from ${selection.start}s to ${selection.end}s`);
    }
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
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-foreground">Waveform Editor</h3>
            {selection && (
              <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/30">
                {(selection.end - selection.start).toFixed(2)}s selected
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePlayPause}
              className="hover:bg-primary/20 hover:border-primary/50"
            >
              {(externalIsPlaying ?? isPlaying) ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleStop}
              className="hover:bg-destructive/20 hover:border-destructive/50"
            >
              <Square className="w-4 h-4" />
            </Button>
            {selection && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCut}
                  className="hover:bg-destructive/20 hover:border-destructive/50"
                >
                  <Scissors className="w-3 h-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="hover:bg-primary/20 hover:border-primary/50"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </>
            )}
            <div className="flex items-center gap-2 ml-2">
              <Volume2 className="w-3 h-3 text-muted-foreground" />
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="w-16"
              />
            </div>
          </div>
        </div>
        
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={800}
            height={200}
            className="w-full h-48 bg-muted/30 rounded-lg cursor-crosshair hover:bg-muted/40 transition-colors"
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ imageRendering: 'pixelated' }}
          />
          <div className="absolute inset-0 rounded-lg glow-primary opacity-20" />
          
          {/* Selection info overlay */}
          {selection && (
            <div className="absolute top-2 right-2 bg-card/90 backdrop-blur-sm rounded px-2 py-1 text-xs text-foreground">
              Selection: {selection.start.toFixed(2)}s - {selection.end.toFixed(2)}s
            </div>
          )}
          
          {/* Zoom level indicator */}
          <div className="absolute top-2 left-2 bg-card/90 backdrop-blur-sm rounded px-2 py-1 text-xs text-muted-foreground">
            Zoom: {Math.round(zoom * 100)}% | Click: playhead | Shift+Click: select | Ctrl+Click: seek
          </div>
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
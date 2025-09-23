import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Activity, Settings } from 'lucide-react';

interface SpectralAnalyzerProps {
  audioFile?: File;
  isPlaying: boolean;
  className?: string;
}

export const SpectralAnalyzer: React.FC<SpectralAnalyzerProps> = ({
  audioFile,
  isPlaying,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [sensitivity, setSensitivity] = useState([75]);
  const [smoothing, setSmoothing] = useState([85]);
  const [showPeaks, setShowPeaks] = useState(true);

  // Generate spectral data for demo
  const generateSpectralData = () => {
    const bands = 64;
    const data = new Uint8Array(bands);
    
    for (let i = 0; i < bands; i++) {
      const baseAmplitude = Math.random() * (sensitivity[0] / 100);
      const frequency = i / bands;
      
      // Simulate realistic audio spectrum (more energy in lower frequencies)
      const frequencyWeight = 1 - (frequency * 0.7);
      const playbackMultiplier = isPlaying ? 1 : 0.1;
      
      data[i] = Math.floor(baseAmplitude * frequencyWeight * playbackMultiplier * 255);
    }
    
    return data;
  };

  const drawSpectrum = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const spectralData = generateSpectralData();
    const barWidth = width / spectralData.length;

    // Clear canvas
    ctx.fillStyle = 'hsl(220, 13%, 9%)';
    ctx.fillRect(0, 0, width, height);

    // Draw frequency grid
    ctx.strokeStyle = 'hsl(220, 13%, 18%)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      const y = (height / 8) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw spectrum bars
    spectralData.forEach((amplitude, index) => {
      const barHeight = (amplitude / 255) * height * (smoothing[0] / 100);
      const x = index * barWidth;
      const y = height - barHeight;

      // Create gradient based on frequency
      const gradient = ctx.createLinearGradient(0, height, 0, 0);
      const hue = 142 + (index / spectralData.length) * 128; // Green to purple spectrum
      gradient.addColorStop(0, `hsl(${hue}, 86%, 35%)`);
      gradient.addColorStop(0.5, `hsl(${hue}, 86%, 59%)`);
      gradient.addColorStop(1, `hsl(${hue}, 86%, 75%)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth - 1, barHeight);

      // Draw peaks
      if (showPeaks && amplitude > 200) {
        ctx.fillStyle = 'hsl(0, 84%, 65%)';
        ctx.fillRect(x, y - 3, barWidth - 1, 2);
      }
    });

    // Draw frequency labels
    ctx.fillStyle = 'hsl(220, 9%, 65%)';
    ctx.font = '10px monospace';
    const frequencies = ['60Hz', '250Hz', '1kHz', '4kHz', '16kHz'];
    frequencies.forEach((freq, index) => {
      const x = (width / frequencies.length) * index + 10;
      ctx.fillText(freq, x, height - 5);
    });

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(drawSpectrum);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      drawSpectrum();
    } else {
      drawSpectrum(); // Draw static state
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, sensitivity, smoothing, showPeaks]);

  return (
    <Card className={`bg-card/50 backdrop-blur-sm border-border/50 ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Spectrum Analyzer</h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={`text-xs ${isPlaying ? 'bg-primary/10 text-primary border-primary/30' : 'bg-muted/50'}`}
            >
              {isPlaying ? 'ACTIVE' : 'IDLE'}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPeaks(!showPeaks)}
              className="h-6 w-6 p-0"
            >
              <Settings className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="relative mb-4">
          <canvas
            ref={canvasRef}
            width={400}
            height={150}
            className="w-full h-32 bg-background/50 rounded border border-border/50"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <label className="text-xs text-muted-foreground w-16">Sens:</label>
            <Slider
              value={sensitivity}
              onValueChange={setSensitivity}
              max={100}
              step={5}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-8">{sensitivity[0]}%</span>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs text-muted-foreground w-16">Smooth:</label>
            <Slider
              value={smoothing}
              onValueChange={setSmoothing}
              max={100}
              step={5}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-8">{smoothing[0]}%</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
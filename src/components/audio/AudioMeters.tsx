import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioMetersProps {
  isPlaying: boolean;
  className?: string;
}

interface MeterData {
  left: number;
  right: number;
  leftPeak: number;
  rightPeak: number;
}

export const AudioMeters: React.FC<AudioMetersProps> = ({ 
  isPlaying, 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [meterData, setMeterData] = useState<MeterData>({
    left: 0,
    right: 0,
    leftPeak: 0,
    rightPeak: 0
  });
  const [peakHold, setPeakHold] = useState(true);

  const generateMeterData = (): MeterData => {
    if (!isPlaying) {
      return { left: 0, right: 0, leftPeak: 0, rightPeak: 0 };
    }

    const baseLevel = 0.3 + Math.random() * 0.4;
    const stereoVariation = Math.random() * 0.2;
    
    const left = Math.min(1, baseLevel + stereoVariation);
    const right = Math.min(1, baseLevel - stereoVariation);

    return {
      left,
      right,
      leftPeak: peakHold ? Math.max(meterData.leftPeak * 0.95, left) : left,
      rightPeak: peakHold ? Math.max(meterData.rightPeak * 0.95, right) : right
    };
  };

  const drawMeters = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const meterWidth = 20;
    const meterHeight = height - 40;
    const meterSpacing = 30;

    // Clear canvas
    ctx.fillStyle = 'hsl(220, 13%, 11%)';
    ctx.fillRect(0, 0, width, height);

    // Draw meter backgrounds
    ctx.fillStyle = 'hsl(220, 13%, 15%)';
    ctx.fillRect(10, 20, meterWidth, meterHeight);
    ctx.fillRect(10 + meterSpacing, 20, meterWidth, meterHeight);

    // Draw level indicators
    const drawMeter = (x: number, level: number, peak: number, label: string) => {
      const levelHeight = level * meterHeight;
      const peakPosition = peak * meterHeight;

      // Draw level gradient
      const gradient = ctx.createLinearGradient(0, 20 + meterHeight, 0, 20);
      gradient.addColorStop(0, 'hsl(142, 86%, 59%)'); // Green
      gradient.addColorStop(0.7, 'hsl(60, 100%, 50%)'); // Yellow
      gradient.addColorStop(0.9, 'hsl(30, 100%, 50%)'); // Orange
      gradient.addColorStop(1, 'hsl(0, 84%, 65%)'); // Red

      ctx.fillStyle = gradient;
      ctx.fillRect(x, 20 + meterHeight - levelHeight, meterWidth, levelHeight);

      // Draw peak hold
      if (peakHold && peak > 0.1) {
        const peakY = 20 + meterHeight - peakPosition;
        ctx.fillStyle = peak > 0.8 ? 'hsl(0, 84%, 65%)' : 'hsl(142, 86%, 70%)';
        ctx.fillRect(x, peakY - 2, meterWidth, 3);
      }

      // Draw dB scale marks
      ctx.fillStyle = 'hsl(220, 9%, 65%)';
      ctx.font = '8px monospace';
      const dbMarks = ['-60', '-40', '-20', '-10', '-6', '-3', '0'];
      dbMarks.forEach((db, index) => {
        const y = 20 + (meterHeight / (dbMarks.length - 1)) * index;
        ctx.fillText(db, x + meterWidth + 3, y + 3);
      });

      // Draw channel label
      ctx.fillStyle = 'hsl(220, 9%, 95%)';
      ctx.font = '10px monospace';
      ctx.fillText(label, x + 5, height - 5);
    };

    drawMeter(10, meterData.left, meterData.leftPeak, 'L');
    drawMeter(10 + meterSpacing, meterData.right, meterData.rightPeak, 'R');

    // Draw clip indicators
    if (meterData.leftPeak > 0.95) {
      ctx.fillStyle = 'hsl(0, 84%, 65%)';
      ctx.fillRect(5, 5, 8, 8);
    }
    if (meterData.rightPeak > 0.95) {
      ctx.fillStyle = 'hsl(0, 84%, 65%)';
      ctx.fillRect(width - 13, 5, 8, 8);
    }
  };

  const animate = () => {
    const newMeterData = generateMeterData();
    setMeterData(newMeterData);
    drawMeters();

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      animate();
    } else {
      setMeterData({ left: 0, right: 0, leftPeak: 0, rightPeak: 0 });
      drawMeters();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, peakHold]);

  const formatDb = (level: number) => {
    if (level === 0) return '-∞';
    const db = 20 * Math.log10(level);
    return `${db.toFixed(1)}dB`;
  };

  return (
    <Card className={`bg-card/50 backdrop-blur-sm border-border/50 ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Level Meters</h3>
          </div>
          <Badge 
            variant="outline" 
            className={`text-xs cursor-pointer ${
              meterData.leftPeak > 0.95 || meterData.rightPeak > 0.95 
                ? 'bg-destructive/20 text-destructive border-destructive/50' 
                : 'bg-primary/10 text-primary border-primary/30'
            }`}
            onClick={() => setPeakHold(!peakHold)}
          >
            {meterData.leftPeak > 0.95 || meterData.rightPeak > 0.95 ? 'CLIP' : 'OK'}
          </Badge>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={100}
            height={200}
            className="w-full h-48 bg-background/30 rounded border border-border/50"
          />
        </div>

        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>L: {formatDb(meterData.left)}</span>
            <span>R: {formatDb(meterData.right)}</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Peak: {formatDb(meterData.leftPeak)}</span>
            <span>Peak: {formatDb(meterData.rightPeak)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
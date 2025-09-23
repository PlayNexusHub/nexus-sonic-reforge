import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from 'lucide-react';

interface ZoomControlsProps {
  onZoomChange: (zoom: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomFit: () => void;
  onZoomReset: () => void;
  className?: string;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  onZoomChange,
  onZoomIn,
  onZoomOut,
  onZoomFit,
  onZoomReset,
  className = ''
}) => {
  const [zoomLevel, setZoomLevel] = useState([100]);
  const [viewMode, setViewMode] = useState<'waveform' | 'spectral' | 'both'>('waveform');

  const handleZoomChange = (value: number[]) => {
    setZoomLevel(value);
    onZoomChange(value[0] / 100);
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(800, zoomLevel[0] + 25);
    handleZoomChange([newZoom]);
    onZoomIn();
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(10, zoomLevel[0] - 25);
    handleZoomChange([newZoom]);
    onZoomOut();
  };

  const handleZoomFit = () => {
    handleZoomChange([100]);
    onZoomFit();
  };

  const handleZoomReset = () => {
    handleZoomChange([100]);
    onZoomReset();
  };

  const getZoomDescription = (zoom: number) => {
    if (zoom < 50) return 'Wide view';
    if (zoom < 100) return 'Normal';
    if (zoom < 200) return 'Detailed';
    if (zoom < 400) return 'Close-up';
    return 'Sample level';
  };

  return (
    <Card className={`bg-card/50 backdrop-blur-sm border-border/50 ${className}`}>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Zoom & View</h3>
          <Badge 
            variant="outline" 
            className="text-xs bg-primary/10 text-primary border-primary/30"
          >
            {zoomLevel[0]}%
          </Badge>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoomLevel[0] <= 10}
            className="h-8 w-8 p-0"
          >
            <ZoomOut className="w-3 h-3" />
          </Button>
          
          <Slider
            value={zoomLevel}
            onValueChange={handleZoomChange}
            min={10}
            max={800}
            step={5}
            className="flex-1"
          />
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoomLevel[0] >= 800}
            className="h-8 w-8 p-0"
          >
            <ZoomIn className="w-3 h-3" />
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          {getZoomDescription(zoomLevel[0])}
        </div>

        {/* Quick Zoom Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomFit}
            className="text-xs"
          >
            <Maximize2 className="w-3 h-3 mr-1" />
            Fit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomReset}
            className="text-xs"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset
          </Button>
        </div>

        {/* View Mode Toggle */}
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">View Mode:</label>
          <div className="grid grid-cols-3 gap-1">
            {(['waveform', 'spectral', 'both'] as const).map((mode) => (
              <Button
                key={mode}
                variant={viewMode === mode ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode(mode)}
                className="text-xs capitalize"
              >
                {mode}
              </Button>
            ))}
          </div>
        </div>

        {/* Preset Zoom Levels */}
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">Quick Zoom:</label>
          <div className="grid grid-cols-4 gap-1">
            {[25, 50, 100, 200].map((preset) => (
              <Button
                key={preset}
                variant="ghost"
                size="sm"
                onClick={() => handleZoomChange([preset])}
                className="text-xs"
              >
                {preset}%
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
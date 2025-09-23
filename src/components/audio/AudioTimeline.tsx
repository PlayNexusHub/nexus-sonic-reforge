import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Music, 
  Mic, 
  Volume2, 
  VolumeX, 
  Lock, 
  Eye, 
  EyeOff 
} from 'lucide-react';

interface Track {
  id: string;
  name: string;
  type: 'audio' | 'vocal' | 'instrument';
  volume: number;
  muted: boolean;
  solo: boolean;
  locked: boolean;
  visible: boolean;
  color: string;
}

export const AudioTimeline: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: '1',
      name: 'Main Audio',
      type: 'audio',
      volume: 80,
      muted: false,
      solo: false,
      locked: false,
      visible: true,
      color: 'hsl(142 86% 59%)'
    },
    {
      id: '2', 
      name: 'Vocals',
      type: 'vocal',
      volume: 65,
      muted: false,
      solo: false,
      locked: false,
      visible: true,
      color: 'hsl(270 95% 75%)'
    },
    {
      id: '3',
      name: 'Background',
      type: 'instrument',
      volume: 45,
      muted: true,
      solo: false,
      locked: false,
      visible: true,
      color: 'hsl(25 95% 65%)'
    }
  ]);

  const updateTrack = (id: string, updates: Partial<Track>) => {
    setTracks(tracks.map(track => 
      track.id === id ? { ...track, ...updates } : track
    ));
  };

  const getTrackIcon = (type: Track['type']) => {
    switch (type) {
      case 'vocal': return <Mic className="w-4 h-4" />;
      case 'instrument': return <Music className="w-4 h-4" />;
      default: return <Volume2 className="w-4 h-4" />;
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Multi-Track Timeline</h3>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            3 Tracks Active
          </Badge>
        </div>

        <div className="space-y-3">
          {tracks.map((track) => (
            <div key={track.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/40 transition-colors">
              {/* Track Info */}
              <div className="flex items-center gap-2 min-w-[120px]">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: track.color }}
                />
                {getTrackIcon(track.type)}
                <span className="font-medium text-sm">{track.name}</span>
              </div>

              {/* Track Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateTrack(track.id, { muted: !track.muted })}
                  className={`w-8 h-8 p-0 ${track.muted ? 'bg-destructive/20 text-destructive' : 'hover:bg-primary/20'}`}
                >
                  {track.muted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateTrack(track.id, { visible: !track.visible })}
                  className={`w-8 h-8 p-0 ${track.visible ? 'hover:bg-primary/20' : 'bg-muted text-muted-foreground'}`}
                >
                  {track.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateTrack(track.id, { locked: !track.locked })}
                  className={`w-8 h-8 p-0 ${track.locked ? 'bg-accent/20 text-accent' : 'hover:bg-accent/20'}`}
                >
                  <Lock className="w-3 h-3" />
                </Button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-2 min-w-[120px]">
                <Volume2 className="w-3 h-3 text-muted-foreground" />
                <Slider
                  value={[track.volume]}
                  onValueChange={([value]) => updateTrack(track.id, { volume: value })}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {track.volume}%
                </span>
              </div>

              {/* Timeline Visualization */}
              <div className="flex-1 h-12 bg-background/50 rounded border relative overflow-hidden">
                <div 
                  className="h-full opacity-60 rounded"
                  style={{
                    background: `linear-gradient(90deg, ${track.color}20, ${track.color}40, ${track.color}20)`,
                    width: `${Math.random() * 80 + 60}%`
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex gap-1">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-current opacity-40 rounded-full"
                        style={{ 
                          height: `${Math.random() * 80 + 20}%`,
                          color: track.color
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Ruler */}
        <div className="mt-4 px-3">
          <div className="flex justify-between text-xs text-muted-foreground border-t border-border/50 pt-2">
            <span>0:00</span>
            <span>1:00</span>
            <span>2:00</span>
            <span>3:00</span>
            <span>4:00</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
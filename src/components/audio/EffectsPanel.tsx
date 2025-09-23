import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Volume2, 
  Filter, 
  Radio, 
  Waves, 
  Sparkles,
  RotateCcw,
  Settings2
} from 'lucide-react';

interface Effect {
  id: string;
  name: string;
  enabled: boolean;
  intensity: number;
  icon: React.ReactNode;
  description: string;
}

export const EffectsPanel: React.FC = () => {
  const [effects, setEffects] = useState<Effect[]>([
    {
      id: 'reverb',
      name: 'Reverb',
      enabled: true,
      intensity: 45,
      icon: <Radio className="w-4 h-4" />,
      description: 'Add spatial depth and ambience'
    },
    {
      id: 'compressor',
      name: 'Compressor',
      enabled: true,
      intensity: 60,
      icon: <Volume2 className="w-4 h-4" />,
      description: 'Control dynamic range'
    },
    {
      id: 'eq',
      name: 'Equalizer',
      enabled: false,
      intensity: 30,
      icon: <Filter className="w-4 h-4" />,
      description: 'Shape frequency response'
    },
    {
      id: 'distortion',
      name: 'Distortion',
      enabled: false,
      intensity: 25,
      icon: <Zap className="w-4 h-4" />,
      description: 'Add harmonic warmth'
    }
  ]);

  const [eqBands] = useState([
    { freq: '60Hz', value: 0 },
    { freq: '170Hz', value: 12 },
    { freq: '350Hz', value: -8 },
    { freq: '1kHz', value: 5 },
    { freq: '3.5kHz', value: 15 },
    { freq: '10kHz', value: 8 }
  ]);

  const updateEffect = (id: string, updates: Partial<Effect>) => {
    setEffects(effects.map(effect => 
      effect.id === id ? { ...effect, ...updates } : effect
    ));
  };

  const resetAllEffects = () => {
    setEffects(effects.map(effect => ({ 
      ...effect, 
      enabled: false, 
      intensity: 50 
    })));
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Audio Effects</h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
              {effects.filter(e => e.enabled).length} Active
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetAllEffects}
              className="hover:bg-destructive/20 hover:text-destructive"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="effects" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/30">
            <TabsTrigger value="effects" className="data-[state=active]:bg-primary/20">
              Effects
            </TabsTrigger>
            <TabsTrigger value="equalizer" className="data-[state=active]:bg-accent/20">
              EQ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="effects" className="space-y-3 mt-4">
            {effects.map((effect) => (
              <div 
                key={effect.id} 
                className={`p-3 rounded-lg border transition-all ${
                  effect.enabled 
                    ? 'bg-primary/5 border-primary/30 glow-primary' 
                    : 'bg-muted/20 border-border/50 hover:bg-muted/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {effect.icon}
                    <span className="font-medium">{effect.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateEffect(effect.id, { enabled: !effect.enabled })}
                      className={`w-6 h-6 p-0 rounded-full ${
                        effect.enabled 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground hover:bg-primary/20'
                      }`}
                    >
                      {effect.enabled && <Settings2 className="w-3 h-3" />}
                    </Button>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {effect.intensity}%
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">
                  {effect.description}
                </p>
                
                <Slider
                  value={[effect.intensity]}
                  onValueChange={([value]) => updateEffect(effect.id, { intensity: value })}
                  max={100}
                  step={1}
                  disabled={!effect.enabled}
                  className={effect.enabled ? '' : 'opacity-50'}
                />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="equalizer" className="mt-4">
            <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Waves className="w-4 h-4 text-accent" />
                  6-Band Equalizer
                </h4>
                <Button variant="ghost" size="sm" className="text-xs">
                  Flat
                </Button>
              </div>
              
              <div className="flex items-end justify-between gap-2 h-32">
                {eqBands.map((band, index) => (
                  <div key={band.freq} className="flex flex-col items-center gap-2">
                    <div className="relative h-24 w-6">
                      <div 
                        className="absolute bottom-0 w-full bg-gradient-to-t from-accent to-accent/60 rounded-full transition-all"
                        style={{ 
                          height: `${50 + band.value * 2}%`,
                          minHeight: '8px'
                        }}
                      />
                      <div className="absolute top-1/2 w-full h-px bg-border" />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {band.freq}
                    </span>
                    <span className="text-xs font-mono">
                      {band.value > 0 ? '+' : ''}{band.value}dB
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Keyboard, Zap } from 'lucide-react';

interface ShortcutGroup {
  category: string;
  shortcuts: { key: string; action: string; description?: string }[];
}

export const KeyboardShortcuts: React.FC = () => {
  const shortcutGroups: ShortcutGroup[] = [
    {
      category: 'Playback',
      shortcuts: [
        { key: 'Space', action: 'Play/Pause', description: 'Toggle audio playback' },
        { key: 'Esc', action: 'Stop', description: 'Stop playback and return to start' },
        { key: 'Home', action: 'Go to Start', description: 'Jump to beginning of timeline' },
        { key: 'End', action: 'Go to End', description: 'Jump to end of timeline' },
        { key: '←/→', action: 'Seek', description: 'Navigate left/right by 1 second' },
        { key: 'Shift + ←/→', action: 'Fast Seek', description: 'Navigate left/right by 10 seconds' },
      ]
    },
    {
      category: 'File Operations',
      shortcuts: [
        { key: 'Ctrl + O', action: 'Open File', description: 'Import audio file' },
        { key: 'Ctrl + S', action: 'Save Project', description: 'Save current project' },
        { key: 'Ctrl + Shift + S', action: 'Save As', description: 'Save project with new name' },
        { key: 'Ctrl + E', action: 'Export', description: 'Export processed audio' },
        { key: 'Ctrl + N', action: 'New Project', description: 'Create new project' },
      ]
    },
    {
      category: 'Editing',
      shortcuts: [
        { key: 'Ctrl + Z', action: 'Undo', description: 'Undo last action' },
        { key: 'Ctrl + Y', action: 'Redo', description: 'Redo last undone action' },
        { key: 'Ctrl + X', action: 'Cut', description: 'Cut selected audio' },
        { key: 'Ctrl + C', action: 'Copy', description: 'Copy selected audio' },
        { key: 'Ctrl + V', action: 'Paste', description: 'Paste audio from clipboard' },
        { key: 'Ctrl + A', action: 'Select All', description: 'Select entire waveform' },
        { key: 'Delete', action: 'Delete Selection', description: 'Remove selected audio' },
      ]
    },
    {
      category: 'View & Navigation',
      shortcuts: [
        { key: 'Ctrl + +', action: 'Zoom In', description: 'Increase waveform zoom' },
        { key: 'Ctrl + -', action: 'Zoom Out', description: 'Decrease waveform zoom' },
        { key: 'Ctrl + 0', action: 'Zoom to Fit', description: 'Fit entire waveform in view' },
        { key: 'Ctrl + 1', action: 'Actual Size', description: 'Reset zoom to 100%' },
        { key: 'F11', action: 'Fullscreen', description: 'Toggle fullscreen mode' },
      ]
    },
    {
      category: 'Tools & Effects',
      shortcuts: [
        { key: 'Tab', action: 'Next Tool', description: 'Cycle through available tools' },
        { key: 'Shift + Tab', action: 'Previous Tool', description: 'Cycle backwards through tools' },
        { key: 'R', action: 'Record', description: 'Start/stop recording' },
        { key: 'M', action: 'Mute Track', description: 'Mute selected track' },
        { key: 'S', action: 'Solo Track', description: 'Solo selected track' },
        { key: 'L', action: 'Loop Selection', description: 'Toggle loop mode' },
      ]
    },
    {
      category: 'Selection',
      shortcuts: [
        { key: 'I', action: 'Mark In', description: 'Set selection start point' },
        { key: 'O', action: 'Mark Out', description: 'Set selection end point' },
        { key: 'Shift + I', action: 'Go to In', description: 'Jump to selection start' },
        { key: 'Shift + O', action: 'Go to Out', description: 'Jump to selection end' },
        { key: 'Ctrl + Shift + A', action: 'Deselect All', description: 'Clear all selections' },
      ]
    }
  ];

  const getKeyBadgeClass = (key: string) => {
    if (key.includes('Ctrl') || key.includes('Shift') || key.includes('Alt')) {
      return 'bg-accent/20 text-accent border-accent/50';
    }
    return 'bg-primary/20 text-primary border-primary/50';
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Keyboard className="w-4 h-4" />
          Shortcuts
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          <div className="space-y-6">
            {shortcutGroups.map((group) => (
              <Card key={group.category} className="p-4">
                <h3 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    {group.category}
                  </Badge>
                </h3>
                <div className="space-y-3">
                  {group.shortcuts.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{shortcut.action}</div>
                        {shortcut.description && (
                          <div className="text-sm text-muted-foreground">{shortcut.description}</div>
                        )}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`font-mono text-xs ${getKeyBadgeClass(shortcut.key)}`}
                      >
                        {shortcut.key}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
            
            <Card className="p-4 bg-muted/30">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Pro Tip</h4>
                  <p className="text-sm text-muted-foreground">
                    Most shortcuts work when you're not actively typing in an input field. 
                    Use the spacebar for quick play/pause control while navigating the interface.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
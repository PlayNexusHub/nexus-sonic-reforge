import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Upload, 
  Download, 
  Scissors, 
  Copy, 
  Clipboard, 
  Undo2, 
  Redo2,
  Volume2,
  Zap,
  Filter,
  Settings
} from 'lucide-react';

interface AudioToolbarProps {
  onFileUpload: (file: File) => void;
  onExport: () => void;
  className?: string;
}

export const AudioToolbar: React.FC<AudioToolbarProps> = ({
  onFileUpload,
  onExport,
  className = ''
}) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/') || file.name.match(/\.(mp3|wav|ogg|m4a|flac|aac)$/i)) {
        onFileUpload(file);
        // Show success feedback
        const successEvent = new CustomEvent('audio-upload-success', { 
          detail: { fileName: file.name, size: file.size } 
        });
        window.dispatchEvent(successEvent);
      } else {
        // Show error feedback
        const errorEvent = new CustomEvent('audio-upload-error', { 
          detail: { message: 'Please select a valid audio file (MP3, WAV, OGG, M4A, FLAC, AAC)' } 
        });
        window.dispatchEvent(errorEvent);
      }
    }
    // Clear the input so the same file can be selected again
    event.target.value = '';
  };

  return (
    <Card className={`bg-card/80 backdrop-blur-sm border-border/50 ${className}`}>
      <div className="p-4">
        <div className="flex items-center gap-2 flex-wrap">
          {/* File Operations */}
          <div className="flex items-center gap-1">
            <label htmlFor="audio-upload">
              <Button 
                variant="outline" 
                size="sm" 
                className="cursor-pointer hover:bg-primary/20 hover:border-primary/50"
                asChild
              >
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </span>
              </Button>
            </label>
            <input
              id="audio-upload"
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={onExport}
              className="hover:bg-accent/20 hover:border-accent/50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Edit Operations */}
          <div className="flex items-center gap-1">
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-secondary/80"
            >
              <Undo2 className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-secondary/80"
            >
              <Redo2 className="w-4 h-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Audio Tools */}
          <div className="flex items-center gap-1">
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-primary/20 hover:border-primary/50"
            >
              <Scissors className="w-4 h-4 mr-1" />
              Cut
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-primary/20 hover:border-primary/50"
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-primary/20 hover:border-primary/50"
            >
              <Clipboard className="w-4 h-4 mr-1" />
              Paste
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Audio Effects */}
          <div className="flex items-center gap-1">
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-accent/20 hover:border-accent/50"
            >
              <Volume2 className="w-4 h-4 mr-1" />
              Amplify
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-accent/20 hover:border-accent/50"
            >
              <Filter className="w-4 h-4 mr-1" />
              EQ
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-accent/20 hover:border-accent/50"
            >
              <Zap className="w-4 h-4 mr-1" />
              Effects
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Settings */}
          <Button 
            variant="outline" 
            size="sm"
            className="hover:bg-muted/80"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
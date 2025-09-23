import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Save, FolderOpen, FileText, Trash2, Clock, Music } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ProjectData {
  id: string;
  name: string;
  created: Date;
  modified: Date;
  duration: number;
  tracks: number;
  effects: string[];
}

interface ProjectManagerProps {
  currentProject?: string;
  onSaveProject: (name: string) => void;
  onLoadProject: (project: ProjectData) => void;
  className?: string;
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({
  currentProject,
  onSaveProject,
  onLoadProject,
  className = ''
}) => {
  const { toast } = useToast();
  const [projectName, setProjectName] = useState(currentProject || '');
  const [savedProjects, setSavedProjects] = useState<ProjectData[]>([
    {
      id: '1',
      name: 'Electronic Mix v2',
      created: new Date('2024-01-15'),
      modified: new Date('2024-01-20'),
      duration: 245,
      tracks: 8,
      effects: ['Reverb', 'Compressor', 'EQ']
    },
    {
      id: '2',
      name: 'Podcast Episode 12',
      created: new Date('2024-01-10'),
      modified: new Date('2024-01-18'),
      duration: 3600,
      tracks: 3,
      effects: ['Noise Gate', 'EQ']
    },
    {
      id: '3',
      name: 'Guitar Recording',
      created: new Date('2024-01-05'),
      modified: new Date('2024-01-15'),
      duration: 180,
      tracks: 4,
      effects: ['Distortion', 'Delay', 'EQ']
    }
  ]);

  const handleSave = () => {
    if (!projectName.trim()) {
      toast({
        title: "Project name required",
        description: "Please enter a project name",
        variant: "destructive"
      });
      return;
    }

    const newProject: ProjectData = {
      id: Date.now().toString(),
      name: projectName,
      created: new Date(),
      modified: new Date(),
      duration: 180,
      tracks: 5,
      effects: ['Reverb', 'EQ']
    };

    setSavedProjects(prev => [newProject, ...prev]);
    onSaveProject(projectName);
    
    toast({
      title: "Project saved",
      description: `"${projectName}" has been saved successfully`,
    });
  };

  const handleLoad = (project: ProjectData) => {
    setProjectName(project.name);
    onLoadProject(project);
    
    toast({
      title: "Project loaded",
      description: `"${project.name}" has been loaded`,
    });
  };

  const handleDelete = (projectId: string, projectName: string) => {
    setSavedProjects(prev => prev.filter(p => p.id !== projectId));
    
    toast({
      title: "Project deleted",
      description: `"${projectName}" has been deleted`,
      variant: "destructive"
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className={`bg-card/50 backdrop-blur-sm border-border/50 ${className}`}>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Project Manager</h3>
        </div>

        <div className="space-y-4">
          {/* Save Current Project */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">Current Project:</label>
            <div className="flex gap-2">
              <Input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name..."
                className="flex-1 text-sm"
              />
              <Button 
                size="sm" 
                onClick={handleSave}
                className="bg-primary hover:bg-primary/90"
              >
                <Save className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Load Project Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <FolderOpen className="w-4 h-4 mr-2" />
                Load Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Load Project</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {savedProjects.map((project) => (
                    <Card key={project.id} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Music className="w-4 h-4 text-primary" />
                            <h4 className="font-medium text-foreground">{project.name}</h4>
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDuration(project.duration)}
                            </div>
                            <span>{project.tracks} tracks</span>
                            <span>Modified: {formatDate(project.modified)}</span>
                          </div>

                          <div className="flex items-center gap-1 flex-wrap">
                            {project.effects.map((effect) => (
                              <Badge 
                                key={effect} 
                                variant="outline" 
                                className="text-xs bg-primary/10 text-primary border-primary/30"
                              >
                                {effect}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-1 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleLoad(project)}
                          >
                            Load
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(project.id, project.name)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>

          {/* Quick Stats */}
          <div className="border-t border-border pt-3 space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Saved Projects:</span>
              <span>{savedProjects.length}</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Current Status:</span>
              <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/30">
                {projectName || 'Untitled'}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
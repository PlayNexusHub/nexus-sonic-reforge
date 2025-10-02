/**
 * Help & Support Page
 * PlayNexus Sonic Forge 24
 */

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Mail, ArrowLeft, Keyboard, FileAudio, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Help = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="container mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold">Help & Support</h1>
            </div>
            <p className="text-muted-foreground">
              Find answers to common questions and learn how to use Sonic Forge 24
            </p>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors">
            <Button variant="ghost" className="w-full h-full p-6" asChild>
              <a href="mailto:playnexushq@gmail.com" className="flex flex-col items-center gap-3">
                <Mail className="w-8 h-8 text-primary" />
                <div className="text-center">
                  <h3 className="font-semibold mb-1">Email Support</h3>
                  <p className="text-xs text-muted-foreground">Get help via email</p>
                </div>
              </a>
            </Button>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors">
            <Button variant="ghost" className="w-full h-full p-6" asChild>
              <Link to="/about" className="flex flex-col items-center gap-3">
                <Zap className="w-8 h-8 text-accent" />
                <div className="text-center">
                  <h3 className="font-semibold mb-1">About</h3>
                  <p className="text-xs text-muted-foreground">App information</p>
                </div>
              </Link>
            </Button>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors">
            <div className="w-full h-full p-6 flex flex-col items-center gap-3">
              <Keyboard className="w-8 h-8 text-primary" />
              <div className="text-center">
                <h3 className="font-semibold mb-1">Shortcuts</h3>
                <p className="text-xs text-muted-foreground">Press <kbd className="px-1 bg-muted rounded">?</kbd> in editor</p>
              </div>
            </div>
          </Card>
        </div>

        {/* FAQ */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileAudio className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            </div>
            <Separator className="my-4" />
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  What audio formats are supported?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Sonic Forge 24 supports MP3, WAV, OGG, M4A, FLAC, and AAC audio formats. 
                  Maximum file size is 500MB per file.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  Is my audio data stored on servers?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No! All audio processing happens entirely in your browser. Your audio files never 
                  leave your device and are not uploaded to any servers. This ensures complete privacy 
                  and security of your audio content.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  How do I select audio regions?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Click and drag on the waveform to select a region. Use Shift+Click to extend 
                  the selection, or Ctrl/Cmd+Click to set the playhead position without selecting.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  What keyboard shortcuts are available?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span><kbd className="px-2 py-1 bg-muted rounded text-xs">Space</kbd></span>
                      <span>Play/Pause</span>
                    </div>
                    <div className="flex justify-between">
                      <span><kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+O</kbd></span>
                      <span>Open File</span>
                    </div>
                    <div className="flex justify-between">
                      <span><kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+S</kbd></span>
                      <span>Save Project</span>
                    </div>
                    <div className="flex justify-between">
                      <span><kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Z</kbd></span>
                      <span>Undo</span>
                    </div>
                    <div className="flex justify-between">
                      <span><kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+X</kbd></span>
                      <span>Cut Selection</span>
                    </div>
                    <div className="flex justify-between">
                      <span><kbd className="px-2 py-1 bg-muted rounded text-xs">?</kbd></span>
                      <span>Show all shortcuts</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  How do I export my edited audio?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Click the Export button in the toolbar. Your processed audio will be downloaded 
                  to your device. The export preserves the original audio format.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left">
                  Can I save my projects?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! Use the Project Manager in the right sidebar to save and load projects. 
                  Project data is stored in your browser's local storage.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left">
                  What are the zoom controls for?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Zoom controls let you view your waveform at different magnifications. Use them to 
                  zoom in for precise editing or zoom out to see the entire audio file. The zoom 
                  level affects the waveform display detail.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left">
                  How do I apply audio effects?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Use the Effects Panel in the right sidebar. Toggle effects on/off and adjust 
                  parameters using the sliders. Effects are applied in real-time to your audio preview.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger className="text-left">
                  What browsers are supported?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Sonic Forge 24 works best on modern browsers with Web Audio API support: 
                  Chrome, Firefox, Safari, and Edge (latest versions). For optimal performance, 
                  use Chrome or Edge.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger className="text-left">
                  I found a bug or have a feature request
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We'd love to hear from you! Please email us at playnexushq@gmail.com with:
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Detailed description of the issue or feature</li>
                    <li>Steps to reproduce (for bugs)</li>
                    <li>Browser and operating system information</li>
                    <li>Screenshots if applicable</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Card>

        {/* Contact Support */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
          <div className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Still need help?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is here to assist you
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent">
              <a href="mailto:playnexushq@gmail.com">
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </a>
            </Button>
          </div>
        </Card>

        {/* Back Button */}
        <div className="flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Editor
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Help;

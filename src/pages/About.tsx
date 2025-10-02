/**
 * About Page - PlayNexus Sonic Forge 24
 * Displays application information, version, and branding
 */

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Zap, Mail, ExternalLink, Github, Shield, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const version = '1.0.0';
  const buildDate = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="container mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-card/80 to-card/40 backdrop-blur-sm border-border/50">
          <div className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Zap className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Sonic Forge 24
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Professional Audio Editor
            </p>
            <div className="flex items-center justify-center gap-3">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                Version {version}
              </Badge>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                Build: {buildDate}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Branding & Ownership */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Powered by PlayNexus
            </h2>
            <Separator className="my-4" />
            <div className="space-y-3 text-muted-foreground">
              <p className="leading-relaxed">
                <strong className="text-foreground">Sonic Forge 24</strong> is part of the{' '}
                <span className="text-primary font-semibold">PlayNexus</span> ecosystem, 
                delivering professional-grade audio editing tools for creators worldwide.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                  <h3 className="font-semibold text-foreground mb-2">Brand Ecosystem</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• <strong>PlayNexus</strong> - Main Platform</li>
                    <li>• <strong>ClanForge</strong> - Clan & Esports Tools</li>
                    <li>• <strong>BotForge</strong> - AI & Discord Bots</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                  <h3 className="font-semibold text-foreground mb-2">Ownership</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Owner: <strong className="text-primary">Nortaq</strong></li>
                    <li>• Contact: <a href="mailto:playnexushq@gmail.com" className="text-accent hover:underline">playnexushq@gmail.com</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Features */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <Separator className="my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Advanced Waveform Editing',
                'Multi-track Timeline',
                'Real-time Spectral Analysis',
                'Professional Audio Effects',
                'Precision Zoom Controls',
                'Project Management',
                'Audio Metering & Monitoring',
                'Keyboard Shortcuts'
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Legal & Support */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Legal & Support
            </h2>
            <Separator className="my-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button variant="outline" asChild className="justify-start">
                <Link to="/privacy">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Policy
                </Link>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <Link to="/eula">
                  <FileText className="w-4 h-4 mr-2" />
                  EULA
                </Link>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <Link to="/help">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Help & Support
                </Link>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <a href="mailto:playnexushq@gmail.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Us
                </a>
              </Button>
            </div>
          </div>
        </Card>

        {/* Technical Info */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Technical Information</h2>
            <Separator className="my-4" />
            <div className="space-y-2 text-sm font-mono text-muted-foreground">
              <div className="flex justify-between">
                <span>Engine:</span>
                <span className="text-foreground">React 18 + TypeScript</span>
              </div>
              <div className="flex justify-between">
                <span>Audio Processing:</span>
                <span className="text-foreground">Web Audio API</span>
              </div>
              <div className="flex justify-between">
                <span>UI Framework:</span>
                <span className="text-foreground">Tailwind CSS + Shadcn</span>
              </div>
              <div className="flex justify-between">
                <span>Build System:</span>
                <span className="text-foreground">Vite</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Back Button */}
        <div className="flex justify-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent">
            <Link to="/">
              Return to Editor
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;

/**
 * Privacy Policy Page
 * PlayNexus Sonic Forge 24
 */

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  const lastUpdated = 'January 2025';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="container mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-muted-foreground">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </Card>

        {/* Content */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <div className="p-8 space-y-6 prose prose-invert max-w-none">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Introduction</h2>
              <Separator className="my-3" />
              <p className="text-muted-foreground leading-relaxed">
                PlayNexus ("we", "our", or "us"), operated by Nortaq, is committed to protecting your privacy. 
                This Privacy Policy explains how Sonic Forge 24 collects, uses, and safeguards your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Information We Collect</h2>
              <Separator className="my-3" />
              <div className="space-y-3 text-muted-foreground">
                <h3 className="text-lg font-semibold text-foreground">Local Data Processing</h3>
                <p className="leading-relaxed">
                  Sonic Forge 24 processes audio files entirely in your browser. Your audio files are:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Never uploaded to our servers</li>
                  <li>Stored temporarily in browser memory during editing</li>
                  <li>Saved locally on your device when you export</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mt-4">Browser Storage</h3>
                <p className="leading-relaxed">
                  We use browser localStorage to save:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>User preferences and settings</li>
                  <li>Project metadata (not audio data)</li>
                  <li>Application state</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Data Usage</h2>
              <Separator className="my-3" />
              <p className="text-muted-foreground leading-relaxed">
                We do not collect, transmit, or store your personal information or audio files. 
                All processing happens locally on your device. No analytics, tracking, or telemetry 
                is currently implemented.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Third-Party Services</h2>
              <Separator className="my-3" />
              <p className="text-muted-foreground leading-relaxed">
                Sonic Forge 24 does not currently integrate with third-party services. All functionality 
                is self-contained within the application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Security</h2>
              <Separator className="my-3" />
              <p className="text-muted-foreground leading-relaxed">
                Since all data processing occurs locally in your browser, your audio files never leave 
                your device. We implement industry-standard security practices in our code to ensure 
                safe file handling and validation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Your Rights</h2>
              <Separator className="my-3" />
              <p className="text-muted-foreground leading-relaxed">
                You have complete control over your data. You can:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-muted-foreground">
                <li>Clear browser cache to remove all stored preferences</li>
                <li>Use the application without providing any personal information</li>
                <li>Delete projects and files at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Changes to This Policy</h2>
              <Separator className="my-3" />
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. Changes will be posted on this page 
                with an updated "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Contact Us</h2>
              <Separator className="my-3" />
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-3 p-4 bg-muted/30 rounded-lg border border-border/30">
                <p className="font-semibold text-foreground">PlayNexus</p>
                <p className="text-muted-foreground">Owner: Nortaq</p>
                <p className="text-muted-foreground">
                  Email: <a href="mailto:playnexushq@gmail.com" className="text-accent hover:underline">
                    playnexushq@gmail.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </Card>

        {/* Back Button */}
        <div className="flex justify-center gap-3">
          <Button asChild variant="outline" size="lg">
            <Link to="/about">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to About
            </Link>
          </Button>
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

export default Privacy;

/**
 * End User License Agreement (EULA) Page
 * PlayNexus Sonic Forge 24
 */

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const EULA = () => {
  const lastUpdated = 'January 2025';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="container mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold">End User License Agreement</h1>
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
              <h2 className="text-2xl font-bold text-foreground mb-3">Agreement</h2>
              <Separator className="my-3" />
              <p className="text-muted-foreground leading-relaxed">
                This End User License Agreement ("Agreement") is between you ("User") and PlayNexus, 
                owned and operated by Nortaq ("Licensor"). By using Sonic Forge 24 ("Software"), 
                you agree to be bound by the terms of this Agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">License Grant</h2>
              <Separator className="my-3" />
              <p className="text-muted-foreground leading-relaxed">
                Subject to the terms of this Agreement, Licensor grants you a limited, non-exclusive, 
                non-transferable, revocable license to use the Software for personal or commercial purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Restrictions</h2>
              <Separator className="my-3" />
              <p className="text-muted-foreground leading-relaxed mb-3">
                You agree NOT to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                <li>Reverse engineer, decompile, or disassemble the Software</li>
                <li>Remove or alter any proprietary notices or labels</li>
                <li>Use the Software for any illegal or unauthorized purpose</li>
                <li>Distribute, sublicense, or sell copies of the Software without permission</li>
                <li>Use the Software to create competing products</li>
                <li>Attempt to gain unauthorized access to any systems or networks</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Ownership</h2>
              <Separator className="my-3" />
              <p className="text-muted-foreground leading-relaxed">
                The Software and all intellectual property rights therein are and shall remain the 
                exclusive property of PlayNexus and Nortaq. This Agreement does not grant you any 
                ownership rights to the Software.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">User Content</h2>
              <Separator className="my-3" />
              <p className="text-muted-foreground leading-relaxed">
                You retain all rights to audio files and content you create or process using the Software. 
                The Software processes all audio locally on your device and does not upload or transmit 
                your content to our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Disclaimer of Warranties</h2>
              <Separator className="my-3" />
              <div className="p-4 bg-muted/30 rounded-lg border border-border/30">
                <p className="text-muted-foreground leading-relaxed uppercase text-sm font-semibold">
                  THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
                  INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
                  PURPOSE, AND NON-INFRINGEMENT. LICENSOR DOES NOT WARRANT THAT THE SOFTWARE WILL BE 
                  UNINTERRUPTED OR ERROR-FREE.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Limitation of Liability</h2>
              <Separator className="my-3" />
              <div className="p-4 bg-muted/30 rounded-lg border border-border/30">
                <p className="text-muted-foreground leading-relaxed uppercase text-sm font-semibold">
                  IN NO EVENT SHALL PLAYNEXUS OR NORTAQ BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
                  CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, 
                  OR USE, ARISING OUT OF OR RELATED TO YOUR USE OF THE SOFTWARE, EVEN IF ADVISED OF THE 
                  POSSIBILITY OF SUCH DAMAGES.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Updates and Modifications</h2>
              <Separator className="my-3" />
              <p className="text-muted-foreground leading-relaxed">
                Licensor reserves the right to modify, update, or discontinue the Software at any time 
                without prior notice. Updates may be provided automatically or require manual installation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Termination</h2>
              <Separator className="my-3" />
              <p className="text-muted-foreground leading-relaxed">
                This Agreement is effective until terminated. Your rights under this Agreement will 
                terminate automatically if you fail to comply with any term. Upon termination, you must 
                cease all use of the Software and destroy all copies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Governing Law</h2>
              <Separator className="my-3" />
              <p className="text-muted-foreground leading-relaxed">
                This Agreement shall be governed by and construed in accordance with applicable laws, 
                without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Contact Information</h2>
              <Separator className="my-3" />
              <p className="text-muted-foreground leading-relaxed mb-3">
                For questions about this EULA, please contact:
              </p>
              <div className="p-4 bg-muted/30 rounded-lg border border-border/30">
                <p className="font-semibold text-foreground">PlayNexus</p>
                <p className="text-muted-foreground">Owner: Nortaq</p>
                <p className="text-muted-foreground">
                  Email: <a href="mailto:playnexushq@gmail.com" className="text-accent hover:underline">
                    playnexushq@gmail.com
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Entire Agreement</h2>
              <Separator className="my-3" />
              <p className="text-muted-foreground leading-relaxed">
                This Agreement constitutes the entire agreement between you and PlayNexus regarding 
                the Software and supersedes all prior agreements and understandings.
              </p>
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

export default EULA;

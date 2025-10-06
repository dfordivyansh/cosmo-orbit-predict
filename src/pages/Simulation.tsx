import RocketSimulation3D from '@/components/RocketSimulation3D';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

const Simulation = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold gradient-text mb-2">
          3D Rocket Trajectory Simulation
        </h1>
        <p className="text-muted-foreground">
          Interactive visualization of rocket paths and space weather deviation protocols
        </p>
      </div>

      <RocketSimulation3D />

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Simulation Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">How to Use:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Rotate:</strong> Click and drag to rotate the view</li>
              <li><strong>Zoom:</strong> Scroll to zoom in/out</li>
              <li><strong>Pan:</strong> Right-click and drag to pan the camera</li>
              <li><strong>Simulate Deviation:</strong> Click the button to show safe deviation path during severe space weather</li>
            </ul>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-2">Trajectory Legend:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-destructive rounded" />
                <span>Original planned trajectory</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-success rounded" />
                <span>Safe deviation path (activated during severe space weather)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Simulation;

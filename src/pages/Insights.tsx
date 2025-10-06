import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateHistoricalData } from '@/utils/dummyData';
import { TrendingUp, Database, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Insights = () => {
  const [historicalData, setHistoricalData] = useState(generateHistoricalData(50));

  useEffect(() => {
    const interval = setInterval(() => {
      setHistoricalData(generateHistoricalData(50));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const recentPredictions = historicalData.slice(-5).reverse();

  const averages = {
    solarWind: (historicalData.reduce((sum, d) => sum + d.solarWind, 0) / historicalData.length).toFixed(1),
    protonDensity: (historicalData.reduce((sum, d) => sum + d.protonDensity, 0) / historicalData.length).toFixed(2),
    kpIndex: (historicalData.reduce((sum, d) => sum + d.kpIndex, 0) / historicalData.length).toFixed(2),
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold gradient-text mb-2">Data Insights</h1>
        <p className="text-muted-foreground">
          Historical analysis and prediction trends
        </p>
      </div>

      {/* Summary Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              Avg Solar Wind
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {averages.solarWind} km/s
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
              <Database className="h-4 w-4" />
              Avg Proton Density
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">
              {averages.protonDensity} p/cm³
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
              <BarChart3 className="h-4 w-4" />
              Avg Kp Index
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">
              {averages.kpIndex}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Predictions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Recent Predictions (Last 5)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPredictions.map((data, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="mb-2 md:mb-0">
                  <div className="text-sm font-medium">
                    {new Date(data.timestamp).toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Flare Class: {data.flareClass}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground text-xs">Solar Wind</div>
                    <div className="font-semibold">{data.solarWind.toFixed(1)} km/s</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Kp Index</div>
                    <div className={`font-semibold ${data.kpIndex > 5 ? 'text-destructive' : 'text-success'}`}>
                      {data.kpIndex.toFixed(1)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Severity</div>
                    <div className={`font-semibold ${
                      data.severity === 'high' ? 'text-destructive' :
                      data.severity === 'medium' ? 'text-warning' :
                      'text-success'
                    }`}>
                      {data.severity.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Historical Comparison */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Historical Data Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Total Data Points Analyzed</span>
                <span className="font-bold">{historicalData.length}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-cosmic" style={{ width: '100%' }} />
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 rounded-lg bg-success/10 border border-success/30">
                <div className="text-3xl font-bold text-success">
                  {historicalData.filter(d => d.severity === 'low').length}
                </div>
                <div className="text-sm text-muted-foreground">Low Severity Events</div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-warning/10 border border-warning/30">
                <div className="text-3xl font-bold text-warning">
                  {historicalData.filter(d => d.severity === 'medium').length}
                </div>
                <div className="text-sm text-muted-foreground">Medium Severity Events</div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                <div className="text-3xl font-bold text-destructive">
                  {historicalData.filter(d => d.severity === 'high').length}
                </div>
                <div className="text-sm text-muted-foreground">High Severity Events</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Insights;

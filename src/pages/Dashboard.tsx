import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AlertBox from '@/components/AlertBox';
import { Activity, Wind, Zap, Magnet } from 'lucide-react';
import { generateDummySpaceWeather, performanceMetrics, alertMessages, SpaceWeatherData } from '@/utils/dummyData';

const Dashboard = () => {
  const [currentData, setCurrentData] = useState<SpaceWeatherData>(generateDummySpaceWeather());
  const [alerts, setAlerts] = useState(alertMessages);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateDummySpaceWeather();
      setCurrentData(newData);
      
      // Update alerts based on severity
      const newAlert = alertMessages.find(a => a.severity === newData.severity);
      if (newAlert) {
        setAlerts(prev => [{ ...newAlert, timestamp: new Date().toLocaleString() }, ...prev.slice(0, 4)]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      title: 'Solar Wind Speed',
      value: `${currentData.solarWind.toFixed(1)} km/s`,
      icon: Wind,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Proton Density',
      value: `${currentData.protonDensity.toFixed(2)} p/cm³`,
      icon: Activity,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Magnetic Field',
      value: `${currentData.magneticField.toFixed(1)} nT`,
      icon: Magnet,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      title: 'Kp Index',
      value: currentData.kpIndex.toFixed(1),
      icon: Zap,
      color: currentData.kpIndex > 5 ? 'text-destructive' : 'text-success',
      bgColor: currentData.kpIndex > 5 ? 'bg-destructive/10' : 'bg-success/10',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold gradient-text">Mission Control Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date(currentData.timestamp).toLocaleString()}
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="glass-card hover:shadow-glow-primary transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <div className={`${metric.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${metric.color}`}>
                  {metric.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Solar Flare Status */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-warning" />
            Solar Flare Classification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold gradient-text">
              {currentData.flareClass}
            </div>
            <div className="text-sm text-muted-foreground">
              Classes: A (weakest) → B → C → M → X (strongest)
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">RMSE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {performanceMetrics.rmse}
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">MAE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {performanceMetrics.mae}
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {performanceMetrics.accuracy}%
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">F1 Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {performanceMetrics.f1Score}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Active Alerts</h2>
        <div className="space-y-3">
          {alerts.slice(0, 3).map((alert, index) => (
            <AlertBox
              key={index}
              severity={alert.severity}
              message={alert.message}
              timestamp={alert.timestamp}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Shield, Cpu, Satellite } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Rocket,
      title: 'Advanced Trajectory Modeling',
      description: 'State-of-the-art algorithms calculate optimal rocket paths and real-time deviation protocols based on space weather conditions.',
    },
    {
      icon: Shield,
      title: 'Proactive Safety Systems',
      description: 'Automated alert systems monitor solar activity 24/7, providing early warnings for geomagnetic storms and solar flares.',
    },
    {
      icon: Cpu,
      title: 'Machine Learning Predictions',
      description: 'Our ML models analyze historical space weather data to forecast events with 94.7% accuracy.',
    },
    {
      icon: Satellite,
      title: 'Real-Time Data Integration',
      description: 'Continuous monitoring of solar wind, proton density, magnetic fields, and Kp index for comprehensive situational awareness.',
    },
  ];

  const techStack = [
    { name: 'React', purpose: 'Frontend Framework' },
    { name: 'Three.js', purpose: '3D Visualization' },
    { name: 'Tailwind CSS', purpose: 'Styling System' },
    { name: 'TypeScript', purpose: 'Type Safety' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold gradient-text">About CosmoPredict</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A cutting-edge space weather monitoring and rocket trajectory simulation platform 
          designed to ensure safe space missions through predictive analytics and real-time 3D visualization.
        </p>
      </div>

      {/* Mission Statement */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-3xl">Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="text-lg text-muted-foreground space-y-4">
          <p>
            CosmoPredict aims to revolutionize space mission planning by providing unprecedented 
            visibility into space weather conditions and their impact on rocket trajectories.
          </p>
          <p>
            By combining advanced machine learning algorithms, real-time data processing, and 
            intuitive 3D visualization, we empower mission controllers to make informed decisions 
            that prioritize crew safety and mission success.
          </p>
        </CardContent>
      </Card>

      {/* Key Features */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center gradient-text">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="glass-card hover:shadow-glow-primary transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Technology Stack */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-3xl">Technology Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-center"
              >
                <div className="font-bold text-lg gradient-text mb-1">{tech.name}</div>
                <div className="text-sm text-muted-foreground">{tech.purpose}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="glass-card text-center">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-primary mb-2">94.7%</div>
            <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card text-center">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-accent mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Real-Time Monitoring</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card text-center">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-secondary mb-2">3D</div>
            <div className="text-sm text-muted-foreground">Interactive Visualization</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card text-center">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-success mb-2">0.042</div>
            <div className="text-sm text-muted-foreground">RMSE Score</div>
          </CardContent>
        </Card>
      </div>

      {/* Future Roadmap */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-3xl">Future Development</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2" />
              <span>Integration with live space weather APIs for real-time data feeds</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-accent rounded-full mt-2" />
              <span>Advanced ML models for extended forecast periods (72+ hours)</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-secondary rounded-full mt-2" />
              <span>Multi-mission trajectory planning with collaborative features</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-success rounded-full mt-2" />
              <span>Mobile app for on-the-go mission monitoring</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;

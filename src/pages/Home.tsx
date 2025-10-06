import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, Activity, Satellite } from 'lucide-react';
import heroImage from '@/assets/hero-space.jpg';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">CosmoPredict</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              3D Space Weather & Rocket Simulation
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Visualize rocket trajectories in real-time 3D, predict space weather impacts, 
              and explore deviation protocols with advanced simulation technology.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/simulation">
                <Button size="lg" className="shadow-glow-primary">
                  <Rocket className="mr-2 h-5 w-5" />
                  Launch Simulation
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="hover:shadow-glow-accent">
                  <Activity className="mr-2 h-5 w-5" />
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 stars-background opacity-30" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-nebula">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
            Mission Capabilities
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl hover:shadow-glow-primary transition-all animate-float">
              <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">3D Trajectory Simulation</h3>
              <p className="text-muted-foreground">
                Interactive Three.js visualization showing real-time rocket paths with deviation protocols 
                based on space weather predictions.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl hover:shadow-glow-accent transition-all animate-float" style={{ animationDelay: '0.2s' }}>
              <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Activity className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Real-Time Monitoring</h3>
              <p className="text-muted-foreground">
                Live dashboard tracking solar wind, proton density, magnetic fields, and Kp index 
                with automated alert systems.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl hover:shadow-glow-accent transition-all animate-float" style={{ animationDelay: '0.4s' }}>
              <div className="bg-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Satellite className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Predictive Analytics</h3>
              <p className="text-muted-foreground">
                Advanced algorithms analyzing historical data to forecast solar flares and 
                geomagnetic storms with high accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="glass-card p-12 rounded-2xl max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              Ready to Explore?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Experience the future of space weather prediction and rocket trajectory simulation.
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="shadow-glow-primary">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

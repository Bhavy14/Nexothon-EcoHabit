import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to auth page since this is the landing page
    navigate('/login');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Redirecting to EcoHabit...</h1>
        <p className="text-xl text-muted-foreground">Building your sustainable future!</p>
      </div>
    </div>
  );
};

export default Index;

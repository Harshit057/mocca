/* filepath: d:\mocca\client\src\App.jsx */
import { Link } from "react-router-dom";

export default function App() {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f3e8d3 0%, #e8d5b7 25%, #f0e6d2 50%, #f5efe5 75%, #faf6f0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    },
    backgroundBlob1: {
      position: 'absolute',
      top: '-100px',
      left: '-100px',
      width: '300px',
      height: '300px',
      background: '#8B4513',
      borderRadius: '50%',
      opacity: 0.1,
      filter: 'blur(60px)',
      animation: 'pulse 3s ease-in-out infinite'
    },
    backgroundBlob2: {
      position: 'absolute',
      bottom: '-120px',
      right: '-100px',
      width: '250px',
      height: '250px',
      background: '#D2691E',
      borderRadius: '50%',
      opacity: 0.15,
      filter: 'blur(40px)',
      animation: 'pulse 3s ease-in-out infinite 0.5s'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.4)',
      backdropFilter: 'blur(20px)',
      border: '2px solid #DEB887',
      borderRadius: '24px',
      padding: '48px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      textAlign: 'center',
      maxWidth: '1200px',
      width: '100%'
    },
    title: {
      fontSize: '4rem',
      fontWeight: '800',
      color: '#3E2723',
      marginBottom: '24px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
    },
    subtitle: {
      fontSize: '1.5rem',
      color: '#6F4E37',
      fontWeight: '500',
      maxWidth: '600px',
      margin: '0 auto 48px auto',
      lineHeight: '1.6'
    },
    featureGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '32px',
      marginBottom: '48px'
    },
    featureCard: {
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      border: '1px solid #DEB887',
      borderRadius: '16px',
      padding: '24px'
    },
    featureIcon: {
      fontSize: '3rem',
      marginBottom: '16px'
    },
    featureTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#3E2723',
      marginBottom: '8px'
    },
    featureText: {
      color: '#6F4E37'
    },
    buttonContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '24px'
    },
    primaryButton: {
      padding: '12px 24px',
      background: 'linear-gradient(135deg, #6F4E37, #8B4513)',
      color: 'white',
      fontWeight: '600',
      borderRadius: '12px',
      textDecoration: 'none',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      transition: 'all 0.2s ease',
      border: 'none',
      cursor: 'pointer'
    },
    secondaryButton: {
      padding: '12px 24px',
      background: 'linear-gradient(135deg, #D2691E, #DEB887)',
      color: 'white',
      fontWeight: '600',
      borderRadius: '12px',
      textDecoration: 'none',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      transition: 'all 0.2s ease',
      border: 'none',
      cursor: 'pointer'
    },
    tertiaryButton: {
      padding: '12px 24px',
      background: 'linear-gradient(135deg, #DEB887, #F5DEB3)',
      color: '#3E2723',
      fontWeight: '600',
      borderRadius: '12px',
      textDecoration: 'none',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      transition: 'all 0.2s ease',
      border: 'none',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        .hover-scale:hover {
          transform: scale(1.05);
        }
      `}</style>
      
      <div style={styles.backgroundBlob1}></div>
      <div style={styles.backgroundBlob2}></div>
      
      <div style={styles.card}>
        <div>
          <h1 style={styles.title}>
            ☕ Mocca Meet
          </h1>
          <p style={styles.subtitle}>
            Connect over a virtual latte. Experience crystal-clear video calls with an elegant, coffee-inspired interface.
          </p>
        </div>

        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🎥</div>
            <h3 style={styles.featureTitle}>HD Video Calls</h3>
            <p style={styles.featureText}>Crystal clear video quality for your meetings</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🚀</div>
            <h3 style={styles.featureTitle}>Instant Rooms</h3>
            <p style={styles.featureText}>Create or join rooms in seconds</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>☕</div>
            <h3 style={styles.featureTitle}>Coffee Vibes</h3>
            <p style={styles.featureText}>Warm, inviting interface design</p>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <Link to="/login" style={styles.primaryButton} className="hover-scale">
            🔐 Sign In
          </Link>
          <Link to="/register" style={styles.secondaryButton} className="hover-scale">
            📝 Create Account
          </Link>
          <Link to="/dashboard" style={styles.tertiaryButton} className="hover-scale">
            🚀 Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
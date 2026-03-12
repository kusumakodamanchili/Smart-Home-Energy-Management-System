import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Zap,
  BarChart3,
  Shield,
  Leaf,
  Clock,
  Smartphone,
  ArrowRight,
  Star,
  TrendingDown,
  Users,
  Award,
  Settings,
  LayoutDashboard,
  User,
  HelpCircle,
} from "lucide-react";

// hero image imported from src so bundler handles it
import heroImage from "./landing-hero.jpeg";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const menu = document.querySelector(".profileMenu");
      const profileIcon = document.querySelector(".profileIcon");
      if (profileOpen && menu && !menu.contains(event.target) && !profileIcon.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem('currentUser');
    window.location.href = "/sign_in.html";
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body, html, #root {
          height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        :root {
          --primary: #0ea5e9;
          --accent: #06b6d4;
          --dark: #0f172a;
          --light: #f8fafc;
          --text-dark: #1e293b;
          --text-light: #64748b;
          --border: #e2e8f0;
          --success: #10b981;
        }

        .landingPage {
          background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
          color: var(--text-dark);
          overflow-x: hidden;
        }

        /* NAVBAR */
        .navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .navContainer {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
        }

        .navBrand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--dark);
          text-decoration: none;
          cursor: pointer;
        }

        .navBrand img {
          width: 35px;
          height: 35px;
          object-fit: contain;
        }

        .navCenter {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .navCenter a {
          text-decoration: none;
          color: var(--text-light);
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.3s;
        }

        .navCenter a:hover {
          color: var(--primary);
        }

        .navRight {
          display: flex;
          gap: 1rem;
          align-items: center;
          position: relative;
        }

        .navButton {
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .navButton:hover {
          background: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2);
        }

        .profileIcon {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
        }

        .profileIcon:hover {
          background: var(--accent);
        }

        .profileMenu {
          position: absolute;
          right: 0;
          top: 50px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 8px;
          min-width: 200px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          z-index: 100;
          animation: slideDown 0.3s ease;
        }

        .profileMenu a, .profileMenu button {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 0.75rem 1rem;
          border: none;
          background: none;
          text-align: left;
          color: var(--text-dark);
          text-decoration: none;
          cursor: pointer;
          font-size: 0.95rem;
          transition: background 0.3s;
        }

        .profileMenu a:hover, .profileMenu button:hover {
          background: #f0f9ff;
          color: var(--primary);
        }

        .profileMenu svg {
          width: 18px;
          height: 18px;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* HERO SECTION */
        .hero {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 1.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          min-height: 600px;
        }

        .heroContent h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.2;
          color: var(--dark);
          margin-bottom: 1.5rem;
        }

        .heroContent p {
          font-size: 1.1rem;
          color: var(--text-light);
          line-height: 1.8;
          margin-bottom: 2rem;
          max-width: 500px;
        }

        .heroCTA {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .primaryBtn {
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          color: white;
          border: none;
          padding: 0.9rem 2rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .primaryBtn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(14, 165, 233, 0.3);
        }

        .secondaryBtn {
          background: white;
          color: var(--primary);
          border: 2px solid var(--primary);
          padding: 0.8rem 1.9rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .secondaryBtn:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-3px);
        }

        .heroImage {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 400px;           /* keeps it tall on desktop */
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
        }

        .heroImage img {
          width: 100%;
          height: 100%;
          display: block;              /* removes baseline gap */
          object-fit: cover;           /* fills container */
          object-position: center;     /* you can tweak, e.g. "center top" */
        }
        /* FEATURES SECTION */
        .section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 5rem 1.5rem;
        }

        .sectionTitle {
          text-align: center;
          margin-bottom: 3rem;
        }

        .sectionTitle h2 {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--dark);
          margin-bottom: 1rem;
        }

        .sectionTitle p {
          font-size: 1.1rem;
          color: var(--text-light);
          max-width: 600px;
          margin: 0 auto;
        }

        .featuresGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .featureCard {
          background: white;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s;
        }

        .featureCard:hover {
          transform: translateY(-5px);
          border-color: var(--primary);
          box-shadow: 0 15px 35px rgba(14, 165, 233, 0.1);
        }

        .featureIcon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #dbeafe 0%, #cffafe 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: var(--primary);
        }

        .featureCard h3 {
          font-size: 1.3rem;
          color: var(--dark);
          margin-bottom: 0.8rem;
          font-weight: 700;
        }

        .featureCard p {
          color: var(--text-light);
          line-height: 1.7;
          font-size: 0.95rem;
        }

        /* STATS SECTION */
        .statsGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2rem;
        }

        .statCard {
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          color: white;
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
        }

        .statCard h3 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .statCard p {
          font-size: 1rem;
          opacity: 0.9;
        }

        /* TESTIMONIALS */
        .testimonialGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .testimonialCard {
          background: white;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 2rem;
          transition: all 0.3s;
        }

        .testimonialCard:hover {
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
          border-color: var(--primary);
        }

        .stars {
          display: flex;
          gap: 4px;
          margin-bottom: 1rem;
        }

        .stars svg {
          width: 18px;
          height: 18px;
          color: #fbbf24;
        }

        .testimonialText {
          color: var(--text-dark);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .testimonialAuthor {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .authorAvatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
        }

        .authorInfo h4 {
          color: var(--dark);
          font-weight: 700;
          font-size: 0.95rem;
        }

        .authorInfo p {
          color: var(--text-light);
          font-size: 0.85rem;
        }

        /* CTA SECTION */
        .ctaSection {
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          color: white;
          padding: 4rem 1.5rem;
          border-radius: 16px;
          text-align: center;
          margin-bottom: 5rem;
        }

        .ctaSection h2 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .ctaSection p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          opacity: 0.95;
        }

        .ctaButton {
          background: white;
          color: var(--primary);
          border: none;
          padding: 0.9rem 2rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .ctaButton:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        /* FOOTER */
        .footer {
          border-top: 1px solid var(--border);
          background: white;
          padding: 3rem 1.5rem;
          text-align: center;
          color: var(--text-light);
          font-size: 0.9rem;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .navCenter {
            display: none;
          }

          .hero {
            grid-template-columns: 1fr;
            padding: 2rem 1.5rem;
          }

          .heroImage {
            height: 300px;
          }

          .sectionTitle h2 {
            font-size: 1.8rem;
          }

          .section {
            padding: 3rem 1.5rem;
          }
        }
      `}</style>

      <div className="landingPage">
        {/* NAVBAR */}
        <nav className="navbar">
          <div className="navContainer">
            <div className="navBrand">
              <img src="/loginlogo.png" alt="Smart Home Energy" />
              Smart Home Energy
            </div>

            <div className="navCenter">
              <a href="#features">Features</a>
              <a href="#benefits">Benefits</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#contact">Contact</a>
            </div>

            <div className="navRight">
              <button className="navButton" onClick={() => (window.location.href = "/dashboard")}>
                <LayoutDashboard size={18} />
                Dashboard
              </button>

              <div
                className="profileIcon"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <User size={20} />
              </div>

              {profileOpen && (
                <div className="profileMenu">
                  <a href="/profile">
                    <User size={18} />
                    Profile
                  </a>
                  <a href="/dashboard">
                    <LayoutDashboard size={18} />
                    Dashboard
                  </a>
                  <a href="/analytics">
                    <BarChart3 size={18} />
                    Analytics
                  </a>
                  <a href="/settings">
                    <Settings size={18} />
                    Settings
                  </a>
                  <a href="/help">
                    <HelpCircle size={18} />
                    Help Center
                  </a>
                  <button onClick={handleLogout}>
                    <X size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="hero">
          <div className="heroContent">
            <h1>Your Smart Home, Smarter Energy</h1>
            <p>
              Monitor, control, and optimize your home's energy consumption in real-time. 
              Save up to 40% on energy costs with AI-powered insights and intelligent automation.
            </p>
            <div className="heroCTA">
              <button className="primaryBtn" onClick={() => (window.location.href = "/dashboard")}>
                <LayoutDashboard size={20} />
                Go to Dashboard
              </button>
              <button className="secondaryBtn" onClick={() => (window.location.href = "/profile")}>
                <User size={20} />
                View Profile
              </button>
            </div>
          </div>
          <div className="heroImage">
            <img src={heroImage} alt="Smart home dashboard" />
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="section" id="features">
          <div className="sectionTitle">
            <h2>Powerful Features</h2>
            <p>Everything you need to take control of your energy management</p>
          </div>
          <div className="featuresGrid">
            <div className="featureCard">
              <div className="featureIcon">
                <Zap size={32} />
              </div>
              <h3>Real-Time Monitoring</h3>
              <p>Track energy consumption live across all devices with instant alerts for unusual patterns</p>
            </div>
            <div className="featureCard">
              <div className="featureIcon">
                <BarChart3 size={32} />
              </div>
              <h3>Advanced Analytics</h3>
              <p>Get detailed insights into your energy usage with predictive analytics and historical trends</p>
            </div>
            <div className="featureCard">
              <div className="featureIcon">
                <Smartphone size={32} />
              </div>
              <h3>Mobile Control</h3>
              <p>Control all your smart devices from anywhere with our intuitive mobile app</p>
            </div>
            <div className="featureCard">
              <div className="featureIcon">
                <Shield size={32} />
              </div>
              <h3>Enterprise Security</h3>
              <p>Bank-level encryption and multi-factor authentication protect your home and data</p>
            </div>
            <div className="featureCard">
              <div className="featureIcon">
                <Leaf size={32} />
              </div>
              <h3>Eco Insights</h3>
              <p>Reduce your carbon footprint with smart recommendations and sustainability tracking</p>
            </div>
            <div className="featureCard">
              <div className="featureIcon">
                <Clock size={32} />
              </div>
              <h3>24/7 Support</h3>
              <p>Get expert support around the clock to optimize your smart home setup</p>
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="section" id="benefits">
          <div className="sectionTitle">
            <h2>Why Choose Our Platform</h2>
            <p>Join thousands of homeowners who are saving money and energy</p>
          </div>
          <div className="statsGrid">
            <div className="statCard">
              <h3>40%</h3>
              <p>Average Energy Savings</p>
            </div>
            <div className="statCard">
              <h3>50K+</h3>
              <p>Active Users</p>
            </div>
            <div className="statCard">
              <h3>100K</h3>
              <p>Tons CO2 Reduced</p>
            </div>
            <div className="statCard">
              <h3>150+</h3>
              <p>Countries Supported</p>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section" id="testimonials">
          <div className="sectionTitle">
            <h2>What Our Users Say</h2>
            <p>Real experiences from real customers</p>
          </div>
          <div className="testimonialGrid">
            <div className="testimonialCard">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="currentColor" />
                ))}
              </div>
              <p className="testimonialText">
                "I've reduced my energy bill by almost 45% in just 3 months. The insights are incredible!"
              </p>
              <div className="testimonialAuthor">
                <div className="authorAvatar">JD</div>
                <div className="authorInfo">
                  <h4>John Davis</h4>
                  <p>Homeowner, California</p>
                </div>
              </div>
            </div>
            <div className="testimonialCard">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="currentColor" />
                ))}
              </div>
              <p className="testimonialText">
                "The automation features have made managing our office energy consumption so easy and efficient."
              </p>
              <div className="testimonialAuthor">
                <div className="authorAvatar">SM</div>
                <div className="authorInfo">
                  <h4>Sarah Miller</h4>
                  <p>Building Manager, New York</p>
                </div>
              </div>
            </div>
            <div className="testimonialCard">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="currentColor" />
                ))}
              </div>
              <p className="testimonialText">
                "Outstanding customer support and a platform that actually makes a difference in sustainability."
              </p>
              <div className="testimonialAuthor">
                <div className="authorAvatar">RC</div>
                <div className="authorInfo">
                  <h4>Rachel Chen</h4>
                  <p>Green Enthusiast, Texas</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="ctaSection">
          <h2>Ready to Take Control?</h2>
          <p>Join thousands of users saving money and energy every day</p>
          <button className="ctaButton" onClick={() => (window.location.href = "/dashboard")}>
            Get Started Now <ArrowRight size={20} />
          </button>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          © {new Date().getFullYear()} Smart Home Energy. All rights reserved. | 
          <a href="/privacy" style={{ color: "var(--primary)", marginLeft: "1rem", textDecoration: "none" }}>Privacy Policy</a>
        </footer>
      </div>
    </>
  );
}

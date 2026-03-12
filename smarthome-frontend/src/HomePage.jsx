'use client';

import React, { useState } from 'react';
import {
  Zap,
  Smartphone,
  BarChart3,
  DollarSign,
  Leaf,
  HeadphonesIcon,
  CheckCircle2,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  TrendingDown,
  Users,
  Award,
  Globe,
  Star,
  Clock,
  Shield,
  Lightbulb,
} from 'lucide-react';

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const services = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Energy Optimization',
      description:
        'Automatically adjust energy usage using intelligent algorithms to reduce wastage and lower electricity bills.',
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Smart Device Control',
      description:
        'Manage and control all connected smart devices like lights, fans, and appliances from a single dashboard.',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Usage Analytics',
      description:
        'View detailed daily, weekly, and monthly reports of energy consumption for better planning and efficiency.',
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Cost Estimation',
      description:
        'Get accurate estimates of your monthly electricity expenses based on real-time device usage.',
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Eco-Friendly Recommendations',
      description:
        'Receive smart suggestions to adopt sustainable practices and minimize your carbon footprint.',
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: '24/7 Support',
      description:
        'Enjoy continuous monitoring with reliable customer support to ensure uninterrupted smart energy management.',
    },
  ];

  const features = [
    'Real-Time Energy Monitoring – Continuously track your home\'s total power consumption in real-time',
    'Smart Automation – Schedule and automate devices based on time, occupancy, or temperature',
    'Data-Driven Insights – Analyze reports with visual charts and predictive analytics',
    'Cost Management – Estimate electricity costs dynamically and receive alerts for unusual spikes',
  ];

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: '50K+',
      label: 'Active Users',
    },
    {
      icon: <TrendingDown className="w-8 h-8" />,
      number: '40%',
      label: 'Avg. Cost Savings',
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      number: '100K',
      label: 'Tons CO2 Reduced',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      number: '150+',
      label: 'Countries Served',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      title: 'Homeowner',
      comment:
        'Smart Home Energy has transformed how I manage electricity at home. The real-time monitoring and automated scheduling have cut my energy bills by 35%!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      title: 'Business Manager',
      comment:
        'The analytics dashboard is incredibly intuitive. We implemented this across our office and the results speak for themselves. Highly recommended for any enterprise.',
      rating: 5,
    },
    {
      name: 'Emma Rodriguez',
      title: 'Sustainability Officer',
      comment:
        'Excellent platform for tracking environmental impact. The eco-recommendations have helped us achieve our sustainability goals while reducing operational costs.',
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$9.99',
      period: '/month',
      description: 'Perfect for small homes',
      features: ['Up to 10 devices', 'Basic analytics', 'Email support'],
      cta: 'Get Started',
    },
    {
      name: 'Professional',
      price: '$24.99',
      period: '/month',
      description: 'Ideal for large homes',
      features: ['Unlimited devices', 'Advanced analytics', 'Priority support', 'Custom automation'],
      cta: 'Get Started',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For businesses',
      features: ['Unlimited everything', 'Dedicated support', 'API access', 'Custom integrations'],
      cta: 'Contact Sales',
    },
  ];

  const faqs = [
    {
      id: 1,
      question: 'How does Smart Home Energy help reduce electricity bills?',
      answer: 'Our AI-powered system analyzes your energy consumption patterns and automatically optimizes device usage during peak and off-peak hours. It identifies energy-wasting devices and provides recommendations to shift usage to cheaper time slots, typically resulting in 30-40% cost savings.',
    },
    {
      id: 2,
      question: 'Which devices are compatible with the Smart Home Energy system?',
      answer: 'Our platform supports all major smart home devices including thermostats, smart lights, refrigerators, washing machines, electric vehicles, and solar panels. We integrate with popular brands like Philips Hue, Nest, LIFX, Alexa, and Google Home. Check our compatibility list for specific models.',
    },
    {
      id: 3,
      question: 'Is my data safe and private?',
      answer: 'Yes, we use military-grade encryption (AES-256) to protect all your data. Your energy consumption data is never shared with third parties without explicit consent. We comply with GDPR, CCPA, and other international privacy standards. All data is stored securely on encrypted servers.',
    },
    {
      id: 4,
      question: 'How long does installation take?',
      answer: 'Installation typically takes 30-60 minutes. Our system connects wirelessly to your smart devices without requiring any physical modifications. You can set up your account, install the app, and start monitoring energy usage within an hour. Professional installation assistance is available for enterprise plans.',
    },
    {
      id: 5,
      question: 'Can I track energy usage for specific appliances?',
      answer: 'Absolutely! Our advanced analytics dashboard shows real-time consumption for each connected device. You can set individual device limits, view historical data, and receive alerts if any appliance exceeds its threshold. This granular tracking helps identify which devices consume the most energy.',
    },
    {
      id: 6,
      question: 'What happens if the internet connection is lost?',
      answer: 'Your devices will continue operating normally even without internet. Pre-scheduled automations will continue to run based on local settings. Data will sync automatically once your connection is restored. Critical alerts are sent via SMS if mobile connectivity is available.',
    },
    {
      id: 7,
      question: 'Can I integrate renewable energy sources like solar panels?',
      answer: 'Yes! Our platform fully supports solar panels and other renewable energy sources. Track solar generation in real-time, monitor battery storage, and automatically switch to solar power when available. This maximizes your renewable energy usage and further reduces your electricity costs.',
    },
    {
      id: 8,
      question: 'What support options are available?',
      answer: 'We offer 24/7 customer support via phone, email, and live chat. Professional and Enterprise plans include priority support with dedicated account managers. We also provide extensive documentation, video tutorials, and a community forum for peer support.',
    },
  ];

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        body, html, #root {
          height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        :root {
          --primary: #0ea5e9;
          --primary-dark: #0284c7;
          --accent: #06b6d4;
          --success: #10b981;
          --text-primary: #1f2937;
          --text-secondary: #6b7280;
          --text-light: #f9fafb;
          --bg-light: #ffffff;
          --bg-secondary: #f3f4f6;
          --border: #e5e7eb;
          --border-accent: #d1d5db;
        }

        .homepage {
          min-height: 100vh;
          color: var(--text-primary);
          background: var(--bg-light);
        }

        .container {
          width: min(1400px, calc(100% - 2rem));
          margin: 0 auto;
        }

        /* NAVBAR */
        .navbar {
          position: sticky;
          top: 0;
          z-index: 10;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .navbarInner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
          gap: 1rem;
        }

        .logoRow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          min-width: max-content;
        }

        .logo {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }

        .title {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.3px;
          white-space: nowrap;
          color: var(--text-primary);
        }

        .links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .links a {
          text-decoration: none;
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 500;
          position: relative;
          transition: 0.25s ease;
          outline: none;
        }

        .links a::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0;
          height: 2px;
          background: var(--primary);
          transition: width 0.25s ease;
        }

        .links a:hover {
          color: var(--text-primary);
        }

        .links a:hover::after {
          width: 100%;
        }

        .cta {
          padding: 0.625rem 1.25rem;
          border-radius: 6px;
          text-decoration: none;
          background: var(--primary);
          color: white;
          font-size: 0.9rem;
          font-weight: 600;
          transition: 0.25s ease;
          white-space: nowrap;
          border: none;
          cursor: pointer;
        }

        .cta:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
        }

        /* HERO */
        .hero {
          position: relative;
          overflow: hidden;
          padding: 6rem 0 4rem;
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
        }

        .hero::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(14, 165, 233, 0.1), transparent 70%);
          top: -200px;
          left: -200px;
          filter: blur(40px);
          pointer-events: none;
        }

        .hero::after {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.08), transparent 70%);
          bottom: -200px;
          right: -200px;
          filter: blur(40px);
          pointer-events: none;
        }

        
        .heroInner {
          text-align: center;
          padding: 2rem 0;
          position: relative;
        }

        .hero h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          margin-bottom: 1.25rem;
          line-height: 1.2;
          color: var(--text-primary);
        }

        .hero p {
          margin: 1rem auto 2rem;
          max-width: 640px;
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .heroActions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 1.5rem;
        }

        .button {
          padding: 0.875rem 2rem;
          border-radius: 6px;
          border: none;
          font-size: 1rem;
          font-weight: 600;
          background: var(--primary);
          color: white;
          cursor: pointer;
          transition: 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
        }

        .button:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(14, 165, 233, 0.4);
        }

        .buttonSecondary {
          padding: 0.875rem 2rem;
          border-radius: 6px;
          background: transparent;
          border: 2px solid var(--border-accent);
          color: var(--text-primary);
          cursor: pointer;
          transition: 0.25s ease;
          font-weight: 600;
          font-size: 1rem;
        }

        .buttonSecondary:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: rgba(14, 165, 233, 0.05);
          transform: translateY(-2px);
        }

        /* SECTION */
        .section {
          padding: 5rem 0;
          scroll-margin-top: 13vh;
        }

        .sectionHeader {
          text-align: center;
          margin-bottom: 3rem;
        }

        .sectionHeader h2 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .sectionHeader p {
          font-size: 1.15rem;
          max-width: 720px;
          margin: 0 auto;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* STATS SECTION */
        .statsSection {
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%);
          border-radius: 12px;
          padding: 3rem;
          margin-bottom: 3rem;
        }

        .statsGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .statCard {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .statIcon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(6, 182, 212, 0.15));
          border-radius: 10px;
          color: var(--primary);
        }

        .statNumber {
          font-size: 2rem;
          font-weight: 800;
          color: var(--primary);
        }

        .statLabel {
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        /* ABOUT SECTION */
        .aboutSection {
          background: linear-gradient(135deg, #f0f9ff 0%, #f0fdfa 100%);
          border-radius: 12px;
          padding: 3rem;
        }

        .aboutContent {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .aboutText p {
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .aboutImage {
          width: 100%;
          height: 475px;
          border-radius: 12px;
          object-fit: cover;
          box-shadow: 0 10px 30px rgba(14, 165, 233, 0.2);
        }

        /* CARDS */
        .cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        @media (min-width: 1024px) {
          .cards {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
        }

        .card {
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 2rem;
          transition: 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.05), rgba(6, 182, 212, 0.05));
          opacity: 0;
          transition: 0.3s ease;
          pointer-events: none;
        }

        .card:hover::before {
          opacity: 1;
        }

        .card:hover {
          transform: translateY(-8px);
          border-color: var(--primary);
          box-shadow: 0 12px 24px rgba(14, 165, 233, 0.15);
        }

        .cardIcon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(6, 182, 212, 0.1));
          border-radius: 8px;
          color: var(--primary);
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }

        .card h3 {
          margin-bottom: 0.75rem;
          font-size: 1.25rem;
          color: var(--text-primary);
          font-weight: 700;
          position: relative;
          z-index: 1;
        }

        .card p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          position: relative;
          z-index: 1;
        }

        /* TESTIMONIALS */
        .testimonialCard {
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 2rem;
          transition: 0.3s ease;
        }

        .testimonialCard:hover {
          border-color: var(--primary);
          box-shadow: 0 8px 20px rgba(14, 165, 233, 0.1);
        }

        .stars {
          display: flex;
          gap: 0.25rem;
          margin-bottom: 1rem;
        }

        .star {
          color: #fbbf24;
          font-size: 1.25rem;
        }

        .testimonialText {
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .testimonialAuthor {
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .testimonialTitle {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        /* PRICING */
        .pricingPlans {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .pricingCard {
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 2.5rem;
          text-align: center;
          position: relative;
          transition: 0.3s ease;
        }

        .pricingCard.popular {
          border-color: var(--primary);
          transform: scale(1.05);
          box-shadow: 0 15px 40px rgba(14, 165, 233, 0.2);
        }

        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--primary);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .pricingCard h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .pricingCard p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .priceTag {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }

        .pricePeriod {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .pricingFeatures {
          list-style: none;
          margin-bottom: 2rem;
          text-align: left;
        }

        .pricingFeatures li {
          padding: 0.75rem 0;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-bottom: 1px solid var(--border);
        }

        .pricingFeatures li::before {
          content: '✓';
          color: var(--primary);
          font-weight: bold;
        }

        .pricingFeatures li:last-child {
          border-bottom: none;
        }

        .pricingBtn {
          width: 100%;
          padding: 1rem;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .pricingBtn.primary {
          background: var(--primary);
          color: white;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
        }

        .pricingBtn.primary:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
        }

        .pricingBtn.secondary {
          background: transparent;
          border: 2px solid var(--border);
          color: var(--text-primary);
        }

        .pricingBtn.secondary:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        /* FEATURES */
        .featuresBox {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 2.5rem;
        }

        .features ul {
          max-width: 900px;
          margin: 0 auto;
          list-style: none;
          display: grid;
          gap: 1.25rem;
        }

        .features li {
          color: var(--text-secondary);
          position: relative;
          padding-left: 2rem;
          line-height: 1.7;
          font-size: 1rem;
          display: flex;
          align-items: flex-start;
        }

        .features li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.5rem;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary);
          flex-shrink: 0;
        }

        .features li::after {
          content: '✓';
          position: absolute;
          left: 5px;
          top: 0rem;
          color: white;
          font-weight: bold;
          font-size: 0.9rem;
        }

        /* FAQ SECTION */
        .faqSection {
          max-width: 800px;
          margin: 0 auto;
        }

        .faqContainer {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faqItem {
          background: var(--bg-light);
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          transition: 0.3s ease;
        }

        .faqItem:hover {
          border-color: var(--primary);
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.1);
        }

        .faqHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          background: var(--bg-light);
          cursor: pointer;
          user-select: none;
          transition: 0.25s ease;
        }

        .faqHeader:hover {
          background: rgba(14, 165, 233, 0.02);
        }

        .faqItem.active .faqHeader {
          background: rgba(14, 165, 233, 0.05);
          border-bottom: 1px solid var(--border);
        }

        .faqQuestion {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 1rem;
          margin: 0;
          text-align: left;
        }

        .faqIcon {
          color: var(--primary);
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: 0.3s ease;
          font-weight: bold;
        }

        .faqItem.active .faqIcon {
          transform: rotate(180deg);
        }

        .faqAnswer {
          padding: 1.5rem;
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 0.95rem;
          background: rgba(14, 165, 233, 0.01);
          max-height: 500px;
          overflow: hidden;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }

        /* CONTACT */
        .contactSection {
          background: linear-gradient(135deg, #f0f9ff 0%, #f0fdfa 100%);
          border-radius: 12px;
          padding: 3rem;
          max-width: 700px;
          margin: 0 auto;
        }

        .contactForm {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .formGroup {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .formGroup label {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .formGroup input,
        .formGroup textarea {
          padding: 0.875rem 1rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          font-family: inherit;
          font-size: 1rem;
          transition: 0.25s ease;
          background: white;
          color: var(--text-primary);
        }

        .formGroup input:focus,
        .formGroup textarea:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
        }

        .formGroup textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submitBtn {
          padding: 1rem 2rem;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.25s ease;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
        }

        .submitBtn:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(14, 165, 233, 0.4);
        }

        .successMessage {
          background: var(--success);
          color: white;
          padding: 1rem;
          border-radius: 6px;
          text-align: center;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* FOOTER */
        .footer {
          border-top: 1px solid var(--border);
          padding: 2rem 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
          text-align: center;
          background: var(--bg-secondary);
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .links {
            gap: 1rem;
          }

          .links a {
            font-size: 0.85rem;
          }

          .sectionHeader h2 {
            font-size: 1.75rem;
          }

          .hero {
            padding: 3rem 0 2rem;
          }

          .hero h1 {
            font-size: 2rem;
          }

          .cards {
            grid-template-columns: 1fr;
          }

          .aboutContent {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .aboutImage {
            height: 300px;
          }

          .aboutSection,
          .contactSection,
          .statsSection {
            padding: 2rem;
          }

          .pricingCard.popular {
            transform: scale(1);
          }

          .statIcon {
            width: 48px;
            height: 48px;
          }

          .statNumber {
            font-size: 1.75rem;
          }
        }

        @media (max-width: 600px) {
          .navbarInner {
            flex-wrap: wrap;
          }

          .links {
            width: 100%;
            justify-content: space-between;
            flex-wrap: wrap;
          }

          .cta {
            margin-left: 0;
          }

          .heroActions {
            flex-direction: column;
            gap: 0.75rem;
          }

          .button,
          .buttonSecondary {
            width: 100%;
            justify-content: center;
          }

          .statsGrid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .pricingPlans {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            scroll-behavior: auto;
          }
        }
      `}</style>

      <div className="homepage">
        {/* NAVBAR */}
        <nav className="navbar">
          <div className="container navbarInner">
            <div className="logoRow">
              <img src="/loginlogo.png" alt="Smart Home Energy logo" className="logo" />
              <div className="title">Smart Home Energy</div>
            </div>

            <div className="links" role="navigation" aria-label="Primary Navigation">
              <a href="#stats">Impact</a>
              <a href="#services">Services</a>
              <a href="#features">Features</a>
              <a href="#testimonials">Reviews</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
              <a href="/login.html" className="cta">
                Login / Sign Up
              </a>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <header className="hero">
          <div className="container heroInner">
            <h1>Intelligent Energy Management for Modern Homes</h1>
            <p>
              Experience seamless smart home automation with real-time energy monitoring, AI-powered
              optimization, and intelligent device control. Reduce costs, increase comfort, and
              embrace sustainability.
            </p>

            <div className="heroActions">
              <button className="button" onClick={() => (window.location.hash = '#services')}>
                <Zap size={20} />
                Get Started
              </button>
              <button className="buttonSecondary" onClick={() => (window.location.hash = '#features')}>
                Explore Features
              </button>
            </div>
          </div>
        </header>

        {/* STATS SECTION */}
        <section id="stats" className="section">
          <div className="container">
            <div className="sectionHeader">
              <h2>Our Impact</h2>
              <p>Join thousands of satisfied customers saving energy and reducing their carbon footprint</p>
            </div>

            <div className="statsSection">
              <div className="statsGrid">
                {stats.map((stat, index) => (
                  <div key={index} className="statCard">
                    <div className="statIcon">{stat.icon}</div>
                    <div className="statNumber">{stat.number}</div>
                    <div className="statLabel">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="section">
          <div className="container">
            <div className="sectionHeader">
              <h2>Why Choose Smart Home Energy?</h2>
            </div>
            <div className="aboutSection">
              <div className="aboutContent">
                <div className="aboutText">
                  <p>
                    The Smart Home Energy Management System is an intelligent platform designed to help
                    monitor, control, and optimize household energy consumption through smart automation.
                    Using cutting-edge IoT devices and real-time analytics, we provide actionable insights
                    that promote efficient energy usage and significant cost savings.
                  </p>
                  <p>
                    Our platform enhances comfort while reducing environmental impact, empowering you to create
                    a more sustainable and energy-efficient home. With intuitive controls and automated scheduling,
                    managing your home's energy has never been easier.
                  </p>
                  <button className="button">
                    Learn More <ArrowRight size={20} />
                  </button>
                </div>
                <img
                  src="/landing-demo.jpeg"
                  alt="Smart home living room with energy management"
                  className="aboutImage"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="section">
          <div className="container">
            <div className="sectionHeader">
              <h2>Our Services</h2>
              <p>
                Everything you need to monitor, automate, and reduce energy usage—without losing comfort
              </p>
            </div>

            <div className="cards">
              {services.map((service, index) => (
                <div key={index} className="card">
                  <div className="cardIcon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="section">
          <div className="container">
            <div className="sectionHeader">
              <h2>Premium Features</h2>
              <p>Comprehensive tools to give you complete control over your home's energy</p>
            </div>

            <div className="featuresBox">
              <div className="features">
                <ul>
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section id="testimonials" className="section">
          <div className="container">
            <div className="sectionHeader">
              <h2>What Our Customers Say</h2>
              <p>Real stories from real users who have transformed their homes</p>
            </div>

            <div className="cards">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonialCard">
                  <div className="stars">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                  </div>
                  <p className="testimonialText">"{testimonial.comment}"</p>
                  <div className="testimonialAuthor">{testimonial.name}</div>
                  <div className="testimonialTitle">{testimonial.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="container faqSection">
            <div className="sectionHeader">
              <h2>Frequently Asked Questions</h2>
              <p>Find answers to common questions about Smart Home Energy management and how our platform can help you save money and reduce energy consumption</p>
            </div>

            <div className="faqContainer">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className={`faqItem ${expandedFAQ === faq.id ? 'active' : ''}`}
                >
                  <div
                    className="faqHeader"
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id);
                      }
                    }}
                    aria-expanded={expandedFAQ === faq.id}
                  >
                    <h3 className="faqQuestion">{faq.question}</h3>
                    <span className="faqIcon">{expandedFAQ === faq.id ? '−' : '+'}</span>
                  </div>
                  {expandedFAQ === faq.id && (
                    <div className="faqAnswer">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section">
          <div className="container">
            <div className="sectionHeader">
              <h2>Get in Touch</h2>
              <p>Have questions? Our team is here to help</p>
            </div>

            <div className="contactSection">
              {submitted && <div className="successMessage">Thank you! We'll be in touch soon.</div>}
              {!submitted && (
                <form className="contactForm" onSubmit={handleSubmit}>
                  <div className="formGroup">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="formGroup">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="formGroup">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="formGroup">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="submitBtn">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 Smart Home Energy. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </footer>
      </div>
    </>
  );
}

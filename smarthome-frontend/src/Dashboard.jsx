'use client';

import React, { useEffect, useState } from 'react';
import {
  Zap,
  Smartphone,
  BarChart3,
  DollarSign,
  Leaf,
  Home,
  Settings,
  Bell,
  LogOut,
  Search,
  TrendingUp,
  AlertCircle,
  Clock,
  PieChart as PieIcon,
  Menu
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export default function SmartHomeDashboard() {
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8081';
  const REFRESH_MS = 10000;

  const [activeNav, setActiveNav] = useState('Dashboard');
  const [toast, setToast] = useState('');
  const [tempC, setTempC] = useState(22);
  const [expandedCard, setExpandedCard] = useState(null);
  const [summary, setSummary] = useState(null);
  const [savings, setSavings] = useState(null);
  const [charts, setCharts] = useState({
    dailyProduction: [],
    monthlySavings: [],
    powerUsageDistribution: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deviceLoading, setDeviceLoading] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState(() => {
    try {
 
      return (
        localStorage.getItem('currentUser') ||
        localStorage.getItem('username') ||
        'User'
      );
    } catch {
      return 'User';
    }
  });

  // update name if storage changes (e.g. login occurs after component mount)
  React.useEffect(() => {
    const handler = () => {
      const name =
        localStorage.getItem('currentUser') ||
        localStorage.getItem('username') ||
        'User';
      setUserName(name);
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const displayName = React.useMemo(() => {
    if (!userName) return 'User';
    const cleaned = userName.includes('@') ? userName.split('@')[0] : userName;
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }, [userName]);

  const formatNumber = (num, suffix = '') => {
    if (num === null || num === undefined || Number.isNaN(num)) return '-';
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k${suffix}`;
    return `${Number(num).toFixed(1)}${suffix}`;
  };

  const normalizeDevice = (device) => ({
    id: device.id,
    title: device.title || device.name || 'Device',
    name: device.name || device.title || 'Device',
    usage: device.usage || '—',
    room: device.room || '—',
    icon: device.icon || 'bolt',
    on: Boolean(device.on),
  });

  const defaultDevices = [
    { id: 1, title: 'Hall Main Light', icon: 'lamp', on: true, usage: '90W', room: 'Hall' },
    { id: 2, title: 'Hall Ceiling Fan', icon: 'fan', on: true, usage: '65W', room: 'Hall' },
    { id: 3, title: 'Living AC', icon: 'ac', on: true, usage: '2.5kW', room: 'Living Room' },
    { id: 4, title: 'Bedroom Light', icon: 'lamp', on: true, usage: '60W', room: 'Bedroom' },
    { id: 5, title: 'Bedroom Fan', icon: 'fan', on: false, usage: '70W', room: 'Bedroom' },
    { id: 6, title: 'Kitchen Refrigerator', icon: 'fridge', on: true, usage: '180W', room: 'Kitchen' },
    { id: 7, title: 'Water Heater', icon: 'bolt', on: false, usage: '3.5kW', room: 'Bathroom' },
    { id: 8, title: 'Washing Machine', icon: 'bolt', on: false, usage: '2.2kW', room: 'Laundry' },
  ];

  const [devices, setDevices] = useState(defaultDevices.map(normalizeDevice));
  const onlineDevices = devices.filter((d) => d.on).length;

  const fetchEnergyData = React.useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const [summaryRes, savingsRes, chartsRes] = await Promise.all([
        fetch(`${API_BASE}/api/energy/summary`),
        fetch(`${API_BASE}/api/energy/savings`),
        fetch(`${API_BASE}/api/energy/charts`),
      ]);

      if (!summaryRes.ok || !savingsRes.ok || !chartsRes.ok) {
        throw new Error('Backend returned an error');
      }

      const summaryJson = await summaryRes.json();
      const savingsJson = await savingsRes.json();
      const chartsJson = await chartsRes.json();

      setSummary(summaryJson);
      setSavings(savingsJson);
      setCharts(chartsJson);
      setLoading(false);
    } catch (err) {
      setError('Unable to load live energy data. Showing last known values.');
      setLoading(false);
    }
  }, [API_BASE]);

  const fetchDevices = React.useCallback(async () => {
    try {
      setDeviceLoading(true);
      const res = await fetch(`${API_BASE}/api/devices`);
      if (!res.ok) throw new Error('Devices not reachable');
      const json = await res.json();
      setDevices(json.map(normalizeDevice));
    } catch (err) {
      if (!devices.length) {
        setDevices(defaultDevices.map(normalizeDevice));
      }
      setError((prev) => prev || 'Using cached device list.');
    } finally {
      setDeviceLoading(false);
    }
  }, [API_BASE, devices.length]);

  useEffect(() => {
    fetchEnergyData();
    const interval = setInterval(fetchEnergyData, REFRESH_MS);
    return () => clearInterval(interval);
  }, [fetchEnergyData]);

  useEffect(() => {
    fetchDevices();
    const interval = setInterval(fetchDevices, REFRESH_MS * 2);
    return () => clearInterval(interval);
  }, [fetchDevices]);

  const toastTimer = React.useRef(null);
  const showToast = (msg) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2000);
  };

  const handleLogout = () => {
    // clear session info and username
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('currentUser');
    window.location.href = '/sign_in.html';
  };

  const toggleDevice = async (id) => {
    const existing = devices.find((d) => d.id === id);
    try {
      setDeviceLoading(true);
      const res = await fetch(`${API_BASE}/api/devices/${id}/toggle`, { method: 'POST' });
      if (!res.ok) throw new Error('Toggle failed');
      const updated = normalizeDevice(await res.json());
      setDevices((prev) => prev.map((d) => (d.id === id ? updated : d)));
      showToast(`${updated.title} turned ${updated.on ? 'ON' : 'OFF'}`);
    } catch (err) {
      // fallback to optimistic toggle if backend fails
      if (existing) {
        setDevices((prev) => prev.map((d) => (d.id === id ? { ...d, on: !d.on } : d)));
        showToast(`${existing.title} toggled locally`);
      }
      setError((prev) => prev || 'Device control is offline; applied local toggle.');
    } finally {
      setDeviceLoading(false);
    }
  };

  const sectionRefs = {
    Dashboard: React.useRef(null),
    Overview: React.useRef(null),
    Savings: React.useRef(null),
    Charts: React.useRef(null),
    Devices: React.useRef(null),
  };

  const navigationItems = [
    { label: 'Dashboard', icon: Home, target: 'Dashboard' },
    { label: 'Overview', icon: BarChart3, target: 'Overview' },
    { label: 'Savings', icon: DollarSign, target: 'Savings' },
    { label: 'Charts', icon: BarChart3, target: 'Charts' },
    { label: 'Devices', icon: Smartphone, target: 'Devices' },
  ];

  const energyStats = [
    {
      label: 'Energy Consumed Today',
      value: summary ? formatNumber(summary.totalEnergyConsumedTodayKWh, ' kWh') : '-',
      icon: Clock,
      color: '#8b5cf6',
    },
    {
      label: 'Total Energy Generated',
      value: summary ? formatNumber(summary.totalEnergyGeneratedKWh, ' kWh') : '-',
      icon: TrendingUp,
      color: '#0ea5e9',
    },
    {
      label: 'Energy Saved',
      value: summary ? formatNumber(summary.energySavedKWh, ' kWh') : '-',
      icon: Leaf,
      color: '#10b981',
    },
    {
      label: 'Current Power Usage',
      value: summary ? formatNumber(summary.currentPowerUsageKw, ' kW') : '-',
      icon: Zap,
      color: '#f97316',
    },
    {
      label: 'System Efficiency',
      value: summary ? `${summary.systemEfficiencyPct.toFixed(1)}%` : '-',
      icon: BarChart3,
      color: '#6366f1',
    },
    {
      label: 'Estimated Cost Savings',
      value: summary ? `\u20B9${summary.estimatedCostSavings.toLocaleString()}` : '-',
      icon: DollarSign,
      color: '#06b6d4',
    },
  ];

  const upcomingSchedules = [
    { device: 'Air Conditioner', action: 'Turn ON', time: '6:00 PM', room: 'Bedroom' },
    { device: 'Water Heater', action: 'Turn ON', time: '7:00 AM', room: 'Bathroom' },
    { device: 'Lights', action: 'Dim to 50%', time: '9:00 PM', room: 'Living Room' },
  ];

  const savingsStats = [
    { label: 'Energy Saved Today', value: savings ? formatNumber(savings.savedTodayKWh, ' kWh') : '-' },
    { label: 'Energy Saved This Month', value: savings ? formatNumber(savings.savedMonthKWh, ' kWh') : '-' },
    { label: 'Total Energy Saved', value: savings ? formatNumber(savings.savedTotalKWh, ' kWh') : '-' },
    { label: 'Total Cost Saved', value: savings ? `\u20B9${Math.round(savings.costSaved).toLocaleString()}` : '-' },
  ];

  const chartColors = ['#0ea5e9', '#06b6d4', '#22c55e', '#f59e0b', '#6366f1'];
  const isLoading = loading;

  return (
    <div className={`dashboardContainer ${sidebarOpen ? 'sidebarOpen' : ''}`}>
      <style>{dashboardStyles}</style>
      <div className="backdrop" onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* logo similar to HomePage */}
        <div className="logoRow">
          <img src="/loginlogo.png" alt="Smart Home Energy logo" className="logo" />
          <span className="title">Smart Home Energy</span>
        </div>

        <nav className="navMenu">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`navItem ${activeNav === item.label ? 'active' : ''}`}
                onClick={() => {
                  setActiveNav(item.label);
                  if (item.target && sectionRefs[item.target]?.current) {
                    sectionRefs[item.target].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  showToast(`${item.label} selected`);
                  setSidebarOpen(false);
                }}
                title={item.label}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button className="logoutBtn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="mainContent" ref={sectionRefs.Dashboard}>
        {/* Top Bar */}
        <header className="topBar">
          <button className="iconBtn" title="Menu" onClick={() => setSidebarOpen((v) => !v)}>
            <Menu size={20} />
          </button>
          <div className="searchBar">
            <Search size={18} />
            <input type="text" placeholder="Search devices, rooms, or schedules..." />
          </div>

          <div className="topActions">
            <button className="iconBtn" title="Notifications">
              <Bell size={20} />
              <span className="badge">3</span>
            </button>
            <div className="settingsWrap">
              <button className="iconBtn" title="Settings" onClick={() => setShowSettingsMenu((v) => !v)}>
                <Settings size={20} />
              </button>
              {showSettingsMenu && (
                <div className="settingsMenu">
                  <button className="menuItem" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
            <div className="userProfile">
              <div className="avatar">{displayName.split(' ').map(n=>n[0]).join('').toUpperCase()}</div>
              <div className="userInfo">
                <div className="userName">{displayName}</div>
                <div className="userRole">Homeowner</div>
              </div>
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <section className="welcomeSection" ref={sectionRefs.Overview}>
          <div className="welcomeCard">
            <div className="welcomeContent">
              <h1>Welcome back, {displayName}!</h1>
              <p>Your home is operating efficiently. All systems are optimal.</p>
              <div className="statusIndicators">
                <div className="statusItem">
                  <span className="statusDot online"></span>
                  <span>{onlineDevices} Devices Online</span>
                </div>
                <div className="statusItem">
                  <span className="statusDot">•</span>
                  <span>Temperature: {tempC}°C</span>
                </div>
              </div>
            </div>
            <div className="temperatureControl">
              <div className="tempDisplay">{tempC}°C</div>
              <div className="tempControls">
                <button onClick={() => setTempC(Math.max(16, tempC - 1))} className="tempBtn">-</button>
                <button onClick={() => setTempC(Math.min(30, tempC + 1))} className="tempBtn">+</button>
              </div>
            </div>
          </div>
        </section>

        {/* Energy Stats */}
        <section className="statsSection" ref={sectionRefs.Overview}>
          <div className="sectionHeader">
            <div>
              <h2>Energy Overview</h2>
              <div className="liveMeta">
                <span className={`liveDot ${isLoading ? 'idle' : 'active'}`} />
                <span className="muted">Auto-updates every 15s</span>
                <span className="muted">Last update: {summary?.lastUpdatedIso ? new Date(summary.lastUpdatedIso).toLocaleTimeString() : '-'}</span>
              </div>
            </div>
            <div className="sectionActions">
              {error && <span className="errorText">{error}</span>}
              <button className="refreshBtn" onClick={fetchEnergyData} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
          </div>
          <div className="statsGrid">
            {energyStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className={`statCard ${isLoading ? 'dimmed' : ''}`}>
                  <div className="statIcon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                    <Icon size={24} />
                  </div>
                  <div className="statContent">
                    <div className="statLabel">{stat.label}</div>
                    <div className="statValue">{stat.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Savings */}
        <section className="savingsSection" ref={sectionRefs.Savings}>
          <div className="sectionHeader">
            <h2>Energy Savings & Cost</h2>
            <span className="muted">
              Cost Saved = Energy Saved x Price per kWh ({savings?.pricePerKwh ? `\u20B9${savings.pricePerKwh}` : '-'})
            </span>
          </div>
          <div className="savingsGrid">
            {savingsStats.map((item, idx) => (
              <div key={idx} className="savingsCard">
                <div className="savingsLabel">{item.label}</div>
                <div className="savingsValue">{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Charts */}
        <section className="chartsSection" ref={sectionRefs.Charts}>
          <div className="chartsGrid">
            <div className="chartCard">
              <div className="cardHeader">
                <h3>Daily Energy Production</h3>
                <TrendingUp size={18} className="headerIcon" />
              </div>
              <div className="chartBody">
                {charts.dailyProduction.length ? (
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={charts.dailyProduction}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="label" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={2.4} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="emptyState">No data yet</div>
                )}
              </div>
            </div>

            <div className="chartCard">
              <div className="cardHeader">
                <h3>Monthly Energy Savings</h3>
                <BarChart3 size={18} className="headerIcon" />
              </div>
              <div className="chartBody">
                {charts.monthlySavings.length ? (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={charts.monthlySavings}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="label" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="emptyState">No data yet</div>
                )}
              </div>
            </div>

            <div className="chartCard">
              <div className="cardHeader">
                <h3>Power Usage Distribution</h3>
                <PieIcon size={18} className="headerIcon" />
              </div>
              <div className="chartBody">
                {charts.powerUsageDistribution.length ? (
                  <ResponsiveContainer width="100%" height={220}>
                    <RePieChart>
                      <Pie data={charts.powerUsageDistribution} dataKey="value" nameKey="label" innerRadius={50} outerRadius={80} paddingAngle={4}>
                        {charts.powerUsageDistribution.map((entry, index) => (
                          <Cell key={`cell-${entry.label}`} fill={chartColors[index % chartColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RePieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="emptyState">No data yet</div>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="contentGrid">
          {/* Devices Section */}
          <section className="devicesSection" ref={sectionRefs.Devices}>
            <div className="sectionHeader">
              <h2>Smart Devices</h2>
              <button className="viewAll">View All</button>
            </div>

            <div className="devicesGrid">
              {devices.map((device) => (
                <div key={device.id} className={`deviceCard ${device.on ? 'active' : ''}`}>
                  <div className="deviceHeader">
                    <div className="deviceIcon">
                      {device.icon === 'lamp' && <Home size={28} />}
                      {device.icon === 'ac' && <Zap size={28} />}
                      {device.icon === 'fridge' && <Smartphone size={28} />}
                      {device.icon === 'bolt' && <Zap size={28} />}
                    </div>
                    <button
                      className={`toggleSwitch ${device.on ? 'on' : 'off'}`}
                      onClick={() => toggleDevice(device.id)}
                      aria-pressed={device.on}
                      disabled={deviceLoading}
                    >
                      <div className="switchKnob"></div>
                    </button>
                  </div>

                  <div className="deviceInfo">
                    <h3>{device.title || device.name}</h3>
                    <p className="deviceRoom">{device.room}</p>
                    <div className="deviceUsage">
                      <span className="usageLabel">Current:</span>
                      <span className="usageValue">{device.usage}</span>
                    </div>
                  </div>

                  <div className="deviceStatus">
                    <span className={`status ${device.on ? 'online' : 'offline'}`}>
                      {device.on ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sidebar - Schedules & Recommendations */}
          <aside className="sidebarRight">
            {/* Upcoming Schedules */}
            <div className="card">
              <div className="cardHeader">
                <h3>Upcoming Schedules</h3>
                <Clock size={18} className="headerIcon" />
              </div>
              <div className="scheduleList">
                {upcomingSchedules.map((schedule, idx) => (
                  <div key={idx} className="scheduleItem">
                    <div className="scheduleDot"></div>
                    <div className="scheduleContent">
                      <div className="scheduleDevice">{schedule.device}</div>
                      <div className="scheduleAction">{schedule.action}</div>
                      <div className="scheduleTime">{schedule.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="card recommendations">
              <div className="cardHeader">
                <h3>Recommendations</h3>
                <AlertCircle size={18} className="headerIcon" />
              </div>
              <div className="recommendationsList">
                <div className="recommendationItem">
                  <span className="recIcon">💡</span>
                  <div>
                    <div className="recTitle">Turn off lights</div>
                    <div className="recDesc">Save 50W by turning off unused lights</div>
                  </div>
                </div>
                <div className="recommendationItem">
                  <span className="recIcon">❄</span>
                  <div>
                    <div className="recTitle">Adjust temperature</div>
                    <div className="recDesc">Set AC to 24°C for optimal comfort</div>
                  </div>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </main>

      {/* Toast */}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}

const dashboardStyles = `
  * {
    box-sizing: border-box;
  }

  :root {
    --primary: #0ea5e9;
    --primary-dark: #0284c7;
    --secondary: #06b6d4;
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --bg-tertiary: #f1f5f9;
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --border: #e2e8f0;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background: linear-gradient(135deg, #f0f9ff 0%, #f0fdfa 100%);
    color: var(--text-primary);
  }

  .muted {
    color: var(--text-secondary);
    font-size: 12px;
  }

  .dashboardContainer {
    display: flex;
    min-height: 100vh;
    overflow-y: auto;
    position: relative;
  }

  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.35);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
    z-index: 20;
  }

  .dashboardContainer.sidebarOpen .backdrop {
    opacity: 1;
    pointer-events: all;
  }

  /* Sidebar */
  .sidebar {
    width: 280px;
    background: white;
    border-right: 1px solid var(--border);
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    overflow-y: auto;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    position: fixed;
    inset: 0 auto 0 0;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    z-index: 30;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  /* logo styles similar to HomePage */
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


  .navMenu {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }

  .navItem {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border: none;
    background: transparent;
    color: var(--text-secondary);
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .navItem:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
  }

  .navItem.active {
    background: linear-gradient(135deg, #e0f2fe 0%, #cffafe 100%);
    color: var(--primary);
  }

  .logoutBtn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border: 1px solid var(--border);
    background: white;
    color: var(--text-primary);
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .logoutBtn:hover {
    background: var(--bg-tertiary);
    border-color: var(--secondary);
  }

  /* Main Content */
  .mainContent {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    margin-left: 0;
    transition: margin-left 0.25s ease;
  }

  .dashboardContainer.sidebarOpen .mainContent {
    margin-left: 280px;
  }

  .topBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    background: white;
    border-bottom: 1px solid var(--border);
    gap: 24px;
  }

  .searchBar {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    max-width: 500px;
    padding: 10px 16px;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text-secondary);
  }

  .searchBar input {
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    color: var(--text-primary);
    font-size: 14px;
  }

  .searchBar input::placeholder {
    color: var(--text-secondary);
  }

  .topActions {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .settingsWrap {
    position: relative;
  }

  .settingsMenu {
    position: absolute;
    top: 44px;
    right: 0;
    background: white;
    border: 1px solid var(--border);
    border-radius: 10px;
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
    min-width: 140px;
    z-index: 20;
  }

  .menuItem {
    width: 100%;
    padding: 10px 14px;
    border: none;
    background: transparent;
    text-align: left;
    font-weight: 600;
    color: var(--danger);
    cursor: pointer;
  }

  .menuItem:hover {
    background: var(--bg-secondary);
  }

  .iconBtn {
    position: relative;
    width: 40px;
    height: 40px;
    border: 1px solid var(--border);
    background: white;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    transition: all 0.3s ease;
  }

  .iconBtn:hover {
    background: var(--bg-secondary);
    color: var(--primary);
    border-color: var(--primary);
  }

  .badge {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 20px;
    height: 20px;
    background: var(--danger);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 600;
  }

  .userProfile {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
  }

  .userInfo {
    display: flex;
    flex-direction: column;
  }

  .userName {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .userRole {
    font-size: 12px;
    color: var(--text-secondary);
  }

  /* Content Area */
  .welcomeSection {
    padding: 24px;
    flex: 0 0 auto;
  }

  .welcomeCard {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #14b8a6 100%);
    border-radius: 16px;
    color: white;
    box-shadow: 0 14px 40px rgba(6, 182, 212, 0.25);
  }

  .welcomeContent h1 {
    margin: 0 0 8px 0;
    font-size: 24px;
    font-weight: 700;
  }

  .welcomeContent p {
    margin: 0 0 16px 0;
    opacity: 0.9;
    font-size: 14px;
  }

  .statusIndicators {
    display: flex;
    gap: 24px;
  }

  .statusItem {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
  }

  .statusDot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    font-size: 6px;
  }

  .statusDot.online {
    background: #10b981;
  }

  .statusDot.neutral {
    background: rgba(255, 255, 255, 0.6);
  }

  .temperatureControl {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .tempDisplay {
    font-size: 48px;
    font-weight: 700;
  }

  .tempControls {
    display: flex;
    gap: 8px;
  }

  .tempBtn {
    width: 36px;
    height: 36px;
    border: none;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .tempBtn:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  /* Stats Section */
  .statsSection {
    padding: 0 24px;
  }

  .statsSection h2 {
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
  }

  .statsGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
  }

  .statCard {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: white;
    border: 1px solid var(--border);
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  }

  .statIcon {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .statContent {
    display: flex;
    flex-direction: column;
  }

  .liveMeta {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    font-size: 12px;
    color: var(--text-secondary);
  }

  .liveDot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--border);
  }

  .liveDot.active {
    background: var(--success);
    box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.15);
  }

  .liveDot.idle {
    background: var(--warning);
  }

  .sectionActions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .refreshBtn {
    padding: 8px 14px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: white;
    color: var(--text-primary);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .refreshBtn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .refreshBtn:not(:disabled):hover {
    border-color: var(--primary);
    color: var(--primary);
  }

  .errorText {
    color: var(--danger);
    font-size: 12px;
    font-weight: 600;
  }

  .statCard.dimmed {
    opacity: 0.7;
  }

  .statLabel {
    font-size: 12px;
    color: var(--text-secondary);
    font-weight: 500;
  }

  .statValue {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-primary);
    margin-top: 2px;
  }

  /* Content Grid */
  .contentGrid {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 24px;
    padding: 24px;
    flex: 1;
  }

  .devicesSection {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-right: 8px;
  }

  .savingsSection {
    padding: 0 24px 12px;
  }

  .savingsGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
  }

  .savingsCard {
    background: white;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .savingsLabel {
    font-size: 12px;
    color: var(--text-secondary);
  }

  .savingsValue {
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary);
  }

  .chartsSection {
    padding: 0 24px 12px;
  }

  .chartsGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }

  .chartCard {
    background: white;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 280px;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  }

  .chartBody {
    height: 240px;
  }

  .emptyState {
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    font-size: 13px;
    border: 1px dashed var(--border);
    border-radius: 10px;
  }

  .sectionHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .sectionHeader h2 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
  }

  .viewAll {
    padding: 8px 16px;
    border: 1px solid var(--border);
    background: white;
    color: var(--primary);
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .viewAll:hover {
    background: var(--bg-secondary);
  }

  .devicesGrid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .deviceCard {
    padding: 16px;
    background: white;
    border: 1px solid var(--border);
    border-radius: 12px;
    transition: all 0.3s ease;
  }

  .deviceCard:hover {
    border-color: var(--primary);
    box-shadow: 0 4px 12px rgba(14, 165, 233, 0.1);
  }

  .deviceCard.active {
    border-color: var(--primary);
    background: linear-gradient(135deg, #e0f2fe 0%, #cffafe 100%);
  }

  .deviceHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .deviceIcon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: var(--bg-tertiary);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
  }

  .toggleSwitch {
    width: 48px;
    height: 28px;
    border: none;
    border-radius: 14px;
    background: var(--border);
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
  }

  .toggleSwitch.on {
    background: var(--primary);
  }

  .switchKnob {
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: 2px;
    transition: all 0.3s ease;
  }

  .toggleSwitch.on .switchKnob {
    left: 22px;
  }

  .deviceInfo h3 {
    margin: 0 0 4px 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .deviceRoom {
    margin: 0 0 8px 0;
    font-size: 12px;
    color: var(--text-secondary);
  }

  .deviceUsage {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-top: 1px solid var(--border);
    font-size: 12px;
  }

  .usageLabel {
    color: var(--text-secondary);
  }

  .usageValue {
    color: var(--primary);
    font-weight: 600;
  }

  .deviceStatus {
    margin-top: 12px;
  }

  .status {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 600;
  }

  .status.online {
    background: rgba(16, 185, 129, 0.1);
    color: var(--success);
  }

  .status.offline {
    background: rgba(239, 68, 68, 0.1);
    color: var(--danger);
  }

  /* Sidebar Right */
  .sidebarRight {
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
    padding-right: 8px;
  }

  .card {
    padding: 16px;
    background: white;
    border: 1px solid var(--border);
    border-radius: 12px;
  }

  .cardHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .cardHeader h3 {
    margin: 0;
    font-size: 13px;
    font-weight: 700;
    color: var(--text-primary);
  }

  .headerIcon {
    color: var(--primary);
  }

  .scheduleList {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .scheduleItem {
    display: flex;
    gap: 12px;
    padding: 8px;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .scheduleItem:hover {
    background: var(--bg-secondary);
  }

  .scheduleDot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--primary);
    margin-top: 4px;
    flex-shrink: 0;
  }

  .scheduleContent {
    display: flex;
    flex-direction: column;
  }

  .scheduleDevice {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .scheduleAction {
    font-size: 11px;
    color: var(--text-secondary);
  }

  .scheduleTime {
    font-size: 10px;
    color: var(--primary);
    margin-top: 2px;
  }

  .recommendations {
    background: linear-gradient(135deg, #f0f9ff 0%, #f0fdfa 100%);
  }

  .recommendationsList {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .recommendationItem {
    display: flex;
    gap: 10px;
    padding: 10px;
    background: white;
    border-radius: 8px;
  }

  .recIcon {
    font-size: 18px;
  }

  .recTitle {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .recDesc {
    font-size: 11px;
    color: var(--text-secondary);
    margin-top: 2px;
  }

  /* Toast */
  .toast {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 24px;
    background: var(--text-primary);
    color: white;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    animation: slideUp 0.3s ease;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  /* Responsive */
  @media (max-width: 1200px) {
    .statsGrid {
      grid-template-columns: repeat(2, 1fr);
    }

    .devicesGrid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .dashboardContainer {
      flex-direction: column;
    }

    .sidebar {
      width: 260px;
      height: 100%;
      flex-direction: column;
      padding: 16px;
      border-right: 1px solid var(--border);
      border-bottom: none;
    }

    .logo {
      flex-shrink: 0;
    }

    .contentGrid {
      grid-template-columns: 1fr;
    }

    .statsGrid {
      grid-template-columns: 1fr;
    }
  }
`;

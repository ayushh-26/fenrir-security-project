export const scans = [
  { id: '1', name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, vulns: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago', target: 'app.acme.com' },
  { id: '2', name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, vulns: { critical: 5, high: 10, medium: 21, low: 18 }, lastScan: '4d ago', target: 'api.acme.com' },
  { id: '3', name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, vulns: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago', target: 'auth.acme.com' },
  { id: '4', name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, vulns: { critical: 5, high: 12, medium: 21, low: 18 }, lastScan: '4d ago', target: 'admin.acme.com' },
  { id: '5', name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, vulns: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago', target: 'cdn.acme.com' },
  { id: '6', name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, vulns: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago', target: 'portal.acme.com' },
  { id: '7', name: 'Web App Servers', type: 'Greybox', status: 'Completed', progress: 100, vulns: { critical: 5, high: 11, medium: 23, low: 18 }, lastScan: '4d ago', target: 'dashboard.acme.com' },
  { id: '8', name: 'Web App Servers', type: 'Greybox', status: 'Scheduled', progress: 100, vulns: { critical: 5, high: 12, medium: null, low: null }, lastScan: '4d ago', target: 'staging.acme.com' },
  { id: '9', name: 'Web App Servers', type: 'Greybox', status: 'Scheduled', progress: 100, vulns: { critical: 5, high: 12, medium: null, low: null }, lastScan: '4d ago', target: 'beta.acme.com' },
  { id: '10', name: 'IoT Devices', type: 'Blackbox', status: 'Failed', progress: 10, vulns: { critical: 2, high: 4, medium: 8, low: 1 }, lastScan: '3d ago', target: '192.168.1.0/24' },
  { id: '11', name: 'Temp Data', type: 'Blackbox', status: 'Failed', progress: 10, vulns: { critical: 2, high: 4, medium: 8, low: 1 }, lastScan: '3d ago', target: '10.0.0.1' },
  { id: '12', name: 'Internal APIs', type: 'Whitebox', status: 'Completed', progress: 100, vulns: { critical: 3, high: 7, medium: 14, low: 22 }, lastScan: '1d ago', target: 'internal-api.acme.com' },
  { id: '13', name: 'Mobile Backend', type: 'Greybox', status: 'Completed', progress: 100, vulns: { critical: 1, high: 5, medium: 9, low: 12 }, lastScan: '2d ago', target: 'mobile-api.acme.com' },
  { id: '14', name: 'Payment Gateway', type: 'Whitebox', status: 'Scheduled', progress: 0, vulns: { critical: null, high: null, medium: null, low: null }, lastScan: '7d ago', target: 'pay.acme.com' },
  { id: '15', name: 'Legacy CRM', type: 'Blackbox', status: 'Failed', progress: 35, vulns: { critical: 4, high: 9, medium: 3, low: 0 }, lastScan: '5d ago', target: 'crm.legacy.acme.com' },
]

export const orgStats = {
  org: 'Project X',
  owner: 'Nammagiri',
  totalScans: 100,
  scheduled: 1000,
  rescans: 100,
  failedScans: 100,
  lastUpdated: '10 mins ago',
}

export const severityStats = {
  critical: { count: 86, change: 2.5, up: true },
  high: { count: 16, change: 0.9, up: true },
  medium: { count: 26, change: 0.9, up: false },
  low: { count: 16, change: 0.9, up: true },
}
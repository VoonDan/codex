function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function generateValue(label) {
  if (/%/.test(label)) {
    return randomBetween(0, 100).toFixed(1) + '%';
  } else if (/days/.test(label)) {
    return randomBetween(0, 120).toFixed(0);
  } else if (/hrs|hours/.test(label)) {
    return randomBetween(0, 72).toFixed(0);
  } else if (/kWh/.test(label)) {
    return randomBetween(0, 1000).toFixed(0);
  } else if (/M\)/.test(label)) {
    return randomBetween(0, 50).toFixed(1) + 'M';
  } else if (/PSF/.test(label)) {
    return '$' + randomBetween(500, 2000).toFixed(0);
  } else if (/NPS/.test(label)) {
    return randomBetween(-100, 100).toFixed(0);
  }
  return randomBetween(0, 100).toFixed(0);
}

function generateChartData() {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const data = labels.map(() => randomBetween(0, 100));
  return { labels, data };
}

function createService(name, metricLabels) {
  return {
    name,
    metrics: metricLabels.map(label => ({ label, value: generateValue(label) })),
    chart: generateChartData()
  };
}

const dashboardData = [
  {
    category: 'Building & Projects',
    services: [
      createService('Drone-to-BIM Progress Certs', ['Verified % Progress', 'Variance vs Plan (%)', 'Pending IPC Items']),
      createService('Defect Snagging Copilot', ['Mean Time to Rectify (days)', 'Defect Density / Unit', 'SLA Score (%)']),
      createService('Materials Yield & Waste Optimiser', ['% Waste Reduction', 'Cost per m²', 'GR Variance (%)']),
      createService('EOT Evidence Engine', ['Approved EOT Days', 'Claim Success Rate (%)', 'Open RFIs']),
      createService('As-Built Delta Checker', ['Clash Count', 'Rework Hours Saved', 'MEP Issues']),
      createService('Safety-First CV Watch', ['TRIR', 'Near Misses Captured', 'Stoppage Minutes'])
    ]
  },
  {
    category: 'Finance',
    services: [
      createService('Presales→Transfer Forecast', ['DSO (days)', 'Forecast Accuracy (%)', 'Cancellation Risk (%)']),
      createService('OCR+Graph AML for Buyer KYC', ['KYC TAT (hrs)', 'False Positives (%)', 'Cases Flagged']),
      createService('Supplier Risk & CO₂ Pricing in AP', ['Cost/BoQ', 'tCO₂e/BoQ', 'On-time Delivery (%)']),
      createService('Automated Evidence for Revenue Recognition', ['Audit Findings', 'Close Cycle Days', 'Documents Linked']),
      createService('Collections Nudge Engine', ['DSO', 'Promise-to-pay kept (%)', 'Delinquency Rate (%)']),
      createService('Project Credit Line Optimiser', ['Finance Cost (M)', 'Covenant Headroom (%)', 'Drawdowns'])
    ]
  },
  {
    category: 'Architecture & Design Compliance',
    services: [
      createService('Embodied-Carbon BoQ Checker', ['tCO₂e/m²', 'Low-Carbon Options Suggested', 'Budget Compliance (%)']),
      createService('Facade Daylight & Thermal AI', ['Energy kWh/m²', 'Daylight Factor (%)', 'Options Evaluated']),
      createService('Code-Ruleset Validator', ['First-time-right Submissions (%)', 'Design Issues Flagged', 'Redesign Cycles']),
      createService('Sustainable Spec Recommender', ['Capex Delta (%)', 'Opex Savings (%)', 'Comfort Score']),
      createService('Construction Means & Methods Risk Map', ['Cycle Time (days)', 'Rework (%)', 'Risk Zones']),
      createService('As-Designed→As-Sold Consistency Guard', ['Variation Orders', 'Customer Disputes', 'Units Checked'])
    ]
  },
  {
    category: 'Sales & Marketing',
    services: [
      createService('Lead-to-Transfer Propensity & LTV', ['CPL', 'Booking Rate (%)', 'Transfer Conversion (%)']),
      createService('Dynamic Launch Playbook', ['Qualified Leads', 'CPA', 'Channel Mix Updates']),
      createService('Virtual Showroom from Digital Twins', ['Tour Completion (%)', 'Booking Uplift (%)', 'Hotspots Clicked']),
      createService('Price Elasticity & Incentive Optimiser', ['Gross Margin (%)', 'Sell-through Velocity (%)', 'Incentive Uptake (%)']),
      createService('Geo-Affinity & Landbank Siting', ['Presales Velocity', 'PSF', 'Demand Index']),
      createService('Salesforce-to-Showroom Orchestration', ['No-shows (%)', 'Time-to-Book (hrs)', 'Concierge Briefs'])
    ]
  },
  {
    category: 'Customer Service',
    services: [
      createService('Handover Readiness Score', ['Handover TAT (days)', 'Re-appointments', 'Readiness Score (%)']),
      createService('DLP Auto-Triage Bot', ['First-contact Resolution (%)', 'SLA Adherence (%)', 'Tickets per Day']),
      createService('Community Ops Insights', ['Opex/door', 'Resident NPS', 'Incidents Logged']),
      createService('Warranty Parts Planner', ['Repeat Visits', 'DLP Close Time (days)', 'Parts Forecast Accuracy (%)']),
      createService('Move-In Concierge Automation', ['Approval TAT (hrs)', 'Complaints', 'Bookings Scheduled']),
      createService('Resale & Leasing Readiness', ['Time-to-list (days)', 'Resale Velocity (%)', 'Packages Generated'])
    ]
  },
  {
    category: 'Smart Home & Innovations',
    services: [
      createService('Energy & Comfort Coach', ['kWh/HH', 'Comfort Score', 'Participants']),
      createService('Low-Carbon Envelope Upgrades Market', ['Retrofit Uptake (%)', 'tCO₂e Avoided', 'Avg Payback (yrs)']),
      createService('Package & Visitor Vision', ['Lost Parcel Incidents', 'Wait Time (min)', 'Predicted Waves']),
      createService('Amenity Yield Engine', ['Utilisation (%)', 'Complaints', 'Peak Staffing Needed']),
      createService('Community Commerce', ['Redemption Rate (%)', 'Partner Revenue (k)', 'Offers Sent']),
      createService('Smart-Repair DIY with AR', ['Ticket Deflection (%)', 'Resident CSAT', 'Parts Auto-ordered'])
    ]
  }
];

function renderDashboards() {
  const container = document.getElementById('dashboard-container');
  let chartId = 0;

  dashboardData.forEach(section => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';

    const h2 = document.createElement('h2');
    h2.textContent = section.category;
    categoryDiv.appendChild(h2);

    const cardsDiv = document.createElement('div');
    cardsDiv.className = 'cards';

    section.services.forEach(service => {
      const card = document.createElement('div');
      card.className = 'card';

      const h3 = document.createElement('h3');
      h3.textContent = service.name;
      card.appendChild(h3);

      const canvas = document.createElement('canvas');
      canvas.id = `chart-${chartId++}`;
      card.appendChild(canvas);

      const ul = document.createElement('ul');
      ul.className = 'metrics';
      service.metrics.forEach(m => {
        const li = document.createElement('li');
        li.textContent = `${m.label}: ${m.value}`;
        ul.appendChild(li);
      });
      card.appendChild(ul);

      cardsDiv.appendChild(card);

      const ctx = canvas.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: service.chart.labels,
          datasets: [{
            label: 'Trend',
            data: service.chart.data,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });

    categoryDiv.appendChild(cardsDiv);
    container.appendChild(categoryDiv);
  });
}

document.addEventListener('DOMContentLoaded', renderDashboards);

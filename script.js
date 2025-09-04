// QuantBot Pro - Advanced Trading Bot Backtesting Platform JavaScript

// Global variables
let currentSection = 'dashboard';
let backtestResults = null;
let optimizationResults = null;
let performanceChart = null;
let riskChart = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    initializeCharts();
    loadSampleData();
});

// Initialize application
function initializeApp() {
    // Show default section
    showSection('dashboard');
    
    // Initialize navigation
    setupNavigation();
    
    // Initialize range sliders
    setupRangeSliders();
    
    // Initialize file uploads
    setupFileUploads();
    
    // Initialize tooltips
    initializeTooltips();
    
    console.log('QuantBot Pro initialized successfully');
}

// Setup event listeners
function setupEventListeners() {
    // Navigation menu
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
            updateNavigation(this);
        });
    });

    // Form inputs
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('change', handleInputChange);
    });

    // Window resize
    window.addEventListener('resize', handleWindowResize);
}

// Navigation functions
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks[0].classList.add('active'); // Set dashboard as active
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
        
        // Update charts if needed
        if (sectionId === 'dashboard') {
            updatePerformanceChart();
        } else if (sectionId === 'analytics') {
            updateAnalyticsCharts();
        }
    }
}

function updateNavigation(activeLink) {
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// File upload functions
function setupFileUploads() {
    document.querySelectorAll('.file-upload-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentNode.querySelector('input[type="file"]');
            input.click();
        });
    });

    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', function() {
            const btn = this.parentNode.querySelector('.file-upload-btn');
            if (this.files.length > 0) {
                btn.textContent = this.files[0].name;
                btn.classList.add('file-selected');
            } else {
                btn.textContent = 'Choose File';
                btn.classList.remove('file-selected');
            }
        });
    });
}

// Strategy and data upload functions
function uploadStrategy() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.py,.cpp,.js,.java,.r';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            processStrategyFile(file);
        }
    };
    input.click();
}

function uploadData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.json,.xlsx';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            processDataFile(file);
        }
    };
    input.click();
}

function processStrategyFile(file) {
    showNotification('Processing strategy file: ' + file.name, 'info');
    
    // Simulate file processing
    setTimeout(() => {
        showNotification('Strategy uploaded successfully!', 'success');
        updateStrategyList(file.name);
    }, 2000);
}

function processDataFile(file) {
    showNotification('Processing data file: ' + file.name, 'info');
    
    // Simulate file processing
    setTimeout(() => {
        showNotification('Data uploaded successfully!', 'success');
        updateDataStatus(file.name);
    }, 2000);
}

// Range slider setup
function setupRangeSliders() {
    const sliders = [
        { id: 'maRange', valueId: 'maValue' },
        { id: 'rsiRange', valueId: 'rsiValue' },
        { id: 'stopLossRange', valueId: 'stopLossValue', suffix: '%' },
        { id: 'takeProfitRange', valueId: 'takeProfitValue', suffix: '%' }
    ];

    sliders.forEach(slider => {
        const rangeInput = document.getElementById(slider.id);
        const valueSpan = document.getElementById(slider.valueId);
        
        if (rangeInput && valueSpan) {
            rangeInput.addEventListener('input', function() {
                const value = this.value + (slider.suffix || '');
                valueSpan.textContent = value;
            });
        }
    });
}

// Backtesting functions
function runBacktest() {
    showNotification('Starting backtest...', 'info');
    
    const config = getBacktestConfiguration();
    
    // Simulate backtest process
    simulateBacktest(config);
}

function getBacktestConfiguration() {
    return {
        strategyFile: document.getElementById('strategyFile').files[0],
        dataFile: document.getElementById('dataFile').files[0],
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        initialCapital: parseFloat(document.getElementById('initialCapital').value),
        riskModel: document.getElementById('riskModel').value,
        commissionRate: parseFloat(document.getElementById('commissionRate').value),
        slippageModel: document.getElementById('slippageModel').value,
        maxPositions: parseInt(document.getElementById('maxPositions').value),
        benchmark: document.getElementById('benchmarkIndex').value
    };
}

function simulateBacktest(config) {
    const resultsContainer = document.getElementById('backtestResults');
    resultsContainer.innerHTML = '<div class="loading">Running backtest...</div>';
    
    // Simulate progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            clearInterval(progressInterval);
            displayBacktestResults(generateMockResults());
        }
    }, 500);
}

function displayBacktestResults(results) {
    const resultsContainer = document.getElementById('backtestResults');
    
    const resultsHTML = `
        <div class="backtest-summary">
            <h4>Backtest Summary</h4>
            <div class="results-grid">
                <div class="result-item">
                    <span class="result-label">Total Return:</span>
                    <span class="result-value positive">${results.totalReturn}%</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Sharpe Ratio:</span>
                    <span class="result-value positive">${results.sharpeRatio}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Max Drawdown:</span>
                    <span class="result-value negative">${results.maxDrawdown}%</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Win Rate:</span>
                    <span class="result-value positive">${results.winRate}%</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Trades:</span>
                    <span class="result-value">${results.totalTrades}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Profit Factor:</span>
                    <span class="result-value positive">${results.profitFactor}</span>
                </div>
            </div>
            <canvas id="backtestChart"></canvas>
        </div>
    `;
    
    resultsContainer.innerHTML = resultsHTML;
    
    // Create backtest chart
    createBacktestChart(results.equity);
    
    showNotification('Backtest completed successfully!', 'success');
}

function saveBacktest() {
    const config = getBacktestConfiguration();
    const configJSON = JSON.stringify(config, null, 2);
    
    downloadFile('backtest_config.json', configJSON);
    showNotification('Backtest configuration saved!', 'success');
}

// Optimization functions
function runOptimization() {
    showNotification('Starting optimization...', 'info');
    
    const method = document.querySelector('input[name="optimization"]:checked').value;
    simulateOptimization(method);
}

function simulateOptimization(method) {
    const progressBar = document.getElementById('optimizationProgress');
    const currentIter = document.getElementById('currentIteration');
    const totalIter = document.getElementById('totalIterations');
    
    let iteration = 0;
    const total = 1000;
    totalIter.textContent = total;
    
    const optimizationInterval = setInterval(() => {
        iteration += Math.floor(Math.random() * 50) + 1;
        const progress = Math.min((iteration / total) * 100, 100);
        
        progressBar.style.width = progress + '%';
        currentIter.textContent = Math.min(iteration, total);
        
        if (iteration >= total) {
            clearInterval(optimizationInterval);
            showNotification('Optimization completed!', 'success');
            displayOptimizationResults();
        }
    }, 100);
}

function displayOptimizationResults() {
    // Update optimization chart with results
    updateOptimizationChart();
}

function generateReport() {
    showNotification('Generating optimization report...', 'info');
    
    setTimeout(() => {
        const report = generateOptimizationReport();
        downloadFile('optimization_report.html', report);
        showNotification('Report generated and downloaded!', 'success');
    }, 2000);
}

// Analytics functions
function generateAnalysis() {
    showNotification('Generating advanced analysis...', 'info');
    
    setTimeout(() => {
        updateAnalyticsCharts();
        showNotification('Analysis completed!', 'success');
    }, 2000);
}

function exportReport() {
    showNotification('Exporting analytics report...', 'info');
    
    setTimeout(() => {
        const report = generateAnalyticsReport();
        downloadFile('analytics_report.pdf', report);
        showNotification('Report exported successfully!', 'success');
    }, 2000);
}

function runScenario(scenario) {
    showNotification(`Running ${scenario} market scenario...`, 'info');
    
    // Update active scenario button
    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    setTimeout(() => {
        displayScenarioResults(scenario);
        showNotification(`${scenario} scenario completed!`, 'success');
    }, 2000);
}

function displayScenarioResults(scenario) {
    const resultsContainer = document.getElementById('scenarioResults');
    const results = generateScenarioResults(scenario);
    
    resultsContainer.innerHTML = `
        <div class="scenario-result">
            <h4>${scenario.charAt(0).toUpperCase() + scenario.slice(1)} Market Scenario</h4>
            <div class="scenario-metrics">
                <div class="metric">
                    <span class="metric-value ${results.return >= 0 ? 'positive' : 'negative'}">${results.return}%</span>
                    <span class="metric-label">Expected Return</span>
                </div>
                <div class="metric">
                    <span class="metric-value">${results.volatility}%</span>
                    <span class="metric-label">Volatility</span>
                </div>
                <div class="metric">
                    <span class="metric-value ${results.maxDD >= 0 ? 'positive' : 'negative'}">${results.maxDD}%</span>
                    <span class="metric-label">Max Drawdown</span>
                </div>
                <div class="metric">
                    <span class="metric-value">${results.winRate}%</span>
                    <span class="metric-label">Win Rate</span>
                </div>
            </div>
        </div>
    `;
}

// Chart initialization and management
function initializeCharts() {
    // Set Chart.js defaults
    Chart.defaults.color = '#B0BEC5';
    Chart.defaults.borderColor = 'rgba(0, 200, 81, 0.2)';
    Chart.defaults.backgroundColor = 'rgba(0, 200, 81, 0.1)';
}

function updatePerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;
    
    if (performanceChart) {
        performanceChart.destroy();
    }
    
    performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: generateDateLabels(30),
            datasets: [{
                label: 'Portfolio Value',
                data: generatePerformanceData(30),
                borderColor: '#00C851',
                backgroundColor: 'rgba(0, 200, 81, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 200, 81, 0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 200, 81, 0.1)'
                    }
                }
            }
        }
    });
}

function createBacktestChart(equityData) {
    const ctx = document.getElementById('backtestChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: generateDateLabels(equityData.length),
            datasets: [{
                label: 'Equity Curve',
                data: equityData,
                borderColor: '#00C851',
                backgroundColor: 'rgba(0, 200, 81, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 200, 81, 0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 200, 81, 0.1)'
                    }
                }
            }
        }
    });
}

function updateOptimizationChart() {
    const ctx = document.getElementById('optimizationChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Optimization Results',
                data: generateOptimizationData(),
                backgroundColor: 'rgba(0, 200, 81, 0.6)',
                borderColor: '#00C851',
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Risk (Volatility)'
                    },
                    grid: {
                        color: 'rgba(0, 200, 81, 0.1)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Return (%)'
                    },
                    grid: {
                        color: 'rgba(0, 200, 81, 0.1)'
                    }
                }
            }
        }
    });
}

function updateAnalyticsCharts() {
    updateRiskAnalysisChart();
    updateDrawdownChart();
    updateHeatmap();
}

function updateRiskAnalysisChart() {
    const ctx = document.getElementById('riskAnalysisChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Low Risk', 'Medium Risk', 'High Risk'],
            datasets: [{
                data: [45, 35, 20],
                backgroundColor: [
                    '#4CAF50',
                    '#FF9800',
                    '#F44336'
                ],
                borderWidth: 2,
                borderColor: '#1A2332'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function updateDrawdownChart() {
    const ctx = document.getElementById('drawdownChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'area',
        data: {
            labels: generateDateLabels(30),
            datasets: [{
                label: 'Drawdown',
                data: generateDrawdownData(30),
                borderColor: '#F44336',
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                tension: 0.4,
                fill: 'origin'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    max: 0,
                    grid: {
                        color: 'rgba(244, 67, 54, 0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(244, 67, 54, 0.1)'
                    }
                }
            }
        }
    });
}

function updateHeatmap() {
    const heatmapContainer = document.getElementById('heatmap');
    if (!heatmapContainer) return;
    
    // Simple heatmap placeholder
    heatmapContainer.innerHTML = '<p>Monthly Returns Heatmap</p><p>Coming Soon...</p>';
}

// Utility functions
function generateDateLabels(days) {
    const labels = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString());
    }
    
    return labels;
}

function generatePerformanceData(points) {
    const data = [];
    let value = 100000;
    
    for (let i = 0; i < points; i++) {
        value *= (1 + (Math.random() - 0.48) * 0.02);
        data.push(Math.round(value));
    }
    
    return data;
}

function generateDrawdownData(points) {
    const data = [];
    let peak = 0;
    let current = 0;
    
    for (let i = 0; i < points; i++) {
        current += (Math.random() - 0.5) * 2;
        peak = Math.max(peak, current);
        const drawdown = ((current - peak) / peak) * 100;
        data.push(Math.min(drawdown, 0));
    }
    
    return data;
}

function generateOptimizationData() {
    const data = [];
    
    for (let i = 0; i < 100; i++) {
        data.push({
            x: Math.random() * 20 + 5, // Risk (5-25%)
            y: Math.random() * 30 + 5  // Return (5-35%)
        });
    }
    
    return data;
}

function generateMockResults() {
    return {
        totalReturn: (Math.random() * 40 - 10).toFixed(1),
        sharpeRatio: (Math.random() * 2 + 0.5).toFixed(2),
        maxDrawdown: -(Math.random() * 15 + 2).toFixed(1),
        winRate: (Math.random() * 30 + 55).toFixed(1),
        totalTrades: Math.floor(Math.random() * 500 + 100),
        profitFactor: (Math.random() * 1.5 + 1).toFixed(2),
        equity: generatePerformanceData(100)
    };
}

function generateScenarioResults(scenario) {
    const scenarios = {
        bull: { return: 25.3, volatility: 8.2, maxDD: -3.1, winRate: 78.5 },
        bear: { return: -15.7, volatility: 22.1, maxDD: -28.3, winRate: 42.1 },
        sideways: { return: 3.2, volatility: 12.5, maxDD: -8.7, winRate: 58.3 },
        crash: { return: -35.2, volatility: 45.7, maxDD: -42.1, winRate: 23.8 }
    };
    
    return scenarios[scenario] || scenarios.sideways;
}

function generateOptimizationReport() {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Optimization Report</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { color: #00C851; border-bottom: 2px solid #00C851; padding-bottom: 10px; }
                .metric { margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 5px; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>QuantBot Pro - Optimization Report</h1>
                <p>Generated on: ${new Date().toLocaleDateString()}</p>
            </div>
            <div class="metric">
                <h3>Best Parameters Found</h3>
                <p>Moving Average Period: 14</p>
                <p>RSI Threshold: 72</p>
                <p>Stop Loss: 4.5%</p>
                <p>Take Profit: 12.8%</p>
            </div>
            <div class="metric">
                <h3>Performance Metrics</h3>
                <p>Optimized Return: 28.7%</p>
                <p>Sharpe Ratio: 2.14</p>
                <p>Max Drawdown: -6.3%</p>
            </div>
        </body>
        </html>
    `;
}

function generateAnalyticsReport() {
    // This would generate a PDF report in a real implementation
    return 'PDF report content would be generated here...';
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#00C851'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Utility functions
function downloadFile(filename, content) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function handleInputChange(event) {
    // Handle form input changes
    console.log('Input changed:', event.target.id, event.target.value);
}

function handleWindowResize() {
    // Handle window resize
    if (performanceChart) {
        performanceChart.resize();
    }
}

function updateStrategyList(fileName) {
    // Update the strategy list with new file
    console.log('Strategy updated:', fileName);
}

function updateDataStatus(fileName) {
    // Update data status
    console.log('Data updated:', fileName);
}

function loadSampleData() {
    // Load sample data for demonstration
    setTimeout(() => {
        updatePerformanceChart();
    }, 1000);
}

function initializeTooltips() {
    // Initialize tooltips for help text
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event) {
    const tooltipText = event.target.getAttribute('data-tooltip');
    if (!tooltipText) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    tooltip.style.cssText = `
        position: absolute;
        background: #1A2332;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.9rem;
        z-index: 10000;
        border: 1px solid #00C851;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 8) + 'px';
    
    event.target._tooltip = tooltip;
}

function hideTooltip(event) {
    if (event.target._tooltip) {
        document.body.removeChild(event.target._tooltip);
        delete event.target._tooltip;
    }
}

// Risk management calculations
function calculateSharpeRatio(returns, riskFreeRate = 0.02) {
    const excessReturns = returns.map(r => r - riskFreeRate);
    const avgExcessReturn = excessReturns.reduce((sum, r) => sum + r, 0) / excessReturns.length;
    const stdDev = Math.sqrt(excessReturns.reduce((sum, r) => sum + Math.pow(r - avgExcessReturn, 2), 0) / excessReturns.length);
    return stdDev === 0 ? 0 : avgExcessReturn / stdDev;
}

function calculateMaxDrawdown(equityCurve) {
    let maxDD = 0;
    let peak = equityCurve[0];
    
    for (let i = 1; i < equityCurve.length; i++) {
        if (equityCurve[i] > peak) {
            peak = equityCurve[i];
        } else {
            const drawdown = (peak - equityCurve[i]) / peak;
            maxDD = Math.max(maxDD, drawdown);
        }
    }
    
    return maxDD;
}

function calculateVaR(returns, confidence = 0.05) {
    const sortedReturns = returns.slice().sort((a, b) => a - b);
    const index = Math.floor(confidence * sortedReturns.length);
    return sortedReturns[index];
}

// Portfolio optimization algorithms
function meanVarianceOptimization(returns, covariance, expectedReturns) {
    // Simplified mean-variance optimization
    // In a real implementation, this would use mathematical optimization libraries
    console.log('Running mean-variance optimization...');
    return generateOptimizationData();
}

function kellyCriterion(winRate, avgWin, avgLoss) {
    const b = avgWin / avgLoss;
    return (winRate * (b + 1) - 1) / b;
}

// Market data simulation
function simulateMarketData(days = 252, initialPrice = 100) {
    const data = [];
    let price = initialPrice;
    
    for (let i = 0; i < days; i++) {
        const dailyReturn = (Math.random() - 0.5) * 0.04; // ±2% daily volatility
        price *= (1 + dailyReturn);
        data.push({
            date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000),
            price: price,
            return: dailyReturn
        });
    }
    
    return data;
}

// Advanced analytics
function performMonteCarloSimulation(initialValue, returns, periods = 252, simulations = 1000) {
    const results = [];
    
    for (let sim = 0; sim < simulations; sim++) {
        let value = initialValue;
        const path = [value];
        
        for (let period = 0; period < periods; period++) {
            const randomReturn = returns[Math.floor(Math.random() * returns.length)];
            value *= (1 + randomReturn);
            path.push(value);
        }
        
        results.push({
            finalValue: value,
            path: path,
            return: (value - initialValue) / initialValue
        });
    }
    
    return results;
}

// Export functions for external use
window.QuantBot = {
    showSection,
    runBacktest,
    runOptimization,
    generateAnalysis,
    runScenario,
    showNotification,
    calculateSharpeRatio,
    calculateMaxDrawdown,
    calculateVaR,
    kellyCriterion,
    simulateMarketData,
    performMonteCarloSimulation
};
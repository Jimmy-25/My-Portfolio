import React, { useState, useMemo } from 'react';
import { Sliders, Calculator, TrendingUp, RefreshCw, BarChart3, HelpCircle } from 'lucide-react';

export const AnalyticsSandbox: React.FC = () => {
  const [activeModel, setActiveModel] = useState<'churn' | 'inventory'>('churn');

  // Churn ROI Model State
  const [userBase, setUserBase] = useState<number>(25000);
  const [monthlyChurnRate, setMonthlyChurnRate] = useState<number>(4.5); // %
  const [arpu, setArpu] = useState<number>(18); // $ monthly average revenue per user
  const [retentionLift, setRetentionLift] = useState<number>(28); // % of churners saved by predictive intervention
  const [campaignCost, setCampaignCost] = useState<number>(3500); // $ monthly cost of predictive campaign

  // Computed Churn Metrics
  const churnAnalysis = useMemo(() => {
    const monthlyChurnedUsers = Math.round(userBase * (monthlyChurnRate / 100));
    const savedUsers = Math.round(monthlyChurnedUsers * (retentionLift / 100));
    const monthlyGrossRecovered = savedUsers * arpu;
    const netMonthlyBenefit = monthlyGrossRecovered - campaignCost;
    const annualProjectedBenefit = netMonthlyBenefit * 12;
    const roiMultiplier = campaignCost > 0 ? (monthlyGrossRecovered / campaignCost).toFixed(1) : '0';

    // 6-month projected cohorts (Baseline vs Optimized)
    const months = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'];
    let baselineRemaining = userBase;
    let optimizedRemaining = userBase;
    const monthlyBaselineRate = monthlyChurnRate / 100;
    const monthlyOptimizedRate = (monthlyChurnRate * (1 - retentionLift / 100)) / 100;

    const projections = months.map((m) => {
      baselineRemaining = Math.round(baselineRemaining * (1 - monthlyBaselineRate));
      optimizedRemaining = Math.round(optimizedRemaining * (1 - monthlyOptimizedRate));
      return {
        month: m,
        baseline: baselineRemaining,
        optimized: optimizedRemaining,
        retainedGap: optimizedRemaining - baselineRemaining,
      };
    });

    return {
      monthlyChurnedUsers,
      savedUsers,
      monthlyGrossRecovered,
      netMonthlyBenefit,
      annualProjectedBenefit,
      roiMultiplier,
      projections,
    };
  }, [userBase, monthlyChurnRate, arpu, retentionLift, campaignCost]);

  // Inventory Model State
  const [dailyDemand, setDailyDemand] = useState<number>(140); // units/day
  const [leadTimeDays, setLeadTimeDays] = useState<number>(8); // days
  const [serviceLevelZ, setServiceLevelZ] = useState<number>(1.65); // 95% service level
  const [demandStdDev, setDemandStdDev] = useState<number>(25); // std deviation
  const [holdingCostPerUnit, setHoldingCostPerUnit] = useState<number>(4.5); // $/unit/year

  const inventoryAnalysis = useMemo(() => {
    // Safety Stock = Z * sqrt(LeadTime) * StdDev
    const safetyStock = Math.round(serviceLevelZ * Math.sqrt(leadTimeDays) * demandStdDev);
    const leadTimeDemand = dailyDemand * leadTimeDays;
    const reorderPoint = leadTimeDemand + safetyStock;
    const annualHoldingCost = Math.round(safetyStock * holdingCostPerUnit);

    return {
      safetyStock,
      leadTimeDemand,
      reorderPoint,
      annualHoldingCost,
    };
  }, [dailyDemand, leadTimeDays, serviceLevelZ, demandStdDev, holdingCostPerUnit]);

  return (
    <section id="sandbox" className="py-20 bg-slate-900/50 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-400">
            <span>Interactive Analytics Sandbox</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Hands-On Business Simulation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Live Quantitative Decision Models
          </h2>
          <p className="text-base text-slate-300">
            Test how predictive models directly translate into customer retention ROI and inventory risk mitigation. Adjust the operational parameters below to inspect live model behavior.
          </p>
        </div>

        {/* Model Switcher Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-lg w-fit mb-8">
          <button
            onClick={() => setActiveModel('churn')}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeModel === 'churn'
                ? 'bg-slate-800 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Model 01: Customer Churn & LTV Preservation
          </button>
          <button
            onClick={() => setActiveModel('inventory')}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeModel === 'inventory'
                ? 'bg-slate-800 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Model 02: Supply Chain Safety Stock & Reorder Point
          </button>
        </div>

        {activeModel === 'churn' ? (
          /* CHURN RETENTION MODEL */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive Parameter Sliders */}
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <span>Simulate Operational Inputs</span>
                </div>
                <button
                  onClick={() => {
                    setUserBase(25000);
                    setMonthlyChurnRate(4.5);
                    setArpu(18);
                    setRetentionLift(28);
                    setCampaignCost(3500);
                  }}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  title="Reset to baseline"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Slider 1: Active Accounts */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Active Customer Base</span>
                  <span className="font-mono text-white font-semibold tabular-nums">
                    {userBase.toLocaleString()} accounts
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={userBase}
                  onChange={(e) => setUserBase(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Slider 2: Monthly Churn % */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Monthly Attrition Rate</span>
                  <span className="font-mono text-rose-400 font-semibold tabular-nums">
                    {monthlyChurnRate}% / month
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="0.5"
                  value={monthlyChurnRate}
                  onChange={(e) => setMonthlyChurnRate(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Slider 3: ARPU */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Average Revenue Per User (ARPU)</span>
                  <span className="font-mono text-white font-semibold tabular-nums">
                    ${arpu} / month
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="1"
                  value={arpu}
                  onChange={(e) => setArpu(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Slider 4: Predictive Retention Lift */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Predictive Retention Success Lift</span>
                  <span className="font-mono text-emerald-400 font-semibold tabular-nums">
                    {retentionLift}% of at-risk users saved
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="2"
                  value={retentionLift}
                  onChange={(e) => setRetentionLift(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Slider 5: Campaign Cost */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Monthly Retention Program Budget</span>
                  <span className="font-mono text-slate-300 font-semibold tabular-nums">
                    ${campaignCost.toLocaleString()} / month
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="500"
                  value={campaignCost}
                  onChange={(e) => setCampaignCost(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                <span className="font-semibold text-slate-200 block mb-0.5">Model Mechanics:</span>
                Calculates cohort decay with and without machine learning early warning triggers. Shows net preserved ARR after deducting retention budget.
              </div>
            </div>

            {/* Right: Live Output Visualizations & KPI Cards */}
            <div className="lg:col-span-7 space-y-6">
              {/* Quantified Business Outcomes Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400">Monthly Saved Users</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400 mt-1 tabular-nums">
                    +{churnAnalysis.savedUsers}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">from {churnAnalysis.monthlyChurnedUsers} churners</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400">Net Monthly Gain</div>
                  <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
                    ${churnAnalysis.netMonthlyBenefit.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">after campaign cost</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400">Projected Annual ARR Saved</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400 mt-1 tabular-nums">
                    ${churnAnalysis.annualProjectedBenefit.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">12-month projection</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400">Campaign ROI</div>
                  <div className="text-2xl font-bold font-mono text-cyan-400 mt-1 tabular-nums">
                    {churnAnalysis.roiMultiplier}x
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">return on budget</div>
                </div>
              </div>

              {/* Dynamic SVG Comparison Chart: 6-Month Retained Cohort */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      6-Month Cohort Survival Simulation
                    </h4>
                    <p className="text-xs text-slate-400">
                      Comparing static customer loss vs predictive early-retention intervention
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <span className="w-2.5 h-2.5 bg-slate-600 rounded-sm" /> Baseline Unmanaged
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <span className="w-2.5 h-2.5 bg-emerald-400 rounded-sm" /> Predictive Program
                    </span>
                  </div>
                </div>

                {/* Bar chart representation */}
                <div className="space-y-3 pt-3">
                  {churnAnalysis.projections.map((item) => (
                    <div key={item.month} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-mono text-slate-300">{item.month}</span>
                        <span className="font-mono text-xs text-emerald-400 tabular-nums">
                          {item.optimized.toLocaleString()}{' '}
                          <span className="text-slate-500 font-normal">
                            (+{item.retainedGap.toLocaleString()} accounts saved)
                          </span>
                        </span>
                      </div>
                      <div className="h-4 w-full bg-slate-950 rounded-lg overflow-hidden flex relative p-0.5">
                        <div
                          className="bg-emerald-500/90 h-full rounded-md transition-all duration-300"
                          style={{ width: `${(item.optimized / userBase) * 100}%` }}
                        />
                        <div
                          className="absolute inset-y-0.5 left-0.5 bg-slate-600/50 rounded-md pointer-events-none transition-all duration-300"
                          style={{ width: `${(item.baseline / userBase) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Starting cohort: {userBase.toLocaleString()} users</span>
                  <span className="text-emerald-400 font-mono font-medium">
                    Cumulative Retained Lift: +{churnAnalysis.projections[5].retainedGap.toLocaleString()} Users
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* INVENTORY / SAFETY STOCK MODEL */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Inventory Sliders */}
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <span>Supply Chain Parameters</span>
                </div>
                <button
                  onClick={() => {
                    setDailyDemand(140);
                    setLeadTimeDays(8);
                    setServiceLevelZ(1.65);
                    setDemandStdDev(25);
                    setHoldingCostPerUnit(4.5);
                  }}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Average Daily Demand (units)</span>
                  <span className="font-mono text-white font-semibold tabular-nums">{dailyDemand} units/day</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={dailyDemand}
                  onChange={(e) => setDailyDemand(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Supplier Lead Time (days)</span>
                  <span className="font-mono text-white font-semibold tabular-nums">{leadTimeDays} days</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="30"
                  step="1"
                  value={leadTimeDays}
                  onChange={(e) => setLeadTimeDays(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Daily Demand Standard Deviation (Volatility)</span>
                  <span className="font-mono text-amber-400 font-semibold tabular-nums">σ = {demandStdDev} units</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  step="5"
                  value={demandStdDev}
                  onChange={(e) => setDemandStdDev(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Target Service Level (Cycle Fill Rate)</span>
                  <span className="font-mono text-emerald-400 font-semibold tabular-nums">
                    {serviceLevelZ === 1.28 ? '90% (Z=1.28)' : serviceLevelZ === 1.65 ? '95% (Z=1.65)' : '99% (Z=2.33)'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setServiceLevelZ(1.28)}
                    className={`py-1.5 text-xs font-mono rounded border transition-colors ${
                      serviceLevelZ === 1.28 ? 'bg-emerald-500/20 border-emerald-400 text-white' : 'border-slate-800 text-slate-400'
                    }`}
                  >
                    90% (Standard)
                  </button>
                  <button
                    onClick={() => setServiceLevelZ(1.65)}
                    className={`py-1.5 text-xs font-mono rounded border transition-colors ${
                      serviceLevelZ === 1.65 ? 'bg-emerald-500/20 border-emerald-400 text-white' : 'border-slate-800 text-slate-400'
                    }`}
                  >
                    95% (Optimal)
                  </button>
                  <button
                    onClick={() => setServiceLevelZ(2.33)}
                    className={`py-1.5 text-xs font-mono rounded border transition-colors ${
                      serviceLevelZ === 2.33 ? 'bg-emerald-500/20 border-emerald-400 text-white' : 'border-slate-800 text-slate-400'
                    }`}
                  >
                    99% (Critical)
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                <span className="font-semibold text-slate-200 block mb-0.5">Formula Applied:</span>
                Safety Stock SS = Z × √(Lead Time) × σ (Demand). Reorder Point ROP = (Average Daily Demand × Lead Time) + Safety Stock.
              </div>
            </div>

            {/* Right: Calculations */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400">Optimal Safety Stock Buffer</div>
                  <div className="text-3xl font-bold font-mono text-emerald-400 mt-1 tabular-nums">
                    {inventoryAnalysis.safetyStock}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">units to hold</div>
                </div>

                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400">Total Reorder Point (ROP)</div>
                  <div className="text-3xl font-bold font-mono text-white mt-1 tabular-nums">
                    {inventoryAnalysis.reorderPoint}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">units trigger inventory order</div>
                </div>

                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400">Annual Safety Holding Cost</div>
                  <div className="text-3xl font-bold font-mono text-cyan-400 mt-1 tabular-nums">
                    ${inventoryAnalysis.annualHoldingCost.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">cost of risk prevention</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white">
                  Inventory Level Decomposition
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Lead Time Demand Component ({inventoryAnalysis.leadTimeDemand} units)</span>
                      <span className="font-mono text-slate-400">
                        {Math.round((inventoryAnalysis.leadTimeDemand / inventoryAnalysis.reorderPoint) * 100)}% of ROP
                      </span>
                    </div>
                    <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden">
                      <div
                        className="bg-cyan-500 h-full rounded-full"
                        style={{
                          width: `${(inventoryAnalysis.leadTimeDemand / inventoryAnalysis.reorderPoint) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Safety Stock Buffer for Demand Volatility ({inventoryAnalysis.safetyStock} units)</span>
                      <span className="font-mono text-emerald-400">
                        {Math.round((inventoryAnalysis.safetyStock / inventoryAnalysis.reorderPoint) * 100)}% of ROP
                      </span>
                    </div>
                    <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-400 h-full rounded-full"
                        style={{
                          width: `${(inventoryAnalysis.safetyStock / inventoryAnalysis.reorderPoint) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                  By dynamically recalibrating this buffer per SKU rather than using fixed rules of thumb, stockouts drop by over 30% while avoiding excess idle capital.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { getCurrentList } from '../../utils/storage';
import { calculateFreshRatio, groupItemsByQuality } from '../../utils/helpers';
import { 
  TrendingUp, TrendingDown, ShoppingCart, Leaf, Cookie, 
  Lightbulb, Activity, Calendar, ArrowRight, Sparkles
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, Area, AreaChart
} from 'recharts';
import { Link } from 'react-router-dom';

// Chart colors matching our design system
const COLORS = {
  fresh: '#10b981',      // emerald-500
  moderate: '#f59e0b',   // amber-500
  processed: '#f97316',  // orange-500
};

export function DashboardPage() {
  const [groceryList, setGroceryList] = useState(getCurrentList());

  useEffect(() => {
    setGroceryList(getCurrentList());
  }, []);

  // Calculate metrics
  const grouped = useMemo(() => groupItemsByQuality(groceryList), [groceryList]);
  const freshRatio = useMemo(() => calculateFreshRatio(groceryList), [groceryList]);
  const totalItems = groceryList.length;
  const veggiesCount = groceryList.filter(item => item.category === 'Produce').length;
  const ultraCount = grouped.processed.length;

  // Prepare chart data
  const qualityData = [
    { name: 'Fresh', value: grouped.fresh.length, color: COLORS.fresh },
    { name: 'Lightly Processed', value: grouped.moderate.length, color: COLORS.moderate },
    { name: 'Ultra-Processed', value: grouped.processed.length, color: COLORS.processed },
  ].filter(item => item.value > 0);

  // Category breakdown
  const categories = ['Produce', 'Protein', 'Dairy', 'Grains', 'Snacks', 'Drinks'];
  const categoryData = categories.map(cat => ({
    name: cat,
    count: groceryList.filter(item => item.category === cat).length,
    fresh: groceryList.filter(item => item.category === cat && item.quality === 'fresh').length,
    moderate: groceryList.filter(item => item.category === cat && item.quality === 'moderate').length,
    processed: groceryList.filter(item => item.category === cat && item.quality === 'processed').length,
  })).filter(item => item.count > 0);

  // Generate 7-day trend (fake data based on current list)
  const generateTrendData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const baseRatio = freshRatio;
    
    return days.map((day, index) => {
      const variance = Math.random() * 20 - 10; // ±10%
      const ratio = Math.max(0, Math.min(100, baseRatio + variance - (index * 2)));
      const items = Math.max(5, totalItems - (6 - index) * 2 + Math.floor(Math.random() * 5));
      
      return {
        day,
        freshRatio: Math.round(ratio),
        totalItems: items,
        fresh: Math.round((items * ratio) / 100),
      };
    });
  };

  const trendData = useMemo(generateTrendData, [freshRatio, totalItems]);

  // Generate suggestions
  const suggestions = useMemo(() => {
    const tips = [];
    
    if (freshRatio < 50) {
      tips.push({
        emoji: '🥬',
        title: 'Boost Your Fresh Ratio',
        description: `Add ${Math.ceil((totalItems * 0.6 - grouped.fresh.length))} more fresh produce items to reach 60% fresh ratio.`,
        priority: 'high'
      });
    }
    
    if (veggiesCount < totalItems * 0.3) {
      tips.push({
        emoji: '🥕',
        title: 'More Vegetables',
        description: `Add ${Math.ceil(totalItems * 0.3 - veggiesCount)} produce items to improve your veggie intake.`,
        priority: 'medium'
      });
    }
    
    if (ultraCount > totalItems * 0.2) {
      tips.push({
        emoji: '⚠️',
        title: 'Reduce Ultra-Processed',
        description: `Try swapping ${Math.ceil(ultraCount - totalItems * 0.2)} ultra-processed items for fresh alternatives.`,
        priority: 'high'
      });
    }
    
    if (freshRatio >= 70) {
      tips.push({
        emoji: '🎉',
        title: 'Excellent Balance!',
        description: 'Your list is packed with healthy choices. Keep up the great work!',
        priority: 'success'
      });
    }
    
    return tips;
  }, [freshRatio, veggiesCount, ultraCount, totalItems, grouped.fresh.length]);

  // Recent activity (mock data from list)
  const recentActivity = useMemo(() => {
    return groceryList.slice(0, 5).map((item, index) => ({
      id: item.id,
      action: 'Added',
      item: item.name,
      category: item.category,
      quality: item.quality,
      time: `${index + 1}h ago`,
    }));
  }, [groceryList]);

  // KPI Card Component
  const KPICard = ({ 
    title, 
    value, 
    subtitle, 
    icon: Icon, 
    trend, 
    gradient,
    iconBg 
  }: { 
    title: string; 
    value: string | number; 
    subtitle: string; 
    icon: any; 
    trend?: { value: number; isUp: boolean };
    gradient: string;
    iconBg: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card variant="gradient" padding="lg" className="h-full">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && (
            <Badge 
              variant={trend.isUp ? 'primary' : 'secondary'} 
              size="sm"
            >
              {trend.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {Math.abs(trend.value)}%
            </Badge>
          )}
        </div>
        <div>
          <p className="text-sm text-[var(--text-secondary)] mb-1">{title}</p>
          <h3 className={`text-4xl font-bold mb-2 bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
            {value}
          </h3>
          <p className="text-xs text-[var(--text-tertiary)]">{subtitle}</p>
        </div>
      </Card>
    </motion.div>
  );

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-xl border-2 border-[var(--neutral-200)]">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm font-medium">{entry.name}:</span>
              <span className="text-sm font-bold">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge variant="primary" size="lg" dot className="mb-3">
                Analytics Dashboard
              </Badge>
              <h1 className="mb-2">Your Grocery Insights</h1>
              <p className="text-lg text-[var(--text-secondary)]">
                Track your healthy eating habits and shopping patterns
              </p>
            </motion.div>
          </div>
          <Link to="/demo">
            <Button variant="primary" size="lg">
              <ShoppingCart className="w-5 h-5" />
              Build List
            </Button>
          </Link>
        </div>

        {totalItems === 0 ? (
          // Empty State
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card variant="gradient" padding="xl">
              <div className="text-center py-16">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Activity className="w-24 h-24 mx-auto text-[var(--neutral-300)] mb-6" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-3">No Data Yet</h2>
                <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
                  Start building your grocery list to see your personalized analytics and insights.
                </p>
                <Link to="/demo">
                  <Button variant="primary" size="lg">
                    <Sparkles className="w-5 h-5" />
                    Get Started
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <KPICard
                title="Fresh Ratio"
                value={`${freshRatio}%`}
                subtitle="of your list is fresh"
                icon={TrendingUp}
                trend={{ value: 5, isUp: true }}
                gradient="from-emerald-600 to-lime-600"
                iconBg="bg-gradient-to-br from-emerald-500 to-lime-500"
              />
              
              <KPICard
                title="Total Items"
                value={totalItems}
                subtitle="in your grocery list"
                icon={ShoppingCart}
                gradient="from-blue-600 to-cyan-600"
                iconBg="bg-gradient-to-br from-blue-500 to-cyan-500"
              />
              
              <KPICard
                title="Produce Items"
                value={veggiesCount}
                subtitle="fresh vegetables & fruits"
                icon={Leaf}
                trend={{ value: 12, isUp: true }}
                gradient="from-emerald-600 to-green-600"
                iconBg="bg-gradient-to-br from-emerald-500 to-green-500"
              />
              
              <KPICard
                title="Ultra-Processed"
                value={ultraCount}
                subtitle="items to consider swapping"
                icon={Cookie}
                trend={{ value: 8, isUp: false }}
                gradient="from-orange-600 to-red-600"
                iconBg="bg-gradient-to-br from-orange-500 to-red-500"
              />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              
              {/* Donut Chart - Quality Breakdown */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="bordered" padding="lg" className="h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Quality Breakdown</h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Distribution by processing level
                      </p>
                    </div>
                    <Badge variant="primary" size="md">
                      {totalItems} items
                    </Badge>
                  </div>
                  
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={qualityData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={120}
                          paddingAngle={4}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {qualityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Legend */}
                  <div className="flex justify-center gap-6 mt-4">
                    {qualityData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-sm text-[var(--text-tertiary)]">({item.value})</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Bar Chart - Category Breakdown */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card variant="bordered" padding="lg" className="h-full">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-1">Category Breakdown</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Items by category and quality
                    </p>
                  </div>
                  
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 12 }}
                          stroke="#9ca3af"
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          stroke="#9ca3af"
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar 
                          dataKey="fresh" 
                          stackId="a" 
                          fill={COLORS.fresh} 
                          name="Fresh"
                          radius={[0, 0, 0, 0]}
                        />
                        <Bar 
                          dataKey="moderate" 
                          stackId="a" 
                          fill={COLORS.moderate}
                          name="Lightly Processed"
                          radius={[0, 0, 0, 0]}
                        />
                        <Bar 
                          dataKey="processed" 
                          stackId="a" 
                          fill={COLORS.processed}
                          name="Ultra-Processed"
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              
              {/* Line Chart - 7-Day Trend */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2"
              >
                <Card variant="bordered" padding="lg" className="h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">7-Day Trend</h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Fresh ratio over the past week
                      </p>
                    </div>
                    <Badge variant="accent" size="md">
                      <Calendar className="w-3 h-3" />
                      Last 7 Days
                    </Badge>
                  </div>
                  
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData}>
                        <defs>
                          <linearGradient id="colorRatio" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="day" 
                          tick={{ fontSize: 12 }}
                          stroke="#9ca3af"
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          stroke="#9ca3af"
                          domain={[0, 100]}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="freshRatio"
                          stroke="#10b981"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorRatio)"
                          name="Fresh Ratio %"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </motion.div>

              {/* Suggestions Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card variant="gradient" padding="lg" className="h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <Lightbulb className="w-6 h-6 text-amber-600" />
                    <h3 className="text-xl font-semibold">Smart Tips</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {suggestions.map((suggestion, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className={`
                          p-4 rounded-2xl border-2
                          ${suggestion.priority === 'high' ? 'bg-orange-50 border-orange-200' : ''}
                          ${suggestion.priority === 'medium' ? 'bg-amber-50 border-amber-200' : ''}
                          ${suggestion.priority === 'success' ? 'bg-emerald-50 border-emerald-200' : ''}
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{suggestion.emoji}</span>
                          <div className="flex-1">
                            <h5 className="font-semibold text-sm mb-1">
                              {suggestion.title}
                            </h5>
                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                              {suggestion.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <Link to="/demo">
                    <Button variant="outline" size="sm" fullWidth className="mt-6">
                      Improve List
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            </div>

            {/* Recent Activity Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card variant="bordered" padding="lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Recent Activity</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Your latest grocery list changes
                    </p>
                  </div>
                  <Badge variant="neutral" size="md">
                    {recentActivity.length} items
                  </Badge>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-[var(--neutral-200)]">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-secondary)]">
                          Action
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-secondary)]">
                          Item
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-secondary)]">
                          Category
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-secondary)]">
                          Quality
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-[var(--text-secondary)]">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivity.map((activity, index) => (
                        <motion.tr
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.05 }}
                          className="border-b border-[var(--neutral-100)] hover:bg-[var(--neutral-50)] transition-colors"
                        >
                          <td className="py-4 px-4">
                            <Badge variant="primary" size="sm">
                              {activity.action}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 font-medium">
                            {activity.item}
                          </td>
                          <td className="py-4 px-4 text-sm text-[var(--text-secondary)]">
                            {activity.category}
                          </td>
                          <td className="py-4 px-4">
                            <Badge 
                              variant={
                                activity.quality === 'fresh' ? 'primary' :
                                activity.quality === 'moderate' ? 'accent' : 'secondary'
                              }
                              size="sm"
                            >
                              {activity.quality === 'fresh' ? '🥬 Fresh' :
                               activity.quality === 'moderate' ? '🍞 Lightly' : '🍪 Ultra'}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-right text-sm text-[var(--text-tertiary)]">
                            {activity.time}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {recentActivity.length === 0 && (
                  <div className="text-center py-12">
                    <Activity className="w-16 h-16 mx-auto text-[var(--neutral-300)] mb-3" />
                    <p className="text-sm text-[var(--text-secondary)]">
                      No recent activity
                    </p>
                  </div>
                )}
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

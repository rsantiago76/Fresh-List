import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Autocomplete } from '../components/Autocomplete';
import { GroceryItem } from '../../types';
import { saveCurrentList, getCurrentList } from '../../utils/storage';
import { calculateFreshRatio, getSuggestions, groupItemsByQuality, getInsightMessage } from '../../utils/helpers';
import { FOODS, getRandomFoods, FoodSuggestion } from '../../data/foods';
import { 
  Plus, Trash2, Check, TrendingUp, Lightbulb, X, ShoppingCart, 
  Sparkles, RotateCcw, Database, Eye, Shield, Award
} from 'lucide-react';
import { toast } from 'sonner';

const categories = ['Produce', 'Protein', 'Dairy', 'Grains', 'Snacks', 'Drinks'];

const qualityConfig = {
  fresh: {
    label: 'Fresh',
    icon: '🥬',
    color: 'primary' as const,
    gradient: 'from-emerald-400 to-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    badgeBg: 'bg-emerald-100',
  },
  moderate: {
    label: 'Lightly Processed',
    icon: '🍞',
    color: 'accent' as const,
    gradient: 'from-amber-400 to-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    badgeBg: 'bg-amber-100',
  },
  processed: {
    label: 'Ultra-Processed',
    icon: '🍪',
    color: 'secondary' as const,
    gradient: 'from-orange-400 to-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-700',
    badgeBg: 'bg-orange-100',
  },
};

const DEMO_DATA: Omit<GroceryItem, 'id' | 'createdAt'>[] = [
  { name: 'Organic Spinach', category: 'Produce', quality: 'fresh', purchased: false },
  { name: 'Wild Salmon', category: 'Protein', quality: 'fresh', purchased: false },
  { name: 'Blueberries', category: 'Produce', quality: 'fresh', purchased: false },
  { name: 'Avocados', category: 'Produce', quality: 'fresh', purchased: false },
  { name: 'Greek Yogurt', category: 'Dairy', quality: 'moderate', purchased: false },
  { name: 'Whole Grain Bread', category: 'Grains', quality: 'moderate', purchased: false },
  { name: 'Almond Milk', category: 'Dairy', quality: 'moderate', purchased: false },
  { name: 'Potato Chips', category: 'Snacks', quality: 'processed', purchased: false },
  { name: 'Soda', category: 'Drinks', quality: 'processed', purchased: false },
];

export function DemoPage() {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('Produce');
  const [quality, setQuality] = useState<'fresh' | 'moderate' | 'processed'>('fresh');
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);
  const [storeMode, setStoreMode] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedList = getCurrentList();
    setGroceryList(savedList);
  }, []);

  // Save to localStorage whenever list changes
  useEffect(() => {
    saveCurrentList(groceryList);
  }, [groceryList]);

  const addItem = () => {
    if (itemName.trim()) {
      const newItem: GroceryItem = {
        id: Date.now().toString(),
        name: itemName.trim(),
        category,
        quality,
        purchased: false,
        createdAt: new Date(),
      };
      setGroceryList([newItem, ...groceryList]);
      setItemName('');
      toast.success('Item added!');
    }
  };

  const togglePurchased = (id: string) => {
    setGroceryList(groceryList.map(item =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const deleteItem = (id: string) => {
    setGroceryList(groceryList.filter(item => item.id !== id));
    toast.success('Item removed');
  };

  const clearPurchased = () => {
    setGroceryList(groceryList.filter(item => !item.purchased));
    toast.success('Purchased items cleared');
  };

  const seedDemoData = () => {
    const randomFoods = getRandomFoods(9);
    const demoItems: GroceryItem[] = randomFoods.map((food, index) => ({
      id: `demo-${Date.now()}-${index}`,
      name: food.name,
      category: food.category,
      quality: food.quality,
      purchased: false,
      createdAt: new Date(),
    }));
    setGroceryList(demoItems);
    toast.success('Demo data loaded!');
  };

  const resetList = () => {
    setGroceryList([]);
    toast.success('List cleared');
  };

  // Calculate stats
  const grouped = groupItemsByQuality(groceryList);
  const freshRatio = calculateFreshRatio(groceryList);
  const suggestions = getSuggestions(groceryList);
  const insight = getInsightMessage(freshRatio, groceryList.length);
  const purchasedCount = groceryList.filter(item => item.purchased).length;
  
  // Calculate balance score (0-100)
  const balanceScore = groceryList.length > 0 
    ? Math.round(
        (grouped.fresh.length * 1.0 + 
         grouped.moderate.length * 0.6 + 
         grouped.processed.length * 0.2) / 
        groceryList.length * 100
      )
    : 0;

  const getBalanceGrade = () => {
    if (balanceScore >= 85) return { grade: 'A+', color: 'text-emerald-600', emoji: '🏆' };
    if (balanceScore >= 75) return { grade: 'A', color: 'text-emerald-600', emoji: '⭐' };
    if (balanceScore >= 65) return { grade: 'B+', color: 'text-lime-600', emoji: '✨' };
    if (balanceScore >= 55) return { grade: 'B', color: 'text-amber-600', emoji: '👍' };
    if (balanceScore >= 45) return { grade: 'C', color: 'text-orange-600', emoji: '📊' };
    return { grade: 'D', color: 'text-orange-700', emoji: '💪' };
  };

  const balanceGrade = getBalanceGrade();

  return (
    <div className={`min-h-screen py-12 px-6 transition-all duration-300 ${storeMode ? 'bg-slate-100' : ''}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="accent" size="lg" dot className="mb-3">
                Interactive Demo
              </Badge>
              <h1 className={`${storeMode ? 'text-5xl' : ''} mb-2`}>Smart Grocery Builder</h1>
              <p className={`text-[var(--text-secondary)] ${storeMode ? 'text-xl' : 'text-[var(--text-lg)]'} max-w-2xl`}>
                Build your list, track your Fresh Ratio, and get smart suggestions in real-time.
              </p>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-3">
            {/* Store Mode Toggle */}
            <button
              onClick={() => setStoreMode(!storeMode)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all duration-300
                ${storeMode 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                  : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400'
                }
              `}
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">Store Mode</span>
            </button>

            {groceryList.length === 0 && (
              <Button variant="outline" size="sm" onClick={seedDemoData}>
                <Database className="w-4 h-4" />
                Load Demo Data
              </Button>
            )}

            {groceryList.length > 0 && (
              <Button variant="ghost" size="sm" onClick={resetList}>
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Side - Input Form + List */}
          <div className={`lg:col-span-2 space-y-6 ${storeMode ? 'order-2 lg:order-1' : ''}`}>
            
            {/* Input Section */}
            {!storeMode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card variant="gradient" padding="lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-lime-500 flex items-center justify-center text-white shadow-lg">
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Add Items</h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Build your healthy grocery list
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {/* Item Name Autocomplete Input */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-[var(--text-secondary)]">
                        Grocery Item
                      </label>
                      <Autocomplete
                        value={itemName}
                        onChange={setItemName}
                        items={FOODS}
                        placeholder="e.g., Organic Spinach, Salmon, Almond Milk..."
                        autoFocus
                        onSelect={(item) => {
                          setItemName(item.name);
                          setCategory(item.category);
                          setQuality(item.quality);
                          toast.success(`✨ Auto-filled: ${item.name}`);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.defaultPrevented) {
                            addItem();
                          }
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Category Dropdown */}
                      <div>
                        <label className="block mb-2 text-sm font-medium text-[var(--text-secondary)]">
                          Category
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full h-12 px-4 bg-white border-2 border-[var(--neutral-200)] rounded-xl text-base transition-all duration-250 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 hover:border-[var(--neutral-300)]"
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      {/* Quality Compact Selector */}
                      <div>
                        <label className="block mb-2 text-sm font-medium text-[var(--text-secondary)]">
                          Processing Level
                        </label>
                        <div className="flex gap-2">
                          {(Object.keys(qualityConfig) as Array<keyof typeof qualityConfig>).map((key) => {
                            const config = qualityConfig[key];
                            const isSelected = quality === key;
                            return (
                              <button
                                key={key}
                                onClick={() => setQuality(key)}
                                className={`
                                  flex-1 h-12 rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-2
                                  ${isSelected
                                    ? `${config.border} ${config.bg} shadow-md scale-105`
                                    : 'border-[var(--neutral-200)] bg-white hover:border-[var(--neutral-300)]'
                                  }
                                `}
                                title={config.label}
                              >
                                <span className="text-lg">{config.icon}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Add Button */}
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={addItem}
                      disabled={!itemName.trim()}
                    >
                      <Plus className="w-5 h-5" />
                      Add to List
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Grocery List Grouped by Quality */}
            <div className="space-y-4">
              {(Object.keys(qualityConfig) as Array<keyof typeof qualityConfig>).map((qualityKey) => {
                const config = qualityConfig[qualityKey];
                const items = grouped[qualityKey];
                
                if (items.length === 0) return null;

                return (
                  <motion.div
                    key={qualityKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card variant="bordered" padding="lg" className={`${config.border} ${config.bg}`}>
                      {/* Group Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white text-2xl shadow-md`}>
                            {config.icon}
                          </div>
                          <div>
                            <h4 className={`font-semibold ${storeMode ? 'text-2xl' : 'text-lg'}`}>
                              {config.label}
                            </h4>
                            <p className={`text-[var(--text-secondary)] ${storeMode ? 'text-base' : 'text-xs'}`}>
                              {items.length} item{items.length !== 1 ? 's' : ''} • {items.filter(item => !item.purchased).length} remaining
                            </p>
                          </div>
                        </div>
                        <Badge variant={config.color} size={storeMode ? 'lg' : 'md'}>
                          {items.filter(item => !item.purchased).length}
                        </Badge>
                      </div>

                      {/* Items List */}
                      <div className="space-y-2">
                        <AnimatePresence mode="popLayout">
                          {items.map((item, index) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, scale: 0.95, x: -20 }}
                              animate={{ opacity: 1, scale: 1, x: 0 }}
                              exit={{ opacity: 0, scale: 0.95, x: 20 }}
                              transition={{ 
                                duration: 0.3,
                                delay: index * 0.05,
                                ease: "easeOut" 
                              }}
                              layout
                            >
                              <div 
                                className={`
                                  group flex items-center gap-4 p-4 rounded-xl 
                                  bg-white border-2 transition-all duration-250
                                  ${storeMode 
                                    ? `border-slate-900 ${item.purchased ? 'bg-slate-100' : 'bg-white shadow-md'}` 
                                    : `border-[var(--neutral-200)] hover:border-emerald-300 hover:shadow-md`
                                  }
                                  ${item.purchased ? 'opacity-60' : ''}
                                  ${storeMode ? 'py-6' : ''}
                                `}
                              >
                                {/* Checkbox */}
                                <button
                                  onClick={() => togglePurchased(item.id)}
                                  className={`
                                    relative rounded-lg border-2 flex items-center justify-center
                                    transition-all duration-250 flex-shrink-0
                                    ${storeMode ? 'w-10 h-10 border-4' : 'w-6 h-6'}
                                    ${item.purchased
                                      ? `bg-gradient-to-br ${config.gradient} border-transparent`
                                      : `${storeMode ? 'border-slate-900' : 'border-[var(--neutral-300)] hover:border-emerald-400'}`
                                    }
                                  `}
                                  aria-label={item.purchased ? "Mark as not purchased" : "Mark as purchased"}
                                >
                                  <AnimatePresence>
                                    {item.purchased && (
                                      <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0, rotate: 180 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                      >
                                        <Check className={`${storeMode ? 'w-6 h-6' : 'w-4 h-4'} text-white`} />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </button>

                                {/* Item Details */}
                                <div className="flex-1 min-w-0">
                                  <h5 className={`
                                    font-medium
                                    ${storeMode ? 'text-2xl font-semibold' : 'text-base'}
                                    ${item.purchased ? 'line-through text-[var(--text-secondary)]' : storeMode ? 'text-slate-900' : ''}
                                  `}>
                                    {item.name}
                                  </h5>
                                  {!storeMode && (
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-xs text-[var(--text-tertiary)]">
                                        {item.category}
                                      </span>
                                      {item.purchased && (
                                        <Badge variant="neutral" size="sm">Purchased</Badge>
                                      )}
                                    </div>
                                  )}
                                </div>

                                {/* Delete Button */}
                                {!storeMode && (
                                  <button
                                    onClick={() => deleteItem(item.id)}
                                    className="p-2 rounded-lg hover:bg-orange-50 text-[var(--text-tertiary)] hover:text-orange-600 transition-all duration-200 opacity-50 md:opacity-0 md:group-hover:opacity-100"
                                    aria-label="Delete item"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}

              {/* Empty State */}
              {groceryList.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card variant="bordered" padding="xl">
                    <div className="text-center py-12">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ShoppingCart className="w-24 h-24 mx-auto text-[var(--neutral-300)] mb-4" />
                      </motion.div>
                      <h4 className="text-xl font-semibold mb-2">Your list is empty</h4>
                      <p className="text-base text-[var(--text-secondary)] mb-6">
                        Start adding items to build your grocery list
                      </p>
                      <Button variant="primary" size="lg" onClick={seedDemoData}>
                        <Database className="w-5 h-5" />
                        Load Demo Data
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Clear Purchased Button */}
              {purchasedCount > 0 && !storeMode && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Button variant="ghost" size="sm" fullWidth onClick={clearPurchased}>
                    <X className="w-4 h-4" />
                    Clear {purchasedCount} Purchased Item{purchasedCount !== 1 ? 's' : ''}
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Side - Live Insights Panel */}
          <div className={`space-y-6 ${storeMode ? 'order-1 lg:order-2' : ''}`}>
            
            {/* Fresh Ratio Meter */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="gradient" padding="lg" className="sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-lime-500 flex items-center justify-center text-white shadow-lg">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h4 className={`font-semibold ${storeMode ? 'text-2xl' : 'text-lg'}`}>
                    Live Insights
                  </h4>
                </div>

                {groceryList.length > 0 ? (
                  <>
                    {/* Circular Progress */}
                    <div className="relative w-44 h-44 mx-auto mb-6">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="var(--neutral-200)"
                          strokeWidth="8"
                        />
                        
                        {/* Progress circle */}
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 42}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                          animate={{ 
                            strokeDashoffset: 2 * Math.PI * 42 * (1 - freshRatio / 100) 
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                        
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#84cc16" />
                          </linearGradient>
                        </defs>
                      </svg>

                      {/* Center text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.div
                          key={freshRatio}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="text-center"
                        >
                          <p className="text-5xl font-bold bg-gradient-to-br from-emerald-600 to-lime-600 bg-clip-text text-transparent mb-1">
                            {freshRatio}%
                          </p>
                          <p className="text-xs text-[var(--text-secondary)] font-medium">
                            Fresh Ratio
                          </p>
                        </motion.div>
                      </div>
                    </div>

                    {/* Balance Score */}
                    <div className="mb-6 p-4 bg-white rounded-xl border-2 border-[var(--primary-200)]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm font-medium text-[var(--text-secondary)]">Balance Score</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{balanceGrade.emoji}</span>
                          <span className={`text-2xl font-bold ${balanceGrade.color}`}>
                            {balanceGrade.grade}
                          </span>
                        </div>
                      </div>
                      <div className="h-3 bg-[var(--neutral-200)] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-emerald-500 to-lime-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${balanceScore}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                      <p className="text-xs text-[var(--text-tertiary)] mt-2 text-center">
                        {balanceScore}/100 points
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-200">
                        <motion.div
                          key={grouped.fresh.length}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="text-2xl font-bold text-emerald-600 mb-1"
                        >
                          {grouped.fresh.length}
                        </motion.div>
                        <div className="text-xs text-[var(--text-secondary)] font-medium">Fresh</div>
                      </div>
                      
                      <div className="text-center p-3 bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-200">
                        <motion.div
                          key={grouped.moderate.length}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="text-2xl font-bold text-amber-700 mb-1"
                        >
                          {grouped.moderate.length}
                        </motion.div>
                        <div className="text-xs text-[var(--text-secondary)] font-medium">Lightly</div>
                      </div>
                      
                      <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-white rounded-xl border border-orange-200">
                        <motion.div
                          key={grouped.processed.length}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="text-2xl font-bold text-orange-700 mb-1"
                        >
                          {grouped.processed.length}
                        </motion.div>
                        <div className="text-xs text-[var(--text-secondary)] font-medium">Ultra</div>
                      </div>
                    </div>

                    {/* Shopping Progress */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[var(--text-secondary)] font-medium">Shopping Progress</span>
                        <span className="text-sm font-semibold">
                          {purchasedCount}/{groceryList.length}
                        </span>
                      </div>
                      <div className="h-2.5 bg-[var(--neutral-200)] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: groceryList.length > 0 ? `${(purchasedCount / groceryList.length) * 100}%` : '0%' }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Insight Message */}
                    <motion.div
                      key={insight.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 bg-white rounded-xl border-2 border-emerald-200"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{insight.emoji}</span>
                        <div>
                          <h5 className="font-semibold text-base mb-1">{insight.title}</h5>
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            {insight.message}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="w-16 h-16 mx-auto text-[var(--neutral-300)] mb-3" />
                    <p className="text-sm text-[var(--text-secondary)]">
                      Add items to see live insights
                    </p>
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Smart Suggestions */}
            {suggestions.length > 0 && !storeMode && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card variant="bordered" padding="lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-amber-600" />
                    <h4 className="text-base font-semibold">Smart Suggestions</h4>
                    <Badge variant="accent" size="sm">{suggestions.length}</Badge>
                  </div>

                  <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                      {suggestions.map((suggestion, index) => (
                        <motion.div
                          key={suggestion.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className={`
                            p-4 rounded-xl border-2
                            ${suggestion.type === 'success' ? 'bg-emerald-50 border-emerald-200' : ''}
                            ${suggestion.type === 'info' ? 'bg-amber-50 border-amber-200' : ''}
                            ${suggestion.type === 'warning' ? 'bg-orange-50 border-orange-200' : ''}
                          `}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{suggestion.emoji}</span>
                            <div className="flex-1">
                              <h5 className="font-semibold text-sm mb-1">
                                {suggestion.title}
                              </h5>
                              <p className="text-xs text-[var(--text-secondary)]">
                                {suggestion.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Data Persistence Info */}
            {!storeMode && groceryList.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card variant="bordered" padding="md">
                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-[var(--primary-600)] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        <span className="font-semibold text-[var(--primary-600)]">Auto-saved:</span> Your data is stored locally in your browser. No account needed!
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
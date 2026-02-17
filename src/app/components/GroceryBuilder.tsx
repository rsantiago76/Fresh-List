import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';
import { Card } from './Card';
import { Badge } from './Badge';
import { Input } from './Input';
import { Plus, Trash2, ShoppingCart, TrendingUp, Sparkles, Check } from 'lucide-react';

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  quality: 'fresh' | 'moderate' | 'processed';
  purchased: boolean;
}

const categories = ['Produce', 'Protein', 'Dairy', 'Snacks', 'Drinks', 'Grains'];

const qualityConfig = {
  fresh: {
    label: 'Fresh',
    icon: '🥬',
    color: 'primary',
    gradient: 'from-[var(--primary-400)] to-[var(--primary-600)]',
    bg: 'bg-[var(--primary-50)]',
    border: 'border-[var(--primary-200)]',
    text: 'text-[var(--primary-700)]',
  },
  moderate: {
    label: 'Lightly Processed',
    icon: '🍞',
    color: 'accent',
    gradient: 'from-[var(--accent-400)] to-[var(--accent-600)]',
    bg: 'bg-[var(--accent-50)]',
    border: 'border-[var(--accent-200)]',
    text: 'text-[var(--accent-800)]',
  },
  processed: {
    label: 'Ultra-Processed',
    icon: '🍪',
    color: 'secondary',
    gradient: 'from-[var(--secondary-400)] to-[var(--secondary-600)]',
    bg: 'bg-[var(--secondary-50)]',
    border: 'border-[var(--secondary-200)]',
    text: 'text-[var(--secondary-700)]',
  },
};

export function GroceryBuilder() {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('Produce');
  const [quality, setQuality] = useState<'fresh' | 'moderate' | 'processed'>('fresh');
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([
    { id: '1', name: 'Organic Spinach', category: 'Produce', quality: 'fresh', purchased: false },
    { id: '2', name: 'Chicken Breast', category: 'Protein', quality: 'fresh', purchased: false },
    { id: '3', name: 'Greek Yogurt', category: 'Dairy', quality: 'moderate', purchased: false },
    { id: '4', name: 'Whole Grain Bread', category: 'Grains', quality: 'moderate', purchased: true },
    { id: '5', name: 'Potato Chips', category: 'Snacks', quality: 'processed', purchased: false },
  ]);

  const addItem = () => {
    if (itemName.trim()) {
      const newItem: GroceryItem = {
        id: Date.now().toString(),
        name: itemName,
        category,
        quality,
        purchased: false,
      };
      setGroceryList([newItem, ...groceryList]);
      setItemName('');
    }
  };

  const togglePurchased = (id: string) => {
    setGroceryList(groceryList.map(item =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const deleteItem = (id: string) => {
    setGroceryList(groceryList.filter(item => item.id !== id));
  };

  // Group items by quality
  const groupedItems = {
    fresh: groceryList.filter(item => item.quality === 'fresh'),
    moderate: groceryList.filter(item => item.quality === 'moderate'),
    processed: groceryList.filter(item => item.quality === 'processed'),
  };

  // Calculate ratios
  const totalItems = groceryList.length;
  const freshCount = groupedItems.fresh.length;
  const moderateCount = groupedItems.moderate.length;
  const processedCount = groupedItems.processed.length;
  const freshRatio = totalItems > 0 ? Math.round((freshCount / totalItems) * 100) : 0;
  const purchasedCount = groceryList.filter(item => item.purchased).length;

  // Get insight message based on fresh ratio
  const getInsightMessage = () => {
    if (totalItems === 0) {
      return {
        emoji: '🛒',
        title: 'Ready to Start',
        message: 'Add your first item to begin building a healthier grocery list!',
      };
    }
    if (freshRatio >= 70) {
      return {
        emoji: '🎉',
        title: 'Excellent Choices!',
        message: 'Your list is packed with fresh, whole foods. You\'re doing amazing!',
      };
    }
    if (freshRatio >= 50) {
      return {
        emoji: '👍',
        title: 'Great Balance',
        message: 'You\'re making thoughtful decisions. Keep up the good work!',
      };
    }
    if (freshRatio >= 30) {
      return {
        emoji: '🥬',
        title: 'Good Start',
        message: 'Consider adding more fresh produce to boost your ratio.',
      };
    }
    return {
      emoji: '💚',
      title: 'Every Step Counts',
      message: 'Small changes add up! Try swapping one item for something fresher.',
    };
  };

  const insight = getInsightMessage();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content - Left/Center */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Input Section */}
          <Card variant="gradient" padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--primary-400)] to-[var(--primary-600)] flex items-center justify-center text-white shadow-[var(--shadow-primary)]">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[var(--text-xl)]">Build Your List</h3>
                <p className="text-[var(--text-sm)] text-[var(--text-secondary)]">
                  Add items and track your healthy choices
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Item Name Input */}
              <Input
                label="Grocery Item"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addItem()}
                placeholder="e.g., Organic Spinach, Almonds, Salmon..."
              />

              {/* Category Dropdown */}
              <div>
                <label className="block mb-2 text-[var(--text-sm)] font-medium text-[var(--text-secondary)]">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-12 px-4 bg-white border-2 border-[var(--neutral-200)] rounded-[var(--radius-xl)] text-[var(--text-base)] transition-all duration-250 focus:outline-none focus:border-[var(--primary-500)] focus:ring-4 focus:ring-[var(--primary-100)] hover:border-[var(--neutral-300)]"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Quality Toggle Group */}
              <div>
                <label className="block mb-3 text-[var(--text-sm)] font-medium text-[var(--text-secondary)]">
                  Processing Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(Object.keys(qualityConfig) as Array<keyof typeof qualityConfig>).map((key) => {
                    const config = qualityConfig[key];
                    const isSelected = quality === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setQuality(key)}
                        className={`
                          relative py-4 px-3 rounded-[var(--radius-xl)] border-2 transition-all duration-250 text-center overflow-hidden
                          ${isSelected
                            ? `${config.border} ${config.bg} shadow-lg scale-105`
                            : 'border-[var(--neutral-200)] bg-white hover:border-[var(--neutral-300)] hover:scale-102'
                          }
                        `}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="quality-indicator"
                            className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-10`}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <div className="relative">
                          <div className="text-2xl mb-2">{config.icon}</div>
                          <div className={`text-[var(--text-sm)] font-medium ${isSelected ? config.text : 'text-[var(--text-primary)]'}`}>
                            {config.label}
                          </div>
                        </div>
                      </button>
                    );
                  })}
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
                <Plus className="w-5 h-5 mr-2" />
                Add to Grocery List
              </Button>
            </div>
          </Card>

          {/* Grocery List Grouped by Processing Level */}
          <div className="space-y-4">
            {(Object.keys(qualityConfig) as Array<keyof typeof qualityConfig>).map((qualityKey) => {
              const config = qualityConfig[qualityKey];
              const items = groupedItems[qualityKey];
              
              if (items.length === 0) return null;

              return (
                <motion.div
                  key={qualityKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card variant="bordered" padding="lg" className={`${config.border} ${config.bg}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-[var(--radius-lg)] bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white text-xl`}>
                          {config.icon}
                        </div>
                        <div>
                          <h4 className="text-[var(--text-lg)] font-semibold">{config.label}</h4>
                          <p className="text-[var(--text-xs)] text-[var(--text-secondary)]">
                            {items.length} item{items.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <Badge variant={config.color as any} size="md">
                        {items.filter(item => !item.purchased).length} remaining
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <AnimatePresence mode="popLayout">
                        {items.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: -20 }}
                            transition={{ duration: 0.2 }}
                            layout
                          >
                            <div 
                              className={`
                                group flex items-center gap-4 p-4 rounded-[var(--radius-xl)] 
                                bg-white border-2 border-[var(--neutral-200)] 
                                hover:border-${config.color}-300 hover:shadow-md
                                transition-all duration-250
                                ${item.purchased ? 'opacity-60' : ''}
                              `}
                            >
                              {/* Checkbox */}
                              <button
                                onClick={() => togglePurchased(item.id)}
                                className={`
                                  relative w-6 h-6 rounded-lg border-2 flex items-center justify-center
                                  transition-all duration-250 flex-shrink-0
                                  ${item.purchased
                                    ? `bg-gradient-to-br ${config.gradient} border-transparent`
                                    : `border-[var(--neutral-300)] hover:border-${config.color}-400`
                                  }
                                `}
                              >
                                <AnimatePresence>
                                  {item.purchased && (
                                    <motion.div
                                      initial={{ scale: 0, rotate: -180 }}
                                      animate={{ scale: 1, rotate: 0 }}
                                      exit={{ scale: 0, rotate: 180 }}
                                      transition={{ type: "spring", stiffness: 300 }}
                                    >
                                      <Check className="w-4 h-4 text-white" />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </button>

                              {/* Item Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h5 className={`
                                    font-medium text-[var(--text-base)]
                                    ${item.purchased ? 'line-through text-[var(--text-secondary)]' : ''}
                                  `}>
                                    {item.name}
                                  </h5>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[var(--text-xs)] text-[var(--text-tertiary)]">
                                    {item.category}
                                  </span>
                                  {item.purchased && (
                                    <Badge variant="neutral" size="sm">Purchased</Badge>
                                  )}
                                </div>
                              </div>

                              {/* Delete Button (shown on hover) */}
                              <button
                                onClick={() => deleteItem(item.id)}
                                className="p-2 rounded-[var(--radius-lg)] hover:bg-[var(--secondary-50)] text-[var(--text-tertiary)] hover:text-[var(--secondary-600)] transition-all duration-200 opacity-50 md:opacity-0 md:group-hover:opacity-100"
                                aria-label="Delete item"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
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
            {totalItems === 0 && (
              <Card variant="bordered" padding="xl">
                <div className="text-center py-12">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ShoppingCart className="w-20 h-20 mx-auto text-[var(--neutral-300)] mb-4" />
                  </motion.div>
                  <h4 className="text-[var(--text-lg)] mb-2">Your list is empty</h4>
                  <p className="text-[var(--text-sm)] text-[var(--text-secondary)]">
                    Start adding items to build your grocery list
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Right Side Panel */}
        <div className="space-y-6">
          
          {/* Fresh Ratio Meter */}
          <Card variant="gradient" padding="lg" className="sticky top-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--primary-400)] to-[var(--accent-500)] flex items-center justify-center text-white">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-[var(--text-lg)] font-semibold">Fresh Ratio</h4>
            </div>

            {/* Circular Progress */}
            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--neutral-200)"
                  strokeWidth="8"
                />
                
                {/* Progress circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                  animate={{ 
                    strokeDashoffset: 2 * Math.PI * 40 * (1 - freshRatio / 100) 
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary-400)" />
                    <stop offset="100%" stopColor="var(--accent-500)" />
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
                >
                  <p className="text-4xl font-bold bg-gradient-to-br from-[var(--primary-600)] to-[var(--accent-600)] bg-clip-text text-transparent">
                    {freshRatio}%
                  </p>
                  <p className="text-[var(--text-xs)] text-[var(--text-secondary)] text-center">
                    Fresh Items
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="text-center p-3 bg-gradient-to-br from-[var(--primary-50)] to-white rounded-[var(--radius-lg)] border border-[var(--primary-200)]">
                <motion.div
                  key={freshCount}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-[var(--primary-600)] mb-1"
                >
                  {freshCount}
                </motion.div>
                <div className="text-[var(--text-xs)] text-[var(--text-secondary)]">Fresh</div>
              </div>
              
              <div className="text-center p-3 bg-gradient-to-br from-[var(--accent-50)] to-white rounded-[var(--radius-lg)] border border-[var(--accent-200)]">
                <motion.div
                  key={moderateCount}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-[var(--accent-700)] mb-1"
                >
                  {moderateCount}
                </motion.div>
                <div className="text-[var(--text-xs)] text-[var(--text-secondary)]">Moderate</div>
              </div>
              
              <div className="text-center p-3 bg-gradient-to-br from-[var(--secondary-50)] to-white rounded-[var(--radius-lg)] border border-[var(--secondary-200)]">
                <motion.div
                  key={processedCount}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-[var(--secondary-700)] mb-1"
                >
                  {processedCount}
                </motion.div>
                <div className="text-[var(--text-xs)] text-[var(--text-secondary)]">Ultra</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[var(--text-sm)] text-[var(--text-secondary)]">Shopping Progress</span>
                <span className="text-[var(--text-sm)] font-medium">
                  {purchasedCount}/{totalItems}
                </span>
              </div>
              <div className="h-2 bg-[var(--neutral-200)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--primary-400)] to-[var(--primary-600)] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: totalItems > 0 ? `${(purchasedCount / totalItems) * 100}%` : '0%' }}
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
              className="p-4 bg-white rounded-[var(--radius-xl)] border-2 border-[var(--primary-200)]"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{insight.emoji}</span>
                <div>
                  <h5 className="font-semibold text-[var(--text-base)] mb-1">{insight.title}</h5>
                  <p className="text-[var(--text-sm)] text-[var(--text-secondary)] leading-relaxed">
                    {insight.message}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            {totalItems > 0 && (
              <div className="mt-6 pt-6 border-t border-[var(--neutral-200)] space-y-3">
                <Button variant="outline" size="sm" fullWidth>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Suggestions
                </Button>
                <Button variant="ghost" size="sm" fullWidth>
                  Clear All Purchased
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
/**
 * Shared navigation data and logic
 */

export interface NavigationItem {
  path?: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: 'calculators' | 'tools';
  isExternal?: boolean;
  action?: () => void;
}

export function useNavigation() {
  // Extension store logic
  const detectBrowser = (): 'firefox' | 'chrome' => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('firefox')) {
      return 'firefox';
    }
    return 'chrome'; // Default to Chrome for all other browsers
  };

  const openExtensionStore = () => {
    const browser = detectBrowser();
    const extensionUrls = {
      firefox: 'https://addons.mozilla.org/en-US/firefox/addon/hyperevm-real-time-gas/',
      chrome: 'https://chromewebstore.google.com/detail/hyperevm-real-time-gas/lbmelajajgmfmhfplcfhbgjlngmhbplm'
    };

    window.open(extensionUrls[browser], '_blank');
  };

  // All navigation items data
  const allNavigationItems: NavigationItem[] = [
    {
      path: '/',
      name: 'Concentrated (V3)',
      description: 'Advanced liquidity ranges',
      icon: 'Layers3',
      color: 'blue',
      category: 'calculators'
    },
    {
      path: '/classic',
      name: 'Classic (V2)',
      description: 'Traditional 50/50 pools',
      icon: 'Users',
      color: 'green',
      category: 'calculators'
    },
    {
      path: '/apr',
      name: 'APR Calculator',
      description: 'Calculate annual returns',
      icon: 'TrendingUp',
      color: 'purple',
      category: 'calculators'
    },
    {
      path: '/tracker',
      name: 'Position Tracker',
      description: 'Track LP performance',
      icon: 'ClipboardList',
      color: 'orange',
      category: 'calculators'
    },
    {
      name: 'HyperEVM Extension',
      description: 'Real-Time Gas Tracking',
      icon: '/hyperevm_white.svg',
      color: 'green',
      category: 'tools',
      isExternal: true,
      action: openExtensionStore
    }
  ];

  // Filter items by category
  const calculatorItems = allNavigationItems.filter(item => item.category === 'calculators');
  const toolItems = allNavigationItems.filter(item => item.category === 'tools');

  // Color mapping for Tailwind classes - explicit mapping for reliability
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; hover: string; border: string }> = {
      blue: {
        bg: 'bg-blue-400',
        hover: 'group-hover:bg-blue-500',
        border: 'border-blue-400'
      },
      green: {
        bg: 'bg-green-400',
        hover: 'group-hover:bg-green-500',
        border: 'border-green-400'
      },
      purple: {
        bg: 'bg-purple-400',
        hover: 'group-hover:bg-purple-500',
        border: 'border-purple-400'
      },
      orange: {
        bg: 'bg-orange-400',
        hover: 'group-hover:bg-orange-500',
        border: 'border-orange-400'
      },
      red: {
        bg: 'bg-red-400',
        hover: 'group-hover:bg-red-500',
        border: 'border-red-400'
      },
      yellow: {
        bg: 'bg-yellow-400',
        hover: 'group-hover:bg-yellow-500',
        border: 'border-yellow-400'
      },
      indigo: {
        bg: 'bg-indigo-400',
        hover: 'group-hover:bg-indigo-500',
        border: 'border-indigo-400'
      },
      pink: {
        bg: 'bg-pink-400',
        hover: 'group-hover:bg-pink-500',
        border: 'border-pink-400'
      },
      teal: {
        bg: 'bg-teal-400',
        hover: 'group-hover:bg-teal-500',
        border: 'border-teal-400'
      },
      cyan: {
        bg: 'bg-cyan-400',
        hover: 'group-hover:bg-cyan-500',
        border: 'border-cyan-400'
      }
    };

    return colorMap[color] || colorMap.blue;
  };

  return {
    allNavigationItems,
    calculatorItems,
    toolItems,
    getColorClasses
  };
}
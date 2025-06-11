import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Wallet, TrendingUp, Droplets, Zap, Shield, BarChart3, Settings, Bell, Star, Copy, ExternalLink, Plus, Minus, ChevronDown, ChevronUp, Activity, DollarSign, Percent, Clock, Users, Sparkles } from 'lucide-react';

const Nexora = () => {
  const [activeTab, setActiveTab] = useState('swap');
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [isConnected, setIsConnected] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [liquidityPools, setLiquidityPools] = useState([]);
  const [stakingPools, setStakingPools] = useState([]);

  // Mock data
  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', price: 2456.78, change: 3.24, icon: '⟠' },
    { symbol: 'USDC', name: 'USD Coin', price: 1.00, change: 0.01, icon: '💵' },
    { symbol: 'USDT', name: 'Tether', price: 0.999, change: -0.02, icon: '₮' },
    { symbol: 'BTC', name: 'Bitcoin', price: 67890.12, change: 2.15, icon: '₿' },
    { symbol: 'LINK', name: 'Chainlink', price: 14.56, change: 5.67, icon: '🔗' },
    { symbol: 'UNI', name: 'Uniswap', price: 8.34, change: -1.23, icon: '🦄' },
  ];

  const mockPortfolio = [
    { token: 'ETH', amount: 2.5, value: 6141.95, change: 3.24 },
    { token: 'USDC', amount: 1500, value: 1500.00, change: 0.01 },
    { token: 'LINK', amount: 100, value: 1456.00, change: 5.67 },
  ];

  const mockLiquidityPools = [
    { pair: 'ETH/USDC', tvl: '$2.4M', apr: '12.5%', myLiquidity: '$1,234', fees24h: '$156' },
    { pair: 'BTC/ETH', tvl: '$1.8M', apr: '8.7%', myLiquidity: '$856', fees24h: '$98' },
    { pair: 'LINK/ETH', tvl: '$892K', apr: '15.2%', myLiquidity: '$0', fees24h: '$45' },
  ];

  const mockStakingPools = [
    { token: 'NEXO', apr: '18.5%', staked: '1,000', rewards: '12.34', lockPeriod: '30 days' },
    { token: 'ETH', apr: '4.2%', staked: '0.5', rewards: '0.02', lockPeriod: 'Flexible' },
  ];

  useEffect(() => {
    setPortfolio(mockPortfolio);
    setLiquidityPools(mockLiquidityPools);
    setStakingPools(mockStakingPools);
  }, []);

  const connectWallet = () => {
    setIsConnected(true);
    addNotification('Wallet connected successfully!', 'success');
  };

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleSwap = () => {
    if (!isConnected) {
      addNotification('Please connect your wallet first', 'error');
      return;
    }
    addNotification(`Swapping ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`, 'success');
  };

  const calculateToAmount = (amount) => {
    if (!amount) return '';
    const rate = tokens.find(t => t.symbol === toToken)?.price / tokens.find(t => t.symbol === fromToken)?.price;
    return (parseFloat(amount) * rate * (1 - slippage / 100)).toFixed(6);
  };

  useEffect(() => {
    if (fromAmount) {
      setToAmount(calculateToAmount(fromAmount));
    }
  }, [fromAmount, fromToken, toToken, slippage]);

  const TabButton = ({ id, icon: Icon, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
        active 
          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105' 
          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 hover:text-white hover:transform hover:scale-102'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  const TokenSelector = ({ value, onChange, label }) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-800/80 border border-gray-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer"
      >
        {tokens.map(token => (
          <option key={token.symbol} value={token.symbol}>
            {token.icon} {token.symbol} - ${token.price.toFixed(2)}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-12 w-5 h-5 text-gray-400 pointer-events-none" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm animate-slide-in-right ${
              notification.type === 'success' ? 'bg-green-500/90' :
              notification.type === 'error' ? 'bg-red-500/90' : 'bg-blue-500/90'
            }`}
          >
            {notification.message}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4 border-b border-gray-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Nexora
            </h1>
            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
              v2.0
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/70 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/70 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={connectWallet}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                isConnected
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transform hover:scale-105'
              }`}
            >
              <Wallet className="w-4 h-4 inline mr-2" />
              {isConnected ? '0x1234...5678' : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          <TabButton id="swap" icon={ArrowUpDown} label="Swap" active={activeTab === 'swap'} onClick={setActiveTab} />
          <TabButton id="pools" icon={Droplets} label="Liquidity Pools" active={activeTab === 'pools'} onClick={setActiveTab} />
          <TabButton id="stake" icon={Zap} label="Staking" active={activeTab === 'stake'} onClick={setActiveTab} />
          <TabButton id="portfolio" icon={BarChart3} label="Portfolio" active={activeTab === 'portfolio'} onClick={setActiveTab} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'swap' && (
              <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Token Swap</h2>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-green-400">Secure</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-600/50">
                    <TokenSelector value={fromToken} onChange={setFromToken} label="From" />
                    <input
                      type="number"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-transparent text-2xl font-bold text-white placeholder-gray-500 mt-2 focus:outline-none"
                    />
                    <div className="text-sm text-gray-400 mt-1">
                      Balance: 2.456 {fromToken}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        setFromToken(toToken);
                        setToToken(fromToken);
                      }}
                      className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors border-2 border-gray-600"
                    >
                      <ArrowUpDown className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-600/50">
                    <TokenSelector value={toToken} onChange={setToToken} label="To" />
                    <input
                      type="number"
                      value={toAmount}
                      readOnly
                      placeholder="0.00"
                      className="w-full bg-transparent text-2xl font-bold text-white placeholder-gray-500 mt-2 focus:outline-none"
                    />
                    <div className="text-sm text-gray-400 mt-1">
                      Balance: 1,500.00 {toToken}
                    </div>
                  </div>

                  <div className="bg-gray-900/30 rounded-xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Exchange Rate</span>
                      <span>1 {fromToken} = {(tokens.find(t => t.symbol === toToken)?.price / tokens.find(t => t.symbol === fromToken)?.price).toFixed(6)} {toToken}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Slippage Tolerance</span>
                      <span className="text-yellow-400">{slippage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Network Fee</span>
                      <span>~$2.45</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSwap}
                    disabled={!fromAmount || !isConnected}
                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-bold text-lg transition-all transform hover:scale-102"
                  >
                    {!isConnected ? 'Connect Wallet' : !fromAmount ? 'Enter Amount' : 'Swap Tokens'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'pools' && (
              <div className="space-y-6">
                <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Liquidity Pools</h2>
                    <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all">
                      <Plus className="w-4 h-4 inline mr-2" />
                      Add Liquidity
                    </button>
                  </div>

                  <div className="space-y-4">
                    {liquidityPools.map((pool, index) => (
                      <div key={index} className="bg-gray-900/50 rounded-xl p-4 border border-gray-600/30">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="text-lg font-bold">{pool.pair}</div>
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                              Active
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-400">APR</div>
                            <div className="font-bold text-green-400">{pool.apr}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-gray-400">TVL</div>
                            <div className="font-semibold">{pool.tvl}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">My Liquidity</div>
                            <div className="font-semibold">{pool.myLiquidity}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">24h Fees</div>
                            <div className="font-semibold text-green-400">{pool.fees24h}</div>
                          </div>
                          <div>
                            <button className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-xs hover:bg-purple-500/30 transition-colors">
                              Manage
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stake' && (
              <div className="space-y-6">
                <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Staking Pools</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      Rewards updated every hour
                    </div>
                  </div>

                  <div className="space-y-4">
                    {stakingPools.map((pool, index) => (
                      <div key={index} className="bg-gray-900/50 rounded-xl p-4 border border-gray-600/30">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="text-lg font-bold">{pool.token}</div>
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                              {pool.lockPeriod}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-400">APR</div>
                            <div className="font-bold text-blue-400">{pool.apr}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                          <div>
                            <div className="text-gray-400">Staked</div>
                            <div className="font-semibold">{pool.staked} {pool.token}</div>
                          </div>
                          <div>
                            <div className="text-gray-400">Rewards</div>
                            <div className="font-semibold text-green-400">{pool.rewards} {pool.token}</div>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs hover:bg-green-500/30 transition-colors">
                              Stake
                            </button>
                            <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs hover:bg-red-500/30 transition-colors">
                              Unstake
                            </button>
                            <button className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-xs hover:bg-yellow-500/30 transition-colors">
                              Claim
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
                  <h2 className="text-2xl font-bold mb-6">Portfolio Overview</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-green-400" />
                        <span className="text-sm text-gray-400">Total Value</span>
                      </div>
                      <div className="text-2xl font-bold">$9,097.95</div>
                      <div className="text-sm text-green-400">+$287.45 (3.26%)</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        <span className="text-sm text-gray-400">24h Change</span>
                      </div>
                      <div className="text-2xl font-bold text-green-400">+3.26%</div>
                      <div className="text-sm text-gray-400">$287.45</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-5 h-5 text-purple-400" />
                        <span className="text-sm text-gray-400">Assets</span>
                      </div>
                      <div className="text-2xl font-bold">{portfolio.length}</div>
                      <div className="text-sm text-gray-400">Tokens</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {portfolio.map((asset, index) => (
                      <div key={index} className="bg-gray-900/50 rounded-xl p-4 border border-gray-600/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center font-bold">
                              {tokens.find(t => t.symbol === asset.token)?.icon || asset.token[0]}
                            </div>
                            <div>
                              <div className="font-bold">{asset.token}</div>
                              <div className="text-sm text-gray-400">{asset.amount} tokens</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">${asset.value.toFixed(2)}</div>
                            <div className={`text-sm ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {asset.change >= 0 ? '+' : ''}{asset.change}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Market Stats */}
            <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-bold mb-4">Market Overview</h3>
              <div className="space-y-3">
                {tokens.slice(0, 4).map((token, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{token.icon}</span>
                      <div>
                        <div className="font-semibold">{token.symbol}</div>
                        <div className="text-xs text-gray-400">{token.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${token.price.toFixed(2)}</div>
                      <div className={`text-xs ${token.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {token.change >= 0 ? '+' : ''}{token.change}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-bold mb-4">Platform Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">Total Users</span>
                  </div>
                  <span className="font-semibold">124,567</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Total Volume</span>
                  </div>
                  <span className="font-semibold">$2.8B</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">Total Liquidity</span>
                  </div>
                  <span className="font-semibold">$456M</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Swapped 1.5 ETH → 3,684 USDC</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Added liquidity to ETH/USDC</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Staked 100 LINK tokens</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Claimed 0.05 ETH rewards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Slippage Tolerance</label>
                <div className="flex gap-2">
                  {[0.1, 0.5, 1.0].map(val => (
                    <button
                      key={val}
                      onClick={() => setSlippage(val)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        slippage === val 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {val}%
                    </button>
                  ))}
                  <input
                    type="number"
                    value={slippage}
                    onChange={(e) => setSlippage(parseFloat(e.target.value) || 0)}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
                    placeholder="Custom"
                    step="0.1"
                    min="0"
                    max="50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Transaction Deadline</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue={20}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
                    min="1"
                  />
                  <span className="text-sm text-gray-400">minutes</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Theme</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm">
                  <option>Dark (Default)</option>
                  <option>Dark Blue</option>
                  <option>Purple Night</option>
                  <option>Cyberpunk</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Show Price Impact Warning</span>
                <button className="w-12 h-6 bg-purple-500 rounded-full p-1 transition-colors">
                  <div className="w-4 h-4 bg-white rounded-full transform translate-x-6 transition-transform"></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Auto Router</span>
                <button className="w-12 h-6 bg-purple-500 rounded-full p-1 transition-colors">
                  <div className="w-4 h-4 bg-white rounded-full transform translate-x-6 transition-transform"></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Expert Mode</span>
                <button className="w-12 h-6 bg-gray-600 rounded-full p-1 transition-colors">
                  <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
                </button>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-700">
              <button
                onClick={() => setShowSettings(false)}
                className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 mt-16 border-t border-gray-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold">Nexora</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                The most advanced decentralized exchange with cutting-edge features for DeFi enthusiasts.
              </p>
              <div className="flex gap-3">
                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <Star className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Products</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Token Swap</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Liquidity Pools</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Yield Farming</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Staking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">NFT Marketplace</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Developers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SDK</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bug Bounty</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Telegram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Medium</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Governance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700/50 flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 Nexora. All rights reserved. Built on Ethereum & Layer 2 solutions.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default Nexora;
                    
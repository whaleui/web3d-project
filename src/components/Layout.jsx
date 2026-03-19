import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Globe, Wallet, TrendingUp, Exchange, Link as LinkIcon, Diamond, Phone, Hamburger } from '@icon-park/react';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f6f3]">
      <div className="hidden lg:flex lg:flex-row">
        <div className="w-60 bg-white border-r border-[#e9e9e7] h-screen fixed">
          <div className="p-4">
            <h1 className="text-lg font-semibold text-[#37352f]">Web3 设计学院</h1>
          </div>
          <nav className="p-2">
            <Link to="/" className={`block py-2 px-3 rounded-md mb-1 transition-all ${location.pathname === '/' ? 'bg-[#f7f6f3] text-[#37352f] font-medium' : 'hover:bg-[#f7f6f3] text-[#6b6964]'}`}>
              <div className="flex items-center gap-3">
                <span><Home size={20} theme="outline" component="span" /></span>
                <span>首页</span>
              </div>
            </Link>
            <Link to="/web3" className={`block py-2 px-3 rounded-md mb-1 transition-all ${location.pathname === '/web3' ? 'bg-[#f7f6f3] text-[#37352f] font-medium' : 'hover:bg-[#f7f6f3] text-[#6b6964]'}`}>
              <div className="flex items-center gap-3">
                <span><Globe size={20} theme="outline" component="span" /></span>
                <span>Web3</span>
              </div>
            </Link>
            <Link to="/crypto" className={`block py-2 px-3 rounded-md mb-1 transition-all ${location.pathname === '/crypto' ? 'bg-[#f7f6f3] text-[#37352f] font-medium' : 'hover:bg-[#f7f6f3] text-[#6b6964]'}`}>
              <div className="flex items-center gap-3">
                <span><Wallet size={20} theme="outline" component="span" /></span>
                <span>虚拟货币</span>
              </div>
            </Link>
            <Link to="/cfd" className={`block py-2 px-3 rounded-md mb-1 transition-all ${location.pathname === '/cfd' ? 'bg-[#f7f6f3] text-[#37352f] font-medium' : 'hover:bg-[#f7f6f3] text-[#6b6964]'}`}>
              <div className="flex items-center gap-3">
                <span><TrendingUp size={20} theme="outline" component="span" /></span>
                <span>CFD交易</span>
              </div>
            </Link>
            <Link to="/exchange" className={`block py-2 px-3 rounded-md mb-1 transition-all ${location.pathname === '/exchange' ? 'bg-[#f7f6f3] text-[#37352f] font-medium' : 'hover:bg-[#f7f6f3] text-[#6b6964]'}`}>
              <div className="flex items-center gap-3">
                <span><Exchange size={20} theme="outline" component="span" /></span>
                <span>交易所</span>
              </div>
            </Link>
            <Link to="/link-catcher" className={`block py-2 px-3 rounded-md mb-1 transition-all ${location.pathname === '/link-catcher' ? 'bg-[#f7f6f3] text-[#37352f] font-medium' : 'hover:bg-[#f7f6f3] text-[#6b6964]'}`}>
              <div className="flex items-center gap-3">
                <span><LinkIcon size={20} theme="outline" component="span" /></span>
                <span>链接捕手</span>
              </div>
            </Link>
            <Link to="/open-source" className={`block py-2 px-3 rounded-md mb-1 transition-all ${location.pathname === '/open-source' ? 'bg-[#f7f6f3] text-[#37352f] font-medium' : 'hover:bg-[#f7f6f3] text-[#6b6964]'}`}>
              <div className="flex items-center gap-3">
                <span><Diamond size={20} theme="outline" component="span" /></span>
                <span>开源宝藏</span>
              </div>
            </Link>
            <Link to="/case-study" className={`block py-2 px-3 rounded-md mb-1 transition-all ${location.pathname === '/case-study' ? 'bg-[#f7f6f3] text-[#37352f] font-medium' : 'hover:bg-[#f7f6f3] text-[#6b6964]'}`}>
              <div className="flex items-center gap-3">
                <span><Phone size={20} theme="outline" component="span" /></span>
                <span>实战案例</span>
              </div>
            </Link>
          </nav>
        </div>
        <div className="flex-1 ml-60 p-6 bg-white">
          {children}
        </div>
      </div>

      <div className="lg:hidden flex flex-col h-screen">
        <header className="bg-white border-b border-[#e9e9e7] py-4 px-4 flex justify-between items-center sticky top-0 z-40 shadow-sm">
          <h1 className="text-lg font-semibold text-[#37352f]">Web3 设计学院</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full hover:bg-[#f7f6f3] transition-colors"
          >
            <Hamburger size={24} fill="#37352f" theme="outline" component="span" />
          </button>
        </header>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed top-16 left-0 right-0 bg-white z-30 shadow-lg rounded-b-2xl overflow-hidden"
          >
            <nav className="p-4">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 py-4 px-4 rounded-lg mb-2 transition-all ${location.pathname === '/' ? 'bg-[#f7f6f3] text-[#37352f] font-medium' : 'hover:bg-[#f7f6f3] text-[#6b6964]'}`}>
                <span className="text-xl"><Home size={20} theme="outline" component="span" /></span>
                <span className="text-base">首页</span>
              </Link>
              <Link to="/web3" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 py-4 px-4 rounded-lg mb-2 transition-all ${location.pathname === '/web3' ? 'bg-[#f7f6f3] text-[#37352f] font-medium' : 'hover:bg-[#f7f6f3] text-[#6b6964]'}`}>
                <span className="text-xl"><Globe size={20} theme="outline" component="span" /></span>
                <span className="text-base">Web3</span>
              </Link>
              <Link to="/crypto" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 py-4 px-4 rounded-lg mb-2 transition-all ${location.pathname === '/crypto' ? 'bg-[#f7f6f3] text-[#37352f] font-medium' : 'hover:bg-[#f7f6f3] text-[#6b6964]'}`}>
                <span className="text-xl"><Wallet size={20} theme="outline" component="span" /></span>
                <span className="text-base">虚拟货币</span>
              </Link>
              <Link to="/cfd" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 py-4 px-4 rounded-lg mb-2 transition-all ${location.pathname === '/cfd' ? 'bg-[#f7f6f3] text-[#37352f] font-medium' : 'hover:bg-[#f7f6f3] text-[#6b6964]'}`}>
                <span className="text-xl"><TrendingUp size={20} theme="outline" component="span" /></span>
                <span className="text-base">CFD交易</span>
              </Link>
              <Link to="/exchange" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 py-4 px-4 rounded-lg mb-2 transition-all ${location.pathname === '/exchange' ? 'bg-[#f7f6f3] text-[#37352f] font-medium' : 'hover:bg-[#f7f6f3] text-[#6b6964]'}`}>
                <span className="text-xl"><Exchange size={20} theme="outline" component="span" /></span>
                <span className="text-base">交易所</span>
              </Link>
            </nav>
          </motion.div>
        )}

        <main className="flex-1 overflow-y-auto bg-[#f7f6f3] pb-20">
          <div className="p-4">
            {children}
          </div>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e9e9e7] py-3 px-6 flex justify-around items-center z-40 shadow-md">
          <Link to="/" className={`flex flex-col items-center gap-1 px-3 py-2 ${location.pathname === '/' ? 'text-[#37352f]' : 'text-[#6b6964]'}`}>
            <span className="text-xl"><Home size={20} theme="outline" component="span" /></span>
            <span className="text-xs font-medium">首页</span>
          </Link>
          <Link to="/web3" className={`flex flex-col items-center gap-1 px-3 py-2 ${location.pathname === '/web3' ? 'text-[#37352f]' : 'text-[#6b6964]'}`}>
            <span className="text-xl"><Globe size={20} theme="outline" component="span" /></span>
            <span className="text-xs font-medium">Web3</span>
          </Link>
          <Link to="/crypto" className={`flex flex-col items-center gap-1 px-3 py-2 ${location.pathname === '/crypto' ? 'text-[#37352f]' : 'text-[#6b6964]'}`}>
            <span className="text-xl"><Wallet size={20} theme="outline" component="span" /></span>
            <span className="text-xs font-medium">虚拟货币</span>
          </Link>
          <Link to="/cfd" className={`flex flex-col items-center gap-1 px-3 py-2 ${location.pathname === '/cfd' ? 'text-[#37352f]' : 'text-[#6b6964]'}`}>
            <span className="text-xl"><TrendingUp size={20} theme="outline" component="span" /></span>
            <span className="text-xs font-medium">CFD交易</span>
          </Link>
          <Link to="/exchange" className={`flex flex-col items-center gap-1 px-3 py-2 ${location.pathname === '/exchange' ? 'text-[#37352f]' : 'text-[#6b6964]'}`}>
            <span className="text-xl"><Exchange size={20} theme="outline" component="span" /></span>
            <span className="text-xs font-medium">交易所</span>
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
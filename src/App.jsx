import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// 懒加载页面组件
const HomePage = lazy(() => import('./pages/Home'));
const Web3Page = lazy(() => import('./pages/Web3'));
const CryptoPage = lazy(() => import('./pages/Crypto'));
const CFDPage = lazy(() => import('./pages/CFD'));
const ExchangePage = lazy(() => import('./pages/Exchange'));
const LinkCatcherPage = lazy(() => import('./pages/LinkCatcher'));
const OpenSourcePage = lazy(() => import('./pages/OpenSource'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudy'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">加载中...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/web3" element={<Web3Page />} />
          <Route path="/crypto" element={<CryptoPage />} />
          <Route path="/cfd" element={<CFDPage />} />
          <Route path="/exchange" element={<ExchangePage />} />
          <Route path="/link-catcher" element={<LinkCatcherPage />} />
          <Route path="/open-source" element={<OpenSourcePage />} />
          <Route path="/case-study" element={<CaseStudyPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
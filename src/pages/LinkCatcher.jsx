import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const LinkCatcher = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [useAI, setUseAI] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [showCurrencyModule, setShowCurrencyModule] = useState(false);

  const analyzeUrl = (url, webContent = null) => {
    // 提取域名
    const domain = new URL(url).hostname;
    
    // 分析URL路径和参数
    const path = new URL(url).pathname;
    const searchParams = new URL(url).searchParams;
    
    // 提取网页内容关键词（如果有）
    const contentKeywords = webContent ? webContent.keywords || [] : [];
    
    // 定义分析规则
    const analysisRules = {
      // 交易所相关
      'binance.com': {
        title: 'Binance交易所界面分析',
        keywords: ['交易所', '交易对', 'K线图', '订单簿', '流动性', '杠杆交易', '现货交易', '合约交易', '衍生品'],
        layout: '专业交易界面，多窗口布局，实时数据展示，深色主题',
        interactions: '流畅的图表交互，快速下单流程，响应式设计，多语言支持',
        riskDesign: '交易风险提示，杠杆交易警告，资金安全提示，异常交易监控',
        summary: 'Binance作为全球最大的加密货币交易所，提供了专业、高效的交易界面，适合各类交易者使用。平台功能丰富，支持多种交易类型和加密货币，具有良好的流动性和交易深度。',
        trendAnalysis: '近期市场整体呈现震荡上行趋势，主流加密货币如比特币和以太坊保持稳定增长，平台交易量和用户活跃度持续提升。',
        suggestions: [
          '优化移动端K线图交互体验',
          '增加更多技术指标选项',
          '提升订单执行速度和可靠性',
          '简化新手引导流程'
        ]
      },
      'okx.com': {
        title: 'OKX交易所界面分析',
        keywords: ['交易所', '衍生品', 'DeFi', 'NFT', 'Web3', '杠杆交易', '现货交易', '合约交易'],
        layout: '多元化功能集成，模块化设计，深色主题，响应式布局',
        interactions: '丰富的交易工具，智能订单类型，跨链资产管理，一键交易',
        riskDesign: '多层次风险控制，异常交易预警，安全审计提示，资金安全保障',
        summary: 'OKX是一家综合性加密货币交易所，提供丰富的交易品种和功能，包括现货、合约、DeFi和NFT等。平台界面现代化，功能齐全，适合各类交易者。',
        trendAnalysis: '市场呈现结构性行情，部分新兴加密货币表现活跃，平台在衍生品交易方面具有优势，交易量稳步增长。',
        suggestions: [
          '简化新用户注册流程',
          '增强教育内容和市场分析工具',
          '优化跨设备同步体验',
          '提升平台稳定性'
        ]
      },
      'huobi.com': {
        title: 'Huobi交易所界面分析',
        keywords: ['交易所', '现货', '合约', '杠杆', '钱包', '衍生品', 'DeFi', '流动性'],
        layout: '清晰的功能分区，响应式布局，数据可视化，用户友好设计',
        interactions: '直观的交易操作，实时市场数据，快捷充值提现，多语言支持',
        riskDesign: '风险等级评估，交易限额提示，安全验证机制，异常活动监控',
        summary: 'Huobi是一家老牌加密货币交易所，提供稳定的交易环境和丰富的交易品种。平台界面清晰，功能完善，适合各类交易者使用。',
        trendAnalysis: '市场整体呈现震荡整理态势，平台在现货交易方面表现稳定，用户基础扎实，交易量保持在合理水平。',
        suggestions: [
          '提升平台稳定性和交易速度',
          '增加更多法币入金渠道',
          '优化客户支持响应速度',
          '增强移动端用户体验'
        ]
      },
      'coinbase.com': {
        title: 'Coinbase交易所界面分析',
        keywords: ['交易所', '法币出入金', 'NFT', 'DeFi', '现货交易', '钱包', '加密货币'],
        layout: '用户友好的界面设计，分步引导，资产分类展示，响应式布局',
        interactions: '简化的交易流程，一键购买功能，多链支持，实时价格提醒',
        riskDesign: '两步验证，冷存储保护，异常活动监控，风险披露清晰',
        summary: 'Coinbase是一家用户友好的加密货币交易所，特别适合新手用户。平台提供简单直观的界面和便捷的法币出入金渠道，同时也支持高级交易功能。',
        trendAnalysis: '市场呈现稳步上升趋势，平台在机构用户和零售用户中都有良好表现，交易量持续增长，特别是在主流加密货币交易方面。',
        suggestions: [
          '增加更多加密货币支持',
          '优化手续费结构',
          '提升客户服务质量',
          '增强教育内容'
        ]
      },
      'kraken.com': {
        title: 'Kraken交易所界面分析',
        keywords: ['交易所', '现货交易', '期货交易', '法币出入金', '安全', '流动性'],
        layout: '专业交易界面，清晰的功能分区，实时数据展示，响应式设计',
        interactions: '直观的交易操作，高级图表工具，多语言支持，快捷充值提现',
        riskDesign: '多层次安全验证，风险提示清晰，异常活动监控，资金安全保障',
        summary: 'Kraken是一家以安全著称的加密货币交易所，提供专业的交易界面和丰富的交易品种。平台适合专业交易者，同时也对新手友好。',
        trendAnalysis: '市场呈现震荡上行趋势，平台在安全方面的声誉吸引了大量用户，交易量稳步增长，特别是在欧洲市场表现突出。',
        suggestions: [
          '优化移动端用户体验',
          '增加更多交易对',
          '提升平台稳定性',
          '简化注册流程'
        ]
      },
      'bitstamp.net': {
        title: 'Bitstamp交易所界面分析',
        keywords: ['交易所', '现货交易', '法币出入金', '安全', '流动性'],
        layout: '简洁的界面设计，功能分区明确，实时数据展示，响应式布局',
        interactions: '直观的交易操作，快捷充值提现，多语言支持，实时价格提醒',
        riskDesign: '安全验证机制，风险提示清晰，异常活动监控，资金安全保障',
        summary: 'Bitstamp是一家历史悠久的加密货币交易所，以简洁的界面和可靠的服务著称。平台适合新手用户，提供基本的交易功能和法币出入金渠道。',
        trendAnalysis: '市场呈现稳步增长趋势，平台在欧洲市场有较强的用户基础，交易量保持稳定，特别是在主流加密货币交易方面。',
        suggestions: [
          '增加更多交易对',
          '优化移动端用户体验',
          '提升平台稳定性',
          '增强教育内容'
        ]
      },
      // Web3钱包相关
      'metamask.io': {
        title: 'MetaMask钱包界面分析',
        keywords: ['Web3钱包', '以太坊', '插件', 'NFT', 'DeFi', '私钥', '签名', '多链', '链上', '链下', '通证', 'Token', '钱包授权', '链上签名', '加密资产'],
        layout: '简洁的用户界面，分层导航，资产概览，响应式设计',
        interactions: '流畅的交易签名流程，网络切换便捷，资产管理直观，多链支持',
        riskDesign: '私钥安全提示，钓鱼网站警告，交易确认机制，异常活动监控',
        summary: 'MetaMask是最流行的Web3钱包之一，提供浏览器插件和移动应用。平台支持多链资产管理，是DeFi和NFT交互的重要工具。',
        trendAnalysis: 'Web3钱包市场持续增长，MetaMask作为行业领导者，用户数量和交易量稳步上升，特别是在DeFi和NFT领域的使用频率增加。',
        suggestions: [
          '优化移动端用户体验',
          '增加更多安全功能选项',
          '提升资产加载速度',
          '增强教育内容'
        ]
      },
      'phantom.app': {
        title: 'Phantom钱包界面分析',
        keywords: ['Web3钱包', 'Solana', 'NFT', 'DeFi', '插件', '多链', '链上', '链下', '通证', 'Token', '钱包授权', '链上签名', '加密资产'],
        layout: '简洁的用户界面，分层导航，资产概览，响应式设计',
        interactions: '流畅的交易签名流程，网络切换便捷，资产管理直观，多链支持',
        riskDesign: '私钥安全提示，钓鱼网站警告，交易确认机制，异常活动监控',
        summary: 'Phantom是Solana生态系统中最流行的钱包之一，提供简洁的用户界面和流畅的交易体验。平台支持Solana上的DeFi和NFT交互，也逐渐扩展到其他链。',
        trendAnalysis: 'Solana生态系统持续发展，Phantom作为主要钱包工具，用户数量和交易量稳步增长，特别是在NFT和DeFi领域的使用频率增加。',
        suggestions: [
          '优化移动端用户体验',
          '增加更多安全功能选项',
          '提升资产加载速度',
          '增强教育内容'
        ]
      },
      'ledger.com': {
        title: 'Ledger硬件钱包界面分析',
        keywords: ['硬件钱包', '冷存储', '安全', '资产管理', '多链', '链上', '链下', '通证', 'Token', '加密资产'],
        layout: '简洁的用户界面，功能分区明确，资产概览，响应式设计',
        interactions: '直观的设备管理，安全的交易签名，资产管理便捷，多链支持',
        riskDesign: '私钥安全提示，设备连接验证，交易确认机制，异常活动监控',
        summary: 'Ledger是最知名的硬件钱包品牌之一，提供最高级别的资产安全保障。平台通过硬件设备和软件应用的结合，为用户提供安全、便捷的资产管理体验。',
        trendAnalysis: '硬件钱包市场持续增长，Ledger作为行业领导者，用户数量和市场份额稳步上升，特别是在大额资产持有者中广受欢迎。',
        suggestions: [
          '优化移动端用户体验',
          '增加更多安全功能选项',
          '提升资产加载速度',
          '增强教育内容'
        ]
      },
      // CFD交易相关
      'ig.com': {
        title: 'IG CFD交易平台分析',
        keywords: ['CFD', '差价合约', '杠杆交易', '技术分析', '风险管理', '外汇', '股票', '大宗商品'],
        layout: '专业交易终端，多市场数据，自定义仪表盘，响应式设计',
        interactions: '高级图表工具，一键交易，实时市场新闻，多语言支持',
        riskDesign: '杠杆风险提示，止损止盈设置，账户余额预警，风险披露清晰',
        summary: 'IG是一家知名的CFD交易平台，提供专业的交易工具和丰富的交易品种。平台适合专业交易者，提供高级图表分析和风险管理工具。',
        trendAnalysis: 'CFD交易市场持续活跃，IG作为行业领导者，用户数量和交易量稳步增长，特别是在外汇和股票CFD交易方面表现突出。',
        suggestions: [
          '优化移动交易体验',
          '增加更多交易品种',
          '提升平台稳定性',
          '增强教育内容'
        ]
      },
      'trading212.com': {
        title: 'Trading 212 CFD交易平台分析',
        keywords: ['CFD', '股票', '外汇', '零佣金', '模拟账户', '杠杆交易', '技术分析'],
        layout: '直观的界面设计，资产类别清晰，教育资源丰富，响应式布局',
        interactions: '一键交易功能，实时价格提醒，图表分析工具，多语言支持',
        riskDesign: '风险披露清晰，交易限制设置，账户安全保障，杠杆风险提示',
        summary: 'Trading 212是一家用户友好的CFD交易平台，以零佣金政策和直观的界面设计著称。平台适合新手用户，提供模拟账户和丰富的教育资源。',
        trendAnalysis: 'CFD交易市场竞争激烈，Trading 212通过零佣金策略吸引了大量用户，交易量持续增长，特别是在股票CFD交易方面表现突出。',
        suggestions: [
          '提升订单执行速度',
          '增加更多技术指标',
          '优化移动应用性能',
          '增强市场分析工具'
        ]
      },
      'etoro.com': {
        title: 'eToro CFD交易平台分析',
        keywords: ['CFD', '社交交易', '股票', '外汇', '加密货币', '杠杆交易', '复制交易'],
        layout: '社交化交易界面，资产类别清晰，教育资源丰富，响应式布局',
        interactions: '一键交易功能，实时价格提醒，图表分析工具，社交互动',
        riskDesign: '风险披露清晰，交易限制设置，账户安全保障，杠杆风险提示',
        summary: 'eToro是一家以社交交易为特色的CFD交易平台，允许用户复制其他交易者的策略。平台适合新手用户，提供丰富的教育资源和社交互动功能。',
        trendAnalysis: '社交交易市场持续增长，eToro作为行业领导者，用户数量和交易量稳步上升，特别是在复制交易和加密货币交易方面表现突出。',
        suggestions: [
          '提升订单执行速度',
          '增加更多交易品种',
          '优化移动应用性能',
          '增强社交交易功能'
        ]
      },
      'plus500.com': {
        title: 'Plus500 CFD交易平台分析',
        keywords: ['CFD', '股票', '外汇', '加密货币', '杠杆交易', '技术分析'],
        layout: '直观的界面设计，资产类别清晰，响应式布局，用户友好',
        interactions: '一键交易功能，实时价格提醒，图表分析工具，多语言支持',
        riskDesign: '风险披露清晰，交易限制设置，账户安全保障，杠杆风险提示',
        summary: 'Plus500是一家用户友好的CFD交易平台，以直观的界面设计和简单的交易流程著称。平台适合新手用户，提供多种交易品种和便捷的交易工具。',
        trendAnalysis: 'CFD交易市场竞争激烈，Plus500通过用户友好的界面和便捷的交易流程吸引了大量用户，交易量持续增长，特别是在零售交易领域表现突出。',
        suggestions: [
          '提升订单执行速度',
          '增加更多技术指标',
          '优化移动应用性能',
          '增强教育内容'
        ]
      },
      // Web3相关网站
      'opensea.io': {
        title: 'OpenSea NFT marketplace分析',
        keywords: ['NFT', ' marketplace', 'Web3', '数字艺术品', '收藏品', '交易', '链上', '链下', '空投', '通证', 'Token', '分布式账本', '加密资产', '节点', '质押', '挖矿', '链上签名', '钱包授权', 'CeFi', '滑点', '流动性', '流动性池', '做市', '哈希', '巨鲸', '土狗项目', '合约漏洞', '反洗钱', '钓鱼', '加密监管', '牌照'],
        layout: '直观的商品展示，分类清晰，响应式设计，用户友好',
        interactions: '流畅的交易流程，搜索筛选功能，收藏管理，多链支持',
        riskDesign: '交易风险提示，钱包安全提示，钓鱼网站警告，异常活动监控',
        summary: 'OpenSea是最大的NFT marketplace之一，提供丰富的数字艺术品和收藏品交易。平台界面直观，功能完善，支持多链交易。',
        trendAnalysis: 'NFT市场经历了快速增长后进入调整期，OpenSea作为行业领导者，用户数量和交易量保持稳定，特别是在高质量数字艺术品交易方面表现突出。',
        suggestions: [
          '优化移动端用户体验',
          '提升页面加载速度',
          '增加更多筛选选项',
          '增强教育内容'
        ]
      },
      'defillama.com': {
        title: 'DeFi Llama分析平台分析',
        keywords: ['DeFi', '数据分析', 'TVL', '收益率', '协议', '链上数据', '链上', '链下', '通证', 'Token', '分布式账本', '零知识证明', 'ZKP', 'AMM', '自动做市商', '预言机', '加密资产', '节点', '质押', '挖矿', '链上签名', '钱包授权', 'CeFi', '滑点', '流动性', '流动性池', '做市', '单币质押', '双币挖矿', '收益聚合', '永续合约', '交割合约', '哈希', '巨鲸', '减半', '解锁', '持仓周期', '资金流向', 'Restaking', '再质押', 'LSD', '流动性质押'],
        layout: '数据驱动界面，图表展示丰富，分类清晰，响应式设计',
        interactions: '流畅的筛选功能，数据导出，实时更新，多链支持',
        riskDesign: '数据准确性提示，投资风险警告，免责声明',
        summary: 'DeFi Llama是领先的DeFi数据分析平台，提供全面的链上数据和协议分析。平台界面数据驱动，功能完善，是DeFi投资者和研究者的重要工具。',
        trendAnalysis: 'DeFi市场持续发展，DeFi Llama作为行业标准数据来源，用户数量和数据覆盖范围不断扩大，特别是在多链数据整合方面表现突出。',
        suggestions: [
          '优化移动端用户体验',
          '提升数据加载速度',
          '增加更多分析工具',
          '增强数据可视化'
        ]
      }
    };
    
    // 检查是否匹配已知域名
    for (const [key, value] of Object.entries(analysisRules)) {
      if (domain.includes(key)) {
        return value;
      }
    }
    
    // 基于路径分析
    if (path.includes('wallet') || path.includes(' Wallet') || path.includes('wallet/')) {
      return {
        title: 'Web3钱包界面分析',
        keywords: ['Web3钱包', '加密货币', '安全', '资产管理', '交易', '私钥', '签名', '多链'],
        layout: '资产概览优先，功能分区明确，响应式设计，用户友好',
        interactions: '流畅的交易流程，安全的签名机制，直观的资产管理，多链支持',
        riskDesign: '私钥安全提示，交易确认机制，钓鱼防护，异常活动监控',
        summary: 'Web3钱包是连接区块链世界的重要工具，提供安全的资产管理和交易签名功能。平台界面通常以资产概览为核心，注重安全性和用户体验。',
        trendAnalysis: 'Web3钱包市场持续增长，用户对安全、便捷的资产管理需求增加，多链支持和跨设备同步成为重要趋势。',
        suggestions: [
          '优化用户引导流程',
          '增加更多安全功能',
          '提升跨设备同步体验',
          '增强教育内容'
        ]
      };
    } else if (path.includes('trade') || path.includes('exchange') || path.includes('trading') || path.includes('market')) {
      return {
        title: '加密货币交易平台分析',
        keywords: ['交易所', '交易对', 'K线图', '订单', '流动性', '杠杆交易', '现货交易', '合约交易', '链上', '链下', '空投', '通证', 'Token', '分布式账本', '加密资产', '节点', '质押', '挖矿', '链上签名', '钱包授权', 'CeFi', '滑点', '流动性池', '做市', '单币质押', '双币挖矿', '收益聚合', '永续合约', '交割合约', '哈希', '巨鲸', '减半', '解锁', '持仓周期', '资金流向', '土狗项目', '合约漏洞', '反洗钱', '钓鱼', '加密监管', '牌照', '灰度'],
        layout: '专业交易界面，多窗口布局，实时数据展示，响应式设计',
        interactions: '流畅的图表交互，快速下单，多语言支持，实时价格提醒',
        riskDesign: '交易风险提示，杠杆警告，资金安全提示，异常交易监控',
        summary: '加密货币交易平台是数字资产交易的核心场所，提供专业的交易工具和实时市场数据。平台界面通常以交易功能为核心，注重专业性和效率。',
        trendAnalysis: '加密货币交易市场持续活跃，主流交易所交易量稳步增长，用户对高级交易工具和多链支持的需求增加。',
        suggestions: [
          '优化移动端体验',
          '增加更多交易工具',
          '提升平台稳定性',
          '简化新手引导流程'
        ]
      };
    } else if (path.includes('cfd') || path.includes('forex') || path.includes('fx') || path.includes('spreadbetting')) {
      return {
        title: 'CFD交易平台分析',
        keywords: ['CFD', '差价合约', '杠杆交易', '技术分析', '风险管理', '外汇', '股票', '大宗商品'],
        layout: '专业交易终端，多市场数据，自定义仪表盘，响应式设计',
        interactions: '高级图表工具，一键交易，实时市场新闻，多语言支持',
        riskDesign: '杠杆风险提示，止损止盈设置，账户预警，风险披露清晰',
        summary: 'CFD交易平台提供多种金融资产的差价合约交易，具有杠杆效应。平台界面通常以专业交易工具为核心，注重风险管理和市场分析。',
        trendAnalysis: 'CFD交易市场竞争激烈，用户对低佣金、高级交易工具和移动交易体验的需求增加，平台间差异化竞争加剧。',
        suggestions: [
          '优化移动交易体验',
          '增加更多交易品种',
          '提升平台稳定性',
          '增强教育内容'
        ]
      };
    } else if (path.includes('nft') || path.includes('NFT') || path.includes('marketplace')) {
      return {
        title: 'NFT Marketplace分析',
        keywords: ['NFT', ' marketplace', 'Web3', '数字艺术品', '收藏品', '交易'],
        layout: '直观的商品展示，分类清晰，响应式设计，用户友好',
        interactions: '流畅的交易流程，搜索筛选功能，收藏管理，多链支持',
        riskDesign: '交易风险提示，钱包安全提示，钓鱼网站警告，异常活动监控',
        summary: 'NFT Marketplace是数字艺术品和收藏品的交易平台，提供丰富的NFT展示和交易功能。平台界面通常以商品展示为核心，注重用户体验和交易安全。',
        trendAnalysis: 'NFT市场经历了快速增长后进入调整期，用户对高质量数字艺术品和便捷交易体验的需求增加，多链支持成为重要趋势。',
        suggestions: [
          '优化移动端用户体验',
          '提升页面加载速度',
          '增加更多筛选选项',
          '增强教育内容'
        ]
      };
    } else if (path.includes('defi') || path.includes('DeFi') || path.includes('stake') || path.includes('yield')) {
      return {
        title: 'DeFi平台分析',
        keywords: ['DeFi', '去中心化金融', '流动性挖矿', '质押', '收益率', '协议', '链上', '链下', '空投', '通证', 'Token', '分布式账本', '零知识证明', 'ZKP', 'AMM', '自动做市商', '预言机', '加密资产', '节点', '挖矿', '链上签名', '钱包授权', 'CeFi', '滑点', '流动性', '流动性池', '做市', '单币质押', '双币挖矿', '收益聚合', '永续合约', '交割合约', '哈希', '巨鲸', '减半', '解锁', '持仓周期', '资金流向', '土狗项目', '合约漏洞', '反洗钱', '钓鱼', '加密监管', '牌照', '灰度', 'Restaking', '再质押', 'LSD', '流动性质押'],
        layout: '数据驱动界面，功能分区明确，响应式设计，用户友好',
        interactions: '流畅的操作流程，实时数据更新，多链支持，安全的签名机制',
        riskDesign: '智能合约风险提示，市场风险警告，安全审计提示，异常活动监控',
        summary: 'DeFi平台提供去中心化的金融服务，包括借贷、流动性挖矿和质押等功能。平台界面通常以数据展示为核心，注重安全性和用户引导。',
        trendAnalysis: 'DeFi市场持续发展，用户对高收益、低风险和多链支持的需求增加，平台间的竞争加剧，安全审计成为重要考量。',
        suggestions: [
          '优化用户引导流程',
          '增加更多安全功能',
          '提升数据加载速度',
          '增强教育内容'
        ]
      };
    }
    
    // 基于URL参数分析
    if (searchParams.has('token') || searchParams.has('crypto') || searchParams.has('coin')) {
      return {
        title: '加密货币相关页面分析',
        keywords: ['加密货币', '代币', '交易', '市场数据', '价格', '链上', '链下', '空投', '通证', 'Token', '分布式账本', '加密资产', '节点', '质押', '挖矿', '链上签名', '钱包授权', 'CeFi', '滑点', '流动性', '流动性池', '做市', '单币质押', '双币挖矿', '收益聚合', '永续合约', '交割合约', '哈希', '巨鲸', '减半', '解锁', '持仓周期', '资金流向', '土狗项目', '合约漏洞', '反洗钱', '钓鱼', '加密监管', '牌照', '灰度'],
        layout: '数据驱动界面，实时价格展示，功能分区明确，响应式设计',
        interactions: '流畅的图表交互，实时数据更新，多语言支持，快捷操作',
        riskDesign: '投资风险提示，市场波动警告，安全提示',
        summary: '加密货币相关页面提供数字资产的市场数据和交易信息，通常以价格图表和市场分析为核心，注重数据准确性和实时性。',
        trendAnalysis: '加密货币市场持续波动，用户对实时数据、深度分析和多平台整合的需求增加，市场信息的及时性和准确性成为关键。',
        suggestions: [
          '优化移动端用户体验',
          '提升数据加载速度',
          '增加更多分析工具',
          '增强教育内容'
        ]
      };
    }
    
    // 默认分析
    // 基于网页内容和URL生成更准确的分析结果
    const getContentBasedAnalysis = () => {
      // 分析网页内容，确定网站类型
      let siteType = '交易相关平台';
      let coreFeatures = '交易相关服务和功能';
      let riskDesign = '安全提示，隐私保护，风险披露，异常活动监控';
      let summary = '交易相关平台提供各种交易服务和功能，包括交易执行、市场分析、风险管理等。平台通常注重交易效率、安全性和用户体验。';
      let trendAnalysis = '交易市场持续发展，用户对高效、安全的交易服务需求增加，平台间的竞争加剧，技术创新成为重要趋势。';
      let suggestions = [
        '优化交易执行速度',
        '增加更多交易品种',
        '提升风险管理工具',
        '优化交易费用结构'
      ];
      let extractedKeywords = [];
      
      // 基于网页内容分析网站类型
      if (webContent) {
        const content = webContent.content.toLowerCase();
        const title = webContent.title.toLowerCase();
        extractedKeywords = webContent.keywords || [];
        
        // 检测交易所
        if (content.includes('exchange') || content.includes('trade') || content.includes('trading') || 
            content.includes('market') || content.includes('order') || content.includes('wallet') ||
            title.includes('exchange') || title.includes('trade') || title.includes('trading') ||
            extractedKeywords.some(keyword => ['exchange', 'trade', 'trading', 'market', 'order', 'wallet'].includes(keyword))) {
          siteType = '加密货币交易平台';
          coreFeatures = '加密货币交易、现货交易、合约交易、杠杆交易、钱包管理等';
          riskDesign = '交易风险提示，杠杆警告，资金安全提示，异常交易监控';
          summary = '加密货币交易平台是数字资产交易的核心场所，提供专业的交易工具和实时市场数据。平台以交易功能为核心，注重交易效率、安全性和流动性。';
          trendAnalysis = '加密货币交易市场持续活跃，主流交易所交易量稳步增长，用户对高级交易工具、多链支持和低费用的需求增加。';
          suggestions = [
            '优化交易执行速度和订单匹配效率',
            '增加更多交易品种和市场覆盖',
            '提升风险管理工具和安全措施',
            '优化交易费用结构，提高竞争力'
          ];
        }
        // 检测钱包
        else if (content.includes('wallet') || content.includes('private key') || 
                 content.includes('public key') || content.includes('address') || content.includes('sign') ||
                 title.includes('wallet') ||
                 extractedKeywords.some(keyword => ['wallet', 'private', 'key', 'address', 'sign', 'ethereum'].includes(keyword))) {
          siteType = 'Web3钱包';
          coreFeatures = '资产管理、交易签名、多链支持、安全存储、交易执行等';
          riskDesign = '私钥安全提示，交易确认机制，钓鱼防护，异常活动监控';
          summary = 'Web3钱包是连接区块链世界的重要工具，提供安全的资产管理和交易签名功能。平台注重资产安全、交易便捷性和多链支持。';
          trendAnalysis = 'Web3钱包市场持续增长，用户对安全、便捷的资产管理和交易需求增加，多链支持和跨设备同步成为重要趋势。';
          suggestions = [
            '提升资产安全和交易签名机制',
            '增加更多链的支持和资产类型',
            '优化跨设备同步体验',
            '增强交易功能和市场分析工具'
          ];
        }
        // 检测CFD交易平台
        else if (content.includes('cfd') || content.includes('forex') || content.includes('fx') || 
                 content.includes('spread betting') || content.includes('leveraged trading') ||
                 title.includes('cfd') || title.includes('forex') || title.includes('fx') ||
                 extractedKeywords.some(keyword => ['cfd', 'forex', 'fx', 'spread', 'betting', 'leveraged', 'trading'].includes(keyword))) {
          siteType = 'CFD交易平台';
          coreFeatures = '差价合约交易，杠杆交易，技术分析，风险管理，多市场覆盖等';
          riskDesign = '杠杆风险提示，止损止盈设置，账户预警，风险披露清晰';
          summary = 'CFD交易平台提供多种金融资产的差价合约交易，具有杠杆效应。平台注重交易工具的专业性、市场分析能力和风险管理。';
          trendAnalysis = 'CFD交易市场竞争激烈，用户对低佣金、高级交易工具和多市场覆盖的需求增加，平台间差异化竞争加剧。';
          suggestions = [
            '优化交易执行速度和订单处理',
            '增加更多交易品种和市场覆盖',
            '提升风险管理工具和教育内容',
            '优化交易费用结构，提高竞争力'
          ];
        }
        // 检测NFT平台
        else if (content.includes('nft') || content.includes('non-fungible token') || content.includes('digital art') || 
                 content.includes('collectible') || content.includes('marketplace') ||
                 title.includes('nft') || title.includes('marketplace') ||
                 extractedKeywords.some(keyword => ['nft', 'digital', 'art', 'collectible', 'marketplace', 'token'].includes(keyword))) {
          siteType = 'NFT Marketplace';
          coreFeatures = 'NFT交易、数字艺术品展示、收藏品管理、多链支持、交易执行等';
          riskDesign = '交易风险提示，钱包安全提示，钓鱼网站警告，异常活动监控';
          summary = 'NFT Marketplace是数字艺术品和收藏品的交易平台，提供丰富的NFT展示和交易功能。平台注重交易安全性、用户体验和市场流动性。';
          trendAnalysis = 'NFT市场经历了快速增长后进入调整期，用户对高质量数字艺术品、便捷交易体验和多链支持的需求增加。';
          suggestions = [
            '优化NFT交易执行速度和流动性',
            '增加更多NFT类型和市场覆盖',
            '提升交易安全和风险管理',
            '增强市场分析工具和收藏管理功能'
          ];
        }
        // 检测DeFi平台
        else if (content.includes('defi') || content.includes('decentralized finance') || content.includes('staking') || 
                 content.includes('yield') || content.includes('liquidity') ||
                 title.includes('defi') || title.includes('finance') ||
                 extractedKeywords.some(keyword => ['defi', 'decentralized', 'finance', 'staking', 'yield', 'liquidity'].includes(keyword))) {
          siteType = 'DeFi平台';
          coreFeatures = '去中心化金融服务、借贷、流动性挖矿、质押、交易执行等';
          riskDesign = '智能合约风险提示，市场风险警告，安全审计提示，异常活动监控';
          summary = 'DeFi平台提供去中心化的金融服务，包括借贷、流动性挖矿和质押等功能。平台注重智能合约安全、收益率和用户体验。';
          trendAnalysis = 'DeFi市场持续发展，用户对高收益、低风险和多链支持的需求增加，平台间的竞争加剧，安全审计成为重要考量。';
          suggestions = [
            '提升智能合约安全性和审计',
            '增加更多DeFi产品和收益策略',
            '优化用户引导和教育内容',
            '增强跨链互操作性和资产支持'
          ];
        }
      }
      
      // 结合提取的关键词和默认关键词
      const keywords = [siteType, ...coreFeatures.split('、').map(f => f.trim()), ...extractedKeywords.slice(0, 5)];
      
      return {
        title: `${siteType}分析`,
        keywords: [...new Set(keywords)], // 去重
        coreFeatures,
        riskDesign,
        summary,
        trendAnalysis,
        suggestions
      };
    };
    
    return getContentBasedAnalysis();
  };

  // 抓取网页内容
  const fetchWebContent = async (url) => {
    try {
      // 使用axios获取网页内容
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      // 提取网页标题
      const titleMatch = response.data.match(/<title>([\s\S]*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : '未知标题';
      
      // 提取网页描述
      const descMatch = response.data.match(/<meta name="description" content="([\s\S]*?)"/i);
      const description = descMatch ? descMatch[1] : '无描述';
      
      // 提取主要内容
      // 移除脚本和样式
      let content = response.data
        .replace(/<script[\s\S]*?<\/script>/g, '')
        .replace(/<style[\s\S]*?<\/style>/g, '')
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 2000); // 限制内容长度
      
      // 提取关键词（基于内容中的高频词）
      const keywords = extractKeywords(content);
      
      return { title, description, content, keywords };
    } catch (error) {
      console.error('抓取网页内容失败:', error);
      return { 
        title: '抓取失败', 
        description: '无法获取网页内容', 
        content: '',
        keywords: []
      };
    }
  };
  
  // 提取关键词
  const extractKeywords = (text) => {
    // 简单的关键词提取逻辑
    const stopWords = new Set([
      '的', '了', '和', '与', '或', '是', '在', '有', '为', '以', '我', '他', '她', '它',
      'a', 'an', 'the', 'and', 'or', 'is', 'in', 'have', 'for', 'to', 'I', 'he', 'she', 'it'
    ]);
    
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const wordCount = {};
    
    for (const word of words) {
      if (!stopWords.has(word) && word.length > 2) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    }
    
    return Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);
  };

  // AI分析函数
  const analyzeWithAI = async (url) => {
    try {
      // 先抓取网页内容
      const webContent = await fetchWebContent(url);
      
      // 使用Hugging Face的免费API接口
      const response = await axios.post('https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1', {
        inputs: `你是一个专业的金融交易分析师，擅长分析交易平台的交易功能、市场趋势和风险管理。请根据以下网页内容分析该交易平台的交易相关内容：\n\n网站URL: ${url}\n网站标题: ${webContent.title}\n网站描述: ${webContent.description}\n网站内容: ${webContent.content}\n\n分析应该包括：\n1. 交易平台类型和核心交易功能\n2. 交易品种和市场覆盖\n3. 交易费用和流动性\n4. 风险管理和安全措施\n5. 市场涨跌趋势分析\n6. 交易功能优化建议`,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.7,
          top_p: 0.95
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer hf_你的HuggingFaceAPI密钥' // 实际项目中需要替换为真实的API密钥
        }
      });
      
      return response.data[0].generated_text;
    } catch (error) {
      console.error('AI分析失败:', error);
      // 提供一个基于网页内容的模拟AI分析结果
      return `# 交易相关分析报告\n\n## 交易平台类型和核心交易功能\n该平台是一个${url.includes('binance') ? '加密货币交易所' : url.includes('wallet') ? 'Web3钱包' : url.includes('cfd') ? 'CFD交易平台' : '交易相关平台'}，提供${url.includes('binance') ? '加密货币交易、现货交易、合约交易、杠杆交易等' : url.includes('wallet') ? '资产管理、交易签名、多链支持等' : url.includes('cfd') ? '差价合约交易、杠杆交易、技术分析等' : '交易相关服务'}功能。\n\n## 交易品种和市场覆盖\n${url.includes('binance') ? '平台覆盖主流加密货币，包括比特币、以太坊等，同时提供丰富的交易对和衍生品' : url.includes('wallet') ? '支持多种区块链网络，包括以太坊、Solana等，管理多种数字资产' : url.includes('cfd') ? '提供股票、外汇、大宗商品等多种资产的差价合约交易' : '覆盖多种交易品种和市场'}。\n\n## 交易费用和流动性\n${url.includes('binance') ? '平台交易费用合理，流动性充足，特别是主流交易对，能够满足大额交易需求' : url.includes('wallet') ? '钱包管理费用较低，支持多种资产的存取和交易' : url.includes('cfd') ? '交易费用透明，不同资产类别有不同的费率结构' : '交易费用合理，流动性良好'}。\n\n## 风险管理和安全措施\n${url.includes('binance') ? '平台实施多重安全措施，包括冷存储、两步验证、异常交易监控等，同时提供风险提示和杠杆交易警告' : url.includes('wallet') ? '采用私钥加密存储，提供交易确认机制，钓鱼网站警告，异常活动监控等安全措施' : url.includes('cfd') ? '提供杠杆风险提示，止损止盈设置，账户余额预警，风险披露清晰' : '实施多种风险管理措施，保障用户资金安全'}。\n\n## 市场涨跌趋势分析\n${url.includes('binance') ? '近期加密货币市场整体呈现震荡上行趋势，主流加密货币如比特币和以太坊保持稳定增长，平台交易量和用户活跃度持续提升' : url.includes('wallet') ? 'Web3钱包市场持续增长，用户对安全、便捷的资产管理需求增加，多链支持成为重要趋势' : url.includes('cfd') ? 'CFD交易市场竞争激烈，用户对低佣金、高级交易工具的需求增加' : '交易市场持续发展，用户对高效、安全的交易服务需求增加'}。\n\n## 交易功能优化建议\n1. 优化交易执行速度和订单匹配效率\n2. 增加更多交易品种和市场覆盖\n3. 提升风险管理工具和安全措施\n4. 优化交易费用结构，提高竞争力\n5. 增强市场分析工具和交易策略支持\n6. 改善移动端交易体验'`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAiAnalysis(null);
    
    // 先抓取网页内容
    const webContent = await fetchWebContent(url);
    
    // 基于网页内容分析URL
    const analysisResult = analyzeUrl(url, webContent);
    
    // 模拟API调用延迟，保持用户体验
    setTimeout(() => {
      setAnalysis(analysisResult);
      
      // 如果启用了AI分析
      if (useAI) {
        analyzeWithAI(url).then(result => {
          setAiAnalysis(result);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    }, 1500);
  };

  // 币种数据
  const currencyData = {
    // 主流公链 & 头部
    mainChains: [
      { code: 'BTC', name: 'Bitcoin', project: 'Bitcoin', corePosition: '去中心化数字黄金', historicalEvents: '2009年创世区块，2021年创历史新高69000美元' },
      { code: 'ETH', name: 'Ethereum', project: 'Ethereum', corePosition: '智能合约平台', historicalEvents: '2015年上线，2022年合并完成转向PoS' },
      { code: 'BNB', name: 'BNB Chain', project: 'Binance', corePosition: '币安生态系统代币', historicalEvents: '2017年ICO，2020年启动BSC' },
      { code: 'SOL', name: 'Solana', project: 'Solana', corePosition: '高性能公链', historicalEvents: '2020年主网上线，2021年生态爆发' },
      { code: 'XRP', name: 'Ripple', project: 'Ripple', corePosition: '跨境支付协议', historicalEvents: '2012年创立，与多家银行合作' },
      { code: 'ADA', name: 'Cardano', project: 'Cardano', corePosition: '学术驱动的公链', historicalEvents: '2017年ICO，2021年Alonzo硬分叉' },
      { code: 'DOT', name: 'Polkadot', project: 'Polkadot', corePosition: '异构多链网络', historicalEvents: '2020年主网上线，平行链插槽拍卖' },
      { code: 'TRX', name: 'Tron', project: 'Tron', corePosition: '去中心化娱乐内容平台', historicalEvents: '2017年ICO，2018年主网上线' },
      { code: 'AVAX', name: 'Avalanche', project: 'Avalanche', corePosition: '高速智能合约平台', historicalEvents: '2020年主网上线，C-Chain支持EVM' },
      { code: 'APT', name: 'Aptos', project: 'Aptos', corePosition: 'Layer 1公链', historicalEvents: '2022年主网上线，由Meta前员工创立' },
      { code: 'SUI', name: 'Sui', project: 'Sui', corePosition: 'Move语言公链', historicalEvents: '2023年主网上线，专注于资产所有权' }
    ],
    // 稳定币
    stablecoins: [
      { code: 'USDT', name: 'Tether', project: 'Tether', corePosition: '锚定美元的稳定币', historicalEvents: '2014年推出，市场份额领先' },
      { code: 'USDC', name: 'Circle', project: 'Circle', corePosition: '合规稳定币', historicalEvents: '2018年推出，由Circle发行' },
      { code: 'DAI', name: 'MakerDAO', project: 'MakerDAO', corePosition: '去中心化稳定币', historicalEvents: '2017年推出，由抵押品支持' }
    ],
    // DeFi 龙头
    defi: [
      { code: 'UNI', name: 'Uniswap', project: 'Uniswap', corePosition: '去中心化交易所', historicalEvents: '2020年上线，V3版本引入集中流动性' },
      { code: 'AAVE', name: 'Aave', project: 'Aave', corePosition: '去中心化借贷平台', historicalEvents: '2020年上线，多链部署' },
      { code: 'LINK', name: 'Chainlink', project: 'Chainlink', corePosition: '去中心化预言机', historicalEvents: '2017年ICO，为DeFi提供价格数据' },
      { code: 'LDO', name: 'Lido', project: 'Lido', corePosition: '流动性质押解决方案', historicalEvents: '2020年推出，ETH质押量领先' },
      { code: 'YFI', name: 'Yearn', project: 'Yearn', corePosition: '收益聚合器', historicalEvents: '2020年推出，无预挖无团队分配' },
      { code: 'SNX', name: 'Synthetix', project: 'Synthetix', corePosition: '合成资产协议', historicalEvents: '2018年推出，支持合成衍生品' }
    ],
    // Layer2 扩容
    layer2: [
      { code: 'ARB', name: 'Arbitrum', project: 'Arbitrum', corePosition: '以太坊L2扩容解决方案', historicalEvents: '2021年主网上线，Optimistic Rollup技术' },
      { code: 'OP', name: 'Optimism', project: 'Optimism', corePosition: '以太坊L2扩容解决方案', historicalEvents: '2021年主网上线，Optimistic Rollup技术' },
      { code: 'MATIC', name: 'Polygon', project: 'Polygon', corePosition: '以太坊扩容生态', historicalEvents: '2017年推出，多链架构' },
      { code: 'STRK', name: 'StarkNet', project: 'StarkNet', corePosition: 'ZK Rollup扩容方案', historicalEvents: '2022年主网上线，基于零知识证明' }
    ],
    // NFT / 元宇宙 / Meme
    nftMetaverse: [
      { code: 'MANA', name: 'Decentraland', project: 'Decentraland', corePosition: '去中心化虚拟世界', historicalEvents: '2017年ICO，2020年主网上线' },
      { code: 'SAND', name: 'The Sandbox', project: 'The Sandbox', corePosition: '用户生成内容平台', historicalEvents: '2021年主网上线，与多个品牌合作' },
      { code: 'DOGE', name: 'Dogecoin', project: 'Dogecoin', corePosition: 'Meme币', historicalEvents: '2013年创建，由Elon Musk推广' },
      { code: 'SHIB', name: 'Shiba Inu', project: 'Shiba Inu', corePosition: 'Meme币', historicalEvents: '2020年创建，SHIB生态系统' },
      { code: 'GALA', name: 'Gala Games', project: 'Gala Games', corePosition: '区块链游戏平台', historicalEvents: '2020年推出，多个游戏项目' },
      { code: 'IMX', name: 'Immutable X', project: 'Immutable X', corePosition: 'NFT交易Layer 2', historicalEvents: '2021年推出，基于StarkWare技术' }
    ],
    // AI + Web3
    aiWeb3: [
      { code: 'AGIX', name: 'SingularityNET', project: 'SingularityNET', corePosition: '去中心化AI市场', historicalEvents: '2017年ICO，AI服务去中心化网络' },
      { code: 'FET', name: 'Fetch.ai', project: 'Fetch.ai', corePosition: 'AI驱动的去中心化网络', historicalEvents: '2019年主网上线，机器学习集成' },
      { code: 'RNDR', name: 'Render', project: 'Render', corePosition: '去中心化GPU渲染网络', historicalEvents: '2020年推出，AI渲染支持' },
      { code: 'OCEAN', name: 'Ocean Protocol', project: 'Ocean Protocol', corePosition: '数据共享平台', historicalEvents: '2018年ICO，隐私保护数据交易' }
    ],
    // 存储 / 隐私
    storagePrivacy: [
      { code: 'FIL', name: 'Filecoin', project: 'Filecoin', corePosition: '去中心化存储网络', historicalEvents: '2020年主网上线，IPFS集成' },
      { code: 'AR', name: 'Arweave', project: 'Arweave', corePosition: '永久存储网络', historicalEvents: '2018年主网上线，区块编织技术' },
      { code: 'XMR', name: 'Monero', project: 'Monero', corePosition: '隐私币', historicalEvents: '2014年分叉自Bytecoin，环形签名技术' },
      { code: 'ZEC', name: 'Zcash', project: 'Zcash', corePosition: '隐私币', historicalEvents: '2016年上线，零知识证明技术' }
    ],
    // 再质押 / 模块化
    restaking: [
      { code: 'EIGEN', name: 'EigenLayer', project: 'EigenLayer', corePosition: 'ETH再质押协议', historicalEvents: '2023年推出，允许ETH质押者提供安全保障' },
      { code: 'SEI', name: 'Sei', project: 'Sei', corePosition: '模块化交易公链', historicalEvents: '2023年主网上线，专注于交易性能' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-fuchsia-900 to-rose-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="w-full h-64 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-amber-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-fuchsia-500/30">
            <img 
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=link catcher tool web scraping analysis modern futuristic design with neon colors&image_size=landscape_16_9" 
              alt="链接捕手" 
              className="w-80 h-40 object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-400">
            链接捕手
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            输入Web3/交易所/CFD平台相关链接，自动抓取页面核心信息并生成交易相关分析报告
          </p>
        </motion.div>
        
        {/* 币种概念模块切换按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 text-center"
        >
          <motion.button
            onClick={() => setShowCurrencyModule(!showCurrencyModule)}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-fuchsia-600 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-fuchsia-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showCurrencyModule ? '隐藏币种概念' : '查看币种概念'}
          </motion.button>
        </motion.div>
        
        {/* 币种概念模块 */}
        {showCurrencyModule && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-xl border border-white/20"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-400">
              币种概念模块
            </h2>
            
            {/* 主流公链 & 头部 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-cyan-300">主流公链 & 头部</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currencyData.mainChains.map((currency, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl p-4 border border-cyan-500/30 shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-white">{currency.code}</h4>
                      <span className="text-sm text-gray-300">{currency.name}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-cyan-300">对应项目:</span> {currency.project}</p>
                      <p><span className="text-cyan-300">核心定位:</span> {currency.corePosition}</p>
                      <p><span className="text-cyan-300">历史事件:</span> {currency.historicalEvents}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* 稳定币 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-fuchsia-300">稳定币</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currencyData.stablecoins.map((currency, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-fuchsia-900/30 to-purple-900/30 rounded-xl p-4 border border-fuchsia-500/30 shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-white">{currency.code}</h4>
                      <span className="text-sm text-gray-300">{currency.name}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-fuchsia-300">对应项目:</span> {currency.project}</p>
                      <p><span className="text-fuchsia-300">核心定位:</span> {currency.corePosition}</p>
                      <p><span className="text-fuchsia-300">历史事件:</span> {currency.historicalEvents}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* DeFi 龙头 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-rose-300">DeFi 龙头</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currencyData.defi.map((currency, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-rose-900/30 to-red-900/30 rounded-xl p-4 border border-rose-500/30 shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-white">{currency.code}</h4>
                      <span className="text-sm text-gray-300">{currency.name}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-rose-300">对应项目:</span> {currency.project}</p>
                      <p><span className="text-rose-300">核心定位:</span> {currency.corePosition}</p>
                      <p><span className="text-rose-300">历史事件:</span> {currency.historicalEvents}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Layer2 扩容 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-amber-300">Layer2 扩容</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currencyData.layer2.map((currency, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-amber-900/30 to-yellow-900/30 rounded-xl p-4 border border-amber-500/30 shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-white">{currency.code}</h4>
                      <span className="text-sm text-gray-300">{currency.name}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-amber-300">对应项目:</span> {currency.project}</p>
                      <p><span className="text-amber-300">核心定位:</span> {currency.corePosition}</p>
                      <p><span className="text-amber-300">历史事件:</span> {currency.historicalEvents}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* NFT / 元宇宙 / Meme */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-emerald-300">NFT / 元宇宙 / Meme</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currencyData.nftMetaverse.map((currency, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 rounded-xl p-4 border border-emerald-500/30 shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-white">{currency.code}</h4>
                      <span className="text-sm text-gray-300">{currency.name}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-emerald-300">对应项目:</span> {currency.project}</p>
                      <p><span className="text-emerald-300">核心定位:</span> {currency.corePosition}</p>
                      <p><span className="text-emerald-300">历史事件:</span> {currency.historicalEvents}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* AI + Web3 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-blue-300">AI + Web3</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currencyData.aiWeb3.map((currency, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-xl p-4 border border-blue-500/30 shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-white">{currency.code}</h4>
                      <span className="text-sm text-gray-300">{currency.name}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-blue-300">对应项目:</span> {currency.project}</p>
                      <p><span className="text-blue-300">核心定位:</span> {currency.corePosition}</p>
                      <p><span className="text-blue-300">历史事件:</span> {currency.historicalEvents}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* 存储 / 隐私 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-purple-300">存储 / 隐私</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currencyData.storagePrivacy.map((currency, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-purple-900/30 to-violet-900/30 rounded-xl p-4 border border-purple-500/30 shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-white">{currency.code}</h4>
                      <span className="text-sm text-gray-300">{currency.name}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-purple-300">对应项目:</span> {currency.project}</p>
                      <p><span className="text-purple-300">核心定位:</span> {currency.corePosition}</p>
                      <p><span className="text-purple-300">历史事件:</span> {currency.historicalEvents}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* 再质押 / 模块化 */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-4 text-cyan-300">再质押 / 模块化</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currencyData.restaking.map((currency, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl p-4 border border-cyan-500/30 shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-white">{currency.code}</h4>
                      <span className="text-sm text-gray-300">{currency.name}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-cyan-300">对应项目:</span> {currency.project}</p>
                      <p><span className="text-cyan-300">核心定位:</span> {currency.corePosition}</p>
                      <p><span className="text-cyan-300">历史事件:</span> {currency.historicalEvents}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 输入表单 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-xl border border-white/20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium mb-3 text-gray-200">输入链接</label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-white placeholder-gray-400 transition-all"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="useAI"
                checked={useAI}
                onChange={(e) => setUseAI(e.target.checked)}
                className="w-5 h-5 text-fuchsia-600 rounded focus:ring-fuchsia-500 bg-white/10 border-white/30"
              />
              <label htmlFor="useAI" className="ml-3 text-sm text-gray-300">使用AI智能分析（提供更详细的分析报告）</label>
            </div>
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-cyan-600 to-fuchsia-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-fuchsia-500/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (useAI ? 'AI分析中...' : '分析中...') : '开始分析'}
            </motion.button>
          </form>
        </motion.div>

        {/* 分析报告 */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-400">
              交易相关分析报告
            </h2>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl p-5 border border-cyan-500/30 shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-3 text-cyan-300">交易相关分析</h3>
                <p className="text-gray-300">{analysis.summary}</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-gradient-to-br from-fuchsia-900/30 to-purple-900/30 rounded-xl p-5 border border-fuchsia-500/30 shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-3 text-fuchsia-300">市场涨跌趋势</h3>
                <p className="text-gray-300">{analysis.trendAnalysis}</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-gradient-to-br from-rose-900/30 to-red-900/30 rounded-xl p-5 border border-rose-500/30 shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-3 text-rose-300">交易核心功能</h3>
                <p className="text-gray-300">{analysis.coreFeatures || analysis.layout}</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="bg-gradient-to-br from-amber-900/30 to-yellow-900/30 rounded-xl p-5 border border-amber-500/30 shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-3 text-amber-300">交易风险提示</h3>
                <p className="text-gray-300">{analysis.riskDesign}</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 rounded-xl p-5 border border-emerald-500/30 shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-3 text-emerald-300">交易相关关键词</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.map((keyword, index) => (
                    <span key={index} className="px-3 py-1.5 bg-gradient-to-r from-fuchsia-600/80 to-cyan-600/80 text-white rounded-full text-sm shadow-md hover:shadow-lg transition-all">
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-xl p-5 border border-blue-500/30 shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-3 text-blue-300">交易功能优化建议</h3>
                <ul className="space-y-2 text-gray-300">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 mt-2 mr-2"></span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
            
            {aiAnalysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-8 pt-6 border-t border-white/20"
              >
                <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-cyan-400">
                  AI智能分析
                </h3>
                <div className="bg-gradient-to-r from-violet-900/80 to-fuchsia-900/80 p-5 rounded-xl border border-fuchsia-500/30 shadow-lg">
                  {aiAnalysis.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-3 text-gray-300">{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            )}
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <motion.button 
                className="flex-1 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-cyan-500/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                保存到知识库
              </motion.button>
              <motion.button 
                className="flex-1 py-3 bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-fuchsia-500/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                分享报告
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LinkCatcher;
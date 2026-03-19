import { motion } from 'framer-motion';
import { Book, Link, Diamond, Phone } from '@icon-park/react';

const Home = () => {
  const features = [
    {
      title: '结构化知识库',
      description: '4大核心板块，从基础关键词到设计落地要点，系统掌握Web3与金融交易知识',
      icon: <Book size={24} />,
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20line%20art%20knowledge%20base%20pinterest%20style%20clean%20modern%20design&image_size=square'
    },
    {
      title: '链接捕手',
      description: '自动抓取Web3/交易所/CFD平台页面核心信息，生成设计师分析报告',
      icon: <Link size={24} />,
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20line%20art%20link%20catcher%20network%20connections%20pinterest%20style&image_size=square'
    },
    {
      title: '开源宝藏',
      description: '推荐可直接复用的开源开发库和设计组件，加速设计落地',
      icon: <Diamond size={24} />,
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20line%20art%20open%20source%20treasure%20diamonds%20pinterest%20style&image_size=square'
    },
    {
      title: '实战案例库',
      description: '30+Web3钱包、交易所、CFD平台设计案例，按设计亮点分类',
      icon: <Phone size={24} />,
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20line%20art%20case%20studies%20mobile%20devices%20pinterest%20style&image_size=square'
    }
  ];

  const knowledgeSections = [
    {
      title: 'Web3',
      description: '区块链、智能合约、钱包、NFT、DeFi等核心概念',
      path: '/web3',
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20line%20art%20web3%20blockchain%20pinterest%20style%20modern%20clean&image_size=square'
    },
    {
      title: '虚拟货币',
      description: 'BTC/ETH/稳定币、Token、市值、挖矿等知识',
      path: '/crypto',
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20line%20art%20cryptocurrency%20bitcoin%20pinterest%20style%20modern%20clean&image_size=square'
    },
    {
      title: 'CFD交易',
      description: '差价合约、杠杆、止盈止损、爆仓等交易知识',
      path: '/cfd',
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20line%20art%20cfd%20trading%20charts%20pinterest%20style%20modern%20clean&image_size=square'
    },
    {
      title: '交易所',
      description: 'CEX/DEX、现货/合约交易、K线、订单簿等知识',
      path: '/exchange',
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20line%20art%20exchange%20trading%20interface%20pinterest%20style%20modern%20clean&image_size=square'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <img 
            src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimalist%20line%20art%20web3%20design%20school%20pinterest%20style%20modern%20clean%20creative&image_size=landscape_16_9" 
            alt="Web3 设计学院" 
            className="mx-auto w-full max-w-md rounded-xl shadow-md"
          />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-[#37352f]">
          Web3 & 金融交易设计师学习平台
        </h1>
        <p className="text-base text-[#6b6964] max-w-2xl mx-auto mb-8 px-4">
          用设计师视角系统拆解Web3与金融交易知识，让设计落地更直观、高效、有惊喜感
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 px-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="w-full sm:w-auto px-6 py-3 bg-[#37352f] text-white rounded-lg font-medium text-center"
          >
            开始学习
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="w-full sm:w-auto px-6 py-3 border border-[#e9e9e7] rounded-lg font-medium text-[#37352f] text-center"
          >
            浏览案例
          </motion.button>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-12">
        <motion.h2 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-semibold text-center mb-8 text-[#37352f]"
        >
          核心功能
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            // 在移动端隐藏"链接捕手"、"开源宝藏"和"实战案例"
            const isMobileHidden = ['链接捕手', '开源宝藏', '实战案例库'].includes(feature.title);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
                className={`bg-white p-5 rounded-xl shadow-sm border border-[#e9e9e7] transition-all duration-300 ${isMobileHidden ? 'hidden md:block' : ''}`}
              >
                <div className="w-full h-28 bg-[#f7f6f3] rounded-lg flex items-center justify-center mb-4">
                  <img 
                    src={feature.illustration} 
                    alt={feature.title} 
                    className="w-20 h-20 object-contain"
                    style={{ filter: 'drop-shadow(0 0 0 1px black)' }}
                  />
                </div>
                <div className="text-2xl mb-3 text-[#37352f]">{feature.icon}</div>
                <h3 className="text-base font-medium mb-2 text-[#37352f]">{feature.title}</h3>
                <p className="text-xs text-[#6b6964]">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Knowledge Sections */}
      <section className="py-12">
        <motion.h2 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-semibold text-center mb-8 text-[#37352f]"
        >
          知识板块
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {knowledgeSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
              className="bg-white p-5 rounded-xl shadow-sm border border-[#e9e9e7] transition-all duration-300"
            >
              <div className="w-full h-28 bg-[#f7f6f3] rounded-lg flex items-center justify-center mb-4">
                <img 
                  src={section.illustration} 
                  alt={section.title} 
                  className="w-20 h-20 object-contain"
                  style={{ filter: 'drop-shadow(0 0 0 1px black)' }}
                />
              </div>
              <h3 className="text-base font-medium mb-2 text-[#37352f]">{section.title}</h3>
              <p className="text-xs text-[#6b6964] mb-3">{section.description}</p>
              <motion.a 
                href={section.path} 
                className="text-[#37352f] font-medium flex items-center text-sm"
                whileHover={{ x: 4 }}
              >
                开始学习
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-[#f7f6f3] rounded-xl p-8 text-center mb-16"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#37352f]">1小时建立完整知识框架</h2>
          <p className="text-sm text-[#6b6964] mb-6 max-w-xl mx-auto">
            消除Web3与金融交易的设计门槛，让设计过程像使用Apple产品一样直观、高效
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="w-full md:w-auto px-6 py-3 bg-[#37352f] text-white rounded-lg font-medium"
          >
            立即开始
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
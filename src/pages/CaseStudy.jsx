import { useState } from 'react';
import { motion } from 'framer-motion';

const CaseStudy = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const cases = [
    {
      title: 'Web3钱包风险提示设计',
      category: 'wallet',
      description: '通过色彩、动效和文案三重强调，构建清晰的风险提示层级',
      highlight: '风险提示层级设计',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Web3 wallet risk warning design minimalist line art pinterest style&image_size=square_hd'
    },
    {
      title: '交易所K线可视化',
      category: 'exchange',
      description: '简洁清晰的K线图设计，避免信息过载，支持多时间周期切换',
      highlight: 'K线可视化',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cryptocurrency exchange K-line chart visualization minimalist line art pinterest style&image_size=square_hd'
    },
    {
      title: 'CFD杠杆选择器',
      category: 'cfd',
      description: '滑动条+数字输入框双交互，用色彩区分风险等级',
      highlight: '杠杆选择器交互',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=CFD trading leverage selector minimalist line art pinterest style&image_size=square_hd'
    },
    {
      title: '交易所移动端交易页面',
      category: 'exchange',
      description: 'Notion风格模块化布局，核心按钮单手可及',
      highlight: '移动端适配',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cryptocurrency exchange mobile trading page minimalist line art pinterest style&image_size=portrait_16_9'
    },
    {
      title: 'Web3钱包助记词备份页',
      category: 'wallet',
      description: '禁止截图，引导物理抄写，12个卡片分两行展示',
      highlight: '助记词备份设计',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Web3 wallet seed phrase backup page minimalist line art pinterest style&image_size=square_hd'
    },
    {
      title: 'CFD爆仓预警UI',
      category: 'cfd',
      description: '红色呼吸灯动效+弹窗提示，当保证金率低于预警阈值时触发',
      highlight: '爆仓预警设计',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=CFD trading margin call warning UI minimalist line art pinterest style&image_size=square_hd'
    }
  ];

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'wallet', name: '钱包' },
    { id: 'exchange', name: '交易所' },
    { id: 'cfd', name: 'CFD' }
  ];

  const filteredCases = activeCategory === 'all' ? cases : cases.filter(c => c.category === activeCategory);

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-semibold mb-4 text-[#37352f]">实战案例库</h1>
        <p className="text-[#6b6964]">
          收集Web3钱包、交易所、CFD平台的设计案例，按设计亮点分类
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-md font-medium transition-all ${activeCategory === category.id ? 'bg-[#37352f] text-white' : 'bg-[#f7f6f3] hover:bg-[#e9e9e7]'}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Case Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((caseStudy, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
            className="bg-white rounded-md border border-[#e9e9e7] overflow-hidden"
          >
            <div className="h-48 bg-[#f7f6f3] flex items-center justify-center">
              <img 
                src={caseStudy.image} 
                alt={caseStudy.title} 
                className="w-32 h-32 object-contain"
                style={{ filter: 'drop-shadow(0 0 0 1px black)' }}
              />
            </div>
            <div className="p-4">
              <span className="px-2.5 py-1 bg-[#f7f6f3] text-[#37352f] rounded-md text-sm font-medium mb-3 inline-block">
                {caseStudy.highlight}
              </span>
              <h3 className="text-lg font-medium mb-2 text-[#37352f]">{caseStudy.title}</h3>
              <p className="text-sm text-[#6b6964] mb-3">{caseStudy.description}</p>
              <button className="text-[#37352f] font-medium flex items-center text-sm">
                查看详情
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudy;
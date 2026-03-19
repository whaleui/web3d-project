import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Exchange = () => {
  const [activeTab, setActiveTab] = useState('keywords');
  const [expandedKeywords, setExpandedKeywords] = useState([]);
  const [imageColors, setImageColors] = useState({});

  // 初始化所有关键词为展开状态
  useEffect(() => {
    setExpandedKeywords(Array(20).fill(true));
  }, []);

  // 加载图片时获取主色调
  const loadImageColor = (imageUrl, key) => {
    getImageDominantColor(imageUrl).then(color => {
      setImageColors(prev => ({
        ...prev,
        [key]: color
      }));
    });
  };

  const toggleKeyword = (index) => {
    setExpandedKeywords(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  // 为每个关键词生成插画URL
  const getIllustrationUrl = (term, index) => {
    const prompts = [
      'CEX centralized exchange traditional trading minimalist line art pinterest style',
      'DEX decentralized exchange non-custodial trading minimalist line art pinterest style',
      'trading types spot futures crypto fiat OTC minimalist line art pinterest style',
      'limit order market order matching mechanism minimalist line art pinterest style',
      'order book market depth minimalist line art pinterest style',
      'depth chart market liquidity minimalist line art pinterest style',
      'candlestick chart price trend minimalist line art pinterest style',
      'trading volume market activity minimalist line art pinterest style',
      'identity verification KYC minimalist line art pinterest style',
      'crypto exchange security measures minimalist line art pinterest style',
      'exchange wallet custody solutions minimalist line art pinterest style',
      'crypto exchange fees structure minimalist line art pinterest style',
      'exchange mobile app interface minimalist line art pinterest style',
      'exchange API trading minimalist line art pinterest style',
      'exchange market making minimalist line art pinterest style',
      'exchange liquidity pools minimalist line art pinterest style',
      'exchange token listing process minimalist line art pinterest style',
      'exchange regulatory compliance minimalist line art pinterest style',
      'exchange customer support minimalist line art pinterest style',
      'exchange referral program minimalist line art pinterest style'
    ];
    return `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompts[index])}&image_size=square`;
  };

  // 分析图片主色调的函数
  const getImageDominantColor = (imageUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 100;
        ctx.drawImage(img, 0, 0, 100, 100);
        
        const imageData = ctx.getImageData(0, 0, 100, 100);
        const data = imageData.data;
        const colorCount = {};
        
        // 遍历所有像素，统计颜色出现次数
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          
          // 忽略透明度为0的像素
          if (a > 128) {
            // 将颜色量化为16级，减少计算量
            const key = `${Math.floor(r / 16)}-${Math.floor(g / 16)}-${Math.floor(b / 16)}`;
            colorCount[key] = (colorCount[key] || 0) + 1;
          }
        }
        
        // 找出出现次数最多的颜色
        let maxCount = 0;
        let dominantColor = [247, 246, 243]; // 默认灰色
        
        for (const [key, count] of Object.entries(colorCount)) {
          if (count > maxCount) {
            maxCount = count;
            const [r, g, b] = key.split('-').map(c => parseInt(c) * 16);
            dominantColor = [r, g, b];
          }
        }
        
        // 将RGB转换为十六进制
        const toHex = (c) => {
          const hex = c.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        };
        
        const hexColor = `#${toHex(dominantColor[0])}${toHex(dominantColor[1])}${toHex(dominantColor[2])}`;
        resolve(hexColor);
      };
      img.onerror = () => {
        resolve('#f7f6f3'); // 出错时使用默认灰色
      };
      img.src = imageUrl;
    });
  };

  const keywords = [
    {
      term: 'CEX中心化交易所',
      designerView: '传统交易所模式，设计上需突出安全和便捷',
      description: 'CEX是由中心化机构运营的交易所，用户将资产托管给交易所，交易速度快，流动性高。2024年1月现货BTC ETF的推出标志着市场逐渐成熟，交易所业务也随之增长。'
    },
    {
      term: 'DEX去中心化交易所',
      designerView: '非托管交易模式，设计上需突出用户控制和透明',
      description: 'DEX是基于智能合约的去中心化交易所，用户保持对资产的控制权，交易通过自动做市商机制完成。2024年10月数据显示，过去24小时去中心化交易所的交易量约58.27亿美元。'
    },
    {
      term: '现货/合约/币币/法币/OTC交易',
      designerView: '不同交易类型，设计上需清晰区分',
      description: '现货交易是直接买卖加密货币，合约交易是基于未来价格的衍生品，币币交易是用一种加密货币兑换另一种，法币交易是用法定货币购买加密货币，OTC是场外交易。'
    },
    {
      term: '挂单/吃单',
      designerView: '订单匹配机制，设计上需清晰展示订单簿',
      description: '挂单是用户设置价格和数量的订单，吃单是用户以当前价格立即成交的订单。'
    },
    {
      term: '盘口/订单簿',
      designerView: '市场深度的直观展示，设计上需清晰易读',
      description: '盘口是买卖订单的实时报价，订单簿是所有未成交订单的列表。'
    },
    {
      term: '深度图',
      designerView: '市场流动性的可视化，设计上需简洁明了',
      description: '深度图是展示买卖订单分布的图表，帮助用户了解市场深度。'
    },
    {
      term: 'K线',
      designerView: '价格走势的核心图表，设计上需专业且易于理解',
      description: 'K线图是展示资产价格走势的图表，包含开盘价、收盘价、最高价、最低价等信息。'
    },
    {
      term: '成交量',
      designerView: '市场活跃度的指标，设计上需与价格联动展示',
      description: '成交量是一定时间内的交易总量，反映市场活跃度。'
    },
    {
      term: '实名认证',
      designerView: '合规要求，设计上需简化流程并保证安全',
      description: '实名认证是交易所为了合规要求而进行的用户身份验证过程。'
    },
    {
      term: '交易所安全',
      designerView: '保护用户资产的措施，设计上需突出安全保障',
      description: '交易所安全包括冷钱包存储、多重签名、风控系统、DDoS防护等措施，保护用户资产和交易安全。'
    },
    {
      term: '钱包托管',
      designerView: '资产存储解决方案，设计上需突出安全性和便捷性',
      description: '钱包托管是交易所为用户提供的资产存储服务，分为热钱包和冷钱包，冷钱包用于存储大部分资产，热钱包用于日常交易。'
    },
    {
      term: '交易费用',
      designerView: '交易所的收费结构，设计上需透明展示',
      description: '交易费用是交易所收取的交易手续费，通常分为 maker 费用和 taker 费用，不同交易所的收费标准不同。'
    },
    {
      term: '移动应用',
      designerView: '交易所的移动端界面，设计上需优化移动体验',
      description: '交易所移动应用是用户在手机上进行交易的工具，需要提供便捷的交易功能、实时行情和安全的登录方式。'
    },
    {
      term: 'API交易',
      designerView: '程序化交易接口，设计上需提供完整的文档',
      description: 'API交易是交易所提供的程序化交易接口，允许开发者和机构通过代码进行自动化交易，提高交易效率。'
    },
    {
      term: '做市商',
      designerView: '提供流动性的角色，设计上需展示流动性贡献',
      description: '做市商是为市场提供流动性的参与者，通过同时挂买单和卖单来促进交易，获得买卖价差作为收益。'
    },
    {
      term: '流动性池',
      designerView: 'DEX的流动性来源，设计上需展示池内资产',
      description: '流动性池是DEX中存储资产的智能合约，用户可以向池内添加资产提供流动性，获得交易手续费作为奖励。'
    },
    {
      term: '代币上线',
      designerView: '新代币在交易所的上市流程，设计上需展示申请步骤',
      description: '代币上线是新代币在交易所的上市过程，通常需要经过申请、审核、投票等步骤，满足交易所的上线要求。'
    },
    {
      term: '监管合规',
      designerView: '交易所的合规要求，设计上需突出合规性',
      description: '监管合规是交易所遵守各国监管要求的过程，包括KYC/AML、反洗钱、用户资金保护等措施。'
    },
    {
      term: '客户支持',
      designerView: '交易所的客户服务，设计上需提供多种支持渠道',
      description: '客户支持是交易所为用户提供的服务，包括在线客服、工单系统、帮助中心等，解决用户在交易过程中遇到的问题。'
    },
    {
      term: '推荐计划',
      designerView: '用户推荐奖励机制，设计上需清晰展示奖励规则',
      description: '推荐计划是交易所为吸引新用户而推出的奖励机制，老用户推荐新用户注册并交易后，可以获得一定的奖励。'
    }
  ];

  const advancedKnowledge = [
    {
      title: '交易所完整用户链路',
      content: '注册→实名认证→充值→交易→提现→安全设置。设计师需优化每个环节的用户体验，减少摩擦。',
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=exchange user journey register verify deposit trade withdraw minimalist line art pinterest style&image_size=landscape_4_3'
    },
    {
      title: '订单类型',
      content: '限价单、市价单、止损单、止盈单等。设计师需清晰展示每种订单类型的功能和使用场景。',
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=order types limit market stop loss take profit minimalist line art pinterest style&image_size=landscape_4_3'
    },
    {
      title: 'K线基础指标',
      content: 'MA（移动平均线）、MACD、KDJ等技术指标。设计师需提供简洁的指标选择和展示界面。',
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=K线 technical indicators moving average MACD minimalist line art pinterest style&image_size=landscape_4_3'
    },
    {
      title: '盘口数据解读',
      content: '盘口数据反映市场买卖力量对比，设计师需通过颜色和布局突出关键信息。',
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=order book data analysis buy sell pressure minimalist line art pinterest style&image_size=landscape_4_3'
    }
  ];

  const businessProcesses = [
    {
      title: '交易所注册流程',
      steps: [
        '访问交易所网站',
        '点击注册',
        '输入邮箱/手机号',
        '设置密码',
        '验证邮箱/手机号',
        '完成注册'
      ],
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=exchange registration process email phone verification minimalist line art pinterest style&image_size=landscape_4_3'
    },
    {
      title: '交易所实名认证流程',
      steps: [
        '登录账户',
        '进入个人中心',
        '点击实名认证',
        '选择认证等级',
        '上传身份证照片',
        '完成人脸识别',
        '等待审核',
        '认证成功'
      ],
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=exchange KYC process identity verification face recognition minimalist line art pinterest style&image_size=landscape_4_3'
    },
    {
      title: '交易所交易流程',
      steps: [
        '登录账户',
        '充值资产',
        '进入交易页面',
        '选择交易对',
        '选择订单类型',
        '输入价格和数量',
        '确认交易',
        '查看成交记录'
      ],
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=exchange trading process select pair input price minimalist line art pinterest style&image_size=landscape_4_3'
    }
  ];

  const designTips = [
    '交易所5大核心页面设计规范：首页（市场概览）、行情（K线和深度图）、交易（订单输入和成交）、资产（余额和转账）、个人（设置和历史）',
    'K线/深度图可视化：简洁清晰，避免信息过载，支持多时间周期切换',
    '高危操作二次确认：提币、修改安全设置等操作需添加二次验证',
    '合规提示布局：不干扰但需醒目，符合各地区监管要求',
    '移动端适配规则：交易页面核心按钮单手可及，关键数据优先展示'
  ];

  return (
    <div className="space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-semibold mb-4 text-[#37352f]">虚拟货币交易所 全知识</h1>
        <p className="text-[#6b6964]">
          从基础概念到设计落地，系统掌握交易所核心知识
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {
          [
            { id: 'keywords', label: '基础关键词' },
            { id: 'advanced', label: '进阶知识' },
            { id: 'processes', label: '业务流程' },
            { id: 'design', label: '设计注意点' }
          ].map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md font-medium transition-all ${activeTab === tab.id ? 'bg-[#37352f] text-white' : 'bg-[#f7f6f3] hover:bg-[#e9e9e7]'}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
            </motion.button>
          ))
        }
      </motion.div>

      {/* Tab Content */}
      <div>
        {/* 基础关键词 */}
        {activeTab === 'keywords' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keywords.map((keyword, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                className="bg-white p-4 rounded-md border border-[#e9e9e7]"
              >
                {/* 插画 */}
                <div className="w-full h-40 md:h-32 rounded-md flex items-center justify-center mb-4" style={{ backgroundColor: imageColors[`keyword-${index}`] || '#f7f6f3' }}>
                  <img 
                    src={getIllustrationUrl(keyword.term, index)} 
                    alt={keyword.term} 
                    className="w-full h-full object-contain"
                    style={{ filter: 'drop-shadow(0 0 0 1px black)' }}
                    onLoad={() => loadImageColor(getIllustrationUrl(keyword.term, index), `keyword-${index}`)}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                
                <h3 className="text-lg font-medium mb-2 text-[#37352f]">{keyword.term}</h3>
                <p className="text-[#37352f] text-sm mb-4">{keyword.designerView}</p>
                
                <button
                  onClick={() => toggleKeyword(index)}
                  className="text-sm text-[#6b6964] flex items-center"
                >
                  {expandedKeywords[index] ? '收起' : '查看详情'}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ml-2 transition-transform ${expandedKeywords[index] ? 'rotate-180' : ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                
                {expandedKeywords[index] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-[#e9e9e7]"
                  >
                    <p className="text-sm text-[#6b6964]">{keyword.description}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* 进阶知识 */}
        {activeTab === 'advanced' && (
          <div className="space-y-6">
            {advancedKnowledge.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-4 rounded-md border border-[#e9e9e7]"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="w-full h-48 rounded-md flex items-center justify-center" style={{ backgroundColor: imageColors[`advanced-${index}`] || '#f7f6f3' }}>
                      <img 
                        src={item.illustration} 
                        alt={item.title} 
                        className="w-full h-full object-contain"
                        style={{ filter: 'drop-shadow(0 0 0 1px black)' }}
                        onLoad={() => loadImageColor(item.illustration, `advanced-${index}`)}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-lg font-medium mb-3 text-[#37352f]">{item.title}</h3>
                    <p className="text-sm text-[#6b6964]">{item.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* 业务流程 */}
        {activeTab === 'processes' && (
          <div className="space-y-6">
            {businessProcesses.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-4 rounded-md border border-[#e9e9e7]"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="w-full h-48 rounded-md flex items-center justify-center" style={{ backgroundColor: imageColors[`process-${index}`] || '#f7f6f3' }}>
                      <img 
                        src={process.illustration} 
                        alt={process.title} 
                        className="w-full h-full object-contain"
                        style={{ filter: 'drop-shadow(0 0 0 1px black)' }}
                        onLoad={() => loadImageColor(process.illustration, `process-${index}`)}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-lg font-medium mb-4 text-[#37352f]">{process.title}</h3>
                    <div className="relative">
                      {process.steps.map((step, i) => (
                        <motion.div 
                          key={i} 
                          className="flex mb-6 last:mb-0"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-[#f7f6f3] text-[#37352f] flex items-center justify-center font-medium text-sm">
                              {i + 1}
                            </div>
                            {i < process.steps.length - 1 && (
                              <div className="w-0.5 h-full bg-[#e9e9e7] ml-4 absolute left-4 top-8"></div>
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-[#37352f]">{step}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* 设计注意点 */}
        {activeTab === 'design' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-4 rounded-md border border-[#e9e9e7]"
          >
            <h3 className="text-lg font-medium mb-4 text-[#37352f]">UI/UX设计师专属注意点</h3>
            <ul className="space-y-3">
              {designTips.map((tip, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#37352f] mr-2 flex-shrink-0 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-[#6b6964]">{tip}</span>
                </motion.li>
              ))}
            </ul>
            
            {/* 设计注意点插画 */}
            <div className="mt-6">
              <div className="w-full h-64 rounded-md flex items-center justify-center" style={{ backgroundColor: imageColors['design'] || '#f7f6f3' }}>
                <img 
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=exchange interface design K line depth chart trading page minimalist line art pinterest style&image_size=landscape_16_9" 
                  alt="设计注意点" 
                  className="w-full h-full object-contain"
                  style={{ filter: 'drop-shadow(0 0 0 1px black)' }}
                  onLoad={() => loadImageColor("https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=exchange interface design K line depth chart trading page minimalist line art pinterest style&image_size=landscape_16_9", 'design')}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Exchange;
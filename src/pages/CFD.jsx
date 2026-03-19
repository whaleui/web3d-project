import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CFD = () => {
  const [activeTab, setActiveTab] = useState('keywords');
  const [expandedKeywords, setExpandedKeywords] = useState([]);
  const [imageColors, setImageColors] = useState({});

  // 初始化所有关键词为展开状态
  useEffect(() => {
    setExpandedKeywords(Array(22).fill(true));
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
      'CFD contract for difference financial derivative minimalist line art pinterest style',
      'CFD trading price difference minimalist line art pinterest style',
      'margin trading collateral deposit minimalist line art pinterest style',
      'leverage trading risk amplification minimalist line art pinterest style',
      'spread concept trading cost minimalist line art pinterest style',
      'open close position trading operation minimalist line art pinterest style',
      'long short market direction minimalist line art pinterest style',
      'take profit stop loss risk control minimalist line art pinterest style',
      'margin call forced liquidation minimalist line art pinterest style',
      'margin rate calculation risk indicator minimalist line art pinterest style',
      'overnight interest holding cost minimalist line art pinterest style',
      'CFD trading products asset classes minimalist line art pinterest style',
      'limit order CFD trading minimalist line art pinterest style',
      'market order CFD trading minimalist line art pinterest style',
      'stop order CFD trading minimalist line art pinterest style',
      'trailing stop CFD trading minimalist line art pinterest style',
      'hedging strategy CFD trading minimalist line art pinterest style',
      'scalping strategy CFD trading minimalist line art pinterest style',
      'swing trading strategy CFD trading minimalist line art pinterest style',
      'position trading strategy CFD trading minimalist line art pinterest style',
      'CFD regulatory compliance minimalist line art pinterest style',
      'CFD trading psychology minimalist line art pinterest style'
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
      term: 'CFD',
      designerView: '差价合约，设计上需突出风险提示',
      description: 'CFD（差价合约）是一种金融衍生品，允许投资者对资产价格波动进行投机，而不需要实际持有资产。CFD交易可以涉及股票、指数、外汇、商品等多种资产类别。2024年，随着加密货币市场的成熟，CFD交易在加密货币领域的应用也在增加。'
    },
    {
      term: '差价合约',
      designerView: '基于价格差异的交易产品，设计上需清晰展示盈亏计算',
      description: '差价合约是一种交易双方约定在未来某个时间点以特定价格交换资产差价的合约。交易盈亏取决于开仓和平仓时的价格差异。'
    },
    {
      term: '保证金',
      designerView: '交易所需的抵押金，设计上需突出可用保证金和占用保证金',
      description: '保证金是投资者为开仓而存入的资金，用于覆盖潜在亏损。保证金分为初始保证金（开仓所需）和维持保证金（维持持仓所需）。'
    },
    {
      term: '杠杆',
      designerView: '放大交易规模的工具，设计上需用色彩区分风险等级',
      description: '杠杆允许投资者用少量资金控制更大价值的交易，放大潜在收益和风险。常见杠杆倍数有1:10、1:50、1:100等。'
    },
    {
      term: '点差',
      designerView: '交易成本，设计上需透明展示',
      description: '点差是买入价和卖出价之间的差额，是交易平台的主要收入来源。点差分为固定点差和浮动点差两种。'
    },
    {
      term: '开仓/平仓',
      designerView: '交易的开始和结束，设计上需清晰区分',
      description: '开仓是建立新的交易头寸，平仓是结束现有交易头寸。平仓可以是手动平仓或设置止盈止损自动平仓。'
    },
    {
      term: '做多/做空',
      designerView: '市场方向的选择，设计上需明确标识',
      description: '做多是预期价格上涨，买入资产；做空是预期价格下跌，卖出资产。CFD交易允许投资者在市场下跌时也能获利。'
    },
    {
      term: '止盈/止损',
      designerView: '风险控制工具，设计上需突出其重要性',
      description: '止盈是设置价格达到某个水平时自动平仓以锁定利润，止损是设置价格达到某个水平时自动平仓以限制亏损。这是CFD交易中重要的风险控制工具。'
    },
    {
      term: '爆仓',
      designerView: '账户资金不足以维持持仓的状态，设计上需添加预警机制',
      description: '当账户保证金不足以维持持仓时，平台会强制平仓，称为爆仓。爆仓会导致投资者损失大部分或全部资金。'
    },
    {
      term: '保证金率',
      designerView: '衡量账户风险的指标，设计上需实时展示',
      description: '保证金率是账户权益与占用保证金的比率，计算公式为：保证金率 = (账户余额 + 浮动盈亏) / 占用保证金 × 100%。当保证金率低于一定阈值时，会触发预警或强制平仓。'
    },
    {
      term: '隔夜利息',
      designerView: '持仓过夜的成本，设计上需透明展示',
      description: '隔夜利息是持仓过夜所产生的费用，根据持仓方向和资产类别不同而有所差异。多仓通常支付利息，空仓可能收取利息。'
    },
    {
      term: '交易品种',
      designerView: '可交易的资产类型，设计上需分类展示',
      description: 'CFD交易品种包括外汇、股票、指数、商品、加密货币等。不同品种有不同的交易时间、点差和杠杆限制。'
    },
    {
      term: '限价单',
      designerView: '按指定价格执行的订单，设计上需清晰展示价格设置',
      description: '限价单是投资者设置特定价格的订单，当市场价格达到该价格时执行。限价单可以保证成交价格，但不保证成交。'
    },
    {
      term: '市价单',
      designerView: '按当前市场价格执行的订单，设计上需突出即时性',
      description: '市价单是按当前市场价格立即执行的订单，保证成交但不保证成交价格。市价单适用于需要立即执行的交易。'
    },
    {
      term: '止损单',
      designerView: '限制亏损的订单，设计上需与止损功能区分',
      description: '止损单是当市场价格达到指定水平时自动执行的订单，用于限制潜在亏损。止损单可以是限价止损或市价止损。'
    },
    {
      term: '追踪止损',
      designerView: '跟随市场价格调整的止损单，设计上需展示调整机制',
      description: '追踪止损是一种随市场价格变化自动调整止损价格的订单，当价格向有利方向移动时，止损价格也会相应调整，以锁定利润。'
    },
    {
      term: '对冲策略',
      designerView: '降低风险的交易策略，设计上需展示对冲原理',
      description: '对冲策略是通过同时建立相反方向的头寸来降低风险的交易策略。对冲可以保护投资者免受市场波动的影响。'
    },
    {
      term: ' scalping策略',
      designerView: '短线交易策略，设计上需突出快速执行',
      description: 'Scalping是一种短线交易策略，通过在短时间内多次进出市场，利用微小的价格波动获利。这种策略需要快速的执行速度和严格的风险控制。'
    },
    {
      term: '波段交易',
      designerView: '中期交易策略，设计上需展示趋势识别',
      description: '波段交易是一种中期交易策略，通过识别市场的中期趋势来获利。持仓时间通常为几天到几周。'
    },
    {
      term: '趋势交易',
      designerView: '长期交易策略，设计上需展示长期趋势',
      description: '趋势交易是一种长期交易策略，通过识别市场的长期趋势来获利。持仓时间通常为几周到几个月。'
    },
    {
      term: 'CFD监管合规',
      designerView: '符合监管要求的CFD交易，设计上需突出合规性',
      description: 'CFD交易受到各国监管机构的监管，如英国FCA、美国CFTC等。监管要求包括杠杆限制、风险披露、客户资金保护等。'
    },
    {
      term: '交易心理',
      designerView: '投资者的心理状态，设计上需强调心态管理',
      description: '交易心理是影响交易成功的重要因素，包括情绪控制、风险承受能力、决策能力等。良好的交易心理有助于投资者做出理性的交易决策。'
    }
  ];

  const advancedKnowledge = [
    {
      title: '杠杆风险计算',
      content: '杠杆倍数越高，风险越大。计算公式：风险 = 交易金额 × 价格波动百分比 × 杠杆倍数。设计师需在UI上实时展示风险水平，并根据杠杆倍数使用不同颜色警示风险。',
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=leverage risk calculation risk assessment minimalist line art pinterest style&image_size=landscape_4_3'
    },
    {
      title: '盈亏公式',
      content: '做多盈亏 = (平仓价 - 开仓价) × 合约数量；做空盈亏 = (开仓价 - 平仓价) × 合约数量。设计师需在UI上实时计算并展示，包括点值、手数等详细信息。',
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=profit loss calculation trading formula minimalist line art pinterest style&image_size=landscape_4_3'
    },
    {
      title: '交易时间规则',
      content: '不同CFD品种的交易时间不同，Forex 24小时交易，股票跟随交易所时间，商品有特定交易时段。设计师需在UI上明确展示交易时间，并在非交易时间提供提示。',
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=trading hours rules Forex 24 hours minimalist line art pinterest style&image_size=landscape_4_3'
    },
    {
      title: '风控触发条件',
      content: '当保证金率低于一定阈值时，平台会触发预警或强制平仓。通常预警阈值为100%，强制平仓阈值为50%。设计师需在UI上清晰展示保证金率和风控状态，并提供预警通知。',
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=risk control trigger margin rate warning minimalist line art pinterest style&image_size=landscape_4_3'
    },
    {
      title: '点值计算',
      content: '点值是指价格变动一个点时的盈亏金额，计算公式因品种而异。例如，外汇EUR/USD的点值通常为10美元/标准手。设计师需在UI上展示点值信息，帮助用户计算潜在盈亏。',
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pip value calculation price movement minimalist line art pinterest style&image_size=landscape_4_3'
    },
    {
      title: '交易成本分析',
      content: 'CFD交易成本包括点差、隔夜利息、佣金等。设计师需在UI上透明展示所有交易成本，并提供成本计算器，帮助用户评估交易成本。',
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=trading cost analysis spread commission minimalist line art pinterest style&image_size=landscape_4_3'
    }
  ];

  const businessProcesses = [
    {
      title: 'CFD交易流程',
      steps: [
        '登录交易平台',
        '选择CFD交易品种（外汇/股票/指数/商品）',
        '分析市场走势和技术指标',
        '选择交易方向（做多/做空）',
        '设置杠杆倍数（根据风险承受能力）',
        '输入交易金额或手数',
        '设置止盈和止损价位',
        '确认交易成本（点差、佣金等）',
        '提交交易订单',
        '监控持仓状态和市场变化',
        '手动平仓或等待自动平仓',
        '查看交易历史和盈亏记录'
      ],
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=CFD trading process from open to close position minimalist line art pinterest style&image_size=landscape_4_3'
    },
    {
      title: '风险控制流程',
      steps: [
        '评估个人风险承受能力',
        '制定交易计划和资金管理策略',
        '设置合理的止盈止损点位',
        '控制单笔交易资金比例（建议不超过总资金的5%）',
        '定期监控保证金率和账户状态',
        '当保证金率接近预警阈值时采取措施（追加保证金或部分平仓）',
        '避免过度交易和情绪化决策',
        '定期复盘交易记录，总结经验教训'
      ],
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=CFD risk control process money management minimalist line art pinterest style&image_size=landscape_4_3'
    },
    {
      title: '账户资金管理流程',
      steps: [
        '开设CFD交易账户',
        '完成身份验证（KYC）',
        '存入初始资金',
        '设置资金使用计划（交易资金、备用资金）',
        '定期监控账户余额和交易记录',
        '根据交易表现调整资金分配',
        '提取盈利或追加资金',
        '定期审计账户活动和费用'
      ],
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=account fund management process money allocation minimalist line art pinterest style&image_size=landscape_4_3'
    }
  ];

  const designTips = [
    '杠杆选择器交互：滑动条+数字输入框双交互，用色彩区分风险等级（1×-10×绿色，10×-50×黄色，50×-100×红色），添加风险提示文本',
    '止盈止损输入框设计：实时计算盈亏预览，支持价格和百分比两种输入方式，添加图表可视化',
    '爆仓预警UI：红色呼吸灯动效+弹窗提示，当保证金率低于预警阈值时触发，提供快速操作按钮',
    '风险等级视觉表达：从低到高的色彩渐变，在交易确认页突出显示，添加风险评估报告',
    '数据面板布局：仓位、盈亏、保证金率核心信息优先展示，支持自定义布局，添加实时市场数据',
    '交易品种选择UI：分类展示不同资产类别，提供搜索和筛选功能，显示品种特性和交易时间',
    '盈亏计算器：集成到交易界面，支持不同杠杆和价格变动的盈亏模拟，帮助用户评估风险',
    '保证金率监控：实时显示保证金率变化，使用仪表盘或进度条可视化，添加预警阈值标记',
    '交易确认页设计：清晰展示所有交易细节，包括成本、风险、预期盈亏，添加倒计时确认',
    '移动设备适配：优化触摸交互，简化操作流程，确保关键信息在小屏幕上清晰可见'
  ];

  return (
    <div className="space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-semibold mb-4 text-[#37352f]">CFD 差价合约交易全知识</h1>
        <p className="text-[#6b6964]">
          从基础概念到设计落地，系统掌握CFD交易核心知识
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
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=CFD trading interface design leverage selector take profit stop loss minimalist line art pinterest style&image_size=landscape_16_9" 
                  alt="设计注意点" 
                  className="w-full h-full object-contain"
                  style={{ filter: 'drop-shadow(0 0 0 1px black)' }}
                  onLoad={() => loadImageColor("https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=CFD trading interface design leverage selector take profit stop loss minimalist line art pinterest style&image_size=landscape_16_9", 'design')}
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

export default CFD;
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Crypto = () => {
  const [activeTab, setActiveTab] = useState('keywords');
  const [imageColors, setImageColors] = useState({});

  // 加载图片时获取主色调
  const loadImageColor = (imageUrl, key) => {
    getImageDominantColor(imageUrl).then(color => {
      setImageColors(prev => ({
        ...prev,
        [key]: color
      }));
    });
  };

  // 为每个关键词生成插画URL
  const getIllustrationUrl = (term, index) => {
    const prompts = [
      'bitcoin ethereum cryptocurrency icons minimalist line art pinterest style',
      'digital token cryptocurrency minimalist line art pinterest style',
      'market cap circulating supply chart minimalist line art pinterest style',
      'cryptocurrency mining process minimalist line art pinterest style',
      'token locking mechanism minimalist line art pinterest style',
      'crypto transfer deposit withdraw process minimalist line art pinterest style',
      'block confirmation process minimalist line art pinterest style',
      'transaction fees concept minimalist line art pinterest style',
      'contract address concept minimalist line art pinterest style',
      'KYC identity verification process minimalist line art pinterest style',
      'private key management security minimalist line art pinterest style',
      'blockchain fork concept minimalist line art pinterest style',
      'crypto ETF exchange traded fund minimalist line art pinterest style',
      'token airdrop distribution minimalist line art pinterest style',
      'crypto staking rewards minimalist line art pinterest style',
      'crypto burns token supply reduction minimalist line art pinterest style',
      'decentralized exchange DEX trading minimalist line art pinterest style',
      'centralized exchange CEX trading minimalist line art pinterest style',
      'crypto market cycle bull bear minimalist line art pinterest style',
      'crypto wallet security best practices minimalist line art pinterest style',
      'crypto tax reporting compliance minimalist line art pinterest style',
      'crypto market manipulation prevention minimalist line art pinterest style'
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
      term: 'BTC/ETH/稳定币',
      designerView: '不同类型的数字资产，设计上需区分展示',
      description: 'BTC是比特币，第一个去中心化加密货币，2024年第四次减半顺利进行，推动市场上涨；ETH是以太坊，支持智能合约，已完成PoS转变；稳定币如USDT/USDC与法币挂钩，价值相对稳定，常用于交易对和DeFi。2024年12月，加密市场总市值达到3.91万亿美元的历史新高。'
    },
    {
      term: 'Token/通证',
      designerView: '数字资产的表现形式，设计上需突出其用途',
      description: 'Token是区块链上的数字资产，可以代表各种权益，如实用型代币（用于平台功能）、证券型代币（代表资产所有权）、治理代币（用于投票决策）等。'
    },
    {
      term: '市值/流通量/发行量',
      designerView: '资产价值的核心指标，设计上需清晰展示',
      description: '市值=价格×流通量，流通量是当前市场上可交易的代币数量，发行量是总供应量。市值反映了代币的总价值，流通量影响代币的流动性。'
    },
    {
      term: '挖矿',
      designerView: '获取新币的过程，设计上需简化复杂概念',
      description: '挖矿是通过计算解决数学问题来验证交易并获得新币奖励的过程。挖矿需要大量计算能力，是维护区块链网络安全的重要机制。'
    },
    {
      term: '锁仓',
      designerView: '限制代币流通的机制，设计上需明确展示锁仓状态',
      description: '锁仓是将代币暂时冻结，限制其流通，通常用于项目开发、团队激励、投资者 vesting 等。锁仓期结束后，代币会逐步释放到市场。'
    },
    {
      term: '转账/充值/提币',
      designerView: '资产移动的核心操作，设计上需保证安全和便捷',
      description: '转账是向他人发送代币，充值是将代币存入平台，提币是将代币从平台取出。这些操作都需要支付手续费，并等待区块确认。'
    },
    {
      term: '区块确认',
      designerView: '交易完成的标志，设计上需清晰展示确认状态',
      description: '区块确认是指交易被打包到区块链并得到网络验证的过程，确认数越多越安全。不同区块链的确认时间不同，比特币约10分钟/确认，以太坊约15秒/确认。'
    },
    {
      term: '手续费',
      designerView: '交易成本，设计上需透明展示',
      description: '手续费是用户为完成交易而支付的费用，用于激励网络节点处理交易。手续费高低取决于网络拥堵程度和交易优先级。'
    },
    {
      term: '合约地址',
      designerView: '代币的唯一标识，设计上需确保准确输入',
      description: '合约地址是智能合约在区块链上的唯一标识符，用于识别和管理代币。在转账时，需要确保输入正确的合约地址，否则资产可能永久丢失。'
    },
    {
      term: 'KYC/AML',
      designerView: '合规要求，设计上需简化用户流程',
      description: 'KYC（了解你的客户）和AML（反洗钱）是加密货币平台的合规要求，用户需要提供身份信息以验证身份，防止洗钱和其他非法活动。2024年5月，美国众议院通过了《21世纪金融创新与技术法案》，旨在将加密货币更多的监管权力下放给对数字资产持宽容态度的商品期货交易委员会(CFTC)。'
    },
    {
      term: '私钥管理',
      designerView: '资产安全的核心，设计上需强调安全性',
      description: '私钥是访问和管理加密货币的关键，用户需要妥善保管私钥，避免泄露或丢失。私钥一旦丢失，资产将无法恢复。'
    },
    {
      term: '分叉',
      designerView: '区块链网络的升级或分裂，设计上需清晰说明',
      description: '分叉是区块链网络的升级或分裂，分为软分叉（向后兼容）和硬分叉（不向后兼容）。分叉可能会产生新的代币。'
    },
    {
      term: '加密ETF',
      designerView: '加密资产的交易所交易基金，设计上需突出合规性',
      description: '加密ETF是在传统证券交易所上市的交易所交易基金，跟踪加密货币的价格表现。2024年1月，美国推出了首个现货比特币ETF，标志着加密市场的成熟。'
    },
    {
      term: '代币空投',
      designerView: '免费分发代币的营销手段，设计上需清晰展示领取流程',
      description: '代币空投是项目方免费向用户分发代币的活动，通常用于社区建设和营销。用户需要完成特定任务或持有特定代币才能获得空投。'
    },
    {
      term: '质押',
      designerView: '锁定资产获取收益的机制，设计上需展示收益预期',
      description: '质押是将加密货币锁定在网络中以支持网络运行并获得奖励的过程。在PoS共识机制中，质押是验证交易的必要条件。'
    },
    {
      term: '代币销毁',
      designerView: '减少代币供应量的机制，设计上需展示销毁效果',
      description: '代币销毁是将代币永久从流通中移除的过程，通常通过将代币发送到不可恢复的地址来实现。代币销毁可以增加剩余代币的价值。'
    },
    {
      term: '去中心化交易所',
      designerView: '非托管交易平台，设计上需突出用户控制',
      description: '去中心化交易所（DEX）是基于智能合约的交易平台，用户保持对资产的控制权，交易通过自动做市商机制完成。2024年10月数据显示，过去24小时去中心化交易所的交易量约58.27亿美元。'
    },
    {
      term: '中心化交易所',
      designerView: '传统交易平台，设计上需突出安全和便捷',
      description: '中心化交易所（CEX）是由中心化机构运营的交易平台，用户将资产托管给交易所，交易速度快，流动性高。2024年1月现货BTC ETF的推出标志着市场逐渐成熟，交易所业务也随之增长。'
    },
    {
      term: '市场周期',
      designerView: '加密市场的涨跌循环，设计上需展示趋势',
      description: '加密市场具有明显的周期性，包括牛市（价格上涨）和熊市（价格下跌）。了解市场周期有助于投资者做出更明智的决策。'
    },
    {
      term: '钱包安全',
      designerView: '保护数字资产的最佳实践，设计上需强调安全措施',
      description: '钱包安全包括使用硬件钱包、启用双重认证、备份助记词等措施。安全的钱包管理是保护数字资产的关键。'
    },
    {
      term: '加密税收',
      designerView: '加密资产的税务合规，设计上需提供报税工具',
      description: '加密货币交易可能需要缴纳税款，不同国家和地区有不同的税收规定。用户需要了解并遵守当地的税务法规。'
    },
    {
      term: '市场操纵',
      designerView: '防止价格操纵的措施，设计上需展示监控机制',
      description: '市场操纵是指通过人为手段影响加密货币价格的行为，如洗盘、拉高出货等。监管机构和交易所采取措施防止市场操纵。'
    }
  ];

  const advancedKnowledge = [
    {
      title: '币价展示逻辑',
      content: '币价应实时更新，展示24小时涨跌幅，使用绿色表示上涨，红色表示下跌，并添加微动效增强用户体验。同时应展示市值、交易量等关键指标，帮助用户做出决策。2024年1月现货BTC ETF的推出标志着市场逐渐成熟，比特币价格在2024年表现强劲，即使几次数十亿美元的清算和抛售也无法阻止其上涨。',
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cryptocurrency price chart green up red down minimalist line art pinterest style&image_size=landscape_4_3'
    },
    {
      title: '充值到账时效',
      content: '不同公链的充值到账时间不同，比特币需要6个确认约1小时，以太坊需要12个确认约15分钟，Solana几乎实时到账。设计师需在UI上明确告知用户预计到账时间，并提供交易哈希查询功能。',
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blockchain confirmation time comparison different chains minimalist line art pinterest style&image_size=landscape_4_3'
    },
    {
      title: '提币审核规则',
      content: '提币通常需要KYC验证，大额提币可能需要人工审核，审核时间从几分钟到几小时不等。设计师需清晰展示提币流程和预计到账时间，并提供提币状态追踪功能。',
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=crypto withdrawal review process KYC verification minimalist line art pinterest style&image_size=landscape_4_3'
    },
    {
      title: '链类型选择',
      content: 'TRC20和ERC20是常见的代币标准，TRC20基于波场，手续费低；ERC20基于以太坊，生态丰富。此外还有BEP20（币安智能链）、SOL（Solana）等。设计师需引导用户正确选择链类型，并提供链类型切换的直观界面。',
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blockchain types comparison TRC20 ERC20 minimalist line art pinterest style&image_size=landscape_4_3'
    },
    {
      title: '资产安全措施',
      content: '平台应采取多重安全措施，如冷钱包存储、多重签名、风控系统等。设计师需在UI上展示安全等级，增强用户信任感，并提供安全设置选项，如两步验证、IP白名单等。',
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cryptocurrency security measures cold storage minimalist line art pinterest style&image_size=landscape_4_3'
    },
    {
      title: '市场深度与流动性',
      content: '市场深度反映了订单簿的厚度，流动性影响交易滑点。设计师需在交易界面展示市场深度图，帮助用户了解市场流动性，特别是在大额交易时。',
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=market depth chart order book minimalist line art pinterest style&image_size=landscape_4_3'
    }
  ];

  const businessProcesses = [
    {
      title: '虚拟货币充值流程',
      steps: [
        '登录平台',
        '进入资产页面',
        '选择需要充值的币种',
        '选择链类型（如ERC20、TRC20等）',
        '生成专属充值地址',
        '从外部钱包向该地址转账',
        '等待区块链网络确认',
        '平台确认到账',
        '资产到账成功'
      ],
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cryptocurrency deposit process minimalist line art pinterest style&image_size=landscape_4_3'
    },
    {
      title: '虚拟货币提币流程',
      steps: [
        '登录平台',
        '进入资产页面',
        '选择需要提币的币种',
        '点击提币按钮',
        '输入接收地址',
        '选择链类型',
        '输入提币金额',
        '确认手续费',
        '输入安全验证（如短信验证码、Google Authenticator）',
        '确认提币',
        '等待平台审核',
        '提币成功并发送到目标地址'
      ],
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cryptocurrency withdrawal process minimalist line art pinterest style&image_size=landscape_4_3'
    },
    {
      title: 'KYC身份验证流程',
      steps: [
        '登录平台',
        '进入安全设置页面',
        '选择KYC验证',
        '选择验证级别（基础/高级）',
        '上传身份证照片',
        '拍摄活体照片',
        '填写个人信息',
        '提交验证',
        '等待审核',
        '验证通过'
      ],
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=KYC identity verification process minimalist line art pinterest style&image_size=landscape_4_3'
    },
    {
      title: '代币交易流程',
      steps: [
        '登录平台',
        '进入交易页面',
        '选择交易对（如BTC/USDT）',
        '选择交易类型（限价/市价）',
        '输入交易金额',
        '确认交易信息',
        '提交交易',
        '等待交易成交',
        '交易完成'
      ],
      illustration: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cryptocurrency trading process minimalist line art pinterest style&image_size=landscape_4_3'
    }
  ];

  const designTips = [
    '资产列表UI：使用清晰的币种图标，突出显示余额和价值，支持排序和搜索，添加资产变动通知',
    '价格涨跌动效：绿色涨/红色跌，添加数字跳动动效，增强视觉反馈，使用不同强度的动效表示涨跌幅度',
    '充值提币表单设计：地址校验，链类型选择引导，金额输入验证，添加地址簿功能',
    '风险警示视觉：大额提币二次确认，使用红色呼吸灯动效强调风险，添加风险等级提示',
    '资产数据可视化：使用饼图展示资产分布，折线图展示价格趋势，添加时间范围选择',
    '交易界面设计：清晰的订单簿，实时价格图表，交易历史记录，支持多种交易类型',
    '安全设置UI：两步验证引导，IP白名单设置，登录历史记录，安全等级评估',
    'KYC流程设计：简化步骤，清晰的进度指示，文件上传引导，审核状态跟踪',
    '响应式设计：在移动设备上优化触摸目标，简化操作流程，确保关键功能易于访问',
    '错误处理：清晰的错误提示，具体的解决建议，友好的用户引导' 
  ];

  // 币种概念数据
  const cryptocurrencies = [
    // 主流公链 & 头部
    {
      category: '主流公链 & 头部',
      coins: [
        {
          code: 'BTC',
          name: 'Bitcoin',
          project: '比特币',
          corePosition: '第一个去中心化加密货币，价值存储',
          history: '2009年由中本聪创建，2024年第四次减半顺利进行，推动市场上涨',
          logo: 'https://api.coingecko.com/api/v3/coins/bitcoin/image'
        },
        {
          code: 'ETH',
          name: 'Ethereum',
          project: '以太坊',
          corePosition: '智能合约平台，DeFi和NFT生态基础',
          history: '2015年推出，已完成从PoW到PoS的转变，ETH2.0实现',
          logo: 'https://api.coingecko.com/api/v3/coins/ethereum/image'
        },
        {
          code: 'BNB',
          name: 'BNB Chain',
          project: '币安智能链',
          corePosition: '高性能公链，币安生态系统基础',
          history: '2017年作为币安平台币推出，后发展为独立公链',
          logo: 'https://api.coingecko.com/api/v3/coins/binancecoin/image'
        },
        {
          code: 'SOL',
          name: 'Solana',
          project: '索拉纳',
          corePosition: '高性能公链，专注于速度和低成本',
          history: '2020年推出，TPS可达65000+，成为以太坊的主要竞争对手',
          logo: 'https://api.coingecko.com/api/v3/coins/solana/image'
        },
        {
          code: 'XRP',
          name: 'Ripple',
          project: '瑞波',
          corePosition: '跨境支付解决方案',
          history: '2012年推出，与多家银行合作，SEC诉讼持续多年',
          logo: 'https://api.coingecko.com/api/v3/coins/ripple/image'
        },
        {
          code: 'ADA',
          name: 'Cardano',
          project: '卡尔达诺',
          corePosition: '学术驱动的智能合约平台',
          history: '2017年推出，由以太坊联合创始人Charles Hoskinson创立',
          logo: 'https://api.coingecko.com/api/v3/coins/cardano/image'
        },
        {
          code: 'DOT',
          name: 'Polkadot',
          project: '波卡',
          corePosition: '异构多链网络，实现跨链互操作',
          history: '2020年推出，由以太坊联合创始人Gavin Wood创立',
          logo: 'https://api.coingecko.com/api/v3/coins/polkadot/image'
        },
        {
          code: 'TRX',
          name: 'Tron',
          project: '波场',
          corePosition: '去中心化内容分发平台',
          history: '2018年推出，专注于娱乐和内容领域',
          logo: 'https://api.coingecko.com/api/v3/coins/tron/image'
        },
        {
          code: 'AVAX',
          name: 'Avalanche',
          project: '雪崩',
          corePosition: '高性能公链，支持子网技术',
          history: '2020年推出，TPS可达4500+，生态快速发展',
          logo: 'https://api.coingecko.com/api/v3/coins/avalanche-2/image'
        },
        {
          code: 'APT',
          name: 'Aptos',
          project: '阿普托斯',
          corePosition: 'Layer1公链，专注于安全性和可扩展性',
          history: '2022年推出，由前Meta区块链团队创立',
          logo: 'https://api.coingecko.com/api/v3/coins/aptos/image'
        },
        {
          code: 'SUI',
          name: 'Sui',
          project: ' sui',
          corePosition: 'Layer1公链，专注于对象编程模型',
          history: '2023年推出，由前Meta区块链团队创立',
          logo: 'https://api.coingecko.com/api/v3/coins/sui/image'
        }
      ]
    },
    // 稳定币
    {
      category: '稳定币',
      coins: [
        {
          code: 'USDT',
          name: 'Tether',
          project: '泰达币',
          corePosition: '与美元挂钩的稳定币',
          history: '2014年推出，目前市值最大的稳定币',
          logo: 'https://api.coingecko.com/api/v3/coins/tether/image'
        },
        {
          code: 'USDC',
          name: 'Circle',
          project: '美元币',
          corePosition: '合规稳定币，由Circle发行',
          history: '2018年推出，透明度高，储备资产定期审计',
          logo: 'https://api.coingecko.com/api/v3/coins/usd-coin/image'
        },
        {
          code: 'DAI',
          name: 'MakerDAO',
          project: '戴',
          corePosition: '去中心化稳定币，由抵押品支持',
          history: '2017年推出，是DeFi生态系统的重要组成部分',
          logo: 'https://api.coingecko.com/api/v3/coins/multi-collateral-dai/image'
        }
      ]
    },
    // DeFi 龙头
    {
      category: 'DeFi 龙头',
      coins: [
        {
          code: 'UNI',
          name: 'Uniswap',
          project: 'Uniswap',
          corePosition: '去中心化交易所，AMM机制',
          history: '2020年推出，是DEX领域的领导者',
          logo: 'https://api.coingecko.com/api/v3/coins/uniswap/image'
        },
        {
          code: 'AAVE',
          name: 'Aave',
          project: 'Aave',
          corePosition: '去中心化借贷平台',
          history: '2020年推出，支持多种加密资产的借贷',
          logo: 'https://api.coingecko.com/api/v3/coins/aave/image'
        },
        {
          code: 'LINK',
          name: 'Chainlink',
          project: 'Chainlink',
          corePosition: '去中心化预言机网络',
          history: '2017年推出，为智能合约提供链外数据',
          logo: 'https://api.coingecko.com/api/v3/coins/chainlink/image'
        },
        {
          code: 'LDO',
          name: 'Lido',
          project: 'Lido',
          corePosition: 'ETH流动性质押解决方案',
          history: '2020年推出，允许用户质押ETH并获得流动性',
          logo: 'https://api.coingecko.com/api/v3/coins/lido-dao/image'
        },
        {
          code: 'YFI',
          name: 'Yearn',
          project: 'Yearn Finance',
          corePosition: 'DeFi收益聚合器',
          history: '2020年推出，自动寻找最高收益机会',
          logo: 'https://api.coingecko.com/api/v3/coins/yearn-finance/image'
        },
        {
          code: 'SNX',
          name: 'Synthetix',
          project: 'Synthetix',
          corePosition: '合成资产发行平台',
          history: '2018年推出，允许创建合成资产',
          logo: 'https://api.coingecko.com/api/v3/coins/synthetix-network-token/image'
        }
      ]
    },
    // Layer2 扩容
    {
      category: 'Layer2 扩容',
      coins: [
        {
          code: 'ARB',
          name: 'Arbitrum',
          project: 'Arbitrum',
          corePosition: '以太坊Layer2扩容解决方案',
          history: '2021年推出，使用乐观卷叠技术',
          logo: 'https://api.coingecko.com/api/v3/coins/arbitrum/image'
        },
        {
          code: 'OP',
          name: 'Optimism',
          project: 'Optimism',
          corePosition: '以太坊Layer2扩容解决方案',
          history: '2021年推出，使用乐观卷叠技术',
          logo: 'https://api.coingecko.com/api/v3/coins/optimism/image'
        },
        {
          code: 'MATIC',
          name: 'Polygon',
          project: 'Polygon',
          corePosition: '以太坊侧链，提供低费用交易',
          history: '2019年推出，前身为Matic Network',
          logo: 'https://api.coingecko.com/api/v3/coins/polygon/image'
        },
        {
          code: 'STRK',
          name: 'StarkNet',
          project: 'StarkNet',
          corePosition: '基于STARK证明的Layer2扩容解决方案',
          history: '2021年推出，使用零知识证明技术',
          logo: 'https://api.coingecko.com/api/v3/coins/starknet/image'
        }
      ]
    },
    // NFT / 元宇宙 / Meme
    {
      category: 'NFT / 元宇宙 / Meme',
      coins: [
        {
          code: 'MANA',
          name: 'Decentraland',
          project: 'Decentraland',
          corePosition: '去中心化虚拟世界',
          history: '2017年推出，用户可以购买和开发虚拟土地',
          logo: 'https://api.coingecko.com/api/v3/coins/decentraland/image'
        },
        {
          code: 'SAND',
          name: 'The Sandbox',
          project: 'The Sandbox',
          corePosition: '用户生成内容的虚拟世界',
          history: '2021年推出，专注于游戏和创意内容',
          logo: 'https://api.coingecko.com/api/v3/coins/the-sandbox/image'
        },
        {
          code: 'DOGE',
          name: 'Dogecoin',
          project: '狗狗币',
          corePosition: 'Meme币，社区驱动',
          history: '2013年推出，最初作为玩笑创建，后成为主流加密货币',
          logo: 'https://api.coingecko.com/api/v3/coins/dogecoin/image'
        },
        {
          code: 'SHIB',
          name: 'Shiba Inu',
          project: '柴犬币',
          corePosition: 'Meme币，以太坊上的ERC-20代币',
          history: '2020年推出，以狗狗币的竞争对手身份出现',
          logo: 'https://api.coingecko.com/api/v3/coins/shiba-inu/image'
        },
        {
          code: 'GALA',
          name: 'Gala Games',
          project: 'Gala Games',
          corePosition: '区块链游戏平台',
          history: '2019年推出，专注于游戏NFT和Play-to-Earn模式',
          logo: 'https://api.coingecko.com/api/v3/coins/gala/image'
        },
        {
          code: 'IMX',
          name: 'Immutable X',
          project: 'Immutable X',
          corePosition: 'NFT Layer2扩容解决方案',
          history: '2021年推出，为NFT交易提供低费用和高速度',
          logo: 'https://api.coingecko.com/api/v3/coins/immutable-x/image'
        }
      ]
    },
    // AI + Web3
    {
      category: 'AI + Web3',
      coins: [
        {
          code: 'AGIX',
          name: 'SingularityNET',
          project: 'SingularityNET',
          corePosition: '去中心化AI市场',
          history: '2017年推出，允许AI服务的交易和共享',
          logo: 'https://api.coingecko.com/api/v3/coins/singularitynet/image'
        },
        {
          code: 'FET',
          name: 'Fetch.ai',
          project: 'Fetch.ai',
          corePosition: 'AI驱动的去中心化网络',
          history: '2019年推出，专注于机器学习和智能代理',
          logo: 'https://api.coingecko.com/api/v3/coins/fetch-ai/image'
        },
        {
          code: 'RNDR',
          name: 'Render',
          project: 'Render Network',
          corePosition: '去中心化GPU渲染网络',
          history: '2020年推出，允许创作者访问分布式计算资源',
          logo: 'https://api.coingecko.com/api/v3/coins/render-token/image'
        },
        {
          code: 'OCEAN',
          name: 'Ocean Protocol',
          project: 'Ocean Protocol',
          corePosition: '去中心化数据共享平台',
          history: '2018年推出，允许数据的安全共享和交易',
          logo: 'https://api.coingecko.com/api/v3/coins/ocean-protocol/image'
        }
      ]
    },
    // 存储 / 隐私
    {
      category: '存储 / 隐私',
      coins: [
        {
          code: 'FIL',
          name: 'Filecoin',
          project: 'Filecoin',
          corePosition: '去中心化存储网络',
          history: '2020年推出，基于IPFS协议',
          logo: 'https://api.coingecko.com/api/v3/coins/filecoin/image'
        },
        {
          code: 'AR',
          name: 'Arweave',
          project: 'Arweave',
          corePosition: '永久存储网络',
          history: '2018年推出，使用Blockweave技术实现永久存储',
          logo: 'https://api.coingecko.com/api/v3/coins/arweave/image'
        },
        {
          code: 'XMR',
          name: 'Monero',
          project: '门罗币',
          corePosition: '隐私币，专注于匿名交易',
          history: '2014年推出，使用环形签名和隐秘地址技术',
          logo: 'https://api.coingecko.com/api/v3/coins/monero/image'
        },
        {
          code: 'ZEC',
          name: 'Zcash',
          project: 'Zcash',
          corePosition: '隐私币，使用零知识证明',
          history: '2016年推出，提供可选的隐私交易',
          logo: 'https://api.coingecko.com/api/v3/coins/zcash/image'
        }
      ]
    },
    // 再质押 / 模块化
    {
      category: '再质押 / 模块化',
      coins: [
        {
          code: 'EIGEN',
          name: 'EigenLayer',
          project: 'EigenLayer',
          corePosition: 'ETH再质押协议',
          history: '2023年推出，允许ETH质押者为其他网络提供安全保障',
          logo: 'https://api.coingecko.com/api/v3/coins/eigenlayer/image'
        },
        {
          code: 'SEI',
          name: 'Sei',
          project: 'Sei',
          corePosition: '专注于交易的Layer1公链',
          history: '2023年推出，使用Twin-Turbo共识机制',
          logo: 'https://api.coingecko.com/api/v3/coins/sei-network/image'
        }
      ]
    }
  ];

  return (
    <div className="space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-semibold mb-4 text-[#37352f]">虚拟货币 全知识</h1>
        <p className="text-[#6b6964]">
          从基础概念到设计落地，系统掌握虚拟货币核心知识
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
            { id: 'design', label: '设计注意点' },
            { id: 'cryptocurrencies', label: '品种概念' }
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
                
                <div className="mt-4 pt-4 border-t border-[#e9e9e7]">
                  <p className="text-sm text-[#6b6964]">{keyword.description}</p>
                </div>
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
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=UI%2FUX designer working on cryptocurrency interface minimalist line art pinterest style&image_size=landscape_16_9" 
                  alt="设计注意点" 
                  className="w-full h-full object-contain"
                  style={{ filter: 'drop-shadow(0 0 0 1px black)' }}
                  onLoad={() => loadImageColor("https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=UI%2FUX designer working on cryptocurrency interface minimalist line art pinterest style&image_size=landscape_16_9", 'design')}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* 品种概念 */}
        {activeTab === 'cryptocurrencies' && (
          <div className="space-y-8">
            {cryptocurrencies.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-[#37352f]">{category.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.coins.map((coin, coinIndex) => (
                    <motion.div
                      key={coin.code}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: coinIndex * 0.05 }}
                      whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                      className="bg-white p-4 rounded-md border border-[#e9e9e7]"
                    >
                      <div className="flex items-center mb-4">
                        <img 
                          src={coin.logo} 
                          alt={coin.code} 
                          className="w-10 h-10 mr-4"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div>
                          <h4 className="text-lg font-medium text-[#37352f]">{coin.code}</h4>
                          <span className="text-sm text-[#6b6964]">{coin.name}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex">
                          <span className="text-sm font-medium text-[#37352f] w-20">对应项目：</span>
                          <span className="text-sm text-[#6b6964]">{coin.project}</span>
                        </div>
                        <div className="flex">
                          <span className="text-sm font-medium text-[#37352f] w-20">核心定位：</span>
                          <span className="text-sm text-[#6b6964]">{coin.corePosition}</span>
                        </div>
                        <div className="flex">
                          <span className="text-sm font-medium text-[#37352f] w-20">历史事件：</span>
                          <span className="text-sm text-[#6b6964]">{coin.history}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Crypto;
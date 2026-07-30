// ============================================================
// whale-heart/modules/paper.js  — 论文阅读模块
// ============================================================

// ---- pdf.js CDN（pdf.js 3.x） ----
if (typeof window.pdfjsLib === 'undefined') {
  var s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
  s.onload = function () {
    if (window.pdfjsLib) {
      try { window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      } catch (e) {}
    }
  };
  document.head.appendChild(s);
}

// ============================================================
// 内置数据
// ============================================================

// 英→中 学术词汇简单映射表
const PAPER_DICT = {
  'the':'该','a':'一个','an':'一个','is':'是','are':'是','was':'是','were':'是',
  'be':'是','been':'是','being':'是','have':'有','has':'有','had':'有',
  'of':'的','in':'在','on':'关于','at':'在','to':'到','for':'为了','with':'与','by':'通过',
  'and':'和','or':'或','but':'但是','not':'不','this':'这个','that':'那个','these':'这些','those':'那些',
  'we':'我们','our':'我们的','us':'我们','they':'他们','their':'他们的','it':'它','its':'它的',
  'model':'模型','models':'模型','data':'数据','method':'方法','methods':'方法',
  'result':'结果','results':'结果','analysis':'分析','study':'研究','studies':'研究',
  'show':'显示','shows':'显示','shown':'显示','demonstrate':'证明','demonstrates':'证明',
  'propose':'提出','proposes':'提出','proposed':'提出的','approach':'方法','approaches':'方法',
  'algorithm':'算法','algorithms':'算法','performance':'性能','accuracy':'准确率',
  'training':'训练','train':'训练','trained':'训练的','test':'测试','testing':'测试',
  'validation':'验证','dataset':'数据集','datasets':'数据集','feature':'特征','features':'特征',
  'learning':'学习','deep':'深度','neural':'神经','network':'网络','networks':'网络',
  'layer':'层','layers':'层','function':'函数','functions':'函数','parameter':'参数','parameters':'参数',
  'optimization':'优化','optimize':'优化','loss':'损失','gradient':'梯度','descent':'下降',
  'accuracy':'准确率','precision':'精确率','recall':'召回率','metric':'指标','metrics':'指标',
  'experiment':'实验','experiments':'实验','evaluation':'评估','evaluate':'评估',
  'compare':'比较','comparison':'比较','baseline':'基线','state':'状态',
  'art':'技术','novel':'新颖的','new':'新的','existing':'现有的','previous':'先前的',
  'future':'未来','work':'工作','works':'工作','research':'研究','paper':'论文',
  'problem':'问题','problems':'问题','solution':'解决方案','challenge':'挑战','challenges':'挑战',
  'theory':'理论','theorem':'定理','proof':'证明','lemma':'引理','corollary':'推论',
  'definition':'定义','property':'性质','properties':'性质','assume':'假设','assumption':'假设',
  'convergence':'收敛','converge':'收敛','divergence':'发散','sequence':'序列','series':'级数',
  'limit':'极限','continuous':'连续的','discrete':'离散的','random':'随机','randomly':'随机地',
  'probability':'概率','distribution':'分布','expectation':'期望','variance':'方差',
  'covariance':'协方差','independent':'独立的','independence':'独立性','conditional':'条件的',
  'sample':'样本','samples':'样本','sampling':'采样','estimate':'估计','estimator':'估计量',
  'bias':'偏差','noise':'噪声','signal':'信号','filter':'滤波','filtering':'滤波',
  'dimension':'维度','dimensional':'维的','vector':'向量','matrix':'矩阵','matrices':'矩阵',
  'tensor':'张量','scalar':'标量','norm':'范数','distance':'距离','similarity':'相似性',
  'cluster':'聚类','clusters':'聚类','clustering':'聚类','classification':'分类','classify':'分类',
  'regression':'回归','predict':'预测','prediction':'预测','predictor':'预测器',
  'feature':'特征','representation':'表示','embedding':'嵌入','attention':'注意力',
  'transformer':'变换器','encoder':'编码器','decoder':'解码器','generation':'生成',
  'language':'语言','text':'文本','word':'词','words':'词','sentence':'句子','document':'文档',
  'image':'图像','video':'视频','audio':'音频','vision':'视觉','recognition':'识别',
  'detection':'检测','segmentation':'分割','object':'对象','objects':'对象','scene':'场景',
  'real':'真实的','synthetic':'合成的','augmentation':'增强','transfer':'迁移',
  'fine':'微调','fine-tuning':'微调','pre-trained':'预训练的','pre-training':'预训练',
  'supervised':'有监督的','unsupervised':'无监督的','semi-supervised':'半监督的',
  'reinforcement':'强化','reward':'奖励','policy':'策略','agent':'智能体','environment':'环境',
  'action':'动作','state':'状态','transition':'转移','markov':'马尔可夫','process':'过程',
  'stochastic':'随机的','deterministic':'确定性的','linear':'线性的','nonlinear':'非线性的',
  'convex':'凸的','concave':'凹的','optimization':'优化','constraint':'约束','objective':'目标',
  'minimize':'最小化','maximize':'最大化','optimal':'最优的','suboptimal':'次优的',
  'approximate':'近似','approximation':'近似','bound':'界','upper':'上','lower':'下',
  'complexity':'复杂度','time':'时间','space':'空间','polynomial':'多项式','exponential':'指数的',
  'logarithm':'对数','logarithmic':'对数的','factor':'因子','product':'积','sum':'和',
  'integral':'积分','derivative':'导数','differential':'微分','equation':'方程','equations':'方程',
  'differential':'微分','partial':'偏','ordinary':'常','boundary':'边界','initial':'初始',
  'solution':'解','solve':'求解','solving':'求解','numerical':'数值的','analytical':'解析的',
  'simulation':'仿真','simulate':'仿真','monte':'蒙特','carlo':'卡洛','bootstrap':'自助法',
  'cross':'交叉','validation':'验证','fold':'折','confusion':'混淆','matrix':'矩阵',
  'roc':'ROC','auc':'AUC','f1':'F1','recall':'召回率','false':'假','true':'真',
  'positive':'正','negative':'负','rate':'率','ratio':'比','error':'误差','errors':'误差',
  'outperform':'优于','outperforms':'优于','achieve':'取得','achieves':'取得','obtain':'获得',
  'improve':'改进','improves':'改进','improvement':'改进','enhance':'增强','enhances':'增强',
  'reduce':'减少','reduces':'减少','reduction':'减少','increase':'增加','increases':'增加',
  'significant':'显著的','significantly':'显著地','significance':'显著性','important':'重要的',
  'crucial':'关键的','essential':'必要的','fundamental':'基本的','primary':'主要的',
  'main':'主要的','major':'主要的','minor':'次要的','additional':'额外的','other':'其他',
  'however':'然而','although':'尽管','while':'虽然','because':'因为','since':'因为',
  'therefore':'因此','thus':'因此','hence':'因此','consequently':'因此','moreover':'此外',
  'furthermore':'此外','additionally':'此外','also':'也','such':'这样的','as':'如',
  'which':'哪个','where':'哪里','when':'当','how':'如何','why':'为什么','what':'什么',
  'can':'可以','could':'可以','may':'可能','might':'可能','must':'必须','should':'应该',
  'would':'将','will':'将','shall':'将','about':'关于','into':'进入','from':'从',
  'than':'比','then':'然后','so':'所以','very':'非常','more':'更多','most':'最多',
  'less':'更少','least':'最少','many':'许多','much':'许多','few':'少','some':'一些',
  'any':'任何','all':'所有','each':'每个','every':'每个','both':'两者','between':'之间',
  'among':'之中','through':'通过','during':'期间','before':'之前','after':'之后',
  'above':'上方','below':'下方','over':'超过','under':'下方','up':'上','down':'下',
  'first':'第一','second':'第二','third':'第三','last':'最后','next':'下一个','previous':'前一个',
  'based':'基于','using':'使用','used':'使用的','via':'通过','per':'每','among':'其中',
  'et':'等','al':'人','figure':'图','table':'表','section':'节','chapter':'章',
  'appendix':'附录','reference':'参考文献','references':'参考文献','equation':'方程','fig':'图',
  'http':'http','https':'https','www':'www','com':'com','org':'org','edu':'edu'
};

// 内置模拟文献库
const PAPER_REFS = [
  { title:'Attention Is All You Need', authors:'Vaswani A. et al.', journal:'NeurIPS', year:2017,
    keywords:['attention','transformer','neural','network'] },
  { title:'Deep Residual Learning for Image Recognition', authors:'He K. et al.', journal:'CVPR', year:2016,
    keywords:['deep','learning','residual','image','recognition'] },
  { title:'ImageNet Classification with Deep CNNs', authors:'Krizhevsky A. et al.', journal:'NeurIPS', year:2012,
    keywords:['deep','learning','convolutional','neural','network','image','classification'] },
  { title:'Generative Adversarial Networks', authors:'Goodfellow I. et al.', journal:'NeurIPS', year:2014,
    keywords:['generative','adversarial','network','deep','learning'] },
  { title:'BERT: Pre-training of Deep Bidirectional Transformers', authors:'Devlin J. et al.', journal:'NAACL', year:2019,
    keywords:['bert','pre-training','transformer','language','understanding'] },
  { title:'A Mathematical Theory of Communication', authors:'Shannon C.E.', journal:'Bell System Technical Journal', year:1948,
    keywords:['information','theory','communication','probability','entropy'] },
  { title:'The Elements of Statistical Learning', authors:'Hastie T. et al.', journal:'Springer', year:2009,
    keywords:['statistical','learning','regression','classification','optimization'] },
  { title:'Pattern Recognition and Machine Learning', authors:'Bishop C.', journal:'Springer', year:2006,
    keywords:['pattern','recognition','machine','learning','bayesian','probability'] },
  { title:'Stochastic Gradient Descent and Variance Reduction', authors:'Johnson R. et al.', journal:'ICML', year:2013,
    keywords:['stochastic','gradient','descent','optimization','variance'] },
  { title:'Convex Optimization', authors:'Boyd S. et al.', journal:'Cambridge University Press', year:2004,
    keywords:['convex','optimization','constraint','objective','minimize'] },
  { title:'Reinforcement Learning: An Introduction', authors:'Sutton R. et al.', journal:'MIT Press', year:2018,
    keywords:['reinforcement','learning','reward','policy','markov'] },
  { title:'Dropout: A Simple Way to Prevent Overfitting', authors:'Srivastava N. et al.', journal:'JMLR', year:2014,
    keywords:['dropout','regularization','overfitting','neural','network'] },
  { title:'Adam: A Method for Stochastic Optimization', authors:'Kingma D. et al.', journal:'ICLR', year:2015,
    keywords:['adam','optimization','stochastic','gradient','adaptive'] },
  { title:'Sequence to Sequence Learning with Neural Networks', authors:'Sutskever I. et al.', journal:'NeurIPS', year:2014,
    keywords:['sequence','learning','neural','network','language'] },
  { title:'Graph Neural Networks: A Review', authors:'Zhou J. et al.', journal:'IEEE TKDE', year:2020,
    keywords:['graph','neural','network','node','embedding'] },
  { title:'On the Convergence of Stochastic Gradient Descent', authors:'Bottou L. et al.', journal:'SIAM J. Optim.', year:2018,
    keywords:['convergence','stochastic','gradient','descent','optimization'] },
  { title:'Bayesian Reasoning and Machine Learning', authors:'Barber D.', journal:'Cambridge University Press', year:2012,
    keywords:['bayesian','reasoning','machine','learning','probability'] },
  { title:'Matrix Factorization Techniques for Recommender Systems', authors:'Koren Y. et al.', journal:'Computer', year:2009,
    keywords:['matrix','factorization','recommender','collaborative','filtering'] },
];

// AI 知识库（数学学术相关）
const AI_KB = [
  { keys:['gradient','descent','optimization','梯度','下降','优化'],
    answer:'梯度下降是一种迭代优化算法。给定目标函数 f(θ)，参数更新规则为 θ ← θ − η∇f(θ)，其中 η 为学习率。' +
           '常见变体：批量梯度下降(BGD)、随机梯度下降(SGD)、小批量梯度下降(Mini-batch SGD)。' +
           'SGD 收敛性分析通常基于 Robbins-Monro 条件：学习率需满足 Ση_t=∞, Ση_t²<∞。' },
  { keys:['attention','transformer','注意力','变换器'],
    answer:'注意力机制(Attention)通过 Query-Key-Value 三元组计算加权和：Attention(Q,K,V)=softmax(QK^T/√d_k)V。' +
           'Transformer 由 Vaswani 等人于 2017 年提出，完全基于自注意力，摒弃了循环结构。' +
           '多头注意力(Multi-Head Attention)使模型能在不同表示子空间联合关注信息。' },
  { keys:['markov','decision','process','reinforcement','马尔可夫','强化学习'],
    answer:'马尔可夫决策过程(MDP)由五元组 (S, A, P, R, γ) 定义：状态集 S、动作集 A、转移概率 P(s\'|s,a)、' +
           '奖励函数 R(s,a)、折扣因子 γ∈[0,1]。强化学习的目标是寻找最优策略 π* 使得期望累计折扣奖励最大化：' +
           'V*(s)=max_a [R(s,a)+γΣ P(s\'|s,a)V*(s\')]，可通过值迭代、策略迭代或 Q-learning 求解。' },
  { keys:['convex','凸','优化','constraint','约束'],
    answer:'凸优化研究在凸集上最小化凸函数。凸函数满足 Jensen 不等式：f(λx+(1−λ)y)≤λf(x)+(1−λ)f(y)。' +
           '对于无约束问题，KKT 条件是充要条件；对偶理论(Lagrange 对偶)将原问题转化为对偶问题。' +
           '经典算法包括内点法、牛顿法、梯度投影法等。强对偶性要求 Slater 条件成立。' },
  { keys:['probability','distribution','概率','分布','bayesian','贝叶斯'],
    answer:'概率论基础：贝叶斯定理 P(A|B)=P(B|A)P(A)/P(B) 是贝叶斯推断的核心。' +
           '常见分布：高斯分布 N(μ,σ²)、伯努利分布 Bern(p)、泊松分布 Poisson(λ)、指数分布 Exp(λ)。' +
           '大数定律保证样本均值收敛于期望；中心极限定理说明独立同分布随机变量和的标准化近似正态分布。' },
  { keys:['neural','network','deep','learning','神经网络','深度','学习'],
    answer:'神经网络通过非线性激活函数(如 ReLU、Sigmoid、Tanh)的多层组合逼近复杂函数。' +
           '万能逼近定理：含一个隐藏层的前馈网络可逼近任意连续函数(前提是隐藏单元足够多)。' +
           '反向传播算法利用链式法则计算梯度。常见问题：梯度消失/爆炸、过拟合——解决方案包括 BatchNorm、Dropout、残差连接。' },
  { keys:['matrix','decomposition','矩阵','分解','svd','pca'],
    answer:'矩阵分解：SVD 将矩阵 A 分解为 A=UΣV^T，其中 U、V 为正交矩阵，Σ 为对角矩阵。' +
           'PCA(主成分分析)通过对协方差矩阵特征分解或 SVD 实现降维。' +
           '低秩近似(Eckart-Young 定理)：截断 SVD 给出 Frobenius 范数意义下的最优低秩近似。' },
  { keys:['convergence','收敛','limit','极限','sequence','序列'],
    answer:'收敛性分析：序列 {x_n} 收敛于 L 指 ∀ε>0, ∃N, ∀n>N, |x_n−L|<ε。' +
           'Cauchy 序列：∀ε>0, ∃N, ∀m,n>N, |x_m−x_n|<ε。完备度量空间中 Cauchy 序列等价于收敛序列。' +
           '优化算法收敛性常用 Lipschitz 连续、强凸性、Polyak-Łojasiewicz 条件等假设。' },
  { keys:['overfitting','regularization','过拟合','正则化','dropout'],
    answer:'过拟合指模型在训练集表现好但泛化差。正则化方法：L1(Lasso) 促进稀疏、L2(Ridge) 防止权重过大、' +
           'Elastic Net 结合两者。Dropout 以概率 p 随机置零神经元，训练时按 1/(1−p) 缩放。' +
           '早停(Early Stopping)、数据增强、交叉验证也是常用手段。偏差-方差权衡是核心理论框架。' },
  { keys:['information','theory','entropy','信息论','熵','mutual','互信息'],
    answer:'信息论基础：香农熵 H(X)=−Σ p(x)log p(x) 度量随机变量的不确定性。' +
           '互信息 I(X;Y)=H(X)−H(X|Y) 衡量两变量的依赖程度。' +
           'KL 散度 D_KL(P‖Q)=Σ P(x)log(P(x)/Q(x)) 度量分布差异(非对称)。' +
           '交叉熵 H(P,Q)=−Σ P(x)log Q(x) 常作为分类损失函数。数据压缩与信道编码是其核心应用。' },
];

// ============================================================
// 状态管理
// ============================================================

function paperState() {
  if (!state.paper) state.paper = {
    list: [],          // [{id, title, fileName, pages, paragraphs, rawText, createdAt, marks}]
    currentId: null,   // 当前打开的论文 id
    view: 'list',      // list | detail
    chatHistory: [],   // [{role, content}]
    selectedParaIdx: null,
  };
  return state.paper;
}

function savePaper() {
  DB.set('paper_list', paperState().list);
}

function loadPaperDB() {
  const saved = DB.get('paper_list');
  if (Array.isArray(saved)) paperState().list = saved;
}

// ============================================================
// 工具函数
// ============================================================

function paperUid() {
  return 'p_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
}

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// 简单翻译：逐词映射
function translateText(text) {
  if (!text) return '';
  // 保留段落结构
  return text.split(/(\n+)/).map(seg => {
    if (/^\n+$/.test(seg)) return seg;
    // 按空格和标点分词
    return seg.replace(/[A-Za-z][A-Za-z\-']*/g, function (word) {
      var lower = word.toLowerCase();
      if (PAPER_DICT[lower]) return PAPER_DICT[lower];
      return word;
    });
  }).join('');
}

// 提取关键词
function extractKeywords(text) {
  if (!text) return [];
  var freq = {};
  var words = text.toLowerCase().match(/[a-z]{3,}/g) || [];
  words.forEach(function (w) {
    var stop = ['the','and','for','are','with','this','that','from','have','was','were','been','which','their','will','can','all','any','but','not','you','our','they','them','his','her','she','him','has','had','did','does','done','into','onto','over','under','such','also','than','then','them','these','those','there','where','when','what','which','while','about','after','before','being','been','more','most','some','such','only','very','upon','each','both','them'];
    if (stop.indexOf(w) >= 0) return;
    freq[w] = (freq[w] || 0) + 1;
  });
  return Object.keys(freq).sort(function (a, b) { return freq[b] - freq[a]; }).slice(0, 10);
}

// 推荐文献
function recommendRefs(paper) {
  if (!paper) return [];
  var kws = extractKeywords(paper.rawText || paper.title);
  var scored = PAPER_REFS.map(function (ref) {
    var score = 0;
    ref.keywords.forEach(function (k) {
      if (kws.indexOf(k) >= 0) score += 2;
      kws.forEach(function (kw) {
        if (kw.indexOf(k) >= 0 || k.indexOf(kw) >= 0) score += 1;
      });
    });
    return { ref: ref, score: score };
  });
  scored.sort(function (a, b) { return b.score - a.score; });
  var top = scored.filter(function (s) { return s.score > 0; }).slice(0, 5);
  if (top.length < 3) {
    // 补充默认推荐
    PAPER_REFS.slice(0, 5 - top.length).forEach(function (ref) {
      var exists = top.some(function (t) { return t.ref.title === ref.title; });
      if (!exists) top.push({ ref: ref, score: 0 });
    });
  }
  return top.map(function (s) { return s.ref; });
}

// 模拟 AI 回复
function aiReply(question) {
  if (!question) return '请输入您的问题。';
  var q = question.toLowerCase();
  // 匹配知识库
  for (var i = 0; i < AI_KB.length; i++) {
    var kb = AI_KB[i];
    for (var j = 0; j < kb.keys.length; j++) {
      if (q.indexOf(kb.keys[j]) >= 0) {
        return kb.answer;
      }
    }
  }
  // 检查是否选中了段落
  var ps = paperState();
  if (ps.selectedParaIdx != null) {
    var para = getCurrentPaper();
    if (para && para.paragraphs && para.paragraphs[ps.selectedParaIdx]) {
      var p = para.paragraphs[ps.selectedParaIdx];
      return '关于您选中的段落："…' + p.slice(0, 60) + '…"\n\n' +
             '这段内容涉及的核心概念可以从数学与工程两个角度理解。\n' +
             '• 数学角度：关注其形式化定义、收敛性/复杂度分析。\n' +
             '• 工程角度：关注实现细节、超参数选择、计算效率。\n\n' +
             '如需更具体分析，请指出段落中的具体术语。';
    }
  }
  return '这是一个模拟 AI 回复。您的问题："' + question + '"\n\n' +
         '当前内置知识库涵盖：梯度下降、注意力机制、强化学习、凸优化、概率论、神经网络、矩阵分解、收敛性分析、正则化、信息论等主题。\n' +
         '请尝试提问与这些主题相关的问题，或选中段落后追问。';
}

// ============================================================
// 获取当前论文
// ============================================================

function getCurrentPaper() {
  var ps = paperState();
  if (!ps.currentId) return null;
  return ps.list.find(function (p) { return p.id === ps.currentId; }) || null;
}

// ============================================================
// PDF 导入与解析
// ============================================================

function handlePdfFile(file) {
  if (!file) return;
  var paper = {
    id: paperUid(),
    title: file.name.replace(/\.pdf$/i, ''),
    fileName: file.name,
    pages: 0,
    paragraphs: [],
    rawText: '',
    createdAt: getDateKey(),
    marks: {}  // { paraIdx: { highlights: [], bolds: [] } }
  };

  // 尝试用 pdf.js 解析
  var reader = new FileReader();
  reader.onload = function (e) {
    var arrayBuffer = e.target.result;
    if (window.pdfjsLib) {
      try {
        var loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
        loadingTask.promise.then(function (pdf) {
          paper.pages = pdf.numPages;
          var textParts = [];
          var promises = [];
          for (var i = 1; i <= pdf.numPages; i++) {
            (function (pageNum) {
              promises.push(
                pdf.getPage(pageNum).then(function (page) {
                  return page.getTextContent().then(function (content) {
                    var pageText = content.items.map(function (item) { return item.str; }).join(' ');
                    textParts.push(pageText);
                  }).catch(function () {
                    textParts.push('[第' + pageNum + '页解析失败]');
                  });
                })
              );
            })(i);
          }
          Promise.all(promises).then(function () {
            paper.rawText = textParts.join('\n\n');
            paper.paragraphs = splitParagraphs(paper.rawText);
            addPaperToList(paper);
            toast('PDF 解析成功，共 ' + paper.pages + ' 页');
          }).catch(function () {
            // 解析失败，仅存储基本信息
            paper.pages = 1;
            paper.rawText = '[PDF 解析受限，请使用粘贴文本功能补充内容]';
            paper.paragraphs = [paper.rawText];
            addPaperToList(paper);
            toast('PDF 解析受限，已存储文件信息，请粘贴文本补充');
          });
        }).catch(function () {
          paper.pages = 1;
          paper.rawText = '[PDF 解析失败，请使用粘贴文本功能]';
          paper.paragraphs = [paper.rawText];
          addPaperToList(paper);
          toast('PDF 解析失败，已存储文件信息');
        });
      } catch (err) {
        paper.pages = 1;
        paper.rawText = '[PDF 解析异常：' + err.message + ']';
        paper.paragraphs = [paper.rawText];
        addPaperToList(paper);
        toast('PDF 解析异常，已存储文件信息');
      }
    } else {
      // pdf.js 未加载，仅存储基本信息
      paper.pages = 1;
      paper.rawText = '[pdf.js 未加载完成，请使用粘贴文本功能补充内容]';
      paper.paragraphs = [paper.rawText];
      addPaperToList(paper);
      toast('pdf.js 未就绪，已存储文件信息，请粘贴文本补充');
    }
  };
  reader.onerror = function () {
    toast('文件读取失败');
  };
  reader.readAsArrayBuffer(file);
}

function splitParagraphs(text) {
  if (!text) return [];
  var paras = text.split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(function (p) { return p.length > 0; });
  if (paras.length === 0 && text.trim()) paras = [text.trim()];
  return paras;
}

function addPaperToList(paper) {
  paperState().list.unshift(paper);
  savePaper();
  paperState().view = 'list';
  renderPaper();
  toast('论文已导入：' + paper.title);
}

// ============================================================
// 粘贴文本导入
// ============================================================

function importPastedText(title, text) {
  if (!text || !text.trim()) {
    toast('请粘贴论文文本');
    return;
  }
  var paper = {
    id: paperUid(),
    title: title || '未命名论文',
    fileName: (title || 'paper') + '.txt',
    pages: Math.ceil(text.length / 3000) || 1,
    paragraphs: splitParagraphs(text),
    rawText: text,
    createdAt: getDateKey(),
    marks: {}
  };
  paperState().list.unshift(paper);
  savePaper();
  closeModal();
  renderPaper();
  toast('论文文本已导入');
}

// ============================================================
// 标注：高亮 / 加粗
// ============================================================

function getMarks(paperId, paraIdx) {
  var paper = paperState().list.find(function (p) { return p.id === paperId; });
  if (!paper) return { highlights: [], bolds: [] };
  if (!paper.marks[paraIdx]) paper.marks[paraIdx] = { highlights: [], bolds: [] };
  return paper.marks[paraIdx];
}

function addMark(paperId, paraIdx, type, text) {
  if (!text || !text.trim()) return;
  var marks = getMarks(paperId, paraIdx);
  // 去重
  var exists = marks[type].some(function (m) { return m.text === text; });
  if (!exists) {
    marks[type].push({ text: text, time: getDateKey() });
    savePaper();
  }
}

function removeMark(paperId, paraIdx, type, index) {
  var marks = getMarks(paperId, paraIdx);
  if (marks[type][index]) {
    marks[type].splice(index, 1);
    savePaper();
  }
  renderPaperDetail();
}

// 应用标注到译文段落
function applyMarks(text, marks) {
  if (!text) return '';
  var html = escapeHtml(text);
  // 先处理高亮
  if (marks && marks.highlights) {
    marks.highlights.forEach(function (m) {
      if (m.text) {
        var escaped = escapeHtml(m.text);
        // 转义正则特殊字符
        var safe = escaped.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        html = html.replace(new RegExp(safe, 'g'), '<mark style="background:#fef08a;padding:1px 2px;border-radius:2px;">' + escaped + '</mark>');
      }
    });
  }
  // 处理加粗
  if (marks && marks.bolds) {
    marks.bolds.forEach(function (m) {
      if (m.text) {
        var escaped = escapeHtml(m.text);
        var safe = escaped.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // 避免重复包裹已有 mark 内的内容：简单处理
        html = html.replace(new RegExp('(?<!<[^>]*)' + safe + '(?![^<]*>)', 'g'), '<b>' + escaped + '</b>');
      }
    });
  }
  return html;
}

// 处理选中文字事件
function onParaSelection(paraIdx) {
  var sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  var selectedText = sel.toString().trim();
  if (!selectedText || selectedText.length < 1) return;
  paperState().selectedParaIdx = paraIdx;
}

function highlightSelection(paraIdx) {
  var sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) { toast('请先选中文字'); return; }
  var text = sel.toString().trim();
  if (!text) { toast('请先选中文字'); return; }
  var paper = getCurrentPaper();
  if (!paper) return;
  addMark(paper.id, paraIdx, 'highlights', text);
  toast('已高亮');
  sel.removeAllRanges();
  renderPaperDetail();
}

function boldSelection(paraIdx) {
  var sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) { toast('请先选中文字'); return; }
  var text = sel.toString().trim();
  if (!text) { toast('请先选中文字'); return; }
  var paper = getCurrentPaper();
  if (!paper) return;
  addMark(paper.id, paraIdx, 'bolds', text);
  toast('已加粗');
  sel.removeAllRanges();
  renderPaperDetail();
}

// ============================================================
// 文件管理：删除 / 重新打开
// ============================================================

function deletePaper(id) {
  var ps = paperState();
  ps.list = ps.list.filter(function (p) { return p.id !== id; });
  if (ps.currentId === id) {
    ps.currentId = null;
    ps.view = 'list';
  }
  savePaper();
  renderPaper();
  toast('已删除');
}

function openPaper(id) {
  var ps = paperState();
  ps.currentId = id;
  ps.view = 'detail';
  ps.chatHistory = [];
  ps.selectedParaIdx = null;
  renderPaper();
}

function backToList() {
  paperState().view = 'list';
  paperState().currentId = null;
  renderPaper();
}

// ============================================================
// 导出标注 HTML
// ============================================================

function exportPaperHtml(id) {
  var paper = paperState().list.find(function (p) { return p.id === id; });
  if (!paper) { toast('论文不存在'); return; }

  var html = '<!DOCTYPE html>\n<html lang="zh">\n<head>\n<meta charset="UTF-8">\n';
  html += '<title>' + escapeHtml(paper.title) + ' — 标注导出</title>\n';
  html += '<style>\n';
  html += 'body{font-family:Georgia,"Noto Serif SC",serif;max-width:860px;margin:40px auto;padding:0 24px;line-height:1.8;color:#1f2937;background:#fafaf9;}';
  html += 'h1{font-size:1.6em;border-bottom:2px solid #6366f1;padding-bottom:10px;color:#4338ca;}';
  html += '.meta{color:#6b7280;font-size:0.85em;margin-bottom:24px;}';
  html += '.para{margin:16px 0;padding:12px 0;border-bottom:1px solid #e5e7eb;}';
  html += '.en{color:#374151;}';
  html += '.zh{color:#1f2937;margin-top:8px;font-size:0.95em;}';
  html += 'mark{background:#fef08a;padding:1px 3px;border-radius:2px;}';
  html += 'b{font-weight:700;color:#7c3aed;}';
  html += '.label{font-size:0.75em;color:#6366f1;text-transform:uppercase;letter-spacing:1px;margin-right:6px;}';
  html += '.marks-section{margin-top:32px;padding:16px;background:#f3f4f6;border-radius:8px;}';
  html += '.marks-section h2{font-size:1.1em;color:#4338ca;}';
  html += '.mark-item{padding:4px 0;font-size:0.9em;}';
  html += '</style>\n</head>\n<body>\n';

  html += '<h1>' + escapeHtml(paper.title) + '</h1>\n';
  html += '<div class="meta">文件：' + escapeHtml(paper.fileName) + ' | 页数：' + paper.pages + ' | 导入日期：' + escapeHtml(paper.createdAt) + ' | 导出日期：' + getDateKey() + '</div>\n';

  html += '<div class="content">\n';
  if (paper.paragraphs && paper.paragraphs.length > 0) {
    paper.paragraphs.forEach(function (para, idx) {
      var marks = paper.marks[idx] || { highlights: [], bolds: [] };
      var zh = translateText(para);
      html += '<div class="para">\n';
      html += '  <div class="en"><span class="label">EN</span>' + applyMarks(para, marks) + '</div>\n';
      html += '  <div class="zh"><span class="label">中</span>' + applyMarks(zh, marks) + '</div>\n';
      html += '</div>\n';
    });
  } else {
    html += '<p>无段落内容</p>\n';
  }
  html += '</div>\n';

  // 标注汇总
  var hasMarks = false;
  var marksHtml = '<div class="marks-section">\n<h2>标注汇总</h2>\n';
  Object.keys(paper.marks).forEach(function (idx) {
    var m = paper.marks[idx];
    if (m.highlights && m.highlights.length > 0) {
      hasMarks = true;
      marksHtml += '<div style="margin-top:8px;"><strong>段落 ' + (parseInt(idx)+1) + ' — 高亮：</strong></div>\n';
      m.highlights.forEach(function (h) {
        marksHtml += '<div class="mark-item">⬤ ' + escapeHtml(h.text) + ' <span style="color:#9ca3af;">(' + escapeHtml(h.time) + ')</span></div>\n';
      });
    }
    if (m.bolds && m.bolds.length > 0) {
      hasMarks = true;
      marksHtml += '<div style="margin-top:8px;"><strong>段落 ' + (parseInt(idx)+1) + ' — 加粗：</strong></div>\n';
      m.bolds.forEach(function (b) {
        marksHtml += '<div class="mark-item">⬤ <b>' + escapeHtml(b.text) + '</b> <span style="color:#9ca3af;">(' + escapeHtml(b.time) + ')</span></div>\n';
      });
    }
  });
  if (!hasMarks) marksHtml += '<p>暂无标注</p>\n';
  marksHtml += '</div>\n';
  html += marksHtml;

  html += '</body>\n</html>';

  // 触发下载
  var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = paper.title + '_标注导出.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('已导出标注HTML');
}

// ============================================================
// AI Chat
// ============================================================

function sendChat() {
  var input = document.getElementById('paper-chat-input');
  if (!input) return;
  var text = input.value.trim();
  if (!text) return;
  var ps = paperState();
  ps.chatHistory.push({ role: 'user', content: text });
  input.value = '';
  // 模拟思考延迟
  setTimeout(function () {
    var reply = aiReply(text);
    ps.chatHistory.push({ role: 'ai', content: reply });
    renderChatArea();
  }, 300);
  renderChatArea();
}

function clearChat() {
  paperState().chatHistory = [];
  paperState().selectedParaIdx = null;
  renderChatArea();
}

function askAboutPara(paraIdx) {
  var paper = getCurrentPaper();
  if (!paper || !paper.paragraphs[paraIdx]) return;
  paperState().selectedParaIdx = paraIdx;
  var para = paper.paragraphs[paraIdx];
  var question = '请解释这段内容："' + para.slice(0, 120) + (para.length > 120 ? '...' : '') + '"';
  paperState().chatHistory.push({ role: 'user', content: question });
  setTimeout(function () {
    var reply = aiReply(question);
    paperState().chatHistory.push({ role: 'ai', content: reply });
    renderChatArea();
  }, 300);
  renderChatArea();
}

// ============================================================
// 模态框：导入 & 粘贴
// ============================================================

function showImportModal() {
  var html = '' +
    '<div class="field">' +
      '<label class="field-label">选择 PDF 文件</label>' +
      '<input type="file" id="paper-pdf-input" accept=".pdf" class="input" />' +
      '<p style="font-size:0.8em;color:#6b7280;margin-top:6px;">支持 .pdf 文件，自动解析页数和文本内容。</p>' +
    '</div>' +
    '<div style="height:16px;"></div>' +
    '<div class="field">' +
      '<label class="field-label">或粘贴论文文本</label>' +
      '<input type="text" id="paper-paste-title" class="input" placeholder="论文标题" style="margin-bottom:8px;" />' +
      '<textarea id="paper-paste-text" class="textarea" rows="8" placeholder="粘贴论文全文文本…"></textarea>' +
    '</div>' +
    '<div class="row" style="margin-top:16px;gap:8px;">' +
      '<button class="btn btn-blue" onclick="importPastedText(' +
        'document.getElementById(\'paper-paste-title\').value, ' +
        'document.getElementById(\'paper-paste-text\').value)">导入粘贴文本</button>' +
      '<button class="btn btn-ghost" onclick="closeModal()">取消</button>' +
    '</div>';

  showModal('导入论文', html);

  // 绑定 PDF 文件选择
  setTimeout(function () {
    var fileInput = document.getElementById('paper-pdf-input');
    if (fileInput) {
      fileInput.addEventListener('change', function (e) {
        if (e.target.files && e.target.files[0]) {
          closeModal();
          handlePdfFile(e.target.files[0]);
        }
      });
    }
  }, 50);
}

// ============================================================
// 渲染
// ============================================================

function renderPaper() {
  loadPaperDB();
  var ps = paperState();
  var root = document.getElementById('app');
  if (!root) root = document.getElementById('main');
  if (!root) {
    console.error('renderPaper: 找不到渲染根节点 #app / #main');
    return;
  }

  if (ps.view === 'detail' && ps.currentId) {
    root.innerHTML = renderPaperDetail();
    bindDetailEvents();
  } else {
    ps.view = 'list';
    root.innerHTML = renderPaperList();
    bindListEvents();
  }
}

// ---- 论文列表 ----
function renderPaperList() {
  var ps = paperState();
  var html = '' +
    '<div class="card">' +
      '<div class="row" style="justify-content:space-between;align-items:center;margin-bottom:16px;">' +
        '<div><div class="card-title">论文阅读</div>' +
        '<p style="font-size:0.85em;color:#6b7280;margin-top:4px;">导入 PDF 或粘贴文本，逐段翻译、标注、AI 追问</p></div>' +
        '<button class="btn btn-blue btn-sm" onclick="showImportModal()">+ 导入论文</button>' +
      '</div>';

  if (!ps.list || ps.list.length === 0) {
    html += '<div class="empty" style="text-align:center;padding:48px 0;color:#9ca3af;">' +
      '<div style="font-size:2.5em;margin-bottom:8px;opacity:0.4;">📄</div>' +
      '<p>暂无论文，点击「导入论文」开始</p>' +
    '</div>';
  } else {
    html += '<div style="display:flex;flex-direction:column;gap:10px;">';
    ps.list.forEach(function (paper) {
      var paraCount = paper.paragraphs ? paper.paragraphs.length : 0;
      var markCount = 0;
      if (paper.marks) {
        Object.keys(paper.marks).forEach(function (k) {
          markCount += (paper.marks[k].highlights || []).length + (paper.marks[k].bolds || []).length;
        });
      }
      html += '<div style="border:1px solid #e5e7eb;border-radius:8px;padding:14px;display:flex;justify-content:space-between;align-items:flex-start;gap:12px;transition:border-color 0.15s;" onmouseover="this.style.borderColor=\'#6366f1\'" onmouseout="this.style.borderColor=\'#e5e7eb\'">' +
        '<div style="flex:1;cursor:pointer;" onclick="openPaper(\'' + paper.id + '\')">' +
          '<div style="font-weight:600;font-size:0.95em;color:#1f2937;">' + escapeHtml(paper.title) + '</div>' +
          '<div style="font-size:0.8em;color:#6b7280;margin-top:4px;">' + escapeHtml(paper.fileName) + ' · ' + paper.pages + '页 · ' + paraCount + '段</div>' +
          '<div class="row" style="gap:6px;margin-top:6px;">' +
            '<span class="tag-blue">' + escapeHtml(paper.createdAt) + '</span>' +
            (markCount > 0 ? '<span class="tag-pink">' + markCount + ' 处标注</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="row" style="gap:4px;flex-shrink:0;">' +
          '<button class="btn btn-sm btn-ghost" onclick="event.stopPropagation();openPaper(\'' + paper.id + '\')">打开</button>' +
          '<button class="btn btn-sm btn-ghost" onclick="event.stopPropagation();exportPaperHtml(\'' + paper.id + '\')">导出</button>' +
          '<button class="btn btn-sm btn-ghost" onclick="event.stopPropagation();confirmDeletePaper(\'' + paper.id + '\')" style="color:#dc2626;">删除</button>' +
        '</div>' +
      '</div>';
    });
    html += '</div>';
  }

  html += '</div>';
  return html;
}

function confirmDeletePaper(id) {
  var paper = paperState().list.find(function (p) { return p.id === id; });
  if (!paper) return;
  var html = '<p>确定删除论文 <strong>「' + escapeHtml(paper.title) + '」</strong> 吗？所有标注将一并删除。</p>' +
    '<div class="row" style="margin-top:16px;gap:8px;justify-content:flex-end;">' +
      '<button class="btn btn-ghost" onclick="closeModal()">取消</button>' +
      '<button class="btn btn-sm" style="background:#dc2626;color:#fff;" onclick="deletePaper(\'' + id + '\');closeModal()">确认删除</button>' +
    '</div>';
  showModal('删除确认', html);
}

// ---- 论文详情 ----
function renderPaperDetail() {
  var paper = getCurrentPaper();
  if (!paper) {
    paperState().view = 'list';
    return renderPaperList();
  }

  var ps = paperState();
  var refs = recommendRefs(paper);

  var html = '' +
  '<div style="display:flex;gap:16px;align-items:flex-start;">' +
    // 左侧：论文内容
    '<div style="flex:1;min-width:0;">' +
      '<div class="card">' +
        '<div class="row" style="justify-content:space-between;align-items:center;margin-bottom:12px;">' +
          '<button class="btn btn-sm btn-ghost" onclick="backToList()">← 返回列表</button>' +
          '<div class="row" style="gap:4px;">' +
            '<button class="btn btn-sm btn-ghost" onclick="exportPaperHtml(\'' + paper.id + '\')">导出标注</button>' +
          '</div>' +
        '</div>' +
        '<div class="card-title">' + escapeHtml(paper.title) + '</div>' +
        '<div class="row" style="gap:6px;margin:8px 0 16px;">' +
          '<span class="tag-blue">' + escapeHtml(paper.fileName) + '</span>' +
          '<span class="tag-blue">' + paper.pages + ' 页</span>' +
          '<span class="tag-blue">' + (paper.paragraphs ? paper.paragraphs.length : 0) + ' 段</span>' +
          '<span class="tag-pink">' + escapeHtml(paper.createdAt) + '</span>' +
        '</div>' +
        '<div id="paper-paragraphs">';

  // 段落对照
  if (paper.paragraphs && paper.paragraphs.length > 0) {
    paper.paragraphs.forEach(function (para, idx) {
      var marks = paper.marks[idx] || { highlights: [], bolds: [] };
      var zh = translateText(para);
      html += '<div class="paper-para" data-idx="' + idx + '" style="border:1px solid #f0f0f0;border-radius:6px;padding:12px;margin-bottom:10px;" ' +
        'onmouseup="onParaSelection(' + idx + ')">' +
        '<div style="font-size:0.7em;color:#6366f1;margin-bottom:6px;">段落 ' + (idx + 1) + '</div>' +
        '<div style="color:#374151;font-size:0.9em;line-height:1.7;margin-bottom:8px;">' +
          '<span style="font-size:0.65em;color:#9ca3af;margin-right:4px;">EN</span>' +
          applyMarks(para, marks) +
        '</div>' +
        '<div style="color:#1f2937;font-size:0.9em;line-height:1.7;">' +
          '<span style="font-size:0.65em;color:#9ca3af;margin-right:4px;">中</span>' +
          applyMarks(zh, marks) +
        '</div>' +
        '<div class="row" style="gap:4px;margin-top:8px;">' +
          '<button class="btn btn-sm btn-ghost" onclick="highlightSelection(' + idx + ')">🟡 高亮选中</button>' +
          '<button class="btn btn-sm btn-ghost" onclick="boldSelection(' + idx + ')">𝐁 加粗选中</button>' +
          '<button class="btn btn-sm btn-ghost" onclick="askAboutPara(' + idx + ')">💬 AI 追问</button>' +
        '</div>';

      // 显示已有标注
      if ((marks.highlights && marks.highlights.length > 0) || (marks.bolds && marks.bolds.length > 0)) {
        html += '<div style="margin-top:8px;padding:8px;background:#f9fafb;border-radius:4px;font-size:0.8em;">';
        if (marks.highlights && marks.highlights.length > 0) {
          html += '<div style="margin-bottom:4px;"><span style="color:#ca8a04;">高亮：</span> ';
          marks.highlights.forEach(function (h, i) {
            html += '<span style="background:#fef08a;padding:1px 4px;border-radius:2px;margin:0 2px;cursor:pointer;" onclick="removeMark(\'' + paper.id + '\',' + idx + ',\'highlights\',' + i + ')" title="点击删除">「' + escapeHtml(h.text.slice(0, 30)) + (h.text.length > 30 ? '…' : '') + '」</span>';
          });
          html += '</div>';
        }
        if (marks.bolds && marks.bolds.length > 0) {
          html += '<div><span style="color:#7c3aed;">加粗：</span> ';
          marks.bolds.forEach(function (b, i) {
            html += '<span style="font-weight:700;margin:0 2px;cursor:pointer;" onclick="removeMark(\'' + paper.id + '\',' + idx + ',\'bolds\',' + i + ')" title="点击删除">「' + escapeHtml(b.text.slice(0, 30)) + (b.text.length > 30 ? '…' : '') + '」</span>';
          });
          html += '</div>';
        }
        html += '</div>';
      }

      html += '</div>';
    });
  } else {
    html += '<div class="empty" style="padding:32px;text-align:center;color:#9ca3af;">无段落内容</div>';
  }

  html += '</div>'; // #paper-paragraphs
  html += '</div>'; // card

  // 推荐文献
  html += '<div class="card" style="margin-top:16px;">' +
    '<div class="card-title" style="font-size:1em;">📚 相关文献推荐</div>' +
    '<div style="margin-top:10px;">';
  if (refs.length > 0) {
    refs.forEach(function (ref) {
      html += '<div style="padding:8px 0;border-bottom:1px solid #f0f0f0;">' +
        '<div style="font-weight:600;font-size:0.85em;color:#1f2937;">' + escapeHtml(ref.title) + '</div>' +
        '<div style="font-size:0.75em;color:#6b7280;margin-top:2px;">' + escapeHtml(ref.authors) + ' · ' + escapeHtml(ref.journal) + ' · ' + ref.year + '</div>' +
      '</div>';
    });
  } else {
    html += '<div class="empty" style="padding:16px;text-align:center;color:#9ca3af;">暂无推荐</div>';
  }
  html += '</div></div>';

  html += '</div>'; // 左侧 flex:1 结束

  // 右侧：AI Chat
  html += '<div style="width:340px;flex-shrink:0;">' +
    '<div class="card" style="position:sticky;top:16px;">' +
      '<div class="row" style="justify-content:space-between;align-items:center;margin-bottom:12px;">' +
        '<div class="card-title" style="font-size:1em;">🤖 AI 助手</div>' +
        '<button class="btn btn-sm btn-ghost" onclick="clearChat()">清空</button>' +
      '</div>' +
      '<div id="paper-chat-area" style="height:400px;overflow-y:auto;border:1px solid #e5e7eb;border-radius:6px;padding:10px;margin-bottom:10px;background:#fafafa;font-size:0.85em;line-height:1.6;">';
  html += renderChatMessages();
  html += '</div>' +
    '<textarea id="paper-chat-input" class="textarea" rows="2" placeholder="提问或追问（Enter发送，Shift+Enter换行）…" ' +
      'onkeydown="if(event.key===\'Enter\'&&!event.shiftKey){event.preventDefault();sendChat();}"></textarea>' +
    '<div class="row" style="justify-content:flex-end;margin-top:6px;">' +
      '<button class="btn btn-blue btn-sm" onclick="sendChat()">发送</button>' +
    '</div>' +
    '<div style="margin-top:10px;font-size:0.75em;color:#9ca3af;">' +
      '💡 可选中段落后点击「AI 追问」，或直接输入问题。知识库涵盖：梯度下降、注意力、强化学习、凸优化、概率论、神经网络、矩阵分解、信息论等。' +
    '</div>' +
    '</div></div>'; // card + 右侧

  html += '</div>'; // flex 容器

  return html;
}

function renderChatMessages() {
  var ps = paperState();
  if (!ps.chatHistory || ps.chatHistory.length === 0) {
    return '<div style="text-align:center;color:#9ca3af;padding:24px 8px;">向 AI 提问，或选中段落后追问</div>';
  }
  var html = '';
  ps.chatHistory.forEach(function (msg) {
    if (msg.role === 'user') {
      html += '<div style="margin-bottom:10px;text-align:right;">' +
        '<div style="display:inline-block;background:#6366f1;color:#fff;padding:6px 10px;border-radius:8px;max-width:85%;text-align:left;">' + escapeHtml(msg.content) + '</div>' +
      '</div>';
    } else {
      html += '<div style="margin-bottom:10px;">' +
        '<div style="display:inline-block;background:#fff;border:1px solid #e5e7eb;padding:6px 10px;border-radius:8px;max-width:85%;white-space:pre-wrap;">' + escapeHtml(msg.content) + '</div>' +
      '</div>';
    }
  });
  return html;
}

function renderChatArea() {
  var area = document.getElementById('paper-chat-area');
  if (area) {
    area.innerHTML = renderChatMessages();
    area.scrollTop = area.scrollHeight;
  }
}

// ---- 事件绑定 ----
function bindListEvents() {
  // 列表视图无需额外绑定（使用 onclick 内联）
}

function bindDetailEvents() {
  // 滚动聊天区到底部
  var area = document.getElementById('paper-chat-area');
  if (area) area.scrollTop = area.scrollHeight;
}

// ============================================================
// 入口
// ============================================================
// renderPaper() 为入口函数，供外部调用。
// 确保 state 已初始化：
if (typeof state !== 'undefined' && !state.paper) {
  state.paper = null; // 触发 paperState() 初始化
}

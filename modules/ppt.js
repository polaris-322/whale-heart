/* ===== PPT模板汇总模块 ===== */

function getPptFavorites(){ return DB.get('pptFavorites')||[]; }
function setPptFavorites(f){ DB.set('pptFavorites',f); }
function getPptRecent(){ return DB.get('pptRecent')||[]; }
function setPptRecent(r){ DB.set('pptRecent',r); }
function getPptDownloads(){ return DB.get('pptDownloads')||{}; }
function setPptDownloads(d){ DB.set('pptDownloads',d); }

/* ---- 模板数据 ---- */
const PPT_CATEGORIES = [
  { id:'business', name:'商业计划', icon:'💼', color:'#4A90D9' },
  { id:'education', name:'教育培训', icon:'📚', color:'#50C878' },
  { id:'summary',   name:'年终总结', icon:'📊', color:'#FF6B6B' },
  { id:'product',   name:'产品发布', icon:'🚀', color:'#9B59B6' },
  { id:'resume',    name:'个人简历', icon:'📝', color:'#F39C12' },
  { id:'defense',   name:'毕业答辩', icon:'🎓', color:'#1ABC9C' },
];

const PPT_TEMPLATES = [
  // 商业计划
  { id:'bp1', cat:'business', name:'极简商业计划书', pages:22, tags:['简约','创业'], downloads:1280, color:'#4A90D9' },
  { id:'bp2', cat:'business', name:'融资路演PPT', pages:15, tags:['融资','路演'], downloads:960, color:'#5BA0E0' },
  { id:'bp3', cat:'business', name:'市场分析报告', pages:28, tags:['市场','分析'], downloads:840, color:'#6CB0F0' },
  { id:'bp4', cat:'business', name:'创业计划书', pages:18, tags:['创业','计划'], downloads:1100, color:'#7CC0FF' },
  { id:'bp5', cat:'business', name:'商业模型画布', pages:12, tags:['模型','框架'], downloads:720, color:'#3A80C9' },
  { id:'bp6', cat:'business', name:'财务预测报告', pages:25, tags:['财务','预测'], downloads:650, color:'#2A70B9' },
  { id:'bp7', cat:'business', name:'项目可行性分析', pages:30, tags:['项目','分析'], downloads:580, color:'#1A60A9' },

  // 教育培训
  { id:'edu1', cat:'education', name:'英语课件模板', pages:20, tags:['英语','课件'], downloads:1560, color:'#50C878' },
  { id:'edu2', cat:'education', name:'数学教学PPT', pages:24, tags:['数学','教学'], downloads:1320, color:'#60D888' },
  { id:'edu3', cat:'education', name:'历史时间线', pages:16, tags:['历史','时间线'], downloads:980, color:'#70E898' },
  { id:'edu4', cat:'education', name:'科学实验演示', pages:18, tags:['科学','实验'], downloads:890, color:'#80F8A8' },
  { id:'edu5', cat:'education', name:'语文课件模板', pages:22, tags:['语文','课件'], downloads:1100, color:'#40B868' },
  { id:'edu6', cat:'education', name:'在线课程模板', pages:15, tags:['在线','课程'], downloads:760, color:'#30A858' },

  // 年终总结
  { id:'sum1', cat:'summary', name:'年度工作总结', pages:18, tags:['工作','总结'], downloads:2100, color:'#FF6B6B' },
  { id:'sum2', cat:'summary', name:'部门年终汇报', pages:20, tags:['部门','汇报'], downloads:1850, color:'#FF7B7B' },
  { id:'sum3', cat:'summary', name:'个人年终总结', pages:14, tags:['个人','总结'], downloads:1680, color:'#FF8B8B' },
  { id:'sum4', cat:'summary', name:'项目复盘报告', pages:22, tags:['项目','复盘'], downloads:1420, color:'#FF9B9B' },
  { id:'sum5', cat:'summary', name:'年度数据报告', pages:25, tags:['数据','报告'], downloads:1350, color:'#FF5B5B' },
  { id:'sum6', cat:'summary', name:'绩效考核汇报', pages:16, tags:['绩效','考核'], downloads:1200, color:'#FF4B4B' },
  { id:'sum7', cat:'summary', name:'明年规划PPT', pages:20, tags:['规划','展望'], downloads:980, color:'#FF3B3B' },

  // 产品发布
  { id:'prd1', cat:'product', name:'新品发布PPT', pages:18, tags:['新品','发布'], downloads:1650, color:'#9B59B6' },
  { id:'prd2', cat:'product', name:'产品介绍手册', pages:22, tags:['介绍','手册'], downloads:1400, color:'#AB69C6' },
  { id:'prd3', cat:'product', name:'竞品分析报告', pages:25, tags:['竞品','分析'], downloads:1250, color:'#BB79D6' },
  { id:'prd4', cat:'product', name:'产品路线图', pages:15, tags:['路线图','规划'], downloads:1080, color:'#CB89E6' },
  { id:'prd5', cat:'product', name:'用户体验报告', pages:20, tags:['体验','报告'], downloads:920, color:'#8B49A6' },
  { id:'prd6', cat:'product', name:'产品迭代展示', pages:18, tags:['迭代','展示'], downloads:860, color:'#7B3996' },

  // 个人简历
  { id:'res1', cat:'resume', name:'创意个人简历', pages:3, tags:['创意','简历'], downloads:3200, color:'#F39C12' },
  { id:'res2', cat:'resume', name:'极简简历模板', pages:2, tags:['极简','求职'], downloads:2800, color:'#F3AC22' },
  { id:'res3', cat:'resume', name:'设计师作品集', pages:8, tags:['设计','作品集'], downloads:2400, color:'#F3BC32' },
  { id:'res4', cat:'resume', name:'程序员简历', pages:3, tags:['技术','程序员'], downloads:2100, color:'#F3CC42' },
  { id:'res5', cat:'resume', name:'应届生简历', pages:2, tags:['应届','求职'], downloads:1950, color:'#E38C02' },
  { id:'res6', cat:'resume', name:'高管简历模板', pages:4, tags:['高管','管理'], downloads:1600, color:'#D37C00' },
  { id:'res7', cat:'resume', name:'英文简历模板', pages:2, tags:['英文','国际化'], downloads:1800, color:'#C36C00' },
  { id:'res8', cat:'resume', name:'新媒体运营简历', pages:3, tags:['新媒体','运营'], downloads:1500, color:'#B35C00' },

  // 毕业答辩
  { id:'def1', cat:'defense', name:'本科毕业答辩', pages:20, tags:['本科','答辩'], downloads:2800, color:'#1ABC9C' },
  { id:'def2', cat:'defense', name:'硕士论文答辩', pages:25, tags:['硕士','论文'], downloads:2500, color:'#2ACCAC' },
  { id:'def3', cat:'defense', name:'博士论文答辩', pages:30, tags:['博士','论文'], downloads:2200, color:'#3ADCBC' },
  { id:'def4', cat:'defense', name:'理工科答辩', pages:22, tags:['理工','学术'], downloads:1900, color:'#4AECCC' },
  { id:'def5', cat:'defense', name:'文科答辩模板', pages:18, tags:['文科','学术'], downloads:1600, color:'#0AAC8C' },
  { id:'def6', cat:'defense', name:'开题报告模板', pages:15, tags:['开题','报告'], downloads:1400, color:'#009C7C' },
  { id:'def7', cat:'defense', name:'医学答辩PPT', pages:24, tags:['医学','学术'], downloads:1200, color:'#008C6C' },
];

/* ---- 状态 ---- */
let pptState = {
  activeCat: 'all',
  search: '',
  viewMode: 'grid',
};

/* ---- 入口 ---- */
function renderPpt(){
  const v = document.getElementById('view-ppt');
  const favs = getPptFavorites();
  const recent = getPptRecent();
  const downloads = getPptDownloads();

  v.innerHTML = `
    <div class="hero">
      <div class="hero-inner">
        <div class="hero-text">
          <div class="hero-emoji">📽️</div>
          <div><h1>PPT模板</h1><div class="sub">精美模板 · 一键下载</div></div>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- 统计卡片 -->
      <div class="card" style="background:linear-gradient(135deg,#FFE7A8,#FFD1E8)">
        <div class="study-stats">
          <div class="ss-cell"><div class="ss-num">${PPT_TEMPLATES.length}</div><div class="ss-lab">模板总数</div></div>
          <div class="ss-divider"></div>
          <div class="ss-cell"><div class="ss-num green">${PPT_CATEGORIES.length}</div><div class="ss-lab">分类</div></div>
          <div class="ss-divider"></div>
          <div class="ss-cell"><div class="ss-num orange">${favs.length}</div><div class="ss-lab">已收藏</div></div>
        </div>
      </div>

      <!-- 搜索和分类 -->
      <div class="card">
        <div class="search-wrap">
          <div class="input-search">
            <span class="ico">🔍</span>
            <input class="input" type="text" placeholder="搜索模板名称或标签..." 
              value="${escHtml(pptState.search)}" oninput="onPptSearch(this.value)">
          </div>
        </div>
        <div class="scroll-cards" id="ppt-cat-tabs">
          ${renderPptCatTabs()}
        </div>
      </div>

      <!-- 收藏夹 -->
      ${favs.length > 0 ? `
      <div class="card" style="border-left:4px solid #FFD700">
        <div class="card-title"><span class="ico">⭐</span>我的收藏 (${favs.length})</div>
        <div class="scroll-cards">
          ${PPT_TEMPLATES.filter(t=>favs.includes(t.id)).slice(0,5).map(t=>renderPptCard(t,favs,recent,downloads)).join('')}
        </div>
        ${favs.length > 5 ? `<div style="text-align:right;margin-top:8px"><button class="btn btn-sm btn-ghost" onclick="pptState.activeCat='fav';renderPpt()">查看全部 →</button></div>` : ''}
      </div>
      ` : ''}

      <!-- 最近浏览 -->
      ${recent.length > 0 ? `
      <div class="card" style="border-left:4px solid #7B68EE">
        <div class="card-title"><span class="ico">👀</span>最近浏览</div>
        <div class="scroll-cards">
          ${recent.map(id=>{
            const t = PPT_TEMPLATES.find(x=>x.id===id);
            return t ? renderPptCard(t,favs,recent,downloads) : '';
          }).join('')}
        </div>
      </div>
      ` : ''}

      <!-- 模板列表 -->
      <div class="card">
        <div class="card-title">
          <span class="ico">📑</span>${pptState.activeCat==='all' ? '全部模板' : pptState.activeCat==='fav' ? '收藏的模板' : PPT_CATEGORIES.find(c=>c.id===pptState.activeCat).name}
          <span class="tag" style="margin-left:8px">${getFilteredTemplates().length}</span>
        </div>
        <div id="ppt-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px">
          ${renderPptGrid()}
        </div>
      </div>
    </div>
  `;
}

/* ---- 分类标签 ---- */
function renderPptCatTabs(){
  const allActive = pptState.activeCat === 'all';
  let html = `<button class="scroll-card${allActive?' active':''}" onclick="onPptCat('all')" style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:20px;border:2px solid ${allActive?'#7B68EE':'#eee'};background:${allActive?'#7B68EE15':'#fff'};color:${allActive?'#7B68EE':'#666'};cursor:pointer;font-size:14px;transition:all .2s">
    <span>🌟</span>全部
  </button>`;

  PPT_CATEGORIES.forEach(c=>{
    const active = pptState.activeCat === c.id;
    html += `<button class="scroll-card${active?' active':''}" onclick="onPptCat('${c.id}')" style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:20px;border:2px solid ${active?c.color:'#eee'};background:${active?c.color+'15':'#fff'};color:${active?c.color:'#666'};cursor:pointer;font-size:14px;transition:all .2s">
      <span>${c.icon}</span>${c.name}
    </button>`;
  });

  const favs = getPptFavorites();
  if(favs.length > 0){
    const active = pptState.activeCat === 'fav';
    html += `<button class="scroll-card${active?' active':''}" onclick="onPptCat('fav')" style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:20px;border:2px solid ${active?'#FFD700':'#eee'};background:${active?'#FFD70015':'#fff'};color:${active?'#FFD700':'#666'};cursor:pointer;font-size:14px;transition:all .2s">
      <span>⭐</span>收藏
    </button>`;
  }

  return html;
}

/* ---- 筛选 ---- */
function getFilteredTemplates(){
  let list = PPT_TEMPLATES;
  if(pptState.activeCat === 'fav'){
    const favs = getPptFavorites();
    list = list.filter(t=>favs.includes(t.id));
  } else if(pptState.activeCat !== 'all'){
    list = list.filter(t=>t.cat === pptState.activeCat);
  }
  if(pptState.search){
    const kw = pptState.search.toLowerCase();
    list = list.filter(t=>
      t.name.toLowerCase().includes(kw) ||
      t.tags.some(tag=>tag.toLowerCase().includes(kw))
    );
  }
  return list;
}

/* ---- 渲染网格 ---- */
function renderPptGrid(){
  const list = getFilteredTemplates();
  const favs = getPptFavorites();
  const recent = getPptRecent();
  const downloads = getPptDownloads();

  if(list.length === 0){
    return `<div class="empty"><span class="emoji">📭</span>没有找到匹配的模板<br>试试换个关键词吧</div>`;
  }

  return list.map(t=>renderPptCard(t,favs,recent,downloads)).join('');
}

/* ---- 渲染单个模板卡片 ---- */
function renderPptCard(t,favs,recent,downloads){
  const isFav = favs.includes(t.id);
  const dlCount = downloads[t.id] || t.downloads;
  const cat = PPT_CATEGORIES.find(c=>c.id===t.cat);
  const tagColors = ['tag-pink','tag-blue','tag-green'];
  const pagesSvg = pptCoverSvg(t, cat);

  return `
    <div class="card" style="padding:0;overflow:hidden;position:relative;transition:transform .2s,box-shadow .2s;cursor:pointer"
      onmouseenter="this.style.transform='translateY(-4px)';this.style.boxShadow='0 8px 25px rgba(0,0,0,.12)'"
      onmouseleave="this.style.transform='translateY(0)';this.style.boxShadow=''"
      onclick="onPptClick('${t.id}')">
      <!-- 封面 -->
      <div style="width:100%;aspect-ratio:16/10;background:linear-gradient(135deg,${t.color}22,${t.color}44);display:flex;align-items:center;justify-content:center;position:relative">
        ${pagesSvg}
        <!-- 收藏按钮 -->
        <button class="fav-btn" style="position:absolute;top:10px;right:10px;width:36px;height:36px;border-radius:50%;border:none;background:rgba(255,255,255,.9);cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.1);transition:all .2s"
          onclick="event.stopPropagation();onPptToggleFav('${t.id}')"
          onmouseenter="this.style.transform='scale(1.15)'"
          onmouseleave="this.style.transform='scale(1)'">
          ${isFav ? '⭐' : '☆'}
        </button>
        <!-- 分类角标 -->
        <span style="position:absolute;top:10px;left:10px;background:${cat.color};color:#fff;padding:4px 10px;border-radius:12px;font-size:12px;font-weight:600">
          ${cat.icon} ${cat.name}
        </span>
      </div>
      <!-- 信息 -->
      <div style="padding:14px 16px">
        <div style="font-weight:600;font-size:15px;margin-bottom:6px;color:#333">${t.name}</div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <span style="font-size:12px;color:#999">📄 ${t.pages}页</span>
          <span style="font-size:12px;color:#999">⬇ ${dlCount}</span>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          ${t.tags.map((tag,i)=>`<span class="${tagColors[i%3]}" style="display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px">${tag}</span>`).join('')}
        </div>
        <!-- 下载按钮 -->
        <button class="btn btn-sm btn-blue" style="margin-top:10px;width:100%"
          onclick="event.stopPropagation();onPptDownload('${t.id}')">
          ⬇ 下载模板
        </button>
      </div>
    </div>
  `;
}

/* ---- 封面SVG ---- */
function pptCoverSvg(t, cat){
  const colors = [
    { bg:'#667eea', fg:'#764ba2' },
    { bg:'#f093fb', fg:'#f5576c' },
    { bg:'#4facfe', fg:'#00f2fe' },
    { bg:'#43e97b', fg:'#38f9d7' },
    { bg:'#fa709a', fg:'#fee140' },
    { bg:'#a18cd1', fg:'#fbc2eb' },
  ];
  const c = colors[Math.abs(t.id.split('').reduce((a,b)=>a+b.charCodeAt(0),0)) % colors.length];
  return `<svg viewBox="0 0 400 250" style="width:80%;max-width:320px">
    <defs>
      <linearGradient id="g-${t.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${c.bg}"/>
        <stop offset="100%" style="stop-color:${c.fg}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="250" rx="12" fill="url(#g-${t.id})"/>
    <circle cx="320" cy="40" r="120" fill="rgba(255,255,255,.08)"/>
    <circle cx="60" cy="200" r="80" fill="rgba(255,255,255,.06)"/>
    <rect x="40" y="50" width="320" height="8" rx="4" fill="rgba(255,255,255,.3)"/>
    <rect x="40" y="70" width="200" height="8" rx="4" fill="rgba(255,255,255,.25)"/>
    <rect x="40" y="110" width="240" height="6" rx="3" fill="rgba(255,255,255,.2)"/>
    <rect x="40" y="125" width="280" height="6" rx="3" fill="rgba(255,255,255,.18)"/>
    <rect x="40" y="140" width="160" height="6" rx="3" fill="rgba(255,255,255,.15)"/>
    <rect x="40" y="180" width="100" height="30" rx="15" fill="rgba(255,255,255,.35)"/>
    <text x="200" y="230" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="12" font-family="sans-serif">PPT TEMPLATE</text>
  </svg>`;
}

/* ---- 分类切换 ---- */
function onPptCat(catId){
  pptState.activeCat = catId;
  renderPpt();
}

/* ---- 搜索 ---- */
function onPptSearch(val){
  pptState.search = val;
  renderPpt();
}

/* ---- 点击模板（记录浏览） ---- */
function onPptClick(id){
  const t = PPT_TEMPLATES.find(x=>x.id===id);
  if(!t) return;

  // 记录最近浏览
  let recent = getPptRecent().filter(x=>x!==id);
  recent.unshift(id);
  if(recent.length > 5) recent = recent.slice(0,5);
  setPptRecent(recent);

  // 显示详情弹窗
  showPptDetailModal(t);
}

/* ---- 收藏切换 ---- */
function onPptToggleFav(id){
  let favs = getPptFavorites();
  if(favs.includes(id)){
    favs = favs.filter(x=>x!==id);
    toast('已取消收藏');
  } else {
    favs.push(id);
    toast('⭐ 已加入收藏');
  }
  setPptFavorites(favs);
  renderPpt();
}

/* ---- 下载模板 ---- */
function onPptDownload(id){
  const t = PPT_TEMPLATES.find(x=>x.id===id);
  if(!t) return;

  // 更新下载计数
  const downloads = getPptDownloads();
  downloads[t.id] = (downloads[t.id] || t.downloads) + 1;
  setPptDownloads(downloads);

  // 生成HTML内容
  const html = generatePptHtml(t);

  // 触发下载
  const blob = new Blob([html], {type:'text/html;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${t.name}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  toast(`📥 ${t.name} 下载成功！`);
  renderPpt();
}

/* ---- 生成PPT HTML内容 ---- */
function generatePptHtml(t){
  const cat = PPT_CATEGORIES.find(c=>c.id===t.cat);
  const colors = ['#667eea','#764ba2','#f093fb','#f5576c','#4facfe','#00f2fe'];
  const c1 = colors[Math.floor(Math.random()*colors.length)];
  const c2 = colors[Math.floor(Math.random()*colors.length)];

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.name}</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#1a1a2e;color:#eee}
    .slide{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 40px;page-break-after:always}
    .slide:nth-child(odd){background:linear-gradient(135deg,${c1},${c2})}
    .slide:nth-child(even){background:linear-gradient(135deg,#1a1a2e,#16213e)}
    .cover h1{font-size:48px;margin-bottom:16px;text-align:center}
    .cover .sub{font-size:20px;opacity:.7}
    .cover .meta{margin-top:40px;font-size:14px;opacity:.5}
    .section h2{font-size:36px;margin-bottom:24px;text-align:center;color:#fff}
    .section ul{list-style:none;max-width:600px}
    .section li{padding:14px 20px;margin:8px 0;background:rgba(255,255,255,.08);border-radius:10px;font-size:18px;border-left:4px solid rgba(255,255,255,.3)}
    .section li::before{content:"▸ ";color:rgba(255,255,255,.5)}
    .end h2{font-size:40px;text-align:center}
    @media print{.slide{page-break-after:always}}
  </style>
</head>
<body>
  <!-- 封面 -->
  <div class="slide cover">
    <h1>${t.name}</h1>
    <div class="sub">${cat.icon} ${cat.name} · ${t.pages}页</div>
    <div class="meta">生成时间: ${new Date().toLocaleDateString('zh-CN')} | 标签: ${t.tags.join(' / ')}</div>
  </div>
  <!-- 目录 -->
  <div class="slide section">
    <h2>📋 目录</h2>
    <ul>
      <li>背景与目标</li>
      <li>核心内容</li>
      <li>数据分析</li>
      <li>方案与策略</li>
      <li>总结与展望</li>
    </ul>
  </div>
  <!-- 内容页1 -->
  <div class="slide section">
    <h2>📌 背景与目标</h2>
    <ul>
      <li>项目背景介绍</li>
      <li>市场环境分析</li>
      <li>目标与愿景</li>
      <li>关键指标</li>
    </ul>
  </div>
  <!-- 内容页2 -->
  <div class="slide section">
    <h2>📊 数据分析</h2>
    <ul>
      <li>核心数据概览</li>
      <li>趋势分析</li>
      <li>对比分析</li>
      <li>洞察与发现</li>
    </ul>
  </div>
  <!-- 内容页3 -->
  <div class="slide section">
    <h2>💡 方案与策略</h2>
    <ul>
      <li>核心方案设计</li>
      <li>执行路径规划</li>
      <li>资源配置方案</li>
      <li>风险与应对</li>
    </ul>
  </div>
  <!-- 结束页 -->
  <div class="slide end">
    <h2>感谢聆听 🙏</h2>
    <p style="margin-top:20px;opacity:.6">${t.name} · ${cat.name}模板</p>
  </div>
</body>
</html>`;
}

/* ---- 详情弹窗 ---- */
function showPptDetailModal(t){
  const cat = PPT_CATEGORIES.find(c=>c.id===t.cat);
  const favs = getPptFavorites();
  const isFav = favs.includes(t.id);
  const downloads = getPptDownloads();
  const dlCount = downloads[t.id] || t.downloads;
  const tagColors = ['tag-pink','tag-blue','tag-green'];

  showModal(`
    <div style="display:flex;gap:24px;max-width:700px">
      <!-- 左侧封面 -->
      <div style="flex-shrink:0;width:320px;aspect-ratio:16/10;background:linear-gradient(135deg,${t.color}22,${t.color}44);border-radius:16px;display:flex;align-items:center;justify-content:center">
        ${pptCoverSvg(t, cat)}
      </div>
      <!-- 右侧信息 -->
      <div style="flex:1;min-width:0">
        <h2 style="margin:0 0 4px;font-size:24px">${t.name}</h2>
        <div style="color:#999;font-size:13px;margin-bottom:12px">
          <span>${cat.icon} ${cat.name}</span>
          <span style="margin:0 8px">·</span>
          <span>📄 ${t.pages}页</span>
          <span style="margin:0 8px">·</span>
          <span>⬇ ${dlCount} 次下载</span>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px">
          ${t.tags.map((tag,i)=>`<span class="${tagColors[i%3]}" style="display:inline-block;padding:3px 10px;border-radius:12px;font-size:12px">${tag}</span>`).join('')}
        </div>
        <p style="color:#666;line-height:1.7;font-size:14px;margin-bottom:20px">
          这是一个精美的"${t.name}"PPT模板，包含${t.pages}页精心设计的幻灯片。
          适用于${cat.name}场景，帮助你快速创建专业级的演示文稿。
          模板已预设版式和配色方案，只需替换内容即可使用。
        </p>
        <div style="display:flex;gap:12px">
          <button class="btn btn-blue" style="flex:1" onclick="onPptDownload('${t.id}');closeModal()">
            ⬇ 下载模板
          </button>
          <button class="btn btn-ghost" style="border:2px solid ${isFav?'#FFD700':'#ddd'};background:${isFav?'#FFD70015':'transparent'}"
            onclick="onPptToggleFav('${t.id}')">
            ${isFav ? '⭐ 已收藏' : '☆ 收藏'}
          </button>
        </div>
      </div>
    </div>
  `);
}

/* ---- 工具函数 ---- */
function escHtml(s){
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

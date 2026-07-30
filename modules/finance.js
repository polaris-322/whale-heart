/* ===== 理财模块 ===== */

// ===== 指数配置 =====
const FIN_INDICES = [
  {key:'sh',name:'上证指数',code:'000001.SH',base:3200,type:'cn'},
  {key:'sz',name:'深证成指',code:'399001.SZ',base:10800,type:'cn'},
  {key:'cyb',name:'创业板指',code:'399006.SZ',base:2100,type:'cn'},
  {key:'kc50',name:'科创50',code:'000688.SH',base:960,type:'cn'},
  {key:'nasdaq',name:'纳斯达克',code:'IXIC',base:17500,type:'us'},
  {key:'sp500',name:'标普500',code:'SPX',base:5400,type:'us'},
];

// ===== 板块配置 =====
const FIN_SECTORS = [
  {key:'energy',name:'新能源',icon:'⚡',funds:['159857','164906','516850'],stocks:['300750','601012']},
  {key:'ai',name:'AI半导体',icon:'🧠',funds:['159825','516790','164808'],stocks:['002049','688981']},
  {key:'consume',name:'消费',icon:'🛒',funds:['159928','164906','510150'],stocks:['600519','000858']},
  {key:'pharma',name:'医药',icon:'💊',funds:['159929','164807','510060'],stocks:['300760','600276']},
  {key:'finance',name:'金融',icon:'🏦',funds:['159940','510050','164906'],stocks:['601318','600036']},
  {key:'military',name:'军工',icon:'🛡️',funds:['512810','510060','164808'],stocks:['600760','002179']},
  {key:'solar',name:'光伏',icon:'☀️',funds:['159863','516850','164906'],stocks:['601012','300274']},
  {key:'nev',name:'新能源汽车',icon:'🚗',funds:['159824','516110','164906'],stocks:['300750','002594']},
  {key:'digital',name:'数字经济',icon:'💻',funds:['159825','516790','164808'],stocks:['600588','002230']},
  {key:'soe',name:'国企改革',icon:'🏛️',funds:['159940','510050','164808'],stocks:['601857','601668']},
];

// ===== 报告时段 =====
const FIN_REPORT_TIMES = [
  {key:'morning',name:'早报',time:'09:00',icon:'🌅',label:'开盘预测'},
  {key:'noon',name:'午报',time:'12:30',icon:'☀️',label:'盘中分析'},
  {key:'evening',name:'晚报',time:'15:30',icon:'🌙',label:'收盘总结'},
];

// ===== 数据生成 =====
function finSeed(){
  const dk = getDateKey(new Date());
  let h = 0;
  for(let i=0;i<dk.length;i++) h = ((h<<5)-h)+dk.charCodeAt(i);
  return Math.abs(h);
}

function finRandom(seed, idx){
  const x = Math.sin(seed + idx*9.8) * 10000;
  return x - Math.floor(x);
}

function generateFinIndices(){
  const dk = getDateKey(new Date());
  const cached = DB.get('finIndices_'+dk);
  if(cached) return cached;
  const seed = finSeed();
  const data = FIN_INDICES.map((ind, i) => {
    const ratio = (finRandom(seed, i*2) - 0.5) * 0.04;
    const val = ind.base * (1 + ratio);
    const change = val - ind.base;
    const pct = (change / ind.base) * 100;
    return {...ind, value: +val.toFixed(2), change: +change.toFixed(2), pct: +pct.toFixed(2)};
  });
  DB.set('finIndices_'+dk, data);
  return data;
}

function generateFinSectors(){
  const dk = getDateKey(new Date());
  const cached = DB.get('finSectors_'+dk);
  if(cached) return cached;
  const seed = finSeed();
  const data = FIN_SECTORS.map((sec, i) => {
    const pct = (finRandom(seed, i*3+1) - 0.5) * 6;
    const hot = finRandom(seed, i*3+2) > 0.6;
    return {...sec, pct: +pct.toFixed(2), hot};
  });
  DB.set('finSectors_'+dk, data);
  return data;
}

function generateFinReport(type){
  const dk = getDateKey(new Date());
  const cached = DB.get('finReport_'+type+'_'+dk);
  if(cached) return cached;
  const seed = finSeed() + type.charCodeAt(0);
  const indices = generateFinIndices();
  const sectors = generateFinSectors();

  const cnUp = indices.filter(x=>x.type==='cn'&&x.pct>0).length;
  const usUp = indices.filter(x=>x.type==='us'&&x.pct>0).length;
  const cnAvg = indices.filter(x=>x.type==='cn').reduce((s,x)=>s+x.pct,0)/4;

  let overview, action, risk;
  if(type==='morning'){
    overview = cnAvg>0.5 ? '今日A股有望高开，市场情绪偏暖，可关注热门板块机会。' :
               cnAvg>-0.5 ? '今日A股预计平开，市场观望情绪浓厚，建议稳健操作。' :
               '今日A股可能低开，市场情绪偏谨慎，注意控制仓位。';
    action = cnAvg>0.5 ? '建议逢低布局新能源、AI半导体板块，适度加仓。' :
             '建议维持现有仓位，关注消费、医药防御性板块。';
    risk = '隔夜美股走势对A股开盘有影响，需注意外部风险传导。';
  } else if(type==='noon'){
    overview = cnUp>=3 ? '午间A股多数指数上行，市场做多氛围较强。' :
               cnUp>=2 ? '午间A股涨跌互现，整体偏暖。' :
               '午间A股表现偏弱，多数指数下行。';
    action = cnUp>=3 ? '午后可适当参与热点板块，但注意追高风险。' :
             '午后建议观望，等待方向明确。';
    risk = '午后资金面变化较大，警惕尾盘异动。';
  } else {
    overview = cnUp>=3 ? '今日A股收盘整体上涨，市场表现积极。' :
               cnUp>=2 ? '今日A股收盘涨跌参半，整体小幅波动。' :
               '今日A股收盘偏弱，多数指数下跌。';
    action = cnUp>=3 ? '明日可继续关注强势板块，注意获利回吐风险。' :
             '明日建议观望为主，等待市场方向。';
    risk = '收盘后需关注晚间美股走势和政策消息面。';
  }

  const upSectors = sectors.filter(s=>s.pct>0).slice(0,3).map(s=>s.name+' +'+s.pct+'%');
  const downSectors = sectors.filter(s=>s.pct<0).slice(0,3).map(s=>s.name+' '+s.pct+'%');

  const report = {
    type, dk,
    overview, action, risk,
    upSectors, downSectors,
    cnAvg: +cnAvg.toFixed(2),
    usAvg: +(indices.filter(x=>x.type==='us').reduce((s,x)=>s+x.pct,0)/2).toFixed(2),
    generatedAt: new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'}),
  };
  DB.set('finReport_'+type+'_'+dk, report);
  return report;
}

// ===== 持仓管理 =====
function getFinPortfolio(){ return DB.get('finPortfolio')||[]; }
function setFinPortfolio(p){ DB.set('finPortfolio',p); }

function addFinPosition(){
  const code = val('fin-code').trim().toUpperCase();
  const name = val('fin-name').trim();
  const price = +val('fin-price');
  const qty = +val('fin-qty');
  if(!code){toast('请输入代码');return;}
  if(!price||price<=0){toast('请输入买入价格');return;}
  if(!qty||qty<=0){toast('请输入数量');return;}
  const portfolio = getFinPortfolio();
  const existing = portfolio.find(p=>p.code===code);
  if(existing){
    const totalCost = existing.avgPrice * existing.qty + price * qty;
    const totalQty = existing.qty + qty;
    existing.avgPrice = +(totalCost / totalQty).toFixed(2);
    existing.qty = totalQty;
    existing.lastPrice = price;
  } else {
    portfolio.push({code, name: name||code, avgPrice: price, qty, lastPrice: price, date: getDateKey(new Date())});
  }
  setFinPortfolio(portfolio);
  closeModal();
  renderFinance();
  toast('持仓已更新 📈');
}

function adjustFinPosition(idx, delta){
  const portfolio = getFinPortfolio();
  const pos = portfolio[idx];
  if(!pos) return;
  const qty = Math.min(Math.abs(delta), pos.qty);
  if(delta<0){
    pos.qty -= qty;
    if(pos.qty<=0){
      portfolio.splice(idx,1);
      toast('已清仓 '+pos.code);
    } else {
      toast('减仓 '+qty+'份 '+pos.code);
    }
  } else {
    pos.qty += qty;
    pos.lastPrice = pos.avgPrice;
    toast('加仓 '+qty+'份 '+pos.code);
  }
  setFinPortfolio(portfolio);
  renderFinance();
}

function removeFinPosition(idx){
  if(!confirm('确认删除此持仓？')) return;
  const portfolio = getFinPortfolio();
  portfolio.splice(idx,1);
  setFinPortfolio(portfolio);
  renderFinance();
}

function computeFinPortfolioValue(){
  const portfolio = getFinPortfolio();
  const indices = generateFinIndices();
  const seed = finSeed();
  let totalCost = 0, totalValue = 0;
  portfolio.forEach((pos, i) => {
    totalCost += pos.avgPrice * pos.qty;
    const fluctuation = (finRandom(seed, i*7+100) - 0.5) * 0.06;
    const curPrice = pos.avgPrice * (1 + fluctuation);
    pos.curPrice = +curPrice.toFixed(2);
    pos.curPct = +((curPrice - pos.avgPrice) / pos.avgPrice * 100).toFixed(2);
    totalValue += curPrice * pos.qty;
  });
  return {totalCost, totalValue, profit: totalValue - totalCost, profitPct: totalCost>0?(totalValue-totalCost)/totalCost*100:0};
}

// ===== 预测成绩 =====
function getFinPrediction(){ return DB.get('finPrediction')||{correct:0,total:0,details:{}}; }
function setFinPrediction(p){ DB.set('finPrediction',p); }

function updateFinPrediction(){
  const dk = getDateKey(new Date());
  const pred = getFinPrediction();
  if(pred.details[dk]) return pred;
  const morningReport = generateFinReport('morning');
  const indices = generateFinIndices();
  const cnAvg = indices.filter(x=>x.type==='cn').reduce((s,x)=>s+x.pct,0)/4;
  const predicted = morningReport.cnAvg;
  const correct = Math.abs(predicted - cnAvg) < 0.5;
  pred.total++;
  if(correct) pred.correct++;
  pred.details[dk] = {predicted: predicted, actual: cnAvg, correct};
  setFinPrediction(pred);
  return pred;
}

// ===== 收盘提醒 =====
function getFinAlert(){ return DB.get('finAlert_'+getDateKey(new Date())); }
function setFinAlert(a){ DB.set('finAlert_'+getDateKey(new Date()),a); }

function generateFinAlert(){
  const dk = getDateKey(new Date());
  const cached = DB.get('finAlert_'+dk);
  if(cached) return cached;
  const {totalCost, totalValue, profitPct} = computeFinPortfolioValue();
  const indices = generateFinIndices();
  const cnAvg = indices.filter(x=>x.type==='cn').reduce((s,x)=>s+x.pct,0)/4;

  let suggestion;
  if(cnAvg > 1 && profitPct < 0){
    suggestion = '市场走强但持仓亏损，建议适度加仓低位品种。';
  } else if(cnAvg < -1 && profitPct < -3){
    suggestion = '市场走弱且持仓亏损较大，建议减仓止损。';
  } else if(cnAvg > 0.5 && profitPct > 2){
    suggestion = '市场偏暖、持仓盈利，可继续持有或适度获利减仓。';
  } else {
    suggestion = '市场波动不大，建议维持现有仓位观望。';
  }

  const alert = {suggestion, cnAvg: +cnAvg.toFixed(2), profitPct: +profitPct.toFixed(2), time:'15:00'};
  DB.set('finAlert_'+dk, alert);
  return alert;
}

function showFinAlertModal(){
  const alert = generateFinAlert();
  const portfolio = getFinPortfolio();
  const {profitPct} = computeFinPortfolioValue();
  showModal(`
    <div class="modal-header">
      <div class="modal-title">🔔 收盘前提醒 (15:00)</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div style="background:linear-gradient(135deg,var(--primary-light),var(--secondary-light));padding:12px;border-radius:var(--radius-sm);margin-bottom:10px">
      <div style="font-size:12px;font-weight:700;color:var(--primary-deep)">💡 操作建议</div>
      <div style="font-size:13px;margin-top:6px">${alert.suggestion}</div>
    </div>
    <div style="font-size:12px;margin-bottom:8px">
      <span class="tag-blue">市场 ${alert.cnAvg>0?'↑':'↓'} ${alert.cnAvg}%</span>
      <span class="tag-${profitPct>=0?'green':'orange'}" style="margin-left:4px">持仓 ${profitPct>=0?'↑':'↓'} ${profitPct.toFixed(2)}%</span>
    </div>
    ${portfolio.length>0 ? `
      <div style="font-size:11px;color:var(--text-light);margin-bottom:6px">持仓明细</div>
      ${portfolio.map((pos,i)=>`
        <div class="row" style="margin-bottom:6px;align-items:center">
          <div style="flex:2;font-weight:600;font-size:12px">${pos.code} ${pos.name}</div>
          <div style="flex:1;text-align:right;font-size:11px" class="${pos.curPct>=0?'tag-green':'tag-orange'}">${pos.curPct>=0?'+':''}${pos.curPct}%</div>
          <button class="btn btn-sm btn-ghost" onclick="adjustFinPosition(${i},10);closeModal()">加仓</button>
          <button class="btn btn-sm btn-ghost" onclick="adjustFinPosition(${i},-10);closeModal()">减仓</button>
        </div>
      `).join('')}
    ` : '<div class="empty"><span class="emoji">📊</span>暂无持仓</div>'}
    <div style="font-size:10px;color:var(--text-faint);text-align:center;margin-top:8px">⚠️ 以上为模拟数据建议，仅供参考，不构成投资建议</div>
  `);
}

// ===== 持仓模态框 =====
function showFinPositionModal(){
  showModal(`
    <div class="modal-header">
      <div class="modal-title">➕ 添加持仓</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="field"><label>代码</label><input class="input" id="fin-code" placeholder="如 300750 或 510050"></div>
    <div class="field"><label>名称（可选）</label><input class="input" id="fin-name" placeholder="如 宁德时代 或 沪深300ETF"></div>
    <div class="field"><label>买入价格</label><input class="input" id="fin-price" type="number" inputmode="decimal" placeholder="0.00"></div>
    <div class="field"><label>数量/份额</label><input class="input" id="fin-qty" type="number" inputmode="numeric" placeholder="100"></div>
    <button class="btn" style="width:100%;justify-content:center;padding:12px;margin-top:6px" onclick="addFinPosition()">确认添加</button>
    <div style="font-size:10px;color:var(--text-faint);text-align:center;margin-top:8px">支持股票代码和基金代码</div>
  `);
}

function showFinAdjustModal(idx){
  const portfolio = getFinPortfolio();
  const pos = portfolio[idx];
  if(!pos) return;
  showModal(`
    <div class="modal-header">
      <div class="modal-title">⚙️ 调仓 - ${pos.code}</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div style="background:var(--primary-light);padding:10px;border-radius:var(--radius-sm);margin-bottom:10px;text-align:center">
      <div style="font-size:14px;font-weight:700">${pos.name} (${pos.code})</div>
      <div style="font-size:11px;color:var(--text-light)">持仓 ${pos.qty} 份 · 成本价 ${pos.avgPrice}</div>
    </div>
    <div class="field"><label>加仓数量</label>
      <div class="row">
        <input class="input" id="fin-adj-qty" type="number" inputmode="numeric" placeholder="数量" value="10">
        <button class="btn btn-sm" onclick="adjustFinPosition(${idx},+val('fin-adj-qty'));closeModal()">加仓</button>
      </div>
    </div>
    <div class="field"><label>减仓数量</label>
      <div class="row">
        <input class="input" id="fin-red-qty" type="number" inputmode="numeric" placeholder="数量" value="10">
        <button class="btn btn-sm btn-ghost" style="color:var(--red)" onclick="adjustFinPosition(${idx},-val('fin-red-qty'));closeModal()">减仓</button>
      </div>
    </div>
    <button class="btn btn-sm btn-ghost" style="width:100%;justify-content:center;color:var(--red);margin-top:4px" onclick="removeFinPosition(${idx});closeModal()">清仓删除</button>
  `);
}

// ===== 报告详情模态框 =====
function showFinReportDetail(type){
  const report = generateFinReport(type);
  const typeInfo = FIN_REPORT_TIMES.find(t=>t.key===type);
  showModal(`
    <div class="modal-header">
      <div class="modal-title">${typeInfo.icon} ${typeInfo.name}详情 - ${typeInfo.label}</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div style="background:linear-gradient(135deg,var(--primary-light),var(--secondary-light));padding:12px;border-radius:var(--radius-sm);margin-bottom:10px">
      <div style="font-size:11px;color:var(--text-light)">生成时间 ${report.generatedAt}</div>
      <div style="font-size:13px;font-weight:600;margin-top:6px">${report.overview}</div>
    </div>
    <div class="card-title" style="margin-bottom:6px"><span class="ico">📊</span>市场概况</div>
    <div class="stat-row">
      <div class="stat-cell"><div class="stat-num ${report.cnAvg>=0?'green':'stat-num'}">${report.cnAvg>=0?'+':''}${report.cnAvg}%</div><div class="stat-lab">A股平均</div></div>
      <div class="stat-cell"><div class="stat-num ${report.usAvg>=0?'blue':'stat-num'}">${report.usAvg>=0?'+':''}${report.usAvg}%</div><div class="stat-lab">美股平均</div></div>
    </div>
    <div class="card-title" style="margin-top:10px;margin-bottom:6px"><span class="ico">🔥</span>板块涨跌</div>
    ${report.upSectors.length>0 ? `<div style="font-size:12px;color:var(--success);margin-bottom:4px">领涨：${report.upSectors.join(' · ')}</div>` : ''}
    ${report.downSectors.length>0 ? `<div style="font-size:12px;color:#E87830;margin-bottom:4px">领跌：${report.downSectors.join(' · ')}</div>` : ''}
    <div class="card-title" style="margin-top:10px;margin-bottom:6px"><span class="ico">💡</span>推荐操作</div>
    <div style="font-size:12px;margin-bottom:8px">${report.action}</div>
    <div class="card-title" style="margin-top:10px;margin-bottom:6px"><span class="ico">⚠️</span>风险提示</div>
    <div style="font-size:12px;color:var(--text-light)">${report.risk}</div>
    <div style="font-size:10px;color:var(--text-faint);text-align:center;margin-top:10px">以上为模拟数据，仅供参考，不构成投资建议</div>
  `);
}

// ===== 入口渲染 =====
function renderFinance(){
  const v = document.getElementById('view-finance');
  const indices = generateFinIndices();
  const sectors = generateFinSectors();
  const portfolio = getFinPortfolio();
  const {totalCost, totalValue, profit, profitPct} = computeFinPortfolioValue();
  const pred = updateFinPrediction();
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const currentTime = h*100+m;
  const alert = generateFinAlert();

  // Determine which reports are available
  const morningAvailable = currentTime >= 900;
  const noonAvailable = currentTime >= 1230;
  const eveningAvailable = currentTime >= 1530;

  v.innerHTML = `
    <div class="hero">
      <div class="hero-inner">
        <div class="hero-text">
          <div class="hero-emoji">📈</div>
          <div><h1>理财助手</h1><div class="sub">${getDateKey(now)} 实时行情</div></div>
        </div>
        <button class="btn btn-sm" onclick="showFinAlertModal()">🔔 提醒</button>
      </div>
    </div>
    <div class="content">

      <!-- 市场指数 -->
      <div class="card">
        <div class="card-title"><span class="ico">📊</span>市场指数<span class="tag" style="margin-left:auto">模拟数据</span></div>
        <div class="fin-indices">
          ${indices.map(ind => `
            <div class="fin-index-item ${ind.type}">
              <div class="fin-index-name">${ind.name}</div>
              <div class="fin-index-val">${ind.value.toLocaleString()}</div>
              <div class="fin-index-chg ${ind.pct>=0?'up':'down'}">${ind.pct>=0?'↑':'↓'} ${ind.pct>=0?'+'+ind.pct:ind.pct}%</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 板块与基金推荐 -->
      <div class="card">
        <div class="card-title"><span class="ico">🔥</span>热门板块 & 推荐</div>
        <div class="scroll-cards">
          ${sectors.map(sec => `
            <div class="scroll-card">
              <div class="card" style="padding:10px;margin-bottom:0">
                <div class="fin-sector-header">
                  <span>${sec.icon} ${sec.name}</span>
                  <span class="${sec.pct>=0?'tag-green':'tag-orange'}">${sec.pct>=0?'+'+sec.pct:sec.pct}%</span>
                  ${sec.hot?'<span class="tag-pink" style="margin-left:2px">热</span>':''}
                </div>
                <div style="font-size:10px;color:var(--text-light);margin-top:4px">基金</div>
                <div style="font-size:11px;margin-top:2px">${sec.funds.map(f=>'<span class="tag-blue" style="margin:1px">'+f+'</span>').join(' ')}</div>
                <div style="font-size:10px;color:var(--text-light);margin-top:4px">股票</div>
                <div style="font-size:11px;margin-top:2px">${sec.stocks.map(s=>'<span class="tag-pink" style="margin:1px">'+s+'</span>').join(' ')}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 早中晚报 -->
      <div class="card">
        <div class="card-title"><span class="ico">📰</span>每日三报</div>
        <div class="fin-reports">
          ${FIN_REPORT_TIMES.map(rt => {
            const available = rt.key==='morning'?morningAvailable:rt.key==='noon'?noonAvailable:eveningAvailable;
            const report = available ? generateFinReport(rt.key) : null;
            return `
              <div class="fin-report-item ${available?'available':'pending'}" onclick="${available?'showFinReportDetail(\''+rt.key+'\')':''}">
                <div class="fin-report-ico">${rt.icon}</div>
                <div class="fin-report-body">
                  <div class="fin-report-name">${rt.name} · ${rt.label}</div>
                  <div class="fin-report-time">${rt.time} · ${available?report.generatedAt+'已生成':'等待生成'}</div>
                </div>
                ${available?'<div class="fin-report-arrow">›</div>':''}
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- 持仓管理 -->
      <div class="card">
        <div class="card-title">
          <span class="ico">💼</span>持仓管理
          <button class="btn btn-sm" style="margin-left:auto" onclick="showFinPositionModal()">+ 添加</button>
        </div>
        ${portfolio.length===0 ? `<div class="empty"><span class="emoji">📊</span>暂无持仓，点击添加</div>` : `
          <div style="background:linear-gradient(135deg,var(--primary-light),var(--secondary-light));padding:10px;border-radius:var(--radius-sm);margin-bottom:8px">
            <div class="stat-row">
              <div class="stat-cell"><div class="stat-num">¥${totalValue.toFixed(2)}</div><div class="stat-lab">市值</div></div>
              <div class="stat-cell"><div class="stat-num ${profit>=0?'green':''}">${profit>=0?'+'+profit.toFixed(2):profit.toFixed(2)}</div><div class="stat-lab">盈亏</div></div>
              <div class="stat-cell"><div class="stat-num ${profitPct>=0?'green':''}">${profitPct>=0?'+'+profitPct.toFixed(2):profitPct.toFixed(2)}%</div><div class="stat-lab">收益率</div></div>
            </div>
          </div>
          <div class="fin-portfolio-list">
            ${portfolio.map((pos,i) => `
              <div class="fin-portfolio-item" onclick="showFinAdjustModal(${i})">
                <div class="fin-portfolio-code">${pos.code}</div>
                <div class="fin-portfolio-name">${pos.name}</div>
                <div class="fin-portfolio-detail">${pos.qty}份 · 成本${pos.avgPrice} · 现${pos.curPrice}</div>
                <div class="fin-portfolio-pct ${pos.curPct>=0?'up':'down'}">${pos.curPct>=0?'+':''}${pos.curPct}%</div>
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <!-- 收盘前提醒 -->
      <div class="card">
        <div class="card-title"><span class="ico">🔔</span>收盘前提醒 (15:00)</div>
        <div style="background:rgba(255,180,138,.15);padding:10px;border-radius:var(--radius-sm)">
          <div style="font-size:12px;font-weight:600;color:#E87830">💡 ${alert.suggestion}</div>
          <div style="font-size:11px;color:var(--text-light);margin-top:4px">
            <span class="tag-blue">市场 ${alert.cnAvg>0?'↑':'↓'} ${alert.cnAvg}%</span>
            <span class="tag-${alert.profitPct>=0?'green':'orange'}" style="margin-left:4px">持仓 ${alert.profitPct>=0?'↑':'↓'} ${alert.profitPct.toFixed(2)}%</span>
          </div>
        </div>
        <div style="font-size:10px;color:var(--text-faint);text-align:center;margin-top:6px">⚠️ 模拟数据建议，仅供参考</div>
      </div>

      <!-- 预测成绩 -->
      <div class="card">
        <div class="card-title"><span class="ico">🏆</span>预测成绩</div>
        <div class="stat-row">
          <div class="stat-cell"><div class="stat-num">${pred.total}</div><div class="stat-lab">总预测</div></div>
          <div class="stat-cell"><div class="stat-num green">${pred.correct}</div><div class="stat-lab">准确次数</div></div>
          <div class="stat-cell"><div class="stat-num">${pred.total>0?(pred.correct/pred.total*100).toFixed(1):0}%</div><div class="stat-lab">准确率</div></div>
        </div>
        ${pred.total>0 ? `
          <div class="progress" style="margin-top:8px">
            <div class="progress-bar" style="width:${(pred.correct/pred.total*100).toFixed(1)}%;background:linear-gradient(90deg,var(--green),var(--success))"></div>
          </div>
          <div style="font-size:10px;color:var(--text-light);text-align:center;margin-top:4px">
            每日早报预测与实际收盘对比，偏差<0.5%计为准确
          </div>
        ` : '<div class="empty" style="padding:12px"><span class="emoji">📊</span>首个交易日结束后开始记录</div>'}
      </div>

    </div>
  `;

  // Auto-show alert at ~15:00
  if(currentTime>=1500 && currentTime<1510 && !DB.get('finAlertShown_'+getDateKey(now))){
    DB.set('finAlertShown_'+getDateKey(now),true);
    setTimeout(()=>showFinAlertModal(),500);
  }
}

/* ===== 数据分析模块 ===== */

// 短视频爆款逻辑分析规则
const ANALYSIS_RULES = [
  {metric:'完播率', threshold:30, level:'low', desc:'完播率偏低', advice:'优化前3秒前置内容，抛出钩子吸引用户。可在开头设置悬念、冲突或强痛点，例如\"这个我后悔没早买\"\"千万别这样\"等话术'},
  {metric:'完播率', threshold:50, level:'mid', desc:'完播率一般', advice:'中段可能流失用户，建议在视频中间设置第二个爆点或反转，保持节奏感'},
  {metric:'完播率', threshold:100, level:'good', desc:'完播率优秀', advice:'保持现有节奏，可尝试加长视频深度内容'},
  {metric:'封面点击率', threshold:5, level:'low', desc:'封面点击率低', advice:'优化封面：使用高对比色、大字标题、人物表情、数字或价格冲击。建议封面文字不超过8个字'},
  {metric:'封面点击率', threshold:10, level:'mid', desc:'封面点击率一般', advice:'可尝试A/B测试不同封面风格，突出痛点或好奇心'},
  {metric:'点赞率', threshold:3, level:'low', desc:'点赞率偏低', advice:'内容情感价值或实用价值不够。可在结尾加入\"觉得有用记得点赞\"的引导，或增强内容的可收藏性'},
  {metric:'转发率', threshold:1, level:'low', desc:'转发率偏低', advice:'内容缺少社交货币属性。可加入\"分享给闺蜜\"\"@你的姐妹\"等社交触发点，或制作更有话题性的内容'},
  {metric:'评论率', threshold:0.5, level:'low', desc:'评论率偏低', advice:'可在结尾抛出开放式问题，例如\"你们觉得哪个最好用\"\"评论区聊聊\"，主动制造互动话题'},
  {metric:'收藏率', threshold:2, level:'low', desc:'收藏率偏低', advice:'内容缺少实用价值或可保存性。清单类、教程类、好物推荐类内容天然高收藏，可增加这类结构'}
];

function getAnalysisList(){ return DB.get('analysis')||[]; }
function saveAnalysis(list){ DB.set('analysis',list); }

function renderAnalysis(){
  const v = document.getElementById('view-analysis');
  const list = getAnalysisList();
  v.innerHTML = `
    <div class="hero">
      <div class="hero-inner">
        <div class="hero-text">
          <div class="hero-emoji">📊</div>
          <div><h1>数据分析</h1><div class="sub">录入作品数据 · 自动诊断爆款逻辑</div></div>
        </div>
        <button class="btn" onclick="showAnalysisModal()">+ 录入</button>
      </div>
    </div>
    <div class="content">
      ${list.length===0 ? `
        <div class="card"><div class="empty"><span class="emoji">📝</span>还没有作品数据<br>点击右上角"录入"开始记录吧</div></div>
      ` : list.map((a,i)=>renderAnalysisCard(a,i)).join('')}
    </div>
  `;
}

function renderAnalysisCard(a,i){
  const diagnosis = analyzeData(a);
  const date = new Date(a.timestamp);
  return `
    <div class="card ${i%2?'card-blue':''}">
      <div class="card-title">
        <span class="ico">📈</span>${a.title||'作品#'+(i+1)}
        <span class="tag">${date.getMonth()+1}/${date.getDate()}</span>
        <button class="btn btn-sm btn-ghost" style="margin-left:8px" onclick="deleteAnalysis(${i})">删除</button>
      </div>
      <div class="data-grid">
        ${renderMetric('播放量',a.views,'👁')}
        ${renderMetric('点赞',a.likes,'❤️',a.views)}
        ${renderMetric('转发',a.shares,'🔁',a.views)}
        ${renderMetric('评论',a.comments,'💬',a.views)}
        ${renderMetric('收藏',a.favorites,'⭐',a.views)}
        ${renderMetric('完播率',a.completion+'%','🎬')}
        ${renderMetric('封面点击率',a.ctr+'%','🖼')}
      </div>
      <div class="traffic-source">流量来源：${a.traffic||'—'}</div>
      ${diagnosis.length ? `
        <div class="diagnosis">
          <div class="diag-title">🔍 爆款逻辑诊断</div>
          ${diagnosis.map(d=>`
            <div class="diag-item ${d.level}">
              <div class="diag-head"><span class="diag-emoji">${d.level==='low'?'⚠️':d.level==='mid'?'💡':'✨'}</span>${d.desc}</div>
              <div class="diag-advice">${d.advice}</div>
            </div>
          `).join('')}
        </div>
      ` : '<div class="diagnosis"><div class="diag-title">✨ 数据表现优秀</div><div class="diag-advice">各项指标良好，继续保持！</div></div>'}
    </div>
  `;
}

function renderMetric(label,value,icon,total){
  let rate = '';
  if(total && value) rate = ` <span class="rate">(${(value/total*100).toFixed(1)}%)</span>`;
  return `<div class="metric-cell"><div class="metric-lab">${icon} ${label}</div><div class="metric-val">${value||0}${rate}</div></div>`;
}

function analyzeData(a){
  const result = [];
  if(a.views>0){
    const likeRate = a.likes/a.views*100;
    const shareRate = a.shares/a.views*100;
    const commentRate = a.comments/a.views*100;
    const favRate = a.favorites/a.views*100;
    if(a.completion < 30) result.push(ANALYSIS_RULES[0]);
    else if(a.completion < 50) result.push(ANALYSIS_RULES[1]);
    if(a.ctr && a.ctr < 5) result.push(ANALYSIS_RULES[3]);
    else if(a.ctr && a.ctr < 10) result.push(ANALYSIS_RULES[4]);
    if(likeRate < 3) result.push(ANALYSIS_RULES[5]);
    if(shareRate < 1) result.push(ANALYSIS_RULES[6]);
    if(commentRate < 0.5) result.push(ANALYSIS_RULES[7]);
    if(favRate < 2) result.push(ANALYSIS_RULES[8]);
  }
  return result;
}

function showAnalysisModal(idx){
  const list = getAnalysisList();
  const a = idx!=null ? list[idx] : {};
  showModal(`
    <div class="modal-header">
      <div class="modal-title">${idx!=null?'编辑作品':'录入作品数据'}</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="field"><label>作品标题</label><input class="input" id="a-title" placeholder="例如：50元平价好物分享" value="${a.title||''}"></div>
    <div class="row">
      <div class="field"><label>播放量</label><input class="input" id="a-views" type="number" inputmode="numeric" placeholder="0" value="${a.views||''}"></div>
      <div class="field"><label>点赞</label><input class="input" id="a-likes" type="number" inputmode="numeric" placeholder="0" value="${a.likes||''}"></div>
    </div>
    <div class="row">
      <div class="field"><label>转发</label><input class="input" id="a-shares" type="number" inputmode="numeric" placeholder="0" value="${a.shares||''}"></div>
      <div class="field"><label>评论</label><input class="input" id="a-comments" type="number" inputmode="numeric" placeholder="0" value="${a.comments||''}"></div>
    </div>
    <div class="row">
      <div class="field"><label>收藏</label><input class="input" id="a-favorites" type="number" inputmode="numeric" placeholder="0" value="${a.favorites||''}"></div>
      <div class="field"><label>完播率(%)</label><input class="input" id="a-completion" type="number" inputmode="decimal" placeholder="0-100" value="${a.completion||''}"></div>
    </div>
    <div class="row">
      <div class="field"><label>封面点击率(%)</label><input class="input" id="a-ctr" type="number" inputmode="decimal" placeholder="0-100" value="${a.ctr||''}"></div>
      <div class="field"><label>流量来源</label>
        <select class="select" id="a-traffic">
          <option value="">请选择</option>
          <option ${a.traffic==='推荐页'?'selected':''}>推荐页</option>
          <option ${a.traffic==='关注页'?'selected':''}>关注页</option>
          <option ${a.traffic==='搜索'?'selected':''}>搜索</option>
          <option ${a.traffic==='同城'?'selected':''}>同城</option>
          <option ${a.traffic==='个人主页'?'selected':''}>个人主页</option>
          <option ${a.traffic==='其他'?'selected':''}>其他</option>
        </select>
      </div>
    </div>
    <button class="btn" style="width:100%;justify-content:center;padding:12px;margin-top:6px" onclick="saveAnalysisForm(${idx!=null?idx:-1})">保存分析</button>
  `);
}

function saveAnalysisForm(idx){
  const data = {
    title: val('a-title'),
    views: +val('a-views')||0,
    likes: +val('a-likes')||0,
    shares: +val('a-shares')||0,
    comments: +val('a-comments')||0,
    favorites: +val('a-favorites')||0,
    completion: +val('a-completion')||0,
    ctr: +val('a-ctr')||0,
    traffic: val('a-traffic'),
    timestamp: Date.now()
  };
  const list = getAnalysisList();
  if(idx>=0) list[idx] = data; else list.unshift(data);
  saveAnalysis(list);
  closeModal();
  renderAnalysis();
  toast('作品数据已保存 📊');
}

function deleteAnalysis(i){
  if(!confirm('删除这条作品数据？')) return;
  const list = getAnalysisList();
  list.splice(i,1);
  saveAnalysis(list);
  renderAnalysis();
  toast('已删除');
}

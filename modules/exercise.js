/* ===== 运动打卡模块 ===== */

/* 注入本模块专属样式（热力图、训练卡片等），避免污染全局 style.css */
function injectExerciseStyle(){
  if(document.getElementById('ex-style')) return;
  const s = document.createElement('style');
  s.id = 'ex-style';
  s.textContent = `
    .ex-topbar{display:flex;align-items:center;gap:8px;padding:14px 14px 6px}
    .ex-topbar h1{font-size:16px;font-weight:800;color:var(--primary-deep);white-space:nowrap}
    .ex-topbar .search-wrap{flex:1}
    .ex-sync-btn{width:36px;height:36px;border-radius:50%;background:#fff;box-shadow:0 2px 8px rgba(168,224,160,.4);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;transition:transform .3s}
    .ex-sync-btn:active{transform:rotate(180deg)}
    .ex-streak-banner{margin:0 14px 12px;background:linear-gradient(135deg,var(--green),#5BA050);border-radius:var(--radius);padding:14px 16px;display:flex;align-items:center;gap:12px;box-shadow:0 8px 24px rgba(168,224,160,.4);color:#fff}
    .ex-streak-emoji{font-size:30px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.15))}
    .ex-streak-num{font-size:26px;font-weight:800;line-height:1}
    .ex-streak-lab{font-size:11px;opacity:.9;margin-top:2px}
    .ex-streak-today{margin-left:auto;font-size:11px;background:rgba(255,255,255,.25);padding:5px 10px;border-radius:14px;text-align:right}
    .ex-plan-card{min-width:270px;max-width:300px;scroll-snap-align:start;flex-shrink:0;background:#fff;border-radius:var(--radius);padding:14px;box-shadow:var(--shadow);display:flex;flex-direction:column;gap:8px}
    .ex-plan-head{display:flex;align-items:flex-start;gap:8px}
    .ex-plan-title{font-size:14px;font-weight:700;color:var(--text);flex:1;line-height:1.4}
    .ex-plan-tag-row{display:flex;gap:5px;flex-wrap:wrap}
    .ex-plan-detail{font-size:11px;color:var(--text-light);line-height:1.6;white-space:pre-line;background:rgba(168,224,160,.08);border-radius:10px;padding:8px 10px;max-height:100px;overflow-y:auto}
    .ex-plan-tip{font-size:11px;color:#E87830;background:rgba(255,180,138,.12);border-radius:10px;padding:7px 10px;display:flex;gap:5px;align-items:flex-start}
    .ex-plan-tip .ico{flex-shrink:0}
    .ex-plan-actions{display:flex;align-items:center;gap:8px}
    .ex-plan-actions .btn-green{flex:1;justify-content:center;padding:9px}
    .ex-plan-foot-tags{display:flex;gap:5px;flex-wrap:wrap;border-top:1px solid rgba(168,224,160,.2);padding-top:8px}
    .ex-cats-row{display:flex;gap:7px;flex-wrap:wrap}
    .ex-cat-chip{font-size:11px;background:rgba(168,224,160,.15);color:var(--success);padding:5px 11px;border-radius:14px;font-weight:600;display:flex;align-items:center;gap:3px}
    .ex-cat-chip .del{margin-left:3px;opacity:.5;font-size:13px;cursor:pointer}
    .ex-cat-chip .del:hover{opacity:1}
    /* 热力图 */
    .heatmap-wrap{margin-top:4px}
    .heatmap-row{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}
    .hm-cell{aspect-ratio:1;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--text-light);background:rgba(168,224,160,.1);cursor:pointer;transition:transform .15s}
    .hm-cell:active{transform:scale(.9)}
    .hm-cell.hm-empty{background:transparent;cursor:default}
    .hm-cell.hm-today{outline:2px solid var(--primary);outline-offset:1px}
    .hm-w0{background:rgba(168,224,160,.12)}
    .hm-w1{background:rgba(168,224,160,.4);color:#fff}
    .hm-w2{background:rgba(168,224,160,.65);color:#fff}
    .hm-w3{background:rgba(168,224,160,.85);color:#fff}
    .hm-w4{background:#5BA050;color:#fff}
    .hm-labels{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-top:5px}
    .hm-labels span{text-align:center;font-size:9px;color:var(--text-faint)}
    .heatmap-month{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}
    .hm-legend{display:flex;align-items:center;gap:4px;justify-content:flex-end;margin-top:8px;font-size:9px;color:var(--text-faint)}
    .hm-legend .hm-cell{width:14px;height:14px;aspect-ratio:unset;border-radius:4px;font-size:0}
    .heatmap-year{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
    .hm-month{}
    .hm-month-lab{font-size:10px;color:var(--text-light);font-weight:600;margin-bottom:4px}
    .hm-month-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px}
    .hm-cell-sm{aspect-ratio:1;border-radius:3px;background:rgba(168,224,160,.12);cursor:pointer}
    .vp-btn{padding:3px 10px;font-size:10px;border-radius:8px;background:rgba(255,158,199,.1);color:var(--text-light);font-weight:600;transition:all .2s}
    .vp-btn.active{background:linear-gradient(135deg,var(--primary),var(--primary-deep));color:#fff}
    .view-pick{display:flex;gap:4px}
    .ex-list{display:flex;flex-direction:column;gap:8px}
    .ex-item{display:flex;align-items:center;gap:10px;padding:8px;background:rgba(168,224,160,.06);border-radius:12px}
    .ex-item-ico{font-size:20px}
    .ex-item-body{flex:1}
    .ex-item-cat{font-size:12px;font-weight:600;color:var(--text)}
    .ex-item-meta{font-size:10px;color:var(--text-light);margin-top:1px}
    .cat-pick{display:flex;flex-wrap:wrap;gap:6px}
    .cat-opt{padding:6px 12px;border-radius:14px;font-size:12px;background:rgba(255,158,199,.1);color:var(--text-light);font-weight:600;transition:all .2s}
    .cat-opt.sel{background:linear-gradient(135deg,var(--primary),var(--primary-deep));color:#fff}
    .cat-manage{display:flex;flex-direction:column;gap:6px}
    .cat-manage-item{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:rgba(168,224,160,.1);border-radius:10px;font-size:12px}
    .cat-manage-item button{width:22px;height:22px;border-radius:50%;background:rgba(255,138,154,.15);color:#FF8A9A;display:flex;align-items:center;justify-content:center;font-size:11px}
  `;
  document.head.appendChild(s);
}

/* ===== 数据层 ===== */
function getExercise(){ return DB.get('exercise')||[]; }
function setExercise(e){ DB.set('exercise',e); }
function getExerciseCats(){
  let c = DB.get('exerciseCats');
  if(!c){ c=['爬坡','健身','游泳','骑行','瑜伽','舞蹈']; DB.set('exerciseCats',c); }
  return c;
}
function setExerciseCats(c){ DB.set('exerciseCats',c); }

/* 训练方案 */
function getExPlans(){
  let p = DB.get('exPlans');
  if(!p){
    p = getDefaultExPlans();
    DB.set('exPlans',p);
  }
  return p;
}
function setExPlans(p){ DB.set('exPlans',p); }

function getDefaultExPlans(){
  return [
    {
      id:'plan_home_fullbody',
      title:'居家全身无器械训练',
      category:'健身',
      detail:'1. 开合跳 30秒 × 3组\n2. 深蹲 15次 × 3组\n3. 俯卧撑 10次 × 3组\n4. 交替弓步蹲 12次 × 3组\n5. 平板支撑 30秒 × 3组\n6. 仰卧卷腹 15次 × 3组\n组间休息 30-45秒，总时长约 25分钟',
      tip:'训练前做 5 分钟动态热身，训练后拉伸放松。动作宁可慢一点也要保持标准，避免受伤。',
      tags:['无器械','全身','燃脂','居家'],
      duration:25,
      calories:180
    },
    {
      id:'plan_office_stretch',
      title:'办公室工位拉伸',
      category:'瑜伽',
      detail:'1. 颈部前后左右拉伸 各 15秒\n2. 肩部环绕 前 10 圈 + 后 10 圈\n3. 坐姿转体 左右各 10 次\n4. 胸椎伸展 双手背后交叉挺胸 20秒\n5. 髋屈肌拉伸 左右各 20秒\n6. 小腿提踵 15次 × 2组\n随时可做，每个动作缓慢有控制',
      tip:'久坐每小时起来活动 3 分钟。拉伸时保持自然呼吸，不要憋气，感觉到轻微拉伸感即可，不要疼痛。',
      tags:['久坐','拉伸','舒缓','办公'],
      duration:10,
      calories:40
    }
  ];
}

/* 搜索状态 */
function getExSearch(){ return state.exSearch||''; }
function setExSearch(v){ state.exSearch = v; }

/* ===== 统计计算 ===== */
function calcWeekCount(list){
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate()-today.getDay());
  start.setHours(0,0,0,0);
  return list.filter(l=>{
    const d = new Date(l.date+'T00:00:00');
    return d >= start;
  }).length;
}

function calcConsecutiveWeeks(list){
  if(list.length===0) return 0;
  const dates = new Set(list.map(l=>l.date));
  const today = new Date();
  let weeks = 0;
  // 本周或上周开始往前检查
  for(let i=0;i<52;i++){
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate()-today.getDay()-i*7);
    let hasLog = false;
    for(let j=0;j<7;j++){
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate()+j);
      if(dates.has(getDateKey(d))){ hasLog=true; break; }
    }
    if(hasLog) weeks++;
    else if(i>0) break;
  }
  return weeks;
}

function calcStreak(list){
  if(list.length===0) return 0;
  const dates = [...new Set(list.map(l=>l.date))].sort();
  let streak=0;
  const today=new Date();
  for(let i=0;i<365;i++){
    const d=new Date(today); d.setDate(today.getDate()-i);
    const k=getDateKey(d);
    if(dates.includes(k)) streak++;
    else if(i>0) break;
  }
  return streak;
}

/* ===== 主渲染 ===== */
function renderExercise(){
  injectExerciseStyle();
  const v = document.getElementById('view-exercise');
  const list = getExercise();
  const cats = getExerciseCats();
  const plans = getExPlans();
  const streak = calcStreak(list);
  const weekCount = calcWeekCount(list);
  const totalRecords = list.length;
  const consecWeeks = calcConsecutiveWeeks(list);
  const today = getDateKey(new Date());
  const todayLogs = list.filter(l=>l.date===today);
  const viewMode = state.exView||'month';
  const search = getExSearch();
  const favIds = DB.get('exFavs')||[];

  // 过滤搜索
  const filtered = search
    ? plans.filter(p=>p.title.toLowerCase().includes(search.toLowerCase()))
    : plans;

  v.innerHTML = `
    <!-- 顶部导航 -->
    <div class="ex-topbar">
      <h1>🏃 运动打卡</h1>
      <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input class="input-search" id="ex-search" placeholder="搜索训练方案..." value="${escapeHtml(search)}" oninput="onExSearch(this.value)">
      </div>
      <button class="ex-sync-btn" onclick="syncExercise()" title="同步">🔄</button>
    </div>

    <!-- 连续打卡横幅 -->
    <div class="ex-streak-banner">
      <div class="ex-streak-emoji">🔥</div>
      <div>
        <div class="ex-streak-num">${streak}</div>
        <div class="ex-streak-lab">连续打卡天数</div>
      </div>
      <div class="ex-streak-today">${todayLogs.length>0?`今日已打卡 ${todayLogs.length} 次`:'今日还未打卡'}</div>
    </div>

    <div class="content">
      <!-- 三栏统计 -->
      <div class="stat-row">
        <div class="stat-cell">
          <div class="stat-num green">${weekCount}</div>
          <div class="stat-lab">本周次数</div>
        </div>
        <div class="stat-cell">
          <div class="stat-num">${totalRecords}</div>
          <div class="stat-lab">总记录</div>
        </div>
        <div class="stat-cell">
          <div class="stat-num blue">${consecWeeks}</div>
          <div class="stat-lab">连续周数</div>
        </div>
      </div>

      <!-- 训练方案 -->
      <div class="card">
        <div class="card-title">
          <span class="ico">📋</span>训练方案
          <button class="btn btn-sm btn-ghost" style="margin-left:auto" onclick="showExPlanModal()">+ 方案</button>
        </div>
        ${filtered.length===0
          ? `<div class="empty"><span class="emoji">🔍</span>${search?'没有匹配的训练方案':'还没有训练方案'}<br>${search?'换个关键词试试':'点击右上角添加'}</div>`
          : `<div class="scroll-cards">
              ${filtered.map(p=>renderPlanCard(p,favIds)).join('')}
            </div>`
        }
      </div>

      <!-- 热力图 -->
      <div class="card">
        <div class="card-title">
          <span class="ico">📅</span>打卡热力图
          <div class="view-pick" style="margin-left:auto">
            <button class="vp-btn ${viewMode==='week'?'active':''}" onclick="setExView('week')">周</button>
            <button class="vp-btn ${viewMode==='month'?'active':''}" onclick="setExView('month')">月</button>
            <button class="vp-btn ${viewMode==='year'?'active':''}" onclick="setExView('year')">年</button>
          </div>
        </div>
        <div class="heatmap-wrap" id="heatmap"></div>
      </div>

      <!-- 分类管理 -->
      <div class="card card-blue">
        <div class="card-title">
          <span class="ico">🏷</span>运动分类
          <button class="btn btn-sm btn-ghost" style="margin-left:auto" onclick="showExCatModal()">管理</button>
        </div>
        <div class="ex-cats-row">
          ${cats.map(c=>`<div class="ex-cat-chip">${getExEmoji(c)} ${c}</div>`).join('')}
        </div>
      </div>

      <!-- 今日记录 -->
      <div class="card">
        <div class="card-title"><span class="ico">📝</span>今日记录</div>
        ${todayLogs.length===0
          ? `<div class="empty"><span class="emoji">🌸</span>今天还没有运动记录</div>`
          : `<div class="ex-list">
              ${todayLogs.map(l=>`
                <div class="ex-item">
                  <div class="ex-item-ico">${getExEmoji(l.category)}</div>
                  <div class="ex-item-body">
                    <div class="ex-item-cat">${l.category}${l.planTitle?` · ${l.planTitle}`:''}</div>
                    <div class="ex-item-meta">${l.duration}分钟 · ${l.calories}卡路里</div>
                  </div>
                </div>
              `).join('')}
            </div>`
        }
      </div>
    </div>
  `;

  renderHeatmap(list,viewMode);
}

/* ===== 训练卡片 ===== */
function renderPlanCard(p,favIds){
  const isFav = favIds.includes(p.id);
  return `
    <div class="ex-plan-card scroll-card">
      <div class="ex-plan-head">
        <div class="ex-plan-title">${escapeHtml(p.title)}</div>
        <button class="fav-btn ${isFav?'active':''}" onclick="toggleExFav('${p.id}')">${isFav?'❤️':'🤍'}</button>
      </div>
      <div class="ex-plan-tag-row">
        <span class="tag-green">${getExEmoji(p.category)} ${p.category}</span>
        <span class="tag-green">⏱ ${p.duration}分钟</span>
        <span class="tag-green">🔥 ${p.calories}卡</span>
      </div>
      <div class="ex-plan-detail">${escapeHtml(p.detail)}</div>
      <div class="ex-plan-tip"><span class="ico">💡</span><span>${escapeHtml(p.tip)}</span></div>
      <div class="ex-plan-actions">
        <button class="btn btn-sm btn-green" onclick="checkinPlan('${p.id}')">开始练 &amp; 打卡</button>
      </div>
      <div class="ex-plan-foot-tags">
        ${(p.tags||[]).map(t=>`<span class="tag-green">#${escapeHtml(t)}</span>`).join('')}
      </div>
    </div>
  `;
}

/* ===== 搜索 ===== */
function onExSearch(val){
  setExSearch(val);
  // 仅重新渲染方案卡片区域，避免输入框失焦
  const plans = getExPlans();
  const favIds = DB.get('exFavs')||[];
  const filtered = val
    ? plans.filter(p=>p.title.toLowerCase().includes(val.toLowerCase()))
    : plans;
  // 找到方案卡片容器（content 内第一个 card）
  const card = document.querySelector('#view-exercise .content .card');
  if(!card){ renderExercise(); return; }
  const titleBar = card.querySelector('.card-title');
  if(!titleBar){ renderExercise(); return; }
  // 移除标题栏之后的所有兄弟节点
  let next = titleBar.nextElementSibling;
  while(next){ const tmp = next.nextElementSibling; next.remove(); next = tmp; }
  // 插入新内容
  if(filtered.length===0){
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.innerHTML = `<span class="emoji">🔍</span>${val?'没有匹配的训练方案':'还没有训练方案'}<br>${val?'换个关键词试试':'点击右上角添加'}`;
    card.appendChild(empty);
  } else {
    const wrap = document.createElement('div');
    wrap.className = 'scroll-cards';
    wrap.innerHTML = filtered.map(p=>renderPlanCard(p,favIds)).join('');
    card.appendChild(wrap);
  }
}

/* ===== 打卡 ===== */
function checkinPlan(id){
  const plans = getExPlans();
  const p = plans.find(x=>x.id===id);
  if(!p){ toast('方案不存在'); return; }
  const list = getExercise();
  list.push({
    category:p.category,
    planTitle:p.title,
    duration:p.duration,
    calories:p.calories,
    date:getDateKey(new Date()),
    ts:Date.now()
  });
  setExercise(list);
  toast(`打卡成功 🎉 ${p.title}`);
  renderExercise();
}

/* 自定义打卡（手动选分类+时长） */
function saveExercise(){
  const sel = document.querySelector('.cat-opt.sel');
  const category = sel?sel.dataset.cat:getExerciseCats()[0];
  const duration = +val('e-dur')||0;
  const calories = +val('e-cal')||0;
  if(!duration){toast('请输入时长');return;}
  const list = getExercise();
  list.push({category,duration,calories,date:getDateKey(new Date()),ts:Date.now()});
  setExercise(list);
  closeModal();
  renderExercise();
  toast('打卡成功 🎉');
}

/* ===== 收藏 ===== */
function toggleExFav(id){
  let favs = DB.get('exFavs')||[];
  if(favs.includes(id)){
    favs = favs.filter(f=>f!==id);
    toast('已取消收藏');
  } else {
    favs.push(id);
    toast('已收藏 ❤️');
  }
  DB.set('exFavs',favs);
  renderExercise();
}

/* ===== 同步 ===== */
function syncExercise(){
  toast('数据已同步 ✅');
  renderExercise();
}

/* ===== 热力图视图切换 ===== */
function setExView(mode){
  state.exView = mode;
  renderExercise();
}

/* ===== 热力图渲染 ===== */
function renderHeatmap(list,mode){
  const wrap = document.getElementById('heatmap');
  if(!wrap) return;
  const today = new Date();
  const map = {};
  list.forEach(l=>{
    if(!map[l.date]) map[l.date]={count:0,dur:0,cal:0,cats:[]};
    map[l.date].count++;
    map[l.date].dur+=l.duration||0;
    map[l.date].cal+=l.calories||0;
    if(l.category) map[l.date].cats.push(l.category);
  });

  if(mode==='week'){
    const start = new Date(today); start.setDate(today.getDate()-today.getDay());
    const days=[];
    for(let i=0;i<7;i++){const d=new Date(start);d.setDate(start.getDate()+i);days.push(d);}
    wrap.innerHTML = `<div class="heatmap-row">${days.map(d=>{
      const k=getDateKey(d); const m=map[k]; const lvl=m?Math.min(m.count,3):0;
      const isToday = k===getDateKey(today);
      return `<div class="hm-cell hm-w${lvl} ${isToday?'hm-today':''}" data-date="${k}" data-info="${m?`${m.count}次·${m.dur}分钟·${m.cal}卡`:'无记录'}">${d.getDate()}</div>`;
    }).join('')}</div><div class="hm-labels"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div>`;
  } else if(mode==='month'){
    const year=today.getFullYear(),month=today.getMonth();
    const first=new Date(year,month,1);
    const lastDay=new Date(year,month+1,0).getDate();
    const startDay=first.getDay();
    let html='<div class="heatmap-month">';
    for(let i=0;i<startDay;i++) html+='<div class="hm-cell hm-empty"></div>';
    for(let i=1;i<=lastDay;i++){
      const d=new Date(year,month,i); const k=getDateKey(d); const m=map[k];
      const lvl=m?Math.min(m.count,4):0;
      const isToday=k===getDateKey(today);
      html+=`<div class="hm-cell hm-w${lvl} ${isToday?'hm-today':''}" data-date="${k}" data-info="${m?`${m.count}次·${m.dur}分·${m.cal}卡`:'无记录'}">${i}</div>`;
    }
    html+='</div><div class="hm-legend"><span>少</span><div class="hm-cell hm-w0"></div><div class="hm-cell hm-w1"></div><div class="hm-cell hm-w2"></div><div class="hm-cell hm-w3"></div><div class="hm-cell hm-w4"></div><span>多</span></div>';
    wrap.innerHTML = html;
  } else {
    const year=today.getFullYear();
    const months=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
    let html='<div class="heatmap-year">';
    for(let m=0;m<12;m++){
      const lastDay=new Date(year,m+1,0).getDate();
      html+=`<div class="hm-month"><div class="hm-month-lab">${months[m]}</div><div class="hm-month-grid">`;
      for(let i=1;i<=lastDay;i++){
        const d=new Date(year,m,i); const k=getDateKey(d); const m2=map[k];
        const lvl=m2?Math.min(m2.count,4):0;
        html+=`<div class="hm-cell-sm hm-w${lvl}" data-date="${k}" data-info="${m2?`${m2.count}次`:'无'}"></div>`;
      }
      html+='</div></div>';
    }
    html+='</div>';
    wrap.innerHTML = html;
  }

  wrap.querySelectorAll('[data-date]').forEach(el=>{
    el.onclick = ()=>{
      const info = el.dataset.info;
      const date = el.dataset.date;
      toast(`${date.slice(5)} · ${info}`);
    };
  });
}

/* ===== 模态：手动打卡 ===== */
function showExerciseModal(){
  const cats = getExerciseCats();
  showModal(`
    <div class="modal-header">
      <div class="modal-title">运动打卡</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="field"><label>运动项目</label>
      <div class="cat-pick">
        ${cats.map((c,i)=>`<button class="cat-opt ${i===0?'sel':''}" data-cat="${c}" onclick="pickCat(this)">${getExEmoji(c)} ${c}</button>`).join('')}
      </div>
    </div>
    <div class="row">
      <div class="field"><label>时长(分钟)</label><input class="input" id="e-dur" type="number" inputmode="numeric" placeholder="30"></div>
      <div class="field"><label>卡路里</label><input class="input" id="e-cal" type="number" inputmode="numeric" placeholder="200"></div>
    </div>
    <button class="btn btn-green" style="width:100%;justify-content:center;padding:12px;margin-top:6px" onclick="saveExercise()">打卡</button>
  `);
}

function pickCat(el){
  el.parentElement.querySelectorAll('.cat-opt').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
}

/* ===== 模态：分类管理 ===== */
function showExCatModal(){
  const cats = getExerciseCats();
  showModal(`
    <div class="modal-header">
      <div class="modal-title">运动分类管理</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="field"><label>当前分类（点击 ✕ 删除）</label>
      <div class="cat-manage">
        ${cats.map((c,i)=>`<div class="cat-manage-item"><span>${getExEmoji(c)} ${c}</span><button onclick="delExCat(${i})">✕</button></div>`).join('')}
      </div>
    </div>
    <div class="row" style="margin-top:6px">
      <input class="input" id="new-excat" placeholder="新分类名">
      <button class="btn btn-sm btn-green" style="flex:0 0 auto;padding:0 16px" onclick="addExCat()">+ 添加</button>
    </div>
  `);
}

function addExCat(){
  const name = val('new-excat').trim();
  if(!name){toast('请输入分类名');return;}
  const cats = getExerciseCats();
  if(cats.includes(name)){toast('已存在');return;}
  cats.push(name);
  setExerciseCats(cats);
  showExCatModal();
  toast('分类已添加');
}

function delExCat(i){
  const cats = getExerciseCats();
  cats.splice(i,1);
  setExerciseCats(cats);
  showExCatModal();
  toast('分类已删除');
}

/* ===== 模态：添加训练方案 ===== */
function showExPlanModal(){
  const cats = getExerciseCats();
  showModal(`
    <div class="modal-header">
      <div class="modal-title">添加训练方案</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="field"><label>方案标题</label><input class="input" id="p-title" placeholder="例如：晨间唤醒拉伸" autofocus></div>
    <div class="field"><label>分类</label>
      <div class="cat-pick">
        ${cats.map((c,i)=>`<button class="cat-opt ${i===0?'sel':''}" data-cat="${c}" onclick="pickCat(this)">${getExEmoji(c)} ${c}</button>`).join('')}
      </div>
    </div>
    <div class="row">
      <div class="field"><label>时长(分钟)</label><input class="input" id="p-dur" type="number" inputmode="numeric" placeholder="20"></div>
      <div class="field"><label>卡路里</label><input class="input" id="p-cal" type="number" inputmode="numeric" placeholder="150"></div>
    </div>
    <div class="field"><label>训练详情（每行一个动作）</label><textarea class="textarea" id="p-detail" placeholder="1. 动作一 15次 × 3组&#10;2. 动作二 12次 × 3组" style="min-height:90px"></textarea></div>
    <div class="field"><label>温馨提示</label><textarea class="textarea" id="p-tip" placeholder="训练注意事项..." style="min-height:50px"></textarea></div>
    <div class="field"><label>功能标签（逗号分隔）</label><input class="input" id="p-tags" placeholder="燃脂,居家,无器械"></div>
    <button class="btn btn-green" style="width:100%;justify-content:center;padding:12px;margin-top:6px" onclick="saveExPlan()">保存方案</button>
  `);
}

function saveExPlan(){
  const title = val('p-title').trim();
  if(!title){toast('请输入标题');return;}
  // 从模态内查找选中分类
  let category = getExerciseCats()[0];
  const modalCats = document.querySelectorAll('.modal .cat-opt.sel');
  if(modalCats.length>0) category = modalCats[modalCats.length-1].dataset.cat;
  const duration = +val('p-dur')||20;
  const calories = +val('p-cal')||100;
  const detail = val('p-detail').trim()||'请补充训练详情';
  const tip = val('p-tip').trim()||'注意热身，循序渐进';
  const tagsStr = val('p-tags').trim();
  const tags = tagsStr?tagsStr.split(/[,，]/).map(t=>t.trim()).filter(Boolean):[];

  const plans = getExPlans();
  plans.push({
    id:'plan_'+Date.now(),
    title,category,detail,tip,tags,duration,calories
  });
  setExPlans(plans);
  closeModal();
  renderExercise();
  toast('训练方案已添加 📋');
}

/* ===== 辅助 ===== */
function getExEmoji(cat){
  const map={'爬坡':'🏔','健身':'💪','游泳':'🏊','骑行':'🚴','瑜伽':'🧘','舞蹈':'💃'};
  return map[cat]||'⭐';
}

function escapeHtml(s){
  if(s==null) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

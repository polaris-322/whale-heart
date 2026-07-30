/* ===== 化妆学习模块 ===== */

const MAKEUP_DATA = [
  {
    id:'daily-commute',
    title:'日常通勤淡妆',
    category:'淡妆',
    tagColor:'pink',
    scene:'上班通勤 / 日常外出',
    date:'2026-07-29',
    products:['保湿防晒霜','轻薄粉底液','自然色眉笔','裸粉色口红','蜜粉定妆'],
    steps:[
      {n:1,t:'妆前保湿',d:'洁面后涂保湿防晒霜，等待2分钟让肌肤吸收，形成保护屏障'},
      {n:2,t:'轻薄底妆',d:'用指腹薄涂粉底液，从中心向外延展，重点遮盖暗沉区域'},
      {n:3,t:'自然眉型',d:'眉笔沿眉形轻描，眉头淡眉尾实，用眉刷晕染过渡自然'},
      {n:4,t:'唇色点缀',d:'裸粉口红薄涂唇中，用指腹向外轻按晕开，营造自然气色'},
      {n:5,t:'定妆收尾',d:'蜜粉轻扫全脸定妆，T区稍多按压，保持清爽不脱妆'}
    ],
    tip:'通勤妆重在自然轻薄，粉底量少一层比多层好，午间可用吸油纸轻按补妆',
    keywords:['淡妆','通勤','自然','轻薄','日常']
  },
  {
    id:'sweet-date',
    title:'约会甜美桃花妆',
    category:'甜美妆',
    tagColor:'orange',
    scene:'约会 / 闺蜜聚餐',
    date:'2026-07-30',
    products:['水润妆前乳','气垫粉底','桃花粉腮红','棕色眉笔','蜜桃色口红','珠光眼影'],
    steps:[
      {n:1,t:'妆前打底',d:'水润妆前乳全脸涂抹，提升后续底妆贴合度与光泽感'},
      {n:2,t:'气垫底妆',d:'气垫粉底按压上妆，打造水光肌底，局部瑕疵二次叠加'},
      {n:3,t:'眉眼塑形',d:'棕色眉笔画自然弯眉，珠光眼影点缀眼皮中央提亮'},
      {n:4,t:'甜美腮红',d:'桃花粉腮红笑肌处圆扫，向太阳穴方向晕染，增添甜美感'},
      {n:5,t:'蜜桃唇妆',d:'蜜桃色口红满涂唇部，唇中叠加加深营造嘟嘟唇效果'}
    ],
    tip:'约会妆腮红是灵魂，圆扫比斜扫更显甜美可爱，眼影选珠光比哑光更灵动',
    keywords:['约会','甜美','桃花','腮红','少女感']
  },
  {
    id:'korean-glow',
    title:'韩系水光妆',
    category:'韩系妆',
    tagColor:'blue',
    scene:'日常 / 拍照约会',
    date:'2026-08-01',
    products:['水光妆前乳','水润粉底液','高光液','浅棕眉笔','玫瑰色口红','水光腮红'],
    steps:[
      {n:1,t:'水光打底',d:'水光妆前乳全脸薄涂，重点在颧骨与额头增加光泽基底'},
      {n:2,t:'水润底妆',d:'粉底液加一滴高光液混合，用湿润美妆蛋按压上妆'},
      {n:3,t:'水光眉妆',d:'浅棕眉笔画前短后长的韩式平眉，眉尾轻延不强调轮廓'},
      {n:4,t:'水光腮红',d:'水光腮红点涂笑肌上方，用指腹拍开融合底妆光泽'},
      {n:5,t:'玫瑰唇妆',d:'玫瑰色口红薄涂全唇，唇中叠涂透明唇蜜增加水光感'},
      {n:6,t:'高光收尾',d:'高光液点涂颧骨最高点与鼻梁中段，轻拍融合完成水光肌'}
    ],
    tip:'韩系水光妆核心是光泽感，底妆不可厚重，高光液用量宜少不宜多，薄涂叠加效果最佳',
    keywords:['韩系','水光','光泽','高光','水润']
  },
  {
    id:'western-mix',
    title:'欧美轻混血妆',
    category:'欧美妆',
    tagColor:'green',
    scene:'派对 / 潮拍',
    date:'2026-08-02',
    products:['哑光妆前乳','哑光粉底','修容粉','深棕眉笔','橘棕眼影盘','裸色口红'],
    steps:[
      {n:1,t:'哑光底妆',d:'哑光妆前乳打底控油，哑光粉底全脸涂匀，打造干净哑光底'},
      {n:2,t:'轮廓修容',d:'修容粉扫颧骨下方、下颌线与鼻侧，营造立体骨骼感轮廓'},
      {n:3,t:'浓眉塑型',d:'深棕眉笔画粗眉，眉峰略高有棱角，眉尾清晰锐利延伸'},
      {n:4,t:'橘棕眼妆',d:'橘棕色大面积铺眼窝，深棕加深外眼角，营造深邃欧美眼妆'},
      {n:5,t:'裸唇收尾',d:'裸色口红满涂唇部，唇线清晰轮廓分明，与浓眉形成对比平衡'}
    ],
    tip:'欧美妆重点在轮廓与眉型，修容宁深勿浅但边界要晕染干净，眉毛可大胆加粗',
    keywords:['欧美','混血','修容','浓眉','立体']
  },
  {
    id:'japanese-energy',
    title:'日系元气妆',
    category:'日系妆',
    tagColor:'pink',
    scene:'日常 / 逛街约会',
    date:'2026-08-03',
    products:['防晒妆前乳','粉霜底妆','橘粉腮红','灰棕眉笔','透明唇蜜','睫毛膏'],
    steps:[
      {n:1,t:'元气打底',d:'防晒妆前乳全脸涂抹，粉霜用指腹薄推，保留肌肤自然通透感'},
      {n:2,t:'毛流眉妆',d:'灰棕眉笔轻画毛流线条，眉头用眉刷向上刷营造自然毛流感'},
      {n:3,t:'大面积腮红',d:'橘粉腮红大面积横扫从笑肌到太阳穴，像从内透出的元气感'},
      {n:4,t:'睫毛放大',d:'睫毛夹翘后薄涂睫毛膏，下睫毛也轻涂一根根分明放大双眼'},
      {n:5,t:'透明唇蜜',d:'透明唇蜜满涂唇部营造嘟嘟唇，唇中稍叠粉调增加元气感'}
    ],
    tip:'日系妆核心是元气腮红，面积要大到从笑肌连到眼下，像刚跑完步的自然红晕',
    keywords:['日系','元气','腮红','毛流','透明唇']
  },
  {
    id:'interview-pro',
    title:'面试气质妆',
    category:'气质妆',
    tagColor:'blue',
    scene:'面试 / 正式场合',
    date:'2026-08-04',
    products:['控油妆前乳','中等遮瑕粉底','灰棕眉笔','大地色眼影','豆沙色口红','散粉定妆'],
    steps:[
      {n:1,t:'干净底妆',d:'控油妆前乳打底，中等遮瑕粉底均匀涂抹，遮盖暗沉与痘印'},
      {n:2,t:'利落眉型',d:'灰棕眉笔沿眉骨画利落眉型，眉峰微有弧度显干练，眉尾自然收'},
      {n:3,t:'大地眼妆',d:'浅大地色铺眼窝打底，中间色加深双眼皮褶线，自然立体不夸张'},
      {n:4,t:'气质唇妆',d:'豆沙色口红薄涂全唇，轮廓清晰不晕染，显沉稳气质不俗艳'},
      {n:5,t:'强力定妆',d:'散粉全脸按压定妆，T区与鼻翼重点定妆，确保面试全程不脱妆'}
    ],
    tip:'面试妆重在干练沉稳，妆面干净不夸张是第一原则，口红选豆沙比裸色更显气色',
    keywords:['面试','气质','干练','沉稳','大地色']
  }
];

function getMakeupFavs(){ return DB.get('makeupFavs')||[]; }
function setMakeupFavs(f){ DB.set('makeupFavs',f); }
function getMakeupLog(){ return DB.get('makeupLog')||{}; }
function setMakeupLog(l){ DB.set('makeupLog',l); }
function getMakeupCheckin(){ return DB.get('makeupCheckin')||{}; }
function setMakeupCheckin(c){ DB.set('makeupCheckin',c); }

function getTodayMakeupCount(){
  const log = getMakeupLog();
  const today = getDateKey(new Date());
  return log[today]||0;
}

function toggleMakeupFav(id){
  let favs = getMakeupFavs();
  if(favs.includes(id)){ favs = favs.filter(f=>f!==id); }
  else { favs.push(id); }
  setMakeupFavs(favs);
  renderMakeup();
  toast(favs.includes(id)?'已收藏 💗':'已取消收藏');
}

function startLearnMakeup(id){
  const makeup = MAKEUP_DATA.find(m=>m.id===id);
  if(!makeup) return;
  const log = getMakeupLog();
  const today = getDateKey(new Date());
  const completedSteps = log[id+'_'+today] || 0;
  const total = makeup.steps.length;
  const pct = Math.round(completedSteps/total*100);

  showModal(`
    <div class="modal-header">
      <div class="modal-title">${makeup.title}</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div style="padding:16px">
      <div class="progress" style="margin-bottom:16px">
        <div class="progress-bar" style="width:${pct}%;background:linear-gradient(90deg,#FF9EC7,#FFD1E8)"></div>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <div class="stat-cell"><div class="stat-num">${completedSteps}</div><div class="stat-lab">已完成</div></div>
        <div class="stat-cell"><div class="stat-num">${total-completedSteps}</div><div class="stat-lab">待学习</div></div>
        <div class="stat-cell"><div class="stat-num" style="color:#FF9EC7">${pct}%</div><div class="stat-lab">进度</div></div>
      </div>
      ${makeup.steps.map((s,i)=>`
        <div style="display:flex;gap:12px;padding:12px;border-radius:12px;margin-bottom:8px;background:${i<completedSteps?'#FFF5F9':'#fff'};border:1px solid ${i<completedSteps?'#FFD1E8':'#f0f0f0'}">
          <div style="width:32px;height:32px;border-radius:50%;background:${i<completedSteps?'#FF9EC7':'#f5f5f5'};color:${i<completedSteps?'#fff':'#999'};display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;flex-shrink:0">${i<completedSteps?'✓':s.n}</div>
          <div>
            <div style="font-weight:600;font-size:15px;color:#333">${s.t}</div>
            <div style="font-size:13px;color:#666;margin-top:4px;line-height:1.5">${s.d}</div>
          </div>
        </div>
      `).join('')}
      ${completedSteps < total ? `
        <button class="btn" style="width:100%;justify-content:center;padding:12px;margin-top:12px;background:linear-gradient(135deg,#FF9EC7,#FFD1E8);color:#fff" onclick="completeStep('${id}',${completedSteps})">
          完成第 ${completedSteps+1} 步：${makeup.steps[completedSteps].t}
        </button>
      ` : `
        <div style="text-align:center;padding:16px;background:#FFF5F9;border-radius:12px;margin-top:12px">
          <div style="font-size:20px;margin-bottom:8px">🎉 全部步骤已完成！</div>
          <button class="btn btn-sm" style="background:#FF9EC7;color:#fff" onclick="checkinMakeup('${id}')">打卡记录</button>
        </div>
      `}
    </div>
  `);
}

function completeStep(id, currentStep){
  const makeup = MAKEUP_DATA.find(m=>m.id===id);
  if(!makeup) return;
  const log = getMakeupLog();
  const today = getDateKey(new Date());
  const key = id+'_'+today;
  log[key] = currentStep + 1;
  if(currentStep + 1 === makeup.steps.length){
    const countKey = today;
    log[countKey] = (log[countKey]||0) + 1;
  }
  setMakeupLog(log);
  toast('已完成第 '+(currentStep+1)+'步 🌸');
  startLearnMakeup(id);
  if(currentStep + 1 === makeup.steps.length){
    renderMakeup();
  }
}

function checkinMakeup(id){
  const checkin = getMakeupCheckin();
  const today = getDateKey(new Date());
  if(checkin[today] && checkin[today].includes(id)){
    toast('今日已打卡该妆容');
    return;
  }
  checkin[today] = (checkin[today]||[]);
  if(!checkin[today].includes(id)){
    checkin[today].push(id);
  }
  setMakeupCheckin(checkin);
  closeModal();
  renderMakeup();
  toast('打卡成功！坚持学习真棒 🎀');
}

function searchMakeup(keyword){
  if(!keyword) return MAKEUP_DATA;
  const kw = keyword.toLowerCase();
  return MAKEUP_DATA.filter(m =>
    m.title.toLowerCase().includes(kw) ||
    m.category.toLowerCase().includes(kw) ||
    m.scene.toLowerCase().includes(kw) ||
    m.keywords.some(k=>k.toLowerCase().includes(kw)) ||
    m.products.some(p=>p.toLowerCase().includes(kw))
  );
}

function renderMakeup(){
  const v = document.getElementById('view-makeup');
  if(!v) return;

  const favs = getMakeupFavs();
  const log = getMakeupLog();
  const checkin = getMakeupCheckin();
  const today = getDateKey(new Date());
  const todayCount = log[today]||0;
  const todayChecked = (checkin[today]||[]).length;
  const favCount = favs.length;
  const searchVal = v.querySelector('.input-search')?.value || '';
  const filtered = searchMakeup(searchVal);

  const TAG_MAP = {pink:'tag-pink',orange:'tag-orange',blue:'tag-blue',green:'tag-green'};

  v.innerHTML = `
    <div class="hero" style="background:linear-gradient(135deg,#FFE7F0,#FFD1E8)">
      <div class="hero-inner">
        <div class="hero-text">
          <div class="hero-emoji">💄</div>
          <div><h1 style="color:#D46A8A">化妆学习</h1><div class="sub" style="color:#E88AAD">妆容方案 · 分步教程</div></div>
        </div>
        <button class="btn btn-sm btn-ghost" style="color:#D46A8A;border-color:#FFD1E8" onclick="syncMakeupCloud()">
          ☁️ ${DB.get('makeupSynced')?'已同步':'待同步'}
        </button>
      </div>
    </div>
    <div class="content">
      <div class="search-wrap" style="margin-bottom:16px">
        <input class="input input-search" placeholder="搜索妆容方案…" value="${searchVal}" oninput="renderMakeup()">
      </div>

      <div class="card" style="background:linear-gradient(135deg,#FFF5F9,#FFE7F0);padding:16px;border-radius:16px;margin-bottom:16px">
        <div style="font-size:14px;color:#D46A8A;font-weight:600;margin-bottom:8px">🌸 化妆学习小贴士</div>
        <div style="font-size:13px;color:#999;line-height:1.6">每天学习一个妆容教程，从基础淡妆到精致约会妆逐步进阶。点击【开始学】跟练分步教程，完成后打卡记录你的成长轨迹。</div>
      </div>

      <div style="display:flex;gap:8px;margin-bottom:16px">
        <div class="stat-cell" style="background:#FFF5F9;border-radius:12px;flex:1;text-align:center;padding:12px">
          <div class="stat-num" style="color:#FF9EC7">${todayCount}</div>
          <div class="stat-lab">今日学习</div>
        </div>
        <div class="stat-cell" style="background:#FFF5F9;border-radius:12px;flex:1;text-align:center;padding:12px">
          <div class="stat-num" style="color:#FFB347">${todayChecked}</div>
          <div class="stat-lab">今日打卡</div>
        </div>
        <div class="stat-cell" style="background:#FFF5F9;border-radius:12px;flex:1;text-align:center;padding:12px">
          <div class="stat-num" style="color:#D46A8A">${favCount}</div>
          <div class="stat-lab">已收藏</div>
        </div>
      </div>

      ${filtered.length === 0 ? `
        <div class="card"><div class="empty">
          <span class="emoji">🔍</span>没有找到匹配的妆容<br>换个关键词试试
        </div></div>
      ` : `
        <div class="scroll-cards">
          ${filtered.map(m=>{
            const isFav = favs.includes(m.id);
            const completedSteps = log[m.id+'_'+today]||0;
            const totalSteps = m.steps.length;
            const pct = Math.round(completedSteps/totalSteps*100);
            const isDone = completedSteps >= totalSteps;
            return `
              <div class="scroll-card" style="border-radius:16px;padding:16px;background:#fff;border:1px solid #FFE7F0;margin-bottom:16px">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                  <div class="card-title" style="flex:1;margin:0;font-size:16px;color:#333">${m.title}</div>
                  <button class="fav-btn ${isFav?'fav-active':''}" onclick="toggleMakeupFav('${m.id}')">${isFav?'💗':'🤍'}</button>
                </div>
                <div style="display:flex;gap:6px;margin-bottom:8px">
                  <span class="${TAG_MAP[m.tagColor]||'tag-pink'}">${m.category}</span>
                  <span class="tag-blue">${m.scene}</span>
                  <span class="tag-green">${m.date}</span>
                </div>

                <div style="margin-bottom:10px">
                  <div style="font-size:12px;color:#D46A8A;font-weight:600;margin-bottom:4px">彩妆清单</div>
                  <div style="display:flex;gap:4px;flex-wrap:wrap">
                    ${m.products.map(p=>`<span style="font-size:12px;background:#FFF5F9;color:#D46A8A;padding:2px 8px;border-radius:8px">${p}</span>`).join('')}
                  </div>
                </div>

                <div style="margin-bottom:10px">
                  <div style="font-size:12px;color:#D46A8A;font-weight:600;margin-bottom:4px">分步教程</div>
                  ${m.steps.map(s=>`
                    <div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:4px">
                      <div style="width:20px;height:20px;border-radius:50%;background:#FFD1E8;color:#D46A8A;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;flex-shrink:0">${s.n}</div>
                      <div style="font-size:13px;color:#666;flex:1">${s.t}</div>
                    </div>
                  `).join('')}
                </div>

                <div style="background:#FFF9E6;border-radius:8px;padding:8px 12px;margin-bottom:12px;font-size:12px;color:#B8860B;line-height:1.5">
                  💡 ${m.tip}
                </div>

                ${isDone ? `
                  <div class="progress" style="margin-bottom:10px">
                    <div class="progress-bar" style="width:100%;background:linear-gradient(90deg,#FF9EC7,#FFD1E8)"></div>
                  </div>
                  <div style="display:flex;gap:8px">
                    <button class="btn btn-sm btn-ghost" style="color:#FF9EC7;border-color:#FFD1E8" onclick="startLearnMakeup('${m.id}')">查看教程</button>
                    <button class="btn btn-sm" style="background:#FF9EC7;color:#fff" onclick="checkinMakeup('${m.id}')">打卡 ✓</button>
                  </div>
                ` : completedSteps > 0 ? `
                  <div class="progress" style="margin-bottom:10px">
                    <div class="progress-bar" style="width:${pct}%;background:linear-gradient(90deg,#FF9EC7,#FFD1E8)"></div>
                  </div>
                  <div style="display:flex;gap:8px">
                    <button class="btn btn-sm" style="background:#FF9EC7;color:#fff" onclick="startLearnMakeup('${m.id}')">继续学 ${pct}%</button>
                  </div>
                ` : `
                  <div style="display:flex;gap:8px">
                    <button class="btn btn-sm" style="background:linear-gradient(135deg,#FF9EC7,#FFD1E8);color:#fff" onclick="startLearnMakeup('${m.id}')">开始学</button>
                  </div>
                `}

                <div style="display:flex;gap:4px;margin-top:10px;flex-wrap:wrap">
                  ${m.keywords.map(k=>`<span style="font-size:11px;color:#E88AAD;background:#FFE7F0;padding:2px 6px;border-radius:6px">${k}</span>`).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;
}

function syncMakeupCloud(){
  DB.set('makeupSynced', true);
  renderMakeup();
  toast('已同步至云端 ☁️');
}

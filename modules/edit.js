/* ===== 剪辑创作学习模块 ===== */

/* ── 数据获取/存储 ── */
function getEditFavs() { return DB.get('editFavs') || []; }
function setEditFavs(f) { DB.set('editFavs', f); }
function getEditLog() { return DB.get('editLog') || {}; }
function setEditLog(l) { DB.set('editLog', l); }

/* ── 剪辑手法库 ── */
const EDIT_TECHNIQUES = [
  { id: 'jcut', name: 'J Cut', intro: '声音先于画面出现，在下一镜头画面出现前就听到其声音，营造自然过渡感。', scene: '对话场景、纪录片转场', level: '入门', stars: 2, duration: '30分钟', videoUrl: 'https://example.com/jcut-tutorial' },
  { id: 'lcut', name: 'L Cut', intro: '画面切换后仍保留上一镜头的声音，常用于对话或旁白延续。', scene: '访谈、Vlog叙事', level: '入门', stars: 2, duration: '30分钟', videoUrl: 'https://example.com/lcut-tutorial' },
  { id: 'jumpcut', name: '跳切', intro: '在同一主体的连续动作中删除中间帧，产生跳跃感，增加节奏张力。', scene: '快节奏Vlog、宣传片', level: '入门', stars: 1, duration: '20分钟', videoUrl: 'https://example.com/jumpcut-tutorial' },
  { id: 'matchcut', name: '匹配剪辑', intro: '利用画面中相似的形状、颜色或动作进行转场，视觉冲击力强。', scene: '创意广告、MV、电影开场', level: '进阶', stars: 4, duration: '1小时', videoUrl: 'https://example.com/matchcut-tutorial' },
  { id: 'montage', name: '蒙太奇', intro: '将不同时空的镜头组合在一起，创造新的意义和情绪。', scene: '故事叙述、情绪渲染、预告片', level: '进阶', stars: 4, duration: '1.5小时', videoUrl: 'https://example.com/montage-tutorial' },
  { id: 'smashcut', name: '冲击剪辑', intro: '从高音量/强画面突然切到寂静画面，制造强烈反差。', scene: '剧情转折、恐怖片', level: '进阶', stars: 3, duration: '30分钟', videoUrl: 'https://example.com/smashcut-tutorial' },
  { id: 'invisible', name: '隐形剪辑', intro: '利用遮挡物或纯色画面做无缝转场，让观众察觉不到剪辑点。', scene: 'Vlog、创意短片、产品展示', level: '进阶', stars: 3, duration: '45分钟', videoUrl: 'https://example.com/invisible-tutorial' },
  { id: 'paralleledit', name: '平行剪辑', intro: '两条或多条故事线交替出现，营造紧张感或关联性。', scene: '悬疑片、多线叙事', level: '进阶', stars: 4, duration: '1小时', videoUrl: 'https://example.com/parallel-tutorial' },
  { id: 'crosscut', name: '交叉剪辑', intro: '两组画面反复交替，通常一方影响另一方，强化因果关系。', scene: '追车戏、营救场景', level: '进阶', stars: 4, duration: '1小时', videoUrl: 'https://example.com/crosscut-tutorial' },
  { id: 'transition', name: '转场特效', intro: '运用预设或自定义转场效果（溶解、擦除、翻页等）连接镜头。', scene: '各类视频通用', level: '入门', stars: 2, duration: '40分钟', videoUrl: 'https://example.com/transition-tutorial' },
  { id: 'keyframe', name: '关键帧动画', intro: '通过设置关键帧控制画面缩放、位移、旋转、透明度等属性变化。', scene: '动态文字、画中画、创意特效', level: '进阶', stars: 3, duration: '1.5小时', videoUrl: 'https://example.com/keyframe-tutorial' },
  { id: 'speedramp', name: '变速剪辑', intro: '在同一镜头内改变播放速度，快慢结合突出关键动作。', scene: '运动镜头、产品展示、旅行Vlog', level: '进阶', stars: 3, duration: '1小时', videoUrl: 'https://example.com/speedramp-tutorial' },
  { id: 'colorcut', name: '色彩匹配剪辑', intro: '根据画面主色调进行镜头衔接，视觉流畅统一。', scene: '品牌视频、时尚大片、MV', level: '进阶', stars: 3, duration: '45分钟', videoUrl: 'https://example.com/colorcut-tutorial' },
  { id: 'rhythm', name: '节奏剪辑', intro: '根据音乐节拍或节奏点进行剪辑，让画面与声音同步律动。', scene: 'MV、混剪、宣传片', level: '进阶', stars: 3, duration: '1小时', videoUrl: 'https://example.com/rhythm-tutorial' },
  { id: 'sounddesign', name: '音效设计', intro: '通过环境音、拟音、特效音增强画面真实感和情绪。', scene: '影视创作、广告、游戏视频', level: '高级', stars: 4, duration: '2小时', videoUrl: 'https://example.com/sounddesign-tutorial' },
  { id: 'grading', name: '专业调色', intro: '使用色轮、曲线、LUT进行画面色彩校正与风格化处理。', scene: '所有高质量视频', level: '高级', stars: 5, duration: '3小时', videoUrl: 'https://example.com/grading-tutorial' },
  { id: 'masking', name: '遮罩转场', intro: '利用蒙版创建创意转场，让画面元素"穿过"遮罩区域。', scene: '旅行Vlog、创意短片', level: '进阶', stars: 4, duration: '1.5小时', videoUrl: 'https://example.com/masking-tutorial' },
  { id: 'zoominout', name: '缩放转场', intro: '通过快速放大或缩小画面实现镜头切换，动感十足。', scene: '快节奏Vlog、活动花絮', level: '入门', stars: 2, duration: '30分钟', videoUrl: 'https://example.com/zoom-tutorial' },
  { id: 'textanim', name: '文字动画', intro: '为字幕、标题添加出入场动画，提升信息传达效果。', scene: '知识类视频、教程、综艺字幕', level: '入门', stars: 2, duration: '45分钟', videoUrl: 'https://example.com/textanim-tutorial' },
  { id: 'multicam', name: '多机位剪辑', intro: '同步多个摄像机素材，在不同角度间切换增强观看体验。', scene: '访谈、演出、教程', level: '高级', stars: 4, duration: '2小时', videoUrl: 'https://example.com/multicam-tutorial' },
  { id: 'green', name: '绿幕抠像', intro: '使用色度键去除绿色背景，替换为自定义背景或特效。', scene: '特效视频、虚拟演播室', level: '进阶', stars: 3, duration: '1.5小时', videoUrl: 'https://example.com/greenscreen-tutorial' },
  { id: 'glitch', name: '故障艺术', intro: '模拟数字信号干扰的视觉效果，营造赛博朋克或紧张氛围。', scene: '科幻主题、音乐视频、片头', level: '进阶', stars: 3, duration: '1小时', videoUrl: 'https://example.com/glitch-tutorial' },
  { id: 'split', name: '分屏效果', intro: '将画面分割为多个区域同时展示不同内容。', scene: '对比视频、教程、多人连线', level: '入门', stars: 2, duration: '30分钟', videoUrl: 'https://example.com/splitscreen-tutorial' },
  { id: 'tracking', name: '运动跟踪', intro: '跟踪画面中某物体的运动轨迹，将文字或图形绑定到该物体上。', scene: '标注说明、动态字幕、特效合成', level: '高级', stars: 5, duration: '2.5小时', videoUrl: 'https://example.com/tracking-tutorial' },
];

/* ── 博主推荐 ── */
const EDIT_BLOGGERS = [
  { id: 'b1', name: '影视飓风', platform: 'B站', works: '《相机入门》《调色实战》', style: '专业硬核，深入浅出，设备评测+创作教学并重', reason: '国内影视创作领域顶级KOL，从器材到后期全流程覆盖' },
  { id: 'b2', name: 'Peter McKinnon', platform: 'YouTube', works: '《Editing Masterclass》《Camera Basics》', style: '高能量快节奏，电影感十足，教学与Vlog结合', reason: '全球最受欢迎的摄影剪辑博主之一，英语学习者首选' },
  { id: 'b3', name: 'Daniel Schiffer', platform: 'YouTube', works: '《Product Commercial BTS》《Epic B-roll》', style: '商业广告级制作，创意转场和运镜教学典范', reason: '学习商业级产品拍摄和创意剪辑的最佳导师' },
  { id: 'b4', name: 'FinalCutKing', platform: 'YouTube', works: '《iPhone Editing》《Action Effects》', style: '特效向剪辑，视觉冲击力极强，创意无限', reason: '如果你想学特效合成和视觉创意，他是天花板级别' },
  { id: 'b5', name: 'Cinecom.net', platform: 'YouTube', works: '《Copy Cat Friday》《Premiere Tips》', style: '每周复刻电影名场面，实用技巧+幽默教学', reason: '通过复刻经典学剪辑，寓教于乐的学习方式' },
  { id: 'b6', name: '剪映课堂', platform: '抖音/B站', works: '《剪映全功能教程》《手机剪辑入门》', style: '零基础友好，手把手教学，紧跟剪映更新', reason: '最适合手机剪辑入门，中文教学，接地气' },
  { id: 'b7', name: 'Premiere Gal', platform: 'YouTube', works: '《Premiere Pro 2024》《Motion Graphics》', style: '系统化Premiere教学，模板和插件资源丰富', reason: '想系统学Pr的最佳选择，教程清晰有条理' },
  { id: 'b8', name: 'DaVinci Resolve', platform: 'YouTube/B站', works: '《达芬奇全流程》《调色大师课》', style: '官方出品+社区教程，从剪辑到调色全流程', reason: '免费软件的最佳学习资源，调色领域权威' },
  { id: 'b9', name: '你好竹子', platform: 'B站', works: '《Vlog拍摄技巧》《创意剪辑思路》', style: '生活化Vlog教学，剪辑思路和叙事技巧分享', reason: '适合Vlog创作者，学习用剪辑讲好生活故事' },
  { id: 'b10', name: 'Casey Neistat', platform: 'YouTube', works: '《Daily Vlog》《Filmmaking 101》', style: '原始粗犷的Vlog风格，叙事节奏和剪辑逻辑顶级', reason: 'Vlog鼻祖，学习用最简单的设备讲好故事' },
];

/* ── 学习路径定义 ── */
const LEARNING_PATH = [
  {
    phase: '入门启航',
    icon: '🚀',
    desc: '了解剪辑基础概念，建立正确的剪辑思维',
    tasks: [
      { id: 'p1t1', text: '观看"什么是剪辑"科普视频', stars: 1, duration: '15分钟', tipId: 'jcut' },
      { id: 'p1t2', text: '了解常用剪辑软件（Pr/达芬奇/剪映/必剪）', stars: 1, duration: '20分钟', tipId: null },
      { id: 'p1t3', text: '安装并熟悉一款剪辑软件的基本界面', stars: 1, duration: '30分钟', tipId: null },
      { id: 'p1t4', text: '了解视频基础参数：分辨率/帧率/码率/格式', stars: 1, duration: '20分钟', tipId: null },
    ]
  },
  {
    phase: '三大基本功',
    icon: '🎬',
    desc: '掌握剪辑节奏、转场技巧、音频处理三大核心能力',
    tasks: [
      { id: 'p2t1', text: '学习跳切和J/L Cut基础技法', stars: 2, duration: '1小时', tipId: 'jumpcut' },
      { id: 'p2t2', text: '练习节奏剪辑：跟着音乐节拍剪视频', stars: 2, duration: '1小时', tipId: 'rhythm' },
      { id: 'p2t3', text: '掌握常用转场：缩放转场、隐形剪辑', stars: 2, duration: '1.5小时', tipId: 'transition' },
      { id: 'p2t4', text: '学习音频基础：背景音乐选择与音量平衡', stars: 2, duration: '45分钟', tipId: null },
      { id: 'p2t5', text: '练习音效设计：环境音、转场音效添加', stars: 3, duration: '1小时', tipId: 'sounddesign' },
      { id: 'p2t6', text: '完成一个60秒快节奏混剪小作品', stars: 3, duration: '2小时', tipId: null },
    ]
  },
  {
    phase: '进阶调色',
    icon: '🎨',
    desc: '学习色彩理论与调色技巧，让画面更有电影感',
    tasks: [
      { id: 'p3t1', text: '了解色彩理论：色相/饱和度/亮度/色温', stars: 2, duration: '30分钟', tipId: null },
      { id: 'p3t2', text: '学习基础调色：曝光修正、白平衡校正', stars: 3, duration: '1小时', tipId: 'grading' },
      { id: 'p3t3', text: '掌握风格化调色：电影感/日系/复古色调', stars: 3, duration: '1.5小时', tipId: 'grading' },
      { id: 'p3t4', text: '学习色彩匹配剪辑：保持画面色调统一', stars: 4, duration: '1小时', tipId: 'colorcut' },
      { id: 'p3t5', text: '完成一个调色前后对比的展示视频', stars: 3, duration: '1.5小时', tipId: null },
    ]
  },
  {
    phase: '每周实操挑战',
    icon: '🏆',
    desc: '通过每周实战练习巩固所学，逐步提升创作能力',
    tasks: [
      { id: 'p4t1', text: '第1周：用手机拍摄并剪辑一条30秒生活Vlog', stars: 2, duration: '2小时', tipId: null },
      { id: 'p4t2', text: '第2周：拍摄并剪辑一个产品展示短视频', stars: 3, duration: '3小时', tipId: 'keyframe' },
      { id: 'p4t3', text: '第3周：制作一个旅行混剪，使用5种以上转场', stars: 3, duration: '4小时', tipId: 'transition' },
      { id: 'p4t4', text: '第4周：复刻一个你喜欢的博主的视频片段', stars: 4, duration: '5小时', tipId: null },
      { id: 'p4t5', text: '第5周：制作一个完整教程视频（3分钟以上）', stars: 4, duration: '6小时', tipId: 'textanim' },
      { id: 'p4t6', text: '第6周：挑战绿幕抠像+特效合成创意视频', stars: 5, duration: '6小时', tipId: 'green' },
    ]
  }
];

/* ── 工具函数 ── */
function isEditFaved(id) { return getEditFavs().includes(id); }
function toggleEditFav(id) {
  const favs = getEditFavs();
  const idx = favs.indexOf(id);
  if (idx > -1) { favs.splice(idx, 1); } else { favs.push(id); }
  setEditFavs(favs);
}
function isEditChecked(id) {
  const log = getEditLog();
  const today = getDateKey(new Date());
  return log[today] && log[today][id];
}
function toggleEditCheck(id) {
  const log = getEditLog();
  const today = getDateKey(new Date());
  if (!log[today]) log[today] = {};
  if (log[today][id]) { delete log[today][id]; } else { log[today][id] = Date.now(); }
  setEditLog(log);
}
function getEditTodayCount() {
  const log = getEditLog();
  const today = getDateKey(new Date());
  return log[today] ? Object.keys(log[today]).length : 0;
}
function getEditWeekProgress() {
  const log = getEditLog();
  const today = new Date();
  let total = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(today); d.setDate(today.getDate() - i);
    const k = getDateKey(d);
    if (log[k]) total += Object.keys(log[k]).length;
  }
  return total;
}
function levelTag(level) {
  if (level === '入门') return 'tag-green';
  if (level === '进阶') return 'tag-blue';
  return 'tag-pink';
}
function starsHtml(n) {
  let s = '';
  for (let i = 0; i < 5; i++) s += i < n ? '⭐' : '☆';
  return `<span class="stars">${s}</span>`;
}
function getTechniqueById(id) {
  return EDIT_TECHNIQUES.find(t => t.id === id);
}

/* ── 入口函数 ── */
function renderEdit() {
  const tab = (state && state.editTab) || 'techniques';
  const v = document.getElementById('view-edit');
  if (!v) return;

  const todayCount = getEditTodayCount();
  const weekCount = getEditWeekProgress();
  const favCount = getEditFavs().length;
  const totalTechniques = EDIT_TECHNIQUES.length;

  v.innerHTML = `
    <div class="hero">
      <div class="hero-inner">
        <div class="hero-text">
          <div class="hero-emoji">🎬</div>
          <div><h1>剪辑创作</h1><div class="sub">剪辑手法 · 学习路径 · 博主推荐</div></div>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- 统计卡片 -->
      <div class="card" style="background:linear-gradient(135deg,#FFE7A8,#FFD1E8)">
        <div class="stat-row">
          <div class="stat-cell">
            <div class="stat-num">${totalTechniques}</div>
            <div class="stat-lab">剪辑手法</div>
          </div>
          <div class="stat-cell">
            <div class="stat-num green">${todayCount}</div>
            <div class="stat-lab">今日打卡</div>
          </div>
          <div class="stat-cell">
            <div class="stat-num blue">${weekCount}</div>
            <div class="stat-lab">本周练习</div>
          </div>
          <div class="stat-cell">
            <div class="stat-num" style="color:#FF6B35">${favCount}</div>
            <div class="stat-lab">已收藏</div>
          </div>
        </div>
      </div>

      <!-- Tab 切换 -->
      <div class="tab-bar">
        <button class="tab-btn ${tab==='techniques'?'active':''}" onclick="switchEditTab('techniques')">✂️ 剪辑手法</button>
        <button class="tab-btn ${tab==='path'?'active':''}" onclick="switchEditTab('path')">🗺️ 学习路径</button>
        <button class="tab-btn ${tab==='bloggers'?'active':''}" onclick="switchEditTab('bloggers')">🌟 博主推荐</button>
      </div>

      <div id="edit-tab-content">${renderEditTabContent(tab)}</div>
    </div>
  `;
}

function switchEditTab(tab) {
  state.editTab = tab;
  renderEdit();
}

function renderEditTabContent(tab) {
  if (tab === 'techniques') return renderTechniquesTab();
  if (tab === 'path') return renderPathTab();
  if (tab === 'bloggers') return renderBloggersTab();
  return '';
}

/* ── Tab 1: 剪辑手法 ── */
function renderTechniquesTab() {
  const favs = getEditFavs();
  const showFavsOnly = (state && state.editFavFilter);
  const techniques = showFavsOnly
    ? EDIT_TECHNIQUES.filter(t => favs.includes(t.id))
    : EDIT_TECHNIQUES;

  return `
    <div class="card">
      <div class="card-title">
        <span class="ico">✂️</span>剪辑手法汇总
        <span class="tag tag-green">${EDIT_TECHNIQUES.length}种</span>
        <button class="btn btn-sm btn-ghost" style="margin-left:auto" onclick="toggleEditFavFilter()">
          ${showFavsOnly ? '📋 全部' : '⭐ 仅收藏'}
        </button>
      </div>
      <div class="search-wrap" style="margin-bottom:10px">
        <input class="input input-search" id="edit-search" placeholder="搜索剪辑手法..." oninput="filterEditTechniques()">
      </div>
      <div class="scroll-cards" id="edit-tech-list">
        ${techniques.map(t => renderTechniqueCard(t)).join('')}
      </div>
      ${techniques.length === 0 ? '<div class="empty">🔍 没有找到匹配的剪辑手法</div>' : ''}
    </div>
  `;
}

function renderTechniqueCard(t) {
  const faved = isEditFaved(t.id);
  return `
    <div class="scroll-card card" style="position:relative" data-id="${t.id}" data-search="${t.name} ${t.intro} ${t.scene} ${t.level}">
      <button class="btn btn-ghost fav-btn ${faved ? 'active' : ''}" style="position:absolute;top:8px;right:8px;padding:4px;width:28px;height:28px;border-radius:50%" onclick="event.stopPropagation();favEditTechnique('${t.id}',this)">${faved ? '❤️' : '🤍'}</button>
      <div class="card-title" style="padding-right:36px">${t.name}</div>
      <p style="font-size:12px;color:var(--text-light);margin:0 0 8px;line-height:1.5">${t.intro}</p>
      <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px">
        <span class="${levelTag(t.level)}">${t.level}</span>
        <span class="tag tag-orange">⏱ ${t.duration}</span>
      </div>
      <div style="font-size:11px;color:var(--text-faint);margin-bottom:6px">
        ${starsHtml(t.stars)}
      </div>
      <div style="font-size:11px;color:var(--text-faint);margin-bottom:10px">🎯 ${t.scene}</div>
      <div style="display:flex;gap:6px">
        <a href="${t.videoUrl}" target="_blank" class="btn btn-sm btn-blue" onclick="event.stopPropagation()" style="text-decoration:none">📺 参考视频</a>
      </div>
    </div>
  `;
}

function favEditTechnique(id, btn) {
  toggleEditFav(id);
  const faved = isEditFaved(id);
  btn.classList.toggle('active', faved);
  btn.innerHTML = faved ? '❤️' : '🤍';
  toast(faved ? '已收藏 ⭐' : '已取消收藏');
}

function toggleEditFavFilter() {
  state.editFavFilter = !state.editFavFilter;
  renderEdit();
}

function filterEditTechniques() {
  const q = (document.getElementById('edit-search')?.value || '').toLowerCase();
  const cards = document.querySelectorAll('#edit-tech-list .scroll-card');
  cards.forEach(c => {
    const txt = (c.dataset.search || '').toLowerCase();
    c.style.display = txt.includes(q) ? '' : 'none';
  });
}

/* ── Tab 2: 学习路径 ── */
function renderPathTab() {
  const totalTasks = LEARNING_PATH.reduce((sum, p) => sum + p.tasks.length, 0);
  const checkedTotal = LEARNING_PATH.reduce((sum, p) =>
    sum + p.tasks.filter(t => isEditChecked(t.id)).length, 0);
  const progressPct = totalTasks > 0 ? Math.round(checkedTotal / totalTasks * 100) : 0;

  return `
    <div class="card">
      <div class="card-title"><span class="ico">📊</span>学习进度</div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <div class="progress" style="flex:1"><div class="progress-bar" style="width:${progressPct}%"></div></div>
        <span style="font-size:13px;font-weight:700;color:var(--primary-deep)">${progressPct}%</span>
      </div>
      <div style="font-size:11px;color:var(--text-faint)">已完成 ${checkedTotal}/${totalTasks} 项任务</div>
    </div>

    ${LEARNING_PATH.map((phase, pi) => `
      <div class="card">
        <div class="card-title">
          <span class="ico">${phase.icon}</span>${phase.phase}
          <span class="tag tag-blue">第${pi + 1}阶段</span>
        </div>
        <p style="font-size:12px;color:var(--text-faint);margin:0 0 10px">${phase.desc}</p>
        <div style="display:flex;flex-direction:column;gap:6px">
          ${phase.tasks.map(task => {
            const checked = isEditChecked(task.id);
            const tip = task.tipId ? getTechniqueById(task.tipId) : null;
            return `
              <div class="path-task ${checked ? 'done' : ''}" style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:${checked?'rgba(168,224,160,.15)':'rgba(255,255,255,.5)'};border-radius:8px;font-size:12px;cursor:pointer;transition:all .2s" onclick="checkEditTask('${task.id}')">
                <div class="path-check" style="width:20px;height:20px;border-radius:50%;border:2px solid ${checked?'var(--success)':'var(--text-faint)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:10px;background:${checked?'var(--success)':'transparent'};color:#fff">${checked ? '✓' : ''}</div>
                <span style="flex:1;color:${checked?'var(--text-faint)':'var(--text-dark)'};text-decoration:${checked?'line-through':'none'}">${task.text}</span>
                <span class="tag tag-orange" style="flex-shrink:0">⏱ ${task.duration}</span>
                <span style="flex-shrink:0;font-size:10px">${starsHtml(task.stars)}</span>
                ${tip ? `<span class="tag tag-blue" style="flex-shrink:0;cursor:pointer" onclick="event.stopPropagation();showEditTechniqueDetail('${tip.id}')">💡 ${tip.name}</span>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `).join('')}
  `;
}

function checkEditTask(id) {
  toggleEditCheck(id);
  const checked = isEditChecked(id);
  toast(checked ? '已完成打卡 ✓' : '已取消打卡');
  // 局部刷新学习路径
  const content = document.getElementById('edit-tab-content');
  if (content) content.innerHTML = renderPathTab();
}

function showEditTechniqueDetail(tid) {
  const t = getTechniqueById(tid);
  if (!t) return;
  showModal(`
    <div class="modal-header">
      <div class="modal-title">💡 ${t.name}</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <p style="font-size:13px;color:var(--text-light);line-height:1.6;margin:10px 0">${t.intro}</p>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
      <span class="${levelTag(t.level)}">${t.level}</span>
      <span class="tag tag-orange">⏱ ${t.duration}</span>
      <span class="tag tag-green">🎯 ${t.scene}</span>
    </div>
    <div style="font-size:12px;margin-bottom:10px">${starsHtml(t.stars)}</div>
    <a href="${t.videoUrl}" target="_blank" class="btn btn-sm btn-blue" style="text-decoration:none;display:inline-flex">📺 查看参考视频</a>
  `);
}

/* ── Tab 3: 博主推荐 ── */
function renderBloggersTab() {
  return `
    <div class="card">
      <div class="card-title"><span class="ico">🌟</span>优秀博主推荐 <span class="tag tag-blue">${EDIT_BLOGGERS.length}位</span></div>
    </div>
    ${EDIT_BLOGGERS.map(b => `
      <div class="card" style="position:relative">
        <div class="card-title" style="display:flex;align-items:center;gap:8px">
          <span style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--primary-light),var(--secondary-light));display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">${b.name.charAt(0)}</span>
          <div>
            <div style="font-weight:700;font-size:14px">${b.name}</div>
            <div style="font-size:11px;color:var(--text-faint)">
              <span class="tag tag-green">${b.platform}</span>
            </div>
          </div>
        </div>
        <div style="font-size:12px;color:var(--text-light);margin:8px 0;line-height:1.5">
          <strong>代表作品：</strong>${b.works}
        </div>
        <div style="font-size:12px;color:var(--text-light);margin:6px 0;line-height:1.5">
          <strong>剪辑风格：</strong>${b.style}
        </div>
        <div style="font-size:12px;color:var(--success);margin:6px 0;line-height:1.5;padding:8px;background:rgba(168,224,160,.15);border-radius:8px">
          <strong>推荐理由：</strong>${b.reason}
        </div>
      </div>
    `).join('')}
  `;
}

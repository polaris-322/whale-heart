/* ===== 拍摄学习模块 ===== */

/* 注入本模块专属样式 */
function injectShootStyle(){
  if(document.getElementById('shoot-style')) return;
  const s = document.createElement('style');
  s.id = 'shoot-style';
  s.textContent = `
    .shoot-hero-sub{font-size:11px;color:var(--text-faint);margin-top:2px}
    .shoot-tabs{display:flex;gap:4px;padding:0 14px 8px;overflow-x:auto}
    .shoot-tab{padding:6px 14px;border-radius:14px;font-size:12px;font-weight:600;white-space:nowrap;cursor:pointer;background:rgba(255,158,199,.1);color:var(--text-light);transition:all .2s}
    .shoot-tab.sel{background:linear-gradient(135deg,var(--primary),var(--primary-deep));color:#fff}
    .shoot-upload-area{border:2px dashed rgba(255,158,199,.4);border-radius:var(--radius);padding:24px 16px;text-align:center;cursor:pointer;transition:all .2s;margin:0 14px}
    .shoot-upload-area:hover{border-color:var(--primary);background:rgba(255,158,199,.04)}
    .shoot-upload-ico{font-size:36px;margin-bottom:6px}
    .shoot-upload-text{font-size:13px;font-weight:600;color:var(--text)}
    .shoot-upload-hint{font-size:11px;color:var(--text-faint);margin-top:2px}
    .shoot-preview-wrap{position:relative;margin:0 14px;border-radius:var(--radius);overflow:hidden;background:#000}
    .shoot-preview-wrap img,.shoot-preview-wrap video{width:100%;max-height:240px;object-fit:contain;display:block}
    .shoot-preview-remove{position:absolute;top:6px;right:6px;width:28px;height:28px;border-radius:50%;background:rgba(0,0,0,.5);color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;cursor:pointer}
    .shoot-score-circle{width:72px;height:72px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0 auto 8px;position:relative}
    .shoot-score-num{font-size:28px;font-weight:800;line-height:1}
    .shoot-score-lab{font-size:9px;margin-top:1px}
    .shoot-score-detail{display:grid;grid-template-columns:1fr 1fr;gap:6px}
    .shoot-score-item{background:rgba(255,158,199,.06);border-radius:10px;padding:8px 10px}
    .shoot-score-item-name{font-size:11px;font-weight:600;color:var(--text);display:flex;justify-content:space-between;align-items:center}
    .shoot-score-item-val{font-size:14px;font-weight:800;color:var(--primary-deep)}
    .shoot-score-item-bar{height:4px;background:rgba(255,158,199,.2);border-radius:4px;margin-top:4px;overflow:hidden}
    .shoot-score-item-fill{height:100%;border-radius:4px;transition:width .6s ease}
    .shoot-summary-section{margin-top:10px}
    .shoot-summary-title{font-size:13px;font-weight:700;color:var(--text);margin-bottom:4px}
    .shoot-summary-list{font-size:11px;color:var(--text-light);line-height:1.8;padding-left:16px}
    .shoot-summary-list li{margin-bottom:2px}
    .shoot-summary-list .good{color:var(--success)}
    .shoot-summary-list .bad{color:#FF8A9A}
    .shoot-summary-list .tip{color:var(--primary-deep)}
    .shoot-history-item{display:flex;align-items:center;gap:10px;padding:10px 12px;background:rgba(255,158,199,.04);border-radius:10px;cursor:pointer;transition:background .2s}
    .shoot-history-item:active{background:rgba(255,158,199,.1)}
    .shoot-history-item.sel{border:2px solid var(--primary);background:rgba(255,158,199,.08)}
    .shoot-history-thumb{width:48px;height:48px;border-radius:8px;background:rgba(255,158,199,.1);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;overflow:hidden}
    .shoot-history-thumb img{width:100%;height:100%;object-fit:cover}
    .shoot-history-body{flex:1;min-width:0}
    .shoot-history-date{font-size:12px;font-weight:600;color:var(--text)}
    .shoot-history-meta{font-size:10px;color:var(--text-faint);margin-top:2px}
    .shoot-history-score{font-size:18px;font-weight:800;color:var(--primary-deep);flex-shrink:0}
    .shoot-compare-item{flex:1;text-align:center;padding:10px}
    .shoot-compare-vs{font-size:20px;font-weight:800;color:var(--text-faint);flex-shrink:0;display:flex;align-items:center}
    .shoot-compare-label{font-size:10px;color:var(--text-faint);margin-bottom:2px}
    .shoot-compare-val{font-size:22px;font-weight:800}
    .shoot-compare-diff{font-size:10px;margin-top:2px;font-weight:600}
    .shoot-compare-diff.up{color:var(--success)}
    .shoot-compare-diff.down{color:#FF8A9A}
    .shoot-know-card{background:rgba(255,158,199,.04);border-radius:12px;padding:12px 14px}
    .shoot-know-title{font-size:13px;font-weight:700;color:var(--text);margin-bottom:6px}
    .shoot-know-tags{display:flex;flex-wrap:wrap;gap:4px}
    .shoot-know-tag{padding:3px 10px;border-radius:10px;font-size:11px;background:rgba(255,158,199,.12);color:var(--primary-deep);font-weight:600;cursor:pointer;transition:all .2s}
    .shoot-know-tag:active{background:var(--primary);color:#fff}
    .shoot-know-content{font-size:11px;color:var(--text-light);line-height:1.8;margin-top:8px;padding:8px 10px;background:rgba(255,158,199,.06);border-radius:10px;display:none}
    .shoot-know-content.show{display:block}
    .shoot-compare-analysis{font-size:11px;color:var(--text-light);line-height:1.8;padding:8px 10px;background:rgba(168,224,160,.08);border-radius:10px;margin-top:8px}
  `;
  document.head.appendChild(s);
}

/* ===== 数据存储 ===== */
function getShoots(){ return DB.get('shoots')||[]; }
function setShoots(arr){ DB.set('shoots',arr); }

/* ===== 摄影知识库 ===== */
const SHOOT_KNOWLEDGE = {
  camera_move: {
    title: '运镜手法',
    icon: '🎥',
    items: [
      {name:'推',desc:'镜头向前推进，主体由小变大。适合突出人物表情或细节，营造紧张感。新手提示：推的速度要均匀，不要忽快忽慢。'},
      {name:'拉',desc:'镜头向后拉远，主体由大变小。适合展示环境全貌，或表达离别、结束情绪。新手提示：先想好拉到什么位置停下。'},
      {name:'摇',desc:'机位不动，水平转动镜头。适合展示宽广场景，或跟随移动物体。新手提示：转动速度要慢且稳，建议用三脚架。'},
      {name:'移',desc:'相机沿水平方向移动拍摄。适合展示空间关系，增强立体感。新手提示：移动要平滑，可以借助滑轨或稳定器。'},
      {name:'跟',desc:'镜头跟随主体一起移动。适合运动场景，保持主体始终在画面中。新手提示：注意和主体保持固定距离。'},
      {name:'升降',desc:'镜头垂直方向移动。适合展示高大建筑或从特殊角度呈现画面。新手提示：慢慢升降，避免突然变化。'}
    ]
  },
  composition: {
    title: '构图法则',
    icon: '🖼️',
    items: [
      {name:'三分法',desc:'将画面横竖各分三等份，把主体放在交叉点或线上。最常用、最安全的构图方式。新手提示：手机设置里开启九宫格辅助线！'},
      {name:'对称构图',desc:'画面左右或上下对称，给人平衡、稳定、庄重的感觉。适合建筑、倒影等。新手提示：拍摄时站正中间，注意水平线。'},
      {name:'引导线',desc:'利用画面中的线条（道路、栏杆、河流）引导观众视线看向主体。新手提示：道路、走廊、桥梁都是天然引导线。'},
      {name:'框架构图',desc:'利用门框、窗户、树枝等形成"框"，把主体框在里面。新手提示：框不一定是完整的，半框也有同样效果。'},
      {name:'留白',desc:'画面中留出大面积空白区域，突出主体，营造意境。新手提示：天空、墙面、水面都可以作为留白区域。'}
    ]
  },
  exposure: {
    title: '曝光基础',
    icon: '☀️',
    items: [
      {name:'光圈',desc:'控制进光量和景深。f值越小，光圈越大，背景越虚化，适合拍人像。f值越大，前后都清晰，适合拍风景。新手提示：拍人用f/2.8左右，拍景用f/8~f/11。'},
      {name:'快门速度',desc:'控制曝光时间和运动模糊。快门越快越能凝固瞬间（拍运动），越慢越能拍出流动感（拍水流/车轨）。新手提示：手持不要低于1/60秒，否则容易糊。'},
      {name:'ISO',desc:'感光度，数值越高画面越亮但噪点越多。光线好时用低ISO（100~400），暗光可适当调高。新手提示：宁可欠曝后期调亮，也不要ISO开太高。'},
      {name:'曝光三要素关系',desc:'光圈、快门、ISO三者相互配合。光圈大一档=快门快一档=ISO降一档。新手提示：先定光圈（看你要什么效果），再调快门和ISO。'},
      {name:'白平衡',desc:'调整色温，让白色看起来是真正的白色。自动白平衡(AWB)日常够用，特殊情况可手动调整。新手提示：阴天偏蓝、白炽灯偏黄，可后期调整。'}
    ]
  }
};

/* ===== AI分析引擎（预设规则） ===== */
function analyzeShoot(file, meta){
  const isVideo = file.type && file.type.startsWith('video/');
  const sizeMB = file.size / 1024 / 1024;
  const name = file.name || '';

  // 基于文件特征模拟分析
  let cameraWork = 0, composition = 0, lighting = 0, framing = 0, stability = 0, rhythm = 0;

  // 文件大小影响评分（模拟不同质量的拍摄）
  if(sizeMB > 5){ cameraWork += 15; composition += 14; }
  else if(sizeMB > 2){ cameraWork += 12; composition += 11; }
  else { cameraWork += 8; composition += 7; }

  // 文件名关键词分析
  const nl = name.toLowerCase();
  if(nl.includes('landscape')||nl.includes('风景')||nl.includes('nature')){ composition += 4; framing += 3; }
  if(nl.includes('portrait')||nl.includes('人像')||nl.includes('portrait')){ cameraWork += 3; lighting += 4; }
  if(nl.includes('night')||nl.includes('夜景')||nl.includes('夜景')){ lighting += 2; }
  if(nl.includes('macro')||nl.includes('微距')||nl.includes('close')){ cameraWork += 3; composition += 3; }

  // 视频额外分析
  if(isVideo){
    stability = sizeMB > 8 ? 16 : sizeMB > 4 ? 13 : 10;
    rhythm = sizeMB > 8 ? 15 : sizeMB > 4 ? 12 : 9;
    cameraWork += sizeMB > 6 ? 4 : 2;
  } else {
    stability = 17;
    rhythm = 14;
  }

  // 基础分 + 随机波动（模拟真实分析的不确定性）
  lighting += 11 + Math.floor(Math.random() * 5);
  framing += 10 + Math.floor(Math.random() * 5);
  if(!isVideo){ rhythm -= 2; }

  // 限制范围 0-20
  const clamp = v => Math.max(0, Math.min(20, v));
  cameraWork = clamp(cameraWork);
  composition = clamp(composition);
  lighting = clamp(lighting);
  framing = clamp(framing);
  stability = clamp(stability);
  rhythm = clamp(rhythm);

  // 综合评分 0-100
  const total = Math.round(
    (cameraWork + composition + lighting + framing + stability + rhythm) / 120 * 100
  );

  // 生成分析建议
  const strengths = [], weaknesses = [], tips = [];

  if(cameraWork >= 15){ strengths.push('运镜手法娴熟，画面过渡自然流畅'); }
  else if(cameraWork >= 10){ strengths.push('运镜基本稳定，有意识地控制镜头移动'); }
  else { weaknesses.push('运镜不够平稳，建议放慢速度或使用稳定器'); tips.push('试试三脚架或手机稳定器，能让画面稳如磐石'); }

  if(composition >= 15){ strengths.push('构图讲究，主体突出，画面有层次感'); }
  else if(composition >= 10){ strengths.push('构图基本合格，主体位置合理'); }
  else { weaknesses.push('构图可以更有想法，主体位置不够突出'); tips.push('开启手机九宫格辅助线，把主体放在交叉点上'); }

  if(lighting >= 15){ strengths.push('光线运用出色，明暗对比恰到好处'); }
  else if(lighting >= 10){ strengths.push('光线充足，曝光基本准确'); }
  else { weaknesses.push('光线处理有提升空间，注意曝光和阴影'); tips.push('顺光拍摄主体清晰，侧光更有立体感，逆光需要补光'); }

  if(framing >= 15){ strengths.push('景别选择恰当，画面元素安排合理'); }
  else if(framing >= 10){ strengths.push('景别基本正确，画面内容清晰'); }
  else { weaknesses.push('景别可以更精确，画面中有些杂乱元素'); tips.push('拍摄前扫一眼画面边缘，去掉无关杂物'); }

  if(stability >= 15){ strengths.push('画面稳定性好，手持或设备防抖表现出色'); }
  else if(stability >= 10){ strengths.push('画面基本稳定，轻微晃动在可接受范围'); }
  else { weaknesses.push('画面晃动明显，影响观看体验'); tips.push('双手持机，肘部夹紧身体，或者靠着墙壁/栏杆拍摄'); }

  if(rhythm >= 15){ strengths.push('拍摄节奏把控好，镜头停留时间适中'); }
  else if(rhythm >= 10){ strengths.push('拍摄节奏基本合理'); }
  else { weaknesses.push('节奏感可以加强，部分镜头停留时间过长或过短'); tips.push('每个镜头停留3-5秒，给观众足够的观察时间'); }

  if(strengths.length === 0){ strengths.push('开始拍摄就是进步，多拍多练会越来越好！'); }
  if(tips.length === 0){ tips.push('继续保持现在的拍摄状态，可以尝试挑战更复杂的场景'); }

  return {
    cameraWork, composition, lighting, framing, stability, rhythm,
    total,
    strengths,
    weaknesses,
    tips,
    isVideo,
    sizeMB: Math.round(sizeMB * 10) / 10,
    name
  };
}

function getScoreColor(score){
  if(score >= 80) return {bg:'linear-gradient(135deg,var(--green),#5BA050)',color:'#fff',label:'优秀'};
  if(score >= 60) return {bg:'linear-gradient(135deg,#FFB84D,#FF9A3C)',color:'#fff',label:'良好'};
  if(score >= 40) return {bg:'linear-gradient(135deg,#FF8A9A,#FF6B7A)',color:'#fff',label:'待提高'};
  return {bg:'linear-gradient(135deg,#C0B8D8,#A098C0)',color:'#fff',label:'继续加油'};
}

function getItemBarColor(score){
  if(score >= 15) return 'linear-gradient(135deg,var(--green),#5BA050)';
  if(score >= 10) return 'linear-gradient(135deg,#FFB84D,#FF9A3C)';
  return 'linear-gradient(135deg,#FF8A9A,#FF6B7A)';
}

/* ===== 主入口 ===== */
function renderShoot(){
  injectShootStyle();
  const v = document.getElementById('view-shoot');
  state.shootTab = state.shootTab || 'upload';
  state.shootFile = state.shootFile || null;
  state.shootResult = state.shootResult || null;
  state.shootPreview = state.shootPreview || null;
  state.shootSelected = state.shootSelected || [];
  state.shootKnowOpen = state.shootKnowOpen || {};

  const tab = state.shootTab;
  const shoots = getShoots();

  v.innerHTML = `
    <div class="hero">
      <div class="hero-inner">
        <div class="hero-text">
          <div class="hero-emoji">📸</div>
          <div><h1>拍摄学习</h1><div class="shoot-hero-sub">上传作品 · AI分析 · 成长笔记</div></div>
        </div>
      </div>
    </div>

    <div class="shoot-tabs">
      ${[
        {key:'upload',label:'📤 上传分析',ico:''},
        {key:'history',label:'📋 历史记录',ico:''},
        {key:'compare',label:'📊 对比进步',ico:''},
        {key:'knowledge',label:'📚 知识库',ico:''}
      ].map(t=>`
        <div class="shoot-tab ${tab===t.key?'sel':''}" onclick="switchShootTab('${t.key}')">${t.label}</div>
      `).join('')}
    </div>

    <div class="content">
      ${tab==='upload' ? renderShootUpload() : ''}
      ${tab==='history' ? renderShootHistory(shoots) : ''}
      ${tab==='compare' ? renderShootCompare(shoots) : ''}
      ${tab==='knowledge' ? renderShootKnowledge() : ''}
    </div>
  `;

  // 恢复文件预览
  if(tab==='upload' && state.shootPreview){
    const preview = document.getElementById('shoot-preview');
    if(preview){
      preview.innerHTML = renderPreviewHTML(state.shootPreview);
    }
  }
}

function switchShootTab(key){
  state.shootTab = key;
  state.shootSelected = [];
  renderShoot();
}

/* ===== 上传分析页 ===== */
function renderShootUpload(){
  if(state.shootResult){
    return renderShootResult(state.shootResult);
  }

  return `
    ${state.shootPreview ? `
      <div class="shoot-preview-wrap" id="shoot-preview">
        ${renderPreviewHTML(state.shootPreview)}
      </div>
    ` : `
      <div class="shoot-upload-area" onclick="triggerShootUpload()">
        <div class="shoot-upload-ico">📸</div>
        <div class="shoot-upload-text">点击上传拍摄作品</div>
        <div class="shoot-upload-hint">支持图片和视频文件</div>
      </div>
    `}
    <input type="file" id="shoot-file-input" accept="image/*,video/*" style="display:none" onchange="handleShootFile(event)">

    ${state.shootPreview ? `
      <div style="display:flex;gap:8px;margin:12px 14px">
        <button class="btn btn-ghost btn-sm" style="flex:1" onclick="clearShootPreview()">重新选择</button>
        <button class="btn btn-blue btn-sm" style="flex:1" onclick="startShootAnalysis()">🔍 开始分析</button>
      </div>
    ` : ''}

    <div class="card" style="margin:12px 14px">
      <div class="card-title"><span class="ico">💡</span>拍摄小贴士</div>
      <div style="font-size:11px;color:var(--text-light);line-height:1.8">
        📱 开启手机九宫格辅助线<br>
        🤲 双手持机，肘部夹紧身体<br>
        🎯 拍摄前想好你想表达什么<br>
        ☀️ 尽量利用自然光，避免逆光<br>
        📐 把主体放在三分线交叉点上
      </div>
    </div>
  `;
}

function renderPreviewHTML(file){
  if(!file) return '';
  const url = URL.createObjectURL(file);
  const isVideo = file.type && file.type.startsWith('video/');
  if(isVideo){
    return `<video src="${url}" controls style="width:100%;max-height:240px;object-fit:contain"></video>
      <div class="shoot-preview-remove" onclick="event.stopPropagation();clearShootPreview()">✕</div>`;
  }
  return `<img src="${url}" alt="预览">
    <div class="shoot-preview-remove" onclick="event.stopPropagation();clearShootPreview()">✕</div>`;
}

function triggerShootUpload(){
  document.getElementById('shoot-file-input').click();
}

function handleShootFile(e){
  const file = e.target.files[0];
  if(!file) return;
  state.shootFile = file;
  state.shootPreview = file;
  state.shootResult = null;
  renderShoot();
}

function clearShootPreview(){
  state.shootFile = null;
  state.shootPreview = null;
  state.shootResult = null;
  renderShoot();
}

function startShootAnalysis(){
  if(!state.shootFile){ toast('请先上传拍摄作品'); return; }
  const file = state.shootFile;

  // 模拟分析延迟
  const loadingId = 'shoot-analyze-loading';
  const container = document.getElementById('view-shoot');
  const loading = document.createElement('div');
  loading.id = loadingId;
  loading.innerHTML = `
    <div class="card" style="margin:12px 14px;text-align:center;padding:24px">
      <div style="font-size:32px;margin-bottom:8px">🔍</div>
      <div style="font-size:13px;font-weight:600;color:var(--text)">AI 正在分析你的作品...</div>
      <div class="progress" style="margin-top:10px"><div class="progress-bar" style="width:0%;transition:width .3s" id="shoot-progress-bar"></div></div>
    </div>
  `;

  const contentEl = container.querySelector('.content');
  if(contentEl) contentEl.appendChild(loading);

  let pct = 0;
  const progressInterval = setInterval(()=>{
    pct += Math.random() * 15 + 5;
    if(pct >= 100){ pct = 100; clearInterval(progressInterval); }
    const bar = document.getElementById('shoot-progress-bar');
    if(bar) bar.style.width = pct + '%';
  }, 200);

  setTimeout(()=>{
    clearInterval(progressInterval);
    const bar = document.getElementById('shoot-progress-bar');
    if(bar) bar.style.width = '100%';

    setTimeout(()=>{
      const result = analyzeShoot(file, {});
      state.shootResult = result;
      // 自动保存到历史记录
      saveShootRecord(result, file);
      const ld = document.getElementById(loadingId);
      if(ld) ld.remove();
      renderShoot();
      toast('分析完成！');
    }, 400);
  }, 1500);
}

function saveShootRecord(result, file){
  const shoots = getShoots();
  let thumbnail = null;
  if(state.shootPreview){
    try {
      thumbnail = URL.createObjectURL(state.shootPreview);
    } catch(e){}
  }
  shoots.push({
    id: Date.now(),
    date: getDateKey(new Date()),
    time: new Date().toLocaleString('zh-CN'),
    name: result.name,
    isVideo: result.isVideo,
    total: result.total,
    cameraWork: result.cameraWork,
    composition: result.composition,
    lighting: result.lighting,
    framing: result.framing,
    stability: result.stability,
    rhythm: result.rhythm,
    strengths: result.strengths,
    weaknesses: result.weaknesses,
    tips: result.tips,
    thumbnail,
    sizeMB: result.sizeMB
  });
  setShoots(shoots);
}

function renderShootResult(result){
  const sc = getScoreColor(result.total);
  const dimensions = [
    {key:'cameraWork',label:'运镜',val:result.cameraWork},
    {key:'composition',label:'构图',val:result.composition},
    {key:'lighting',label:'光线',val:result.lighting},
    {key:'framing',label:'景别',val:result.framing},
    {key:'stability',label:'稳定性',val:result.stability},
    {key:'rhythm',label:'节奏',val:result.rhythm}
  ];

  return `
    <div class="card" style="margin:0 14px">
      <div class="card-title">📊 分析结果</div>
      <div class="shoot-score-circle" style="background:${sc.bg};color:${sc.color}">
        <div class="shoot-score-num">${result.total}</div>
        <div class="shoot-score-lab">${sc.label}</div>
      </div>
      <div style="text-align:center;font-size:11px;color:var(--text-faint);margin-bottom:10px">
        ${result.isVideo?'🎬 视频':'📷 图片'} · ${result.sizeMB}MB
      </div>
      <div class="shoot-score-detail">
        ${dimensions.map(d=>`
          <div class="shoot-score-item">
            <div class="shoot-score-item-name">
              <span>${d.label}</span>
              <span class="shoot-score-item-val">${d.val}</span>
            </div>
            <div class="shoot-score-item-bar">
              <div class="shoot-score-item-fill" style="width:${d.val/20*100}%;background:${getItemBarColor(d.val)}"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="card" style="margin:10px 14px">
      <div class="card-title"><span class="ico">✅</span>本次优点</div>
      <ul class="shoot-summary-list">
        ${result.strengths.map(s=>`<li class="good">${s}</li>`).join('')}
      </ul>
    </div>

    <div class="card" style="margin:0 14px 10px">
      <div class="card-title"><span class="ico">⚠️</span>拍摄失误</div>
      <ul class="shoot-summary-list">
        ${result.weaknesses.map(w=>`<li class="bad">${w}</li>`).join('')}
      </ul>
    </div>

    <div class="card" style="margin:0 14px 10px">
      <div class="card-title"><span class="ico">💡</span>改进建议</div>
      <ul class="shoot-summary-list">
        ${result.tips.map(t=>`<li class="tip">${t}</li>`).join('')}
      </ul>
    </div>

    <div style="padding:0 14px 14px">
      <button class="btn btn-blue btn-sm" style="width:100%;justify-content:center" onclick="resetShootUpload()">📸 再拍一次</button>
    </div>
  `;
}

function resetShootUpload(){
  state.shootFile = null;
  state.shootPreview = null;
  state.shootResult = null;
  renderShoot();
}

/* ===== 历史记录页 ===== */
function renderShootHistory(shoots){
  if(shoots.length === 0){
    return `
      <div class="card"><div class="empty"><span class="emoji">📸</span>还没有拍摄记录<br>上传你的第一张作品开始学习吧</div></div>
    `;
  }

  const reversed = [...shoots].reverse();
  const totalAvg = Math.round(shoots.reduce((s,r)=>s+r.total,0) / shoots.length);

  return `
    <div class="card" style="margin:0 14px;background:linear-gradient(135deg,#FFE7A8,#FFD1E8)">
      <div class="stat-row">
        <div class="stat-cell"><div class="stat-num">${shoots.length}</div><div class="stat-lab">累计作品</div></div>
        <div class="stat-cell"><div class="stat-num green">${totalAvg}</div><div class="stat-lab">平均评分</div></div>
        <div class="stat-cell"><div class="stat-num orange">${shoots.filter(s=>s.total>=80).length}</div><div class="stat-lab">优秀作品</div></div>
      </div>
    </div>

    <div class="card" style="margin:10px 14px">
      <div class="card-title">📋 历史记录（最新在前）</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${reversed.map((s,i)=>{
          const sc = getScoreColor(s.total);
          return `
            <div class="shoot-history-item" onclick="viewShootDetail(${shoots.length-1-i})">
              <div class="shoot-history-thumb">
                ${s.thumbnail ? `<img src="${s.thumbnail}" alt="">` : (s.isVideo?'🎬':'📷')}
              </div>
              <div class="shoot-history-body">
                <div class="shoot-history-date">${s.time}</div>
                <div class="shoot-history-meta">${s.isVideo?'视频':'图片'} · ${s.sizeMB}MB</div>
              </div>
              <div class="shoot-history-score" style="color:${sc.color.replace('#fff','var(--primary-deep)')}">${s.total}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function viewShootDetail(index){
  const shoots = getShoots();
  const s = shoots[index];
  if(!s) return;

  state.shootResult = {
    cameraWork: s.cameraWork,
    composition: s.composition,
    lighting: s.lighting,
    framing: s.framing,
    stability: s.stability,
    rhythm: s.rhythm,
    total: s.total,
    strengths: s.strengths,
    weaknesses: s.weaknesses,
    tips: s.tips,
    isVideo: s.isVideo,
    sizeMB: s.sizeMB,
    name: s.name
  };
  state.shootTab = 'upload';
  state.shootPreview = null;
  renderShoot();
}

/* ===== 对比进步页 ===== */
function renderShootCompare(shoots){
  if(shoots.length < 2){
    return `
      <div class="card">
        <div class="empty">
          <span class="emoji">📊</span>
          需要至少两次拍摄记录才能对比<br>
          <span style="font-size:11px;color:var(--text-faint)">去「上传分析」多拍几次吧</span>
        </div>
      </div>
    `;
  }

  const reversed = [...shoots].reverse();

  const html = `
    <div class="card" style="margin:0 14px">
      <div class="card-title">📊 选择两次记录进行对比</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${reversed.map((s,i)=>{
          const idx = shoots.length-1-i;
          const sel = state.shootSelected.includes(idx);
          return `
            <div class="shoot-history-item ${sel?'sel':''}" onclick="toggleShootSelect(${idx})">
              <div class="shoot-history-thumb">
                ${s.thumbnail ? `<img src="${s.thumbnail}" alt="">` : (s.isVideo?'🎬':'📷')}
              </div>
              <div class="shoot-history-body">
                <div class="shoot-history-date">${s.time}</div>
                <div class="shoot-history-meta">${s.isVideo?'视频':'图片'} · ${s.total}分</div>
              </div>
              <div style="font-size:20px">${sel?'✅':'⬜'}</div>
            </div>
          `;
        }).join('')}
      </div>
      <div style="margin-top:10px;font-size:10px;color:var(--text-faint)">已选择 ${state.shootSelected.length}/2 条记录</div>
    </div>

    ${state.shootSelected.length === 2 ? renderShootCompareResult(shoots, state.shootSelected[0], state.shootSelected[1]) : ''}
  `;

  return html;
}

function toggleShootSelect(index){
  const idx = state.shootSelected.indexOf(index);
  if(idx >= 0){
    state.shootSelected.splice(idx, 1);
  } else {
    if(state.shootSelected.length >= 2){
      state.shootSelected.shift();
    }
    state.shootSelected.push(index);
  }
  renderShoot();
}

function renderShootCompareResult(shoots, idx1, idx2){
  const a = shoots[idx1];
  const b = shoots[idx2];
  if(!a || !b) return '';

  // 确保 a 是较早的，b 是较晚的
  const older = a.id < b.id ? a : b;
  const newer = a.id < b.id ? b : a;

  const diff = newer.total - older.total;
  const diffPct = older.total > 0 ? Math.round(diff / older.total * 100) : 0;

  const dimensions = [
    {key:'cameraWork',label:'运镜'},
    {key:'composition',label:'构图'},
    {key:'lighting',label:'光线'},
    {key:'framing',label:'景别'},
    {key:'stability',label:'稳定性'},
    {key:'rhythm',label:'节奏'}
  ];

  // 生成进步分析
  const improvements = [];
  const regressions = [];
  dimensions.forEach(d=>{
    const dDiff = newer[d.key] - older[d.key];
    if(dDiff > 0) improvements.push(`${d.label} +${dDiff}分，有进步！`);
    else if(dDiff < 0) regressions.push(`${d.label} ${dDiff}分，需加强练习`);
  });

  let analysis = '';
  if(diff > 0){
    analysis = `🎉 恭喜！综合评分提升了 ${diff} 分（+${diffPct}%），你的拍摄水平在进步！`;
    if(improvements.length > 0) analysis += `\n亮点：${improvements.join('；')}`;
    if(regressions.length > 0) analysis += `\n注意：${regressions.join('；')}`;
  } else if(diff < 0){
    analysis = `💪 综合评分下降了 ${Math.abs(diff)} 分（${diffPct}%），别灰心，每次拍摄都是学习！`;
    if(regressions.length > 0) analysis += `\n需要加强：${regressions.join('；')}`;
    if(improvements.length > 0) analysis += `\n亮点：${improvements.join('；')}`;
  } else {
    analysis = `📊 两次评分相同，表现稳定！保持状态，尝试挑战更有难度的拍摄场景。`;
  }

  return `
    <div class="card" style="margin:10px 14px;background:linear-gradient(135deg,#E8F0FF,#FFE7F5)">
      <div class="card-title">📈 对比分析</div>
      <div style="display:flex;align-items:center;gap:8px">
        <div class="shoot-compare-item">
          <div class="shoot-compare-label">${older.time}</div>
          <div class="shoot-compare-val" style="color:${getScoreColor(older.total).color.replace('#fff','var(--primary-deep)')}">${older.total}</div>
          <div class="shoot-compare-label" style="margin-top:2px">分</div>
        </div>
        <div class="shoot-compare-vs">VS</div>
        <div class="shoot-compare-item">
          <div class="shoot-compare-label">${newer.time}</div>
          <div class="shoot-compare-val" style="color:${getScoreColor(newer.total).color.replace('#fff','var(--primary-deep)')}">${newer.total}</div>
          <div class="shoot-compare-label" style="margin-top:2px">分</div>
        </div>
      </div>
      <div style="text-align:center;margin-top:6px">
        <span class="shoot-compare-diff ${diff>=0?'up':'down'}">
          ${diff>=0?'↑':'↓'} ${Math.abs(diff)}分 (${diff>=0?'+':''}${diffPct}%)
        </span>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-top:10px">
        ${dimensions.map(d=>{
          const dDiff = newer[d.key] - older[d.key];
          return `
            <div class="shoot-score-item">
              <div class="shoot-score-item-name">
                <span>${d.label}</span>
                <span style="font-size:10px;color:${dDiff>=0?'var(--success)':'#FF8A9A'}">${dDiff>=0?'+':''}${dDiff}</span>
              </div>
              <div style="display:flex;gap:2px;margin-top:3px">
                <div style="flex:1;height:4px;background:rgba(255,158,199,.2);border-radius:4px;overflow:hidden">
                  <div style="height:100%;background:#FFB84D;width:${older[d.key]/20*100}%"></div>
                </div>
                <div style="flex:1;height:4px;background:rgba(255,158,199,.2);border-radius:4px;overflow:hidden">
                  <div style="height:100%;background:${dDiff>=0?'var(--green)':'#FF8A9A'};width:${newer[d.key]/20*100}%"></div>
                </div>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:9px;color:var(--text-faint);margin-top:2px">
                <span>前</span><span>后</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="shoot-compare-analysis">${analysis.replace(/\n/g,'<br>')}</div>
    </div>
  `;
}

/* ===== 知识库页 ===== */
function renderShootKnowledge(){
  const open = state.shootKnowOpen || {};

  return Object.entries(SHOOT_KNOWLEDGE).map(([key,cat])=>`
    <div class="card shoot-know-card" style="margin:0 14px 10px">
      <div class="shoot-know-title">${cat.icon} ${cat.title}</div>
      <div class="shoot-know-tags">
        ${cat.items.map((item,idx)=>{
          const tagKey = key + '_' + idx;
          return `
            <div class="shoot-know-tag ${open[tagKey]?'sel':''}" onclick="toggleShootKnow('${key}',${idx})">${item.name}</div>
          `;
        }).join('')}
      </div>
      ${cat.items.map((item,idx)=>{
        const tagKey = key + '_' + idx;
        return `
          <div class="shoot-know-content ${open[tagKey]?'show':''}">${item.desc}</div>
        `;
      }).join('')}
    </div>
  `).join('');
}

function toggleShootKnow(catKey, idx){
  if(!state.shootKnowOpen) state.shootKnowOpen = {};
  const tagKey = catKey + '_' + idx;
  state.shootKnowOpen[tagKey] = !state.shootKnowOpen[tagKey];
  renderShoot();
}

/* ===== 学习模块 ===== */

function getWords(){ return DB.get('words')||[]; }
function setWords(w){ DB.set('words',w); }
function getStudyLog(){ return DB.get('studyLog')||{}; }
function setStudyLog(l){ DB.set('studyLog',l); }
function getDailyGoal(){ return DB.get('dailyGoal')||10; }
function setDailyGoal(g){ DB.set('dailyGoal',g); }

function getTodayStudyCount(){
  const log = getStudyLog();
  const today = getDateKey(new Date());
  return log[today]||0;
}

function renderStudy(){
  const v = document.getElementById('view-study');
  const words = getWords();
  const todayCount = getTodayStudyCount();
  const goal = getDailyGoal();
  const goalPct = Math.min(Math.round(todayCount/goal*100),100);
  const needReview = words.filter(w=>!w.mastered).length;

  v.innerHTML = `
    <div class="hero">
      <div class="hero-inner">
        <div class="hero-text">
          <div class="hero-emoji">📚</div>
          <div><h1>学习</h1><div class="sub">单词卡片 · 翻转学习</div></div>
        </div>
        <button class="btn" onclick="showWordModal()">+ 单词</button>
      </div>
    </div>
    <div class="content">
      <div class="card" style="background:linear-gradient(135deg,#FFE7A8,#FFD1E8)">
        <div class="study-stats">
          <div class="ss-cell"><div class="ss-num">${words.length}</div><div class="ss-lab">累计词汇</div></div>
          <div class="ss-divider"></div>
          <div class="ss-cell"><div class="ss-num green">${todayCount}</div><div class="ss-lab">今日学习</div></div>
          <div class="ss-divider"></div>
          <div class="ss-cell"><div class="ss-num orange">${needReview}</div><div class="ss-lab">待复习</div></div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          <span class="ico">🌸</span>今日目标
          <span class="tag">${todayCount}/${goal}</span>
          <button class="btn btn-sm btn-ghost" style="margin-left:auto" onclick="showGoalModal()">设置</button>
        </div>
        <div class="flower-progress">
          <div class="flower ${goalPct>=100?'bloom':''}" data-pct="${goalPct}">
            ${renderFlower(goalPct)}
          </div>
          <div class="flower-info">
            <div class="flower-pct">${goalPct}%</div>
            <div class="flower-desc">${renderFlowerDesc(goalPct)}</div>
          </div>
        </div>
      </div>

      <div class="card card-blue">
        <div class="card-title"><span class="ico">📊</span>本周学习趋势</div>
        <div class="chart-wrap"><canvas id="study-chart"></canvas></div>
      </div>

      ${words.length===0 ? `
        <div class="card"><div class="empty"><span class="emoji">📖</span>还没有单词<br>添加你的第一个单词吧</div></div>
      ` : `
        <div class="card">
          <div class="card-title"><span class="ico">🗂</span>单词卡片（点击翻转）</div>
          <div class="word-list">
            ${words.slice(-50).reverse().map((w,i)=>`
              <div class="word-card" onclick="flipCard(this)">
                <div class="word-front">
                  <div class="word-eng">${w.word}</div>
                  ${w.phonetic?`<div class="word-pho">/${w.phonetic}/</div>`:''}
                  <div class="word-hint">点击查看释义</div>
                </div>
                <div class="word-back">
                  <div class="word-eng">${w.word}</div>
                  <div class="word-mean">${w.meaning}</div>
                  <button class="btn btn-sm ${w.mastered?'':'btn-ghost'}" onclick="event.stopPropagation();toggleMastered(${words.length-1-i})">${w.mastered?'已掌握 ✓':'标记掌握'}</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `}
    </div>
  `;

  renderStudyChart();
}

function renderFlower(pct){
  const petals = Math.floor(pct/20);
  let svg = `<svg viewBox="0 0 120 120" style="width:100px;height:100px">`;
  // 花瓣
  for(let i=0;i<5;i++){
    const ang = i*72;
    const color = i<petals ? ['#FF9EC7','#FFB7D5','#FF8AB8','#FF6FAE','#FFC0DB'][i] : '#E8DDE8';
    svg += `<ellipse cx="60" cy="30" rx="13" ry="22" fill="${color}" transform="rotate(${ang} 60 60)" opacity="${i<petals?1:0.4}"/>`;
  }
  // 花心
  svg += `<circle cx="60" cy="60" r="12" fill="#FFE7A8" stroke="#FFB48A" stroke-width="2"/>`;
  svg += `<circle cx="56" cy="56" r="3" fill="#FFF" opacity="0.7"/>`;
  // 茎和叶
  svg += `<path d="M60 70 Q55 85 58 105 Q60 108 62 105 Q65 85 60 70" fill="#A8E0A0"/>`;
  svg += `<ellipse cx="50" cy="90" rx="10" ry="5" fill="#A8E0A0" transform="rotate(-30 50 90)"/>`;
  svg += `</svg>`;
  return svg;
}

function renderFlowerDesc(pct){
  if(pct===0) return '开始你的第一朵花瓣吧 🌱';
  if(pct<20) return '种下了种子 🌱';
  if(pct<40) return '冒出小芽 🌿';
  if(pct<60) return '花苞孕育中 🌹';
  if(pct<80) return '花瓣正在绽放 🌸';
  if(pct<100) return '即将盛开 🌺';
  return '完美绽放！太棒了 🌼✨';
}

function renderStudyChart(){
  const log = getStudyLog();
  const today = new Date();
  const labels=[],data=[];
  for(let i=6;i>=0;i--){
    const d=new Date(today); d.setDate(today.getDate()-i);
    const k=getDateKey(d);
    labels.push(['日','一','二','三','四','五','六'][d.getDay()]);
    data.push(log[k]||0);
  }
  const ctx = document.getElementById('study-chart');
  if(!ctx) return;
  if(window.studyChartInstance) window.studyChartInstance.destroy();
  window.studyChartInstance = new Chart(ctx,{
    type:'bar',
    data:{labels,datasets:[{data,backgroundColor:['#FFD1E8','#FFD1E8','#FFD1E8','#FFD1E8','#FFD1E8','#FFD1E8','#FF9EC7'],borderRadius:8,barThickness:28}]},
    options:{
      plugins:{legend:{display:false}},
      scales:{
        y:{beginAtZero:true,ticks:{font:{size:10},stepSize:1},grid:{color:'rgba(255,158,199,.15)'}},
        x:{grid:{display:false},ticks:{font:{size:11}}}
      },
      maintainAspectRatio:true,aspectRatio:1.8
    }
  });
}

function flipCard(el){
  el.classList.toggle('flipped');
}

function toggleMastered(i){
  const words = getWords();
  if(!words[i]) return;
  words[i].mastered = !words[i].mastered;
  setWords(words);
  // 标记掌握时计入今日学习
  if(words[i].mastered){
    const log = getStudyLog();
    const today = getDateKey(new Date());
    log[today] = (log[today]||0)+1;
    setStudyLog(log);
  }
  renderStudy();
  toast(words[i].mastered?'已标记掌握 +1 🌸':'已取消掌握');
}

function showWordModal(){
  showModal(`
    <div class="modal-header">
      <div class="modal-title">添加单词</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="field"><label>英文单词</label><input class="input" id="w-word" placeholder="beautiful" autofocus></div>
    <div class="field"><label>音标（可选）</label><input class="input" id="w-pho" placeholder="ˈbjuːtɪfl"></div>
    <div class="field"><label>中文释义</label><input class="input" id="w-mean" placeholder="美丽的，漂亮的"></div>
    <button class="btn" style="width:100%;justify-content:center;padding:12px;margin-top:6px" onclick="saveWord()">添加</button>
  `);
}

function saveWord(){
  const word = val('w-word').trim();
  const phonetic = val('w-pho').trim();
  const meaning = val('w-mean').trim();
  if(!word||!meaning){toast('请填写单词和释义');return;}
  const words = getWords();
  words.push({word,phonetic,meaning,mastered:false,ts:Date.now()});
  setWords(words);
  closeModal();
  renderStudy();
  toast('单词已添加 📚');
}

function showGoalModal(){
  const g = getDailyGoal();
  showModal(`
    <div class="modal-header">
      <div class="modal-title">设置每日目标</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="field"><label>每日学习单词数</label>
      <div class="goal-pick">
        ${[5,10,15,20,30,50].map(n=>`<button class="goal-opt ${n===g?'sel':''}" data-n="${n}" onclick="pickGoal(this)">${n}</button>`).join('')}
      </div>
    </div>
    <button class="btn" style="width:100%;justify-content:center;padding:12px;margin-top:6px" onclick="saveGoal()">保存</button>
  `);
}

function pickGoal(el){
  el.parentElement.querySelectorAll('.goal-opt').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
}

function saveGoal(){
  const sel = document.querySelector('.goal-opt.sel');
  if(!sel){toast('请选择目标');return;}
  setDailyGoal(+sel.dataset.n);
  closeModal();
  renderStudy();
  toast('目标已设置 🌸');
}

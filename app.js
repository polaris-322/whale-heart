/* ===== 鲸鱼心工作台 v2 - 主应用 ===== */

const state = {
  currentView:'inspiration',
  order:['inspiration','analysis','plan','account','exercise','study','finance','job','diet','paper','ppt','edit','shoot','makeup'],
  exView:'month',
  theme:'pink',
};

// 数据持久化
const DB = {
  get(k){ try{ return JSON.parse(localStorage.getItem('whale_'+k)); }catch(e){ return null; } },
  set(k,v){ try{ localStorage.setItem('whale_'+k,JSON.stringify(v)); }catch(e){ toast('存储空间不足'); } }
};

// 模块配置
const MODULES = {
  inspiration:{icon:'💡',label:'选题',render:renderInspiration},
  analysis:{icon:'📊',label:'数据',render:renderAnalysis},
  plan:{icon:'📋',label:'计划',render:renderPlan},
  account:{icon:'💰',label:'记账',render:renderAccount},
  exercise:{icon:'🏃',label:'运动',render:renderExercise},
  study:{icon:'📚',label:'学习',render:renderStudy},
  finance:{icon:'📈',label:'理财',render:renderFinance},
  job:{icon:'💼',label:'工作',render:renderJob},
  diet:{icon:'🥗',label:'饮食',render:renderDiet},
  paper:{icon:'📄',label:'论文',render:renderPaper},
  ppt:{icon:'📽',label:'PPT',render:renderPpt},
  edit:{icon:'✂️',label:'剪辑',render:renderEdit},
  shoot:{icon:'📷',label:'拍摄',render:renderShoot},
  makeup:{icon:'💄',label:'化妆',render:renderMakeup},
};

// 主题预设
const THEMES = {
  pink:{primary:'#FF9EC7','primary-light':'#FFD1E8','primary-deep':'#FF6FAE',secondary:'#7EC8F2','secondary-light':'#BFE3F7','secondary-deep':'#4AA8D8'},
  purple:{primary:'#C8A2E8','primary-light':'#E8D5F5','primary-deep':'#A07ACC',secondary:'#FFB48A','secondary-light':'#FFE0CC','secondary-deep':'#E87830'},
  mint:{primary:'#7EC8F2','primary-light':'#BFE3F7','primary-deep':'#4AA8D8',secondary:'#A8E0A0','secondary-light':'#D8F0D0','secondary-deep':'#5BA050'},
  sunset:{primary:'#FFB48A','primary-light':'#FFE0CC','primary-deep':'#E87830',secondary:'#FF8A9A','secondary-light':'#FFC8D0','secondary-deep':'#E05060'},
  lavender:{primary:'#B8A9E8','primary-light':'#DFD7F5','primary-deep':'#8A7ACC',secondary:'#FFD1E8','secondary-light':'#FFE5F0','secondary-deep':'#FF9EC7'},
  ocean:{primary:'#4AA8D8','primary-light':'#A8D8F0','primary-deep':'#2A80B0',secondary:'#5BA050','secondary-light':'#A8D0A0','secondary-deep':'#3A7030'},
};

function applyTheme(name){
  const t = THEMES[name]||THEMES.pink;
  state.theme = name;
  DB.set('theme',name);
  Object.entries(t).forEach(([k,v])=>document.documentElement.style.setProperty('--'+k,v));
}

// ===== 初始化 =====
function init(){
  // 恢复顺序
  const savedOrder = DB.get('moduleOrder');
  if(savedOrder&&savedOrder.length>=6) state.order = savedOrder;
  // 恢复主题
  const savedTheme = DB.get('theme');
  if(savedTheme&&THEMES[savedTheme]) state.theme = savedTheme;
  applyTheme(state.theme);
  // 恢复上次视图
  const lastView = DB.get('lastView');
  if(lastView&&MODULES[lastView]) state.currentView = lastView;

  renderSidebar();
  switchView(state.currentView);
  setupPWA();
  setupSchedule();
}

// ===== 侧边栏 =====
function renderSidebar(){
  const sb = document.getElementById('sidebar');
  sb.innerHTML = `<div class="brand">🐳</div><div class="brand-name">鲸鱼心</div>`;
  state.order.forEach(key=>{
    const m = MODULES[key];
    if(!m) return;
    const item = document.createElement('div');
    item.className = 'nav-item'+(state.currentView===key?' active':'');
    item.dataset.key = key;
    item.draggable = true;
    item.innerHTML = `<span class="ico">${m.icon}</span><span class="lbl">${m.label}</span>`;
    item.onclick = ()=>switchView(key);
    item.addEventListener('dragstart',onDragStart);
    item.addEventListener('dragover',onDragOver);
    item.addEventListener('drop',onDrop);
    item.addEventListener('dragend',onDragEnd);
    sb.appendChild(item);
  });
  // 底部设置按钮
  const setBtn = document.createElement('div');
  setBtn.className = 'nav-item';
  setBtn.style.marginTop = 'auto';
  setBtn.innerHTML = '<span class="ico">⚙️</span><span class="lbl">设置</span>';
  setBtn.onclick = showThemePicker;
  sb.appendChild(setBtn);
}

let dragKey=null;
function onDragStart(e){dragKey=e.currentTarget.dataset.key;e.currentTarget.style.opacity='.4'}
function onDragOver(e){e.preventDefault()}
function onDrop(e){
  e.preventDefault();
  const tk=e.currentTarget.dataset.key;
  if(!dragKey||dragKey===tk)return;
  const from=state.order.indexOf(dragKey),to=state.order.indexOf(tk);
  state.order.splice(to,0,state.order.splice(from,1)[0]);
  DB.set('moduleOrder',state.order);
  renderSidebar();
}
function onDragEnd(e){e.currentTarget.style.opacity='1';dragKey=null}

// ===== 视图切换 =====
function switchView(key){
  state.currentView = key;
  DB.set('lastView',key);
  const main = document.getElementById('main');
  Object.keys(MODULES).forEach(k=>{
    const el = document.getElementById('view-'+k);
    if(el) el.classList.remove('active');
  });
  let view = document.getElementById('view-'+key);
  if(!view){
    view = document.createElement('div');
    view.id = 'view-'+key;
    view.className = 'view active';
    main.appendChild(view);
  }else{view.classList.add('active')}
  if(MODULES[key]&&MODULES[key].render) MODULES[key].render();
  document.querySelectorAll('.nav-item').forEach(el=>el.classList.toggle('active',el.dataset.key===key));
  main.scrollTop=0;
}

// ===== 模态框 =====
function showModal(html){
  closeModal();
  const mask=document.createElement('div');
  mask.className='modal-mask';
  mask.innerHTML=`<div class="modal">${html}</div>`;
  mask.onclick=e=>{if(e.target===mask)closeModal()};
  document.body.appendChild(mask);
}
function closeModal(){const m=document.querySelector('.modal-mask');if(m)m.remove()}

// ===== Toast =====
let toastTimer;
function toast(msg){
  clearTimeout(toastTimer);
  let t=document.querySelector('.toast');if(t)t.remove();
  t=document.createElement('div');t.className='toast';t.textContent=msg;
  document.body.appendChild(t);
  toastTimer=setTimeout(()=>t.remove(),2000);
}

// ===== 辅助 =====
function val(id){const el=document.getElementById(id);return el?el.value:''}
function getDateKey(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function getMonthKey(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`}

// ===== 主题设置 =====
function showThemePicker(){
  showModal(`
    <div class="modal-header">
      <div class="modal-title">🎨 主题颜色</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div style="font-size:12px;color:var(--text-light);margin-bottom:10px">选择你喜欢的配色方案，主色会影响全局按钮和强调元素</div>
    <div class="theme-picker">
      ${Object.entries(THEMES).map(([k,v])=>`
        <div class="theme-dot ${k} ${state.theme===k?'active':''}" onclick="applyTheme('${k}');closeModal();toast('主题已切换 🎨');reloadCurrentView()" title="${k}"></div>
      `).join('')}
    </div>
  `);
}

function reloadCurrentView(){
  if(MODULES[state.currentView]&&MODULES[state.currentView].render){
    MODULES[state.currentView].render();
  }
}

// ===== PWA =====
let deferredPrompt;
function setupPWA(){
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;showPWATip()});
  if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{navigator.serviceWorker.register('./sw.js').catch(()=>{})});
  }
}
function showPWATip(){
  if(DB.get('pwaDismissed'))return;
  setTimeout(()=>{
    const tip=document.createElement('div');tip.className='pwa-tip';
    tip.innerHTML=`<span style="font-size:20px">📲</span><div>添加到手机桌面～<br><b>点击添加</b></div><button class="close" onclick="dismissPWATip()">✕</button>`;
    tip.onclick=e=>{if(e.target.tagName!=='BUTTON')installPWA()};
    document.body.appendChild(tip);
  },3000);
}
function installPWA(){
  if(deferredPrompt){deferredPrompt.prompt();deferredPrompt.userChoice.then(()=>{deferredPrompt=null;dismissPWATip()})}
  else toast('请在浏览器菜单选择"添加到主屏幕" 📲');
}
function dismissPWATip(){const t=document.querySelector('.pwa-tip');if(t)t.remove();DB.set('pwaDismissed',true)}

// ===== 定时任务 =====
function setupSchedule(){
  checkDailyUpdate();
  setInterval(checkDailyUpdate,10*60*1000);
}
function checkDailyUpdate(){
  const now=new Date(),todayKey=getDateKey(now),lastUpdate=DB.get('lastUpdate');
  if(now.getHours()>=9&&lastUpdate!==todayKey){
    DB.set('lastUpdate',todayKey);
    const vStore=DB.get('hotVideos')||{},tStore=DB.get('topics')||{};
    if(vStore[todayKey])delete vStore[todayKey];
    if(tStore[todayKey])delete tStore[todayKey];
    DB.set('hotVideos',vStore);DB.set('topics',tStore);
    if(state.currentView==='inspiration')renderInspiration();
    if(now.getHours()===9||(lastUpdate&&lastUpdate!==todayKey))toast('今日数据已更新 🌸');
  }
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();

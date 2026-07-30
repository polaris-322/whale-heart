/* ===== 每日计划模块 ===== */

function getTodos(){ return DB.get('todos')||[]; }
function setTodos(t){ DB.set('todos',t); }
function getFixedTodos(){ return DB.get('fixedTodos')||[]; }
function setFixedTodos(t){ DB.set('fixedTodos',t); }

function renderPlan(){
  const v = document.getElementById('view-plan');
  const todos = getTodos();
  const fixed = getFixedTodos();
  const today = getDateKey(new Date());
  const todayTodos = todos.filter(t=>t.date===today);
  const done = todayTodos.filter(t=>t.done).length;
  const total = todayTodos.length;
  const pct = total ? Math.round(done/total*100) : 0;

  v.innerHTML = `
    <div class="hero">
      <div class="hero-inner">
        <div class="hero-text">
          <div class="hero-emoji">📋</div>
          <div><h1>每日计划</h1><div class="sub">勾选完成 · 进度可视</div></div>
        </div>
        <button class="btn" onclick="showTodoModal()">+ 待办</button>
      </div>
    </div>
    <div class="content">
      <div class="card">
        <div class="card-title"><span class="ico">🌈</span>今日进度</div>
        <div class="cute-progress">
          <div class="cute-progress-text">${done}/${total} · ${pct}%</div>
          <div class="progress" style="height:16px">
            <div class="progress-bar" style="width:${pct}%"></div>
          </div>
          <div class="cute-progress-emoji">${pct>=100?'🎉 太棒啦！':pct>=50?'💪 继续加油！':'🌸 开始吧！'}</div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          <span class="ico">📌</span>今日待办
          <button class="btn btn-sm btn-ghost" style="margin-left:auto" onclick="addFixedToToday()">导入固定计划</button>
        </div>
        ${todayTodos.length===0 ? `<div class="empty"><span class="emoji">🌸</span>今天还没有待办<br>添加一个开始美好的一天吧</div>` : ''}
        <div class="todo-list">
          ${todayTodos.map((t,i)=>renderTodoItem(t,i,'today')).join('')}
        </div>
      </div>

      <div class="card card-blue">
        <div class="card-title">
          <span class="ico">🔁</span>固定计划
          <button class="btn btn-sm btn-ghost" style="margin-left:auto" onclick="showFixedModal()">+ 添加</button>
        </div>
        ${fixed.length===0 ? `<div class="empty"><span class="emoji">⭐</span>还没有固定计划<br>添加每日重复的待办</div>` : ''}
        <div class="todo-list">
          ${fixed.map((t,i)=>renderTodoItem(t,i,'fixed')).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderTodoItem(t,i,type){
  const priColor = {high:'#FF8A9A',mid:'#FFB48A',low:'#A8E0A0'};
  const priText = {high:'高',mid:'中',low:'低'};
  const priBg = {high:'rgba(255,138,154,.15)',mid:'rgba(255,180,138,.15)',low:'rgba(168,224,160,.15)'};
  return `
    <div class="todo-item ${t.done?'done':''}">
      <label class="todo-check">
        <input type="checkbox" ${t.done?'checked':''} onchange="toggleTodo('${type}',${i})">
        <span class="checkmark"></span>
      </label>
      <div class="todo-content">
        <div class="todo-text">${t.text}</div>
        <span class="priority-tag" style="background:${priBg[t.priority]};color:${priColor[t.priority]}">${priText[t.priority]}</span>
      </div>
      <button class="todo-del" onclick="deleteTodo('${type}',${i})">✕</button>
    </div>
  `;
}

function showTodoModal(){
  showModal(`
    <div class="modal-header">
      <div class="modal-title">添加待办</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="field"><label>待办内容</label><input class="input" id="t-text" placeholder="例如：拍摄秋季穿搭视频" autofocus></div>
    <div class="field"><label>优先级</label>
      <div class="priority-pick">
        <label class="pri-opt"><input type="radio" name="pri" value="high"><span style="background:rgba(255,138,154,.15);color:#FF8A9A">高</span></label>
        <label class="pri-opt"><input type="radio" name="pri" value="mid" checked><span style="background:rgba(255,180,138,.15);color:#FFB48A">中</span></label>
        <label class="pri-opt"><input type="radio" name="pri" value="low"><span style="background:rgba(168,224,160,.15);color:#5BA050">低</span></label>
      </div>
    </div>
    <button class="btn" style="width:100%;justify-content:center;padding:12px;margin-top:6px" onclick="saveTodo()">添加</button>
  `);
}

function saveTodo(){
  const text = val('t-text');
  if(!text){toast('请输入待办内容');return;}
  const pri = document.querySelector('input[name=pri]:checked').value;
  const todos = getTodos();
  todos.push({text,priority:pri,done:false,date:getDateKey(new Date()),ts:Date.now()});
  setTodos(todos);
  closeModal();
  renderPlan();
  toast('待办已添加 📋');
}

function toggleTodo(type,i){
  if(type==='today'){
    const todos = getTodos();
    const today = getDateKey(new Date());
    const idx = todos.findIndex(t=>t.date===today);
    const todayList = todos.filter(t=>t.date===today);
    todayList[i].done = !todayList[i].done;
    setTodos(todos);
    renderPlan();
  }
}

function deleteTodo(type,i){
  if(type==='today'){
    const todos = getTodos();
    const today = getDateKey(new Date());
    const idx = todos.findIndex(t=>t.date===today);
    const tIdx = todos.findIndex((t,idx2)=> t.date===today && idx2>=0);
    // 简化：找到第i个今天的todo
    let count=0;
    const realIdx = todos.findIndex(t=>{
      if(t.date===today){ if(count===i) return true; count++; }
      return false;
    });
    if(realIdx>=0) todos.splice(realIdx,1);
    setTodos(todos);
  } else {
    const fixed = getFixedTodos();
    fixed.splice(i,1);
    setFixedTodos(fixed);
  }
  renderPlan();
}

function showFixedModal(){
  showModal(`
    <div class="modal-header">
      <div class="modal-title">添加固定计划</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="field"><label>内容（每日重复）</label><input class="input" id="f-text" placeholder="例如：回复评论30分钟" autofocus></div>
    <div class="field"><label>优先级</label>
      <div class="priority-pick">
        <label class="pri-opt"><input type="radio" name="pri" value="high"><span style="background:rgba(255,138,154,.15);color:#FF8A9A">高</span></label>
        <label class="pri-opt"><input type="radio" name="pri" value="mid" checked><span style="background:rgba(255,180,138,.15);color:#FFB48A">中</span></label>
        <label class="pri-opt"><input type="radio" name="pri" value="low"><span style="background:rgba(168,224,160,.15);color:#5BA050">低</span></label>
      </div>
    </div>
    <button class="btn btn-blue" style="width:100%;justify-content:center;padding:12px;margin-top:6px" onclick="saveFixed()">添加</button>
  `);
}

function saveFixed(){
  const text = val('f-text');
  if(!text){toast('请输入内容');return;}
  const pri = document.querySelector('input[name=pri]:checked').value;
  const fixed = getFixedTodos();
  fixed.push({text,priority:pri,done:false});
  setFixedTodos(fixed);
  closeModal();
  renderPlan();
  toast('固定计划已添加 🔁');
}

function addFixedToToday(){
  const fixed = getFixedTodos();
  if(fixed.length===0){toast('还没有固定计划');return;}
  const todos = getTodos();
  const today = getDateKey(new Date());
  fixed.forEach(f=>{
    if(!todos.some(t=>t.date===today && t.text===f.text)){
      todos.push({text:f.text,priority:f.priority,done:false,date:today,ts:Date.now()});
    }
  });
  setTodos(todos);
  renderPlan();
  toast('已导入固定计划 📌');
}

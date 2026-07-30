/* ===== 记账本模块 ===== */

function getAccounts(){ return DB.get('accounts')||[]; }
function setAccounts(a){ DB.set('accounts',a); }
function getAccCategories(){
  let c = DB.get('accCategories');
  if(!c){
    c = {expense:['餐饮','交通','住宿','医疗','购物','娱乐'],income:['工资','兼职','红包','其他']};
    DB.set('accCategories',c);
  }
  return c;
}
function setAccCategories(c){ DB.set('accCategories',c); }

function renderAccount(){
  const v = document.getElementById('view-account');
  const list = getAccounts();
  const cats = getAccCategories();
  const now = new Date();
  const ym = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  const monthList = list.filter(a=>a.date.startsWith(ym));
  const income = monthList.filter(a=>a.type==='income').reduce((s,a)=>s+a.amount,0);
  const expense = monthList.filter(a=>a.type==='expense').reduce((s,a)=>s+a.amount,0);
  const balance = income - expense;

  v.innerHTML = `
    <div class="hero">
      <div class="hero-inner">
        <div class="hero-text">
          <div class="hero-emoji">💰</div>
          <div><h1>记账本</h1><div class="sub">${now.getMonth()+1}月收支一览</div></div>
        </div>
        <button class="btn" onclick="showAccountModal()">+ 记账</button>
      </div>
    </div>
    <div class="content">
      <div class="card" style="background:linear-gradient(135deg,#FFD1E8,#BFE3F7)">
        <div class="acc-summary">
          <div class="acc-cell">
            <div class="acc-lab">收入</div>
            <div class="acc-val green">+¥${income.toFixed(2)}</div>
          </div>
          <div class="acc-divider"></div>
          <div class="acc-cell">
            <div class="acc-lab">支出</div>
            <div class="acc-val red">-¥${expense.toFixed(2)}</div>
          </div>
          <div class="acc-divider"></div>
          <div class="acc-cell">
            <div class="acc-lab">结余</div>
            <div class="acc-val blue">¥${balance.toFixed(2)}</div>
          </div>
        </div>
      </div>

      ${monthList.length>0 ? `
        <div class="card">
          <div class="card-title">
            <span class="ico">🥧</span>支出占比
            <button class="btn btn-sm btn-ghost" style="margin-left:auto" onclick="toggleChart()">${state.showAccChart==='income'?'看支出':'看收入'}</button>
          </div>
          <div class="chart-wrap"><canvas id="acc-chart"></canvas></div>
        </div>
      ` : ''}

      <div class="card">
        <div class="card-title">
          <span class="ico">📝</span>本月账单
          <button class="btn btn-sm btn-ghost" style="margin-left:auto" onclick="showCategoryModal()">分类</button>
        </div>
        ${monthList.length===0 ? `<div class="empty"><span class="emoji">🌸</span>还没有记账记录</div>` : `
          <div class="acc-list">
            ${monthList.sort((a,b)=>b.date.localeCompare(a.date)).map((a,i)=>`
              <div class="acc-item">
                <div class="acc-item-ico">${getCatEmoji(a.category,a.type)}</div>
                <div class="acc-item-body">
                  <div class="acc-item-cat">${a.category}${a.note?' · '+a.note:''}</div>
                  <div class="acc-item-date">${a.date.slice(5)}</div>
                </div>
                <div class="acc-item-amt ${a.type}">${a.type==='income'?'+':'-'}¥${a.amount.toFixed(2)}</div>
                <button class="todo-del" onclick="deleteAccount(${list.indexOf(a)})">✕</button>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>
  `;

  if(monthList.length>0) renderAccChart(monthList);
}

let accChartInstance=null;
function renderAccChart(list){
  const cats = getAccCategories();
  const type = state.showAccChart==='income'?'income':'expense';
  const catList = cats[type==='income'?'income':'expense'];
  const data = {};
  catList.forEach(c=>data[c]=0);
  list.filter(a=>a.type===type).forEach(a=>{
    if(data[a.category]!=null) data[a.category]+=a.amount;
  });
  const labels = Object.keys(data).filter(k=>data[k]>0);
  const values = labels.map(k=>data[k]);
  if(labels.length===0) return;

  const ctx = document.getElementById('acc-chart');
  if(!ctx) return;
  if(accChartInstance) accChartInstance.destroy();
  const colors = ['#FF9EC7','#7EC8F2','#C8A2E8','#FFB48A','#A8E0A0','#FFE7A8','#FF8A9A','#4AA8D8'];
  accChartInstance = new Chart(ctx,{
    type:'doughnut',
    data:{labels,datasets:[{data:values,backgroundColor:colors.slice(0,labels.length),borderColor:'#fff',borderWidth:3}]},
    options:{
      plugins:{legend:{position:'bottom',labels:{font:{size:11},padding:8,boxWidth:10,boxHeight:10}}},
      cutout:'62%',
      maintainAspectRatio:true,
      aspectRatio:1.6
    }
  });
}

function toggleChart(){
  state.showAccChart = state.showAccChart==='income'?'expense':'income';
  renderAccount();
}

function showAccountModal(){
  const cats = getAccCategories();
  showModal(`
    <div class="modal-header">
      <div class="modal-title">记一笔</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="field"><label>类型</label>
      <div class="type-pick">
        <label class="type-opt"><input type="radio" name="atype" value="expense" checked onchange="updateCatOptions()"><span>支出 💸</span></label>
        <label class="type-opt"><input type="radio" name="atype" value="income" onchange="updateCatOptions()"><span>收入 💵</span></label>
      </div>
    </div>
    <div class="field"><label>金额</label><input class="input" id="a-amount" type="number" inputmode="decimal" placeholder="0.00"></div>
    <div class="field"><label>分类</label>
      <div class="cat-pick" id="cat-pick">
        ${cats.expense.map((c,i)=>`<button class="cat-opt ${i===0?'sel':''}" data-cat="${c}">${getCatEmoji(c,'expense')} ${c}</button>`).join('')}
      </div>
    </div>
    <div class="field"><label>备注（可选）</label><input class="input" id="a-note" placeholder="例如：午餐"></div>
    <button class="btn" style="width:100%;justify-content:center;padding:12px;margin-top:6px" onclick="saveAccount()">保存</button>
  `);
}

function updateCatOptions(){
  const type = document.querySelector('input[name=atype]:checked').value;
  const cats = getAccCategories();
  const list = cats[type==='income'?'income':'expense'];
  const pick = document.getElementById('cat-pick');
  pick.innerHTML = list.map((c,i)=>`<button class="cat-opt ${i===0?'sel':''}" data-cat="${c}" onclick="pickCat(this)">${getCatEmoji(c,type)} ${c}</button>`).join('');
}

function pickCat(el){
  el.parentElement.querySelectorAll('.cat-opt').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
}

function saveAccount(){
  const amount = +val('a-amount');
  if(!amount||amount<=0){toast('请输入金额');return;}
  const type = document.querySelector('input[name=atype]:checked').value;
  const sel = document.querySelector('.cat-opt.sel');
  const category = sel?sel.dataset.cat:'其他';
  const note = val('a-note');
  const list = getAccounts();
  list.push({type,amount,category,note,date:getDateKey(new Date()),ts:Date.now()});
  setAccounts(list);
  closeModal();
  renderAccount();
  toast('记账成功 💰');
}

function deleteAccount(i){
  if(!confirm('删除这条记录？')) return;
  const list = getAccounts();
  list.splice(i,1);
  setAccounts(list);
  renderAccount();
}

function showCategoryModal(){
  const cats = getAccCategories();
  showModal(`
    <div class="modal-header">
      <div class="modal-title">分类管理</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="field"><label>支出分类</label>
      <div class="cat-manage">
        ${cats.expense.map((c,i)=>`<div class="cat-manage-item"><span>${getCatEmoji(c,'expense')} ${c}</span><button onclick="delAccCat('expense',${i})">✕</button></div>`).join('')}
      </div>
      <div class="row" style="margin-top:6px">
        <input class="input" id="new-expense" placeholder="新分类名">
        <button class="btn btn-sm" onclick="addAccCat('expense')">+</button>
      </div>
    </div>
    <div class="field"><label>收入分类</label>
      <div class="cat-manage">
        ${cats.income.map((c,i)=>`<div class="cat-manage-item"><span>${getCatEmoji(c,'income')} ${c}</span><button onclick="delAccCat('income',${i})">✕</button></div>`).join('')}
      </div>
      <div class="row" style="margin-top:6px">
        <input class="input" id="new-income" placeholder="新分类名">
        <button class="btn btn-sm" onclick="addAccCat('income')">+</button>
      </div>
    </div>
  `);
}

function addAccCat(type){
  const input = document.getElementById(type==='income'?'new-income':'new-expense');
  const name = input.value.trim();
  if(!name){toast('请输入分类名');return;}
  const cats = getAccCategories();
  if(cats[type].includes(name)){toast('分类已存在');return;}
  cats[type].push(name);
  setAccCategories(cats);
  showCategoryModal();
}

function delAccCat(type,i){
  const cats = getAccCategories();
  cats[type].splice(i,1);
  setAccCategories(cats);
  showCategoryModal();
}

function getCatEmoji(cat,type){
  const map = {'餐饮':'🍜','交通':'🚌','住宿':'🏠','医疗':'💊','购物':'🛍','娱乐':'🎮','工资':'💵','兼职':'💼','红包':'🧧','其他':'✨'};
  return map[cat]||'🌸';
}

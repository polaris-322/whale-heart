/* ===== 饮食模块 ===== */

/* 注入本模块专属样式 */
function injectDietStyle(){
  if(document.getElementById('diet-style')) return;
  const s = document.createElement('style');
  s.id = 'diet-style';
  s.textContent = `
    .diet-topbar{display:flex;align-items:center;gap:8px;padding:14px 14px 6px}
    .diet-topbar h1{font-size:16px;font-weight:800;color:var(--primary-deep);white-space:nowrap}
    .diet-topbar .search-wrap{flex:1}
    .diet-cal-banner{margin:0 14px 12px;background:linear-gradient(135deg,var(--green),#5BA050);border-radius:var(--radius);padding:14px 16px;display:flex;align-items:center;gap:12px;box-shadow:0 8px 24px rgba(168,224,160,.4);color:#fff}
    .diet-cal-emoji{font-size:30px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.15))}
    .diet-cal-num{font-size:26px;font-weight:800;line-height:1}
    .diet-cal-lab{font-size:11px;opacity:.9;margin-top:2px}
    .diet-cal-goal{margin-left:auto;text-align:right}
    .diet-cal-goal-val{font-size:14px;font-weight:700}
    .diet-cal-goal-lab{font-size:10px;opacity:.85;margin-top:1px}
    .diet-cal-bar-wrap{margin-top:10px;width:100%}
    .diet-cal-bar{height:8px;background:rgba(255,255,255,.3);border-radius:8px;overflow:hidden}
    .diet-cal-bar-fill{height:100%;background:#fff;border-radius:8px;transition:width .5s ease}
    .diet-meal-card{background:rgba(168,224,160,.06);border-radius:12px;padding:10px 12px;display:flex;align-items:center;gap:8px}
    .diet-meal-ico{font-size:20px;flex-shrink:0}
    .diet-meal-body{flex:1;min-width:0}
    .diet-meal-name{font-size:12px;font-weight:600;color:var(--text)}
    .diet-meal-meta{font-size:10px;color:var(--text-light);margin-top:1px}
    .diet-meal-cal{font-size:13px;font-weight:700;color:var(--success);flex-shrink:0}
    .diet-meal-del{width:24px;height:24px;border-radius:50%;background:rgba(255,138,154,.15);color:#FF8A9A;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0}
    .diet-meal-del:active{transform:scale(.9)}
    .diet-stat-meal{display:flex;flex-direction:column;align-items:center;gap:2px}
    .diet-stat-meal-ico{font-size:16px}
    .diet-stat-meal-cal{font-size:15px;font-weight:800;color:var(--text)}
    .diet-stat-meal-lab{font-size:9px;color:var(--text-light)}
    .diet-stat-meal-pct{font-size:9px;color:var(--text-faint);margin-top:1px}
    .diet-recipe-card{min-width:260px;max-width:290px;scroll-snap-align:start;flex-shrink:0;background:#fff;border-radius:var(--radius);padding:14px;box-shadow:var(--shadow);display:flex;flex-direction:column;gap:8px}
    .diet-recipe-title{font-size:14px;font-weight:700;color:var(--text);line-height:1.4}
    .diet-recipe-detail{font-size:11px;color:var(--text-light);line-height:1.6;white-space:pre-line;background:rgba(168,224,160,.08);border-radius:10px;padding:8px 10px;max-height:120px;overflow-y:auto}
    .diet-food-pick{display:flex;flex-wrap:wrap;gap:6px}
    .diet-food-opt{padding:6px 12px;border-radius:14px;font-size:12px;background:rgba(255,158,199,.1);color:var(--text-light);font-weight:600;transition:all .2s;cursor:pointer}
    .diet-food-opt.sel{background:linear-gradient(135deg,var(--green),#5BA050);color:#fff}
    .diet-food-results{max-height:240px;overflow-y:auto;display:flex;flex-direction:column;gap:6px}
    .diet-food-result{display:flex;align-items:center;gap:8px;padding:8px 10px;background:rgba(168,224,160,.06);border-radius:10px;cursor:pointer;transition:background .2s}
    .diet-food-result:active{background:rgba(168,224,160,.15)}
    .diet-food-result-ico{font-size:18px}
    .diet-food-result-name{flex:1;font-size:12px;font-weight:600;color:var(--text)}
    .diet-food-result-cal{font-size:12px;font-weight:700;color:var(--success)}
    .diet-food-result-unit{font-size:9px;color:var(--text-faint)}
    .diet-recipe-modal-detail{font-size:12px;color:var(--text);line-height:1.7;white-space:pre-line;background:rgba(168,224,160,.08);border-radius:10px;padding:10px 12px}
    .diet-recipe-modal-section{font-size:11px;font-weight:700;color:var(--primary-deep);margin-top:10px;margin-bottom:5px}
    .diet-meal-pick{display:flex;gap:6px}
    .diet-meal-opt{padding:6px 14px;border-radius:14px;font-size:12px;background:rgba(255,158,199,.1);color:var(--text-light);font-weight:600;transition:all .2s;cursor:pointer}
    .diet-meal-opt.sel{background:linear-gradient(135deg,var(--primary),var(--primary-deep));color:#fff}
  `;
  document.head.appendChild(s);
}

/* ===== 食物卡路里数据库（60种） ===== */
const FOOD_DB = [
  {name:'米饭',cal:116,unit:'100g',emoji:'🍚'},
  {name:'馒头',cal:223,unit:'100g',emoji:'🥟'},
  {name:'面条',cal:137,unit:'100g',emoji:'🍜'},
  {name:'包子',cal:227,unit:'100g',emoji:'🥟'},
  {name:'饺子',cal:240,unit:'100g',emoji:'🥟'},
  {name:'白粥',cal:46,unit:'100g',emoji:'🍚'},
  {name:'全麦面包',cal:247,unit:'100g',emoji:'🍞'},
  {name:'吐司',cal:265,unit:'100g',emoji:'🍞'},
  {name:'燕麦片',cal:367,unit:'100g',emoji:'🥣'},
  {name:'玉米',cal:112,unit:'100g',emoji:'🌽'},
  {name:'红薯',cal:86,unit:'100g',emoji:'🍠'},
  {name:'紫薯',cal:82,unit:'100g',emoji:'🍠'},
  {name:'土豆',cal:77,unit:'100g',emoji:'🥔'},
  {name:'鸡蛋',cal:144,unit:'1个',emoji:'🥚'},
  {name:'牛奶',cal:54,unit:'100ml',emoji:'🥛'},
  {name:'酸奶',cal:72,unit:'100g',emoji:'🥛'},
  {name:'豆浆',cal:31,unit:'100ml',emoji:'🥛'},
  {name:'奶酪',cal:328,unit:'100g',emoji:'🧀'},
  {name:'鸡胸肉',cal:133,unit:'100g',emoji:'🍗'},
  {name:'鸡腿',cal:181,unit:'100g',emoji:'🍗'},
  {name:'牛肉',cal:125,unit:'100g',emoji:'🥩'},
  {name:'猪肉',cal:143,unit:'100g',emoji:'🥩'},
  {name:'猪排骨',cal:278,unit:'100g',emoji:'🍖'},
  {name:'羊肉',cal:203,unit:'100g',emoji:'🍖'},
  {name:'三文鱼',cal:208,unit:'100g',emoji:'🐟'},
  {name:'鲈鱼',cal:105,unit:'100g',emoji:'🐟'},
  {name:'虾',cal:87,unit:'100g',emoji:'🦐'},
  {name:'螃蟹',cal:95,unit:'100g',emoji:'🦀'},
  {name:'豆腐',cal:81,unit:'100g',emoji:'🧈'},
  {name:'西兰花',cal:36,unit:'100g',emoji:'🥦'},
  {name:'菠菜',cal:28,unit:'100g',emoji:'🥬'},
  {name:'白菜',cal:20,unit:'100g',emoji:'🥬'},
  {name:'生菜',cal:15,unit:'100g',emoji:'🥬'},
  {name:'番茄',cal:20,unit:'100g',emoji:'🍅'},
  {name:'黄瓜',cal:16,unit:'100g',emoji:'🥒'},
  {name:'胡萝卜',cal:41,unit:'100g',emoji:'🥕'},
  {name:'蘑菇',cal:22,unit:'100g',emoji:'🍄'},
  {name:'洋葱',cal:40,unit:'100g',emoji:'🧅'},
  {name:'青椒',cal:22,unit:'100g',emoji:'🫑'},
  {name:'茄子',cal:25,unit:'100g',emoji:'🍆'},
  {name:'苹果',cal:53,unit:'100g',emoji:'🍎'},
  {name:'香蕉',cal:93,unit:'100g',emoji:'🍌'},
  {name:'橙子',cal:48,unit:'100g',emoji:'🍊'},
  {name:'葡萄',cal:44,unit:'100g',emoji:'🍇'},
  {name:'草莓',cal:32,unit:'100g',emoji:'🍓'},
  {name:'蓝莓',cal:57,unit:'100g',emoji:'🫐'},
  {name:'西瓜',cal:26,unit:'100g',emoji:'🍉'},
  {name:'猕猴桃',cal:61,unit:'100g',emoji:'🥝'},
  {name:'汉堡',cal:295,unit:'1个',emoji:'🍔'},
  {name:'披萨',cal:266,unit:'1片',emoji:'🍕'},
  {name:'热狗',cal:290,unit:'1个',emoji:'🌭'},
  {name:'薯条',cal:312,unit:'100g',emoji:'🍟'},
  {name:'炸鸡',cal:246,unit:'100g',emoji:'🍗'},
  {name:'可乐',cal:43,unit:'100ml',emoji:'🥤'},
  {name:'奶茶',cal:86,unit:'100ml',emoji:'🧋'},
  {name:'咖啡',cal:2,unit:'100ml',emoji:'☕'},
  {name:'巧克力',cal:546,unit:'100g',emoji:'🍫'},
  {name:'饼干',cal:433,unit:'100g',emoji:'🍪'},
  {name:'蛋糕',cal:347,unit:'100g',emoji:'🍰'},
  {name:'冰淇淋',cal:127,unit:'100g',emoji:'🍨'},
  {name:'坚果',cal:598,unit:'100g',emoji:'🥜'},
  {name:'沙拉',cal:108,unit:'100g',emoji:'🥗'},
];

/* ===== 食谱数据库（12套） ===== */
const RECIPE_DB = [
  /* 早餐 4套 */
  {
    id:'recipe_bf_1',meal:'早餐',name:'全麦三明治配牛奶',cal:380,
    ingredients:['全麦面包2片','鸡蛋1个','生菜2片','番茄1片','牛奶200ml','低脂芝士1片'],
    steps:'1. 鸡蛋煎熟备用\n2. 全麦面包烤至微脆\n3. 依次铺上生菜、番茄、鸡蛋、芝士\n4. 搭配一杯温牛奶即可'
  },
  {
    id:'recipe_bf_2',meal:'早餐',name:'燕麦水果碗',cal:320,
    ingredients:['燕麦片50g','牛奶200ml','香蕉半根','蓝莓30g','蜂蜜少许','坚果碎10g'],
    steps:'1. 燕麦片倒入碗中，加入温牛奶泡3分钟\n2. 香蕉切片铺在燕麦上\n3. 撒上蓝莓和坚果碎\n4. 淋少许蜂蜜调味即可'
  },
  {
    id:'recipe_bf_3',meal:'早餐',name:'蔬菜鸡蛋饼',cal:290,
    ingredients:['鸡蛋2个','面粉30g','胡萝卜丝30g','葱花适量','盐少许','橄榄油少许'],
    steps:'1. 鸡蛋打散，加入面粉搅匀\n2. 拌入胡萝卜丝和葱花，加盐调味\n3. 平底锅刷橄榄油，倒入蛋液摊平\n4. 小火煎至两面金黄即可'
  },
  {
    id:'recipe_bf_4',meal:'早餐',name:'红豆薏米粥配水煮蛋',cal:310,
    ingredients:['红豆30g','薏米30g','大米30g','鸡蛋1个','水适量'],
    steps:'1. 红豆、薏米提前浸泡2小时\n2. 将红豆、薏米、大米放入锅中加水煮沸\n3. 转小火慢炖40分钟至软烂\n4. 同时煮好鸡蛋，搭配粥一起食用'
  },
  /* 午餐 4套 */
  {
    id:'recipe_lc_1',meal:'午餐',name:'鸡胸肉西兰花便当',cal:480,
    ingredients:['鸡胸肉150g','西兰花100g','米饭100g','蒜2瓣','生抽1勺','橄榄油少许'],
    steps:'1. 鸡胸肉切丁，用生抽腌制10分钟\n2. 西兰花焯水备用\n3. 热锅爆香蒜末，翻炒鸡丁至变色\n4. 加入西兰花翻炒，搭配米饭食用'
  },
  {
    id:'recipe_lc_2',meal:'午餐',name:'番茄牛肉面',cal:520,
    ingredients:['面条150g','牛肉100g','番茄2个','洋葱半个','番茄酱1勺','盐适量'],
    steps:'1. 牛肉切片，番茄切块，洋葱切丝\n2. 热锅炒洋葱至透明，加牛肉翻炒\n3. 放入番茄和番茄酱，加水煮成浓汤\n4. 另锅煮面，捞出浇上番茄牛肉汤即可'
  },
  {
    id:'recipe_lc_3',meal:'午餐',name:'豆腐虾仁盖饭',cal:450,
    ingredients:['嫩豆腐1块','虾仁80g','米饭100g','葱花适量','生抽1勺','淀粉少许'],
    steps:'1. 豆腐切丁，虾仁洗净沥干\n2. 热锅炒虾仁至变色，盛出备用\n3. 同锅放豆腐，加生抽和水焖煮3分钟\n4. 放回虾仁，勾薄芡撒葱花，浇在米饭上'
  },
  {
    id:'recipe_lc_4',meal:'午餐',name:'蘑菇鸡肉焗饭',cal:540,
    ingredients:['米饭150g','鸡腿肉100g','蘑菇50g','洋葱半个','芝士丝30g','黑胡椒少许'],
    steps:'1. 鸡腿肉切块，蘑菇切片，洋葱切丁\n2. 热锅炒洋葱和鸡肉，加蘑菇翻炒\n3. 将炒料铺在米饭上，撒芝士丝\n4. 放入烤箱180度烤10分钟至芝士融化'
  },
  /* 晚餐 4套 */
  {
    id:'recipe_dn_1',meal:'晚餐',name:'清蒸鲈鱼配蔬菜',cal:350,
    ingredients:['鲈鱼1条','姜丝适量','葱丝适量','西兰花80g','蒸鱼豉油1勺','料酒少许'],
    steps:'1. 鲈鱼处理干净，两面划刀，抹料酒\n2. 鱼身铺姜丝，大火蒸8分钟\n3. 蒸好撒上葱丝，淋热油和蒸鱼豉油\n4. 西兰花焯水搭配即可'
  },
  {
    id:'recipe_dn_2',meal:'晚餐',name:'蔬菜豆腐汤',cal:260,
    ingredients:['嫩豆腐1块','番茄1个','菠菜50g','鸡蛋1个','盐适量','香油少许'],
    steps:'1. 豆腐切块，番茄切块，菠菜切段\n2. 锅中加水煮沸，放入番茄煮软\n3. 加入豆腐和菠菜，打入蛋花\n4. 加盐调味，淋几滴香油即可'
  },
  {
    id:'recipe_dn_3',meal:'晚餐',name:'蒜蓉虾配杂粮饭',cal:400,
    ingredients:['鲜虾150g','大蒜3瓣','杂粮饭100g','料酒1勺','葱花适量','橄榄油少许'],
    steps:'1. 鲜虾去虾线，蒜切末\n2. 热锅爆香蒜末，放入虾翻炒\n3. 烹入料酒，炒至虾变红\n4. 撒葱花出锅，搭配杂粮饭食用'
  },
  {
    id:'recipe_dn_4',meal:'晚餐',name:'鸡丝凉拌沙拉',cal:310,
    ingredients:['鸡胸肉100g','生菜50g','黄瓜半根','小番茄5个','沙拉酱1勺','黑胡椒少许'],
    steps:'1. 鸡胸肉煮熟后撕成丝\n2. 生菜、黄瓜切丝，小番茄对半切\n3. 所有食材放入碗中混合\n4. 淋沙拉酱撒黑胡椒，拌匀即可'
  },
];

/* ===== 数据层 ===== */
function getDietLog(){ return DB.get('dietLog')||{}; }
function setDietLog(log){ DB.set('dietLog',log); }
function getDietGoal(){ return DB.get('dietGoal')||2000; }
function setDietGoal(g){ DB.set('dietGoal',g); }

/* 获取今日记录 */
function getTodayDietLog(){
  const log = getDietLog();
  const today = getDateKey(new Date());
  return log[today]||[];
}

/* 添加食物记录 */
function addDietFood(foodId){
  const food = FOOD_DB.find(f=>f.name===foodId);
  if(!food){ toast('食物不存在'); return; }
  const log = getDietLog();
  const today = getDateKey(new Date());
  if(!log[today]) log[today] = [];
  const meal = state.dietAddMeal || '早餐';
  log[today].push({
    name:food.name,
    cal:food.cal,
    unit:food.unit,
    emoji:food.emoji,
    meal:meal,
    ts:Date.now()
  });
  setDietLog(log);
  toast(`已添加 ${food.emoji} ${food.name} ${food.cal}大卡`);
  closeModal();
  renderDiet();
}

/* 添加自定义食物记录 */
function addCustomDietFood(){
  const name = val('diet-custom-name').trim();
  const cal = +val('diet-custom-cal');
  if(!name){ toast('请输入食物名称'); return; }
  if(!cal||cal<=0){ toast('请输入有效卡路里'); return; }
  const log = getDietLog();
  const today = getDateKey(new Date());
  if(!log[today]) log[today] = [];
  const meal = state.dietAddMeal || '早餐';
  log[today].push({
    name:name,
    cal:cal,
    unit:'份',
    emoji:'🍽',
    meal:meal,
    ts:Date.now()
  });
  setDietLog(log);
  toast(`已添加 🍽 ${name} ${cal}大卡`);
  closeModal();
  renderDiet();
}

/* 删除食物记录 */
function delDietFood(idx){
  const log = getDietLog();
  const today = getDateKey(new Date());
  if(!log[today]) return;
  log[today].splice(idx,1);
  setDietLog(log);
  renderDiet();
  toast('已删除');
}

/* 一键添加食谱到记录 */
function addRecipeToDiet(recipeId){
  const recipe = RECIPE_DB.find(r=>r.id===recipeId);
  if(!recipe){ toast('食谱不存在'); return; }
  const log = getDietLog();
  const today = getDateKey(new Date());
  if(!log[today]) log[today] = [];
  log[today].push({
    name:recipe.name,
    cal:recipe.cal,
    unit:'份',
    emoji:'🍲',
    meal:recipe.meal,
    ts:Date.now()
  });
  setDietLog(log);
  toast(`已记录 ${recipe.name} ${recipe.cal}大卡`);
  renderDiet();
}

/* ===== 统计计算 ===== */
function calcDietStats(){
  const logs = getTodayDietLog();
  const meals = {早餐:0,午餐:0,晚餐:0,加餐:0};
  let total = 0;
  logs.forEach(l=>{
    if(meals[l.meal]!==undefined) meals[l.meal] += l.cal;
    total += l.cal;
  });
  return {meals,total,count:logs.length};
}

/* ===== 搜索食物 ===== */
function onDietFoodSearch(val_){
  state.dietSearch = val_;
  renderDietFoodResults();
}

function renderDietFoodResults(){
  const container = document.getElementById('diet-food-results');
  if(!container){ return; }
  const search = state.dietSearch || '';
  const filtered = search
    ? FOOD_DB.filter(f=>f.name.toLowerCase().includes(search.toLowerCase()))
    : FOOD_DB;
  if(filtered.length===0){
    container.innerHTML = `<div class="empty" style="padding:16px"><span class="emoji">🔍</span>没有找到"${escapeHtml(search)}"<br>可以在下方手动添加</div>`;
    return;
  }
  container.innerHTML = filtered.map(f=>`
    <div class="diet-food-result" onclick="addDietFood('${f.name.replace(/'/g,"\\'")}')">
      <div class="diet-food-result-ico">${f.emoji}</div>
      <div class="diet-food-result-name">${f.name}</div>
      <div class="diet-food-result-cal">${f.cal}大卡</div>
      <div class="diet-food-result-unit">/${f.unit}</div>
    </div>
  `).join('');
}

/* ===== 选择餐次（添加食物时） ===== */
function pickDietMeal(el){
  el.parentElement.querySelectorAll('.diet-meal-opt').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  state.dietAddMeal = el.dataset.meal;
}

/* ===== 主渲染 ===== */
function renderDiet(){
  injectDietStyle();
  const v = document.getElementById('view-diet');
  const todayLog = getTodayDietLog();
  const goal = getDietGoal();
  const stats = calcDietStats();
  const pct = Math.min(Math.round(stats.total/goal*100),100);
  const remaining = Math.max(goal - stats.total, 0);
  const over = stats.total > goal;
  const mealEmojis = {早餐:'🌅',午餐:'☀️',晚餐:'🌙',加餐:'🍪'};
  const mealOrder = ['早餐','午餐','晚餐','加餐'];

  v.innerHTML = `
    <!-- 顶部导航 -->
    <div class="diet-topbar">
      <h1>🥗 饮食记录</h1>
      <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input class="input-search" id="diet-search" placeholder="搜索食物..." oninput="onDietFoodSearch(this.value)">
      </div>
      <button class="btn btn-sm btn-green" onclick="showAddDietModal()">+ 记录</button>
    </div>

    <!-- 今日卡路里横幅 -->
    <div class="diet-cal-banner">
      <div class="diet-cal-emoji">${over?'⚠️':'🔥'}</div>
      <div>
        <div class="diet-cal-num">${stats.total}</div>
        <div class="diet-cal-lab">今日已摄入 (大卡)</div>
      </div>
      <div class="diet-cal-goal">
        <div class="diet-cal-goal-val">${over?'+'+Math.abs(remaining):remaining}</div>
        <div class="diet-cal-goal-lab">${over?'超出目标':'剩余可用'}</div>
      </div>
      <div class="diet-cal-bar-wrap">
        <div class="diet-cal-bar">
          <div class="diet-cal-bar-fill" style="width:${pct}%"></div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:4px;font-size:10px;opacity:.9">
          <span>${pct}%</span>
          <span>目标 ${goal} 大卡</span>
        </div>
      </div>
    </div>

    <div class="content">
      <!-- 今日饮食统计 -->
      <div class="card">
        <div class="card-title">
          <span class="ico">📊</span>今日饮食统计
          <button class="btn btn-sm btn-ghost" style="margin-left:auto" onclick="showDietGoalModal()">设置目标</button>
        </div>
        <div class="stat-row">
          ${mealOrder.map(m=>{
            const cal = stats.meals[m];
            const mpct = stats.total>0?Math.round(cal/stats.total*100):0;
            return `
              <div class="stat-cell">
                <div class="diet-stat-meal">
                  <div class="diet-stat-meal-ico">${mealEmojis[m]}</div>
                  <div class="diet-stat-meal-cal">${cal}</div>
                  <div class="diet-stat-meal-lab">${m}</div>
                  <div class="diet-stat-meal-pct">${mpct}%</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        <!-- 进度条 -->
        <div style="margin-top:12px">
          <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-light);margin-bottom:4px">
            <span>目标完成度</span>
            <span>${stats.total} / ${goal} 大卡 (${pct}%)</span>
          </div>
          <div class="progress">
            <div class="progress-bar" style="width:${pct}%;background:${over?'linear-gradient(90deg,var(--orange),var(--red))':'linear-gradient(90deg,var(--green),var(--success))'}"></div>
          </div>
          ${over?`<div style="font-size:10px;color:#E87830;margin-top:4px;text-align:center">⚠️ 今日摄入已超出目标 ${Math.abs(remaining)} 大卡</div>`:''}
        </div>
      </div>

      <!-- 今日食物记录 -->
      <div class="card">
        <div class="card-title"><span class="ico">📝</span>今日食物记录</div>
        ${todayLog.length===0
          ? `<div class="empty"><span class="emoji">🍽</span>今天还没有记录食物<br>点击右上角添加</div>`
          : `<div style="display:flex;flex-direction:column;gap:8px">
              ${todayLog.map((l,i)=>`
                <div class="diet-meal-card">
                  <div class="diet-meal-ico">${l.emoji}</div>
                  <div class="diet-meal-body">
                    <div class="diet-meal-name">${escapeHtml(l.name)}</div>
                    <div class="diet-meal-meta">${l.meal} · ${l.unit}</div>
                  </div>
                  <div class="diet-meal-cal">${l.cal}大卡</div>
                  <button class="diet-meal-del" onclick="delDietFood(${i})">✕</button>
                </div>
              `).join('')}
            </div>`
        }
      </div>

      <!-- 食谱推荐 -->
      <div class="card">
        <div class="card-title">
          <span class="ico">📖</span>食谱推荐
          <div class="view-pick" style="margin-left:auto;display:flex;gap:4px">
            <button class="vp-btn ${(!state.dietRecipeFilter||state.dietRecipeFilter==='all')?'active':''}" onclick="setDietRecipeFilter('all')">全部</button>
            <button class="vp-btn ${state.dietRecipeFilter==='早餐'?'active':''}" onclick="setDietRecipeFilter('早餐')">早</button>
            <button class="vp-btn ${state.dietRecipeFilter==='午餐'?'active':''}" onclick="setDietRecipeFilter('午餐')">午</button>
            <button class="vp-btn ${state.dietRecipeFilter==='晚餐'?'active':''}" onclick="setDietRecipeFilter('晚餐')">晚</button>
          </div>
        </div>
        ${renderDietRecipes()}
      </div>
    </div>
  `;
}

/* ===== 食谱卡片渲染 ===== */
function renderDietRecipes(){
  const filter = state.dietRecipeFilter || 'all';
  const recipes = filter==='all' ? RECIPE_DB : RECIPE_DB.filter(r=>r.meal===filter);
  if(recipes.length===0){
    return `<div class="empty"><span class="emoji">📖</span>暂无食谱</div>`;
  }
  return `<div class="scroll-cards">
    ${recipes.map(r=>`
      <div class="diet-recipe-card scroll-card">
        <div class="diet-recipe-title">${escapeHtml(r.name)}</div>
        <div style="display:flex;gap:5px;flex-wrap:wrap">
          <span class="tag-green">${r.meal}</span>
          <span class="tag-green">🔥 ${r.cal}大卡</span>
          <span class="tag-green">🥘 ${r.ingredients.length}种食材</span>
        </div>
        <div class="diet-recipe-detail">${escapeHtml(r.ingredients.join('、'))}</div>
        <div style="display:flex;gap:6px">
          <button class="btn btn-sm btn-green" style="flex:1;justify-content:center;padding:8px" onclick="showDietRecipeModal('${r.id}')">查看做法</button>
          <button class="btn btn-sm btn-ghost" style="padding:8px" onclick="addRecipeToDiet('${r.id}')">+记录</button>
        </div>
      </div>
    `).join('')}
  </div>`;
}

/* ===== 食谱筛选 ===== */
function setDietRecipeFilter(f){
  state.dietRecipeFilter = f;
  // 局部刷新食谱区域
  const card = document.querySelector('#view-diet .content .card:last-child');
  if(!card){ renderDiet(); return; }
  const titleBar = card.querySelector('.card-title');
  if(!titleBar){ renderDiet(); return; }
  let next = titleBar.nextElementSibling;
  while(next){ const tmp = next.nextElementSibling; next.remove(); next = tmp; }
  card.insertAdjacentHTML('beforeend', renderDietRecipes());
}

/* ===== 模态：添加食物 ===== */
function showAddDietModal(){
  // 初始化默认餐次
  const hour = new Date().getHours();
  let defaultMeal = '加餐';
  if(hour>=5&&hour<10) defaultMeal='早餐';
  else if(hour>=10&&hour<14) defaultMeal='午餐';
  else if(hour>=14&&hour<20) defaultMeal='晚餐';
  else defaultMeal='加餐';
  state.dietAddMeal = defaultMeal;
  state.dietSearch = '';

  showModal(`
    <div class="modal-header">
      <div class="modal-title">🍽 添加食物记录</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="field"><label>餐次</label>
      <div class="diet-meal-pick">
        ${['早餐','午餐','晚餐','加餐'].map((m,i)=>`<button class="diet-meal-opt ${m===defaultMeal?'sel':''}" data-meal="${m}" onclick="pickDietMeal(this)">${m}</button>`).join('')}
      </div>
    </div>
    <div class="field"><label>搜索食物（点击添加）</label>
      <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input class="input-search" id="diet-modal-search" placeholder="输入食物名称搜索..." oninput="onDietFoodSearch(this.value)">
      </div>
    </div>
    <div class="diet-food-results" id="diet-food-results"></div>
    <div class="diet-recipe-modal-section">手动添加自定义食物</div>
    <div class="row">
      <div class="field" style="flex:2"><label>食物名称</label><input class="input" id="diet-custom-name" placeholder="如：自制炒饭"></div>
      <div class="field" style="flex:1"><label>卡路里(大卡)</label><input class="input" id="diet-custom-cal" type="number" inputmode="numeric" placeholder="300"></div>
    </div>
    <button class="btn btn-green" style="width:100%;justify-content:center;padding:12px;margin-top:4px" onclick="addCustomDietFood()">添加自定义食物</button>
  `);

  // 初始渲染食物列表
  renderDietFoodResults();
}

/* ===== 模态：食谱详情 ===== */
function showDietRecipeModal(recipeId){
  const recipe = RECIPE_DB.find(r=>r.id===recipeId);
  if(!recipe){ toast('食谱不存在'); return; }
  showModal(`
    <div class="modal-header">
      <div class="modal-title">📖 ${escapeHtml(recipe.name)}</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">
      <span class="tag-green">${recipe.meal}</span>
      <span class="tag-green">🔥 ${recipe.cal}大卡</span>
      <span class="tag-green">🥘 ${recipe.ingredients.length}种食材</span>
    </div>
    <div class="diet-recipe-modal-section">🥕 食材清单</div>
    <div class="diet-recipe-modal-detail">${recipe.ingredients.map((ing,i)=>`${i+1}. ${escapeHtml(ing)}`).join('\n')}</div>
    <div class="diet-recipe-modal-section">👨‍🍳 制作步骤</div>
    <div class="diet-recipe-modal-detail">${escapeHtml(recipe.steps)}</div>
    <button class="btn btn-green" style="width:100%;justify-content:center;padding:12px;margin-top:10px" onclick="addRecipeToDiet('${recipe.id}')">+ 添加到今日记录</button>
  `);
}

/* ===== 模态：设置卡路里目标 ===== */
function showDietGoalModal(){
  const goal = getDietGoal();
  showModal(`
    <div class="modal-header">
      <div class="modal-title">🎯 设置每日卡路里目标</div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="field"><label>每日目标 (大卡)</label>
      <div class="diet-food-pick">
        ${[1200,1500,1800,2000,2200,2500].map(n=>`<button class="diet-food-opt ${n===goal?'sel':''}" data-n="${n}" onclick="pickDietGoal(this)">${n}</button>`).join('')}
      </div>
    </div>
    <div class="field"><label>自定义</label><input class="input" id="diet-goal-custom" type="number" inputmode="numeric" placeholder="${goal}" value="${goal}"></div>
    <button class="btn btn-green" style="width:100%;justify-content:center;padding:12px;margin-top:4px" onclick="saveDietGoal()">保存</button>
    <div style="font-size:10px;color:var(--text-faint);text-align:center;margin-top:8px">一般成人每日推荐摄入 1800-2200 大卡</div>
  `);
}

function pickDietGoal(el){
  el.parentElement.querySelectorAll('.diet-food-opt').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  // 同步到自定义输入框
  const customInput = document.getElementById('diet-goal-custom');
  if(customInput) customInput.value = el.dataset.n;
}

function saveDietGoal(){
  const sel = document.querySelector('.diet-food-pick .diet-food-opt.sel');
  let goal = sel ? +sel.dataset.n : 0;
  const customVal = +val('diet-goal-custom');
  if(customVal && customVal>0) goal = customVal;
  if(!goal||goal<=0){ toast('请设置有效目标'); return; }
  setDietGoal(goal);
  closeModal();
  renderDiet();
  toast('目标已设置 🎯');
}

/* ===== 辅助 ===== */
function escapeHtml(s){
  if(s==null) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

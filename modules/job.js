/* ===== 就业模块 ===== */

// ===== 高校招聘数据 =====
const JOB_PUBLIC_BACHELOR = [
  {school:'武汉大学',type:'公办本科',region:'湖北',position:'数学学院讲师',degree:'硕士及以上',link:'#'},
  {school:'华中科技大学',type:'公办本科',region:'湖北',position:'数学系助教',degree:'硕士及以上',link:'#'},
  {school:'南京大学',type:'公办本科',region:'江苏',position:'数学系教研岗',degree:'博士',link:'#'},
  {school:'山东大学',type:'公办本科',region:'山东',position:'数学学院教师',degree:'硕士及以上',link:'#'},
  {school:'中山大学',type:'公办本科',region:'广东',position:'数学学院讲师',degree:'博士',link:'#'},
];
const JOB_PUBLIC_COLLEGE = [
  {school:'武汉职业技术学院',type:'公办大专',region:'湖北',position:'数学教研室教师',degree:'硕士',link:'#'},
  {school:'深圳职业技术学院',type:'公办大专',region:'广东',position:'基础数学教师',degree:'硕士',link:'#'},
  {school:'南京工业职业技术学院',type:'公办大专',region:'江苏',position:'数学教学岗',degree:'硕士',link:'#'},
  {school:'成都航空职业技术学院',type:'公办大专',region:'四川',position:'高等数学教师',degree:'硕士',link:'#'},
  {school:'浙江金融职业学院',type:'公办大专',region:'浙江',position:'应用数学教师',degree:'硕士',link:'#'},
];
const JOB_PUBLIC_SECONDARY = [
  {school:'武汉市第一中专',type:'公办中专',region:'湖北',position:'数学教师',degree:'硕士',link:'#'},
  {school:'广州市财经中专',type:'公办中专',region:'广东',position:'数学基础课教师',degree:'本科及以上',link:'#'},
  {school:'南京市中专学校',type:'公办中专',region:'江苏',position:'数学教研教师',degree:'硕士',link:'#'},
  {school:'济南市职业学校',type:'公办中专',region:'山东',position:'数学课教师',degree:'本科及以上',link:'#'},
  {school:'长沙市工业中专',type:'公办中专',region:'湖南',position:'数学教师',degree:'硕士',link:'#'},
];
const JOB_PRIVATE_BACHELOR = [
  {school:'武昌首义学院',type:'民办本科',region:'湖北',position:'数学教学岗',degree:'硕士',link:'#'},
  {school:'广州白云学院',type:'民办本科',region:'广东',position:'数学系教师',degree:'硕士',link:'#'},
  {school:'南京金肯学院',type:'民办本科',region:'江苏',position:'基础数学讲师',degree:'硕士',link:'#'},
  {school:'齐鲁理工学院',type:'民办本科',region:'山东',position:'数学教师',degree:'硕士',link:'#'},
  {school:'浙江树人学院',type:'民办本科',region:'浙江',position:'数学与应用数学教师',degree:'硕士',link:'#'},
];
const JOB_PRIVATE_COLLEGE = [
  {school:'武汉商贸职业学院',type:'民办大专',region:'湖北',position:'数学教师',degree:'硕士',link:'#'},
  {school:'广州城建职业学院',type:'民办大专',region:'广东',position:'高等数学教师',degree:'本科及以上',link:'#'},
  {school:'南京视觉艺术职业学院',type:'民办大专',region:'江苏',position:'数学基础课教师',degree:'本科及以上',link:'#'},
  {school:'山东英才职业学院',type:'民办大专',region:'山东',position:'数学教学岗',degree:'硕士',link:'#'},
  {school:'湖南涉外经济学院',type:'民办大专',region:'湖南',position:'数学教师',degree:'本科及以上',link:'#'},
];
const JOB_PRIVATE_SECONDARY = [
  {school:'武汉光谷中专',type:'民办中专',region:'湖北',position:'数学教师',degree:'本科及以上',link:'#'},
  {school:'广州蓝天中专',type:'民办中专',region:'广东',position:'基础数学教师',degree:'本科及以上',link:'#'},
  {school:'南京东方中专',type:'民办中专',region:'江苏',position:'数学课教师',degree:'本科及以上',link:'#'},
  {school:'济南新时代中专',type:'民办中专',region:'山东',position:'数学教师',degree:'本科及以上',link:'#'},
  {school:'长沙湘江中专',type:'民办中专',region:'湖南',position:'数学教研教师',degree:'本科及以上',link:'#'},
];

const JOB_ALL_SCHOOLS = [
  ...JOB_PUBLIC_BACHELOR,...JOB_PUBLIC_COLLEGE,...JOB_PUBLIC_SECONDARY,
  ...JOB_PRIVATE_BACHELOR,...JOB_PRIVATE_COLLEGE,...JOB_PRIVATE_SECONDARY,
];

// ===== 公务员/事业编/教师编数据 =====
const JOB_CIVIL = [
  {title:'国家税务总局——数据分析岗',category:'公务员',region:'全国',degree:'硕士',deadline:'2026年3月',link:'#'},
  {title:'国家统计局——数理统计研究岗',category:'公务员',region:'全国',degree:'硕士',deadline:'2026年3月',link:'#'},
  {title:'中国人民银行——量化分析岗',category:'公务员',region:'北京',degree:'硕士及以上',deadline:'2026年4月',link:'#'},
  {title:'省财政厅——预算测算岗',category:'公务员',region:'各省',degree:'硕士',deadline:'2026年2月',link:'#'},
  {title:'市统计局——数据处理岗',category:'事业编',region:'各市',degree:'硕士',deadline:'2026年5月',link:'#'},
  {title:'省科技厅——科研项目评审岗',category:'事业编',region:'各省',degree:'硕士及以上',deadline:'2026年4月',link:'#'},
  {title:'市教育局——数学教研员',category:'事业编',region:'各市',degree:'硕士',deadline:'2026年3月',link:'#'},
  {title:'省属重点中学——数学教师编',category:'教师编',region:'各省',degree:'硕士',deadline:'2026年6月',link:'#'},
  {title:'市级重点中学——数学教师编',category:'教师编',region:'各市',degree:'硕士',deadline:'2026年5月',link:'#'},
  {title:'区级实验小学——数学教师编',category:'教师编',region:'各区',degree:'本科及以上',deadline:'2026年6月',link:'#'},
];

// ===== AI+新型就业方向 =====
const JOB_AI_NEW = [
  {name:'AI训练师',desc:'负责大语言模型的训练数据准备、评测标准设计和模型调优，是AI落地核心角色。',skills:['数学建模','统计分析','Python','Prompt Engineering','数据标注']},
  {name:'数据分析师',desc:'运用数学与统计方法，从海量数据中提取商业洞察，驱动决策。',skills:['概率统计','数据可视化','SQL','Python/R','Excel高级']},
  {name:'量化研究员',desc:'在金融机构运用数学模型设计交易策略，是数学学硕最对口的高薪方向。',skills:['随机过程','数值计算','Python/C++','金融数学','机器学习']},
  {name:'数学建模工程师',desc:'将现实问题抽象为数学模型并求解，服务于工业仿真、运筹优化等场景。',skills:['运筹优化','微分方程','MATLAB/Python','仿真建模','数值算法']},
  {name:'算法工程师',desc:'设计高效算法解决搜索推荐、图像识别等问题，数学功底是核心竞争力。',skills:['线性代数','图论','动态规划','Python/C++','深度学习']},
  {name:'AI教育产品经理',desc:'结合数学教育理论与AI技术，设计智能学习产品，连接教育与科技。',skills:['数学教育学','用户调研','产品设计','AI基础','项目管理']},
];

// ===== 地区列表 =====
const JOB_REGIONS = ['北京','上海','广东','江苏','浙江','山东','湖北','湖南','四川','河南','安徽','福建','陕西','全国'];

// ===== 收藏管理 =====
function getJobFavs(){ return DB.get('jobFavs')||[]; }
function setJobFavs(f){ DB.set('jobFavs',f); }

function toggleJobFav(item, type){
  const favs = getJobFavs();
  const key = type + '|' + (item.title||item.school||item.name);
  const idx = favs.findIndex(f=>f.key===key);
  if(idx>=0){
    favs.splice(idx,1);
    toast('已取消收藏');
  } else {
    favs.push({key, type, item, ts:Date.now()});
    toast('已收藏 ✓');
  }
  setJobFavs(favs);
  renderJob();
}

function isJobFav(item, type){
  const favs = getJobFavs();
  const key = type + '|' + (item.title||item.school||item.name);
  return favs.some(f=>f.key===key);
}

// ===== 筛选状态 =====
function getJobFilters(){
  return DB.get('jobFilters')||{region:'',bianzhi:'',schoolType:''};
}
function setJobFilters(f){
  DB.set('jobFilters',f);
}

// ===== 渲染高校列表 =====
function renderSchoolList(){
  const filters = getJobFilters();
  let list = JOB_ALL_SCHOOLS;

  if(filters.region){
    list = list.filter(s=>s.region===filters.region);
  }
  if(filters.bianzhi){
    if(filters.bianzhi==='公办') list = list.filter(s=>s.type.startsWith('公办'));
    if(filters.bianzhi==='民办') list = list.filter(s=>s.type.startsWith('民办'));
  }
  if(filters.schoolType){
    if(filters.schoolType==='本科') list = list.filter(s=>s.type.includes('本科'));
    if(filters.schoolType==='大专') list = list.filter(s=>s.type.includes('大专'));
    if(filters.schoolType==='中专') list = list.filter(s=>s.type.includes('中专'));
  }

  if(list.length===0){
    return '<div class="empty"><span class="emoji">🔍</span>没有符合条件的招聘信息</div>';
  }

  return list.map(s=>{
    const fav = isJobFav(s,'school');
    const typeTag = s.type.startsWith('公办') ? 'tag-green' : 'tag-orange';
    const levelTag = s.type.includes('本科') ? 'tag-blue' : s.type.includes('大专') ? 'tag-pink' : 'tag-orange';
    return `
      <div class="job-item">
        <div class="job-item-header">
          <div class="job-item-school">${s.school}</div>
          <button class="fav-btn ${fav?'active':''}" onclick="toggleJobFav(${JSON.stringify(s).replace(/"/g,'&quot;')},'school')">${fav?'★':'☆'}</button>
        </div>
        <div class="job-item-tags">
          <span class="${typeTag}">${s.type.split(' ')[0]}</span>
          <span class="${levelTag}">${s.type.split(' ')[1]||s.type.split(' ')[0]}</span>
          <span class="tag-blue">${s.region}</span>
        </div>
        <div class="job-item-detail">
          <div class="job-item-position">${s.position}</div>
          <div class="job-item-degree">学历要求：${s.degree}</div>
        </div>
        <a class="btn btn-sm btn-ghost" href="${s.link}" style="margin-top:6px">查看详情 ›</a>
      </div>
    `;
  }).join('');
}

// ===== 渲染公务员/事业编/教师编 =====
function renderCivilList(){
  return JOB_CIVIL.map(c=>{
    const fav = isJobFav(c,'civil');
    const catTag = c.category==='公务员'?'tag-pink':c.category==='事业编'?'tag-blue':'tag-green';
    return `
      <div class="job-item">
        <div class="job-item-header">
          <div class="job-item-title">${c.title}</div>
          <button class="fav-btn ${fav?'active':''}" onclick="toggleJobFav(${JSON.stringify(c).replace(/"/g,'&quot;')},'civil')">${fav?'★':'☆'}</button>
        </div>
        <div class="job-item-tags">
          <span class="${catTag}">${c.category}</span>
          <span class="tag-blue">${c.region}</span>
          <span class="tag-orange">截止 ${c.deadline}</span>
        </div>
        <div class="job-item-degree">学历要求：${c.degree}</div>
        <a class="btn btn-sm btn-ghost" href="${c.link}" style="margin-top:6px">查看招考公告 ›</a>
      </div>
    `;
  }).join('');
}

// ===== 渲染AI+新方向 =====
function renderAiNewList(){
  return JOB_AI_NEW.map(n=>{
    const fav = isJobFav(n,'ainew');
    return `
      <div class="job-item job-ainew-item">
        <div class="job-item-header">
          <div class="job-item-title">${n.name}</div>
          <button class="fav-btn ${fav?'active':''}" onclick="toggleJobFav(${JSON.stringify(n).replace(/"/g,'&quot;')},'ainew')">${fav?'★':'☆'}</button>
        </div>
        <div style="font-size:13px;color:var(--text-light);margin-bottom:8px;line-height:1.5">${n.desc}</div>
        <div class="job-item-tags">
          ${n.skills.map(sk=>`<span class="tag-blue">${sk}</span>`).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// ===== 渲染收藏列表 =====
function renderFavList(){
  const favs = getJobFavs();
  if(favs.length===0){
    return '<div class="empty"><span class="emoji">💾</span>暂无收藏<br>点击职位旁的 ☆ 收藏感兴趣的岗位</div>';
  }
  return favs.map((f,i)=>{
    const item = f.item;
    const typeLabel = f.type==='school'?'高校招聘':f.type==='civil'?'公务员/编':'AI+新方向';
    const typeTag = f.type==='school'?'tag-green':f.type==='civil'?'tag-blue':'tag-pink';
    const title = item.title||item.school||item.name;
    const subtitle = item.position||item.degree||item.desc||'';
    return `
      <div class="job-item">
        <div class="job-item-header">
          <div class="job-item-title">${title}</div>
          <button class="fav-btn active" onclick="toggleJobFav(${JSON.stringify(item).replace(/"/g,'&quot;')},'${f.type}')">★</button>
        </div>
        <div class="job-item-tags">
          <span class="${typeTag}">${typeLabel}</span>
          ${item.region?`<span class="tag-blue">${item.region}</span>`:''}
        </div>
        <div style="font-size:12px;color:var(--text-light);margin-top:4px">${subtitle.substring(0,50)}</div>
      </div>
    `;
  }).join('');
}

// ===== 统计数据 =====
function getJobStats(){
  const favs = getJobFavs();
  const filters = getJobFilters();
  let filtered = JOB_ALL_SCHOOLS;
  if(filters.region) filtered = filtered.filter(s=>s.region===filters.region);
  if(filters.bianzhi){
    if(filters.bianzhi==='公办') filtered = filtered.filter(s=>s.type.startsWith('公办'));
    if(filters.bianzhi==='民办') filtered = filtered.filter(s=>s.type.startsWith('民办'));
  }
  if(filters.schoolType){
    if(filters.schoolType==='本科') filtered = filtered.filter(s=>s.type.includes('本科'));
    if(filters.schoolType==='大专') filtered = filtered.filter(s=>s.type.includes('大专'));
    if(filters.schoolType==='中专') filtered = filtered.filter(s=>s.type.includes('中专'));
  }
  return {
    totalSchools: JOB_ALL_SCHOOLS.length,
    filteredCount: filtered.length,
    civilCount: JOB_CIVIL.length,
    aiCount: JOB_AI_NEW.length,
    favCount: favs.length,
  };
}

// ===== 切换标签 =====
function switchJobTab(tab){
  state.jobTab = tab;
  renderJob();
}

// ===== 筛选变更 =====
function onJobFilterChange(){
  const region = val('job-region');
  const bianzhi = val('job-bianzhi');
  const schoolType = val('job-school-type');
  setJobFilters({region, bianzhi, schoolType});
  renderJob();
}

// ===== 入口渲染 =====
function renderJob(){
  const v = document.getElementById('view-job');
  if(!v) return;
  const tab = state.jobTab || 'schools';
  const filters = getJobFilters();
  const stats = getJobStats();
  const favs = getJobFavs();

  v.innerHTML = `
    <div class="hero">
      <div class="hero-inner">
        <div class="hero-text">
          <div class="hero-emoji">💼</div>
          <div><h1>就业导航</h1><div class="sub">数学学硕 · 职业方向</div></div>
        </div>
      </div>
    </div>
    <div class="content">

      <!-- 统计概览 -->
      <div class="card" style="background:linear-gradient(135deg,#FFE7A8,#FFD1E8)">
        <div class="stat-row">
          <div class="stat-cell"><div class="stat-num">${stats.totalSchools}</div><div class="stat-lab">高校招聘</div></div>
          <div class="stat-cell"><div class="stat-num blue">${stats.civilCount}</div><div class="stat-lab">公考/编制</div></div>
          <div class="stat-cell"><div class="stat-num green">${stats.aiCount}</div><div class="stat-lab">AI+新方向</div></div>
          <div class="stat-cell"><div class="stat-num orange">${stats.favCount}</div><div class="stat-lab">已收藏</div></div>
        </div>
      </div>

      <!-- 标签切换 -->
      <div class="card">
        <div class="card-title">
          <span class="ico">📋</span>职位浏览
          <span class="tag" style="margin-left:auto">筛选结果 ${stats.filteredCount}/${stats.totalSchools}</span>
        </div>
        <div class="job-tabs">
          <button class="btn btn-sm ${tab==='schools'?'btn-blue':'btn-ghost'}" onclick="switchJobTab('schools')">高校招聘</button>
          <button class="btn btn-sm ${tab==='civil'?'btn-blue':'btn-ghost'}" onclick="switchJobTab('civil')">公务员/编制</button>
          <button class="btn btn-sm ${tab==='ainew'?'btn-blue':'btn-ghost'}" onclick="switchJobTab('ainew')">AI+新方向</button>
          <button class="btn btn-sm ${tab==='favs'?'btn-blue':'btn-ghost'}" onclick="switchJobTab('favs')">我的收藏</button>
        </div>
      </div>

      ${tab==='schools' ? `
        <!-- 筛选栏 -->
        <div class="card">
          <div class="card-title"><span class="ico">🔍</span>筛选条件</div>
          <div class="row" style="gap:8px;flex-wrap:wrap">
            <select class="input select" id="job-region" onchange="onJobFilterChange()">
              <option value="">全部地区</option>
              ${JOB_REGIONS.map(r=>`<option value="${r}" ${filters.region===r?'selected':''}>${r}</option>`).join('')}
            </select>
            <select class="input select" id="job-bianzhi" onchange="onJobFilterChange()">
              <option value="">全部编制</option>
              <option value="公办" ${filters.bianzhi==='公办'?'selected':''}>公办</option>
              <option value="民办" ${filters.bianzhi==='民办'?'selected':''}>民办</option>
            </select>
            <select class="input select" id="job-school-type" onchange="onJobFilterChange()">
              <option value="">全部类型</option>
              <option value="本科" ${filters.schoolType==='本科'?'selected':''}>本科</option>
              <option value="大专" ${filters.schoolType==='大专'?'selected':''}>大专</option>
              <option value="中专" ${filters.schoolType==='中专'?'selected':''}>中专</option>
            </select>
          </div>
        </div>
        <!-- 高校招聘列表 -->
        <div class="card">
          <div class="card-title"><span class="ico">🏫</span>高校招聘信息</div>
          <div class="job-list">
            ${renderSchoolList()}
          </div>
        </div>
      ` : ''}

      ${tab==='civil' ? `
        <!-- 公务员/事业编/教师编 -->
        <div class="card">
          <div class="card-title"><span class="ico">🏛️</span>公务员 / 事业编 / 教师编</div>
          <div style="font-size:12px;color:var(--text-light);margin-bottom:8px">以下为近期符合数学学硕报考条件的招考信息</div>
          <div class="job-list">
            ${renderCivilList()}
          </div>
        </div>
      ` : ''}

      ${tab==='ainew' ? `
        <!-- AI+新型就业方向 -->
        <div class="card" style="background:linear-gradient(135deg,var(--primary-light),#E8D0FF)">
          <div class="card-title"><span class="ico">🧠</span>AI+ 新型就业方向</div>
          <div style="font-size:12px;color:var(--text-light);margin-bottom:8px">数学学硕的跨界竞争力，拥抱AI时代</div>
          <div class="job-list">
            ${renderAiNewList()}
          </div>
        </div>
      ` : ''}

      ${tab==='favs' ? `
        <!-- 收藏列表 -->
        <div class="card">
          <div class="card-title"><span class="ico">💾</span>我的收藏</div>
          <div class="job-list">
            ${renderFavList()}
          </div>
        </div>
      ` : ''}

    </div>
  `;
}

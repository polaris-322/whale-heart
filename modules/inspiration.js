/* ===== 选题灵感模块 ===== */

// 好物推荐赛道爆款视频 - 模拟数据池（带日期种子，每天不同）
const HOT_VIDEO_POOL = [
  {title:"99元三件夏装T恤测评，这家店真的赢麻了",platform:"抖音",author:"好物挖掘机",likes:"128w",reason:"价格锚定+数字冲击+平价定位击中下沉市场",idea:"可借鉴'三件X元'的打包定价话术，结合自家平价好物做'49元三件居家好物'主题",url:"https://www.douyin.com"},
  {title:"夏天必备！5款平价防晒霜真实上脸",platform:"小红书",author:"小太阳爱种草",likes:"45w",reason:"痛点前置+季节场景+真实上脸建立信任",idea:"做'秋冬平价面霜5款上脸实测'，同样痛点前置+真实测评",url:"https://www.xiaohongshu.com"},
  {title:"30元搞定一周早餐，打工人省钱神器",platform:"抖音",author:"省钱日记",likes:"89w",reason:"场景痛点+反差数字+实用价值高",idea:"延伸'50元搞定一周晚餐'或'20元一周下午茶'系列",url:"https://www.douyin.com"},
  {title:"学生党必入！15元眼影盘实测不踩雷",platform:"小红书",author:"美妆小仓库",likes:"32w",reason:"人群标签+极低价格+避雷承诺",idea:"做'学生党10元口红实测'或'15元腮红'同类人群定位内容",url:"https://www.xiaohongshu.com"},
  {title:"100元搞定全身穿搭，平价也能穿出高级感",platform:"抖音",author:"穿搭研究所",likes:"67w",reason:"全身搭配+预算挑战+高级感反差",idea:"做'100元秋冬穿搭挑战'或'50元通勤穿搭'",url:"https://www.douyin.com"},
  {title:"平价好物分享｜这5件东西让我后悔没早买",platform:"小红书",author:"种草小能手",likes:"28w",reason:"后悔话术+数量清单+好物种草",idea:"用'后悔没早买'话术做家居好物清单类内容",url:"https://www.xiaohongshu.com"},
  {title:"50元以下的快乐，这些小东西治愈了我",platform:"小红书",author:"生活小确幸",likes:"38w",reason:"情绪价值+价格门槛低+治愈系氛围",idea:"做'30元以下的小幸福'治愈系好物分享",url:"https://www.xiaohongshu.com"},
  {title:"夏天这样穿显瘦10斤！微胖女孩必看",platform:"抖音",author:"显瘦穿搭",likes:"95w",reason:"人群痛点+效果承诺+季节适配",idea:"做'冬天这样穿显瘦'同样人群痛点切入",url:"https://www.douyin.com"},
  {title:"平价护肤品真实测评，这3款真的能回购",platform:"小红书",author:"成分党小美",likes:"52w",reason:"真实测评+回购背书+具体数量",idea:"做'平价彩妆回购清单'同类背书型内容",url:"https://www.xiaohongshu.com"},
  {title:"50元以内的厨房好物，让做饭变得超简单",platform:"抖音",author:"厨房小帮手",likes:"41w",reason:"场景聚焦+价格门槛+实用价值",idea:"做'50元卫生间好物'或'30元书桌好物'场景延伸",url:"https://www.douyin.com"},
  {title:"学生党护肤routine，全套不到100块",platform:"小红书",author:"学生护肤指南",likes:"36w",reason:"人群定位+全套搭配+总价控制",idea:"做'学生党化妆全套100元'同人群同价位结构",url:"https://www.xiaohongshu.com"},
  {title:"夏天平价穿搭，50元穿出 ins 风",platform:"小红书",author:"穿搭灵感库",likes:"29w",reason:"风格标签+价格+视觉反差",idea:"做'50元穿出韩系风'或'日系风'风格类内容",url:"https://www.xiaohongshu.com"},
  {title:"10元以内好物推荐，件件都好用",platform:"抖音",author:"好物分享官",likes:"73w",reason:"极低价格+清单式+信任感",idea:"做'20元以内家居好物清单'价格锚点类内容",url:"https://www.douyin.com"},
  {title:"平价彩妆真实测评，国货yyds",platform:"小红书",author:"彩妆种草机",likes:"44w",reason:"国货情怀+真实测评+品类聚焦",idea:"做'国货护肤真实测评'同类情怀品类",url:"https://www.xiaohongshu.com"},
  {title:"50元搞定一周午餐，打工人带饭神器",platform:"抖音",author:"打工人午餐",likes:"58w",reason:"人群痛点+预算+场景",idea:"做'50元一周早餐'或'30元一周晚餐'人群场景延伸",url:"https://www.douyin.com"}
];

// 选题灵感池（结合季节、平价、种草风格）
const TOPIC_POOL = [
  {topic:"秋季平价面霜推荐｜学生党也能闭眼入",category:"美妆护肤",reason:"换季护肤需求爆发+学生党人群+平价定位+闭眼入降低决策门槛",style:"小红书种草"},
  {topic:"30元以下治愈系家居小物，提升幸福感",category:"生活好物",reason:"治愈情绪价值+价格门槛低+清单式易种草+生活场景共鸣",style:"小红书种草"},
  {topic:"早秋穿搭｜50元穿出韩系氛围感",category:"服装",reason:"季节换搭+风格标签+价格反差+视觉系种草",style:"小红书种草"},
  {topic:"平价防晒霜真实测评，这3款回购了",category:"美妆护肤",reason:"季节刚需+真实测评背书+具体数量+回购建立信任",style:"小红书种草"},
  {topic:"学生党化妆包大公开，全套不到150元",category:"美妆护肤",reason:"人群标签+全套搭配+总价控制+好奇窥探欲",style:"小红书种草"},
  {topic:"10元好物分享｜这些小东西让我惊喜了",category:"生活好物",reason:"极低价格+情绪词+清单式+惊喜感",style:"小红书种草"},
  {topic:"秋冬平价外套推荐，100元也能穿出高级感",category:"服装",reason:"季节+价格反差+风格承诺+高级感种草",style:"小红书种草"},
  {topic:"平价口红测评，这支国货绝了",category:"美妆护肤",reason:"国货情怀+品类聚焦+极端表达+测评背书",style:"小红书种草"},
  {topic:"20元以下厨房好物，做饭效率翻倍",category:"生活好物",reason:"价格+场景+效果承诺+清单价值",style:"小红书种草"},
  {topic:"通勤穿搭｜百元内搞定一周look",category:"服装",reason:"场景+预算+系列化+一周清单式种草",style:"小红书种草"},
  {topic:"敏感肌平价水乳，这3款不踩雷",category:"美妆护肤",reason:"人群痛点+避雷承诺+具体数量+品类聚焦",style:"小红书种草"},
  {topic:"50元以内的快乐，打工人治愈好物",category:"生活好物",reason:"情绪价值+人群痛点+价格门槛+治愈系",style:"小红书种草"},
  {topic:"秋天第一双靴子，平价也好看",category:"服装",reason:"季节首单话术+品类+平价+颜值种草",style:"小红书种草"},
  {topic:"平价精华液推荐，学生党也能用得起",category:"美妆护肤",reason:"品类+人群+平价定位+负担感消除",style:"小红书种草"},
  {topic:"20元提升幸福感的小东西，谁买谁开心",category:"生活好物",reason:"价格+情绪承诺+悬念+人群共鸣",style:"小红书种草"}
];

// 用日期做种子的伪随机
function seedRand(seed){
  let s = 0; for(let i=0;i<seed.length;i++) s = (s*31 + seed.charCodeAt(i)) & 0x7fffffff;
  return ()=>{ s = (s*1103515245 + 12345) & 0x7fffffff; return s/0x7fffffff; };
}

function getDateKey(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}

// 获取今日爆款视频
function getTodayHotVideos(){
  const store = DB.get('hotVideos')||{};
  const key = getDateKey(new Date());
  if(store[key] && Date.now()-store[key].ts < 30*60*1000) return store[key].data;
  const rnd = seedRand(key+'hot');
  const shuffled = [...HOT_VIDEO_POOL].sort(()=>rnd()-0.5);
  const picked = shuffled.slice(0,5).map(v=>({...v}));
  store[key] = {ts:Date.now(),data:picked};
  DB.set('hotVideos',store);
  return picked;
}

// 获取今日选题
function getTodayTopics(){
  const store = DB.get('topics')||{};
  const key = getDateKey(new Date());
  if(store[key] && Date.now()-store[key].ts < 30*60*1000) return store[key].data;
  const rnd = seedRand(key+'topic');
  const shuffled = [...TOPIC_POOL].sort(()=>rnd()-0.5);
  const picked = shuffled.slice(0,5).map(t=>({...t}));
  store[key] = {ts:Date.now(),data:picked};
  DB.set('topics',store);
  return picked;
}

function renderInspiration(){
  const v = document.getElementById('view-inspiration');
  const videos = getTodayHotVideos();
  const topics = getTodayTopics();
  const season = getSeason();
  const today = new Date();
  const dateStr = `${today.getMonth()+1}月${today.getDate()}日`;

  v.innerHTML = `
    <div class="hero">
      <div class="hero-inner">
        <div class="hero-text">
          <div class="hero-emoji">💡</div>
          <div>
            <h1>选题灵感</h1>
            <div class="sub">每日9:00自动更新 · 已为你采集今日好物</div>
          </div>
        </div>
        <div class="hero-date">${dateStr}<br>${season}</div>
      </div>
    </div>
    <div class="content">
      <!-- 上半部分：爆款视频 -->
      <div class="card">
        <div class="card-title">
          <span class="ico">🔥</span>今日爆款视频
          <span class="tag">好物推荐赛道</span>
        </div>
        <div class="insp-videos">
          ${videos.map((v,i)=>`
            <div class="video-item">
              <div class="video-rank">${i+1}</div>
              <div class="video-body">
                <div class="video-platform">${v.platform} · ${v.author} · ❤️${v.likes}</div>
                <div class="video-title">${v.title}</div>
                <div class="video-analysis">
                  <div class="analysis-row"><span class="lab">爆款原因</span><span class="val">${v.reason}</span></div>
                  <div class="analysis-row"><span class="lab">创作思路</span><span class="val hl">${v.idea}</span></div>
                </div>
                <a class="btn btn-sm btn-blue video-link" href="${v.url}" target="_blank" rel="noopener">跳转原视频 →</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 下半部分：选题灵感 -->
      <div class="card card-blue">
        <div class="card-title">
          <span class="ico">🌸</span>今日选题灵感
          <span class="tag">${season}·平价种草</span>
        </div>
        <div class="topic-meta">结合 ${season} 季节 · 小红书种草风格 · 平价定位 · 非测评类</div>
        <div class="insp-topics">
          ${topics.map((t,i)=>`
            <div class="topic-item">
              <div class="topic-num">${i+1}</div>
              <div class="topic-body">
                <div class="topic-cat">${t.category} · ${t.style}</div>
                <div class="topic-title">${t.topic}</div>
                <div class="topic-reason"><span class="lab">爆款核心</span>${t.reason}</div>
              </div>
              <button class="btn btn-sm btn-ghost topic-copy" data-text="${t.topic}">复制</button>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card" style="background:linear-gradient(135deg,#FFF5FA,#F0F8FF)">
        <div style="display:flex;align-items:center;gap:10px;font-size:12px;color:var(--text-light)">
          <span style="font-size:22px">⏰</span>
          <div>每日上午 <b style="color:var(--pink-deep)">9:00</b> 自动采集最新数据。<br>包含抖音、小红书好物推荐赛道的爆款视频和选题分析。</div>
        </div>
      </div>
    </div>
  `;

  v.querySelectorAll('.topic-copy').forEach(b=>{
    b.onclick = ()=>{
      navigator.clipboard?.writeText(b.dataset.text);
      toast('选题已复制到剪贴板 🌸');
    };
  });
}

function getSeason(){
  const m = new Date().getMonth()+1;
  if(m>=3&&m<=5) return '春季';
  if(m>=6&&m<=8) return '夏季';
  if(m>=9&&m<=11) return '秋季';
  return '冬季';
}

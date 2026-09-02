const app = document.getElementById('app');

const DEMO_MEMBER_PHONE = '0582477779';
const DEMO_MEMBER_PASSWORD = 'Aa!@!707';
const DEMO_ADMIN_USER = 'admin';
const DEMO_ADMIN_PASSWORD = 'Saqr@2026';

const state = {
  lang: localStorage.getItem('saqr_lang') || 'ar',
  role: sessionStorage.getItem('saqr_role') || 'visitor',
  symbol: localStorage.getItem('saqr_symbol') || 'CRM',
  fav: JSON.parse(localStorage.getItem('saqr_fav') || '[]')
};

const T = {
  ar:{
    brand:'صقر العقود', home:'الرئيسية', contracts:'العقود', analyses:'التحليلات',
    alerts:'الإشعارات', subscription:'الاشتراكات', login:'تسجيل الدخول', contact:'تواصل معنا', logout:'تسجيل الخروج',
    admin:'لوحة التحكم', users:'إدارة المستخدمين', permissions:'المهام والصلاحيات', search:'ابحث عن شركة أو رمز...',
    subscribe:'اشترك الآن', start:'تسجيل الدخول', live:'بيانات لحظية', auto:'تحديث آلي', instant:'إشعارات فورية',
    analytics:'تحليلات', training:'منصة متخصصة في تدريب ومتابعة عقود الخيارات الأمريكية، بواجهة منظمة وتحليلات واضحة وتنبيهات فورية عند اقتراب مستويات الدخول والأهداف ووقف الخسارة.',
    features:'مميزات المنصة', results:'نتائج التدريب', total:'إجمالي عقود التدريب', entryTotal:'إجمالي أسعار الدخول', loss:'إجمالي الخسائر', net:'صافي الربح',
    goals:'الأهداف', level:'مستوى السترايك', stop:'وقف الخسارة', stats:'إحصائيات العقد', volume:'حجم التداول', open:'مفتوح العقود', iv:'التذبذب IV',
    current:'سعر العقد الحالي', entry:'سعر الدخول', expiry:'تاريخ الانتهاء', remaining:'الوقت المتبقي', days:'أيام',
    call:'CALL', put:'PUT', high:'High Confidence', short:'Short Term', note:'ملاحظة مهمة',
    disclaimer:'هذه ليست توصية مالية. جميع القرارات مسؤوليتك الشخصية. تداول الخيارات ينطوي على مخاطر عالية وقد تؤدي الخسائر إلى خسارة رأس المال.',
    welcome:'تسجيل الدخول', phone:'رقم الجوال', password:'كلمة المرور', enter:'دخول', member:'مشترك', adminRole:'مدير',
    memberOnly:'للدخول كمشترك استخدم رقم الجوال وكلمة المرور.', adminOnly:'للدخول كمدير استخدم اسم المستخدم وكلمة المرور.',
    forgot:'نسيت كلمة المرور؟', payments:'الاشتراكات المدفوعة', banned:'المشتركون المحظورون', expiring:'مشتركون قاربوا على الانتهاء',
    settings:'الإعدادات', noData:'لا توجد بيانات للعرض', allUsers:'جميع المستخدمين', assign:'تعيين مشرف', ban:'حظر', unban:'إلغاء الحظر',
    banReason:'سبب الحظر', save:'حفظ', cancel:'إلغاء', supervisor:'مشرف', active:'نشط', expired:'منتهي', pending:'بدون اشتراك',
    plan:'الباقة', status:'الحالة', mobile:'رقم الجوال', expires:'ينتهي في', action:'الإجراء', contactInbox:'رسائل تواصل معنا',
    subject:'الموضوع', message:'محتوى الرسالة', send:'إرسال', received:'الواردة', proof:'إرفاق ما يثبت', screenshot:'تصوير الشاشة',
    supervisorInfo:'المشرف يستطيع فقط حظر المشتركين المثبت عليهم تصوير الشاشة، مع إلزامه بإرفاق الإثبات. لا تظهر له إحصاءات المشتركين أو مبالغ الاشتراكات.',
    extend:'تمديد الاشتراك', noSubscription:'بدون اشتراك', extendPrompt:'أدخل مدة التمديد بالأيام', close:'إغلاق', menu:'القائمة',
    oneMonth:'شهر', threeMonths:'3 شهور', sixMonths:'6 شهور', sar:'ر.س', sameFeatures:'بيانات لحظية • إشعارات فورية • تحليلات',
    demo:'نسخة تجريبية', adminMessages:'الرسائل الواردة من الزوار والمشتركين',
    permissionTitle:'المهام والصلاحيات', permissionSearch:'ابحث برقم الجوال', flagged:'مثبت عليه تصوير الشاشة',
    noProof:'لم يتم إرفاق إثبات', assigned:'تم تعيينه مشرفًا', bannedSuccess:'تم حظر المشترك', logoutDone:'تم تسجيل الخروج',
    loginError:'بيانات الدخول غير صحيحة', roleRequired:'اختر نوع الحساب',
  },
  en:{
    brand:'Saqr Options', home:'Home', contracts:'Contracts', analyses:'Analytics', alerts:'Alerts', subscription:'Subscriptions', login:'Log in', contact:'Contact us', logout:'Log out', admin:'Dashboard', users:'User management', permissions:'Tasks & permissions', search:'Search for a company or symbol...', subscribe:'Subscribe now', start:'Log in', live:'Live data', auto:'Auto update', instant:'Instant alerts', analytics:'Analytics', training:'A specialized platform for training and tracking U.S. options contracts with organized views, clear analytics, and instant alerts.', features:'Platform features', results:'Training results', total:'Total contracts', entryTotal:'Total entry prices', loss:'Total losses', net:'Net profit', goals:'Targets', level:'Strike level', stop:'Stop loss', stats:'Contract statistics', volume:'Trading volume', open:'Open contracts', iv:'IV volatility', current:'Current contract price', entry:'Entry price', expiry:'Expiry date', remaining:'Time remaining', days:'days', call:'CALL', put:'PUT', high:'High Confidence', short:'Short Term', note:'Important note', disclaimer:'This is not financial advice. All decisions are your personal responsibility. Options trading involves high risk.', welcome:'Log in', phone:'Mobile number', password:'Password', enter:'Log in', member:'Subscriber', adminRole:'Admin', memberOnly:'Use the subscriber mobile number and password.', adminOnly:'Use the admin username and password.', forgot:'Forgot password?', payments:'Paid subscriptions', banned:'Banned subscribers', expiring:'Expiring subscribers', settings:'Settings', noData:'No data to display', allUsers:'All users', assign:'Assign supervisor', ban:'Ban', unban:'Unban', banReason:'Ban reason', save:'Save', cancel:'Cancel', supervisor:'Supervisor', active:'Active', expired:'Expired', pending:'No subscription', plan:'Plan', status:'Status', mobile:'Mobile number', expires:'Expires', action:'Action', contactInbox:'Contact messages', subject:'Subject', message:'Message', send:'Send', received:'Inbox', proof:'Attach proof', screenshot:'Screen capture', supervisorInfo:'Supervisors can only ban subscribers flagged for screen capture and must attach proof. Financial and subscriber totals are hidden.', extend:'Extend subscription', noSubscription:'No subscription', extendPrompt:'Enter extension days', close:'Close', menu:'Menu', oneMonth:'1 month', threeMonths:'3 months', sixMonths:'6 months', sar:'SAR', sameFeatures:'Live data • Instant alerts • Analytics', demo:'Demo build', adminMessages:'Messages received from visitors and subscribers', permissionTitle:'Tasks & permissions', permissionSearch:'Search by mobile', flagged:'Screen-capture flagged', noProof:'No proof attached', assigned:'Supervisor assigned', bannedSuccess:'Subscriber banned', logoutDone:'Logged out', loginError:'Invalid login details', roleRequired:'Choose account type'
  }
};
const t = k => T[state.lang][k] || k;

const symbols = {
 CRM:{company:'Salesforce Inc.',type:'CALL',current:'$2.38',entry:'$2.45',strike:'$278.42',expiry:'May 16, 2026',sub:'$280',targets:[['$3.20','+30.6%'],['$4.10','+67.3%'],['$5.80','+136.7%']]},
 NVDA:{company:'NVIDIA Corp.',type:'PUT',current:'$1.62',entry:'$1.80',strike:'$175.20',expiry:'May 21, 2026',sub:'$260',targets:[['$2.40','+48.2%'],['$3.10','+92.4%'],['$4.20','+160.1%']]},
 AAPL:{company:'Apple Inc.',type:'CALL',current:'$1.35',entry:'$1.42',strike:'$235.10',expiry:'May 28, 2026',sub:'$250',targets:[['$1.90','+40.7%'],['$2.40','+77.8%'],['$3.10','+129.6%']]},
 AMZN:{company:'Amazon.com Inc.',type:'CALL',current:'$1.20',entry:'$1.31',strike:'$210.30',expiry:'Jun 05, 2026',sub:'$225',targets:[['$1.75','+45.8%'],['$2.20','+83.3%'],['$3.00','+150%']]},
 MSFT:{company:'Microsoft Corp.',type:'CALL',current:'$1.70',entry:'$1.84',strike:'$455.10',expiry:'Jun 12, 2026',sub:'$470',targets:[['$2.20','+29.4%'],['$2.90','+70.6%'],['$3.80','+123.5%']]},
 TSLA:{company:'Tesla Inc.',type:'PUT',current:'$2.05',entry:'$2.20',strike:'$325.00',expiry:'Jun 19, 2026',sub:'$320',targets:[['$2.70','+31.7%'],['$3.40','+65.9%'],['$4.50','+119.5%']]},
 META:{company:'Meta Platforms Inc.',type:'PUT',current:'$1.55',entry:'$1.68',strike:'$610.40',expiry:'Jun 26, 2026',sub:'$600',targets:[['$2.10','+35.5%'],['$2.70','+74.2%'],['$3.60','+132.3%']]},
 GOOGL:{company:'Alphabet Inc.',type:'CALL',current:'$1.44',entry:'$1.56',strike:'$190.20',expiry:'Jul 03, 2026',sub:'$200',targets:[['$1.95','+35.4%'],['$2.50','+73.6%'],['$3.20','+122.2%']]}
};

function getUsers(){
  const fallback=[
    {phone:DEMO_MEMBER_PHONE,plan:'6 شهور',status:'active',expires:'2026-09-12',supervisor:false,banned:false,reason:'',flagged:true},
    {phone:'0501234567',plan:'3 شهور',status:'active',expires:'2026-09-04',supervisor:false,banned:false,reason:'',flagged:false},
    {phone:'0559876543',plan:'شهر',status:'active',expires:'2026-09-18',supervisor:false,banned:false,reason:'',flagged:true},
    {phone:'0532221110',plan:'بدون اشتراك',status:'none',expires:'—',supervisor:false,banned:false,reason:'',flagged:false}
  ];
  try{return JSON.parse(localStorage.getItem('saqr_users'))||fallback}catch{return fallback}
}
function setUsers(u){localStorage.setItem('saqr_users',JSON.stringify(u))}
function getMessages(){try{return JSON.parse(localStorage.getItem('saqr_messages'))||[]}catch{return []}}
function setMessages(m){localStorage.setItem('saqr_messages',JSON.stringify(m))}
function save(){localStorage.setItem('saqr_lang',state.lang);sessionStorage.setItem('saqr_role',state.role);localStorage.setItem('saqr_symbol',state.symbol);localStorage.setItem('saqr_fav',JSON.stringify(state.fav))}
function go(route){location.hash=route}
function icon(name){return ({home:'⌂',contracts:'▥',analyses:'⌁',alerts:'♟',subscription:'♛',login:'→',contact:'✉',admin:'⌂',users:'♙',permissions:'⚙',logout:'↪'})[name]||'•'}
function isLogged(){return state.role==='member'||state.role==='admin'}

function header(){
 return `<header class="topbar"><button class="menu-btn" aria-label="${t('menu')}" onclick="toggleMenu()"><i></i><i></i><i></i></button><a class="brand-text" href="#/">${t('brand')}</a><div class="header-right"><div class="lang"><button class="${state.lang==='en'?'active':''}" onclick="setLang('en')">EN</button><button class="${state.lang==='ar'?'active':''}" onclick="setLang('ar')">ع</button></div></div></header>`
}
function sidebar(route){
 let items=[];
 if(state.role==='admin') items=[['home','/'],['contracts','/contracts'],['users','/admin/users'],['permissions','/admin/permissions'],['contact','/admin/contact'],['logout','#/logout']];
 else if(state.role==='member') items=[['home','/'],['contracts','/contracts'],['analyses','/analyses'],['alerts','/alerts'],['contact','/contact'],['logout','#/logout']];
 else return '';
 return `<aside class="sidebar">${items.map(([k,r])=>`<a class="nav ${route===r?'active':''}" href="${r.startsWith('#')?r:'#'+r}"><span class="ico">${icon(k)}</span><span>${k==='logout'?t('logout'):t(k)}</span></a>`).join('')}</aside>`
}
function layout(content,route,withSidebar=true){
 document.documentElement.lang=state.lang;document.documentElement.dir=state.lang==='ar'?'rtl':'ltr';
 app.innerHTML=header()+`<div class="shell ${withSidebar?'has-sidebar':''}">${withSidebar?sidebar(route):''}<main class="main">${content}<footer class="footer">SAQR OPTIONS © 2026 — ${t('demo')}</footer></main></div><div class="mobile-panel" id="mobilePanel"></div><div class="toast" id="toast"></div>`;
}
function setLang(l){state.lang=l;save();render()}
function toggleMenu(){const p=document.getElementById('mobilePanel');if(!p)return; p.classList.toggle('open');p.innerHTML=`<div class="mobile-menu-card"><div class="mobile-menu-head"><b>${t('menu')}</b><button class="btn icon" onclick="toggleMenu()">×</button></div><a href="#/">${t('home')}</a>${isLogged()?`<a href="#/contracts">${t('contracts')}</a>`:''}${state.role==='admin'?`<a href="#/admin/users">${t('users')}</a><a href="#/admin/permissions">${t('permissions')}</a><a href="#/admin/contact">${t('contactInbox')}</a>`:`<a href="#/contact">${t('contact')}</a>`}<a href="#/logout">${t('logout')}</a></div>`}

function publicHome(){
 return `<section class="card hero public-hero"><h1>${t('brand')}</h1><p>${t('training')}</p><div class="pills"><span class="pill">⚡ ${t('live')}</span><span class="pill">🔔 ${t('instant')}</span><span class="pill">📊 ${t('analytics')}</span></div><div class="hero-actions"><button class="btn primary" onclick="go('#/login')">${t('start')}</button><button class="btn gold" onclick="go('#/subscription')">${t('subscribe')}</button></div></section><div class="section-title"><h2>${t('features')}</h2></div><div class="grid cols-3 feature-grid"><div class="card feature"><h2>⚡ ${t('live')}</h2><p>${state.lang==='ar'?'متابعة منظمة لعقود الخيارات والبيانات المتاحة في الواجهة.':'Organized options contract tracking in the interface.'}</p></div><div class="card feature"><h2>🔔 ${t('instant')}</h2><p>${state.lang==='ar'?'تنبيهات واضحة عند تحقق المستويات المحددة.':'Clear alerts when configured levels are reached.'}</p></div><div class="card feature"><h2>📊 ${t('analytics')}</h2><p>${state.lang==='ar'?'عرض تحليلي مرتب لمساعدة المشترك على قراءة بيانات العقد.':'Structured analytics to help subscribers read contract data.'}</p></div></div>`
}
function memberHome(){return publicHome()}
function stat(label,num,cls=''){return `<div class="card stat"><div class="label">${label}</div><div class="num ${cls}">${num}</div></div>`}

function contractPage(){
 const d=symbols[state.symbol],put=d.type==='PUT';
 return `<div class="ticker">${Object.keys(symbols).map(s=>`<button class="${s===state.symbol?'active':''}" onclick="selectSymbol('${s}')">★ ${s}<small>${symbols[s].company}</small></button>`).join('')}</div><div class="section-title"><h2>${t('contracts')}</h2><span class="badge green">${t('live')}</span></div><div class="grid contract-layout"><section class="card"><div class="option-head"><div><div class="symbol">★ ${state.symbol}</div><div class="company">${d.company}</div><div class="badges"><span class="badge ${put?'red':'green'}">${put?t('put'):t('call')}</span><span class="badge gold">${t('high')}</span><span class="badge">${t('short')}</span></div></div><button class="option-type ${put?'put':''}">${put?'↘':'↗'} ${put?t('put'):t('call')}</button></div><div class="price-grid"><div class="price current"><div>${t('current')}</div><div class="v red">${d.current}</div><div class="red">↘ -0.27 (-10.19%)</div></div><div class="price entry"><div>${t('entry')}</div><div class="v green">${d.entry}</div></div></div><div class="meta-grid"><div class="meta"><span class="small">${t('remaining')}</span><b>2 ${t('days')}</b></div><div class="meta"><span class="small">${t('level')}</span><b>${d.sub}</b></div><div class="meta"><span class="small">${t('expiry')}</span><b>${d.expiry}</b></div></div><div class="chart"><span class="chart-caption">${state.symbol} — ${d.strike}</span><svg viewBox="0 0 900 280" preserveAspectRatio="none"><polyline fill="none" stroke="${put?'#ff3154':'#00ef9b'}" stroke-width="5" points="0,220 70,205 130,214 180,175 230,185 280,140 340,155 400,122 455,145 500,100 560,130 620,110 680,72 735,98 790,60 850,86 900,45"/></svg></div></section><aside class="side-stack"><div class="card targets"><h2>${t('goals')} 🎯</h2>${d.targets.map((x,i)=>`<div class="target"><span>${state.lang==='ar'?'الهدف':'Target'} ${i+1}</span><b>${x[0]}</b><span class="pct">${x[1]}</span></div>`).join('')}</div><div class="card"><h3>⚡ ${t('level')}</h3><div class="big-value">${d.sub}</div></div><div class="card"><h3>⛔ ${t('stop')}</h3><div class="big-value">${put?'$2.95':'$1.20'}</div><div class="red">-51.0%</div></div><div class="card"><h3>📊 ${t('stats')}</h3><div class="meta"><span>${t('volume')}</span><b>12,450</b></div><div class="meta"><span>${t('open')}</span><b>8,230</b></div><div class="meta"><span>${t('iv')}</span><b>32.4%</b></div></div></aside></div><div class="card note-card"><b class="goldtxt">${t('note')}</b><p>${t('disclaimer')}</p></div>`
}
function contracts(){return `<div class="toolbar"><div class="search"><span class="sico">⌕</span><input oninput="filterContracts(this.value)" placeholder="${t('search')}"></div></div><div id="contractContent">${contractPage()}</div>`}
function filterContracts(q){const box=document.getElementById('contractContent');if(!box)return;const keys=Object.keys(symbols).filter(s=>(s+' '+symbols[s].company).toLowerCase().includes(q.toLowerCase()));if(!keys.length){box.innerHTML=`<div class="card empty"><h2>${t('noData')}</h2></div>`;return}box.innerHTML=contractPage();}

function analyses(){return `<div class="section-title"><h2>${t('analyses')}</h2></div><div class="grid cols-2">${['CRM','NVDA','AAPL','META'].map(s=>`<div class="card"><h2>${s} ${symbols[s].type==='CALL'?'↗':'↘'}</h2><p class="company">${symbols[s].company}</p><div class="stats two"><div><div class="label">${t('current')}</div><div class="num">${symbols[s].current}</div></div><div><div class="label">${t('entry')}</div><div class="num green">${symbols[s].entry}</div></div></div><hr><span class="badge gold">${t('high')}</span> <span class="badge">${t('short')}</span></div>`).join('')}</div>`}
function alerts(){return `<div class="section-title"><h2>${t('alerts')}</h2></div><div class="grid cols-2">${[['🎯','CRM','$3.20'],['⚡','NVDA','$175.20'],['⛔','META','$600']].map(a=>`<div class="card"><div class="alert-title">${a[0]} <b>${a[1]}</b></div><p>${state.lang==='ar'?'تم الوصول إلى المستوى المحدد':'Target level reached'}: <strong class="green">${a[2]}</strong></p><span class="badge green">${t('instant')}</span></div>`).join('')}</div>`}
function subscription(){const plans=[[t('oneMonth'),99],[t('threeMonths'),229],[t('sixMonths'),499]];return `<div class="section-title"><h2>${t('subscription')}</h2><span class="badge gold">${t('sameFeatures')}</span></div><div class="grid cols-3 pricing">${plans.map((p,i)=>`<div class="card price-card"><h2>${p[0]}</h2><div class="price-sar">${p[1]} <small>${t('sar')}</small></div><div class="feature-list"><span>✓ ${t('live')}</span><span>✓ ${t('instant')}</span><span>✓ ${t('analytics')}</span></div><button class="btn ${i===1?'primary':''}" onclick="demoSubscribe('${p[0]}',${p[1]})">${t('subscribe')}</button></div>`).join('')}</div>`}
function demoSubscribe(plan,price){if(state.role!=='member'){toast(t('loginError'));go('#/login');return}const users=getUsers();const u=users.find(x=>x.phone===DEMO_MEMBER_PHONE);if(u){u.plan=plan;u.status='active';u.banned=false;const days=plan===t('oneMonth')?30:plan===t('threeMonths')?90:180;const d=new Date();d.setDate(d.getDate()+days);u.expires=d.toISOString().slice(0,10);setUsers(users)}toast(`${plan} — ${price} ${t('sar')} ✓`)}

function login(){return `<div class="card form-card login-card"><h1>${t('welcome')}</h1><div class="role-tabs"><button class="${loginMode==='member'?'active':''}" onclick="loginMode='member';render()">${t('member')}</button><button class="${loginMode==='admin'?'active':''}" onclick="loginMode='admin';render()">${t('adminRole')}</button></div><p class="login-help">${loginMode==='member'?t('memberOnly'):t('adminOnly')}</p><div class="field"><label>${loginMode==='member'?t('phone'):'اسم المستخدم'}</label><input id="loginUser" placeholder="${loginMode==='member'?'05xxxxxxxx':'admin'}" autocomplete="username"></div><div class="field"><label>${t('password')}</label><input id="loginPass" type="password" autocomplete="current-password"></div><button class="btn primary full" onclick="loginDemo()">${t('enter')}</button><div class="demo-credentials">${t('demo')}<br>${loginMode==='member'?`${DEMO_MEMBER_PHONE} / ${DEMO_MEMBER_PASSWORD}`:`${DEMO_ADMIN_USER} / ${DEMO_ADMIN_PASSWORD}`}</div></div>`}
let loginMode='member';
function loginDemo(){const u=document.getElementById('loginUser')?.value.trim(),p=document.getElementById('loginPass')?.value;const ok=loginMode==='member'?(u===DEMO_MEMBER_PHONE&&p===DEMO_MEMBER_PASSWORD):(u===DEMO_ADMIN_USER&&p===DEMO_ADMIN_PASSWORD);if(!ok){toast(t('loginError'));return}state.role=loginMode;save();go(loginMode==='admin'?'#/admin':'#/contracts')}
function contact(){return `<div class="card form-card"><h1>${t('contact')}</h1><div class="field"><label>${t('phone')} *</label><input id="contactPhone" value="${state.role==='member'?DEMO_MEMBER_PHONE:''}"></div><div class="field"><label>${t('subject')} *</label><input id="contactSubject"></div><div class="field"><label>${t('message')} *</label><textarea id="contactMessage"></textarea></div><button class="btn primary full" onclick="sendContact()">${t('send')}</button></div>`}
function sendContact(){const p=document.getElementById('contactPhone')?.value.trim(),s=document.getElementById('contactSubject')?.value.trim(),m=document.getElementById('contactMessage')?.value.trim();if(!p||!s||!m){toast(t('noData'));return}const msgs=getMessages();msgs.unshift({phone:p,subject:s,message:m,date:new Date().toLocaleString('ar-SA')});setMessages(msgs);toast(`${t('send')} ✓`);go(state.role==='admin'?'#/admin/contact':'#/')}

function admin(){const users=getUsers();const active=users.filter(u=>!u.banned&&u.status==='active').length;const paid=users.filter(u=>!u.banned&&u.status==='active'&&u.plan!=='بدون اشتراك').length;const banned=users.filter(u=>u.banned).length;const soon=users.filter(u=>u.status==='active'&&!u.banned&&daysLeft(u.expires)<=2).length;return `<div class="section-title"><h2>${t('admin')}</h2><span class="badge gold">${t('adminRole')}</span></div><div class="admin-grid">${stat(t('subscribers'),active)}${stat(t('payments'),paid,'green')}${stat(t('banned'),banned,'red')}${stat(t('expiring'),soon,'goldtxt')}</div><div class="admin-shortcuts"><a class="card shortcut" href="#/admin/users"><b>${t('users')}</b><span>›</span></a><a class="card shortcut" href="#/admin/permissions"><b>${t('permissions')}</b><span>›</span></a><a class="card shortcut" href="#/admin/contact"><b>${t('contactInbox')}</b><span>${getMessages().length}</span></a></div>`}
function daysLeft(date){if(!date||date==='—')return 999;return Math.ceil((new Date(date)-new Date())/86400000)}
function adminUsers(){return `<div class="section-title"><h2>${t('users')}</h2></div><div class="toolbar"><div class="search"><span class="sico">⌕</span><input id="userSearch" oninput="renderUserRows(this.value)" placeholder="${t('permissionSearch')}"></div></div><div class="card table-wrap"><table class="table"><thead><tr><th>${t('mobile')}</th><th>${t('plan')}</th><th>${t('status')}</th><th>${t('expires')}</th><th>${t('action')}</th></tr></thead><tbody id="userRows">${userRows('')}</tbody></table></div>`}
function userRows(q){return getUsers().filter(u=>u.phone.includes(q||'')).map((u,i)=>`<tr><td class="phone-cell">${u.phone}${u.supervisor?` <span class="badge gold">${t('supervisor')}</span>`:''}</td><td>${u.plan}</td><td><span class="badge ${u.banned?'red':u.status==='active'?'green':''}">${u.banned?t('banned'):u.status==='active'?t('active'):t('pending')}</span>${u.banned&&u.reason?`<div class="reason">${t('banReason')}: ${escapeHtml(u.reason)}</div>`:''}</td><td>${u.expires}</td><td class="actions"><button class="btn small" onclick="assignSupervisor(${i})">${u.supervisor?t('unban')+' / ':''}${t('assign')}</button><button class="btn small danger" onclick="banUser(${i})">${u.banned?t('unban'):t('ban')}</button></td></tr>`).join('')||`<tr><td colspan="5" class="empty-cell">${t('noData')}</td></tr>`}
function renderUserRows(q){const el=document.getElementById('userRows');if(el)el.innerHTML=userRows(q)}
function assignSupervisor(i){const users=getUsers();const u=users[i];if(!u)return;u.supervisor=!u.supervisor;setUsers(users);toast(t('assigned'));render()}
function banUser(i){const users=getUsers();const u=users[i];if(!u)return;if(u.banned){u.banned=false;u.reason='';setUsers(users);render();return}const reason=prompt(t('banReason'));if(!reason)return;u.banned=true;u.reason=reason;setUsers(users);toast(t('bannedSuccess'));render()}
function adminPermissions(){const users=getUsers();return `<div class="section-title"><h2>${t('permissionTitle')}</h2></div><div class="card permission-note"><p>${t('supervisorInfo')}</p></div><div class="toolbar"><div class="search"><span class="sico">⌕</span><input id="permSearch" oninput="renderPermRows(this.value)" placeholder="${t('permissionSearch')}"></div></div><div class="card table-wrap"><table class="table"><thead><tr><th>${t('mobile')}</th><th>${t('flagged')}</th><th>${t('action')}</th></tr></thead><tbody id="permRows">${permRows(users,'')}</tbody></table></div>`}
function permRows(users,q){return users.filter(u=>u.phone.includes(q||'')).map((u,i)=>`<tr><td class="phone-cell">${u.phone}</td><td>${u.flagged?`<span class="badge gold">${t('flagged')}</span>`:`<span class="muted">—</span>`}</td><td><button class="btn small" onclick="assignSupervisor(${i})">${u.supervisor?t('supervisor'):t('assign')}</button></td></tr>`).join('')||`<tr><td colspan="3" class="empty-cell">${t('noData')}</td></tr>`}
function renderPermRows(q){const el=document.getElementById('permRows');if(el)el.innerHTML=permRows(getUsers(),q)}
function adminContact(){const msgs=getMessages();return `<div class="section-title"><h2>${t('contactInbox')}</h2><span class="badge green">${msgs.length}</span></div><div class="messages">${msgs.length?msgs.map(m=>`<div class="card message-card"><div class="message-head"><b>${m.subject}</b><span>${m.date}</span></div><div class="phone-cell">${m.phone}</div><p>${escapeHtml(m.message)}</p></div>`).join(''):`<div class="card empty"><h2>${t('noData')}</h2></div>`}</div>`}
function escapeHtml(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function logout(){state.role='visitor';save();toast(t('logoutDone'));setTimeout(()=>go('#/'),250)}
function selectSymbol(s){if(!symbols[s])return;state.symbol=s;save();go('#/contracts')}

function render(){
 let path=location.hash.replace(/^#/,'')||'/';
 if(path==='/logout'){logout();return}
 if(path==='/'){layout(state.role==='admin'?admin():state.role==='member'?memberHome():publicHome(),'/');return}
 if(path==='/subscription'){layout(subscription(),path);return}
 if(path==='/login'){layout(login(),path,false);return}
 if(path==='/contact'){layout(contact(),path,state.role!=='visitor');return}
 if(state.role==='visitor'){layout(publicHome(),'/');return}
 if(path==='/contracts')layout(contracts(),path);
 else if(path==='/analyses')layout(analyses(),path);
 else if(path==='/alerts')layout(alerts(),path);
 else if(path==='/admin')layout(admin(),path);
 else if(path==='/admin/users')layout(adminUsers(),path);
 else if(path==='/admin/permissions')layout(adminPermissions(),path);
 else if(path==='/admin/contact')layout(adminContact(),path);
 else layout(`<div class="card empty"><h2>404</h2><p>${t('noData')}</p></div>`,'');
}
window.addEventListener('hashchange',render);render();

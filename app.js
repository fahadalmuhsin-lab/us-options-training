const app = document.getElementById('app');

const DEMO_MEMBER_PHONE = '0582477779';
const DEMO_MEMBER_PASSWORD = 'Aa!@!707';
const DEMO_ADMIN_USER = 'admin';
const DEMO_ADMIN_PASSWORD = 'Saqr@2026';
const RESET_DEMO_CODE = '1997';
const RESET_DEMO_PHONE = '0582477779';
const RESET_DEMO_EMAIL = 'fahad.alroile@gmail.com';

const state = {
  lang: localStorage.getItem('saqr_lang') || 'ar',
  role: localStorage.getItem('saqr_role') || 'visitor',
  currentPhone: localStorage.getItem('saqr_current_phone') || '',
  symbol: localStorage.getItem('saqr_symbol') || 'CRM',
  fav: JSON.parse(localStorage.getItem('saqr_fav') || '["CRM"]')
};
document.documentElement.classList.remove('light-theme');
localStorage.removeItem('saqr_theme');
let headerQuery='';

const T = {
  ar:{
    brand:'صقر أوبشن', home:'الرئيسية', contracts:'العقود', favorites:'المفضلة', analyses:'التحليلات',
    alerts:'الإشعارات', subscription:'الاشتراكات', login:'تسجيل الدخول', contact:'تواصل معنا', logout:'تسجيل الخروج',
    admin:'لوحة التحكم', users:'إدارة المستخدمين', manage:'إدارة المستخدمين', permissions:'المهام والصلاحيات', supervisors:'المشرفون', search:'ابحث عن شركة أو رمز...',
    subscribe:'اشترك الآن', start:'تسجيل الدخول', live:'بيانات لحظية', auto:'تحديث آلي', instant:'إشعارات فورية',
    analytics:'تحليلات', training:'منصة متخصصة في تدريب ومتابعة عقود الخيارات الأمريكية، بواجهة منظمة وتحليلات واضحة وتنبيهات فورية عند اقتراب مستويات الدخول والأهداف ووقف الخسارة.',
    features:'مميزات المنصة', results:'نتائج التدريب', total:'إجمالي عقود التدريب', entryTotal:'إجمالي أسعار الدخول', loss:'إجمالي الخسائر', net:'صافي الربح',
    goals:'الأهداف', level:'مستوى السترايك', stop:'وقف الخسارة', stats:'إحصائيات العقد', volume:'حجم التداول', open:'مفتوح العقود', iv:'التذبذب IV',
    current:'سعر العقد الحالي', entry:'سعر الدخول', expiry:'تاريخ الانتهاء', remaining:'الوقت المتبقي', days:'أيام',
    call:'CALL', put:'PUT', high:'ثقة عالية', short:'قصير المدى', note:'ملاحظة مهمة',
    disclaimer:'هذه ليست توصية مالية. جميع القرارات مسؤوليتك الشخصية. تداول الخيارات ينطوي على مخاطر عالية وقد تؤدي الخسائر إلى خسارة رأس المال.',
    welcome:'تسجيل الدخول', phone:'رقم الجوال', password:'كلمة المرور', enter:'دخول', member:'مشترك', adminRole:'مدير',
    memberOnly:'للدخول كمشترك استخدم رقم الجوال وكلمة المرور.', adminOnly:'للدخول كمدير استخدم اسم المستخدم وكلمة المرور.',
    forgot:'نسيت كلمة المرور؟', payments:'الاشتراكات المدفوعة', banned:'المشتركون المحظورون', expiring:'مشتركون قاربوا على الانتهاء', subscribers:'المشتركون النشطون',
    settings:'الإعدادات', noData:'لا توجد بيانات للعرض', allUsers:'جميع المستخدمين', assign:'تعيين مشرف', ban:'حظر', unban:'إلغاء الحظر',
    banReason:'سبب الحظر', save:'حفظ', cancel:'إلغاء', supervisor:'مشرف', active:'نشط', expired:'منتهي', pending:'بدون اشتراك',
    plan:'الباقة', status:'الحالة', mobile:'رقم الجوال', expires:'ينتهي في', loginDate:'تسجيل الدخول', action:'الإجراء', contactInbox:'رسائل تواصل معنا',
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
    brand:'Saqr Options', home:'Home', contracts:'Contracts', favorites:'Favorites', analyses:'Analytics', alerts:'Alerts', subscription:'Subscriptions', login:'Log in', contact:'Contact us', logout:'Log out', admin:'Dashboard', users:'User management', manage:'User management', permissions:'Tasks & permissions', supervisors:'Supervisors', search:'Search for a company or symbol...', subscribe:'Subscribe now', start:'Log in', live:'Live data', auto:'Auto update', instant:'Instant alerts', analytics:'Analytics', training:'A specialized platform for training and tracking U.S. options contracts with organized views, clear analytics, and instant alerts.', features:'Platform features', results:'Training results', total:'Total contracts', entryTotal:'Total entry prices', loss:'Total losses', net:'Net profit', goals:'Targets', level:'Strike level', stop:'Stop loss', stats:'Contract statistics', volume:'Trading volume', open:'Open contracts', iv:'IV volatility', current:'Current contract price', entry:'Entry price', expiry:'Expiry date', remaining:'Time remaining', days:'days', call:'CALL', put:'PUT', high:'High Confidence', short:'Short Term', note:'Important note', disclaimer:'This is not financial advice. All decisions are your personal responsibility. Options trading involves high risk.', welcome:'Log in', phone:'Mobile number', password:'Password', enter:'Log in', member:'Subscriber', adminRole:'Admin', memberOnly:'Use the subscriber mobile number and password.', adminOnly:'Use the admin username and password.', forgot:'Forgot password?', payments:'Paid subscriptions', banned:'Banned subscribers', expiring:'Expiring subscribers', subscribers:'Active subscribers', settings:'Settings', noData:'No data to display', allUsers:'All users', assign:'Assign supervisor', ban:'Ban', unban:'Unban', banReason:'Ban reason', save:'Save', cancel:'Cancel', supervisor:'Supervisor', active:'Active', expired:'Expired', pending:'No subscription', plan:'Plan', status:'Status', mobile:'Mobile number', expires:'Expires', loginDate:'Login date', action:'Action', contactInbox:'Contact messages', subject:'Subject', message:'Message', send:'Send', received:'Inbox', proof:'Attach proof', screenshot:'Screen capture', supervisorInfo:'Supervisors can only ban subscribers flagged for screen capture and must attach proof. Financial and subscriber totals are hidden.', extend:'Extend subscription', noSubscription:'No subscription', extendPrompt:'Enter extension days', close:'Close', menu:'Menu', oneMonth:'1 month', threeMonths:'3 months', sixMonths:'6 months', sar:'SAR', sameFeatures:'Live data • Instant alerts • Analytics', demo:'Demo build', adminMessages:'Messages received from visitors and subscribers', permissionTitle:'Tasks & permissions', permissionSearch:'Search by mobile', flagged:'Screen-capture flagged', noProof:'No proof attached', assigned:'Supervisor assigned', bannedSuccess:'Subscriber banned', logoutDone:'Logged out', loginError:'Invalid login details', roleRequired:'Choose account type'
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

function plusDays(n){const d=new Date();d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)}
function getUsers(){
  const fallback=[
    {phone:DEMO_MEMBER_PHONE,email:'',password:DEMO_MEMBER_PASSWORD,plan:'6 شهور',status:'active',start:'2026-03-12',expires:'2026-09-12',supervisor:false,banned:false,reason:'',flagged:true,discountCode:'',ratingPromptSent:false},
    {phone:'0501234567',email:'',password:'Demo!2026',plan:'3 شهور',status:'active',start:'2026-06-04',expires:'2026-09-04',supervisor:false,banned:false,reason:'',flagged:false,discountCode:'',ratingPromptSent:false},
    {phone:'0559876543',email:'',password:'Demo!2026',plan:'شهر',status:'active',start:'2026-08-18',expires:'2026-09-18',supervisor:false,banned:false,reason:'',flagged:true,discountCode:'',ratingPromptSent:false},
    {phone:'0532221110',email:'',password:'Demo!2026',plan:'بدون اشتراك',status:'none',start:'—',expires:'—',supervisor:false,banned:false,reason:'',flagged:false,discountCode:'',ratingPromptSent:false},
    {phone:'0582477778',email:'',password:'Fahwd!@!707',plan:'شهر',status:'active',start:plusDays(0),expires:plusDays(30),supervisor:false,banned:false,reason:'',flagged:false,discountCode:'',ratingPromptSent:false},
    {phone:'0583477779',email:'',password:'Fahwd!@!707',plan:'شهر',status:'active',start:plusDays(0),expires:plusDays(30),supervisor:false,banned:false,reason:'',flagged:false,discountCode:'',ratingPromptSent:false}
  ];
  try{return JSON.parse(localStorage.getItem('saqr_users_v2'))||fallback}catch{return fallback}
}
function setUsers(u){localStorage.setItem('saqr_users_v2',JSON.stringify(u))}
function getMessages(){try{return JSON.parse(localStorage.getItem('saqr_messages'))||[]}catch{return []}}
function setMessages(m){localStorage.setItem('saqr_messages',JSON.stringify(m))}
function getBanRequests(){try{return JSON.parse(localStorage.getItem('saqr_ban_requests'))||[]}catch{return []}}
function setBanRequests(r){localStorage.setItem('saqr_ban_requests',JSON.stringify(r))}
function getActivity(){try{return JSON.parse(localStorage.getItem('saqr_activity'))||[]}catch{return []}}
function setActivity(a){localStorage.setItem('saqr_activity',JSON.stringify(a.slice(0,60)))}
function logActivity(text){const a=getActivity();a.unshift({id:Date.now().toString()+Math.random().toString(36).slice(2,6),text,date:new Date().toLocaleString('ar-SA'),seen:false});setActivity(a)}
function getReviews(){try{return JSON.parse(localStorage.getItem('saqr_reviews'))||[]}catch{return []}}
function setReviews(r){localStorage.setItem('saqr_reviews',JSON.stringify(r))}
function getDiscountCodes(){try{return JSON.parse(localStorage.getItem('saqr_codes'))||{}}catch{return {}}}
function setDiscountCodes(c){localStorage.setItem('saqr_codes',JSON.stringify(c))}
function findDiscountCode(code){
 code=(code||'').trim().toUpperCase();
 if(!code)return null;
 if(code==='F77')return {code:'F77',percent:30,free:false};
 if(code==='GIKT2I1997')return {code:'GikT2i1997',percent:100,free:true};
 const custom=getDiscountCodes();
 if(custom[code])return {code,percent:custom[code].percent||0,free:false};
 return null;
}
function save(){localStorage.setItem('saqr_lang',state.lang);localStorage.setItem('saqr_role',state.role);localStorage.setItem('saqr_current_phone',state.currentPhone||'');localStorage.setItem('saqr_symbol',state.symbol);localStorage.setItem('saqr_fav',JSON.stringify(state.fav))}
function go(route){location.hash=route}
let toastTimer=null;
function toast(msg){
 const el=document.getElementById('toast');
 if(!el)return;
 el.textContent=msg;
 el.style.display='block';
 clearTimeout(toastTimer);
 toastTimer=setTimeout(()=>{el.style.display='none'},3200);
}
function icon(name){return ({home:'⌂',contracts:'▥',favorites:'★',analyses:'⌁',alerts:'♟',subscription:'♛',login:'→',contact:'✉',admin:'⌂',users:'♙',manage:'♙',permissions:'⚙',supervisors:'♞',logout:'↪'})[name]||'•'}
function updateWatermark(){
 let el=document.getElementById('watermarkLayer');
 if(!el){el=document.createElement('div');el.id='watermarkLayer';el.className='watermark-layer';document.body.appendChild(el)}
 if(!isLogged()){el.innerHTML='';el.style.display='none';return}
 const id=state.role==='member'?DEMO_MEMBER_PHONE:DEMO_ADMIN_USER;
 const cols=7,rows=12;let html='';
 for(let r=0;r<rows;r++){for(let c=0;c<cols;c++){
  const jx=(Math.random()-0.5)*6,jy=(Math.random()-0.5)*4;
  const left=((c+0.5)/cols*100+jx).toFixed(2);
  const top=((r+0.5)/rows*100+jy).toFixed(2);
  const rot=(-32+Math.random()*18).toFixed(1);
  html+=`<span style="top:${top}%;left:${left}%;transform:translate(-50%,-50%) rotate(${rot}deg)">${id}</span>`;
 }}
 el.innerHTML=html;el.style.display='block';
}
function isLogged(){return state.role==='member'||state.role==='admin'}
function currentUserRecord(){return getUsers().find(u=>u.phone===state.currentPhone)}
function isSupervisor(){const u=currentUserRecord();return state.role==='member'&&!!u&&u.supervisor&&!u.banned}
function isBannedNow(){const u=currentUserRecord();return state.role==='member'&&!!u&&u.banned}
function dirColor(type){return type==='PUT'?'var(--red)':type==='CALL'?'var(--green)':'var(--gold)'}

function header(){
 const badge=alertBadgeCount();
 return `<header class="topbar">
  <div class="topbar-start">
   <div class="lang"><button class="${state.lang==='en'?'active':''}" onclick="setLang('en')">EN</button><button class="${state.lang==='ar'?'active':''}" onclick="setLang('ar')">ع</button></div>
  </div>
  <div class="topbar-search"><span class="sico">⌕</span><input placeholder="${t('search')}" onkeydown="headerSearchKey(event,this.value)"></div>
  <a class="topbar-brand" href="#/"><img class="brand-mark-img" src="brand-icon.png" alt="Saqr Option"></a>
  <div class="topbar-end">
   ${isLogged()?`<button class="btn icon notif-btn" aria-label="alerts" onclick="goAlerts()">🔔<span class="notif-badge ${badge?'':'zero'}">${badge}</span></button>`:''}
   <button class="menu-btn" aria-label="${t('menu')}" onclick="toggleMenu()"><i></i><i></i><i></i></button>
  </div>
 </header>`
}
function alertBadgeCount(){if(state.role==='admin')return getMessages().length+getBanRequests().filter(r=>r.status==='pending').length;if(state.role==='member')return localStorage.getItem('saqr_alerts_seen_'+state.currentPhone)?0:3;return 0}
function goAlerts(){if(isLogged()){go('#/alerts')}else{toast(t('loginError'));go('#/login')}}
function headerSearchKey(e,v){if(e.key!=='Enter')return;if(!isLogged()){toast(t('loginError'));go('#/login');return}headerQuery=v.trim();go('#/contracts');render()}
function sidebar(route){
 let items=[],accountItems=[];
 if(state.role==='admin'){
  items=[['home','/'],['contracts','/contracts'],['users','/admin/users'],['supervisors','/admin/supervisors']];
  accountItems=[['contact','/admin/contact'],['logout','#/logout']];
 }else if(state.role==='member'&&isSupervisor()){
  items=[['home','/'],['contracts','/contracts'],['favorites','/favorites'],['alerts','/alerts'],['manage','/manage-users']];
  accountItems=[['contact','/contact'],['logout','#/logout']];
 }else if(state.role==='member'){
  items=[['home','/'],['contracts','/contracts'],['favorites','/favorites'],['alerts','/alerts']];
  accountItems=[['contact','/contact'],['logout','#/logout']];
 }else{
  items=[['home','/']];
  accountItems=[['subscription','#/subscription'],['contact','/contact']];
 }
 const draw=([k,r])=>k==='logout'?`<a class="nav" href="#/logout" onclick="logout();return false;"><span class="ico">${icon(k)}</span><span>${t('logout')}</span></a>`:`<a class="nav ${route===r?'active':''}" href="${r.startsWith('#')?r:'#'+r}"><span class="ico">${icon(k)}</span><span>${t(k)}</span></a>`;
 return `<aside class="sidebar">${items.map(draw).join('')}<div class="nav-divider"></div>${accountItems.map(draw).join('')}</aside>`
}
function layout(content,route,withSidebar=true){
 document.documentElement.lang=state.lang;document.documentElement.dir=state.lang==='ar'?'rtl':'ltr';
 app.innerHTML=header()+`<div class="shell ${withSidebar?'has-sidebar':''}">${withSidebar?sidebar(route):''}<main class="main">${content}<footer class="footer"><div class="disclaimer-note"><b class="goldtxt">${state.lang==='ar'?'للتنويه :':'Note:'}</b> <span>${state.lang==='ar'?'منصة صقر أوبشن منصة تدريبية وتعليمية تهدف إلى تطوير مهارات فهم وتحليل عقود الخيارات، ولا تُعد توصيات مالية أو استثمارية. جميع الأمثلة والبيانات المعروضة لأغراض التدريب والتعلّم فقط، وأي قرار تداول أو استثمار تتخذه هو مسؤوليتك الشخصية.':'Saqr Option is a training and educational platform aimed at developing skills to understand and analyze options contracts, and is not financial or investment advice. All examples and data shown are for training and learning purposes only, and any trading or investment decision you make is your own responsibility.'}</span></div><div class="footer-bottom">SAQR OPTION © 2026 — ${t('demo')}${isLogged()&&state.role==='admin'?` <button type="button" class="footer-logout" onclick="logout()">${t('logout')}</button>`:''}</div></footer></main></div><div class="mobile-panel" id="mobilePanel"></div><div class="modal-overlay" id="modalRoot"></div><div class="toast" id="toast"></div>`;
 updateWatermark();
}
function setLang(l){state.lang=l;save();render()}
function toggleMenu(){const p=document.getElementById('mobilePanel');if(!p)return;const opening=!p.classList.contains('open');p.classList.toggle('open',opening);if(!opening){p.innerHTML='';return}let links=`<a href="#/" onclick="closeMenu();go('#/');return false;">${t('home')}</a>`;if(isLogged())links+=`<a href="#/contracts" onclick="closeMenu()">${t('contracts')}</a>`;if(state.role==='member'&&isSupervisor()){links+=`<a href="#/favorites" onclick="closeMenu()">${t('favorites')}</a><a href="#/alerts" onclick="closeMenu()">${t('alerts')}</a><a href="#/manage-users" onclick="closeMenu()">${t('manage')}</a><a href="#/contact" onclick="closeMenu()">${t('contact')}</a>`}else if(state.role==='member'){links+=`<a href="#/favorites" onclick="closeMenu()">${t('favorites')}</a><a href="#/alerts" onclick="closeMenu()">${t('alerts')}</a><a href="#/contact" onclick="closeMenu()">${t('contact')}</a>`}else if(state.role==='admin')links+=`<a href="#/admin/users" onclick="closeMenu()">${t('users')}</a><a href="#/admin/supervisors" onclick="closeMenu()">${t('supervisors')}</a><a href="#/admin/contact" onclick="closeMenu()">${t('contactInbox')}</a>`;else links+=`<a href="#/subscription" onclick="closeMenu()">${t('subscription')}</a><a href="#/contact" onclick="closeMenu()">${t('contact')}</a>`;p.innerHTML=`<div class="mobile-menu-card"><div class="mobile-menu-head"><b>${t('menu')}</b><button type="button" class="btn icon" onclick="toggleMenu()">×</button></div>${links}${isLogged()?`<a href="#/logout" onclick="logout();return false;">${t('logout')}</a>`:''}</div>`}
function closeMenu(){const p=document.getElementById('mobilePanel');if(p){p.classList.remove('open');p.innerHTML=''}}

function openModal(html){const m=document.getElementById('modalRoot');if(!m)return;m.innerHTML=`<div class="modal-card">${html}</div>`;m.classList.add('open')}
function closeModalUI(){const m=document.getElementById('modalRoot');if(m){m.classList.remove('open');m.innerHTML=''}}
function openForgot(){
 openModal(`<h2>${t('forgot')}</h2><p class="login-help">${state.lang==='ar'?'أدخل رقم الجوال والبريد الإلكتروني المسجلين لإرسال رمز التحقق.':'Enter your registered mobile number and email to receive a verification code.'}</p><div class="field"><label>${t('phone')}</label><input id="resetPhone" inputmode="numeric" placeholder="05xxxxxxxx"></div><div class="field"><label>Email</label><input id="resetEmail" type="email" placeholder="name@email.com"></div><button class="btn primary full" onclick="sendResetCode()">${t('send')}</button><button type="button" class="btn full" style="margin-top:8px" onclick="closeModalUI()">${t('cancel')}</button>`)
}
function sendResetCode(){
 const phone=document.getElementById('resetPhone')?.value.trim(),email=document.getElementById('resetEmail')?.value.trim().toLowerCase();
 if(!phone||!email){toast(t('noData'));return}
 if(phone!==RESET_DEMO_PHONE||email!==RESET_DEMO_EMAIL){toast(state.lang==='ar'?'رقم الجوال او الايميل غير صحيح':'Mobile number or email is incorrect');return}
 toast(`${state.lang==='ar'?'تم إرسال رمز التحقق (تجريبي): ':'Demo verification code sent: '}${RESET_DEMO_CODE}`);
 openVerifyCode();
}
function openVerifyCode(){
 openModal(`<h2>${state.lang==='ar'?'رمز التحقق':'Verification code'}</h2><p class="login-help">${state.lang==='ar'?'أدخل الرمز المرسل لإتمام العملية.':'Enter the code we sent to continue.'}</p><div class="field"><label>${state.lang==='ar'?'رمز التحقق':'Verification code'}</label><input id="resetCode" inputmode="numeric" placeholder="••••••"></div><button class="btn primary full" onclick="verifyResetCode()">${state.lang==='ar'?'تأكيد':'Verify'}</button><button type="button" class="btn full" style="margin-top:8px" onclick="closeModalUI()">${t('cancel')}</button>`)
}
function verifyResetCode(){
 const code=document.getElementById('resetCode')?.value.trim();
 if(code!==RESET_DEMO_CODE){toast(t('loginError'));return}
 openNewPassword();
}
function passwordChecks(p){return {letters:(p.match(/[A-Za-z]/g)||[]).length>=5,upper:/[A-Z]/.test(p),symbol:/[^A-Za-z0-9]/.test(p),digits:(p.match(/[0-9]/g)||[]).length>=3}}
function pwLine(ok,label){return `<div class="pw-check ${ok?'ok':''}"><span class="pw-check-ico">${ok?'✓':'•'}</span>${label}</div>`}
function renderPwChecklist(p,p2){
 const c=passwordChecks(p);
 const mismatch=p2.length>0&&p!==p2;
 return pwLine(c.letters, state.lang==='ar'?'٥ أحرف إنجليزية على الأقل':'At least 5 English letters')+
  pwLine(c.upper, state.lang==='ar'?'حرف كبير واحد على الأقل (A-Z)':'At least one uppercase letter')+
  pwLine(c.symbol, state.lang==='ar'?'رمز واحد على الأقل (!@#$...)':'At least one symbol')+
  pwLine(c.digits, state.lang==='ar'?'٣ أرقام على الأقل':'At least 3 digits')+
  (mismatch?`<div class="pw-mismatch">${state.lang==='ar'?'كلمة المرور غير متطابقة':'Passwords do not match'}</div>`:'')
}
function openNewPassword(){
 openModal(`<h2>${state.lang==='ar'?'كلمة مرور جديدة':'New password'}</h2><div class="field"><label>${t('password')}</label>${pwFieldHtml('newPw','',"updatePwChecklist()")}</div><div class="field"><label>${state.lang==='ar'?'تأكيد كلمة المرور':'Confirm password'}</label>${pwFieldHtml('newPw2','',"updatePwChecklist()")}</div><div id="pwChecklist" class="pw-checklist">${renderPwChecklist('','')}</div><button class="btn primary full" id="pwSubmitBtn" disabled onclick="submitNewPassword()">${t('save')}</button>`);
}
function updatePwChecklist(){
 const p=document.getElementById('newPw')?.value||'',p2=document.getElementById('newPw2')?.value||'';
 const box=document.getElementById('pwChecklist');if(box)box.innerHTML=renderPwChecklist(p,p2);
 const c=passwordChecks(p);const allOk=Object.values(c).every(Boolean)&&!!p&&p===p2;
 const btn=document.getElementById('pwSubmitBtn');if(btn)btn.disabled=!allOk;
}
function submitNewPassword(){
 const p=document.getElementById('newPw')?.value||'';
 const users=getUsers();const u=users.find(x=>x.phone===RESET_DEMO_PHONE);
 if(u){u.password=p;setUsers(users)}
 toast(state.lang==='ar'?'تم تغيير كلمة المرور بنجاح ✓':'Password changed successfully ✓');
 closeModalUI();loginMode='member';render();
}

function publicHome(){
 return `<section class="card hero public-hero"><img class="hero-falcon" src="brand-logo-full.png" alt="Saqr Option"><div class="hero-copy"><p>${t('training')}</p><div class="pills"><span class="pill">⚡ ${t('live')}</span><span class="pill">🔔 ${t('instant')}</span><span class="pill">📊 ${t('analytics')}</span></div><div class="hero-actions"><button class="btn primary" onclick="go('#/login')">${t('start')}</button><button class="btn gold" onclick="go('#/subscription')">${t('subscribe')}</button></div></div></section><div class="section-title"><h2>${t('features')}</h2></div><div class="grid cols-3 feature-grid"><div class="card feature"><h2>⚡ ${t('live')}</h2><p>${state.lang==='ar'?'متابعة منظمة لعقود الخيارات والبيانات المتاحة في الواجهة.':'Organized options contract tracking in the interface.'}</p></div><div class="card feature"><h2>🔔 ${t('instant')}</h2><p>${state.lang==='ar'?'تنبيهات واضحة عند تحقق المستويات المحددة.':'Clear alerts when configured levels are reached.'}</p></div><div class="card feature"><h2>📊 ${t('analytics')}</h2><p>${state.lang==='ar'?'عرض تحليلي مرتب لمساعدة المشترك على قراءة بيانات العقد.':'Structured analytics to help subscribers read contract data.'}</p></div></div>${publicReviewsSection()}`
}
function memberHome(){
 const u=currentUserRecord()||{plan:t('pending'),status:'none',expires:'—'};
 const isActive=!u.banned&&u.status==='active';
 const status=u.banned?t('banned'):isActive?t('active'):t('pending');
 const statusClass=u.banned?'red':isActive?'green':'goldtxt';
 const left=daysLeft(u.expires);
 const total=u.plan===t('oneMonth')?30:u.plan===t('threeMonths')?90:u.plan===t('sixMonths')?180:0;
 const pct=total&&isActive?Math.max(0,Math.min(100,Math.round((left/total)*100))):0;
 const ratingBanner=shouldPromptRating(u)?`<a class="card rating-banner" href="#/ratings"><span>⭐ ${state.lang==='ar'?'نسعد بتقييم الخدمة المقدمة إليكم':'We would love your feedback'}</span><span>›</span></a>`:'';
 const discountBanner=u.discountCode?`<div class="card discount-banner"><b>🎁 ${state.lang==='ar'?`عزيزي أشتراكك قارب على النهاية ونسعد بتجديد الاشتراك عبر كود الخصم (${u.discountCode}) ونسعد بتجديد ثقتكم لدينا.`:`Dear subscriber, your plan is about to end — renew with discount code (${u.discountCode}).`}</b></div>`:'';
 const extendedNote=u.extendedByAdmin?`<div class="extended-note">${state.lang==='ar'?'تم تمديده من قبل صاحب الصلاحية':'Extended by an administrator'}</div>`:'';
 return `<div class="section-title"><h2>${t('home')}</h2><span class="badge green">${t('member')}</span></div>
 ${ratingBanner}${discountBanner}
 <div class="card sub-status-card">
  ${extendedNote}
  <div class="sub-status-head">
   <div class="sub-status-badge ${statusClass}">${isActive?'✓':u.banned?'⛔':'•'}</div>
   <div><div class="sub-status-title">${status}</div><div class="sub-status-sub">${u.plan}</div></div>
  </div>
  ${isActive?`<div class="sub-progress"><div class="sub-progress-bar" style="width:${pct}%"></div></div><div class="sub-progress-label">${left>0?`${left} ${t('days')} — ${t('expires')} ${u.expires}`:t('expired')}</div>`:`<p class="sub-empty-note">${u.banned?'':t('noSubscription')}</p>`}
  <div class="sub-status-actions">${isActive?`<button class="btn" onclick="go('#/contracts')">${t('contracts')}</button><button class="btn primary" onclick="openRenew()">${t('extend')}</button>`:`<button class="btn primary" onclick="go('#/subscription')">${t('subscribe')}</button>`}<button class="btn" onclick="go('#/favorites')">${t('favorites')}</button></div>
 </div>
 <div class="grid cols-3 sub-mini-grid">
  <div class="card stat"><div class="label">${t('plan')}</div><div class="num">${u.plan}</div></div>
  <div class="card stat"><div class="label">${t('status')}</div><div class="num ${statusClass}">${status}</div></div>
  <div class="card stat"><div class="label">${t('expires')}</div><div class="num">${u.expires}</div></div>
 </div>
 ${trainingCalculator()}
 <a class="card rating-banner static" href="#/ratings"><span>⭐ ${state.lang==='ar'?'نسعد بتقييم الخدمة المقدمة إليكم':'We would love your feedback'}</span><span>›</span></a>`
}
function bannedScreen(){
 return `<div class="card banned-screen"><div class="banned-icon">⛔</div><h1>${state.lang==='ar'?'تم حظر حسابك':'Account banned'}</h1><p>${state.lang==='ar'?'لقد تمت مخالفة الشروط والأحكام وتم حظر حسابكم':'You have violated the terms and conditions and your account has been banned'}</p><button class="btn primary" onclick="go('#/contact')">${t('contact')}</button></div>`
}
function supervisorPanel(){
 return `<div class="section-title"><h2>${t('permissionTitle')}</h2></div><div class="card permission-note"><p>${t('supervisorInfo')}</p></div><div class="toolbar"><div class="search"><span class="sico">⌕</span><input id="supSearch" inputmode="numeric" oninput="renderSupResult(this.value)" placeholder="${t('permissionSearch')}"></div></div><div id="supResult">${supResultHtml('')}</div>`
}
function supResultHtml(q){
 q=(q||'').trim();
 if(!q)return '';
 const u=getUsers().find(x=>x.phone===q);
 if(!u)return `<div class="card empty"><h2>${t('noData')}</h2></div>`;
 return `<div class="card"><div class="phone-cell" style="font-size:20px;margin-bottom:10px">${u.phone}</div>${u.banned?`<span class="badge red">${t('banned')}</span>`:`<button class="btn danger" onclick="openBanRequest('${u.phone}')">${t('ban')}</button>`}</div>`
}
function renderSupResult(q){const el=document.getElementById('supResult');if(el)el.innerHTML=supResultHtml(q)}
function openBanRequest(targetPhone){
 openModal(`<h2>${t('ban')}</h2><p class="login-help">${state.lang==='ar'?'السبب: التقاط الشاشة (ثابت) — إرفاق إثبات إلزامي، ولا يتم الحظر إلا بعد موافقة الإدارة.':'Reason: screen capture (fixed) — proof is mandatory and the ban only takes effect after admin approval.'}</p><div class="field"><label>${t('proof')} *</label><input id="banProofFile" type="file" accept="image/*"></div><button class="btn primary full" onclick="submitBanRequest('${targetPhone}')">${state.lang==='ar'?'إرسال طلب الحظر':'Submit ban request'}</button><button type="button" class="btn full" style="margin-top:8px" onclick="closeModalUI()">${t('cancel')}</button>`);
}
function submitBanRequest(targetPhone){
 const file=document.getElementById('banProofFile')?.files?.[0];
 if(!file){toast(t('noProof'));return}
 const reader=new FileReader();
 reader.onload=()=>{
  const reqs=getBanRequests();
  reqs.unshift({id:Date.now().toString(),supervisorPhone:state.currentPhone,targetPhone,reason:state.lang==='ar'?'التقاط الشاشة':'Screen capture',proof:reader.result,date:new Date().toLocaleString('ar-SA'),status:'pending'});
  setBanRequests(reqs);
  logActivity(`${state.lang==='ar'?'طلب حظر جديد من المشرف':'New ban request from supervisor'} ${state.currentPhone} ← ${targetPhone}`);
  toast(state.lang==='ar'?'تم إرسال طلب الحظر لمراجعة الإدارة ✓':'Ban request sent for admin review ✓');
  closeModalUI();render();
 };
 reader.readAsDataURL(file);
}
function banRequestsGrid(){
 const reqs=getBanRequests().filter(r=>r.status==='pending');
 if(!reqs.length)return `<div class="card empty"><h2>${t('noData')}</h2></div>`;
 return `<div class="grid cols-2">${reqs.map(r=>`<div class="card alert-card" onclick="openBanRequestDetail('${r.id}')"><div class="alert-title">⛔ <b class="phone-cell">${r.targetPhone}</b></div><p>${state.lang==='ar'?'المشرف':'Supervisor'}: <span class="phone-cell">${r.supervisorPhone}</span></p><p>${state.lang==='ar'?'السبب':'Reason'}: ${r.reason}</p><span class="badge gold">${state.lang==='ar'?'بانتظار المراجعة':'Pending review'}</span></div>`).join('')}</div>`
}
function openBanRequestDetail(id){
 const r=getBanRequests().find(x=>x.id===id);if(!r)return;
 openModal(`<h2>${state.lang==='ar'?'طلب حظر':'Ban request'}</h2><p>${state.lang==='ar'?'المشترك':'Subscriber'}: <b class="phone-cell">${r.targetPhone}</b></p><p>${state.lang==='ar'?'المشرف':'Supervisor'}: <b class="phone-cell">${r.supervisorPhone}</b></p><p>${state.lang==='ar'?'السبب':'Reason'}: ${r.reason}</p><img src="${r.proof}" style="width:100%;border-radius:14px;margin:12px 0;border:1px solid var(--line)"><div style="display:flex;gap:10px;margin-top:6px"><button class="btn primary full" onclick="resolveBanRequest('${r.id}',true)">${state.lang==='ar'?'اعتماد الحظر':'Approve ban'}</button><button class="btn full danger" onclick="resolveBanRequest('${r.id}',false)">${state.lang==='ar'?'رفض':'Reject'}</button></div>`);
}
function resolveBanRequest(id,approve){
 const reqs=getBanRequests();const r=reqs.find(x=>x.id===id);if(!r)return;
 r.status=approve?'approved':'rejected';setBanRequests(reqs);
 if(approve){const users=getUsers();const u=users.find(x=>x.phone===r.targetPhone);if(u){u.banned=true;u.reason=r.reason;setUsers(users)}}
 toast(approve?(state.lang==='ar'?'تم اعتماد الحظر ✓':'Ban approved ✓'):(state.lang==='ar'?'تم رفض الطلب':'Request rejected'));
 closeModalUI();render();
}
function statLink(label,num,cls,filter){return `<div class="card stat stat-link" onclick="goUserFilter('${filter}')"><div class="label">${label}</div><div class="num ${cls}">${num}</div></div>`}

function publicReviewsSection(){
 const approved=getReviews().filter(r=>r.approved);
 if(!approved.length)return '';
 return `<div class="section-title"><h2>${state.lang==='ar'?'آراء المشتركين':'Subscriber reviews'}</h2></div><div class="grid cols-3 feature-grid">${approved.map(r=>`<div class="card review-card"><div class="review-title">${state.lang==='ar'?'رسالة مُشترك':'Subscriber message'}</div><p>${escapeHtml(r.message)}</p></div>`).join('')}</div>`
}
function shouldPromptRating(u){return u&&!u.banned&&u.status==='active'&&daysLeft(u.expires)<=2&&daysLeft(u.expires)>=0&&!getReviews().some(r=>r.phone===u.phone)}
let ratingDraft={ease:0,benefit:0,message:''};
function starsRow(field,value){let html='';for(let i=1;i<=5;i++){html+=`<span class="star-pick ${i<=value?'on':''}" onclick="setRatingStar('${field}',${i})">★</span>`}return `<div class="stars-row">${html}</div>`}
function setRatingStar(field,v){ratingDraft[field]=v;render()}
function ratingPage(){
 return `<div class="section-title"><h2>${state.lang==='ar'?'نسعد بتقييم الخدمة المقدمة إليكم':'We would love your feedback'}</h2></div>
 <div class="card form-card rating-card">
  <div class="field"><label>${state.lang==='ar'?'سهولة الانتقال بالموقع':'Ease of navigating the site'}</label>${starsRow('ease',ratingDraft.ease)}</div>
  <div class="field"><label>${state.lang==='ar'?'فائدتك من التدريب (في حال الالتزام)':'Value of the training (if followed consistently)'}</label>${starsRow('benefit',ratingDraft.benefit)}</div>
  <div class="field"><label>${state.lang==='ar'?'أترك لنا رسالتك':'Leave us your message'}</label><textarea id="ratingMsg" oninput="ratingDraft.message=this.value">${escapeHtml(ratingDraft.message)}</textarea></div>
  <button class="btn primary full" onclick="submitRating()">${t('send')}</button>
 </div>`
}
function submitRating(){
 const msg=document.getElementById('ratingMsg')?.value.trim()||'';
 if(!ratingDraft.ease||!ratingDraft.benefit||!msg){toast(t('noData'));return}
 const reviews=getReviews();
 reviews.unshift({id:Date.now().toString(),phone:state.currentPhone,ease:ratingDraft.ease,benefit:ratingDraft.benefit,message:msg,approved:false,date:new Date().toLocaleString('ar-SA')});
 setReviews(reviews);
 logActivity(`${state.lang==='ar'?'تقييم مشترك جديد':'New subscriber review'}: ${state.currentPhone}`);
 ratingDraft={ease:0,benefit:0,message:''};
 toast(state.lang==='ar'?'شكرًا لتقييمك ✓':'Thanks for your feedback ✓');
 go('#/');
}
function reviewsGrid(){
 const reviews=getReviews();
 if(!reviews.length)return `<div class="card empty"><h2>${t('noData')}</h2></div>`;
 return `<div class="grid cols-2">${reviews.map(r=>`<div class="card"><div class="phone-cell">${r.phone}</div><p>${'★'.repeat(r.ease)}${'☆'.repeat(5-r.ease)} — ${state.lang==='ar'?'سهولة الموقع':'Ease'}</p><p>${'★'.repeat(r.benefit)}${'☆'.repeat(5-r.benefit)} — ${state.lang==='ar'?'الفائدة':'Benefit'}</p><p>${escapeHtml(r.message)}</p><span class="badge ${r.approved?'green':'gold'}">${r.approved?(state.lang==='ar'?'منشور':'Published'):(state.lang==='ar'?'بانتظار المراجعة':'Pending review')}</span><div class="actions" style="margin-top:10px">${r.approved?`<button class="btn small" onclick="toggleReviewApproval('${r.id}',false)">${state.lang==='ar'?'إلغاء النشر':'Unpublish'}</button>`:`<button class="btn small primary" onclick="toggleReviewApproval('${r.id}',true)">${state.lang==='ar'?'اعتماد ونشر':'Approve & publish'}</button>`}</div></div>`).join('')}</div>`
}
function toggleReviewApproval(id,approve){const reviews=getReviews();const r=reviews.find(x=>x.id===id);if(!r)return;r.approved=approve;setReviews(reviews);toast(approve?(state.lang==='ar'?'تم النشر ✓':'Published ✓'):(state.lang==='ar'?'تم إلغاء النشر':'Unpublished'));render()}

function grantDiscountCode(phone){
 const code=prompt(state.lang==='ar'?'أدخل كود الخصم (مثال: F77)':'Enter discount code (e.g. F77)');
 if(!code)return;
 const users=getUsers();const u=users.find(x=>x.phone===phone);if(!u)return;
 u.discountCode=code.trim().toUpperCase();setUsers(users);
 logActivity(`${state.lang==='ar'?'تم منح كود خصم':'Discount code granted'} ${u.discountCode} ← ${phone}`);
 toast(state.lang==='ar'?'تم إرسال كود الخصم للمشترك ✓':'Discount code sent to subscriber ✓');
 render();
}

let renewDraft={plan:null,discount:null,codeText:'',payMethod:'',cardNum:'',cardExp:'',cardCvv:''};
function openRenew(){const u=currentUserRecord();if(!u)return;renewDraft={plan:u.plan&&u.plan!==t('pending')?u.plan:t('oneMonth'),discount:null,codeText:'',payMethod:'',cardNum:'',cardExp:'',cardCvv:''};openModal(renewHtml())}
function renewHtml(){
 const priceMap={};priceMap[t('oneMonth')]=99;priceMap[t('threeMonths')]=229;priceMap[t('sixMonths')]=499;
 const plans=[t('oneMonth'),t('threeMonths'),t('sixMonths')];
 const base=priceMap[renewDraft.plan]||99;
 const final=renewDraft.discount?(renewDraft.discount.free?0:Math.round(base*(1-renewDraft.discount.percent/100))):base;
 const freeCode=renewDraft.discount&&renewDraft.discount.free;
 return `<h2>${t('extend')}</h2>
 <div class="field"><label>${t('plan')}</label><select id="renewPlan" onchange="renewDraft.plan=this.value;updateRenewModal()">${plans.map(p=>`<option value="${p}" ${renewDraft.plan===p?'selected':''}>${p}</option>`).join('')}</select></div>
 <div class="field"><label>${state.lang==='ar'?'كود الخصم (اختياري)':'Discount code (optional)'}</label><div style="display:flex;gap:8px"><input id="renewCode" value="${escapeHtml(renewDraft.codeText)}" oninput="renewDraft.codeText=this.value" placeholder="${state.lang==='ar'?'أدخل الكود':'Enter code'}" style="flex:1"><button type="button" class="btn" onclick="applyRenewCode()">${state.lang==='ar'?'تطبيق الكود':'Apply code'}</button></div></div>
 <div class="renew-price">${renewDraft.discount?`<span class="strike">${base} ${t('sar')}</span> `:''}<b>${final} ${t('sar')}</b></div>
 ${freeCode?'':`<div class="section-title" style="margin-top:20px"><h2 style="font-size:16px">${state.lang==='ar'?'طريقة الدفع':'Payment method'}</h2></div><div class="pay-methods"><button type="button" class="pay-method ${renewDraft.payMethod==='card'?'active':''}" onclick="selectRenewPayMethod('card')">💳 ${state.lang==='ar'?'بطاقة مصرفية':'Bank card'}</button><button type="button" class="pay-method ${renewDraft.payMethod==='apple'?'active':''}" onclick="selectRenewPayMethod('apple')">${applePayLogo()}</button></div><div>${renewPayFieldsHtml()}</div>`}
 <button class="btn primary full" style="margin-top:14px" onclick="confirmRenew()">${t('save')}</button>`
}
function renewPayFieldsHtml(){
 if(renewDraft.payMethod==='card')return `<div class="field"><label>${state.lang==='ar'?'رقم البطاقة':'Card number'}</label><input value="${escapeHtml(renewDraft.cardNum)}" inputmode="numeric" oninput="renewDraft.cardNum=this.value" placeholder="4111 1111 1111 1111"></div><div class="grid cols-2"><div class="field"><label>${state.lang==='ar'?'تاريخ الانتهاء':'Expiry'}</label><input value="${escapeHtml(renewDraft.cardExp)}" oninput="renewDraft.cardExp=this.value" placeholder="MM/YY"></div><div class="field"><label>CVV</label><input value="${escapeHtml(renewDraft.cardCvv)}" inputmode="numeric" oninput="renewDraft.cardCvv=this.value" placeholder="123"></div></div>`;
 if(renewDraft.payMethod==='apple')return `<div class="apple-pay-btn">${applePayLogo()}</div>`;
 return '';
}
function selectRenewPayMethod(m){renewDraft.payMethod=m;updateRenewModal()}
function updateRenewModal(){openModal(renewHtml())}
function applyRenewCode(){const d=findDiscountCode(renewDraft.codeText);if(!d){showErrorModal(state.lang==='ar'?'كود الخصم غير صالح':'Invalid discount code');return}renewDraft.discount=d;updateRenewModal()}
function confirmRenew(){
 const cu=currentUserRecord();if(!cu)return;
 const users=getUsers();const rec=users.find(x=>x.phone===cu.phone);if(!rec)return;
 const freeCode=renewDraft.discount&&renewDraft.discount.free;
 if(!freeCode){
  let payOk=false;
  if(renewDraft.payMethod==='card')payOk=!!renewDraft.cardNum.trim()&&!!renewDraft.cardExp.trim()&&!!renewDraft.cardCvv.trim();
  else if(renewDraft.payMethod==='apple')payOk=true;
  if(!payOk){showErrorModal(state.lang==='ar'?'يرجى اختيار طريقة الدفع وتعبئة بياناتها لإتمام التجديد.':'Please choose a payment method and fill in its details to complete the renewal.',state.lang==='ar'?'بيانات الدفع غير مكتملة':'Payment details incomplete');return}
 }
 if(freeCode){
  rec.plan=t('sixMonths');
  const base=(rec.expires&&rec.expires!=='—'&&new Date(rec.expires)>new Date())?new Date(rec.expires):new Date();
  base.setDate(base.getDate()+180);rec.expires=base.toISOString().slice(0,10);rec.status='active';rec.banned=false;rec.discountCode='';rec.extendedByAdmin=false;
  setUsers(users);toast(state.lang==='ar'?'تم تفعيل الاشتراك لمدة 6 أشهر ✓':'6-month subscription activated ✓');closeModalUI();render();return;
 }
 rec.plan=renewDraft.plan;
 const days=renewDraft.plan===t('oneMonth')?30:renewDraft.plan===t('threeMonths')?90:180;
 const base=(rec.expires&&rec.expires!=='—'&&new Date(rec.expires)>new Date())?new Date(rec.expires):new Date();
 base.setDate(base.getDate()+days);rec.expires=base.toISOString().slice(0,10);rec.status='active';rec.banned=false;rec.discountCode='';rec.extendedByAdmin=false;
 setUsers(users);toast(state.lang==='ar'?'تم تجديد الاشتراك ✓':'Subscription renewed ✓');closeModalUI();render();
}

function getCalcRows(phone){try{return JSON.parse(localStorage.getItem('saqr_calc_'+phone))||[{entry:'',exit:''}]}catch{return [{entry:'',exit:''}]}}
function setCalcRows(phone,rows){localStorage.setItem('saqr_calc_'+phone,JSON.stringify(rows))}
const USD_TO_SAR=3.75;
function trainingCalculator(){
 const rows=getCalcRows(state.currentPhone);
 return `<div class="section-title"><h2>${state.lang==='ar'?'حاسبة التدريب':'Training calculator'}</h2></div>
 <div class="card calc-card"><div class="calc-header"><span>${state.lang==='ar'?'سعر الدخول':'Entry price'}</span><span>${state.lang==='ar'?'سعر الخروج':'Exit price'}</span><span></span></div><div class="calc-rows" id="calcRows">${rows.map((r,i)=>calcRowHtml(r,i)).join('')}</div></div>
 <div class="grid cols-3 sub-mini-grid" id="calcSummary">${calcSummary(rows)}</div>`
}
function calcRowHtml(r,i){return `<div class="calc-row"><input inputmode="decimal" placeholder="0.00" value="${r.entry}" onchange="updateCalcRow(${i},'entry',this.value)"><input inputmode="decimal" placeholder="0.00" value="${r.exit}" onchange="updateCalcRow(${i},'exit',this.value)"><button type="button" class="btn icon small" onclick="deleteCalcRow(${i})">✕</button></div>`}
function updateCalcRow(i,field,val){const phone=state.currentPhone;const rows=getCalcRows(phone);if(!rows[i])return;rows[i][field]=val;if(rows[i].entry!==''&&rows[i].exit!==''&&i===rows.length-1){rows.push({entry:'',exit:''})}setCalcRows(phone,rows);renderCalcRows()}
function deleteCalcRow(i){const phone=state.currentPhone;const rows=getCalcRows(phone);rows.splice(i,1);if(!rows.length)rows.push({entry:'',exit:''});setCalcRows(phone,rows);renderCalcRows()}
function renderCalcRows(){const phone=state.currentPhone;const rows=getCalcRows(phone);const box=document.getElementById('calcRows');if(box)box.innerHTML=rows.map((r,i)=>calcRowHtml(r,i)).join('');const sbox=document.getElementById('calcSummary');if(sbox)sbox.innerHTML=calcSummary(rows)}
function calcSummary(rows){
 const valid=rows.filter(r=>r.entry!==''&&r.exit!=='');
 const totalEntry=+(valid.reduce((s,r)=>s+(parseFloat(r.entry)||0),0)*100).toFixed(2);
 const totalExit=+(valid.reduce((s,r)=>s+(parseFloat(r.exit)||0),0)*100).toFixed(2);
 const net=+(totalExit-totalEntry).toFixed(2);
 const positive=net>=0;
 const tip=positive?(state.lang==='ar'?'أداء ممتاز، استمر بالالتزام بخطة التداول 👏':'Great performance — keep following your trading plan 👏'):(state.lang==='ar'?'راجع نقاط الدخول والخروج، والالتزام بمهارات التدريب يحسّن نتيجتك القادمة 💪':'Review your entry/exit points — sticking to the training skills will improve your next result 💪');
 const usdSar=v=>`$${v} <span class="sar-conv">← ${(v*USD_TO_SAR).toFixed(2)} ${t('sar')}</span>`;
 return `<div class="card stat"><div class="label">${state.lang==='ar'?'إجمالي سعر الدخول':'Total entry'}</div><div class="num">${usdSar(totalEntry)}</div></div><div class="card stat"><div class="label">${state.lang==='ar'?'إجمالي سعر الخروج':'Total exit'}</div><div class="num">${usdSar(totalExit)}</div></div><div class="card stat calc-net-card ${positive?'pos':'neg'}"><div class="label">${state.lang==='ar'?'الصافي':'Net'}</div><div class="num ${positive?'green':'red'}">${usdSar(net)}</div><div class="calc-tip">${tip}</div></div>`
}

function contractPage(){
 const d=symbols[state.symbol],put=d.type==='PUT';
 return `<div class="ticker">${Object.keys(symbols).map(s=>`<button class="${s===state.symbol?'active':''}" onclick="selectSymbol('${s}')"><span class="fav-star ${state.fav.includes(s)?'on':''}" onclick="event.stopPropagation();toggleFav('${s}')">${state.fav.includes(s)?'★':'☆'}</span>${s}<small>${symbols[s].company}</small></button>`).join('')}</div>`+`<div class="section-title"><h2>${t('contracts')}</h2><span class="badge green">${t('live')}</span></div><div class="grid contract-layout"><section class="card" style="border:0.5px solid ${dirColor(d.type)}"><div class="option-head"><div><div class="symbol"><span class="fav-star inline ${state.fav.includes(state.symbol)?'on':''}" onclick="toggleFav('${state.symbol}')">${state.fav.includes(state.symbol)?'★':'☆'}</span> ${state.symbol}</div><div class="company">${d.company}</div><div class="badges"><span class="badge gold">${t('high')}</span><span class="badge">${t('short')}</span></div></div><button class="option-type ${put?'put':''}">${put?'↘':'↗'} ${put?t('put'):t('call')}</button></div><div class="price-grid"><div class="price current"><div>${t('current')}</div><div class="v red">${d.current}</div><div class="red">↘ -0.27 (-10.19%)</div></div><div class="price entry"><div>${t('entry')}</div><div class="v green">${d.entry}</div></div></div><div class="meta-grid"><div class="meta"><span class="small">${t('remaining')}</span><b>2 ${t('days')}</b></div><div class="meta"><span class="small">${t('level')}</span><b>${d.sub}</b></div><div class="meta"><span class="small">${t('expiry')}</span><b>${d.expiry}</b></div></div><div class="chart"><span class="chart-caption">${state.symbol} — ${d.strike}</span><svg viewBox="0 0 900 280" preserveAspectRatio="none"><polyline fill="none" stroke="${put?'#ff3154':'#00ef9b'}" stroke-width="5" points="0,220 70,205 130,214 180,175 230,185 280,140 340,155 400,122 455,145 500,100 560,130 620,110 680,72 735,98 790,60 850,86 900,45"/></svg></div></section><aside class="side-stack"><div class="card targets"><h2>${t('goals')} 🎯</h2>${d.targets.map((x,i)=>`<div class="target"><span>${state.lang==='ar'?'الهدف':'Target'} ${i+1}</span><b>${x[0]}</b><span class="pct">${x[1]}</span></div>`).join('')}</div><div class="card"><h3>⚡ ${t('level')}</h3><div class="big-value">${d.sub}</div></div><div class="card"><h3>⛔ ${t('stop')}</h3><div class="big-value">${put?'$2.95':'$1.20'}</div><div class="red">-51.0%</div></div><div class="card"><h3>📊 ${t('stats')}</h3><div class="meta"><span>${t('volume')}</span><b>12,450</b></div><div class="meta"><span>${t('open')}</span><b>8,230</b></div><div class="meta"><span>${t('iv')}</span><b>32.4%</b></div></div></aside></div>`
}
function contractContentFor(q){if(!q)return contractPage();const keys=Object.keys(symbols).filter(s=>(s+' '+symbols[s].company).toLowerCase().includes(q.toLowerCase()));if(!keys.length)return `<div class="card empty"><h2>${t('noData')}</h2></div>`;return contractPage();}
function filterContracts(q){const box=document.getElementById('contractContent');if(!box)return;box.innerHTML=contractContentFor(q)}
function contracts(){const initial=headerQuery;headerQuery='';return `<div class="toolbar"><div class="search"><span class="sico">⌕</span><input value="${escapeHtml(initial)}" oninput="filterContracts(this.value)" placeholder="${t('search')}"></div></div><div id="contractContent">${contractContentFor(initial)}</div>`}
function favorites(){return `<div class="section-title"><h2>${t('favorites')}</h2></div><div class="stats">${state.fav.length?state.fav.map(s=>`<div class="card fav-card" style="border:0.5px solid ${dirColor(symbols[s].type)}" onclick="selectSymbol('${s}')"><div class="symbol"><span class="fav-star inline on" onclick="event.stopPropagation();toggleFav('${s}')">★</span> ${s}</div><div class="${symbols[s].type==='CALL'?'green':'red'} big-value">${symbols[s].type==='PUT'?t('put'):t('call')}</div><p class="company">${symbols[s].company}</p></div>`).join(''):`<div class="card empty"><h2>${t('noData')}</h2></div>`}</div>`}
function alertsGrid(){return `<div class="grid cols-2">${[['🎯','CRM','$3.20'],['⚡','NVDA','$175.20'],['⛔','META','$600']].map(a=>`<div class="card alert-card" onclick="selectSymbol('${a[1]}');go('#/contracts')"><div class="alert-title">${a[0]} <b>${a[1]}</b></div><p>${state.lang==='ar'?'تم الوصول إلى المستوى المحدد':'Target level reached'}: <strong class="green">${a[2]}</strong></p><span class="badge green">${t('instant')}</span></div>`).join('')}</div>`}
function alerts(){if(state.currentPhone)localStorage.setItem('saqr_alerts_seen_'+state.currentPhone,'1');return `<div class="section-title"><h2>${t('alerts')}</h2></div>${alertsGrid()}`}
function contactMessagesGrid(){const msgs=getMessages();return `<div class="messages">${msgs.length?msgs.map((m,i)=>`<div class="card message-card"><div class="message-head"><b>${m.subject}</b><span>${m.date}</span></div><div class="phone-cell">${m.phone}</div><p>${escapeHtml(m.message)}</p><button type="button" class="btn small danger" style="margin-top:10px" onclick="deleteMessage(${i})">${state.lang==='ar'?'حذف الرسالة':'Delete message'}</button></div>`).join(''):`<div class="card empty"><h2>${t('noData')}</h2></div>`}</div>`}
function deleteMessage(i){const msgs=getMessages();msgs.splice(i,1);setMessages(msgs);toast(state.lang==='ar'?'تم حذف الرسالة':'Message deleted');render()}
function activityGrid(){
 const items=getActivity();
 if(!items.length)return `<div class="card empty"><h2>${t('noData')}</h2></div>`;
 return `<div class="grid cols-2">${items.map(a=>`<div class="card"><p>${escapeHtml(a.text)}</p><span class="muted" style="font-size:12px">${a.date}</span></div>`).join('')}</div>`
}
let adminAlertsTab='alerts';
function adminAlertsPage(){
 const tabs=[['alerts',t('alerts')],['activity',state.lang==='ar'?'النشاط':'Activity'],['contact',t('contactInbox')],['requests',state.lang==='ar'?'طلبات الحظر':'Ban requests'],['reviews',state.lang==='ar'?'التقييمات':'Reviews']];
 const contentMap={alerts:alertsGrid(),activity:activityGrid(),contact:contactMessagesGrid(),requests:banRequestsGrid(),reviews:reviewsGrid()};
 return `<div class="section-title"><h2>${t('alerts')}</h2></div><div class="role-tabs admin-alert-tabs">${tabs.map(([k,label])=>`<button class="${adminAlertsTab===k?'active':''}" onclick="adminAlertsTab='${k}';render()">${label}</button>`).join('')}</div>${contentMap[adminAlertsTab]}`
}
let checkoutPlan=null;
let checkoutPayMethod='';
let checkoutDiscount=null;
function goCheckout(planName,price){checkoutPlan={planName,price};checkoutPayMethod='';checkoutDiscount=null;go('#/checkout')}
function subscription(){const plans=[[t('oneMonth'),99],[t('threeMonths'),229],[t('sixMonths'),499]];return `<div class="section-title"><h2>${t('subscription')}</h2><span class="badge gold">${t('sameFeatures')}</span></div><div class="grid cols-3 pricing">${plans.map((p)=>`<div class="card price-card"><h2>${p[0]}</h2><div class="price-sar">${p[1]} <small>${t('sar')}</small></div><div class="feature-list"><span>✓ ${t('live')}</span><span>✓ ${t('instant')}</span><span>✓ ${t('analytics')}</span></div><button class="btn primary" onclick="goCheckout('${p[0]}',${p[1]})">${t('subscribe')}</button></div>`).join('')}</div>`}
let checkoutDraft={phone:'',email:'',pw:'',pw2:'',code:''};
function ccUpdate(field,val){checkoutDraft[field]=val}
function checkoutPage(){
 if(!checkoutPlan)return `<div class="card empty"><h2>${t('noData')}</h2></div>`;
 const finalPrice=checkoutDiscount?(checkoutDiscount.free?0:Math.round(checkoutPlan.price*(1-checkoutDiscount.percent/100))):checkoutPlan.price;
 return `<div class="card form-card checkout-card">
  <h1>${state.lang==='ar'?'إتمام الاشتراك':'Complete subscription'}</h1>
  <p class="login-help">${checkoutPlan.planName} — ${checkoutDiscount?`<span class="strike">${checkoutPlan.price} ${t('sar')}</span> `:''}<b>${finalPrice} ${t('sar')}</b></p>
  <div class="field"><label>${t('phone')}</label><input id="coPhone" inputmode="numeric" value="${escapeHtml(checkoutDraft.phone)}" oninput="ccUpdate('phone',this.value)" placeholder="05xxxxxxxx"></div>
  <div class="field"><label>Email</label><input id="coEmail" type="email" value="${escapeHtml(checkoutDraft.email)}" oninput="ccUpdate('email',this.value)" placeholder="name@email.com"></div>
  <div class="field"><label>${t('password')}</label>${pwFieldHtml('coPw',checkoutDraft.pw,"ccUpdate('pw',this.value);updateCoChecklist()")}</div>
  <div class="field"><label>${state.lang==='ar'?'تأكيد كلمة المرور':'Confirm password'}</label>${pwFieldHtml('coPw2',checkoutDraft.pw2,"ccUpdate('pw2',this.value);updateCoChecklist()")}</div>
  <div id="coChecklist" class="pw-checklist">${renderPwChecklist(checkoutDraft.pw,checkoutDraft.pw2)}</div>
  <div class="field"><label>${state.lang==='ar'?'كود الخصم (اختياري)':'Discount code (optional)'}</label><div style="display:flex;gap:8px"><input id="coCode" value="${escapeHtml(checkoutDraft.code)}" oninput="ccUpdate('code',this.value)" placeholder="${state.lang==='ar'?'أدخل الكود':'Enter code'}" style="flex:1"><button type="button" class="btn" onclick="applyCoCode()">${state.lang==='ar'?'تطبيق الكود':'Apply code'}</button></div></div>
  ${checkoutDiscount&&checkoutDiscount.free?'':`<div class="section-title" style="margin-top:24px"><h2 style="font-size:18px">${state.lang==='ar'?'طريقة الدفع':'Payment method'}</h2></div><div class="pay-methods"><button type="button" class="pay-method ${checkoutPayMethod==='card'?'active':''}" onclick="selectPayMethod('card')">💳 ${state.lang==='ar'?'بطاقة مصرفية':'Bank card'}</button><button type="button" class="pay-method ${checkoutPayMethod==='apple'?'active':''}" onclick="selectPayMethod('apple')">${applePayLogo()}</button></div><div id="payFields">${payFieldsHtml()}</div>`}
  <button class="btn primary full" style="margin-top:20px" onclick="completeCheckout()">${state.lang==='ar'?'إتمام الاشتراك':'Complete subscription'}</button>
 </div>`
}
function pwFieldHtml(id,val,oninput){return `<div class="pw-field"><input id="${id}" type="password" value="${escapeHtml(val||'')}" oninput="${oninput}"><button type="button" class="pw-eye" onclick="togglePwVisibility('${id}',this)">👁</button></div>`}
function selectPayMethod(m){checkoutPayMethod=m;render()}
function togglePwVisibility(id,btn){const el=document.getElementById(id);if(!el)return;if(el.type==='password'){el.type='text';btn.classList.add('on')}else{el.type='password';btn.classList.remove('on')}}
function applePayLogo(){return `<span class="apple-pay-mark"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.14.572-2.27 1.207-2.98.804-.94 2.142-1.63 3.157-1.67.02.13.14.28.14.42zm2.988 15.7c-.532 1.17-.79 1.7-1.474 2.72-.955 1.44-2.302 3.24-3.972 3.25-1.487.02-1.87-.97-3.885-.96-2.014.01-2.433.98-3.92.96-1.67-.02-2.945-1.63-3.9-3.07C.29 16.63-.6 12.5 1.4 9.7c1-1.4 2.53-2.24 4.05-2.24 1.53 0 2.49.99 3.75.99 1.22 0 1.98-.99 3.85-.99 1.35 0 2.78.74 3.8 2.02-3.34 1.83-2.8 6.6.5 7.65z"/></svg>${state.lang==='ar'?'الدفع عبر':''} Pay</span>`}
function payFieldsHtml(){
 if(checkoutPayMethod==='card')return `<div class="field"><label>${state.lang==='ar'?'رقم البطاقة':'Card number'}</label><input id="cardNum" inputmode="numeric" value="${escapeHtml(checkoutDraft.cardNum||'')}" oninput="checkoutDraft.cardNum=this.value" placeholder="4111 1111 1111 1111"></div><div class="grid cols-2"><div class="field"><label>${state.lang==='ar'?'تاريخ الانتهاء':'Expiry'}</label><input id="cardExp" value="${escapeHtml(checkoutDraft.cardExp||'')}" oninput="checkoutDraft.cardExp=this.value" placeholder="MM/YY"></div><div class="field"><label>CVV</label><input id="cardCvv" inputmode="numeric" value="${escapeHtml(checkoutDraft.cardCvv||'')}" oninput="checkoutDraft.cardCvv=this.value" placeholder="123"></div></div>`;
 if(checkoutPayMethod==='apple')return `<div class="apple-pay-btn">${applePayLogo()}</div>`;
 return '';
}
function updateCoChecklist(){const box=document.getElementById('coChecklist');if(box)box.innerHTML=renderPwChecklist(checkoutDraft.pw,checkoutDraft.pw2)}
function applyCoCode(){const d=findDiscountCode(checkoutDraft.code);if(!d){showErrorModal(state.lang==='ar'?'كود الخصم غير صالح':'Invalid discount code');return}checkoutDiscount=d;render()}
function completeCheckout(){
 const phone=checkoutDraft.phone.trim();
 const email=checkoutDraft.email.trim();
 const p=checkoutDraft.pw;
 const p2=checkoutDraft.pw2;
 const c=passwordChecks(p);
 const pwOk=Object.values(c).every(Boolean)&&!!p&&p===p2;
 const validPhone=/^05\d{8}$/.test(phone);
 const validEmail=/^\S+@\S+\.\S+$/.test(email);
 const freeCode=checkoutDiscount&&checkoutDiscount.free;
 let payOk=freeCode;
 if(!freeCode){
  if(checkoutPayMethod==='card')payOk=!!(checkoutDraft.cardNum||'').trim()&&!!(checkoutDraft.cardExp||'').trim()&&!!(checkoutDraft.cardCvv||'').trim();
  else if(checkoutPayMethod==='apple')payOk=true;
 }
 if(!validPhone){showErrorModal(state.lang==='ar'?'رقم الجوال يجب أن يتكون من 10 أرقام ويبدأ بـ 05':'Mobile number must be 10 digits starting with 05',state.lang==='ar'?'رقم جوال غير صحيح':'Invalid mobile number');return}
 if(!validEmail){showErrorModal(state.lang==='ar'?'يرجى إدخال بريد إلكتروني صحيح':'Please enter a valid email address',state.lang==='ar'?'بريد إلكتروني غير صحيح':'Invalid email');return}
 const users=getUsers();
 const emailTaken=email&&users.some(x=>x.email&&x.email.toLowerCase()===email.toLowerCase()&&x.phone!==phone);
 if(emailTaken){showErrorModal(state.lang==='ar'?'هذا البريد الإلكتروني مستخدم من قبل مشترك آخر':'This email is already used by another subscriber',state.lang==='ar'?'البريد مستخدم':'Email already in use');return}
 if(!pwOk||!payOk){showInvalidCheckoutModal();return}
 let u=users.find(x=>x.phone===phone);
 const planName=freeCode?t('sixMonths'):checkoutPlan.planName;
 const days=planName===t('oneMonth')?30:planName===t('threeMonths')?90:180;
 const expires=plusDays(days);
 if(u){u.password=p;u.email=email;u.plan=planName;u.status='active';u.banned=false;u.expires=expires;}
 else{u={phone,email,password:p,plan:planName,status:'active',start:plusDays(0),expires,supervisor:false,banned:false,reason:'',flagged:false,discountCode:'',ratingPromptSent:false};users.push(u)}
 setUsers(users);
 logActivity(`${state.lang==='ar'?'اشتراك جديد':'New subscription'}: ${phone} — ${planName}`);
 checkoutDraft={phone:'',email:'',pw:'',pw2:'',code:''};
 showCheckoutSuccess();
}
function showErrorModal(msg,title){openModal(`<div class="modal-alert"><div class="modal-alert-icon">⚠️</div><h2>${title||(state.lang==='ar'?'تنبيه':'Notice')}</h2><p>${msg}</p><button class="btn primary full" onclick="closeModalUI()">${state.lang==='ar'?'موافق':'OK'}</button></div>`)}
function showInvalidCheckoutModal(){openModal(`<div class="modal-alert"><div class="modal-alert-icon">⚠️</div><h2>${state.lang==='ar'?'بيانات الاشتراك غير صحيحة':'Subscription details are invalid'}</h2><p>${state.lang==='ar'?'يرجى التأكد من رقم الجوال والإيميل وكلمة المرور وطريقة الدفع.':'Please check the mobile number, email, password, and payment method.'}</p><button class="btn primary full" onclick="closeModalUI()">${state.lang==='ar'?'موافق':'OK'}</button></div>`)}
function showCheckoutSuccess(){openModal(`<div class="modal-alert success"><div class="modal-alert-icon">✓</div><h2>${state.lang==='ar'?'تم الاشتراك بنجاح':'Subscription successful'}</h2><button class="btn primary full" onclick="closeModalUI();checkoutPlan=null;go('#/login')">${state.lang==='ar'?'حسنًا':'OK'}</button></div>`)}

let loginDraft={user:''};
function login(){return `<div class="card form-card login-card"><h1>${t('welcome')}</h1><div class="role-tabs"><button class="${loginMode==='member'?'active':''}" onclick="loginMode='member';render()">${t('member')}</button><button class="${loginMode==='admin'?'active':''}" onclick="loginMode='admin';render()">${t('adminRole')}</button></div><p class="login-help">${loginMode==='member'?t('memberOnly'):t('adminOnly')}</p><div class="field"><label>${loginMode==='member'?t('phone'):'اسم المستخدم'}</label><input id="loginUser" value="${escapeHtml(loginDraft.user)}" oninput="loginDraft.user=this.value" placeholder="${loginMode==='member'?'05xxxxxxxx':'admin'}" autocomplete="username"></div><div class="field"><label>${t('password')}</label>${pwFieldHtml('loginPass','',"")}</div><button class="btn primary full" onclick="loginDemo()">${t('enter')}</button>${loginMode==='member'?`<button type="button" class="forgot-link" onclick="openForgot()">${t('forgot')}</button>`:''}</div>`}
let loginMode='member';
function loginDemo(){
 const u=document.getElementById('loginUser')?.value.trim(),p=document.getElementById('loginPass')?.value;
 if(loginMode==='admin'){
  if(u===DEMO_ADMIN_USER&&p===DEMO_ADMIN_PASSWORD){state.role='admin';state.currentPhone='';save();resetIdleTimer();go('#/')}
  else showErrorModal(t('loginError'));
  return;
 }
 const acc=getUsers().find(x=>x.phone===u);
 if(!acc||acc.password!==p){showErrorModal(t('loginError'));return}
 state.role='member';state.currentPhone=acc.phone;save();resetIdleTimer();loginDraft={user:''};go('#/');
}
function contact(){return `<div class="card form-card"><h1>${t('contact')}</h1><div class="field"><label>${t('phone')} *</label><input id="contactPhone" value="${isLogged()&&state.currentPhone?state.currentPhone:''}"></div><div class="field"><label>${t('subject')} *</label><input id="contactSubject"></div><div class="field"><label>${t('message')} *</label><textarea id="contactMessage"></textarea></div><button class="btn primary full" onclick="sendContact()">${t('send')}</button></div>`}
function sendContact(){const p=document.getElementById('contactPhone')?.value.trim(),s=document.getElementById('contactSubject')?.value.trim(),m=document.getElementById('contactMessage')?.value.trim();if(!p||!s||!m){toast(t('noData'));return}const msgs=getMessages();msgs.unshift({phone:p,subject:s,message:m,date:new Date().toLocaleString('ar-SA')});setMessages(msgs);logActivity(`${state.lang==='ar'?'رسالة تواصل جديدة':'New contact message'}: ${p}`);const subjEl=document.getElementById('contactSubject'),msgEl=document.getElementById('contactMessage');if(subjEl)subjEl.value='';if(msgEl)msgEl.value='';toast(state.lang==='ar'?'تم إرسال الرسالة وسيتم الرد عليكم قريبًا ✓':'Your message has been sent, we will reply soon ✓')}

let adminUserFilter='';
function goUserFilter(f){adminUserFilter=f;go('#/admin/users')}
function applyUserFilter(list,f){
 if(f==='banned')return list.filter(u=>u.banned);
 if(f==='active'||f==='paid')return list.filter(u=>!u.banned&&u.status==='active');
 if(f==='expiring')return list.filter(u=>u.status==='active'&&!u.banned&&daysLeft(u.expires)<=2);
 return list;
}
function admin(){const users=getUsers();const active=users.filter(u=>!u.banned&&u.status==='active').length;const paid=users.filter(u=>!u.banned&&u.status==='active'&&u.plan!=='بدون اشتراك').length;const banned=users.filter(u=>u.banned).length;const soon=users.filter(u=>u.status==='active'&&!u.banned&&daysLeft(u.expires)<=2).length;return `<div class="section-title"><h2>${t('admin')}</h2><span class="badge gold">${t('adminRole')}</span></div><div class="admin-grid">${statLink(t('subscribers'),active,'','active')}${statLink(t('payments'),paid,'green','paid')}${statLink(t('banned'),banned,'red','banned')}${statLink(t('expiring'),soon,'goldtxt','expiring')}</div><div class="admin-shortcuts"><a class="card shortcut" href="#/admin/users"><b>${t('users')}</b><span>›</span></a><a class="card shortcut" href="#/admin/supervisors"><b>${t('supervisors')}</b><span>›</span></a><a class="card shortcut" href="#/admin/contact"><b>${t('contactInbox')}</b><span>${getMessages().length}</span></a></div>`}
function daysLeft(date){if(!date||date==='—')return 999;return Math.ceil((new Date(date)-new Date())/86400000)}
function adminUsers(){const initial=adminUserFilter;adminUserFilter='';return `<div class="section-title"><h2>${t('users')}</h2></div><div class="toolbar"><div class="search"><span class="sico">⌕</span><input id="userSearch" oninput="renderUserRows(this.value)" placeholder="${t('permissionSearch')}"></div></div><div class="card table-wrap"><table class="table"><thead><tr><th>${t('mobile')}</th><th>${t('plan')}</th><th>${t('loginDate')}</th><th>${t('status')}</th><th>${t('expires')}</th><th>${t('action')}</th></tr></thead><tbody id="userRows" data-filter="${initial}">${userRows('',initial)}</tbody></table></div>`}
function userRows(q,f){return applyUserFilter(getUsers(),f||'').filter(u=>u.phone.includes(q||'')).map(u=>`<tr><td class="phone-cell">${u.phone}${u.supervisor?` <span class="badge gold">${t('supervisor')}</span>`:''}</td><td>${u.plan}</td><td>${u.start||'—'}</td><td><span class="badge ${u.banned?'red':u.status==='active'?'green':''}">${u.banned?t('banned'):u.status==='active'?t('active'):t('pending')}</span>${u.banned&&u.reason?`<div class="reason">${t('banReason')}: ${escapeHtml(u.reason)}</div>`:''}</td><td>${u.expires}</td><td class="actions"><button class="btn small" onclick="extendUser('${u.phone}')">${t('extend')}</button><button class="btn small" onclick="grantDiscountCode('${u.phone}')">${state.lang==='ar'?'كود خصم':'Discount'}</button><button class="btn small" onclick="assignSupervisor('${u.phone}')">${u.supervisor?t('unban')+' / ':''}${t('assign')}</button><button class="btn small danger" onclick="banUser('${u.phone}')">${u.banned?t('unban'):t('ban')}</button></td></tr>`).join('')||`<tr><td colspan="6" class="empty-cell">${t('noData')}</td></tr>`}
function renderUserRows(q){const el=document.getElementById('userRows');if(el)el.innerHTML=userRows(q,el.dataset.filter)}
function assignSupervisor(phone){const users=getUsers();const u=users.find(x=>x.phone===phone);if(!u)return;u.supervisor=!u.supervisor;setUsers(users);toast(t('assigned'));render()}
function banUser(phone){const users=getUsers();const u=users.find(x=>x.phone===phone);if(!u)return;if(u.banned){u.banned=false;u.reason='';setUsers(users);render();return}const reason=prompt(t('banReason'));if(!reason)return;u.banned=true;u.reason=reason;setUsers(users);toast(t('bannedSuccess'));render()}
let extendTargetPhone=null;
function extendUser(phone){
 extendTargetPhone=phone;
 const u=getUsers().find(x=>x.phone===phone);if(!u)return;
 openModal(`<h2>${t('extend')}</h2><p class="login-help phone-cell">${phone}</p><div class="field"><label>${t('plan')}</label><select id="extendPlan"><option value="${t('oneMonth')}">${t('oneMonth')}</option><option value="${t('threeMonths')}">${t('threeMonths')}</option><option value="${t('sixMonths')}">${t('sixMonths')}</option></select></div><button class="btn primary full" onclick="confirmExtend()">${t('save')}</button>`);
}
function confirmExtend(){
 const plan=document.getElementById('extendPlan')?.value;if(!plan||!extendTargetPhone)return;
 const users=getUsers();const u=users.find(x=>x.phone===extendTargetPhone);if(!u)return;
 const days=plan===t('oneMonth')?30:plan===t('threeMonths')?90:180;
 const base=(u.expires&&u.expires!=='—'&&new Date(u.expires)>new Date())?new Date(u.expires):new Date();
 base.setDate(base.getDate()+days);
 u.plan=plan;u.expires=base.toISOString().slice(0,10);u.status='active';u.banned=false;u.extendedByAdmin=true;
 setUsers(users);
 logActivity(`${state.lang==='ar'?'تم تمديد اشتراك':'Subscription extended for'} ${u.phone} — ${plan}`);
 toast(`${t('extend')} ✓`);closeModalUI();render();
}
function adminPermissions(){const users=getUsers();return `<div class="section-title"><h2>${t('permissionTitle')}</h2></div><div class="card permission-note"><p>${t('supervisorInfo')}</p></div><div class="toolbar"><div class="search"><span class="sico">⌕</span><input id="permSearch" oninput="renderPermRows(this.value)" placeholder="${t('permissionSearch')}"></div></div><div class="card table-wrap"><table class="table"><thead><tr><th>${t('mobile')}</th><th>${t('flagged')}</th><th>${t('action')}</th></tr></thead><tbody id="permRows">${permRows(users,'')}</tbody></table></div>`}
function permRows(users,q){return users.filter(u=>u.phone.includes(q||'')).map(u=>`<tr><td class="phone-cell">${u.phone}</td><td>${u.flagged?`<span class="badge gold">${t('flagged')}</span>`:`<span class="muted">—</span>`}</td><td class="actions"><button class="btn small" onclick="assignSupervisor('${u.phone}')">${u.supervisor?t('supervisor'):t('assign')}</button><button class="btn small danger" onclick="banUser('${u.phone}')">${u.banned?t('unban'):t('ban')}</button></td></tr>`).join('')||`<tr><td colspan="3" class="empty-cell">${t('noData')}</td></tr>`}
function renderPermRows(q){const el=document.getElementById('permRows');if(el)el.innerHTML=permRows(getUsers(),q)}
function adminSupervisors(){
 const sups=getUsers().filter(u=>u.supervisor);
 return `<div class="section-title"><h2>${t('supervisors')}</h2></div><div class="card table-wrap"><table class="table"><thead><tr><th>${t('mobile')}</th><th>${t('status')}</th><th>${t('action')}</th></tr></thead><tbody>${sups.length?sups.map(u=>`<tr><td class="phone-cell">${u.phone}</td><td><span class="badge ${u.banned?'red':'green'}">${u.banned?t('banned'):t('active')}</span></td><td class="actions"><button class="btn small" onclick="assignSupervisor('${u.phone}')">${state.lang==='ar'?'إنزال':'Demote'}</button><button class="btn small danger" onclick="banUser('${u.phone}')">${u.banned?t('unban'):t('ban')}</button></td></tr>`).join(''):`<tr><td colspan="3" class="empty-cell">${t('noData')}</td></tr>`}</tbody></table></div>`
}
function adminContact(){const msgs=getMessages();return `<div class="section-title"><h2>${t('contactInbox')}</h2><span class="badge green">${msgs.length}</span></div>${contactMessagesGrid()}`}
function escapeHtml(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function logout(){closeMenu();clearTimeout(idleTimer);state.role='visitor';localStorage.removeItem('saqr_role');location.hash='/';render();}
let idleTimer=null;
function resetIdleTimer(){
 clearTimeout(idleTimer);
 if(!isLogged())return;
 idleTimer=setTimeout(()=>{if(isLogged()){toast(t('logoutDone'));logout()}},300000);
}
['mousemove','keydown','click','touchstart','scroll','wheel'].forEach(ev=>window.addEventListener(ev,resetIdleTimer,{passive:true}));
function selectSymbol(s){if(!symbols[s])return;state.symbol=s;save();if(location.hash==='#/contracts')render();else go('#/contracts')}
function toggleFav(s){if(!symbols[s])return;const i=state.fav.indexOf(s);if(i>-1)state.fav.splice(i,1);else state.fav.push(s);save();render()}

function render(){
 let path=location.hash.replace(/^#/,'')||'/';
 if(path==='/logout'){logout();return}
 if(path==='/'){
  if(state.role==='member'){
   if(isBannedNow()){layout(bannedScreen(),'/',false);return}
   layout(memberHome(),'/');return;
  }
  if(state.role==='admin'){layout(admin(),'/');return}
  layout(publicHome(),'/');return;
 }
 if(path==='/checkout'){if(!checkoutPlan){go('#/subscription');return}layout(checkoutPage(),path,false);return}
 if(path==='/subscription'){if(state.role==='visitor'){layout(subscription(),path,false);return}else{go('#/');return}}
 if(path==='/login'){layout(login(),path,false);return}
 if(path==='/contact'){layout(contact(),path,state.role!=='visitor'&&!isBannedNow());return}
 if(state.role==='visitor'){layout(publicHome(),'/');return}
 if(state.role==='member'&&isBannedNow()){go('#/');return}
 if(path==='/manage-users'){layout(state.role==='member'&&isSupervisor()?supervisorPanel():`<div class="card empty"><h2>404</h2></div>`,path);return}
 if(path==='/contracts')layout(contracts(),path);
 else if(path==='/favorites')layout(favorites(),path);
 else if(path==='/alerts')layout(state.role==='admin'?adminAlertsPage():alerts(),path);
 else if(path==='/ratings')layout(ratingPage(),path);
 else if(path==='/admin')layout(admin(),path);
 else if(path==='/admin/users')layout(adminUsers(),path);
 else if(path==='/admin/contact')layout(adminContact(),path);
 else if(path==='/admin/supervisors')layout(adminSupervisors(),path);
 else layout(`<div class="card empty"><h2>404</h2><p>${t('noData')}</p></div>`,'');
}
window.addEventListener('hashchange',render);render();resetIdleTimer();

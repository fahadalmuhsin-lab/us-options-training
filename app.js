
const app = document.getElementById("app");
const state = {
  lang: localStorage.getItem("saqr_lang") || "ar",
  fav: JSON.parse(localStorage.getItem("saqr_fav") || '["CRM"]'),
  role: localStorage.getItem("saqr_role") || "visitor",
  symbol: localStorage.getItem("saqr_symbol") || "CRM"
};

const T = {
 ar:{
  brand:"صقر العقود", sub:"SAQR OPTIONS", home:"الرئيسية", contracts:"العقود", favorites:"المفضلة",
  analyses:"التحليلات", reports:"التقارير", alerts:"الإشعارات", subscription:"الاشتراك", login:"تسجيل الدخول",
  contact:"تواصل معنا", logout:"تسجيل الخروج", admin:"الإدارة", search:"ابحث عن عقد...",
  subscribe:"الاشتراك", start:"ابدأ الاشتراك", live:"بيانات لحظية", auto:"تحديث آلي", verified:"نتائج موثقة", instant:"إشعارات فورية",
  training:"منصة تدريبية متخصصة في عقود الخيارات الأمريكية، تقدم فرص التدريب بصورة منظمة وواضحة، مع متابعة لحظية للبيانات وتنبيهات عند تحقق مستويات التدريب.",
  results:"نتائج التدريب", total:"إجمالي عقود التدريب", entryTotal:"إجمالي أسعار الدخول", loss:"إجمالي الخسائر", net:"صافي الربح",
  goals:"الأهداف", level:"مستوى السترايك", stop:"وقف الخسارة", stats:"إحصائيات العقد", volume:"حجم التداول", open:"مفتوح العقود", iv:"التذبذب IV",
  current:"سعر العقد الحالي", entry:"سعر الدخول", expiry:"تاريخ الانتهاء", remaining:"الوقت المتبقي", days:"أيام",
  call:"CALL", put:"PUT", high:"High Confidence", short:"Short Term", contracts2:"عقود", note:"ملاحظة مهمة",
  disclaimer:"هذه ليست توصية مالية. جميع القرارات مسؤوليتك الشخصية. تداول الخيارات ينطوي على مخاطر عالية وقد تؤدي الخسائر إلى خسارة رأس المال.",
  last:"آخر تحديث", demo:"وضع تجربة المستخدم", role:"الدور", visitor:"زائر", member:"مشترك", adminRole:"مدير",
  dashboard:"لوحة التحكم", subscribers:"المشتركون", payments:"الاشتراكات والمدفوعات", settings:"الإعدادات",
  overview:"نظرة عامة", device:"الجهاز", plan:"الباقة", status:"الحالة", mobile:"الجوال",
  security:"الأمن", password:"كلمة المرور", email:"البريد الإلكتروني", phone:"رقم الجوال", address:"العنوان",
  subject:"الموضوع", message:"محتوى الرسالة", send:"إرسال", forgot:"نسيت كلمة المرور؟", enter:"دخول",
  welcome:"تسجيل الدخول", signup:"إنشاء حساب", save:"حفظ التغييرات", back:"رجوع", noData:"لا توجد بيانات للعرض",
  permitted:"المهام والصلاحيات", roleVisitor:"الزائر: استعراض عام وبيانات العرض فقط.", roleMember:"المشترك: العقود والتنبيهات والتحليلات والتقارير وفق الباقة.", roleAdmin:"المدير: إدارة المستخدمين والعقود والاشتراكات والإشعارات والإعدادات."
 },
 en:{
  brand:"Saqr Options", sub:"SAQR OPTIONS", home:"Home", contracts:"Contracts", favorites:"Favorites",
  analyses:"Analytics", reports:"Reports", alerts:"Alerts", subscription:"Subscription", login:"Log in",
  contact:"Contact us", logout:"Log out", admin:"Admin", search:"Search for a contract...",
  subscribe:"Subscribe", start:"Start subscription", live:"Live data", auto:"Auto update", verified:"Verified results", instant:"Instant alerts",
  training:"A training platform specialized in U.S. options contracts, presenting structured training opportunities with clear views, live market tracking, and alerts when training levels are reached.",
  results:"Training results", total:"Total training contracts", entryTotal:"Total entry prices", loss:"Total losses", net:"Net profit",
  goals:"Targets", level:"Strike level", stop:"Stop loss", stats:"Contract statistics", volume:"Trading volume", open:"Open contracts", iv:"IV volatility",
  current:"Current contract price", entry:"Entry price", expiry:"Expiry date", remaining:"Time remaining", days:"days",
  call:"CALL", put:"PUT", high:"High Confidence", short:"Short Term", contracts2:"Contracts", note:"Important note",
  disclaimer:"This is not financial advice. All decisions are your personal responsibility. Options trading involves high risk and losses may result in loss of capital.",
  last:"Last update", demo:"User experience demo", role:"Role", visitor:"Visitor", member:"Subscriber", adminRole:"Admin",
  dashboard:"Dashboard", subscribers:"Subscribers", payments:"Subscriptions & payments", settings:"Settings",
  overview:"Overview", device:"Device", plan:"Plan", status:"Status", mobile:"Mobile",
  security:"Security", password:"Password", email:"Email", phone:"Mobile number", address:"Address",
  subject:"Subject", message:"Message", send:"Send", forgot:"Forgot password?", enter:"Log in",
  welcome:"Log in", signup:"Create account", save:"Save changes", back:"Back", noData:"No data to display",
  permitted:"Tasks & permissions", roleVisitor:"Visitor: public browsing and display data only.", roleMember:"Subscriber: contracts, alerts, analytics and reports according to plan.", roleAdmin:"Admin: manage users, contracts, subscriptions, alerts and settings."
 }
};
const t=k=>T[state.lang][k]||k;

const symbols = {
 CRM:{company:"Salesforce Inc.",type:"CALL", current:"$2.38", entry:"$2.45", strike:"$278.42", expiry:"May 16, 2026", sub:"$280", targets:[["$3.20","+30.6%"],["$4.10","+67.3%"],["$5.80","+136.7%"]]},
 NVDA:{company:"NVIDIA Corp.",type:"PUT", current:"$1.62", entry:"$1.80", strike:"$175.20", expiry:"May 21, 2026", sub:"$260", targets:[["$2.40","+48.2%"],["$3.10","+92.4%"],["$4.20","+160.1%"]]},
 AAPL:{company:"Apple Inc.",type:"CALL", current:"$1.35", entry:"$1.42", strike:"$235.10", expiry:"May 28, 2026", sub:"$250", targets:[["$1.90","+40.7%"],["$2.40","+77.8%"],["$3.10","+129.6%"]]},
 AMZN:{company:"Amazon.com Inc.",type:"CALL", current:"$1.20", entry:"$1.31", strike:"$210.30", expiry:"Jun 05, 2026", sub:"$225", targets:[["$1.75","+45.8%"],["$2.20","+83.3%"],["$3.00","+150%"]]},
 MSFT:{company:"Microsoft Corp.",type:"CALL", current:"$1.70", entry:"$1.84", strike:"$455.10", expiry:"Jun 12, 2026", sub:"$470", targets:[["$2.20","+29.4%"],["$2.90","+70.6%"],["$3.80","+123.5%"]]},
 TSLA:{company:"Tesla Inc.",type:"PUT", current:"$2.05", entry:"$2.20", strike:"$325.00", expiry:"Jun 19, 2026", sub:"$320", targets:[["$2.70","+31.7%"],["$3.40","+65.9%"],["$4.50","+119.5%"]]},
 META:{company:"Meta Platforms Inc.",type:"PUT", current:"$1.55", entry:"$1.68", strike:"$610.40", expiry:"Jun 26, 2026", sub:"$600", targets:[["$2.10","+35.5%"],["$2.70","+74.2%"],["$3.60","+132.3%"]]},
 GOOGL:{company:"Alphabet Inc.",type:"CALL", current:"$1.44", entry:"$1.56", strike:"$190.20", expiry:"Jul 03, 2026", sub:"$200", targets:[["$1.95","+35.4%"],["$2.50","+73.6%"],["$3.20","+122.2%"]]}
};

function save(){localStorage.setItem("saqr_lang",state.lang);localStorage.setItem("saqr_fav",JSON.stringify(state.fav));localStorage.setItem("saqr_role",state.role);localStorage.setItem("saqr_symbol",state.symbol)}
function go(route){location.hash=route}
function icon(name){return ({home:"⌂",contracts:"▥",favorites:"★",analyses:"⌁",reports:"▤",alerts:"♟",subscription:"♛",login:"→",contact:"●",admin:"⚙"})[name]||"•"}

function header(){
 return `<header class="topbar">
  <div class="header-actions">
    <div class="lang"><button class="${state.lang==="ar"?"active":""}" onclick="setLang('ar')">ع</button><button class="${state.lang==="en"?"active":""}" onclick="setLang('en')">E</button></div>
    <button class="btn hide-m" onclick="go('#/contact')">${t("contact")}</button>
    <button class="btn hide-m" onclick="go('#/login')">${t("login")}</button>
    <button class="btn gold hide-m" onclick="go('#/subscription')">${t("subscribe")}</button>
    <button class="btn icon mobile-menu" onclick="toggleSide()">☰</button>
  </div>
  <a class="brand" href="#/"><img src="assets/saqr-logo.png" alt="SAQR OPTIONS"></a>
 </header>`
}
function sidebar(route){
 const items=[["home","/"],["contracts","/contracts"],["favorites","/favorites"],["analyses","/analyses"],["reports","/reports"],["alerts","/alerts"],["subscription","/subscription"],["login","/login"]];
 if(state.role==="admin") items.splice(7,0,["admin","/admin"]);
 return `<aside class="sidebar">${items.map(([k,r])=>`<a class="nav ${route===r?'active':''}" href="#${r}"><span class="ico">${icon(k)}</span><span>${t(k)}</span></a>`).join("")}</aside>`
}
function layout(content,route){
 document.documentElement.lang=state.lang; document.documentElement.dir=state.lang==="ar"?"rtl":"ltr";
 app.innerHTML=header()+`<div class="shell">${sidebar(route)}<main class="main">${content}<footer class="footer">SAQR OPTIONS © 2026 — ${t("demo")}</footer></main></div><div class="toast" id="toast"></div>`;
}
function setLang(l){state.lang=l;save();render()}
function toggleSide(){document.querySelector(".sidebar")?.classList.toggle("open")}

function home(){
 return `<section class="card hero"><h1>${t("brand")}</h1><p>${t("training")}</p><div class="pills"><span class="pill">${t("live")}</span><span class="pill">${t("auto")}</span><span class="pill">${t("verified")}</span><span class="pill">${t("instant")}</span></div><br><button class="btn primary" onclick="go('#/contracts')">${t("start")}</button></section>
 <div class="section-title"><h2>${t("results")}</h2></div>
 <div class="stats">
 ${stat(t("total"),"24")} ${stat(t("entryTotal"),"$31.80")} ${stat(t("loss"),"$4.25")} ${stat(t("net"),"$18.40+","green")}
 </div>
 <div class="section-title"><h2>${t("contracts")}</h2><button class="btn" onclick="go('#/contracts')">${t("contracts2")}</button></div>
 <div class="card table-wrap"><table class="table"><thead><tr><th>${t("contracts")}</th><th>${t("entry")}</th><th>${t("current")}</th><th>${t("status")}</th></tr></thead><tbody>
 ${["CRM","NVDA","AAPL"].map(s=>`<tr onclick="selectSymbol('${s}')" style="cursor:pointer"><td>${s}</td><td>${symbols[s].entry}</td><td>${symbols[s].current}</td><td class="${symbols[s].type==="CALL"?"call":"put"}">${symbols[s].type}</td></tr>`).join("")}</tbody></table></div>`
}
function stat(label,num,cls=""){return `<div class="card stat"><div class="label">${label}</div><div class="num ${cls}">${num}</div></div>`}

function contractPage(){
 const d=symbols[state.symbol]; const put=d.type==="PUT";
 return `<div class="ticker">${Object.keys(symbols).map(s=>`<button class="${s===state.symbol?"active":""}" onclick="selectSymbol('${s}')">★ ${s}</button>`).join("")}</div>
 <div class="grid cols-3">
  <section class="card">
   <div class="option-head"><div><div class="symbol">★ ${state.symbol}</div><div class="company">${d.company}</div><div style="margin-top:16px"><span class="badge ${put?"red":"green"}">${put?t("put"):t("call")}</span> <span class="badge gold">${t("high")}</span> <span class="badge">${t("short")}</span></div></div>
   <div><button class="option-type ${put?"put":""}" onclick="toast('${put?"PUT":"CALL"}')">${put?"↘":"↗"} ${put?t("put"):t("call")}</button></div></div>
   <div class="price-grid"><div class="price current"><div>${t("current")}</div><div class="v red">${d.current}</div><div class="red">↘ -0.27 (-10.19%)</div></div><div class="price entry"><div>${t("entry")}</div><div class="v green">${d.entry}</div></div></div>
   <div class="meta-grid"><div class="meta"><span class="small">${t("remaining")}</span><b>2 ${t("days")}</b></div><div class="meta"><span class="small">${t("subscription")}</span><b>${d.sub}</b></div><div class="meta"><span class="small">${t("expiry")}</span><b>${d.expiry}</b></div></div>
   <div class="chart"><span class="chart-caption">${state.symbol} — ${d.strike}</span><svg viewBox="0 0 900 280" preserveAspectRatio="none"><polyline fill="none" stroke="${put?'#ff3154':'#00ef9b'}" stroke-width="5" points="0,220 70,205 130,214 180,175 230,185 280,140 340,155 400,122 455,145 500,100 560,130 620,110 680,72 735,98 790,60 850,86 900,45"/></svg></div>
  </section>
  <aside class="side-stack"><div class="card targets"><h2>${t("goals")} 🎯</h2>${d.targets.map((x,i)=>`<div class="target"><span>${state.lang==="ar"?"الهدف":"Target"} ${i+1}</span><b>${x[0]}</b><span class="pct">${x[1]}</span></div>`).join("")}</div><div class="card" style="text-align:center"><h3>⚡ ${t("level")}</h3><div style="font-size:34px;font-weight:900">${d.sub}</div></div><div class="card"><h3>⛔ ${t("stop")}</h3><div style="font-size:27px">${put?"$2.95":"$1.20"}</div><div class="red">-51.0%</div></div><div class="card"><h3>📊 ${t("stats")}</h3><div class="meta"><span>${t("volume")}</span><b>12,450</b></div><div class="meta"><span>${t("open")}</span><b>8,230</b></div><div class="meta"><span>${t("iv")}</span><b>32.4%</b></div></div></aside>
 </div>
 <div class="card" style="margin-top:20px"><b class="goldtxt">${t("note")}</b><p style="color:#aebdce;line-height:1.9">${t("disclaimer")}</p></div>`
}
function contracts(){return `<div class="section-title"><h2>${t("contracts")}</h2><span class="badge green">${t("live")}</span></div>${contractPage()}`}
function favorites(){
 const fav=state.fav; return `<div class="section-title"><h2>${t("favorites")}</h2></div><div class="stats">${fav.map(s=>`<div class="card" style="cursor:pointer" onclick="selectSymbol('${s}')"><div class="symbol">★ ${s}</div><div class="${symbols[s].type==="CALL"?"green":"red"}" style="font-size:28px;font-weight:900">${symbols[s].type}</div><p class="company">${symbols[s].company}</p><button class="btn" onclick="event.stopPropagation();toggleFav('${s}')">${t("favorites")} ★</button></div>`).join("")}</div>`
}
function analyses(){return `<div class="section-title"><h2>${t("analyses")}</h2></div><div class="grid cols-2">${["CRM","NVDA","AAPL","META"].map(s=>`<div class="card"><h2>${s} ${symbols[s].type==="CALL"?"↗":"↘"}</h2><p class="company">${symbols[s].company}</p><div class="stats" style="grid-template-columns:1fr 1fr"><div><div class="label">${t("current")}</div><div class="num">${symbols[s].current}</div></div><div><div class="label">${t("entry")}</div><div class="num green">${symbols[s].entry}</div></div></div><hr style="border-color:#15304d;border-width:1px 0 0;margin:20px 0"><span class="badge gold">${t("high")}</span> <span class="badge">${t("short")}</span></div>`).join("")}</div>`}
function reports(){return `<div class="section-title"><h2>${t("reports")}</h2></div><div class="card table-wrap"><table class="table"><thead><tr><th>${t("contracts")}</th><th>${t("expiry")}</th><th>${t("entry")}</th><th>${t("current")}</th><th>${t("status")}</th></tr></thead><tbody>${Object.keys(symbols).map(s=>`<tr><td>${s}</td><td>${symbols[s].expiry}</td><td>${symbols[s].entry}</td><td>${symbols[s].current}</td><td><span class="badge green">${t("verified")}</span></td></tr>`).join("")}</tbody></table></div>`}
function alerts(){return `<div class="section-title"><h2>${t("alerts")}</h2></div><div class="grid cols-2">${[["🎯","CRM","$3.20"],["⚡","NVDA","$175.20"],["⛔","META","$600"]].map(a=>`<div class="card"><div style="font-size:28px">${a[0]} <b>${a[1]}</b></div><p>${state.lang==="ar"?"تم الوصول إلى المستوى المحدد":"Target level reached"}: <strong class="green">${a[2]}</strong></p><span class="badge green">${t("instant")}</span></div>`).join("")}</div>`}
function subscription(){return `<div class="section-title"><h2>${t("subscription")}</h2></div><div class="grid cols-3">${[["Basic","$49"],["Pro","$99"],["Elite","$199"]].map((p,i)=>`<div class="card" style="text-align:center"><h2>${p[0]}</h2><div style="font-size:42px;font-weight:900">${p[1]}</div><p class="company">${state.lang==="ar"?"شهريًا":"monthly"}</p><div class="pills"><span class="pill">${t("live")}</span><span class="pill">${t("instant")}</span><span class="pill">${i>0?t("analyses"):""}</span></div><br><button class="btn ${i===1?"primary":""}" onclick="toast('${t("start")}')">${t("start")}</button></div>`).join("")}</div>`}
function login(){return `<div class="card form-card"><h1>${t("welcome")}</h1><div class="field"><label>${t("phone")}</label><input placeholder="05xxxxxxxx"></div><div class="field"><label>${t("password")}</label><input type="password" placeholder="${t("password")}"></div><a href="#/contact" style="color:#2caeff">${t("forgot")}</a><br><br><button class="btn primary" onclick="loginDemo()">${t("enter")}</button><p style="text-align:center;color:#8e9db0">${t("role")}: <select onchange="state.role=this.value;save();render()" style="background:#06111f;color:white;border:1px solid #17395e;border-radius:10px;padding:7px"><option value="visitor" ${state.role==="visitor"?"selected":""}>${t("visitor")}</option><option value="member" ${state.role==="member"?"selected":""}>${t("member")}</option><option value="admin" ${state.role==="admin"?"selected":""}>${t("adminRole")}</option></select></p></div>`}
function contact(){return `<div class="card form-card"><h1>${t("contact")}</h1><div class="field"><label>${t("phone")} *</label><input></div><div class="field"><label>${t("email")} *</label><input type="email"></div><div class="field"><label>${t("address")} *</label><input></div><div class="field"><label>${t("subject")} *</label><input></div><div class="field"><label>${t("message")} *</label><textarea></textarea></div><button class="btn primary" onclick="toast('${t("send")} ✓')">${t("send")}</button></div>`}
function admin(){
 return `<div class="section-title"><h2>${t("dashboard")}</h2><span class="badge gold">${t("adminRole")}</span></div>
 <div class="admin-grid">${stat(t("subscribers"),"1,284")} ${stat(t("contracts"),"318","green")} ${stat("إيرادات الشهر","48,920")} ${stat("عقود اليوم","17")} ${stat(t("net"),"$126.40+","green")}</div>
 <div class="admin-layout" style="margin-top:20px"><div class="card"><h2>${t("contracts")}</h2><table class="table"><thead><tr><th>${t("contracts")}</th><th>${t("status")}</th><th>${t("entry")}</th></tr></thead><tbody><tr><td>CRM 275</td><td class="green">CALL</td><td>$1.00</td></tr><tr><td>NVDA 175</td><td class="red">PUT</td><td>$1.85</td></tr><tr><td>AAPL 235</td><td class="green">CALL</td><td>$1.20</td></tr></tbody></table></div><div class="card"><h2>${t("security")}</h2><p>${t("permitted")}</p><p class="company">${t("roleVisitor")}</p><p class="company">${t("roleMember")}</p><p class="company">${t("roleAdmin")}</p><button class="btn gold" onclick="go('#/admin/settings')">${t("settings")}</button></div></div>
 <div class="card" style="margin-top:20px"><h2>${t("subscribers")}</h2><table class="table"><thead><tr><th>${t("mobile")}</th><th>${t("plan")}</th><th>${t("device")}</th><th>${t("status")}</th></tr></thead><tbody>${["0501234567","0559876543","0532221110"].map((m,i)=>`<tr><td>${m}</td><td>${["Pro","Elite","Basic"][i]}</td><td>Mobile</td><td><span class="badge green">Active</span></td></tr>`).join("")}</tbody></table></div>`
}
function settings(){return `<div class="card form-card"><h1>${t("settings")}</h1><div class="field"><label>${t("email")}</label><input type="email" value="admin@saqroptions.com"></div><div class="field"><label>${t("password")}</label><input type="password"></div><div class="field"><label>${t("role")}</label><select><option>${t("adminRole")}</option></select></div><button class="btn primary" onclick="toast('${t("save")} ✓')">${t("save")}</button></div>`}

function selectSymbol(s){state.symbol=s;save();go('#/contracts')}
function toggleFav(s){state.fav=state.fav.includes(s)?state.fav.filter(x=>x!==s):[...state.fav,s];save();render()}
function loginDemo(){state.role=state.role==="visitor"?"member":state.role;save();toast(state.lang==="ar"?"تم تسجيل الدخول للتجربة":"Demo login successful");setTimeout(()=>go('#/'),500)}
function toast(msg){const el=document.getElementById("toast");if(!el)return;el.textContent=msg;el.style.display="block";setTimeout(()=>el.style.display="none",1800)}
function render(){
 let path=location.hash.replace(/^#/,"")||"/"; let content="",route=path;
 if(path==="/") content=home();
 else if(path==="/contracts") content=contracts();
 else if(path==="/favorites") content=favorites();
 else if(path==="/analyses") content=analyses();
 else if(path==="/reports") content=reports();
 else if(path==="/alerts") content=alerts();
 else if(path==="/subscription") content=subscription();
 else if(path==="/login") content=login();
 else if(path==="/contact") content=contact();
 else if(path==="/admin") content=admin();
 else if(path==="/admin/settings") content=settings();
 else {content=`<div class="card empty"><h2>404</h2><p>${t("noData")}</p><button class="btn" onclick="go('#/')">${t("home")}</button></div>`;route=""}
 layout(content,route);
}
window.addEventListener("hashchange",render); render();

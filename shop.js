/* ═══════════════════════════════════════════════
   shop.js — توابع مشترک انارشاپ (نسخه دینامیک)
═══════════════════════════════════════════════ */

const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FA = '۰۱۲۳۴۵۶۷۸۹';
const faD = s => String(s).replace(/[0-9]/g, d => FA[d]);
const toman = n => faD(n.toLocaleString('en-US').replace(/,/g,'٬')) + ' تومان';
const img = (seed,w,h) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
const off = p => p.o ? Math.round((1 - p.p / p.o) * 100) : 0;
const $ = s => document.querySelector(s);

/* ── محصولات پیش‌فرض ── */
const PRODUCTS_DEFAULT = [
 {id:1, t:'گوشی موبایل سامسونگ گلکسی S24 Ultra ظرفیت ۲۵۶ گیگابایت', c:'digital', p:54900000, o:58900000, r:4.7, v:1243, s:'galaxy-s24-phone'},
 {id:2, t:'گوشی موبایل اپل آیفون 15 Pro ظرفیت ۱۲۸ گیگابایت', c:'digital', p:79800000, o:0, r:4.8, v:512, s:'iphone-15-pro'},
 {id:3, t:'گوشی موبایل شیائومی ردمی نوت ۱۳ پرو ظرفیت ۲۵۶ گیگابایت', c:'digital', p:11490000, o:13200000, r:4.4, v:2108, s:'redmi-note-phone'},
 {id:4, t:'تبلت سامسونگ گلکسی تب S9 FE به همراه قلم', c:'digital', p:28700000, o:31000000, r:4.5, v:318, s:'galaxy-tab-tablet'},
 {id:5, t:'هدفون بی‌سیم سونی مدل WH-1000XM5 نویزگیر', c:'digital', p:14300000, o:17800000, r:4.9, v:654, s:'sony-headphones'},
 {id:6, t:'لپ‌تاپ لنوو IdeaPad Slim 5 پردازنده Core i7', c:'digital', p:38900000, o:42500000, r:4.3, v:189, s:'lenovo-laptop'},
 {id:7, t:'لپ‌تاپ اپل مک‌بوک ایر M3 تراشه ۸ هسته‌ای', c:'digital', p:89500000, o:0, r:4.9, v:97, s:'macbook-air-m3'},
 {id:8, t:'لپ‌تاپ ایسوس VivoBook 15 حافظه ۵۱۲ گیگابایت', c:'digital', p:31200000, o:33900000, r:4.2, v:276, s:'asus-vivobook'},
 {id:9, t:'اسپرسوساز دلونگی مدل EC685 بدنه استیل', c:'home', p:24800000, o:28900000, r:4.6, v:412, s:'espresso-machine'},
 {id:10, t:'جاروبرقی فیلیپس سری ۳۰۰۰ توان ۲۰۰۰ وات', c:'home', p:12600000, o:14400000, r:4.4, v:531, s:'vacuum-cleaner'},
 {id:11, t:'سرویس قابلمه گرانیتی ۹ پارچه ناساالکتریک', c:'home', p:8940000, o:10200000, r:4.5, v:322, s:'cookware-granite'},
 {id:12, t:'چراغ رومیزی دکوراتیو نورموردیک چوبی', c:'home', p:1890000, o:2300000, r:4.3, v:145, s:'nordic-table-lamp'},
 {id:13, t:'کفش پیاده‌روی اسیکس مدل Gel-Contend 8', c:'fashion', p:6450000, o:7800000, r:4.5, v:611, s:'asics-running-shoes'},
 {id:14, t:'کیف دستی چرم طبیعی زنانه مدل ملینا', c:'fashion', p:4280000, o:5100000, r:4.6, v:203, s:'leather-handbag'},
 {id:15, t:'ساعت مچی کاسیو دیجیتال کلاسیک نقره‌ای', c:'fashion', p:3150000, o:0, r:4.7, v:88, s:'casio-classic-watch'},
 {id:16, t:'ست مراقبت پوست نوتروژینا هیدروبوست ۳ تکه', c:'beauty', p:2980000, o:3600000, r:4.4, v:377, s:'skincare-set'},
 {id:17, t:'ادوپرفیوم لالیک مدل Lamour زنانه ۱۰۰ میل', c:'beauty', p:5640000, o:6900000, r:4.8, v:154, s:'perfume-lalique'},
 {id:18, t:'سشوار حرفه‌ای فیلیپس ۲۲۰۰ وات یونیزه', c:'beauty', p:3780000, o:4250000, r:4.3, v:265, s:'hair-dryer-pro'},
];
const AMAZING_DEFAULT = [
 {id:101, t:'پاوربانک انکر ۲۰۰۰۰ میلی‌آمپر فست‌شارژ', p:1490000, o:2300000, s:'anker-powerbank', left:4},
 {id:102, t:'مچ‌بند هوشمند شیائومی اسمارت بند ۹', p:2150000, o:3100000, s:'smart-band-9', left:7},
 {id:103, t:'اسپیکر بلوتوثی جی‌بی‌ال مدل Go 4 ضدآب', p:3890000, o:5200000, s:'jbl-go-speaker', left:3},
 {id:104, t:'ماشین اصلاح فیلیپس سری ۳۰۰۰ شارژی', p:1980000, o:2900000, s:'shaver-trimmer', left:9},
 {id:105, t:'ست بطری آب مسافرتی تاشو ۳ عددی سیلیکونی', p:690000, o:1100000, s:'travel-bottle-set', left:12},
 {id:106, t:'دسته بازی بی‌سیم پاور ای مدل P4 مناسب موبایل', p:2450000, o:3400000, s:'wireless-gamepad', left:5},
];

/* ── خواندن/ذخیره محصولات از localStorage ── */
let PRODUCTS, AMAZING, CATALOG = {};
function loadProducts(){
  try {
    const saved = localStorage.getItem('anar_products');
    PRODUCTS = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(PRODUCTS_DEFAULT));
    const savedA = localStorage.getItem('anar_amazing');
    AMAZING = savedA ? JSON.parse(savedA) : JSON.parse(JSON.stringify(AMAZING_DEFAULT));
  } catch(e){
    PRODUCTS = JSON.parse(JSON.stringify(PRODUCTS_DEFAULT));
    AMAZING = JSON.parse(JSON.stringify(AMAZING_DEFAULT));
  }
  CATALOG = {};
  PRODUCTS.concat(AMAZING).forEach(p => CATALOG[p.id] = p);
}
loadProducts();
const saveProducts = () => {
  localStorage.setItem('anar_products', JSON.stringify(PRODUCTS));
  localStorage.setItem('anar_amazing', JSON.stringify(AMAZING));
};
const CAT_NAME = {digital:'کالای دیجیتال', home:'خانه و آشپزخانه', fashion:'مد و پوشاک', beauty:'زیبایی و سلامت'};

/* ── وضعیت ورود کاربر ── */
const getUser = () => localStorage.getItem('anar_user') || sessionStorage.getItem('anar_user');

/* ── وضعیت ورود مدیر ── */
const isAdmin = () => sessionStorage.getItem('anar_admin') === '1';

/* ── سبد خرید ماندگار ── */
let cart;
try { cart = new Map(JSON.parse(localStorage.getItem('anar_cart') || '[]')); }
catch(e){ cart = new Map(); }
const saveCart = () => localStorage.setItem('anar_cart', JSON.stringify([...cart]));

/* ── علاقه‌مندی‌ها ── */
let favs;
try { favs = new Set(JSON.parse(localStorage.getItem('anar_favs') || '[]')); }
catch(e){ favs = new Set(); }
const saveFavs = () => localStorage.setItem('anar_favs', JSON.stringify([...favs]));

/* ── سفارش‌ها (ذخیره می‌شن تا پنل ببینه) ── */
let orders;
try { orders = JSON.parse(localStorage.getItem('anar_orders') || '[]'); }
catch(e){ orders = []; }
const saveOrders = () => localStorage.setItem('anar_orders', JSON.stringify(orders));

/* ── کدهای تخفیف ── */
let discountCodes;
try {
  const saved = localStorage.getItem('anar_discounts');
  discountCodes = saved ? JSON.parse(saved) : [{code:'ANAR10', percent:10, active:true}];
} catch(e){ discountCodes = [{code:'ANAR10', percent:10, active:true}]; }
const saveDiscounts = () => localStorage.setItem('anar_discounts', JSON.stringify(discountCodes));

/* ── تنظیمات ── */
let settings;
try {
  const saved = localStorage.getItem('anar_settings');
  settings = saved ? JSON.parse(saved) : {shopName:'انارشاپ', phone:'۰۲۱ - ۹۱۰۰ ۹۱۰۰', freeShipLimit:500000};
} catch(e){ settings = {shopName:'انارشاپ', phone:'۰۲۱ - ۹۱۰۰ ۹۱۰۰', freeShipLimit:500000}; }
const saveSettings = () => localStorage.setItem('anar_settings', JSON.stringify(settings));

/* ── توست ── */
let toastTimer;
function showToast(msg){
  const t = $('#toast'); if(!t) return;
  $('#toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ── کارت محصول (با لینک به صفحه محصول) ── */
function cardHTML(p, i = 0){
  const pct = off(p);
  return `<article class="p-card" style="animation-delay:${i*45}ms">
    <button class="fav ${favs.has(p.id)?'on':''}" data-fav="${p.id}" type="button" aria-label="افزودن به علاقه‌مندی‌ها"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 21C7 17 3 13.6 3 9.5A4.5 4.5 0 0 1 7.5 5c1.8 0 3.4 1 4.5 2.5C13.1 6 14.7 5 16.5 5A4.5 4.5 0 0 1 21 9.5c0 4.1-4 7.5-9 11.5z"/></svg></button>
    <a class="p-media" href="product.html?id=${p.id}"><img loading="lazy" src="${img(p.s,440,440)}" alt="${p.t}"></a>
    <h3 class="p-title"><a href="product.html?id=${p.id}">${p.t}</a></h3>
    <div class="p-rate"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.3 7 .9-5.1 4.8 1.3 6.9-6.2-3.4L5.8 21l1.3-6.9L2 9.2l7-.9z"/></svg><b>${faD(p.r || 4.5)}</b><span>(${faD((p.v || 214).toLocaleString('en-US'))} دیدگاه)</span></div>
    <div class="p-price">${pct ? `<span class="off-pill">٪${faD(pct)}</span>` : '<span></span>'}<strong>${faD(p.p.toLocaleString('en-US'))}<i>تومان</i></strong></div>
    <div class="p-old">${p.o ? faD(p.o.toLocaleString('en-US')) : ''}</div>
    <button class="add-btn" data-id="${p.id}" type="button"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>افزودن به سبد</button>
  </article>`;
}

/* ── سبد خرید ── */
function bump(el){ el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
function openDrawer(){ $('#drawer').classList.add('open'); $('#overlay').classList.add('show'); document.body.style.overflow = 'hidden'; }
function closeDrawer(){ $('#drawer').classList.remove('open'); $('#overlay').classList.remove('show'); document.body.style.overflow = ''; }

function renderCart(){
  const badge = $('#cartBadge'); if(!badge) return;
  const count = [...cart.values()].reduce((a,b) => a+b, 0);
  badge.hidden = count === 0; badge.textContent = faD(count);
  const body = $('#drawerBody'), foot = $('#drawerFoot');
  if(!cart.size){
    body.innerHTML = `<div class="c-empty"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1.5"/><circle cx="19" cy="21" r="1.5"/><path d="M2.5 3h3l2.6 12.5a2 2 0 0 0 2 1.5h8.7a2 2 0 0 0 2-1.6L22.5 7H6.2"/></svg><b style="font-family:var(--fd);font-weight:400;font-size:20px;color:var(--ink)">سبد خرید شما خالی است</b><p style="font-size:13px">هنوز چیزی انتخاب نکرده‌اید؛ از پیشنهادها شروع کنید!</p></div>`;
    foot.hidden = true; return;
  }
  let total = 0, saving = 0;
  body.innerHTML = [...cart].map(([id, q]) => {
    const p = CATALOG[id]; if(!p) return '';
    total += p.p * q; if(p.o) saving += (p.o - p.p) * q;
    return `<div class="c-item">
      <img src="${img(p.s,140,140)}" alt="">
      <div class="ci-info"><h5>${p.t}</h5>
        <div class="ci-row">
          <div class="qty"><button data-act="inc" data-id="${id}" type="button">+</button><b>${faD(q)}</b><button data-act="${q===1?'del':'dec'}" data-id="${id}" type="button">${q===1?'🗑':'−'}</button></div>
          <span class="ci-price">${toman(p.p * q)}</span>
        </div>
        <button class="ci-del" data-act="del" data-id="${id}" type="button">حذف از سبد</button>
      </div></div>`;
  }).join('');
  $('#cartTotal').textContent = toman(total);
  $('#cartSaving').textContent = saving ? toman(saving) : '—';
  foot.hidden = false;
}

function addToCart(id, qty = 1){
  cart.set(id, (cart.get(id) || 0) + qty);
  saveCart();
  const badge = $('#cartBadge'); if(badge) bump(badge);
  renderCart();
  showToast('به سبد خرید شما اضافه شد 🛒');
}

function initCartUI(){
  $('#cartBtn').onclick = openDrawer;
  $('#drawerClose').onclick = closeDrawer;
  $('#overlay').onclick = closeDrawer;
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeDrawer(); });

  $('#drawerBody').addEventListener('click', e => {
    const b = e.target.closest('[data-act]'); if(!b) return;
    const id = +b.dataset.id, q = cart.get(id) || 0;
    if(b.dataset.act === 'inc') cart.set(id, q + 1);
    if(b.dataset.act === 'dec') cart.set(id, q - 1);
    if(b.dataset.act === 'del') cart.delete(id);
    saveCart(); renderCart();
  });

  document.addEventListener('click', e => {
    const add = e.target.closest('.add-btn');
    if(add){ addToCart(+add.dataset.id, +add.dataset.qty || 1); return; }
    const fav = e.target.closest('.fav');
    if(fav){
      const id = +fav.dataset.fav;
      if(favs.has(id)){ favs.delete(id); fav.classList.remove('on'); showToast('از علاقه‌مندی‌ها حذف شد'); }
      else { favs.add(id); fav.classList.add('on'); showToast('به علاقه‌مندی‌ها اضافه شد ❤'); }
      saveFavs();
    }
  });

  $('#checkoutBtn').onclick = () => {
    if(getUser()){
      location.href = 'checkout.html';
    } else {
      closeDrawer();
      showToast('برای تکمیل خرید، ابتدا وارد حساب شو 🔐');
      setTimeout(() => { location.href = 'auth.html?redirect=checkout'; }, 900);
    }
  };
}

/* ── رابط کاربری ورود/کاربر ── */
function initAuthUI(){
  const u = getUser();
  const authBtn = $('#authBtn'), wrap = $('#userWrap');
  if(!authBtn || !wrap) return;
  if(u){
    authBtn.hidden = true; wrap.hidden = false;
    $('#userChipName').textContent = u;
    $('#umName').textContent = u;
    $('#userAvatar').textContent = u.trim().charAt(0);
  } else {
    authBtn.hidden = false; wrap.hidden = true;
  }
  $('#userBtn').addEventListener('click', e => { e.stopPropagation(); $('#userMenu').classList.toggle('open'); });
  document.addEventListener('click', () => $('#userMenu').classList.remove('open'));
  $('#logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('anar_user'); sessionStorage.removeItem('anar_user');
    showToast('از حساب خارج شدی 👋');
    setTimeout(() => location.reload(), 700);
  });
}

function initShopCore(){
  initAuthUI();
  initCartUI();
  renderCart();
}

/* ═══════════════════════════════════════════
   نسخه موبایل: نوار پایین + منوی دسته‌بندی
═══════════════════════════════════════════ */
const MOBILE_CATS = [
 {k:'digital', n:'کالای دیجیتال', e:'📱', bg:'var(--primary-soft)', c:'var(--primary)'},
 {k:'home',    n:'خانه و آشپزخانه', e:'🏠', bg:'var(--saffron-soft)', c:'#b07c10'},
 {k:'fashion', n:'مد و پوشاک', e:'👗', bg:'#ece9f8', c:'#6d5bd0'},
 {k:'beauty',  n:'زیبایی و سلامت', e:'✨', bg:'var(--teal-soft)', c:'var(--teal)'},
];

function updateMBadge(){
  const mb = document.getElementById('mBadge'); if(!mb) return;
  const count = [...cart.values()].reduce((a,b)=>a+b,0);
  mb.hidden = count===0; mb.textContent = faD(count);
}

function initMobile(){
  if(document.getElementById('mNav')) return;
  if(location.pathname.includes('admin')) return; // توی پنل مدیریت نشون نده

  const style = document.createElement('style');
  style.textContent = `
    .m-nav{position:fixed;bottom:0;right:0;left:0;z-index:1000;background:#fff;border-top:1px solid var(--line);box-shadow:0 -6px 20px rgba(35,36,46,.08);display:none;grid-template-columns:repeat(4,1fr);padding:6px 4px calc(6px + env(safe-area-inset-bottom))}
    .m-item{display:flex;flex-direction:column;align-items:center;gap:3px;font-size:10.5px;font-weight:700;color:var(--muted);padding:6px 2px;border-radius:10px;position:relative;transition:.2s}
    .m-item svg{width:22px;height:22px}
    .m-item.on{color:var(--primary)}
    .m-item:active{transform:scale(.94)}
    .m-badge{position:absolute;top:2px;right:calc(50% - 16px);background:var(--primary);color:#fff;font-size:9.5px;font-weight:800;min-width:16px;height:16px;border-radius:99px;display:grid;place-items:center;padding-inline:4px}
    .m-scrim{position:fixed;inset:0;background:rgba(20,18,25,.45);z-index:1050;opacity:0;pointer-events:none;transition:.3s}
    .m-scrim.show{opacity:1;pointer-events:auto}
    .m-sheet{position:fixed;right:0;left:0;bottom:0;z-index:1100;background:#fff;border-radius:20px 20px 0 0;box-shadow:0 -10px 40px rgba(35,36,46,.2);padding:14px 18px calc(20px + env(safe-area-inset-bottom));transform:translateY(100%);transition:transform .35s cubic-bezier(.2,.8,.25,1);max-height:70vh;overflow-y:auto}
    .m-sheet.open{transform:none}
    .m-sheet-handle{width:44px;height:5px;border-radius:99px;background:#e2dccd;margin:0 auto 16px}
    .m-sheet h4{font-family:var(--fd);font-weight:400;font-size:19px;margin-bottom:12px}
    .m-cats{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
    .m-cat{display:flex;align-items:center;gap:10px;background:#f7f4ee;border-radius:13px;padding:12px;font-size:13px;font-weight:700}
    .m-cat .ic{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;flex-shrink:0;font-size:18px}
    @media(max-width:767px){
      .m-nav{display:grid}
      body{padding-bottom:70px}
      .hd-nav{display:none}
      .toast{bottom:84px;transform:translate(50%,320%)}
      .toast.show{transform:translate(50%,0)}
      #toTop{bottom:84px}
      .add-btn{min-height:42px}
      .tab{padding:9px 16px}
    }
  `;
  document.head.appendChild(style);

  const isHome = location.pathname.endsWith('index.html') || location.pathname.endsWith('/') || location.pathname==='';
  const u = getUser();

  const nav = document.createElement('nav');
  nav.className='m-nav'; nav.id='mNav';
  nav.innerHTML = `
    <a class="m-item ${isHome?'on':''}" href="index.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>خانه</a>
    <button class="m-item" id="mCats" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>دسته‌بندی</button>
    <button class="m-item" id="mCart" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.5 3h3l2.6 12.5a2 2 0 0 0 2 1.5h8.7a2 2 0 0 0 2-1.6L22 7H6"/></svg>سبد خرید<span class="m-badge" id="mBadge" hidden>۰</span></button>
    <a class="m-item" href="auth.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>${u?'حساب من':'ورود'}</a>
  `;
  document.body.appendChild(nav);

  const scrim = document.createElement('div'); scrim.className='m-scrim'; scrim.id='mScrim';
  document.body.appendChild(scrim);

  const sheet = document.createElement('div'); sheet.className='m-sheet'; sheet.id='mSheet';
  sheet.innerHTML = `<div class="m-sheet-handle"></div><h4>دسته‌بندی‌ها</h4><div class="m-cats">` +
    MOBILE_CATS.map(c=>`<a class="m-cat" href="index.html?cat=${c.k}"><span class="ic" style="background:${c.bg}">${c.e}</span>${c.n}</a>`).join('') +
    `</div>`;
  document.body.appendChild(sheet);

  const openSheet=()=>{sheet.classList.add('open');scrim.classList.add('show');};
  const closeSheet=()=>{sheet.classList.remove('open');scrim.classList.remove('show');};
  nav.querySelector('#mCats').onclick = openSheet;
  scrim.onclick = closeSheet;
  nav.querySelector('#mCart').onclick = ()=>{ closeSheet(); openDrawer(); };

  updateMBadge();
  // بَج موبایل همیشه با سبد هماهنگ بمونه
  const _orig = renderCart;
  renderCart = function(){ _orig(); updateMBadge(); };
}
initMobile();
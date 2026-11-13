'use strict';
// Адрес отправки заявок. Пусто = демо-режим (успех без отправки).
// Telegram: создайте бота в @BotFather, вставьте токен и chat_id в серверный обработчик
// (например, Cloudflare Worker), который вызывает https://api.telegram.org/bot<TOKEN>/sendMessage,
// и укажите его URL здесь. Токен в браузерный код не кладите.
const FORM_ENDPOINT = '';
const SHOW_PRICE = false;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const nav = [['catalog.html','Каталог'],['materials.html','Материалы'],['about.html','О компании'],['contacts.html','Контакты']];
// Работы (3 реальных проекта по фото). [ ] = уточнить у владельца. i = имена файлов в img/
const P=[{t:'Угловая кухня с барной стойкой, бежевые фасады',pl:'Угловая',col:'Бежевый',f:'Бежевые фасады с рамкой, столешница с рисунком под мрамор',fa:'бежевые, с рамкой',tp:'рисунок под мрамор',d:'Угловая кухня с барной стойкой. Бежевые фасады с рамкой, столешница и фартук с рисунком под мрамор, чёрная встроенная техника в высоком шкафу.',i:['kitchen-a-1','kitchen-a-2']},{t:'Угловая кухня, серый бетон и дерево',pl:'Угловая',col:'Серый',f:'Серые фасады под бетон, верхние под дерево, белая столешница',fa:'серые под бетон, верхние под дерево',tp:'белая',d:'Угловая кухня с высокими шкафами до потолка. Фасады серые под бетон, верхние шкафы над мойкой под дерево, столешница и фартук белые.',i:['kitchen-b-1','kitchen-b-2']},{t:'Прямая кухня, синие фасады и жёлтые верхние шкафы',pl:'Прямая',col:'Синий',f:'Синие фасады, жёлтые верхние шкафы, светлая столешница',fa:'синие нижние и пенал, жёлтые верхние',tp:'светлая',d:'Прямая кухня с высоким пеналом. Синие фасады, жёлтые верхние шкафы с открытыми полками, светлая столешница и фартук.',i:['kitchen-c-1']}];
const im=(n,a)=>`<img class="pi" src="img/${n}.webp" alt="${a}" width="800" height="1000" loading="lazy">`;
const card=(p,n)=>`<a class="card rv" href="project.html?id=${n+1}"><div class="imgs">${im(p.i[0],p.t)}${p.i[1]?im(p.i[1],p.t+', другой ракурс'):''}</div><small>Проект ${n+1}</small><h3>${p.t}</h3><small>${p.f}</small></a>`;
if ($('#prev')) $('#prev').innerHTML = P.map(card).join('');
const pj = $('#pj');
if (pj) { const n = Math.min(P.length, Math.max(1, +new URLSearchParams(location.search).get('id') || 1)) - 1, p = P[n]; document.title = p.t + ' | Кухни Extra';
  pj.innerHTML = `<section style="padding-top:64px"><div class="wrap"><p class="label">Проект ${n+1}</p><h1 data-lines="${p.t}" style="font-size:clamp(2.5rem,5vw,4rem);margin:16px 0 40px"></h1><div class="grid g2"><div class="rv"><p>${p.d}</p><dl style="margin-top:32px">${[['Планировка',p.pl],['Фасады',p.fa],['Столешница',p.tp]].map(([a,b]) => `<div style="padding:16px 0;border-top:1px solid var(--line)"><dt class="label">${a}</dt><dd>${b}</dd></div>`).join('')}</dl></div><div>${im(p.i[0],p.t).replace('loading="lazy"','').replace('class="pi"','class="pi reveal"')}</div></div>${p.i.length>1?`<div class="cards two" style="margin-top:64px">${p.i.slice(1).map(x => `<div>${im(x,p.t+', другой ракурс').replace('class="pi"','class="pi reveal"')}</div>`).join('')}</div>`:''}</div></section><section class="alt"><div class="wrap"><h2 data-lines="Похожие работы"></h2><div class="cards" style="margin-top:40px">${P.map((q,k) => k===n?'':card(q,k)).join('')}</div><a class="btn" style="margin-top:48px" href="index.html#zamer">Хочу такую же <i>→</i></a></div></section>`; }
const links = nav.map(([h,t]) => `<a href="${h}">${t}</a>`).join('');
// Общая шапка и подвал (одинаковы на всех страницах)
document.body.insertAdjacentHTML('afterbegin', `<header class="hdr"><div class="wrap"><a class="logo" href="index.html" aria-label="Кухни Extra, на главную">Кухни <em>Extra</em></a><nav class="nav" aria-label="Основная">${links}</nav><a class="tel" href="tel:+79885589997">+7 (988) 558-99-97</a><a class="btn" href="index.html#zamer">Записаться на замер <i>→</i></a><button class="burger" aria-label="Меню"><span></span><span></span></button></div></header><div class="mob">${links}<a href="tel:+79885589997">+7 (988) 558-99-97</a></div>`);
document.body.insertAdjacentHTML('beforeend', `<footer class="ftr"><div class="wrap"><div><a class="logo" href="index.html">Кухни <em>Extra</em></a><p>Кухни на заказ по вашим размерам. Своё производство, замер и монтаж.</p></div><div>${links}</div><div>+7 (988) 558-99-97<br>пгт Яблоновский, Тахтамукайский район<br>9:00–18:00<br></div><div><a href="privacy.html">Политика конфиденциальности</a>2026</div></div></footer>`);
const hdr = $('.hdr'), burger = $('.burger');
burger.onclick = () => document.body.classList.toggle('menu-open');
let ly = 0;
addEventListener('scroll', () => { const y = scrollY; hdr.classList.toggle('hide', y > ly && y > 120 && !document.body.classList.contains('menu-open')); ly = y; }, {passive:true});
// Построчные заголовки: <h1 data-lines="Строка 1|Строка 2">
$$('[data-lines]').forEach(h => { h.innerHTML = h.dataset.lines.split('|').map((l,i) => `<span class="ln" style="--d:${i*.1}s"><span>${l}</span></span>`).join(''); });
// Появление при скролле
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); if (e.target.dataset.n) count(e.target); } }), {threshold:.15});
$$('.rv,[data-lines]').forEach(el => io.observe(el));
// Фото с clip-path: наблюдаем родителя, иначе обрезанный элемент не считается видимым
const io2 = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { $$(':scope > .reveal', e.target).forEach(x => x.classList.add('in')); io2.unobserve(e.target); } }), {threshold:.15});
new Set($$('.reveal').map(x => x.parentElement)).forEach(p => io2.observe(p));
function count(el) { const t = +el.dataset.n; if (!isFinite(t) || matchMedia('(prefers-reduced-motion:reduce)').matches) return; let s; const f = ts => { s ??= ts; const p = Math.min((ts - s) / 1400, 1); el.textContent = Math.round(t * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); }
// Подсветка этапов
const so = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('on', e.isIntersecting || e.boundingClientRect.top < innerHeight * .5)), {rootMargin:'0px 0px -50% 0px'});
$$('.steps li').forEach(li => so.observe(li));
// Параллакс главного фото
const px = $('[data-px]');
if (px && !matchMedia('(prefers-reduced-motion:reduce)').matches) addEventListener('scroll', () => requestAnimationFrame(() => { px.style.transform = `translateY(${Math.min(scrollY * .06, 50)}px)`; }), {passive:true});
// Маска телефона и валидация
function mask(i) { i.addEventListener('input', () => { let d = i.value.replace(/\D/g,''); if (d[0] === '7' || d[0] === '8') d = d.slice(1); d = d.slice(0,10); let o = '+7'; if (d.length) o += ' (' + d.slice(0,3); if (d.length > 2) o += ') ' + d.slice(3,6); if (d.length > 5) o += '-' + d.slice(6,8); if (d.length > 7) o += '-' + d.slice(8,10); i.value = o; }); }
$$('input[type=tel]').forEach(mask);
const phoneOk = v => v.replace(/\D/g,'').length === 11;
async function send(data) { if (!FORM_ENDPOINT) return true; try { return (await fetch(FORM_ENDPOINT, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)})).ok; } catch { return false; } }
$$('form.f[data-lead]').forEach(f => f.addEventListener('submit', async e => {
  e.preventDefault(); const er = $('.err', f), tel = f.elements.phone, ok = f.elements.agree;
  if (!phoneOk(tel.value)) { er.textContent = 'Введите телефон полностью: +7 (___) ___-__-__'; tel.focus(); return; }
  if (!ok.checked) { er.textContent = 'Нужно согласие на обработку персональных данных'; return; }
  er.textContent = ''; const b = $('button[type=submit]', f); b.disabled = true; b.textContent = 'Отправляем...';
  if (await send(Object.fromEntries(new FormData(f)))) f.innerHTML = '<h3>Заявка принята</h3><p>Перезвоним в течение 15 минут.</p>';
  else { er.textContent = 'Не удалось отправить. Позвоните нам: +7 (988) 558-99-97'; b.disabled = false; b.textContent = 'Записаться на замер'; }
}));
// Квиз
const plan = d => `<svg viewBox="0 0 120 56" aria-hidden="true"><path d="${d}"/></svg>`;
const Q = [
 {k:'Планировка', pl:1, o:[['Прямая',plan('M10 12h100v14H10z')],['Угловая',plan('M10 8h100v14H24v32H10z')],['П-образная',plan('M10 8h100v44H92V22H28v30H10z')],['С островом',plan('M10 8h100v12H10zM30 34h60v14H30z')],['Две линии',plan('M10 8h100v12H10zM10 38h100v12H10z')]]},
 {k:'Материал фасадов', o:['ЛДСП','МДФ в плёнке ПВХ','Пластик','Эмаль','Пока не определился, нужна консультация']},
 {k:'Столешница', o:['Пластик (HPL)','Компакт-ламинат','Акрил','Кварцевый агломерат','Пока не определился']},
 {k:'Когда планируете заказ', o:['Как можно скорее','В течение месяца','В течение полугода','Просто интересуюсь']}];
const qz = $('#quiz');
if (qz) {
  let i = 0; const a = {};
  const draw = () => {
    $('.bar i', qz).style.width = (i + 1) * 20 + '%'; $('#qstep', qz).textContent = `Шаг ${i+1} из 5`;
    const box = $('#qbody', qz), done = i > 4;
    if (i < 4) { const q = Q[i]; box.innerHTML = `<div class="step"><h3>${q.k}</h3><div class="opts ${q.pl?'pl':''}">${q.o.map(o => { const [t,s] = Array.isArray(o) ? o : [o,'']; return `<button type="button" class="opt" aria-pressed="${a[i]===t}" data-v="${t}">${s}<span>${t}</span></button>`; }).join('')}</div></div>`;
      $$('.opt', box).forEach(b => b.onclick = () => { a[i] = b.dataset.v; $('#qnext', qz).disabled = false; $$('.opt', box).forEach(x => x.setAttribute('aria-pressed', x === b)); }); }
    else if (!done) { box.innerHTML = `<form class="f step" id="qf" novalidate><h3>Контакты</h3><label>Имя<input name="name" autocomplete="name" value="${a.name||''}"></label><label>Телефон<input name="phone" type="tel" autocomplete="tel" placeholder="+7 (___) ___-__-__" value="${a.phone||''}"></label><label>Как связаться<select name="via"><option>Звонок</option><option>Telegram</option><option>WhatsApp</option></select></label><label class="chk"><input type="checkbox" name="agree"><span>Согласен на обработку персональных данных, <a href="privacy.html">политика конфиденциальности</a></span></label><p class="err" role="alert"></p></form>`; mask($('[name=phone]', box)); }
    $('#qnext', qz).disabled = i < 4 && !a[i]; $('#qback', qz).hidden = i === 0 || done; $('#qnext', qz).hidden = done; $('#qnext', qz).firstChild.textContent = i === 4 ? 'Получить расчёт ' : 'Далее ';
  };
  $('#qback', qz).onclick = () => { if (i === 4) keep(); i--; draw(); };
  const keep = () => { const f = $('#qf'); if (f) { a.name = f.name.value; a.phone = f.phone.value; } };
  $('#qnext', qz).onclick = async () => {
    if (i < 4) { if (!a[i]) return; i++; draw(); return; }
    const f = $('#qf'); keep(); const er = $('.err', f);
    if (!phoneOk(a.phone)) { er.textContent = 'Введите телефон полностью'; return; }
    if (!f.agree.checked) { er.textContent = 'Нужно согласие на обработку данных'; return; }
    await send({...Object.fromEntries(Q.map((q,n) => [q.k, a[n]])), name:a.name, phone:a.phone, via:f.via.value});
    i = 5; $('.bar i', qz).style.width = '100%'; $('#qstep', qz).textContent = 'Готово'; $('#qnext', qz).hidden = true; $('#qback', qz).hidden = true;
    $('#qbody', qz).innerHTML = `<div class="step"><h3>Заявка принята, перезвоним в течение 15 минут</h3><ul class="nl">${Q.map((q,n) => `<li><b>${n+1}</b><span>${q.k}: ${a[n]}</span></li>`).join('')}</ul></div>`;
  };
  draw();
}
// Каталог
const cg = $('#cgrid');
if (cg) {
  let pl = 'Все', cl = 'Все';
  const tabs = (id, vals, set) => { const t = $(id); t.innerHTML = vals.map(v => `<button type="button" aria-pressed="${v==='Все'}">${v}</button>`).join(''); $$('button', t).forEach(b => b.onclick = () => { $$('button', t).forEach(x => x.setAttribute('aria-pressed', x === b)); set(b.textContent); render(); }); };
  const render = () => { const l = P.map((p,n) => [p,n]).filter(([p]) => (pl==='Все'||p.pl===pl) && (cl==='Все'||p.col===cl)); $('#ccount').textContent = l.length; cg.innerHTML = l.map(([p,n]) => card(p,n).replace('card rv','card fadein')).join(''); };
  tabs('#fpl', ['Все','Угловая','Прямая'], v => pl = v);
  tabs('#fst', ['Все','Бежевый','Серый','Синий'], v => cl = v);
  render();
}
// Cookie
if (!localStorage.getItem('ck')) { const c = document.createElement('div'); c.className = 'cookie'; c.innerHTML = 'Сайт использует cookie. <a href="privacy.html">Подробнее</a> <button class="lnk" style="background:none;border:0;cursor:pointer;font:inherit">Понятно</button>'; $('button', c).onclick = () => { localStorage.setItem('ck', 1); c.remove(); }; document.body.append(c); }

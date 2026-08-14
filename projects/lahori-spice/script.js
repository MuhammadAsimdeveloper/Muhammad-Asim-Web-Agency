/* Lahori Spice Portfolio Demo */
const builtInProducts = [
  {id:"biryani",name:"Chicken Biryani",category:"Biryanis",price:520,desc:"Fragrant basmati rice layered with tender chicken, saffron and aromatic spices.",image:"images/biryani.jpg",badge:"Popular"},
  {id:"karahi",name:"Chicken Karahi",category:"Curries & Gravies",price:1450,desc:"Lahori-style karahi with tomato, ginger, green chilli and fresh coriander.",image:"images/chicken-karahi.jpg",badge:"Chef Pick"},
  {id:"seekh",name:"Seekh Kebab",category:"Kebabs & Grills",price:650,desc:"Char-grilled minced meat kebabs served with mint chutney and lemon.",image:"images/seekh-kebab.jpg",badge:"Grill"},
  {id:"tikka",name:"Chicken Tikka",category:"Kebabs & Grills",price:780,desc:"Smoky marinated chicken pieces grilled until tender and lightly charred.",image:"images/chicken-tikka.jpg",badge:"Popular"},
  {id:"mutton",name:"Mutton Karahi",category:"Curries & Gravies",price:1850,desc:"Tender mutton cooked in a rich Lahori tomato and ginger karahi.",image:"images/mutton-karahi.jpg",badge:"Special"},
  {id:"naan",name:"Garlic Naan",category:"Breads & Naan",price:180,desc:"Freshly baked naan finished with garlic, herbs and butter.",image:"images/naan.webp",badge:"Fresh"},
  {id:"tikka-roll",name:"Chicken Tikka Roll",category:"Street Food",price:480,desc:"Grilled tikka wrapped in soft paratha with chutney, onion and salad.",image:"images/chicken-tikka.jpg",badge:"Quick Bite"},
  {id:"karahi-naan",name:"Karahi & Naan Combo",category:"Street Food",price:980,desc:"A satisfying serving of chicken karahi with fresh naan and chutney.",image:"images/chicken-karahi.jpg",badge:"Combo"}
];

let cart = JSON.parse(localStorage.getItem("lahori_cart") || "[]");
let activeCategory = "All";

function money(n){ return "Rs. " + Number(n||0).toLocaleString("en-PK"); }
function escapeHTML(s){
  return String(s ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}
function getCustomProducts(){
  try { return JSON.parse(localStorage.getItem("lahori_custom_products") || "[]"); }
  catch { return []; }
}
function allProducts(){ return [...builtInProducts, ...getCustomProducts()]; }

function saveCart(){ localStorage.setItem("lahori_cart", JSON.stringify(cart)); updateCartUI(); }
function addToCart(id){
  const p = allProducts().find(x => String(x.id) === String(id));
  if(!p) return;
  const found = cart.find(x => String(x.id) === String(id));
  if(found) found.qty++;
  else cart.push({id:p.id,name:p.name,price:Number(p.price),qty:1,image:p.image});
  saveCart();
  toast(`${p.name} added to cart`);
}
function changeQty(id, delta){
  const item=cart.find(x=>String(x.id)===String(id));
  if(!item)return;
  item.qty += delta;
  if(item.qty<=0) cart=cart.filter(x=>String(x.id)!==String(id));
  saveCart();
}
function clearCart(){cart=[];saveCart();toast("Cart cleared");}

function updateCartUI(){
  const count=cart.reduce((s,x)=>s+x.qty,0);
  document.querySelectorAll("#cartCount,#cartCount2").forEach(e=>e.textContent=count);
  const subtotal=cart.reduce((s,x)=>s+x.price*x.qty,0);
  document.querySelectorAll("#cartSubtotal").forEach(e=>e.textContent=money(subtotal));
  document.querySelectorAll("#cartTotal").forEach(e=>e.textContent=money(subtotal + (count ? SITE_CONFIG.deliveryFee : 0)));
  const box=document.getElementById("cartItems");
  if(box){
    box.innerHTML=cart.length ? cart.map(x=>`
      <div class="cart-item">
        <img src="${escapeHTML(x.image||'images/biryani.jpg')}" alt="">
        <div class="cart-item-info">
          <b>${escapeHTML(x.name)}</b><small>${money(x.price)}</small>
          <div class="qty"><button onclick="changeQty('${x.id}',-1)">−</button><span>${x.qty}</span><button onclick="changeQty('${x.id}',1)">+</button></div>
        </div>
        <strong>${money(x.price*x.qty)}</strong>
      </div>`).join("") : `<div class="empty-cart">🛒<br><b>Your cart is empty</b><br><span>Add something delicious.</span></div>`;
  }
}
function goCheckout(){
  if(!cart.length){toast("Add a food first");return}
  location.href="checkout.html";
}
function toggleCart(){
  const p=document.getElementById("cartPanel");
  if(p)p.classList.toggle("open");
}
function orderOnWhatsApp(){
  if(!cart.length){toast("Add a food first");return}
  const lines=cart.map(x=>`${x.qty} × ${x.name} — ${money(x.price*x.qty)}`).join("\n");
  const total=cart.reduce((s,x)=>s+x.price*x.qty,0)+SITE_CONFIG.deliveryFee;
  const text=`Assalam-o-Alaikum! Portfolio demo order from Lahori Spice.%0A%0A${encodeURIComponent(lines)}%0A%0ATotal: ${encodeURIComponent(money(total))}`;
  window.open(`https://wa.me/${SITE_CONFIG.whatsapp}?text=${text}`,"_blank");
}

function toast(msg){
  const t=document.getElementById("toast");
  if(!t)return;
  t.textContent=msg;t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer=setTimeout(()=>t.classList.remove("show"),2200);
}
function toggleMenu(){
  const m=document.getElementById("mobileMenu");
  if(m)m.classList.toggle("show");
}
function setBrand(){
  document.querySelectorAll("[data-brand]").forEach(e=>e.textContent=SITE_CONFIG.brand);
}

function renderMenu(){
  const grid=document.getElementById("productGrid");
  if(!grid)return;
  const q=(document.getElementById("menuSearch")?.value||"").toLowerCase().trim();
  const data=allProducts().filter(p=>{
    const catOk=activeCategory==="All" || p.category===activeCategory;
    const qOk=!q || `${p.name} ${p.category} ${p.desc}`.toLowerCase().includes(q);
    return catOk && qOk;
  });
  grid.innerHTML=data.map(p=>`
    <article class="product">
      <div class="product-image-wrap">
        <img class="product-img" src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy">
        <span class="food-badge">${escapeHTML(p.badge||"Fresh")}</span>
      </div>
      <div class="product-body">
        <div class="product-top"><div><span class="category-label">${escapeHTML(p.category)}</span><h3>${escapeHTML(p.name)}</h3></div><strong class="price">${money(p.price)}</strong></div>
        <p class="desc">${escapeHTML(p.desc)}</p>
        <button class="add-btn" onclick="addToCart('${p.id}')">+ Add to cart</button>
      </div>
    </article>`).join("") || `<div class="panel"><b>No dishes found.</b><p>Try another search or category.</p></div>`;
  updateCartUI();
}
function filterMenu(btn){
  activeCategory=btn.dataset.category;
  document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  renderMenu();
}

function setupHome(){
  const grid=document.getElementById("featuredGrid");
  if(!grid)return;
  grid.innerHTML=builtInProducts.slice(0,4).map(p=>`
    <article class="feature-card"><img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}">
      <div><span class="category-label">${escapeHTML(p.category)}</span><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.desc)}</p>
      <div class="feature-bottom"><b>${money(p.price)}</b><button class="add-btn" onclick="addToCart('${p.id}')">+ Add</button></div></div>
    </article>`).join("");
}

document.addEventListener("DOMContentLoaded",()=>{
  setBrand();updateCartUI();setupHome();renderMenu();
  const s=document.getElementById("menuSearch");
  if(s)s.addEventListener("input",renderMenu);
});

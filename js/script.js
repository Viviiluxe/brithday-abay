/* PERSONALIZE: ubah PIN dan nama/ucapan di bagian ini. */
const SECRET_PIN = "041026"; // PIN ulang tahun: 041026
const screens = [...document.querySelectorAll(".screen")];
const pin = [];
const dots = [...document.querySelectorAll(".pin-dot")];
const error = document.getElementById("pinError");
function showScreen(id){
  screens.forEach(s=>s.classList.toggle("active",s.id===id));
  window.scrollTo({top:0,behavior:"smooth"});
  if(id==="birthday") startLoveBloom();
}
setTimeout(()=>showScreen("pin"),2400);

function updateDots(){dots.forEach((d,i)=>d.classList.toggle("filled",i<pin.length))}
function enterDigit(d){
  if(pin.length>=6)return;
  pin.push(d);updateDots();error.textContent="";
  if(pin.length===6){
    if(pin.join("")===SECRET_PIN){
      startBirthdayMusic();
      setTimeout(()=>{showScreen("giftScreen");burst(32);loveBurst(window.innerWidth/2,window.innerHeight/2,36)},250);
    }else{
      error.textContent="Hmm, kode belum tepat. Coba sekali lagi ya 💗";
      setTimeout(()=>{pin.length=0;updateDots()},650);
    }
  }
}
document.querySelectorAll("[data-key]").forEach(b=>b.addEventListener("click",()=>{
  const k=b.dataset.key;
  if(k==="clear"){pin.length=0;error.textContent="";updateDots()}
  else if(k==="back"){pin.pop();error.textContent="";updateDots()}
  else enterDigit(k);
}));
document.addEventListener("keydown",e=>{
  if(!document.getElementById("pin").classList.contains("active"))return;
  if(/^[0-9]$/.test(e.key))enterDigit(e.key);
  if(e.key==="Backspace"){pin.pop();updateDots()}
  if(e.key==="Escape"){pin.length=0;updateDots()}
});
const giftTap=document.getElementById("giftTap"),gift=document.getElementById("gift");
let opened=false;
function openGift(){
  if(opened)return;opened=true;gift.classList.add("open");burst(55);loveBurst(window.innerWidth/2,window.innerHeight/2,42);
  setTimeout(()=>{showScreen("birthday");burst(75);loveBurst(window.innerWidth/2,window.innerHeight/2,55)},1050);
}
giftTap.addEventListener("click",openGift);
giftTap.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openGift()}});

function burst(count=24){
  const symbols=["🌸","💗","♡","✿","✨","🌷","💕"];
  for(let i=0;i<count;i++){
    const p=document.createElement("span");p.className="particle";
    p.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    p.style.left=Math.random()*100+"vw";
    p.style.fontSize=(13+Math.random()*17)+"px";
    p.style.animationDuration=(3+Math.random()*3)+"s";
    p.style.animationDelay=(Math.random()*.7)+"s";
    document.body.appendChild(p);setTimeout(()=>p.remove(),7000);
  }
}
document.getElementById("letterBtn").addEventListener("click",()=>{
  const letter=document.getElementById("letter");letter.classList.toggle("show");
  document.getElementById("letterBtn").textContent=letter.classList.contains("show")?"Tutup surat 💌":"Buka surat kecil 💌";
  if(letter.classList.contains("show"))letter.scrollIntoView({behavior:"smooth",block:"nearest"});
});
const hugOverlay = document.getElementById("hugOverlay");
const hugScene = document.getElementById("hugScene");
let hugRainTimer = null;
function makeHugHearts(count=20){
  const symbols=["💗","💕","💖","💞","🩷","🌸","✨","🐾"];
  for(let i=0;i<count;i++){
    const h=document.createElement("span");
    h.className="hug-floating";
    h.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    h.style.setProperty("--left",(Math.random()*95)+"%");
    h.style.setProperty("--size",(14+Math.random()*22)+"px");
    h.style.setProperty("--duration",(2.1+Math.random()*2)+"s");
    hugScene.appendChild(h);
    setTimeout(()=>h.remove(),4500);
  }
}
function openHug(){
  hugOverlay.classList.add("show");
  makeHugHearts(28);
  if(hugRainTimer)clearInterval(hugRainTimer);
  hugRainTimer=setInterval(()=>makeHugHearts(5),850);
  document.getElementById("hugReply").textContent="Peluk balik Humayaa 🤗";
  document.getElementById("hugCaption").textContent="Peluk jauh dulu yaaa, Uda sayanggg! 🐱💕";
}
function closeHug(){
  hugOverlay.classList.remove("show");
  if(hugRainTimer){clearInterval(hugRainTimer);hugRainTimer=null;}
}
document.getElementById("hugBtn").addEventListener("click",openHug);
document.getElementById("hugClose").addEventListener("click",closeHug);
hugOverlay.addEventListener("click",e=>{if(e.target===hugOverlay)closeHug();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&hugOverlay.classList.contains("show"))closeHug();});
document.getElementById("hugReply").addEventListener("click",()=>{
  makeHugHearts(45);
  loveBurst(window.innerWidth/2,window.innerHeight/2,35);
  document.getElementById("hugCaption").textContent="YAYYY! Pelukannya sampaiii! Jangan dilepas duluuu 🥹💗";
  document.getElementById("hugReply").textContent="Sekali lagi! 🫂";
});


/* Uploaded birthday soundtrack */
const birthdayAudio = document.getElementById("birthdayAudio");
const musicBtn = document.getElementById("musicBtn");
let musicPlaying = false;
async function startBirthdayMusic(){
  try {
    birthdayAudio.volume = 0.72;
    await birthdayAudio.play();
    musicPlaying = true;
    musicBtn.textContent = "♫";
    musicBtn.title = "Pause music";
    musicBtn.style.background = "rgba(242,127,168,.4)";
  } catch (err) {
    musicPlaying = false;
    musicBtn.title = "Tap to play the birthday song";
  }
}
musicBtn.addEventListener("click", async () => {
  if (musicPlaying) {
    birthdayAudio.pause();
    musicPlaying = false;
    musicBtn.title = "Play music";
    musicBtn.style.background = "rgba(255,255,255,.07)";
  } else {
    await startBirthdayMusic();
  }
});
/* Attempt autoplay as soon as the page opens. Browsers may block audible autoplay.
   If blocked, start the same soundtrack on the first tap/key anywhere on the page. */
startBirthdayMusic();
function resumeMusicOnFirstInteraction(event){
  if(musicPlaying) return;
  if(event && event.target && event.target.closest && event.target.closest("#musicBtn")) return;
  startBirthdayMusic();
  document.removeEventListener("pointerdown",resumeMusicOnFirstInteraction,true);
  document.removeEventListener("keydown",resumeMusicOnFirstInteraction,true);
  document.removeEventListener("touchstart",resumeMusicOnFirstInteraction,true);
}
document.addEventListener("pointerdown",resumeMusicOnFirstInteraction,true);
document.addEventListener("touchstart",resumeMusicOnFirstInteraction,true);
document.addEventListener("keydown",resumeMusicOnFirstInteraction,true);

/* Photo gallery with IndexedDB auto-save.
   Photos persist after refresh/browser close on this same browser + website origin. */
const photoSlots = [...document.querySelectorAll(".photo-slot")];
const photoUrls = [];
const PHOTO_DB_NAME = "happyBirthdayMemoriesDB";
const PHOTO_STORE_NAME = "photos";
let photoDb = null;

function openPhotoDatabase(){
  return new Promise((resolve,reject)=>{
    if(!("indexedDB" in window)){
      reject(new Error("Browser ini tidak mendukung penyimpanan foto lokal."));
      return;
    }
    const request = indexedDB.open(PHOTO_DB_NAME,1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if(!db.objectStoreNames.contains(PHOTO_STORE_NAME)){
        db.createObjectStore(PHOTO_STORE_NAME,{keyPath:"slot"});
      }
    };
    request.onsuccess = () => { photoDb=request.result; resolve(photoDb); };
    request.onerror = () => reject(request.error || new Error("Database foto gagal dibuka."));
  });
}

function photoTransaction(mode, action){
  return new Promise((resolve,reject)=>{
    if(!photoDb){reject(new Error("Database foto belum siap."));return;}
    const tx=photoDb.transaction(PHOTO_STORE_NAME,mode);
    const store=tx.objectStore(PHOTO_STORE_NAME);
    let request;
    try{request=action(store);}catch(err){reject(err);return;}
    let result;
    if(request){
      request.onsuccess=()=>{result=request.result;};
      request.onerror=()=>reject(request.error);
    }
    tx.oncomplete=()=>resolve(result);
    tx.onerror=()=>reject(tx.error || new Error("Penyimpanan foto gagal."));
    tx.onabort=()=>reject(tx.error || new Error("Penyimpanan foto dibatalkan."));
  });
}

function setPhotoInSlot(index,blob){
  const slot=photoSlots[index];
  if(!slot || !blob)return;
  const img=slot.querySelector("img");
  if(photoUrls[index])URL.revokeObjectURL(photoUrls[index]);
  photoUrls[index]=URL.createObjectURL(blob);
  img.src=photoUrls[index];
  slot.classList.add("has-photo");
}

async function restoreSavedPhotos(){
  try{
    await openPhotoDatabase();
    const saved=await photoTransaction("readonly",store=>store.getAll());
    saved.forEach(item=>setPhotoInSlot(item.slot,item.blob));
  }catch(err){
    console.warn("Foto tersimpan tidak dapat dimuat:",err);
    showPhotoStatus("Penyimpanan foto tidak tersedia di browser ini.");
  }
}

async function savePhotoToDevice(index,file){
  try{
    await openPhotoDatabase();
    await photoTransaction("readwrite",store=>store.put({
      slot:index,
      blob:file,
      fileName:file.name || `kenangan-${index+1}`,
      savedAt:Date.now()
    }));
    setPhotoInSlot(index,file);
    showPhotoStatus("Foto berhasil disimpan otomatis di perangkat ini 💗");
  }catch(err){
    console.error("Gagal menyimpan foto:",err);
    showPhotoStatus("Foto tampil, tetapi gagal disimpan. Coba foto yang lebih kecil.");
  }
}

function showPhotoStatus(message){
  const status=document.getElementById("photoStatus");
  if(status)status.textContent=message;
}

photoSlots.forEach((slot,index)=>{
  const input=slot.querySelector("input");
  const img=slot.querySelector("img");
  input.addEventListener("click",event=>event.stopPropagation());
  input.addEventListener("change",async()=>{
    const file=input.files && input.files[0];
    if(!file)return;
    if(!file.type.startsWith("image/")){
      showPhotoStatus("Pilih file gambar, ya.");
      return;
    }
    if(file.size>12*1024*1024){
      showPhotoStatus("Ukuran foto maksimal 12 MB. Pilih foto yang lebih kecil, ya.");
      input.value="";
      return;
    }
    await savePhotoToDevice(index,file);
  });
  slot.addEventListener("click",event=>{
    if(event.target.closest(".change-tag")){
      event.preventDefault();
      input.click();
      return;
    }
    if(slot.classList.contains("has-photo") && event.target.tagName!=="INPUT"){
      event.preventDefault();
      openPhoto(img.src);
      if (typeof loveBurst === "function") loveBurst(event.clientX, event.clientY, 12);
    }
  });
});

document.getElementById("addAllPhotos").addEventListener("click",()=>{
  const empty=photoSlots.find(slot=>!slot.classList.contains("has-photo"));
  (empty || photoSlots[0]).querySelector("input").click();
});

document.getElementById("clearPhotos").addEventListener("click",async()=>{
  if(!confirm("Hapus semua foto kenangan yang tersimpan di browser ini?"))return;
  try{
    await openPhotoDatabase();
    await photoTransaction("readwrite",store=>store.clear());
    photoSlots.forEach((slot,index)=>{
      const input=slot.querySelector("input");
      const img=slot.querySelector("img");
      if(photoUrls[index])URL.revokeObjectURL(photoUrls[index]);
      photoUrls[index]=null;
      img.removeAttribute("src");
      input.value="";
      slot.classList.remove("has-photo");
    });
    showPhotoStatus("Galeri sudah dikosongkan.");
  }catch(err){
    console.error("Gagal menghapus foto:",err);
    showPhotoStatus("Foto belum berhasil dihapus. Coba lagi.");
  }
});

const lightbox=document.createElement("div");
lightbox.className="photo-lightbox";
lightbox.innerHTML='<button type="button" aria-label="Tutup foto">×</button><img alt="Foto kenangan ukuran besar">';
document.body.appendChild(lightbox);
function openPhoto(src){
  lightbox.querySelector("img").src=src;
  lightbox.classList.add("show");
}
lightbox.addEventListener("click",()=>lightbox.classList.remove("show"));

restoreSavedPhotos();


/* More playful heart bursts: tap/click anywhere on the birthday screen */
function loveBurst(x, y, amount=12) {
  const hearts = ["💗","💕","💖","💘","❤️","♡","💞","✨","🌸","🌷","🌺","🩷"];
  for(let i=0;i<amount;i++){
    const h=document.createElement("span");
    h.className="love-pop";
    h.textContent=hearts[Math.floor(Math.random()*hearts.length)];
    h.style.left=x+"px";h.style.top=y+"px";
    h.style.setProperty("--dx",(Math.random()*220-110)+"px");
    h.style.setProperty("--dy",(Math.random()*-190-35)+"px");
    h.style.setProperty("--rot",(Math.random()*100-50)+"deg");
    h.style.animationDelay=(Math.random()*.18)+"s";
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),1900);
  }
}
/* Continuous blooming hearts and flower petals while the birthday page is open */
let loveBloomTimer = null;
function startLoveBloom(){
  if(loveBloomTimer) return;
  const blooms=["💗","💕","💖","💞","🌸","🌷","🌺","🩷","♡","✨"];
  loveBloomTimer=setInterval(()=>{
    if(!document.getElementById("birthday").classList.contains("active")) return;
    for(let j=0;j<3;j++){
      const h=document.createElement("span");
      h.className="love-float";
      h.textContent=blooms[Math.floor(Math.random()*blooms.length)];
      h.style.left=(Math.random()*96)+"vw";
      h.style.fontSize=(15+Math.random()*22)+"px";
      h.style.animationDuration=(5+Math.random()*4)+"s";
      h.style.animationDelay=(Math.random()*.4)+"s";
      document.body.appendChild(h);
      setTimeout(()=>h.remove(),9500);
    }
  },650);
}
document.getElementById("birthday").addEventListener("pointerdown", e => {
  if(e.target.closest("button, .photo-slot, input")) return;
  loveBurst(e.clientX,e.clientY,22);
});
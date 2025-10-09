// Minimal interactive logic for generating a mock referral link and copying it.
// No external APIs required.

const el = (id) => document.getElementById(id);

const generateBtn = el('generate');
const copyBtn = el('copy');
const resultBlock = el('result');
const resultInput = el('result-input');
const openBtn = el('open-link');
const createLinkBtn = el('create-link');

function slugify(s){
  return String(s || '').trim().toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'').slice(0,32) || 'guest';
}

function makeReferral(name, note){
  const slug = slugify(name);
  const token = Math.random().toString(36).slice(2,9); // only for demo; not used for real security
  const params = new URLSearchParams();
  if (name) params.set('ref', slug);
  if (note) params.set('msg', note.slice(0,120));
  params.set('t', token);
  return `${location.origin}/r/${slug}?${params.toString()}`;
}

generateBtn.addEventListener('click', () => {
  const name = el('name').value || 'Guest';
  const note = el('note').value || '';
  const link = makeReferral(name, note);
  resultInput.value = link;
  resultBlock.hidden = false;
  copyBtn.disabled = false;
});

copyBtn.addEventListener('click', async () => {
  try{
    await navigator.clipboard.writeText(resultInput.value);
    copyBtn.textContent = 'Copied';
    setTimeout(()=> copyBtn.textContent = 'Copy', 1500);
  }catch(e){
    alert('Copy failed. You can manually select and copy the link.');
  }
});

openBtn.addEventListener('click', () => {
  const url = resultInput.value;
  if(url) window.open(url, '_blank', 'noopener');
});

createLinkBtn.addEventListener('click', () => {
  // prefill name with short prompt to help users
  el('name').value = el('name').value || 'YourName';
  el('note').value = el('note').value || 'Try Websim — great prompts + rewards!';
  generateBtn.click();
});


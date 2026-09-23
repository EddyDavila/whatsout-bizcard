import {initializeApp} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import '../help-link.js';
import {protectApp,authError} from '../app-check.js';
import {getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence, browserSessionPersistence} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import {getFunctions, httpsCallable} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-functions.js';

const app = initializeApp({apiKey:'AIzaSyCZMzP5MbhN4S5XqETm6C08kR7vXV6JZ7U',authDomain:'whatsout-fcc29.firebaseapp.com',projectId:'whatsout-fcc29',appId:'1:208246724865:web:b1e51a58667cac884de300'});
protectApp(app);
const auth = getAuth(app);
const functions = getFunctions(app, 'us-central1');
const params = new URLSearchParams(location.search);
const customer = params.get('mode') === 'customer';
const code = params.get('agent');
const status = document.querySelector('#status');
const login = document.querySelector('#login');
if (customer) {
  document.querySelector('#title').textContent = 'Save your referral';
  document.querySelector('#intro').textContent = 'Connect your verified What’s Out account with the agent who introduced you. It will follow your account when you buy a business subscription on Android. User+ purchases are excluded.';
}
await setPersistence(auth, browserSessionPersistence);
login.addEventListener('submit', async (event) => {
  event.preventDefault();
  status.textContent = 'Signing in…';
  try {
    await signInWithEmailAndPassword(auth, document.querySelector('#email').value.trim(), document.querySelector('#password').value);
    document.querySelector('#password').value = '';
  } catch (error) { status.textContent = authError(error); }
});
document.querySelector('#logout').addEventListener('click', () => signOut(auth));
onAuthStateChanged(auth, async (user) => {
  document.querySelector('#logout').hidden = !user;
  login.hidden = !!user;
  document.querySelector('#result').replaceChildren();
  if (!user) { status.textContent = ''; return; }
  if (!user.emailVerified) {
    status.textContent = 'Verify your email in What’s Out, then sign out and sign back in here.';
    return;
  }
  status.textContent = customer ? 'Saving your business referral…' : 'Loading your personal card…';
  try {
    if (customer) {
      if (!/^[a-f0-9]{32}$/.test(code || '')) throw new Error('This referral link is invalid. Ask the agent to show their personal QR again.');
      const response = await httpsCallable(functions, 'claimBizCardReferral')({agentCode:code});
      status.textContent = `Referral saved: ${response.data.agentName}. Use ${user.email} when purchasing your business subscription on Android. Your subscription must be verified and reviewed before commission is eligible.`;
    } else {
      const response = await httpsCallable(functions, 'getSalesBizCard')({});
      const link = document.createElement('a');
      link.href = response.data.url;
      link.className = 'button primary';
      link.textContent = 'Open my personal StepOut card';
      document.querySelector('#result').append(link);
      status.textContent = 'Bookmark your personal card. Select Business Owner to display your attributed QR.';
    }
  } catch (error) { status.textContent = error.message || 'Unable to connect. Please try again.'; }
});

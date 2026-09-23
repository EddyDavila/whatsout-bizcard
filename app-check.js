import {initializeAppCheck,ReCaptchaEnterpriseProvider} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app-check.js';

// Public, domain-restricted site key. Never use a debug token in production.
export function protectApp(app) {
  return initializeAppCheck(app,{
    provider:new ReCaptchaEnterpriseProvider('6Le85cktAAAAADeIIh7uw261Ul51vTPan7ZkV4oN'),
    isTokenAutoRefreshEnabled:true,
  });
}

export function authError(error) {
  const code=error?.code||'';
  if(code.includes('app-check')||code.includes('app-credential'))return 'Security verification failed. Refresh this page and allow Google reCAPTCHA in your browser, then try again.';
  if(code==='auth/network-request-failed')return 'Unable to connect. Check your connection and try again.';
  if(code==='auth/too-many-requests')return 'Too many attempts. Please wait before trying again.';
  if(code==='auth/invalid-email')return 'Enter a complete, valid email address.';
  if(code==='auth/invalid-credential'||code==='auth/wrong-password'||code==='auth/user-not-found')return 'Unable to sign in with these details. Check your email or request a password reset.';
  return `Unable to complete the request. Please try again${code?` (${code})`:''}.`;
}

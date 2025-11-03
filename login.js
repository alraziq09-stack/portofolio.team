/* optional: stop animation after first hover to save CPU */
const btn = document.querySelector('.btn');
btn.addEventListener('mouseleave', () => btn.style.transition = 'none');

/* basic fake-submit for demo */
document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    btn.textContent = 'Signing in…';
    setTimeout(() => {
        btn.textContent = 'Welcome!';
        btn.style.background = 'var(--white)';
        btn.style.color = 'var(--navy)';
    }, 1200);
});
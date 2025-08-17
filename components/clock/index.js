import './style.css';

export default function clockComponent() {
    const el = document.getElementById('clock');
    const date = document.createElement('div');
    const time = document.createElement('div');
    time.textContent = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    time.classList.add('clock-time');
    el.appendChild(time);
    date.textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', weekday: 'short', day: 'numeric' });
    date.classList.add('clock-date');
    el.appendChild(date);
    setInterval(() => {
        time.textContent = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
        date.textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', weekday: 'short', day: 'numeric' });
    }, 1000);
}
import './style.css';


async function brandComponent() {
  const { default: brandComponent } = await import('../components/brand');
  brandComponent();
}
async function scheduleComponent() {
  const { default: scheduleComponent } = await import('../components/functions');
  scheduleComponent();
}
async function menuComponent() {
  const { default: menuComponent } = await import('../components/menu');
  menuComponent();
}
async function clockComponent() {
  const { default: clockComponent } = await import('../components/clock');
  clockComponent();
}

brandComponent();
scheduleComponent();
menuComponent();
clockComponent();   
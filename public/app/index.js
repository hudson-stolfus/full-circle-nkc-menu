import './style.css';


async function brandComponent() {
  const { default: brandComponent } = await import('./brand');
  brandComponent();
}
async function scheduleComponent() {
  const { default: scheduleComponent } = await import('./functions');
  scheduleComponent();
}
async function menuComponent() {
  const { default: menuComponent } = await import('./menu');
  menuComponent();
}
async function clockComponent() {
  const { default: clockComponent } = await import('./clock');
  clockComponent();
}

brandComponent();
scheduleComponent();
menuComponent();
clockComponent();   
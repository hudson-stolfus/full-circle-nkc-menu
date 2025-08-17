import './style.css';

export default function brandComponent() {
    const el = document.getElementById('brand');

    el.addEventListener('click', () => {
        if (document.body.style.animationName === 'disco-mode') {
            document.body.style.animationName = '';
        } else {
            document.body.style.animationName = 'disco-mode';
            document.body.style.animationDuration = '1000ms';
            document.body.style.animationIterationCount = 'infinite';
            document.body.style.animationTimingFunction = 'ease';
        }
    })

    const logo = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    logo.setAttribute('viewBox', '0 0 500 500');
    logo.setAttribute('x', '0px')
    logo.setAttribute('y', '0px');
    logo.setAttribute('width', '500');
    logo.setAttribute('height', '500');
    logo.classList.add('logo');
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const accentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    accentPath.classList.add('logo-accent');
    accentPath.setAttribute('d', 'M276.22,479.11c31.28,0,61.1-6.26,88.29-17.69c-35.61,20.47-76.94,32.13-120.89,32.13C109.07,493.55,0,384.56,0,250S109.07,6.45,243.63,6.45c43.95,0,85.28,11.66,120.89,32.13c-27.19-11.43-57.01-17.69-88.29-17.69C149.7,20.89,47.12,123.47,47.12,250S149.7,479.11,276.22,479.11z');
    group.appendChild(accentPath);
    const mainPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    mainPath.classList.add('logo-main');
    mainPath.setAttribute('d', 'M500,250c0,120.19-97.4,217.6-217.52,217.6c-36.77,0-71.45-9.11-101.81-25.26c26.19,11.74,55.23,18.23,85.74,18.23c116.25,0,210.49-94.32,210.49-210.57S382.67,39.43,266.41,39.43c-30.51,0-59.56,6.49-85.74,18.23c30.36-16.14,65.04-25.26,101.81-25.26C402.6,32.4,500,129.81,500,250z');
    group.appendChild(mainPath);

    const title = document.createElement('div');
    title.classList.add('title');

    const brandName = document.createElement('span');
    brandName.classList.add('brand-name');
    brandName.innerHTML = `Full Circle`;
    title.appendChild(brandName);

    const branch = document.createElement('span');
    branch.classList.add('branch');
    branch.innerHTML = `North Kansas City`;
    title.appendChild(branch);

    logo.appendChild(group);
    el.appendChild(logo);
    el.appendChild(title)
}
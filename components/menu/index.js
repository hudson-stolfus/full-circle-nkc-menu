import './style.css';
import menu from './data.json5';

export default function menuComponent() {
    const el = document.getElementById('menu');

    for (let category of Object.keys(menu)) {
        const section = document.createElement('div');
        section.id = category;
        section.classList.add('menu-section');
        const heading = document.createElement('h2');
        heading.innerText = menu[category].title;
        section.appendChild(heading);

        // const rule = new Image();
        // rule.src = ruleSVG;
        // rule.classList.add('h-rule');
        // section.appendChild(rule);

        for (let item of menu[category].items) {
            let itemEl = document.createElement('div');
            itemEl.classList.add('menu-item');
            // if (!item.stocked) itemEl.classList.add('sold-out');

            let heading = document.createElement('h4');
            heading.classList.add('card-heading');
            let name = document.createElement('div');
            name.classList.add('card-name');
            name.appendChild(document.createTextNode(item.name))
            heading.appendChild(name);
            let price = document.createElement('div');
            price.classList.add('card-price');
            price.textContent = `\$${item.price.toFixed(2)}`;
            heading.appendChild(price);

            let content = document.createElement('div');
            content.classList.add('card-content');
            for (let option of item.options) {
                let optionEl = document.createElement('div');
                optionEl.classList.add('menu-option');

                if (item.quantity !== 1) {
                    let quantityEl = document.createElement("span");
                    quantityEl.innerText = item.quantity;
                    quantityEl.classList.add('option-quantity');
                    optionEl.appendChild(quantityEl);
                }

                optionEl.appendChild(document.createTextNode(option.name));

                let scanLine = document.createElement('div');
                scanLine.classList.add('scan-line');
                optionEl.appendChild(scanLine);

                if (!option.stocked) {
                    let stockEl = document.createElement("span");
                    stockEl.innerText = `Out of Stock`;
                    stockEl.classList.add('option-price');
                    optionEl.appendChild(stockEl);
                } else if (option.price) {
                    let priceEl = document.createElement("span");
                    priceEl.innerText = `+ \$${option.price.toFixed(2)}`;
                    priceEl.classList.add('option-price');
                    optionEl.appendChild(priceEl);
                }

                content.appendChild(optionEl);
            }

            itemEl.appendChild(heading);
            itemEl.appendChild(content);

            section.appendChild(itemEl);
        }

        el.appendChild(section);
    }
}
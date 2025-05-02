function marquee(element, child) {
    if (child >= element.children.length) {
        child = 0;
    }
    element.children[child].scrollIntoView({behavior: 'smooth'});
    setTimeout(() => {
        marquee(element, child + 1);
    }, 5000);
}

fetch('/data/functions.json').then(response => response.json()).then((functions) => {
    const upcoming = document.getElementById('functions-dynamic');
    for (let date of Object.keys(functions)) {
        if (new Date(date) > new Date().setHours(23, 59, 59)) {
            let functionEl = document.createElement('div');
            functionEl.classList.add('card');

            let heading = document.createElement('h4');
            heading.classList.add('card-heading');
            let icon = document.createElement('i');
            icon.setAttribute('data-lucide', functions[date].icon);
            icon.classList.add('card-icon');
            heading.appendChild(icon);
            let name = document.createElement('div');
            name.classList.add('card-name');
            name.appendChild(document.createTextNode(functions[date].name))
            heading.appendChild(name);
            let price = document.createElement('div');
            price.classList.add('card-price');
            price.textContent = `$${functions[date].cost ?? '?'}`;
            heading.appendChild(price);

            let content = document.createElement('div');
            content.classList.add('card-content');
            content.appendChild(document.createTextNode(`${new Date(date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
            })}`));
            content.appendChild(document.createElement('br'));
            content.appendChild(document.createTextNode(functions[date].location));
            functionEl.appendChild(heading);
            functionEl.appendChild(content);
            upcoming.appendChild(functionEl);
        }
    }

    if (upcoming.scrollHeight > upcoming.getBoundingClientRect().height) {
        marquee(upcoming, 0);
    }

    //lucide.createIcons();
});

fetch('/data/menu.json').then(response => response.json()).then((menu) => {
    for (let category of Object.keys(menu)) {
        for (let item of menu[category].items) {
            let itemEl = document.createElement('div');
            itemEl.classList.add('menu-item');
            if (!item.stocked) itemEl.classList.add('sold-out');

            let heading = document.createElement('h4');
            heading.classList.add('card-heading');
            let icon = document.createElement('i');
            icon.setAttribute('data-lucide', item.icon);
            icon.classList.add('card-icon');
            heading.appendChild(icon);
            let name = document.createElement('div');
            name.classList.add('card-name');
            name.appendChild(document.createTextNode(item.name))
            heading.appendChild(name);
            let price = document.createElement('div');
            price.classList.add('card-price');
            price.textContent = `$${item.price.toFixed(2)}`;
            heading.appendChild(price);

            let content = document.createElement('div');
            content.classList.add('card-content');
            content.appendChild(document.createTextNode(item.options.join(', ')));
            itemEl.appendChild(heading);
            itemEl.appendChild(content);
            document.getElementById(category).appendChild(itemEl);

            //lucide.createIcons();
        }
    }
});

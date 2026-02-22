import './style.css';
import functions from './data.json5';
import { createIcons, icons } from 'lucide';

let week_start = new Date();

week_start.setDate(week_start.getDate() - week_start.getDay() + 1);
functions[week_start.toISOString()] = {
    name: "Monday Night Meeting",
    icon: "armchair",
    cost: 0,
    location: "7310 Prairie View Rd, Platte Woods, MO"
};

week_start.setDate(week_start.getDate() - week_start.getDay() + 4);
functions[week_start.toISOString()] = {
    name: "Thursday Night Meeting",
    icon: "armchair",
    cost: 0,
    location: "6601 Royal St, Ste C, Pleasant Valley, MO"
}

function marquee(el, i) {
    if (i >= el.children.length) i = 0;
    // el.scrollLeft = el.children[i].offsetLeft - el.offsetLeft + el.children[i].getBoundingClientRect().width / 2;
    if (window.innerWidth > 500) {
        try {
            el.children[i].scrollIntoView({behavior: 'smooth', inline: 'center'});
        } catch (e) {
            console.error("No functions???????? Thats lame  :(")
        }
    }

    setTimeout(() => {
        marquee(el, i + 1);
    }, 5000);
}

function toICSDate(date) {
    const year   = date.getUTCFullYear();
    const month  = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const day    = ('0' + date.getUTCDate()).slice(-2);
    const hours  = ('0' + date.getUTCHours()).slice(-2);
    const mins   = ('0' + date.getUTCMinutes()).slice(-2);
    const secs   = ('0' + date.getUTCSeconds()).slice(-2);
    return `${year}${month}${day}T${hours}${mins}${secs}Z`;
}

export default function scheduleComponent() {
    const el = document.getElementById('functions');

    // const heading = document.createElement('h2');
    // heading.innerText = "Functions";
    // el.parentNode.insertBefore(heading, el);

    for (let date of Object.keys(functions)) {
        if (new Date(date) > new Date().setHours(0, 0, 0)) {
            let functionEl = document.createElement('div');
            functionEl.classList.add('card');

            functionEl.addEventListener('click', () => {
                let dtEnd = new Date(date);
                dtEnd.setHours(new Date(date).getHours() + 3);
                const icsContent = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nSUMMARY:${functions[date].name}\r\nDESCRIPTION:\$${functions[date].cost}\r\nDTSTART:${toICSDate(new Date(date))}\r\nDTEND:${toICSDate(dtEnd)}\r\nLOCATION:${functions[date].location}\r\nEND:VEVENT\r\nEND:VCALENDAR`;
                const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `fcn_function_${functions[date].name.toLowerCase().replaceAll(' ', '_')}.ics`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });

            if (functions[date].icon) {
                let icon = document.createElement('i')
                icon.className = 'card-icon';
                icon.setAttribute('data-lucide', functions[date].icon);
                // icon.setAttribute('filter', 'url(#dither)');
                functionEl.appendChild(icon);
            }

            let wrapper = document.createElement('div');
            wrapper.classList.add('card-wrapper');

            let heading = document.createElement('div');
            heading.classList.add('card-heading');

            let name = document.createElement('div');
            name.classList.add('card-name');
            name.appendChild(document.createTextNode(functions[date].name))
            heading.appendChild(name);

            if (functions[date].cost !== 0) {
                let price = document.createElement('div');
                price.classList.add('card-price');
                price.textContent = `$${functions[date].cost ?? '?'}`;
                heading.appendChild(price);
            }

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
            functionEl.appendChild(wrapper);
            wrapper.appendChild(heading);
            wrapper.appendChild(content);
            el.appendChild(functionEl);
        }
    }

    createIcons({ icons });

    for (let iconSVG of document.getElementsByClassName('card-icon')) {
        //iconSVG.setAttribute('filter', 'url(#dither)');
    }

    if (el.scrollWidth > el.getBoundingClientRect().width) {
        marquee(el, 0);
    }

}

import './style.css'
import menu from '../menu.json5'
import functions from '../functions.json5'

const functionEl = document.getElementById("function-data");
const menuEl = document.getElementById("menu-data");
 
for (const category in menu) {
    const heading = document.createElement('h3');
    heading.className = 'ou';
    heading.textContent = menu[category].title;

    const newItemBtn = document.createElement('button');
    newItemBtn.className = 'ou-btn';
    newItemBtn.textContent = "+ Item"
    heading.append(newItemBtn);

    const newCategoryBtn = document.createElement('button');
    newCategoryBtn.className = 'ou-btn';
    newCategoryBtn.textContent = "+ Category"
    heading.append(newCategoryBtn)

    menuEl.append(heading)

    for (const item of menu[category].items) {
        for (const option of item.options) {
            const itemEl = document.createElement('div');
            itemEl.className = "entry"

            const itemStocked = document.createElement('input');
            itemStocked.setAttribute('type', 'checkbox');
            itemStocked.checked = option.stocked;
            itemStocked.className = 'stocked';
            itemEl.append(itemStocked);

            const itemCategory = document.createElement('div');
            itemCategory.className = 'category';
            itemCategory.textContent = item.name;
            itemEl.append(itemCategory);

            const itemHeading = document.createElement('div');
            itemHeading.className = 'name';
            itemHeading.textContent = option.name;
            itemEl.append(itemHeading);

            const itemPrice = document.createElement('div');
            itemPrice.className = 'price';
            itemPrice.textContent = "$" + option.price.toFixed(2);
            itemEl.append(itemPrice);

            menuEl.append(itemEl);
        }
    }
}
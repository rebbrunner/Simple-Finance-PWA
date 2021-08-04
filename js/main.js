function hover() {
    el = document.querySelector('nav button');
    el.style.backgroundColor = 'rgb(124, 113, 113)';
}

function stophover() {
    el = document.querySelector('nav button');
    el.style.backgroundColor = 'rgb(63, 207, 63)';
}

function collapse() {
    els = document.querySelectorAll('.nav-link');
    if (els[0].style.display == 'none') {
        els.forEach((el) => {
            el.style.display = 'block';
        });
    } else {
        els.forEach((el) => {
            el.style.display = 'none';
        });
    }
}

function addnew() {
    var etype = 'Deposit'
    var name = document.querySelector('#newName').value;
    var value = document.querySelector('#newVal').value;
    if (value.includes('-')) {
        etype = 'Withdrawal'
    }
    var html = `
    <div class="card">
        <div class="card-header"><span class="etype">${etype}</span></div>
        <div class="card-body">
            <h2 class="card-title">Transaction name: <span class="name">${name}</span></h2>
            <p class="card-text">Amount: $<span class="amount">${value}</span></p>
            <button class="minus" onclick="deleteold(this)">-</button>
        </div>
    </div>
    `
    var newEl = document.createElement('div');
    newEl.classList.add('col');
    newEl.innerHTML = html
    var transactionList = document.querySelector('.row');
    transactionList.appendChild(newEl);

    localStorage.setItem(name, value);

    update();
}

function update() {
    var ttlEl = document.querySelector('.total');
    ttl = 0
    var els = document.querySelectorAll('.amount');
    els.forEach((el)=>{
        val = Number(el.innerText)
        ttl += val;
    });
    ttlEl.innerText = ttl.toString();
}

function deleteold(el) {
    var name = el.parentElement.children[0].children[0].innerText;
    el.parentElement.parentElement.parentElement.remove();
    localStorage.removeItem(name);
    update();
}

window.onload = function() {
    Object.keys(localStorage).forEach(function(key){
        value = localStorage.getItem(key);
        var etype = 'Deposit';
        if (value.includes('-')) {
            etype = 'Withdrawal';
        }
        var html = `
        <div class="card">
            <div class="card-header"><span class="etype">${etype}</span></div>
            <div class="card-body">
                <h2 class="card-title">Transaction name: <span class="name">${key}</span></h2>
                <p class="card-text">Amount: $<span class="amount">${value}</span></p>
                <button class="minus" onclick="deleteold(this)">-</button>
            </div>
        </div>
        `
        var newEl = document.createElement('div');
        newEl.classList.add('col');
        newEl.innerHTML = html
        var transactionList = document.querySelector('.row');
        transactionList.appendChild(newEl);
    });
    update();
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        this.navigator.serviceWorker
            .register('/serviceWorker.js')
            .then(res => console.log('Service worker registered'))
            .catch(err => console.log('Service worker could not be registered', err))
    });
}

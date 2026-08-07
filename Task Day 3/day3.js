const STORAGE_KEY = 'expenseTrackerData';

let expenses = [];

function loadFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            expenses = JSON.parse(stored);
        } catch {
            expenses = [];
        }
    } else {
        expenses = [
            { id: Date.now() + 1, name: 'Makan Siang', amount: 25000 },
            { id: Date.now() + 2, name: 'Belanja Bulanan', amount: 1500000 },
            { id: Date.now() + 3, name: 'Listrik', amount: 500000 },
            { id: Date.now() + 4, name: 'Service AC', amount: 250000 },
            { id: Date.now() + 5, name: 'Ganti Oli', amount: 100000 }
        ];
        saveToStorage();
    }
}

function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

function render() {
    const container = document.getElementById('expenseList');
    const totalEl = document.getElementById('totalAmount');

    if (expenses.length === 0) {
        container.innerHTML = '<div class="empty-msg">Belum ada pengeluaran</div>';
        totalEl.textContent = 'Rp 0';
        return;
    }

    let html = '';
    let total = 0;

    for (let i = 0; i < expenses.length; i++) {
        const item = expenses[i];
        total += item.amount;
        html += `
                    <div class="expense-item" data-id="${item.id}">
                        <div class="left">
                            <span class="name">${escapeHtml(item.name)}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:12px;">
                            <span class="amount">${formatRupiah(item.amount)}</span>
                            <button class="delete-btn" data-id="${item.id}" aria-label="Hapus">✕</button>
                        </div>
                    </div>
                `;
    }

    container.innerHTML = html;
    totalEl.textContent = formatRupiah(total);

    document.querySelectorAll('.delete-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            const id = Number(this.dataset.id);
            deleteExpense(id);
        });
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function addExpense(name, amount) {
    const newExpense = {
        id: Date.now(),
        name: name.trim(),
        amount: amount
    };
    expenses.push(newExpense);
    saveToStorage();
    render();
}

function deleteExpense(id) {
    const index = expenses.findIndex(function(item) {
        return item.id === id;
    });
    if (index !== -1) {
        expenses.splice(index, 1);
        saveToStorage();
        render();
    }
}

function handleSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById('nameInput');
    const amountInput = document.getElementById('amountInput');
    const errorMsg = document.getElementById('errorMsg');

    const name = nameInput.value.trim();
    const amount = Number(amountInput.value);

    if (name === '' || isNaN(amount) || amount <= 0) {
        errorMsg.classList.remove('hidden');
        return;
    }

    errorMsg.classList.add('hidden');

    addExpense(name, amount);

    nameInput.value = '';
    amountInput.value = '';
    nameInput.focus();
}

document.addEventListener('DOMContentLoaded', function() {
    loadFromStorage();
    render();

    const form = document.getElementById('expenseForm');
    form.addEventListener('submit', handleSubmit);

    const nameInput = document.getElementById('nameInput');
    const amountInput = document.getElementById('amountInput');
    const errorMsg = document.getElementById('errorMsg');

    nameInput.addEventListener('input', function() {
        errorMsg.classList.add('hidden');
    });
    amountInput.addEventListener('input', function() {
        errorMsg.classList.add('hidden');
    });
});
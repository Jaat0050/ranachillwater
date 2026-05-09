let prod = 'camper', sub = 'daily', qty = 1, timing = 'before';
function selectProd(p) {
    prod = p;
    document.querySelectorAll('.prod-opt').forEach(e => e.classList.remove('selected'));
    document.getElementById('prod-' + p).classList.add('selected');
    document.getElementById('sub-section').style.display = p === 'camper' ? 'block' : 'none';
    qty = p === 'bulk' ? 10 : 1;
    document.getElementById('qty-num').textContent = qty;
    document.getElementById('qty-label').textContent = p === 'bulk' ? 'Campers की संख्या (min 10)' : 'Campers per day';
    updateTotal();
}
function selectSub(s) {
    sub = s;
    document.getElementById('sub-daily').classList.toggle('active', s === 'daily');
    document.getElementById('sub-monthly').classList.toggle('active', s === 'monthly');
    document.getElementById('monthly-options').style.display = s === 'monthly' ? 'block' : 'none';
    document.getElementById('savings-tag').style.display = s === 'monthly' ? 'block' : 'none';
    updateTotal();
}
function selectTime(t) {
    timing = t;
    document.getElementById('time-before').classList.toggle('active', t === 'before');
    document.getElementById('time-after').classList.toggle('active', t === 'after');
    updateTotal();
}
function changeQty(d) {
    qty = Math.max(prod === 'bulk' ? 10 : 1, qty + d);
    document.getElementById('qty-num').textContent = qty;
    updateTotal();
}
function updateTotal() {
    let total, period;
    if (prod === 'bulk') { 
        total = '₹' + (qty * 30); 
        period = qty + ' campers के लिए'; 
    }
    else if (sub === 'monthly') { 
        total = '₹' + (qty * 20); 
        period = 'per day (pay ' + (timing === 'before' ? 'before' : 'after') + ' month)'; 
    }
    else { 
        total = '₹' + (qty * 20); 
        period = 'per day'; 
    }
    document.getElementById('total-amount').textContent = total;
    document.getElementById('period-tag').textContent = period;
}
function selectPlanAndScroll(plan) {
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        if (plan === 'daily') { selectProd('camper'); selectSub('daily'); }
        else if (plan === 'monthly') { selectProd('camper'); selectSub('monthly'); }
        else if (plan === 'bulk') { selectProd('bulk'); }
    }, 500);
}
function sendOrder() {
    const name = document.getElementById('f-name').value.trim();
    const phone = document.getElementById('f-phone').value.trim();
    const addr = document.getElementById('f-addr').value.trim();
    const time = document.getElementById('f-time').value;
    const pay = document.getElementById('f-pay').value;
    if (!name || !phone || !addr) { alert('कृपया अपना नाम, फोन नंबर और पता भरें।'); return; }
    let planText, totalText;
    if (prod === 'bulk') { 
        planText = 'Wedding / Bulk Order'; 
        totalText = '₹' + (qty * 30) + ' (' + qty + ' campers × ₹30)'; 
    }
    else if (sub === 'monthly') { 
        planText = 'Monthly Plan (' + (timing === 'before' ? 'Pre-payment' : 'Post-payment') + ')'; 
        totalText = '₹' + (qty * 20) + '/day (Only for delivered days)'; 
    }
    else { 
        planText = 'Daily Order'; 
        totalText = '₹' + (qty * 20) + '/day'; 
    }
    const msg = '🪣 *Rana Chill Water — New Order*\n\n' +
        '📦 Plan: ' + planText + '\n' +
        '🔢 Quantity: ' + qty + ' camper(s)\n' +
        '💰 Rate: ' + totalText + '\n' +
        '📝 Note: Charge only for delivery days\n\n' +
        '👤 Name: ' + name + '\n' +
        '📞 Phone: ' + phone + '\n' +
        '📍 Address: ' + addr + '\n' +
        '⏰ Delivery: ' + time + '\n' +
        '💳 Payment: ' + pay + '\n\n' +
        '_Sent via Rana Water website_';
    window.open('https://wa.me/917417662218?text=' + encodeURIComponent(msg), '_blank');
}

// --- UI Enhancements ---

// Intersection Observer for scroll reveal animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Nav background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.padding = '0 5%';
        nav.style.height = '70px';
        nav.style.background = 'rgba(255, 255, 255, 0.9)';
        nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
    } else {
        nav.style.padding = '0 5%';
        nav.style.height = '80px';
        nav.style.background = 'var(--glass-bg)';
        nav.style.boxShadow = 'none';
    }
});

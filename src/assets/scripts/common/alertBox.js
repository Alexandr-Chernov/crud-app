module.exports = () => {
    const yes_btn = document.createElement('button');
    const no_btn = document.createElement('button');
    yes_btn.textContent = "Yes";
    no_btn.textContent = "No";
    const alert_div = document.createElement('div');
    alert_div.textContent = "Are you sure?";
    alert_div.appendChild(yes_btn);
    alert_div.appendChild(no_btn);
    
    return alert_div;
}

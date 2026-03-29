function updateUI(data) {
    document.getElementById("med-name").innerText = data.name;
    document.getElementById("med-stock").innerText = data.stock;
    document.getElementById("med-batch").innerText = data.batch;
    document.getElementById("med-expiry").innerText = data.expiry;

    document.getElementById("med-manufacturer").innerText = data.manufacturer;
    document.getElementById("med-country").innerText = data.country;
    document.getElementById("med-regulator").innerText = data.regulator;

    document.getElementById("med-security").innerText = data.security;
    document.getElementById("med-supply").innerText = data.supply_chain;

    const riskElement = document.getElementById("med-risk");
    riskElement.innerText = data.risk;

    if (data.risk === "Low") {
        riskElement.style.color = "lime";
    } else if (data.risk === "Medium") {
        riskElement.style.color = "orange";
    } else {
        riskElement.style.color = "red";
    }
}
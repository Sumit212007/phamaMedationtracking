let html5QrCode;

function openScanner() {
    const modal = document.getElementById("scannerModal");
    modal.style.display = "flex";

    const resultEl = document.getElementById("result");
    if (resultEl) resultEl.innerText = "";

    html5QrCode = new Html5Qrcode("reader");

    html5QrCode.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: function(viewfinderWidth, viewfinderHeight) {
                return {
                    width: viewfinderWidth,
                    height: viewfinderHeight
                };
            }
        },
        (decodedText) => {
            console.log("Scanned:", decodedText);

            document.getElementById("result").innerText =
                "Scanned: " + decodedText;

            try {
                const data = JSON.parse(decodedText);

                updateUI(data);

                closeScanner(); 
            } catch (error) {
                alert("Invalid QR format");
            }
        },(errorMessage) => {}
    );
}

function stopScanner() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            html5QrCode.clear();
        }).catch(err => console.log(err));
    }
}

function onScanSuccess(decodedText) {
    console.log("Scanned:", decodedText);

    try {
        const data = JSON.parse(decodedText);
        displayData(data);
    } catch (error) {
        alert("Invalid QR format");
    }
}

function closeScanner() {
    document.getElementById("scannerModal").style.display = "none";
    stopScanner();
}

function retryScanner() {
    stopScanner();
    openScanner();
}
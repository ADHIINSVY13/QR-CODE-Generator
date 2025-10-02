document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('qr-form');
    const input = document.getElementById('link-input');
    const qrContainer = document.getElementById('qr-container');
    const message = document.getElementById('message');
    const downloadBtn = document.getElementById('download-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const link = input.value.trim();
        if (!link) return;

        // Check if QR already exists
const existingQR = qrContainer.querySelector('canvas');
if (existingQR) {
    // ✅ Do nothing if a QR is already generated
    return;
}

// Generate QR code using QRCode.js
const qr = new QRCode(qrContainer, {
    text: link,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});


        // Show success message
        message.style.display = 'block';
        message.innerText = `✅ Your QR code for this link is generated!`;

        // Show download button
        downloadBtn.style.display = 'inline-block';
        downloadBtn.onclick = () => {
            const canvas = qrContainer.querySelector('canvas');
            if (!canvas) return;
            const url = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = url;
            a.download = 'qrcode.png';
            a.click();
        };
    });
});
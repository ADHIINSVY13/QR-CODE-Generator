from flask import Flask, render_template, request
import qrcode
import io
import base64

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    qr_img_data = None  # This will store QR code in base64
    if request.method == 'POST':
        link = request.form.get('link')

        # Generate QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=10,
            border=4,
        )
        qr.add_data(link)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")

        # Convert to base64 for displaying in HTML
        buf = io.BytesIO()
        img.save(buf, format="PNG")
        buf.seek(0)
        qr_img_data = base64.b64encode(buf.getvalue()).decode("utf-8")

    return render_template('index.html', qr_img_data=qr_img_data)


import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render provides PORT via env variable
    app.run(host="0.0.0.0", port=port, debug=True)


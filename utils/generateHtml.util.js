// Generate the HTML content for the PDF
exports.generateHTML = (data) => `
    <!DOCTYPE html>
    <html>
    <head>
        <title>PDF Output</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
            }
            .entry {
                border: 1px solid #ccc;
                border-radius: 8px;
                background-color: #f9f9f9;
                padding: 10px;
                margin-bottom: 10px;
                page-break-inside: avoid; 
                padding: 15px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
        </style>
    </head>
    <body>
        ${data.map(item => `
            <div class="entry">
                <p><strong>Full Name:</strong> ${item.fullName}</p>
                <p><strong>Address:</strong> ${item.address}</p>
                <p><strong>Mobile Number:</strong> ${item.mobileNumber}</p>
                <p><strong>Landmark:</strong> ${item.landmark}</p>
                <p><strong>Rider Name:</strong> ${item.riderName}</p>
                <p><strong>Quantity :</strong> ${item.quantity}</p>
            </div>
        `).join('')}
    </body>
    </html>
`;
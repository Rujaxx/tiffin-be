const TiffinModel = require('../models/tiffin.model')
const { generateHTML } = require('../utils/generateHtml.util')
const puppeteer = require('puppeteer');
const stream = require('stream');

exports.getDeliveries = async (req, res) => {
    try {
        // should use indian time zone
        // format should be yyyy-mm-dd
        const date = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })
        const tiffins = await TiffinModel.find({ deletedOn: null, date: date }).lean()
        // add fake entries for  1000 testing
        // const tiffins = []
        // for (let i = 0; i < 100; i++) {
        //     tiffins.push({
        //         _id: i,
        //         fullName: `Name ${i}`,
        //         address: `Address ${i}`,
        //         mobileNumber: `Phone ${i}`,
        //         date: `Date ${i}`,
        //         kitchen: `kitchen ${i}`,
        //         riderName: `Rider Name ${i}`,
        //         landmark: `Landmark ${i}`,
        //         quantity: i
        //     })
        // }
        return res.status(200).json({ message: "Deliveries fetched successfully", data: tiffins })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.assignRider = async (req, res) => {
    try {
        const { selectedItems, riderName } = req.body
        await TiffinModel.updateMany({ _id: { $in: selectedItems } }, { riderName })
        const deliveries = await TiffinModel.find({ _id: { $in: selectedItems }, deletedOn: null }).lean()
        return res.status(200).json({ message: "Rider assigned successfully", data: { deliveries } })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


exports.downloadPdf = async (req, res) => {
    try {
        // Sample data array
        const data = req.body.data
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });;
        const page = await browser.newPage();

        // Generate HTML dynamically
        const htmlContent = generateHTML(data);
        await page.setContent(htmlContent);

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true
        });

        await browser.close();

        const readStream = new stream.PassThrough();
        readStream.end(pdfBuffer);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
        readStream.pipe(res);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('An error occurred while generating the PDF');
    }
}
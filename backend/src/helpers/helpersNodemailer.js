import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
		rejectUnauthorized: false
	}
})

export const sendEmailTiket = async (ticket, productsPurchased, productsOutOfStock) => {
	try {
		const emailContent = {
			from: `CoderMail <${process.env.EMAIL_FROM}>`,
			to: ticket.purchaser,
			subject: 'Resumen de compra',
			html: `
			<div>
                <h1> Resumen de compra </h1>
                <h3> Importe: ${ticket.amount}</h3>
                <hr />
                ${productsPurchased}
                <hr />
                ${productsOutOfStock}
			</div>
			`,
		};

		const mail = await transport.sendMail(emailContent);
		return mail;
	} catch (error) {
        console.log(error)
		return `${error}`;
	}
};
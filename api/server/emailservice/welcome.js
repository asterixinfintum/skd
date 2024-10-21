require('dotenv').config();

import User from '.././models/user';

import send from './send';

const platformname = process.env.PLATFORM

const welcome = ({ email, firstname, userid }) => {
    try {
        const template = {
            giver: `${platformname} <management@skyefinancials`,
            receiver: `${email}`,
            subject: `Welcome to ${platformname}`,
            message: `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Welcome to ${platformname}! Please Confirm Your Email</title>

                    <style>
                        @font-face {
                            font-family: 'Inter';
                            src: url(data:font/woff2;base64,BASE64_ENCODED_INTER_FONT_DATA_HERE) format('woff2');
                            /* Add additional font formats here for broader compatibility */
                        }
                        @font-face {
                            font-family: 'Poppins';
                            src: url(data:font/woff2;base64,BASE64_ENCODED_POPPINS_FONT_DATA_HERE) format('woff2');
                            /* Add additional font formats here for broader compatibility */
                        }

                        body {
                            font-family: 'Inter', Arial, sans-serif;
                            background-color: #f5f5f5;
                            margin: 0;
                            padding: 0;
                        }

                        p {
                            font-size: 14px;
                            color: #333;
                        }

                        .message {
                            padding: 30px 30px;
                        }
                    </style>

                    <!-- Add the Google Fonts link -->
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&family=Poppins:wght@100;200;300;400;500;600&display=swap">
                </head>

                <body class="message">
                    <p>Dear ${firstname},</p>

                    <p>Welcome to <span class="platformname">${platformname}!</span> We're thrilled to have you join our community of valued customers. Our commitment is to provide you with exceptional financial services that meet your needs and exceed your expectations.</p>
                
                    <p>To get started, there's just one small step remaining. Please confirm your email address to ensure secure and uninterrupted access to your new account. This will enable us to keep you informed about important account information and updates.</p>
                
                    <p><a href="${process.env.baseurl}/overview/${userid}?confirm=true">Confirm Email</a></p>
                
                    <p>Once your email is confirmed, you will gain full access to all the features and benefits of your <span class="platformname">${platformname}!</span> account, including:</p>
                
                    <ul>
                        <li>Personalized Online and Mobile Banking</li>
                        <li>24/7 Customer Support</li>
                        <li>Exclusive Financial Products and Offers</li>
                    </ul>
            
                
                    <p>Thank you for choosing <span class="platformname">${platformname}!</span>. We look forward to supporting your financial journey.</p>
                
                    <p>Warm regards,</p>
                
                    <p>The <span class="platformname">${platformname}!</span> Team</p>
                </body>
            </html>
            `

            //<p>If you have any questions or need assistance, our dedicated customer service team is here for you. You can reach us at [Customer Service Email] or [Customer Service Phone Number].</p>
        };

        send({ template })
            .then(async result => {
                console.log("Email sent successfully:", result);
                try {
                    // Use await with findByIdAndUpdate and handle the result with a variable
                    const updatedUser = await User.findByIdAndUpdate(
                        userid,
                        { emailconfirmed: false },
                        { new: true }
                    );

                    // Check if a document was found and updated
                    if (updatedUser) {
                        res.status(201).send({ successmessage: 'User updated successfully' });
                    } else {
                        // If no document was found, updatedUser will be null
                        res.status(404).send({ error: 'No such user' });
                    }
                } catch (err) {
                    // If there's an error in the query, it will be caught here
                    console.error(err, 'error here in user confirm update');
                    res.status(500).send({ error: 'Internal server error' });
                }

            })
            .catch(error => {
                console.error(error.message);
            });
    } catch (error) {
        console.error(error.message);
    }
}

export default welcome;
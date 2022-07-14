// const nodemailer = require("nodemailer");

module.exports.generateOTP = () => {
  let otp = "";
  for (let i = 0; i <= 3; i++) {
    const randomValue = Math.round(Math.random() * 9);
    otp = otp + randomValue;
  }

  return otp;
};

// email response text
// module.exports.responseText = (otp) => {
//   return `
//   <!DOCTYPE html>
//   <html lang="en">
//     <head>
//       <meta charset="UTF-8" />
//       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <title>Document</title>

//       <style>
//         body {
//           min-height: 100vh;
//           min-width: 100vw;
//           display: flex;
//           align-items: center;
//           flex-direction: column;
//           justify-content: center;
//         }
//         .token {
//           background-color: rgb(48, 48, 222);
//           max-width: 100px;
//           padding: 2rem;
//           color: #fff;
//           display: flex;
//           text-align: center;
//           justify-content: center;
//           font-size: 3.5rem;
//           font-weight: bold;
//         }
//       </style>
//     </head>
//     <body>
//       <h2>Thank you for registering with us. Your verification token is:</h2>
//       <p class="token">${otp}</p>
//     </body>
//   </html>
//   `;
// };

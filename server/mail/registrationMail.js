exports.registerMail = (name) => {
    return `
    <!DOCTYPE html>
    <html>
    
    <head>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 14px;
                margin: 0;
                padding: 0;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                color: #333;
            }
    
            img {
                display: block;
                width: 200px;
                margin: auto;
                margin-bottom: 5%;
                border-radius: 5px;
            }
    
            h4 {
                font-size: 18px;
                font-weight: bold;
                padding-left: 10px;
                color: #1a75ff; 
            }
    
            p {
                line-height: 1.6em;
                margin-bottom: 12px;
            }
    
            a {
               
                text-decoration: none;
                font-weight: bold;
            }
    
            a:hover {
                text-decoration: underline;
            }
    
            .wrapper {
                width: 80%;
                max-width: 600px;
                margin: 20px auto;
                background-color: rgba(255, 255, 255, 0.9);
                border: 1px solid #ccc;
                border-radius: 8px;
                overflow: hidden;
            }
    
            .box {
                padding: 20px;
            }
    
            .end {
                text-align: left;
            }
    
            .box-bottom {
                background-color: #1a75ff; 
                color: #fff; 
                padding: 20px;
                text-align: center;
            }
    
            @media screen and (min-width: 600px) {
                .wrapper {
                    width: 60%;
                }
               .img{
                max-width: 100px;
               }
            }
        </style>
    </head>
    
    <body>
        <div class="wrapper">
            <div class="box">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/Institution_of_Engineers_%28India%29_Logo.svg/330px-Institution_of_Engineers_%28India%29_Logo.svg.png" alt="Logo">
                <div>
                    <h4 class="end">Hi ${name} </h4>
                    <p>Thank you for joining the Institution of Engineers NIT Silchar! We're thrilled to welcome you to our community.</p>
                    <p>Your account has been successfully created, and you can now access our exclusive content.</p>
                    <p class="end"><i>This is an automated email. Please do not reply.</i></p>
                </div>
            </div>
            <div class="box-bottom">
                <p>If you have any questions or need assistance, feel free to contact us through direct message on our website or email at <a
                        href="mailto:your-email@example.com">your-email@example.com</a>.</p>
                <p>© Institution of Engineers </p>
            </div>
        </div>
    </body>
    
    </html>`;
  };
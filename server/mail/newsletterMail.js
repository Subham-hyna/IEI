exports.newsletterMail = (style , body) => {
    return `
    <!DOCTYPE html>
    <html>
    
    <head>
        <style>
           ${style}
        </style>
    </head>
    
    <body>
       ${body}
    </body>
    
    </html>`;
  };
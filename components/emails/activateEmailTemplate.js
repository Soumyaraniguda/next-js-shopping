const activateEmailTemplate = (to, url) => {
  return `
    <html>
        <body>
            <h1>Hello Activate your email</h1>
            <a href=${url} target="_blank">Click here </a>
        </body>
    </html>
    `;
};

export default activateEmailTemplate;

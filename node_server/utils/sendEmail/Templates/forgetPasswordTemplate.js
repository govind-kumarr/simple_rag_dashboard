export const forgetPasswordTemplate = (url) => {
    return (
        `<style>
            body {
                font-family: Arial, 
                sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f5f5f5;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
            p {
                color: #666;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
                transition: background-color 0.3s;
            }
            .button:hover {
                background-color: #0056b3;
            }
        </style>
        <body>
            <div class="container">
                <h1>Reset Password</h1>
                <p>Please click the link below to reset your password.</p>
                <a href="${url}" class="button">Reset Password</a>
                <p>Your can only change your password once wiht the help of this link.</p>
            </div>
        </body>`
    )
}
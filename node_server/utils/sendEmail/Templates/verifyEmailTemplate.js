export const verifyEmailTemplate = (url) => {
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
                <h1>Email Verification</h1>
                <p>Congratulations on signing up!</p>
                <p>Please click the button below to verify your email address.</p>
                <a href="${url}" class="button">Verify Email</a>
                <p>If you didn't sign up for an account, you can safely ignore this email.</p>
            </div>
        </body>`
    )
}
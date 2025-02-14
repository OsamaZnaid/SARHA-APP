export const confirmEmailTemplate =({link}={})=>{
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Your Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        table {
            max-width: 600px;
            margin: 20px auto;
            border-spacing: 0;
            border-collapse: collapse;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        td {
            padding: 20px;
            text-align: center;
        }
        .header {
            background-color: #007bff;
            color: #ffffff;
            font-size: 24px;
            font-weight: bold;
        }
        .content {
            color: #555555;
            font-size: 16px;
            line-height: 1.6;
        }
        .button {
            margin-top: 20px;
        }
        .button a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
        }
        .footer {
            background-color: #f4f4f4;
            color: #aaaaaa;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <table>
        <tr>
            <td class="header">
                Confirm Your Email
            </td>
        </tr>
        <tr>
            <td class="content">
                <p>Thank you for signing up! Please confirm your email address by clicking the button below:</p>
                <div class="button">
                    <a href="${link}" target="_blank">Confirm Email</a>
                </div>
                <p>If you did not sign up for this account, please ignore this email.</p>
            </td>
        </tr>
        <tr>
            <td class="footer">
                &copy; 2025 Saraha App. All rights reserved.
            </td>
        </tr>
    </table>
</body>
</html>`
}
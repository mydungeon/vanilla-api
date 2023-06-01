export function FORGOT_PASSWORD_EMAIL(otp) {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>CodePen - OTP Email Template</title>


</head>

<body>
    <!-- partial:index.partial.html -->
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">vanilla</a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>Thank you for choosing vanilla. Use the following OTP to complete your Password Recovery Procedure.
                OTP is valid for 5 minutes</p>
            <h2
                style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">
                ${otp}</h2>
            <p style="font-size:0.9em;">Regards,<br />vanilla</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>vanilla</p>
            </div>
        </div>
    </div>
    <!-- partial -->

</body>

</html>`
}
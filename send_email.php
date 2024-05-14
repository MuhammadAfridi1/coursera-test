<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "MuhammadAfridi@msafridi.studio"; // Change to your desired email address
    $subject = "Message from Website";
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    if (mail($to, $subject, $message, $headers)) {
        echo "<p>Email sent successfully. Thank you for contacting us!</p>";
    } else {
        echo "<p>Failed to send email. Please try again later.</p>";
    }
}
?>

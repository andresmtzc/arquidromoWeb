<?php
if(isset($_POST['email'])) {
     
    // CHANGE THE TWO LINES BELOW
    $email_to = "hola@vivecolmena.com";
     
    $email_subject = "Colmena Website Contact Form";
     
     
    function died($error) {
        // your error code can go here
        echo "Lo sentimos, encontramos los siguientes errores: ";
        echo "<br /><br />";
        echo $error."<br />";
        echo "Por favor regresa y vuelve a intentar.<br /><br />";
        die();
    }
     
    // validation expected data exists
    if(!isset($_POST['first_name']) ||
        !isset($_POST['last_name']) ||
        !isset($_POST['email']) ||
        !isset($_POST['telephone']) ||
        !isset($_POST['comments'])) {
        died('Lo sentimos, pero parece que hay un problema con el formulario de contacto que envió.');       
    }
     
    $first_name = $_POST['first_name']; // required
    $last_name = $_POST['last_name']; // required
    $email_from = $_POST['email']; // required
    $telephone = $_POST['telephone']; // not required
    $comments = $_POST['comments']; // required
     
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'El "Email" que tecleaste no parece ser válido.<br />';
  }
    $string_exp = "/^[A-Za-z .'-áéíóúñÁÉÍÓÚÑüÜ]+$/";

  if(!preg_match($string_exp,$first_name)) {
    $error_message .= 'El "Nombre" que tecleaste no parece ser válido.<br />';
  }
  if(!preg_match($string_exp,$last_name)) {
    $error_message .= 'El "Apellido" que tecleaste no parece ser válido.<br />';
  }
   if(strlen($telephone) < 10) {
    $error_message .= 'El "Celular" que tecleaste no parece ser válido. Asegúrate de tener diez dígitos.<br />';
  }
  if(strlen($comments) < 2) {
    $error_message .= 'El "Mensaje" que tecleaste no parece ser válido.<br />';
  }
  if(strlen($error_message) > 0) {
    died($error_message);
  }
    $email_message = "Form details below.\n\n";
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
     
    $email_message .= "Nombre: ".clean_string($first_name)."\n";
    $email_message .= "Apellido: ".clean_string($last_name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Celular: ".clean_string($telephone)."\n";
    $email_message .= "Mensaje: ".clean_string($comments)."\n";
     
     
// create email headers

$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'Content-Type: text/plain; charset=UTF-8'."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);  

//Redirect user to another page
header('Location: https://vivecolmena.com/gracias'); //Replace email-success.php with the page you want them to be redirected to!
}
?>
<?php

//info@ltsafetyservices.com
$myemail  = "shivang@codeandcore.com";

$imo = $_REQUEST['imo'];
$class    = $_REQUEST['class'];
$port_s  = $_REQUEST['port_s'];
$Postcode  = $_REQUEST['Postcode'];
$eta  = $_REQUEST['eta'];
$etd  = $_REQUEST['etd'];
$job  = $_REQUEST['job'];


$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-type:text/html;charset=utf-8" . "\r\n";
$headers .= 'From: "query@query.com" <$email>';

$message .= "Hello!\r\n";

$message .="Your contact form has been submitted by:\r\n <br />";

$message .="IMO: $imo\r\n <br />";
$message .="CLASS: $class\r\n <br />";
$message .="PORT OF SERVICE : $port_s\r\n <br />";
$message .="ETA: $eta\r\n <br />";
$message .="ETD: $etd\r\n <br />";
$message .="JOB / SERVICE: $job\r\n <br />";

if($_SERVER['REQUEST_METHOD']=='POST'){

    //Getting actual file name
    $name = $_FILES['fileToUpload']['name'];

    //Getting temporary file name stored in php tmp folder 
    $tmp_name = $_FILES['fileToUpload']['tmp_name'];

    //Path to store files on server
    $path = 'uploads/';

    //checking file available or not 
    if(!empty($name)){
        //Moving file to temporary location to upload path 
        move_uploaded_file($tmp_name,$path.$name);
        $message .="http://www.ltsafetyservices.com/uploads/$name\r\n <br />";
        $message .="$name";
    }else{
        //If file not selected displaying a message to choose a file 
        echo "Please choose a file";
    }
}

mail($myemail, "NewQuery", $message, $headers);
require("form.html");

?>
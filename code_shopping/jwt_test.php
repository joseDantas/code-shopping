<?php


$header = [
    'alg' => 'HS256', //HMAC - SHA 256
    'typ' => 'JWT'
];

$header_json = json_encode($header);
$header_base64 = base64_encode($header_json);
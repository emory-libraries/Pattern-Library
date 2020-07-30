<?php

// Get the URL that should be fetched.
$url = isset($_GET['url']) ? $_GET['url'] : false;

//create a function to evaluate the url
function isValidURL($url){
  return preg_match('|^https?://((www\.trumba\.com)|(scholarblogs\.emory\.edu)|(rssmix\.com))/.*$|i', $url);
}

// Handle invalid requests.
if( !$url || !isValidURL ($url)) {
  http_response_code(400);

} else {

  // Initialize proxy request.
  $proxy = curl_init($url);

  // Initialize placeholder for capturing headers.
  $headers = [];

  // Set the proxy's settings.
  curl_setopt($proxy, CURLOPT_FOLLOWLOCATION, true);
  curl_setopt($proxy, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($proxy, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
  curl_setopt($proxy, CURLOPT_HEADERFUNCTION, function( $curl, $header ) use ( &$headers ) {

    // Capture the bitwise size of the header.
    $size = strlen($header);

    // Get the header's key and value.
    $header = array_map('trim', explode(':', $header, 2));

    // Skip invalid headers.
    if( count($header) < 2 ) return $size;

    // Otherwise, save the header.
    $headers[$header[0]] = $header[1];

    // Then, continue.
    return $size;

  });

  // Execute the proxy request, and get the body contents.
  $body = curl_exec($proxy);

  // Get the proxy's status.
  $status = curl_getinfo($proxy);

  // Close the proxy.
  curl_close($proxy);

  // Set a content type header.
  header('Content-Type: application/json');

  // Output a standard response that includes the status code, headers, and body contents.
  echo json_encode([
    'code' => $status['http_code'],
    'status' => $status,
    'headers' => $headers,
    'body' => $body
  ]);

}

?>

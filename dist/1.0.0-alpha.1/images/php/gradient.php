<?php

// gradient.php
//              ?direction=bottom [!optional]
//              &colors=red,orange,yellow,green,blue,purple
//              &width=800
//              &height=800

function imagegradientrect( $image, $width, $height, $direction, $colors ) {

		// Initialize the start and end coordinates.
    $x = [0, $width];
    $y = [0, $height];

    // Determine which axis the gradient should use.
    $axis = in_array($direction, ['top', 'bottom']) ? 'y' : 'x';

    // Initialize a utility method for converting HEX colors to RGB.
    $hex2rgb = function( $hex ) {
      return [
        hexdec(substr($hex,0,2)),
  			hexdec(substr($hex,2,2)),
  			hexdec(substr($hex,4,2))
      ];
    };

    // Convert the colors to RGB values.
    $colors = array_map($hex2rgb, $colors);

    // Initialize color chunks consisting of start/end combination within the gradient.
    $chunks = [];

    // Chunk the colors into start and end points.
    for( $i = 0; $i < count($colors) - 1; $i++ ) {

      // Get the start and end colors for this chunk.
      $chunks[] = [
        $colors[$i],
        $colors[$i + 1]
      ];

    }

    // Calculate the total number of steps.
    $total = ${$axis}[1] - ${$axis}[0];

    // Calculate the number of steps per color.
    $steps = round($total / count($chunks));

    // Initialize an index at the first step.
    $i = 0;

    // Initialize an array for capturing the gradient definitions as it's generated.
    $gradient = [];

    // For each chunk, generate its corresponding part in the gradient.
    foreach( $chunks as $n => $chunk ) {

      // Get the start and end colors for the given chunk.
      $start = $chunk[0];
      $end = $chunk[1];

      // Calculate the minimum and maximum number of steps that this chunk should use.
      $min = $i;
      $max = $n == count($chunks) - 1 ? $total : $steps * ($n + 1);

      // Initialize an index for keeping track of the loop number.
      $loop = 0;

      // Generate the chunk's steps within the gradient.
      for( $i; $i <= $max; $i++ ) {

        // Get the RGB values for this step.
        $r = $start[0] - (($start[0] - $end[0]) / ($max - $min) * $loop);
        $g = $start[1] - (($start[1] - $end[1]) / ($max - $min) * $loop);
        $b = $start[2] - (($start[2] - $end[2]) / ($max - $min) * $loop);

        // Generate the color for the current step.
        $color = imagecolorallocate($image, $r, $g, $b);

        // Compile filled rectangle arguments.
        $fill = [
          $image,
          $axis == 'x' ? $x[0] + $i : $x[0],
          $axis == 'y' ? $y[0] + $i : $y[0],
          $axis == 'x' ? $x[1] + $i : $x[1],
          $axis == 'y' ? $y[1] + $i : $y[1],
          $color
        ];

        // Save the color to the overall gradient.
        imagefilledrectangle(...$fill);

        // Save the color to the gradient's definition.
        $gradient[] = [$r, $g, $b];

        // Increment the loop number.
        $loop++;

      }

      // Increment the index to the next step after max, and continue building the gradient.
      $i = $max + 1;

    }

    // Return.
    return true;

	}

  // Get the image width and height.
  $width = isset($_GET['width']) ? $_GET['width'] : 500;
  $height = isset($_GET['height']) ? $_GET['height'] : 500;

  // Generate the image.
  $image = imagecreatetruecolor($width, $height);

  // Get the image direction,colors, and stops.
  $direction = isset($_GET['direction']) ? $_GET['direction'] : 'right';
  $colors = preg_split('/[,;]/', $_GET['colors']);

  // Validate the direction, or use a default.
  if( !in_array($direction, ['right', 'left', 'bottom', 'top']) ) $direction = 'right';

  // Validate the colors, and always force at least 2 color values.
  if( count($colors) === 1 ) $colors[1] = $colors[0];

  // For top and left directions, reverse the colors.
  if( in_array($direction, ['top', 'left']) ) $colors = array_reverse($colors);

  // Generate the gradient image.
  imagegradientrect($image, $width, $height, $direction, $colors);

  // Set the headers to display an image.
  header('Content-Type: image/png');

  // Display the image.
  imagepng($image);

?>

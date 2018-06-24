<!DOCTYPE html>
<html>
<head>
	<title><?php echo date("H:i:s")?>|tempEngine Compiler</title>
</head>
<body>
<?php
	$time = -microtime(true);

  echo "Start Compiling at ".date("d.m.Y, H:i:s | U")."<br>";
	
	$version = file_get_contents("version.txt");
	$version++;
	
  $dir = array_diff(scandir("src/"), array('..', '.'));
	$out = "// BUILD: $version \n// Compiled: ".date("d.m.Y, H:i:s | U")."\n\nbuild = $version+' | ".date("d.m.y, H:i:s | U")." (PHPCompiler)'\n\n";
	echo "Including Files: <select><option>-=List of included files=-";
	foreach ($dir as $x) {
		echo "<option>".$x."</option>";
		$out .=  "//File: $x\n\n".file_get_contents("src/$x")."\n\n";
	}
	file_put_contents("a.js",$out);
	file_put_contents("version.txt",$version);
	$time += microtime(true);
	echo "</select><br>Script compiled without error! Time: ".round($time,4)." s ; Filesize: ".strlen($out)." bytes<br>";
	echo "<textarea style='width: 100%;height: 512px;'>$out</textarea>";
?>
</body>
</html>
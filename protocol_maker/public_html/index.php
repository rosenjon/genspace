<?php
require '../vendor/autoload.php';

$parameters = Doctrine\OrientDB\Binding\BindingParameters::create('http://admin:admin@localhost/genspace');

$orient = new Doctrine\OrientDB\Binding\HttpBinding($parameters);

$query = "select * from materials";
$output = $orient->query($query, -1, '*:1');
$materials = $output->getResult();

$tools_query = "select * FROM tools";
$output = $orient->query($tools_query, -1, '*:1');
$tools = $output->getResult();

//echo "<pre>"; var_dump($materials); echo "</pre>";
require '../views/index.html';
?>

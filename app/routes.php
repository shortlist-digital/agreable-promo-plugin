<?php
namespace AgreablePromoPlugin;

$router->get([
    'as'   => 'calaisDomain',
    'uri'  => '/api/calais-domain',
    'uses' => function() {
      return json_encode(getenv('CALAIS_DOMAIN'));
    }
]);
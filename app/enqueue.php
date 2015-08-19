<?php namespace AgreablePromoPlugin;

/** @var \Herbert\Framework\Enqueue $enqueue */

$enqueue->admin([
  'as'     => 'adminJS',
  'src'    => Helper::assetUrl('passport-admin.js'),
  'filter' => [ 'postType' => 'promo' ]
], 'footer');


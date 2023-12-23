<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{config('app.name')}}</title>
    <meta name="shopify-api-key" content="{{config('shopify-app.api_key')}}" />
    <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>

    @viteReactRefresh
    @vite('resources/js/index.jsx')
</head>
<body>


</body>
</html>

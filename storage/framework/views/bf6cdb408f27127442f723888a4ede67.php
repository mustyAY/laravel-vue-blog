<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>ًApplication</title>
        <!-- <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"> -->
        <script src="https://kit.fontawesome.com/c8e4d183c2.js" crossorigin="anonymous"></script>

        <?php echo app('Illuminate\Foundation\Vite')('resources/css/app.css'); ?>
    </head>
    <body>
       
        <div id="app"></div>

        <?php echo app('Illuminate\Foundation\Vite')('resources/js/app.js'); ?>
    </body>
</html><?php /**PATH /Users/user/blog-posts/resources/views/app.blade.php ENDPATH**/ ?>
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\PostController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/me/posts', [PostController::class, 'userPosts']);
Route::get('/me/posts/{post}', [PostController::class, 'userPost'])->middleware(\App\Http\Middleware\PostMiddleware::class);

require __DIR__.'/post.php';

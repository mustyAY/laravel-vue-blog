<?php

use \App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/me/posts', [PostController::class, 'userPosts']);
Route::get('/me/posts/{post}', [PostController::class, 'userPost'])->middleware([\App\Http\Middleware\PostMiddleware::class]);
Route::post('/posts/{post}/like', [PostController::class, 'like']);
Route::post('/posts/{post}/unlike', [PostController::class, 'unlike']);

Route::resource('posts', PostController::class)->except(['create', 'edit']);



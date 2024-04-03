<?php

use Illuminate\Support\Facades\Route;

Route::prefix('__cypress__')->group(function () {
    Route::get('/refresh_database', [\App\Http\Controllers\CypressController::class, 'refreshDatabase']);
});

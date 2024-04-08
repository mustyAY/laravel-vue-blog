<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class CypressController extends Controller
{
    public function refreshDatabase()
    {
        Artisan::call('migrate:fresh', [
            '--seed' => true
        ]);
    }
}

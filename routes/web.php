<?php

use App\Http\Controllers\GroupController;
use Illuminate\Support\Facades\Route;

Route::middleware(['verify.shopify'])->group(function () {
    Route::view('/', 'app')->name('home');
});


// Great! This is our api list that we will sent to our theme app extension
Route::group(['middleware' => ['auth.proxy']], function () {

    Route::group(['prefix' => '/proxy'], function () {

        Route::get('/available-groups-id', [GroupController::class, 'get_available_groups_id'])->name('group.index');
        Route::get('/group/{group}', [GroupController::class, 'groups_with_faq'])->name('group.index');


    });

});

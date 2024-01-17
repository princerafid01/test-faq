<?php

use App\Http\Controllers\GroupController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['verify.shopify'])->group(function () {
    Route::view('/', 'app')->name('home');
    Route::post('products', fn () => response()->json(['msg' => 'Hello Rafid! You have done it!']));


});


// Great! This is our api list that we will sent to our theme app extension
Route::group(['middleware' => ['auth.proxy']], function () {

    Route::group(['prefix' => '/proxy'], function () {

        Route::get('/available-groups-id', [GroupController::class, 'get_available_groups_id'])->name('group.index');
        Route::get('/group/{group}', [GroupController::class, 'show'])->name('group.index');


    });

});

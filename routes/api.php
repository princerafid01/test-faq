<?php

use App\Http\Controllers\FaqController;
use App\Http\Controllers\GroupController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['verify.shopify']], function () {

    Route::get('/groups', [GroupController::class, 'index'])->name('group.index');
    Route::post('/groups', [GroupController::class, 'store'])->name('group.save');
    Route::get('/groups/{group}', [GroupController::class, 'show'])->name('group.show');
    Route::delete('/groups/{group}', [GroupController::class, 'destroy'])->name('group.destroy');

    Route::get('/faqs/{groupid}', [FaqController::class, 'index'])->name('group.faqs');
    Route::get('/faq/{faq}', [FaqController::class, 'show'])->name('group.faqs.show');
    Route::delete('/faq/{faq}', [FaqController::class, 'delete'])->name('group.faqs.delete');
    Route::post('/faqs/{groupid}', [FaqController::class, 'store'])->name('group.faqs.save');
    Route::put('/toggle-faq', [FaqController::class, 'toggle_faq'])->name('group.faq.toggle');

    // Route::get('/settings', [\App\Http\Controllers\SettingController::class, 'page'])
    //     ->name('setting.index');

    // Route::post('/settings', [\App\Http\Controllers\SettingController::class, 'store'])
    //     ->name('setting.store');

});

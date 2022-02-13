<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BoardController;
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

Route::post('register' ,[AuthController::class,'register']);

Route::post('login' ,[AuthController::class,'login'])->name('login');

Route::middleware('auth:sanctum')->group(function() {

    Route::get('/checklogin', function() {
        return response()->json(["message"=>'logged in','status'=>200],200);
    });

    Route::post('logout', [AuthController::class,'logout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/test',[BoardController::class,"Test"]);
Route::post('/board/show',[BoardController::class,"BoardShow"]);
Route::post('/show/comment/{board_id}',[BoardController::class,"ShowComment"]);
Route::post('/post/comment',[BoardController::class,"PostComment"]);

<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['namespace' => 'Api', 'as' => 'api.'], function(){
    Route::resource('categories', 'CategoryController', ['except' => ['create', 'edit']]);     //except foi usado para tirar a opção de "Create e Edit'  da criação do recurso Categories pois não eram necessários
    Route::resource('products', 'ProductController', ['except' => ['create', 'edit']]);
    Route::resource('products.categories', 'ProductCategoryController', ['only' => ['index', 'store', 'destroy']]);
    Route::resource('inputs', 'ProductInputController', ['only' => ['index', 'store', 'show']]);
});
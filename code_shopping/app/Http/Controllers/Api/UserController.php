<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\UserRequest;
use CodeShopping\Http\Resources\UserResource;
use CodeShopping\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::paginate();
        return UserResource::collection($users);
    }

    public function store(UserRequest $request)
    {
        $user = User::createCustom($request->all());
        return new UserResource($user);
    }

    public function show(User $user)
    {
        return new UserResource($user); //retorna uma nova instancia do resource, passando o usuario que ja está sendo recebido aqui.
    }

    public function update(Request $request, $id)
    {

    }


    public function destroy($id)
    {

    }
}

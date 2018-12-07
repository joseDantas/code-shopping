<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Commom\OnlyTrashed;
use CodeShopping\Http\Requests\UserRequest;
use CodeShopping\Http\Resources\UserResource;
use CodeShopping\Models\User;
use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;

class UserController extends Controller
{
    use OnlyTrashed;


    public function index(Request $request)
    {
        $query = User::query();
        $query = $this->onlyTrashedIfRequest($request, $query);
        $users = $query->paginate(10);
        return UserResource::collection($users);
    }

    public function store(UserRequest $request)
    {
        $user = User::create($request->all());
        return new UserResource($user);
    }

    public function show(User $user)
    {
        return new UserResource($user); //retorna uma nova instancia do resource, passando o usuario que ja está sendo recebido aqui.
    }

    public function update(UserRequest $request, User $user)
    {
        $user->fill($request->all());
        $user->save();
        return new UserResource($user);
    }


    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([],204);
    }
}

<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Commom\OnlyTrashed;
use CodeShopping\Events\UserCreateEvent;
use CodeShopping\Http\Filters\UserFilter;
use CodeShopping\Http\Requests\UserRequest;
use CodeShopping\Http\Resources\UserResource;
use CodeShopping\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;

class UserController extends Controller
{
    use OnlyTrashed;


    public function index(Request $request)
    {
        /**@var UserFilter $filter */
        $filter = app(UserFilter::class);
        /** @var Builder $filterQuery */
        $filterQuery = User::filtered($filter);
        $users = $request->has('all')? $filterQuery->get() : $filterQuery->paginate(5);
        return UserResource::collection($users);
    }

    public function store(UserRequest $request)
    {
        $user = User::create($request->all());
        event(new UserCreateEvent($user));
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

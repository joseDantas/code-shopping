<?php

namespace CodeShopping\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    //campo relembrar  senha Login
    protected $hidden = [
        'password', 'remember_token',
    ];


    public static function createCustom($attributes = array())
    {
        //Se não tiver password , (!isset($attributes['password']) ?)não faz nada
        //Se tiver vai fazer a atribuição (: $attributes['password'] = bcrypt($attributes['password']);)
        !isset($attributes['password']) ?: $attributes['password'] = bcrypt($attributes['password']);
        return parent::create($attributes);
    }
}

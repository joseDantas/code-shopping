<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable, SoftDeletes;

    protected $dates = ['deleted_at'];
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

    public function fill(array $attributes)
    {
        //Se não tiver password , (!isset($attributes['password']) ?)não faz nada
        //Se tiver vai fazer a atribuição (: $attributes['password'] = bcrypt($attributes['password']);)
        !isset($attributes['password']) ?: $attributes['password'] = bcrypt($attributes['password']);
        return parent::fill($attributes); // TODO: Change the autogenerated stub
    }


}

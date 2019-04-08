<?php

namespace CodeShopping\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        return [
            'name' => 'required|max:255',
            'email' => 'required|max:255|email|unique:users,email', //metodo que impossibilita o cadstro do mesmo email
            'password' => 'required|min:4|max:16',
        ];
    }
}
//comando unique no 'email' requer o nome da tabela e o campo, para saber onde deve ser retringido
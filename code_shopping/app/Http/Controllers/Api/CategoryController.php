<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Filters\CategoryFilter;
use CodeShopping\Http\Requests\CategoryRequest;
use CodeShopping\Http\Resources\CategoryResource;
use CodeShopping\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index(Request $request)
    {
        /**@var CategoryFilter $filter */
        $filter = app(CategoryFilter::class);
        /** @var Builder $filterQuery */
        $filterQuery = Category::filtered($filter);
        $categories = $request->has('all')? $filterQuery->get() : $filterQuery->paginate(15);
        return CategoryResource::collection($categories); // 'CategoryResource' serve para personlizar os dados
    }

    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->all());
        $category -> refresh();
        return new CategoryResource($category);
    }

    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    public function update(CategoryRequest $request, Category $category)
    {
        $category->fill($request->all()); //Método fill recebe um  array das informações que querem ser atualizadas
        $category->save();
        return new CategoryResource($category);
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json([], 204);
    }
}

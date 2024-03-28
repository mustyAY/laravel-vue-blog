<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller implements HasMiddleware
{
    /**
     * Get the middleware that should be assigned to the controller.
     */
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $post = Post::where('status', 'published')->orderBy('created_at', 'DESC')->paginate(10);

        return response()->json($post);
    }

    public function userPosts(UpdatePostRequest $request): JsonResponse
    {
        $post = $request->user()->posts()->orderBy('created_at', 'DESC')->paginate(10);

        return response()->json($post);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request): JsonResponse
    {
        $photo = $request->file('photo')?->storePublicly('post-pictures');

        $post = new Post($request->safe()->all());
        $post->photo_path = $photo;

        $request->user()->posts()->save($post);

//        $post->refresh();

        return response()->json($post, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        if ($post->status !== 'published') return response()->json([
            'status' => 'error',
            'message' => 'Post Not Found',
        ], 404);

        return response()->json($post);
    }

    public function userPost(UpdatePostRequest $request, Post $post)
    {
        return response()->json($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post): JsonResponse
    {
        $photo = $request->file('photo')?->storePublicly('post-pictures');
        $oldPhotoPath = $post->photo_path;
        if ($photo) {
            Storage::delete($oldPhotoPath);
            $post->photo_path = $photo;
        }

        $post->update($request->safe()->all());

        return response()->json($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UpdatePostRequest $request, Post $post): JsonResponse
    {
        $post->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Post Deleted Successfully!'
        ], 200);
    }
}

<?php

namespace App\Http\Requests;

use App\Models\Post;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UpdatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->id === $this->post->user_id || $this->user()->role === 'admin';
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        if ($this->title) {
            $this->merge([
                'slug' => Str::slug($this->title),
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['nullable', 'string', Rule::unique(Post::class)->ignore($this->post->id)],
            'slug' => ['nullable', 'string', Rule::unique(Post::class)->ignore($this->post->id)],
            'description' => ['nullable', 'string'],
            'body' => ['nullable', 'string'],
            'photo' => ['nullable', 'image', 'dimensions:min_width=100,min_height=100,max_width=1080,max_height=1080', 'max:512'],
            'status' => ['nullable', Rule::in(['draft', 'published'])],
        ];
    }
}

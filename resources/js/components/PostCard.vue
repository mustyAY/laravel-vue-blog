<template>
    <article
{{ $attributes->merge(['class' => 'transition-colors duration-300 hover:bg-gray-100 border border-black border-opacity-0 hover:border-opacity-5 rounded-xl']) }} >
    <div class="py-6 px-5 lg:flex flex-col">
        <div class="flex-1 lg:mr-8">
            <img src="./images/illustration-1.png" alt="Blog Post illustration" class="rounded-xl">
        </div>

        <div class="flex-1 flex flex-col justify-between">
            <header class="mt-8 lg:mt-0">
                <!-- <div class="space-x-2">
                            <a href="#" class="px-3 py-1 border border-blue-300 rounded-full text-blue-300 text-xs uppercase font-semibold" style="font-size: 10px">Techniques</a>

                            <a href="#" class="px-3 py-1 border border-red-300 rounded-full text-red-300 text-xs uppercase font-semibold" style="font-size: 10px">Updates</a>
                        </div> -->

                <div class="mt-4">
                    <h1 class="text-3xl">
                            <span class="cursor-not-allowed text-gray-300">        
                                {{ $job->title }}
                            </span>
                            <span class="text-gray-500">
                                Expired!
                            </span>
                            <a href="/jobs/{{ $job->id }}"
                            class="hover:underline"
                            >
                                {{ $job->title }}
                            </a>
                    </h1>

                    <span class="mt-2 block text-gray-400 text-xs">
                        Published <time>{{ $job->created_at->diffForHumans() }}</time>
                    </span>
                </div>
            </header>

            <div class="text-sm mt-2">
                    {!! $job->excerpt !!}
            </div>

            <footer class="flex justify-between items-center mt-8">
                <div class="flex items-center text-sm">
                    <img src="https://i.pravatar.cc/60?u={{ $job->lister->id }}" class="rounded-xl" alt="Lary avatar">
                    <a href="/users/{{ $job->lister->id }}">
                            <div class="ml-3">
                                <h5 class="font-bold">{{ $job->lister->name }}</h5>
                            </div>
                        </a>
                </div>

                <div class="hidden lg:block">
                    <a href="/jobs/{{ $job->id }}" class="transition-colors duration-300 text-xs font-semibold bg-gray-200 hover:bg-gray-300 rounded-full py-2 px-8">Read More</a>
                </div>
            </footer>
        </div>
    </div>
</article>
</template>
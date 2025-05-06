<script>
    let { text, onclick } = $props();
</script>

<button
    class="bg-primary text-primary-foreground shadow hover:bg-zinc-200 h-10 px-4 py-2
    inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm
    font-medium transition-colors focus-visible:outline-none focus-visible:ring-1
    focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
    [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-2"
    {onclick}>{text}</button
>

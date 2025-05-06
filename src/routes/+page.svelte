<script lang="ts">
    import { onMount } from "svelte"; // Need onMount
    import Button from "./button.svelte";
    import Uwuifier from "uwuifier";
    import Settings from "./settings.svelte";

    // Import the *URL* of the script file using Vite's ?url suffix
    import mispellScriptUrl from "$lib/mispell.js?url";

    import toast, { Toaster } from "svelte-french-toast";

    import { textProcessorSettings } from "$lib/settingsStore.svelte";

    let to_uwu = $state("");
    let mispellError = $state<string | null>(null);
    let isMispellReady = $state(false); // Track if the script has loaded and the global is ready

    // Reference to the global mispell object (assuming it creates window.mispell)
    let mispellGlobal: any = null;

    onMount(() => {
        // This code runs only in the browser after the component mounts

        // Check if the script is already loaded (e.g., by another instance of this component)
        // or if window.mispell was somehow defined already
        if (typeof window.mispell !== "undefined") {
            mispellGlobal = window.mispell;
            isMispellReady = true;
            console.log("Mispell global already exists.");
            return; // Exit early
        }

        // Check if script tag already added to prevent duplicates if component re-mounts weirdly
        if (document.querySelector(`script[src="${mispellScriptUrl}"]`)) {
            console.log(
                "Mispell script tag already added, waiting for load potentially.",
            );
            // Consider adding a listener or timeout here if needed, but often
            // the check for window.mispell covers it.
            return;
        }

        console.log(`Loading mispell script from URL: ${mispellScriptUrl}`);
        const script = document.createElement("script");
        script.src = mispellScriptUrl;
        script.defer = true; // Or async=true, defer is often good here

        script.onload = () => {
            // Script has loaded and executed
            console.log("Mispell script loaded.");
            if (typeof window.mispell !== "undefined") {
                mispellGlobal = window.mispell;
                isMispellReady = true;
                console.log("Mispell global is now ready:", mispellGlobal);
            } else {
                console.error(
                    "Mispell script loaded, but window.mispell was not found!",
                );
                mispellError = "Mispell loaded but failed to initialize.";
            }
        };

        script.onerror = (event) => {
            console.error("Failed to load mispell script:", event);
            mispellError = `Failed to load mispell script from ${mispellScriptUrl}`;
        };

        // Append the script to the document's head (or body)
        document.head.appendChild(script);

        // Optional: Cleanup function to remove script if component is destroyed
        // This might or might not be desirable depending on if you want the
        // library to persist even if the component is removed.
        // return () => {
        //     const existingScript = document.querySelector(`script[src="${mispellScriptUrl}"]`);
        //     if (existingScript) {
        //         existingScript.remove();
        //         console.log("Cleaned up mispell script tag.");
        //     }
        // };
    });

    const uwuifier = new Uwuifier(textProcessorSettings.uwuifierSettings);

    function getProcessedText(): string {
        const text = to_uwu;
        const settings = textProcessorSettings;

        if (settings.selectedMode === "uwuify") {
            return uwuifier.uwuifySentence(text);
        } else if (settings.selectedMode === "mispell") {
            if (mispellError) {
                return `Error: ${mispellError}`;
            }
            // Use the state variable 'isMispellReady'
            if (!isMispellReady || !mispellGlobal) {
                return "Loading mispell library...";
            }
            try {
                // Use the global object stored in mispellGlobal
                if (typeof mispellGlobal.bimbofy === "function") {
                    return mispellGlobal
                        .bimbofy(
                            text,
                            1 - (settings.mispellSettings.iq - 50) / 100, // mispell expects 0.0 to 1.0
                        )
                        .toString();
                } else {
                    console.error("mispellGlobal:", mispellGlobal);
                    return "Error: 'bimbofy' function not found in mispell global.";
                }
            } catch (error) {
                console.error("Error using mispell.bimbofy:", error);
                return `Error processing with mispell`;
            }
        } else {
            return text;
        }
    }

    function copy() {
        navigator.clipboard
            .writeText(uwuified)
            .then(() => {
                toast.success("Copied Text!");
            })
            .catch((err) => {
                toast.error("Failed to copy text");
            });
    }

    let uwuified = $derived(getProcessedText());
</script>

<Toaster />

<main class=" p-2 min-h-screen w-screen">
    <div class="flex w-full h-[calc(100vh-1rem)]">
        <div class="w-full">
            <div class="flex justify-between pr-2">
                <h1 class="font-display font-bold text-4xl">Text Processor</h1>
                <Button text="Copy" onclick={copy} />
            </div>

            <div class="flex w-full h-[calc(100vh-5rem)]">
                <div class="basis-1/2 p-2">
                    <p>Input</p>
                    <textarea
                        class="w-full h-full resize-none border-2 rounded-md p-1"
                        bind:value={to_uwu}
                    ></textarea>
                </div>
                <div class="w-1 h-full"></div>
                <div class="basis-1/2 p-2">
                    <p>Processed</p>
                    <textarea
                        class="w-full h-full resize-none border-2 rounded-md p-1"
                        value={uwuified}
                        readonly
                    ></textarea>
                </div>
            </div>
        </div>
        <div class="w-lg border-l pl-2"><Settings></Settings></div>
    </div>
</main>

<style>
    :root {
        font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;

        color: #0f0f0f;
        background-color: #f6f6f6;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
    }
</style>

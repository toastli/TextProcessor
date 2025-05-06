<script lang="ts">
    import { textProcessorSettings } from "$lib/settingsStore.svelte"; // Import the store
</script>

<h1 class="text-3xl font-display font-bold">Settings</h1>

<div class="mt-6">
    <label for="mode-select" class="block text-sm font-medium text-gray-700"
        >Processor Mode:</label
    >
    <select
        bind:value={textProcessorSettings.selectedMode}
        id="mode-select"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
        <option value="uwuify">Uwuify</option>
        <option value="mispell">Mispell</option>
    </select>
</div>

{#if textProcessorSettings.selectedMode === "uwuify"}
    <div class="mt-8 border-t border-gray-200 pt-6">
        <h2 class="text-xl font-semibold text-gray-900">Uwuify Settings</h2>
        <div class="mt-4 space-y-6">
            <div>
                <h3 class="text-lg font-medium text-gray-800">
                    Space Modifiers (Probability)
                </h3>
                <div class="mt-2 space-y-4 pl-4">
                    <div>
                        <label
                            for="uwu-faces"
                            class="block text-sm font-medium text-gray-700"
                            >Faces: {textProcessorSettings.uwuifierSettings.spaces.faces.toFixed(
                                3,
                            )}</label
                        >
                        <input
                            type="range"
                            id="uwu-faces"
                            bind:value={
                                textProcessorSettings.uwuifierSettings.spaces
                                    .faces
                            }
                            min="0"
                            max="1"
                            step="0.001"
                            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <div>
                        <label
                            for="uwu-actions"
                            class="block text-sm font-medium text-gray-700"
                            >Actions: {textProcessorSettings.uwuifierSettings.spaces.actions.toFixed(
                                3,
                            )}</label
                        >
                        <input
                            type="range"
                            id="uwu-actions"
                            bind:value={
                                textProcessorSettings.uwuifierSettings.spaces
                                    .actions
                            }
                            min="0"
                            max="1"
                            step="0.001"
                            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <div>
                        <label
                            for="uwu-stutters"
                            class="block text-sm font-medium text-gray-700"
                            >Stutters: {textProcessorSettings.uwuifierSettings.spaces.stutters.toFixed(
                                3,
                            )}</label
                        >
                        <input
                            type="range"
                            id="uwu-stutters"
                            bind:value={
                                textProcessorSettings.uwuifierSettings.spaces
                                    .stutters
                            }
                            min="0"
                            max="1"
                            step="0.001"
                            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            <div>
                <h3 class="text-lg font-medium text-gray-800">
                    Word Modifiers (Probability)
                </h3>
                <div class="mt-2 space-y-4 pl-4">
                    <div>
                        <label
                            for="uwu-words"
                            class="block text-sm font-medium text-gray-700"
                            >Word Uwuification: {textProcessorSettings.uwuifierSettings.words.toFixed(
                                3,
                            )}</label
                        >
                        <input
                            type="range"
                            id="uwu-words"
                            bind:value={
                                textProcessorSettings.uwuifierSettings.words
                            }
                            min="0"
                            max="1"
                            step="0.001"
                            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            <div>
                <h3 class="text-lg font-medium text-gray-800">
                    Exclamation Modifiers (Probability)
                </h3>
                <div class="mt-2 space-y-4 pl-4">
                    <div>
                        <label
                            for="uwu-exclamations"
                            class="block text-sm font-medium text-gray-700"
                            >Exclamation Uwuification: {textProcessorSettings.uwuifierSettings.exclamations.toFixed(
                                3,
                            )}</label
                        >
                        <input
                            type="range"
                            id="uwu-exclamations"
                            bind:value={
                                textProcessorSettings.uwuifierSettings
                                    .exclamations
                            }
                            min="0"
                            max="1"
                            step="0.001"
                            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}

{#if textProcessorSettings.selectedMode === "mispell"}
    <div class="mt-8 border-t border-gray-200 pt-6">
        <h2 class="text-xl font-semibold text-gray-900">Mispell Settings</h2>
        <div class="mt-4">
            <label
                for="mispell-iq"
                class="block text-sm font-medium text-gray-700"
                >Simulated IQ: {textProcessorSettings.mispellSettings.iq}</label
            >
            <input
                type="range"
                id="mispell-iq"
                bind:value={textProcessorSettings.mispellSettings.iq}
                min="50"
                max="150"
                step="1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <p class="mt-1 text-xs text-gray-500">
                Lower IQ increases misspelling frequency and severity.
            </p>
        </div>
    </div>
{/if}

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

/**
 * The screenshot slot.
 *
 * This component exists so that adding real gameplay media later is a DATA
 * change, never a layout change. It always reserves the same box:
 *   - no `src`  -> a labeled placeholder describing the shot that belongs here
 *   - `src`     -> a lazy-loaded, correctly-sized image or video in that same box
 *
 * Because the aspect ratio is reserved up front, dropping in media causes zero
 * cumulative layout shift.
 */
const props = withDefaults(
  defineProps<{
    /** Path under /public, e.g. "/media/faction-panel.png". Omit for a placeholder. */
    src?: string
    /** Required whenever `src` is set and the image carries meaning. */
    alt?: string
    /** What this frame is for. Shown on the placeholder, and used as a caption. */
    label: string
    /** Extra guidance for whoever captures the shot. Placeholder only. */
    hint?: string
    ratio?: '16/9' | '4/3' | '3/2' | '1/1' | '21/9'
    /** Skip lazy-loading for above-the-fold media. */
    priority?: boolean
    kind?: 'image' | 'video'
    caption?: string
    /** Still frame shown before a video plays. Strongly recommended for video. */
    poster?: string
  }>(),
  { ratio: '16/9', priority: false, kind: 'image' },
)

const isVideo = computed(() => props.kind === 'video')

const video = ref<HTMLVideoElement | null>(null)

/**
 * Autoplay is started in JS rather than via the `autoplay` attribute, so a
 * visitor who has asked for reduced motion gets the poster frame and a normal
 * play control instead of a looping video they cannot stop. `matchMedia` does
 * not exist during prerender, so this has to happen on mount.
 */
const reducedMotion = ref(false)

onMounted(() => {
  if (!isVideo.value || !video.value) return
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion.value) {
    video.value.controls = true
    return
  }
  // Can reject if the browser blocks playback; the poster stays visible.
  void video.value.play().catch(() => {
    if (video.value) video.value.controls = true
  })
})
</script>

<template>
  <figure class="frame">
    <div class="frame__box" :style="{ aspectRatio: props.ratio.replace('/', ' / ') }">
      <video
        v-if="props.src && isVideo"
        ref="video"
        class="frame__media"
        :src="props.src"
        :poster="props.poster"
        :preload="props.priority ? 'auto' : 'metadata'"
        muted
        loop
        playsinline
        disablepictureinpicture
        :aria-label="props.alt ?? props.label"
      />
      <img
        v-else-if="props.src"
        class="frame__media"
        :src="props.src"
        :alt="props.alt ?? ''"
        :loading="props.priority ? 'eager' : 'lazy'"
        :fetchpriority="props.priority ? 'high' : 'auto'"
        decoding="async"
      />

      <div v-else class="frame__placeholder">
        <svg
          class="frame__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          width="22"
          height="22"
        >
          <rect
            x="2.5"
            y="4.5"
            width="19"
            height="15"
            rx="1.5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.4"
          />
          <path
            d="m3 16 5-4.5 4 3.5 3.5-3L21 16"
            fill="none"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p class="frame__label">{{ props.label }}</p>
        <p v-if="props.hint" class="frame__hint">{{ props.hint }}</p>
        <span class="eyebrow frame__tag">Screenshot pending</span>
      </div>
    </div>
    <figcaption v-if="props.caption" class="frame__caption">{{ props.caption }}</figcaption>
  </figure>
</template>

<style scoped>
.frame {
  margin: 0;
}

.frame__box {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: var(--c-bg-sunken);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
}

.frame__media {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.frame__placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-6);
  text-align: center;
  color: var(--c-text-muted);
  /*
   * A faint diagonal hatch reads unmistakably as "placeholder" without
   * pretending to be artwork. It is CSS, so it costs no bytes.
   */
  background-image: repeating-linear-gradient(
    -45deg,
    transparent 0 10px,
    rgba(255, 255, 255, 0.014) 10px 20px
  );
}

.frame__icon {
  opacity: 0.5;
}

.frame__label {
  max-width: 34ch;
  font-family: var(--font-display);
  font-size: var(--fs-md);
  font-weight: var(--fw-semibold);
  color: var(--c-text-secondary);
}

.frame__hint {
  max-width: 44ch;
  font-size: var(--fs-sm);
  line-height: var(--lh-normal);
}

.frame__tag {
  margin-top: var(--space-1);
  padding: 0.15em 0.5em;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-xs);
}

.frame__caption {
  margin-top: var(--space-3);
  font-size: var(--fs-sm);
  color: var(--c-text-muted);
}
</style>

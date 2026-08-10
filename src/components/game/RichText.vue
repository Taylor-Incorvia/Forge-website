<script setup lang="ts">
import { computed } from 'vue'

/**
 * Renders the only two inline marks the patch notes use — **bold** and
 * *emphasis* — as real elements, without a Markdown dependency and without
 * ever setting innerHTML. The source string is split into typed tokens and
 * rendered through the template, so nothing here can inject markup.
 */
const props = defineProps<{ text: string }>()

type Token = { kind: 'text' | 'strong' | 'em'; value: string }

const tokens = computed<Token[]>(() => {
  const out: Token[] = []
  // Alternates literal / **strong** / *em*, longest delimiter first.
  const pattern = /\*\*([^*]+)\*\*|\*([^*]+)\*/g
  let last = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(props.text))) {
    if (match.index > last) out.push({ kind: 'text', value: props.text.slice(last, match.index) })
    if (match[1] !== undefined) out.push({ kind: 'strong', value: match[1] })
    else if (match[2] !== undefined) out.push({ kind: 'em', value: match[2] })
    last = match.index + match[0].length
  }
  if (last < props.text.length) out.push({ kind: 'text', value: props.text.slice(last) })
  return out
})
</script>

<template>
  <span>
    <template v-for="(token, i) in tokens" :key="i">
      <strong v-if="token.kind === 'strong'">{{ token.value }}</strong>
      <em v-else-if="token.kind === 'em'">{{ token.value }}</em>
      <template v-else>{{ token.value }}</template>
    </template>
  </span>
</template>

<style scoped>
strong {
  color: var(--c-text);
  font-weight: var(--fw-semibold);
}

em {
  font-style: italic;
}
</style>

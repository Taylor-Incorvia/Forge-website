/**
 * Prop shapes shared between UI components and the pages that use them.
 * They live here rather than in the SFCs because `<script setup>` cannot
 * contain ES module exports.
 */

export interface ChipOption {
  value: string
  label: string
  count?: number
}

export interface Step {
  title: string
  detail?: string
}

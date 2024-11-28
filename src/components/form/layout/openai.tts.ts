// import { SpeechCreateParams } from "openai/resources/audio/speech";
export type SpeechModel = 'tts-1' | 'tts-1-hd';

export interface SpeechCreateParams {
  /**
   * The text to generate audio for. The maximum length is 4096 characters.
   */
  input: string;

  /**
   * One of the available [TTS models](https://platform.openai.com/docs/models#tts):
   * `tts-1` or `tts-1-hd`
   */
  model: (string & {}) | SpeechModel;

  /**
   * The voice to use when generating the audio. Supported voices are `alloy`,
   * `echo`, `fable`, `onyx`, `nova`, and `shimmer`. Previews of the voices are
   * available in the
   * [Text to speech guide](https://platform.openai.com/docs/guides/text-to-speech#voice-options).
   */
  voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';

  /**
   * The format to audio in. Supported formats are `mp3`, `opus`, `aac`, `flac`,
   * `wav`, and `pcm`.
   */
  response_format?: 'mp3' | 'opus' | 'aac' | 'flac' | 'wav' | 'pcm';

  /**
   * The speed of the generated audio. Select a value from `0.25` to `4.0`. `1.0` is
   * the default.
   */
  speed?: number;
}

import { AimForm } from "../types";

export const layout: AimForm<Partial<SpeechCreateParams>> = {
  storageKey: "tts:openai:selected",
  nodes: [{
    id: "1",
    url: "",
    component: "@components/Select",
    label: "tts.model",
    name: "model",
    data: {
      placeholder: "tts.model",
      options: [{
        value: "tts-1-hd",
        label: "tts-1-hd"
      }, {
        value: "tts-1",
        label: "tts-1"
      }]
    }
  }, {
    id: "2",
    url: "",
    component: "@components/Select",
    label: "tts.speaker",
    name: "voice",
    data: {
      placeholder: "tts.speaker",
      options: [{
        value: "alloy",
        label: "alloy"
      }, {
        value: "echo",
        label: "echo"
      }, {
        value: "fable",
        label: "fable"
      }, {
        value: "onyx",
        label: "onyx"
      }, {
        value: "nova",
        label: "nova"
      }, {
        value: "shimmer",
        label: "shimmer"
      }]
    }
  }, {
    id: "3",
    url: "",
    component: "@components/Slider",
    label: "tts.speed",
    name: "speed",
    data: {
      max: 4.0,
      min: 0.25,
      step: 0.25
    }
  }],
  data: {
    model: "tts-1",
    voice: "alloy",
    speed: 1.0,
    input: ""
  },
  actions: {}
};
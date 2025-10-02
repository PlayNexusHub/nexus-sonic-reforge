/**
 * Audio Editor Type Definitions
 * Part of the PlayNexus Sonic Forge 24 Suite
 */

export interface AudioFile {
  file: File;
  duration: number;
  sampleRate: number;
  bitDepth: number;
  channels: number;
}

export interface AudioSelection {
  start: number;
  end: number;
}

export interface AudioProject {
  id: string;
  name: string;
  created: Date;
  modified: Date;
  audioFile?: AudioFile;
  effects: AudioEffect[];
  markers: AudioMarker[];
}

export interface AudioEffect {
  id: string;
  type: 'reverb' | 'delay' | 'compression' | 'eq' | 'normalize' | 'fade';
  enabled: boolean;
  parameters: Record<string, number>;
}

export interface AudioMarker {
  id: string;
  time: number;
  label: string;
  color?: string;
}

export interface WaveformData {
  samples: number[];
  peaks: number[];
  rms: number[];
}

export interface AudioMetadata {
  title?: string;
  artist?: string;
  album?: string;
  year?: number;
  genre?: string;
}

export type AudioFormat = 'mp3' | 'wav' | 'ogg' | 'm4a' | 'flac' | 'aac';

export const SUPPORTED_AUDIO_FORMATS: AudioFormat[] = ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac'];

export const AUDIO_MIME_TYPES: Record<AudioFormat, string> = {
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  ogg: 'audio/ogg',
  m4a: 'audio/mp4',
  flac: 'audio/flac',
  aac: 'audio/aac'
};

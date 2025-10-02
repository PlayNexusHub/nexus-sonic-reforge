/**
 * Audio File Validation Utilities
 * Secure input validation for audio files
 * PlayNexus Sonic Forge 24
 */

import { SUPPORTED_AUDIO_FORMATS, AUDIO_MIME_TYPES, type AudioFormat } from '@/types/audio.types';

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const MIN_FILE_SIZE = 1024; // 1KB

export interface ValidationResult {
  valid: boolean;
  error?: string;
  warnings?: string[];
}

/**
 * Validates an audio file for security and compatibility
 * @param file - The file to validate
 * @returns ValidationResult with valid status and any errors/warnings
 */
export function validateAudioFile(file: File): ValidationResult {
  const warnings: string[] = [];

  // Check file exists
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  // Check file size bounds
  if (file.size > MAX_FILE_SIZE) {
    return { 
      valid: false, 
      error: `File size exceeds maximum limit of ${MAX_FILE_SIZE / 1024 / 1024}MB` 
    };
  }

  if (file.size < MIN_FILE_SIZE) {
    return { 
      valid: false, 
      error: 'File appears to be empty or corrupted' 
    };
  }

  // Validate file extension
  const extension = getFileExtension(file.name);
  if (!extension) {
    return { valid: false, error: 'File has no extension' };
  }

  const format = extension.toLowerCase() as AudioFormat;
  if (!SUPPORTED_AUDIO_FORMATS.includes(format)) {
    return { 
      valid: false, 
      error: `Unsupported audio format. Supported formats: ${SUPPORTED_AUDIO_FORMATS.join(', ')}` 
    };
  }

  // Validate MIME type (if available)
  if (file.type) {
    const expectedMimeType = AUDIO_MIME_TYPES[format];
    if (file.type !== expectedMimeType && !file.type.startsWith('audio/')) {
      warnings.push(`File MIME type "${file.type}" doesn't match expected type for ${format}`);
    }
  }

  // Check filename for path traversal attempts
  if (file.name.includes('..') || file.name.includes('/') || file.name.includes('\\')) {
    return { valid: false, error: 'Invalid filename detected' };
  }

  // Large file warning
  if (file.size > 100 * 1024 * 1024) {
    warnings.push('Large file detected. Processing may take longer.');
  }

  return { valid: true, warnings: warnings.length > 0 ? warnings : undefined };
}

/**
 * Safely extracts file extension
 */
export function getFileExtension(filename: string): string | null {
  const match = filename.match(/\.([^.]+)$/);
  return match ? match[1] : null;
}

/**
 * Formats file size to human-readable string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Formats duration in seconds to MM:SS or HH:MM:SS
 */
export function formatDuration(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Sanitizes project name for safe file system use
 */
export function sanitizeProjectName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9-_. ]/g, '') // Remove special chars
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .substring(0, 100); // Limit length
}

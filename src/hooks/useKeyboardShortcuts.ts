import { useEffect, useCallback } from 'react';

export interface KeyboardShortcuts {
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onSave?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onCut?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onZoomFit?: () => void;
  onDelete?: () => void;
  onSelectAll?: () => void;
  onExport?: () => void;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcuts) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Ignore if user is typing in an input field
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement ||
      event.target instanceof HTMLSelectElement ||
      (event.target as HTMLElement)?.contentEditable === 'true'
    ) {
      return;
    }

    const { key, code, ctrlKey, metaKey, shiftKey } = event;
    const isModifierPressed = ctrlKey || metaKey;

    // Prevent default browser shortcuts for our custom ones
    let preventDefault = false;

    switch (true) {
      // Playback controls
      case key === ' ':
        if (shortcuts.onPlay) {
          shortcuts.onPlay();
          preventDefault = true;
        }
        break;
      
      case key === 'Escape':
        if (shortcuts.onStop) {
          shortcuts.onStop();
          preventDefault = true;
        }
        break;

      // File operations
      case isModifierPressed && key === 's':
        if (shortcuts.onSave) {
          shortcuts.onSave();
          preventDefault = true;
        }
        break;

      case isModifierPressed && key === 'e':
        if (shortcuts.onExport) {
          shortcuts.onExport();
          preventDefault = true;
        }
        break;

      // Edit operations
      case isModifierPressed && key === 'z' && !shiftKey:
        if (shortcuts.onUndo) {
          shortcuts.onUndo();
          preventDefault = true;
        }
        break;

      case isModifierPressed && ((key === 'z' && shiftKey) || key === 'y'):
        if (shortcuts.onRedo) {
          shortcuts.onRedo();
          preventDefault = true;
        }
        break;

      case isModifierPressed && key === 'x':
        if (shortcuts.onCut) {
          shortcuts.onCut();
          preventDefault = true;
        }
        break;

      case isModifierPressed && key === 'c':
        if (shortcuts.onCopy) {
          shortcuts.onCopy();
          preventDefault = true;
        }
        break;

      case isModifierPressed && key === 'v':
        if (shortcuts.onPaste) {
          shortcuts.onPaste();
          preventDefault = true;
        }
        break;

      case isModifierPressed && key === 'a':
        if (shortcuts.onSelectAll) {
          shortcuts.onSelectAll();
          preventDefault = true;
        }
        break;

      case key === 'Delete' || key === 'Backspace':
        if (shortcuts.onDelete) {
          shortcuts.onDelete();
          preventDefault = true;
        }
        break;

      // Zoom controls
      case isModifierPressed && (key === '=' || key === '+'):
        if (shortcuts.onZoomIn) {
          shortcuts.onZoomIn();
          preventDefault = true;
        }
        break;

      case isModifierPressed && key === '-':
        if (shortcuts.onZoomOut) {
          shortcuts.onZoomOut();
          preventDefault = true;
        }
        break;

      case isModifierPressed && key === '0':
        if (shortcuts.onZoomFit) {
          shortcuts.onZoomFit();
          preventDefault = true;
        }
        break;
    }

    if (preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, [shortcuts]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Return the shortcuts for display in help
  return {
    shortcuts: [
      { key: 'Space', action: 'Play/Pause' },
      { key: 'Esc', action: 'Stop' },
      { key: 'Ctrl+S', action: 'Save Project' },
      { key: 'Ctrl+E', action: 'Export Audio' },
      { key: 'Ctrl+Z', action: 'Undo' },
      { key: 'Ctrl+Y', action: 'Redo' },
      { key: 'Ctrl+X', action: 'Cut Selection' },
      { key: 'Ctrl+C', action: 'Copy Selection' },
      { key: 'Ctrl+V', action: 'Paste Selection' },
      { key: 'Ctrl+A', action: 'Select All' },
      { key: 'Delete', action: 'Delete Selection' },
      { key: 'Ctrl++', action: 'Zoom In' },
      { key: 'Ctrl+-', action: 'Zoom Out' },
      { key: 'Ctrl+0', action: 'Zoom to Fit' },
    ]
  };
};
/**
 * Checks whether an optional local audio file actually exists and decodes as audio,
 * avoiding Vite SPA HTML-fallback false positives and preventing broken audio UI.
 */
export async function checkAudioExists(src?: string): Promise<boolean> {
  if (!src) {
    return false;
  }

  if (typeof window !== 'undefined' && window.location.protocol !== 'file:') {
    try {
      const response = await fetch(src, {method: 'HEAD'});
      if (!response.ok) {
        return false;
      }
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('text/html')) {
        return false;
      }
      return (
        contentType.includes('audio') ||
        contentType.includes('mpeg') ||
        contentType.includes('mp4') ||
        contentType.includes('ogg') ||
        contentType.includes('wav') ||
        contentType === ''
      );
    } catch {
      return false;
    }
  }

  return new Promise((resolve) => {
    const audio = new Audio();
    audio.preload = 'metadata';

    const onReady = () => {
      cleanup();
      resolve(true);
    };
    const onError = () => {
      cleanup();
      resolve(false);
    };
    const cleanup = () => {
      audio.removeEventListener('loadedmetadata', onReady);
      audio.removeEventListener('error', onError);
    };

    audio.addEventListener('loadedmetadata', onReady);
    audio.addEventListener('error', onError);
    audio.src = src;
  });
}

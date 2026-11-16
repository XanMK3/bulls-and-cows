import { useEffect } from 'react';

const useWakeLock = (enabled = true) => {
  useEffect(() => {
    if (!enabled || !('wakeLock' in navigator)) {
      return undefined;
    }

    let wakeLock = null;
    let disposed = false;
    let pending = false;

    const acquire = async () => {
      if (
        disposed
        || pending
        || document.visibilityState !== 'visible'
        || (wakeLock && !wakeLock.released)
      ) {
        return;
      }

      pending = true;

      try {
        const lock = await navigator.wakeLock.request('screen');

        if (disposed || document.visibilityState !== 'visible') {
          await lock.release();
        }
        else {
          wakeLock = lock;
        }
      }
      catch (error) {
        // Wake locks are optional and can be denied by browser policy or battery state.
        // eslint-disable-next-line no-console
        console.warn('Could not acquire screen wake lock:', error);
      }
      finally {
        pending = false;
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        acquire();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    acquire();

    return () => {
      disposed = true;
      document.removeEventListener('visibilitychange', onVisibilityChange);

      if (wakeLock && !wakeLock.released) {
        wakeLock.release().catch(() => { });
      }
    };
  }, [enabled]);
};

export default useWakeLock;

/**
 * Run an async action with a busy flag. Returns whether the action started.
 */
export async function runBusy(
  getBusy: () => boolean,
  setBusy: (v: boolean) => void,
  action: () => Promise<void>,
  onError?: (err: unknown) => void,
): Promise<boolean> {
  if (getBusy()) {
    return false;
  }
  setBusy(true);
  try {
    await action();
    return true;
  } catch (err) {
    onError?.(err);
    return false;
  } finally {
    setBusy(false);
  }
}

import { APP_STORE_SCREENSHOTS, AppStoreScreenshot } from './screenshotConfigs';

interface AppStoreScreenshotItemProps {
  /** Zero-based index into APP_STORE_SCREENSHOTS. Default: 0 */
  index?: number;
  /** Lookup by id instead of index, e.g. "auth" or "checkout" */
  id?: string;
}

export function AppStoreScreenshotItem({ index = 0, id }: AppStoreScreenshotItemProps) {
  const config = id
    ? APP_STORE_SCREENSHOTS.find((shot) => shot.id === id)
    : APP_STORE_SCREENSHOTS[index];

  if (!config) {
    return null;
  }

  const { MockScreen, headline } = config;

  return (
    <AppStoreScreenshot headline={headline}>
      <MockScreen />
    </AppStoreScreenshot>
  );
}

export const getImageUrl = (relativePath: string): string => {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;
    return `${apiBaseUrl}${relativePath}`;
};
  
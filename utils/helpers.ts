export const getImageUrl = (relativePath: string): string => {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;
    console.log('Base URL:', apiBaseUrl); // Debug log
    console.log('Relative Path:', relativePath); // Debug log
    return `${apiBaseUrl}${relativePath}`;
};
  
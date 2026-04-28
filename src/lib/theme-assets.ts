declare global {
  interface Window {
    NCJA_THEME_URI?: string;
  }
}

const getRuntimeThemeUri = () => {
  const explicitThemeUri = window.NCJA_THEME_URI?.replace(/\/+$/, "");

  if (explicitThemeUri) {
    return explicitThemeUri;
  }

  const scripts = Array.from(document.scripts).reverse();
  const appScript = scripts.find((script) => /\/assets\/index(?:-[\w-]+)?\.js/.test(script.src));

  if (appScript?.src) {
    const scriptUrl = new URL(appScript.src, window.location.href);
    scriptUrl.pathname = scriptUrl.pathname.replace(/\/assets\/[^/]+$/, "");
    scriptUrl.search = "";
    scriptUrl.hash = "";

    return scriptUrl.href.replace(/\/+$/, "");
  }

  const baseUrl = import.meta.env.BASE_URL;

  if (baseUrl && baseUrl !== "/" && baseUrl !== "./") {
    return new URL(baseUrl, window.location.href).href.replace(/\/+$/, "");
  }

  return "";
};

export const getThemeAssetUrl = (assetPath: string) => {
  const cleanPath = assetPath.replace(/^\/+/, "");
  const themeUri = getRuntimeThemeUri();

  return themeUri ? `${themeUri}/${cleanPath}` : `/${cleanPath}`;
};

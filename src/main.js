import plugin from "../plugin.json";
import icon from "./react.svg";

class IconReact {
  async init() {
    this.style = (
      <style
        textContent={`.file_type_jsx::before{
          display: inline-block;
          content: '';
          background-image: url(${icon});
          background-size: contain;
          background-repeat: no-repeat;
          height: 1em;
          width: 1em;
        }
        .file_type_tsx::before {
          display: inline-block;
          content: '';
          background-image: url(${icon});
          background-size: contain;
          background-repeat: no-repeat;
          height: 1em;
          width: 1em;        
        }`}
      ></style>
    );
    document.head.append(this.style);
  }

  async destroy() {
    //
  }
}

if (window.acode) {
  const acodePlugin = new IconReact();
  acode.setPluginInit(
    plugin.id,
    (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
      if (!baseUrl.endsWith("/")) {
        baseUrl += "/";
      }
      acodePlugin.baseUrl = baseUrl;
      acodePlugin.init($page, cacheFile, cacheFileUrl);
    }
  );
  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}

import plugin from "../plugin.json";
import tag from "html-tag-js";
const icon = require("./react.svg");

class IconReact {
  // Style Element
  private style!: HTMLStyleElement;
  // Base url
  public baseUrl: string | undefined;
  // Plugin initialization
  public async init(): Promise<void> {
    // Icon styling
    const style: string = `.file_type_jsx::before{
          display: inline-block;
          content: '';
          background-image: url(${icon.default});
          background-size: contain;
          background-repeat: no-repeat;
          height: 1em;
          width: 1em;
        }
        .file_type_tsx::before {
          display: inline-block;
          content: '';
          background-image: url(${icon.default});
          background-size: contain;
          background-repeat: no-repeat;
          height: 1em;
          width: 1em;        
        }`;
    // Creating new style Element
    this.style = tag("style", {
      textContent: style,
    });
    // Appending style element with head
    document.head.append(this.style);
  }

  public async destroy(): Promise<void> {
    //
  }
}

if (window.acode) {
  const acodePlugin = new IconReact();
  acode.setPluginInit(
    plugin.id,
    async (
      baseUrl: string,
      $page: WCPage,
      { cacheFileUrl, cacheFile }: any
    ) => {
      if (!baseUrl.endsWith("/")) {
        baseUrl += "/";
      }
      acodePlugin.baseUrl = baseUrl;
      await acodePlugin.init();
    }
  );
  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}

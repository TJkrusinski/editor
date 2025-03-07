import { writeFile } from "node:fs/promises";
import generateBMFont from "msdf-bmfont-xml";
import { decodeBase64, encodeBase64 } from "jsr:@std/encoding/base64";

const charset = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

generateBMFont(
  "public/hack-mono.ttf",
  {
    smallSize: true,
    charset,
    outputType: "json",
  },
  async (
    error: Error | undefined,
    textures: { filename: string; texture: Array<Uint8Array> }[],
    font: { filename: string; data: string }
  ) => {
    if (error) {
      throw error;
    }

    const pages = await Promise.all(
      textures.map((texture) => "data:image/png;base64," + (encodeBase64(texture.texture as unknown as Uint8Array)))
    )
    const json = JSON.parse(font.data);

    json.pages = pages;
    await writeFile(font.filename, JSON.stringify(json));
  }
);

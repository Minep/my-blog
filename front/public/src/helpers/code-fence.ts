import type MarkdownIt from "markdown-it";
import { render } from "bit-field/lib";
import stringify from "onml/stringify";

const supportedInjections: Record<string, (content: string) => string> = {
  "bit-field": (content: string) => {
    try {
      const jsonml = render(JSON.parse(content), {
        hspace: 900,
        vspace: 100,
        lanes: 2
      });
      return stringify(jsonml);
    } catch (error) {
      console.log(error);
      return content;
    }
  }
}

export default (md: MarkdownIt) => {
  md.renderer.rules.fence = (tokens, idx, options, env, instance) => {
    const token = tokens[idx];

    const info = token.info.trim();

    const content = token.content;

    const finalBreak =
      idx < tokens.length && tokens[idx].type === "list_item_close" ? "\n" : "";

    const processor = supportedInjections[info]
    if (!processor) {
      return `<pre><code class="language-${info}">${content}</code></pre>${finalBreak}`
    }

    return `${processor(content)}${finalBreak}`;
  };
};
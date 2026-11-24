# Yapmod Theme Starter

Publish a collection of CSS themes for Yapin. Rose and Ocean provide two working examples you can install independently.

## Create your collection

1. Use **Use this template** to create a public repository and enable GitHub Actions.
2. Edit the collection name and description in `collection.json`.
3. Copy a file in `themes/` for each new theme. Give it a stable filename such as `fern.theme.css`. Set its name, author, and description in the CSS header and edit its rules. Keep the stylesheet self-contained.
4. To try a theme locally, choose **Themes → Add Theme → Local → Upload CSS** in Yapmod and enable it.

Run `node scripts/build.mjs` with Node 22 or newer to generate `dist/index.json` and the CSS files. The build uses only Node's standard library.

## Publish and import

Push to your default branch. The **Theme catalog** workflow builds the index from all CSS files in `themes/` and publishes it with the stylesheets on the `theme-dist` branch. The workflow uses the built-in GitHub token and needs write access to that branch.

In **Themes → Add Theme → Collection**, paste the following URL with your GitHub owner and repository name and select **Add Collection**.

```text
https://raw.githubusercontent.com/OWNER/REPO/theme-dist/index.json
```

Expand the collection, install a theme, and enable it. Use **Refresh collection** to see changes to the listing. Removing the collection keeps installed themes. A theme's published CSS URL also works in **Add Theme → URL**.

[Import the starter index](https://raw.githubusercontent.com/yapmod/theme-starter/theme-dist/index.json)

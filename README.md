# simple-live2d-wallpaper

A simple framework that helps you build your own Live2D wallpaper that runs on Wallpaper Engine.

Sample: [Ganyu Wallpaper](https://steamcommunity.com/sharedfiles/filedetails/?id=2427596211&searchtext=%E7%94%98%E9%9B%A8)

## Setup

1. Run `yarn install` (or `npm install`).

2. Create `wallpaper` folder at the project root.

3. Download [`live2d.min.js`](https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js)
   and [`live2dcubismcore.min.js`](https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js), place them in
   the `wallpaper` folder.

4. Place your Live2D model in the `wallpaper` folder as well.

5. Create `wallpaper/config.json`.

   Example:
   ```json
   {
     "model": "my-model/my-model.model.json",
     "layout": {
       "height": "80%",
       "x": "50%",
       "bottom": 200
     }
   }
   ```

    - `model`: The path to you model's settings file, relative to its containing folder, which is `wallpaper`.
    - `layout`: The model's size and position.

      Available attributes are: `width`, `height`, `x`, `y`, `left`, `right`, `top`, `bottom`. These attributes are
      separated into three groups whose members are considered exclusive, which means if two of more attributes in a
      group are specified, only one of them will take effect.
        - `width`, `height`
        - `x`, `left`, `right`
        - `y`, `top`, `bottom`

      Each attribute's value may be one of the two kinds:
        - A number which specifies the absolute size/position in pixels.
        - A percentage string which specifies the size/position relative to the screen. Specially, when setting `x`
          or `y` as a percentage, the same calculation as in
          the [CSS background-position](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position#values)
          will be used.

6. (Optional) Modify `assets/project.json` and/or the localization files in `assets/locales/` for your need.

7. (Maybe optional) Create `assets/preview.jpg` as the wallpaper's preview image.

8. Create an empty folder in the `myproject` directory of Wallpaper Engine, for example:
   ```text
   C:\Program Files (x86)\Steam\steamapps\common\wallpaper_engine\projects\myprojects\my-live2d-wallpaper
   ```

9. Go back to this project, create `.env.local` file at the project root, fill it with:
   ```shell
   # path to the directory that you've just created in the previous step 
   WALLPAPER_PATH=C:\Program Files (x86)\Steam\steamapps\common\wallpaper_engine\projects\myprojects\my-live2d-wallpaper
   ```

10. Run the following command. You may be asked for confirmations to overwrite existing files.
    ```shell
    # or `npm run setup` if you're using npm
    yarn setup
    ```
    *When the files in `assets` folder has been modified, you should re-run this command to make the changes take effect in
    Wallpaper Engine.*

## Serving

```shell
# or `npm run start`
yarn start
```

## Distribution

If you are publishing an update to the existing wallpaper instead of publishing a new wallpaper, you must add
a `WORKSHOP_ID` variable in the `.env.local` before building the project.

```shell
# the workshop ID of your *already published* wallpaper
WORKSHOP_ID=123456
```

To build the project, run the command:

```shell
# or `npm run build`
yarn build
```

After building has finished, copy the files in `wallpaper` and `dist` to your wallpaper's folder (inside of `myproject`
folder of Wallpaper Engine), then your wallpaper is ready to be published.

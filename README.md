# Ian's Ski Map

#### PDT Project for Dec/Jan 22-23

##### Goal: better understand concepts of React/TypeScript/Redux via a fun project that aligns with my interests. Main areas I hope to improve:

- Custom hooks
- Strict typing
- Library compatability
- Patterns (OSoT, compartmentalization of hooks)
- Lazy loading large data sets
- Configuing FE to smoothly handle large quantities of data
- Modulrization of TS files

### Current TODO:

- Error handling for OTS 500s
- Fix sporadic CORS issues
- √ Upgrade MountainDetail with elevations
- MountainDetail -> Mountain Sidesheet
- Fix pagination on fetch
- Fix `any`s
- √ Change markers
- √ Fetch elevation
- √ Move map functions to hook
- Icons differ by size / vertical / etc
- Tram icons
- 11k Club
- √ Fix snow totals (they're off) - comes in CM

### Bigger Ideas:

- Create aggregate views on sidebar, i.e...
  - Best new snow
  - Biggest bases
  - Incoming weather
  - Ikon / Epic / Indie
  - Navigation

## Running the Application

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

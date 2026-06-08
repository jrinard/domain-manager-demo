# @spacedock/tryyb-services

Provides a service context for packages running within the tryyb app. This replaces the `Syyncronyyzed` postMessage pattern used by iframe-based apps.

## Background

When apps were loaded as iframes inside tryyb, they used `@spacedock/syyncronyyzed` to communicate with the parent window via `postMessage`. Common operations included:

- Opening the file/lesson chooser
- Launching the lesson viewer
- Uploading assets
- Opening the user import dialog
- Navigating to menu items

Now that apps are being migrated to native packages lazy-loaded into tryyb, they need a different way to access these services. This package provides a React context-based approach.

## Usage in Migrated Packages

```tsx
import { useTryybServices } from '@spacedock/tryyb-services'

function CreateMessage() {
  const services = useTryybServices()

  const handleAttach = async () => {
    try {
      const { lessons } = await services.chooseFile(['Library'])
      // Use the selected lessons
      addLessons(lessons)
    } catch (err) {
      console.error('Failed to choose file:', err)
    }
  }

  return <button onClick={handleAttach}>Attach File</button>
}
```

## Migration from Syyncronyyzed

### Before (iframe-based app):

```tsx
import { useSyync } from '@spacedock/syyncronyyzed'

function MyComponent() {
  const syync = useSyync()

  const handleClick = () => {
    syync?.sendMessage('choose-file', { options: ['Library'] })
      .then((result) => {
        addLessons(result.lessons)
      })
  }

  return (
    <>
      {syync?.isConnected ? (
        <button onClick={handleClick}>Choose</button>
      ) : (
        <button onClick={fallbackHandler}>Choose (fallback)</button>
      )}
    </>
  )
}
```

### After (native package):

```tsx
import { useTryybServices } from '@spacedock/tryyb-services'

function MyComponent() {
  const services = useTryybServices()

  const handleClick = async () => {
    const { lessons } = await services.chooseFile(['Library'])
    addLessons(lessons)
  }

  // No need for isConnected checks - services are always available
  return <button onClick={handleClick}>Choose</button>
}
```

## Available Services

| Method | Description |
|--------|-------------|
| `chooseFile(options?)` | Opens the file/lesson chooser modal |
| `launchLessonViewer(lessonID)` | Opens the lesson viewer |
| `uploadAsset(file, options?)` | Uploads an asset file |
| `simpleUploadFileGetKey(file)` | Programmatic direct upload (no chooser) - returns upload response |
| `openImageChooserGetKey()` | Opens image chooser and returns upload key/result |
| `openChooserWithOptionsGetLesson(options?)` | Opens chooser with tabs, uploads (or selects) and creates/returns a Lesson |
| `openUserImport(teamID, teamName)` | Opens the user import dialog |
| `navigateToMenuItem(functionID, params?)` | Navigates to a menu item |
| `openSpotlight()` | Opens the spotlight search |
| `getSessionKey()` | Gets the current session key |
| `getUrlByConstant(name)` | Gets a URL by constant name |

## Testing

Use `MockTryybServicesProvider` for testing:

```tsx
import { MockTryybServicesProvider } from '@spacedock/tryyb-services'

test('chooses a file', async () => {
  render(
    <MockTryybServicesProvider
      overrides={{
        chooseFile: async () => ({
          lessons: [{ lessonID: 1, title: 'Test Lesson' }],
        }),
      }}
    >
      <MyComponent />
    </MockTryybServicesProvider>
  )

  // Test your component
})
```

## Note

The `@spacedock/syyncronyyzed` package is **not** being removed. It continues to be used for iframe-based integrations (SAML, legacy interfaces, external embeds). This package only replaces its usage in apps being migrated to native packages.

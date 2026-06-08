import {
  applyChangesToString,
  formatFiles,
  getProjects,
  ProjectConfiguration,
  readJsonFile,
  Tree,
} from '@nx/devkit'
import { camelCase, get } from 'lodash'
import { createSourceFile, ScriptTarget } from 'typescript'
import { addProperty } from 'warp'
import { GeneratorSchema } from './schema'

export async function fromPostmanGenerator(
  tree: Tree,
  options: GeneratorSchema
) {
  const scribeProjectDir = getProjectRoot(tree, '@tyto/scribe')
  const postmanJSON = readJsonFile(
    `${scribeProjectDir}/specs/TytoAPI.postman_collection.json`
  )

  const resource = get(postmanJSON, 'item', []).find(
    (item: { name: string }) => {
      return (
        get(item, 'name', '') === options.requestName &&
        get(item, 'request.method', '') === options.method.toUpperCase()
      )
    }
  )

  const response = get(resource, 'response', []).find(
    (item: { name: string }) => {
      return get(item, 'name', '') === options.responseName
    }
  )

  const body = JSON.parse(get(response, 'body', '{}'))

  await addLore(tree, options, JSON.stringify(body, null, 2))
  //TODO: await addTypes(tree, options, JSON.stringify(body, null, 2))

  // TODO: try {
  //   const { stderr } = await spawnAsync(
  //     'quicktype',
  //     [
  //       '--src',
  //       `${scribeProjectDir}/dist/${options.requestName}/${options.responseName}.json`,
  //       '--src-lang',
  //       'json',
  //       '--lang',
  //       'typescript',
  //       '--out',
  //       `${scribeProjectDir}/dist/${options.requestName}/${options.responseName}.ts`,
  //     ],
  //     {
  //       cwd: workspaceRoot,
  //     }
  //   )
  //   console.error(stderr)
  // } catch (e) {
  //   console.error('ERR', e)
  // }
}

type AllowedProject = '@tyto/lore' | '@tyto/scribe' | '@tyto/msw'

const getProjectConfigOrThrow = (
  tree: Tree,
  name: AllowedProject
): ProjectConfiguration => {
  const projectConfig: ProjectConfiguration | undefined =
    getProjects(tree).get(name)
  if (projectConfig == null) {
    throw new Error(`Project '${name}' not found`)
  }
  return projectConfig
}

const getProjectRoot = (tree: Tree, name: AllowedProject) => {
  return getProjectConfigOrThrow(tree, name).root.replace('src/index.ts', '')
}

/**
 * TODO: Coming soon...
 * @param tree
 * @param options
 * @param body
 */
/**
const addTypes = async (tree: Tree, options: GeneratorSchema, body: string) => {
  const targetLanguage = defined(languageNamed('ts', undefined))
  const compressedJSON = new CompressedJSONFromString(
    targetLanguage.dateTimeRecognizer,
    false
  )
  const jsonInput = new JSONInput(compressedJSON)
  await jsonInput.addSource({
    name: options.requestName,
    samples: [body],
  })
  const inputData = new InputData()
  inputData.addInput(jsonInput)

  const { lines } = await quicktype({
    inputData,
    lang: 'ts',
    rendererOptions: {
      'just-types': true,
      'prefer-types': true,
      'prefer-unions': true,
      'runtime-typecheck': true,
    },
  })
  tree.write(
    `${getProjectRoot(tree, '@tyto/scribe')}/dist/${options.requestName}/${
      options.responseName
    }.ts`,
    lines.toString()
  )
}
 */

const addLore = async (tree: Tree, options: GeneratorSchema, body: string) => {
  const filePath = `${getProjectRoot(tree, '@tyto/lore')}/src/endpoints/${
    options.requestName
  }/index.ts`
  const source = tree.read(filePath, 'utf-8')
  if (source !== null) {
    const sourceFile = createSourceFile(
      filePath,
      source,
      ScriptTarget.Latest,
      true
    )

    const changes = applyChangesToString(
      source,
      addProperty(
        sourceFile,
        `${options.method.toLowerCase()}.${camelCase(options.responseName)}`,
        `
       () => {
         return ${body}
       }`
      )
    )
    tree.write(filePath, changes)
  }
  await formatFiles(tree)
}

export default fromPostmanGenerator
